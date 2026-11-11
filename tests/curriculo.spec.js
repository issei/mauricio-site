import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

// /curriculo — a Trajetória. Desde a F2 (SDD-F1-F1b, Parte 3) usa o mesmo bloco PF da home,
// gravado no HTML por scripts/gen-portfolio.mjs (sem fetch do cv.json).

const PATH = '/curriculo.html';
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));

test.describe('Currículo (Trajetória, F2)', () => {
  test('carrega com todos os blocos preenchidos (CA-F2-01)', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.pf-line-card')).toHaveCount(Object.keys(cv.Habilidades).length);
    await expect(page.locator('#results .pf-board li').first()).toBeVisible();
    await expect(page.locator('details.pf-star')).toHaveCount(cv.Projetos.length);
    await expect(page.locator('.pf-exp')).toHaveCount(cv.Experiencia.length);
    await expect(page.locator('.pf-certs .pf-ticket')).toHaveCount(cv.Certificados.length);
    await expect(page.locator('.pf-rec')).toHaveCount(cv.Recomendacoes_Recebidas.length);
  });

  test('um projeto STAR abre no lugar, sem modal', async ({ page }) => {
    await page.goto(PATH);
    const p = cv.Projetos[5];
    const card = page.locator('details.pf-star').filter({ hasText: p.Nome }).first();
    await card.locator('summary').click();
    await expect(card.locator('[data-step="S"] p')).toHaveText(p.Situacao);
    await expect(card.locator('[data-step="A"] li')).toHaveCount(p.Acoes.length);
  });

  test('não carrega a versão clássica (CA-F2-02) nem busca o currículo em runtime', async ({ request }) => {
    const html = await (await request.get(PATH)).text();
    expect(html).not.toMatch(/fetch\(|cv-renderer|initCVRenderer|curriculo\.js|input\.css|font-awesome/);
    expect(html).not.toContain('formato clássico');
  });

  test('a11y: sem violações sérias (axe), com contraste', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const blocking = violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(blocking.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});
