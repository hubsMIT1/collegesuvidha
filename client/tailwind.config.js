/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cs: {
          background: "#EAEDED",
          light_blue: "#232F3A",
          yellow: "#FEBD69",
          DEFAULT: "#131921",
          textHdClr:'rgb(126 34 206)'
        },
      },
    },
  },
  plugins: [

    // tailwindcss: {},
    // autoprefixer: {},
  ],
};