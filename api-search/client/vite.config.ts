/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put all Material-UI code into its own 'mui' chunk
            if (id.includes('@mui')) {
              return 'vendor_mui';
            }
            // Put React and Redux core libraries into a 'react' chunk
            if (id.includes('react') || id.includes('redux')) {
              return 'vendor_react';
            }
            // Put all other third-party libraries into a general 'vendor' chunk
            return 'vendor';
          }
        }
      }
    }
  }
});