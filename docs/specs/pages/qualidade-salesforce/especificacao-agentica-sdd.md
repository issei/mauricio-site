# Especificação Agêntica (SDD) — Site de Documentação Técnica: Arquitetura E2E Salesforce com Playwright

**Tipo de documento:** Especificação de orquestração multi-agente para Claude Code
**Fonte de verdade do conteúdo:** `00-Prompt.md` (especificação funcional do site)
**Escopo deste documento:** organização do trabalho, não o conteúdo do site
**Metodologia:** Spec-Driven Development (SDD)

---

## 1. Objetivo desta especificação

Este documento define **como o desenvolvimento do site será decomposto, orquestrado e validado** por múltiplos agentes operando sob Claude Code, e não o conteúdo final do site (que é regido por `00-Prompt.md`).

O objetivo é permitir que:

1. Cada agente opere sobre um **escopo fechado, testável e independente**;
2. O trabalho possa ser **paralelizado** sempre que não houver dependência de contrato;
3. Cada modelo Anthropic seja alocado à tarefa que melhor aproveita seu perfil de custo/latência/raciocínio;
4. Toda entrega tenha **Definition of Ready (DoR)** e **Definition of Done (DoD)** verificáveis, evitando retrabalho por ambiguidade de escopo.

Não há geração de código nesta especificação — apenas a estrutura de trabalho, contratos entre agentes e critérios de aceite.

---

## 2. Princípios de SDD aplicados

| Princípio SDD | Aplicação neste projeto |
|---|---|
| A especificação é a fonte de verdade, não o código/conteúdo já escrito | Nenhum agente de conteúdo escreve uma seção sem um *spec file* aprovado para ela |
| Specs são artefatos versionáveis e revisáveis | Cada pacote de trabalho (WP) gera um arquivo de spec em `specs/` antes da implementação |
| A implementação é derivada da spec, não o inverso | Agentes de conteúdo/UX implementam a partir do spec; divergências geram atualização do spec, não do texto solto |
| Specs têm contratos explícitos de entrada/saída | Cada agente declara o que consome (inputs) e o que produz (outputs), permitindo paralelismo seguro |
| Validação é parte da spec, não uma etapa posterior informal | Cada spec já embute seu DoD; o agente de QA valida contra a spec, não contra "achismo" |
| Mudança de escopo = mudança de spec | Qualquer ajuste no prompt original (`00-Prompt.md`) deve primeiro alterar o spec afetado, com rastreabilidade |

---

## 3. Estrutura de artefatos (specs) como fonte de verdade

Antes de qualquer agente produzir conteúdo, o **Agente Orquestrador/Arquiteto de Especificação** cria um conjunto de arquivos de especificação que funcionam como contrato entre todos os agentes:

| Arquivo de spec | Conteúdo | Consumido por |
|---|---|---|
| `specs/00-information-architecture.md` | Mapa de páginas, hierarquia de navegação, slugs, breadcrumbs, ordem de leitura | Todos os agentes |
| `specs/01-design-system.md` | Tokens visuais, tipografia, componentes reutilizáveis (callouts, tabelas, comparativos, FAQ, badges de risco), padrões de diagrama | Agente de UX/Shell, Agentes de Conteúdo |
| `specs/02-content-model.md` | Estrutura padrão de uma "seção autocontida": título, resumo, corpo, boxes de destaque, referências cruzadas, FAQ | Agentes de Conteúdo |
| `specs/03-glossario-e-terminologia.md` | Termos técnicos padronizados (UTAM, storageState, Quality Gate, Composite API, etc.) e nível de profundidade assumido para o público-alvo | Todos os agentes de conteúdo |
| `specs/04-mapa-de-diagramas.md` | Lista de diagramas necessários, tipo (arquitetura, fluxo, timeline), dados de entrada de cada um | Agente de Diagramas |
| `specs/05-plano-de-paralelizacao.md` | Grafo de dependências entre pacotes de trabalho e fases de execução | Orquestrador, todos os agentes |
| `specs/06-checklist-qa.md` | Critérios de validação (consistência, navegação, tom de linguagem, cobertura das perguntas do prompt original) | Agente de QA/Revisão |

