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

// Aceita as duas formas de flag: "--project chromium" e "--project=chromium".
// (O hook Stop usa a forma com "=", que antes era ignorada — rodando a suíte
// inteira em 3 navegadores em vez do smoke chromium pretendido.)
function getFlag(name) {
  const eq = args.find((a) => a.startsWith(`${name}=`));
  if (eq) return eq.slice(name.length + 1);
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
}
const grep = getFlag('--grep');
const project = getFlag('--project');

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

// Artefatos gerados não podem divergir da fonte. Barato e determinístico —
// pega à mão um contador de Hero ou um card de Hub editado manualmente.
steps.push([
  'artefatos gerados em dia',
  'node scripts/gen-hub-data.mjs --check && node scripts/gen-hero-counter.mjs --check' +
    ' && node scripts/optimize-critical-path.mjs --check',
]);

// Coerência do GRAFO, não de uma página: links quebrados, órfãs, SSOT
// divergentes, ícones inexistentes. Cada suíte olhava a sua página e ninguém
// olhava as arestas entre elas.
steps.push(['coerência global do site', 'node scripts/audit-site.mjs --strict']);

// Invariantes puros ANTES do E2E: falham em ~100ms e evitam subir navegador
// para descobrir que um token de cor ou um par de frases está fora do contrato.
steps.push(['invariantes (node:test)', 'node --test tests/*.test.mjs']);

let pwCmd = 'npx playwright test';
if (grep) pwCmd += ` --grep ${JSON.stringify(grep)}`;
if (project) pwCmd += ` --project ${JSON.stringify(project)}`;
steps.push(['testes (playwright + axe)', pwCmd]);

// Orçamento de performance: só no gate completo. Depende de dist/, que só
// existe após o build — em --no-build o artefato pode estar velho ou ausente.
if (!skipBuild) steps.push(['orçamento de performance', 'node scripts/perf-budget.mjs']);

console.log('=== Quality Gate :: engenharia-agentes-ia ===');
for (const [label, command] of steps) run(label, command);

console.log('\n✓✓ [gate] VERDE — pronto para commit/push.');
