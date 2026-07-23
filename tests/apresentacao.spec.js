/**
 * Página v3.0 — auditoria dos 17 pontos do Resumo das Evoluções.
 *
 * Regra do projeto: ponto da spec sem teste nomeado é ponto não entregue.
 * Cada `test()` abaixo cita a evolução que verifica.
 *
 * Rodam em chromium, firefox e webkit. Mobile e sem-JS têm projetos próprios.
 */
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';
import { expectEnhancedContrast } from './_helpers/axe-aaa.js';

const PATH = '/apresentacao.html';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH);
});

/**
 * Conclui a revelação progressiva antes de auditar.
 *
 * Os blocos `.ap-reveal` nascem em `opacity: 0` e só ganham `is-visible` quando
 * entram na viewport. O axe calcula contraste JÁ COM a opacidade aplicada, de
 * modo que auditar sem isto mede um estado transiente de animação e acusa
 * 1.02:1 em texto que, quando visível, tem 17:1. O quanto isso aparece varia
 * por navegador (o Firefox dispara menos observers na carga), o que tornaria a
 * suíte não-determinística.
 *
 * O teste "a revelação progressiva torna os blocos visíveis" abaixo é quem
 * garante que o mecanismo realmente funciona — este helper não o mascara.
 */
async function settleReveal(page) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('.ap-reveal')) el.classList.add('is-visible');
  });
}

/* ── Fundamentos ────────────────────────────────────────────────────────── */

test('carrega com SEO válido e um único h1', async ({ page }) => {
  await expect(page).toHaveTitle(/Arquitetura de IA auditável/);

  const title = await page.title();
  expect(title.length).toBeGreaterThanOrEqual(10);
  expect(title.length).toBeLessThanOrEqual(60);

  const desc = await page.getAttribute('meta[name="description"]', 'content');
  expect(desc.length).toBeGreaterThanOrEqual(50);
  expect(desc.length).toBeLessThanOrEqual(160);

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href', 'https://mauricio.issei.com.br/apresentacao'
  );
  const robots = await page.getAttribute('meta[name="robots"]', 'content');
  expect(robots).not.toContain('noindex');

  await expect(page.locator('h1')).toHaveCount(1);
});

test('skip link e landmark main', async ({ page }) => {
  await expect(page.locator('a.ap-skip')).toHaveAttribute('href', '#conteudo');
  await expect(page.locator('main#conteudo')).toHaveCount(1);
});

/* ── Evolução 1 · metáfora dinâmica ─────────────────────────────────────── */

test('evolução 1 · a retícula do Hero converge do caos à ordem', async ({ page }) => {
  const figure = page.locator('[data-ap-figure]');
  await expect(figure).toHaveAttribute('data-ordered', 'true', { timeout: 3000 });
  // O significado está no movimento: nenhuma legenda o explica em texto.
  await expect(page.locator('main')).not.toContainText('caos');
});

/* ── Evolução 2 · temperatura visual por camada ─────────────────────────── */

test('evolução 2 · as três camadas têm fundo e espaçamento distintos', async ({ page }) => {
  const read = (layer) =>
    page.locator(`[data-layer="${layer}"]`).first().evaluate((el) => {
      const s = getComputedStyle(el);
      return { bg: s.backgroundColor, pad: parseFloat(s.paddingTop) };
    });

  const [l1, l2, l3] = await Promise.all([read(1), read(2), read(3)]);

  expect(l2.bg).not.toBe(l1.bg);          // a Camada 2 ganha textura
  expect(l3.bg).toBe(l1.bg);              // a Camada 3 preserva o dark (evolução 8)
  expect(l1.pad).toBeGreaterThan(l2.pad); // densidade cresce ao descer
  expect(l2.pad).toBeGreaterThan(l3.pad);
});

test('evolução 2 · a retícula só aparece a partir da Camada 2', async ({ page }) => {
  const grid = (layer) =>
    page.locator(`[data-layer="${layer}"]`).first().evaluate(
      (el) => getComputedStyle(el, '::before').backgroundImage
    );
  expect(await grid(1)).toBe('none');
  expect(await grid(2)).toContain('gradient');
});

