/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6EAFB',
          200: '#CDD5F7',
          300: '#B4BFF4',
          400: '#9BA9F0',
          500: '#92A4E6', // base color
          600: '#7F8FD1',
          700: '#6B7ABD',
          800: '#5865A8',
          900: '#454F94'
        }
      }
    },
  },
  plugins: [require('daisyui')],
}

