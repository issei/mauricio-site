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
  assert.deepEqual(FAMILIAS.map((f) => f.nome), ['videos', 'site']);
  for (const rota of ['/videos', '/videos/a-crise-cognitiva', '/temas/engenharia-agentica']) {
    assert.equal(familiaDe(rota)?.nome, 'videos', rota);
  }
});

test('páginas fora da família não são da família, inclusive o espelho /en/ (CA-06)', () => {
  for (const rota of ['/busca', '/cookies', '/en/videos/a-crise-cognitiva', '/en/', '/en/curriculo', '/videos-x', '/videosx/a', '/catalogo-x']) {
    assert.equal(familiaDe(rota), null, rota);
  }
});

test('a família "site" cobre início, carreira e conteúdos (RF-VT-17, CA-23)', () => {
  for (const rota of ['/', '/index', '/curriculo', '/catalogo']) {
    assert.equal(familiaDe(rota)?.nome, 'site', rota);
  }
});

test('normalizarUrl tira origem, .html, barra final e fragmento', () => {
  assert.equal(normalizarUrl('https://mauricio.issei.com.br/videos/x.html#artigo'), '/videos/x');
  assert.equal(normalizarUrl('/videos/'), '/videos');
  assert.equal(normalizarUrl('/'), '/');
  assert.equal(normalizarUrl('/temas/dados-e-decisao?a=1'), '/temas/dados-e-decisao');
});

test('o plugin injeta <style id="vt">, <script id="vt"> e as regras de pré-busca inline só na família (RF-VT-01, RF-VT-02, RF-VT-15)', () => {
  const tags = injetar('/repo/src/videos/a-crise-cognitiva.html');
  assert.equal(tags.length, 3);
  assert.deepEqual(tags.map((t) => t.tag), ['style', 'script', 'script']);
  assert.ok(tags.every((t) => t.injectTo === 'head'));
  assert.ok(tags.slice(0, 2).every((t) => t.attrs.id === 'vt'));
  assert.equal(tags[1].attrs.src, undefined, 'script inline, sem requisição (RNF-VT-05)');
  assert.equal(tags[1].attrs.type, undefined, 'script clássico, não módulo');
  assert.equal(tags[2].attrs.type, 'speculationrules');
  assert.equal(injetar('/repo/src/videos.html').length, 3);
  assert.equal(injetar('C:\\repo\\src\\temas\\dados-e-decisao.html').length, 3);
});

test('a pré-busca só baixa o documento das páginas da família, ao passar o mouse ou tocar (RF-VT-15)', () => {
  const regras = JSON.parse(injetar('/repo/src/videos.html')[2].children);
  assert.deepEqual(Object.keys(regras), ['prefetch'], 'sem prerender: scripts e análise não rodam antes da visita');
  const [regra] = regras.prefetch;
  assert.equal(regra.eagerness, 'moderate');
  const padroes = regra.where.href_matches;
  // todo padrão cobre só rotas da família; nenhuma rota de fora entra na pré-busca
  for (const rota of ['/videos', '/videos.html', '/videos/a-crise-cognitiva', '/temas/dados-e-decisao']) {
    assert.ok(padroes.some((p) => new RegExp(`^${p.replace(/[.]/g, '\\.').replace('*', '[^/]+')}$`).test(rota)), rota);
  }
  for (const rota of ['/', '/catalogo', '/curriculo', '/cookies', '/busca']) {
    assert.ok(!padroes.some((p) => new RegExp(`^${p.replace(/[.]/g, '\\.').replace('*', '[^/]+')}$`).test(rota)), rota);
  }
});

