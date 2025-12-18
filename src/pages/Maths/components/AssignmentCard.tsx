import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchLastSessionDetails, getFacultyId, submitHomework } from '../../../utils/api'

interface AssignmentCardProps {
  code?: string
}

interface SelectedFile {
  file: File
  id: string
  preview?: string
}

const AssignmentCard = ({ code }: AssignmentCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showCamera, setShowCamera] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [classscheduleBookingId, setClassscheduleBookingId] = useState<number | null>(null)
  const [classscheduleId, setClassscheduleId] = useState<number | null>(null)
  const [facultyId, setFacultyId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleCaptureImage = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      })
      setStream(mediaStream)
      setShowCamera(true)
      setShowModal(false)
      
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
      
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const file = new File([blob], `captured-image-${Date.now()}.jpg`, { type: 'image/jpeg' })
          const id = `${Date.now()}-${Math.random()}`
          const reader = new FileReader()
          
          reader.onload = (e) => {
            setSelectedFiles((prev) => {
              if (prev.length >= 10) {
                setError('Maximum 10 files allowed')
                return prev
              }
              return [...prev, { file, id, preview: e.target?.result as string }]
            })
          }
          reader.readAsDataURL(file)
          
          stopCamera()
          setShowModal(true)
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

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch((err: Error) => {
        console.error('Error playing video:', err)
      })
    }
  }, [stream])

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
    const files = e.target.files
    if (!files || files.length === 0) return

    const newFiles: SelectedFile[] = []
    const currentCount = selectedFiles.length

    if (currentCount + files.length > 10) {
      setError(`Maximum 10 files allowed. You already have ${currentCount} file(s) selected.`)
      return
    }

    Array.from(files).forEach((file) => {
      const id = `${Date.now()}-${Math.random()}`
      const selectedFile: SelectedFile = { file, id }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setSelectedFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, preview: e.target?.result as string } : f))
          )
        }
        reader.readAsDataURL(file)
      }

      newFiles.push(selectedFile)
    })

    setSelectedFiles((prev) => [...prev, ...newFiles])
    setError(null)
    setShowModal(true)
  }

  const removeFile = (id: string): void => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== id))
    setError(null)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleSubmitHomework = async (): Promise<void> => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file')
      return
    }

    if (!classscheduleBookingId) {
      setError('Class schedule booking ID not available. Please refresh the page.')
      return
    }

    if (!classscheduleId) {
      setError('Class schedule ID not available. Please refresh the page.')
      return
    }

    setLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      let currentFacultyId = facultyId
      if (!currentFacultyId) {
        currentFacultyId = await getFacultyId(classscheduleId)
        setFacultyId(currentFacultyId)
      }

      const files = selectedFiles.map((sf) => sf.file)

      await submitHomework(
        files,
        classscheduleBookingId,
        currentFacultyId,
        (progress) => {
          setUploadProgress(progress)
        }
      )

      setSuccess(true)
      setSelectedFiles([])
      setUploadProgress(0)
      
      setTimeout(() => {
        setSuccess(false)
        setShowModal(false)
      }, 3000)
    } catch (err) {
      console.error('Error submitting homework:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit homework. Please try again.')
      setUploadProgress(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!code) return

      try {
        const data = await fetchLastSessionDetails(code)
        if (data?.last_class) {
          setClassscheduleBookingId(data.last_class.classschedule_booking_id || null)
          setClassscheduleId(data.last_class.classschedule_id || null)
        }
      } catch (err) {
        console.error('Error fetching session details:', err)
      }
    }

    fetchSessionDetails()
  }, [code])

  return (
    <div className="bg-assignment-card backdrop-blur-sm lg:backdrop-blur-md backdrop-saturate-[150%] border-2 border-gray-300 rounded-2xl p-2.5 sm:p-3 lg:p-3 relative flex flex-col h-full w-full lg:max-h-[250px]">
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 lg:mb-1.5">
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
            <p className="font-extrabold text-gray-900 text-[10px] sm:text-xs lg:text-xs">Weekly Math Challenge</p>
          </div>
          <div>
            <img 
              src="/images/math-assignment.png" 
              alt="Math assignment" 
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
              style={{ filter: 'drop-shadow(0 0 12px rgba(139, 69, 19, 0.6))' }}
              loading="lazy"
              decoding="async"
              width="56"
              height="56"
            />
          </div>
        </div>
        
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf,.doc,.docx"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence>
        {showCamera && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="max-w-full max-h-full"
                  style={{ transform: 'scaleX(-1)' }}
                />
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
                  <motion.button
                    onClick={capturePhoto}
                    className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-400"></div>
                  </motion.button>
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

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
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
                className="bg-white rounded-xl p-3 sm:p-4 shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 248, 220, 0.95) 0%, rgba(255, 245, 200, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.6)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-900">Upload Your Work</h3>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setError(null)
                      setSuccess(false)
                    }}
                    className="text-gray-500 hover:text-gray-700 p-0.5 flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-2 bg-green-100 border border-green-400 text-green-700 rounded-lg text-xs"
                  >
                    ✓ Homework submitted successfully!
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-xs"
                  >
                    {error}
                  </motion.div>
                )}

                {selectedFiles.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-gray-900 mb-1.5">
                      Selected Files ({selectedFiles.length}/10)
                    </h4>
                    <div className="space-y-1.5 max-h-32 sm:max-h-40 overflow-y-auto">
                      {selectedFiles.map((selectedFile) => (
                        <div
                          key={selectedFile.id}
                          className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-gray-200"
                        >
                          {selectedFile.preview ? (
                            <img
                              src={selectedFile.preview}
                              alt={selectedFile.file.name}
                              className="w-8 h-8 object-cover rounded flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-medium text-gray-900 truncate">
                              {selectedFile.file.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {formatFileSize(selectedFile.file.size)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(selectedFile.id)}
                            className="text-red-500 hover:text-red-700 p-0.5 flex-shrink-0"
                            disabled={loading}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {loading && uploadProgress > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium text-gray-700">Uploading...</span>
                      <span className="text-[10px] font-medium text-gray-700">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className="bg-orange-600 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <motion.button
                    onClick={handleCaptureImage}
                    disabled={loading || selectedFiles.length >= 10}
                    className="w-full p-2 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: selectedFiles.length >= 10 ? 1 : 1.02 }}
                    whileTap={{ scale: selectedFiles.length >= 10 ? 1 : 0.98 }}
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Capture Image
                  </motion.button>

                  <motion.button
                    onClick={handleUploadFromDevice}
                    disabled={loading || selectedFiles.length >= 10}
                    className="w-full p-2 rounded-lg bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: selectedFiles.length >= 10 ? 1 : 1.02 }}
                    whileTap={{ scale: selectedFiles.length >= 10 ? 1 : 0.98 }}
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {selectedFiles.length >= 10 ? 'Max Files Reached' : 'Select Files (Max 10)'}
                  </motion.button>

                  {selectedFiles.length > 0 && (
                    <motion.button
                      onClick={handleSubmitHomework}
                      disabled={loading}
                      className="w-full p-2 rounded-lg bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Submit Homework</span>
                        </>
                      )}
                    </motion.button>
                  )}

                  <motion.button
                    onClick={() => {
                      setShowModal(false)
                      setError(null)
                      setSuccess(false)
                    }}
                    disabled={loading}
                    className="w-full p-2 rounded-lg bg-gray-600 text-white font-bold text-xs hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
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