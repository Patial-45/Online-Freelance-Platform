/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Teal 500
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        brand: {
          dark: '#0a0f1d',
          surface: '#111827',
          card: '#1e293b',
          border: '#334155',
          accent: '#14b8a6',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(20, 184, 166, 0.3)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
