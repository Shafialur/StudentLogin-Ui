import React from 'react'

const QuizCard = () => {
  return (
    <div className="quiz-card-exact rounded-2xl p-4 sm:p-5 md:p-6 card-shadow" style={{ height: '100%', width: '100%' }}>
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        {/* Graduation Cap Icon */}
        <img 
          src="/images/quizcap.png" 
          alt="Graduation cap" 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
        />
        <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900">Class Quiz</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-900 text-lg text-center flex-1">Gyan (Knowledge) Scroll</p>
          {/* Scroll with Teal Emblem Image */}
          <div className="flex-shrink-0">
            <img 
              src="/images/quizpaper.png" 
              alt="Quiz paper scroll" 
              className="w-20 h-20 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(95, 158, 160, 0.6))' }}
            />
          </div>
        </div>
        
        {/* Start Quiz Button - Light Blue to Darker Blue Gradient */}
        <button className="quiz-button-exact w-full text-white font-bold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 shadow-md">
          <span>Start Quiz</span>
          <div className="w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center" style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))' }}>
            <svg 
              className="w-4 h-4 text-white" 
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
  )
}

export default QuizCard

