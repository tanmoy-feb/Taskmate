import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // Important for correct serving via Express in production
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Redirect API calls in dev mode
    },
  },
});