Nenhum agente de conteúdo ou de UX começa a produzir sem que os specs `00`, `01`, `02` e `03` estejam com status **Aprovado**.

---

## 4. Arquitetura de agentes

### 4.1 Papéis

```
                        Agente 0 — Orquestrador / Arquiteto de Especificação
                                          |
        -----------------------------------------------------------------------
        |                    |                    |                    |
Agente 1 — UX/Shell   Agente 2 — Diagramas   Agentes 3.x — Conteúdo   Agente 4 — QA/Revisão
                                                (paralelizáveis)
                                          |
                              Agente 5 — Integração/Publicação
```

*(Representação textual do fluxo de dependência — não é um diagrama a ser renderizado, apenas a hierarquia lógica de agentes.)*

### 4.2 Papel de cada agente

**Agente 0 — Orquestrador / Arquiteto de Especificação**
Responsável por interpretar `00-Prompt.md`, produzir todos os arquivos em `specs/`, definir a decomposição em pacotes de trabalho (WPs), atribuir modelo recomendado a cada WP, e manter o `05-plano-de-paralelizacao.md` atualizado. É o único agente autorizado a alterar specs após aprovação inicial.

**Agente 1 — UX/Shell (Estrutura de Navegação e Componentes)**
Constrói a casca do site: layout base, navegação lateral fixa, índice automático, breadcrumbs, componentes reutilizáveis (caixas de destaque, blocos de atenção, blocos de boas práticas, tabelas comparativas, FAQ, badges de risco/probabilidade/impacto). Não escreve conteúdo técnico do domínio Salesforce/Playwright — apenas estrutura e componentes.

**Agente 2 — Diagramas e Elementos Visuais**
Produz todos os diagramas exigidos (visão geral da arquitetura, fluxo completo E2E, pipeline CI/CD, roadmap em linha do tempo) a partir de `04-mapa-de-diagramas.md`, seguindo os tokens visuais definidos em `01-design-system.md`.

**Agentes 3.x — Conteúdo (um agente por cluster de seções)**
Cada agente 3.x é responsável por um cluster de seções do site (ver Seção 6). Todos consomem os mesmos specs de base (`01`, `02`, `03`) para garantir consistência de tom, profundidade e terminologia, mas trabalham em arquivos/páginas distintos, o que permite paralelismo real.

**Agente 4 — QA / Revisão Técnica e Editorial**
Valida cada entrega de conteúdo e de UX contra o DoD do respectivo WP e contra `06-checklist-qa.md`. Verifica: cobertura das perguntas-objetivo do prompt original, ausência de tom comercial/promocional, consistência terminológica, navegação funcional, autocontenção das seções, presença de trade-offs em cada decisão arquitetural.

**Agente 5 — Integração / Publicação**
Consolida as entregas aprovadas pelo Agente 4 em uma estrutura navegável única, resolve links cruzados entre seções, garante que o índice automático e as breadcrumbs reflitam a estrutura final, e produz o pacote final do site.

---

## 5. Critério de seleção de modelo por tipo de tarefa

A alocação de modelo segue o perfil de raciocínio exigido por cada tarefa, não uma preferência fixa por agente — um mesmo agente pode trocar de modelo conforme a fase do trabalho.

