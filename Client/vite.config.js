import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/JobsFetch': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/FreelancersFetch': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'swiper',
      'swiper/react',
      'react-icons/lu',
      'react-icons/fa'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
