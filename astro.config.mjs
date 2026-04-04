// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { downloadAllPdfs } from './src/lib/download-pdfs.mjs';

// https://astro.build/config
export default defineConfig({
  outDir: 'public',
  publicDir: 'static',
  integrations: [{
    name: 'download-pdfs',
    hooks: {
      'astro:config:setup': async () => {
        await downloadAllPdfs();
      }
    }
  }],
  vite: {
    plugins: [tailwindcss()]
  }
});
