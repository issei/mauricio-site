# 01 — Arquitetura da Informação e Sitemap

> Cobre os entregáveis **4 (Arquitetura da informação)** e **5 (Sitemap completo)**.
> Premissa herdada de [00](00_visao_produto_personas_objetivos.md): o site serve **dois modos
> simultâneos** — **trilha guiada linear** e **exploração livre por tópico**.

---

## 1. Modelo mental e taxonomia

O conteúdo se organiza em **quatro camadas de profundidade crescente**. O usuário desce as camadas
conforme seu engajamento, e cada persona "para" numa camada diferente.

```
CAMADA 0 — NARRATIVA      (assistir)   Home, Introdução          → executivo para aqui
CAMADA 1 — CONCEITO       (entender)   Princípios, Casos Reais   → PM/tech lead param aqui
CAMADA 2 — MANIPULAÇÃO    (aplicar)    Visualizações, Simulador  → arquiteto explora aqui
CAMADA 3 — CRIAÇÃO        (criar)      Jornada Guiada, Playground → dev/estudante completam aqui
```

**Eixos de taxonomia** (como o conteúdo é etiquetado e recuperável):

- **Por princípio** (P1…P10) — etiqueta primária; tudo é classificável por princípio.
- **Por formato** — narrativa · conceito · visualização · simulação · exercício · referência.
- **Por persona-alvo** — usada para sugerir trilhas e ordenar cards (não exposta cruamente).
- **Por nível** — introdutório · intermediário · avançado (`[V1+]` para o material diferido).

---

## 2. Sitemap completo

```
ENGENHARIA DE AGENTES DE IA  (/engenharia-agentes-ia)
│
├─ HOME  (#home)
│   ├─ Hero — "Pouca IA no caminho crítico"  (storyboard caos × disciplina)
│   ├─ A tese em 3 frases
│   ├─ Escolha seu caminho  (trilha guiada × exploração × só o essencial)
│   └─ Prova social / dogfooding  ("este site usa o que ensina")
│
├─ INTRODUÇÃO  (#introducao)        [Camada 0→1]
│   ├─ O caos dos prompts não estruturados  (loops, custo, alucinação, irreprodutibilidade)
│   ├─ A virada: engenharia sobre o estocástico
│   └─ Os 3 benefícios de negócio  (previsibilidade · segurança · escala)
│
├─ PRINCÍPIOS  (#principios)        [Camada 1] — hub de exploração livre
│   ├─ Grade dos 10 princípios  (cards clicáveis → Visualização + Capítulo)
│   ├─ P1 Orquestração determinística
│   ├─ P2 Determinismo testável
│   ├─ P3 Cérebro vs. Vitrine
│   ├─ P4 Determinístico-primeiro
│   ├─ P5 Contratos rígidos
│   ├─ P6 Camadas epistêmicas
│   ├─ P7 Open-World
│   ├─ P8 FinOps / ledgers
│   ├─ P9 Governança fail-closed (BDD, DoR/DoD)
│   └─ P10 XAI
│
├─ JORNADA GUIADA  (#jornada)       [Camada 3] — trilha linear estilo Brilliant
│   ├─ Mapa da trilha  (progresso, gates, estados)
│   ├─ Cap. 1  Da magia à engenharia
│   ├─ Cap. 2  Orquestração determinística
│   ├─ Cap. 3  Cérebro vs. Vitrine
│   ├─ Cap. 4  Determinístico-primeiro
│   ├─ Cap. 5  Contratos rígidos
│   ├─ Cap. 6  Open-World (+ camadas epistêmicas)
│   ├─ Cap. 7  FinOps
│   ├─ Cap. 8  BDD para IA
│   ├─ Cap. 9  XAI
│   └─ Cap. 10 Projeto completo  (capstone → Playground)
│
├─ SIMULADOR  (#simulador)          [Camada 2] — laboratório de trade-offs
│   ├─ Painel de parâmetros  (autonomia, temperatura, schemas, cache, ledger, revisão, BDD, evals, obs.)
│   ├─ Medidores em tempo real  (custo, confiança, velocidade, risco, auditabilidade, previsibilidade)
│   └─ Cenários pré-definidos  ("demo caótica" × "produção disciplinada")
│
├─ PADRÕES  (#padroes)              [Camada 1→2]
│   ├─ Catálogo de padrões arquiteturais  (DAG, bimodal, deterministic-first, ledger, ondas+corpus…)
│   ├─ Diagramas BPMN  (fluxos corretos × problemáticos)
│   └─ Anti-padrões  (autonomia total, inferência-como-evidência, sem ledger…)
│
├─ GOVERNANÇA AGENT-DRIVEN  (#governanca)   [Camada 1→2] — repositório "To-Be" (doc 10)
│   ├─ Vibe Coding & alucinação sintática  (2 blocos de virada)
│   ├─ O Dicionário da Arquitetura  (5 cards: SDD · ADR · BDD · DoR/DoD · MCP)
│   ├─ A Anatomia do Repositório  (árvore de diretórios + Regra de Ouro + alerta financeiro)
│   └─ Guia de Construção  (Meta-Prompt × Manual)
│
├─ CASOS REAIS  (#casos)            [Camada 1]
│   └─ Estudo de caso SocialSelling  (M1–M5, portal, ADRs — implementado × especificado)
│
├─ PLAYGROUND  (#playground)        [Camada 3] — laboratório de montagem
│   ├─ Canvas drag-and-drop  (LLM, Schema, API, BDD, Ledger, Cache, Human Review, RAG, Obs., Guardrails)
│   ├─ Avaliação automática da arquitetura  (regras → feedback XAI)
│   └─ Desafios  ("conserte esta arquitetura", "monte do zero")
│
├─ REFERÊNCIA  (#referencia)        [Camada 1, consulta]
│   ├─ Glossário
│   ├─ Os 10 princípios (resumo imprimível / compartilhável)
│   ├─ Matemática do scoring  (MathML — [V1+], aprofundamento opcional)
│   └─ Fontes e links  (guia, framework, repositório SocialSelling)
│
└─ RODAPÉ
    ├─ Navegação · Sobre · Crédito (Maurício Yokoyama Issei)
    └─ Alternador de tema (claro/escuro) · Toggle reduzir-movimento
```

