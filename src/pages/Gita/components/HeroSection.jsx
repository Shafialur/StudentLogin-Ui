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
    <div className="relative w-full overflow-x-hidden m-0 p-0">
      {/* Hero Section Background with Gradient */}
      <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:h-[36vh] bg-gita-gradient overflow-hidden rounded-b-hero-bottom-mobile md:rounded-b-hero-bottom-desktop md:min-h-[320px] md:max-h-[340px]">
        {/* Background Design Symbols - Left and Right Top Corners */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <motion.div
            className="absolute top-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 -left-16 sm:-left-20 md:-left-32"
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
            className="absolute top-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 -right-16 sm:-right-20 md:-right-32"
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
        <div className="absolute inset-0 pointer-events-none z-[2]">
         
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
        <div className="absolute right-0 pointer-events-none hidden md:block z-[18] -bottom-20">
          <img 
            src="/images/main-cloud.png" 
            alt="Main cloud desktop" 
            className="object-contain max-w-full h-auto"
            style={{ width: '900px', height: 'auto', maxHeight: '450px' }}
          />
        </div>

        {/* Cloud at Bottom of Hero Section - Behind Chariot */}
        <div className="absolute bottom-[-20px] pointer-events-none hidden md:block" style={{ zIndex: 8, left: '55%', transform: 'translateX(-50%)' }}>
          <img 
            src="/images/cloud2.png" 
            alt="Cloud at bottom" 
            className="object-contain opacity-80 max-w-full h-auto"
            style={{ width: '650px', height: 'auto' }}
          />
        </div>

        {/* Pink Lotus Flower - Bottom Left */}
        <motion.div 
          className="absolute pointer-events-none hidden md:block" 
          style={{ zIndex: 15, bottom: '-20px', left: '-20px' }}
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
            className="w-44 h-auto object-contain opacity-100 max-w-full"
          />
        </motion.div>

        <motion.div 
          className="absolute bottom-[-10px] left-0 pointer-events-none hidden md:block" 
          style={{ zIndex: 15, left: '45%', bottom: '-20px'}}
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
            className="w-32 h-auto object-contain opacity-80 max-w-full"
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
            className="w-14 h-auto object-contain opacity-100 max-w-full"
          />
        </motion.div>

        {/* Mobile View - Responsive */}
        <div className="relative h-full min-h-[320px] sm:min-h-[360px] md:hidden w-full max-w-full mx-0 flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4" style={{ zIndex: 10 }}>
          {/* Single Blur Rectangle for All Content - Mobile Only */}
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-[280px] sm:h-[320px] max-h-[340px] w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 z-[1] pointer-events-none overflow-visible"></div>
          
          {/* Clipping Container for Mobile Cloud - Matches blur rectangle bounds with overflow to show 90% */}
          <div className="absolute top-1/2 left-3 right-3 transform -translate-y-1/2 pointer-events-none overflow-hidden h-[280px] sm:h-[320px] max-h-[340px] rounded-3xl" style={{ zIndex: 24 }}>
            {/* Mobile Main Cloud - Right bottom, 90% inside, small portion outside */}
            <div className="absolute pointer-events-none -right-4 sm:-right-6 -bottom-3 sm:-bottom-4">
              <img 
                src="/images/main-cloud.png" 
                alt="Main cloud mobile" 
                className="object-contain w-64 h-auto sm:w-80 sm:max-h-40"
              />
            </div>
          </div>
          
          {/* Mobile Content - Optimized Layout */}
          <div className="relative w-full flex flex-col items-center justify-between h-full py-3 sm:py-4 px-2 sm:px-3 overflow-hidden" style={{ zIndex: 15, minHeight: '280px', maxHeight: '100%' }}>
            
            {/* Small Clouds Behind Chariot - Mobile and Tablet */}
            {/* Left Small Cloud */}
            <div className="absolute pointer-events-none block lg:hidden left-[3%] sm:left-[8%] top-[55%] sm:top-[60%] -translate-y-1/2 z-[12]">
              <img 
                src="/images/cloud2.png" 
                alt="Small cloud left" 
                className="object-contain opacity-80 w-14 h-auto sm:w-18"
              />
            </div>
            {/* Right Small Cloud */}
            <div className="absolute pointer-events-none block lg:hidden right-[3%] sm:right-[12%] top-[55%] sm:top-[60%] -translate-y-1/2 z-[12]">
              <img 
                src="/images/cloud2.png" 
                alt="Small cloud right" 
                className="object-contain opacity-80 w-14 h-auto sm:w-18"
              />
            </div>
            
            {/* Top Section - Text Content */}
            <motion.div 
              className="w-full flex flex-col items-center text-center flex-shrink-0 min-w-0"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
            >
              <h1 className="text-xl sm:text-2xl font-black mb-1.5 sm:mb-2 leading-tight text-white font-rounded tracking-tight px-1 w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.5rem, 4vw + 0.75rem, 2.25rem)' }}>
                Namaste, Krishna!<br />
                Ready for Gita Wisdom -<br />
                Inner Peace?
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
                  {/* Om Symbol */}
                  <motion.img 
                    src="/images/om-symbol.png" 
                    alt="Om symbol" 
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

            {/* Bottom Section - Chariot */}
            <motion.div 
              className="flex-shrink-0 flex justify-center w-full mt-auto" 
              style={{ zIndex: 20 }}
              variants={chariotVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col items-center justify-center relative">
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
                    style={{ width: '200px', height: 'auto' }}
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
                  className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-96 md:w-[520px] md:h-80 md:mt-12 h-auto"
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
        <div className="relative h-full min-h-0 hidden md:block w-full py-6 md:py-4" style={{ zIndex: 10 }}>
          {/* Container wrapper with fixed padding that never changes - Full width */}
          <div className="w-full h-full flex items-center justify-center" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
            {/* Blur Rectangle - Relative, no absolute positioning */}
            <div className="relative w-full flex items-center justify-center h-64 max-h-64 min-h-64 md:h-64 md:max-h-64 md:min-h-64 bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 overflow-visible">
              {/* Content inside blur rectangle with internal padding */}
              <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-6 lg:gap-8 px-4 md:px-6 h-full overflow-visible">
                
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
                  className="flex-1 w-full md:w-auto flex flex-col items-center md:items-start justify-center ml-16 md:ml-20 lg:ml-24 shrink min-w-0"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
                >
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 md:mb-3 lg:mb-4 leading-tight text-white text-center md:text-left font-rounded tracking-tight w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.75rem, 2vw + 1rem, 4rem)' }}>
                    Namaste, Krishna! <br className="hidden md:block" />
                   Ready for Gita Wisdom - <br className="hidden md:block" />Inner Peace?
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
                      {/* Om Symbol */}
                      <motion.img 
                        src="/images/om-symbol.png" 
                        alt="Om symbol" 
                        className="w-12 md:w-14 lg:w-16 object-contain flex-shrink-0"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ maxWidth: '100%', height: 'auto', width: 'clamp(3rem, 3vw + 0.75rem, 4rem)' }}
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
                        style={{ width: '200px', height: 'auto' }}
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
}

export default HeroSection


