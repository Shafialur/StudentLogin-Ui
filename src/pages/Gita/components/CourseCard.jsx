import React, { memo } from 'react'
import OptimizedImage from '../../../components/OptimizedImage'

const CourseCard = memo(() => {
  return (
    <div 
      className="w-full h-full md:max-h-[500px] bg-white rounded-2xl border-2 border-gray-300 p-2" 
      style={{ 
        textAlign: 'left', 
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    >
      <OptimizedImage
        src="/images/Krishna&arnjuna-cardimage.png"
        alt="Krishna and Arjuna"
        className="course-card-image w-full h-full rounded-xl"
        width={800}
        height={600}
        priority={true}
        style={{ objectFit: 'cover', maxWidth: '100%' }}
      />
    </div>
  )
})

CourseCard.displayName = 'CourseCard'

export default CourseCard

