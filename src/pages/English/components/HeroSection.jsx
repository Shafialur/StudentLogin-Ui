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
    <div className="relative w-full hero-section-container overflow-x-hidden -mx-0 md:-mx-0" style={{ marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }}>
      {/* Hero Section Background with Gradient */}
      <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:h-[38vh] hero-gradient-english overflow-hidden hero-bottom-rounded md:!min-h-[340px] md:!max-h-[360px]">

        {/* Mobile View - Unchanged */}
        <div className="relative h-full min-h-[320px] sm:min-h-[360px] md:hidden w-full max-w-full mx-0 flex flex-col items-center justify-start py-2 sm:py-3 scale-85 sm:scale-90" style={{ zIndex: 10, paddingLeft: '8px', paddingRight: '8px', overflow: 'hidden' }}>
          {/* Single Blur Rectangle for All Content - Mobile Only */}
          <div className="hero-unified-blur-background-mobile"></div>
          
          
          {/* Mobile Content */}
          <div className="relative w-full flex flex-col items-center gap-2 sm:gap-3" style={{ zIndex: 15, paddingLeft: '8px', paddingRight: '8px', paddingTop: '16px' }}>
            
            {/* Left Side - Text Content - At Top */}
            <motion.div 
              className="flex-1 pl-0 w-full md:w-auto md:!-ml-8 flex flex-col items-center md:items-start relative"
              style={{ zIndex: 25 }}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-6 leading-tight text-white hero-main-text text-center md:text-left px-4 md:px-0">
                Hi, Krishna! <br className="hidden md:block" />
               Ready for English Journey - <br className="hidden md:block" />Master Mind?
              </h1>
              
              {/* Countdown Timer */}
              <motion.div
                className="w-full flex justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="countdown-timer-box-exact sm:scale-90 md:scale-100">
                  {/* Om Symbol */}
                  <motion.img 
                    src="/images/eng-clock.png" 
                    alt="English clock" 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain flex-shrink-0 opacity-80"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Live In Text */}
                  <span className="text-base sm:text-lg md:text-xl font-bold text-white ml-2 sm:ml-3 md:ml-4" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                  
                  {/* Time Boxes with Spacing */}
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 ml-2 sm:ml-3 md:ml-4 sm:flex-wrap">
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
            {/* Right Side - Chariot */}
            <motion.div 
              className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto md:!mr-[-60px] -mt-2 md:mt-0" 
              style={{ zIndex: 20 }}
              variants={chariotVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col items-center justify-center relative translate-y-0 md:!-translate-y-[30px]">
              </div>
            </motion.div>
          </div>
          
          {/* Highlight Image - Separate in Hero Section - Mobile Only */}
          <motion.div 
            className="pointer-events-none md:hidden absolute" 
            style={{ 
              zIndex: 20,
              bottom: '-95px',
              left: '60%',
              transform: 'translateX(-50%)',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]"
              animate={{ 
                y: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="/images/eng-highlight.png" 
                alt="English highlight" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Tablet and Desktop View - Container-based blur rectangle */}
        <div className="relative h-full min-h-0 hidden md:block w-full py-6 md:py-8" style={{ zIndex: 10 }}>
          {/* Container wrapper with fixed padding that never changes - Full width */}
          <div className="w-full h-full flex items-center justify-center" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
            {/* Blur Rectangle - Relative, no absolute positioning */}
            <div className="hero-unified-blur-background-tablet-desktop relative w-full flex items-center justify-center" style={{ height: '280px', maxHeight: '280px', minHeight: '280px' }}>
              {/* Content inside blur rectangle with internal padding */}
              <div className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 px-6 md:px-8">
                
                
                {/* Left Side - Text Content */}
                <motion.div 
                  className="flex-1 w-full md:w-auto flex flex-col items-center md:items-start ml-20 md:ml-24 lg:ml-28"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white hero-main-text text-center md:text-left">
                    Hi, Krishna! <br className="hidden md:block" />
                   Ready for English Journey - <br className="hidden md:block" />Master Mind?
                  </h1>
                  
                  {/* Countdown Timer */}
                  <motion.div
                    className="w-full flex justify-center md:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="countdown-timer-box-exact">
                      {/* Om Symbol */}
                      <motion.img 
                        src="/images/eng-clock.png" 
                        alt="English clock" 
                        className="w-14 md:w-16 object-contain flex-shrink-0 opacity-80"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Live In Text */}
                      <span className="text-lg md:text-xl font-bold text-white ml-3 md:ml-4" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                      
                      {/* Time Boxes with Spacing */}
                      <div className="flex items-center gap-2.5 md:gap-3 ml-3 md:ml-4">
                        <span className="countdown-time-box text-xl md:text-2xl">
                          {formatTime(timeLeft.hours)}
                        </span>
                        <span className="text-white text-xl md:text-2xl font-bold">:</span>
                        <span className="countdown-time-box text-xl md:text-2xl">
                          {formatTime(timeLeft.minutes)}
                        </span>
                        <span className="text-white text-xl md:text-2xl font-bold">:</span>
                        <span className="countdown-time-box text-xl md:text-2xl">
                          {formatTime(timeLeft.seconds)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Side - Chariot */}
                <motion.div 
                  className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-auto mr-28 md:mr-32 lg:mr-36" 
                  style={{ zIndex: 20 }}
                  variants={chariotVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex flex-col items-center justify-center relative md:-translate-y-[30px]">
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* English Cat - Left Bottom Corner */}
        <motion.div 
          className="absolute bottom-0 left-0 pointer-events-none" 
          style={{ zIndex: 25 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img 
            src="/images/eng-cat.png" 
            alt="English cat" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-48 md:h-48 object-contain"
          />
        </motion.div>

        {/* English Clouds - Behind Highlight Image */}
        <div 
          className="absolute left-1/2 pointer-events-none" 
          style={{ 
            zIndex: 15,
            bottom: '50px',
            transform: 'translateX(-40%)',
            width: '100%',
            height: '200px'
          }}
        >
          {/* Cloud 1 - Left */}
          <motion.img 
            src="/images/eng-cloud.png" 
            alt="English cloud" 
            className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-64 md:h-64 object-contain opacity-80"
            style={{ 
              left: 'calc(50% - 250px)',
              bottom: '0px'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.8,
              y: [0, -15, 0],
              x: [0, -10, 0]
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }
            }}
          />
          {/* Cloud 2 - Center */}
          <motion.img 
            src="/images/eng-cloud.png" 
            alt="English cloud" 
            className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-72 md:h-72 object-contain opacity-90"
            style={{ 
              left: '50%',
              bottom: '20px',
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.9,
              y: [0, -20, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          />
          {/* Owl - Front of Center Cloud - Hidden on Mobile */}
          <motion.img 
            src="/images/eng-owl.png" 
            alt="English owl" 
            className="hidden md:block absolute object-contain"
            style={{ 
              left: '50%',
              bottom: '150px',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '120px',
              zIndex: 16
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
            }}
          />
          {/* Cloud 3 - Right */}
          <motion.img 
            src="/images/eng-cloud.png" 
            alt="English cloud" 
            className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-64 md:h-64 object-contain opacity-80"
            style={{ 
              left: 'calc(50% + 250px)',
              bottom: '0px'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.8,
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
        </div>

        {/* English Highlight - Center (Inside overflow-hidden container) - Hidden on Mobile */}
        <motion.div 
          className="hidden md:block pointer-events-none" 
          style={{ 
            position: 'absolute',
            top: '53%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            bottom: 'auto',
            right: 'auto'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[700px] md:h-[700px]"
            animate={{ 
              y: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/images/eng-highlight.png" 
              alt="English highlight" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Join Now Button - Right Side of Hero Section - Smaller on Mobile */}
        <motion.div 
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-8 md:right-8 scale-[0.45] sm:scale-60 md:scale-100" 
          style={{ zIndex: 50 }}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <button className="join-now-button-exact-large text-xs sm:text-sm md:text-lg">
            <motion.svg 
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-yellow-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
            <span className="text-white font-bold text-xs sm:text-sm md:text-xl ml-0.5 sm:ml-1 md:ml-2">Join Now</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection

