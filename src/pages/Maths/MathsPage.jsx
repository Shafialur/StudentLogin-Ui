import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import CourseCard from './components/CourseCard'
import ProgressCard from './components/ProgressCard'
import TeacherNoteCard from './components/TeacherNoteCard'
import AssignmentCard from './components/AssignmentCard'
import QuizCard from './components/QuizCard'
import SystemCheckCard from './components/SystemCheckCard'
import BottomNavigation from '../../components/BottomNavigation'

const MathsPage = () => {
  const scrollContainerRef = useRef(null)
  
  // Fix mobile browser address bar behavior
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    // Set dynamic viewport height for mobile
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    setViewportHeight()
    
    // Update on resize and orientation change
    const handleResize = () => {
      setViewportHeight()
      // Re-trigger scroll after resize
      if (window.innerWidth <= 768 && container) {
        setTimeout(() => {
          container.scrollTop = 1
          setTimeout(() => {
            container.scrollTop = 0
          }, 100)
        }, 100)
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    // Trigger browser address bar hiding on mount
    const triggerScroll = () => {
      if (window.innerWidth <= 768 && container) {
        // Force a scroll to trigger address bar hiding
        // Scroll down slightly, then back up
        requestAnimationFrame(() => {
          container.scrollTop = 2
          requestAnimationFrame(() => {
            container.scrollTop = 0
            // One more trigger after a brief delay
            setTimeout(() => {
              container.scrollTop = 1
              setTimeout(() => {
                container.scrollTop = 0
              }, 50)
            }, 200)
          })
        })
      }
    }
    
    // Delay to ensure DOM is ready
    setTimeout(triggerScroll, 150)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full overflow-y-auto overflow-x-hidden mobile-viewport-fix" 
      style={{ 
        margin: 0, 
        padding: 0, 
        width: '100%', 
        maxWidth: '100%', 
        scrollSnapType: 'y proximity'
      }}
    >
      <div 
        className="overflow-y-auto md:overflow-y-auto overflow-x-hidden relative mobile-content-fix"
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          background: `
            linear-gradient(135deg, 
              rgba(135, 206, 235, 0.2) 0%, 
              rgba(176, 224, 230, 0.18) 20%,
              rgba(255, 228, 181, 0.15) 50%,
              rgba(255, 182, 193, 0.18) 80%,
              rgba(221, 160, 221, 0.15) 100%
            ),
            url(/images/backgorund.png)
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      >
        {/* Responsive Container - Makes UI appear exactly the same on all laptop screens */}
        <div 
          className="ui-responsive-container sm:min-h-screen md:min-h-screen w-full md:flex md:flex-col md:pb-[20px]"
          style={{
            width: '100%',
            maxWidth: '100%',
            marginLeft: '0',
            marginRight: '0',
            paddingLeft: '0',
            paddingRight: '0',
            position: 'relative',
            paddingBottom: '3px'
          }}
        >
        {/* Hero Section */}
        <div className="md:flex-shrink-0 relative z-20">
          <HeroSection />
        </div>

        {/* Dashboard Cards Section - Fixed gaps that never change */}
      <div className="max-w-full mx-auto px-0 sm:px-0 md:px-[60px] scale-100 sm:scale-100 md:scale-100 md:flex-1 md:flex md:flex-col relative z-10 md:mt-[20px] md:mb-[20px]" style={{ paddingTop: '0', paddingBottom: '0' }}>
        {/* Mobile: Custom 2-column layout | Desktop: Grid Layout */}
        <div className="flex flex-col md:grid md:pt-[10px] pl-0 pt-0 pr-0 md:w-full md:h-full gap-0 sm:gap-0 md:gap-4" 
          style={{ 
            gridTemplateColumns: 'repeat(10, 1fr)', 
            gridTemplateRows: '1fr 1fr',
            alignItems: 'stretch'
          }}>
          {/* Mobile: Course Card - Full width */}
          <motion.div 
            className="dashboard-grid-item-1 w-full md:w-auto"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <CourseCard />
          </motion.div>

          {/* Mobile: Progress Card - Full width */}
          <motion.div 
            className="dashboard-grid-item-2 w-full md:w-auto"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <ProgressCard />
          </motion.div>

          {/* Mobile: Teacher Note and Assignment Cards - 2 per row */}
          <div className="flex flex-row gap-0 md:hidden">
            <motion.div 
              className="dashboard-grid-item-3 flex-1"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <TeacherNoteCard />
            </motion.div>
            <motion.div 
              className="dashboard-grid-item-4 flex-1"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <AssignmentCard />
            </motion.div>
          </div>

          {/* Mobile: Quiz and System Check Cards - 2 per row */}
          <div className="flex flex-row gap-0 md:hidden">
            <motion.div 
              className="dashboard-grid-item-5 flex-1"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <QuizCard />
            </motion.div>
            <motion.div 
              className="dashboard-grid-item-6 flex-1"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <SystemCheckCard />
            </motion.div>
          </div>

          {/* Desktop: Original grid layout */}
          <motion.div 
            className="dashboard-grid-item-3 hidden md:block md:h-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <TeacherNoteCard />
          </motion.div>
          <motion.div 
            className="dashboard-grid-item-4 hidden md:block md:h-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <AssignmentCard />
          </motion.div>
          <motion.div 
            className="dashboard-grid-item-5 hidden md:block md:h-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <QuizCard />
          </motion.div>
          <motion.div 
            className="dashboard-grid-item-6 hidden md:block md:h-full"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <SystemCheckCard />
          </motion.div>
        </div>
      </div>
      </div>
      <BottomNavigation />
    </div>
    </div>
  )
}

export default MathsPage