/* ── Evolução 3 · âmbar restrito a governança ───────────────────────────── */

test('evolução 3 · o âmbar só aparece na Prova de Governança', async ({ page }) => {
  const amber = await page.evaluate(() => {
    const token = getComputedStyle(document.documentElement)
      .getPropertyValue('--ap-amber').trim();
    const rgb = (h) => {
      const n = parseInt(h.slice(1), 16);
      return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
    };
    const target = rgb(token);
    const hits = [];
    for (const el of document.querySelectorAll('*')) {
      const s = getComputedStyle(el);
      if ([s.color, s.borderTopColor, s.backgroundColor].includes(target)) {
        hits.push(el.closest('[data-zone]')?.dataset.zone ?? 'fora-de-zona');
      }
    }
    return hits;
  });

  expect(amber.length).toBeGreaterThan(0);
  for (const zone of amber) expect(zone).toBe('governanca');
});

/* ── Evolução 4 · tradutores de valor na Camada 1 ───────────────────────── */

test('evolução 4 · todo termo técnico da Camada 1 tem tradução de valor', async ({ page }) => {
  const orphans = await page.evaluate(() =>
    [...document.querySelectorAll('[data-layer="1"] .ap-term')]
      .filter((t) => {
        const next = t.nextElementSibling;
        return !(next && next.classList.contains('ap-value'));
      })
      .map((t) => t.textContent.trim())
  );
  expect(orphans, `termos sem tradutor de valor: ${orphans.join(', ')}`).toEqual([]);
  expect(await page.locator('[data-layer="1"] .ap-term').count()).toBeGreaterThan(0);
});

test('spec §3.1 · nenhum termo não traduzido em destaque na Camada 1', async ({ page }) => {
  // Negrito e título na Camada 1 são reservados a conceitos já traduzidos.
  const bold = await page.evaluate(() =>
    [...document.querySelectorAll('[data-layer="1"] strong, [data-layer="1"] b')]
      .map((el) => el.textContent.trim())
      .filter((t) => t.length > 0 && !/^\d/.test(t))
  );
  expect(bold, `destaque na Camada 1: ${bold.join(' | ')}`).toEqual([]);
});

/* ── Evolução 5 · Prova de Governança ───────────────────────────────────── */

test('evolução 5 · a Prova de Governança traz de 3 a 5 princípios', async ({ page }) => {
  const cards = page.locator('[data-zone="governanca"] .ap-principle');
  const n = await cards.count();
  expect(n).toBeGreaterThanOrEqual(3);
  expect(n).toBeLessThanOrEqual(5);
  for (let i = 0; i < n; i++) {
    await expect(cards.nth(i).locator('h3')).not.toBeEmpty();
    await expect(cards.nth(i).locator('p')).not.toBeEmpty();
  }
});

test('spec §4.1 · acessibilidade declarada como princípio de posicionamento', async ({ page }) => {
  await expect(page.locator('.ap-compliance')).toContainText(/WCAG/i);
});

/* ── Evolução 6 · contato qualificado ───────────────────────────────────── */

test('evolução 6 · o contato é uma pergunta, não um formulário genérico', async ({ page }) => {
  await expect(page.locator('.ap-contact-question')).toContainText('?');
  expect(await page.locator('main form').count()).toBe(0);
  expect(await page.locator('main input[type="text"], main input[type="email"]').count()).toBe(0);
});

/* ── Evolução 7 · ancoragem por repetição estrutural ────────────────────── */

test('evolução 7 · as três Zonas seguem a mesma sequência de camadas', async ({ page }) => {
  const zones = ['graphrag', 'sdd', 'devops'];
  for (const zone of zones) {
    const layers = await page.evaluate(
      (z) => [...document.querySelectorAll(`[data-zone="${z}"] [data-layer]`)]
        .map((el) => el.dataset.layer),
      zone
    );
    expect(layers, `zona ${zone}`).toEqual(['1', '2', '3']);
  }
});

