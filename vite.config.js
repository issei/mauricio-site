import { defineConfig } from 'vite'
import { resolve, parse } from 'path';
import tailwindcss from '@tailwindcss/vite'
import { globSync } from 'glob';
import sitemap from 'vite-plugin-sitemap';


// Seleciona todos os HTMLs na pasta src
const htmlFiles = globSync('src/*.html');
const htmlInput = Object.fromEntries(
  htmlFiles.map(file => [
    parse(file).name,
    resolve(__dirname, file)
  ])
);

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: htmlInput,
    },
  },
  plugins: [
    tailwindcss(),
    sitemap({ hostname: 'https://mauricio.issei.com.br' })
  ]
})