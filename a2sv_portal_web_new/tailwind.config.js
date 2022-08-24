const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif', ...defaultTheme.fontFamily.sans],
        Montserrat: ['Montserrat', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}