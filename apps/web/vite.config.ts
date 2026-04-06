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
  build: {
    target: ['es2022'],
    // Lightning CSS produces a much smaller CSS bundle than the default minifier.
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        // Bundle all S2 and style-macro generated CSS into a single bundle instead of code splitting.
        // Because atomic CSS has so much overlap between components, loading all CSS up front results in
        // smaller bundles instead of producing duplication between pages.
        manualChunks(id) {
          if (/macro-(.*)\.css$/.test(id) || /@react-spectrum\/s2\/.*\.css$/.test(id)) {
            return 's2-styles';
          }
        }
      }
    }
  },
  ssr: {
    noExternal: ['@react-spectrum/s2']
  },
  optimizeDeps: {
    include: ['@react-spectrum/s2']
  }
})