| Tipo de tarefa | Modelo recomendado | Justificativa |
|---|---|---|
| Interpretação do prompt original, decomposição em specs, definição de contratos entre agentes, resolução de ambiguidades de escopo | **Opus** | Exige raciocínio de arquitetura, julgamento sobre trade-offs de decomposição e antecipação de dependências ocultas — baixo volume, alto valor por decisão |
| Redação de seções que exigem julgamento técnico aprofundado: "Decisões Arquiteturais", "Riscos Técnicos", "Fora do Escopo" | **Opus** (ou Sonnet com revisão adicional do Agente 4) | Estas seções exigem articulação de causa/efeito, alternativas descartadas e trade-offs — não são meramente descritivas |
| Redação da maior parte das seções descritivas/explicativas: "O Problema", "Componentes da Solução", "Estratégia de Dados", "Pipeline de Execução", "Observabilidade", "Roadmap", "Conclusões" | **Sonnet** | Bom equilíbrio entre profundidade técnica e produtividade; volume alto de texto estruturado, risco moderado de ambiguidade |
| Construção de componentes de UX/Shell (navegação, índice automático, breadcrumbs, componentes reutilizáveis) | **Sonnet** | Tarefa estrutural com regras claras vindas do design system; não exige julgamento de domínio Salesforce |
| Geração de diagramas a partir de especificação já definida em `04-mapa-de-diagramas.md` | **Sonnet** | Tradução de uma especificação estruturada em representação visual; criatividade limitada e guiada por tokens já definidos |
| Validação de consistência terminológica, checagem de links, verificação de formatação, aplicação de checklist de QA mecânico | **Haiku** | Tarefas de verificação padronizada e repetitiva, alto volume, baixo grau de ambiguidade |
| Normalização de tom (remoção de expressões comerciais/exageradas), checagem ortográfica e de estilo | **Haiku** | Tarefa de varredura textual com regras objetivas definidas no glossário e no design system |
| Integração final, resolução de links cruzados, montagem do pacote publicável | **Sonnet** | Exige coordenação entre múltiplas saídas, mas sem julgamento de domínio profundo |

**Regra geral:** Opus é reservado para decisões que definem contrato entre agentes ou que exigem argumentação técnica de trade-off; Sonnet cobre a produção principal de conteúdo e estrutura; Haiku cobre validação mecânica e normalização, permitindo rodadas de verificação frequentes sem custo elevado.

---

## 6. Decomposição do escopo em Pacotes de Trabalho (WPs)

### WP-00 — Especificação Mestra
- **Agente:** 0 (Orquestrador)
- **Modelo:** Opus
- **Entradas:** `00-Prompt.md`
- **Saídas:** todos os arquivos em `specs/` (seção 3), incluindo plano de paralelização
- **Depende de:** nada (ponto de partida)
- **Pode paralelizar com:** nada — é bloqueante para todos os demais WPs

**DoR:**
- `00-Prompt.md` disponível e sem ambiguidades não documentadas
- Público-alvo e objetivos do site confirmados

**DoD:**
- Todos os arquivos de `specs/` criados e com status "Aprovado"
- Toda seção do prompt original mapeada a pelo menos um WP (sem lacunas)
- Grafo de dependências entre WPs documentado e sem ciclos
- Modelo recomendado atribuído a cada WP com justificativa

---

### WP-01 — Design System e Shell de Navegação
- **Agente:** 1
- **Modelo:** Sonnet
- **Entradas:** `01-design-system.md`, `00-information-architecture.md`
- **Saídas:** estrutura de layout, navegação lateral, índice automático, breadcrumbs, biblioteca de componentes (callouts, tabelas comparativas, blocos de atenção/boas práticas/recomendações, FAQ, badges de risco)
- **Depende de:** WP-00
- **Pode paralelizar com:** WP-02, WP-03.x (parcialmente — ver nota abaixo)

**DoR:**
- `01-design-system.md` e `00-information-architecture.md` aprovados
- Lista fechada de tipos de componente exigidos pelo prompt original (caixas de destaque, comparativos, FAQs, blocos de atenção, blocos de boas práticas, blocos de recomendações)

**DoD:**
- Todos os tipos de componente da lista implementados e documentados com exemplo de uso
- Navegação lateral fixa, índice automático e breadcrumbs funcionais em uma página de referência
- Nenhuma dependência de conteúdo técnico específico do domínio Salesforce embutida na estrutura (shell é agnóstico de conteúdo)

