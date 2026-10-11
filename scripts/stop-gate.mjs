#!/usr/bin/env node
/*
 * Hook Stop — mantém o guardião (quality gate) verde.
 * Roda o gate por IMPACTO (sem build, só chromium, só as páginas alteradas) APENAS quando há
 * mudanças não commitadas sob src/. Se o gate falhar, sai 2 para bloquear o
 * encerramento e devolver o erro ao Claude (fail-closed).
 *
 * Por que condicional: evita rodar Playwright a cada turno quando você só
 * mexeu em docs/config. Para desligar de vez, remova o bloco "Stop" de
 * .claude/settings.json.
 */
import { spawnSync } from 'node:child_process';

const diff = spawnSync('git', ['diff', '--name-only', 'HEAD', '--', 'src'], {
  encoding: 'utf8',
});
const changed = (diff.stdout || '').trim();

if (!changed) process.exit(0); // nada mudou em src/ → não roda nada

console.error('[stop-gate] mudanças em src/ detectadas — gate por impacto (chromium, páginas alteradas)…');
// Sem --project: o gate escolhe o escopo por impacto (Chromium, só as páginas
// alteradas). Com --project=chromium ele rodaria o Chromium inteiro (~6 min).
const res = spawnSync('npm', ['run', 'gate', '--', '--no-build', '--leve'], {
  stdio: 'inherit',
  shell: true, // resolve npm/.cmd no Windows
});

process.exit(res.status === 0 ? 0 : 2);
