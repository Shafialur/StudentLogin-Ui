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
      <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:h-[38vh] hero-gradient-exact overflow-hidden hero-bottom-rounded md:!min-h-[340px] md:!max-h-[360px]">
        {/* Background Design Symbols - Left and Right Top Corners */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          <motion.div
            className="absolute top-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 -left-[60px] sm:-left-[80px] md:-left-[120px]"
            style={{ translateY: '-50%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <img 
              src="/images/background-design-symbol.png" 
              alt="Background design" 
              className="w-full h-full opacity-85 object-contain object-top max-w-full"
            />
          </motion.div>
          <motion.div
            className="absolute top-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 -right-[60px] sm:-right-[80px] md:-right-[120px]"
            style={{ translateY: '-50%', scaleX: -1 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <img 
              src="/images/background-design-symbol.png" 
              alt="Background design" 
              className="w-full h-full opacity-85 object-contain object-top max-w-full"
            />
          </motion.div>
        </div>

        {/* Background Clouds - Subtle White Cloud Shapes */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
         
          <img 
            src="/images/cloud2.png" 
            alt="Background cloud" 
            className="absolute top-24 left-1/3 opacity-100 w-28 h-20 object-contain"
          />
          <img 
            src="/images/cloud2.png" 
            alt="Background cloud" 
            className="absolute bottom-20 right-24 opacity-100 w-36 h-28 object-contain"
          />
        </div>

        {/* Main Cloud - Desktop: Bottom Right (unchanged) */}
        <div className="absolute right-0 pointer-events-none hidden md:block" style={{ zIndex: 18, bottom: '-80px' }}>
          <img 
            src="/images/main-cloud.png" 
            alt="Main cloud desktop" 
            className="object-contain max-w-full h-auto"
            style={{ width: '900px', height: 'auto', maxHeight: '450px' }}
          />
        </div>

        {/* Cloud at Bottom of Hero Section - Behind Chariot */}
        <div className="absolute bottom-0 pointer-events-none hidden md:block" style={{ zIndex: 8, left: '55%', transform: 'translateX(-50%)' }}>
          <img 
            src="/images/cloud2.png" 
            alt="Cloud at bottom" 
            className="object-contain opacity-80 max-w-full h-auto"
            style={{ width: '600px', height: 'auto' }}
          />
        </div>

        {/* Leaf - Behind Lotus Bottom Left */}
        <div className="absolute pointer-events-none hidden md:block" style={{ zIndex: 14, bottom: '-70px', left: '10px' }}>
          <img 
            src="/images/leaf.png" 
            alt="Leaf" 
            className="w-32 h-32 object-contain opacity-90 max-w-full h-auto"
          />
        </div>

        {/* Pink Lotus Flower - Bottom Left */}
        <motion.div 
          className="absolute bottom-0 left-0 pointer-events-none hidden md:block" 
          style={{ zIndex: 15 }}
          animate={{ 
            scale: [1, 1.05, 1],
            filter: [
              'drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))',
              'drop-shadow(0 0 25px rgba(255, 105, 180, 0.9))',
              'drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src="/images/lotus.png" 
            alt="Lotus flower" 
            className="w-44 h-44 object-contain opacity-100 max-w-full h-auto"
          />
        </motion.div>

        <motion.div 
          className="absolute bottom-[-10px] left-0 pointer-events-none hidden md:block" 
          style={{ zIndex: 15, left: '45%' }}
          animate={{ 
            scale: [1, 1.08, 1],
            filter: [
              'drop-shadow(0 0 8px rgba(255, 182, 193, 0.5))',
              'drop-shadow(0 0 20px rgba(255, 105, 180, 0.8))',
              'drop-shadow(0 0 8px rgba(255, 182, 193, 0.5))'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <img 
            src="/images/lotus.png" 
            alt="Lotus flower" 
            className="w-32 h-32 object-contain opacity-80 max-w-full h-auto"
          />
        </motion.div>

        {/* Lotus1 - Bottom Center */}
        <motion.div 
          className="absolute bottom-0 pointer-events-none hidden md:block" 
          style={{ zIndex: 15, left: '7%' }}
          animate={{ 
            scale: [1, 1.06, 1],
            filter: [
              'drop-shadow(0 0 10px rgba(255, 200, 200, 0.6))',
              'drop-shadow(0 0 25px rgba(255, 150, 180, 0.9))',
              'drop-shadow(0 0 10px rgba(255, 200, 200, 0.6))'
            ]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <img 
            src="/images/lotus1.png" 
            alt="Lotus flower" 
            className="w-14 h-14 object-contain opacity-100 max-w-full h-auto"
          />
        </motion.div>

        {/* Mobile View - Unchanged */}
        <div className="relative h-full min-h-[320px] sm:min-h-[360px] md:hidden w-full max-w-full mx-0 flex flex-col items-center justify-center py-2 sm:py-3 scale-85 sm:scale-90" style={{ zIndex: 10, paddingLeft: '8px', paddingRight: '8px' }}>
          {/* Single Blur Rectangle for All Content - Mobile Only */}
          <div className="hero-unified-blur-background-mobile"></div>
          
          {/* Clipping Container for Mobile Cloud - Matches blur rectangle bounds with overflow to show 90% */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none overflow-hidden" style={{ zIndex: 24, height: '320px', maxHeight: '320px', borderRadius: '24px', marginLeft: '8px', marginRight: '8px' }}>
            {/* Mobile Main Cloud - Right bottom, 90% inside, small portion outside */}
            <div className="absolute pointer-events-none" style={{ right: '-30px', bottom: '-20px' }}>
              <img 
                src="/images/main-cloud.png" 
                alt="Main cloud mobile" 
                className="object-contain"
                style={{ width: '380px', height: 'auto', maxHeight: '190px' }}
              />
            </div>
          </div>
          
          {/* Mobile Content */}
          <div className="relative w-full flex flex-col items-center gap-2 sm:gap-3 py-2 sm:py-3" style={{ zIndex: 15, paddingLeft: '8px', paddingRight: '8px' }}>
            
            {/* Small Clouds Behind Chariot - Mobile and Tablet */}
            {/* Left Small Cloud */}
            <div className="absolute pointer-events-none block lg:hidden" style={{ zIndex: 12, left: '10%', top: '65%', transform: 'translateY(-50%)' }}>
              <img 
                src="/images/cloud2.png" 
                alt="Small cloud left" 
                className="object-contain opacity-80"
                style={{ width: '80px', height: 'auto' }}
              />
            </div>
            {/* Right Small Cloud */}
            <div className="absolute pointer-events-none block lg:hidden" style={{ zIndex: 12, right: '15%', top: '65%', transform: 'translateY(-50%)' }}>
              <img 
                src="/images/cloud2.png" 
                alt="Small cloud right" 
                className="object-contain opacity-80"
                style={{ width: '80px', height: 'auto' }}
              />
            </div>
            
            {/* Left Side - Text Content */}
            <motion.div 
              className="flex-1 pl-0 w-full md:w-auto md:!-ml-8 flex flex-col items-center md:items-start"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-white hero-main-text text-center md:text-left">
                Namaste, Krishna! <br className="hidden md:block" />
               Ready for Gita Wisdom - <br className="hidden md:block" />Inner Peace?
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
                    src="/images/om-symbol.png" 
                    alt="Om symbol" 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
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
                {/* Sun Behind Chariot */}
                <motion.div 
                  className="absolute block -top-[8%] md:top-[0%]" 
                  style={{ zIndex: 16, left: '10%', transform: 'translate(-50%, -50%)' }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="sun-glow"></div>
                </motion.div>
                
                {/* Small Cloud 1 - Near Chariot */}
                <motion.div 
                  className="absolute hidden md:block" 
                  style={{ zIndex: 8, top: '20%', right: '70%' }}
                  animate={cloudAnimation}
                >
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud near chariot" 
                    className="object-contain opacity-100 max-w-full h-auto"
                    style={{ width: '150px', height: 'auto' }}
                  />
                </motion.div>
                
                {/* Small Cloud 2 - Near Chariot */}
                <motion.div 
                  className="absolute hidden md:block" 
                  style={{ zIndex: 8, top: '40%', right: '-60px' }}
                  animate={{ x: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud near chariot" 
                    className="object-contain opacity-100 max-w-full h-auto"
                    style={{ width: '180px', height: 'auto' }}
                  />
                </motion.div>
                
                {/* Chariot - Main Illustration */}
                <motion.div 
                  className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[380px] md:!w-[520px] md:!h-[320px] md:!mt-[45px] h-auto scale-75 sm:scale-75 md:scale-100"
                  style={{ zIndex: 20, position: 'relative' }}
                  animate={floatAnimation}
                >
                  <img 
                    src="/images/chariot.png.png" 
                    alt="Krishna and Arjuna in chariot" 
                    className="w-full h-full object-contain max-w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tablet and Desktop View - Container-based blur rectangle */}
        <div className="relative h-full min-h-0 hidden md:block w-full py-6 md:py-8" style={{ zIndex: 10 }}>
          {/* Container wrapper with fixed padding that never changes - Full width */}
          <div className="w-full h-full flex items-center justify-center" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
            {/* Blur Rectangle - Relative, no absolute positioning */}
            <div className="hero-unified-blur-background-tablet-desktop relative w-full flex items-center justify-center" style={{ height: '280px', maxHeight: '280px', minHeight: '280px' }}>
              {/* Content inside blur rectangle with internal padding */}
              <div className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 px-6 md:px-8">
                
                {/* Small Clouds Behind Chariot - Tablet Only */}
                {/* Left Small Cloud */}
                <div className="absolute pointer-events-none hidden md:block lg:hidden" style={{ zIndex: 12, left: '10%', top: '65%', transform: 'translateY(-50%)' }}>
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud left" 
                    className="object-contain opacity-80"
                    style={{ width: '80px', height: 'auto' }}
                  />
                </div>
                {/* Right Small Cloud */}
                <div className="absolute pointer-events-none hidden md:block lg:hidden" style={{ zIndex: 12, right: '15%', top: '65%', transform: 'translateY(-50%)' }}>
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud right" 
                    className="object-contain opacity-80"
                    style={{ width: '80px', height: 'auto' }}
                  />
                </div>
                
                {/* Left Side - Text Content */}
                <motion.div 
                  className="flex-1 w-full md:w-auto flex flex-col items-center md:items-start ml-20 md:ml-24 lg:ml-28"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white hero-main-text text-center md:text-left">
                    Namaste, Krishna! <br className="hidden md:block" />
                   Ready for Gita Wisdom - <br className="hidden md:block" />Inner Peace?
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
                        src="/images/om-symbol.png" 
                        alt="Om symbol" 
                        className="w-12 md:w-14 object-contain flex-shrink-0"
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
                    {/* Sun Behind Chariot */}
                    <motion.div 
                      className="absolute block" 
                      style={{ zIndex: 16, top: '0%', left: '10%', transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="sun-glow"></div>
                    </motion.div>
                    
                    {/* Small Cloud 1 - Near Chariot */}
                    <motion.div 
                      className="absolute hidden md:block" 
                      style={{ zIndex: 8, top: '20%', right: '70%' }}
                      animate={cloudAnimation}
                    >
                      <img 
                        src="/images/cloud2.png" 
                        alt="Small cloud near chariot" 
                        className="object-contain opacity-100 max-w-full h-auto"
                        style={{ width: '150px', height: 'auto' }}
                      />
                    </motion.div>
                    
                    {/* Small Cloud 2 - Near Chariot */}
                    <motion.div 
                      className="absolute hidden md:block" 
                      style={{ zIndex: 8, top: '40%', right: '-60px' }}
                      animate={{ x: [0, -15, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img 
                        src="/images/cloud2.png" 
                        alt="Small cloud near chariot" 
                        className="object-contain opacity-100 max-w-full h-auto"
                        style={{ width: '180px', height: 'auto' }}
                      />
                    </motion.div>
                    
                    {/* Chariot - Main Illustration */}
                    <motion.div 
                      className="w-full max-w-[380px] md:!w-[520px] md:!h-[320px] md:!mt-[45px] h-auto"
                      style={{ zIndex: 20, position: 'relative' }}
                      animate={floatAnimation}
                    >
                      <img 
                        src="/images/chariot.png.png" 
                        alt="Krishna and Arjuna in chariot" 
                        className="w-full h-full object-contain max-w-full"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

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

