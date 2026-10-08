import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Spec: docs/specs/pages/aprendizagem-autorregulada/00_SDD_aprendizagem-autorregulada.md
const LANDING = '/aprendizagem-autorregulada.html';
const ARTIGO = '/aprendizagem-autorregulada-artigo.html';
const FICHA = '/downloads/ficha-de-estudo-aprendizagem-autorregulada.md';

test.describe('landing — O Ciclo da Aprendizagem Autorregulada', () => {
  test('carrega, SEO e h1 único', async ({ page }) => {
    const res = await page.goto(LANDING);
    expect(res?.status()).toBe(200);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mauricio.issei.com.br/aprendizagem-autorregulada');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Aprendizagem Autorregulada');
  });

  test('estrutura: 7 seções (com vídeo), 5 passos do ciclo, 4 blocos do protocolo', async ({ page }) => {
    await page.goto(LANDING);
    await expect(page.locator('[data-aa-section]')).toHaveCount(7);
    await expect(page.locator('#video iframe')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/edwg9s12EwE');
    await expect(page.locator('#ciclo ol > [data-aa-step]')).toHaveCount(5);
    await expect(page.locator('#protocolo ol > [data-aa-slot]')).toHaveCount(4);
    await expect(page.locator('#evidencias .aa-limit')).toContainText('nenhum estudo testou o ciclo completo');
  });

  test('CTAs levam ao artigo e à ficha baixável', async ({ page, request }) => {
    await page.goto(LANDING);
    await expect(page.locator('[data-aa-cta="artigo"]')).toHaveAttribute('href', './aprendizagem-autorregulada-artigo.html');
    const ficha = page.locator('[data-aa-cta="ficha"]');
    await expect(ficha).toHaveAttribute('download', '');
    const res = await request.get(FICHA);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('## Recuperação sem consulta');
  });

  test('a11y: axe sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(LANDING);
    await expectNoSeriousA11yViolations(page);
  });

  test('mobile: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(LANDING);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('artigo — Do resumo à nova pergunta', () => {
  test('carrega, h1 único e as dez seções A–J', async ({ page }) => {
    const res = await page.goto(ARTIGO);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const id of ['resposta-curta', 'conceitos', 'modelo', 'matriz', 'comprovado', 'artigo', 'metodo', 'ficha', 'autoexperimento', 'referencias']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
  });

  test('103 referências e toda citação aponta para uma delas', async ({ page }) => {
    await page.goto(ARTIGO);
    await expect(page.locator('#referencias li[id^="ref-"]')).toHaveCount(103);
    const quebradas = await page.evaluate(() =>
      [...document.querySelectorAll('a.aa-cite')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => !document.getElementById(h.slice(1))));
    expect(quebradas).toEqual([]);
  });

  test('matriz de evidências tem 21 linhas', async ({ page }) => {
    await page.goto(ARTIGO);
    await expect(page.locator('#matriz tbody tr')).toHaveCount(21);
  });

  test('a11y: axe sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(ARTIGO);
    await expectNoSeriousA11yViolations(page);
  });

  test('mobile: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(ARTIGO);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
