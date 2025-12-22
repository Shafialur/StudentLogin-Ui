import { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useProgressData } from '../hooks/useProgressData'
import type { ProgressTheme } from '../config/subjectThemes'

interface ProgressCardProps {
  theme: ProgressTheme
}

const ProgressCard = memo(({ theme }: ProgressCardProps) => {
  const { pastClasses, loading } = useProgressData()
  const TOTAL_CLASSES = 96 // Fixed total classes for all subjects
  const progressPercentage = Math.round((pastClasses / TOTAL_CLASSES) * 100)
  const [animatedProgress, setAnimatedProgress] = useState<number>(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage)
    }, 300)
    return () => clearTimeout(timer)
  }, [progressPercentage])
  
  // Show loading state
  if (loading) {
    return (
      <div className="bg-progress-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 h-full w-full max-h-[250px] lg:max-h-[250px] flex flex-col">
        <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5 lg:mb-1.5 flex-shrink-0">Your Progress</h3>
        <div className="flex items-center justify-center h-20 flex-1">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  // Get progress bar color
  const getProgressBarStyle = () => {
    switch (theme.progressBarColor) {
      case 'orange':
        return { className: 'bg-progress-bar backdrop-blur-sm' }
      case 'rainbow-pink':
        return {
          style: {
            background: 'linear-gradient(to right, #ff69b4, #9370db, #4169e1, #32cd32, #ffd700)'
          }
        }
      case 'rainbow-red':
        return {
          style: {
            background: 'linear-gradient(to right, #ff0000, #ff8c00, #ffd700, #32cd32, #4169e1, #9370db)'
          }
        }
      default:
        return { className: 'bg-progress-bar backdrop-blur-sm' }
    }
  }

  const progressBarStyle = getProgressBarStyle()
  
  return (
    <div className="bg-progress-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 h-full w-full lg:max-h-[250px] flex flex-col">
      <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 mb-2 sm:mb-2.5 lg:mb-1.5 flex-shrink-0">Your Progress</h3>
      
      <div className="space-y-3 sm:space-y-4 lg:space-y-2 flex-1 flex flex-col justify-between min-h-0">
        {/* Progress Bar - Glass background */}
        <div className="relative h-7 sm:h-8 lg:h-7 rounded-full overflow-visible mt-4 sm:mt-6 lg:mt-3" style={{ 
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 8px rgba(255, 255, 255, 0.3)'
        }}>
          {/* Progress fill */}
          <motion.div 
            className={`absolute left-0 top-0 h-full ${progressBarStyle.className || ''}`}
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              borderRadius: '9999px',
              borderTopRightRadius: animatedProgress < 100 ? '0' : '9999px',
              borderBottomRightRadius: animatedProgress < 100 ? '0' : '9999px',
              ...(progressBarStyle.style || {})
            }}
          >
          </motion.div>
          
          {/* Star at the end of progress - for Gita (behind chariot) and English */}
          {(theme.progressBarColor === 'orange' || theme.progressBarColor === 'rainbow-pink') && (
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
                className={`text-yellow-400 ${theme.progressBarColor === 'orange' ? 'w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6' : 'w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10'}`}
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
          )}
          
          {/* Moving icon (chariot or rocket) */}
          {theme.movingIcon.src && (
            <motion.div 
              className="absolute z-20" 
              initial={{ left: theme.progressBarColor === 'orange' ? 'calc(0% - 10px)' : 'calc(0% - 15px)' }}
              animate={{ left: `calc(${animatedProgress}% ${theme.progressBarColor === 'orange' ? '- 10px' : '- 15px'})` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ 
                top: '50%',
                transform: theme.progressBarColor === 'orange' ? 'translateY(-70%)' : 'translateY(-50%)'
              }}
            >
              <img 
                src={theme.movingIcon.src}
                alt={theme.movingIcon.alt}
                className={`object-contain ${theme.movingIcon.size}`}
                loading="lazy"
                decoding="async"
                style={{ 
                  filter: 'drop-shadow(0 0 15px rgba(255, 140, 0, 0.6))' 
                }}
                width="64"
                height="64"
              />
            </motion.div>
          )}
          
          {/* End icon (temple or treasure chest) */}
          {theme.endIcon && (
            <div 
              className="absolute right-0 z-20" 
              style={{ 
                top: '50%',
                transform: theme.progressBarColor === 'orange' ? 'translateY(-80%) translateX(30%)' : 'translateY(-70%) translateX(30%)'
              }}
            >
              <img 
                src={theme.endIcon.src}
                alt={theme.endIcon.alt}
                className={`object-contain ${theme.endIcon.size}`}
                loading="lazy"
                decoding="async"
                style={{ 
                  filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.5))' 
                }}
                width="64"
                height="64"
              />
            </div>
          )}
          
          {/* Percentage on the right - English only */}
          {theme.showPercentage && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-sm sm:text-base md:text-base font-extrabold text-blue-600">{progressPercentage}%</span>
            </div>
          )}
          
          {/* Small faint stars on unfilled portion - English only */}
          {theme.showSmallStars && (
            <>
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
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-yellow-300 opacity-50" 
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
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-yellow-300 opacity-50" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            </>
          )}
        </div>
        
        {/* Progress Text - Dynamic from API */}
        {theme.labelPosition === 'left' ? (
          theme.progressBarColor === 'rainbow-red' ? (
            // Maths layout
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-gray-900">{theme.labelText} :</span>
                <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-blue-600">{pastClasses}/{TOTAL_CLASSES}</span>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-gray-900">Classes Completed</span>
            </div>
          ) : (
            // Gita layout
            <div className="flex items-center justify-between w-full flex-wrap gap-1">
              <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-gray-900">{theme.labelText} : </span>
              <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-blue-600">
                {pastClasses}/{TOTAL_CLASSES} Classes Completed
              </span>
            </div>
          )
        ) : (
          // English layout
          <div className="flex items-center justify-between w-full flex-wrap gap-1">
            <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-blue-600">{pastClasses}/{TOTAL_CLASSES}</span>
            <span className="text-[10px] sm:text-xs md:text-sm font-extrabold text-gray-900">{theme.labelText}</span>
          </div>
        )}
      </div>
    </div>
  )
})

ProgressCard.displayName = 'ProgressCard'

export default ProgressCard

