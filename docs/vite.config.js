import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import flowbiteReact from "flowbite-react/plugin/vite";

const packageSource = fileURLToPath(new URL('../src/index.js', import.meta.url))
const packageStyles = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: [
      { find: '@holmesdev/widgets/style.css', replacement: packageStyles },
      { find: '@holmesdev/widgets', replacement: packageSource },
    ],
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
})