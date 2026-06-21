import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Smoke do componente global <eco-nav> (Fase 3 da SPEC_ECOSYSTEM).
// Playwright pierce open shadow DOM por padrão, então seletores CSS alcançam o
// conteúdo do shadow root.

test('eco-nav: monta, abre, pré-expande o pilar da página e marca a página atual', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/devin.html'); // devin ∈ P1 (Fundação)

  const host = page.locator('eco-nav');
  await expect(host).toHaveCount(1);

  // L0: launcher visível com a pílula do pilar atual (Mentalidade)
  const fab = host.locator('.fab');
  await expect(fab).toBeVisible();
  await expect(fab.locator('.fab__pill')).toHaveText('Mentalidade');

  // painel fechado por padrão
  const panel = host.locator('.panel');
  await expect(panel).toBeHidden();

  // abrir
  await fab.click();
  await expect(panel).toBeVisible();
  await expect(fab).toHaveAttribute('aria-expanded', 'true');

  // pilar da página (P1) vem pré-expandido; os demais colapsados
  const heads = host.locator('.acc__head');
  await expect(heads).toHaveCount(5);
  await expect(heads.nth(0)).toHaveAttribute('aria-expanded', 'true');
  await expect(heads.nth(1)).toHaveAttribute('aria-expanded', 'false');

  // a página atual está marcada e aponta para devin.html
  const current = host.locator('.node[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAttribute('href', /devin\.html$/);

  // crosslink relevante do pilar (devin → quickstart) é exposto no L2
  await expect(host.locator('.xl a', { hasText: 'Quick Start' })).toHaveCount(1);
});

test('eco-nav: acordeão abre só um por vez e Esc fecha', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/sustentacao.html'); // ∈ P4

  const host = page.locator('eco-nav');
  await host.locator('.fab').click();
  const heads = host.locator('.acc__head');

  // P4 pré-expandido (índice 3)
  await expect(heads.nth(3)).toHaveAttribute('aria-expanded', 'true');

  // abrir P1 fecha P4 (um por vez)
  await heads.nth(0).click();
  await expect(heads.nth(0)).toHaveAttribute('aria-expanded', 'true');
  await expect(heads.nth(3)).toHaveAttribute('aria-expanded', 'false');

  // Esc fecha o painel
  await page.keyboard.press('Escape');
  await expect(host.locator('.panel')).toBeHidden();
});

test('eco-nav: sem violações de acessibilidade serious/critical com o painel aberto', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  // engenharia-confianca é uma página axe-limpa; escopamos a auditoria ao próprio
  // componente (`eco-nav`) para verificar que ele não introduz violações,
  // independentemente de dívida de contraste pré-existente da página hospedeira.
  await page.goto('/engenharia-confianca.html');
  await page.locator('eco-nav .fab').click();
  await expect(page.locator('eco-nav .panel')).toBeVisible();
  await expectNoSeriousA11yViolations(page, 'eco-nav');
});