> **Nota para o desenvolvedor.** O sitemap é **uma página HTML em long-scroll com seções ancoradas**
> (coerente com a infra estática — ver [09](09_roadmap_esforco_riscos.md)). Exceções candidatas a
> **rota/página própria** por peso: **Playground** e **Simulador** (carregam libs pesadas — D3/bpmn).
> O roadmap define quando promovê-los a página separada (lazy-load) vs. seção.

---

## 3. Objetivo pedagógico de cada área

| Área | Objetivo pedagógico | Camada | Persona-âncora |
| :-- | :-- | :-- | :-- |
| **Home** | Fisgar com a tese; deixar o usuário escolher o caminho certo para si | 0 | Todas |
| **Introdução** | Criar a tensão (caos) e prometer a solução (engenharia); vender os 3 benefícios | 0→1 | Executivo, PM |
| **Princípios** | Hub de acesso aleatório; dar visão de conjunto e permitir mergulho pontual | 1 | Tech lead, arquiteto |
| **Jornada Guiada** | Construir entendimento cumulativo com prática e avaliação | 3 | Dev migrando, estudante |
| **Simulador** | Internalizar trade-offs por manipulação; sentir causa→efeito | 2 | Arquiteto, dev |
| **Padrões** | Repertório transferível; reconhecer padrão e anti-padrão | 1→2 | Arquiteto, tech lead |
| **Governança Agent-Driven** | Ensinar a estruturar o repositório "To-Be" para a IA atuar autônoma; guardrails de governança e custo | 1→2 | Arquiteto, tech lead |
| **Casos Reais** | Provar que os princípios viram produto real (SocialSelling) | 1 | Arquiteto, estudante |
| **Playground** | Avaliar e criar arquiteturas; consolidar (capstone) | 3 | Dev, estudante |
| **Referência** | Consulta rápida e aprofundamento opcional | 1 | Todas (pós-aprendizado) |

