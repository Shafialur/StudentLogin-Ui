import React from 'react'

const CourseCard = () => {
  // Custom width and height - adjust these values as needed
  const cardWidth = '100%'; // e.g., '600px', '80%', '100%'
  const cardHeight = 'auto'; // e.g., '400px', 'auto', '500px'
  
  return (
    <div 
      className="w-full h-full" 
      style={{ 
        textAlign: 'left', 
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    >
      <img 
        src="/images/Krishna&arnjuna-cardimage.png" 
        alt="Krishna and Arjuna" 
        className="course-card-image"
        style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%' }}
      />
    </div>
  )
}

export default CourseCard
