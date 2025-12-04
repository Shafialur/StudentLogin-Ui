import React from 'react'

const QuizCard = () => {
  return (
    <div className="bg-quiz-card backdrop-blur-lg md:backdrop-blur-xl backdrop-saturate-[180%] border border-white/50 border-t-white/80 border-l-white/60 rounded-2xl p-3 sm:p-4 md:p-6 shadow-card-glass flex flex-col h-full w-full">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
        {/* Graduation Cap Icon */}
        <img 
          src="/images/quizcap.png" 
          alt="Graduation cap" 
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
        />
        <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">Class Quiz</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
          <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-lg text-center flex-1">Gyan (Knowledge) Scroll</p>
          {/* Scroll with Teal Emblem Image */}
          <div className="flex-shrink-0">
            <img 
              src="/images/quizpaper.png" 
              alt="Quiz paper scroll" 
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(95, 158, 160, 0.6))' }}
            />
          </div>
        </div>
        
        {/* Start Quiz Button - Light Blue to Darker Blue Gradient - At Bottom */}
        <div className="mt-auto">
          <button className="bg-quiz-button backdrop-blur-md md:backdrop-blur-lg border border-white/50 rounded-full w-full text-white font-bold py-2 sm:py-2.5 md:py-3 px-3 sm:px-3.5 md:px-4 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 shadow-[0_4px_15px_rgba(70,130,180,0.3),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(70,130,180,0.4),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.1)] text-xs sm:text-sm md:text-base">
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

