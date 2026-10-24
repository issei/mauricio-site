import { test, expect } from '@playwright/test';

/*
 * Sem JavaScript (spec §6.4): o roteiro inteiro continua legível e os controles
 * que só funcionam com script não aparecem. Roda apenas no projeto `no-js`.
 */

const PATH = '/entrevista-acessibilidade-streaming.html';

test.describe('Entrevista — sem JavaScript', () => {
  test('o roteiro aparece e o aviso explica que nada será salvo', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    for (const id of ['abertura', 'contexto', 'eixo-a', 'eixo-e', 'barreiras', 'final', 'orientacoes', 'topicos']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    // O motor de texto do Playwright ignora <noscript>; o seletor CSS não.
    await expect(page.locator('.et-alerta')).toContainText('O JavaScript está desligado');
    await expect(page.locator('.et-alerta')).toBeVisible();
    await expect(page.locator('#topicos-texto')).toHaveValue(/^Olá, \[nome\]\./);
  });

  test('controles que dependem de script ficam ocultos', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.getByRole('button', { name: /Adicionar episódio/ })).toHaveCount(0);
    await expect(page.locator('#exportar')).toBeHidden();
    await expect(page.locator('#cron-iniciar')).toBeHidden();
  });
});