---

## 4. Fluxos de navegação

### 4.1 Fluxo A — Trilha Guiada (linear, "modo curso")

```
Home → "Começar trilha" → Mapa da Jornada → Cap.1 → [gate] → Cap.2 → … → Cap.10 (capstone)
                                              │
                                              └─ cada capítulo pode "saltar para" a Visualização
                                                 ou o Simulador correspondente e voltar (deep-link)
```

- **Progressão:** linear com gates (ver 02). O capítulo seguinte destrava ao concluir o atual.
- **Persistência:** progresso salvo em `localStorage` (sem login — coerente com "sem backend").
- **Saída/retorno:** "continue de onde parou" na Home.

### 4.2 Fluxo B — Exploração Livre (não-linear, "modo referência")

```
Home → "Explorar" → Princípios (grade) → clica num princípio
                                          ├→ Visualização daquele princípio
                                          ├→ Capítulo correspondente (entra no meio da trilha)
                                          ├→ Simulador (parâmetro relacionado)
                                          └→ Caso Real (onde o princípio aparece no SocialSelling)
```

- Todo card de princípio é um **hub** com 3–4 saídas. Sem gates: acesso direto.
- O **Simulador** e o **Playground** são acessíveis a qualquer momento pela nav global.

### 4.3 Fluxo C — Essencial (executivo, ~4 min)

```
Home (Hero + storyboard) → Introdução (3 benefícios) → [CTA opcional: "ver os 10 princípios"] → fim
```

- Zero exercício obrigatório; tudo "assistível"; alto contraste narrativo.

### 4.4 Navegação global (persistente)

- **Top nav / sidebar** com: Início · Introdução · Princípios · Jornada · Simulador · Padrões ·
  Casos · Playground · Referência.
- **Indicador de progresso** da trilha (barra/anel) visível quando em modo trilha.
- **Breadcrumb de princípio** quando se está dentro de um tópico (ex.: `Princípios › P5 Contratos`).
- **Atalhos:** busca (Cmd/Ctrl-K) opcional V1; alternador de tema; toggle reduzir-movimento sempre
  acessível (ver [08](08_acessibilidade_e_metricas.md)).

> **Nota para o desenvolvedor.** Modos A e B compartilham os mesmos componentes de conteúdo
> (capítulos, visualizações). A diferença é o **chrome de navegação** (gates + progresso no modo A;
> grade + deep-links no modo B), não o conteúdo. Construir o conteúdo uma vez; alternar o wrapper.

---

## 5. Mapa de interligação (princípio ↔ áreas)

Cada princípio costura quatro pontos do site — garante que exploração livre nunca seja beco sem
saída:

```
                   ┌─────────────── PRINCÍPIO Pn ───────────────┐
                   │                                            │
            Card em PRINCÍPIOS                          Capítulo n na JORNADA
                   │                                            │
            Visualização (doc 04) ───────────────── Parâmetro no SIMULADOR / peça no PLAYGROUND
                   │                                            │
                   └──────── Aparição no CASO REAL (SocialSelling) ────────┘
```

> **Regra de consistência.** Nenhum princípio pode existir em só um lugar. Ao adicionar/editar um
> princípio, atualizar os 4 pontos. Isso é o que torna a navegação dual coerente.

---

### Referências cruzadas

- Detalhe dos 10 capítulos → [02](02_jornada_de_aprendizagem.md)
- Wireframe de cada área → [03](03_wireframes_e_catalogo_de_componentes.md)
- Visualização por princípio → [04](04_visualizacoes_interativas.md)
- Decisão seção vs. página própria → [09](09_roadmap_esforco_riscos.md)
