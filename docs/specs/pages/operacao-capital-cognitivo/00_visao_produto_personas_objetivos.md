# 00 — Visão do Produto, Personas e Objetivos Pedagógicos

> Cobre os entregáveis **1 (Visão do produto)**, **2 (Personas)** e **3 (Objetivos pedagógicos)**.
> Base: a *Master Architecture Specification v4.0* — "Operação Capital Cognitivo".

---

## 1. Visão do Produto

### 1.1 Tese central

> **A IA corporativa mais cara não é a que cobra mais por token — é a que parece barata mas força
> sua equipe a refatorar tudo amanhã.** Compreender o Custo Total de Propriedade (TCO) de uma
> operação de IA exige um novo modelo mental, e modelos mentais só mudam com experiência ativa,
> não leitura passiva.

A página existe para **fazer o profissional reconstruir intuitivamente o conceito de *Useful
Intelligence per Dollar (UI/$)*** ao investigar uma crise financeira corporativa realista — e só
depois ter acesso ao formalismo matemático que nomeia o que ele acabou de deduzir.

### 1.2 Declaração de produto (elevator pitch)

> Um simulador executivo interativo onde o usuário joga como Arquiteto de IA e FinOps contratado
> para salvar a *Nexus Tech Corp* de uma crise operacional causada pelo uso descontrolado de IA.
> Através de 6 capítulos narrativos, um Gêmeo Digital com causalidade real de longo prazo, um
> Mural de Evidências científicas e uma arguição final perante um Conselho de Administração
> dinâmico, o usuário internaliza o framework UI/$ por descoberta — não por decoreba.

### 1.3 Hipótese de produto e aprendizagem

> *Se substituirmos a exposição teórica passiva de FinOps de IA por uma investigação guiada por
> hipótese — ancorada em um Gêmeo Digital com causalidade de longo prazo, um Mural de Evidências
> com metadados científicos e um Conselho com stakeholders conflitantes — então o usuário
> construirá um modelo mental de Capital Cognitivo de longo prazo, aumentando simultaneamente a
> retenção do conhecimento, a capacidade de transferência e a habilidade de argumentação
> estratégica.* (MSpec §2.3)

### 1.4 Proposta de valor por resultado de aprendizagem

Ao concluir, o usuário consegue:

1. **Diagnosticar** por que o custo nominal da API representa menos de 10% do TCO real de uma operação corporativa de IA — e por que o **custo humano** (Carga de Verificação / $V_{core}$) domina e cresce de forma **não-linear**.
2. **Calcular** o UI/$ de cenários reais usando três modelos complementares: Cost-of-Pass (Erol et al.), UI/$ (Framework OpenAI 2026) e Governed UI/$ (Swider 2026), além do TCO Agêntico de Peng et al.
3. **Comparar** arquiteturas de IA (RouteLLM, SLMs, Test-Time Compute, RAG profundo com reranking, cache semântico, multiagente) com base em impacto sistêmico, não em preço de tabela — incluindo a economia real de RAG e o risco de **cascata agêntica**.
4. **Argumentar** decisões de arquitetura perante executivos do C-Level usando evidências científicas e econômicas catalogadas, inclusive em contextos regulados (Governed UI/$).
5. **Reconhecer** os limites físicos do contexto (**Context Rot** acima de ~50k tokens) e o cache semântico como alavanca primária de FinOps.

### 1.5 Não-objetivos (o que a página **não** é)

- Não é curso de programação de LLMs (sem Python, PyTorch ou código de produção).
- Não é calculador estático de preços de APIs (preços nominais são abstraídos como parâmetros de simulação).
- Não é ferramenta de produção para deploy de modelos.
- Não executa LLMs ao vivo — toda lógica de simulação é determinística, em JS puro. (MSpec §2.5)

---

## 2. Personas

### Persona 1 — Engenheiro de Software migrando para IA · "Felipe"

