import type { QuizData } from '../types/quiz'

export const englishQuiz: QuizData = {
  questions: [
    {
      question: 'What is the past tense of "go"?',
      choices: ['goed', 'went', 'gone', 'going'],
      correctAnswer: 1
    },
    {
      question: 'Which word is a synonym for "happy"?',
      choices: ['sad', 'joyful', 'angry', 'tired'],
      correctAnswer: 1
    },
    {
      question: 'What is the plural form of "child"?',
      choices: ['childs', 'children', 'childes', 'child'],
      correctAnswer: 1
    },
    {
      question: 'Which sentence is grammatically correct?',
      choices: [
        'Me and him went to the store.',
        'He and I went to the store.',
        'Him and me went to the store.',
        'I and he went to the store.'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is the opposite of "brave"?',
      choices: ['strong', 'cowardly', 'weak', 'fearful'],
      correctAnswer: 1
    }
  ]
}

export const mathsQuiz: QuizData = {
  questions: [
    {
      question: 'What is 15 × 8?',
      choices: ['120', '125', '130', '115'],
      correctAnswer: 0
    },
    {
      question: 'What is 24 ÷ 6?',
      choices: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      question: 'What is 7² (7 squared)?',
      choices: ['14', '49', '64', '56'],
      correctAnswer: 1
    },
    {
      question: 'What is 3/4 + 1/4?',
      choices: ['1/2', '1', '4/8', '2/4'],
      correctAnswer: 1
    },
    {
      question: 'What is 20% of 50?',
      choices: ['5', '10', '15', '25'],
      correctAnswer: 1
    }
  ]
}

export const gitaQuiz: QuizData = {
  questions: [
    {
      question: 'What does "Karma" mean in Bhagwat Geeta?',
      choices: ['Action', 'Destiny', 'Prayer', 'Meditation'],
      correctAnswer: 0
    },
    {
      question: 'Who is the main teacher in Bhagwat Geeta?',
      choices: ['Lord Rama', 'Lord Krishna', 'Lord Shiva', 'Lord Brahma'],
      correctAnswer: 1
    },
    {
      question: 'What is "Dharma" in Bhagwat Geeta?',
      choices: ['Religion', 'Duty', 'Prayer', 'Meditation'],
      correctAnswer: 1
    },
    {
      question: 'What does "Moksha" mean?',
      choices: ['Wealth', 'Liberation', 'Knowledge', 'Power'],
      correctAnswer: 1
    },
    {
      question: 'Main message of Bhagwat Geeta?',
      choices: [
        'To fight wars',
        'Perform duties without attachment',
        'Avoid all actions',
        'Seek material wealth'
      ],
      correctAnswer: 1
    }
  ]
}

export const getQuizData = (type: 'english' | 'maths' | 'gita'): QuizData => {
  switch (type) {
    case 'english':
      return englishQuiz
    case 'maths':
      return mathsQuiz
    case 'gita':
      return gitaQuiz
    default:
      return englishQuiz
  }
}

