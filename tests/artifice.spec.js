import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/artifice.html';

test.describe('O Artífice Invisível — Smoke & SEO', () => {
  test('carrega com 200, título, canonical e description corretos, sem erros de console', async ({ page }) => {
    // Só nos responsabilizamos pelo que é nosso: o embed do YouTube é de terceiro
    // e, sem rede (o gate roda offline), falha o carregamento e loga por conta
    // própria. Filtramos por origem para o teste continuar sinalizando defeito
    // real da página em vez de ruído do iframe.
    const errors = [];
    page.on('console', (m) => {
      if (m.type() !== 'error') return;
      const from = m.location()?.url || '';
      if (/youtube|ytimg|googletagmanager|google-analytics/.test(from)) return;
      errors.push(`${m.text()} @ ${from}`);
    });
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/Artífice Invisível/);
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('artifice');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc.length).toBeGreaterThan(50);
    expect(desc.length).toBeLessThan(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('prisão silenciosa');

    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('navegação por âncora leva às 5 seções', async ({ page }) => {
    await page.goto(PATH);
    for (const id of ['hero', 'paradoxos', 'antidoto', 'diagnostico', 'acervo']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    await page.click('header a[href="#paradoxos"]');
    await expect(page.locator('#paradoxos')).toBeInViewport();
  });
});

test.describe('Guardrails de conteúdo (spec 01 §2)', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); });

  test('o manifesto não usa datas específicas e não culpa o indivíduo', async ({ page }) => {
    const texto = await page.locator('#hero').innerText();
    // §2.1 proíbe datas específicas ("Em 2007 fui promovido...").
    expect(texto).not.toMatch(/\b(19|20)\d{2}\b/);
    expect(texto).toContain('Anos atrás');
    // O diagnóstico é estrutural, não pessoal.
    expect(texto).toContain('não é uma falha pessoal');
    expect(texto).toContain('descompasso estrutural');
  });

  test('§2.2 · maestria responsável é distinguida de over-engineering', async ({ page }) => {
    const aside = page.locator('aside[aria-labelledby="aside-maestria-h"]');
    await expect(aside).toHaveCount(1);
    await expect(aside).toContainText('over-engineering');
    await expect(aside).toContainText('problemas de negócio de forma sustentável');
  });

  test('§2.3 · o paradoxo da IA equilibra deskilling com Maestria Aumentada', async ({ page }) => {
    await page.locator('#paradoxo-5-trigger').click();
    const panel = page.locator('#paradoxo-5-panel');
    await expect(panel).toContainText('de-skilling');
    await expect(panel).toContainText('Maestria Aumentada');
    await expect(panel).toContainText('curador');
  });

  test('§2.4 · politicagem é distinguida de liderança de influência legítima', async ({ page }) => {
    await page.locator('#paradoxo-2-trigger').click();
    const panel = page.locator('#paradoxo-2-panel');
    await expect(panel).toContainText('liderança de influência');
    await expect(panel).toContainText('Staff Engineer');
    await expect(panel).toContainText('jogo político superficial');
  });
});

test.describe('Seção 1.5 — Hub Multimídia (vídeo-síntese)', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); });

  test('o player usa youtube-nocookie, carrega lazy e tem nome acessível', async ({ page }) => {
    const frame = page.locator('#video-frame');
    await expect(frame).toHaveCount(1);
    await expect(frame).toHaveAttribute('loading', 'lazy');
    await expect(frame).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/FJ4NEOgw_SY/);
    const title = await frame.getAttribute('title');
    expect(title.length).toBeGreaterThan(15);
  });

  test('o vídeo aparece entre o Hero e os 5 Paradoxos', async ({ page }) => {
    const ordem = await page.evaluate(() => {
      const pos = (id) => document.getElementById(id).compareDocumentPosition(document.getElementById('video'));
      return {
        depoisDoHero: !!(pos('hero') & Node.DOCUMENT_POSITION_FOLLOWING),
        antesDosParadoxos: !!(pos('paradoxos') & Node.DOCUMENT_POSITION_PRECEDING),
      };
    });
    expect(ordem.depoisDoHero).toBe(true);
    expect(ordem.antesDosParadoxos).toBe(true);
  });

  test('os 4 marcadores de tempo avançam o vídeo para o ponto certo', async ({ page }) => {
    const chapters = page.locator('.video-chapter');
    await expect(chapters).toHaveCount(4);

    // 01:21 → start=81
    await chapters.nth(1).click();
    await expect(page.locator('#video-frame')).toHaveAttribute('src', /[?&]start=81\b/);
    await expect(chapters.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(chapters.nth(0)).toHaveAttribute('aria-pressed', 'false');

    // 04:41 → start=281
    await chapters.nth(3).click();
    await expect(page.locator('#video-frame')).toHaveAttribute('src', /[?&]start=281\b/);
    await expect(chapters.nth(3)).toHaveAttribute('aria-pressed', 'true');

    // a mudança é anunciada a leitores de tela
    await expect(page.locator('#video-status')).toContainText('04:41');
  });

  test('há equivalente textual do vídeo para leitura e ingestão por IA', async ({ page }) => {
    const det = page.locator('#video details');
    await expect(det).toHaveCount(1);
    await det.locator('summary').click();
    await expect(det).toContainText('Refinamento tácito');
    await expect(det).toContainText('Duas lógicas');
  });
});

test.describe('Seção 02 — Os 5 Paradoxos', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); });

  test('cada painel do accordion é uma region rotulada pelo próprio gatilho', async ({ page }) => {
    for (let i = 1; i <= 5; i++) {
      const panel = page.locator(`#paradoxo-${i}-panel`);
      await expect(panel).toHaveAttribute('role', 'region');
      await expect(panel).toHaveAttribute('aria-labelledby', `paradoxo-${i}-trigger`);
    }
  });

  test('accordion tem 5 cards, todos colapsados por padrão, e expandem ao clicar', async ({ page }) => {
    const triggers = page.locator('.paradox__trigger');
    await expect(triggers).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(triggers.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }

    await triggers.first().click();
    await expect(triggers.first()).toHaveAttribute('aria-expanded', 'true');
    const firstPanel = page.locator('#paradoxo-1-panel');
    await expect(firstPanel).toHaveAttribute('data-open', 'true');

    // fecha de novo
    await triggers.first().click();
    await expect(triggers.first()).toHaveAttribute('aria-expanded', 'false');
  });

  test('marginália/tooltip de termo acadêmico abre por clique e fecha com Escape', async ({ page }) => {
    const term = page.locator('.art-term').first();
    await term.click();
    await expect(term).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await expect(term).not.toHaveClass(/is-open/);
  });

  test('tabela comparativa das duas ontologias tem 4 linhas de dados', async ({ page }) => {
    await expect(page.locator('.art-table tbody tr')).toHaveCount(4);
  });
});

test.describe('Seção 03 — Antídoto (tabs) & Framework', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); });

  test('abas alternam painel sem duplicar conteúdo visível', async ({ page }) => {
    await expect(page.locator('#panel-37signals')).toBeVisible();
    await expect(page.locator('#panel-gitlab')).toBeHidden();

    await page.click('#tab-gitlab');
    await expect(page.locator('#tab-gitlab')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#tab-37signals')).toHaveAttribute('aria-selected', 'false');
    await expect(page.locator('#panel-gitlab')).toBeVisible();
    await expect(page.locator('#panel-37signals')).toBeHidden();
  });

  test('navegação por teclado (seta direita) move para a próxima aba', async ({ page }) => {
    await page.locator('#tab-37signals').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-gitlab')).toHaveAttribute('aria-selected', 'true');
  });

  test('framework MCSR/ISOM/AEGW apresenta os 3 nós', async ({ page }) => {
    await expect(page.locator('.art-diagram__node')).toHaveCount(3);
    await expect(page.locator('.art-diagram')).toContainText('MCSR');
    await expect(page.locator('.art-diagram')).toContainText('ISOM');
    await expect(page.locator('.art-diagram')).toContainText('AEGW');
  });
});

test.describe('Seção 04 — Widget de Autodiagnóstico', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); });

  test('stepper avança 4 perguntas com barra de progresso e mostra o resultado', async ({ page }) => {
    await expect(page.locator('#diagnostic-step-label')).toHaveText('Passo 1 de 4');
    await expect(page.locator('#diagnostic-back')).toBeDisabled();
    await expect(page.locator('#diagnostic-next')).toBeDisabled();

    for (let step = 0; step < 4; step++) {
      const fs = page.locator(`.art-step[data-step="${step}"]`);
      await expect(fs).toBeVisible();
      await fs.locator('input[type="radio"]').first().check();
      await expect(page.locator('#diagnostic-next')).toBeEnabled();
      await page.click('#diagnostic-next');
    }

    const result = page.locator('#diagnostic-result');
    await expect(result).toBeVisible();
    await expect(result.locator('[data-testid="invisibilidade-pct"]')).toHaveText('100%');
    await expect(result.locator('[data-testid="autoexploracao-pct"]')).toHaveText('100%');
    await expect(result.locator('[data-testid="extrativismo-grau"]')).toHaveText('Crítico');
    await expect(result).toContainText('Otimismo Cruel');
  });

  test('Voltar retorna à pergunta anterior sem perder o progresso geral', async ({ page }) => {
    await page.locator('.art-step[data-step="0"] input').first().check();
    await page.click('#diagnostic-next');
    await expect(page.locator('#diagnostic-back')).toBeEnabled();
    await page.click('#diagnostic-back');
    await expect(page.locator('.art-step[data-step="0"]')).toBeVisible();
  });

  test('o resultado aponta caminhos de emancipação positiva (acionáveis), não só denúncia', async ({ page }) => {
    for (let step = 0; step < 4; step++) {
      await page.locator(`.art-step[data-step="${step}"] input`).first().check();
      await page.click('#diagnostic-next');
    }
    const result = page.locator('#diagnostic-result');
    await expect(result).toContainText('Caminhos de emancipação');
    await expect(result).toContainText('a partir de segunda-feira');
    // pelo menos 4 movimentos concretos, e o vocabulário construtivo da spec
    expect(await result.locator('ol li').count()).toBeGreaterThanOrEqual(4);
    await expect(result).toContainText('liderança de influência');
  });

  test('respostas de menor risco (opção C) geram diagnóstico de baixo risco e "Refazer" reinicia', async ({ page }) => {
    for (let step = 0; step < 4; step++) {
      const fs = page.locator(`.art-step[data-step="${step}"]`);
      await fs.locator('input[value="C"]').check();
      await page.click('#diagnostic-next');
    }
    const result = page.locator('#diagnostic-result');
    await expect(result).toContainText('BAIXO RISCO');

    await result.locator('#diagnostic-restart').click();
    await expect(result).toBeHidden();
    await expect(page.locator('#diagnostic-form')).toBeVisible();
    await expect(page.locator('#diagnostic-step-label')).toHaveText('Passo 1 de 4');
  });
});

test.describe('Seção 05 — Acervo Acadêmico', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); });

  test('carrega referências via fetch e permite filtrar por tema', async ({ page }) => {
    await expect(page.locator('#acervo-list article')).not.toHaveCount(0);
    const totalCount = await page.locator('#acervo-list article').count();

    const filterBtn = page.locator('.art-filter', { hasText: 'Autoexploração & Desempenho' });
    await filterBtn.click();
    await expect(filterBtn).toHaveAttribute('aria-pressed', 'true');
    const filteredCount = await page.locator('#acervo-list article').count();
    expect(filteredCount).toBeLessThan(totalCount);
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('botão de download gera um arquivo .md', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#acervo-download'),
    ]);
    expect(download.suggestedFilename()).toBe('artifice-bibliografia.md');
  });
});

test.describe('Integração com o ecossistema (<eco-nav>)', () => {
  test('eco-nav monta na página, pré-expande o Pilar 1 (Fundação) e marca a página atual', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    const host = page.locator('eco-nav');
    await expect(host).toHaveCount(1);
    await host.locator('.fab').click();
    await expect(host.locator('.fab__pill')).toHaveText('Mentalidade');
    const current = host.locator('.node[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await expect(current).toHaveAttribute('href', /artifice\.html$/);
  });
});

test.describe('Acessibilidade WCAG 2.1 AA', () => {
  test('página inicial sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });

  test('com um paradoxo expandido e o resultado do diagnóstico visível, ainda sem violações', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await page.locator('.paradox__trigger').first().click();
    for (let step = 0; step < 4; step++) {
      await page.locator(`.art-step[data-step="${step}"] input`).first().check();
      await page.click('#diagnostic-next');
    }
    await expectNoSeriousA11yViolations(page);
  });
});
