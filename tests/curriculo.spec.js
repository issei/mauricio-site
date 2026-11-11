import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

// /curriculo — a Carreira. Desde a F2 (SDD-F1-F1b, Parte 3) usa o mesmo bloco PF da home,
// gravado no HTML por scripts/gen-portfolio.mjs (sem fetch do cv.json).

const PATH = '/curriculo.html';
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));

test.describe('Currículo (Carreira, F2)', () => {
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

// Linha do tempo (SDD-F1-F1b, Parte 9, RF-F9-01 a RF-F9-07).
test.describe('Linha do tempo da carreira (F9)', () => {
  const anoIni = (j) => +j.Periodo.match(/\d{4}/)[0];
  const ordem = [...cv.Experiencia].sort((a, b) => anoIni(a) - anoIni(b) || 0);

  test('RF-F9-01/02: primeira seção do main; lista em texto, cronológica, com links que existem', async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.locator('main > section').evaluateAll((ss) => ss.map((s) => s.id));
    expect(ids[0]).toBe('linha-do-tempo');
    await expect(page.locator('.pf-tl-resumo')).toContainText(`Carreira desde ${anoIni(ordem[0])}, em ${cv.Experiencia.length} empresas.`);
    const itens = page.locator('ol.pf-tl-lista > li');
    await expect(itens).toHaveCount(cv.Experiencia.length);
    for (const [i, j] of ordem.entries()) {
      await expect(itens.nth(i)).toContainText(j.Cargo);
      await expect(itens.nth(i)).toContainText(j.Empresa);
      const href = await itens.nth(i).locator('a').getAttribute('href');
      await expect(page.locator(href)).toHaveCount(1);
    }
  });

  test('RF-F9-03: a faixa é decorativa e tem um bloco por emprego', async ({ page }) => {
    await page.goto(PATH);
    const faixa = page.locator('.pf-tl-faixa');
    await expect(faixa).toHaveAttribute('aria-hidden', 'true');
    await expect(faixa.locator('.pf-tl-bloco')).toHaveCount(cv.Experiencia.length);
  });

  test('RF-F9-04: com movimento reduzido, a faixa não anima', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await page.locator('#linha-do-tempo').scrollIntoViewIfNeeded();
    await expect(page.locator('.pf-tl')).not.toHaveClass(/pf-tl--armada/);
    const anim = await page.locator('.pf-tl-bloco').evaluateAll((bs) => bs.map((b) => getComputedStyle(b).animationName));
    expect(anim.every((a) => a === 'none')).toBe(true);
  });

  test('RF-F9-04: com movimento, anima uma vez ao aparecer e termina visível', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(PATH);
    await page.locator('#linha-do-tempo').scrollIntoViewIfNeeded();
    await expect(page.locator('.pf-tl')).toHaveClass(/pf-tl--vista/);
    await page.waitForTimeout(1200);
    const t = await page.locator('.pf-tl-bloco').first().evaluate((b) => getComputedStyle(b).transform);
    expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(t);
  });

  test('RF-F9-06: sem rolagem horizontal a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(PATH);
    const sobra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(sobra).toBeLessThanOrEqual(0);
  });
});

