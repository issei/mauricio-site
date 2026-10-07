// Guarda de deriva da página /acessibilidade: ela afirma o estado do REPORT.md (status, nível de
// independência, leitor de tela). Se o relatório mudar e a página não acompanhar, a página passa a
// mentir — este teste falha antes disso. Os trechos da página levam `data-evidence`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url);
const report = readFileSync(new URL('REPORT.md', ROOT), 'utf8');
const page = readFileSync(new URL('src/acessibilidade.html', ROOT), 'utf8');

const evidencia = (chave) => page.match(new RegExp(`data-evidence="${chave}"[^>]*>([^<]+)<`))?.[1].trim();

test('status do relatório: a página diz o mesmo que o REPORT.md', () => {
  const status = report.match(/\*\*Status de Conformidade:\*\*\s*⚠️?\s*([A-ZÇÃ]+)/)?.[1];
  assert.ok(status, 'status não encontrado no REPORT.md');
  assert.equal(evidencia('report-status')?.toUpperCase(), status);
});

test('independência: a página declara o nível do REPORT.md', () => {
  const nivel = report.match(/\*\*Independência da Verificação:\*\*\s*([a-z-]+)/)?.[1];
  assert.ok(nivel, 'nível de independência não encontrado no REPORT.md');
  assert.equal(evidencia('report-independence'), nivel);
});

test('leitor de tela: a página diz 0 enquanto o REPORT.md disser "não realizado"', () => {
  const naoRealizado = /\*\*Screen Reader Test:\*\*\s*\*\*não realizado/.test(report);
  assert.equal(evidencia('screen-reader') === '0', naoRealizado);
});
