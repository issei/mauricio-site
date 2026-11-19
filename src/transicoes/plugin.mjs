/**
 * Plugin do Vite: injeta a camada de transições só nas páginas de uma família.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (RF-VT-01, RF-VT-02, RNF-VT-05).
 *
 * Injeta no build, como `hreflang-pt` em vite.config.js: a fonte PT não muda e nenhum espelho /en/ fica velho.
 * CSS e JS vão inline: nenhuma requisição de rede nova.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { familiaDe } from './familias.mjs';

const lerAqui = (nome) => readFileSync(fileURLToPath(new URL(nome, import.meta.url)), 'utf8');

/** `src/videos.html`, `src/videos/x.html`, `src/temas/x.html` → '/videos', '/videos/x', '/temas/x'. Outros → null. */
function rotaDoArquivo(filename) {
  const m = filename.replace(/\\/g, '/').match(/\/src\/((?:videos|temas)\/[^/]+|videos)\.html$/);
  return m ? `/${m[1]}` : null;
}

export function transicoes() {
  const css = lerAqui('transicoes.css');
  const js = lerAqui('transicoes.js');
  return {
    name: 'transicoes',
    transformIndexHtml(_html, ctx) {
      const rota = rotaDoArquivo(ctx.filename);
      if (!rota || !familiaDe(rota)) return;
      return [
        { tag: 'style', attrs: { id: 'vt' }, children: css, injectTo: 'head' },
        { tag: 'script', attrs: { id: 'vt' }, children: js, injectTo: 'head' },
      ];
    },
  };
}
