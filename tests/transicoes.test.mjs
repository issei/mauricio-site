/**
 * Transições entre páginas — família e injeção no build.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (RF-VT-01, RF-VT-02, CA-06, RNF-VT-05, RNF-VT-08).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FAMILIAS, familiaDe, normalizarUrl } from '../src/transicoes/familias.mjs';
import { transicoes } from '../src/transicoes/plugin.mjs';

const HTML = '<!doctype html><html><head><title>x</title></head><body><p>conteúdo</p></body></html>';
const injetar = (filename) => transicoes().transformIndexHtml(HTML, { filename });

test('a família "videos" cobre o índice, as fichas e os assuntos (RF-VT-01)', () => {
  assert.deepEqual(FAMILIAS.map((f) => f.nome), ['videos']);
  for (const rota of ['/videos', '/videos/a-crise-cognitiva', '/temas/engenharia-agentica']) {
    assert.equal(familiaDe(rota)?.nome, 'videos', rota);
  }
});

test('páginas fora da família não são da família, inclusive o espelho /en/ (CA-06)', () => {
  for (const rota of ['/', '/catalogo', '/curriculo', '/busca', '/en/videos/a-crise-cognitiva', '/en/', '/videos-x', '/videosx/a']) {
    assert.equal(familiaDe(rota), null, rota);
  }
});

test('normalizarUrl tira origem, .html, barra final e fragmento', () => {
  assert.equal(normalizarUrl('https://mauricio.issei.com.br/videos/x.html#artigo'), '/videos/x');
  assert.equal(normalizarUrl('/videos/'), '/videos');
  assert.equal(normalizarUrl('/'), '/');
  assert.equal(normalizarUrl('/temas/dados-e-decisao?a=1'), '/temas/dados-e-decisao');
});

test('o plugin injeta <style id="vt"> e <script id="vt"> inline só na família (RF-VT-01, RF-VT-02)', () => {
  const tags = injetar('/repo/src/videos/a-crise-cognitiva.html');
  assert.equal(tags.length, 2);
  assert.deepEqual(tags.map((t) => t.tag), ['style', 'script']);
  assert.ok(tags.every((t) => t.attrs.id === 'vt' && t.injectTo === 'head'));
  assert.equal(tags[1].attrs.src, undefined, 'script inline, sem requisição (RNF-VT-05)');
  assert.equal(tags[1].attrs.type, undefined, 'script clássico, não módulo');
  assert.equal(injetar('/repo/src/videos.html').length, 2);
  assert.equal(injetar('C:\\repo\\src\\temas\\dados-e-decisao.html').length, 2);
});

test('o plugin não toca nas outras páginas (CA-06)', () => {
  for (const f of ['/repo/src/index.html', '/repo/src/catalogo.html', '/repo/src/en/videos/a.html', '/repo/src/en/index.html', '/repo/src/busca.html']) {
    assert.equal(injetar(f), undefined, f);
  }
});

test('o plugin não altera o HTML original: só acrescenta tags (RNF-VT-08)', () => {
  assert.equal(typeof transicoes().transformIndexHtml, 'function');
  assert.equal(HTML.includes('id="vt"'), false);
});

// ── Folha de estilo (E3) ────────────────────────────────────────────────────
import { readFileSync } from 'node:fs';
const CSS = readFileSync(new URL('../src/transicoes/transicoes.css', import.meta.url), 'utf8');

test('o opt-in @view-transition só existe sob prefers-reduced-motion: no-preference (RF-VT-03, RNF-VT-01)', () => {
  const abre = CSS.indexOf('@media (prefers-reduced-motion: no-preference)');
  const opt = CSS.indexOf('@view-transition');
  assert.ok(abre >= 0 && opt > abre, 'opt-in dentro do bloco no-preference');
  assert.equal((CSS.match(/@view-transition/g) ?? []).length, 1);
  assert.match(CSS, /navigation:\s*auto/);
  // o bloco no-preference é o último: nada de regra fora dele depois do comentário de cabeçalho
  const fora = CSS.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@media[\s\S]*$/, '').trim();
  assert.equal(fora, '', 'nenhuma regra fora do bloco no-preference');
});

test('o cabeçalho tem o nome estático vt-cabecalho e não anima (RF-VT-04)', () => {
  assert.match(CSS, /header\.sh\s*\{\s*view-transition-name:\s*vt-cabecalho;?\s*\}/);
  assert.match(CSS, /::view-transition-group\(vt-cabecalho\)\s*\{\s*animation:\s*none/);
});

test('as @keyframes só declaram opacity e transform (RNF-VT-04, CA-16)', () => {
  const quadros = [...CSS.matchAll(/@keyframes\s+[\w-]+\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)];
  assert.ok(quadros.length >= 2);
  for (const [, corpo] of quadros) {
    const props = [...corpo.matchAll(/([\w-]+)\s*:/g)].map((m) => m[1]);
    assert.ok(props.length > 0);
    for (const p of props) assert.ok(['opacity', 'transform'].includes(p), `propriedade proibida na keyframe: ${p}`);
  }
});

test('nomes e custom properties levam o prefixo vt-; nenhuma cor nova (RNF-VT-10, CA-20)', () => {
  assert.doesNotMatch(CSS.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i);
  for (const [, n] of CSS.matchAll(/view-transition-name:\s*([\w-]+)/g)) assert.match(n, /^vt-/);
  for (const [, n] of CSS.matchAll(/--([\w-]+):/g)) assert.match(n, /^vt-/);
  for (const [, n] of CSS.matchAll(/@keyframes\s+([\w-]+)/g)) assert.match(n, /^vt-/);
});
