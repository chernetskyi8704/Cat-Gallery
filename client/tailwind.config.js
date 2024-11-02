/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inactive: "#FBE0DC",
        active: "#FF868E",
      },
      boxShadow: {
        bottom: "0 4px 10px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
