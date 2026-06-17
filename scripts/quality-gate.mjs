#!/usr/bin/env node
/*
 * Quality Gate — Engenharia de Agentes de IA (BUILD_PLAN §3)
 *
 * Gate ÚNICO e determinístico, rodado localmente antes de todo push e também no CI.
 * Etapas (param na primeira falha — fail-closed):
 *   1. vite build        → erros de build = vermelho
 *   2. playwright test   → smoke + comportamento + a11y (axe), offline
 *
 * Código de saída: 0 verde · ≠0 vermelho.
 *
 * Uso:
 *   node scripts/quality-gate.mjs            # build + testes
 *   node scripts/quality-gate.mjs --no-build # só testes (iteração rápida)
 *   node scripts/quality-gate.mjs --grep "EAI" --project chromium  # foco
 */
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const skipBuild = args.includes('--no-build');

const grepIdx = args.indexOf('--grep');
const grep = grepIdx !== -1 ? args[grepIdx + 1] : null;
const projIdx = args.indexOf('--project');
const project = projIdx !== -1 ? args[projIdx + 1] : null;

// shell:true para resolver `npx`/`.cmd` no Windows de forma portável.
function run(label, command) {
  console.log(`\n▶ [gate] ${label}: ${command}`);
  const res = spawnSync(command, { stdio: 'inherit', shell: true });
  if (res.status !== 0) {
    console.error(`\n✗ [gate] FALHOU em: ${label} (exit ${res.status ?? 'signal'})`);
    process.exit(res.status || 1);
  }
  console.log(`✓ [gate] ok: ${label}`);
}

const steps = [];
if (!skipBuild) steps.push(['build', 'npx vite build']);

let pwCmd = 'npx playwright test';
if (grep) pwCmd += ` --grep ${JSON.stringify(grep)}`;
if (project) pwCmd += ` --project ${JSON.stringify(project)}`;
steps.push(['testes (playwright + axe)', pwCmd]);

console.log('=== Quality Gate :: engenharia-agentes-ia ===');
for (const [label, command] of steps) run(label, command);

console.log('\n✓✓ [gate] VERDE — pronto para commit/push.');
