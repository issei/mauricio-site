/**
 * Gêmeo Markdown da home (SDD-F1-F1b, F3.8, RF-F3-13/14).
 * public/index.md é o que agentes de IA recebem ao pedir Markdown de "/".
 * Ele precisa trazer as mesmas seções e o mesmo cargo da home HTML.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const md = readFileSync(new URL('../public/index.md', import.meta.url), 'utf8');
const html = readFileSync(new URL('../src/index.html', import.meta.url), 'utf8');
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));

test('index.md tem o cargo atual do cv.json', () => {
  assert.ok(md.includes(`**${cv.Titulo}**`));
});

test('index.md tem as seções da home', () => {
  for (const h of ['## Sobre', '## Temas', '## Provas', '## Destaques', '## Contato']) {
    assert.ok(md.includes(`\n${h}\n`), `falta ${h}`);
  }
});

test('index.md lista os mesmos temas da home', () => {
  const temasHtml = [...html.matchAll(/catalogo\.html#tema-([a-z0-9-]+)"/g)].map((m) => m[1]);
  const temasMd = [...md.matchAll(/\/temas\/([a-z0-9-]+)\)/g)].map((m) => m[1]);
  assert.ok(temasHtml.length > 0);
  assert.deepEqual(temasMd, temasHtml);
});
