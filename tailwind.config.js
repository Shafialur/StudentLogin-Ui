/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'yogi-blue': '#3B82F6',
        'yogi-orange': '#F97316',
        'yogi-pink': '#EC4899',
        'yogi-yellow': '#FBBF24',
      },
      backgroundImage: {
        'gita-gradient': 'linear-gradient(90deg, #6BB6FF 0%, #7FC8E8 10%, #87CEEB 20%, #B0E0E6 30%, #FFE4B5 45%, #FFDAB9 55%, #FFA07A 70%, #FFB6C1 85%, #DDA0DD 95%, #EE82EE 100%)',
        'english-gradient': 'linear-gradient(90deg, #5B7FA0 0%, #6B8FB0 10%, #7B9FC0 20%, #8BAFD0 30%, #C9A584 45%, #D9B594 55%, #E9C5A4 70%, #D9A5A5 85%, #C995B5 95%, #B985C5 100%)',
        'page-overlay': 'linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(176, 224, 230, 0.18) 20%, rgba(255, 228, 181, 0.15) 50%, rgba(255, 182, 193, 0.18) 80%, rgba(221, 160, 221, 0.15) 100%)',
        'blur-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(240, 248, 255, 0.18) 25%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 245, 238, 0.18) 75%, rgba(255, 255, 255, 0.2) 100%)',
        'teacher-card': 'linear-gradient(135deg, rgba(250, 200, 230, 0.25) 0%, rgba(240, 200, 250, 0.2) 25%, rgba(220, 200, 255, 0.25) 50%, rgba(200, 220, 255, 0.3) 75%, rgba(180, 230, 255, 0.35) 100%)',
        'progress-card': 'linear-gradient(135deg, rgba(180, 220, 230, 0.85) 0%, rgba(200, 230, 235, 0.7) 15%, rgba(220, 235, 240, 0.6) 30%, rgba(255, 235, 210, 0.7) 50%, rgba(255, 220, 180, 0.8) 70%, rgba(255, 210, 160, 0.85) 85%, rgba(255, 200, 140, 0.9) 100%)',
        'assignment-card': 'linear-gradient(135deg, rgba(255, 248, 220, 0.3) 0%, rgba(255, 245, 200, 0.25) 50%, rgba(250, 240, 190, 0.35) 100%)',
        'quiz-card': 'linear-gradient(135deg, rgba(173, 216, 250, 0.6) 0%, rgba(180, 220, 255, 0.55) 10%, rgba(190, 225, 255, 0.5) 20%, rgba(200, 230, 255, 0.48) 30%, rgba(210, 235, 255, 0.46) 40%, rgba(220, 240, 255, 0.48) 50%, rgba(230, 245, 255, 0.5) 60%, rgba(240, 248, 255, 0.52) 70%, rgba(245, 250, 255, 0.54) 80%, rgba(250, 252, 255, 0.56) 90%, rgba(255, 255, 255, 0.58) 100%)',
        'system-card': 'linear-gradient(135deg, rgba(173, 255, 173, 0.6) 0%, rgba(180, 255, 180, 0.55) 10%, rgba(190, 255, 190, 0.5) 20%, rgba(200, 255, 200, 0.48) 30%, rgba(210, 255, 210, 0.46) 40%, rgba(220, 255, 220, 0.48) 50%, rgba(230, 255, 230, 0.5) 60%, rgba(240, 255, 240, 0.52) 70%, rgba(245, 255, 245, 0.54) 80%, rgba(250, 255, 250, 0.56) 90%, rgba(255, 255, 255, 0.58) 100%)',
        'join-button': 'linear-gradient(180deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%)',
        'assignment-button': 'linear-gradient(90deg, rgba(255, 215, 0, 0.9) 0%, rgba(255, 225, 50, 0.85) 20%, rgba(200, 240, 130, 0.8) 45%, rgba(144, 238, 180, 0.75) 65%, rgba(130, 220, 220, 0.8) 85%, rgba(135, 206, 235, 0.85) 100%)',
        'quiz-button': 'linear-gradient(90deg, rgba(135, 206, 235, 0.85) 0%, rgba(95, 158, 160, 0.8) 50%, rgba(70, 130, 180, 0.85) 100%)',
        'system-button': 'linear-gradient(90deg, rgba(144, 238, 144, 0.85) 0%, rgba(124, 205, 124, 0.8) 50%, rgba(50, 205, 50, 0.85) 100%)',
        'progress-bar': 'linear-gradient(90deg, rgba(255, 107, 53, 0.9) 0%, rgba(255, 140, 66, 0.85) 50%, rgba(255, 160, 122, 0.8) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'card': '0 20px 40px -8px rgba(0, 0, 0, 0.3), 0 12px 24px -6px rgba(0, 0, 0, 0.25), 0 6px 12px -3px rgba(0, 0, 0, 0.2), 0 2px 6px -1px rgba(0, 0, 0, 0.15), inset 0 4px 16px rgba(255, 255, 255, 0.7), inset 0 -4px 16px rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.2)',
        'card-glass': '0 20px 40px -8px rgba(0, 0, 0, 0.2), 0 12px 24px -6px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        'join-button': '0 6px 20px rgba(59, 130, 246, 0.5), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
        'join-button-hover': '0 8px 24px rgba(59, 130, 246, 0.6), 0 3px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'hero-bottom-mobile': '26px',
        'hero-bottom-desktop': '48px',
      },
    },
  },
  plugins: [],
}

