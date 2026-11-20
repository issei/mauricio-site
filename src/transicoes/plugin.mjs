/**
 * Plugin do Vite: injeta a camada de transições só nas páginas de uma família.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (RF-VT-01, RF-VT-02, RNF-VT-05).
 *
 * Injeta no build, como `hreflang-pt` em vite.config.js: a fonte PT não muda e nenhum espelho /en/ fica velho.
 * CSS e JS vão inline: nenhuma requisição de rede nova.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { familiaDe, LISTA, VIDEO, SITE, normalizarUrl, tipoDeTransicao } from './familias.mjs';

const lerAqui = (nome) => readFileSync(fileURLToPath(new URL(nome, import.meta.url)), 'utf8');

/**
 * `src/videos.html`, `src/videos/x.html`, `src/temas/x.html` → '/videos', '/videos/x', '/temas/x';
 * `src/index.html`, `src/curriculo.html`, `src/catalogo.html` → '/', '/curriculo', '/catalogo'. Outros → null.
 * Os espelhos `src/en/**` não casam: ficam de fora (a fonte PT não muda).
 */
function rotaDoArquivo(filename) {
  const m = filename.replace(/\\/g, '/').match(/\/src\/((?:videos|temas)\/[^/]+|videos|index|curriculo|catalogo)\.html$/);
  if (!m) return null;
  return m[1] === 'index' ? '/' : `/${m[1]}`;
}

/**
 * Pré-busca (RF-VT-15): a transição só começa quando a página nova está pronta, então a espera da rede aparece como
 * travada. `prefetch` baixa só o documento, ao passar o mouse ou tocar, e não executa nenhum script da página:
 * a análise (GA4) e o banner de consentimento não rodam antes da pessoa ir de fato. `prerender` fica de fora por isso.
 * O navegador que não conhece `speculationrules` ignora o bloco.
 */
export const REGRAS_DE_PREBUSCA = {
  prefetch: [{ where: { href_matches: ['/videos', '/videos.html', '/videos/*', '/temas/*'] }, eagerness: 'moderate' }],
};

/** Pré-busca da família `site` (RF-VT-22): as três portas e /videos.html (início → vídeos, RF-VT-31), pelo mesmo critério e sem `prerender`. */
export const REGRAS_DE_PREBUSCA_SITE = {
  prefetch: [{ where: { href_matches: ['/', '/curriculo.html', '/catalogo.html', '/videos.html'] }, eagerness: 'moderate' }],
};

/** Troca o marcador do script pelas regras de familias.mjs, para que existam num lugar só. */
export function montarScript(fonte) {
  const funcoes = [`var LISTA = ${LISTA};`, `var VIDEO = ${VIDEO};`, `var SITE = ${SITE};`, normalizarUrl.toString(), tipoDeTransicao.toString()].join('\n');
  return fonte.replace('/*VT:FUNCOES*/', () => funcoes);
}

export function transicoes() {
  const css = lerAqui('transicoes.css');
  const js = montarScript(lerAqui('transicoes.js'));
  return {
    name: 'transicoes',
    transformIndexHtml(_html, ctx) {
      const rota = rotaDoArquivo(ctx.filename);
      const familia = rota && familiaDe(rota);
      if (!familia) return;
      const regras = familia.nome === 'site' ? REGRAS_DE_PREBUSCA_SITE : REGRAS_DE_PREBUSCA;
      return [
        { tag: 'style', attrs: { id: 'vt' }, children: css, injectTo: 'head' },
        { tag: 'script', attrs: { id: 'vt' }, children: js, injectTo: 'head' },
        { tag: 'script', attrs: { type: 'speculationrules' }, children: JSON.stringify(regras), injectTo: 'head' },
      ];
    },
  };
}
