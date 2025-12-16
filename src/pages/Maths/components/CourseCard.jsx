import React, { memo, useState } from 'react'
import OptimizedImage from '../../../components/OptimizedImage'
import { fetchLastSessionDetails } from '../../../utils/api'

const CourseCard = memo(({ code }) => {
  const [showImage, setShowImage] = useState(true)
  const [iframeSrc, setIframeSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCardClick = async () => {
    if (!code) {
      alert('Class verification code is not available. Please try again later.')
      return
    }

    if (!showImage) return // Already loaded

    setShowImage(false)
    setLoading(true)
    setError(null)

    try {
      const data = await fetchLastSessionDetails(code)
      if (data?.last_class?.ppt?.iframe_src) {
        setIframeSrc(data.last_class.ppt.iframe_src)
      } else {
        setError('No last class content available.')
        setShowImage(true) // Show image again if no data
      }
    } catch (err) {
      console.error('Error fetching last session details:', err)
      setError(err.message || 'Failed to load last class content.')
      setShowImage(true) // Show image again on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="w-full h-full md:max-h-[500px] bg-white rounded-2xl border-2 border-gray-300 p-2 cursor-pointer"
      style={{ 
        textAlign: 'left', 
        display: 'block',
        width: '100%',
        height: '100%'
      }}
      onClick={handleCardClick}
    >
      {showImage ? (
        <OptimizedImage
          src="/images/maths-coursecard.png"
          alt="Maths course card"
          className="course-card-image w-full h-full rounded-xl"
          width={800}
          height={600}
          priority={true}
          style={{ objectFit: 'cover', maxWidth: '100%' }}
        />
      ) : (
        <div
          className="w-full h-full rounded-xl overflow-hidden relative bg-white"
          style={{ aspectRatio: '16/9' }}
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm">Loading class content...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          ) : iframeSrc ? (
            <iframe
              src={iframeSrc}
              className="absolute inset-0 w-full h-full border-0 bg-white"
              title="Last Class Content"
              allowFullScreen
              style={{
                display: 'block',
                margin: 0,
                padding: 0,
                border: 'none',
                width: '103%',
                height: '103%',
                left: '-1.5%',
                top: '-1.5%',
                backgroundColor: '#ffffff'
              }}
            />
          ) : null}
        </div>
      )}
    </div>
  )
})

CourseCard.displayName = 'CourseCard'

export default CourseCard
