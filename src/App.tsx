import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from './utils/api'
import type { ClassType, ClassDetails } from './types/common'

// Lazy load pages for code splitting
const GitaPage = lazy(() => import('./pages/GitaPage'))
const EnglishPage = lazy(() => import('./pages/EnglishPage'))
const MathsPage = lazy(() => import('./pages/MathsPage'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

interface FriendlyErrorProps {
  title: string
  message: string
}

const FriendlyError = ({ title, message }: FriendlyErrorProps) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50 px-4">
    <div className="max-w-md w-full bg-white/90 backdrop-blur-md border border-orange-100 rounded-2xl shadow-xl p-8 text-center">
      <div className="text-5xl mb-4">🧩</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{message}</p>
    </div>
  </div>
)

interface ClassInfo {
  nextclass?: ClassDetails
}

interface VerifyResponse {
  success?: boolean
  code?: string
  message?: string
}

interface ClassInfoResponse {
  success?: boolean
  nextclass?: ClassDetails
  message?: string
}

const CodeGate = () => {
  const { code } = useParams<{ code: string }>()
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null)
  const [classType, setClassType] = useState<ClassType>(null)
  const [childName, setChildName] = useState<string>('')

  const resolveClassType = (name: string = ''): ClassType => {
    const lc = name.toLowerCase()
    
    // English classes: Unbox English, Young Creative Writers, Masterclass-English, 
    // Young Communicator Program, Communication Program, Young Public Speaker, 
    // Parents' Teachers' Meeting (PTM), Homework Room, Extra Class
    if (
      lc.includes('english') ||
      lc.includes('young') ||
      lc.includes('communication') ||
      lc.includes('communicator') ||
      lc.includes('writers') ||
      lc.includes('speaker') ||
      lc.includes('ptm') ||
      lc.includes('parents') ||
      lc.includes('homework') ||
      lc.includes('extra')
    ) {
      return 'english'
    }
    
    // Gita classes: Gita for kids, Sanatan Unboxed
    if (lc.includes('gita') || lc.includes('sanatan')) {
      return 'gita'
    }
    
    // Maths classes: Alpha Math or any other names (default)
    if (lc.includes('math')) {
      return 'maths'
    }
    
    // Default to maths for any other names
    return 'maths'
  }

  useEffect(() => {
    const verify = async () => {
      if (!code || !/^[a-z0-9]{6}$/i.test(code)) {
        setStatus('error')
        setErrorMsg('We need a 6-letter/number code to open your class space.')
        return
      }

      setStatus('checking')
      try {
        // Get token from localStorage or environment variable
        const token = localStorage.getItem('auth_token') || import.meta.env.VITE_TOKEN
        
        const response = await fetch(`${API_BASE_URL}/parent-panel/verify-join-code`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify({ code })
        })

        const data: VerifyResponse = await response.json()
        const success = data?.success && data?.code && typeof data?.message === 'string'
        const verifiedMsg = data?.message?.toLowerCase().includes('code verified')

        if (success && verifiedMsg) {
          // Fetch class info using the verified code
          const infoRes = await fetch(`${API_BASE_URL}/parent-panel/get-join-class-info/${code}`, {
            headers: {
              ...(token && { 'Authorization': `Bearer ${token}` })
            }
          })
          const infoData: ClassInfoResponse = await infoRes.json()

          if (infoData?.success && infoData?.nextclass) {
            const type = resolveClassType(infoData.nextclass.class_name)
            if (type) {
              setClassInfo(infoData)
              setClassType(type)
              setChildName(infoData.nextclass.child_name || '')
              setStatus('ok')
              return
            }
            setErrorMsg('We could not match this class to Gita, Maths, or English.')
            setStatus('error')
            return
          }

          const infoMsg =
            infoData?.message ||
            'We could not load your class details. Please try again.'
          setErrorMsg(infoMsg)
          setStatus('error')
          return
        }

        const msg =
          data?.message ||
          "That code didn't work. Double-check the 6 characters and try again."
        setErrorMsg(msg)
        setStatus('error')
      } catch (err) {
        setErrorMsg('We could not check your code right now. Please try again in a moment.')
        setStatus('error')
      }
    }

    verify()
  }, [code])

  if (status === 'checking') {
    return <LoadingFallback />
  }

  if (status === 'error') {
    return (
      <FriendlyError
        title="Code is not valid"
        message={errorMsg}
      />
    )
  }

  // Verified: render the relevant subject page
  const child = childName?.trim() || ''

  if (classType === 'gita') return <GitaPage childName={child} classDetails={classInfo?.nextclass} code={code} />
  if (classType === 'english') return <EnglishPage childName={child} classDetails={classInfo?.nextclass} code={code} />
  if (classType === 'maths') return <MathsPage childName={child} classDetails={classInfo?.nextclass} code={code} />

  return (
    <FriendlyError
      title="Class unavailable"
      message="We couldn't find the right class page for this code."
    />
  )
}

const App = () => {
  // Extract token from URL and save to localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (token) {
      // Save token to localStorage
      localStorage.setItem('auth_token', token)
      
      // Remove token from URL to keep it clean
      urlParams.delete('token')
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '') + window.location.hash
      window.history.replaceState({}, '', newUrl)
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/:code" element={<CodeGate />}>
            <Route index element={<Navigate to="gita" replace />} />
            <Route path="gita" element={<GitaPage />} />
            <Route path="english" element={<EnglishPage />} />
            <Route path="maths" element={<MathsPage />} />
            <Route path="*" element={<Navigate to="gita" replace />} />
          </Route>
          <Route
            path="*"
            element={
              <FriendlyError
                title="Code needed"
                message="Please use your 6-character class code link to enter."
              />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

