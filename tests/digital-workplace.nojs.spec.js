import { test, expect } from '@playwright/test';

/*
 * Degradação sem JavaScript (doc 04 §1: "Todo o conteúdo legível; controles dependentes de JS
 * nascem `disabled`"). Roda apenas no projeto `no-js` do playwright.config.js — com JavaScript
 * ligado ela verificaria o contrário do que pretende.
 */

const PATH = '/digital-workplace-agentico.html';

test.describe('Digital Workplace Agêntico — sem JavaScript', () => {
  test('o estudo inteiro continua legível', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.dw-hero__tese')).toBeVisible();
    await expect(page.locator('.dw-cadeia > li')).toHaveCount(6);
    await expect(page.locator('#matriz tbody tr')).toHaveCount(8);
    await expect(page.locator('.dw-camada')).toHaveCount(6);
    await expect(page.locator('.dw-pergunta')).toHaveCount(30);
  });

  test('V4: todos os passos aparecem; os controles nascem desabilitados', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.dw-passos > li').locator('visible=true')).toHaveCount(11);
    for (const sel of ['[data-seq-prev]', '[data-seq-next]', '[data-seq-tudo]']) await expect(page.locator(sel)).toBeDisabled();
  });

  test('V2 e V7: tabelas completas e botões inertes (não mentem)', async ({ page }) => {
    await page.goto(PATH);
    const botoes = page.locator('[data-estagio-btn], [data-trilha-btn]');
    expect(await botoes.count()).toBe(12);
    for (const b of await botoes.all()) await expect(b).toBeDisabled();
    await expect(page.locator('#roadmap-grade tbody tr')).toHaveCount(7);
    await expect(page.locator('#roadmap-grade tbody tr.is-esmaecida')).toHaveCount(0);
    await expect(page.locator('#matriz .is-sel')).toHaveCount(0);
  });

  test('V8: critérios e faixas ficam visíveis para cálculo manual; o botão nasce desabilitado', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#prontidao-form fieldset')).toHaveCount(10);
    await expect(page.locator('#prontidao-form button[type="submit"]')).toBeDisabled();
    await expect(page.locator('#prontidao-faixas tbody tr')).toHaveCount(3);
    await expect(page.locator('#prontidao-form')).toContainText('Sem ele, faça a soma dos pontos à mão');
  });

  test('nada fica invisível esperando animação ou script', async ({ page }) => {
    await page.goto(PATH);
    const invisiveis = await page.evaluate(() =>
      [...document.querySelectorAll('main *')].filter((el) => !el.matches(':disabled')).filter((el) => {
        const s = getComputedStyle(el);
        return s.visibility === 'hidden' || Number(s.opacity) < 0.99;
      }).length);
    expect(invisiveis).toBe(0);
  });
});
