import React from 'react'
import { motion } from 'framer-motion'

const TeacherNoteCard = () => {
  return (
    <div 
      className="bg-teacher-card backdrop-blur-lg md:backdrop-blur-xl backdrop-saturate-[180%] border border-white/50 border-t-white/80 border-l-white/60 rounded-2xl p-3 sm:p-4 md:p-6 shadow-card-glass relative overflow-hidden h-full w-full"
    >
      {/* Sparkle stars in top right corner */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 flex gap-1 sm:gap-2 z-10">
        <motion.svg 
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          style={{ filter: 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.8))' }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
        <motion.svg 
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          style={{ filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.8))' }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
        <motion.svg 
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          style={{ filter: 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.8))' }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      </div>

      <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">A Note from Your Teacher</h3>
      
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        {/* Teacher Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-300 rounded-full flex items-center justify-center border-2 sm:border-3 md:border-4 border-white shadow-md overflow-hidden"
            style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.7))' }}
          >
            <img 
              src="/images/math-teacher.png" 
              alt="Ms. Sarah" 
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5 md:mt-2">Ms. Sarah</h4>
        </div>
        
        {/* Message Box with Glass Effect */}
        <div className="flex-1">
          <div 
            className="rounded-lg p-2 sm:p-3 md:p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            <p className="text-gray-800 text-xs sm:text-sm md:text-lg leading-relaxed text-left">
              Great focus during last class!<br />
              Keep practicing the breathing<br />
              exercises. you're doing<br />
              amazing!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherNoteCard
