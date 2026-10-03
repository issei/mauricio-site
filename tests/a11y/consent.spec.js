// T7 — decidir sobre cookies, só com teclado (docs/specs/a11y-first/testing-strategy.md §3, F-01/F-10).
// Contexto novo do Playwright = sem consentimento gravado = o banner aparece.
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from '../_helpers/axe.js';

const PAGE = '/index.html';

test.describe('Consentimento de cookies — acessibilidade (T7)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeVisible();
  });

  test('banner é região não-modal: não rouba o foco e é anunciado', async ({ page }) => {
    const active = await page.evaluate(() => document.activeElement?.tagName);
    expect(active).toBe('BODY');
    await expect(page.locator('#cc-live')).toHaveText(/Aviso de cookies/);
    expect(await page.locator('dialog').count()).toBe(0);
    // o botão fixo fica atrás da faixa: não pode ser alcançável por Tab enquanto ela existe
    await expect(page.locator('.cc-fab')).toBeHidden();
  });

  test('os 3 botões têm ≥ 44px e Aceitar/Recusar têm o mesmo tamanho (paridade)', async ({ page }) => {
    const box = async (name) => (await page.getByRole('button', { name, exact: true }).boundingBox());
    const accept = await box('Aceitar todos');
    const reject = await box('Recusar todos');
    const custom = await box('Personalizar');
    for (const b of [accept, reject, custom]) expect(b.height).toBeGreaterThanOrEqual(44);
    expect(Math.abs(accept.height - reject.height)).toBeLessThan(1);
  });

  for (const [nome, viewport] of [['desktop', { width: 1280, height: 720 }], ['mobile', { width: 375, height: 812 }]]) {
    test(`o <eco-nav> não cobre os botões do banner (${nome})`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(PAGE);
      await page.waitForFunction(() => document.querySelector('eco-nav')?.shadowRoot);
      const hit = await page.evaluate(() => {
        const eco = document.querySelector('eco-nav').getBoundingClientRect();
        return [...document.querySelectorAll('.cc-banner .cc-btn')].filter((b) => {
          const r = b.getBoundingClientRect();
          return r.left < eco.right && r.right > eco.left && r.top < eco.bottom && r.bottom > eco.top;
        }).map((b) => b.textContent.trim());
      });
      expect(hit, 'botões do banner sob o eco-nav').toEqual([]);
    });
  }

  test('a faixa fixa reserva a própria altura no fim da página (2.4.11)', async ({ page }) => {
    const { pad, h } = await page.evaluate(() => ({
      pad: parseFloat(getComputedStyle(document.body).paddingBottom),
      h: document.querySelector('.cc-banner').offsetHeight,
    }));
    expect(pad).toBeGreaterThanOrEqual(h);
    await page.getByRole('button', { name: 'Recusar todos', exact: true }).click();
    const after = await page.evaluate(() => document.body.style.paddingBottom);
    expect(after).toBe('');
  });

  test('Personalizar: foco entra, Tab não escapa, Esc fecha e o foco volta', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Personalizar', exact: true });
    await trigger.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog', { name: 'Preferências de cookies' });
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => !!document.activeElement.closest('dialog'))).toBe(true);

    // Tab e Shift+Tab em volta: o foco nunca chega a um elemento da página atrás. Num <dialog> modal o
    // navegador pode passar pela interface dele (activeElement = <body>) antes de voltar ao diálogo.
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press(i % 2 ? 'Shift+Tab' : 'Tab');
      const where = await page.evaluate(() => {
        const a = document.activeElement;
        return a === document.body ? 'chrome' : a.closest('dialog') ? 'dialog' : 'page';
      });
      expect(where, `Tab #${i}`).not.toBe('page');
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('categorias são checkboxes nomeados; o necessário é focável e não muda', async ({ page }) => {
    await page.getByRole('button', { name: 'Personalizar', exact: true }).click();
    const analytics = page.getByRole('checkbox', { name: 'Análise e desempenho' });
    await expect(analytics).not.toBeChecked();
    await analytics.focus();
    await page.keyboard.press('Space');
    await expect(analytics).toBeChecked();

    const necessary = page.getByRole('checkbox', { name: 'Estritamente necessários' });
    await expect(necessary).toBeChecked();
    await expect(necessary).toHaveAttribute('aria-disabled', 'true');
    await necessary.focus();
    await page.keyboard.press('Space');
    await expect(necessary).toBeChecked();
    // a descrição ("Não podem ser desativados") está associada
    await expect(necessary).toHaveAccessibleDescription(/Não podem ser desativados/);
  });

  test('salvar: grava a escolha, atualiza o Consent Mode, anuncia e leva o foco ao botão fixo', async ({ page }) => {
    await page.getByRole('button', { name: 'Personalizar', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Análise e desempenho' }).check();
    await page.getByRole('button', { name: 'Salvar preferências' }).click();

    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toHaveCount(0);
    await expect(page.locator('#cc-live')).toHaveText('Preferências de cookies salvas.');
    // o gatilho (banner) sumiu: o foco vai ao botão fixo, não ao <body>
    await expect(page.locator('.cc-fab')).toBeFocused();

    const saved = await page.evaluate(() => window.cookieConsent.get().categories);
    expect(saved).toEqual({ necessary: true, analytics: true, marketing: false, personalization: false });
    const update = await page.evaluate(() =>
      window.dataLayer.map((x) => Array.from(x)).find((x) => x[0] === 'consent' && x[1] === 'update')
    );
    expect(update[2].analytics_storage).toBe('granted');
    expect(update[2].ad_storage).toBe('denied');
  });

  test('abrir e fechar várias vezes não vaza diálogo nem listener', async ({ page }) => {
    await page.getByRole('button', { name: 'Recusar todos', exact: true }).click();
    const fab = page.locator('.cc-fab');
    for (let i = 0; i < 3; i++) {
      await fab.click();
      await expect(page.locator('dialog')).toHaveCount(1);
      await page.getByRole('button', { name: 'Cancelar' }).click();
      await expect(page.locator('dialog')).toHaveCount(0);
      await expect(fab).toBeFocused();
    }
    await page.keyboard.press('Escape'); // sem diálogo aberto: nada acontece
    await expect(page.locator('dialog')).toHaveCount(0);
  });

  test('clicar no fundo fecha; abrir duas vezes não empilha diálogos', async ({ page }) => {
    await page.getByRole('button', { name: 'Personalizar', exact: true }).click();
    await page.evaluate(() => window.cookieConsent.open());
    await expect(page.locator('dialog')).toHaveCount(1);
    await page.mouse.click(5, 5); // fora do conteúdo = ::backdrop
    await expect(page.locator('dialog')).toHaveCount(0);
  });

  test('axe sem violações serious/critical com o modal aberto', async ({ page }) => {
    await page.getByRole('button', { name: 'Personalizar', exact: true }).click();
    await expectNoSeriousA11yViolations(page, 'dialog');
  });
});
