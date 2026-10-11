#!/usr/bin/env node
/*
 * Quality Gate — rodado localmente antes de todo push e também no CI.
 * Plano e medições: docs/specs/QUALITY_GATE_PARALELO.md.
 *
 * Fail-closed: a primeira etapa que falha derruba as outras e o gate sai ≠ 0.
 *
 * Paralelismo (P2): as etapas não dependem umas das outras, salvo as que leem
 * dist/ (gêmeos .md, varredura a11y, orçamento de performance), que esperam o
 * build. O Playwright usa o dev server, não dist/, e começa junto com o build.
 *
 * Escopo (P1):
 *   - impacto (padrão local): Chromium, só as specs das páginas alteradas em
 *     relação a origin/main (+ as transversais, filtradas por GATE_PAGES) e a
 *     varredura a11y só dessas páginas. Arquivo compartilhado → escala sozinho
 *     para a suíte inteira. O gate imprime o que NÃO rodou.
 *   - tudo: `--full`, ou CI=true. É o gate de antes.
 *
 * Uso:
 *   node scripts/quality-gate.mjs            # impacto (local) · tudo (CI)
 *   node scripts/quality-gate.mjs --full     # suíte inteira, 5 projetos
 *   node scripts/quality-gate.mjs --no-build # sem build e sem o que lê dist/
 *   node scripts/quality-gate.mjs --no-e2e   # tudo menos o Playwright (job estático do CI)
 *   node scripts/quality-gate.mjs --leve     # no escopo "tudo", só o chromium (hook de Stop)
 *   node scripts/quality-gate.mjs --paginas devin,index  # impacto forçado nessas páginas
 *   node scripts/quality-gate.mjs --grep "EAI" --project chromium  # foco (implica escopo manual)
 */
import { spawn, spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { selecionar } from './gate/impacto.mjs';

const args = process.argv.slice(2);
const tem = (f) => args.includes(f);
// Aceita "--project chromium" e "--project=chromium" (o hook Stop usa a forma com "=").
function getFlag(name) {
  const eq = args.find((a) => a.startsWith(`${name}=`));
  if (eq) return eq.slice(name.length + 1);
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
}
const skipBuild = tem('--no-build');
const skipE2e = tem('--no-e2e');
const grep = getFlag('--grep');
const project = getFlag('--project');
const paginasForcadas = getFlag('--paginas');

/* ── Escopo ─────────────────────────────────────────────────────────────── */

const git = (...a) => spawnSync('git', a, { encoding: 'utf8' });
function alterados() {
  const base = git('merge-base', 'HEAD', 'origin/main');
  if (base.status !== 0) return null; // sem origin/main não dá para saber → tudo
  const linhas = (r) => (r.stdout || '').split('\n').map((l) => l.trim()).filter(Boolean);
  return [...new Set([
    ...linhas(git('diff', '--name-only', base.stdout.trim())),     // commits da branch + working tree
    ...linhas(git('ls-files', '--others', '--exclude-standard')), // arquivos novos
  ])];
}
function specsExistentes(dir = 'tests', out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory() && !e.name.startsWith('_')) specsExistentes(p, out);
    else if (e.name.endsWith('.spec.js')) out.push(p);
  }
  return out;
}

let escopo;
if (tem('--full') || process.env.CI) escopo = { modo: 'tudo', motivo: tem('--full') ? '--full' : 'CI' };
else if (paginasForcadas) {
  const ps = paginasForcadas.split(',').filter(Boolean);
  escopo = { ...selecionar(ps.map((p) => `src/${p}.html`), ps, specsExistentes()), motivo: '--paginas' };
} else if (grep || project) escopo = { modo: 'manual', motivo: 'foco por --grep/--project' };
else {
  const a = alterados();
  const slugs = readdirSync('src').filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5));
  escopo = a ? selecionar(a, slugs, specsExistentes()) : { modo: 'tudo', motivo: 'origin/main indisponível' };
}

/* ── Etapas ─────────────────────────────────────────────────────────────── */
// { label, cmd, depoisDoBuild?, aoVivo?, env? }
const etapas = [];
if (!skipBuild) etapas.push({ label: 'build', cmd: 'npx vite build' });

// A function de edge serve `<caminho>.md` por regra, sem conferir se o arquivo
// existe: toda URL do sitemap precisa do gêmeo. Lê dist/.
if (!skipBuild) etapas.push({ label: 'gêmeos .md do sitemap', cmd: 'node scripts/check-md-twins.mjs', depoisDoBuild: true });

// Artefatos gerados não podem divergir da fonte.
etapas.push({
  label: 'artefatos gerados em dia',
  cmd: 'node scripts/gen-hub-data.mjs --check && node scripts/gen-hero-counter.mjs --check' +
    ' && node scripts/gen-portfolio.mjs --check && node scripts/gen-editorial.mjs --check' +
    ' && node scripts/optimize-critical-path.mjs --check',
});

// O gêmeo /en/ é artefato gerado: fonte PT mudou e espelho não → página EN mentindo.
etapas.push({ label: 'espelhos /en/ em dia', cmd: 'node scripts/sync-i18n.mjs --check' });

// Coerência do GRAFO (links, órfãs, SSOT): roda sempre, inclusive no modo impacto,
// porque é o que pega uma página quebrando outra.
etapas.push({ label: 'coerência global do site', cmd: 'node scripts/audit-site.mjs --strict' });

// Invariantes puros: ~5 s, sem navegador.
etapas.push({ label: 'invariantes (node:test)', cmd: 'node --test tests/*.test.mjs tests/cloudfront-viewer-request.test.js' });

// Playwright. --no-e2e: o CI roda o Playwright em shards num job próprio.
const naoRodou = [];
if (!skipE2e) {
  let cmd = 'npx playwright test';
  let env;
  if (escopo.modo === 'impacto') {
    if (escopo.specs.length) {
      cmd += ` ${escopo.specs.join(' ')} --project chromium --project mobile --project no-js`;
      env = { GATE_PAGES: escopo.paginas.join(',') };
      naoRodou.push('Playwright em firefox e webkit', 'specs de outras páginas e specs globais (eco-nav, agent-discovery, oauth…)');
    } else {
      cmd = null;
      naoRodou.push('Playwright inteiro (nenhuma página alterada)');
    }
  }
  if (cmd && escopo.modo === 'tudo' && tem('--leve') && !project) {
    cmd += ' --project chromium';
    naoRodou.push('Playwright em firefox, webkit, mobile e no-js (--leve)');
  }
  if (cmd && grep) cmd += ` --grep ${JSON.stringify(grep)}`;
  if (cmd && project) cmd += ` --project ${JSON.stringify(project)}`;
  if (cmd) etapas.push({ label: 'testes (playwright + axe)', cmd, aoVivo: true, env });
}

// Acessibilidade WCAG 2.2 AA contra o build, com catraca: o baseline só desce.
if (!skipBuild) {
  let cmd = 'node scripts/a11y-sweep.mjs';
  if (escopo.modo === 'impacto') {
    const ps = escopo.paginas.flatMap((p) => [`${p}.html`, `en/${p}.html`]);
    cmd = ps.length ? `${cmd} --only ${ps.join(',')}` : null;
    naoRodou.push('varredura a11y das páginas não alteradas');
  }
  if (cmd) etapas.push({ label: 'a11y: varredura WCAG 2.2 (catraca)', cmd, depoisDoBuild: true });
}

// Gate estático do A11Y.md com teto de erros: só pode descer. Não depende de dist/.
etapas.push({ label: 'a11y: gate estático (verify-a11y.py, teto)', cmd: 'node scripts/a11y-static.mjs' });

// Orçamento de performance: lê dist/.
if (!skipBuild) etapas.push({ label: 'orçamento de performance', cmd: 'node scripts/perf-budget.mjs', depoisDoBuild: true });

/* ── Execução paralela, fail-closed ─────────────────────────────────────── */

const vivos = new Set();
let encerrando = false;

function matar(filho) {
  if (filho.exitCode !== null) return;
  if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(filho.pid), '/T', '/F'], { stdio: 'ignore' });
  else try { process.kill(-filho.pid, 'SIGTERM'); } catch { /* já saiu */ }
}

function rodar(e) {
  return new Promise((ok) => {
    const t0 = Date.now();
    const filho = spawn(e.cmd, {
      shell: true, // resolve npx/.cmd no Windows
      detached: process.platform !== 'win32', // grupo próprio: kill(-pid) derruba os netos
      stdio: e.aoVivo ? 'inherit' : ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, ...e.env },
    });
    vivos.add(filho);
    let saida = '';
    filho.stdout?.on('data', (d) => { saida += d; });
    filho.stderr?.on('data', (d) => { saida += d; });
    filho.on('close', (code) => {
      vivos.delete(filho);
      ok({ ...e, code: code ?? 1, ms: Date.now() - t0, saida });
    });
  });
}

const resultados = [];
const inicio = Date.now();

function resumo() {
  console.log('\n=== tempos ===');
  for (const r of [...resultados].sort((a, b) => b.ms - a.ms))
    console.log(`${r.code === 0 ? '✓' : '✗'} ${(r.ms / 1000).toFixed(1).padStart(7)} s  ${r.label}`);
  console.log(`  ${((Date.now() - inicio) / 1000).toFixed(1).padStart(7)} s  total (relógio)`);
}

function concluir(r) {
  if (encerrando) return;
  resultados.push(r);
  // A saída das etapas em buffer sai inteira, de uma vez: logs paralelos não se misturam.
  if (r.saida) process.stdout.write(`\n── ${r.label} ──\n${r.saida.trimEnd()}\n`);
  const s = (r.ms / 1000).toFixed(1);
  if (r.code === 0) { console.log(`✓ [gate] ok: ${r.label} (${s} s)`); return; }
  encerrando = true;
  console.error(`\n✗ [gate] FALHOU em: ${r.label} (exit ${r.code}, ${s} s) — encerrando as demais etapas`);
  for (const f of vivos) matar(f);
  resumo();
  process.exit(r.code || 1);
}

console.log('=== Quality Gate ===');
console.log(`escopo: ${escopo.modo}${escopo.motivo ? ` (${escopo.motivo})` : ''}` +
  (escopo.modo === 'impacto' ? ` · páginas: ${escopo.paginas.join(', ') || 'nenhuma'}` : ''));
for (const e of etapas) console.log(`  ▶ ${e.label}: ${e.cmd}`);

const build = etapas.find((e) => e.label === 'build');
const independentes = etapas.filter((e) => e !== build && !e.depoisDoBuild);
const dependentes = etapas.filter((e) => e.depoisDoBuild);

const promessas = independentes.map((e) => rodar(e).then(concluir));
if (build) {
  promessas.push(rodar(build).then((r) => {
    concluir(r);
    return Promise.all(dependentes.map((e) => rodar(e).then(concluir)));
  }));
}
await Promise.all(promessas);

resumo();
if (naoRodou.length) {
  console.log('\n⚠ [gate] escopo reduzido — não rodou (o CI roda; `--full` roda aqui):');
  for (const n of new Set(naoRodou)) console.log(`   · ${n}`);
}
console.log('\n✓✓ [gate] VERDE — pronto para commit/push.');
