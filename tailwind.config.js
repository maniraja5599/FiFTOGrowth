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
          dark: '#05070c',
          card: '#0a0e17',
          border: 'rgba(255, 255, 255, 0.08)',
          green: {
            DEFAULT: '#044b1c',
            light: '#10b981',
            glow: 'rgba(16, 185, 129, 0.25)',
          },
          crimson: {
            DEFAULT: '#910608',
            light: '#f43f5e',
            glow: 'rgba(244, 63, 94, 0.25)',
          },
          gold: '#d4af37',
        },
        premium: {
          gold: '#D4AF37',
          'gold-hover': '#C5A028',
          dark: '#05070C',
          card: '#0A0F1C',
          accent: '#131C2E',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        }
      },
      animation: {
        meteor: "meteor 6s linear infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      }
    },
  },
  plugins: [],
}
