import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://identity-dev.boatflex.com',
        changeOrigin: true,
        secure: false,
      },
      '/connect': {
        target: 'https://identity-dev.boatflex.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