*Nota de paralelismo:* WP-01 pode iniciar em paralelo aos WPs de conteúdo (3.x), desde que os agentes de conteúdo utilizem placeholders de componente definidos no spec até a entrega final do shell — a integração real ocorre no WP-05.

---

### WP-02 — Diagramas e Elementos Visuais
- **Agente:** 2
- **Modelo:** Sonnet
- **Entradas:** `04-mapa-de-diagramas.md`, `01-design-system.md`
- **Saídas:** diagrama de visão geral da arquitetura (Salesforce, Playwright, UTAM, Azure AD, Flosum, Quality Gates), fluxograma do fluxo completo E2E, fluxograma do pipeline CI/CD, linha do tempo do roadmap de implementação
- **Depende de:** WP-00
- **Pode paralelizar com:** WP-01, WP-03.x

**DoR:**
- `04-mapa-de-diagramas.md` aprovado, com todos os elementos e relações que cada diagrama deve representar listados explicitamente

**DoD:**
- Todos os diagramas listados em `04-mapa-de-diagramas.md` produzidos
- Cada diagrama utiliza a paleta e tipografia do design system
- Cada diagrama é referenciável por um identificador único, permitindo que os agentes de conteúdo o incorporem por referência (não por cópia)

---

### WP-03.1 — Conteúdo: Introdução e Contexto
- **Agente:** 3.1
- **Modelo:** Sonnet
- **Seções cobertas:** Hero, O Problema, Visão Geral da Arquitetura
- **Entradas:** `01`, `02`, `03`, diagrama de visão geral (WP-02)
- **Depende de:** WP-00; referencia diagrama de WP-02 (pode usar placeholder até entrega final)
- **Pode paralelizar com:** WP-03.2, 03.3, 03.4, 03.5, WP-01, WP-02

**DoR:**
- Glossário (`03`) aprovado, com definição do nível de profundidade assumido para o público-alvo
- Identificador do diagrama de visão geral reservado em `04-mapa-de-diagramas.md`

**DoD:**
- Resumo executivo presente e sem linguagem promocional
- Todas as dificuldades listadas no prompt original cobertas (testes manuais, confiabilidade de deploys, custo de manutenção, ambientes Enterprise, releases sazonais)
- Papel de cada componente (Salesforce, Playwright, UTAM, Azure AD, Flosum, Quality Gates) explicado na Visão Geral
- Seção autocontida: leitor consegue entender o propósito da arquitetura sem ler outras seções

---

### WP-03.2 — Conteúdo: Fluxo, Pipeline e Dados
- **Agente:** 3.2
- **Modelo:** Sonnet
- **Seções cobertas:** Fluxo Completo, Pipeline de Execução, Estratégia de Dados
- **Entradas:** `01`, `02`, `03`, diagramas de fluxo e pipeline (WP-02)
- **Depende de:** WP-00
- **Pode paralelizar com:** WP-03.1, 03.3, 03.4, 03.5

**DoR:**
- Sequência oficial do fluxo (desenvolvimento → deploy via Flosum → execução Playwright → massa de dados → testes → evidências → publicação → Quality Gate → aprovação/bloqueio) validada no spec de arquitetura da informação

**DoD:**
- Todos os passos do fluxo completo descritos com transição explícita entre etapas
- Estratégia de dados cobre: dados efêmeros, limpeza automática, isolamento entre testes, prevenção de `UNABLE_TO_LOCK_ROW`, boas práticas
- Pipeline cobre: gatilhos, validações, execução paralela, publicação de resultados, aprovação, rollback assistido
- Cada etapa referencia o diagrama correspondente por identificador (sem duplicar a explicação visual em texto redundante)

---

