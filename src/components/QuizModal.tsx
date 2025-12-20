import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizData, QuizType } from '../types/quiz'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  quizData: QuizData
  quizType: QuizType
}

const QuizModal = ({ isOpen, onClose, quizData, quizType }: QuizModalProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
  const [streak, setStreak] = useState<number>(0)

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1

  // Reset quiz when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setAnsweredQuestions(new Set())
      setQuizCompleted(false)
      setShowCorrectAnswer(false)
      setStreak(0)
    }
  }, [isOpen])

  const handleAnswerSelect = (answerIndex: number): void => {
    if (selectedAnswer !== null || answeredQuestions.has(currentQuestionIndex)) {
      return // Prevent changing answer
    }

    setSelectedAnswer(answerIndex)
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestionIndex]))

    const isCorrect = answerIndex === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      setStreak(0)
      setShowCorrectAnswer(true) // Show correct answer when wrong
    }

    // Show result animation
    setShowResult(true)

    // Move to next question after delay (or show final score if last question)
    setTimeout(() => {
      if (isLastQuestion) {
        // Quiz completed - show final score after animation
        setQuizCompleted(true)
        setShowResult(false)
        setShowCorrectAnswer(false)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setShowCorrectAnswer(false)
      }
    }, 3000) // Increased delay to show correct answer
  }

  const handleClose = (): void => {
    onClose()
    // Reset state
    setTimeout(() => {
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setAnsweredQuestions(new Set())
      setQuizCompleted(false)
      setShowCorrectAnswer(false)
      setStreak(0)
    }, 300)
  }

  // Theme colors based on quiz type
  const getThemeColors = () => {
    switch (quizType) {
      case 'english':
        return {
          primary: 'from-blue-400 to-purple-500',
          secondary: 'bg-blue-100',
          accent: 'bg-purple-200',
          button: 'bg-blue-500 hover:bg-blue-600',
          correct: 'bg-green-400',
          wrong: 'bg-red-400',
          text: 'text-blue-900'
        }
      case 'maths':
        return {
          primary: 'from-orange-400 to-pink-500',
          secondary: 'bg-orange-100',
          accent: 'bg-pink-200',
          button: 'bg-orange-500 hover:bg-orange-600',
          correct: 'bg-green-400',
          wrong: 'bg-red-400',
          text: 'text-orange-900'
        }
      case 'gita':
        return {
          primary: 'from-amber-400 to-yellow-500',
          secondary: 'bg-amber-100',
          accent: 'bg-yellow-200',
          button: 'bg-amber-500 hover:bg-amber-600',
          correct: 'bg-green-400',
          wrong: 'bg-red-400',
          text: 'text-amber-900'
        }
    }
  }

  const colors = getThemeColors()
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              className={`relative w-[90vw] h-[90vh] bg-gradient-to-br ${colors.primary} rounded-3xl shadow-2xl overflow-hidden flex flex-col`}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            >
              {/* Header with Dark Text for Visibility - Mobile Responsive */}
              <div className={`${colors.secondary} px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border-b-4 border-white/50 shadow-lg relative overflow-hidden`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 relative z-10 flex-wrap">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <h2 className={`text-lg sm:text-2xl font-black ${colors.text} drop-shadow-lg`}>
                      {quizType === 'english' && '📚 English Quiz'}
                      {quizType === 'maths' && '🧮 Maths Quiz'}
                      {quizType === 'gita' && '🕉️ Gita Quiz'}
                    </h2>
                  </motion.div>
                  {streak > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border-2 border-yellow-300"
                    >
                      <motion.span
                        style={{ willChange: 'transform' }}
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-base sm:text-lg"
                      >
                        🔥
                      </motion.span>
                      <span className="text-xs sm:text-sm font-black text-yellow-900">{streak} Streak!</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:gap-4 relative z-10 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className={`${colors.text} font-bold text-sm sm:text-lg drop-shadow-md`}>
                        Q{currentQuestionIndex + 1}/{quizData.questions.length}
                      </span>
                      <motion.span
                        style={{ willChange: 'transform' }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="text-base sm:text-xl"
                      >
                        🎯
                      </motion.span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1 bg-white/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                      <span className={`${colors.text} text-xs sm:text-sm font-semibold`}>Score:</span>
                      <motion.span
                        key={score}
                        initial={{ scale: 1.5, color: '#10b981' }}
                        animate={{ scale: 1, color: 'inherit' }}
                        className={`${colors.text} font-black text-sm sm:text-lg`}
                      >
                        {score}
                      </motion.span>
                      <motion.span
                        style={{ willChange: 'transform' }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-base sm:text-lg"
                      >
                        ⭐
                      </motion.span>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${colors.button} hover:opacity-80 flex items-center justify-center ${colors.text} font-bold transition-all shadow-md flex-shrink-0`}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Enhanced Progress Bar with Fun Elements */}
              <div className="h-3 bg-white/20 relative overflow-hidden rounded-full mx-4 my-2">
                <motion.div
                  className={`h-full ${colors.button} shadow-lg rounded-full relative`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  {/* Progress Sparkles */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Progress Percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    {Math.round(((currentQuestionIndex + 1) / quizData.questions.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                {!quizCompleted ? (
                  <>
                    {/* Question with Fun Animation */}
                    <motion.div
                      key={currentQuestionIndex}
                      className={`${colors.accent} rounded-2xl p-3 sm:p-6 mb-3 sm:mb-6 shadow-lg relative overflow-hidden`}
                      initial={{ opacity: 0, x: -50, rotateY: -90 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                    >
                      {/* Fun Background Pattern - Optimized (Reduced from 20 to 10) */}
                      <div className="absolute inset-0 opacity-5">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-current"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              willChange: 'transform, opacity',
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 0.5, 0],
                            }}
                            transition={{
                              duration: 2 + Math.random(),
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="relative z-10">
                        {/* Thinking Emoji - Top on Mobile, Side on Desktop */}
                        <motion.div
                          className="text-3xl sm:text-5xl mb-2 sm:mb-0 flex justify-center sm:justify-start"
                          style={{ willChange: 'transform' }}
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          🤔
                        </motion.div>
                        {/* Question Text - Full Width on Mobile */}
                        <h3 className={`text-xl sm:text-2xl font-bold ${colors.text} mb-3 sm:mb-6 text-center sm:text-left`}>
                          {currentQuestion.question}
                        </h3>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 sm:space-y-3">
                        {currentQuestion.choices.map((choice, index) => {
                          const isSelected = selectedAnswer === index
                          const isCorrectAnswer = index === currentQuestion.correctAnswer
                          const isWrong = isSelected && !isCorrectAnswer
                          const isDisabled = selectedAnswer !== null || answeredQuestions.has(currentQuestionIndex)
                          // Show green glow for correct answer when wrong is selected
                          const showGreenGlow = showCorrectAnswer && isCorrectAnswer && !isSelected
                          // Show red glow for wrong selected answer
                          const showRedGlow = isWrong

                          let optionClass = `w-full p-3 sm:p-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 text-left border-2 ${
                            colors.secondary
                          } border-white/50 relative overflow-hidden`

                          if (isSelected && isCorrectAnswer) {
                            optionClass = `${colors.correct} text-white border-green-500 shadow-lg`
                          } else if (isWrong) {
                            optionClass = `${colors.wrong} text-white border-red-500 shadow-lg`
                          } else if (isSelected) {
                            optionClass = `${colors.button} text-white border-blue-500`
                          }

                          return (
                            <motion.button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={isDisabled}
                              className={optionClass}
                              whileHover={
                                !isDisabled
                                  ? {
                                      scale: 1.03,
                                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                                      y: -2,
                                    }
                                  : {}
                              }
                              whileTap={!isDisabled ? { scale: 0.97 } : {}}
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                isSelected && isCorrectAnswer
                                  ? {
                                      opacity: 1,
                                      y: 0,
                                      scale: [1, 1.05, 1],
                                    }
                                  : isWrong
                                  ? {
                                      opacity: 1,
                                      y: 0,
                                      x: [0, -10, 10, -10, 10, 0],
                                    }
                                  : {
                                      opacity: 1,
                                      y: 0,
                                    }
                              }
                              transition={
                                isWrong
                                  ? { x: { duration: 0.5 }, y: { delay: index * 0.1, duration: 0.3 }, opacity: { delay: index * 0.1, duration: 0.3 } }
                                  : { y: { delay: index * 0.1, duration: 0.3 }, opacity: { delay: index * 0.1, duration: 0.3 } }
                              }
                              style={{
                                boxShadow: showGreenGlow
                                  ? '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)'
                                  : showRedGlow
                                  ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)'
                                  : undefined,
                              }}
                            >
                              {/* Green Glow Effect for Correct Answer - Optimized */}
                              {showGreenGlow && (
                                <motion.div
                                  className="absolute inset-0 rounded-xl"
                                  style={{ willChange: 'box-shadow' }}
                                  animate={{
                                    boxShadow: [
                                      '0 0 15px rgba(34, 197, 94, 0.7)',
                                      '0 0 30px rgba(34, 197, 94, 0.5)',
                                      '0 0 15px rgba(34, 197, 94, 0.7)',
                                    ],
                                  }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                />
                              )}
                              
                              {/* Red Glow Effect for Wrong Answer - Optimized */}
                              {showRedGlow && (
                                <motion.div
                                  className="absolute inset-0 rounded-xl"
                                  style={{ willChange: 'box-shadow' }}
                                  animate={{
                                    boxShadow: [
                                      '0 0 15px rgba(239, 68, 68, 0.7)',
                                      '0 0 30px rgba(239, 68, 68, 0.5)',
                                      '0 0 15px rgba(239, 68, 68, 0.7)',
                                    ],
                                  }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                />
                              )}

                              {/* Shimmer effect for correct answers */}
                              {isSelected && isCorrectAnswer && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                  animate={{
                                    x: ['-100%', '100%'],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                />
                              )}
                              
                              <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                                <motion.span
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg bg-white/30 flex-shrink-0"
                                  animate={
                                    isSelected && isCorrectAnswer
                                      ? { rotate: [0, 360], scale: [1, 1.2, 1] }
                                      : {}
                                  }
                                >
                                  {String.fromCharCode(65 + index)}
                                </motion.span>
                                <span className="flex-1 text-sm sm:text-base">{choice}</span>
                                {isSelected && isCorrectAnswer && (
                                  <motion.span
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="text-3xl"
                                  >
                                    ✓
                                  </motion.span>
                                )}
                                {isWrong && (
                                  <motion.span
                                    initial={{ scale: 0, rotate: 180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="text-3xl"
                                  >
                                    ✗
                                  </motion.span>
                                )}
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>
                      
                      {/* Enhanced Error Message with Better Visibility - Smaller Size */}
                      {showCorrectAnswer && selectedAnswer !== null && selectedAnswer !== currentQuestion.correctAnswer && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="mt-2 sm:mt-4 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-300 shadow-lg relative overflow-hidden"
                        >
                          {/* Animated Background - Simplified */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="text-xl sm:text-2xl"
                            >
                              💡
                            </motion.div>
                            <div>
                              <p className="font-bold text-xs sm:text-sm mb-0.5 drop-shadow-md">
                                Correct Answer:
                              </p>
                              <p className="font-semibold text-sm sm:text-base drop-shadow-sm">
                                {currentQuestion.choices[currentQuestion.correctAnswer]}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Result Animation with Confetti */}
                    <AnimatePresence>
                      {showResult && (
                        <motion.div
                          className="fixed inset-0 flex items-center justify-center pointer-events-none z-[10000]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {isCorrect ? (
                            <>
                              {/* Confetti Effect - Optimized (Reduced from 30 to 15 particles) */}
                              {typeof window !== 'undefined' && [...Array(15)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-2 h-2 rounded-full"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
                                    willChange: 'transform',
                                  }}
                                  initial={{ y: -100, opacity: 1, scale: 0 }}
                                  animate={{
                                    y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                                    x: (Math.random() - 0.5) * 150,
                                    rotate: Math.random() * 360,
                                    opacity: [1, 1, 0],
                                    scale: [0, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 1.5 + Math.random() * 0.5,
                                    delay: Math.random() * 0.3,
                                    ease: 'easeOut',
                                  }}
                                />
                              ))}
                              
                              <motion.div
                                className="text-center relative z-10"
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                exit={{ scale: 0 }}
                              >
                                <motion.div
                                  className="text-8xl mb-4"
                                  animate={{
                                    rotate: [0, 10, -10, 10, -10, 0],
                                    scale: [1, 1.3, 1]
                                  }}
                                  transition={{ duration: 0.6, repeat: 2 }}
                                >
                                  🎉
                                </motion.div>
                                <motion.h3
                                  className="text-5xl font-black text-green-500 drop-shadow-2xl"
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                >
                                  Correct! 🎊
                                </motion.h3>
                                {streak > 1 && (
                                  <motion.p
                                    className="text-2xl font-bold text-yellow-400 mt-2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    🔥 {streak} Streak!
                                  </motion.p>
                                )}
                                <motion.div
                                  className="flex justify-center gap-2 mt-4"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  {[...Array(6)].map((_, i) => (
                                    <motion.span
                                      key={i}
                                      className="text-3xl"
                                      style={{ willChange: 'transform' }}
                                      animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 180, 360],
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        delay: i * 0.1,
                                        duration: 0.6,
                                        repeat: 1,
                                      }}
                                    >
                                      ⭐
                                    </motion.span>
                                  ))}
                                </motion.div>
                              </motion.div>
                            </>
                          ) : (
                            <motion.div
                              className="text-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              exit={{ scale: 0 }}
                            >
                              <motion.div
                                className="text-6xl sm:text-8xl mb-4"
                                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                💪
                              </motion.div>
                              <motion.div
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 sm:px-8 py-4 rounded-2xl border-4 border-orange-300 shadow-2xl mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <motion.h3
                                  className="text-3xl sm:text-5xl font-black text-white drop-shadow-2xl mb-2"
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity }}
                                >
                                  Almost There! 💪
                                </motion.h3>
                                <motion.p
                                  className="text-lg sm:text-2xl text-white font-bold drop-shadow-lg"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  Check the correct answer below! 👇
                                </motion.p>
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  /* Quiz Completed - Enhanced Final Score Screen */
                  <motion.div
                    className="text-center py-8 flex flex-col items-center justify-center h-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Trophy with Enhanced Animation */}
                    <motion.div
                      className="relative mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <motion.div
                        className="text-9xl"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        🏆
                      </motion.div>
                      {/* Sparkles around trophy */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-3xl"
                          style={{
                            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                            transform: 'translate(-50%, -50%)',
                            willChange: 'transform',
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 360],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          ⭐
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.h3
                      className="text-5xl font-black text-white mb-6 drop-shadow-2xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Quiz Completed! 🎉
                    </motion.h3>

                    <motion.div
                      className={`${colors.secondary} rounded-2xl p-6 mb-6 shadow-2xl border-4 border-white/30`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.p
                        className="text-4xl font-black text-gray-800 mb-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                      >
                        Your Score: {score} / {quizData.questions.length}
                      </motion.p>
                      <motion.p
                        className="text-2xl font-bold text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {score === quizData.questions.length
                          ? '🎊 Perfect! You are a Quiz Master! 🌟'
                          : score >= quizData.questions.length * 0.7
                          ? '🎯 Awesome! You are getting better! Keep it up! 🚀'
                          : '💪 Good try! Every expert was once a beginner! Try again! 🌱'}
                      </motion.p>
                    </motion.div>

                    {/* Fun Start Again Button */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <motion.button
                        onClick={() => {
                          setCurrentQuestionIndex(0)
                          setSelectedAnswer(null)
                          setShowResult(false)
                          setScore(0)
                          setAnsweredQuestions(new Set())
                          setQuizCompleted(false)
                          setShowCorrectAnswer(false)
                          setStreak(0)
                        }}
                        className={`${colors.button} text-white px-8 py-4 rounded-2xl font-black text-xl shadow-2xl border-4 border-white/30 relative overflow-hidden`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          <span>🎮</span>
                          <span>Try Again & Beat Your Score!</span>
                          <span>🚀</span>
                        </span>
                      </motion.button>

                      <motion.button
                        onClick={handleClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg border-2 border-gray-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: 'spring' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Close
                      </motion.button>
                    </div>

                    {/* Fun Encouragement Text */}
                    <motion.p
                      className="text-xl text-white/90 mt-6 font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {score === quizData.questions.length
                        ? '🌟 You are a champion! Want to prove it again? 🌟'
                        : score >= quizData.questions.length * 0.7
                        ? '🎯 So close to perfection! One more try? 🎯'
                        : '💪 Practice makes perfect! Ready for round 2? 💪'}
                    </motion.p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at document body level, breaking out of parent constraints
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}

export default QuizModal

