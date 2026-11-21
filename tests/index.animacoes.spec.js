import { test, expect } from '@playwright/test';

// Animações de entrada da home — docs/specs/pages/portfolio/SDD-animacoes-entrada.md
// Efeitos fadeInUp/fadeInLeft do Animate.css, ligados à rolagem (animation-timeline: view()).

const PATH = '/';
const ALVOS = {
  destaque: '#destaques .pf-destaque',
  prova: '#provas .pf-provas li',
  tema: '#temas .pf-temas li',
  titulo: '#temas .pf-h2',
};

const nomes = (page) =>
  page.evaluate((alvos) => {
    const out = {};
    for (const [k, sel] of Object.entries(alvos)) out[k] = getComputedStyle(document.querySelector(sel)).animationName;
    return out;
  }, ALVOS);

test.describe('Home: entrada ao rolar (SDD-animacoes-entrada)', () => {
  test('CA-1: com movimento liberado, cartões e provas usam os efeitos do Animate.css', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(PATH);
    const suporta = await page.evaluate(() => CSS.supports('animation-timeline: view()'));
    test.skip(!suporta, 'navegador sem animation-timeline: a página fica estática (regra 3 da spec)');
    expect(await nomes(page)).toEqual({
      destaque: 'pf-fade-in-up',
      prova: 'pf-fade-in-left',
      tema: 'pf-fade-in-up',
      titulo: 'pf-fade-in-up',
    });
  });

  test('CA-2: com movimento reduzido, nada anima', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    expect(await nomes(page)).toEqual({ destaque: 'none', prova: 'none', tema: 'none', titulo: 'none' });
  });

  test('CA-3: depois de rolar até cada bloco, tudo fica visível', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(PATH);
    for (const sel of Object.values(ALVOS)) {
      const itens = page.locator(sel);
      const n = await itens.count();
      for (let i = 0; i < n; i++) {
        const el = itens.nth(i);
        await el.evaluate((e) => e.scrollIntoView({ block: 'center' }));
        await expect.poll(() => el.evaluate((e) => Number(getComputedStyle(e).opacity))).toBe(1);
      }
    }
  });

  test('o hover dos cartões continua (o efeito usa translate, não transform)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(PATH);
    const card = page.locator(ALVOS.destaque).first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await expect.poll(() => card.evaluate((e) => getComputedStyle(e).transform)).not.toBe('none');
  });

  test('o hero não anima (não briga com a transição entre páginas)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(PATH);
    const n = await page.evaluate(() => [...document.querySelectorAll('.pf-hero *')].filter((e) => /pf-fade/.test(getComputedStyle(e).animationName)).length);
    expect(n).toBe(0);
  });
});
