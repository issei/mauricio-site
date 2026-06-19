# Prompt de edição pontual v2 — engenharia-agentes-ia
**Para:** Claude Code  
**Modo:** edição cirúrgica — altere apenas o especificado  
**Arquivos:** `engenharia-agentes-ia.html` · `js/eai-anatomy.js` · `js/eai-sim.js`

Leia este documento inteiro antes de qualquer implementação. Execute uma tarefa por vez na ordem indicada. Após cada tarefa, abra o site no browser e valide o comportamento antes de avançar.

---

## Tarefa A — Árvore do repositório: expandida por padrão

**Arquivo:** `js/eai-anatomy.js`

**Contexto:** a árvore é renderizada por JS — o `<div class="eai-repo__tree">` no HTML está vazio. O comportamento de expandir/recolher ao clicar deve ser preservado; apenas o estado inicial muda.

**Encontre a lógica de construção dos nós** no arquivo e localize onde o estado inicial de expansão é definido. É provável que exista uma constante, objeto ou parâmetro parecido com um dos padrões abaixo — identifique qual se aplica e aplique a correção correspondente:

**Padrão 1 — estado no objeto de dados:**
```js
// Antes (cada nó nasce fechado)
const node = { ...item, expanded: false }
// Depois
const node = { ...item, expanded: true }
```

**Padrão 2 — atributo no elemento renderizado:**
```js
// Antes
el.setAttribute('aria-expanded', 'false')
// Depois
el.setAttribute('aria-expanded', 'true')
// E garanta que os filhos não comecem com display:none ou similar
```

**Padrão 3 — classe CSS controla visibilidade:**
```js
// Antes — filhos começam sem a classe de "aberto"
childEl.classList.remove('is-open')
// Depois — na renderização inicial, adicione a classe
childEl.classList.add('is-open')
```

**Qualquer que seja o padrão encontrado:** aplique a mudança apenas no estado inicial (onde os nós são criados pela primeira vez). A função de toggle que responde ao clique não deve ser alterada — ela continua alternando entre aberto e fechado normalmente.

**Validação:**
- Ao carregar a página e rolar até "A anatomia do repositório", toda a árvore está visível sem clicar em nada
- Clicar numa pasta a fecha; clicar novamente a abre
- O painel lateral de descrição continua funcionando ao clicar em qualquer item

---

## Tarefa B — Simulador: tooltips por indicador

**Arquivos:** `engenharia-agentes-ia.html` (seção `#simulador`) · `js/eai-sim.js`

**Contexto:** as unidades `pts` já existem no HTML. O que falta são os botões `ⓘ` e seus tooltips. O log cumulativo já está estruturado no HTML — não altere sua lógica se já estiver funcionando.

### B1 — Adicionar botão ⓘ e tooltip a cada métrica

**No HTML**, para cada um dos 6 blocos `.eai-meter`, adicione o botão e o tooltip imediatamente após o `<span class="eai-meter__label">`. Implemente para as 6 métricas usando a tabela abaixo:

| Métrica | `data-metric` | Texto do tooltip |
|---------|--------------|-----------------|
| Custo | `custo` | **Custo — 0 a 100 pts.** Representa o esforço operacional relativo: tokens consumidos, reprocessamentos e chamadas desnecessárias ao modelo. O piso é 30 — qualquer sistema tem overhead de infraestrutura (rede, runtime, armazenamento). Quanto menor, melhor. |
| Confiança | `confianca` | **Confiança — 0 a 100 pts.** Probabilidade estimada de a saída estar correta e validada antes de chegar ao usuário. Contratos, testes e revisão humana aumentam; alta autonomia sem guardrails reduz. Quanto maior, melhor. |
| Velocidade | `velocidade` | **Velocidade — 0 a 100 pts.** Throughput relativo do sistema: quantos itens processa por unidade de tempo. Cache e autonomia aumentam; revisão humana e evals reduzem (mas com contrapartida de qualidade). |
| Risco | `risco` | **Risco — 0 a 100 pts.** Probabilidade de o sistema produzir uma saída inválida, propagar um erro silencioso ou se comportar de forma inesperada. O piso é 40 — risco zero não existe em produção. Quanto menor, melhor. |
| Auditabilidade | `auditabilidade` | **Auditabilidade — 0 a 100 pts.** Capacidade de rastrear por que o sistema tomou cada decisão. Sem isso, erros em produção são impossíveis de diagnosticar. Observabilidade, evals e BDD aumentam diretamente. |
| Previsibilidade | `previsibilidade` | **Previsibilidade — 0 a 100 pts.** Estabilidade do comportamento ao longo do tempo e entre execuções. Alta autonomia sem contratos reduz; schemas e BDD aumentam. Um sistema imprevisível é impossível de garantir em SLA. |

**Estrutura HTML a adicionar** (exemplo com Custo — repita o padrão para as outras 5):

```html
<!-- Antes (estado atual): -->
<div class="eai-meter" data-metric="custo" data-dir="bad">
  <span class="eai-meter__label" id="m-custo">Custo</span>
  <span class="eai-meter__bar" ...>...</span>
  <span class="eai-meter__val" data-sim-val>0</span>
  <span class="eai-meter__unit" aria-hidden="true">pts</span>
</div>

<!-- Depois: -->
<div class="eai-meter" data-metric="custo" data-dir="bad">
  <span class="eai-meter__label" id="m-custo">
    Custo
    <button class="eai-meter__info" type="button"
      aria-label="O que é a métrica Custo?"
      aria-expanded="false"
      aria-controls="tip-custo"
      data-tip="custo">ⓘ</button>
  </span>
  <span class="eai-meter__bar" role="progressbar" aria-labelledby="m-custo"
    aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <span data-sim-fill></span>
  </span>
  <span class="eai-meter__val" data-sim-val>0</span>
  <span class="eai-meter__unit" aria-hidden="true">pts</span>
  <div class="eai-meter__tooltip" id="tip-custo" role="tooltip" hidden>
    <strong>Custo — 0 a 100 pts.</strong>
    Representa o esforço operacional relativo: tokens consumidos, reprocessamentos e
    chamadas desnecessárias ao modelo. O piso é 30 — qualquer sistema tem overhead de
    infraestrutura (rede, runtime, armazenamento). Quanto menor, melhor.
  </div>
</div>
```

### B2 — Lógica JS dos tooltips

**Em `js/eai-sim.js`**, adicione ao final do arquivo (ou na função de inicialização, após o setup das métricas):

```js
// Toggle de tooltips das métricas
document.querySelectorAll('.eai-meter__info[data-tip]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    const tip = document.getElementById(`tip-${btn.dataset.tip}`)
    if (!tip) return
    const isOpen = !tip.hidden
    // Fecha todos antes de abrir o clicado
    document.querySelectorAll('.eai-meter__tooltip').forEach(t => {
      t.hidden = true
    })
    document.querySelectorAll('.eai-meter__info').forEach(b => {
      b.setAttribute('aria-expanded', 'false')
    })
    if (!isOpen) {
      tip.hidden = false
      btn.setAttribute('aria-expanded', 'true')
    }
  })
})

// Fechar ao clicar fora
document.addEventListener('click', () => {
  document.querySelectorAll('.eai-meter__tooltip').forEach(t => { t.hidden = true })
  document.querySelectorAll('.eai-meter__info').forEach(b => {
    b.setAttribute('aria-expanded', 'false')
  })
})
```

### B3 — CSS dos tooltips

**No `engenharia-agentes-ia.css`** (ou no bloco de estilo do simulador), adicione:

```css
.eai-meter__info {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  color: inherit;
  opacity: 0.45;
  padding: 0 0.25rem;
  vertical-align: middle;
  line-height: 1;
  transition: opacity 0.15s;
}
.eai-meter__info:hover,
.eai-meter__info[aria-expanded="true"] { opacity: 1; }

.eai-meter__tooltip {
  grid-column: 1 / -1;        /* ocupa a linha inteira no grid das métricas */
  font-size: 0.82rem;
  line-height: 1.55;
  padding: 0.75rem 1rem;
  margin-top: 0.25rem;
  border-radius: 6px;
  border: 1px solid var(--color-eai-border, rgba(255,255,255,0.1));
  background: var(--color-eai-surface-2, rgba(255,255,255,0.04));
}
.eai-meter__tooltip strong { display: block; margin-bottom: 0.35rem; }
```

**Nota sobre o grid:** se `.eai-sim__meters` não usar CSS Grid, remova `grid-column: 1 / -1` e substitua por `display: block; width: 100%;` no tooltip.

**Validação da Tarefa B:**
- Clicar em ⓘ de qualquer métrica exibe o tooltip com definição e escala
- Clicar em ⓘ de uma segunda métrica fecha o anterior e abre o novo
- Clicar fora de qualquer ⓘ fecha o tooltip aberto
- As barras de progresso, valores e o log de eventos continuam funcionando normalmente

---

## Tarefa C — Correção residual: `finops.py` ainda usa `lead`

**Arquivo:** `engenharia-agentes-ia.html` (bloco `<figure class="eai-cw">` com `finops.py`)

**Contexto:** o `pipeline.py` foi corrigido para usar `item`/`signals`, mas o `finops.py` ainda usa `lead` no loop (linhas 546–548 do HTML original). É um resíduo inconsistente — o exemplo genérico ficou pela metade.

**Localizar** o bloco de código `finops.py` no HTML e substituir:

```python
# ANTES (ainda no HTML)
ledger = TokenLedger(daily_cap=1000)
for lead in fila:
    if not ledger.try_spend(cost(lead)):
        mark_pending(lead)                     # retoma na proxima onda
        break                                  # para limpo, em ponto seguro

# DEPOIS
ledger = TokenLedger(daily_cap=1000)
for item in fila:
    if not ledger.try_spend(cost(item)):
        mark_pending(item)                     # retoma na proxima onda
        break                                  # para limpo, em ponto seguro
```

Apenas as três linhas do loop mudam. O restante do bloco (`TokenLedger`, `try_spend`, comentários) permanece intacto.

**Validação:** abrir "Da abstração ao código" e confirmar que nenhum dos três blocos de código menciona `lead` — todos usam `item`.

---

## Tarefa D — Âncora `#maturidade` ausente

**Arquivo:** `engenharia-agentes-ia.html`

**Contexto:** o Pilar 4 referencia `<a href="#maturidade">modelo de maturidade</a>` (linha ~437) e o glossário também referencia `#maturidade`, mas essa âncora não existe no HTML. É um link quebrado.

**Opção 1 (preferida):** se existe um bloco de "modelo de maturidade" no JS ou no CSS mas que não está no HTML como seção visível, adicione o `id="maturidade"` ao elemento mais próximo que agrupe esse conteúdo — pode ser o próprio `<section id="simulador">` ou o Calibrador de Autonomia:

```html
<!-- No Calibrador de Autonomia, que é onde faz mais sentido semântico -->
<h3 class="eai-sub" id="maturidade">Calibrador de Autonomia <span class="eai-sub__tag">Pilar 1</span></h3>
```

**Opção 2:** se o modelo de maturidade for conteúdo que ainda não existe, adicione o `id` ao Calibrador por enquanto e documente em `PROGRESS.md` que o modelo de maturidade completo é uma pendência futura.

**Não crie conteúdo novo** para resolver isto — apenas conecte a âncora ao elemento existente mais semanticamente próximo.

**Validação:** clicar em "modelo de maturidade →" no Pilar 4 ou no glossário leva a um elemento visível na página sem erro no console.

---

## O que NÃO alterar

- Os Pilares 1–5 e seus textos
- A lógica de cálculo das métricas do simulador
- O log cumulativo do simulador (se já estiver funcionando)
- O quiz (perguntas, feedbacks, lógica de score)
- O Playground e seus componentes
- O glossário da seção Referência
- O CSS geral — apenas adicione as classes `.eai-meter__info` e `.eai-meter__tooltip`
- O `pipeline.py` (já corrigido)

---

## Checklist final

- [ ] A árvore do repositório aparece expandida ao carregar a página
- [ ] Clicar numa pasta fecha/abre normalmente
- [ ] ⓘ ao lado de cada métrica abre um tooltip com definição e escala
- [ ] Tooltips se fecham ao clicar em outro ⓘ ou fora
- [ ] O `finops.py` usa `item` em vez de `lead` no loop
- [ ] O link `#maturidade` do Pilar 4 leva a algum elemento real na página
- [ ] Nenhum erro no console do browser após as alterações