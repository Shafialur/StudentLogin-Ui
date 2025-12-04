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
    <div className="bg-progress-card backdrop-blur-lg md:backdrop-blur-xl backdrop-saturate-[180%] border border-white/60 border-t-white/90 border-l-white/70 rounded-2xl p-3 sm:p-4 md:p-6 shadow-card relative h-full w-full">
      <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Your Progress</h3>
      
      <div className="space-y-4 sm:space-y-5 md:space-y-7">
        {/* Progress Bar - Similar to Gita */}
        <div className="relative h-8 sm:h-9 md:h-10 rounded-full overflow-visible mt-6 sm:mt-8 md:mt-10" style={{ 
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
              background: 'linear-gradient(90deg, #FF0000 0%, #FF8C00 15%, #FFD700 30%, #32CD32 50%, #1E90FF 70%, #9370DB 100%)',
              borderTopRightRadius: animatedProgress < 100 ? '0' : '9999px',
              borderBottomRightRadius: animatedProgress < 100 ? '0' : '9999px'
            }}
          >
          </motion.div>
          
          {/* Rocket at the end of progress - positioned like chariot */}
          <motion.div 
            className="absolute z-20 pointer-events-none" 
            initial={{ left: 'calc(0% - 10px)' }}
            animate={{ left: `calc(${animatedProgress}% - 10px)` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              top: '50%',
              transform: 'translateY(-70%)',
              width: 'auto',
              height: 'auto'
            }}
          >
            <img 
              src="/images/rocket.png" 
              alt="Rocket" 
              className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(255, 140, 0, 0.6))',
                display: 'block',
                maxWidth: '100%',
                height: 'auto'
              }}
              onError={(e) => {
                console.error('Rocket image failed to load:', e);
                e.target.style.display = 'none';
              }}
            />
          </motion.div>
          
          {/* Treasure Chest at end (100%) - positioned like temple */}
          <div 
            className="absolute right-0 z-20" 
            style={{ 
              top: '50%',
              transform: 'translateY(-80%) translateX(30%)'
            }}
          >
            <img 
              src="/images/math-tressure.png" 
              alt="Treasure chest" 
              className="object-contain w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.5))' 
              }}
            />
          </div>
        </div>
        
        {/* Progress Text */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Math Adventure :</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">24/96</span>
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Classes Completed</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressCard
