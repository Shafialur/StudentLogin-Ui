import React from 'react'

const ProgressCard = () => {
  const progress = 25; // Progress percentage
  
  return (
    <div className="progress-card-exact rounded-2xl p-6 card-shadow" style={{ height: '100%', width: '100%' }}>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Progress</h3>
      
      <div className="space-y-7">
        {/* Progress Bar */}
        <div className="relative h-10 bg-gray-200 rounded-full overflow-visible mt-10" style={{ borderRadius: '9999px' }}>
          {/* Progress fill - Orange with rounded caps */}
          <div 
            className="absolute left-0 top-0 h-full progress-gradient-exact" 
            style={{ 
              width: `${progress}%`, 
              borderRadius: '9999px',
              borderTopRightRadius: progress < 100 ? '0' : '9999px',
              borderBottomRightRadius: progress < 100 ? '0' : '9999px'
            }}
          >
          </div>
          
          {/* Star at the end of progress - behind chariot */}
          <div 
            className="absolute z-10" 
            style={{ 
              left: `calc(${progress}% - 20px)`,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          
          {/* Chariot at the end of progress - in front of star */}
          <div 
            className="absolute z-20" 
            style={{ 
              left: `calc(${progress}% - 10px)`,
              top: '50%',
              transform: 'translateY(-70%)'
            }}
          >
            <img 
              src="/images/progresschariot.png" 
              alt="Progress chariot" 
              className="object-contain"
              style={{ 
                width: '100px', 
                height: '100px',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' 
              }}
            />
          </div>
          
          {/* Temple at end (100%) */}
          <div 
            className="absolute right-0 z-20" 
            style={{ 
              top: '50%',
              transform: 'translateY(-80%) translateX(30%)'
            }}
          >
            <img 
              src="/images/progressendtemple.png" 
              alt="Temple" 
              className="object-contain"
              style={{ 
                width: '90px', 
                height: '90px',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))' 
              }}
            />
          </div>
        </div>
        
        {/* Progress Text - Centered */}
        <div className="flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900">Dharma Path :</span>
          <span className="text-lg font-bold text-blue-600 ml-1">25% Completed</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressCard
