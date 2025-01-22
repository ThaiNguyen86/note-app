/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': 'rgb(77, 125, 173)', 
        'custom-gray': 'rgb(198, 199, 193)', 
        'custom-yellow': 'rgb(255, 219, 16)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      }

    },
  },
  plugins: [],
}
