import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Countdown timer logic - you can set a target date
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds += 1
        if (seconds >= 60) {
          seconds = 0
          minutes += 1
        }
        if (minutes >= 60) {
          minutes = 0
          hours += 1
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value) => String(value).padStart(2, '0')

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
    <div className="relative w-full hero-section-container overflow-x-hidden">
      {/* Hero Section Background with Gradient */}
      <div className="relative w-full min-h-[500px] md:h-[38vh] hero-gradient-exact overflow-hidden hero-bottom-rounded md:!min-h-[340px] md:!max-h-[360px]">

        {/* Main Content Container */}
        <div className="relative h-full min-h-[500px] md:min-h-0 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-center py-6 md:py-0" style={{ zIndex: 10 }}>
          {/* Single Blur Rectangle for All Content */}
          <div className="hero-unified-blur-background"></div>
          
          {/* All Content in One Container */}
          <div className="relative w-full flex flex-col md:flex-row items-center gap-6 md:gap-24 py-4 md:!ml-[-80px]" style={{ zIndex: 15 }}>
            {/* Left Side - Text Content */}
            <motion.div 
              className="flex-1 pl-0 w-full md:w-auto md:!-ml-8"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white hero-main-text">
                Namaste, Krishna! <br className="hidden md:block" />
               Ready for English Journey - <br className="hidden md:block" />Master mind?
              </h1>
              
              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="countdown-timer-box-exact">
                  {/* Om Symbol */}
                  <motion.img 
                    src="/images/om-symbol.png" 
                    alt="Om symbol" 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Live In Text */}
                  <span className="text-base sm:text-lg md:text-xl font-bold text-white ml-2 sm:ml-3 md:ml-4" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                  
                  {/* Time Boxes with Spacing */}
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 ml-2 sm:ml-3 md:ml-4">
                    <span className="countdown-time-box text-lg sm:text-xl md:text-2xl">
                      {formatTime(timeLeft.hours)}
                    </span>
                    <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">:</span>
                    <span className="countdown-time-box text-lg sm:text-xl md:text-2xl">
                      {formatTime(timeLeft.minutes)}
                    </span>
                    <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">:</span>
                    <span className="countdown-time-box text-lg sm:text-xl md:text-2xl">
                      {formatTime(timeLeft.seconds)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Highlight Image - Right Side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 12 }}>
          <img 
            src="/images/eng-highlight.png" 
            alt="English highlight" 
            className="w-auto h-auto object-contain max-w-full"
            style={{ maxHeight: '300px' }}
          />
        </div>

        {/* Cat Image - Left Side Bottom */}
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ zIndex: 15 }}>
          <img 
            src="/images/eng-cat.png" 
            alt="English cat" 
            className="w-auto h-auto object-contain max-w-full"
            style={{ maxHeight: '200px' }}
          />
        </div>

        {/* Join Now Button - Right Side of Hero Section */}
        <motion.div 
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8" 
          style={{ zIndex: 50 }}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <button className="join-now-button-exact-large text-sm sm:text-base md:text-lg">
            <motion.svg 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
            <span className="text-white font-bold text-base sm:text-lg md:text-xl ml-1 sm:ml-1.5 md:ml-2">Join Now</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection

