import { test, expect } from '@playwright/test';

/*
 * Degradação sem JavaScript (spec doc 02: "sem JS" em cada ficha de figura).
 *
 * A página é um artigo: o conteúdo tem de existir no HTML. Este arquivo roda
 * apenas no projeto `no-js` do playwright.config.js — com JavaScript ligado ele
 * verificaria o contrário do que pretende.
 */

const PATH = '/formulacao-de-problemas.html';

test.describe('Formulação de Problemas — sem JavaScript', () => {
  test('o artigo inteiro continua legível', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#veredito-titulo')).toBeVisible();
  });

  test('as seis dimensões e os seis estados aparecem empilhados', async ({ page }) => {
    await page.goto(PATH);
    for (const id of ['aleatoria', 'epistemica', 'estrutural', 'semantica', 'fronteira', 'valores']) {
      await expect(page.locator(`#dim-${id}`)).toBeVisible();
    }
    for (const s of ['s0', 's1', 's2', 's3', 's4', 's5']) {
      await expect(page.locator(`#estado-${s}`)).toBeVisible();
    }
  });

  test('a curva de parada mostra o cenário padrão e os controles ficam inertes', async ({ page }) => {
    await page.goto(PATH);
    // Linha de parada desenhada no HTML em t* = 4,0 (x = 474).
    await expect(page.locator('[data-parada-stop]')).toHaveAttribute('x1', '474');
    await expect(page.locator('[data-parada-rotulo]')).toContainText('4,0');
    // Sem JS o slider não tem quem o escute: nasce desabilitado, não mente.
    await expect(page.locator('#fp-in-lambda')).toBeDisabled();
    // E os números continuam disponíveis em tabela.
    await expect(page.locator('#parada table.fp-tabela tbody tr')).toHaveCount(9);
  });

  test('nada fica invisível esperando animação', async ({ page }) => {
    await page.goto(PATH);
    const invisiveis = await page.evaluate(() =>
      [...document.querySelectorAll('.fp-reveal')].filter(
        (el) => Number(getComputedStyle(el).opacity) < 0.99
      ).length
    );
    expect(invisiveis).toBe(0);
  });
});
