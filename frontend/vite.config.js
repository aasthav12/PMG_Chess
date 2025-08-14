import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5050', // <- your API port (avoid 5000 on macOS)
        changeOrigin: true,
      },
    },
  },
})
