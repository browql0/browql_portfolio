import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr(), // <== ajoute ici le plugin svgr
  ],
  resolve: {
    alias: {
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
    },
  },
})
