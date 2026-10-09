import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In development, forward form posts and the admin API to the Node server (npm run dev:api).
  server: { proxy: { '/api': 'http://localhost:3000' } },
})
