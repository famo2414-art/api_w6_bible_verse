import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bible': {
        target: 'https://labs.bible.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/bible/, '/api'),
      },
    },
  },
});
