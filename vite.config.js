import { defineConfig } from 'vite'
import { resolve, parse } from 'path';
import tailwindcss from '@tailwindcss/vite'
import { globSync } from 'glob';
import sitemap from 'vite-plugin-sitemap';


/*
 * Seleciona os HTMLs de src/, exceto backups e templates.
 *
 * O glob publicava `index-bkp.html` e `index.template.html` em produção — e o
 * vite-plugin-sitemap os oferecia ao Google como páginas legítimas, duplicando
 * o conteúdo da home. Arquivo de trabalho não é página.
 */
const EXCLUIR = /(^|[.-])(bkp|backup|template)$/i;

const htmlFiles = globSync('src/*.html').filter(
  (file) => !EXCLUIR.test(parse(file).name)
);
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
    sitemap({
      hostname: 'https://mauricio.issei.com.br',
      generateRobotsTxt: false,
      /*
       * O sitemap é um convite explícito à indexação. Sem esta lista ele
       * oferecia ao Google a área administrativa, a página de erro e utilitários
       * internos — conteúdo que não deve aparecer em busca.
       */
      exclude: [
        '/404',
        '/admin',
        '/admin-editor',
        '/diagnostic',
        '/test-github',
        '/mapmind',
        '/exemplopdi',
        '/vsl',
      ],
    })
  ]
})