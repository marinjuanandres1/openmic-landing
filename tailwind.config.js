/** @type {import('tailwindcss').Config} */
export default {
  // relative: paths resolve from this file, not the working directory
  content: { relative: true, files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'] },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
      },
      // Siente palette (Brand Book 2026), same tokens as backoffice.siente.live
      colors: {
        morado: { DEFAULT: '#6A0F84', dark: '#520A66' },
        naranja: '#F25021',
        lila: '#CEA7DC',
        negro: '#1D1D1F',
        tinta: '#121213',
        hueso: '#F4EFEB',
        gris: '#5E5A60',
        linea: '#E7E0DA',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        fadeInUp: 'fadeInUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
