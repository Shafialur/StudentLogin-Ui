import { useState, useEffect, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import JoinSuccessToast from './JoinSuccessToast'
import OptimizedImage from './OptimizedImage'
import { useClassTimer } from '../hooks/useClassTimer'
import { useAutoJoin } from '../hooks/useAutoJoin'
import { useJoinQueue } from '../hooks/useJoinQueue'
import type { ClassDetails } from '../types/common'
import type { HeroTheme } from '../config/subjectThemes'

interface HeroSectionProps {
  childName?: string
  classDetails?: ClassDetails
  code?: string
  theme: HeroTheme
}

const HeroSection = memo(({ childName, classDetails, code, theme }: HeroSectionProps) => {
  const { timeLeft, formatTime } = useClassTimer(classDetails)
  useAutoJoin(code)
  const { showToast, setShowToast, isJoining, handleJoinNow } = useJoinQueue(code)
  const [decorReady, setDecorReady] = useState<boolean>(false)

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

  // Memoized animation variants
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

  const floatAnimation = useMemo(() => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }), [])

  const cloudAnimation = useMemo(() => ({
    x: [0, 20, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const
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

  // Determine if this is Gita theme (has chariot)
  const isGitaTheme = theme.decorativeImages.chariot !== undefined
  const isEnglishTheme = theme.decorativeImages.desktopOwl !== undefined
  const isMathsTheme = !isGitaTheme && !isEnglishTheme

  return (
    <div className="relative w-full overflow-x-hidden m-0 p-0">
      {/* Hero Section Background with Gradient */}
      <div className={`relative w-full min-h-[320px] sm:min-h-[360px] lg:h-[36vh] ${theme.gradientClass} overflow-hidden rounded-b-hero-bottom-mobile lg:rounded-b-hero-bottom-desktop lg:min-h-[320px] lg:max-h-[340px]`}>
        {/* Gita-specific: Background Design Symbols */}
        {isGitaTheme && decorReady && theme.decorativeImages.backgroundDesignSymbol && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
            <motion.div
              className="absolute top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 -left-16 sm:-left-20 lg:-left-32"
              style={{ translateY: '-50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <img 
                src="/images/background-design-symbol.png" 
                alt="Background design" 
                className="w-full h-full opacity-85 object-contain object-top max-w-full"
                loading="lazy"
                decoding="async"
                width={384}
                height={384}
              />
            </motion.div>
            <motion.div
              className="absolute top-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 -right-16 sm:-right-20 lg:-right-32"
              style={{ translateY: '-50%', scaleX: -1 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <img 
                src="/images/background-design-symbol.png" 
                alt="Background design" 
                className="w-full h-full opacity-85 object-contain object-top max-w-full"
                loading="lazy"
                decoding="async"
                width={384}
                height={384}
              />
            </motion.div>
          </div>
        )}

        {/* Gita-specific: Background Clouds */}
        {isGitaTheme && decorReady && theme.decorativeImages.cloud2 && (
          <div className="absolute inset-0 pointer-events-none z-[2]">
            {theme.decorativeImages.cloud2.map((cloud, idx) => (
              <img 
                key={idx}
                src="/images/cloud2.png" 
                alt="Background cloud" 
                className={`absolute opacity-100 object-contain ${
                  cloud.position.top === '24' ? 'top-24 left-1/3 w-28 h-20' : 'bottom-20 right-24 w-36 h-28'
                }`}
                loading="lazy"
                decoding="async"
                width={cloud.position.top === '24' ? 112 : 144}
                height={cloud.position.top === '24' ? 80 : 112}
              />
            ))}
          </div>
        )}

        {/* Gita-specific: Main Cloud Desktop */}
        {isGitaTheme && decorReady && theme.decorativeImages.desktopMain && (
          <div className="absolute right-0 pointer-events-none hidden lg:block z-[18] -bottom-20">
            <OptimizedImage
              src={theme.decorativeImages.desktopMain.src}
              alt={theme.decorativeImages.desktopMain.alt}
              className="object-contain max-w-full h-auto"
              style={{ width: '900px', height: 'auto', maxHeight: '450px' }}
              width={900}
              height={450}
            />
          </div>
        )}

        {/* Gita-specific: Cloud at Bottom Behind Chariot */}
        {isGitaTheme && decorReady && theme.decorativeImages.desktopHighlight && (
          <div className="absolute bottom-[-20px] pointer-events-none hidden lg:block" style={{ zIndex: 8, left: '55%', transform: 'translateX(-50%)' }}>
            <img 
              src="/images/cloud2.png" 
              alt="Cloud at bottom" 
              className="object-contain opacity-80 max-w-full h-auto"
              style={{ width: '650px', height: 'auto' }}
              loading="lazy"
              decoding="async"
              width={650}
              height={300}
            />
          </div>
        )}

        {/* Gita-specific: Lotus Flowers */}
        {isGitaTheme && decorReady && theme.decorativeImages.lotus && (
          <>
            {theme.decorativeImages.lotus.map((lotus, idx) => (
              <motion.div 
                key={idx}
                className="absolute pointer-events-none hidden lg:block" 
                style={{ 
                  zIndex: 15, 
                  bottom: lotus.position.bottom || '0',
                  left: lotus.position.left || '0'
                }}
                animate={{ 
                  scale: [1, idx === 0 ? 1.05 : idx === 1 ? 1.08 : 1.06, 1],
                  filter: [
                    'drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))',
                    'drop-shadow(0 0 25px rgba(255, 105, 180, 0.9))',
                    'drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))'
                  ]
                }}
                transition={{ 
                  duration: idx === 1 ? 4 : 3.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: idx === 1 ? 1 : idx === 2 ? 0.5 : 0
                }}
              >
                <img 
                  src={lotus.src}
                  alt="Lotus flower" 
                  className={`h-auto object-contain opacity-100 max-w-full ${
                    idx === 0 ? 'w-44' : idx === 1 ? 'w-32 opacity-80' : 'w-14'
                  }`}
                  loading="lazy"
                  decoding="async"
                  width={idx === 0 ? 176 : idx === 1 ? 128 : 56}
                  height={idx === 0 ? 176 : idx === 1 ? 128 : 56}
                />
              </motion.div>
            ))}
          </>
        )}

        {/* Mobile View */}
        <div className="relative h-full min-h-[320px] sm:min-h-[360px] lg:hidden w-full max-w-full mx-0 flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4" style={{ zIndex: 10 }}>
          <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-[280px] sm:h-[320px] max-h-[340px] w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 z-[1] pointer-events-none overflow-visible"></div>
          
          {/* Gita Mobile: Clipping Container for Mobile Cloud */}
          {isGitaTheme && (
            <div className="absolute top-1/2 left-3 right-3 transform -translate-y-1/2 pointer-events-none overflow-hidden h-[280px] sm:h-[320px] max-h-[340px] rounded-3xl" style={{ zIndex: 24 }}>
              <div className="absolute pointer-events-none -right-4 sm:-right-6 -bottom-3 sm:-bottom-4">
                <img 
                  src="/images/main-cloud.png" 
                  alt="Main cloud mobile" 
                  className="object-contain w-64 h-auto sm:w-80 sm:max-h-40"
                />
              </div>
            </div>
          )}
          
          <div className="relative w-full flex flex-col items-center justify-between h-full py-3 sm:py-4 px-2 sm:px-3 overflow-hidden" style={{ zIndex: 15, minHeight: '280px', maxHeight: '100%' }}>
            
            {/* Gita Mobile: Small Clouds Behind Chariot */}
            {isGitaTheme && decorReady && (
              <>
                <div className="absolute pointer-events-none block lg:hidden left-[3%] sm:left-[8%] top-[55%] sm:top-[60%] -translate-y-1/2 z-[12]">
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud left" 
                    className="object-contain opacity-80 w-14 h-auto sm:w-18"
                    loading="lazy"
                    decoding="async"
                    width={72}
                    height={56}
                  />
                </div>
                <div className="absolute pointer-events-none block lg:hidden right-[3%] sm:right-[12%] top-[55%] sm:top-[60%] -translate-y-1/2 z-[12]">
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud right" 
                    className="object-contain opacity-80 w-14 h-auto sm:w-18"
                    loading="lazy"
                    decoding="async"
                    width={72}
                    height={56}
                  />
                </div>
              </>
            )}
            
            {/* Top Section - Text Content */}
            <motion.div 
              className="w-full flex flex-col items-center text-center flex-shrink-0 min-w-0"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
            >
              <h1 className="text-xl sm:text-2xl font-black mb-1.5 sm:mb-2 leading-tight text-white font-rounded tracking-tight px-1 w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.5rem, 4vw + 0.75rem, 2.25rem)' }}>
                {theme.greeting}, {childName || theme.defaultChildName}!<br />
                Ready for {theme.courseName.line1}<br />
                {theme.courseName.line2}
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
                  <motion.img 
                    src={theme.icon.src}
                    alt={theme.icon.alt}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ maxWidth: '100%', height: 'auto', width: 'clamp(2rem, 4vw + 0.5rem, 2.5rem)' }}
                    loading="lazy"
                    decoding="async"
                    width="40"
                    height="40"
                  />
                  
                  <span className="font-extrabold text-white flex-shrink-0" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                  
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

            {/* Gita Mobile: Bottom Section - Chariot */}
            {isGitaTheme && (
              <motion.div 
                className="flex-shrink-0 flex justify-center w-full mt-auto" 
                style={{ zIndex: 20 }}
                variants={chariotVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-col items-center justify-center relative">
                  {theme.decorativeImages.sun && (
                    <motion.div 
                      className="absolute block top-[15%] lg:top-[20%]" 
                      style={{ zIndex: 16, left: '50%', transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="sun-glow"></div>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="w-full max-w-[160px] sm:max-w-[200px] lg:max-w-96 lg:w-[520px] lg:h-80 lg:mt-12 h-auto"
                    style={{ zIndex: 20, position: 'relative' }}
                    animate={floatAnimation}
                  >
                    {theme.decorativeImages.chariot && (
                      <OptimizedImage
                        src={theme.decorativeImages.chariot.src}
                        alt={theme.decorativeImages.chariot.alt}
                        className="w-full h-full object-contain max-w-full"
                        width={520}
                        height={320}
                        priority={true}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* English/Maths Mobile: Decorative Images */}
        {!isGitaTheme && decorReady && (
          <>
            {theme.decorativeImages.mobileHighlight && (
              <motion.div
                className={`absolute bottom-0 ${
                  theme.decorativeImages.mobileHighlight.position.right 
                    ? 'right-0' 
                    : theme.decorativeImages.mobileHighlight.position.left 
                      ? `left-${theme.decorativeImages.mobileHighlight.position.left}` 
                      : 'left-[35%] -translate-x-1/2'
                } w-80 h-auto object-contain opacity-100 pointer-events-none lg:hidden`}
                style={{ zIndex: 20 }}
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <OptimizedImage
                  src={theme.decorativeImages.mobileHighlight.src}
                  alt={theme.decorativeImages.mobileHighlight.alt}
                  className="w-full h-auto object-contain"
                  width={320}
                  height={200}
                />
              </motion.div>
            )}
            {theme.decorativeImages.mobileCat && (
              <motion.img 
                src={theme.decorativeImages.mobileCat.src} 
                alt={theme.decorativeImages.mobileCat.alt}
                className={`absolute bottom-0 ${theme.decorativeImages.mobileCat.position.left === '0' ? 'left-0' : ''} w-24 h-auto object-contain opacity-100 pointer-events-none lg:hidden`}
                style={{ zIndex: 21 }}
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                loading="lazy"
                decoding="async"
                width="96"
                height="96"
              />
            )}
          </>
        )}

        {/* Desktop View */}
        <div className="relative h-full min-h-0 hidden lg:block w-full py-6 lg:py-4" style={{ zIndex: 10 }}>
          <div className="w-full h-full flex items-center justify-center" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
            <div className="relative w-full flex items-center justify-center h-64 max-h-64 min-h-64 lg:h-64 lg:max-h-64 lg:min-h-64 bg-blur-glass backdrop-blur-sm backdrop-saturate-100 rounded-3xl border border-white/15 overflow-visible">
              <div className="w-full flex flex-col lg:flex-row items-center gap-3 lg:gap-6 xl:gap-8 px-4 lg:px-6 h-full overflow-visible">
                
                {/* Gita Desktop: Small Clouds Behind Chariot - Tablet Only */}
                {isGitaTheme && decorReady && (
                  <>
                    <div className="absolute pointer-events-none hidden lg:block xl:hidden" style={{ zIndex: 12, left: '10%', top: '65%', transform: 'translateY(-50%)' }}>
                      <img 
                        src="/images/cloud2.png" 
                        alt="Small cloud left" 
                        className="object-contain opacity-80"
                        style={{ width: '80px', height: 'auto' }}
                        loading="lazy"
                        decoding="async"
                        width={80}
                        height={50}
                      />
                    </div>
                    <div className="absolute pointer-events-none hidden lg:block xl:hidden" style={{ zIndex: 12, right: '15%', top: '65%', transform: 'translateY(-50%)' }}>
                      <img 
                        src="/images/cloud2.png" 
                        alt="Small cloud right" 
                        className="object-contain opacity-80"
                        style={{ width: '80px', height: 'auto' }}
                        loading="lazy"
                        decoding="async"
                        width={80}
                        height={50}
                      />
                    </div>
                  </>
                )}
                
                {/* Left Side - Text Content */}
                <motion.div 
                  className="flex-1 w-full lg:w-auto flex flex-col items-center lg:items-start justify-center ml-16 lg:ml-20 xl:ml-24 shrink min-w-0"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
                >
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black mb-2 lg:mb-3 xl:mb-4 leading-tight text-white text-center lg:text-left font-rounded tracking-tight w-full" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 900, wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.1', fontSize: 'clamp(1.75rem, 2vw + 1rem, 4rem)' }}>
                    {theme.greeting}, {childName || theme.defaultChildName}! <br className="hidden lg:block" />
                    Ready for {theme.courseName.line1} <br className="hidden lg:block" />
                    {theme.courseName.line2}
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
                      <motion.img 
                        src={theme.icon.src}
                        alt={theme.icon.alt}
                        className="w-12 lg:w-14 xl:w-16 object-contain flex-shrink-0"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ maxWidth: '100%', height: 'auto', width: 'clamp(3rem, 3vw + 0.75rem, 4rem)' }}
                        loading="lazy"
                        decoding="async"
                        width="64"
                        height="64"
                      />
                      
                      <span className="font-extrabold text-white ml-2 lg:ml-3 xl:ml-4 flex-shrink-0" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                      
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

                {/* Gita Desktop: Right Side - Chariot */}
                {isGitaTheme && theme.decorativeImages.chariot && (
                  <motion.div 
                    className="flex-shrink-0 flex justify-center lg:justify-end w-full lg:w-auto mr-28 lg:mr-32 xl:mr-36" 
                    style={{ zIndex: 20 }}
                    variants={chariotVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col items-center justify-center relative lg:-translate-y-[30px]">
                      {theme.decorativeImages.sun && (
                        <motion.div 
                          className="absolute block" 
                          style={{ zIndex: 16, top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
                          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <div className="sun-glow"></div>
                        </motion.div>
                      )}
                      
                      {decorReady && (
                        <>
                          <motion.div 
                            className="absolute hidden lg:block" 
                            style={{ zIndex: 8, top: '20%', right: '70%' }}
                            animate={cloudAnimation}
                          >
                            <img 
                              src="/images/cloud2.png" 
                              alt="Small cloud near chariot" 
                              className="object-contain opacity-100 max-w-full h-auto"
                              style={{ width: '200px', height: 'auto' }}
                              loading="lazy"
                              decoding="async"
                              width={200}
                              height={120}
                            />
                          </motion.div>
                          
                          <motion.div 
                            className="absolute hidden lg:block" 
                            style={{ zIndex: 8, top: '40%', right: '-60px' }}
                            animate={{ x: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <img 
                              src="/images/cloud2.png" 
                              alt="Small cloud near chariot" 
                              className="object-contain opacity-100 max-w-full h-auto"
                              style={{ width: '180px', height: 'auto' }}
                              loading="lazy"
                              decoding="async"
                              width={180}
                              height={110}
                            />
                          </motion.div>
                        </>
                      )}
                      
                      <motion.div 
                        className="w-full max-w-[380px] lg:!w-[520px] lg:!h-[320px] lg:!mt-[45px] h-auto"
                        style={{ zIndex: 20, position: 'relative' }}
                        animate={floatAnimation}
                      >
                        <OptimizedImage
                          src={theme.decorativeImages.chariot.src}
                          alt={theme.decorativeImages.chariot.alt}
                          className="w-full h-full object-contain max-w-full"
                          width={520}
                          height={320}
                          priority={true}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* English Desktop: Clouds and Owl (outside blur rectangle) */}
        {isEnglishTheme && decorReady && (
          <>
            {theme.decorativeImages.desktopClouds?.map((cloud, idx) => (
              <motion.img 
                key={idx}
                src={cloud.src} 
                alt={cloud.alt} 
                className={`absolute top-8 ${cloud.position.left === '1/2' ? 'left-1/2 -translate-x-1/2' : cloud.position.right === '30%' ? 'right-[30%]' : 'right-0'} w-28 lg:w-32 xl:w-36 h-auto object-contain opacity-80 pointer-events-none hidden lg:block`}
                style={{ zIndex: 18 }}
                animate={{ 
                  x: idx === 0 ? [0, 15, 0] : idx === 1 ? [0, -15, 0] : [0, 20, 0],
                  y: [0, 5, 0]
                }}
                transition={{ 
                  duration: idx === 0 ? 5 : idx === 1 ? 6 : 7, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: idx === 1 ? 0.5 : idx === 2 ? 1 : 0
                }}
                loading="lazy"
                decoding="async"
                width="144"
                height="90"
              />
            ))}
            {theme.decorativeImages.desktopOwl && (
              <motion.div
                className={`absolute top-8 ${theme.decorativeImages.desktopOwl.position.left === '45%' ? 'left-[45%]' : ''} w-20 lg:w-24 xl:w-28 h-auto object-contain opacity-100 pointer-events-none hidden lg:block`}
                style={{ zIndex: 19 }}
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <OptimizedImage
                  src={theme.decorativeImages.desktopOwl.src}
                  alt={theme.decorativeImages.desktopOwl.alt}
                  className="w-full h-full object-contain"
                  width={112}
                  height={112}
                />
              </motion.div>
            )}
            {theme.decorativeImages.desktopHighlight && (
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-contain opacity-100 pointer-events-none hidden lg:block"
                style={{ zIndex: 20 }}
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <OptimizedImage
                  src={theme.decorativeImages.desktopHighlight.src}
                  alt={theme.decorativeImages.desktopHighlight.alt}
                  className="w-full h-auto object-contain"
                  width={700}
                  height={350}
                />
              </motion.div>
            )}
            {theme.decorativeImages.desktopCat && (
              <motion.img 
                src={theme.decorativeImages.desktopCat.src} 
                alt={theme.decorativeImages.desktopCat.alt}
                className="absolute bottom-0 left-0 w-32 lg:w-40 xl:w-48 h-auto object-contain opacity-100 pointer-events-none hidden lg:block"
                style={{ zIndex: 21 }}
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                loading="lazy"
                decoding="async"
                width="192"
                height="192"
              />
            )}
          </>
        )}

        {/* Maths Desktop: Highlight Image (outside blur rectangle) */}
        {isMathsTheme && decorReady && theme.decorativeImages.desktopHighlight && (
          <motion.div 
            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 hidden lg:block"
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
                src={theme.decorativeImages.desktopHighlight.src}
                alt={theme.decorativeImages.desktopHighlight.alt}
                className="w-full h-auto object-contain"
                width={700}
                height={350}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Join Now Button */}
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

