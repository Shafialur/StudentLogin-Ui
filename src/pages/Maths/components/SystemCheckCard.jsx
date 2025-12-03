import React from 'react'

const SystemCheckCard = () => {
  return (
    <div className="system-check-card-exact rounded-2xl p-3 sm:p-4 md:p-6 card-shadow flex flex-col" style={{ height: '100%', width: '100%' }}>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
        {/* System Check Robot Icon */}
        <img 
          src="/images/systemcheck.png" 
          alt="System Check" 
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
        />
        <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">System Check</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Status Indicators - Horizontal Layout with Labels Below */}
        <div className="flex items-center justify-around mb-3 sm:mb-4 md:mb-5">
          {/* Video */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
            <img 
              src="/images/maths-video.png" 
              alt="Video" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />
            <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-lg">Video</span>
          </div>
          
          {/* Audio */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
            <img 
              src="/images/maths-audio.png" 
              alt="Audio" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />
            <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-lg">Audio</span>
          </div>
          
          {/* Network */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
            <img 
              src="/images/maths-network.png" 
              alt="Network" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />
            <span className="font-bold text-gray-900 text-xs sm:text-sm md:text-lg">Network</span>
          </div>
        </div>
        
        {/* Test Connection Button - Green Gradient - At Bottom */}
        <div className="mt-auto">
          <button className="w-full text-white font-bold py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-5 md:px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 sm:gap-2.5 shadow-md text-xs sm:text-sm md:text-base" style={{
            background: 'linear-gradient(180deg, #90EE90 0%, #32CD32 50%, #228B22 100%)'
          }}>
            <span>Test Connection</span>
            <svg 
              className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }}
            >
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.076 13.308-5.076 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SystemCheckCard
