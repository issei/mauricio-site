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

    // Sem erros de console na carga (JS do shell deve bootar limpo)
    expect(consoleErrors, consoleErrors.join('\n')).toHaveLength(0);
  });

  test('WU-7: página indexável (cortinas abertas) e com navegação no footer', async ({ page }) => {
    await page.goto(PATH);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).not.toMatch(/noindex/);
    await expect(page.locator('.eai-footer__nav a[href="./catalogo.html"]')).toBeVisible();
  });

  test('WU-7: a página está listada no catálogo do site', async ({ page }) => {
    const res = await page.goto('/catalogo.html');
    expect(res?.status()).toBe(200);
    await expect(page.locator('a[href="./engenharia-agentes-ia.html"]')).toBeVisible();
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

  test('WU-8: simulador reage aos controles de forma determinística', async ({ page }) => {
    await page.goto(PATH);
    const sim = page.locator('[data-eai-sim]');
    await expect(sim).toBeVisible();
    await expect(sim.locator('.eai-meter')).toHaveCount(6);

    const riscoNow = () =>
      sim.locator('[data-metric="risco"] [role="progressbar"]').getAttribute('aria-valuenow');

    // estado base
    const riscoBase = Number(await riscoNow());

    // ligar BDD+schemas (já marcados) e desmarcar reduz/aumenta risco — testa desmarcar schemas
    await sim.locator('[data-sim="schemas"]').uncheck();
    const riscoSemSchemas = Number(await riscoNow());
    expect(riscoSemSchemas).toBeGreaterThan(riscoBase);

    // aumentar autonomia ao máximo eleva o risco ainda mais
    await sim.locator('[data-sim="autonomy"]').fill('100');
    await sim.locator('[data-sim="autonomy"]').dispatchEvent('input');
    const riscoMax = Number(await riscoNow());
    expect(riscoMax).toBeGreaterThanOrEqual(riscoSemSchemas);

    // determinismo: voltar ao estado base reproduz o valor base
    await sim.locator('[data-sim="autonomy"]').fill('50');
    await sim.locator('[data-sim="autonomy"]').dispatchEvent('input');
    await sim.locator('[data-sim="schemas"]').check();
    expect(Number(await riscoNow())).toBe(riscoBase);
  });

  test('WU-6: referência — glossário e caso SocialSelling (pipeline M1–M5)', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.eai-gloss > div').first()).toBeVisible();
    await expect(page.locator('.eai-gloss dt')).toHaveCount(6);
    // caso real com pipeline de 5 estágios
    await expect(page.locator('.eai-case')).toBeVisible();
    await expect(page.locator('.eai-case__pipe li')).toHaveCount(5);
    await expect(page.locator('.eai-case')).toContainText('XAI sem número');
  });

  test('WU-5: governança — dicionário (5), árvore, regra de ouro e banner financeiro', async ({ page }) => {
    await page.goto(PATH);
    // 5 cards do dicionário
    await expect(page.locator('.eai-dict .eai-dcard')).toHaveCount(5);
    await expect(page.locator('.eai-dcard[data-pillar="mcp"]')).toContainText('Model Context Protocol');
    // árvore com as 4 pastas-chave
    for (const f of ['ai', 'docs', 'tests', 'scripts']) {
      await expect(page.locator(`.eai-tree__dir[data-folder="${f}"]`)).toBeVisible();
    }
    // Regra de Ouro (danger) e alerta financeiro (warn)
    await expect(page.locator('.eai-callout--danger')).toContainText('versione o estado cognitivo');
    await expect(page.locator('.eai-callout--warn')).toContainText('financeiros');
    // comparativo meta-prompt × manual com faixa de convergência
    await expect(page.locator('.eai-compare__col')).toHaveCount(2);
    await expect(page.locator('.eai-compare__conv')).toContainText('contexto e gates primeiro');
  });

  test('WU-4: dez capítulos da jornada que abrem e expõem o objetivo', async ({ page }) => {
    await page.goto(PATH);
    const chaps = page.locator('.eai-journey .eai-chap');
    await expect(chaps).toHaveCount(10);

    // capítulo fechado por padrão; abrir o primeiro revela o corpo
    const first = page.locator('#cap-1');
    await expect(first).not.toHaveAttribute('open', /.*/);
    await first.locator('summary').click();
    await expect(first.locator('.eai-chap__body')).toBeVisible();
    await expect(first.locator('.eai-chap__body')).toContainText('Objetivo');

    // links internos da jornada apontam para princípios/governança existentes
    await first.locator('summary').click(); // fecha
    await page.locator('#cap-10 summary').click();
    const gov = page.locator('#cap-10 .eai-chap__link');
    await expect(gov).toHaveAttribute('href', '#governanca');
  });

  test('WU-3: dez cards de princípio com títulos e âncoras', async ({ page }) => {
    await page.goto(PATH);
    const cards = page.locator('.eai-pgrid .eai-pcard');
    await expect(cards).toHaveCount(10);
    // âncoras estáveis principio-1..principio-10
    for (let n = 1; n <= 10; n++) {
      await expect(page.locator(`#principio-${n}`)).toHaveCount(1);
    }
    // títulos-chave presentes
    await expect(page.locator('#principio-1 .eai-pcard__title')).toContainText('componente');
    await expect(page.locator('#principio-10 .eai-pcard__title')).toContainText('Explique');
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
