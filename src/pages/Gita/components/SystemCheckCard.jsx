import React from 'react'

const SystemCheckCard = () => {
  return (
    <div className="bg-system-card backdrop-blur-sm md:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 md:p-3 flex flex-col h-full w-full">
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 md:mb-1.5">
        {/* System Check Robot Icon */}
        <img 
          src="/images/systemcheck.png" 
          alt="System Check" 
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))' }}
        />
        <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900">System Check</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Status Indicators - Horizontal Layout with Labels Below */}
        <div className="flex items-center justify-around mb-2 sm:mb-3 md:mb-2">
          {/* Video */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-0.5">
            <img 
              src="/images/video.png" 
              alt="Video" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))' }}
            />
            <span className="font-extrabold text-gray-900 text-[10px] sm:text-xs md:text-xs">Video</span>
          </div>
          
          {/* Audio */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-0.5">
            <img 
              src="/images/audio.png" 
              alt="Audio" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))' }}
            />
            <span className="font-extrabold text-gray-900 text-[10px] sm:text-xs md:text-xs">Audio</span>
          </div>
          
          {/* Network */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-0.5">
            <img 
              src="/images/network.png" 
              alt="Network" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.8))' }}
            />
            <span className="font-extrabold text-gray-900 text-[10px] sm:text-xs md:text-xs">Network</span>
          </div>
        </div>
        
        {/* Test Connection Button - Light Green to Darker Green Gradient - At Bottom */}
        <div className="mt-auto">
          <button className="bg-green-600 hover:bg-green-700 backdrop-blur-sm md:backdrop-blur-md border border-white/50 rounded-full w-full text-white font-extrabold py-1.5 sm:py-2 md:py-2 px-2 sm:px-3 md:px-3 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-xs">
            <span>Test Connection</span>
            <svg 
              className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }}
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

