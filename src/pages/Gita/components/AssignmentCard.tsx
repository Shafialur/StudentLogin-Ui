import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AssignmentCard = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showCamera, setShowCamera] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleCaptureImage = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile, front on desktop
      })
      setStream(mediaStream)
      setShowCamera(true)
      setShowModal(false)
      
      // Set video source when stream is available
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error: unknown) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions and try again.')
    }
  }

  const capturePhoto = (): void => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0)
      
      // Convert to blob
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          console.log('Image captured:', blob)
          // Handle the captured image
          alert('Image captured successfully!')
          stopCamera()
        }
      }, 'image/jpeg', 0.9)
    }
  }

  const stopCamera = (): void => {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  // Set video source and play when stream is available
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch((err: Error) => {
        console.error('Error playing video:', err)
      })
    }
  }, [stream])

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      }
    }
  }, [stream])

  const handleUploadFromDevice = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('File selected:', file)
      // Handle the uploaded file
      alert(`File "${file.name}" selected successfully!`)
      setShowModal(false)
    }
  }

  return (
    <div className="bg-assignment-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 relative flex flex-col h-full w-full lg:max-h-[250px]">
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 lg:mb-1.5">
        {/* Treasure Chest/Box Icon */}
        <img 
          src="/images/box.png" 
          alt="Box" 
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))' }}
          loading="lazy"
          decoding="async"
          width="40"
          height="40"
        />
        <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-gray-900">Assignment</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-2">
          <div>
            <p className="font-extrabold text-gray-900 text-[10px] sm:text-xs lg:text-xs">Gita Verse</p>
            <p className="font-extrabold text-gray-900 text-[10px] sm:text-xs lg:text-xs">Practice</p>
          </div>
          {/* Scroll with Quill Image */}
          <div>
            <img 
              src="/images/gitaverse.png" 
              alt="Gita Verse Scroll" 
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.6))' }}
            loading="lazy"
            decoding="async"
            width="56"
            height="56"
            />
          </div>
        </div>
        
        {/* Upload Button - More Yellow Gradient - At Bottom */}
        <div className="mt-auto">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-orange-600 hover:bg-orange-700 backdrop-blur-sm lg:backdrop-blur-md border border-white/60 rounded-full w-full text-white font-extrabold py-1.5 sm:py-2 lg:py-2 px-2 sm:px-3 lg:px-3 transition-all duration-200 flex items-center justify-between text-[10px] sm:text-xs lg:text-xs"
          >
            <span>Upload Your work</span>
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.21z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera View */}
      <AnimatePresence>
        {showCamera && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Camera Interface */}
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Video Preview */}
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="max-w-full max-h-full"
                  style={{ transform: 'scaleX(-1)' }} // Mirror effect
                />
                
                {/* Camera Controls */}
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
                  {/* Capture Button */}
                  <motion.button
                    onClick={capturePhoto}
                    className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-400"></div>
                  </motion.button>
                  
                  {/* Close Button */}
                  <motion.button
                    onClick={stopCamera}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close Camera
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Popup */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ paddingTop: '-50%' , paddingBottom: '50%'}}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="bg-white rounded-xl p-3 shadow-2xl max-w-xs w-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 248, 220, 0.95) 0%, rgba(255, 245, 200, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.6)'
                }}
              >
                <h3 className="text-sm font-extrabold text-gray-900 mb-3 text-center">Upload Your Work</h3>
                
                <div className="space-y-2">
                  {/* Capture Image Option */}
                  <motion.button
                    onClick={handleCaptureImage}
                    className="w-full p-2 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Capture Image
                  </motion.button>

                  {/* Upload from Device Option */}
                  <motion.button
                    onClick={handleUploadFromDevice}
                    className="w-full p-2 rounded-lg bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-green-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Upload from Device
                  </motion.button>

                  {/* Cancel Button */}
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="w-full p-2 rounded-lg bg-gray-600 text-white font-bold text-xs hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AssignmentCard



