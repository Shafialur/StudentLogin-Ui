import React, { useState, useEffect } from 'react'

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Countdown timer logic - you can set a target date
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds += 1
        if (seconds >= 60) {
          seconds = 0
          minutes += 1
        }
        if (minutes >= 60) {
          minutes = 0
          hours += 1
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (value) => String(value).padStart(2, '0')

  return (
    <div className="relative w-full hero-section-container">
      {/* Hero Section Background with Gradient */}
      <div className="relative w-full h-[500px] hero-gradient-exact overflow-hidden hero-bottom-rounded">
        {/* Background Design Symbols - Left and Right Top Corners */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <img 
            src="/images/background-design-symbol.png" 
            alt="Background design" 
            className="absolute top-0 left-0 w-96 h-96 opacity-85 object-contain object-top"
            style={{ transform: 'translateY(-50%)' }}
          />
          <img 
            src="/images/background-design-symbol.png" 
            alt="Background design" 
            className="absolute top-0 right-0 w-96 h-96 opacity-85 object-contain object-top"
            style={{ transform: 'translateY(-50%) scaleX(-1)' }}
          />
        </div>

        {/* Background Clouds - Subtle White Cloud Shapes */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
         
          <img 
            src="/images/cloud2.png" 
            alt="Background cloud" 
            className="absolute top-24 left-1/3 opacity-100 w-28 h-20 object-contain"
          />
          <img 
            src="/images/cloud2.png" 
            alt="Background cloud" 
            className="absolute bottom-20 right-24 opacity-100 w-36 h-28 object-contain"
          />
        </div>

        {/* Main Cloud - Bottom Right Below Chariot */}
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ zIndex: 18 }}>
          <img 
            src="/images/main-cloud.png" 
            alt="Main cloud" 
            className="object-contain"
            style={{ width: '900px', height: 'auto', maxHeight: '450px' }}
          />
        </div>

        {/* Cloud at Bottom of Hero Section - Behind Chariot */}
        <div className="absolute bottom-0 pointer-events-none" style={{ zIndex: 8, left: '55%', transform: 'translateX(-50%)' }}>
          <img 
            src="/images/cloud2.png" 
            alt="Cloud at bottom" 
            className="object-contain opacity-80"
            style={{ width: '600px', height: 'auto' }}
          />
        </div>

        {/* Pink Lotus Flower - Bottom Left */}
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ zIndex: 15 }}>
          <img 
            src="/images/lotus.png" 
            alt="Lotus flower" 
            className="w-44 h-44 object-contain opacity-100"
          />
        </div>

        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ zIndex: 15, left: '45%' }}>
          <img 
            src="/images/lotus.png" 
            alt="Lotus flower" 
            className="w-32 h-32 object-contain opacity-80"
          />
        </div>

        {/* Lotus1 - Bottom Center */}
        <div className="absolute bottom-0 pointer-events-none" style={{ zIndex: 15, left: '5%' }}>
          <img 
            src="/images/lotus1.png" 
            alt="Lotus flower" 
            className="w-32 h-32 object-contain opacity-100"
          />
        </div>

        {/* Main Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-16 flex items-center" style={{ zIndex: 10 }}>
          {/* Single Blur Rectangle for All Content */}
          <div className="hero-unified-blur-background"></div>
          
          {/* All Content in One Container */}
          <div className="relative w-full flex items-center gap-32 py-8" style={{ zIndex: 15 }}>
            {/* Left Side - Text Content */}
            <div className="flex-1 pl-0">
              <h1 className="text-5xl font-bold mb-8 leading-tight text-white hero-main-text">
                Namaste, Krishna! 
               Ready for Gita Wisdom - Inner Peace?
              </h1>
              
              {/* Countdown Timer */}
              <div>
                <div className="countdown-timer-box-exact">
                  {/* Om Symbol */}
                  <img 
                    src="/images/om-symbol.png" 
                    alt="Om symbol" 
                    className="w-10 h-10 object-contain"
                  />
                  
                  {/* Live In Text */}
                  <span className="text-base font-bold text-white ml-3" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Live In:</span>
                  
                  {/* Time Boxes with Spacing */}
                  <div className="flex items-center gap-2 ml-3">
                    <span className="countdown-time-box">
                      {formatTime(timeLeft.hours)}
                    </span>
                    <span className="text-white text-xl font-bold">:</span>
                    <span className="countdown-time-box">
                      {formatTime(timeLeft.minutes)}
                    </span>
                    <span className="text-white text-xl font-bold">:</span>
                    <span className="countdown-time-box">
                      {formatTime(timeLeft.seconds)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Chariot */}
            <div className="flex-shrink-0 flex justify-end pr-8" style={{ zIndex: 20 }}>
              <div className="flex flex-col items-center justify-center relative" style={{ transform: 'translateY(-30px)' }}>
                {/* Sun Behind Chariot */}
                <div className="absolute" style={{ zIndex: 16, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div className="sun-glow"></div>
                </div>
                
                {/* Small Cloud 1 - Near Chariot */}
                <div className="absolute" style={{ zIndex: 8, top: '20%', right: '70%' }}>
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud near chariot" 
                    className="object-contain opacity-100"
                    style={{ width: '150px', height: 'auto' }}
                  />
                </div>
                
                {/* Small Cloud 2 - Near Chariot */}
                <div className="absolute" style={{ zIndex: 8, top: '40%', right: '-60px' }}>
                  <img 
                    src="/images/cloud2.png" 
                    alt="Small cloud near chariot" 
                    className="object-contain opacity-100"
                    style={{ width: '180px', height: 'auto' }}
                  />
                </div>
                
                {/* Chariot - Main Illustration */}
                <div style={{ width: '620px', height: '380px', zIndex: 20, position: 'relative', marginTop: '-56px'}} className='chariot-container'>
                  <img 
                    src="/images/chariot.png.png" 
                    alt="Krishna and Arjuna in chariot" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Now Button - Right Side of Hero Section */}
        <div className="absolute bottom-8 right-8" style={{ zIndex: 50 }}>
          <button className="join-now-button-exact-large">
            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-bold text-xl ml-2">Join Now</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
