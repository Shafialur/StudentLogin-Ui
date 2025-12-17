import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import CourseCard from './components/CourseCard'
import ProgressCard from './components/ProgressCard'
import TeacherNoteCard from './components/TeacherNoteCard'
import AssignmentCard from './components/AssignmentCard'
import QuizCard from './components/QuizCard'
import SystemCheckCard from './components/SystemCheckCard'

const EnglishPage = ({ childName = '', classDetails, code }) => {
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
      className="w-full min-h-screen sm:h-screen overflow-y-auto overflow-x-hidden relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: 'url(/images/backgorund.webp), url(/images/backgorund.png)' }}
    >
      {/* Responsive Container */}
      <div 
        className="w-full min-h-screen sm:h-full flex flex-col relative"
      >
        {/* Hero Section */}
        <div className="flex-shrink-0">
          <HeroSection childName={childName} classDetails={classDetails} code={code} />
        </div>

        {/* Dashboard Cards Section */}
        <div className="w-full mx-auto px-3 sm:px-4 md:px-8 flex-1 lg:flex lg:flex-col relative z-10 min-h-0 lg:mt-4 lg:mb-4 pb-4 sm:pb-6 pt-3 sm:pt-4">
          {/* Mobile/Tablet: Custom layout | Desktop: Grid Layout */}
          <div className="flex flex-col lg:grid lg:w-full lg:h-full gap-3 sm:gap-4 lg:gap-4 items-stretch" 
            style={{ 
              gridTemplateColumns: 'repeat(10, 1fr)', 
              gridTemplateRows: '1fr 1fr',
              gridAutoRows: 'minmax(0, 1fr)'
            }}>
            {/* Mobile/Tablet: Course Card - Full width */}
            <motion.div 
              className="dashboard-grid-item-1 w-full lg:w-auto"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <CourseCard code={code} />
            </motion.div>

            {/* Mobile/Tablet: Progress Card - Full width */}
            <motion.div 
              className="dashboard-grid-item-2 w-full lg:w-auto"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <ProgressCard />
            </motion.div>

            {/* Mobile/Tablet: Teacher Note Card - Full width */}
            <motion.div 
              className="dashboard-grid-item-3 w-full lg:w-auto lg:hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <TeacherNoteCard />
            </motion.div>

            {/* Mobile/Tablet: Assignment Card - Full width */}
            <motion.div 
              className="dashboard-grid-item-4 w-full lg:w-auto lg:hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <AssignmentCard />
            </motion.div>

            {/* Mobile/Tablet: Quiz and System Check Cards - 2 per row */}
            <div className="flex flex-row gap-3 sm:gap-4 lg:hidden">
              <motion.div 
                className="dashboard-grid-item-5 flex-1 min-w-0"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <QuizCard />
              </motion.div>
              <motion.div 
                className="dashboard-grid-item-6 flex-1 min-w-0"
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
              className="dashboard-grid-item-3 hidden lg:block lg:h-full"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <TeacherNoteCard />
            </motion.div>
            <motion.div 
              className="dashboard-grid-item-4 hidden lg:block lg:h-full"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <AssignmentCard />
            </motion.div>
            <motion.div 
              className="dashboard-grid-item-5 hidden lg:block lg:h-full"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <QuizCard />
            </motion.div>
            <motion.div 
              className="dashboard-grid-item-6 hidden lg:block lg:h-full"
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
  )
}

export default EnglishPage