### WP-03.3 — Conteúdo: Decisões Arquiteturais
- **Agente:** 3.3
- **Modelo:** **Opus** (exceção dentro do cluster de conteúdo)
- **Seções cobertas:** Decisões Arquiteturais (UTAM, storageState, autenticação única, Smoke x Regression, criação de dados via API, paralelismo, observabilidade, rollback controlado)
- **Entradas:** `01`, `02`, `03`
- **Depende de:** WP-00
- **Pode paralelizar com:** WP-03.1, 03.2, 03.4, 03.5

**DoR:**
- Lista fechada de decisões a documentar confirmada (mínimo as 8 listadas no prompt original)
- Template de estrutura por decisão aprovado em `02-content-model.md`: problema existente, alternativa considerada, decisão adotada, justificativa técnica, benefícios, trade-offs

**DoD:**
- Cada decisão segue o template completo, sem omitir trade-offs (rejeitar entrega que apresente apenas benefícios)
- Nenhuma decisão apresentada como "óbvia" sem alternativa considerada explicitada
- Uso de analogias sempre que aplicável para conceitos de maior abstração (ex.: UTAM como camada adaptadora), sem exagero retórico

**Justificativa da escolha de Opus:** esta seção exige argumentação comparativa (alternativa vs. decisão adotada) e articulação de trade-offs reais — é o núcleo de raciocínio arquitetural do site, com maior risco de superficialidade se delegada a um modelo otimizado para produção de volume.

---

### WP-03.4 — Conteúdo: Componentes da Solução e Observabilidade
- **Agente:** 3.4
- **Modelo:** Sonnet
- **Seções cobertas:** Componentes da Solução (Playwright, UTAM, Azure AD, Flosum, REST API, Composite API, Browser Context, storageState, Workers, Trace Viewer, HTML Report), Observabilidade
- **Entradas:** `01`, `02`, `03`
- **Depende de:** WP-00
- **Pode paralelizar com:** WP-03.1, 03.2, 03.3, 03.5

**DoR:**
- Lista fechada dos 11 componentes confirmada
- Template por componente aprovado: objetivo, funcionamento, vantagens, limitações, integração com os demais componentes

**DoD:**
- Todos os 11 componentes documentados com o template completo
- Seção de Observabilidade explicita quando usar HTML Report, Trace Viewer, Screenshots e Datadog, sem sobreposição redundante com o que já foi dito em Componentes da Solução
- Referências cruzadas entre componentes relacionados (ex.: storageState ↔ Browser Context ↔ autenticação única) implementadas como links internos

---

### WP-03.5 — Conteúdo: Riscos, Escopo, Roadmap e Conclusões
- **Agente:** 3.5
- **Modelo:** Sonnet, com **checagem adicional em Opus** apenas para a subseção de Riscos Técnicos
- **Seções cobertas:** Riscos Técnicos, Fora do Escopo, Roadmap de Implementação, Conclusões
- **Entradas:** `01`, `02`, `03`, diagrama de roadmap (WP-02)
- **Depende de:** WP-00
- **Pode paralelizar com:** WP-03.1, 03.2, 03.3, 03.4

**DoR:**
- Lista fechada de riscos a cobrir confirmada (releases Salesforce, mudanças de DOM, MFA, Azure AD, ambientes compartilhados, integrações externas, processamento assíncrono, paralelismo, múltiplos perfis de acesso)
- Template por risco aprovado: descrição, impacto, probabilidade, mitigação, boas práticas

**DoD:**
- Todos os riscos listados no prompt original cobertos com o template completo
- Fora do Escopo justifica tecnicamente cada exclusão (testes unitários Apex, Jest, performance, DAST, SAST, acessibilidade, contrato) — não apenas lista os itens
- Roadmap referencia o diagrama de linha do tempo (WP-02) sem duplicar a descrição textual
- Conclusões cobrem todos os ganhos listados no prompt original (confiabilidade, manutenção, padronização, escalabilidade, governança, produtividade, sustentabilidade)

---

