import { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useProgressData } from '../../../hooks/useProgressData'

const ProgressCard = memo(() => {
  const { progressPercentage, totalClasses, pastClasses, loading } = useProgressData()
  const [animatedProgress, setAnimatedProgress] = useState<number>(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage)
    }, 300)
    return () => clearTimeout(timer)
  }, [progressPercentage])
  
  if (loading) {
    return (
      <div className="bg-progress-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 h-full w-full max-h-[250px] md:max-h-[250px] flex flex-col">
        <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5 lg:mb-1.5 flex-shrink-0">Your Progress</h3>
        <div className="flex items-center justify-center h-20 flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-progress-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 h-full w-full md:max-h-[250px] flex flex-col">
      <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5 lg:mb-1.5 flex-shrink-0">Your Progress</h3>
      
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
          {/* Progress fill - Rainbow gradient (red, orange, yellow, green, blue, purple) */}
          <motion.div 
            className="absolute left-0 top-0 h-full" 
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              borderRadius: '9999px',
              background: 'linear-gradient(to right, #ff0000, #ff8c00, #ffd700, #32cd32, #4169e1, #9370db)',
              borderTopRightRadius: animatedProgress < 100 ? '0' : '9999px',
              borderBottomRightRadius: animatedProgress < 100 ? '0' : '9999px'
            }}
          >
          </motion.div>
          
          {/* Rocket on the progress bar */}
          <motion.div 
            className="absolute z-20" 
            initial={{ left: 'calc(0% - 15px)' }}
            animate={{ left: `calc(${animatedProgress}% - 15px)` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <img 
              src="/images/rocket.png" 
              alt="Rocket"
              loading="lazy"
              decoding="async" 
              className="object-contain w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 lg:w-12 lg:h-12"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(255, 140, 0, 0.6))' 
              }}
              width="48"
              height="48"
            />
          </motion.div>
          
          {/* Treasure chest at end (100%) */}
          <div 
            className="absolute right-0 z-20" 
            style={{ 
              top: '50%',
              transform: 'translateY(-70%) translateX(30%)'
            }}
          >
            <img 
              src="/images/math-tressure.png" 
              alt="Treasure chest"
              loading="lazy"
              decoding="async" 
              className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.5))' 
              }}
              width="80"
              height="80"
            />
          </div>
        </div>
        
        {/* Progress Text - Dynamic from API */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-gray-900">Math Adventure :</span>
            <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-blue-600">{pastClasses}/{totalClasses}</span>
          </div>
          <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-gray-900">Classes Completed</span>
        </div>
      </div>
    </div>
  )
})

ProgressCard.displayName = 'ProgressCard'

export default ProgressCard


