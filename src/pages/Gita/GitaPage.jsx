import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import CourseCard from './components/CourseCard'
import ProgressCard from './components/ProgressCard'
import TeacherNoteCard from './components/TeacherNoteCard'
import AssignmentCard from './components/AssignmentCard'
import QuizCard from './components/QuizCard'
import SystemCheckCard from './components/SystemCheckCard'

const GitaPage = () => {
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
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden">
      <div 
        className="h-screen overflow-y-auto md:overflow-y-auto overflow-x-hidden relative"
        style={{
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
          className="ui-responsive-container sm:min-h-screen md:min-h-screen w-full md:flex md:flex-col"
          style={{
            width: '100%',
            maxWidth: '100%',
            marginLeft: '0',
            marginRight: '0',
            position: 'relative',
            paddingBottom: '16px'
          }}
        >
        {/* Hero Section */}
        <div className="md:flex-shrink-0 relative z-20">
          <HeroSection />
        </div>

        {/* Dashboard Cards Section - Fixed gaps that never change */}
      <div className="max-w-full mx-auto px-4 sm:px-5 md:px-0 sm:scale-90 md:scale-100 md:flex-1 md:flex md:flex-col relative z-10 md:mt-[10px]" style={{ paddingLeft: '60px', paddingRight: '60px', marginBottom: '16px' }}>
        {/* Mobile/Tablet: Stacked Layout | Desktop: Grid Layout */}
        <div className="flex flex-col md:grid md:pt-[10px] pl-0 pt-4 pr-0 md:w-full md:h-full" 
          style={{ 
            gridTemplateColumns: 'repeat(10, 1fr)', 
            gridTemplateRows: '1fr 1fr',
            alignItems: 'stretch',
            gap: '16px'
          }}>
          {/* Column 1-4: Course Card - Full height spanning 2 rows (40% width) */}
          <motion.div 
            className="dashboard-grid-item-1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <CourseCard />
          </motion.div>

          {/* Column 5-7: Progress Card (top) - 30% width */}
          <motion.div 
            className="dashboard-grid-item-2"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <ProgressCard />
          </motion.div>

          {/* Column 8-10: Teacher Note Card (top) - 30% width */}
          <motion.div 
            className="dashboard-grid-item-3"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <TeacherNoteCard />
          </motion.div>

          {/* Bottom Row: Three cards in 60% space (20% each = 2 columns each) */}
          <motion.div 
            className="dashboard-grid-item-4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <AssignmentCard />
          </motion.div>
          <motion.div 
            className="dashboard-grid-item-5"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <QuizCard />
          </motion.div>
          <motion.div 
            className="dashboard-grid-item-6"
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
    </div>
    </div>
  )
}

export default GitaPage

