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
        rounded: ['Nunito', 'Quicksand', 'Varela Round', 'Comfortaa', 'system-ui', 'sans-serif'],
      },
      colors: {
        'yogi-blue': '#3B82F6',
        'yogi-orange': '#F97316',
        'yogi-pink': '#EC4899',
        'yogi-yellow': '#FBBF24',
      },
      backgroundImage: {
        'gita-gradient': 'linear-gradient(90deg, #60A4E6 0%, #72B4D1 10%, #7AB9D4 20%, #9ECACF 30%, #E6CDA3 45%, #E6C4A7 55%, #E6906E 70%, #E6A4AE 85%, #C790C7 95%, #D675D6 100%)',
        'english-gradient': 'linear-gradient(90deg, #5B7FA0 0%, #6B8FB0 10%, #7B9FC0 20%, #8BAFD0 30%, #C9A584 45%, #D9B594 55%, #E9C5A4 70%, #D9A5A5 85%, #C995B5 95%, #B985C5 100%)',
        'page-overlay': 'linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(176, 224, 230, 0.18) 20%, rgba(255, 228, 181, 0.15) 50%, rgba(255, 182, 193, 0.18) 80%, rgba(221, 160, 221, 0.15) 100%)',
        'blur-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.08) 100%)',
        'teacher-card': 'linear-gradient(135deg, rgba(250, 180, 220, 0.75) 0%, rgba(240, 180, 250, 0.7) 25%, rgba(220, 180, 255, 0.75) 50%, rgba(200, 200, 255, 0.8) 75%, rgba(180, 220, 255, 0.85) 100%)',
        'progress-card': 'linear-gradient(135deg, rgba(180, 220, 230, 0.9) 0%, rgba(200, 230, 235, 0.85) 15%, rgba(220, 235, 240, 0.8) 30%, rgba(255, 235, 210, 0.85) 50%, rgba(255, 220, 180, 0.9) 70%, rgba(255, 210, 160, 0.9) 85%, rgba(255, 200, 140, 0.95) 100%)',
        'assignment-card': 'linear-gradient(135deg, rgba(255, 248, 200, 0.8) 0%, rgba(255, 245, 180, 0.75) 50%, rgba(250, 240, 170, 0.85) 100%)',
        'quiz-card': 'linear-gradient(135deg, rgba(173, 216, 250, 0.85) 0%, rgba(180, 220, 255, 0.8) 10%, rgba(190, 225, 255, 0.75) 20%, rgba(200, 230, 255, 0.73) 30%, rgba(210, 235, 255, 0.71) 40%, rgba(220, 240, 255, 0.73) 50%, rgba(230, 245, 255, 0.75) 60%, rgba(240, 248, 255, 0.77) 70%, rgba(245, 250, 255, 0.79) 80%, rgba(250, 252, 255, 0.81) 90%, rgba(255, 255, 255, 0.83) 100%)',
        'system-card': 'linear-gradient(135deg, rgba(173, 255, 173, 0.85) 0%, rgba(180, 255, 180, 0.8) 10%, rgba(190, 255, 190, 0.75) 20%, rgba(200, 255, 200, 0.73) 30%, rgba(210, 255, 210, 0.71) 40%, rgba(220, 255, 220, 0.73) 50%, rgba(230, 255, 230, 0.75) 60%, rgba(240, 255, 240, 0.77) 70%, rgba(245, 255, 245, 0.79) 80%, rgba(250, 255, 250, 0.81) 90%, rgba(255, 255, 255, 0.83) 100%)',
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

