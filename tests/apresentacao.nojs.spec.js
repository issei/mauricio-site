/**
 * Degradação sem JavaScript (spec §4.2) — projeto `no-js`.
 *
 * "A página deve degradar para uma versão estática legível, com a Visão
 * Executiva como conteúdo padrão renderizado no HTML base — garante que a
 * proposta de valor sobrevive mesmo no pior cenário técnico."
 *
 * Antes destes testes, essa promessa era inverificável no repositório: não
 * havia nenhum projeto Playwright com javaScriptEnabled: false.
 */
import { test, expect } from '@playwright/test';


const PATH = '/apresentacao.html';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH);
});

test('a proposta de valor executiva está inteira no HTML base', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('auditar');

  const lede = page.locator('.ap-pair[data-pair="hero-lede"] [data-persona="exec"]');
  await expect(lede).toBeVisible();
  await expect(lede).toContainText('vantagem competitiva');
});

test('a Visão de Engenharia fica oculta por atributo nativo, não por JS', async ({ page }) => {
  const eng = page.locator('.ap-pair[data-pair="hero-lede"] [data-persona="eng"]');
  await expect(eng).toBeHidden();
  await expect(eng).toHaveAttribute('hidden', '');
});

test('as três Zonas continuam legíveis', async ({ page }) => {
  for (const zone of ['graphrag', 'sdd', 'devops']) {
    const section = page.locator(`[data-zone="${zone}"]`);
    await expect(section).toBeVisible();
    await expect(section.locator('h2')).toBeVisible();
    await expect(section.locator('[data-layer="1"] .ap-lede')).toBeVisible();
    await expect(section.locator('[data-layer="2"]')).toBeVisible();
  }
});

test('a Prova de Governança sobrevive', async ({ page }) => {
  const cards = page.locator('[data-zone="governanca"] .ap-principle');
  expect(await cards.count()).toBeGreaterThanOrEqual(3);
  await expect(cards.first()).toBeVisible();
});

test('o Hub renderiza os itens da aba padrão sem JavaScript', async ({ page }) => {
  // Os cards vêm no HTML base (gerados em build); o JS só filtra.
  const visible = page.locator('[data-hub-item]:visible');
  expect(await visible.count()).toBeGreaterThan(0);
  await expect(visible.first().locator('.ap-hub-meta')).toContainText(/\d+ min/);

  // A aba padrão é "Para decidir" — mesma regra de estado padrão executivo.
  const tabs = await page.locator('[data-hub-item]:visible').evaluateAll(
    (els) => [...new Set(els.map((e) => e.dataset.tab))]
  );
  expect(tabs).toEqual(['decidir']);
});

test('nenhum conteúdo revelável fica preso invisível', async ({ page }) => {
  // A classe .ap-nojv permanece no <html> (o JS é quem a remove), e o CSS
  // garante que os blocos de revelação apareçam mesmo assim.
  await expect(page.locator('html')).toHaveClass(/ap-nojs/);
  const invisible = await page.evaluate(() =>
    [...document.querySelectorAll('.ap-reveal')]
      .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.9).length
  );
  expect(invisible, 'blocos .ap-reveal invisíveis sem JS').toBe(0);
});

test('a figura do Hero mostra a retícula ordenada, não o caos', async ({ page }) => {
  const transform = await page.locator('.ap-dot').first().evaluate(
    (el) => getComputedStyle(el).transform
  );
  expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').toBe(true);
});

test('o ponto de contato e a navegação continuam acessíveis', async ({ page }) => {
  await expect(page.locator('.ap-contact-question')).toBeVisible();
  await expect(page.locator('.ap-cta')).toBeVisible();
  await expect(page.locator('.ap-footer a').first()).toBeVisible();
});

/*
 * Não há auditoria axe aqui, e isso é uma limitação da ferramenta, não uma
 * lacuna de cobertura: o axe-core injeta e EXECUTA um script na página, o que é
 * impossível com javaScriptEnabled: false. Como o HTML servido é exatamente o
 * mesmo dos projetos desktop, a auditoria axe daquela suíte já cobre esta
 * marcação. O que só este projeto consegue verificar é o que segue.
 */
test('a estrutura semântica não depende de JavaScript', async ({ page }) => {
  await expect(page.locator('main#conteudo')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('[role="radiogroup"]')).toHaveCount(1);
  await expect(page.locator('[role="tab"]')).toHaveCount(3);

  // Hierarquia de headings sem saltos, montada no HTML base.
  const levels = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3')].map((h) => Number(h.tagName[1]))
  );
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i] - levels[i - 1], `salto de heading em ${i}`).toBeLessThanOrEqual(1);
  }
});

test('todo link e botão tem nome acessível sem JavaScript', async ({ page }) => {
  const unnamed = await page.evaluate(() =>
    [...document.querySelectorAll('a[href], button')]
      .filter((el) => {
        const label =
          el.getAttribute('aria-label') || el.textContent.trim() ||
          el.querySelector('img')?.getAttribute('alt') || '';
        return label.length === 0;
      })
      .map((el) => el.outerHTML.slice(0, 80))
  );
  expect(unnamed, `sem nome acessível: ${unnamed.join(' | ')}`).toEqual([]);
});