- **Perfil:** 5–8 anos de back-end (Python/Java). Implementou pipelines de IA sem critério de custo.
- **Dores:** sente que IA virou "caixa preta de gastos imprevisíveis"; PR sem critério de acurácia.
- **Objetivos:** entender qual modelo escolher para cada tarefa e como justificar a escolha.
- **Objeções:** "custo de API é tão baixo que não importa muito".
- **Fluxo ideal:** Capítulo 1 (investigação da fatura) → Capítulo 4 (fórmula Cost-of-Pass) → Capítulo 5 (sandbox). **Aprende pelo choque do custo oculto.**

### Persona 2 — Arquiteto de Software / Tech Lead · "Daniel"

- **Perfil:** Define a stack de IA do time; precisa de padrões defensáveis em revisão de arquitetura.
- **Dores:** pressão para adotar modelos novos sem critério técnico-financeiro consolidado.
- **Objetivos:** blueprints de RouteLLM, SLM routing, RAG e Test-Time Compute com trade-offs numéricos.
- **Objeções:** "preciso de dados e não de narrativa".
- **Fluxo ideal:** Capítulo 3 (dedução do UI/$) → Capítulo 5 (sandbox System Dynamics) → Capítulo 6 (arguição ao Board). **Entra pela exploração técnica, valida no stress test do Board.**

### Persona 3 — Gestor/Executivo de TI · "Renata"

- **Perfil:** Diretora de TI; decide orçamento de IA sem profundidade técnica de implementação.
- **Dores:** "conta de nuvem surpresa"; pressão do board por "fazer IA" sem saber o risco.
- **Objetivos:** 3–4 frases defensáveis sobre por que a abordagem disciplinada reduz risco e viabiliza ROI.
- **Objeções:** "não tenho tempo para jogar um simulador".
- **Fluxo ideal:** Hero → Capítulo 1 (o mistério dos R$ 37k como narrativa) → HUD do Gêmeo Digital. **Experiência de 5 minutos, alto impacto visual.**

### Persona 4 — Estudante avançado / Pesquisador júnior · "Mariana"

- **Perfil:** Mestrado ou início de carreira; curiosa, tempo disponível, quer rigor e referências reais.
- **Dores:** material educacional de FinOps de IA é superficial ou muito acadêmico-abstrato.
- **Objetivos:** dominar o framework UI/$ com embasamento matemático (Erol et al., Peng et al.) e referências bibliográficas verificáveis.
- **Objeções:** "será que é só marketing?".
- **Fluxo ideal:** Jornada completa (Cap. 1→6) + todos os Evidence Cards + Capítulo 6 (Board). **Completista; usa todos os recursos e verifica as fontes.**

### 2.1 Matriz persona × modo de entrada

| Persona | Modo de entrada dominante | Profundidade | Chefe Final? |
| :-- | :-- | :-- | :-- |
| Felipe (engenheiro) | Capítulo 1 → trilha linear | Alta | Sim |
| Daniel (arquiteto) | Sandbox → Board | Muito alta | Sim |
| Renata (executiva) | Hero + Capítulo 1 visual | Baixa | Não obrigatório |
| Mariana (estudante) | Trilha completa + fontes | Máxima | Sim |

---

## 3. Objetivos Pedagógicos

### 3.1 Teorias do aprendizado aplicadas (MSpec §4.1)

| Princípio LXD | Implementação no Simulador | Efeito Cognitivo |
| :-- | :-- | :-- |
| **Problem-Based Learning** | Capítulo 1: investigar R$ 37k "desaparecidos" na fatura | Ancoragem em problema autêntico; motivação por mistério |
| **Inquiry-Based Learning** | Evidence Board: coletar e classificar papers científicos | Transição de consumidor passivo para investigador ativo |
| **Learning by Doing** | Sandbox "E Se?": sliders de variáveis de infraestrutura | Intuição via causa e efeito imediato |
| **Constructivism** | Capítulo 3: usuário deduz e nomeia o UI/$ antes da revelação | Maior retenção ao "descobrir" em vez de decorar |
| **Metacognição** | Protocolo Predição → Experimentação → Reflexão em cada capítulo | Redução de ilusão de competência; calibração de julgamento |
| **Retrieval Practice** | Board: evocar evidências do mural para responder conselheiros | Fortalecimento de memória por recuperação ativa |
| **Dual Coding** | Diagramas Sankey + texto explicativo integrado | Processamento verbal e visuo-espacial simultâneo |
| **Progressive Disclosure** | Equações formais só no Capítulo 4, após intuição dos Cap. 1–3 | Prevenção de sobrecarga cognitiva |

