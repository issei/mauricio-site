/**
 * Transições entre páginas — comportamento no navegador.
 * Spec: docs/specs/transicoes/SDD-transicoes-entre-paginas.md (§8: CA-09, CA-10, CA-11, CA-13).
 * O CSS e o plugin têm testes unitários em tests/transicoes.test.mjs.
 */
import { test, expect } from '@playwright/test';
import { testDoGate } from './_helpers/gate.js';

/** Registra, em sessionStorage, cada `pagereveal` e se ele trouxe uma transição. Atravessa documentos. */
const registrarPagereveal = (page) =>
  page.addInitScript(() => {
    addEventListener('pagereveal', (e) => {
      const log = JSON.parse(sessionStorage.getItem('vt-log') || '[]');
      log.push({ caminho: location.pathname, transicao: !!e.viewTransition });
      sessionStorage.setItem('vt-log', JSON.stringify(log));
    });
  });
const log = (page) => page.evaluate(() => JSON.parse(sessionStorage.getItem('vt-log') || '[]'));
const abrirPrimeiroVideo = async (page) => {
  await page.goto('/videos.html');
  await page.locator('a.card-link').first().click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await page.waitForLoadState('load');
};

testDoGate(test, 'videos')('Chromium: o clique no cartão e o Voltar rodam a transição (RF-VT-03)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'a transição entre documentos é do Chromium (e do Safari 18.2+)');
  await registrarPagereveal(page);
  await abrirPrimeiroVideo(page);
  // o `pagereveal` do destino vem antes do primeiro quadro, não do evento `load`: espera o registro
  await expect.poll(async () => (await log(page)).length).toBe(2);
  await page.goBack();
  await page.waitForURL(/\/videos(\.html)?$/);
  // a 1ª entrada é o carregamento direto; as duas seguintes são a ida e a volta
  await expect.poll(async () => (await log(page)).length).toBe(3);
  expect((await log(page)).slice(1).map((e) => e.transicao)).toEqual([true, true]);
});

testDoGate(test, 'videos')('carga direta e recarregar não disparam transição (CA-10)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'a transição entre documentos é do Chromium');
  await registrarPagereveal(page);
  await page.goto('/videos.html');
  await page.reload();
  expect((await log(page)).map((e) => e.transicao)).toEqual([false, false]);
});

testDoGate(test, 'videos')('com movimento reduzido nenhuma transição roda (CA-13)', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'a transição entre documentos é do Chromium');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await registrarPagereveal(page);
  await abrirPrimeiroVideo(page);
  await expect.poll(async () => (await log(page)).length).toBe(2);
  await page.goBack();
  await page.waitForURL(/\/videos(\.html)?$/);
  await expect.poll(async () => (await log(page)).length).toBe(3);
  expect((await log(page)).some((e) => e.transicao)).toBe(false);
});

testDoGate(test, 'videos')('a navegação funciona sem erro no console em qualquer navegador (CA-09)', async ({ page }) => {
  const erros = [];
  page.on('pageerror', (e) => erros.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !/favicon|ytimg|net::|Failed to load resource/.test(m.text()) && erros.push(m.text()));
  await abrirPrimeiroVideo(page);
  await expect(page.locator('h1')).toBeVisible();
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Vídeos');
  expect(erros).toEqual([]);
});

test.describe('sem JavaScript (CA-11)', () => {
  test.use({ javaScriptEnabled: false });
  testDoGate(test, 'videos')('índice, assunto e vídeo mostram o conteúdo completo', async ({ page }) => {
    await page.goto('/videos.html');
    await expect(page.locator('h1')).toHaveText('Vídeos');
    await expect(page.locator('a.card-link').first()).toBeVisible();
    const href = await page.locator('a.card-link').first().getAttribute('href');
    await page.goto(href);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.yt')).toBeVisible();
    await page.goto('/temas/engenharia-agentica.html');
    await expect(page.locator('h1')).toBeVisible();
  });
});
