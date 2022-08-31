const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif", ...defaultTheme.fontFamily.sans],
        Montserrat: ["Montserrat", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-pattern.svg')",
        "login-pattern": "url('/images/login-pattern.svg')"
      },
      colors:{
        "primary":"#5956E9",
      },
    },
  },
  plugins: [],
};
