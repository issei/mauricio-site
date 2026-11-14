#!/usr/bin/env node
/*
 * Índice da busca do site — docs/specs/arquitetura-informacao/SDD-catalogo-videos-e-busca.md §4.
 *
 * Dado entra, arquivo sai (mesmo modelo dos outros geradores):
 *   content/videos/*.md, content/temas.yml e specs/ecosystem.nav.yaml
 *     → public/busca/pt.json   índice do site em português
 *     → public/busca/en.json   índice do /en/, lido do <title> e da meta description dos espelhos
 *     → src/busca.html         página /busca (noindex, sem gêmeo /en/)
 *
 * Itens: { t título, u URL, k video|pagina|assunto, a [temas], d resumo (até 200), p 1 se vídeo com artigo,
 *          dt data (só vídeo), en 0 se o item do índice EN não tem tradução }.
 * Ficha (noindex) entra: é catálogo e a pessoa quer achá-la. Rascunho entra como ficha (o texto do
 * rascunho nunca entra). Vídeo removido não entra (RF-BU-13).
 *
 * Uso: node scripts/gen-busca.mjs [--check]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { loadContent, pagina } from './gen-videos.mjs';
import { loadEcossistema } from './catalogo/dados.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DESC_MAX = 200;

const isoDate = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? '').slice(0, 10));
const limpa = (texto, max = DESC_MAX) => {
  const s = String(texto ?? '').replace(/https?:\/\/\S+/g, '').replace(/#\S+/g, '').replace(/[*`]/g, '').replace(/\s+/g, ' ').trim();
  return s.length <= max ? s : `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
};
const rotaPagina = (file) => (file === 'index.html' ? '/' : file.startsWith('/') ? file.replace(/\.html$/, '') : `/${file}`);

/** <title> e meta description de um HTML, sem o sufixo " | Maurício Yokoyama Issei". */
export function tituloEDescricao(html) {
  const t = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '';
  const d = /<meta\s+name="description"\s+content="([^"]*)"/.exec(html)?.[1] ?? '';
  const dec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return { t: dec(t).replace(/\s*\|\s*Maurício Yokoyama Issei\s*$/, ''), d: dec(d) };
}

const ordem = (a, b) => a.k.localeCompare(b.k) || a.u.localeCompare(b.u);

/** Itens do índice PT. `lerEn(rotaRelativa)` devolve o HTML do espelho ou null (índice EN). */
export function montaIndice({ videos, temas }, eco, { lerEn = null } = {}) {
  const vivos = videos.filter((v) => v.status !== 'removido');
  const usados = Object.keys(temas).filter((t) => vivos.some((v) => v.temas?.includes(t)));
  const itens = [];

  for (const v of vivos) {
    const publicado = v.status === 'publicado';
    const item = {
      t: v.youtube.titulo, u: `/videos/${v.slug}`, k: 'video', a: v.temas ?? [],
      d: limpa(publicado && v.resumo ? v.resumo : v.youtube.descricao), dt: isoDate(v.youtube.publicado_em),
      ...(publicado && { p: 1 }),
    };
    if (lerEn) {
      const html = publicado ? lerEn(`videos/${v.slug}.html`) : null;
      if (html) { const x = tituloEDescricao(html); item.t = x.t || item.t; item.d = limpa(x.d) || item.d; } else item.en = 0;
    }
    itens.push(item);
  }

  for (const t of usados) {
    const item = { t: temas[t].nome, u: `/temas/${t}`, k: 'assunto', a: [t], d: limpa(temas[t].resumo) };
    if (lerEn) {
      const html = lerEn(`temas/${t}.html`);
      if (html) { const x = tituloEDescricao(html); item.t = x.t.replace(/ — .*$/, '') || item.t; item.d = limpa(x.d) || item.d; } else item.en = 0;
    }
    itens.push(item);
  }

  const paginas = [
    ...eco.entradas.filter((e) => e.descricao).map((e) => ({ file: e.file, t: e.titulo ?? e.label, d: e.descricao, a: [] })),
    ...Object.values(eco.nodes).map((n) => ({ file: n.file, t: n.title, d: n.descricao || n.blurb, a: n.temas ?? [] })),
  ];
  const vistas = new Set();
  for (const p of paginas) {
    const u = rotaPagina(p.file);
    if (vistas.has(u)) continue;
    vistas.add(u);
    const item = { t: p.t, u, k: 'pagina', a: p.a, d: limpa(p.d) };
    if (lerEn) {
      const rel = p.file.startsWith('/') ? null : p.file;
      const html = rel ? lerEn(rel) : null;
      if (html) { const x = tituloEDescricao(html); item.t = x.t || item.t; item.d = limpa(x.d) || item.d; item.u = u === '/' ? '/en/' : `/en${u}`; } else item.en = 0;
    }
    itens.push(item);
  }

  const nomes = Object.fromEntries(usados.map((t) => [t, temas[t].nome]));
  return { v: 1, temas: nomes, itens: itens.sort(ordem) };
}

export function paginaBusca() {
  const corpo = `<h1>Buscar no site</h1>
<p class="meta">Vídeos, artigos, páginas e assuntos. A busca roda no seu navegador: o que você digita não sai do aparelho.</p>
<div id="busca-pagina"></div>
<noscript><p>A busca precisa de JavaScript. Sem ele, use o catálogo:</p>
<ul><li><a href="/catalogo.html">Conteúdos</a></li><li><a href="/videos">Vídeos</a></li></ul></noscript>`;
  return pagina({
    titulo: 'Buscar no site',
    descricao: 'Busca de vídeos, artigos, páginas e assuntos do site.',
    rota: '/busca', robots: 'noindex, follow',
    jsonld: { '@context': 'https://schema.org', '@type': 'SearchResultsPage', name: 'Buscar no site', url: 'https://mauricio.issei.com.br/busca', inLanguage: 'pt-BR' },
    corpo,
    // Script clássico com import(): o Vite não segue import de /public e a busca é arquivo estático (public/js/busca.js).
    script: `<script>import('/js/busca.js').then(function (m) { m.iniciaPagina(document.getElementById('busca-pagina')); });</script>\n`,
  });
}

/** Mapa { caminho relativo: texto } do que o gerador é dono. */
export function build({ root = ROOT } = {}) {
  const content = loadContent(join(root, 'content'));
  const { eco } = loadEcossistema();
  const lerEn = (rel) => {
    const p = join(root, 'src/en', rel);
    return existsSync(p) ? readFileSync(p, 'utf8') : null;
  };
  const json = (o) => `${JSON.stringify(o)}\n`;
  return {
    'public/busca/pt.json': json(montaIndice(content, eco)),
    'public/busca/en.json': json(montaIndice(content, eco, { lerEn })),
    'src/busca.html': paginaBusca(),
  };
}

function main() {
  const check = process.argv.includes('--check');
  const saida = build();
  const fora = [];
  for (const [rel, texto] of Object.entries(saida)) {
    const p = join(ROOT, rel);
    const atual = existsSync(p) ? readFileSync(p, 'utf8').replace(/\r\n/g, '\n') : null;
    if (atual === texto) continue;
    if (check) { fora.push(rel); continue; }
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, texto, 'utf8');
  }
  if (check) {
    if (fora.length) { console.error(`✗ [busca] fora de sincronia: ${fora.join(', ')}\n  rode: node scripts/gen-busca.mjs`); process.exit(1); }
    console.log('✓ [busca] índice e página em dia');
  } else {
    const n = JSON.parse(saida['public/busca/pt.json']).itens.length;
    console.log(`✓ [busca] ${n} itens no índice PT`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
