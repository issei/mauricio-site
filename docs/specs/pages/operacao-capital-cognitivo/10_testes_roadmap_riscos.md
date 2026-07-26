# 10 — Testes, Roadmap e Riscos

> Cobre o entregável **13 (Plano de testes Playwright, roadmap MVP→V2→V3 e matriz de riscos)**.

---

## 1. Plano de Testes Playwright

Arquivo: `tests/operacao-capital-cognitivo.spec.js`

### 1.1 Smoke Tests (obrigatórios para qualquer PR)

```javascript
import { test, expect } from '@playwright/test';

test.describe('Operação Capital Cognitivo — Smoke Tests', () => {

  test('deve carregar a página com HTTP 200', async ({ page }) => {
    const response = await page.goto('/operacao-capital-cognitivo.html');
    expect(response.status()).toBe(200);
  });

  test('deve ter title e meta description corretos', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    const title = await page.title();
    expect(title).toContain('Operação Capital Cognitivo');
    expect(title.length).toBeLessThan(80);

    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThan(200);
  });

  test('HUD deve estar visível e conter elementos obrigatórios', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.click('#btn-start'); // botão de início na tela de intro
    await expect(page.locator('#hud')).toBeVisible();
    await expect(page.locator('#hud-cash')).toBeVisible();
    await expect(page.locator('#hud-quarter')).toContainText('Q');
  });

  test('deve ter link canonical correto', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('operacao-capital-cognitivo');
  });

});
```

### 1.2 Testes Funcionais — Capítulo 1

```javascript
test.describe('Capítulo 1 — O Mistério dos R$ 37k', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.click('#btn-start');
  });

  test('deve exibir fatura interativa com 5 linhas colapsadas', async ({ page }) => {
    await expect(page.locator('#invoice-explorer details')).toHaveCount(5);
    // Por padrão, todas fechadas
    const openDetails = await page.locator('#invoice-explorer details[open]').count();
    expect(openDetails).toBe(0);
  });

  test('ao expandir linha de Revisão Humana, deve revelar o cálculo de horas', async ({ page }) => {
    await page.click('#invoice-human summary');
    await expect(page.locator('#invoice-human-detail')).toBeVisible();
    await expect(page.locator('#invoice-human-detail')).toContainText('R$ 120');
  });

  test('após investigar todas as linhas, gráfico de pizza deve aparecer', async ({ page }) => {
    const details = page.locator('#invoice-explorer details summary');
    const count = await details.count();
    for (let i = 0; i < count; i++) {
      await details.nth(i).click();
    }
    await expect(page.locator('#tco-pie-chart')).toBeVisible();
  });

  test('após gráfico, card EVID_01 deve ser desbloqueado', async ({ page }) => {
    // Simular conclusão do capítulo 1
    await page.evaluate(() => window.__DEBUG_completeChapter(1));
    await expect(page.locator('[data-evidence-id="EVID_01"]')).not.toHaveClass(/locked/);
  });

});
```

### 1.3 Testes Funcionais — Digital Twin Engine

```javascript
test.describe('Digital Twin Engine — Lógica de Simulação', () => {

  test('Model-Lite deve aumentar humanReworkCost vs. Model-Pro', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.click('#btn-start');

    // Capítulo 2: escolher Model-Lite
    await page.evaluate(() => window.__DEBUG_completeChapter(1));
    await page.click('#choice-model-lite');
    await page.click('#btn-run-simulation');

    const humanCost = await page.evaluate(() => window.__DEBUG_getState().finances.humanReworkCost);
    expect(humanCost).toBeGreaterThan(15_000);
  });

  test('RouteLLM ativado com slmRatio 70% deve reduzir apiCost', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    // Ativar RouteLLM
    await page.check('#ctrl-routellm');
    await page.fill('#ctrl-slm-ratio', '70');

    const stateBefore = await page.evaluate(() => window.__DEBUG_getState());
    await page.click('#btn-advance-quarter');

    const stateAfter = await page.evaluate(() => window.__DEBUG_getState());
    expect(stateAfter.finances.apiCost).toBeLessThan(stateBefore.finances.apiCost * 0.8);
  });

  test('testTimeComputeLevel 5 em carga simples deve ativar overthinkingPenalty', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    await page.evaluate(() => window.__DEBUG_setWorkloadComplexity(1)); // carga simples

    await page.fill('#ctrl-ttc', '5');
    await page.click('#btn-advance-quarter');

    const state = await page.evaluate(() => window.__DEBUG_getState());
    // Com carga simples e TTC=5: Rm < 0.95 mesmo com boa stack
    expect(state.operations.firstPassAccuracy).toBeLessThan(0.95);
  });

  test('cashBalance ≤ 0 deve retornar FAILURE_CASH', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_setState({ finances: { cashBalance: -1 } }));
    await page.evaluate(() => window.__DEBUG_skipToChapter(6));

    await expect(page.locator('#scene-failure')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('#scene-failure')).toContainText('insolvência');
  });

});
```

### 1.3b Testes dos Conceitos v4.1 (V_core, Context Rot, Cache, Cascata, RAG real)

```javascript
test.describe('Conceitos v4.1 — Motor', () => {

  test('V_core é não-linear no custo humano', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    // Custo humano com V_core baixo vs. alto, mantendo Rm e volume constantes
    const low = await page.evaluate(() => window.__DEBUG_humanCostAtVcore(40));
    const high = await page.evaluate(() => window.__DEBUG_humanCostAtVcore(80));
    // Dobrar V_core deve MAIS que dobrar o fator de fadiga incremental (termo quadrático)
    expect(high / low).toBeGreaterThan(2);
  });

  test('Context Rot > 50k reduz firstPassAccuracy', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    await page.fill('#ctrl-context-tokens', '8000');
    await page.click('#btn-advance-quarter');
    const rmLow = await page.evaluate(() => window.__DEBUG_getState().operations.firstPassAccuracy);

    await page.evaluate(() => window.__DEBUG_reset());
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    await page.fill('#ctrl-context-tokens', '100000');
    await page.click('#btn-advance-quarter');
    const rmHigh = await page.evaluate(() => window.__DEBUG_getState().operations.firstPassAccuracy);

    expect(rmLow - rmHigh).toBeGreaterThan(0.08); // ≈ 0.10 de penalidade
    await expect(page.locator('#context-rot-meter')).toBeVisible();
  });

  test('Cache semântico reduz apiCost mas não altera Rm', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    const before = await page.evaluate(() => window.__DEBUG_getState());
    await page.check('#ctrl-cache');
    await page.click('#btn-advance-quarter');
    const after = await page.evaluate(() => window.__DEBUG_getState());

    expect(after.finances.apiCost).toBeLessThan(before.finances.apiCost);
    expect(after.operations.firstPassAccuracy).toBeCloseTo(before.operations.firstPassAccuracy, 2);
  });

  test('Multiagente sem isolamento gera resentContextCost', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    await page.check('#ctrl-multiagent');
    await page.uncheck('#ctrl-agent-isolation');
    await expect(page.locator('#cascade-warning')).toBeVisible();
    await page.click('#btn-advance-quarter');

    const state = await page.evaluate(() => window.__DEBUG_getState());
    expect(state.finances.resentContextCost).toBeGreaterThan(0);
  });

  test('EVT_07 mitigado por isolamento de contexto', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => {
      window.__DEBUG_setState({ technical: { multiAgent: true, agentIsolation: true } });
      window.__DEBUG_setEventMock('Q3', ['EVT_07']);
    });
    await page.evaluate(() => window.__DEBUG_skipToChapter(5, 'Q3'));
    await page.click('#btn-advance-quarter');
    const state = await page.evaluate(() => window.__DEBUG_getState());
    // Isolamento limita o ricochete a ≤15% do apiCost
    expect(state.finances.resentContextCost).toBeLessThanOrEqual(state.finances.apiCost * 0.16);
  });

  test('RAG universal dá mais rerankBonus que conditional', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    await page.selectOption('#ctrl-rerank', 'conditional');
    await page.click('#btn-advance-quarter');
    const cond = await page.evaluate(() => window.__DEBUG_getState().operations.firstPassAccuracy);

    await page.evaluate(() => window.__DEBUG_reset());
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    await page.selectOption('#ctrl-rerank', 'universal');
    await page.click('#btn-advance-quarter');
    const univ = await page.evaluate(() => window.__DEBUG_getState().operations.firstPassAccuracy);

    expect(univ).toBeGreaterThan(cond);
  });

});
```

### 1.4 Testes de Acessibilidade

```javascript
test.describe('Acessibilidade WCAG 2.2 AA', () => {

  test('sliders devem ter aria-label descritivo', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));

    const sliders = page.locator('input[type="range"]');
    const count = await sliders.count();
    for (let i = 0; i < count; i++) {
      const ariaLabel = await sliders.nth(i).getAttribute('aria-label');
      expect(ariaLabel?.length).toBeGreaterThan(10);
    }
  });

  test('dialog deve receber foco ao abrir', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_triggerEvent('EVT_01'));

    const dialog = page.locator('#event-alert-dialog');
    await expect(dialog).toBeFocused();
  });

  test('canvas do gráfico de pizza deve ter aria-label', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => window.__DEBUG_completeChapter(1));

    const canvas = page.locator('#tco-pie-chart');
    const ariaLabel = await canvas.getAttribute('aria-label');
    expect(ariaLabel?.length).toBeGreaterThan(20);
  });

  test('HUD deve ter aria-live nos contadores', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.click('#btn-start');

    const cashEl = page.locator('#hud-cash');
    expect(await cashEl.getAttribute('aria-live')).toBe('polite');
  });

});
```

### 1.5 Testes de Eventos com Mock

```javascript
test.describe('Eventos Aleatórios — Mock de Aleatoriedade', () => {

  test('EVT_04 sem RAG deve reduzir devTeamMoral em 20', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => {
      // Injetar mock: força EVT_04 em Q3
      window.__DEBUG_setEventMock('Q3', ['EVT_04']);
      window.__DEBUG_setState({ technical: { ragDepth: 1 } }); // RAG insuficiente
    });
    await page.evaluate(() => window.__DEBUG_skipToChapter(5, 'Q3'));
    await page.click('#btn-advance-quarter');

    const state = await page.evaluate(() => window.__DEBUG_getState());
    expect(state.social.devTeamMoral).toBeLessThanOrEqual(30); // 50 - 20
  });

  test('EVT_04 com RAG ≥ 3 deve mitigar impacto', async ({ page }) => {
    await page.goto('/operacao-capital-cognitivo.html');
    await page.evaluate(() => {
      window.__DEBUG_setEventMock('Q3', ['EVT_04']);
      window.__DEBUG_setState({ technical: { ragDepth: 3 }, social: { devTeamMoral: 80 } });
    });
    await page.evaluate(() => window.__DEBUG_skipToChapter(5, 'Q3'));
    await page.click('#btn-advance-quarter');

    const state = await page.evaluate(() => window.__DEBUG_getState());
    expect(state.social.devTeamMoral).toBeGreaterThan(70); // impacto leve: -5 apenas
  });

});
```

### 1.6 Contrato de Debug API

Para os testes funcionarem sem executar a UI completa, o módulo `main.js` deve expor em
`window.__DEBUG_*` quando `import.meta.env.DEV === true`:

```javascript
// main.js (apenas em modo DEV)
if (import.meta.env.DEV) {
  window.__DEBUG_getState = () => engine.getState();
  window.__DEBUG_setState = (partial) => engine._mergeState(partial);
  window.__DEBUG_skipToChapter = (n, quarter) => navigation.skipTo(n, quarter);
  window.__DEBUG_completeChapter = (n) => navigation.completeChapter(n);
  window.__DEBUG_triggerEvent = (eventId) => eventEngine.forceEvent(eventId);
  window.__DEBUG_setEventMock = (q, ids) => eventEngine.setRollMock(q, ids);
  window.__DEBUG_setWorkloadComplexity = (n) => engine.setWorkloadComplexity(n);
  window.__DEBUG_reset = () => engine.reset();
  // Helper puro para testar a não-linearidade do custo humano (fatorFadiga):
  window.__DEBUG_humanCostAtVcore = (v) => engine._humanReworkCostWith({ verificationLoad: v });
}
```

---

## 2. Roadmap de Evolução

### MVP (esta especificação)
- ✅ 6 capítulos narrativos completos
- ✅ Digital Twin Engine em memória — inclui V_core, Context Rot, cache semântico, economia real de RAG (HNSW/reindex/rerank) e cascata agêntica (re-sent context)
- ✅ Evidence Board com **11 cards** e mecânica de anexação
- ✅ Stateful Board Engine com 5 stakeholders (arguições de *Governed UI/$* e *Fadiga de Verificação*)
- ✅ **7 eventos** aleatórios com mitigações (inclui EVT_07 — cascata agêntica)
- ✅ Diagrama Sankey SVG e gráfico histórico Canvas
- ✅ Caso de Transferência (medicina)

### V2.0 — Live Benchmark Connectivity
- Integração com bancos de dados de benchmarks públicos (LMSYS, Open LLM Leaderboard).
- Atualização de preços nominais via API (com cache local).
- 3 novos capítulos: governança ambiental (Water & Carbon Footprint de IA).

### V3.0 — Multi-Player Boardroom
- Modo colaborativo (1 CFO + 1 CTO + 1 Arquiteto de IA joganado simultaneamente via WebSocket).
- Leaderboard de scores de UI/$ por configuração de stack.
- Modo "Torneio" com estado persistente em localStorage.

---

## 3. Estimativa de Esforço (Qualitativa)

| Componente | Complexidade | Estimativa |
| :-- | :-- | :-- |
| HTML base + HUD | Baixa | 4h |
| Digital Twin Engine (JS) | Alta | 16h |
| Evidence Board + mecânica de desbloqueio | Média | 8h |
| Capítulos 1 e 2 (fatura + simulação) | Média | 12h |
| Capítulo 3 (drag-and-drop + naming) | Alta | 10h |
| Capítulo 4 (bloco matemático + quiz) | Baixa | 4h |
| Capítulo 5 (sandbox + Sankey + canvas) | Alta | 20h |
| Capítulo 6 (Board Engine + side panel) | Alta | 16h |
| Animações e micro-interações | Média | 8h |
| Acessibilidade e responsividade | Média | 8h |
| Testes Playwright (spec completa) | Média | 10h |
| **Total estimado MVP** | | **~116h** |

---

## 4. Matriz de Riscos e Mitigações

| Risco | Tipo | Probabilidade | Impacto | Mitigação |
| :-- | :-- | :-- | :-- | :-- |
| **Sobrecarga cognitiva no Cap. 5** | Pedagógico | Alta | Alto | Progressive Disclosure rígido; equações formais só no Cap. 4 |
| **Drag-and-drop inacessível em mobile** | UX/A11y | Alta | Alto | Fallback click-to-place obrigatório; testes em touch device |
| **Performance do Sankey SVG** | Técnico | Média | Médio | Debounce de 150ms nos sliders antes de redraw |
| **Time lags incompreendidos pelo usuário** | Pedagógico | Média | Médio | Banner de aviso explícito no HUD quando débito técnico ≥ 40% |
| **Falsa precisão das fórmulas** | Científico | Baixa | Alto | Callout de governança científica obrigatório no Cap. 4 |
| **Usuário abandona na metade do Cap. 5** | Produto | Alta | Médio | Progresso salvo em `sessionStorage`; possibilidade de retomar |
| **Canvas de fórmula (Cap. 3) confuso** | UX | Média | Médio | Dica progressiva após 30s sem ação; botão "Mostrar dica" |
| **Estado corrompido após evento aleatório** | Técnico | Baixa | Alto | `engine.getHistory()` permite rollback para estado anterior |
| **Excesso de controles no Cap. 5 (7+ sliders/toggles)** | UX | Alta | Médio | Agrupar em acordeões ("Custo", "Qualidade", "Arquitetura Agêntica"); revelar multiagente/cache só após Q1 |
| **Falsa precisão dos novos coeficientes (V_core, cascata 62%, rot)** | Científico | Média | Alto | Callout de governança + `limitations` em cada card; números apresentados como parâmetros pedagógicos, não medições absolutas |
| **V_core percebido como métrica arbitrária** | Pedagógico | Média | Médio | Tooltip sempre lista os 5 sinais observáveis; ancorar no EVID_08 (CHI 2026) |

---

## 5. Checklists de Validação Pré-Launch

### Checklist de Engenharia
- [ ] Motor do Gêmeo Digital executa `stepQuarter` em < 16ms (Chrome DevTools Performance).
- [ ] Sankey SVG redraw completo em < 100ms após mudança de slider.
- [ ] Todos os `<canvas>` têm `aria-label` descritivo verificado com NVDA.
- [ ] Todos os `<input type="range">` operáveis por teclado e com `aria-label`.
- [ ] `sessionStorage.setItem('occ_state', ...)` salvo após cada ação crítica.
- [ ] `window.__DEBUG_*` não exposto em produção (`import.meta.env.PROD`).
- [ ] Página passa no Lighthouse com score ≥ 90 em Acessibilidade e SEO.

### Checklist Pedagógico
- [ ] O usuário **não** vê o nome "UI/$" antes de terminar o Cap. 3.
- [ ] Todos os Evidence Cards (11) exibem `evidenceLevel`, `validityContext` e `limitations`.
- [ ] A arguição do Board não aceita resposta sem Evidence Card anexado.
- [ ] O Caso de Transferência (clínica médica) usa domínio completamente diferente da narrativa.
- [ ] O Protocolo Predição → Experimentação → Reflexão ocorre no Cap. 1, Cap. 2 e Cap. 5.
- [ ] O indicador $V_{core}$ é exibido a partir do Cap. 2, com os 5 sinais em tooltip.
- [ ] O indicador de **Context Rot** só aparece quando `avgContextTokens > 50_000`.
- [ ] Callouts deixam explícito que UI/$, $V_{core}$ e Governed UI/$ são **convenções operacionais de
  FinOps em consolidação**, não normas ISO/IEEE estáticas.
- [ ] O cache semântico é apresentado como alavanca de **custo**, e a página deixa claro que ele **não**
  corrige o Context Rot (efeitos ortogonais).

### Checklist SEO
- [ ] `<title>` entre 40 e 70 caracteres.
- [ ] `<meta name="description">` entre 100 e 160 caracteres.
- [ ] `<link rel="canonical">` presente com URL correta.
- [ ] JSON-LD de `LearningResource` válido (validar em schema.org/validator).
- [ ] OG image gerada em 1200×630px.
- [ ] Único `<h1>` na página (os `<h2>` dos capítulos ocultos têm `aria-hidden="true"`).

---

### Referências cruzadas

- Componentes referenciados nos testes → [08](08_wireframes_catalogo_componentes.md)
- Debug API exposta por `main.js` → [03](03_digital_twin_engine.md)
- Mock de eventos para testes → [06](06_eventos_aleatorios_simulacao.md)
