import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// Elementos visuais da home — docs/specs/elementos-visuais/SDD-elementos-visuais.md (§7).
// Classificação de acessibilidade confirmada pelo Issei (D-EV-2): retrato
// informativo; capas e ícones decorativos.

const RETRATO_ALT = 'Maurício Yokoyama Issei sorrindo, de óculos, blazer azul e camiseta preta, sobre fundo escuro.';

for (const path of ['/', '/curriculo.html']) {
  test(`RF-EV-01/03 ${path}: retrato em <picture> AVIF+WebP, dimensões, alt e prioridade; depois do h1 no DOM`, async ({ page }) => {
    await page.goto(path);
    const fig = page.locator('.pf-hero .pf-hero-retrato');
    await expect(fig).toHaveCount(1);
    await expect(fig.locator('source[type="image/avif"]')).toHaveCount(1);
    await expect(fig.locator('source[type="image/webp"]')).toHaveCount(1);
    const img = fig.locator('img');
    await expect(img).toHaveAttribute('width', '480');
    await expect(img).toHaveAttribute('height', '600');
    await expect(img).toHaveAttribute('alt', RETRATO_ALT);
    await expect(img).toHaveAttribute('fetchpriority', 'high');
    // Um único fetchpriority="high" na página.
    await expect(page.locator('[fetchpriority="high"]')).toHaveCount(1);
    // O nome vem antes da imagem na ordem do documento.
    const nomeAntes = await page.evaluate(() => {
      const h1 = document.querySelector('#pf-nome');
      const im = document.querySelector('.pf-hero-retrato');
      return !!(h1.compareDocumentPosition(im) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(nomeAntes).toBe(true);
    // A imagem carrega (servida pelo próprio site, R-IMG-08).
    await expect.poll(() => img.evaluate((i) => i.complete && i.naturalWidth > 0)).toBe(true);
    expect(new URL(await img.evaluate((i) => i.currentSrc)).host).toBe(new URL(page.url()).host);
  });
}

test('RF-EV-02: retrato à direita no desktop e avatar redondo acima do sobretítulo no celular', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const fig = page.locator('.pf-hero-retrato');
  const texto = page.locator('.pf-hero-texto');
  const [f, t] = [await fig.boundingBox(), await texto.boundingBox()];
  expect(f.x).toBeGreaterThan(t.x + t.width - 1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const f2 = await fig.boundingBox();
  const eyebrow = await page.locator('.pf-hero .pf-eyebrow').boundingBox();
  expect(f2.y + f2.height).toBeLessThanOrEqual(eyebrow.y + 1);
  expect(Math.round(f2.width)).toBe(96);
  expect(await fig.locator('img').evaluate((i) => getComputedStyle(i).borderRadius)).toBe('50%');
});

test('RF-EV-04: capa decorativa e lazy em cada destaque; um único link por cartão', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.pf-destaque');
  const n = await cards.count();
  expect(n).toBeGreaterThanOrEqual(3);
  for (let i = 0; i < n; i++) {
    const card = cards.nth(i);
    const img = card.locator('img.pf-destaque-capa');
    await expect(img).toHaveAttribute('alt', '');
    await expect(img).toHaveAttribute('loading', 'lazy');
    await expect(img).toHaveAttribute('width', '640');
    await expect(img).toHaveAttribute('height', '336');
    await expect(card.locator('a')).toHaveCount(1);
  }
});

test('RF-EV-05: cada tema tem ícone SVG decorativo dentro do link', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('.pf-temas li > a');
  const n = await links.count();
  expect(n).toBe(10);
  for (let i = 0; i < n; i++) {
    const svg = links.nth(i).locator('svg');
    await expect(svg).toHaveCount(1);
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
  }
});

test('RF-EV-06: Sobre é só texto, sem diagrama (D-EV-5)', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#about .pf-about p').first()).toBeVisible();
  await expect(page.locator('#about svg, #about img, #about figure')).toHaveCount(0);
});

test('RF-EV-07: JSON-LD Person da home tem image', async ({ page }) => {
  await page.goto('/');
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent())['@graph'];
  const person = graph.find((n) => n['@type'] === 'Person');
  expect(person.image).toBe('https://mauricio.issei.com.br/img/retrato-960.webp');
});

test('RF-EV-08: og-index.png tem 1200 × 630', () => {
  const png = readFileSync(new URL('../public/og-index.png', import.meta.url));
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
});

test('RF-EV-09: badge decorativo e lazy nas certificações com badge', async ({ page }) => {
  const { lerBadges } = await import('../scripts/home/badges.mjs');
  const esperados = lerBadges(new URL('..', import.meta.url).pathname).length;
  await page.goto('/curriculo.html');
  const badges = page.locator('.pf-ticket--badge .pf-ticket-badge');
  // Cada badge aparece uma vez na lista completa e, se for destaque, também no topo.
  expect(await page.locator('.pf-certs .pf-ticket-badge').count()).toBe(esperados);
  const n = await badges.count();
  for (let i = 0; i < n; i++) {
    const b = badges.nth(i);
    await expect(b.locator('source[type="image/avif"]')).toHaveCount(1);
    const img = b.locator('img');
    await expect(img).toHaveAttribute('alt', '');
    await expect(img).toHaveAttribute('loading', 'lazy');
    await expect(img).toHaveAttribute('width', '72');
  }
  // Bilhete sem badge não tem imagem.
  await expect(page.locator('.pf-ticket:not(.pf-ticket--badge) img')).toHaveCount(0);
});
