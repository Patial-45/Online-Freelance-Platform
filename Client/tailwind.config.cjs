/** @type {import('tailwindcss').Config} */
module.exports = {
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
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        brand: {
          teal: '#1cd6ce',
          tealDark: '#0d9488',
          accent: '#14b8a6',
          cyan: '#06b6d4',
          canvas: '#ffffff',
          shady: '#f8fafc',
          shadyWhite: '#f5f5f5',
          dark: '#0f172a',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"PT Serif"', 'Merriweather', 'serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Merriweather"', '"PT Serif"', 'serif'],
        secular: ['"Secular One"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(20, 184, 166, 0.3)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};
