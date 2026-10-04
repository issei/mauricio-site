// Gate estático do A11Y.md (tools/a11y/verify-a11y.py) com teto: o script reprova hoje por falsos
// positivos conhecidos (A11Y-DECISIONS.md: role="list") e por violações já registradas em EXCEPTIONS.md,
// então exigir "zero" derrubaria o gate sem informação. O que se cobra é que o nº de erros NÃO SUBA
// (tests/a11y/static-baseline.json). `--update` baixa o teto depois de uma correção.
// Sem Python no ambiente: avisa "NÃO RODOU" e sai 0 — o REPORT.md declara isso, nunca omite.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const BASE = join(ROOT, 'tests/a11y/static-baseline.json');
const candidatos = [join(ROOT, '.venv-i18n/Scripts/python.exe'), join(ROOT, '.venv-i18n/bin/python'), 'python3', 'python'];

let saida = null;
for (const py of candidatos) {
  if (py.includes('.venv') && !existsSync(py)) continue;
  const r = spawnSync(py, [join(ROOT, 'tools/a11y/verify-a11y.py'), ROOT, '--src', join(ROOT, 'src')], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
  if (!r.error && /(PASS|FAIL)/.test(r.stdout)) { saida = r.stdout; break; }
}
if (!saida) {
  console.log('⚠ [a11y-static] NÃO RODOU: nenhum Python com verify-a11y.py disponível.');
  process.exit(0);
}

const m = saida.match(/FAIL — (\d+) error\(s\), (\d+) warning\(s\)/);
const atual = m ? { errors: +m[1], warnings: +m[2] } : { errors: 0, warnings: +(saida.match(/(\d+) warning/)?.[1] ?? 0) };
if (process.argv.includes('--update')) {
  writeFileSync(BASE, JSON.stringify(atual, null, 2) + '\n');
  console.log(`✓ [a11y-static] teto gravado: ${atual.errors} erro(s), ${atual.warnings} aviso(s)`);
  process.exit(0);
}
const teto = JSON.parse(readFileSync(BASE, 'utf8'));
if (atual.errors > teto.errors) {
  console.error(saida.split('\n').filter((l) => l.startsWith('✗')).join('\n'));
  console.error(`✗ [a11y-static] ${atual.errors} erro(s) > teto ${teto.errors}. Corrija o que subiu (não mexa no teto).`);
  process.exit(1);
}
const nota = atual.errors < teto.errors ? ` — abaixo do teto (${teto.errors}); rode \`node scripts/a11y-static.mjs --update\` para travar o ganho` : '';
console.log(`✓ [a11y-static] ${atual.errors} erro(s) (teto ${teto.errors}), ${atual.warnings} aviso(s)${nota}`);
