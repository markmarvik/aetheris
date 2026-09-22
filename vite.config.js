import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  root: '.',
  // GitHub Pages sub-path: https://<user>.github.io/stackmap/
  // Local `npm run dev` stays at /. Production assets load under /stackmap/.
  base: mode === 'production' ? '/stackmap/' : '/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist'
  }
}));
