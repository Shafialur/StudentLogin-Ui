import React from 'react'

const CourseCard = () => {
  return (
    <div 
      className="w-full h-full bg-white rounded-2xl border-2 border-gray-300 p-2" 
      style={{ 
        textAlign: 'left', 
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    >
      <img 
        src="/images/english-coursecard.png" 
        alt="English course card" 
        className="course-card-image w-full h-full rounded-xl"
        style={{ objectFit: 'cover', maxWidth: '100%' }}
      />
    </div>
  )
}

export default CourseCard