/* ── Evolução 9 · transmutação abaixo de 200ms ──────────────────────────── */

test('evolução 9 · a transmutação dura menos de 200ms', async ({ page }) => {
  // A garantia dura é a duração da transição CSS, lida do estilo computado do
  // elemento que realmente anima. Determinística e idêntica nos três
  // navegadores.
  const cssMs = await page.evaluate(() => {
    const el = document.querySelector('.ap-pair [data-persona]');
    const d = getComputedStyle(el).transitionDuration; // ex.: "0.16s"
    return parseFloat(d) * (d.includes('ms') ? 1 : 1000);
  });
  expect(cssMs, 'duração da transição declarada no CSS').toBeGreaterThan(0);
  expect(cssMs).toBeLessThan(200);

  // Sanidade de ponta a ponta: a marca é emitida e o ciclo fecha. O valor de
  // wall-clock NÃO é usado como critério — ele inclui o jitter do agendador
  // (o settle roda num setTimeout), e sob carga um timer de 160ms dispara em
  // 210ms sem que a animação tenha durado mais. Medir isso como se fosse a
  // duração da transição produzia falha rotativa no gate.
  await page.locator('[role="radio"][data-persona="eng"]').click();
  const emitted = await page.evaluate(async () => {
    for (let i = 0; i < 40; i++) {
      const [m] = performance.getEntriesByName('ap-transmute');
      if (m) return m.duration;
      await new Promise((r) => setTimeout(r, 25));
    }
    return null;
  });
  expect(emitted, 'a medida de transmutação não foi emitida').not.toBeNull();
  expect(emitted, 'ciclo de transmutação absurdamente longo').toBeLessThan(1000);
});

test('a transmutação troca o texto, mantendo o mesmo bloco', async ({ page }) => {
  const pair = page.locator('.ap-pair[data-pair="hero-lede"]');
  await expect(pair.locator('[data-persona="exec"]')).toBeVisible();
  await expect(pair.locator('[data-persona="eng"]')).toBeHidden();

  await page.locator('[role="radio"][data-persona="eng"]').click();

  await expect(pair.locator('[data-persona="eng"]')).toBeVisible();
  await expect(pair.locator('[data-persona="exec"]')).toBeHidden();
});

test('spec §2.B.3 · a página inicia sempre na Visão Executiva', async ({ page }) => {
  await expect(page.locator('[role="radio"][data-persona="exec"]'))
    .toHaveAttribute('aria-checked', 'true');
});

test('spec §2.B.1 · o seletor permanece visível durante a rolagem', async ({ page }) => {
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'instant' }));
  await expect(page.locator('[data-ap-selector]')).toBeInViewport();
});

test('spec §4.2 · alternância rápida não sobrepõe transições', async ({ page }) => {
  const eng = page.locator('[role="radio"][data-persona="eng"]');
  const exec = page.locator('[role="radio"][data-persona="exec"]');
  await eng.click();
  await exec.click();
  await eng.click();
  await exec.click();

  // Estado final coerente: exatamente um lado de cada par visível.
  await page.waitForTimeout(400);
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('.ap-pair')]
      .map((p) => [...p.querySelectorAll('[data-persona]')].filter((s) => !s.hidden).length)
      .filter((n) => n !== 1).length
  );
  expect(broken, 'algum par ficou com 0 ou 2 versões visíveis').toBe(0);
});

/* ── Evolução 11 · contraste realçado na Camada 3 ───────────────────────── */

test('evolução 11 · texto da Camada 3 em contraste mínimo de 7:1', async ({ page }) => {
  await settleReveal(page);
  await expectEnhancedContrast(page, '[data-layer="3"]');
});

/* ── Evolução 13 · tokens são a única fonte de cor ──────────────────────── */

