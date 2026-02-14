import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Import SVGs as React components
    // Usage: import { ReactComponent as Logo } from './logo.svg'
    // Or: import Logo from './logo.svg?react'
    svgr({
      svgrOptions: {
        // SVGR options
        icon: true, // Replace width/height with 1em to make SVG scale with font-size
        svgo: true, // Optimize SVGs
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false, // Keep viewBox for proper scaling
                },
              },
            },
          ],
        },
      },
      include: '**/*.svg',
    }),
    // Gzip compression for production builds
    // Files larger than 1KB will be compressed
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false, // Keep original files
      verbose: true, // Log compression results
      filter: /\.(js|css|html|json|svg)$/i, // File types to compress
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['wouter'],
        },
      },
    },
  },
  esbuild: {
    // Remove console.log and debugger in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});
