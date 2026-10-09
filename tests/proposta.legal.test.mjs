// Guarda de confidencialidade da página não listada /proposta.
// Spec: docs/specs/pages/evolucao-inteligencia-comercial.md §5.
//
// A página não pode citar a instituição nem a marca de adquirência (nem o nome antigo dela), e não usa
// as palavras genéricas "banco" e "rede" em nenhum sentido. Os termos ficam em base64 para o repositório
// não carregar os nomes em texto puro. A spec fica FORA da varredura: ela descreve a regra e cita as
// palavras genéricas. Para acrescentar um termo (ex.: o nome da plataforma interna), decodifique ENCODED,
// inclua o padrão e recodifique.
// Ver a lista: `node tests/proposta.legal.test.mjs --print-terms`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const ENCODED = 'WyJcYmJhbmNbb2Fdcz9cYiIsIlxiYmFuY1thw6Fdcmlbb2Fdcz9cYiIsIlxicmVkZXM/XGIiLCJcYml0YVt1w7pdXGIiLCJ1bmliYW5jbyIsInJlZGVjYXJkIl0=';
const PATTERNS = JSON.parse(Buffer.from(ENCODED, 'base64').toString('utf8')).map(
  (src) => new RegExp(src, 'iu'),
);

if (process.argv.includes('--print-terms')) {
  console.log(PATTERNS.map(String).join('\n'));
  process.exit(0);
}

const FILES = ['src/proposta.html', 'src/proposta.css', 'tests/proposta.spec.js'];

test('a lista codificada decodifica para padrões válidos', () => {
  assert.ok(PATTERNS.length >= 5);
});

test('página, estilo e teste da proposta não citam termos vetados', () => {
  const hits = FILES.map((f) => join(ROOT, f))
    .filter(existsSync)
    .flatMap((abs) =>
      readFileSync(abs, 'utf8')
        .split('\n')
        .flatMap((line, i) => (PATTERNS.some((re) => re.test(line)) ? [`${abs.slice(ROOT.length)}:${i + 1}`] : [])),
    );
  assert.deepEqual(hits, [], `termos vetados encontrados em:\n${hits.join('\n')}`);
});

test('a página existe e está sob a guarda', () => {
  assert.ok(existsSync(join(ROOT, 'src/proposta.html')));
});
