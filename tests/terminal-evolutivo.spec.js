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
    await expect(page.locator('.marco__quote')).toContainText('Desenhar sistemas');
    await expect(page.locator('#kpi dl.kpi-grid div')).toHaveCount(6);
    await expect(page.locator('#kpi')).toContainText('20+ anos');
  });

  test('tema do foreground muda conforme rola (onEnter/onEnterBack)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    // topo: tema terminal
    await expect(page.locator('body')).toHaveClass(/theme-terminal/);
    // rola até a Nuvem (F4 · dark premium)
    await scrollToCenter(page, '#era4');
    await expect.poll(() => page.evaluate(() => document.body.className)).toContain('theme-cloud');
    // rola até a IA (F5)
    await scrollToCenter(page, '#era5');
    await expect.poll(() => page.evaluate(() => document.body.className)).toContain('theme-ai');
    // a timeline marca a era atual
    await expect(page.locator('.timeline a[aria-current="true"]')).toHaveCount(1);
  });

  test('trabalho como background: casos STAR colapsados + link ao currículo', async ({ page }) => {
    await page.goto(PATH);
    // não há card "hero" inline; o trabalho é evidência de apoio
    await expect(page.locator('.star--hero')).toHaveCount(0);
    // o caso âncora (−R$3MM, 2020/Rede) é acordeão colapsado na F5 — cronologicamente correto
    const eco = page.locator('#era5 .star > details', { hasText: 'Economia' });
    await expect(eco).not.toHaveAttribute('open', /.*/);
    await eco.locator('summary').scrollIntoViewIfNeeded();
    await eco.locator('summary').click();
    await expect(eco).toHaveAttribute('open', '');
    await expect(eco).toContainText('R$3');
    // a F4 tem a ponte ao currículo + o marco da era (107h na Indra, 2012)
    await expect(page.locator('#era4 .bridge')).toContainText('currículo');
    await expect(page.locator('#era4 a[href="/index.html"]')).not.toHaveCount(0);
    await expect(page.locator('#era4 .star > details', { hasText: 'Indra' })).toHaveCount(1);
  });

  test('F5: foco em IA + resultados recentes como acordeão (não destaque)', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#era5')).toContainText('IA Agêntica');
    const pipe = page.locator('#era5 .star > details', { hasText: 'Pipe Automática' });
    await expect(pipe).toHaveCount(1);
    await expect(pipe).not.toHaveAttribute('open', /.*/);
  });

  test('narrativa madura: sem anime nas fases adultas; trincheira e fatos de vida', async ({ page }) => {
    await page.goto(PATH);
    const adult = (await page.locator('#era3, #era4, #era5').allInnerTexts()).join(' ');
    expect(adult).not.toMatch(/Naruto|One Piece|Bleach|Dragon Ball|Zillion/);
    await expect(page.locator('#era3')).toContainText('Sysgen');
    await expect(page.locator('#era3')).toContainText('2003');
    await expect(page.locator('#era3')).toContainText('meu pai');
    await expect(page.locator('#era5')).toContainText('alopecia');
    await expect(page.locator('#era5')).toContainText('Serasa');
    await expect(page.locator('#marco')).toContainText('anos 2000');
  });

  test('cronologia: data-era calibrado e timeline consistente', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#era4')).toHaveAttribute('data-era', '2010-2015');
    await expect(page.locator('#era5')).toHaveAttribute('data-era', '2016-2026');
    await expect(page.locator('#marco')).toHaveAttribute('data-era', '2016-2026');
    await expect(page.locator('.timeline a[data-jump="2010-2015"]')).toHaveCount(1);
    await expect(page.locator('.timeline a[data-jump="2016-2026"]')).toHaveCount(1);
  });

  test('fotos com legenda humana (sem prefixo de log) + gêmeos na F5', async ({ page }) => {
    await page.goto(PATH);
    // ideia v3 §VI: legendas e alt humanos, sem prefixo decorativo [SYS_RECORD]
    await expect(page.locator('.img-meta')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('SYS_RECORD');
    const gemeos = page.locator('#era5 img[src="/fotos/gemeos.jpeg"]');
    await expect(gemeos).toHaveCount(1);
    await expect(gemeos).toHaveAttribute('alt', /Ctrl\+C e Ctrl\+V/);
    await expect(page.locator('#era4 img[src="/fotos/gemeos.jpeg"]')).toHaveCount(0);
  });

  test('v3: ambiente CSS (sem WebGL) + beats de silêncio, careca e finale', async ({ page }) => {
    await page.goto(PATH);
    // sem canvas WebGL; o ambiente decorativo é uma <div> aria-hidden
    await expect(page.locator('#bg-webgl')).toHaveCount(0);
    await expect(page.locator('#ambient')).toHaveCount(1);
    await expect(page.locator('#ambient')).toHaveAttribute('aria-hidden', 'true');
    // Silêncio Absoluto de Abril/2004 (perda do pai)
    const silence = page.locator('.silence');
    await expect(silence).toHaveCount(1);
    await expect(silence).toContainText('2004');
    // careca = beat de 2017 (com dignidade), na F5 — não mais "hoje/mentor"
    const careca = page.locator('#era5 img[src="/fotos/careca.jpeg"]');
    await expect(careca).toHaveCount(1);
    await expect(careca).toHaveAttribute('alt', /alopecia, 2017/);
    // a família (2025) é a última figura da narrativa (imagem-finale)
    await expect(page.locator('main figure').last().locator('img'))
      .toHaveAttribute('src', '/fotos/familia.jpeg');
  });

  test('fechamento e vídeo: KPI isolado + vídeo como CTA de saída no fim', async ({ page }) => {
    await page.goto(PATH);
    // KPI vive numa seção de fechamento própria (não mais dentro da F5)
    await expect(page.locator('section.closing#kpi dl.kpi-grid div')).toHaveCount(6);
    await expect(page.locator('#era5 .video')).toHaveCount(0);
    // vídeo é a última seção antes do footer (CTA de saída)
    await expect(page.locator('main .outro .video[data-video]')).toHaveCount(1);
  });

  test('theme-color (barra móvel) acompanha a fase', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await scrollToCenter(page, '#era4');
    await expect.poll(() => page.getAttribute('meta[name="theme-color"]', 'content')).toBe('#0e141d');
    await scrollToCenter(page, '#era5');
    await expect.poll(() => page.getAttribute('meta[name="theme-color"]', 'content')).toBe('#080a10');
  });

  test('reveal: passagens ficam visíveis ao rolar (com JS)', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('html')).toHaveClass(/reveal-ready/);
    await scrollToCenter(page, '#era1');
    const p = page.locator('#era1 .passage').first();
    await expect.poll(() => p.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
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
    // sem JS, o reveal não é "armado" → passagens visíveis por padrão
    await expect(page.locator('html')).not.toHaveClass(/reveal-ready/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#era1')).toContainText('Infância');
    await expect(page.locator('#era5')).toContainText('Maturidade');
    // STAR nativos funcionam sem JS (details/summary)
    await expect(page.locator('#era4 .star > details').first()).toBeVisible();
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('terminal-evolutivo');
  });
});
