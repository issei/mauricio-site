import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "Digital Workplace Agêntico".
 * Spec: docs/specs/pages/digital-workplace-agentico/ (docs 00–06).
 *
 * O que ela protege além do smoke: as oito visualizações são conteúdo (existem no HTML, em
 * contagens que a spec fixa) e os enriquecimentos por JavaScript só acrescentam comportamento.
 * A restrição legal (doc 06) tem guarda própria em tests/digital-workplace.legal.test.mjs.
 */

const PATH = '/digital-workplace-agentico.html';
const count = (page, sel) => page.locator(sel).count();

test.describe('Digital Workplace Agêntico — página', () => {
  test('carrega, título/SEO e hero visíveis', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle('Digital Workplace agêntico — Do Portal ao Agente');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('resolve');
    await expect(page.locator('.dw-hero__tese')).toContainText('chatbot com credenciais perigosas');
  });

  test('SEO: um único H1, canonical, robots e og:image da própria página', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.getAttribute('link[rel="canonical"]', 'href')).toBe('https://mauricio.issei.com.br/digital-workplace-agentico');
    expect((await page.getAttribute('meta[name="robots"]', 'content')) || '').not.toMatch(/noindex/);
    expect(await page.getAttribute('meta[property="og:image"]', 'content')).toContain('og-digital-workplace-agentico.png');
    expect(await page.getAttribute('link[rel="alternate"][type="text/markdown"]', 'href')).toContain('digital-workplace-agentico.md');
  });

  test('o vídeo de resumo: iframe com título acessível, entre o hero e o problema', async ({ page }) => {
    await page.goto(PATH);
    const frame = page.locator('#video iframe');
    await expect(frame).toHaveAttribute('title', 'Vídeo: Digital Workplace Agêntico: Como Evoluir do Portal Corporativo ao Agente de IA');
    await expect(frame).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/Z-8YtFXi-oo/);
    const ids = await page.$$eval('main > section', (els) => els.map((e) => e.id));
    expect(ids.indexOf('video')).toBe(ids.indexOf('hero') + 1);
    expect(ids.indexOf('problema')).toBe(ids.indexOf('video') + 1);
    await expect(page.locator('#video a[href="#problema"]').last()).toBeVisible();
  });

  test('as dezoito seções do mapa existem, em ordem de leitura', async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.$$eval('main > section', (els) => els.map((e) => e.id));
    expect(ids).toEqual([
      'hero', 'video', 'problema', 'maturidade', 'arquitetura', 'fluxo', 'pilares', 'conhecimento', 'confianca',
      'processos', 'papeis', 'decisoes', 'operacao', 'roadmap', 'prontidao', 'perguntas', 'estudar',
    ]);
    await expect(page.locator('#aeo .aeo-tldr')).toHaveCount(1);
    await expect(page.locator('nav.dw-nav__trail a')).toHaveCount(6);
  });

  test('contagens que a spec fixa (doc 01 §2 e doc 05 fase 2)', async ({ page }) => {
    await page.goto(PATH);
    const esperado = {
      '.dw-dor': 4, // entradas por dor
      '.dw-forca': 3, // três forças do problema
      '.dw-cadeia > li': 6, // V1
      '.dw-degrau': 5, // V2: degraus
      '#matriz tbody tr': 8, // V2: oito dimensões
      '.dw-pular': 3, // V2: custos de pular estágios
      '.dw-camada': 6, // V3: seis camadas
      '.dw-transversal': 1, // V3: faixa transversal
      '#agui-familias tbody tr': 8, // V4: oito famílias de eventos
      '.dw-passos > li': 11, // V4: passos da sequência
      '.dw-pilar': 8, // oito pilares
      '.dw-estacao': 6, // V5: seis estações
      '.dw-portao': 3, // V5: portões
      '.dw-nivel': 5, // V6: níveis 0–4
      '#papeis-tabela tbody tr': 12, // doze lentes
      '.dw-tradeoff': 12,
      '.dw-paradoxo': 3,
      '.dw-anti': 17,
      '#anti-checklist li': 8,
      '#slos tbody tr': 7,
      '#roadmap-grade tbody tr': 7, // V7: sete trilhas
      '#roadmap-grade thead th': 7, // trilha + seis fases
      '#prontidao-form fieldset': 10, // V8: dez critérios
      '.dw-pergunta': 30,
      '.dw-grupo': 5,
    };
    for (const [sel, n] of Object.entries(esperado)) {
      expect(await count(page, sel), sel).toBe(n);
    }
  });

  test('honestidade epistêmica: todo bloco derivado da fonte carrega selo textual', async ({ page }) => {
    await page.goto(PATH);
    for (const sel of ['.dw-pilar', '.dw-pergunta', '.dw-forca']) {
      const semSelo = await page.$$eval(sel, (els) => els.filter((e) => !e.querySelector('.dw-selo')).length);
      expect(semSelo, `${sel} sem selo`).toBe(0);
    }
    const secoesSemSelo = await page.$$eval('main > section:not(#hero):not(#estudar)', (els) =>
      els.filter((e) => !e.querySelector('.dw-selo')).map((e) => e.id));
    expect(secoesSemSelo).toEqual([]);
    const rotulos = new Set(await page.$$eval('.dw-selo', (els) => els.map((e) => e.textContent.trim())));
    for (const r of ['FATO', 'INFERÊNCIA', 'HIPÓTESE', 'RECOMENDAÇÃO']) expect(rotulos.has(r), r).toBe(true);
  });

  test('sem frase autobiográfica (doc 06 §5, P5) e sem prazos inventados', async ({ page }) => {
    await page.goto(PATH);
    const texto = await page.locator('main').innerText();
    expect(texto).not.toMatch(/\b(conduzi|no meu trabalho|na empresa onde|no projeto que|trabalho atual|atuo na|atuei na)\b/i);
    expect(texto).not.toMatch(/\b(garante|elimina|revolucion[aá]ri[oa]|disruptiv[oa]|game-changer|solução completa|de última geração)\b/i);
  });

  test('o único raster da página é o OG: nenhuma <img>', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('img')).toHaveCount(0);
  });

  test('V2: o botão do degrau destaca a coluna da matriz, por teclado também', async ({ page }) => {
    await page.goto(PATH);
    const btn = page.locator('[data-estagio-btn="E3"]');
    await expect(btn).toBeEnabled();
    await btn.focus();
    await page.keyboard.press('Enter');
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#matriz tbody td.is-sel')).toHaveCount(8);
    await expect(page.locator('#matriz thead th.is-sel .dw-sel-rotulo')).toHaveText('estágio selecionado');
    // E4 troca a seleção; clicar de novo desliga.
    await page.locator('[data-estagio-btn="E4"]').click();
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#matriz thead th[data-e="E4"] .dw-sel-rotulo')).toHaveCount(1);
    await page.locator('[data-estagio-btn="E4"]').click();
    await expect(page.locator('#matriz .is-sel')).toHaveCount(0);
  });

  test('V4: anterior/próximo/ver tudo, painel aria-live e setas do teclado', async ({ page }) => {
    await page.goto(PATH);
    const passos = page.locator('.dw-passos > li');
    const painel = page.locator('[data-seq-painel]');
    await expect(painel).toHaveAttribute('aria-live', 'polite');
    await expect(passos.locator('visible=true')).toHaveCount(11);

    await page.locator('[data-seq-next]').click();
    await expect(passos.locator('visible=true')).toHaveCount(1);
    await expect(painel).toContainText('Passo 1 de 11');

    await page.locator('[data-seq-next]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(painel).toContainText('Passo 2 de 11');
    await page.keyboard.press('ArrowLeft');
    await expect(painel).toContainText('Passo 1 de 11');
    await expect(page.locator('[data-seq-prev]')).toBeDisabled();

    await page.locator('[data-seq-tudo]').click();
    await expect(passos.locator('visible=true')).toHaveCount(11);
    await expect(page.locator('[data-seq-tudo]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('V4: o passo de confirmação é marcado como decisão humana', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.dw-passos > li.is-humano')).toHaveCount(2);
    await expect(page.locator('.dw-passos > li.is-humano').nth(1)).toContainText('Confirmar');
  });

  test('V7: filtro por trilha esmaece as outras linhas sem tirá-las do DOM', async ({ page }) => {
    await page.goto(PATH);
    await page.locator('[data-trilha-btn="T2"]').click();
    await expect(page.locator('[data-trilha-btn="T2"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#roadmap-grade tbody tr.is-esmaecida')).toHaveCount(6);
    await expect(page.locator('#roadmap-grade tbody tr[data-trilha="T2"]')).not.toHaveClass(/is-esmaecida/);
    await expect(page.locator('#roadmap-grade tbody tr')).toHaveCount(7);
    await page.locator('[data-trilha-limpar]').click();
    await expect(page.locator('#roadmap-grade tbody tr.is-esmaecida')).toHaveCount(0);
    // T2 e T3 são o caminho crítico, em texto e não só em cor.
    await expect(page.locator('#roadmap-grade .dw-critico')).toHaveCount(2);
  });

  test('V8: calcula o total, a faixa e as lacunas; nada é persistido', async ({ page }) => {
    await page.goto(PATH);
    const saida = page.locator('#prontidao-resultado');
    // Só total e faixa ficam na região viva; a lista de lacunas fica de fora (não é relida a cada clique).
    await expect(saida.locator('[aria-live="polite"]')).toHaveCount(1);
    await expect(saida.locator('[aria-live="polite"] [data-lacunas]')).toHaveCount(0);
    // Estado inicial vazio, sem anúncio: o cálculo só começa com a primeira resposta.
    await expect(saida.locator('[data-total]')).toHaveText('–');
    await expect(saida).toHaveAttribute('data-faixa', '');
    await page.locator('#intencao-0').check();
    await expect(saida.locator('[data-total]')).toHaveText('0');
    await expect(saida).toHaveAttribute('data-faixa', 'fundacoes');

    const ids = ['intencao', 'processo', 'apis', 'identidade', 'conteudo', 'busca', 'componentes', 'avaliacao', 'observabilidade', 'governanca'];
    // 5 critérios completos = 10 pontos → faixa "RAG".
    for (const id of ids.slice(0, 5)) await page.locator(`#${id}-2`).check();
    await expect(saida.locator('[data-total]')).toHaveText('10');
    await expect(saida).toHaveAttribute('data-faixa', 'rag');
    await expect(saida.locator('[data-lacunas] li')).toHaveCount(5);

    // 9 pontos → fundações; 16 → ações.
    await page.locator('#conteudo-1').check();
    await expect(saida.locator('[data-total]')).toHaveText('9');
    await expect(saida).toHaveAttribute('data-faixa', 'fundacoes');
    for (const id of ids) await page.locator(`#${id}-2`).check();
    await page.locator('#busca-0').check();
    await page.locator('#apis-1').check(); // 20 − 2 − 1 = 17
    await expect(saida.locator('[data-total]')).toHaveText('17');
    await expect(saida).toHaveAttribute('data-faixa', 'acoes');
    await expect(saida.locator('[data-lacunas] li')).toHaveText(['Busca com permissões']);

    const persistido = await page.evaluate(() => localStorage.length + sessionStorage.length);
    expect(persistido).toBe(0); // (cookies do GA4 são do bloco AEO, não do formulário)
  });

  test('os módulos entram só por import dinâmico e nenhum erro de console aparece', async ({ page }) => {
    const erros = [];
    page.on('pageerror', (e) => erros.push(e.message));
    page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
    await page.goto(PATH);
    await page.waitForLoadState('networkidle');
    expect(erros.filter((e) => !/googletagmanager|fonts\.g|ERR_|Failed to load resource/i.test(e))).toEqual([]);
  });

  test('375 px: sem scroll horizontal da página; tabelas rolam no próprio contêiner', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    expect(sw - iw).toBeLessThanOrEqual(1);
    // Todo contêiner de tabela é focável por teclado e tem rótulo.
    const invalidos = await page.$$eval('.dw-tabela-wrap', (els) =>
      els.filter((e) => e.getAttribute('tabindex') !== '0' || !e.getAttribute('aria-label')).length);
    expect(invalidos).toBe(0);
  });

  test('alvos de toque dos controles ≥ 24 px (WCAG 2.5.8)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    const pequenos = await page.$$eval('main button, main input[type="radio"], main summary', (els) =>
      els.filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.width < 24 || r.height < 24);
      }).length);
    expect(pequenos).toBe(0);
  });

  test('prefers-reduced-motion desliga as animações sem perder conteúdo', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    const anim = await page.evaluate(() => getComputedStyle(document.querySelector('.dw-cadeia li'), '::after').animationName);
    expect(anim).toBe('none');
    await expect(page.locator('.dw-cadeia > li')).toHaveCount(6);
  });

  test('acessibilidade: zero violações serious/critical na página inteira (axe)', async ({ page }) => {
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });

  test('acessibilidade em 375 px com todos os <details> abertos (axe)', async ({ page }) => {
    // O gate padrão audita só o estado inicial; as regiões roláveis e o conteúdo recolhido aparecem aqui.
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    await expectNoSeriousA11yViolations(page);
  });

  test('V4: ao chegar no último passo o foco não cai no vazio e Alt+← não é capturado', async ({ page }) => {
    await page.goto(PATH);
    // Por teclado (foco programático): o Safari não foca botão ao clicar, e é o foco que está em jogo.
    await page.locator('[data-seq-next]').focus();
    for (let i = 0; i < 11; i++) await page.keyboard.press('Enter');
    await expect(page.locator('[data-seq-painel]')).toContainText('Passo 11 de 11');
    await expect(page.locator('[data-seq-next]')).toBeDisabled();
    // O botão focado acabou de ser desabilitado: o foco vai para "Ver tudo", não para o vazio.
    await expect(page.locator('[data-seq-tudo]')).toBeFocused();
    const capturado = await page.evaluate(() => {
      const e = new KeyboardEvent('keydown', { key: 'ArrowLeft', altKey: true, bubbles: true, cancelable: true });
      document.querySelector('[data-seq]').dispatchEvent(e);
      return e.defaultPrevented;
    });
    expect(capturado).toBe(false);
  });

  test('crosslinks do corpo apontam para páginas que existem', async ({ page }) => {
    await page.goto(PATH);
    const hrefs = await page.$$eval('main a[href^="./"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
    expect(hrefs.sort()).toEqual([
      './agent-ready.html', './engenharia-agentes-ia.html', './engenharia-confianca.html',
      './knowledge-os-presentation.html', './service-operations-2-0.html',
    ]);
    for (const h of hrefs) expect((await page.request.get(h.replace('./', '/'))).status()).toBe(200);
  });
});
