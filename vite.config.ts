import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/ismoob/',
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
})
