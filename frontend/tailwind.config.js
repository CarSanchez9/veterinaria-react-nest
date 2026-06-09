/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00B300",     // verde
        secondary: "#E6CC00",   // amarillo
        dark: "#000000",        // negro
        lightbg: "#F8FAFC",     // fondo claro
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}