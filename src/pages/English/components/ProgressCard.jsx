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
    <div className="progress-card-exact rounded-2xl p-3 sm:p-4 md:p-6 card-shadow" style={{ height: '100%', width: '100%' }}>
      <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Your Progress</h3>
      
      <div className="space-y-4 sm:space-y-5 md:space-y-7">
        {/* Progress Bar Container */}
        <div className="relative flex items-center gap-3 sm:gap-4">
          {/* Progress Bar - Light gray background */}
          <div className="relative flex-1 h-8 sm:h-9 md:h-10 rounded-full overflow-visible" style={{ 
            borderRadius: '9999px',
            background: '#E5E5E5',
            position: 'relative'
          }}>
            {/* Progress fill - Rainbow gradient */}
            <motion.div 
              className="absolute left-0 top-0 h-full" 
              initial={{ width: 0 }}
              animate={{ width: `${animatedProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ 
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #FF69B4 0%, #9B59B6 20%, #3498DB 40%, #2ECC71 60%, #F1C40F 80%, #FF8C00 100%)',
                borderTopRightRadius: animatedProgress < 100 ? '0' : '9999px',
                borderBottomRightRadius: animatedProgress < 100 ? '0' : '9999px'
              }}
            >
            </motion.div>
            
            {/* Large yellow star at the end of filled progress */}
            <motion.div 
              className="absolute z-10" 
              initial={{ left: 'calc(0% - 16px)' }}
              animate={{ left: `calc(${animatedProgress}% - 16px)` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ 
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            >
              <svg 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
            
            {/* Small star in middle of unfilled section */}
            <div 
              className="absolute z-10" 
              style={{ 
                left: 'calc(50% - 8px)',
                top: '-20px',
                transform: 'translateY(0)'
              }}
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            
            {/* Small star near right end of unfilled section */}
            <div 
              className="absolute z-10" 
              style={{ 
                left: 'calc(87.5% - 8px)',
                top: '-20px',
                transform: 'translateY(0)'
              }}
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          
          {/* Percentage display on the right */}
          <span className="text-base sm:text-lg md:text-xl font-bold text-blue-600 whitespace-nowrap">
            {animatedProgress}%
          </span>
        </div>
        
        {/* Progress Text */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">24/96</span>
          <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Classes Completed</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressCard

