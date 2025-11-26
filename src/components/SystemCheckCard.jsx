import React from 'react'

const SystemCheckCard = () => {
  return (
    <div className="system-check-card-exact rounded-2xl p-6 card-shadow" style={{ height: '100%', width: '100%' }}>
      <div className="flex items-center gap-2 mb-4">
        {/* System Check Robot Icon */}
        <img 
          src="/images/systemcheck.png" 
          alt="System Check" 
          className="w-8 h-8 object-contain"
        />
        <h3 className="text-2xl font-bold text-gray-900">System Check</h3>
      </div>
      
      <div className="space-y-4">
        {/* Status Indicators - Horizontal Layout with Labels Below */}
        <div className="flex items-center justify-around">
          {/* Video */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="/images/video.png" 
              alt="Video" 
              className="w-14 h-14 object-contain"
            />
            <span className="font-bold text-gray-900 text-lg">Video</span>
          </div>
          
          {/* Audio */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="/images/audio.png" 
              alt="Audio" 
              className="w-14 h-14 object-contain"
            />
            <span className="font-bold text-gray-900 text-lg">Audio</span>
          </div>
          
          {/* Network */}
          <div className="flex flex-col items-center gap-2">
            <img 
              src="/images/network.png" 
              alt="Network" 
              className="w-14 h-14 object-contain"
            />
            <span className="font-bold text-gray-900 text-lg">Network</span>
          </div>
        </div>
        
        {/* Test Connection Button - Light Green to Darker Green Gradient */}
        <button className="system-check-button-exact w-full text-white font-bold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 shadow-md mt-4">
          <span>Test Connection</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.076 13.308-5.076 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SystemCheckCard
