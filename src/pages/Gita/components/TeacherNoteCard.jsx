import React from 'react'
import { motion } from 'framer-motion'

const TeacherNoteCard = () => {
  return (
    <div className="teacher-note-card-exact rounded-2xl p-4 sm:p-5 md:p-6 card-shadow relative" style={{ height: '100%', width: '100%' }}>
      {/* Sparkle stars in top right corner */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 z-10">
        <motion.svg 
          className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" 
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
          className="w-5 h-5 text-blue-400" 
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
      </div>

      <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">A Note from Your Teacher</h3>
      
      <div className="flex items-start gap-4">
        {/* Teacher Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div 
            className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden"
            style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.7))' }}
          >
            <img 
              src="/images/teacher.png.png" 
              alt="Ms. Guru" 
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-gray-900 text-base mt-2">Ms. Guru</h4>
        </div>
        
        {/* Message Box */}
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-900 text-base md:text-lg leading-relaxed">
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

