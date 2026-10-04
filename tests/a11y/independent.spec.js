// Fase 7 — regressões dos achados da verificação independente (docs/specs/a11y-first/verificacao-independente-fase7.md).
// Cada caso reproduz o que um auditor em contexto novo achou e a suíte do autor não: o autor testava o que
// tinha consertado, o auditor testou o que o visitante faz (Tab com o banner de cookies na tela, skip link
// numa página com scroll suave, menu no celular, página em inglês lida por leitor de tela).
import { test, expect } from '@playwright/test';

const COM_CONSENTIMENTO = { v: '2.0', ts: 'x', categories: { necessary: true }, method: 'explicit' };
const semBanner = (page) => page.addInitScript((c) => localStorage.setItem('consent_v', JSON.stringify(c)), COM_CONSENTIMENTO);

/* 1 — o banner fixo não cobre nenhuma parada de Tab (2.4.11) */
for (const pagina of ['index', 'curriculo']) {
  test(`${pagina}: com o banner de cookies na tela, nenhuma parada de Tab fica atrás dele`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`/${pagina}.html`);
    await expect(page.locator('.cc-banner')).toBeVisible();
    const cobertos = [];
    for (let i = 0; i < 200; i++) {
      await page.keyboard.press('Tab');
      // rolagem suave: mede só quando a página parou de rolar
      await page.evaluate(() => new Promise((ok) => { let y = -1, n = 0; const t = () => { n = scrollY === y ? n + 1 : 0; y = scrollY; n >= 3 ? ok() : requestAnimationFrame(t); }; t(); }));
      const r = await page.evaluate(() => {
        let a = document.activeElement;
        if (!a || a === document.body) return null;
        while (a.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
        if (a.closest('.cc-banner') || a.closest('eco-nav') || a.tagName === 'ECO-NAV') return { fim: true };
        const b = a.getBoundingClientRect();
        const topo = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
        return { coberto: !!topo?.closest('.cc-banner'), nome: `${a.tagName}.${String(a.className).slice(0, 25)}` };
      });
      if (r?.fim) break;
      if (r?.coberto) cobertos.push(r.nome);
    }
    expect(cobertos, 'paradas de Tab sob .cc-banner').toEqual([]);
  });
}

test('recusar pelo teclado devolve o foco ao botão de preferências, não ao <body>', async ({ page }) => {
  await page.goto('/index.html');
  const recusar = page.getByRole('button', { name: 'Recusar todos', exact: true });
  await recusar.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.cc-banner')).toHaveCount(0);
  await expect(page.locator('.cc-fab')).toBeFocused();
});

/* 2 — skip link funciona onde há scroll suave (2.4.1) */
test('engenharia-agentes-ia: o skip link leva o foco ao conteúdo e o próximo Tab segue de lá', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Safari não tabula links');
  await semBanner(page);
  await page.goto('/engenharia-agentes-ia.html');
  await page.keyboard.press('Tab');
  await expect(page.locator('.eai-skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#conteudo');
  await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('#conteudo'))).toBe(true);
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#conteudo')), 'o Tab seguinte ficou dentro do <main>').toBe(true);
});

/* 3 — menus do celular têm nome e estado (4.1.2) */
for (const pagina of ['salesforce-agentic-dev', 'salesforce-agentic-quickstart', 'proposta-observabilidade-mobile']) {
  test(`${pagina} (375px): o botão de menu tem nome e aria-expanded`, async ({ page }) => {
    await semBanner(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/${pagina}.html`);
    const botao = page.getByRole('button', { name: 'Abrir menu' });
    await expect(botao).toBeVisible();
    await expect(botao).toHaveAttribute('aria-expanded', 'false');
    await botao.click();
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
  });
}

/* 4 — idioma das partes em página inglesa (3.1.2) */
test('en/index: banner de cookies e eco-nav em português são marcados lang="pt-BR"', async ({ page }) => {
  await page.goto('/en/index.html');
  await expect(page.locator('.cc-banner')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('.cc-fab')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('eco-nav')).toHaveAttribute('lang', 'pt-BR');
});

test('index (pt): o banner não leva lang redundante', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.locator('.cc-banner')).not.toHaveAttribute('lang', /.+/);
});

/* 5 — conteúdo revelado só por hover ganha foco (2.4.7) */
test('devin: o e-mail do encerramento fica visível quando recebe foco', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Safari não tabula links');
  await semBanner(page);
  await page.goto('/devin.html');
  const cta = page.locator('.ep09-encerramento__cta');
  await cta.focus();
  await page.keyboard.press('Shift+Tab'); // foco-visível só vem de teclado
  await page.keyboard.press('Tab');
  await expect.poll(() => cta.evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
});

/* 6 — painel fechado não fica na ordem de Tab (2.4.3) */
test('OCC: o painel de evidências fechado é inert; aberto, não', async ({ page }) => {
  await semBanner(page);
  await page.goto('/operacao-capital-cognitivo.html');
  const painel = page.locator('#evidence-panel');
  await expect(painel).toHaveJSProperty('inert', true);
  await page.evaluate(() => import('/js/operacao-capital-cognitivo/evidence-ui.js').then((m) => m.openEvidencePanel()));
  await expect(painel).toHaveJSProperty('inert', false);
});

/* 7 — movimento reduzido para o canvas (2.2.2/2.3.3) */
test('proposta-engenharia-reversa: sob movimento reduzido o hero não roda laço de animação', async ({ page }) => {
  await semBanner(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    window.__raf = 0;
    const o = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => { window.__raf++; return o(cb); };
  });
  await page.goto('/proposta-engenharia-reversa.html');
  await page.waitForTimeout(1500);
  const a = await page.evaluate(() => window.__raf);
  await page.waitForTimeout(1000);
  const b = await page.evaluate(() => window.__raf);
  expect(b - a, 'chamadas de requestAnimationFrame em 1 s').toBeLessThan(5);
});

/* 8 — iframes têm título (4.1.2) */
test('proposta-observabilidade-mobile: o vídeo incorporado tem title', async ({ page }) => {
  await semBanner(page);
  await page.goto('/proposta-observabilidade-mobile.html');
  const sem = await page.evaluate(() => [...document.querySelectorAll('iframe')].filter((f) => !f.title?.trim()).map((f) => f.src));
  expect(sem).toEqual([]);
});

/* 10 — alvo mínimo (2.5.8) */
test('engenharia-agentes-ia: os links de capítulo têm no mínimo 24px de altura', async ({ page }) => {
  await semBanner(page);
  await page.goto('/engenharia-agentes-ia.html');
  const baixos = await page.evaluate(() => [...document.querySelectorAll('a.eai-chap__link')]
    .filter((a) => a.getBoundingClientRect().width > 0 && a.getBoundingClientRect().height < 24)
    .map((a) => a.textContent.trim().slice(0, 30)));
  expect(baixos).toEqual([]);
});
