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
    },
  },
  plugins: [],
}

