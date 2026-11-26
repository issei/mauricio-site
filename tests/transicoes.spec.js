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
  await expect(page.locator('h1')).toHaveText('Assista, leia e confira as fontes');
  expect(erros).toEqual([]);
});

test.describe('sem JavaScript (CA-11)', () => {
  test.use({ javaScriptEnabled: false });
  testDoGate(test, 'videos')('índice, assunto e vídeo mostram o conteúdo completo', async ({ page }) => {
    await page.goto('/videos.html');
    await expect(page.locator('h1')).toHaveText('Assista, leia e confira as fontes');
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
        const raiz = document.documentElement.style;
        l.push({ evento, caminho: location.pathname, tipos: [...vt.types], nomes, origem: [raiz.getPropertyValue('--vt-x'), raiz.getPropertyValue('--vt-y'), raiz.getPropertyValue('--vt-lado')] });
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

testDoGate(test, 'videos')('passar o mouse num cartão pré-busca só o documento do vídeo (RF-VT-15)', async ({ page, browserName }) => {
  soChromium(browserName);
  const prebuscas = [];
  page.on('request', (r) => { if ((r.headers()['sec-purpose'] || '').includes('prefetch')) prebuscas.push(new URL(r.url()).pathname); });
  await page.goto('/videos.html');
  const link = page.locator('.prateleira a.card-link').first();
  const href = await link.getAttribute('href');
  await link.hover();
  await expect.poll(() => prebuscas.length, { timeout: 8000 }).toBeGreaterThan(0);
  expect(prebuscas.every((p) => /^\/(videos|temas)\//.test(p))).toBe(true);
  expect(prebuscas).toContain(href.split('#')[0]);
});

// ── Família site: início, carreira e conteúdos (SDD-transicoes-site.md, CA-26 a CA-34) ───────────
// Home nova (SDD-destinos-da-home): o nome viaja sem o papel (RF-VT-19 revisto, CA-49); o retrato da S02 vira o da
// carreira (RF-VT-37, CA-50); os projetos e os textos recentes formam a família `destinos` (RF-VT-38, CA-51).

const nomesDe = (lista, nome) => por(lista, nome);
// Na primeira visita o banner de cookies cobre o pé da tela (1280 × 720): os links da home ficam atrás dele.
// Com a escolha gravada, o banner não abre e o clique chega ao link, como para quem já respondeu.
const semBanner = (page) => page.addInitScript(() => localStorage.setItem('consent_v', JSON.stringify({ v: '2.0', ts: 'x', categories: { necessary: true }, method: 'explicit' })));
/** Rola até o meio de uma sessão da home, onde os links dela estão parados e clicáveis. */
const irPara = async (page, secao) => {
  await page.evaluate((s) => {
    document.documentElement.style.scrollBehavior = 'auto';
    const e = document.querySelector(s);
    scrollTo(0, e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2);
  }, secao);
  await page.waitForTimeout(400);
};
const carreiraPeloCabecalho = (page) => page.locator('header.sh').getByRole('link', { name: 'Carreira' }).click();

testDoGate(test, 'index', 'curriculo')('início → carreira pelo cabeçalho: o nome nas duas pontas, sem papel (CA-26, CA-49)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/');
  await carreiraPeloCabecalho(page);
  await page.waitForURL(/\/curriculo/);
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(saida).toMatchObject({ evento: 'pageswap', tipos: ['avanco'] });
  expect(entrada).toMatchObject({ evento: 'pagereveal', tipos: ['avanco'] });
  expect(nomesDe(saida.nomes, 'vt-nome')[0]).toMatchObject({ tag: 'h1' });
  for (const ponta of [saida, entrada]) {
    expect(nomesDe(ponta.nomes, 'vt-nome')).toHaveLength(1);
    expect(nomesDe(ponta.nomes, 'vt-papel')).toHaveLength(0);
  }
});

testDoGate(test, 'index', 'curriculo')('carreira → início pelo cabeçalho: o nome nas duas pontas, tipo retorno (CA-27)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/curriculo.html');
  await page.locator('header.sh').getByRole('link', { name: 'Início' }).click();
  await page.waitForURL((u) => u.pathname === '/');
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(saida.tipos).toEqual(['retorno']);
  expect(entrada.tipos).toEqual(['retorno']);
  for (const ponta of [saida, entrada]) {
    expect(nomesDe(ponta.nomes, 'vt-nome')).toHaveLength(1);
    expect(nomesDe(ponta.nomes, 'vt-papel')).toHaveLength(0);
  }
});

testDoGate(test, 'index', 'curriculo')('"Conheça minha história" → carreira: o retrato nas duas pontas (CA-50)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s02');
  await page.getByRole('link', { name: 'Conheça minha história →' }).click();
  await page.waitForURL(/\/curriculo/);
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(nomesDe(saida.nomes, 'vt-retrato')).toHaveLength(1);
  expect(nomesDe(entrada.nomes, 'vt-retrato')).toHaveLength(1);
  expect(nomesDe(entrada.nomes, 'vt-retrato')[0].tag).toBe('img');
});

testDoGate(test, 'index', 'catalogo')('início → conteúdos pelo CTA da Sessão 03: sem nome dinâmico, só a direção (CA-28)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  await page.getByRole('link', { name: 'Explore minhas ideias →' }).click();
  await page.waitForURL(/\/catalogo/);
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(saida.tipos).toEqual(['avanco']);
  expect(entrada.tipos).toEqual(['avanco']);
  expect(saida.nomes.map((n) => n.nome)).toEqual([]);
  expect(entrada.nomes.map((n) => n.nome)).toEqual([]);
});

testDoGate(test, 'index', 'acessibilidade')('início → projeto e volta: avanço e retorno, sem nome compartilhado (CA-51, CA-56)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s04');
  const antes = await page.evaluate(() => Math.round(scrollY));
  await page.locator('.projetos a', { hasText: 'Acessibilidade' }).click();
  await page.waitForURL(/\/acessibilidade/);
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(saida.tipos).toEqual(['avanco']);
  expect(entrada.tipos).toEqual(['avanco']);
  expect([...saida.nomes, ...entrada.nomes].filter((n) => n.nome !== 'vt-cabecalho')).toEqual([]);
  await page.waitForLoadState('load');
  await page.goBack();
  await page.waitForURL((u) => u.pathname === '/');
  await esperar(page, 4);
  const [, , , volta] = await nomes(page);
  expect(volta.tipos).toEqual(['retorno']);
  await expect.poll(() => page.evaluate(() => Math.round(scrollY)), { timeout: 3000 }).toBeGreaterThan(antes - 3);
  expect(Math.abs((await page.evaluate(() => Math.round(scrollY))) - antes)).toBeLessThanOrEqual(2);
});

testDoGate(test, 'index')('no celular, o primeiro toque num link parado da Sessão 03 abre o destino (CA-58)', async ({ page, browserName }) => {
  soChromium(browserName);
  await page.setViewportSize({ width: 390, height: 844 });
  await semBanner(page);
  await page.goto('/');
  // No celular o conteúdo da S03 sobe com a rolagem: o link fica na tela logo depois da dissolução (22vh).
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; const e = document.querySelector('.hm-s03'); scrollTo(0, e.getBoundingClientRect().top + scrollY + innerHeight * 0.26); });
  const link = page.locator('.recentes a').first();
  await expect(link).toBeInViewport();
  await expect.poll(async () => { const a = await link.boundingBox(); await page.waitForTimeout(150); const b = await link.boundingBox(); return a && b && a.y === b.y; }).toBe(true);
  await link.click();
  await page.waitForURL(/\/a-quem-a-empresa-delega/);
});

testDoGate(test, 'index', 'curriculo', 'catalogo')('com movimento reduzido nenhuma transição roda nas três páginas (CA-31, CA-57)', async ({ page, browserName }) => {
  soChromium(browserName);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await registrarPagereveal(page);
  await page.goto('/');
  await carreiraPeloCabecalho(page);
  await page.waitForURL(/\/curriculo/);
  await page.locator('header.sh').getByRole('link', { name: 'Conteúdos' }).click();
  await page.waitForURL(/\/catalogo/);
  await expect.poll(async () => (await log(page)).length).toBe(3);
  expect((await log(page)).some((e) => e.transicao)).toBe(false);
});

testDoGate(test, 'index', 'curriculo')('Voltar para o início: nenhum nome sobra (CA-32)', async ({ page, browserName }) => {
  soChromium(browserName);
  await page.goto('/');
  await carreiraPeloCabecalho(page);
  await page.waitForURL(/\/curriculo/);
  await page.waitForLoadState('load');
  await page.goBack();
  await page.waitForURL((u) => u.pathname === '/');
  await expect(page.locator('#hm-nome')).toBeVisible();
  // os nomes saem em `finished`, depois do último quadro da transição: espera, não lê na hora
  await expect.poll(() => page.evaluate(() => [...document.querySelectorAll('[style*="view-transition-name"]')].map((e) => e.style.viewTransitionName))).toEqual([]);
});

testDoGate(test, 'index', 'curriculo', 'catalogo')('a pré-busca da home baixa só documentos da família, sem prerender (CA-34, CA-52)', async ({ page, browserName }) => {
  soChromium(browserName);
  const prebuscas = [];
  page.on('request', (r) => { if ((r.headers()['sec-purpose'] || '').includes('prefetch')) prebuscas.push(new URL(r.url()).pathname); });
  await page.goto('/');
  await page.locator('header.sh').getByRole('link', { name: 'Carreira' }).hover();
  await expect.poll(() => prebuscas.length, { timeout: 8000 }).toBeGreaterThan(0);
  expect(prebuscas).toContain('/curriculo.html');
  const regras = await page.locator('script[type="speculationrules"]').first().textContent();
  expect(regras).not.toContain('prerender');
  for (const r of ['/acessibilidade.html', '/case-agents.html', '/agent-ready.html', '/boutique-empresarial-showcase.html']) expect(regras).toContain(r);
});

// ── Abertura imersiva: início → vídeos (SDD-transicoes-vinheta-videos.md, CA-38 a CA-45) ──────────

// o ponto vale na janela, depois de a página rolar até o alvo: rola antes de medir
const centro = async (page, seletor) => {
  await page.locator(seletor).first().scrollIntoViewIfNeeded();
  return page.locator(seletor).first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  });
};
const px = (v) => Number.parseFloat(v);

// A home nova não tem o botão do canal com ícone de play: o link "Vídeos do canal →" da Sessão 03 abre o círculo
// (sem mergulho). O mergulho continua definido no CSS e no script para um link com ícone (RF-VT-33).
const SEL_CANAL = '.hm-s03 a[href="/videos.html"]';
const linkDoCanal = (page) => page.locator(SEL_CANAL);

testDoGate(test, 'index', 'videos')('link "Vídeos do canal" da home: tipo imersao, origem no centro do link (CA-38)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  const [cx, cy] = await centro(page, SEL_CANAL);
  await linkDoCanal(page).click();
  await page.waitForURL(/\/videos/);
  await esperar(page, 2);
  const [saida, entrada] = await nomes(page);
  expect(saida.tipos).toEqual(['imersao']);
  expect(entrada.tipos).toEqual(['imersao']);
  expect(entrada.origem[2]).toBe('');
  expect(Math.abs(px(entrada.origem[0]) - cx)).toBeLessThanOrEqual(2);
  expect(Math.abs(px(entrada.origem[1]) - cy)).toBeLessThanOrEqual(2);
});