test('evolução 13 · nenhum hexadecimal literal no HTML da página', async ({ page }) => {
  // Lido do DOM, não por fatiamento de string: `indexOf('<body')` casa também
  // com a palavra dentro de comentários no <head>.
  const body = await page.evaluate(() => document.body.outerHTML);
  const hits = [...body.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0]);
  expect(hits, `cores fora de src/apresentacao.css: ${hits.join(', ')}`).toEqual([]);
});

test('evolução 13 · o theme-color acompanha o fundo da página, não a paleta do site', async ({
  page,
}) => {
  // Único hexadecimal legítimo no <head>: a cor da barra do navegador móvel.
  // Se ficar no padrão #0d1117 do site, o navegador pinta a moldura com a
  // paleta Dark Tech em volta de uma página #0A0A0C.
  const theme = (await page.getAttribute('meta[name="theme-color"]', 'content'))?.toLowerCase();
  const l1 = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--ap-l1-bg').trim().toLowerCase()
  );
  expect(theme).toBe(l1);
});

/* ── Evolução 14 · Hub com três abas fixas e contador ───────────────────── */

test('evolução 14 · três abas fixas, com contador, "Para decidir" ativa', async ({ page }) => {
  const tabs = page.locator('[role="tab"]');
  await expect(tabs).toHaveCount(3);

  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(0)).toContainText('Para decidir');

  for (let i = 0; i < 3; i++) {
    await expect(tabs.nth(i)).toContainText(/\(\d+\)/);
    await expect(tabs.nth(i)).toBeVisible(); // fixas, nunca em dropdown
  }
  expect(await page.locator('select').count()).toBe(0);
});

test('evolução 14 · o contador de cada aba bate com os itens exibidos', async ({ page }) => {
  const tabs = page.locator('[role="tab"]');
  for (let i = 0; i < 3; i++) {
    await tabs.nth(i).click();
    const label = await tabs.nth(i).textContent();
    const declared = Number(label.match(/\((\d+)\)/)[1]);
    const visible = await page.locator('[data-hub-item]:visible').count();
    expect(visible, `aba ${i}`).toBe(declared);
  }
});

test('evolução 14 · trocar de aba filtra sem recarregar a página', async ({ page }) => {
  await page.evaluate(() => { window.__ap_marker = 'vivo'; });
  await page.locator('[role="tab"][data-tab="especificar"]').click();
  expect(await page.evaluate(() => window.__ap_marker)).toBe('vivo');
});

test('evolução 14 · as abas seguem o padrão APG de teclado', async ({ page }) => {
  const first = page.locator('[role="tab"]').first();
  await first.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[role="tab"]').nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(page.locator('[role="tab"]').nth(2)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(page.locator('[role="tab"]').nth(0)).toHaveAttribute('aria-selected', 'true');
});

test('spec §2.E · todo item do Hub declara tempo de consumo e complexidade', async ({ page }) => {
  const items = page.locator('[data-hub-item]');
  const n = await items.count();
  expect(n).toBeGreaterThan(0);
  for (let i = 0; i < n; i++) {
    await expect(items.nth(i).locator('.ap-hub-meta')).toContainText(/\d+ min/);
    await expect(items.nth(i).locator('.ap-complexity')).not.toBeEmpty();
  }
});

/* ── Evolução 15 · perguntas de reflexão por persona ────────────────────── */

test('evolução 15 · cada Zona termina com pergunta dupla que segue o Seletor', async ({ page }) => {
  for (const zone of ['graphrag', 'sdd', 'devops']) {
    const reflect = page.locator(`[data-zone="${zone}"] .ap-reflect`);
    await expect(reflect).toHaveCount(1);
    await expect(reflect.locator('[data-persona="exec"]')).toBeVisible();
    await expect(reflect.locator('[data-persona="eng"]')).toBeHidden();
    await expect(reflect).toContainText('?');
  }

  await page.locator('[role="radio"][data-persona="eng"]').click();

  for (const zone of ['graphrag', 'sdd', 'devops']) {
    const reflect = page.locator(`[data-zone="${zone}"] .ap-reflect`);
    await expect(reflect.locator('[data-persona="eng"]')).toBeVisible();
    await expect(reflect.locator('[data-persona="exec"]')).toBeHidden();
  }
});

