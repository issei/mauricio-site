import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';
import { PAGES } from '../scripts/seo/pages.mjs';

// Invariantes AEO/GEO para TODAS as páginas tratadas (fonte: scripts/seo/pages.mjs).
// Cresce automaticamente conforme novas páginas entram em pages.mjs.

for (const p of PAGES) {
  test.describe(`AEO · ${p.slug}`, () => {
    test('metadados + JSON-LD estruturado', async ({ page }) => {
      const res = await page.goto(`/${p.slug}.html`);
      expect(res?.status()).toBe(200);

      // H1 único
      await expect(page.locator('h1')).toHaveCount(1);

      // canonical aponta para a própria página, sem noindex
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
      expect(canonical).toContain(p.slug);
      const robots = await page.getAttribute('meta[name="robots"]', 'content');
      expect(robots || '').not.toMatch(/noindex/);

      // GA4, OG e Twitter
      expect(await page.locator('script[src*="googletagmanager.com/gtag"]').count()).toBeGreaterThan(0);
      expect(await page.getAttribute('meta[property="og:image"]', 'content')).toContain(`og-${p.slug}.png`);
      expect(await page.getAttribute('meta[name="twitter:card"]', 'content')).toBe('summary_large_image');

      // og:image resolve (200)
      const ogImg = await page.getAttribute('meta[property="og:image"]', 'content');
      const imgRes = await page.request.get(ogImg.replace('https://mauricio.issei.com.br', ''));
      expect(imgRes.status()).toBe(200);

      // JSON-LD parseável + contagens coerentes com pages.mjs
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks.length).toBeGreaterThan(0);
      const graph = JSON.parse(blocks[0])['@graph'];
      expect(Array.isArray(graph)).toBe(true);
      const find = (t) => graph.find((n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]).includes(t));
      expect(find('WebSite')).toBeTruthy();
      expect(find('BreadcrumbList')).toBeTruthy();
      if (p.faq?.length) expect(find('FAQPage').mainEntity.length).toBe(p.faq.length);
      if (p.terms?.length) expect(find('DefinedTermSet').hasDefinedTerm.length).toBe(p.terms.length);
    });

    if (p.tldr || p.faq) {
      test('bloco visível "Em síntese/FAQ" acessível', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(`/${p.slug}.html`);
        await expect(page.locator('.aeo').first()).toBeVisible();
        if (p.tldr) await expect(page.locator('.aeo-tldr__title')).toBeVisible();
        if (p.faq?.length) {
          await expect(page.locator('.aeo-faq__item')).toHaveCount(p.faq.length);
        }
        // axe restrito ao bloco injetado (não audita dívida a11y legada da página)
        await expectNoSeriousA11yViolations(page, '.aeo');
      });
    }
  });
}
