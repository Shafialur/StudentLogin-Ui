import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ProgressCard = () => {
  const progress = 25; // Progress percentage
  const [animatedProgress, setAnimatedProgress] = useState(0)
  
  useEffect(() => {
    // Animate progress bar fill on mount
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 300)
    return () => clearTimeout(timer)
  }, [progress])
  
  return (
    <div className="bg-progress-card backdrop-blur-lg md:backdrop-blur-xl backdrop-saturate-[180%] border border-white/60 border-t-white/90 border-l-white/70 rounded-2xl p-3 sm:p-4 md:p-6 shadow-card h-full w-full">
      <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Your Progress</h3>
      
      <div className="space-y-4 sm:space-y-5 md:space-y-7">
        {/* Progress Bar - Glass background */}
        <div className="relative h-8 sm:h-9 md:h-10 rounded-full overflow-visible mt-6 sm:mt-8 md:mt-10" style={{ 
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 8px rgba(255, 255, 255, 0.3)'
        }}>
          {/* Progress fill - Orange with rounded caps */}
          <motion.div 
            className="absolute left-0 top-0 h-full bg-progress-bar backdrop-blur sm:backdrop-blur-md shadow-[0_4px_12px_rgba(255,107,53,0.4),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)]" 
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              borderRadius: '9999px',
              borderTopRightRadius: animatedProgress < 100 ? '0' : '9999px',
              borderBottomRightRadius: animatedProgress < 100 ? '0' : '9999px'
            }}
          >
          </motion.div>
          
          {/* Star at the end of progress - behind chariot */}
          <motion.div 
            className="absolute z-10" 
            initial={{ left: 'calc(0% - 20px)' }}
            animate={{ left: `calc(${animatedProgress}% - 20px)` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <motion.svg 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.9))' }}
              animate={{ 
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          </motion.div>
          
          {/* Chariot at the end of progress - in front of star */}
          <motion.div 
            className="absolute z-20" 
            initial={{ left: 'calc(0% - 10px)' }}
            animate={{ left: `calc(${animatedProgress}% - 10px)` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              top: '50%',
              transform: 'translateY(-70%)'
            }}
          >
            <img 
              src="/images/progresschariot.png" 
              alt="Progress chariot" 
              className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(255, 140, 0, 0.6))' 
              }}
            />
          </motion.div>
          
          {/* Temple at end (100%) */}
          <div 
            className="absolute right-0 z-20" 
            style={{ 
              top: '50%',
              transform: 'translateY(-80%) translateX(30%)'
            }}
          >
            <img 
              src="/images/progressendtemple.png" 
              alt="Temple" 
              className="object-contain w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.5))' 
              }}
            />
          </div>
        </div>
        
        {/* Progress Text - Centered */}
        <div className="flex items-center justify-center whitespace-nowrap">
          <span className="text-xs sm:text-sm md:text-lg font-bold text-gray-900">Dharma Path : </span>
          <span className="text-xs sm:text-sm md:text-lg font-bold text-blue-600">24/96 Classes Completed</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressCard

