/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
      },
      colors: {
        'primary': '#FDD750',
        'primary-light': '#FEEC96',
        'primary-dark': '#B69028',
      },
    },
  },
  plugins: [],
}

