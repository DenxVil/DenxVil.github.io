import { defineConfig } from 'vite'

// GitHub Pages optimized configuration - Vanilla JS
export default defineConfig({
  plugins: [],
  base: '/', // GitHub Pages serves from root domain
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
            if (id.includes('three')) {
              return 'three';
            }
            if (id.includes('gsap')) {
              return 'gsap';
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
  // Optimized for vanilla JS + Three.js
  optimizeDeps: {
    include: ['three', 'gsap'],
  }
})
