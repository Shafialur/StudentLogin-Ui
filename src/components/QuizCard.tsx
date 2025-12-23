import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import QuizModal from './QuizModal'
import { getQuizData } from '../data/quizData'
import type { QuizType } from '../types/quiz'

interface QuizCardProps {
  title: string
  description?: string
  image?: string
  imageAlt?: string
  quizType: QuizType
}

const QuizCard = memo(({ title, description, image, imageAlt, quizType }: QuizCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const isDisabled = true // Feature coming in future

  return (
    <div className={`bg-quiz-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 rounded-2xl p-2.5 sm:p-3 lg:p-3 flex flex-col h-full w-full lg:max-h-[250px] relative ${
      isDisabled 
        ? 'border-gray-400 opacity-60 grayscale cursor-not-allowed' 
        : 'border-gray-300'
    }`}>
      {/* Coming Soon Badge */}
      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10">
        <motion.div
          className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] sm:text-[9px] font-bold flex items-center gap-0.5 sm:gap-1 shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <span className="text-[8px] sm:text-[9px]">🚀</span>
          <span>Coming Soon</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 lg:mb-1">
        {/* Graduation Cap Icon */}
        <img 
          src="/images/quizcap.png" 
          alt="Graduation cap" 
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 object-contain"
          style={{ filter: isDisabled ? 'none' : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
          loading="lazy"
          decoding="async"
          width="40"
          height="40"
        />
        <h3 className={`text-sm sm:text-base lg:text-lg font-extrabold ${
          isDisabled ? 'text-gray-500' : 'text-gray-900'
        }`}>Practice Quiz</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2 lg:mb-1.5">
          <div className="flex-1">
            {description ? (
              <p className={`font-extrabold text-[10px] sm:text-xs lg:text-xs text-center ${
                isDisabled ? 'text-gray-500' : 'text-gray-900'
              }`}>{description}</p>
            ) : (
              <p className={`font-extrabold text-[10px] sm:text-xs lg:text-xs text-center ${
                isDisabled ? 'text-gray-500' : 'text-gray-900'
              }`}>{title}</p>
            )}
            {/* Practice Mode Indicator */}
            <p className={`text-[9px] sm:text-[10px] text-center mt-0.5 font-medium ${
              isDisabled ? 'text-gray-400' : 'text-gray-600'
            }`}>
              5 Practice Questions
            </p>
          </div>
          {/* Optional Image */}
          {image && (
            <div className="flex-shrink-0">
              <img 
                src={image} 
                alt={imageAlt || 'Quiz icon'} 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                style={{ filter: isDisabled ? 'none' : 'drop-shadow(0 0 12px rgba(95, 158, 160, 0.6))' }}
                loading="lazy"
                decoding="async"
                width="56"
                height="56"
              />
            </div>
          )}
        </div>
        
        {/* Info Text */}
        <div className="mb-1.5 sm:mb-2 lg:mb-1.5">
          <p className={`text-[8px] sm:text-[9px] text-center font-medium leading-tight ${
            isDisabled ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Full AI-powered quiz with personalized questions coming soon! 🎯
          </p>
        </div>
        
        {/* Start Quiz Button - Gradient Matching Quiz Card Theme */}
        <div className="mt-auto">
          <motion.button 
            onClick={() => !isDisabled && setIsModalOpen(true)}
            disabled={isDisabled}
            className={`backdrop-blur-sm lg:backdrop-blur-md border-2 rounded-full w-full font-extrabold py-1.5 sm:py-2 lg:py-2 px-2 sm:px-3 lg:px-3 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs lg:text-xs ${
              isDisabled
                ? 'bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed opacity-70'
                : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-blue-300/50 text-white shadow-md hover:shadow-lg'
            }`}
            whileHover={isDisabled ? {} : { scale: 1.02 }}
            whileTap={isDisabled ? {} : { scale: 0.98 }}
            style={isDisabled ? {} : { textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}
          >
            <span>{isDisabled ? 'Coming Soon' : 'Try Practice Quiz'}</span>
            {!isDisabled && (
              <svg 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))' }}
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Quiz Modal */}
      <QuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quizData={getQuizData(quizType)}
        quizType={quizType}
      />
    </div>
  )
})

QuizCard.displayName = 'QuizCard'

export default QuizCard

