const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat"],
      },
      fontSize: {
        none: "0px",
        base: "10px",
      },
      lineHeight: {
        normal: "1.25",
      },
      colors: {
        primary: {
          DEFAULT: "#ECCF4D",
          hover: "#ffdd42",
        },
        gray: {
          DEFAULT: "#808080",
        }
      },
      screens: {
        xs: "540px",
        sm: "750px",
        md: "990px",
        lg: "1230px",
        xl: "1500px",
      },
    },
  },
  plugins: [
    plugin((function({ addBase }) {
      addBase({
        "html": { fontSize: "10px" },
        "body": { backgroundColor: "#000" },
      });
    })),
  ],
}

