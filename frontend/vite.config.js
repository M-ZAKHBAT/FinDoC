import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./src/index.js", // Remplacez './src/main.js' par le chemin correct vers votre point d'entrée
      },
    },
  },
});
