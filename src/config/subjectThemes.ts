// Theme configurations for each subject
// This ensures each page maintains its unique visual identity while sharing components

export interface HeroTheme {
  gradientClass: string
  greeting: string
  courseName: {
    line1: string
    line2: string
    line3?: string
  }
  defaultChildName: string
  icon: {
    src: string
    alt: string
  }
  decorativeImages: {
    // Mobile images
    mobileMain?: {
      src: string
      alt: string
      position: { left?: string; right?: string; bottom?: string; top?: string }
    }
    mobileHighlight?: {
      src: string
      alt: string
      position: { left?: string; right?: string; bottom?: string; top?: string }
    }
    mobileCat?: {
      src: string
      alt: string
      position: { left?: string; right?: string; bottom?: string; top?: string }
    }
    // Desktop images
    desktopMain?: {
      src: string
      alt: string
      position: { left?: string; right?: string; bottom?: string; top?: string }
    }
    desktopClouds?: Array<{
      src: string
      alt: string
      position: { top?: string; left?: string; right?: string }
    }>
    desktopOwl?: {
      src: string
      alt: string
      position: { top?: string; left?: string; right?: string }
    }
    desktopHighlight?: {
      src: string
      alt: string
      position: { bottom?: string; left?: string; top?: string; right?: string }
    }
    desktopCat?: {
      src: string
      alt: string
      position: { bottom?: string; left?: string }
    }
    // Gita-specific decorative elements
    backgroundDesignSymbol?: boolean
    cloud2?: Array<{
      position: { top?: string; bottom?: string; left?: string; right?: string }
    }>
    lotus?: Array<{
      src: string
      position: { bottom?: string; left?: string }
    }>
    chariot?: {
      src: string
      alt: string
    }
    sun?: boolean
  }
}

export interface ProgressTheme {
  progressBarColor: 'orange' | 'rainbow-pink' | 'rainbow-red'
  movingIcon: {
    src: string
    alt: string
    size: string
  }
  endIcon?: {
    src: string
    alt: string
    size: string
  }
  labelText: string
  showPercentage?: boolean
  showSmallStars?: boolean
  labelPosition?: 'left' | 'right'
}

export interface CourseCardTheme {
  fallbackImage: string
  fallbackAlt: string
}

export interface TeacherNoteCardTheme {
  teacherImage: string
  teacherName: string
}

export interface AssignmentCardTheme {
  title: string
  subtitle: string
  scrollImage: string
  scrollAlt: string
}

export interface QuizCardTheme {
  title: string
  description?: string
  image?: string
  imageAlt?: string
  quizType: 'gita' | 'english' | 'maths'
}

export interface SystemCheckCardTheme {
  images: {
    video: string
    audio: string
    network: string
  }
}

export interface SubjectTheme {
  hero: HeroTheme
  progress: ProgressTheme
  courseCard: CourseCardTheme
  teacherNoteCard: TeacherNoteCardTheme
  assignmentCard: AssignmentCardTheme
  quizCard: QuizCardTheme
  systemCheckCard: SystemCheckCardTheme
}

// Gita Theme
export const gitaTheme: SubjectTheme = {
  hero: {
    gradientClass: 'bg-gita-gradient',
    greeting: 'Namaste',
    courseName: {
      line1: 'Gita Wisdom -',
      line2: 'Inner Peace?'
    },
    defaultChildName: 'Krishna',
    icon: {
      src: '/images/om-symbol.png',
      alt: 'Om symbol'
    },
    decorativeImages: {
      backgroundDesignSymbol: true,
      cloud2: [
        { position: { top: '24', left: '1/3' } },
        { position: { bottom: '20', right: '24' } }
      ],
      desktopMain: {
        src: '/images/main-cloud.png',
        alt: 'Main cloud desktop',
        position: { right: '0', bottom: '-20' }
      },
      desktopHighlight: {
        src: '/images/cloud2.png',
        alt: 'Cloud at bottom',
        position: { bottom: '-20', left: '55%' }
      },
      lotus: [
        { src: '/images/lotus.png', position: { bottom: '-20px', left: '-20' } },
        { src: '/images/lotus.png', position: { bottom: '-20px', left: '45%' } },
        { src: '/images/lotus1.png', position: { bottom: '0px', left: '7%' } }
      ],
      chariot: {
        src: '/images/chariot.png.png',
        alt: 'Krishna and Arjuna in chariot'
      },
      sun: true,
      mobileMain: {
        src: '/images/main-cloud.png',
        alt: 'Main cloud mobile',
        position: { right: '-4', bottom: '-3' }
      }
    }
  },
  progress: {
    progressBarColor: 'orange',
    movingIcon: {
      src: '/images/progresschariot.png',
      alt: 'Progress chariot',
      size: 'w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18'
    },
    endIcon: {
      src: '/images/progressendtemple.png',
      alt: 'Temple',
      size: 'w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16'
    },
    labelText: 'Dharma Path',
    labelPosition: 'left'
  },
  courseCard: {
    fallbackImage: '/images/Krishna&arnjuna-cardimage.png',
    fallbackAlt: 'Krishna and Arjuna'
  },
  teacherNoteCard: {
    teacherImage: '/images/teacher.png.png',
    teacherName: 'Ms. Guru'
  },
  assignmentCard: {
    title: 'Gita Verse',
    subtitle: 'Practice',
    scrollImage: '/images/gitaverse.png',
    scrollAlt: 'Gita Verse Scroll'
  },
  quizCard: {
    title: 'Gyan (Knowledge) Scroll',
    image: '/images/quizpaper.png',
    imageAlt: 'Quiz paper scroll',
    quizType: 'gita'
  },
  systemCheckCard: {
    images: {
      video: '/images/video.png',
      audio: '/images/audio.png',
      network: '/images/network.png'
    }
  }
}

