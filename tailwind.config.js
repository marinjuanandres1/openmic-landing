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
        brand: {
          50:  '#f3e8ff',
          100: '#e9d5ff',
          300: '#c084fc',
          400: '#a855f7',
          500: '#9333ea',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#4c1d95',
          900: '#2e1065',
        },
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.25), 0 0 40px rgba(124,58,237,0.1)' },
          '50%':       { boxShadow: '0 0 40px rgba(124,58,237,0.55), 0 0 80px rgba(124,58,237,0.25)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        glowPulse:  'glowPulse 3s ease-in-out infinite',
        fadeInUp:   'fadeInUp 0.5s ease-out both',
        float:      'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
