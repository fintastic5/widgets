import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

const packageSource = fileURLToPath(new URL('../src/index.js', import.meta.url))
const packageStyles = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@holmesdev/widgets/style.css', replacement: packageStyles },
      { find: '@holmesdev/widgets', replacement: packageSource },
    ],
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
})
