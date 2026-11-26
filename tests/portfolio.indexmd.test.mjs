/**
 * Gêmeo Markdown da home (public/index.md, escrito por scripts/home/gen-home.mjs).
 * É o que agentes de IA recebem ao pedir Markdown de "/": as mesmas sessões e os mesmos textos da home HTML.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ABERTURA, PROJETOS } from '../scripts/home/home.data.mjs';

const md = readFileSync(new URL('../public/index.md', import.meta.url), 'utf8');
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));

test('index.md tem o nome e a abertura da home', () => {
  assert.ok(md.startsWith(`# ${cv.Nome}\n`));
  assert.ok(md.includes(ABERTURA.sub));
});

test('index.md tem as sessões da home', () => {
  for (const h of ['## Como trabalho', '## Minha história', '## Minhas ideias', '## Meus projetos', '## Contato']) {
    assert.ok(md.includes(`\n${h}\n`), `falta ${h}`);
  }
});

test('index.md traz a tese de cada projeto', () => {
  for (const c of Object.values(PROJETOS.cartoes)) assert.ok(md.includes(c.tese), c.titulo);
});
