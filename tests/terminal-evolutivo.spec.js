import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Suíte da página "Terminal Evolutivo" v4 — "Laca e Folha" (scrollytelling de CENAS).
// Direção: docs/specs/pages/terminal-evolutivo/02_BRIEF_conceitual_shokunin_kintsugi_bambu.md
// Princípio "cena primeiro, nome depois": a página mostra cenas vividas; os nomes
// (Shokunin · Kintsugi · Bambu) só aparecem na CODA, opcionais — nunca rotulam seções.
// Progressive enhancement: funciona e é acessível com ou sem JavaScript, e sob reduce-motion.

const PATH = '/terminal-evolutivo.html';

test.describe('Terminal Evolutivo — Laca e Folha', () => {
  test('caminho feliz: carrega, título/SEO e hero (1982)', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Terminal Evolutivo/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('1982');
  });

  test('SEO/AEO: canonical própria, sem noindex, og resolve', async ({ page }) => {
    await page.goto(PATH);
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('terminal-evolutivo');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots || '').not.toMatch(/noindex/);
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-terminal-evolutivo.png');
    const imgRes = await page.request.get(og.replace('https://mauricio.issei.com.br', ''));
    expect(imgRes.status()).toBe(200);
  });

  test('estrutura de cenas: ofício, fundação, gêmeos, vale, rede, final aberto', async ({ page }) => {
    await page.goto(PATH);
    const main = page.locator('main');
    await expect(main).toContainText('escutar');         // o ofício (Shokunin, sem nomear)
    await expect(main).toContainText('perdi meu pai');   // a primeira fratura (2004)
    await expect(main).toContainText('casamento');       // a fundação
    await expect(main).toContainText('ctrl');            // a casa cheia (gêmeos)
    await expect(main).toContainText('pedi ajuda');      // o vale (Kintsugi)
    await expect(main).toContainText('rede divide');     // a rede (bambuzal)
    await expect(main).toContainText('CONTINUA');        // final aberto (o bambu continua)
  });

  test('cena primeiro, nome depois: os três nomes só aparecem na coda', async ({ page }) => {
    await page.goto(PATH);
    // antes da coda, nenhuma menção aos nomes japoneses (descobrir, não rotular)
    const preCoda = (await page.locator('main > section:not(.coda)').allInnerTexts()).join(' ');
    expect(preCoda).not.toMatch(/Shokunin|Kintsugi|Bambu/);
    // a chave é entregue só no fim, opcional
    const coda = page.locator('section.coda');
    await expect(coda).toContainText('Shokunin');
    await expect(coda).toContainText('Kintsugi');
    await expect(coda).toContainText('職人');
    await expect(coda).toContainText('金継ぎ');
    await expect(coda).toContainText('竹');
    await expect(coda).toContainText('Primeiro veio a vida');
  });

  test('o vale (Kintsugi): silêncio de 2017 + careca sem filtro; família é o finale', async ({ page }) => {
    await page.goto(PATH);
    const vale = page.locator('section.vale');
    await expect(vale).toContainText('2017');
    const careca = vale.locator('img[src="/fotos/careca.jpeg"]');
    await expect(careca).toHaveCount(1);
    await expect(careca).toHaveAttribute('alt', /alopecia, 2017/);
    // a família (2026) é a última figura da narrativa
    await expect(page.locator('main img[src="/fotos/familia.jpeg"]')).toHaveCount(1);
  });

  test('gêmeos: foto com alt humano (Ctrl+C / Ctrl+V)', async ({ page }) => {
    await page.goto(PATH);
    const gemeos = page.locator('img[src="/fotos/gemeos.jpeg"]');
    await expect(gemeos).toHaveCount(1);
    await expect(gemeos).toHaveAttribute('alt', /Ctrl\+C e Ctrl\+V/);
  });

  test('reveal: elementos data-reveal ficam visíveis ao rolar (com JS)', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('html')).toHaveAttribute('data-js', '1');
    const h = page.locator('#b2-title');
    await h.scrollIntoViewIfNeeded();
    await expect.poll(() => h.evaluate((el) => el.getAttribute('data-inview'))).toBe('1');
    await expect.poll(() => h.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('a11y: skip link, h1 único e axe sem violações (hero e coda)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expect(page.locator('a.skip')).toHaveAttribute('href', '#conteudo');
    await expect(page.locator('h1')).toHaveCount(1);
    // hero
    await expectNoSeriousA11yViolations(page);
    // a coda tem fundo sólido — onde mora o texto mono de menor contraste
    await page.locator('section.coda').scrollIntoViewIfNeeded();
    await expectNoSeriousA11yViolations(page);
  });

  test('degradado mobile: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('ecossistema: footer cruza para currículo e catálogo; catálogo aponta de volta', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('footer a[href="/index.html"]')).toHaveCount(1);
    await expect(page.locator('footer a[href="/catalogo.html"]')).toHaveCount(1);
    const res = await page.goto('/catalogo.html');
    expect(res?.status()).toBe(200);
    await expect(page.locator('a[href="./terminal-evolutivo.html"]')).toBeVisible();
  });
});

// Sem JavaScript: o conteúdo deve permanecer íntegro e legível (progressive enhancement).
test.describe('Terminal Evolutivo — sem JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('conteúdo e SEO intactos sem JS; reveal não esconde nada', async ({ page }) => {
    await page.goto(PATH);
    // sem JS, o setter de data-js não roda → o reveal não é "armado"
    await expect(page.locator('html')).not.toHaveAttribute('data-js', '1');
    await expect(page.locator('h1')).toHaveCount(1);
    const main = page.locator('main');
    await expect(main).toContainText('1982');
    await expect(main).toContainText('pedi ajuda');
    await expect(main).toContainText('CONTINUA');
    // um elemento data-reveal permanece visível sem JS (opacity 1, não 0)
    const r = page.locator('[data-reveal]').first();
    await expect.poll(() => r.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('terminal-evolutivo');
  });
});
