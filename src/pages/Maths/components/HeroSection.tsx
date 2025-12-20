import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { addChildToJoinQueue, checkIfClassStarted } from '../../../utils/api'
import JoinSuccessToast from '../../../components/JoinSuccessToast'
import OptimizedImage from '../../../components/OptimizedImage'
import type { ClassDetails } from '../../../types/common'

interface HeroSectionProps {
  childName?: string
  classDetails?: ClassDetails
  code?: string
}

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

const HeroSection = memo(({ childName = 'Math Magician', classDetails, code }: HeroSectionProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [decorReady, setDecorReady] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [isJoining, setIsJoining] = useState<boolean>(false)
  const [pollingId, setPollingId] = useState<NodeJS.Timeout | null>(null)
  const hasCheckedAutoRedirect = useRef<boolean>(false)
  const hasOpenedLink = useRef<boolean>(false)

  const toISTDate = useCallback((dateStr: string | undefined, timeStr: string | undefined): Date | null => {
    if (!dateStr || !timeStr) return null
    const t = timeStr.length === 5 ? `${timeStr}:00` : timeStr
    const iso = `${dateStr}T${t}+05:30`
    const d = new Date(iso)
    return isNaN(d.getTime()) ? null : d
  }, [])

  useEffect(() => {
    const start = toISTDate(classDetails?.class_date, classDetails?.start_time)
    if (!start) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      return
    }

    const tick = (): void => {
      const now = new Date()
      const diffSecs = Math.max(0, Math.floor((start.getTime() - now.getTime()) / 1000))
      const hours = Math.floor(diffSecs / 3600)
      const minutes = Math.floor((diffSecs % 3600) / 60)
      const seconds = diffSecs % 60
      setTimeLeft({ hours, minutes, seconds })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [classDetails?.class_date, classDetails?.start_time, toISTDate])

  // Defer heavy decorative layers until idle to speed first paint
  useEffect(() => {
    const idleCb = window.requestIdleCallback
    let handle: number | ReturnType<typeof window.requestIdleCallback> | undefined
    
    if (typeof idleCb === 'function') {
      handle = idleCb(() => setDecorReady(true), { timeout: 300 })
    } else {
      handle = setTimeout(() => setDecorReady(true), 120) as unknown as number
    }

    return () => {
      if (typeof idleCb === 'function' && handle) {
        window.cancelIdleCallback(handle as ReturnType<typeof window.requestIdleCallback>)
      } else if (handle) {
        clearTimeout(handle as unknown as number)
      }
    }
  }, [])

  const formatTime = useCallback((value: number): string => String(value).padStart(2, '0'), [])


  // Auto-redirect when class is started or join_url is available
  useEffect(() => {
    if (!code || hasCheckedAutoRedirect.current || hasOpenedLink.current) return

    const checkAndRedirect = async (): Promise<void> => {
      try {
        const status = await checkIfClassStarted(code)
        if (status?.success && (status?.started || status?.join_url)) {
          hasCheckedAutoRedirect.current = true
          if (status.join_url && !hasOpenedLink.current) {
            hasOpenedLink.current = true
            window.open(status.join_url, '_blank', 'noopener')
          }
        }
      } catch (error: unknown) {
        // Silently fail - user can still click Join Now button
        console.error('Auto-redirect check failed:', error)
      }
    }

    checkAndRedirect()
  }, [code])

  // Handle Join Now button click
  const handleJoinNow = async (): Promise<void> => {
    if (!code) {
      alert('Class verification code is not available. Please try again later.')
      return
    }

    setIsJoining(true)
    try {
      const startedCheck = await checkIfClassStarted(code)
      if (startedCheck?.success && startedCheck?.started && startedCheck?.join_url) {
        // User clicked button - always open in new tab (user-initiated action works better)
        window.open(startedCheck.join_url, '_blank', 'noopener')
        return
      }

      await addChildToJoinQueue(code)
      setShowToast(true)

      // Optimized polling: start with 5s, then increase to 15s after first check
      let pollCount = 0
      let currentPollId: NodeJS.Timeout | null = null
      
      const pollInterval = () => {
        const delay = pollCount === 0 ? 5000 : 15000
        pollCount++
        
        currentPollId = setTimeout(async () => {
          try {
            const status = await checkIfClassStarted(code)
            if (status?.success && status?.started && status?.join_url) {
              if (currentPollId) clearTimeout(currentPollId)
              setPollingId(null)
              if (!hasOpenedLink.current) {
                hasOpenedLink.current = true
                window.open(status.join_url, '_blank', 'noopener')
              }
            } else {
              pollInterval() // Continue polling
            }
          } catch (err: unknown) {
            console.error('Polling error:', err)
            pollInterval() // Retry on error
          }
        }, delay) as unknown as NodeJS.Timeout
        
        setPollingId(currentPollId)
      }
      
      pollInterval()
    } catch (error: unknown) {
      console.error('Error joining queue:', error)
      alert((error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again.') || 'Oops! Something went wrong. Please try again.')
    } finally {
      setIsJoining(false)
    }
  }

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingId) {
        clearTimeout(pollingId)
        setPollingId(null)
      }
    }
  }, [pollingId])

  // Memoized animation variants to prevent recreation
  const textVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  }), [])

  const chariotVariants = useMemo(() => ({
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  }), [])

  const buttonVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.6 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.5)"
    }
  }), [])

  return (
    <div className="relative w-full overflow-x-hidden m-0 p-0">
      {/* Hero Section Background with Gradient */}
      <div className="relative w-full min-h-[320px] sm:min-h-[360px] lg:h-[36vh] bg-english-gradient overflow-hidden rounded-b-hero-bottom-mobile lg:rounded-b-hero-bottom-desktop lg:min-h-[320px] lg:max-h-[340px]">

        {/* Mobile View - Responsive */}
        <div className="relative h-full min-h-[320px] sm:min-h-[360px] lg:hidden w-full max-w-full mx-0 flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4" style={{ zIndex: 10 }}>
          {/* Single Blur Rectangle for All Content - Mobile Only */}
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-[280px] sm:h-[320px] max-h-[340px] w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 z-[1] pointer-events-none overflow-visible"></div>
          
          {/* Mobile Content - Optimized Layout */}
          <div className="relative w-full flex flex-col items-center justify-between h-full py-3 sm:py-4 px-2 sm:px-3 overflow-hidden" style={{ zIndex: 15, minHeight: '280px', maxHeight: '100%' }}>
          
            {/* Top Section - Text Content */}
            <motion.div 
              className="w-full flex flex-col items-center text-center flex-shrink-0 min-w-0"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
            >
              <h1 className="text-xl sm:text-2xl font-black mb-1.5 sm:mb-2 leading-tight text-white font-rounded tracking-tight px-1 w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.5rem, 4vw + 0.75rem, 2.25rem)' }}>
                Hi, {childName || 'Math Magician'}!<br />
                Ready for Number<br />
               Magic - fun & sums ?
              </h1>
              
              {/* Countdown Timer */}
              <motion.div
                className="w-full flex justify-center mt-1 sm:mt-1.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ maxWidth: '100%', overflow: 'hidden' }}
              >
                <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 max-w-full" style={{ fontSize: 'clamp(0.75rem, 2vw + 0.25rem, 0.875rem)' }}>
                  {/* Clock */}
                  <motion.img 
                    src="/images/eng-clock.png" 
                    alt="Clock" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ maxWidth: '100%', height: 'auto', width: 'clamp(2rem, 4vw + 0.5rem, 2.5rem)' }}
                  />
                  
                  {/* Live In Text */}
                  <span className="font-extrabold text-white flex-shrink-0" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                  
                  {/* Time Boxes with Spacing */}
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                    <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 font-extrabold font-mono text-white min-w-[2.25rem] sm:min-w-10 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                      {formatTime(timeLeft.hours)}
                    </span>
                    <span className="text-white font-extrabold">:</span>
                    <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 font-extrabold font-mono text-white min-w-[2.25rem] sm:min-w-10 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                      {formatTime(timeLeft.minutes)}
                    </span>
                    <span className="text-white font-extrabold">:</span>
                    <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 font-extrabold font-mono text-white min-w-[2.25rem] sm:min-w-10 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                      {formatTime(timeLeft.seconds)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* maths-highlite.png - Bottom Left - Mobile */}
        {decorReady && (
          <motion.div
          className="absolute bottom-0 left-[35%] -translate-x-1/2 w-72 h-auto object-contain opacity-100 pointer-events-none lg:hidden"
          style={{ zIndex: 20 }}
          animate={{ 
            y: [0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <OptimizedImage
              src="/images/maths-highlite.png"
              alt="Math highlight"
              className="w-full h-auto object-contain"
              width={288}
              height={180}
            />
          </motion.div>
        )}

        {/* Tablet and Desktop View - Container-based blur rectangle */}
        <div className="relative h-full min-h-0 hidden lg:block w-full py-6 lg:py-4" style={{ zIndex: 10 }}>
          {/* Container wrapper with fixed padding that never changes - Full width */}
          <div className="w-full h-full flex items-center justify-center" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
            {/* Blur Rectangle - Relative, no absolute positioning */}
            <div className="relative w-full flex items-center justify-center h-64 max-h-64 min-h-64 lg:h-64 lg:max-h-64 lg:min-h-64 bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 overflow-visible">
              {/* Content inside blur rectangle with internal padding */}
              <div className="w-full flex flex-col lg:flex-row items-center gap-3 lg:gap-6 lg:gap-8 px-4 lg:px-6 h-full overflow-visible">
                
                {/* Left Side - Text Content */}
                <motion.div 
                  className="flex-1 w-full lg:w-auto flex flex-col items-center lg:items-start justify-center ml-16 lg:ml-20 xl:ml-24 shrink min-w-0"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
                >
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black mb-2 lg:mb-3 xl:mb-4 leading-tight text-white text-center lg:text-left font-rounded tracking-tight w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.75rem, 2vw + 1rem, 4rem)' }}>
                    Hi, {childName || 'Math Magician'}! <br className="hidden lg:block" />
                   Ready for Number <br className="hidden lg:block" />
                   Magic - fun & sums ?
                  </h1>
                  
                  {/* Countdown Timer */}
                  <motion.div
                    className="w-full flex justify-center lg:justify-start flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ maxWidth: '100%', overflow: 'hidden' }}
                  >
                    <div className="flex items-center w-fit flex-wrap max-w-full" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.5rem)' }}>
                      {/* Clock */}
                      <motion.img 
                        src="/images/eng-clock.png" 
                        alt="Clock" 
                        className="w-12 lg:w-14 xl:w-16 object-contain flex-shrink-0"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ maxWidth: '100%', height: 'auto', width: 'clamp(3rem, 3vw + 0.75rem, 4rem)' }}
                    loading="lazy"
                    decoding="async"
                    width="64"
                    height="64"
                      />
                      
                      {/* Live In Text */}
                      <span className="font-extrabold text-white ml-2 lg:ml-3 xl:ml-4 flex-shrink-0" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                      
                      {/* Time Boxes with Spacing */}
                      <div className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 ml-2 lg:ml-3 xl:ml-4 flex-shrink-0">
                        <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 font-extrabold font-mono text-white min-w-10 lg:min-w-12 xl:min-w-16 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                          {formatTime(timeLeft.hours)}
                        </span>
                        <span className="text-white font-extrabold">:</span>
                        <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 font-extrabold font-mono text-white min-w-10 lg:min-w-12 xl:min-w-16 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                          {formatTime(timeLeft.minutes)}
                        </span>
                        <span className="text-white font-extrabold">:</span>
                        <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 font-extrabold font-mono text-white min-w-10 lg:min-w-12 xl:min-w-16 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                          {formatTime(timeLeft.seconds)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Top - maths-highlite.png Image */}
                {decorReady && (
                <motion.div 
                  className="absolute top-[-20] left-1/2 -translate-x-1/2 hidden lg:block"
                  style={{ zIndex: 20 }}
                  variants={chariotVariants}
                  initial="hidden"
                  animate="visible"
                >
                    <motion.div
                    className="w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-contain opacity-100 pointer-events-none"
                    animate={{ 
                      y: [0, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <OptimizedImage
                        src="/images/maths-highlite.png"
                        alt="Math highlight"
                        className="w-full h-auto object-contain"
                        width={700}
                        height={350}
                  />
                </motion.div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Join Now Button - Right Side of Hero Section - Smaller on Mobile */}
        <motion.div 
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-8 lg:right-8" 
          style={{ zIndex: 50 }}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <button 
            onClick={handleJoinNow}
            disabled={isJoining}
            className="bg-join-button border-2 sm:border-3 lg:border-4 border-yogi-yellow rounded-xl sm:rounded-2xl px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-4 flex items-center gap-1 sm:gap-2 lg:gap-3 shadow-join-button hover:shadow-join-button-hover hover:-translate-y-0.5 transition-all duration-200 relative z-50 cursor-pointer text-[10px] sm:text-xs lg:text-lg text-white font-extrabold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <motion.svg 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-6 lg:h-6 text-yellow-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
            <span className="text-white font-extrabold text-[10px] sm:text-xs lg:text-xl">
              {isJoining ? 'Joining...' : 'Join Now'}
            </span>
          </button>
        </motion.div>
      </div>
      
      {/* Success Toast */}
      <JoinSuccessToast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        childName={childName}
      />
    </div>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection


