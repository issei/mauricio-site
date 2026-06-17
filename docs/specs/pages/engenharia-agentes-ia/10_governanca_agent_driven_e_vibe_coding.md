# 10 — Governança Agent-Driven e Vibe Coding (Seção Educacional)

> **Conteúdo adicional** (fora dos 20 entregáveis originais), baseado em
> [`guia-agent-driven-development.md`](../../../references/guia-agent-driven-development.md).
> Especifica uma **nova seção educacional** que ensina como estruturar o repositório da arquitetura
> **"To-Be"** para que a IA atue como **desenvolvedora autônoma** — não apenas copilot.
>
> **Onde vive no site:** nova área **Governança Agent-Driven** no sitemap (ver
> [01](01_arquitetura_informacao_e_sitemap.md)), entre **Padrões** e **Casos Reais**. Liga-se forte a
> **P8 (FinOps)**, **P9 (governança fail-closed, BDD, DoR/DoD)** e à resiliência de
> [05 §7–§8](05_bpmn_diagramas_executaveis.md).

---

## 1. Propósito e destaque conceitual

**Propósito pedagógico:** ensinar que, quando a IA deixa de sugerir linhas (copilot) e passa a
**planejar e executar tarefas de ponta a ponta** (agente), a responsabilidade migra do humano para a
máquina — e **responsabilidade exige estrutura**. O repositório deixa de ser só código e vira
**infraestrutura de contexto** que dirige o agente.

### 1.1 As duas viradas a comunicar (blocos de destaque no topo da seção)

**Virada 1 — O contexto sai da cabeça e entra no repositório.**
> Com um copilot, o contexto vive na cabeça do desenvolvedor. Com um **agente autônomo**, o contexto
> precisa **viver no repositório**, escrito para a máquina ler e seguir. Um agente não tem intuição
> sobre decisões passadas nem sobre "o jeito que fazemos aqui". **Contexto não documentado é contexto
> que não existe.**

**Virada 2 — O risco da "alucinação sintática" (alerta destacado).**
> No Vibe Coding, o perigo mais sutil não é o código que quebra — é o **código elegante, mas errado**:
> sintaxe impecável, nomes perfeitos, estrutura convincente… e logicamente incorreto ou ferindo uma
> regra de negócio. É a **alucinação sintática**: a aparência de correção sem a substância. A
> confiança que o código bonito inspira é exatamente o que o torna traiçoeiro. Por isso, **Vibe Coding
> sem rede de testes forte não é ágil — é imprudente.**

> **Nota editorial.** Estas duas viradas são o "gancho" emocional da seção, equivalentes às frases de
> impacto do `devin/`. A virada 2 conecta diretamente com a defesa contra "alucinações elegantes" já
> ensinada em P9/BDD (V8) e nos contratos (V4) — reforçar o link, não repetir o conteúdo.

### 1.2 Layout da seção: **Masonry / Grid**

- A seção usa um **grid masonry** (alturas variáveis, empacotamento tipo Pinterest) para acomodar
  blocos heterogêneos: os 2 blocos de virada (largos), os **5 cards do dicionário** (médios), a
  **árvore de diretórios** (alto/vertical), o **banner financeiro** (largo) e o **comparativo de
  construção** (largo).
- **Por que masonry:** o conteúdo tem peças de tamanhos naturais muito diferentes; um grid rígido
  desperdiçaria espaço ou truncaria. Masonry preserva a densidade "developer-centric" (Linear/Vercel)
  sem caixas vazias.
- **Responsividade:** desktop 3 colunas → tablet 2 → mobile 1 coluna (ordem de leitura preservada:
  viradas → dicionário → anatomia → banner → construção). Em mobile, a árvore de diretórios e o
  comparativo **não** podem exigir scroll horizontal (ver [08](08_acessibilidade_e_metricas.md)).

### Ficha técnica (seção)

- **Objetivo:** ensinar a estrutura de repositório Agent-Driven e seus guardrails.
- **UX:** leitura exploratória em masonry; cards com verso/expansão; árvore e banner são âncoras
  visuais.
- **Componentes:** `eai-masonry-grid`, `eai-dictionary-card`, `eai-dir-tree`, `eai-warning-banner`,
  `eai-compare-cols` (ver catálogo em [03](03_wireframes_e_catalogo_de_componentes.md)).
- **Tecnologias:** HTML/Tailwind + CSS (`columns`/`grid` masonry ou lib leve); SVG inline para ícones
  e bordas conectivas da árvore. Sem dependência pesada.
- **Complexidade:** **Média**.
- **Riscos:** masonry quebrar ordem de leitura/foco; árvore inacessível. **Mitigação:** ordem de DOM =
  ordem de leitura; árvore como lista semântica (`ul/li`) navegável por teclado; equivalentes textuais.

---

## 2. O Dicionário da Arquitetura (5 cards)

**Componente:** `eai-dictionary-card` — card com **ícone SVG** no topo, sigla + nome, frase-síntese e
"o que resolve". Variante com verso/expansão para a regra de ouro. Cor de accent por pilar.

> Layout: os 5 cards entram no grid masonry. Cada ícone é SVG inline temável por CSS vars
> ([07](07_direcao_de_arte_e_animacoes.md)). Sugestões de ícone abaixo (linha, stroke 1.5–2px).

### Card 1 — **SDD · Software Design Document**
- **Ícone SVG:** bússola / mapa (a "bússola do projeto").
- **Síntese:** *A fonte da verdade sobre **o que** o sistema é e seus limites.*
- **Resolve:** dá ao agente uma referência estável da visão, arquitetura, escopo e — sobretudo — o
  que está **fora** de escopo, evitando que ele "invente" funcionalidades.
- **Accent:** azul (`--accent`).

### Card 2 — **ADR · Architecture Decision Records**
- **Ícone SVG:** carimbo / selo histórico (registro imutável).
- **Síntese:** *A memória histórica imutável que explica o **porquê** das decisões passadas.*
- **Resolve:** impede repetir erros antigos; é cumulativo (não se apaga, supera-se) — uma trilha de
  raciocínio que o agente segue para não desfazer escolhas deliberadas.
- **Accent:** roxo (`--accent-2`).

### Card 3 — **BDD · Behavior-Driven Development**
- **Ícone SVG:** checklist com semáforo / alvo.
- **Síntese:** *O contrato de testes em **Gherkin** — o alvo executável do agente.*
- **Resolve:** transforma "funciona" em definição objetiva e verificável; o agente implementa até os
  cenários passarem. É a defesa contra a alucinação sintática.
- **Accent:** verde (`--ok`).

### Card 4 — **DoR & DoD · Definition of Ready / Done**
- **Ícone SVG:** dois portões / cancela (entrada e saída).
- **Síntese:** *As barreiras de governança que cercam a tarefa.*
- **Resolve:** **DoR** protege o agente de suposições (fecha lacunas **antes** de delegar); **DoD**
  valida o resultado **depois** (testes verdes, revisão, estado atualizado). "A qualidade é decidida
  na fronteira da tarefa, não no meio dela."
- **Accent:** humano/lilás (`--human`).

### Card 5 — **MCP · Model Context Protocol**
- **Ícone SVG:** mão + olho / plugue de ferramenta.
- **Síntese:** *As **mãos e os olhos controlados** do agente para acessar ferramentas.*
- **Resolve:** interface uniforme para o agente ler arquivos, consultar docs e executar ações; a
  config declara **quais** ferramentas ele pode usar — também uma **fronteira de segurança**.
- **Accent:** âmbar (`--warn`) — sinaliza "ponto de I/O / autonomia", coerente com a convenção de cor
  de [05 §2](05_bpmn_diagramas_executaveis.md) e [07](07_direcao_de_arte_e_animacoes.md).

> **Síntese para fechar os cards:** *SDD dá direção · ADR dá memória · BDD dá alvo · DoR/DoD dão
> fronteiras · MCP dá mãos controladas.* (frase-resumo destacada abaixo da grade de cards.)

---

## 3. A Anatomia do Repositório (componente Árvore de Diretórios)

**Componente:** `eai-dir-tree` — representação estilizada de árvore de pastas em **`<ul>`/`<li>`
aninhados**, com **bordas conectivas** (linhas guia em SVG/CSS `::before`) e **cor por pasta**. Cada
nó é focável; ao focar/hover, abre um balão com a responsabilidade da pasta.

```
projeto-to-be/
├─ .ai/  .claude/        ← estado cognitivo do agente            [cor: alerta/vermelho]
│   ├─ state/PROGRESS.md     "onde paramos": marco, próxima ação, histórico
│   ├─ skills/SKILL.md       procedimentos reutilizáveis do agente
│   └─ (config + permissões) o que o agente pode/não pode fazer
├─ docs/                 ← biblioteca de contexto                 [cor: azul/accent]
│   ├─ decisions/            ADRs (memória histórica do "porquê")
│   ├─ specs/                SDDs e especificações (o "o quê")
│   └─ governance/           DoR/DoD e modo de operação
├─ tests/                ← validação contínua / defesa nº 1       [cor: verde/ok]
│   ├─ features/             cenários BDD em Gherkin
│   ├─ steps/                ligação Gherkin → código
│   └─ fixtures/             respostas gravadas (sem rede, determinístico)
├─ scripts/              ← gates locais (quality gate, bootstrap) [cor: âmbar/warn]
└─ .github/              ← CI, templates de PR/issue              [cor: âmbar/warn]
```

**Mapa de cor (reusa tokens de [07](07_direcao_de_arte_e_animacoes.md)):** `.ai/.claude` =
`--danger` (estado cognitivo, alto valor/risco) · `docs/` = `--accent` · `tests/` = `--ok` ·
`scripts/`+`.github/` = `--warn`.

**Conteúdo dos balões (responsabilidade única por pasta):**
- **`.ai/` e `.claude/`** — o cérebro e o estado: `PROGRESS.md` é a âncora de estado (lido no início,
  atualizado no fim de cada run); `skills/` são procedimentos reutilizáveis; config define
  permissões.
- **`docs/`** — biblioteca de contexto: ADRs (`decisions/`), SDDs (`specs/`), governança
  (`governance/`).
- **`tests/`** — a **principal defesa contra alucinações elegantes**: BDD + fixtures determinísticas.
- **`scripts/` e `.github/`** — os **gates de automação**: quality gate local + CI; nada entra na base
  sem passar pelos mesmos testes verdes.

### 3.1 Regra de Ouro (destaque em **vermelho/alerta**)

> 🔴 **REGRA DE OURO — Versione o estado cognitivo.**
> O `PROGRESS.md`, as skills e as configs do agente em `.ai/`/`.claude/` **devem ser versionados no
> Git, junto com o código**. Isso permite **rollback não só do software, mas da memória e do
> raciocínio da IA**: se uma mudança de contexto levou o agente a uma direção ruim, você volta o
> repositório ao commit anterior e recupera, ao mesmo tempo, o código **e** o estado mental que o
> produziu. **Código e cognição evoluem juntos e são restauráveis juntos.**

- **Tratamento visual:** card/faixa com borda e ícone `--danger`, fundo elevado; ícone de cadeado/Git.
  Posicionado **adjacente ao nó `.ai/` da árvore** (linha conectiva apontando para ele).

### 3.2 Alerta Financeiro (banner de aviso)

**Componente:** `eai-warning-banner` — banner largo, **fundo amarelo/laranja de warning**
(`--warn` suave), ícone de atenção, ocupando uma faixa do masonry.

> 🟠 **GATES NÃO SÃO SÓ DE QUALIDADE — SÃO TAMBÉM FINANCEIROS.**
> Um agente autônomo solto **sem teto de custo** pode entrar em loop de tentativa e erro e transformar
> uma noite de execução numa **fatura inesperada**. Os gates em `scripts/` e `.github/` devem incluir
> **restrições operacionais e financeiras**: limite de iterações (parar após N tentativas), orçamento
> diário de requisições/gasto e um comportamento de **"falhar e parar"** quando o teto é atingido —
> registrando o bloqueio honestamente, em vez de queimar recursos. *O agente deve parar num ponto
> seguro quando o orçamento acaba, exatamente como pararia diante de um teste vermelho.*

- **Liga a:** **P8 / FinOps** (ledger de quota — Cap. 7) e à **DLQ "pendente por orçamento"** e ao
  fail-and-stop de [05 §7.3](05_bpmn_diagramas_executaveis.md). É a materialização, no repositório, do
  que o ledger faz em runtime.
- **Microinteração opcional:** mini-contador animado mostrando custo subindo num loop até o gate
  disparar "falhar e parar" (reusa a animação AN-8/AN-9 de [07 §B.4](07_direcao_de_arte_e_animacoes.md)).

---

## 4. Guia de Construção — Meta-Prompt × Manual

**Componente:** `eai-compare-cols` — duas colunas lado a lado (vira empilhado em mobile), com uma
faixa de "convergência" no rodapé.

| | **Bootstrapping via Meta-Prompt (LLM)** | **Do It Yourself (Manual, passo a passo)** |
| :-- | :-- | :-- |
| **Ideia** | Um *Master Context* longo descreve visão, escopo, guardrails e estrutura; o LLM **gera** a árvore de pastas e os arquivos base (SDD, PROGRESS.md, 1º ADR, modelos BDD, scripts). | Construir à mão, na ordem certa: **contexto → visão → regras de validação → código**. |
| **Passos** | 1) escrever o Master Context · 2) gerar a fundação · 3) **revisar criticamente** · 4) ajustar o meta-prompt e regenerar pontos fracos. | 1) criar pastas de contexto (`.ai/ docs/ tests/ scripts/`) + PROGRESS.md vazio · 2) escrever o **SDD** base (incl. fora-de-escopo) · 3) registrar o **1º ADR** · 4) definir **regras de validação** (quality gate + CI) · 5) escrever o **1º cenário BDD** · 6) estabelecer **DoR/DoD**. |
| **Vantagem** | Velocidade: esqueleto coerente em minutos. | Controle total e entendimento profundo de cada peça. |
| **Risco** | A fundação gerada vira a verdade do agente — **erros aqui se propagam**. | Mais lento; exige disciplina de ordem. |
| **Regra de ouro** | *Invista mais tempo no meta-prompt do que no código gerado: contexto claro → fundação sólida; vago → caos elegante.* | *Construa contexto e gates **antes** da primeira linha de código de produto.* |

> **Faixa de convergência (rodapé do comparativo):** as duas abordagens **chegam à mesma estrutura** —
> e ambas seguem a mesma lógica: **contexto e gates primeiro, código depois.**

> **Nota editorial / dogfooding.** Esta seção **descreve a própria spec que você está lendo**: este
> repositório de documentação (`docs/specs/pages/...`, com SDDs e referência ao processo do `devin/`)
> é um exemplo de "contexto como infraestrutura de primeira classe". Tornar isso explícito fecha o
> ciclo pedagógico (mesma estratégia de [00 §1.3](00_visao_produto_personas_objetivos.md)).

---

## 5. Glossário desta seção (para a Referência)

- **Agent-Driven Development** — estruturar o projeto para um agente **ler contexto, planejar e
  executar** tarefas de ponta a ponta, com humano nos pontos certos.
- **Vibe Coding** — descrever a intenção em linguagem natural e deixar a IA materializar o código;
  maduro quando apoiado em **contexto estruturado e persistente**.
- **Alucinação sintática** — código esteticamente perfeito porém logicamente errado; aparência de
  correção sem substância.
- **Master Context / Meta-Prompt** — briefing arquitetural longo do qual o LLM gera a fundação do
  repositório.

---

### Referências cruzadas

- Área no sitemap e fluxo → [01](01_arquitetura_informacao_e_sitemap.md)
- Componentes (`eai-masonry-grid`, `eai-dictionary-card`, `eai-dir-tree`, `eai-warning-banner`,
  `eai-compare-cols`) → [03 Parte B](03_wireframes_e_catalogo_de_componentes.md)
- FinOps / ledger (banner financeiro) → [02 Cap. 7](02_jornada_de_aprendizagem.md), [06 §1.4](06_simulador_e_playground.md)
- DLQ / fail-and-stop → [05 §7.3](05_bpmn_diagramas_executaveis.md)
- BDD / DoR / DoD / defesa contra alucinação → [02 Cap. 8](02_jornada_de_aprendizagem.md), [04 V4/V8](04_visualizacoes_interativas.md)
- Tokens, ícones e animações → [07](07_direcao_de_arte_e_animacoes.md)
