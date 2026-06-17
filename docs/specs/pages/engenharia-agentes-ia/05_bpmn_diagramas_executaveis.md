# 05 — Especificação BPMN.js (Diagramas Executáveis)

> Cobre o entregável **10**. Define como usar **bpmn-js / bpmn-moddle** para representar fluxos
> **corretos × problemáticos** de sistemas agênticos, com overlays educativos, hotspots, estados
> animados e **edição pelo usuário**.

---

## 1. Por que BPMN.js (e quando NÃO usar)

A maioria das visualizações é SVG ad-hoc (doc 04). **BPMN.js entra exatamente onde o objeto é um
processo** — pipeline com tarefas, gateways de decisão, loops e aprovação humana. Ganhos:

- **Semântica de processo nativa:** tarefa, gateway, evento, fluxo de sequência — o mesmo vocabulário
  que a tese do site usa ("DAG de etapas fixas").
- **Edição de fluxo "de graça":** o `Modeler` permite ao usuário **alterar o fluxo e observar
  consequências** — exatamente o que o meta-prompt pede.
- **Overlays e hotspots:** API de overlays para anexar balões educativos a elementos específicos.

> **Quando NÃO usar BPMN.** Para propagação de erro, partículas, gauges, lineage epistêmico → SVG/
> Canvas (doc 04). BPMN é para **fluxo de controle de processo**, não para tudo. (Decisão registrada
> na árvore de [04 §1](04_visualizacoes_interativas.md).)

### Ficha técnica

- **Objetivo:** ensinar a diferença entre orquestração determinística e caos agêntico via processos
  manipuláveis.
- **UX:** ler o fluxo → ativar overlays → (V2) editar e ver o veredito.
- **Componentes:** `eai-viz-panel` (variante BPMN), overlays, painel de veredito (reusa
  `eai-xai-feedback`).
- **Tecnologias:** `bpmn-js` (`NavigatedViewer` para read-only; `Modeler` para edição),
  `bpmn-moddle` (ler/gravar XML e propriedades custom), CSS para temas.
- **Complexidade:** **Alta** (lib pesada, curva BPMN, análise do fluxo editado).
- **Riscos:** peso do bundle; usuário se perder na notação; análise de fluxo arbitrário.
  **Mitigação:** lazy-load só na seção Padrões/Playground; paleta **restrita** a poucos elementos;
  edição **guiada** (não BPMN cru); legenda textual sempre.

---

## 2. Elementos BPMN utilizados (subconjunto intencionalmente pequeno)

Para não exigir que o usuário aprenda BPMN, restringimos a notação a um **kit mínimo**:

| Elemento BPMN | Papel no domínio agêntico | Notas |
| :-- | :-- | :-- |
| **Start / End Event** | início (request) / fim (resultado publicado) | — |
| **Task** | etapa determinística (M3 score, M4 ranking) | ícone "engrenagem" |
| **Service Task** | chamada de I/O / provedor (M1 busca, M2 extração via LLM) | ícone "nuvem"; é a **borda** onde mora autonomia |
| **Exclusive Gateway** | decisão determinística (hard filter passou?) | uma saída por condição |
| **User Task** | **aprovação humana** (revisão de PR, human review) | crucial nos fluxos corretos |
| **Sequence Flow** | dependência entre etapas | direção = ordem |
| **(anti-padrão) loop de fluxo** | seta que retorna sem condição de parada | usado **só** nos fluxos problemáticos |

> **Convenção semântica do site.** **Service Task = ponto de autonomia/IO** (pode falhar, custar,
> degradar). **Task = cálculo puro determinístico.** **User Task = trava humana.** Essa convenção é
> ensinada na legenda e é a chave de leitura de todos os diagramas.

---

## 3. Catálogo de fluxos

### 3.1 Fluxos CORRETOS (determinísticos)

**F-OK-1 · Pipeline determinístico (M1→M5)**
```
(start)→[M1 busca·service]→[M2 extração·service]→[M3 score·task]→
        ◇hard filter? ──não──▶(descarta)
              │sim
              ▼
        [M4 ranking·task]→[M5 XAI·task]→(publica snapshot)→(end)
```
- **Lição:** LLM só nos Service Tasks (M1/M2); cálculo (M3/M4/M5) é Task pura; gateway é
  determinístico.

**F-OK-2 · Poda precoce + ledger (FinOps)**
```
(start)→◇vocabulário desqualifica? ──sim──▶(poda barata, end)
             │não
             ▼
        ◇ledger tem orçamento? ──não──▶(marca pendente, end limpo)
             │sim
             ▼
        [enriquecer top-N·service]→(end)
```
- **Lição:** filtro barato antes da cognição cara; ledger recusa gasto **antes** do 429.

**F-OK-3 · Validação + retry + aprovação humana**
```
(start)→[gerar·service]→◇schema válido? ──não──▶[corrigir·service]──(volta ao validar, com limite)
             │sim
             ▼
        [User Task: revisão humana]→◇aprovado? ──não──▶(volta p/ ajuste)
             │sim
             ▼
        (merge / publica)→(end)
```
- **Lição:** retry **com limite** (não loop infinito); User Task como trava; fail-closed.

### 3.2 Fluxos PROBLEMÁTICOS (anti-padrões)

**F-BAD-1 · Loop de agentes sem condição de parada**
```
(start)→[Agente A·service]⇄[Agente B·service]   ← seta de volta SEM gateway de parada
        custo $ sobe a cada volta · nunca chega ao end
```
- **Defeito destacado:** ausência de Exclusive Gateway com condição de término → loop infinito + custo.

**F-BAD-2 · Decisão livre (LLM no controle de fluxo)**
```
(start)→[LLM decide próxima etapa·service]→ (qualquer etapa, escolhida pelo modelo)
        sem DAG fixo · saída diferente a cada execução
```
- **Defeito:** o LLM tem autoridade sobre o fluxo de controle (viola "o LLM responde, não decide
  quais perguntas fazer").

**F-BAD-3 · Propagação de alucinação (inferência vira evidência)**
```
(start)→[infere·service]→[trata inferência como fato]→[infere de novo sobre o fato falso·service]→…
        erro se autoconfirma · sem camada de validação
```
- **Defeito:** sem contrato/validação entre etapas e sem isolamento epistêmico → o erro se propaga e
  se "confirma".

---

## 4. Estilos visuais e estados animados

- **Tema:** herda tokens de [07](07_direcao_de_arte_e_animacoes.md) (claro/escuro). Override do CSS
  padrão do bpmn-js via classes `.eai-bpmn-*`.
- **Cor semântica:** Service Task (autonomia) em **âmbar**; Task pura em **azul** (accent); User Task
  (humano) em **verde**; elementos de anti-padrão em **vermelho**.
- **Estados animados:**
  - `executando`: um "token" (marcador) percorre os Sequence Flows acendendo cada elemento (como em
    simulação de execução BPMN).
  - `loop detectado`: o ciclo pulsa em vermelho e um contador `$++` sobe.
  - `barrado`: gateway/contrato pisca e o caminho inválido escurece.
  - `reduced-motion`: sem token animado — destaque estático sequencial via botão "próximo passo".

---

## 5. Overlays educativos e hotspots

Usar a **Overlays API** do bpmn-js para anexar conteúdo a elementos por `id`:

- **Hotspot (`?`):** ícone discreto sobre um elemento; ao focar/clicar abre um balão com "o que é
  isto" + qual princípio (ex.: sobre o ledger gateway → "P8 FinOps: recusa o gasto antes do 429").
- **Badge de princípio:** chip `P1`…`P10` no canto do elemento, clicável → leva ao card do princípio
  (interliga com [01 §5](01_arquitetura_informacao_e_sitemap.md)).
- **Anotação de defeito (anti-padrões):** balão vermelho fixo apontando a causa-raiz ("loop sem
  condição de parada").
- **Legenda textual do diagrama:** abaixo do canvas, descrição em prosa do fluxo (equivalente textual
  obrigatório — [08](08_acessibilidade_e_metricas.md)).

---

## 6. Modo de edição (usuário altera o fluxo e vê consequências)

> O entregável pede explicitamente: **"Permitir que usuários alterem fluxos e observem
> consequências."** Implementado em duas camadas de ambição.

### 6.1 Edição guiada (V1 — recomendado primeiro)

- Usa `NavigatedViewer` + ações **pré-definidas** (não BPMN livre): toggles como "adicionar gateway
  de parada ao loop", "inserir contrato entre etapas", "adicionar User Task de aprovação".
- Cada ação reescreve o XML (via bpmn-moddle) para uma variante conhecida e **reroda o veredito**.
- **Vantagem:** consequências sempre analisáveis (o espaço de estados é finito e curado).

### 6.2 Edição livre (V2 — ambição maior)

- Usa o `Modeler` completo com **paleta restrita** (os elementos da §2).
- Ao "rodar", um **analisador determinístico** percorre o XML e produz um veredito:

| Regra do analisador | Detecta | Veredito |
| :-- | :-- | :-- |
| ciclo sem gateway de parada | loop infinito | ⚠ "risco de loop / custo ilimitado" |
| Service Task → Service Task sem Task/contrato no meio | fronteira sem validação | ✗ "fronteira sem contrato" |
| LLM/Service Task com múltiplas saídas livres | LLM controla fluxo | ✗ "autonomia no controle de fluxo" |
| ausência de User Task antes de ação irreversível | sem trava humana | ⚠ "sem aprovação humana" |
| ausência de gateway de orçamento | sem ledger | ⚠ "FinOps ausente" |
| caminho feliz sem ramo de falha | sem modo degradado | ⚠ "não trata degradação" |

- O veredito é apresentado no painel `eai-xai-feedback` — **explica o porquê** (modela P10/XAI).
- **Nota:** este analisador é o **mesmo motor de regras** do Playground (doc 06), aplicado sobre o
  grafo BPMN em vez do canvas drag-and-drop. Reusar.

> **Nota para o desenvolvedor.** A análise é **determinística e auditável** (sem LLM) — coerência
> com o princípio do site. Documente cada regra como uma função pura testável (espelha o M5/XAI:
> "regras explícitas, reexecução idêntica").

---

## 7. Resiliência: Saga, Idempotência e Dead-Letter Queue (DLQ)

> Até aqui o pipeline é um DAG "do caminho feliz". Em **produção em escala**, etapas falham
> **parcialmente** (provedor cai no meio, crédito esgota após o 1º efeito colateral). Estes padrões
> recuperam falha parcial **sem** introduzir não-determinismo nem "magia" — falham para incerteza,
> nunca para estado corrompido.

### 7.1 Idempotência por nó (exigência)

- Todo nó de execução (`Task`/`Service Task`) é **idempotente**: reexecutar com a mesma chave
  (`entity_id`, `run_id`) **não duplica efeito**. Espelha o upsert idempotente do corpus e a
  publicação `(profile_id, run_id)` do guia.
- **BPMN:** badge `⟳` no nó idempotente; a chave de idempotência anotada como *Data Object* anexo.
  Retry de um nó idempotente é seguro por construção.

### 7.2 Padrão Saga (compensação, não rollback global)

- Para fluxos com **múltiplos efeitos colaterais** (revelar contato pago, publicar snapshot, debitar
  ledger), cada ação tem uma **ação de compensação** inversa. Não há transação distribuída/2PC: a
  falha a jusante dispara as compensações em ordem reversa.
- **BPMN:** `Boundary Error Event` no `Service Task` → `Compensation Task` pareada (notação de
  compensação `↩`). Visualizar ação e compensação como par.

```
[revelar contato·service]──ok──▶[publicar·service]──ok──▶(end)
        │ erro                          │ erro
        ▼                               ▼
  ↩(estorna crédito)            ↩(despublica snapshot)──▶ ↩(estorna crédito)
```

### 7.3 Dead-Letter Queue (DLQ)

- Item/agente que **viola o contrato repetidamente** (N falhas de schema), **excede o Ledger FinOps**
  ou **estoura o limite de retries** é desviado para uma **DLQ** — em vez de entrar em loop "poison"
  ou ser descartado em silêncio.
- A DLQ é **estado de domínio** (arquivo append-only, inspecionável). Coerente com Open-World:
  **registra o que falhou e por quê**, nunca apaga.
- **Liga ao FinOps:** exceder o ledger ⇒ DLQ classe **"pendente por orçamento"** (não-erro),
  **reprocessável na próxima onda**; violar contrato N× ⇒ DLQ classe "defeituoso" para inspeção.
- **BPMN:** `Error Boundary Event` + gateway de contagem de tentativas → `End Event` terminal
  vermelho rotulado **DLQ**; cada classe de DLQ é um end-state distinto.

### 7.4 Travas determinísticas

- Limite de retries **fixo**; backoff **determinístico** (relógio injetado, sem jitter aleatório nos
  testes). Saga e roteamento de DLQ são **funções puras testáveis**; **cenário BDD obrigatório de
  falha parcial** (eixo "degradado" do DoR — [02 Cap. 8](02_jornada_de_aprendizagem.md)).

---

## 8. Human-in-the-Loop por confiança (Confidence-based routing)

> **Substitui a aprovação humana estática** (§3.1 F-OK-3) por **roteamento baseado em confiança**.
> Otimiza a carga cognitiva: o humano só é incomodado quando o sistema está genuinamente incerto.

### 8.1 Regra

- A `User Task` de revisão só é acionada se a **confiança** calculada pela camada XAI for **< 98%**.
- Para confiança **≥ 98%**, o sistema **executa autonomamente de forma determinística** e gera
  **apenas um registro de auditoria** (não interrompe o humano).

```
[gerar·service]→[XAI calcula confiança·task]→◇ confiança ≥ 0.98 ?
                                                 │ sim ──▶[executar autônomo·task]→[Audit Log·task]→(end)
                                                 │ não ──▶[User Task: revisão humana]→◇aprovado?→…
```

### 8.2 Por que isto preserva o determinismo e a filosofia do site

- A **confiança é um escalar determinístico** (a mesma `confidence` / `Confiança^γ` do scoring); a
  comparação com `0.98` é uma **função pura** — não há "achismo" no roteamento.
- O usuário final continua vendo **drivers XAI (P10)**, não o número; o número **governa o
  roteamento internamente**, com auditoria.
- **Travas:** o limiar `0.98` é **configuração versionada** (não mágico); **100%** das execuções
  autônomas geram registro de auditoria; **amostragem humana periódica** (shadow review) acima do
  limiar para detectar *drift* — fail-closed.

> **Impacto transversal (UX).** Atualiza o componente `User Task`/Human Review
> ([03 Parte B](03_wireframes_e_catalogo_de_componentes.md)), o Cap. 8
> ([02](02_jornada_de_aprendizagem.md)) e refina a regra do Playground "sem Human Review antes de
> ação irreversível" ([06 §2.4](06_simulador_e_playground.md)) para **"sem roteamento por confiança
> antes de ação irreversível"**.

---

### Referências cruzadas

- Quando BPMN vs. SVG/Canvas → [04 §1](04_visualizacoes_interativas.md)
- Motor de regras compartilhado → [06](06_simulador_e_playground.md)
- Tema/cores e estados de animação → [07](07_direcao_de_arte_e_animacoes.md)
- Equivalente textual e teclado → [08](08_acessibilidade_e_metricas.md)
- Fase (V1 read-only → V2 editável) → [09](09_roadmap_esforco_riscos.md)
