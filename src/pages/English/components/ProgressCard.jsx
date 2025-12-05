import React, { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useProgressData } from '../../../hooks/useProgressData'

const ProgressCard = memo(() => {
  const { progressPercentage, totalClasses, pastClasses, loading } = useProgressData()
  const [animatedProgress, setAnimatedProgress] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage)
    }, 300)
    return () => clearTimeout(timer)
  }, [progressPercentage])
  
  if (loading) {
    return (
      <div className="bg-progress-card backdrop-blur-sm md:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 md:p-3 h-full w-full">
        <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5 md:mb-1.5">Your Progress</h3>
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-progress-card backdrop-blur-sm md:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 md:p-3 h-full w-full md:max-h-[250px] flex flex-col">
      <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5 md:mb-1.5 flex-shrink-0">Your Progress</h3>
      
      <div className="space-y-3 sm:space-y-4 md:space-y-2 flex-1 flex flex-col justify-between min-h-0">
        {/* Progress Bar - Glass background */}
        <div className="relative h-7 sm:h-8 md:h-7 rounded-full overflow-visible mt-4 sm:mt-6 md:mt-3" style={{ 
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 8px rgba(255, 255, 255, 0.3)'
        }}>
          {/* Progress fill - Rainbow gradient (pink, purple, blue, green, yellow) */}
          <motion.div 
            className="absolute left-0 top-0 h-full" 
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              borderRadius: '9999px',
              background: 'linear-gradient(to right, #ff69b4, #9370db, #4169e1, #32cd32, #ffd700)',
              borderTopRightRadius: animatedProgress < 100 ? '0' : '9999px',
              borderBottomRightRadius: animatedProgress < 100 ? '0' : '9999px'
            }}
          >
          </motion.div>
          
          {/* Large bright yellow star at the end of progress */}
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
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 text-yellow-400" 
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
          
          {/* Percentage on the right */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <span className="text-sm sm:text-base md:text-base font-extrabold text-blue-600">{progressPercentage}%</span>
          </div>
          
          {/* Small faint stars on unfilled portion */}
          <motion.div 
            className="absolute z-5" 
            initial={{ left: `${progressPercentage + 8}%` }}
            animate={{ left: `${animatedProgress + 8}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-yellow-300 opacity-50" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute z-5" 
            initial={{ left: `${progressPercentage + 25}%` }}
            animate={{ left: `${animatedProgress + 25}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-yellow-300 opacity-50" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        </div>
        
        {/* Progress Text - Dynamic from API */}
        <div className="flex items-center justify-between w-full flex-wrap gap-1">
          <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-blue-600">{pastClasses}/{totalClasses}</span>
          <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-gray-900">Classes Completed</span>
        </div>
      </div>
    </div>
  )
})

ProgressCard.displayName = 'ProgressCard'

export default ProgressCard
