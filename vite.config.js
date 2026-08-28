import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve("src/index.js"),
      name: "Widgets",
      fileName: "widgets",
    },

    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