### WP-04 — QA / Revisão Técnica e Editorial
- **Agente:** 4
- **Modelo:** Haiku para varredura mecânica; **Sonnet** para revisão de coerência técnica e argumentativa; escalonamento pontual para **Opus** em caso de divergência não resolvida sobre uma decisão arquitetural
- **Entradas:** todas as saídas de WP-01, WP-02, WP-03.x; `06-checklist-qa.md`
- **Depende de:** conclusão de cada WP individual (roda de forma incremental, não apenas no final)
- **Pode paralelizar com:** pode iniciar revisão de um WP assim que ele for entregue, mesmo que outros WPs ainda estejam em andamento

**DoR:**
- `06-checklist-qa.md` aprovado, cobrindo no mínimo:
  - Cobertura de todas as perguntas-objetivo listadas na seção "Objetivos do site" do prompt original
  - Ausência de linguagem comercial/promocional/exagerada
  - Consistência terminológica com `03-glossario-e-terminologia.md`
  - Autocontenção de cada seção (permite leitura independente)
  - Presença de trade-offs em toda decisão arquitetural
  - Funcionamento de navegação lateral, índice automático e breadcrumbs
  - Presença de todos os componentes de UX exigidos (caixas de destaque, comparativos, FAQs, blocos de atenção/boas práticas/recomendações)

**DoD:**
- Todo WP revisado tem parecer registrado: Aprovado / Aprovado com ressalvas / Reprovado com motivo
- Nenhum WP reprovado segue para integração (WP-05) sem nova rodada de correção e reaprovação
- Relatório consolidado de QA disponível para o Agente 0, permitindo ajuste de specs se a causa-raiz for ambiguidade de escopo (não erro de execução)

---

### WP-05 — Integração e Publicação
- **Agente:** 5
- **Modelo:** Sonnet
- **Entradas:** todas as saídas aprovadas pelo Agente 4
- **Depende de:** aprovação de WP-01, WP-02 e de todos os WP-03.x pelo WP-04
- **Pode paralelizar com:** nada — é o ponto de convergência final

**DoR:**
- Todos os WPs de conteúdo, UX e diagramas com status "Aprovado" pelo Agente 4
- `00-information-architecture.md` não sofreu alteração não propagada desde a última revisão

**DoD:**
- Todas as páginas navegáveis a partir da navegação lateral e do índice automático
- Nenhum link cruzado quebrado entre seções
- Diagramas corretamente vinculados às seções que os referenciam
- Site revisado uma última vez quanto à cobertura integral das perguntas-objetivo do prompt original, agora em nível de produto final (não apenas por seção isolada)

---

## 7. Grafo de dependências e fases de paralelização

| Fase | WPs executáveis em paralelo | Bloqueio de entrada |
|---|---|---|
| Fase 0 | WP-00 | Nenhum |
| Fase 1 | WP-01, WP-02, WP-03.1, WP-03.2, WP-03.3, WP-03.4, WP-03.5 | WP-00 aprovado |
| Fase 2 (contínua, sobreposta à Fase 1) | WP-04 (revisão incremental por WP entregue) | Cada WP individual entregue |
| Fase 3 | WP-05 | Todos os WPs da Fase 1 aprovados na Fase 2 |

**Observação sobre paralelismo real:** os sete WPs da Fase 1 não possuem dependência de contrato entre si — todos consomem os mesmos specs de base (`01`, `02`, `03`) e produzem artefatos em arquivos/páginas distintos. Isso permite que até sete agentes operem simultaneamente após a aprovação do WP-00, com o Agente 4 revisando de forma incremental à medida que cada um entrega, em vez de aguardar o fechamento de todos.

---

## 8. Protocolo de consistência entre agentes paralelos

Como múltiplos agentes de conteúdo operam simultaneamente, os seguintes mecanismos evitam divergência:

