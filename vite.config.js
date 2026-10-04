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

/*
 * `src/en/*.html` é o gêmeo digital em inglês, gerado por
 * `scripts/i18n/translate.py` (ver a skill `sync-i18n`). Entra no build como
 * ponto de entrada próprio para que o Vite processe os seus assets e o
 * sitemap ofereça as rotas `/en/` ao Google.
 *
 * A chave do input é o caminho relativo SEM extensão (`en/index`, não
 * `index`): duas páginas com o mesmo nome-base em pastas diferentes colidiriam
 * e o Rollup descartaria uma delas em silêncio.
 */
const htmlFiles = globSync(['src/*.html', 'src/en/*.html']).filter(
  (file) => !EXCLUIR.test(parse(file).name)
);
const htmlInput = Object.fromEntries(
  htmlFiles.map(file => [
    file.replace(/^src\//, '').replace(/\.html$/, ''),
    resolve(__dirname, file)
  ])
);

/*
 * `.well-known/*` são nomes IANA sem extensão. Servidos por sync do S3 eles
 * caem em `binary/octet-stream`, e o dev/preview do Vite faz o mesmo — aí um
 * scanner estrito (isitagentready, cliente RFC 9728) rejeita o JSON. Em
 * produção o header é corrigido por `infra/scripts/apply-markdown-headers.sh`;
 * aqui, para o dev bater com a produção e os testes poderem cobrir isso.
 */
const wellKnownJsonContentType = () => {
  const mw = (req, res, next) => {
    if (req.url && req.url.startsWith('/.well-known/') && !/\.\w+$/.test(req.url.split('?')[0])) {
      const type = req.url.includes('api-catalog') ? 'application/linkset+json' : 'application/json';
      res.setHeader('Content-Type', `${type}; charset=utf-8`);
    }
    next();
  };
  return {
    name: 'well-known-json-content-type',
    configureServer(s) { s.middlewares.use(mw); },
    configurePreviewServer(s) { s.middlewares.use(mw); },
  };
};

/*
 * WebMCP em toda página (docs/specs/AGENT_READINESS_POR_PAGINA.md, D3): o
 * scanner de agent readiness carrega a página e conta as tools registradas em
 * `navigator.modelContext`. Injetar no build cobre também as páginas futuras.
 * Sem `order: 'pre'`, a tag entra depois do processamento de HTML do Vite e
 * `public/webmcp.js` não é empacotado.
 */
const webmcp = () => ({
  name: 'webmcp',
  transformIndexHtml: () => [
    { tag: 'script', attrs: { type: 'module', src: '/webmcp.js' }, injectTo: 'body' },
  ],
});

/*
 * Indicador de foco de base em toda página (docs/specs/a11y-first, Fase 6).
 * O anel padrão do Chrome sai quase preto (rgb(16,16,16)) em páginas escuras — invisível, e
 * a SC 2.4.7 falha sem que o axe note. `:where()` tem especificidade zero: qualquer estilo de
 * foco da própria página continua mandando; só preenche o que não tem nenhum.
 * `summary` em contêiner `overflow:hidden` (acordeões com cantos arredondados) tem o anel recortado:
 * o deslocamento negativo o mantém dentro da caixa.
 */
const focusBase = () => ({
  name: 'a11y-focus-base',
  transformIndexHtml: () => [
    {
      tag: 'style',
      attrs: { id: 'a11y-base' },
      children:
        ':where(a[href],button,summary,input,select,textarea,[tabindex]:not([tabindex="-1"])):focus-visible{outline:2px solid #58a6ff;outline-offset:2px}' +
        'summary:focus-visible{outline-offset:-4px}',
      injectTo: 'head-prepend',
    },
  ],
});

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
    wellKnownJsonContentType(),
    webmcp(),
    focusBase(),
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
        '/boutique-empresarial-showcase',
        /*
         * Não são páginas: `seo-aeo.jsonld.html` é um bloco JSON-LD e
         * `/assets/*` são artefatos com hash. O sitemap os oferecia ao Google
         * como URLs, e o Google os contava em "Não encontrado (404)".
         */
        '/seo-aeo.jsonld',
        /^\/assets\//,
      ],
    })
  ]
})