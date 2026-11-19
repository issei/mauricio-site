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

// ── Elementos compartilhados e direção (E4, E5) ─────────────────────────────

/**
 * Registra, para cada `pageswap` e `pagereveal` com transição, os tipos e os elementos que levam
 * `view-transition-name`. Lê num timer: o microtask corre logo depois do primeiro ouvinte, antes do da página.
 */
const registrarNomes = (page) =>
  page.addInitScript(() => {
    const gravar = (evento, vt) =>
      setTimeout(() => {
        const nomes = [...document.querySelectorAll('[style*="view-transition-name"]')].map((el) => ({
          nome: el.style.viewTransitionName,
          tag: el.tagName.toLowerCase(),
          classe: el.className,
          href: el.closest('li, .hero')?.querySelector('a[href]')?.getAttribute('href') ?? null,
        }));
        const l = JSON.parse(sessionStorage.getItem('vt-nomes') || '[]');
        l.push({ evento, caminho: location.pathname, tipos: [...vt.types], nomes });
        sessionStorage.setItem('vt-nomes', JSON.stringify(l));
      }, 0);
    addEventListener('pageswap', (e) => e.viewTransition && gravar('pageswap', e.viewTransition));
    addEventListener('pagereveal', (e) => e.viewTransition && gravar('pagereveal', e.viewTransition));
  });
const nomes = (page) => page.evaluate(() => JSON.parse(sessionStorage.getItem('vt-nomes') || '[]'));
const esperar = (page, n) => expect.poll(async () => (await nomes(page)).length).toBe(n);
const por = (nomesDe, nome) => nomesDe.filter((n) => n.nome === nome);

const soChromium = (browserName) => test.skip(browserName !== 'chromium', 'a transição entre documentos é do Chromium');

testDoGate(test, 'videos')('ida: só o cartão clicado dá capa e título; o vídeo recebe os mesmos nomes (CA-01, CA-07)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  // o mesmo vídeo aparece no destaque, nas prateleiras e na grade: escolhe um cartão de prateleira
  const link = page.locator('.prateleira a.card-link').first();
  const href = await link.getAttribute('href');
  await link.click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(saida).toMatchObject({ evento: 'pageswap', caminho: '/videos.html', tipos: ['avanco'] });
  expect(por(saida.nomes, 'vt-capa')).toHaveLength(1);
  expect(por(saida.nomes, 'vt-titulo')).toHaveLength(1);
  expect(por(saida.nomes, 'vt-capa')[0]).toMatchObject({ classe: 'card-thumb', href });
  expect(por(saida.nomes, 'vt-titulo')[0].tag).toBe('h3');
  expect(entrada).toMatchObject({ evento: 'pagereveal', tipos: ['avanco'] });
  expect(por(entrada.nomes, 'vt-capa')[0]).toMatchObject({ tag: 'div', classe: 'yt' });
  expect(por(entrada.nomes, 'vt-titulo')[0].tag).toBe('h1');
  // CA-07: a miniatura em cache sustenta o quadro novo enquanto a imagem grande carrega
  await expect(page.locator('.yt')).toHaveCSS('background-image', /mqdefault\.jpg/);
});

testDoGate(test, 'videos')('o teclado produz a mesma transição que o clique (CA-14)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  await page.locator('.prateleira a.card-link').first().focus();
  await page.keyboard.press('Enter');
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  const [saida] = await nomes(page);
  expect(saida.tipos).toEqual(['avanco']);
  expect(por(saida.nomes, 'vt-capa')).toHaveLength(1);
});

testDoGate(test, 'videos')('nenhum nome sobra depois da transição, nem no Voltar (CA-03)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  await page.locator('.prateleira a.card-link').first().click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  await expect.poll(() => page.locator('[style*="view-transition-name"]').count()).toBe(0);
  await page.goBack();
  await page.waitForURL(/\/videos(\.html)?$/);
  await esperar(page, 4);
  await expect.poll(() => page.locator('[style*="view-transition-name"]').count()).toBe(0);
  await page.goForward(); // restauração do histórico (bfcache, quando o navegador a usa)
  await page.waitForURL(/\/videos\/[^/]+/);
  await expect.poll(() => page.locator('[style*="view-transition-name"]').count()).toBe(0);
});

testDoGate(test, 'videos')('volta: o vídeo dá capa e título e o cartão visível os recebe (CA-02)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  const link = page.locator('.prateleira a.card-link').first();
  const href = await link.getAttribute('href');
  await link.click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  await page.goBack();
  await page.waitForURL(/\/videos(\.html)?$/);
  await esperar(page, 4);
  const [, , saida, entrada] = await nomes(page);
  expect(saida).toMatchObject({ evento: 'pageswap', tipos: ['retorno'] });
  expect(por(saida.nomes, 'vt-capa')[0].classe).toBe('yt');
  expect(entrada).toMatchObject({ evento: 'pagereveal', tipos: ['retorno'] });
  expect(por(entrada.nomes, 'vt-capa')).toHaveLength(1);
  expect(por(entrada.nomes, 'vt-capa')[0]).toMatchObject({ classe: 'card-thumb', href });
});

