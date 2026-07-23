/**
 * Sincronia entre as duas cópias da SSOT de navegação.
 *
 * O repositório mantém o grafo em specs/ecosystem.nav.yaml (fonte) e uma cópia
 * compilada em src/js/eco-nav.js (para o componente ser self-contained). O
 * ECOSYSTEM.md manda editar as duas juntas, mas nada verificava — e elas de
 * fato divergiram: o YAML ficou em 1.0.0 sem `terminal-evolutivo`, enquanto o
 * JS já estava em 1.1.0 com ele.
 *
 * Este teste transforma aquela regra de documentação em falha de build.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const yaml = readFileSync(join(ROOT, 'specs/ecosystem.nav.yaml'), 'utf8');
const js = readFileSync(join(ROOT, 'src/js/eco-nav.js'), 'utf8');

/** Slugs listados nos pilares do YAML (`nodes: [a, b, c]`). */
function yamlPillarNodes() {
  const out = [];
  for (const m of yaml.matchAll(/^\s{4}nodes:\s*\[([^\]]+)\]/gm)) {
    out.push(...m[1].split(',').map((s) => s.trim()));
  }
  return out;
}

/** Chaves definidas na seção `nodes:` do YAML. */
function yamlNodeKeys() {
  const start = yaml.indexOf('\nnodes:');
  const end = yaml.indexOf('\ncrosslinks:');
  const block = yaml.slice(start, end === -1 ? undefined : end);
  return [...block.matchAll(/^ {2}([a-z0-9-]+):$/gm)].map((m) => m[1]);
}

function jsPillarNodes() {
  const out = [];
  for (const m of js.matchAll(/nodes:\s*\[([^\]]+)\]/g)) {
    out.push(...m[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')));
  }
  return out;
}

test('INV-1 · todo nó citado nos pilares existe na seção nodes do YAML', () => {
  const declared = new Set(yamlNodeKeys());
  const orphans = yamlPillarNodes().filter((n) => !declared.has(n));
  assert.deepEqual(orphans, [], `nós citados mas não definidos: ${orphans.join(', ')}`);
});

test('as versões do YAML e da cópia compilada são iguais', () => {
  const yv = yaml.match(/version:\s*"([\d.]+)"/)?.[1];
  const jv = js.match(/version:\s*'([\d.]+)'/)?.[1];
  assert.ok(yv && jv, 'versão ausente em um dos arquivos');
  assert.equal(
    jv, yv,
    `eco-nav.js está em ${jv} e o YAML em ${yv} — as duas cópias precisam ser ` +
      `editadas juntas com bump de versão (ECOSYSTEM.md)`
  );
});

test('os dois arquivos descrevem exatamente o mesmo conjunto de nós', () => {
  const y = yamlPillarNodes().sort();
  const j = jsPillarNodes().sort();
  assert.deepEqual(
    j, y,
    `divergência entre specs/ecosystem.nav.yaml e src/js/eco-nav.js:\n` +
      `  só no YAML: ${y.filter((n) => !j.includes(n)).join(', ') || '—'}\n` +
      `  só no JS:   ${j.filter((n) => !y.includes(n)).join(', ') || '—'}`
  );
});

test('a página v3.0 está no grafo, no pilar do Método', () => {
  assert.match(yaml, /nodes: \[apresentacao,/, 'apresentacao ausente dos pilares do YAML');
  assert.ok(yamlNodeKeys().includes('apresentacao'), 'nó apresentacao não definido no YAML');
  assert.match(js, /apresentacao: \{ file: 'apresentacao\.html'/, 'nó ausente em eco-nav.js');
});

test('INV-3 · todo nó do grafo corresponde a um arquivo real em src/', async () => {
  const { existsSync } = await import('node:fs');
  const faltando = [];
  for (const m of yaml.matchAll(/^ {4}file:\s*"([^"]+)"$/gm)) {
    if (!existsSync(join(ROOT, 'src', m[1]))) faltando.push(m[1]);
  }
  assert.deepEqual(faltando, [], `arquivos inexistentes: ${faltando.join(', ')}`);
});

test('a página está registrada no SSOT de SEO', async () => {
  const { PAGES } = await import('../scripts/seo/pages.mjs');
  const page = PAGES.find((p) => p.slug === 'apresentacao');
  assert.ok(page, 'apresentacao ausente de scripts/seo/pages.mjs');
  assert.ok(page.title.length >= 10 && page.title.length <= 60, 'título fora de 10–60 chars');
  assert.ok(
    page.description.length >= 50 && page.description.length <= 160,
    'description fora de 50–160 chars'
  );
  assert.ok(page.faq?.length >= 3, 'AEO sem FAQ suficiente');
});
