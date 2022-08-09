/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#040404',  // black
      secondary: '#13505B',  // blue
      tertiary: '#119DA4',  // gray
      background: '#F7F0F0', // white
      highlight: '#D7D9CE',  // 
      orange: '#D7D9CE',
      transparent: 'transparent',  // transparent

    }
  },
  plugins: [
  ],
}

