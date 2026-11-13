// O site publica UMA pessoa. O nó Person do JSON-LD repete em toda página e,
// até 2026-11-13, dizia dois cargos diferentes para ela: 31 páginas traziam um
// valor digitado em scripts/seo/identity.mjs e 2 traziam o `Titulo` do
// public/cv.json — o mesmo que o visitante lê na home e na Carreira. Buscadores
// e agentes juntam os dados pelo `@id`, então a divergência era publicada.
//
// Regra: o cargo tem uma fonte só, `public/cv.json`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { PERSON, PERSON_PROFILE } from '../scripts/seo/identity.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const CV = JSON.parse(readFileSync(join(ROOT, 'public/cv.json'), 'utf8'));

test('o cargo do nó Person vem do cv.json', () => {
  assert.equal(PERSON.jobTitle, CV.Titulo);
  assert.equal(PERSON_PROFILE.jobTitle, CV.Titulo);
});

test('nenhuma página publica um cargo diferente do cv.json', () => {
  const html = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => join(dir, e.name));
  const divergentes = [];
  for (const rel of [...html('src'), ...html('src/temas')]) {
    const texto = readFileSync(join(ROOT, rel), 'utf8');
    for (const m of texto.matchAll(/"jobTitle"\s*:\s*"([^"]+)"/g)) {
      if (m[1] !== CV.Titulo) divergentes.push(`${rel}: ${m[1]}`);
    }
  }
  assert.deepEqual(divergentes, []);
});
