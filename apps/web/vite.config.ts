import path from "node:path";
import { defineConfig } from 'vite'
import { reactRouter } from "@react-router/dev/vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRouter(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  ssr: {
    noExternal: ['@react-spectrum/s2']
  },
  optimizeDeps: {
    include: ['@react-spectrum/s2']
  }
})
