/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
      }
    },
    colors: {
      primary: '#2B4570',  // Dark Corn
      secondary: '#5497A7',  // Blue Munsell
      tertiary: '#50858B',  // gray
      background: '#FOF7F4', // white
      highlight: '#62A8AC',  // Cadet Blue
      orange: '#D7D9CE',
      transparent: 'transparent',  // transparent
      darkcornflower: '#2B4570',
      mintcream: '#F0F7F4',
      cadetblue: '#62A8AC',
      bluemunsell: '#5497A7',
      steelteal: '#50858B',
      dark:'black',
      white:'white',
    }
  },
  plugins: [
  ],
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },

}

