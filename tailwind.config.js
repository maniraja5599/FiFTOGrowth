/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fifto: {
          dark: '#030508',
          canvas: '#05080c',
          card: '#080d14',
          surface: '#0d1520',
          border: 'rgba(255, 255, 255, 0.08)',
          green: {
            DEFAULT: '#044b1c',
            light: '#10b981',
            neon: '#00ff88',
            glow: 'rgba(16, 185, 129, 0.3)',
          },
          crimson: {
            DEFAULT: '#910608',
            light: '#f43f5e',
            glow: 'rgba(244, 63, 94, 0.3)',
          },
          gold: '#d4af37',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      keyframes: {
        'border-beam': {
          '0%': { 'offset-distance': '0%' },
          '100%': { 'offset-distance': '100%' },
        },
        'shimmer-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'border-beam': 'border-beam 8s linear infinite',
        'shimmer-slide': 'shimmer-slide 2.5s infinite linear',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
      }
    },
  },
  plugins: [],
}