test('o plugin não toca nas outras páginas (CA-06)', () => {
  for (const f of ['/repo/src/en/videos/a.html', '/repo/src/en/index.html', '/repo/src/en/curriculo.html', '/repo/src/busca.html', '/repo/src/cookies.html']) {
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

test('a página antiga fica parada e a nova entra por cima, sem as duas esmaecerem (sensação de travada)', () => {
  assert.match(CSS, /::view-transition-old\(root\)\s*\{\s*animation:\s*none;?\s*\}/);
  assert.match(CSS, /::view-transition-old\(root\),\s*::view-transition-new\(root\)\s*\{\s*mix-blend-mode:\s*normal/);
  const semImersao = CSS.replace(/:root:active-view-transition-type\((?:imersao|mergulho)\)[^{]*\{[^}]*\}/g, '');
  assert.doesNotMatch(semImersao, /::view-transition-old\(root\)\s*\{[^}]*animation(-name)?:\s*vt-/, 'o conteúdo antigo não anima, salvo na abertura imersiva');
});

test('o conteúdo anima por pouco tempo (a espera da rede já pesa) e o movimento compartilhado, um pouco mais', () => {
  const dur = (nome) => Number(CSS.match(new RegExp(`--${nome}:\\s*([\\d.]+)s`))[1]);
  assert.ok(dur('vt-duracao') <= 0.25);
  assert.ok(dur('vt-duracao-compartilhado') >= dur('vt-duracao'));
});

test('as @keyframes só declaram opacity e transform, salvo o clip-path da abertura (RNF-VT-04, CA-16, CA-37)', () => {
  const quadros = [...CSS.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)];
  assert.ok(quadros.length >= 2);
  for (const [, nome, corpo] of quadros) {
    const props = [...corpo.matchAll(/([\w-]+)\s*:/g)].map((m) => m[1]);
    assert.ok(props.length > 0);
    const permitidas = nome === 'vt-abre' || nome === 'vt-mergulha-pagina' ? ['clip-path'] : nome === 'vt-mergulha-fundo' ? ['transform'] : ['opacity', 'transform'];
    for (const p of props) assert.ok(permitidas.includes(p), `propriedade proibida na keyframe ${nome}: ${p}`);
  }
});

test('a abertura imersiva: clip-path só na entrada do tipo imersao; recuo ≤ 8 %, opacidade ≥ 0,6, ≤ 500 ms (RF-VT-26 a RF-VT-28, CA-37)', () => {
  const usos = [...CSS.matchAll(/animation(?:-name)?:\s*[^;{}]*vt-abre/g)];
  assert.equal(usos.length, 1, 'vt-abre é usada num só lugar');
  assert.match(CSS, /:root:active-view-transition-type\(imersao\)::view-transition-new\(root\)\s*\{[^}]*vt-abre/);
  assert.match(CSS, /:root:active-view-transition-type\(imersao\)::view-transition-old\(root\)\s*\{[^}]*vt-recua/);
  const recua = CSS.match(/@keyframes vt-recua\s*\{((?:[^{}]|\{[^{}]*\})*)\}/)[1];
  assert.ok(Number(recua.match(/scale\(([\d.]+)\)/)[1]) <= 1.08);
  assert.ok(Number(recua.match(/opacity:\s*([\d.]+)/)[1]) >= 0.6);
  assert.ok(Number(CSS.match(/--vt-duracao-imersao:\s*([\d.]+)s/)[1]) <= 0.5);
  assert.match(CSS, /var\(--vt-x,\s*50%\)/);
  assert.match(CSS, /var\(--vt-y,\s*40%\)/);
});

test('nomes e custom properties levam o prefixo vt-; nenhuma cor nova (RNF-VT-10, CA-20)', () => {
  assert.doesNotMatch(CSS.replace(/\/\*[\s\S]*?\*\//g, ''), /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i);
  for (const [, n] of CSS.matchAll(/view-transition-name:\s*([\w-]+)/g)) assert.match(n, /^vt-/);
  for (const [, n] of CSS.matchAll(/--([\w-]+):/g)) assert.match(n, /^vt-/);
  for (const [, n] of CSS.matchAll(/@keyframes\s+([\w-]+)/g)) assert.match(n, /^vt-/);
});

// ── Direção e script (E4, E5) ───────────────────────────────────────────────
import { tipoDeTransicao, LISTA, VIDEO } from '../src/transicoes/familias.mjs';
import { montarScript } from '../src/transicoes/plugin.mjs';

test('tipoDeTransicao: avanço, retorno e lateral só entre páginas da família (RF-VT-10)', () => {
  assert.equal(tipoDeTransicao('/videos', '/videos/a'), 'avanco');
  assert.equal(tipoDeTransicao('/temas/dados-e-decisao', '/videos/a'), 'avanco');
  assert.equal(tipoDeTransicao('/videos/a', '/videos'), 'retorno');
  assert.equal(tipoDeTransicao('/videos/a', '/temas/dados-e-decisao'), 'retorno');
  assert.equal(tipoDeTransicao('/videos/a', '/videos/b'), 'lateral');
  for (const [de, para] of [['/videos', '/temas/x'], ['/videos/a', '/'], [null, '/videos/a'], ['/videos', null], ['/en/videos/a', '/videos']]) {
    assert.equal(tipoDeTransicao(de, para), null, `${de} → ${para}`);
  }
});

test('LISTA e VIDEO não se confundem: /videos é lista, /videos/<slug> é vídeo', () => {
  assert.ok(LISTA.test('/videos') && !VIDEO.test('/videos'));
  assert.ok(VIDEO.test('/videos/a-b-1') && !LISTA.test('/videos/a-b-1'));
});

test('o script montado compila, não deixa marcador e repete as regras de familias.mjs (RF-VT-14)', () => {
  const js = montarScript(readFileSync(new URL('../src/transicoes/transicoes.js', import.meta.url), 'utf8'));
  assert.doesNotMatch(js, /VT:FUNCOES/);
  assert.doesNotThrow(() => new Function(js));
  assert.ok(js.includes(String(LISTA)) && js.includes('function tipoDeTransicao'));
  assert.match(js, /'onpagereveal' in window/);
  // o script é clássico e não faz requisição de rede própria (a miniatura é a do cartão já em cache)
  assert.doesNotMatch(js, /\b(import|export)\b|fetch\(|XMLHttpRequest/);
});

test('o script só nomeia com vt-capa, vt-titulo, vt-nome e vt-papel, e só limpa o que nomeou (RF-VT-05, RF-VT-13)', () => {
  const js = readFileSync(new URL('../src/transicoes/transicoes.js', import.meta.url), 'utf8');
  const nomes = new Set([...js.matchAll(/nomear\([^,]+,\s*(NOME_\w+)\)/g)].map((m) => m[1]));
  assert.deepEqual([...nomes].sort(), ['NOME_CAPA', 'NOME_NOME', 'NOME_PAPEL', 'NOME_TITULO']);
  for (const m of js.matchAll(/var NOME_\w+ = '([^']+)'/g)) assert.match(m[1], /^vt-(capa|titulo|nome|papel)$/);
  assert.match(js, /vt\.finished\.then\(limpar, limpar\)/);
  assert.match(js, /e\.persisted/);
});

test('o plugin injeta as 3 tags em início, carreira e conteúdos, e não nos espelhos /en/ (RF-VT-17, CA-24)', () => {
  for (const f of ['/repo/src/index.html', '/repo/src/curriculo.html', '/repo/src/catalogo.html', 'C:\\repo\\src\\curriculo.html']) {
    const tags = injetar(f);
    assert.deepEqual(tags.map((t) => t.tag), ['style', 'script', 'script'], f);
  }
  for (const f of ['/repo/src/en/index.html', '/repo/src/en/catalogo.html']) assert.equal(injetar(f), undefined, f);
});

test('a pré-busca do site cobre só as 3 páginas, sem prerender, e a dos vídeos não muda (RF-VT-22, CA-34)', () => {
  const site = JSON.parse(injetar('/repo/src/index.html')[2].children);
  assert.deepEqual(Object.keys(site), ['prefetch']);
  const padroes = site.prefetch[0].where.href_matches;
  assert.equal(site.prefetch[0].eagerness, 'moderate');
  for (const rota of ['/', '/curriculo.html', '/catalogo.html']) assert.ok(padroes.includes(rota), rota);
  for (const p of padroes) assert.ok(!/tema|\/videos\//.test(p), p);
  const videos = JSON.parse(injetar('/repo/src/videos.html')[2].children);
  assert.ok(!videos.prefetch[0].where.href_matches.includes('/catalogo.html'));
});

test('tipoDeTransicao no site segue a ordem do cabeçalho; entre famílias não há direção (RF-VT-18, RF-VT-23, CA-25)', () => {
  assert.equal(tipoDeTransicao('/', '/curriculo'), 'avanco');
  assert.equal(tipoDeTransicao('/', '/catalogo'), 'avanco');
  assert.equal(tipoDeTransicao('/index', '/catalogo'), 'avanco');
  assert.equal(tipoDeTransicao('/curriculo', '/'), 'retorno');
  assert.equal(tipoDeTransicao('/catalogo', '/'), 'retorno');
  assert.equal(tipoDeTransicao('/curriculo', '/catalogo'), 'avanco');
  assert.equal(tipoDeTransicao('/catalogo', '/curriculo'), 'retorno');
  assert.equal(tipoDeTransicao('/', '/'), null);
  assert.equal(tipoDeTransicao('/curriculo', '/videos'), null);
  assert.equal(tipoDeTransicao('/videos/a', '/curriculo'), null);
});

test('tipoDeTransicao: início → /videos é imersao; o resto cruzado segue sem tipo (RF-VT-24, CA-36)', () => {
  assert.equal(tipoDeTransicao('/', '/videos'), 'imersao');
  assert.equal(tipoDeTransicao('/index', '/videos'), 'imersao');
  assert.equal(tipoDeTransicao('/videos', '/'), null);
  assert.equal(tipoDeTransicao('/curriculo', '/videos'), null);
  assert.equal(tipoDeTransicao('/', '/videos/a-crise-cognitiva'), null);
  assert.equal(tipoDeTransicao('/', '/temas/dados-e-decisao'), null);
});

test('a pré-busca do site inclui /videos.html (RF-VT-31, CA-45)', () => {
  const site = JSON.parse(injetar('/repo/src/index.html')[2].children);
  assert.ok(site.prefetch[0].where.href_matches.includes('/videos.html'));
  assert.equal(Object.keys(site).join(), 'prefetch');
});

test('mergulho no play: fundo e triângulo crescem com os mesmos fatores, cada vez mais rápido (RF-VT-33, CA-47)', () => {
  const quadros = (nome) => CSS.match(new RegExp(`@keyframes ${nome}\\s*\\{((?:[^{}]|\\{[^{}]*\\})*)\\}`))[1];
  const fundo = [...quadros('vt-mergulha-fundo').matchAll(/(\d+)%\s*\{\s*transform:\s*scale\(([\d.]+)\)/g)].map((m) => [Number(m[1]), Number(m[2])]);
  const pagina = [...quadros('vt-mergulha-pagina').matchAll(/(\d+)%\s*\{\s*clip-path:\s*polygon\(([^;]*)\);/g)].map((m) => [Number(m[1]), m[2]]);
  assert.equal(fundo.length, pagina.length);
  assert.ok(fundo.length >= 6);
  fundo.forEach(([pct, k], i) => {
    assert.equal(pagina[i][0], pct, 'mesmas paradas');
    // o vértice da ponta do triângulo (0,1597 do lado, ao centro) cresce com o mesmo fator do fundo
    const ponta = pagina[i][1].split(', ')[2].match(/\*\s*(-?[\d.]+)\)/)[1];
    assert.ok(Math.abs(Number(ponta) - 0.1597 * k) < 0.001, `${pct}%: ${ponta} vs ${0.1597 * k}`);
  });
  const fatores = fundo.map(([, k]) => k);
  assert.equal(fatores[0], 1);
  assert.ok(fatores.at(-1) >= 3000, 'o último fator cobre qualquer tela');
  const razoes = fatores.slice(1).map((k, i) => k / fatores[i]);
  assert.ok(razoes.at(-1) > razoes[0], 'o zoom acelera: a razão entre paradas cresce');
  assert.match(CSS, /:root:active-view-transition-type\(mergulho\)::view-transition-old\(root\)\s*\{[^}]*vt-mergulha-fundo/);
  assert.match(CSS, /:root:active-view-transition-type\(mergulho\)::view-transition-new\(root\)\s*\{[^}]*vt-mergulha-pagina/);
  assert.ok(Number(CSS.match(/--vt-duracao-mergulho:\s*([\d.]+)s/)[1]) <= 0.8);
});
