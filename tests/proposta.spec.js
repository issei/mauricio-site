// Proposta executiva não listada (spec: docs/specs/pages/evolucao-inteligencia-comercial.md §6).
import { test, expect } from '@playwright/test';

test.describe('/proposta', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/proposta.html');
  });

  test('carrega com H1 único e 7 seções em ordem', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    const ids = await page.locator('main > section').evaluateAll((s) => s.map((e) => e.id));
    expect(ids).toEqual(['problema', 'esforco', 'proposta', 'etapas', 'valor', 'principios', 'proximo-passo']);
  });

  test('não é listada: noindex, canonical próprio, sem hreflang, sem JSON-LD', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mauricio.issei.com.br/proposta');
    await expect(page.locator('link[hreflang]')).toHaveCount(0);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  });

  test('sem botão nem link de contato e sem nome do autor no cabeçalho', async ({ page }) => {
    await expect(page.locator('main a[href], main button')).toHaveCount(0);
    await expect(page.locator('header')).not.toContainText('Maurício');
    await expect(page.locator('footer')).toContainText('Maurício Yokoyama Issei');
  });

  test('sem rolagem horizontal no celular', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
