import React from 'react'

const QuizCard = () => {
  return (
    <div className="bg-quiz-card backdrop-blur-sm md:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 md:p-3 flex flex-col h-full w-full md:max-h-[250px]">
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 md:mb-1.5">
        {/* Graduation Cap Icon */}
        <img 
          src="/images/quizcap.png" 
          alt="Graduation cap" 
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
        />
        <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900">Class Quiz</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-2">
          <p className="font-extrabold text-gray-900 text-[10px] sm:text-xs md:text-xs text-center flex-1">Number Quiz Time</p>
          {/* Scroll with Teal Emblem Image */}
          <div className="flex-shrink-0">
            <img 
              src="/images/math-quiz.png" 
              alt="Quiz brain" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(95, 158, 160, 0.6))' }}
            />
          </div>
        </div>
        
        {/* Start Quiz Button - Light Blue to Darker Blue Gradient - At Bottom */}
        <div className="mt-auto">
          <button className="bg-blue-600 hover:bg-blue-700 backdrop-blur-sm md:backdrop-blur-md border border-white/50 rounded-full w-full text-white font-extrabold py-1.5 sm:py-2 md:py-2 px-2 sm:px-3 md:px-3 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-xs">
            <span>Start Quiz</span>
            <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-300 rounded-full flex items-center justify-center" style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))' }}>
              <svg 
                className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))' }}
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizCard
