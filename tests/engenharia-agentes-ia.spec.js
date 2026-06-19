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

  test('WU-11/T2: quiz dá feedback que ensina e conta acertos únicos', async ({ page }) => {
    await page.goto(PATH);
    const quiz = page.locator('[data-eai-quiz]');
    await expect(quiz.locator('[data-quiz-q]')).toHaveCount(8);
    await expect(quiz.locator('[data-quiz-score]')).toHaveText('0');

    const q1 = quiz.locator('[data-quiz-q]').first();
    const opts1 = q1.locator('.eai-quiz__opts button');
    // resposta errada (opção A): feedback específico que explica o erro, score continua 0
    await opts1.nth(0).click();
    await expect(q1.locator('[data-quiz-fb]')).toHaveAttribute('data-state', 'wrong');
    await expect(q1.locator('[data-quiz-fb]')).toContainText('fluxo');
    await expect(quiz.locator('[data-quiz-score]')).toHaveText('0');

    // resposta certa (opção B): score 1, nomeia o princípio, não conta duas vezes
    await opts1.nth(1).click();
    await expect(q1.locator('[data-quiz-fb]')).toHaveAttribute('data-state', 'correct');
    await expect(q1.locator('[data-quiz-fb]')).toContainText('Exato');
    await expect(q1.locator('.eai-quiz__fb-link')).toContainText('P1');
    await expect(quiz.locator('[data-quiz-score]')).toHaveText('1');
    await opts1.nth(1).click();
    await expect(quiz.locator('[data-quiz-score]')).toHaveText('1');
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

  test('WU-10: pipeline troca de cenário (feliz/saga/dlq/confiança) e atualiza descrição', async ({ page }) => {
    await page.goto(PATH);
    const flow = page.locator('[data-eai-flow]');
    await expect(flow).toHaveAttribute('data-scenario', 'feliz');
    await expect(flow.locator('[role="tab"]')).toHaveCount(4);
    await expect(page.locator('[data-flow-desc]')).toContainText('determinístico');

    await flow.locator('[role="tab"][data-scenario="dlq"]').click();
    await expect(flow).toHaveAttribute('data-scenario', 'dlq');
    await expect(flow.locator('[role="tab"][data-scenario="dlq"]')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-flow-desc]')).toContainText('Dead-Letter');

    await flow.locator('[role="tab"][data-scenario="confianca"]').click();
    await expect(page.locator('[data-flow-desc]')).toContainText('98%');
  });

  test('WU-12: playground monta arquitetura e avalia por regras', async ({ page }) => {
    await page.goto(PATH);
    const pg = page.locator('[data-eai-pg]');
    await expect(pg).toBeVisible();
    await expect(pg.locator('.eai-pg__palette button')).toHaveCount(10);

    // só LLM → veredito de risco crítico (sem schema/ledger)
    await pg.locator('.eai-pg__palette button[data-comp="LLM"]').click();
    await expect(pg.locator('[data-chip="LLM"]')).toBeVisible();
    await expect(pg.locator('[data-pg-verdict]')).toHaveAttribute('data-sev', 'bad');

    // adicionar guardrails de governança melhora o veredito
    for (const c of ['Schema', 'Ledger', 'BDD', 'Observabilidade']) {
      await pg.locator(`.eai-pg__palette button[data-comp="${c}"]`).click();
    }
    await expect(pg.locator('[data-pg-verdict]')).toContainText('Excelente governança');

    // remover via chip volta a degradar (remove Ledger)
    await pg.locator('[data-chip="Ledger"]').click();
    await expect(pg.locator('[data-chip="Ledger"]')).toHaveCount(0);
    await expect(pg.locator('[data-pg-verdict]')).toHaveAttribute('data-sev', 'bad');
  });

  test('WU-9: evals distingue Erro de Sistema × Erro de Modelo + nota LLM-as-a-judge', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.eai-evals__card--sys')).toContainText('Erro de Sistema');
    await expect(page.locator('.eai-evals__card--mdl')).toContainText('Erro de Modelo');
    await expect(page.locator('.eai-evals__note')).toContainText('offline');
  });

  test('WU-14: painel de progresso reflete capítulo aberto e score do quiz', async ({ page }) => {
    await page.goto(PATH);
    const prog = page.locator('[data-eai-prog]');
    await expect(prog).toBeVisible();

    // abrir um capítulo incrementa "capítulos abertos"
    await page.locator('#cap-1 summary').click();
    await expect(prog.locator('[data-prog-chapters]')).toHaveText('1');

    // acertar uma pergunta do quiz reflete no melhor score (Q1: opção B é a correta)
    const q1 = page.locator('[data-eai-quiz] [data-quiz-q]').first();
    await q1.locator('.eai-quiz__opts button').nth(1).click();
    await expect(prog.locator('[data-prog-quiz]')).toHaveText('1');

    // limpar progresso zera
    await prog.locator('[data-prog-reset]').click();
    await expect(prog.locator('[data-prog-chapters]')).toHaveText('0');
    await expect(prog.locator('[data-prog-quiz]')).toHaveText('0');
  });

  test('WU-6: referência — glossário e caso SocialSelling (pipeline M1–M5)', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.eai-gloss > div').first()).toBeVisible();
    await expect(page.locator('.eai-gloss dt')).toHaveCount(14);
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
    // árvore interativa (T6) renderizada por JS com as pastas-chave no 1º nível
    const repo = page.locator('[data-eai-repo]');
    await expect(repo).toBeVisible();
    for (const f of ['.ai/', 'docs/', 'tests/', 'scripts/', '.github/']) {
      await expect(repo.locator('.eai-repo__name', { hasText: f }).first()).toBeVisible();
    }
    // Regra de Ouro (danger) e alerta financeiro (warn) — escopados à seção (há callouts iguais nos Pilares)
    await expect(page.locator('#governanca .eai-callout--danger')).toContainText('versione o estado cognitivo');
    await expect(page.locator('#governanca .eai-callout--warn')).toContainText('financeiros');
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
    // conteúdo real expandido (T1): analogia do banco de dados em transações
    await expect(first.locator('.eai-chap__body')).toContainText('banco');

    // links internos da jornada apontam para princípios/governança existentes
    await first.locator('summary').click(); // fecha
    await page.locator('#cap-10 summary').click();
    const gov = page.locator('#cap-10 .eai-chap__link');
    await expect(gov).toHaveAttribute('href', '#governanca');
  });

  test('WU-16: diagrama de fluxo com equivalente textual de 5 etapas', async ({ page }) => {
    await page.goto(PATH);
    const df = page.locator('#fluxo .eai-df');
    await expect(df.locator('svg.eai-df__svg')).toHaveCount(1);
    // SVG decorativo (aria-hidden); o conteúdo acessível é a lista ordenada
    await expect(df.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    const steps = page.locator('#fluxo .eai-df__steps li');
    await expect(steps).toHaveCount(5);
    await expect(steps.nth(2)).toContainText('resíduo');
    await expect(steps.nth(4)).toContainText('auditável');
  });

  test('WU-15: janelas de código reais com realce de sintaxe aplicado', async ({ page }) => {
    await page.goto(PATH);
    const wins = page.locator('.eai-cw');
    await expect(wins).toHaveCount(3);
    // nomes de arquivo presentes
    await expect(page.locator('.eai-cw__file', { hasText: 'pipeline.py' })).toBeVisible();
    await expect(page.locator('.eai-cw__file', { hasText: 'finops.py' })).toBeVisible();
    // o realce de sintaxe (eai-code.js) injeta tokens
    await expect(page.locator('.eai-cw code .tok-k').first()).toBeVisible();
    await expect(page.locator('.eai-cw code .tok-c').first()).toBeVisible();
    // conteúdo técnico real (FinOps)
    await expect(page.locator('#codigo')).toContainText('daily_cap');
  });

  test('Pilares: cinco accordions, nav, MCP/A2UI e regra de transição', async ({ page }) => {
    await page.goto(PATH);
    // nav aponta para a nova seção
    await expect(page.locator('.eai-nav__trail a[href="#pilares"]')).toBeVisible();
    // cinco pilares com âncoras estáveis
    const pilars = page.locator('#pilares .eai-pilar');
    await expect(pilars).toHaveCount(5);
    for (let n = 1; n <= 5; n++) {
      await expect(page.locator(`#pilar-${n}`)).toHaveCount(1);
    }
    // accordion abre e revela conteúdo
    const p3 = page.locator('#pilar-3');
    await expect(p3).not.toHaveAttribute('open', /.*/);
    await p3.locator('summary').click();
    await expect(p3.locator('.eai-pilar__body')).toBeVisible();
    await expect(p3).toContainText('Model Context Protocol');
    await expect(p3).toContainText('menor privilégio');
    // nota de limitação do A2UI presente
    await expect(p3.locator('.eai-callout--warn')).toContainText('A2UI');
    // regra de transição no Pilar 5
    await page.locator('#pilar-5 summary').click();
    await expect(page.locator('#pilar-5 .eai-callout--danger')).toContainText('regra de transição', { ignoreCase: true });
  });

  test('Pilares: stepper de maturidade troca de estágio e atualiza o painel', async ({ page }) => {
    await page.goto(PATH);
    const mat = page.locator('[data-eai-maturity]');
    await expect(mat.locator('[role="tab"]')).toHaveCount(4);
    // estágio 0 selecionado por padrão
    await expect(mat.locator('[data-maturity-stage="0"]')).toHaveAttribute('aria-selected', 'true');
    await expect(mat.locator('[data-maturity-panel]')).toContainText('Mágica de Prompt');
    // selecionar estágio 3 atualiza o painel
    await mat.locator('[data-maturity-stage="3"]').click();
    await expect(mat.locator('[data-maturity-stage="3"]')).toHaveAttribute('aria-selected', 'true');
    await expect(mat.locator('[data-maturity-panel]')).toContainText('Governado');
    await expect(mat.locator('[data-maturity-panel]')).toContainText('Próximo passo');
  });

  test('Calibrador: quadrante reage aos eixos e alerta de vazamento de modo', async ({ page }) => {
    await page.goto(PATH);
    const cal = page.locator('[data-eai-calibrador]');
    await expect(cal).toBeVisible();
    // estado inicial (custo/rev baixos) → exploração
    await expect(cal).toHaveAttribute('data-quadrant', 'exploracao');
    await expect(cal.locator('[data-cal-result]')).toContainText('Exploração');
    // alerta de vazamento escondido até marcar dependência de produção
    await expect(cal.locator('[data-cal-leak]')).toBeHidden();
    await cal.locator('[data-cal="depended"]').check();
    await expect(cal.locator('[data-cal-leak]')).toBeVisible();
    await expect(cal.locator('[data-cal-leak]')).toContainText('Vazamento de modo');
    // subir os dois eixos → missão crítica, e o alerta some (rigor já assumido)
    await cal.locator('[data-cal="cost"]').fill('90');
    await cal.locator('[data-cal="cost"]').dispatchEvent('input');
    await cal.locator('[data-cal="reversibility"]').fill('90');
    await cal.locator('[data-cal="reversibility"]').dispatchEvent('input');
    await expect(cal).toHaveAttribute('data-quadrant', 'missao-critica');
    await expect(cal.locator('[data-cal-leak]')).toBeHidden();
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

  test('T3/v2: simulador tem unidades, tooltips com escala, nota de base e log cumulativo', async ({ page }) => {
    await page.goto(PATH);
    const sim = page.locator('[data-eai-sim]');

    // unidade "pts" visível em cada métrica
    await expect(sim.locator('[data-metric="custo"] .eai-meter__unit')).toHaveText('pts');
    await expect(sim.locator('.eai-meter__unit')).toHaveCount(6);

    // nota de base sempre visível
    await expect(sim.locator('.eai-sim__baseline-note')).toContainText('Custo parte de 30');

    // tooltip ⓘ revela definição + escala
    await sim.locator('[data-metric-info="risco"]').click();
    const tip = sim.locator('[data-metric-tooltip="risco"]');
    await expect(tip).toBeVisible();
    await expect(tip).toContainText('escala 0 a 100 pts');

    // log cumulativo: autonomia 0 + tudo desmarcado → linha de autonomia presente
    await sim.locator('[data-sim="autonomy"]').fill('0');
    await sim.locator('[data-sim="autonomy"]').dispatchEvent('input');
    await sim.locator('[data-sim="schemas"]').uncheck();
    await sim.locator('[data-sim="bdd"]').uncheck();
    const log = sim.locator('[data-sim-log-list]');
    await expect(log.locator('#log-autonomia')).toContainText('Autonomia 0%');

    // marcar Cache adiciona a linha; marcar BDD mantém as duas (cumulativo)
    await sim.locator('[data-sim="cache"]').check();
    await expect(log.locator('#log-cache')).toContainText('Cache');
    await sim.locator('[data-sim="bdd"]').check();
    await expect(log.locator('#log-cache')).toBeVisible();
    await expect(log.locator('#log-bdd')).toBeVisible();

    // desmarcar Cache remove apenas a linha dele
    await sim.locator('[data-sim="cache"]').uncheck();
    await expect(log.locator('#log-cache')).toHaveCount(0);
    await expect(log.locator('#log-bdd')).toBeVisible();
  });

  test('T-A/v2: árvore do repositório começa totalmente expandida', async ({ page }) => {
    await page.goto(PATH);
    const repo = page.locator('[data-eai-repo]');
    // sem clicar, um arquivo de nível profundo já está visível
    await expect(repo.locator('.eai-repo__row', { hasText: 'PROGRESS.md' })).toBeVisible();
    await expect(repo.locator('.eai-repo__row', { hasText: 'quality-gate.sh' })).toBeVisible();
    // clicar numa pasta recolhe os filhos
    await repo.locator('.eai-repo__row', { hasText: '.ai/' }).click();
    await expect(repo.locator('.eai-repo__row', { hasText: 'PROGRESS.md' })).toBeHidden();
  });

  test('C/v2: exemplos multi-domínio (contratos, saúde, moderação) e rodapé "ilustrados"', async ({ page }) => {
    await page.goto(PATH);
    // código genérico (sem variável "lead" como principal)
    await expect(page.locator('#codigo')).toContainText('run_pipeline(item, llm)');
    // quiz multi-domínio
    await expect(page.locator('[data-qid="q1"]')).toContainText('contratos jurídicos');
    await expect(page.locator('[data-qid="q2"]')).toContainText('triagem clínica');
    await expect(page.locator('[data-qid="q3"]')).toContainText('moderação de conteúdo');
    await expect(page.locator('[data-qid="q4"]')).toContainText('posts');
    // contexto do pipeline e nota de domínio no caso
    await expect(page.locator('.eai-flow__context')).toContainText('domínios diferentes');
    await expect(page.locator('.eai-case__domain-note')).toContainText('a arquitetura permanece');
    // caso ainda menciona SocialSelling; rodapé "ilustrados"
    await expect(page.locator('.eai-case')).toContainText('SocialSelling');
    await expect(page.locator('.eai-footer__meta')).toContainText('ilustrados');
  });

  test('T2: quiz Q2 (Open-World) dá feedback específico para A, B e C', async ({ page }) => {
    await page.goto(PATH);
    const q2 = page.locator('[data-eai-quiz] [data-quiz-q][data-qid="q2"]');
    const opts = q2.locator('.eai-quiz__opts button');
    const fb = q2.locator('[data-quiz-fb]');

    await opts.nth(0).click(); // A
    await expect(fb).toContainText('Mundo Fechado');
    await opts.nth(2).click(); // C
    await expect(fb).toContainText(/m[ée]dio|fabricad/i);
    await opts.nth(1).click(); // B (correta)
    await expect(fb).toHaveAttribute('data-state', 'correct');
    await expect(fb).toContainText('Open-World');
  });

  test('T5: playground mostra a última ação e avisos por componente', async ({ page }) => {
    await page.goto(PATH);
    const pg = page.locator('[data-eai-pg]');
    // RAG sem Schema → última ação + aviso específico de risco
    await pg.locator('.eai-pg__palette button[data-comp="RAG"]').click();
    await expect(pg.locator('[data-pg-last-action]')).toContainText('RAG');
    await expect(pg.locator('[data-pg-warnings]')).toContainText('RAG sem Schema');
    // remover BDD mostra o impacto no critério de "pronto"
    await pg.locator('.eai-pg__palette button[data-comp="BDD"]').click();
    await pg.locator('[data-chip="BDD"]').click();
    await expect(pg.locator('[data-pg-last-action]')).toContainText('percepção');
  });

  test('T4: pipeline tem glossário inline de Saga, DLQ e Confiança + realce da falha', async ({ page }) => {
    await page.goto(PATH);
    const gloss = page.locator('.eai-flow__gloss');
    await expect(gloss).toContainText('Saga');
    await expect(gloss).toContainText('Dead-Letter Queue');
    await expect(gloss).toContainText('Confiança');
    const flow = page.locator('[data-eai-flow]');
    await flow.locator('[role="tab"][data-scenario="saga"]').click();
    await expect(flow).toHaveAttribute('data-fail', 'm4');
  });

  test('T6: anatomia — clicar num item atualiza o painel lateral', async ({ page }) => {
    await page.goto(PATH);
    const repo = page.locator('[data-eai-repo]');
    await expect(repo).toBeVisible();
    // árvore já expandida (v2): PROGRESS.md visível sem clicar; clicar atualiza o painel
    const progress = repo.locator('.eai-repo__row', { hasText: 'PROGRESS.md' });
    await expect(progress).toBeVisible();
    await progress.click();
    await expect(repo.locator('[data-repo-panel]')).toContainText('recomeça do zero');
  });

  test('T6: em viewport mobile o painel aparece abaixo da árvore (não sobreposto)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    const tb = await page.locator('.eai-repo__tree').boundingBox();
    const pb = await page.locator('[data-repo-panel]').boundingBox();
    expect(pb.y).toBeGreaterThanOrEqual(tb.y + tb.height - 2);
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
