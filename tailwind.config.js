/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          gold: '#D4AF37',
          'gold-hover': '#C5A028',
          dark: '#0A0F1C',
          card: '#111827',
          accent: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        moveRight: {
          '0%': { left: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        moveLeft: {
          '0%': { right: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { right: '100%', opacity: '0' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        moveRight: 'moveRight 3s infinite linear',
        moveLeft: 'moveLeft 3s infinite linear',
      }
    },
  },
  plugins: [],
}
