// ADR-pf-001: cores das linhas do mapa (src/index.css) — contraste e escopo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { contrastRatio } from './_helpers/contrast.mjs';

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6})`))?.[1];
const BG = token('pf-bg');
const LINES = ['dev', 'lid', 'cld', 'plt', 'agi', 'uxd', 'dat'];

test('as 7 linhas têm cor e ≥ 4.5:1 sobre o fundo (também viram texto)', () => {
  for (const l of LINES) {
    const c = token(`pf-l-${l}`);
    assert.ok(c, `--pf-l-${l} ausente`);
    assert.ok(contrastRatio(c, BG) >= 4.5, `--pf-l-${l} ${c}: ${contrastRatio(c, BG).toFixed(2)}:1`);
  }
});

test('texto de apoio e links ≥ 4.5:1 sobre fundo e superfície', () => {
  for (const fg of ['pf-text', 'pf-muted', 'pf-link']) {
    for (const bg of ['pf-bg', 'pf-surface']) {
      const r = contrastRatio(token(fg), token(bg));
      assert.ok(r >= 4.5, `${fg} sobre ${bg}: ${r.toFixed(2)}:1`);
    }
  }
});

test('botão: texto branco ≥ 4.5:1 nas duas pontas do gradiente', () => {
  for (const t of ['pf-btn-a', 'pf-btn-b']) assert.ok(contrastRatio('#ffffff', token(t)) >= 4.5, t);
});

test('fundo continua Dark Tech (nada claro)', () => {
  assert.equal(BG.toLowerCase(), '#0d1117');
});
