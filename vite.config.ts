import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDirectory = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDirectory, 'src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  preview: {
    host: '127.0.0.1',
    port: 3000,
  },
})
