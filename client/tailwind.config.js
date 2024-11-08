/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inactive: "#FFB84D",
        active: "#b8641a",
        hover: "#FFE3C2",
      },
    },
  },
  plugins: [],
};
