import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5050',   // 👈 force IPv4
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (_pr, req) => console.log('→ proxy', req.method, req.url))
          proxy.on('proxyRes', (res, req) => console.log('← proxy', res.statusCode, req.method, req.url))
          proxy.on('error', (err, req) => console.error('proxy error', err.code || err.message, req.method, req.url))
        },
      },
    },
  },
})
