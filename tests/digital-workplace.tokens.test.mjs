// Doc 03 §1 — tokens `.dw-`: contraste, fundo Dark Tech e cores só via tokens.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrastRatio } from './_helpers/contrast.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const css = readFileSync(join(ROOT, 'src/digital-workplace-agentico.css'), 'utf8');
const token = (name) => css.match(new RegExp(String.raw`--dw-${name}:\s*(#[0-9a-fA-F]{6})`))?.[1];
const BG = token('bg');
const SURFACE = token('surface');

test('fundo continua Dark Tech (nada claro)', () => {
  assert.equal(BG.toLowerCase(), '#0d1117');
});

test('texto, links e os quatro selos ≥ 4.5:1 sobre fundo e superfície', () => {
  for (const fg of ['text', 'muted', 'link', 'fato', 'inferencia', 'hipotese', 'recomendacao']) {
    for (const bg of [BG, SURFACE]) {
      const r = contrastRatio(token(fg), bg);
      assert.ok(r >= 4.5, `--dw-${fg} ${token(fg)} sobre ${bg}: ${r.toFixed(2)}:1`);
    }
  }
});

test('selos também legíveis sobre o fundo do próprio selo (surface-2)', () => {
  for (const fg of ['fato', 'inferencia', 'hipotese', 'recomendacao', 'muted']) {
    const r = contrastRatio(token(fg), token('surface-2'));
    assert.ok(r >= 4.5, `--dw-${fg} sobre surface-2: ${r.toFixed(2)}:1`);
  }
});

test('risco, efeito e humano ≥ 3:1 sobre a superfície (traço de gráfico, WCAG 1.4.11)', () => {
  for (const fg of ['risco', 'efeito', 'humano']) {
    const r = contrastRatio(token(fg), SURFACE);
    assert.ok(r >= 3, `--dw-${fg}: ${r.toFixed(2)}:1`);
  }
});

test('risco e efeito também servem de texto: ≥ 4.5:1 sobre superfície e surface-2', () => {
  for (const fg of ['risco', 'efeito', 'humano']) {
    for (const bg of [SURFACE, token('surface-2')]) {
      const r = contrastRatio(token(fg), bg);
      assert.ok(r >= 4.5, `--dw-${fg} sobre ${bg}: ${r.toFixed(2)}:1`);
    }
  }
});

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : /\.m?js$/.test(n) ? [f] : [];
  });

test('nenhum hexadecimal no HTML (fora do bloco AEO gerado e do favicon) nem no JS da página', () => {
  const page = join(ROOT, 'src/digital-workplace-agentico.html');
  const hex = /#[0-9a-fA-F]{3,8}\b/g;
  const hits = [];
  if (existsSync(page)) {
    const html = readFileSync(page, 'utf8')
      .replace(/<!-- AEO:START[\s\S]*?<!-- AEO:END -->/, '') // theme-color gerado por build-aeo
      .replace(/<link rel="icon"[^>]*>/, '')
      .replace(/href="#[a-z0-9-]+"/g, '')                     // âncoras internas (#maturidade, #fluxo…)
      .replace(/&#\d+;/g, '');                                 // entidades numéricas
    hits.push(...(html.match(hex) ?? []).map((h) => `html:${h}`));
  }
  const dir = join(ROOT, 'src/js/digital-workplace');
  const files = [...(existsSync(dir) ? walk(dir) : []), join(ROOT, 'src/js/digital-workplace-agentico.js')].filter(existsSync);
  for (const f of files) {
    const m = readFileSync(f, 'utf8').match(hex);
    if (m) hits.push(...m.map((h) => `${f}:${h}`));
  }
  assert.deepEqual(hits, []);
});

test('orçamento (doc 04 §7): CSS + JS da página ≤ 48 KB não comprimidos', () => {
  const dir = join(ROOT, 'src/js/digital-workplace');
  const files = [
    join(ROOT, 'src/digital-workplace-agentico.css'),
    join(ROOT, 'src/js/digital-workplace-agentico.js'),
    ...(existsSync(dir) ? walk(dir) : []),
  ];
  const bytes = files.reduce((n, f) => n + readFileSync(f).length, 0);
  assert.ok(bytes <= 48 * 1024, `${(bytes / 1024).toFixed(1)} KB (teto 48 KB)`);
});
