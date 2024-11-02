/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inactive: "#FFB84D",
        active: "#E67E22",
        hover: "#FFE3C2",
      },
      boxShadow: {
        bottom: "0 4px 10px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