testDoGate(test, 'index', 'videos')('link Vídeos do cabeçalho: tipo imersao e origem no centro do link (CA-39)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await page.goto('/');
  const [cx, cy] = await centro(page, 'header.sh .sh-lista a[href="/videos.html"]');
  await page.locator('header.sh .sh-lista a[href="/videos.html"]').click();
  await page.waitForURL(/\/videos/);
  await esperar(page, 2);
  const [, entrada] = await nomes(page);
  expect(entrada.tipos).toEqual(['imersao']); // sem ícone de play: círculo, sem mergulho
  expect(entrada.origem[2]).toBe('');
  expect(Math.abs(px(entrada.origem[0]) - cx)).toBeLessThanOrEqual(2);
  expect(Math.abs(px(entrada.origem[1]) - cy)).toBeLessThanOrEqual(2);
});

testDoGate(test, 'index', 'videos')('teclado (Enter): a origem é o centro do link focado (CA-40)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  const [cx, cy] = await centro(page, SEL_CANAL);
  await linkDoCanal(page).focus();
  await page.keyboard.press('Enter');
  await page.waitForURL(/\/videos/);
  await esperar(page, 2);
  const [, entrada] = await nomes(page);
  expect(entrada.tipos).toEqual(['imersao']);
  expect(Math.abs(px(entrada.origem[0]) - cx)).toBeLessThanOrEqual(2);
  expect(Math.abs(px(entrada.origem[1]) - cy)).toBeLessThanOrEqual(2);
});

testDoGate(test, 'index', 'videos')('sem ponto guardado a página abre completa e sem origem inventada (CA-41)', async ({ page, browserName }) => {
  soChromium(browserName);
  // o ouvinte do teste roda antes do da página (init script) e apaga o ponto guardado
  await page.addInitScript(() => addEventListener('pagereveal', () => { try { sessionStorage.removeItem('vt-origem'); } catch (_) { /* sem storage */ } }));
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  await linkDoCanal(page).click();
  await page.waitForURL(/\/videos/);
  await esperar(page, 2);
  const [, entrada] = await nomes(page);
  expect(entrada.tipos).toEqual(['imersao']);
  expect(entrada.origem).toEqual(['', '', '']);
  await expect(page.locator('h1')).toHaveText('Assista, leia e confira as fontes');
});

testDoGate(test, 'index', 'videos')('com movimento reduzido a abertura não roda (CA-42)', async ({ page, browserName }) => {
  soChromium(browserName);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await registrarPagereveal(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  await linkDoCanal(page).click();
  await page.waitForURL(/\/videos/);
  await expect.poll(async () => (await log(page)).length).toBe(2);
  expect((await log(page)).some((e) => e.transicao)).toBe(false);
});

testDoGate(test, 'index', 'videos')('depois da abertura nada sobra, e o Voltar usa retorno comum (CA-43)', async ({ page, browserName }) => {
  soChromium(browserName);
  await registrarNomes(page);
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  await linkDoCanal(page).click();
  await page.waitForURL(/\/videos/);
  await esperar(page, 2);
  await page.waitForLoadState('load');
  await expect.poll(() => page.evaluate(() => [
    ...document.querySelectorAll('[style*="view-transition-name"]'),
  ].length + document.documentElement.style.getPropertyValue('--vt-x').length)).toBe(0);
  await page.goBack();
  await page.waitForURL((u) => u.pathname === '/');
  await esperar(page, 4);
  const [, , , voltaEntrada] = await nomes(page);
  expect(voltaEntrada.tipos).not.toContain('imersao');
});

testDoGate(test, 'index', 'videos')('passar o mouse no botão pré-busca /videos.html (CA-45)', async ({ page, browserName }) => {
  soChromium(browserName);
  const prebuscas = [];
  page.on('request', (r) => { if ((r.headers()['sec-purpose'] || '').includes('prefetch')) prebuscas.push(new URL(r.url()).pathname); });
  await semBanner(page);
  await page.goto('/');
  await irPara(page, '.hm-s03');
  await linkDoCanal(page).hover();
  await expect.poll(() => prebuscas.length, { timeout: 8000 }).toBeGreaterThan(0);
  expect(prebuscas).toContain('/videos.html');
});
