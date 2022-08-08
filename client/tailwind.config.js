/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#070600',  // black
      secondary: '#279AF1',  // blue
      tertiary: '#8c8c8c',  // gray
      background: '#ffffff', // white
      highlight: '#DB5A42',  // orange
      transparent: '#AARRGGBB',  // transparent

    }
  },
  plugins: [],
}

