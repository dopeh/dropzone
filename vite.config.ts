import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// The Vue app lives in client/. In dev, Vite serves it on :5173 and proxies /api to the
// Express server on :3000. `npm run build` writes the static bundle to public/, which is
// what Express serves in production (`npm start`).
export default defineConfig({
  root: 'client',
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
});
