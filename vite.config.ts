import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) {
              return 'vendor_react_router_dom';
            }
            if (id.includes('framer-motion')) {
              return 'vendor_framer_motion';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
