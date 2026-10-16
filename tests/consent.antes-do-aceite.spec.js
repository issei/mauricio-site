// Consentimento: nenhum rastreador de análise pode gravar cookie nem carregar antes do aceite.
// Guia: https://developers.google.com/tag-platform/security/guides/consent (o padrão "negado" vem antes do GTM)
//       https://learn.microsoft.com/clarity/setup-and-installation/clarity-consent-api-v2
// Os domínios de terceiros são interceptados e abortados: o teste não depende da rede, só do que a página pede.
import { test, expect } from '@playwright/test';

const COOKIES_DE_ANALISE = /^(_ga|_gid|_gat|_clck|_clsk|_fbp|_gcl_)/;
const TERCEIROS = /googletagmanager\.com|google-analytics\.com|clarity\.ms/;
const CLARITY = /clarity\.ms/;

// Todas carregam o banner de cookies (cookie-consent.js); a 404 não rastreia (ID de analítica de mentira).
const PAGINAS = ['/index.html', '/curriculo.html', '/devin.html', '/vsl.html', '/agent-ready.html', '/catalogo.html', '/apresentacao.html'];
const SEM_BANNER = ['/404.html'];
// O Clarity só existe nestas duas.
const COM_CLARITY = ['/index.html', '/curriculo.html'];

async function abrir(page, url) {
  const pedidos = [];
  await page.route(TERCEIROS, (route) => {
    pedidos.push(route.request().url());
    return route.abort();
  });
  await page.goto(url);
  await page.waitForLoadState('load');
  return pedidos;
}

for (const url of [...PAGINAS, ...SEM_BANNER]) {
  test(`${url}: o padrão "negado" vem antes de qualquer tag e nenhum cookie nasce`, async ({ page, context }) => {
    const pedidos = await abrir(page, url);

    const ordem = await page.evaluate(() => {
      // gtag() empilha `arguments` (objeto tipo array); o GTM empilha objetos com `event`.
      const dl = (window.dataLayer || []).map((e) => (e && e.length !== undefined ? Array.from(e) : [e && e.event]));
      const padrao = dl.findIndex((e) => e[0] === 'consent' && e[1] === 'default');
      const primeiraTag = dl.findIndex((e) => e[0] === 'js' || e[0] === 'config' || e[0] === 'gtm.js');
      const cfg = padrao >= 0 ? dl[padrao][2] : null;
      return { padrao, primeiraTag, analytics: cfg && cfg.analytics_storage, ads: cfg && cfg.ad_storage };
    });
    expect(ordem.padrao, 'consent default ausente no dataLayer').toBeGreaterThanOrEqual(0);
    if (ordem.primeiraTag >= 0) expect(ordem.padrao).toBeLessThan(ordem.primeiraTag);
    expect(ordem.analytics).toBe('denied');
    expect(ordem.ads).toBe('denied');

    expect(pedidos.filter((u) => CLARITY.test(u)), 'Clarity carregou sem consentimento').toEqual([]);
    const gravados = (await context.cookies()).filter((c) => COOKIES_DE_ANALISE.test(c.name)).map((c) => c.name);
    expect(gravados, 'cookies de análise antes do aceite').toEqual([]);
  });
}

for (const url of COM_CLARITY) {
  test(`${url}: aceitar carrega o Clarity (e reaplica na visita seguinte); recusar não`, async ({ page, context }) => {
    let pedidos = await abrir(page, url);
    await page.getByRole('button', { name: 'Aceitar todos', exact: true }).click();
    await expect.poll(() => pedidos.filter((u) => CLARITY.test(u)).length).toBeGreaterThan(0);

    // A escolha fica gravada: na visita seguinte o consentimento volta inline e o banner não aparece.
    await page.unroute(TERCEIROS);
    pedidos = await abrir(page, url);
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toHaveCount(0);
    await expect.poll(() => pedidos.filter((u) => CLARITY.test(u)).length).toBeGreaterThan(0);

    // Recusar: nem na hora nem na visita seguinte o Clarity é pedido.
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.unroute(TERCEIROS);
    pedidos = await abrir(page, url);
    await page.getByRole('button', { name: 'Recusar todos', exact: true }).click();
    await page.unroute(TERCEIROS);
    pedidos = await abrir(page, url);
    expect(pedidos.filter((u) => CLARITY.test(u))).toEqual([]);
  });
}

for (const url of PAGINAS) {
  test(`${url}: o banner aparece e a escolha chega ao Consent Mode`, async ({ page }) => {
    await abrir(page, url);
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeVisible();
    await page.getByRole('button', { name: 'Aceitar todos', exact: true }).click();
    const depois = await page.evaluate(() => ({
      salvo: JSON.parse(localStorage.getItem('consent_v') || 'null'),
      update: (window.dataLayer || []).map((e) => Array.from(e.length === undefined ? [] : e)).find((e) => e[0] === 'consent' && e[1] === 'update'),
    }));
    expect(depois.salvo && depois.salvo.categories.analytics).toBe(true);
    expect(depois.update && depois.update[2].analytics_storage).toBe('granted');
  });
}
