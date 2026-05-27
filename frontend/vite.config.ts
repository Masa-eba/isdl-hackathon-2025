import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/hooks': '/src/hooks',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
      '@/data': '/src/data',
      '@/services': '/src/services',
      '@/contexts': '/src/contexts',
    },
  },
})
