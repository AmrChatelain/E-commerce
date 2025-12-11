import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Ensure correct MIME types
    assetsInlineLimit: 0,
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript; charset=UTF-8',
    },
  },
})