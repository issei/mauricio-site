/**
 * Invariantes dos design tokens da página v3.0 (INV-AP-02).
 *
 * Lê src/apresentacao.css como fonte da verdade e prova, por cálculo, que a
 * Tabela 1.4 da spec foi materializada — incluindo o piso de 7:1 da Camada 3
 * (evolução 11), que o helper axe padrão do repositório não cobre.
 *
 * Roda em `node --test`, antes do Playwright: falha em milissegundos.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { contrastRatio, readTokens, parseHex } from './_helpers/contrast.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CSS = readFileSync(resolve(ROOT, 'src/apresentacao.css'), 'utf8');
const T = readTokens(CSS);

const hex = (name) => {
  const v = T[name];
  assert.ok(v, `token ausente: ${name}`);
  assert.match(v, /^#[0-9a-f]{6}$/i, `${name} deveria ser hex opaco, veio "${v}"`);
  return v;
};

test('todos os tokens da Tabela 1.4 existem', () => {
  const required = [
    '--ap-l1-bg', '--ap-l1-text', '--ap-l1-gap',
    '--ap-l2-bg', '--ap-l2-text', '--ap-l2-grid', '--ap-l2-gap',
    '--ap-l3-bg', '--ap-l3-card', '--ap-l3-text', '--ap-l3-gap',
    '--ap-cobalt', '--ap-live', '--ap-amber',
    '--ap-transmute', '--ap-ease',
  ];
  for (const k of required) assert.ok(T[k], `token ausente: ${k}`);
});

test('INV-AP-02 · contraste do texto da Camada 3 ≥ 7:1 (evolução 11)', () => {
  const r = contrastRatio(hex('--ap-l3-text'), hex('--ap-l3-card'));
  assert.ok(r >= 7, `texto L3 sobre card: ${r.toFixed(2)}:1 — exigido ≥ 7:1`);
});

test('INV-AP-02 · contraste do texto das Camadas 1 e 2 ≥ 7:1', () => {
  const l1 = contrastRatio(hex('--ap-l1-text'), hex('--ap-l1-bg'));
  const l2 = contrastRatio(hex('--ap-l2-text'), hex('--ap-l2-bg'));
  assert.ok(l1 >= 7, `texto L1: ${l1.toFixed(2)}:1`);
  assert.ok(l2 >= 7, `texto L2: ${l2.toFixed(2)}:1`);
});

test('texto secundário e acentos passam AA (4.5:1) nos dois fundos', () => {
  const bases = [hex('--ap-l1-bg'), hex('--ap-l3-card')];
  for (const bg of bases) {
    for (const token of ['--ap-muted', '--ap-cobalt', '--ap-amber']) {
      const r = contrastRatio(hex(token), bg);
      assert.ok(r >= 4.5, `${token} sobre ${bg}: ${r.toFixed(2)}:1 — exigido ≥ 4.5:1`);
    }
  }
});

test('anel de foco cobalto tem contraste não-textual ≥ 3:1', () => {
  for (const bg of [hex('--ap-l1-bg'), hex('--ap-l2-bg'), hex('--ap-l3-card')]) {
    const r = contrastRatio(hex('--ap-cobalt'), bg);
    assert.ok(r >= 3, `foco sobre ${bg}: ${r.toFixed(2)}:1`);
  }
});

test('evolução 8 · Camada 3 preserva o dark mode da Camada 1', () => {
  assert.equal(
    hex('--ap-l3-bg'), hex('--ap-l1-bg'),
    'o fundo da Camada 3 deve ser idêntico ao da Camada 1 — a luz vem de card e borda'
  );
  // Nenhuma superfície pode clarear: card da L3 mais escuro que o texto, e
  // com luminância baixa o bastante para continuar "grafite".
  const [r, g, b] = parseHex(hex('--ap-l3-card'));
  assert.ok(Math.max(r, g, b) < 64, `card da L3 clareou demais: ${hex('--ap-l3-card')}`);
});

test('gradiente de densidade · espaçamento decresce da Camada 1 à 3', () => {
  const rem = (name) => {
    const v = T[name];
    assert.match(v, /rem$/, `${name} deveria estar em rem`);
    return parseFloat(v);
  };
  const [l1, l2, l3] = ['--ap-l1-gap', '--ap-l2-gap', '--ap-l3-gap'].map(rem);
  assert.ok(l1 > l2 && l2 > l3, `esperado L1 > L2 > L3, veio ${l1} / ${l2} / ${l3}`);
  // Faixas da Tabela 1.4, em px a 16px/rem
  assert.ok(l1 * 16 >= 96 && l1 * 16 <= 128, `L1 fora de 96–128px: ${l1 * 16}px`);
  assert.ok(l2 * 16 >= 64 && l2 * 16 <= 96, `L2 fora de 64–96px: ${l2 * 16}px`);
  assert.ok(l3 * 16 >= 40 && l3 * 16 <= 56, `L3 fora de 40–56px: ${l3 * 16}px`);
});

test('grid da Camada 2 está em ~4% de opacidade e a Camada 1 não tem grid', () => {
  const m = T['--ap-l2-grid'].match(/rgba\([^)]*?,\s*([\d.]+)\s*\)/);
  assert.ok(m, `--ap-l2-grid deveria ser rgba(), veio "${T['--ap-l2-grid']}"`);
  const alpha = parseFloat(m[1]);
  assert.ok(alpha >= 0.03 && alpha <= 0.05, `grid da L2 a ${alpha} — Tabela 1.4 pede ~0.04`);
  assert.ok(!T['--ap-l1-grid'], 'a Camada 1 não deve ter retícula (Tabela 1.4: "Invisível")');
});

test('transmutação cabe no teto de 200ms com folga', () => {
  const ms = parseInt(T['--ap-transmute'], 10);
  assert.ok(ms > 0 && ms < 200, `--ap-transmute = ${ms}ms — teto duro é 200ms (evolução 9)`);
});

test('prefers-reduced-motion zera a transmutação (spec §4.1)', () => {
  const block = CSS.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?--ap-transmute:\s*0ms/);
  assert.ok(block, 'reduced-motion deve zerar --ap-transmute, não apenas encurtar');
});

test('easing é projetado, não orgânico (spec §3.2)', () => {
  assert.match(T['--ap-ease'], /^cubic-bezier|^linear/, 'sem easing elástico/bounce');
  assert.doesNotMatch(CSS, /cubic-bezier\([^)]*-\d/, 'coeficiente negativo = overshoot orgânico');
});

test('verde de estado vivo nunca é cor de texto (spec §1.2)', () => {
  // Procura `color: var(--ap-live)` em qualquer regra — proibido.
  assert.doesNotMatch(
    CSS, /(?<!-)\bcolor:\s*var\(--ap-live\)/,
    'o verde só pode indicar estado vivo, nunca colorir texto ou título'
  );
});

test('âmbar é raríssimo — no máximo 4 usos (spec §1.2)', () => {
  const uses = [...CSS.matchAll(/var\(--ap-amber(?:-dim)?\)/g)].length;
  assert.ok(uses > 0 && uses <= 4, `âmbar usado ${uses}× — a raridade é o que lhe dá peso`);
});
