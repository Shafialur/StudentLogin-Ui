import { motion } from 'framer-motion'

const TeacherNoteCard = () => {
  return (
    <div className="bg-teacher-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 relative h-full w-full md:max-h-[250px] flex flex-col">
      {/* Sparkle stars in top right corner */}
      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-2 md:right-2 flex gap-1 sm:gap-2 z-10">
        <motion.svg
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-5 lg:h-5 text-purple-400"
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
          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400"
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

      <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900 mb-1.5 sm:mb-2 lg:mb-1.5">A Note from Your Teacher</h3>

      <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
        {/* Teacher Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-14 lg:h-14 bg-yellow-300 rounded-full flex items-center justify-center border-2 sm:border-3 lg:border-2 border-white overflow-hidden"
            style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.7))' }}
          >
            <img
              src="/images/eng-teacher.png"
              alt="Ms. Sarah"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width="56"
              height="56"
            />
          </div>
          <h4 className="font-extrabold text-gray-900 text-[10px] sm:text-xs lg:text-xs mt-0.5 sm:mt-1 lg:mt-0.5">Ms. Sarah</h4>
        </div>

        {/* Message Box - Full Width */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 rounded-lg p-2 sm:p-3 lg:p-3 w-full h-full">
            <p className="text-gray-900 text-[10px] sm:text-xs lg:text-xs font-bold leading-relaxed">
              Great focus during last class!<br />
              Keep practicing the breathing exercises.<br /> 
              you're doing amazing!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherNoteCard


