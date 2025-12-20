import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface JoinSuccessToastProps {
  show: boolean
  onClose: () => void
  childName?: string
}

const JoinSuccessToast = ({ show, onClose, childName = 'Student' }: JoinSuccessToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto-close after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Toast Container - Top Right Position */}
          <motion.div
            className="fixed top-[10%] sm:top-[12%] md:top-[15%] right-[5%] sm:right-[8%] md:right-[10%] z-[9999] pointer-events-none px-3 sm:px-4"
            initial={{ opacity: 0, scale: 0.85, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="bg-gradient-to-br from-yellow-200 via-orange-100 to-pink-100 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-yellow-400 p-3.5 sm:p-4 md:p-5 max-w-[280px] sm:max-w-xs md:max-w-sm w-full pointer-events-auto relative overflow-hidden">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-yellow-300/30 via-orange-200/30 to-pink-200/30" />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Success Icon - Responsive Size */}
                <motion.div
                  className="mx-auto mb-2.5 sm:mb-3 md:mb-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg sm:shadow-xl animate-pulse"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                >
                  <motion.svg
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>

                {/* Title - Responsive Text Size */}
                <motion.h3
                  className="text-base sm:text-lg md:text-xl font-black mb-2 sm:mb-2.5 md:mb-3 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  🎉 Awesome! 🎉
                </motion.h3>

                {/* Main Message - Responsive Typography */}
                <motion.div
                  className="mb-2 sm:mb-2.5 md:mb-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs sm:text-sm md:text-base font-extrabold leading-tight sm:leading-relaxed">
                    <span className="text-orange-600 font-black text-sm sm:text-base md:text-lg">{childName}</span>
                    <span className="text-gray-800">, you're in the queue! </span>
                    <span className="text-lg sm:text-xl md:text-2xl inline-block animate-bounce">🎯</span>
                  </p>
                </motion.div>

                {/* Queue Explanation - Responsive Box */}
                <motion.div
                  className="mb-2.5 sm:mb-3 md:mb-4 px-2.5 sm:px-3 md:px-3.5 py-2 sm:py-2.5 bg-white/70 sm:bg-white/60 rounded-lg sm:rounded-xl border-2 border-yellow-300 shadow-inner"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-700 leading-tight sm:leading-relaxed">
                    <span className="text-base sm:text-lg md:text-xl">🚀</span>{' '}
                    When class starts, you'll join automatically!<br className="hidden sm:block" />
                    <span className="text-orange-600">Just wait and get ready!</span>{' '}
                    <span className="text-base sm:text-lg md:text-xl">✨</span>
                  </p>
                </motion.div>

                {/* Emoji Celebration - Responsive Size */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 md:mb-4">
                  {['🌟', '⭐', '💫', '🎊'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-lg sm:text-xl md:text-2xl inline-block"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        y: [0, -6, 0]
                      }}
                      transition={{
                        scale: { delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 },
                        rotate: { delay: 0.5 + i * 0.1, type: "spring" },
                        y: {
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.7 + i * 0.2,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>

                {/* Close Button - Responsive & Bright */}
                <motion.button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-extrabold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full shadow-lg sm:shadow-xl text-[10px] sm:text-xs md:text-sm w-full hover:shadow-2xl transition-all duration-200 active:scale-95"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Got it! 🚀
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default JoinSuccessToast