1. **Glossário único (`03-glossario-e-terminologia.md`) é somente leitura para os agentes 3.x.** Qualquer termo não coberto deve ser escalado ao Agente 0 antes de uso, não decidido localmente por cada agente.
2. **Identificadores de diagrama são reservados previamente** em `04-mapa-de-diagramas.md`, permitindo que agentes de conteúdo referenciem um diagrama antes de ele estar pronto, sem travar o paralelismo.
3. **Nenhum agente de conteúdo cria novos tipos de componente de UX.** Se uma seção parecer exigir um componente não previsto em `01-design-system.md`, o agente escala ao Agente 0 em vez de improvisar, evitando fragmentação visual.
4. **Referências cruzadas entre seções são declaradas, não hardcoded.** Cada agente de conteúdo lista as seções às quais sua seção deveria linkar; a resolução final do link ocorre no WP-05, evitando quebra de link por mudança de estrutura durante o desenvolvimento paralelo.

---

## 9. Definition of Ready (DoR) global do projeto

Antes de a Fase 1 iniciar, os seguintes itens devem estar satisfeitos:

- `00-Prompt.md` interpretado sem ambiguidade residual quanto a escopo, público-alvo e tom de linguagem
- Todos os arquivos de `specs/` aprovados (WP-00 concluído)
- Modelo recomendado atribuído e justificado para cada WP
- Grafo de dependências sem ciclos e revisado pelo Agente 0
- Checklist de QA (`06-checklist-qa.md`) aprovado antes do início da produção de conteúdo, não depois

---

## 10. Definition of Done (DoD) global do produto

O site é considerado concluído quando, cumulativamente:

- Todas as seções da "Estrutura sugerida" do prompt original estão presentes e navegáveis
- Todas as perguntas listadas em "Objetivos do site" no prompt original têm resposta explícita e localizável em uma seção específica
- Toda decisão arquitetural documentada contém problema, alternativa considerada, decisão adotada, justificativa, benefícios e trade-offs
- Todo risco técnico documentado contém descrição, impacto, probabilidade, mitigação e boas práticas
- Nenhuma seção depende de leitura prévia de outra para ser compreendida (autocontenção)
- Navegação lateral fixa, índice automático e breadcrumbs funcionam em 100% das páginas
- Nenhum trecho de linguagem comercial, promocional ou de venda identificado pelo Agente 4
- Diagramas de arquitetura, fluxo completo, pipeline e roadmap presentes e corretamente referenciados
- Relatório final de QA sem pendências em aberto (todas ressalvas tratadas)

---

## 11. Riscos do processo multi-agente e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Divergência terminológica entre agentes de conteúdo paralelos | Inconsistência percebida pelo leitor, retrabalho de revisão | Glossário único somente-leitura (`03`); QA incremental por WP entregue |
| Agente de conteúdo antecipa estrutura de componente ainda não definida pelo WP-01 | Retrabalho de formatação na integração | Uso de identificadores/placeholders reservados em vez de estrutura ad hoc; resolução final apenas no WP-05 |
| Seção "Decisões Arquiteturais" ou "Riscos Técnicos" tratada com profundidade insuficiente por otimização de custo | Perda do objetivo central do site (explicar o "porquê") | Alocação obrigatória de Opus (ou revisão em Opus) para essas seções, conforme Seção 5 |
| Diagramas entregues fora de sincronia com o texto que os referencia | Referências cruzadas quebradas ou incoerentes | Reserva prévia de identificadores de diagrama; QA valida vínculo texto-diagrama antes da integração |
| Sobrecarga do Agente 0 como único ponto de decisão de escopo | Gargalo que anula o ganho de paralelismo | Escalonamentos direcionados ao Agente 0 devem ser objetivos e pontuais (termo, componente, dependência), nunca reabertura de spec inteira, salvo achado crítico |

---

## 12. Rastreabilidade

Cada WP definido neste documento deve manter, durante a execução, referência explícita à seção correspondente de `00-Prompt.md`, de modo que seja possível auditar, ao final, que **100% do escopo funcional original foi coberto por algum WP** — nenhuma seção do prompt original deve ficar sem agente responsável, e nenhum agente deve produzir conteúdo fora do que está coberto por um WP formalmente definido.
