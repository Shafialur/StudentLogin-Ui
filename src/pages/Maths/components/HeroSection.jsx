import React, { useState, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'

const HeroSection = memo(({ childName = 'Math Magician', classDetails }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [decorReady, setDecorReady] = useState(false)

  const toISTDate = useCallback((dateStr, timeStr) => {
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

    const tick = () => {
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
    const handle = idleCb
      ? idleCb(() => setDecorReady(true), { timeout: 300 })
      : setTimeout(() => setDecorReady(true), 120)

    return () => {
      if (idleCb && handle) {
        window.cancelIdleCallback(handle)
      }
      if (!idleCb && handle) {
        clearTimeout(handle)
      }
    }
  }, [])

  const formatTime = useCallback((value) => String(value).padStart(2, '0'), [])

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const chariotVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const cloudAnimation = {
    x: [0, 20, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const buttonVariants = {
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
  }

  return (
    <div className="relative w-full overflow-x-hidden m-0 p-0">
      {/* Hero Section Background with Gradient */}
      <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:h-[36vh] bg-english-gradient overflow-hidden rounded-b-hero-bottom-mobile md:rounded-b-hero-bottom-desktop md:min-h-[320px] md:max-h-[340px]">

        {/* Mobile View - Responsive */}
        <div className="relative h-full min-h-[320px] sm:min-h-[360px] md:hidden w-full max-w-full mx-0 flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4" style={{ zIndex: 10 }}>
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
          <motion.img 
            src="/images/maths-highlite.png" 
            alt="Math highlight" 
            className="absolute bottom-0 left-[35%] -translate-x-1/2 w-72 h-auto object-contain opacity-100 pointer-events-none md:hidden"
            style={{ zIndex: 20 }}
            animate={{ 
              y: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            loading="lazy"
            decoding="async"
            width="288"
            height="180"
          />
        )}

        {/* Tablet and Desktop View - Container-based blur rectangle */}
        <div className="relative h-full min-h-0 hidden md:block w-full py-6 md:py-4" style={{ zIndex: 10 }}>
          {/* Container wrapper with fixed padding that never changes - Full width */}
          <div className="w-full h-full flex items-center justify-center" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
            {/* Blur Rectangle - Relative, no absolute positioning */}
            <div className="relative w-full flex items-center justify-center h-64 max-h-64 min-h-64 md:h-64 md:max-h-64 md:min-h-64 bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 overflow-visible">
              {/* Content inside blur rectangle with internal padding */}
              <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-6 lg:gap-8 px-4 md:px-6 h-full overflow-visible">
                
                {/* Left Side - Text Content */}
                <motion.div 
                  className="flex-1 w-full md:w-auto flex flex-col items-center md:items-start justify-center ml-16 md:ml-20 lg:ml-24 shrink min-w-0"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 md:mb-3 lg:mb-4 leading-tight text-white text-center md:text-left font-rounded tracking-tight w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.75rem, 2vw + 1rem, 4rem)' }}>
                    Hi, {childName || 'Math Magician'}! <br className="hidden md:block" />
                   Ready for Number <br className="hidden md:block" />
                   Magic - fun & sums ?
                  </h1>
                  
                  {/* Countdown Timer */}
                  <motion.div
                    className="w-full flex justify-center md:justify-start flex-shrink-0"
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
                        className="w-12 md:w-14 lg:w-16 object-contain flex-shrink-0"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ maxWidth: '100%', height: 'auto', width: 'clamp(3rem, 3vw + 0.75rem, 4rem)' }}
                    loading="lazy"
                    decoding="async"
                    width="64"
                    height="64"
                      />
                      
                      {/* Live In Text */}
                      <span className="font-extrabold text-white ml-2 md:ml-3 lg:ml-4 flex-shrink-0" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                      
                      {/* Time Boxes with Spacing */}
                      <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3 ml-2 md:ml-3 lg:ml-4 flex-shrink-0">
                        <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 font-extrabold font-mono text-white min-w-10 md:min-w-12 lg:min-w-16 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                          {formatTime(timeLeft.hours)}
                        </span>
                        <span className="text-white font-extrabold">:</span>
                        <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 font-extrabold font-mono text-white min-w-10 md:min-w-12 lg:min-w-16 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                          {formatTime(timeLeft.minutes)}
                        </span>
                        <span className="text-white font-extrabold">:</span>
                        <span className="bg-white/35 backdrop-blur-sm border-2 border-white/50 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 font-extrabold font-mono text-white min-w-10 md:min-w-12 lg:min-w-16 text-center leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                          {formatTime(timeLeft.seconds)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Top - maths-highlite.png Image */}
                {decorReady && (
                  <motion.div 
                    className="absolute top-[-20] left-1/2 -translate-x-1/2 hidden md:block"
                    style={{ zIndex: 20 }}
                    variants={chariotVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.img 
                      src="/images/maths-highlite.png" 
                      alt="Math highlight" 
                      className="w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-contain opacity-100 pointer-events-none"
                      animate={{ 
                        y: [0, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      loading="lazy"
                      decoding="async"
                      width="700"
                      height="350"
                    />
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Join Now Button - Right Side of Hero Section - Smaller on Mobile */}
        <motion.div 
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-8 md:right-8" 
          style={{ zIndex: 50 }}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <button className="bg-join-button border-2 sm:border-3 md:border-4 border-yogi-yellow rounded-xl sm:rounded-2xl px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 flex items-center gap-1 sm:gap-2 md:gap-3 shadow-join-button hover:shadow-join-button-hover hover:-translate-y-0.5 transition-all duration-200 relative z-50 cursor-pointer text-[10px] sm:text-xs md:text-lg text-white font-extrabold">
            <motion.svg 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-6 md:h-6 text-yellow-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
            <span className="text-white font-extrabold text-[10px] sm:text-xs md:text-xl">Join Now</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
