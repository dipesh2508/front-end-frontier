/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'primary': '#B00000',
        'title': '#2E2E2E',
        'footer-text': '#E6E6E6',
        "disabled": '#D6D4D4'
      },
      boxShadow: {
        'custom': '0px 0px 64px 0px rgba(176, 0, 0, 0.30)'
      },
    },
  },
  plugins: [],
}

