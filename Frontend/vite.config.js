import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forwards /api/* calls to the backend so the browser never
      // sees a cross-origin request (backend has no CORS setup)
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
