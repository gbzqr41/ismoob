import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ismoob/' : '/',
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
}))
