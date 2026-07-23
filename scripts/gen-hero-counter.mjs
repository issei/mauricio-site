#!/usr/bin/env node
/*
 * Contador de autoridade do Hero (spec §2.A) — decisão D-02.
 *
 * A spec exige "dado real, nunca estimado por efeito". Um número digitado à mão
 * no HTML apodrece silenciosamente e vira mentira na primeira spec nova. Aqui
 * ele é DERIVADO da árvore de specs e reescrito no HTML entre marcadores, no
 * mesmo padrão idempotente que build-aeo.mjs já usa no repositório.
 *
 * `tests/apresentacao.spec.js` recalcula a contagem e compara com o HTML: se
 * alguém editar o número na mão, o gate reprova.
 *
 * Uso: node scripts/gen-hero-counter.mjs [--check]
 *   --check  não escreve; sai ≠0 se o HTML estiver dessincronizado (para CI)
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = join(ROOT, 'src/apresentacao.html');
const START = '<!-- AP-COUNTER:START -->';
const END = '<!-- AP-COUNTER:END -->';

/** Conta arquivos .md sob um diretório, recursivamente. */
function countMarkdown(dir) {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) n += countMarkdown(full);
    else if (entry.name.endsWith('.md')) n += 1;
  }
  return n;
}

export function computeCounter() {
  const specs = countMarkdown(join(ROOT, 'docs/specs'));
  const adrs = countMarkdown(join(ROOT, 'docs/decisions'));
  return { specs, adrs };
}

const { specs, adrs } = computeCounter();

// Arredondar para baixo à dezena: o número cresce a cada commit de spec, e um
// valor exato tornaria o HTML sujo a cada alteração de documentação. A âncora
// de autoridade é a ordem de grandeza verificável, não o dígito.
const floor10 = Math.floor(specs / 10) * 10;

const block = [
  START,
  `      <p class="ap-counter ap-mono">`,
  `        <b>${floor10}+</b>`,
  `        <span>especificações auditáveis geridas · ${adrs} decisões de arquitetura registradas</span>`,
  `      </p>`,
  END,
].join('\n');

const html = readFileSync(PAGE, 'utf8');
const re = new RegExp(`${START}[\\s\\S]*?${END}`);

if (!re.test(html)) {
  console.error(`✗ [counter] marcadores ${START} … ${END} ausentes em src/apresentacao.html`);
  process.exit(1);
}

const next = html.replace(re, block);
const check = process.argv.includes('--check');

// Insensível a fim de linha: ver a mesma nota em scripts/gen-hub-data.mjs.
const eol = (s) => s.replace(/\r\n/g, '\n');

if (eol(next) === eol(html)) {
  console.log(`✓ [counter] sincronizado (${floor10}+ specs · ${adrs} ADRs)`);
  process.exit(0);
}
if (check) {
  console.error(`✗ [counter] HTML dessincronizado. Rode: node scripts/gen-hero-counter.mjs`);
  process.exit(1);
}

writeFileSync(PAGE, next);
console.log(`✓ [counter] atualizado: ${floor10}+ specs (${specs} reais) · ${adrs} ADRs`);
