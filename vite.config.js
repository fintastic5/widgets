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
      external: ["react", "react-dom", "react/jsx-runtime", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "styled-components": "styled",
        },
      },
    },
  },
});
