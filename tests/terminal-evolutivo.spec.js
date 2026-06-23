import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Suíte da página "Terminal Evolutivo" (scrollytelling híbrido HTML + WebGL).
// Spec: docs/specs/pages/terminal-evolutivo/. O WebGL é progressive enhancement;
// a página deve funcionar e ser acessível com ou sem ele, e sem JavaScript.

const PATH = '/terminal-evolutivo.html';

// rola até deixar o centro do elemento no centro do viewport (dispara o
// ScrollTrigger start:'top center')
async function scrollToCenter(page, sel) {
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    const r = el.getBoundingClientRect();
    const y = r.top + window.scrollY - window.innerHeight / 2 + el.offsetHeight / 2;
    window.scrollTo(0, Math.max(0, y));
  }, sel);
}

test.describe('Terminal Evolutivo — scrollytelling', () => {
  test('caminho feliz: carrega, título/SEO e hero', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Terminal Evolutivo/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Arquiteto');
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

  test('estrutura: 5 eras + marco do arquiteto + KPI final', async ({ page }) => {
    await page.goto(PATH);
    for (const id of ['#era1', '#era2', '#era3', '#era4', '#era5', '#marco']) {
      await expect(page.locator(id)).toHaveCount(1);
    }
    await expect(page.locator('.marco__quote')).toContainText('desenhar sistemas');
    await expect(page.locator('#kpi dl.kpi-grid div')).toHaveCount(6);
    await expect(page.locator('#kpi')).toContainText('20+ anos');
  });

  test('tema do foreground muda conforme rola (onEnter/onEnterBack)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    // topo: tema terminal
    await expect(page.locator('body')).toHaveClass(/theme-terminal/);
    // rola até a Nuvem (F4 · tema claro)
    await scrollToCenter(page, '#era4');
    await expect.poll(() => page.evaluate(() => document.body.className)).toContain('theme-cloud');
    // rola até a IA (F5)
    await scrollToCenter(page, '#era5');
    await expect.poll(() => page.evaluate(() => document.body.className)).toContain('theme-ai');
    // a timeline marca a era atual
    await expect(page.locator('.timeline a[aria-current="true"]')).toHaveCount(1);
  });

  test('casos STAR: acordeão <details> abre por teclado/clique', async ({ page }) => {
    await page.goto(PATH);
    const star = page.locator('#era4 .star > details', { hasText: 'Economia' });
    await expect(star).not.toHaveAttribute('open', /.*/);
    await star.locator('summary').click();
    await expect(star).toHaveAttribute('open', '');
    await expect(star).toContainText('R$3');
  });

  test('vídeo: facade injeta o iframe só ao clicar', async ({ page }) => {
    await page.goto(PATH);
    const box = page.locator('.video[data-video]');
    await box.scrollIntoViewIfNeeded();
    await expect(box.locator('iframe')).toHaveCount(0);
    await box.locator('button').click();
    await expect(box.locator('iframe')).toHaveCount(1);
    await expect(box.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com/);
  });

  test('eco-nav presente e a página está no catálogo', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('eco-nav')).toHaveCount(1);
    const res = await page.goto('/catalogo.html');
    expect(res?.status()).toBe(200);
    await expect(page.locator('a[href="./terminal-evolutivo.html"]')).toBeVisible();
  });

  test('render sob demanda: estabiliza em idle (quando há WebGL)', async ({ page }) => {
    await page.goto(PATH);
    await scrollToCenter(page, '#era3');
    const renders = () => page.evaluate(() => (typeof window.__teRenders === 'number' ? window.__teRenders : null));
    const first = await renders();
    test.skip(first === null, 'WebGL indisponível neste navegador — fallback CSS ativo');
    // espera o scrub do GSAP assentar (deixa de crescer)
    let prev = -1, cur = first;
    for (let i = 0; i < 10 && cur !== prev; i++) { prev = cur; await page.waitForTimeout(400); cur = await renders(); }
    // assentado → idle não deve renderizar novos frames
    const a = cur;
    await page.waitForTimeout(700);
    const b = await renders();
    expect(b).toBe(a);
  });

  test('a11y: skip link, h1 único e axe sem violações (tema escuro e claro)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expect(page.locator('a.skip')).toHaveAttribute('href', '#story');
    await expect(page.locator('h1')).toHaveCount(1);
    // tema terminal (topo)
    await expectNoSeriousA11yViolations(page);
    // tema claro (F4) é o de maior risco de contraste
    await scrollToCenter(page, '#era4');
    await expect.poll(() => page.evaluate(() => document.body.className)).toContain('theme-cloud');
    await expectNoSeriousA11yViolations(page);
  });

  test('degradado mobile: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

// Sem JavaScript: o conteúdo deve permanecer íntegro e legível (progressive enhancement).
test.describe('Terminal Evolutivo — sem JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('conteúdo e SEO intactos sem JS', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('html')).toHaveClass(/no-js/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#era1')).toContainText('Infância');
    await expect(page.locator('#era5')).toContainText('Maturidade');
    // STAR nativos funcionam sem JS (details/summary)
    await expect(page.locator('#era4 .star > details').first()).toBeVisible();
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('terminal-evolutivo');
  });
});