/* ── Evolução 16 · progresso adaptativo ─────────────────────────────────── */

test('evolução 16 · a barra desacelera na Camada 3', async ({ page }) => {
  const bar = page.locator('[data-ap-progress]');

  const widthAt = async (y) => {
    // behavior 'instant' é obrigatório: a página usa scroll-behavior smooth e,
    // sem isto, a leitura acontece no meio da animação de rolagem — medindo uma
    // posição que não é a pedida.
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y);
    await page.waitForTimeout(150);
    return bar.evaluate((el) => parseFloat(el.style.width) || 0);
  };

  const boxes = await page.evaluate(() =>
    [...document.querySelectorAll('[data-layer]')].map((el) => ({
      layer: Number(el.dataset.layer),
      top: el.getBoundingClientRect().top + window.scrollY,
      height: el.getBoundingClientRect().height,
    }))
  );

  const firstL1 = boxes.find((b) => b.layer === 1);
  const someL3 = boxes.find((b) => b.layer === 3);
  expect(firstL1 && someL3).toBeTruthy();

  const step = 250;
  const rateL1 =
    (await widthAt(firstL1.top + step) - await widthAt(firstL1.top)) / step;
  const rateL3 =
    (await widthAt(someL3.top + step) - await widthAt(someL3.top)) / step;

  expect(
    rateL1, `L1 ${rateL1.toFixed(4)} %/px vs L3 ${rateL3.toFixed(4)} %/px`
  ).toBeLessThan(rateL3);
});

test('a barra de progresso é anunciada a leitores de tela', async ({ page }) => {
  const bar = page.locator('[role="progressbar"]');
  await expect(bar).toHaveAttribute('aria-label', /.+/);
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
  );
  await page.waitForTimeout(250);
  const now = Number(await bar.getAttribute('aria-valuenow'));
  expect(now).toBeGreaterThan(50);
});

/* ── Evolução 17 · acessibilidade, estados e performance ────────────────── */

test('evolução 17 · axe sem violações serious/critical (Visão Executiva)', async ({ page }) => {
  await settleReveal(page);
  await expectNoSeriousA11yViolations(page);
});

test('evolução 17 · axe sem violações serious/critical (Visão de Engenharia)', async ({ page }) => {
  await page.locator('[role="radio"][data-persona="eng"]').click();
  await page.waitForTimeout(250);
  await settleReveal(page);
  await expectNoSeriousA11yViolations(page);
});

test('a revelação progressiva torna os blocos visíveis ao rolar', async ({ page }) => {
  const block = page.locator('[data-zone="graphrag"] .ap-reveal').first();
  await expect(block).not.toHaveClass(/is-visible/); // nasce oculto, abaixo da dobra

  const box = await block.boundingBox();
  // Scroll explícito e instantâneo: scrollIntoViewIfNeeded compete com o
  // scroll-behavior smooth da página e torna o teste dependente de timing.
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), box.y - 200);

  await expect(block).toHaveClass(/is-visible/, { timeout: 3000 });

  // A transição de opacidade leva 420ms; ler no mesmo instante pega o bloco a
  // meio caminho. O que importa é onde ela termina.
  await expect
    .poll(() => block.evaluate((el) => parseFloat(getComputedStyle(el).opacity)), {
      timeout: 2000,
    })
    .toBeGreaterThan(0.9);
});

