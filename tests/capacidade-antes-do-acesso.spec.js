import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "Capacidade Antes do Acesso".
 *
 * O que ela protege, além do smoke: o artigo é uma revisão crítica cuja tese é
 * justamente a calibragem entre o que a evidência sustenta e o que ela não
 * sustenta. Uma página que perdesse os selos de força de evidência, ou a
 * distinção entre os dois domínios etários, afirmaria mais do que o texto
 * sustenta — que é o erro que o próprio artigo denuncia.
 */

const PATH = '/capacidade-antes-do-acesso.html';

test.describe('Capacidade Antes do Acesso — página', () => {
  test('carrega, título/SEO e hero visíveis', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/Capacidade Antes do Acesso/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('medeia');
    await expect(page.locator('.ca-hero__thesis')).toContainText('mediação pedagógica');
  });

  test('SEO: um único H1, canonical e og:image da própria página', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('capacidade-antes-do-acesso');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-capacidade-antes-do-acesso.png');
  });

  test('os dois domínios etários estão separados, não fundidos', async ({ page }) => {
    await page.goto(PATH);
    const dominios = page.locator('#dominios');
    await expect(dominios).toContainText('0–6 anos');
    await expect(dominios).toContainText('6–13 anos');
    // A separação é a correção metodológica central: precisa estar explícita.
    await expect(dominios).toContainText('não é uma política de ECEC');
  });

  test('as quatro camadas da competência adulta existem como conteúdo', async ({ page }) => {
    await page.goto(PATH);
    for (const id of ['capacidade', 'julgamento', 'mediacao', 'governanca']) {
      await expect(page.locator(`#camada-${id} h3`)).toHaveCount(1);
    }
  });

  test('honestidade epistêmica: as três proposições com seus selos', async ({ page }) => {
    await page.goto(PATH);
    const veredito = page.locator('#veredito');
    await expect(veredito.locator('.ca-selo--limitada')).toHaveCount(1);      // P1
    await expect(veredito.locator('.ca-selo--naosustentada')).toHaveCount(1); // P2
    await expect(veredito.locator('.ca-selo--forte')).toHaveCount(1);         // P3
    await expect(veredito).toContainText('não permite sustentar a suficiência');
  });

  test('o caso norueguês é apresentado como desenho, não eficácia, de política', async ({ page }) => {
    await page.goto(PATH);
    const noruega = page.locator('#noruega');
    await expect(noruega).toContainText('policy design');
    await expect(noruega).toContainText('não');
    await expect(noruega).toContainText('policy effectiveness');
    await expect(noruega.locator('.ca-table tbody tr')).toHaveCount(4);
  });

  test('a11y: axe sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });

  test('mobile: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
