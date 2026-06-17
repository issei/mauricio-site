# 02 — Jornada de Aprendizagem

> Cobre o entregável **6 (Jornada de aprendizagem)**. Trilha guiada estilo Brilliant.org: aprende-se
> por descoberta ativa, não leitura passiva. Os 10 capítulos derivam **1:1** dos princípios do
> [guia-fonte](../../../references/guia-engenharia-agentes-ia.md).

---

## 1. Anatomia de um capítulo (template comum)

Todo capítulo tem a **mesma estrutura de 6 blocos**, para criar ritmo previsível:

```
┌─ CABEÇALHO ─────────────────────────────────────────────┐
│ Nº · Título · duração estimada · dificuldade · princípio │
├─ 1. OBJETIVO  — "ao final, você consegue…"               │
├─ 2. CONCEITOS — exposição enxuta + 1 analogia-âncora     │
├─ 3. INTERAÇÃO — manipular a visualização (aprender fazendo)│
├─ 4. EXERCÍCIO — aplicar (quiz / arrastar / completar)    │
├─ 5. AVALIAÇÃO — o gate de progressão (acerto verificável)│
└─ 6. RESUMO    — "o que levar" + ponte para o próximo cap.│
```

**Princípios pedagógicos da trilha:**
- **Conceito sempre precede interação; interação sempre precede avaliação.** Nunca testar antes de
  deixar explorar.
- **Errar é barato e informativo.** Exercícios dão feedback explicativo (estilo XAI), nunca só
  "errado".
- **Cada capítulo cabe numa sessão curta** (5–12 min). Sessões longas matam conclusão.
- **O capítulo é autoexplicativo** (sem narrador), mas ganha sentido extra na sequência.

### 1.1 Estados de capítulo (UI)

`bloqueado` (cadeado, anterior não concluído) → `disponível` → `em progresso` → `concluído` (check) →
`revisitado`. Persistidos em `localStorage`.

### 1.2 Critério genérico de progressão (gate)

Um capítulo conclui quando: (a) o usuário interagiu com a visualização **pelo menos uma vez**, e
(b) acertou a avaliação (≥ limiar do capítulo). Em modo exploração livre, gates são suspensos.

> **Nota de acessibilidade.** Nenhum gate pode depender exclusivamente de uma interação visual/mouse.
> Toda avaliação tem caminho por teclado e equivalente textual (ver [08](08_acessibilidade_e_metricas.md)).

---

## 2. Visão geral da trilha

| Cap | Título | Princípio | Duração | Dificuldade | Interação-núcleo |
| :-: | :-- | :-- | :-- | :-- | :-- |
| 1 | Da magia à engenharia | tese geral | 6 min | ★☆☆ | Toggle caos ↔ disciplina |
| 2 | Orquestração determinística | P1, P2 | 10 min | ★★☆ | DAG passo-a-passo vs. agentes livres |
| 3 | Cérebro vs. Vitrine | P3 | 8 min | ★★☆ | Separar peças nos dois lados do contrato |
| 4 | Determinístico-primeiro | P4 | 8 min | ★★☆ | Marcar campos estruturado × resíduo |
| 5 | Contratos rígidos | P5 | 9 min | ★★☆ | Passar payloads pelo "firewall" de schema |
| 6 | Open-World e camadas | P6, P7 | 10 min | ★★★ | Classificar afirmações; ausência ≠ falso |
| 7 | FinOps | P8 | 11 min | ★★★ | Ledger vivo + ondas até o teto |
| 8 | BDD para IA | P9 | 10 min | ★★★ | Montar Given/When/Then nos 3 eixos |
| 9 | XAI | P10 | 9 min | ★★☆ | Desmontar score em drivers + lacunas |
| 10 | Projeto completo | todos | 15 min | ★★★ | Capstone no Playground |

Total estimado: **~96 min** distribuídos em sessões curtas.

---

## 3. Detalhamento dos capítulos

### Cap. 1 — Da magia à engenharia

- **Objetivo:** distinguir "tratar o modelo como mágica" de "tratá-lo como engenharia"; nomear as 4
  patologias do caos (loops, custo imprevisível, alucinação sistêmica, irreprodutibilidade).
- **Conceitos:** a tese central; a analogia do banco de dados ("ninguém deixa o BD decidir livremente
  o que fazer com cada transação — ele opera dentro de constraints").
- **Interação:** um **toggle "Caos ↔ Disciplina"** sobre o mesmo sistema; ao alternar, o usuário vê
  as 4 patologias aparecerem/sumirem (ver visualização em [04](04_visualizacoes_interativas.md)).
- **Exercício:** dado 4 sintomas, arrastar cada um para a patologia correta.
- **Avaliação (gate):** acertar ≥ 3/4 da classificação.
- **Resume:** "A cura para o caos é engenharia. Os próximos 9 capítulos são as ferramentas dessa
  engenharia." → ponte para Cap. 2.

### Cap. 2 — Orquestração determinística

- **Objetivo:** explicar por que o **LLM é componente, não piloto**; separar camada de orquestração/IO
  da camada de decisão/cálculo; defender determinismo como invariante testável.
- **Conceitos:** DAG de etapas fixas; "o LLM responde perguntas, não decide quais perguntas fazer";
  determinismo = mesma entrada → mesma saída (relógio/RNG injetados; ordenar antes de reduzir).
- **Interação:** **DAG animado executando passo a passo** (M1→M5 do SocialSelling como exemplo) ao
  lado de uma maranha de "agentes livres" que entra em loop. Botão "executar duas vezes" → o DAG dá
  saída idêntica; o agente livre diverge.
- **Exercício:** classificar 4 mini-arquiteturas em "pipeline determinístico" vs. "agente livre".
- **Avaliação (gate):** ≥ 3/4; bônus: apontar a fonte de não-determinismo (relógio interno) num
  trecho dado.
- **Resumo:** "Autonomia mora na borda de I/O; o cálculo é puro." → ponte para Cap. 3 (onde fica a
  borda?).

### Cap. 3 — Cérebro vs. Vitrine

- **Objetivo:** justificar o desacoplamento bimodal: motor cognitivo (pesado, sensível) × interface
  (leve, exposta), unidos por **contrato estreito**, nunca por banco compartilhado.
- **Conceitos:** tabela Cérebro × Vitrine (natureza, frequência de mudança, sensibilidade, custo de
  erro); a analogia cozinha × salão ("você não põe o fogão no meio das mesas").
- **Interação:** **arrastar peças** (lógica de scoring, chaves, snapshot de apresentação, coleta de
  feedback, banco) para o lado certo (Cérebro ou Vitrine). Tentar pôr o banco "nos dois" dispara o
  alerta "o motor nunca acessa o banco — só HTTP".
- **Exercício:** marcar quais dados podem cruzar o contrato HTTP (snapshot sem score ✓; evidência
  bruta ✗).
- **Avaliação (gate):** classificação correta das peças + 1 pergunta sobre idempotência da publicação.
- **Resumo:** "Duas cargas opostas, dois sistemas, um contrato mínimo." → ponte para Cap. 4.

### Cap. 4 — Determinístico-primeiro

- **Objetivo:** identificar o **resíduo interpretativo** — gastar LLM só no que dados estruturados
  não cobrem.
- **Conceitos:** "cada responsabilidade tirada do LLM é uma fonte de alucinação eliminada"; Apollo
  como evidência observada (não inferência); escada de enriquecimento.
- **Interação:** dada uma ficha de lead com vários campos, o usuário **marca cada campo** como
  "resolvível por fonte estruturada" ou "resíduo (precisa LLM)". A barra de custo cai conforme ele
  tira trabalho do LLM.
- **Exercício:** para uma nova tarefa, escolher onde NÃO usar IA.
- **Avaliação (gate):** classificar ≥ 80% dos campos corretamente.
- **Resumo:** "Menos IA = menos custo e menos alucinação, ao mesmo tempo." → ponte para Cap. 5 (como
  blindar o pouco de IA que sobra?).

### Cap. 5 — Contratos rígidos

- **Objetivo:** reconhecer que toda fronteira — e toda saída de LLM — passa por schema estrito que
  **rejeita o inesperado** (`extra="forbid"`, ranges no schema, degradar item a item).
- **Conceitos:** "a saída do LLM é input não confiável até ser validada"; analogia do validador de
  formulário do backend.
- **Interação:** o **"firewall de schema"** — o usuário tenta empurrar payloads pelo contrato: um
  válido passa (verde); um com campo inventado / score 1.7 / tipo errado **bate na parede** e mostra
  o motivo da rejeição (ver [04](04_visualizacoes_interativas.md)).
- **Exercício:** dado um schema e 4 payloads, prever quais passam.
- **Avaliação (gate):** ≥ 3/4 previsões corretas.
- **Resumo:** "O contrato é a primeira linha de defesa contra alucinação estrutural." → ponte para
  Cap. 6.

### Cap. 6 — Open-World e camadas epistêmicas

- **Objetivo (duplo, P6+P7):** não confundir evidência/inferência/julgamento; tratar ausência de
  sinal como **incerteza**, nunca como "falso".
- **Conceitos:** as 3 camadas (observado ≠ inferido ≠ avaliado) com proveniência/`derived_from`;
  Open-World vs. Closed-World; "ensine o sistema a dizer 'não sei'"; falha de sensor degrada para
  incerteza, não para valor inventado. (`[V1+]`: menção à tripla ω de Jøsang como aprofundamento
  opcional, conscientemente diferida.)
- **Interação (2 partes):** (a) **classificar afirmações** nas 3 camadas (uma inferência disfarçada
  de fato é a pegadinha); (b) **toggle "sinal ausente"** → o sistema mostra `missing evidence` /
  incerteza↑ em vez de marcar "falso".
- **Exercício:** cenário "não encontramos sinal de contratação" → escolher a interpretação correta.
- **Avaliação (gate):** classificação das camadas correta + acerto no cenário Open-World.
- **Resumo:** "Incerteza é estado de primeira classe; mostrar a lacuna gera confiança." → ponte para
  Cap. 7.

### Cap. 7 — FinOps

- **Objetivo:** governar orçamento como **estado de domínio persistente** (ledger), não try/except de
  429; aplicar poda precoce e processamento em ondas + cache (corpus).
- **Conceitos:** RPD/créditos como gargalo real; ledger persistente com reset por período (relógio
  injetado); gasto direcionado a valor (revelar contato só do topo); "nunca pague duas vezes pelo
  mesmo processamento".
- **Interação:** **ledger vivo** — o usuário dispara "runs"; a cada run o orçamento debita e o ledger
  recusa o gasto ao bater o teto, marcando o restante como **pendente** (não erro). Um botão "ondas"
  mostra o trabalho retomando no dia seguinte; um botão "cache/corpus" mostra itens já processados
  sendo pulados (ver [04](04_visualizacoes_interativas.md)).
- **Exercício:** dado um teto e um volume, escolher a estratégia (ondas vs. run heróico) e prever se
  estoura.
- **Avaliação (gate):** levar o orçamento ao teto sem quebrar o sistema (só "pendente") + responder
  por que cache reduz custo por item ao crescer.
- **Resumo:** "Quota é estado de domínio; o trabalho de ontem é ativo, não custo recorrente." →
  ponte para Cap. 8.

### Cap. 8 — BDD para IA

- **Objetivo:** especificar comportamento com cenários Given/When/Then + fixtures gravadas; cobrir os
  **3 eixos obrigatórios** (feliz · degradado · Open-World); entender DoR/DoD e fail-closed.
- **Conceitos:** isolar a estocasticidade nos testes; "você não testa se o modelo é inteligente —
  testa se o sistema ao redor continua correto quando o modelo/rede/dados falham"; DoR/DoD como
  portões; "um BLOQUEADO honesto é sucesso do processo".
- **Interação:** **montar um cenário BDD** arrastando blocos Given/When/Then; o sistema "executa"
  visualmente o cenário sobre um pipeline mock e acende verde/vermelho. O usuário precisa adicionar
  os 3 eixos para o card "passar no DoR".
- **Exercício:** completar o eixo que falta (ex.: só tem caminho feliz → falta degradado e
  open-world).
- **Avaliação (gate):** cenário com os 3 eixos presentes e executando verde.
- **Resumo:** "BDD com cenários degradados é o que deixa você dormir tranquilo." → ponte para Cap. 9.

### Cap. 9 — XAI

- **Objetivo:** transformar um score opaco em **drivers (a favor/contra) + lacunas + proveniência**;
  gerar explicação por **regras determinísticas** sobre o mesmo objeto do score (não 2ª chamada de
  LLM); considerar esconder o número.
- **Conceitos:** "0,674 não é acionável"; a explicação fiel vs. racionalização posterior; mostrar a
  lacuna (Open-World) aumenta confiança.
- **Interação:** **desmontagem da decisão** — clicar num lead e ver o score "explodir" em seus
  drivers positivos/negativos, sinais ausentes e a fonte (url/snippet) de cada sinal (ver
  [04](04_visualizacoes_interativas.md)). Um toggle "mostrar número" demonstra por que os drivers
  convencem mais.
- **Exercício:** dado um conjunto de sinais, montar a explicação "por que agora" + "o que falta
  saber".
- **Avaliação (gate):** explicação montada cobre ≥ 1 driver positivo, ≥ 1 lacuna e a proveniência.
- **Resumo:** "Confiança vem da clareza da justificativa, não da precisão do número." → ponte para
  Cap. 10.

### Cap. 10 — Projeto completo (capstone)

- **Objetivo:** integrar os 10 princípios montando uma arquitetura ponta a ponta para um problema
  dado e **defendendo cada escolha**.
- **Conceitos:** recapitulação visual dos 10 princípios como "peças de um todo".
- **Interação:** abre o **Playground** (doc 06) com um briefing ("priorize leads para uma operadora,
  tier gratuito, dado sensível"). O usuário monta: fonte → contrato → motor (DAG) → ledger → BDD →
  vitrine → XAI.
- **Exercício/Avaliação (gate de conclusão do site):** a arquitetura é avaliada pelas regras do
  Playground — **sem loops, contrato em toda fronteira, ledger presente, BDD declarado, camada de
  explicação, Cérebro/Vitrine separados**. Feedback estilo XAI explica cada lacuna.
- **Resumo / Encerramento:** "Sistemas de IA confiáveis não nascem de prompts mais inteligentes —
  nascem de arquitetura mais disciplinada." CTA: Referência, Casos Reais, compartilhar.

---

## 4. Sistema de progressão e avaliação (global)

- **Trilha de progresso:** anel/barra com 10 nós; nós destravam em sequência (modo A) ou ficam todos
  abertos (modo B).
- **Pontuação:** por capítulo, simples (acertou o gate / quantas tentativas). **Sem ranking
  competitivo** — o objetivo é domínio, não gamificação vazia.
- **Feedback de erro:** sempre explicativo. Ex.: "Errado — este campo vem do Apollo (estruturado),
  então não é resíduo interpretativo." (modela o princípio XAI no próprio feedback).
- **Revisão:** capítulo concluído fica `revisitável`; um modo "revisar conceito" reabre só a
  visualização.
- **Persistência:** `localStorage` (chave por capítulo: estado, tentativas, melhor resultado). Sem
  login. Reset manual disponível.

### 4.1 Ficha técnica (resumo)

- **Objetivo:** trilha guiada com gates e progresso persistente.
- **UX:** sessões curtas, feedback explicativo, dois modos (linear/livre).
- **Componentes:** Mapa da trilha, Cabeçalho de capítulo, blocos 1–6, Quiz, Feedback XAI, Progresso.
- **Tecnologias:** HTML/Tailwind; estado em JS + `localStorage`; visualizações por capítulo (ver 04).
- **Complexidade:** **Média** (a complexidade real está nas visualizações, não na trilha).
- **Riscos:** abandono no meio; capítulos longos demais. **Mitigação:** sessões curtas, "continue de
  onde parou", gates leves, métricas de abandono por capítulo (ver [08](08_acessibilidade_e_metricas.md)).

---

### Referências cruzadas

- Modos de navegação (linear × livre) → [01](01_arquitetura_informacao_e_sitemap.md)
- Visualização-núcleo de cada capítulo → [04](04_visualizacoes_interativas.md)
- Capstone (Playground) → [06](06_simulador_e_playground.md)
- Wireframe de capítulo e do mapa da trilha → [03](03_wireframes_e_catalogo_de_componentes.md)
