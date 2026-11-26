import { test, expect } from '@playwright/test';

// Home nova no celular (SDD-nova-home §14.8, D-H12): sem rolagem lateral; menu "Sessões" no topo; o nome fica no topo da S01.
test.use({ viewport: { width: 390, height: 844 } });

test('celular: sem rolagem lateral, menu no topo e o nome fixo no topo da S01', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'a camada de movimento depende de animation-timeline');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  // no meio da S01: a cena 03 está no palco
  await page.evaluate(() => scrollTo(0, (document.querySelector('.hm-s01').offsetHeight - innerHeight * 1.3) * 0.5));
  await page.waitForTimeout(300);
  const menu = await page.locator('.hm-menu').boundingBox();
  expect(menu.y).toBe(0);
  expect(await page.locator('.hm-menu').evaluate((e) => +getComputedStyle(e).opacity)).toBeGreaterThan(0.9);
  const nome = page.locator('#hm-nome');
  const caixa = await nome.boundingBox();
  expect(caixa.y).toBeLessThan(200);
  expect(await nome.evaluate((e) => { let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; })).toBeGreaterThan(0.9);
  // o nome não fica dourado nem aparece junto com o nome do cabeçalho
  expect(await nome.evaluate((e) => getComputedStyle(e).color)).not.toBe('rgb(212, 175, 106)');
  expect((await page.locator('header.sh').boundingBox()).y + 56).toBeLessThanOrEqual(1);
});
