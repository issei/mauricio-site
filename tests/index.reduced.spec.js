import { test, expect } from '@playwright/test';

// Home nova (SDD-nova-home §5.3, §14.8): com movimento reduzido, nenhuma animação e o mosaico editorial completo.
for (const [w, h] of [[1440, 900], [390, 844]]) {
  test(`movimento reduzido em ${w}×${h}: nenhuma animação, mosaico completo, sem rolagem lateral`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    await expect(page.locator('.hm-menu')).toBeHidden();
    await expect(page.locator('.hm-cena')).toHaveCount(4);
    for (const c of await page.locator('.hm-cena').all()) { await c.scrollIntoViewIfNeeded(); await expect(c).toBeVisible(); }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  });
}