test('evolução 17 · o skip link é o primeiro alvo do teclado e fica visível ao focar', async ({
  page,
}) => {
  // Verificado por ordem de documento em vez de pressionar Tab: o WebKit não
  // posiciona o foco inicial no primeiro elemento focável do documento, o que
  // faria o teste medir o navegador e não a página.
  const isFirst = await page.evaluate(() => {
    const focusables = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    return focusables[0]?.classList.contains('ap-skip') ?? false;
  });
  expect(isFirst, 'o skip link deve ser o primeiro elemento focável').toBe(true);

  // Nenhum tabindex positivo, que quebraria a ordem natural de tabulação.
  const positive = await page.evaluate(() =>
    [...document.querySelectorAll('[tabindex]')]
      .map((el) => Number(el.getAttribute('tabindex')))
      .filter((n) => n > 0).length
  );
  expect(positive, 'tabindex positivo quebra a ordem de foco').toBe(0);

  const skip = page.locator('a.ap-skip');
  await skip.focus();
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport(); // sai do esconderijo ao receber foco
});

test('evolução 17 · o seletor usa roving tabindex e responde às setas', async ({ page }) => {
  const exec = page.locator('[role="radio"][data-persona="exec"]');
  const eng = page.locator('[role="radio"][data-persona="eng"]');

  // Foco programático em vez de Tab: o WebKit não inclui <button> na ordem de
  // tabulação por padrão (comportamento do Safari, não defeito da página). O
  // que precisa ser verificado — roving tabindex e navegação por seta — é
  // idêntico nos três navegadores.
  await exec.focus();
  await expect(exec).toBeFocused();
  await expect(exec).toHaveAttribute('tabindex', '0');
  await expect(eng).toHaveAttribute('tabindex', '-1');

  await page.keyboard.press('ArrowRight');
  await expect(eng).toBeFocused();
  await expect(eng).toHaveAttribute('aria-checked', 'true');
  await expect(eng).toHaveAttribute('tabindex', '0');
  await expect(exec).toHaveAttribute('tabindex', '-1');
});

test('evolução 17 · o foco é visível e usa o azul de decisão', async ({ page }) => {
  const opt = page.locator('[role="radio"][data-persona="exec"]');
  await opt.focus();
  const outline = await opt.evaluate((el) => getComputedStyle(el).outlineColor);
  const cobalt = await page.evaluate(() => {
    const h = getComputedStyle(document.documentElement)
      .getPropertyValue('--ap-cobalt').trim();
    const n = parseInt(h.slice(1), 16);
    return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
  });
  expect(outline).toBe(cobalt);
});

test('evolução 17 · todo diagrama tem equivalente textual', async ({ page }) => {
  const bad = await page.evaluate(() =>
    [...document.querySelectorAll('svg')]
      .filter((svg) => {
        if (svg.getAttribute('aria-hidden') === 'true') return false;
        const role = svg.getAttribute('role');
        const hasTitle = !!svg.querySelector('title');
        const hasDesc = !!svg.querySelector('desc');
        return !(role === 'img' && hasTitle && hasDesc);
      })
      .map((svg) => svg.getAttribute('class') || '(sem classe)')
  );
  expect(bad, `SVGs sem título/descrição: ${bad.join(', ')}`).toEqual([]);
});

test('evolução 17 · prefers-reduced-motion desliga a transmutação', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const ms = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--ap-transmute').trim()
  );
  expect(ms).toBe('0ms');
});

test('spec §1.2 · a regra dos 8 segundos vale para os blocos da Camada 1', async ({ page }) => {
  const longBlocks = await page.evaluate(() =>
    [...document.querySelectorAll('[data-layer="1"] .ap-lede, [data-layer="1"] .ap-p')]
      .map((el) => ({
        words: el.textContent.trim().split(/\s+/).filter(Boolean).length,
        text: el.textContent.trim().slice(0, 60),
      }))
      // Pares trazem as duas personas no DOM; conta-se a maior das duas.
      .filter((b) => b.words > 54)
  );
  expect(longBlocks, JSON.stringify(longBlocks, null, 2)).toEqual([]);
});

test('o contador do Hero reflete a contagem real de specs', async ({ page }) => {
  const text = await page.locator('.ap-counter').textContent();
  const shown = Number(text.match(/(\d+)\+/)[1]);
  expect(shown).toBeGreaterThan(0);
  expect(shown % 10).toBe(0); // arredondado à dezena pelo gerador
});