### 3.2 O Protocolo Predição → Experimentação → Reflexão

Toda interação simulada de impacto segue obrigatoriamente estas três fases:

1. **Predição** — O sistema pausa e exige uma hipótese do usuário com nível de confiança (1–5) antes de executar.
2. **Experimentação** — O usuário age; o motor calcula e exibe o resultado no Gêmeo Digital.
3. **Reflexão** — O sistema confronta resultado vs. predição: "Sua previsão errou por 340%. O TCO aumentou em vez de cair. Analise a fatura de horas dev."

### 3.3 Mudança de modelos mentais alvo

| Modelo Mental Ingênuo | → | Modelo Mental de Arquiteto (alvo) |
| :-- | :-: | :-- |
| "IA barata é a que cobra menos centavos por token na tabela da API." | → | "IA eficiente é a que minimiza o TCO por trabalho concluído com sucesso." |
| "Se a acurácia no benchmark MMLU é 85%, o modelo vai acertar 85% no meu app." | → | "Benchmarks estáticos não prevêem desempenho agêntico sem testes reais." |
| "Ajustar o prompt resolve qualquer problema de custo e qualidade." | → | "Roteamento semântico e destilação de modelos são alavancas determinantes da economia de IA." |
| "O custo humano da revisão é linear: basta multiplicar horas por valor-hora." | → | "A Carga de Verificação é não-linear — a fadiga encarece cada hora, e modelos overconfident a agravam." |
| "Janela de contexto maior é sempre melhor; é só colocar tudo no prompt." | → | "Acima de ~50k tokens surge Context Rot; curadoria de contexto vence força bruta." |
| "Mais agentes em paralelo = mais capacidade, custo somável." | → | "Sem isolamento de contexto, alucinações ricocheteiam e o custo vira combinatório (re-sent context)." |

### 3.4 Objetivos de aprendizagem mensuráveis por capítulo

| Capítulo | Objetivo ("o usuário consegue…") | Gate de avaliação |
| :-- | :-- | :-- |
| 1 — O Mistério | Decompor o TCO em API + Infra + Governança + Custo Humano (iceberg) | Clicar em todos os itens da fatura e reconhecer o dominante |
| 2 — A Armadilha | Calcular o custo real por tarefa (tentativas = 1/$R_m$) e ler a Carga de Verificação | Predição de custo vs. resultado + leitura do $V_{core}$ |
| 3 — A Invenção | Montar a equação de eficiência agrupando custos monetários e humano-operacionais | Canvas de montagem + nomeação ativa |
| 4 — Formalização | Ler e aplicar os três modelos (Cost-of-Pass, UI/$, Governed UI/$) a um caso novo | Quiz: qual modelo tem menor $v(m,p)$? |
| 5 — Laboratório | Configurar RouteLLM + RAG (reranking) + cache + contexto + multiagente para minimizar TCO em Q1–Q4 | Métricas do Gêmeo Digital ao final de Q4 (sem cascata/rot descontrolados) |
| 6 — Board | Selecionar argumento correto e anexar evidências para cada conselheiro | Confiança média do Board ≥ 70% |

### 3.5 Objetivo terminal (capstone)

Após o Capítulo 6, o usuário recebe o **Caso de Transferência**: um cenário inédito (clínica médica com triagem automatizada de imagens) onde deve aplicar o UI/$ sem scaffolding da narrativa da *Nexus Tech Corp*. Critério de excelência: identificar o modelo correto e justificar com base no custo humano de revisão médica.

---

### Referências cruzadas

- Arquitetura de navegação e capítulos → [01](01_arquitetura_informacao_navegacao.md)
- Detalhamento das mecânicas dos 6 capítulos → [02](02_jornada_6_capitulos.md)
- Faseamento MVP → V2 → V3 → [10](10_testes_roadmap_riscos.md)
