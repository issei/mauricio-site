// Seleção por impacto do gate (scripts/gate/impacto.mjs): o erro caro é rodar
// MENOS do que devia. Cada caso de "tudo" abaixo é um arquivo que, se escapasse
// da escalada, deixaria uma regressão passar no gate local.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classificar, selecionar, TRANSVERSAIS } from '../scripts/gate/impacto.mjs';

const SLUGS = ['index', 'devin', 'curriculo', 'engenharia-agentes-ia', 'formulacao-de-problemas', 'digital-workplace-agentico',
  'especificacao-conversacional', 'proposta', 'proposta-engenharia-reversa', 'salesforce-agentic-dev', 'salesforce-agentic-quickstart'];
const SPECS = ['tests/devin.spec.js', 'tests/index.spec.js', 'tests/index.nojs.spec.js', 'tests/formulacao.nojs.spec.js',
  'tests/formulacao-de-problemas.spec.js', 'tests/especificacao-conversacional.spec.js', 'tests/eco-nav.spec.js',
  'tests/proposta.spec.js', ...TRANSVERSAIS];

test('arquivos de página mapeiam para a página', () => {
  for (const [f, ps] of [
    ['src/devin.html', ['devin']],
    ['src/en/devin.html', ['devin']],
    ['public/especificacao-conversacional.md', ['especificacao-conversacional']],
    ['public/en/devin.md', ['devin']],
    ['public/downloads/kit-especificacao-conversacional.md', ['especificacao-conversacional']],
    ['src/devin.css', ['devin']],
    ['src/js/devin/components.js', ['devin']],
    ['src/js/eai-quiz.js', ['engenharia-agentes-ia']],
    ['src/js/formulacao/motor.js', ['formulacao-de-problemas']],
    ['src/salesforce-agentic.css', ['salesforce-agentic-dev', 'salesforce-agentic-quickstart']],
    ['tests/devin.spec.js', ['devin']],
    ['src\\devin.html', ['devin']],
  ]) assert.deepEqual(classificar(f, SLUGS), { tipo: 'paginas', paginas: ps }, f);
});

test('compartilhado escala para a suíte inteira', () => {
  for (const f of ['src/style.css', 'src/js/cookie-consent.js', 'src/js/eco-nav.js', 'playwright.config.js', 'vite.config.js',
    'package.json', 'scripts/seo/lib.mjs', 'scripts/quality-gate.mjs', 'tests/_helpers/axe.js', 'tests/aeo.spec.js',
    'tests/a11y/focus-visible.spec.js', 'tests/eco-nav.spec.js', 'public/llms.txt', 'public/.well-known/agent-card.json',
    'src/js/a11y-tabs.js', 'public/images/foto.png'])
    assert.equal(classificar(f, SLUGS).tipo, 'tudo', f);
});

test('sem impacto em página: docs, raiz .md, node:test, manifesto, OG, pages.mjs', () => {
  for (const f of ['docs/specs/X.md', 'REPORT.md', 'knowledge/index.md', 'tests/gate-impacto.test.mjs',
    'scripts/i18n/i18n-manifest.json', 'public/og-devin.png', 'scripts/seo/pages.mjs', '.github/workflows/quality-gate.yml'])
    assert.equal(classificar(f, SLUGS).tipo, 'nada', f);
});

test('selecionar: página → specs dela + transversais', () => {
  const r = selecionar(['src/devin.html', 'public/devin.md', 'REPORT.md'], SLUGS, SPECS);
  assert.equal(r.modo, 'impacto');
  assert.deepEqual(r.paginas, ['devin']);
  assert.ok(r.specs.includes('tests/devin.spec.js'));
  for (const t of TRANSVERSAIS) assert.ok(r.specs.includes(t), t);
  assert.ok(!r.specs.includes('tests/index.spec.js'));
  assert.ok(!r.specs.includes('tests/eco-nav.spec.js'));
});

test('selecionar: spec .nojs entra pelo nome-raiz da página', () => {
  const r = selecionar(['src/formulacao-de-problemas.html'], SLUGS, SPECS);
  assert.ok(r.specs.includes('tests/formulacao.nojs.spec.js'));
  assert.ok(r.specs.includes('tests/formulacao-de-problemas.spec.js'));
});

test('selecionar: um compartilhado no meio derruba o impacto', () => {
  const r = selecionar(['src/devin.html', 'src/js/cookie-consent.js'], SLUGS, SPECS);
  assert.equal(r.modo, 'tudo');
  assert.match(r.motivo, /cookie-consent/);
});

test('selecionar: sem mudança roda tudo; só docs não roda Playwright', () => {
  assert.equal(selecionar([], SLUGS, SPECS).modo, 'tudo');
  assert.deepEqual(selecionar(['docs/a.md', 'REPORT.md'], SLUGS, SPECS), { modo: 'impacto', paginas: [], specs: [] });
});

test('TRANSVERSAIS existe no disco e cobre todo spec de tests/a11y/', async () => {
  const { readdirSync, existsSync } = await import('node:fs');
  for (const t of TRANSVERSAIS) assert.ok(existsSync(t), `${t} não existe`);
  for (const f of readdirSync('tests/a11y').filter((n) => n.endsWith('.spec.js')))
    assert.ok(TRANSVERSAIS.includes(`tests/a11y/${f}`), `tests/a11y/${f} fora de TRANSVERSAIS: no gate por impacto ele não rodaria`);
});
