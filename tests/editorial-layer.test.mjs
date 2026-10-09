// Contrato da camada editorial — docs/specs/editorial/EDITORIAL-LAYER.md.
//
// O que se testa aqui é o que a spec chama de regra, não estética:
//   - concisão (§5): limites de frases, rotas e palavras;
//   - taxonomia fechada (§4): formato, profundidade e modo vêm de listas;
//   - nenhuma rota aponta para uma âncora que não existe;
//   - nenhum heading novo (a camada não mexe no esqueleto do documento);
//   - o HTML publicado é exatamente o que o gerador produz.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EDITORIAL, KINDS, DEPTHS, MODES } from '../scripts/editorial/editorial.data.mjs';
import { build, countWords } from '../scripts/gen-editorial.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const page = (slug) => readFileSync(join(ROOT, 'src', `${slug}.html`), 'utf8');
const sentences = (s) => s.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9])/u).filter(Boolean).length;
const block = (html, name) => new RegExp(`<!-- ${name}:START[\\s\\S]*?<!-- ${name}:END -->`).exec(html)?.[0] ?? '';

for (const [slug, e] of Object.entries(EDITORIAL)) {
  test(`${slug}: taxonomia fechada`, () => {
    if (!e.kind) {
      // Entrada só de continuação: sem orientação, logo sem rotas nem bloco de entrada.
      assert.ok(e.next?.length && !e.routes, 'entrada sem `kind` precisa ser só continuação');
      return;
    }
    assert.ok(KINDS.includes(e.kind), `formato fora da taxonomia: ${e.kind}`);
    assert.ok(DEPTHS.includes(e.depth), `profundidade fora da taxonomia: ${e.depth}`);
    for (const r of e.routes ?? []) assert.ok(MODES.includes(r.mode), `modo fora da taxonomia: ${r.mode}`);
    assert.ok(['inline', 'section'].includes(e.placement));
  });

  test(`${slug}: limites de concisão (§5)`, () => {
    if (e.oneLiner) assert.ok(sentences(e.oneLiner) <= 2, '"Em uma frase" passa de 2 frases');
    if (e.thesis) assert.ok(sentences(e.thesis) <= 3, '"A tese" passa de 3 frases');
    if (e.audience) assert.ok(sentences(e.audience) <= 2, '"Para quem é" passa de 2 frases');
    assert.ok((e.routes?.length ?? 0) <= 5, 'mais de 5 rotas');
    assert.ok((e.next?.length ?? 0) <= 3, 'mais de 3 continuações');
    const html = page(slug);
    const words = countWords(block(html, 'EDITORIAL'));
    assert.ok(words <= 200, `camada de entrada com ${words} palavras (teto 200)`);
  });

  test(`${slug}: toda rota aponta para um id existente`, () => {
    const html = page(slug);
    for (const r of e.routes ?? []) {
      for (const [href] of r.links) {
        assert.match(href, /^#/, `rota deve ser âncora interna: ${href}`);
        assert.ok(html.includes(`id="${href.slice(1)}"`), `âncora sem destino: ${href}`);
      }
    }
    if (e.summary) assert.ok(html.includes('id="em-sintese"'), 'atalho para #em-sintese sem destino');
    for (const id of e.core ?? []) assert.ok(html.includes(`id="${id}"`), `core sem destino: #${id}`);
  });

  test(`${slug}: continuações apontam para páginas que existem`, () => {
    for (const n of e.next ?? []) {
      const file = n.href.replace(/^\.\//, '');
      assert.ok(existsSync(join(ROOT, 'src', file)), `continuação quebrada: ${n.href}`);
      assert.ok(n.why && n.why.length > 20, `continuação sem justificativa: ${n.href}`);
    }
  });

  test(`${slug}: a camada não cria headings`, () => {
    const html = page(slug);
    for (const name of ['EDITORIAL', 'EDITORIAL-NEXT']) {
      assert.doesNotMatch(block(html, name), /<h[1-6]\b/i, `${name} contém heading`);
    }
  });

  test(`${slug}: HTML em dia com o gerador`, () => {
    const html = page(slug);
    assert.equal(build(slug, html), html, 'rode: node scripts/gen-editorial.mjs');
  });
}