testDoGate(test, 'videos')('volta com o cartão fora da tela: ninguém recebe o nome (CA-02)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  const ultimo = page.locator('#todos a.card-link').last();
  await ultimo.scrollIntoViewIfNeeded();
  await ultimo.click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  await page.locator('p.crumb a[href="/videos"]').click(); // push para a lista: abre no topo, o cartão está lá embaixo
  await page.waitForURL(/\/videos(\.html)?$/);
  await esperar(page, 4);
  const [, , , entrada] = await nomes(page);
  expect(entrada.tipos).toEqual(['retorno']);
  expect(por(entrada.nomes, 'vt-capa')).toHaveLength(0);
  expect(por(entrada.nomes, 'vt-titulo')).toHaveLength(0);
});

testDoGate(test, 'videos')('vídeo → vídeo usa o tipo lateral (CA-05)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  await page.locator('.prateleira a.card-link').first().click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  await page.locator('#mais-do-assunto a.card-link').first().click();
  await esperar(page, 4);
  const [, , saida, entrada] = await nomes(page);
  expect(saida.tipos).toEqual(['lateral']);
  expect(entrada.tipos).toEqual(['lateral']);
  expect(por(saida.nomes, 'vt-capa')).toHaveLength(1);
  expect(por(saida.nomes, 'vt-capa')[0].classe).toBe('card-thumb');
  expect(por(entrada.nomes, 'vt-capa')[0].classe).toBe('yt');
});

testDoGate(test, 'videos')('com #artigo o vídeo não recebe nome de capa (CA-04)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  await page.locator('a[href$="#artigo"]').first().click();
  await page.waitForURL(/#artigo$/);
  await esperar(page, 2);
  const [, entrada] = await nomes(page);
  expect(entrada.tipos).toEqual(['avanco']);
  expect(por(entrada.nomes, 'vt-capa')).toHaveLength(0);
  await expect(page.locator('#artigo')).toBeVisible();
});

testDoGate(test, 'videos')('falha forçada (nome duplicado): a página abre completa e sem nomes sobrando (CA-12)', async ({ page, browserName }) => {
  soChromium(browserName);
  const erros = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.addInitScript(() => {
    // depois do ouvinte da página, outro elemento ganha o mesmo nome: o navegador pula a transição
    addEventListener('pageswap', (e) => e.viewTransition && setTimeout(() => { document.querySelector('h1').style.viewTransitionName = 'vt-capa'; }, 0));
  });
  await page.goto('/videos.html');
  await page.locator('.prateleira a.card-link').first().click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.yt')).toBeVisible();
  await expect.poll(() => page.locator('[style*="view-transition-name"]').count()).toBe(0);
  expect(erros).toEqual([]);
});

testDoGate(test, 'videos')('sem navigation.activation (Safari 18.2 a 26.1) a ida e a volta ainda têm direção (RF-VT-11)', async ({ page, browserName }) => {
  soChromium(browserName);
  await page.addInitScript(() => {
    Object.defineProperty(window.navigation, 'activation', { value: null, configurable: true });
    Object.defineProperty(PageSwapEvent.prototype, 'activation', { get: () => null, configurable: true });
  });
  await registrarNomes(page);
  await page.goto('/videos.html');
  const link = page.locator('.prateleira a.card-link').first();
  const href = await link.getAttribute('href');
  await link.click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  await page.goBack();
  await page.waitForURL(/\/videos(\.html)?$/);
  await esperar(page, 4);
  const [ida, chegada, , volta] = await nomes(page);
  expect(ida.tipos).toEqual(['avanco']); // o destino vem do link clicado
  expect(por(ida.nomes, 'vt-capa')).toHaveLength(1);
  expect(chegada.tipos).toEqual(['avanco']); // a origem vem do sessionStorage
  expect(volta.tipos).toEqual(['retorno']);
  expect(por(volta.nomes, 'vt-capa')[0]).toMatchObject({ classe: 'card-thumb', href });
});

testDoGate(test, 'videos')('depois da transição o primeiro Tab vai ao link "Pular para o conteúdo" (CA-15)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/videos.html');
  await page.locator('.prateleira a.card-link').first().click();
  await page.waitForURL(/\/videos\/[^/]+/);
  await esperar(page, 2);
  await page.keyboard.press('Tab');
  await expect(page.locator('a.skip')).toBeFocused();
});
