import { memo, useState, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'
import { fetchLastSessionDetails } from '../utils/api'

interface CourseCardProps {
  code?: string
  fallbackImage: string
  fallbackAlt: string
}

const CourseCard = memo<CourseCardProps>(({ code, fallbackImage, fallbackAlt }) => {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadIframe = async () => {
      if (!code) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await fetchLastSessionDetails(code)
        if (data?.last_class?.ppt?.iframe_src) {
          setIframeSrc(data.last_class.ppt.iframe_src)
        } else {
          setError("You don't have ppt in the last class")
        }
      } catch (err) {
        console.error('Error fetching last session details:', err)
        const errorMessage = err instanceof Error ? err.message : 'Failed to load last class content.'
        // Replace authorization error messages with creative alternatives
        if (errorMessage.toLowerCase().includes('not authorized') || errorMessage.toLowerCase().includes('not authorised')) {
          setError('This presentation is locked! Attend your next class to unlock it.')
        } else if (errorMessage.toLowerCase().includes('view bookings') || errorMessage.toLowerCase().includes('bookings for this child')) {
          setError('Your class materials are being prepared. Join a class to access them!')
        } else {
          setError(errorMessage)
        }
      } finally {
        setLoading(false)
      }
    }

    loadIframe()
  }, [code])

  return (
    <div 
      className="w-full h-full bg-white rounded-2xl border-2 border-gray-300 p-2"
      style={{ 
        textAlign: 'left', 
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    >
      {iframeSrc ? (
        <div
          className="w-full h-full rounded-xl overflow-hidden relative bg-white"
          style={{ aspectRatio: '16/9' }}
        >
          <iframe
            src={iframeSrc}
            className="absolute inset-0 w-full h-full border-0 bg-white"
            title="Last Class Content"
            allowFullScreen
            style={{
              display: 'block',
              margin: 0,
              padding: 0,
              border: 'none',
              width: '103%',
              height: '103%',
              left: '-1.5%',
              top: '-1.5%',
              backgroundColor: '#ffffff'
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <OptimizedImage
            src={fallbackImage}
            alt={fallbackAlt}
            className="course-card-image w-full h-full rounded-xl"
            width={800}
            height={600}
            priority={true}
            style={{ objectFit: 'cover', maxWidth: '100%' }}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto mb-2"></div>
                <p className="text-white text-xs font-medium">Loading...</p>
              </div>
            </div>
          )}
          {error && !loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl">
              <div className="bg-white/90 backdrop-blur-md rounded-lg px-4 py-3 border border-gray-200 shadow-lg">
                <p className="text-gray-800 text-sm font-medium text-center">{error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
})

CourseCard.displayName = 'CourseCard'

export default CourseCard

