import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Suíte da página Engenharia de Agentes de IA.
// Evolui por Work Unit (ver BUILD_PLAN §3): cada WU adiciona seus 3 eixos
// (caminho feliz / degradado / open-world+a11y). Aqui está a base do WU-0 (fundação).

const PATH = '/engenharia-agentes-ia.html';

test.describe('EAI — shell + hero (WU-0/WU-1)', () => {
  test('caminho feliz: carrega, título/SEO e hero visíveis', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Engenharia de Agentes de IA/);

    // Landmark e hero
    await expect(page.locator('main#conteudo')).toBeVisible();
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('pouca IA');

    // Flag de construção presente — será removida ao "abrir as cortinas"
    await expect(page.locator('[data-eai-status="construindo"]')).toBeVisible();

    // Sem erros de console na carga (JS do shell deve bootar limpo)
    expect(consoleErrors, consoleErrors.join('\n')).toHaveLength(0);
  });

  test('shell: nav da trilha aponta para as seções e footer presente', async ({ page }) => {
    await page.goto(PATH);

    const targets = ['#principios', '#jornada', '#governanca', '#referencia'];
    for (const href of targets) {
      await expect(page.locator(`.eai-nav__trail a[href="${href}"]`)).toBeVisible();
      // a seção alvo existe
      await expect(page.locator(href)).toHaveCount(1);
    }
    await expect(page.locator('footer.eai-footer')).toBeVisible();
  });

  test('shell: clicar na trilha navega até a seção e marca aria-current', async ({ page }) => {
    await page.goto(PATH);
    await page.locator('.eai-nav__trail a[href="#governanca"]').click();
    await expect(page.locator('#governanca')).toBeInViewport({ ratio: 0.2 });
    // o IntersectionObserver deve marcar algum link como atual
    await expect(page.locator('.eai-nav__trail a[aria-current="true"]')).toHaveCount(1);
  });

  test('WU-2: visualização caótico × disciplinado com SVGs rotulados e equivalente textual', async ({ page }) => {
    await page.goto(PATH);
    const duo = page.locator('[data-eai-duo]');
    await expect(duo).toBeVisible();

    // dois painéis: caos e ordem
    await expect(duo.locator('.eai-duo__panel--chaos')).toBeVisible();
    await expect(duo.locator('.eai-duo__panel--order')).toBeVisible();

    // SVGs com rótulo acessível (equivalente textual da visualização)
    const svgs = duo.locator('svg[role="img"]');
    await expect(svgs).toHaveCount(2);
    for (let i = 0; i < 2; i++) {
      await expect(svgs.nth(i)).toHaveAttribute('aria-label', /.+/);
    }

    // listas explicativas presentes em ambos os lados
    await expect(duo.locator('.eai-duo__panel--chaos .eai-duo__list li')).toHaveCount(3);
    await expect(duo.locator('.eai-duo__panel--order .eai-duo__list li')).toHaveCount(3);
  });

  test('open-world / a11y: skip link, h1 único e axe sem violações serious/critical', async ({ page }) => {
    // Auditamos sob reduced-motion: o conteúdo fica no estado final (visível),
    // sem o fade-in transitório que confunde o cálculo de contraste do axe.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);

    // Exatamente um H1
    await expect(page.locator('h1')).toHaveCount(1);

    // Skip link existe e aponta para o conteúdo
    await expect(page.locator('a.eai-skip-link')).toHaveAttribute('href', '#conteudo');

    await expectNoSeriousA11yViolations(page);
  });

  test('degradado: legível em viewport mobile sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    await expect(page.locator('#hero-titulo')).toBeVisible();

    // Não deve haver overflow horizontal (mede o documento contra a viewport)
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
