// Home nova (SDD-nova-home §4.1, §13.6, §13.8): paleta Aizome + Kin só no :root de src/home.css.
// Contraste dos pares de texto lido dos tokens; nenhuma cor literal fora do :root; nada de hexadecimal no corpo gerado.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/home.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const raiz = css.match(/:root\{([^}]*)\}/)[1];
const token = (n) => raiz.match(new RegExp(`--hm-${n}:(#[0-9A-Fa-f]{6})`))[1];
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contraste = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

test('texto sobre os três fundos: tinta, grafite e kin ≥ 7:1 (AAA); cinza ≥ 4,5:1 (AA)', () => {
  for (const fundo of ['aizome', 'aizome-2', 'aizome-deep']) {
    for (const t of ['tinta', 'grafite', 'kin']) assert.ok(contraste(token(t), token(fundo)) >= 7, `${t} sobre ${fundo}`);
    assert.ok(contraste(token('cinza'), token(fundo)) >= 4.5, `cinza sobre ${fundo}`);
  }
});

test('nenhuma cor literal fora do :root de home.css', () => {
  const fora = css.replace(/:root\{[^}]*\}/, '');
  assert.deepEqual(fora.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g) ?? [], []);
});

test('o corpo gerado da home não tem cor hexadecimal', () => {
  const html = readFileSync(new URL('../src/index.html', import.meta.url), 'utf8');
  const bloco = html.match(/<!-- HM:START[\s\S]*?<!-- HM:END -->/)[0];
  assert.deepEqual(bloco.match(/#[0-9a-fA-F]{6}\b/g) ?? [], []);
});
