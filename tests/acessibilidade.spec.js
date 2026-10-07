import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/acessibilidade.html';
const SECOES = ['hero', 'problema', 'decisao', 'implementacao', 'codigo', 'validacao', 'resultado', 'limites', 'ideia'];

test('carrega, SEO e h1 único', async ({ page }) => {
  const res = await page.goto(PATH);
  expect(res?.status()).toBe(200);
  const desc = await page.getAttribute('meta[name="description"]', 'content');
  expect(desc?.length).toBeGreaterThan(50);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mauricio.issei.com.br/acessibilidade');
  await expect(page.locator('h1')).toHaveCount(1);
});

test('estrutura: seções na ordem do SDD, sete diffs e a trilha da catraca', async ({ page }) => {
  await page.goto(PATH);
  const ids = await page.locator('main > section').evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(SECOES);
  await expect(page.locator('article.ac-change')).toHaveCount(7);
  await expect(page.locator('.ac-table--fases tbody tr')).toHaveCount(6);
  await expect(page.locator('.ac-table--fases th[scope="col"]')).toHaveCount(3);
  await expect(page.locator('#evidencia-permite')).toHaveCount(1);
});

test('primeiro Tab é o link de salto e leva ao <main>', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Safari não tabula links por padrão (checkpoint humano)');
  await page.goto(PATH);
  await page.keyboard.press('Tab');
  const skip = page.locator('a.ac-skip');
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('sem rolagem horizontal a 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto(PATH);
  const sobra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(sobra).toBeLessThanOrEqual(0);
});

test('sem violações serious/critical do axe', async ({ page }) => {
  await page.goto(PATH);
  await expectNoSeriousA11yViolations(page);
});
