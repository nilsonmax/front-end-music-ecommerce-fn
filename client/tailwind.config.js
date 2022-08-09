/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#2B4570',  // Dark Corn
      secondary: '#5497A7',  // Blue Munsell
      tertiary: '#50858B',  // gray
      background: '#FOF7F4', // white
      highlight: '#62A8AC',  // Cadet Blue
      orange: '#D7D9CE',
      transparent: 'transparent',  // transparent

    }
  },
  plugins: [
  ],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },

}

