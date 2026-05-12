import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    port: 5173,
    proxy: {
      // Forward any /api/* request from the Vite dev server
      // to the Vercel dev server running on port 3000.
      // This means both terminals must be running simultaneously.
      '/api': {
        target:       'http://localhost:3000',
        changeOrigin: true,
        secure:       false,
      }
    }
  }
})