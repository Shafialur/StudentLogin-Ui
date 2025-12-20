export interface QuizQuestion {
  question: string
  choices: string[]
  correctAnswer: number // Index of correct answer (0-based)
}

export interface QuizData {
  questions: QuizQuestion[]
}

export type QuizType = 'english' | 'maths' | 'gita'

