# 04 — Visualizações Interativas

> Cobre o entregável **9 (Especificação das visualizações)** + a **justificativa de quando usar
> SVG / Canvas / WebGL / BPMN.js**. Cada visualização traz a ficha: **Título · Objetivo · Metáfora
> visual · Interação · Tecnologia recomendada · Complexidade**. Todas vivem dentro do componente
> `eai-viz-panel` ([03](03_wireframes_e_catalogo_de_componentes.md)) e têm equivalente textual
> obrigatório ([08](08_acessibilidade_e_metricas.md)).

---

## 1. Árvore de decisão: SVG vs. Canvas vs. WebGL vs. BPMN.js

A escolha de tecnologia é **disciplinada**, não estética — coerente com a tese do site. Critérios:

```
Quantos elementos animados simultâneos?
│
├─ ≤ ~200, precisam de DOM/acessibilidade/CSS  ........  SVG  (+ GSAP p/ timeline)
│
├─ centenas–milhares, partículas/fluxo contínuo  ......  Canvas 2D
│
├─ 3D real, profundidade, milhares de pontos  .........  WebGL / Three.js   [evitar no MVP]
│
└─ é um FLUXO DE PROCESSO (tarefas, gateways, setas)?
   e quero diagrama padronizado / editável pelo usuário?  .  BPMN.js (doc 05)
```

| Tecnologia | Use quando | Vantagem decisiva | Custo/risco | No site |
| :-- | :-- | :-- | :-- | :-- |
| **SVG** | poucos elementos, precisa de acessibilidade, hover, foco, CSS | nós são DOM → ARIA, teclado, tema via CSS vars "de graça" | degrada com muitos nós | **Padrão (maioria)** |
| **Canvas 2D** | muitas partículas / propagação / fluxo de tokens | performance com centenas de objetos | sem DOM → acessibilidade manual | propagação de erro, ledger denso |
| **WebGL/Three.js** | 3D genuíno indispensável | profundidade, escala | peso, complexidade, a11y difícil | **Não no MVP** (só se um conceito 3D justificar; ver 09) |
| **BPMN.js** | representar **processos** (pipeline, gateways, loops, aprovação) | semântica de processo + edição + overlays | lib pesada, curva BPMN | Padrões, fluxos editáveis (doc 05) |

> **Regra de ouro (dogfooding).** Comece pelo SVG. Só suba para Canvas quando o SVG engasgar com o
> volume; só use WebGL se 3D for *o ponto* (raríssimo aqui). Mesma lógica de "infra mínima que
> entrega valor" do guia.

---

## 2. Visualizações por princípio

### V1 — DAG determinístico vs. agentes livres  (P1, P2 · Cap. 2)

- **Objetivo:** mostrar que o pipeline fixo é reproduzível e o fluxo autônomo entra em loop/diverge.
- **Metáfora:** uma **partitura** (DAG, toca igual sempre) vs. uma **roda de improviso** que se enrola.
- **Interação:** botão "executar"; o DAG acende M1→M5 em sequência e emite uma saída; a maranha de
  agentes pisca setas que se cruzam e forma um loop com `$` subindo. Botão "executar de novo": DAG dá
  saída **idêntica** (destaca tie-break/relógio injetado); agentes divergem.
- **Tecnologia:** **SVG + GSAP** (timeline de acendimento; nós são DOM → foco/tooltip por nó).
- **Complexidade:** **Média**.

### V2 — Cérebro × Vitrine  (P3 · Cap. 3)

- **Objetivo:** internalizar a separação física e o contrato estreito.
- **Metáfora:** **cozinha (Cérebro) × salão (Vitrine)** com uma "janela de passagem" (contrato HTTP).
- **Interação:** arrastar peças (scoring, chaves, snapshot, feedback, banco) para um dos dois lados;
  drop errado (banco no salão) dispara alerta "o motor nunca acessa o banco — só HTTP"; só
  snapshot-sem-score e feedback atravessam a janela.
- **Tecnologia:** **SVG** + HTML drag-and-drop (poucas peças; precisa de a11y).
- **Complexidade:** **Média**.

### V3 — Resíduo interpretativo  (P4 · Cap. 4)

- **Objetivo:** ver que dados estruturados preenchem quase tudo; o LLM só toca o resíduo.
- **Metáfora:** uma **ficha** sendo preenchida por carimbos automáticos (fontes) e, ao final, um
  pequeno campo destacado "só humano/LLM resolve".
- **Interação:** o usuário classifica cada campo (estruturado × resíduo); a **barra de custo de LLM**
  cai a cada campo tirado do modelo; ao zerar o resíduo, "dispensa Gemini".
- **Tecnologia:** **SVG/HTML + CSS** (barra reativa). Leve.
- **Complexidade:** **Baixa-Média**.

### V4 — Firewall de contratos  (P5 · Cap. 5)

- **Objetivo:** ver o schema **rejeitar** saída inválida na fronteira.
- **Metáfora:** uma **parede/aduana** com um leitor de schema; objetos (payloads) tentam atravessar.
- **Interação:** o usuário lança payloads (válido, campo-extra, score 1.7, tipo errado); o válido
  passa e fica verde; os inválidos **batem na parede** com etiqueta do motivo (`extra="forbid"`,
  `ge=0/le=1`, tipo). Mostra o conceito "degradar item a item": num lote, só o item ruim é barrado.
- **Tecnologia:** **SVG + GSAP** (movimento de partícula único e legível) ou Canvas se for um lote
  grande de partículas.
- **Complexidade:** **Média**.

### V12 — Aduana adversarial / Sanitização epistémica  (P3 + P5 · Camada 0 de entrada)

> **Subcapítulo — Segurança Epistémica e Adversarial (proteção do Input).** O firewall de contratos
> (V4) protege a **estrutura da saída** do LLM. Mas a **entrada** vinda de mundo aberto (busca web,
> snippet social, documento) pode carregar **injeção de contexto indireta** (*indirect prompt
> injection*): instruções escondidas no dado consumido. É preciso uma **Camada 0** que sanitiza o
> payload **antes** de ele atingir o contrato do Cérebro.

**Regras de "Sanitização Epistémica" (determinísticas, antes de qualquer LLM):**

1. **Todo dado de mundo aberto é input adversarial**, não apenas malformado — desconfie por padrão
   (extensão do "input não confiável" de P5 para a dimensão de segurança).
2. **Separar dados de instruções.** Conteúdo buscado entra **apenas em campos de dado**, jamais é
   concatenado como instrução. O contrato de entrada do Cérebro usa `extra="forbid"` e **proíbe
   qualquer campo interpretável como diretiva**.
3. **Neutralizar diretivas.** Detectar/escapar/remover padrões de injeção ("ignore as instruções
   anteriores", delimitadores forjados, texto que imita *system prompt*) por **vocabulário fixo +
   heurística barata** (*deterministic-first*) — antes de gastar token.
4. **Quarentena + proveniência.** Cada fragmento carrega origem (`url`, `snippet`, `extracted_at`) e
   fica isolado; o que não passa na sanitização **degrada para incerteza** (`missing_evidence`), não
   contamina o motor.
5. **Isolamento epistémico (liga a P6).** Conteúdo externo nunca é tratado como instrução nem como
   evidência sobre si mesmo — quebra o vetor "a injeção se autoconfirma".

- **Objetivo:** ver a entrada não confiável ser sanitizada/quarentenada antes da fronteira do Cérebro.
- **Metáfora:** uma **aduana de entrada com quarentena** — espelho da "aduana de saída" que é o
  firewall V4.
- **Interação:** o usuário injeta um snippet web com uma instrução escondida; a aduana **neutraliza/
  quarentena** o trecho; tentar fazê-lo passar como instrução é barrado. Toggle "sem Camada 0" mostra
  o caos: a injeção atinge o Cérebro e desvia o comportamento.
- **Tecnologia:** **SVG** (poucos elementos, precisa de a11y) + regras determinísticas.
- **Complexidade:** **Média**.

### V5 — Camadas epistêmicas rastreáveis  (P6 · Cap. 6)

- **Objetivo:** separar Evidência → Inferência → Julgamento, com proveniência (`derived_from`).
- **Metáfora:** três **faixas/lanes** empilhadas; uma inferência puxa um fio até a evidência que a
  originou.
- **Interação:** clicar numa conclusão "ilumina o lineage" descendo até a evidência + fonte; tentar
  arrastar uma inferência para a faixa de evidência é **bloqueado** ("inferência jamais é tratada como
  evidência observada").
- **Tecnologia:** **SVG** (linhas de lineage = paths; nós com foco).
- **Complexidade:** **Média**.

### V6 — Open-World: ausência ≠ falso  (P7 · Cap. 6)

- **Objetivo:** ausência de sinal vira **incerteza explícita**, não negação.
- **Metáfora:** um **medidor de opinião** com três zonas (acredita / duvida / **incerteza**); falta
  de sinal engorda a zona de incerteza, não a de "duvida".
- **Interação:** toggles de sinais (timing, indústria…); ao desligar um sinal, o item mostra
  `missing evidence` e a incerteza sobe — **nunca** marca "falso". (`[V1+]`: alternar para a
  representação tripla ω de Jøsang como camada avançada opcional.)
- **Tecnologia:** **SVG/Canvas** (gauge animado).
- **Complexidade:** **Média**.

### V7 — Ledger vivo + ondas + cache  (P8 · Cap. 7)

- **Objetivo:** sentir orçamento como estado persistente que recusa gasto; ondas retomáveis; cache
  que evita repagar.
- **Metáfora:** um **livro-caixa** que enche; uma **régua de dias** (ondas); um **carimbo "já
  processado"** (corpus).
- **Interação:** disparar runs → o ledger debita; ao bater o teto, marca o restante **pendente** (não
  erro); botão "próximo dia" reseta e retoma a onda; botão "cache" mostra itens conhecidos sendo
  pulados (custo por item cai conforme cresce).
- **Tecnologia:** **Canvas** (se muitos itens) ou **SVG** (se poucos) + D3 para escala/eixos do
  consumo.
- **Complexidade:** **Média-Alta**.

### V8 — BDD executando (Given/When/Then)  (P9 · Cap. 8)

- **Objetivo:** ver cenários executando sobre um pipeline mock e os 3 eixos obrigatórios.
- **Metáfora:** uma **bateria de testes** com semáforos por cenário.
- **Interação:** arrastar blocos Given/When/Then; "rodar" → o cenário percorre o pipeline e acende
  verde/vermelho; o card só "passa no DoR" com os 3 eixos (feliz/degradado/open-world) presentes.
- **Tecnologia:** **SVG/HTML** (semáforos + stepper). Para o fluxo do pipeline pode reusar o **BPMN**
  (doc 05).
- **Complexidade:** **Média**.

### V9 — Desmontagem XAI  (P10 · Cap. 9)

- **Objetivo:** transformar score em drivers (+/−), lacunas e proveniência.
- **Metáfora:** um **número explodindo** em peças (drivers), com etiquetas de fonte e "buracos"
  (lacunas).
- **Interação:** clicar no lead → o score se "desmonta" em `positive_signals`/`negative_signals`,
  `missing_signals` e a fonte (url/snippet) de cada um; toggle "mostrar número" evidencia que os
  drivers convencem mais que o `0,674`.
- **Tecnologia:** **SVG + GSAP** (explosão/realocação de elementos; cada driver é DOM acessível).
- **Complexidade:** **Média**.

### V10 — As 4 patologias do caos  (tese geral · Cap. 1 / Hero)

- **Objetivo:** dar rosto às 4 falhas (loop, custo, alucinação, irreprodutibilidade).
- **Metáfora:** o storyboard caos×disciplina (ver [03 Parte C](03_wireframes_e_catalogo_de_componentes.md)).
- **Interação:** toggle Caos↔Disciplina; cada estado acende/apaga as patologias.
- **Tecnologia:** **SVG + GSAP/ScrollTrigger**.
- **Complexidade:** **Média-Alta** (é o Hero).

### V11 — Caso real SocialSelling  (Casos Reais)

- **Objetivo:** provar que os 10 princípios viram produto; separar implementado × especificado.
- **Metáfora:** o **DAG M1→M5 + portal** com "luzes de princípio" acendendo onde cada um aparece.
- **Interação:** clicar num nó → qual princípio, qual ADR, qual arquivo; aba Implementado × `[V1+]`.
- **Tecnologia:** **SVG** (reusa o motor de V1).
- **Complexidade:** **Média**.

---

### V13 — Encolhimento do resíduo no tempo (ciclo de extração de regras)  (P4 · Cap. 4)

> Modela a **transição temporal do resíduo interpretativo**: o que hoje exige LLM amanhã pode ser
> código rígido. É o antídoto contra a dependência permanente do modelo.

- **Objetivo:** mostrar que o resíduo encolhe entre versões, à medida que **padrões de decisão
  observados repetidamente** são refatorados em **funções puras determinísticas**.
- **Metáfora:** um **bloco de LLM** que **mingua** a cada versão, enquanto blocos determinísticos
  "solidificam" ao seu redor.

```
v1  [█████████ LLM █████████][cód]      resíduo grande
v2  [████ LLM ████][███ código ███]     padrões estáveis viraram regra
v3  [█ LLM █][██████ código ██████]     resíduo = só o genuinamente novo/ambíguo

ciclo:  observar decisões  →  medir repetição/estabilidade  →  extrair regra
        →  refatorar p/ função pura + contrato  →  resíduo encolhe  →  (repete)
```

- **Interação:** slider **"versão/tempo"**; ao avançar, padrões estáveis se solidificam em blocos
  determinísticos e as barras de **custo** e **risco de alucinação** caem; o que resta no LLM é só o
  ambíguo.
- **Exercício:** dado um log de decisões do agente, marcar quais já são **repetitivas o bastante para
  virar regra** (candidatas a *hardening*) vs. quais continuam resíduo legítimo.
- **Tecnologia:** **SVG/CSS** (barras reativas). Leve.
- **Complexidade:** **Média**.
- **Nota:** é o trabalho do arquiteto **colher regras do comportamento observado** (espelha a
  auto-sugestão de Skills do guia, mas mirando **código rígido**, não mais prompt).

---

## 3. Tabela-resumo (catálogo)

| ID | Visualização | Princípio | Tecnologia | Complexidade | Fase |
| :-: | :-- | :-- | :-- | :-- | :-- |
| V10 | 4 patologias / Hero | tese | SVG+GSAP | M-A | MVP |
| V1 | DAG × agentes livres | P1,P2 | SVG+GSAP | M | MVP |
| V2 | Cérebro × Vitrine | P3 | SVG+DnD | M | MVP |
| V3 | Resíduo interpretativo | P4 | SVG/CSS | B-M | MVP |
| V4 | Firewall de contratos | P5 | SVG+GSAP | M | MVP |
| V5 | Camadas epistêmicas | P6 | SVG | M | MVP/V1 |
| V6 | Open-World | P7 | SVG/Canvas | M | MVP/V1 |
| V7 | Ledger + ondas + cache | P8 | Canvas+D3 | M-A | V1 |
| V8 | BDD executando | P9 | SVG/BPMN | M | V1 |
| V9 | Desmontagem XAI | P10 | SVG+GSAP | M | V1 |
| V11 | Caso real SocialSelling | todos | SVG | M | V1 |
| V12 | Aduana adversarial / sanitização | P3,P5 | SVG | M | MVP/V1 |
| V13 | Encolhimento do resíduo no tempo | P4 | SVG/CSS | M | V1 |

> **Nota para o desenvolvedor.** Reaproveitar um **motor de DAG em SVG** comum a V1, V8 e V11 (mesma
> base de nós/arestas/timeline). Isso reduz esforço e mantém consistência visual — é a "biblioteca
> interna" da camada de visualização.

---

## 4. Ficha técnica consolidada (camada de visualização)

- **Objetivo:** converter cada princípio abstrato em manipulação concreta.
- **UX:** assistir → manipular → observar consequência; sempre com legenda textual e controles de
  play/pause/passo.
- **Componentes:** `eai-viz-panel`, `eai-toggle-scenario`, `eai-draggable-node`, `eai-meter`.
- **Tecnologias:** SVG (padrão) + GSAP; Canvas+D3 onde há volume; BPMN.js para processos (doc 05);
  WebGL fora do MVP.
- **Complexidade:** **Média** no agregado; V7/V10 são os picos.
- **Riscos:** (a) animação decorativa que não ensina; (b) peso (libs) no carregamento; (c)
  acessibilidade de Canvas. **Mitigação:** regra "toda animação ensina" (07); **lazy-load** de
  GSAP/D3/bpmn por seção; equivalente textual e modo passo-a-passo para Canvas (08).

---

### Referências cruzadas

- Moldura e estados de visualização → [03](03_wireframes_e_catalogo_de_componentes.md)
- Diagramas de processo (BPMN) → [05](05_bpmn_diagramas_executaveis.md)
- Animações pedagógicas (timing, estados) → [07](07_direcao_de_arte_e_animacoes.md)
- Equivalentes textuais e teclado → [08](08_acessibilidade_e_metricas.md)
- Faseamento → [09](09_roadmap_esforco_riscos.md)
