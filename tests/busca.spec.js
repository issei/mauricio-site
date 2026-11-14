// Comportamento da busca — docs/specs/arquitetura-informacao/SDD-catalogo-videos-e-busca.md §4.
// Roda contra o servidor do Vite (precisa de /js/busca.js e de /busca/pt.json por HTTP).
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const abreBusca = async (page) => {
  await page.goto('/videos.html');
  const gatilho = page.getByRole('button', { name: 'Buscar' });
  await gatilho.click();
  return gatilho;
};

test('cabeçalho: Buscar é um botão que abre o diálogo com o campo em foco', async ({ page }) => {
  await abreBusca(page);
  const dialogo = page.getByRole('dialog', { name: 'Buscar no site' });
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByLabel('Buscar no site')).toBeFocused();
});

test('busca: acha sem acento, anuncia o total e agrupa por tipo', async ({ page }) => {
  await abreBusca(page);
  const dialogo = page.getByRole('dialog');
  await dialogo.getByLabel('Buscar no site').fill('orquestracao');
  await expect(dialogo.getByRole('status')).toContainText(/resultados? para “orquestracao”/);
  await expect(dialogo.getByRole('heading', { name: 'Vídeos' })).toBeVisible();
  await expect(dialogo.locator('.bs-res a mark').first()).toBeVisible();
  await expectNoSeriousA11yViolations(page);
});

test('busca: sem resultado diz isso e oferece Conteúdos e Vídeos', async ({ page }) => {
  await abreBusca(page);
  const dialogo = page.getByRole('dialog');
  await dialogo.getByLabel('Buscar no site').fill('zzzqqq');
  await expect(dialogo.getByRole('status')).toContainText('Nenhum resultado');
  await expect(dialogo.getByRole('link', { name: 'Conteúdos' })).toBeVisible();
});

test('busca: Esc fecha e o foco volta ao botão Buscar', async ({ page }) => {
  const gatilho = await abreBusca(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Buscar' })).toBeFocused();
  void gatilho;
});

test('busca: a tecla / abre a busca fora de campos, mas não dentro de um', async ({ page }) => {
  await page.goto('/videos.html');
  await page.getByRole('link', { name: 'Vídeos' }).first().focus();
  await page.keyboard.press('/');
  await expect(page.getByRole('dialog')).toBeVisible();
  const campo = page.getByRole('dialog').getByLabel('Buscar no site');
  await campo.fill('a');
  await page.keyboard.type('/');
  await expect(campo).toHaveValue('a/');
});

test('/busca: mesma busca sem diálogo, aceita ?q= e é noindex', async ({ page }) => {
  await page.goto('/busca.html?q=antigravity');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('.bs-status[role="status"]')).toContainText(/resultado/);
  await expect(page.getByRole('link', { name: /Antigravity/ }).first()).toBeVisible();
  await expectNoSeriousA11yViolations(page);
});

test('/busca: sem JS mostra os links do catálogo', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/busca.html');
  await expect(page.getByRole('link', { name: 'Conteúdos' }).last()).toBeVisible();
  await ctx.close();
});

test('cabeçalho: no celular Buscar e Menu cabem na mesma linha sem rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto('/videos.html');
  const [busca, menu, marca] = await Promise.all(['Buscar', 'Menu'].map((n) => page.getByRole('button', { name: n }).boundingBox()).concat(page.locator('.sh-marca').boundingBox()));
  expect(Math.abs(busca.y - menu.y)).toBeLessThan(4);
  expect(busca.x).toBeGreaterThan(marca.x + marca.width - 1);
  const [sw, iw] = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  expect(sw).toBeLessThanOrEqual(iw);
});
