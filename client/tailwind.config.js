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
        'custom-green': 'rgb(97, 148, 138)', 
        'custom-gray': 'rgb(198, 199, 193)', 
        'custom-yellow': 'rgb(219, 188, 18)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      }

    },
  },
  plugins: [],
}
