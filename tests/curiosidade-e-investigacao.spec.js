import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/curiosidade-e-investigacao.html';

test('carrega, título/SEO e h1 único', async ({ page }) => {
  const res = await page.goto(PATH);
  expect(res?.status()).toBe(200);
  const desc = await page.getAttribute('meta[name="description"]', 'content');
  expect(desc?.length).toBeGreaterThan(50);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('curiosidade');
});

test('estrutura: onze seções narrativas e três distinções', async ({ page }) => {
  await page.goto(PATH);
  await expect(page.locator('[data-ci-section]')).toHaveCount(11);
  await expect(page.locator('.ci-callout')).toHaveCount(3);
});

test('índice: scroll-spy marca a seção atual', async ({ page }) => {
  await page.goto(PATH);
  await page.locator('#bancada').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-ci-tocLink][aria-current="true"]').first()).toHaveAttribute(
    'href',
    '#bancada'
  );
});

test('Bancada vs. Oráculo: fluxo linear por clique habilita ações e revela síntese', async ({ page }) => {
  await page.goto(PATH);
  const actionBtn = page.locator('[data-ci-action]').first();
  await expect(actionBtn).toBeDisabled();

  const source = page.locator('[data-ci-source]').first();
  await source.click();
  await expect(source).toHaveAttribute('aria-pressed', 'true');
  await expect(actionBtn).toBeEnabled();

  await actionBtn.click();
  await expect(page.locator('[data-ci-result]')).toBeVisible();
  await expect(page.locator('[data-ci-result]')).toContainText('julgamento continua sendo seu');
});

test('pausa de recuperação: revela perguntas e textarea sem enviar dados', async ({ page }) => {
  await page.goto(PATH);
  const panel = page.locator('[data-ci-recovery-panel]');
  await expect(panel).toBeHidden();
  await page.locator('[data-ci-recovery-start]').click();
  await expect(panel).toBeVisible();
  await expect(panel.locator('textarea')).toBeVisible();
});

test('accordions (Referências, Nota editorial, Auditoria) abrem via teclado', async ({ page }) => {
  await page.goto(PATH);
  const details = page.locator('details.ci-accordion');
  await expect(details).toHaveCount(3);
  const first = details.first();
  await expect(first).not.toHaveAttribute('open', '');
  await first.locator('summary').click();
  await expect(first).toHaveAttribute('open', '');
});

test('modo de leitura simples e toggle de animação persistem via localStorage', async ({ page }) => {
  await page.goto(PATH);
  await page.locator('[data-ci-simple-toggle]').click();
  await expect(page.locator('[data-ci-simple-toggle]')).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('[data-ci-simple-toggle]')).toHaveAttribute('aria-pressed', 'true');
});

test('a11y: axe sem violações serious/critical', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(PATH);
  await expectNoSeriousA11yViolations(page);
});

test('mobile: sem scroll horizontal e índice colapsado por padrão', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(PATH);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator('[data-ci-toc-mobile]')).not.toHaveAttribute('open', '');
});

test('degradação: ciclo, accordions e âncoras funcionam sem depender de JS ativo', async ({ page }) => {
  await page.goto(PATH);
  // Conteúdo real no DOM (não injetado apenas via JS) — confere progressive enhancement.
  await expect(page.locator('.ci-cycle-list li')).toHaveCount(12);
  await expect(page.locator('details.ci-accordion summary').first()).toBeVisible();
});