// English Theme
export const englishTheme: SubjectTheme = {
  hero: {
    gradientClass: 'bg-english-gradient',
    greeting: 'Hi',
    courseName: {
      line1: 'English Journey -',
      line2: 'Master Mind?'
    },
    defaultChildName: 'Krishna',
    icon: {
      src: '/images/eng-clock.png',
      alt: 'English clock'
    },
    decorativeImages: {
      mobileHighlight: {
        src: '/images/eng-highlight.png',
        alt: 'English highlight',
        position: { bottom: '0', right: '0' }
      },
      mobileCat: {
        src: '/images/eng-cat.png',
        alt: 'English cat',
        position: { bottom: '0', left: '0' }
      },
      desktopClouds: [
        {
          src: '/images/eng-cloud.png',
          alt: 'English cloud',
          position: { top: '8', left: '1/2' }
        },
        {
          src: '/images/eng-cloud.png',
          alt: 'English cloud',
          position: { top: '8', right: '30%' }
        },
        {
          src: '/images/eng-cloud.png',
          alt: 'English cloud',
          position: { top: '8', right: '0' }
        }
      ],
      desktopOwl: {
        src: '/images/eng-owl.png',
        alt: 'English owl',
        position: { top: '8', left: '45%' }
      },
      desktopHighlight: {
        src: '/images/eng-highlight.png',
        alt: 'English highlight',
        position: { bottom: '0', left: '1/2' }
      },
      desktopCat: {
        src: '/images/eng-cat.png',
        alt: 'English cat',
        position: { bottom: '0', left: '0' }
      }
    }
  },
  progress: {
    progressBarColor: 'rainbow-pink',
    movingIcon: {
      src: '',
      alt: '',
      size: ''
    },
    endIcon: undefined,
    labelText: 'Classes Completed',
    showPercentage: true,
    showSmallStars: true,
    labelPosition: 'right'
  },
  courseCard: {
    fallbackImage: '/images/english-coursecard.png',
    fallbackAlt: 'English course card'
  },
  teacherNoteCard: {
    teacherImage: '/images/eng-teacher.png',
    teacherName: 'Ms. Sarah'
  },
  assignmentCard: {
    title: 'English',
    subtitle: 'Practice',
    scrollImage: '/images/gitaverse.png',
    scrollAlt: 'English Scroll'
  },
  quizCard: {
    title: 'Test Your Knowledge',
    description: 'Word Challenge',
    quizType: 'english'
  },
  systemCheckCard: {
    images: {
      video: '/images/eng-system.png',
      audio: '/images/eng-system.png',
      network: '/images/eng-system.png'
    }
  }
}

// Maths Theme
export const mathsTheme: SubjectTheme = {
  hero: {
    gradientClass: 'bg-english-gradient',
    greeting: 'Hi',
    courseName: {
      line1: 'Number',
      line2: 'Magic - fun & sums ?'
    },
    defaultChildName: 'Math Magician',
    icon: {
      src: '/images/eng-clock.png',
      alt: 'Clock'
    },
    decorativeImages: {
      mobileHighlight: {
        src: '/images/maths-highlite.png',
        alt: 'Math highlight',
        position: { bottom: '0', left: '35%' }
      },
      desktopHighlight: {
        src: '/images/maths-highlite.png',
        alt: 'Math highlight',
        position: { bottom: '0', left: '1/2' }
      }
    }
  },
  progress: {
    progressBarColor: 'rainbow-red',
    movingIcon: {
      src: '/images/rocket.png',
      alt: 'Rocket',
      size: 'w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 lg:w-12 lg:h-12'
    },
    endIcon: {
      src: '/images/math-tressure.png',
      alt: 'Treasure chest',
      size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24'
    },
    labelText: 'Math Adventure',
    labelPosition: 'left'
  },
  courseCard: {
    fallbackImage: '/images/maths-coursecard.png',
    fallbackAlt: 'Maths course card'
  },
  teacherNoteCard: {
    teacherImage: '/images/math-teacher.png',
    teacherName: 'Ms. Sarah'
  },
  assignmentCard: {
    title: 'Weekly Math Challenge',
    subtitle: '',
    scrollImage: '/images/gitaverse.png',
    scrollAlt: 'Math Scroll'
  },
  quizCard: {
    title: 'Number Quiz Time',
    image: '/images/math-quiz.png',
    imageAlt: 'Quiz brain',
    quizType: 'maths'
  },
  systemCheckCard: {
    images: {
      video: '/images/maths-video.png',
      audio: '/images/maths-audio.png',
      network: '/images/maths-network.png'
    }
  }
}

// Helper function to get theme by subject name
export const getTheme = (subject: 'gita' | 'english' | 'maths'): SubjectTheme => {
  switch (subject) {
    case 'gita':
      return gitaTheme
    case 'english':
      return englishTheme
    case 'maths':
      return mathsTheme
    default:
      return gitaTheme
  }
}

