import React from 'react'
import HeroSection from './HeroSection'
import CourseCard from './CourseCard'
import ProgressCard from './ProgressCard'
import TeacherNoteCard from './TeacherNoteCard'
import AssignmentCard from './AssignmentCard'
import QuizCard from './QuizCard'
import SystemCheckCard from './SystemCheckCard'

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Dashboard Cards Section */}
      <div className="max-w-full mx-auto px-6 py-6">
        {/* Grid Layout: 10 columns (4 for Course = 40%, 3 for Progress = 30%, 3 for Teacher = 30%, 2 each for bottom = 20% each) */}
        <div className="grid gap-6 pl-[40px] pt-[40px] pr-[40px]" style={{ gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: '1fr 1fr', height: '600px' }}>
          {/* Column 1-4: Course Card - Full height spanning 2 rows (40% width) */}
          <div style={{ gridColumn: '1 / 5', gridRow: '1 / 3' }}>
            <CourseCard />
          </div>

          {/* Column 5-7: Progress Card (top) - 30% width */}
          <div style={{ gridColumn: '5 / 8', gridRow: '1' }}>
            <ProgressCard />
          </div>

          {/* Column 8-10: Teacher Note Card (top) - 30% width */}
          <div style={{ gridColumn: '8 / 11', gridRow: '1' }}>
            <TeacherNoteCard />
          </div>

          {/* Bottom Row: Three cards in 60% space (20% each = 2 columns each) */}
          <div style={{ gridColumn: '5 / 7', gridRow: '2' }}>
            <AssignmentCard />
          </div>
          <div style={{ gridColumn: '7 / 9', gridRow: '2' }}>
            <QuizCard />
          </div>
          <div style={{ gridColumn: '9 / 11', gridRow: '2' }}>
            <SystemCheckCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

