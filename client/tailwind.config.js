/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        primary: "#2B4570", // Dark Corn
        secondary: "#5497A7", // Blue Munsell
        tertiary: "#50858B", // gray
        background: "#FOF7F4", // white
        highlight: "#62A8AC", // Cadet Blue
        /* orange: '#D7D9CE', */
        transparent: "transparent", // transparent
        darkconrflower: "#2B4570",
        mintcream: "#F0F7F4",
        cadetblue: "#62A8AC",
        bluemunsell: "#5497A7",
        steelteal: "#50858B",
        dark: "black",
        white: "white",
        blur: "rgba(0,0,0,0.5)",
        orange: colors.orange,
        yellow: "#FFE800",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "active"],
    },
  },
  plugins: [],
};
