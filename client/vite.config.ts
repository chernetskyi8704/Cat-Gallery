// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env.VITE_BASE_API_URL": process.env.VITE_BASE_API_URL,
    "process.env.VITE_API_KEY": process.env.VITE_API_KEY,
  },
});
