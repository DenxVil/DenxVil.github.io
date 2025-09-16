import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages optimized configuration
export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub Pages serves from root domain (denx.me)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps for production
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Optimized chunk splitting for GitHub Pages
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            return 'vendor';
          }
        },
        // GitHub Pages friendly file naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  // Optimized for GitHub Pages performance
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei'] // Let these load naturally for better performance
  }
})
