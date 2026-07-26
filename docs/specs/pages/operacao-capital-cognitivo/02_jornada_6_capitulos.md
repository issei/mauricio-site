# 02 — Jornada dos 6 Capítulos

> Cobre o entregável **5 (Jornada dos 6 capítulos — narrativa + mecânicas)**.
> Para cada capítulo: Objetivo · Narrativa · Stakeholders · Mecânicas · Evidências coletadas ·
> Impacto no Gêmeo Digital · Critério de conclusão.

---

## Capítulo 1 — O Mistério dos R$ 37 Mil Desaparecidos

### Objetivo Cognitivo
Demonstrar que o preço nominal da API representa uma **fração minoritária do TCO** em operações
corporativas de IA. Quebrar o modelo mental "custo de IA = linha da fatura de API".

### Narrativa e Contexto
O usuário é recém-contratado como Arquiteto de IA e FinOps da *Nexus Tech Corp*. No primeiro dia,
a CFO **Helena Vance** o convoca: "A fatura da API de IA foi de R$ 3.000 este mês. Mas o
departamento financeiro aponta R$ 40.000 em custos atribuídos à IA. R$ 37.000 desapareceram. Você
tem 24 horas para explicar ou eu cancelo todos os projetos de IA."

### Stakeholders Envolvidos
- **Helena Vance (CFO):** ansiosa, ameaçadora; precisa de números claros.
- **Sarah Chen (VP de Operações/Devs):** colaborativa mas sobrecarregada; é a fonte do mistério.

### Mecânicas e Interações

**1. Fatura Interativa Expandível**
- A tela exibe uma fatura corporativa com 5 linhas colapsadas (API, Dev Salário, Infra, Revisão, Overhead).
- O usuário deve clicar em cada linha para expandir e ver o breakdown.
- A linha "Revisão e Refatoração Humana" está marcada com `?` — ao clicar, dispara a animação reveladora.

**2. Investigação da Folha de Pagamento**
- Ao expandir "Revisão", aparece o diálogo de Sarah Chen: "Precisei alocar 3 devs sêniores
  (R$ 120/hora) por duas semanas para corrigir outputs incorretos do LLM automatizado."
- Um mini-calculador exibe: `3 devs × R$ 120/h × 80h = R$ 28.800`. Somado a outros overheads, chega
  a R$ 37.000.
- **Custo de Interrupção de Fluxo (Context Switching):** ao clicar em "por que 80h e não 40h?", Sarah
  revela: "Cada troca entre revisar a IA e o próprio código custa ~23 min de recontextualização. Metade
  do tempo alocado é essa fricção, não a correção em si." Um segundo mini-cálculo destaca que o custo
  humano **não é só valor-hora** — é a Carga de Verificação (V_core) que será formalizada no Cap. 2.

**3. Diagrama de Pizza Dinâmico → Iceberg do TCO (SVG/Canvas)**
- Após a investigação, um gráfico de pizza se monta progressivamente mostrando a decomposição dos R$ 40k:
  - API nominal: R$ 3.000 (7,5%)
  - Infra / Vector DB / Observabilidade: R$ 4.800 (12%)
  - Overhead de Governança / Compliance: R$ 3.400 (8,5%)
  - Tempo Dev (Revisão + Verification Load): R$ 28.800 (72%)
- Ao concluir, a pizza faz *morph* para a metáfora do **Iceberg**: a API nominal é a ponta acima
  d'água; os 92,5% restantes são o custo oculto submerso.

```
                 TCO REAL DA OPERAÇÃO DE IA (a ponta do iceberg)

                 [ R$ 3.000 ]  ──▶ API Nominal (7,5%)
             ┌────────────────────────────────────────────────────────┐
             │ R$ 4.800    ──▶ Infra / Vector DB / Observabilidade     │ (12%)
  CUSTO      │ R$ 3.400    ──▶ Overhead de Governança / Compliance     │ (8,5%)
  OCULTO     │ R$ 28.800   ──▶ Tempo Dev (Revisão + Verification Load) │ (72%)
             └────────────────────────────────────────────────────────┘
```

> **Nota para o desenvolvedor:** O gráfico de pizza é renderizado em `<canvas>` nativo com
> animação de `arc()`. Não usar biblioteca externa. O *morph* para o iceberg é uma segunda cena SVG.

**Callout de Escala (Fortune 500):**
> 💡 Em pipelines de engenharia de software de empresas Fortune 500, **o custo de API representa
> menos de 10% do TCO real** de uma operação de IA. Quem otimiza só a fatura de tokens está
> discutindo a ponta do iceberg.

**4. Protocolo Predição–Reflexão**
- Antes de revelar o diagrama, o sistema pergunta: "Qual porcentagem do custo total você estima
  que é custo de API pura?" com opções de múltipla escolha.
- Após a revelação, exibe confronto com a predição do usuário.

### Evidências Coletadas
- `EVID_01`: "O custo da API é a ponta do iceberg. O tempo de refatoração e validação humana domina o TCO em operações corporativas de IA."
  - Fonte: Peng et al. / Pegatron Case Study (TCO Agêntico)
  - Nível: Level B (Benchmark empírico relevante)

### Impacto no Gêmeo Digital (Estado Inicial)
```
cashBalance:     R$ 850.000
devTeamMoral:    50%
technicalDebt:   35%
firstPassAccuracy: 0,42 (Model-Lite em uso)
boardConfidence: 60%
```

### Critério de Conclusão
Todas as linhas da fatura expandidas E gráfico de pizza visualizado.

---

## Capítulo 2 — A Armadilha da IA "Barata"

### Objetivo Cognitivo
Demonstrar o conceito de *First-Pass Accuracy* ($R_m$) e provar que modelos baratos por token
geram custos exponenciais via cascata de iterações de falha.

### Narrativa e Contexto
O CTO **Dr. Aris Thorne** propõe migrar todo o atendimento jurídico automatizado para o
*Model-Lite* (R$ 0,001/1k tokens), argumentando que reduzirá custos em 90%. O CRO **Marcus Brody**
hesita: "Risco jurídico não é brincadeira."

### Stakeholders Envolvidos
- **Dr. Aris Thorne (CTO):** otimista tecnológico; apresenta o *Model-Lite* com entusiasmo.
- **Marcus Brody (CRO):** cético; questiona sobre taxa de erro em contratos.

### Mecânicas e Interações

**1. Protocolo Predição — Custo Estimado**
- O sistema apresenta: "10.000 chamadas. Model-Lite: R$ 0,001/1k tokens × 500 tokens médios.
  Model-Pro: R$ 0,020/1k tokens × 500 tokens médios."
- Pergunta: "Quanto você estima que a empresa gastará com cada modelo para completar as 10.000
  tarefas com sucesso?" com slider de resposta.

**2. Simulação de First-Pass Accuracy**
- Botão "Executar Simulação" dispara animação de barras de progresso paralelas (Model-Lite vs. Model-Pro).
- Model-Lite: barra trava em 42% (só 4.200 das 10.000 chamadas concluídas com sucesso na 1ª tentativa).
- As falhas (5.800 chamadas) disparam re-tentativas automáticas → e após 3 falhas, acendem um ícone vermelho "Intervenção humana necessária".

**3. Formalização da Taxa de Tentativas de Falha**
- Antes da tabela, um bloco mostra a relação entre First-Pass Accuracy e o número esperado de
  tentativas até o sucesso (processo geométrico):

  `Tentativas esperadas por tarefa = 1 / R_m`

  - Model-Lite ($R_m = 0{,}42$) → **2,38 tentativas** por tarefa concluída.
  - Model-Pro ($R_m = 0{,}91$) → **1,10 tentativa** por tarefa concluída.
- Cada tentativa extra além da 1ª aciona o **loop de retries automáticos**; após 3 falhas, dispara
  "Intervenção humana necessária" — o gatilho da fadiga do desenvolvedor.

**4. Tabela de Custo Real (com Carga de Verificação)**
Após simulação, tabela comparativa — agora incluindo o $V_{core}$:

| Modelo | Preço/token | $R_m$ | Tentativas/tarefa | Chamadas extras | Horas Dev extras | $V_{core}$ | TCO Real |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Model-Lite | R$ 0,001/1k | 42% | 2,38 | 13.810 | 87h | **68** (alto) | R$ 12.900 |
| Model-Pro | R$ 0,020/1k | 91% | 1,10 | 989 | 10h | **24** (baixo) | R$ 2.450 |

**5. Indicador de Carga de Verificação no Gêmeo Digital**
- Ao lado das métricas, exibe-se o $V_{core}$ (0–100) com os 5 sinais que o compõem em tooltip:
  falhas de teste/compilação, latência até a 1ª compilação, churn de código, pausas longas e trocas
  de contexto. O Model-Lite, *overconfident* (declara 85%, entrega 42%), infla o sinal de "confiança
  cega" e leva o time à fadiga.

**6. Reflexão Metacognitiva**
- O sistema exibe o erro de predição do usuário vs. resultado real com frase de impacto, conectando
  o custo por token baixo à explosão de horas e à fadiga da equipe.

### Evidências Coletadas
- `EVID_02`: "Modelos com baixa First-Pass Accuracy geram cascatas de iterações e estouro de custos operacionais."
  - Fonte: Erol et al., ICLR 2026 (Cost-of-Pass)
  - Nível: Level A (Estudo científico revisado por pares)
- `EVID_08`: "A verificação de código gerado por IA produz fadiga cognitiva não-linear (Carga de Verificação / V_core)."
  - Fonte: CHI 2026 Conference
  - Nível: Level A (Estudo científico revisado por pares)
  - Desbloqueio: ao exibir o indicador V_core (mecânica 5).

### Impacto no Gêmeo Digital (se usuário escolher Model-Lite)
```
technicalDebt:   +15% (chegando a 50%)
boardConfidence.marcus: -30% (chegando a 30%)
humanReworkCost: +280%
```

### Critério de Conclusão
Simulação executada E tabela comparativa visualizada E decisão registrada (Model-Lite ou Model-Pro).

---

## Capítulo 3 — A Invenção da Métrica pelo Usuário

### Objetivo Cognitivo
Permitir que o usuário **deduza e construa ativamente** a relação matemática do UI/$ antes de
conhecer seu nome formal (*Constructivism*).

### Narrativa e Contexto
A diretoria exige um indicador unificado para avaliar projetos de IA antes de aprovar o orçamento
do Q2. "Precisamos de um número que capture eficiência real, não só o preço da API."

### Mecânicas e Interações

**1. Canvas de Montagem de Fórmula (Drag-and-Drop)**
- Blocos arrastáveis: `Trabalho Correto Aprovado (Succeeded Tasks)`, `Custo API`, `Custo Revisão Humana`,
  `Custo de Infraestrutura`, `÷`, `+`, `(`, `)`.
- Os blocos de custo vêm com **cor de grupo** para tornar a estrutura do denominador legível:
  - 🔵 **Custos Monetários Diretos:** `Custo API`, `Custo de Infraestrutura`.
  - 🟠 **Custos Humano-Operacionais:** `Custo Revisão Humana` (que embute a Carga de Verificação do Cap. 2).
- Área-alvo: slots de numerador e denominador de uma fração. O denominador aceita **sub-agrupamentos
  com parênteses**, permitindo que o usuário some primeiro os custos de cada grupo antes de totalizar.
- Validação em tempo real: indicador verde/vermelho conforme a lógica da equação montada.
- Resposta válida (qualquer agrupamento algebricamente equivalente é aceito):
  `[Trabalho Correto Aprovado] ÷ ([Custo API] + [Custo Revisão Humana] + [Custo de Infraestrutura])`.

> **Nota para o desenvolvedor:** Drag-and-drop implementado com `draggable` HTML nativo +
> `dragover`/`drop` listeners. Fallback de click-to-place para mobile e acessibilidade. O validador
> deve normalizar o denominador (achatando parênteses) antes de comparar, para aceitar
> `(API + Infra) + Humano` como equivalente a `API + Humano + Infra`.

**2. Nomeação Ativa**
- Após montar a fórmula correta, o sistema exibe: "Ótima lógica. Dê um nome para esse indicador:"
- `<input type="text" id="metric-name-input" maxlength="60" placeholder="Ex.: Índice de Eficiência de IA">`
- O sistema armazena a resposta e a exibe ao longo do restante da jornada ao lado do nome formal.

**3. Revelação Pedagógica**
- Após a nomeação, animação de "reveal": o nome formal UI/$ surge sobre o nome dado pelo usuário.
- Texto: "Excelente intuição. Na literatura de FinOps de IA, essa relação exata é denominada
  *Useful Intelligence per Dollar (UI/$)*."
- A fórmula deduzida é fixada na tela para reuso nos capítulos seguintes:

$$UI/\$ = \frac{\text{Trabalho Útil Aprovado (Succeeded Tasks)}}{\underbrace{C_t}_{\text{API}} + \underbrace{C_h}_{\text{Humano}} + \underbrace{C_r}_{\text{Infra}}}$$

### Evidências Coletadas
- `EVID_03`: "UI/$ reflete a transformação real de capital financeiro em trabalho útil aprovado sem refatoração, capturando o que métricas de token não capturam."
  - Fonte: Convenção operacional da indústria (Level C)
  - Nível: Level C (Convenção Operacional de FinOps)

### Impacto no Gêmeo Digital
```
metrics.globalUI: calculado pela primeira vez com valores do Cap. 1 e 2
boardConfidence: +10% (clareza de visão impressiona o Board)
```

### Critério de Conclusão
Fórmula correta montada + nome inserido + revelação visualizada.

---

## Capítulo 4 — Formalização Matemática e os Custos de Inferência

### Objetivo Cognitivo
Formalizar matematicamente os conceitos via equações de *Cost-of-Pass* (Erol et al.) e TCO
Agêntico (Peng et al.), com governança científica explícita.

### Narrativa e Contexto
Acesso à biblioteca técnica de arquitetura antes de reconfigurar a infraestrutura do Q2.
"Antes de decidir, você precisa entender as equações por trás dos números."

### Mecânicas e Interações

**1. Blocos Matemáticos com Renderização de Fórmulas — Três Modelos Complementares**
- Fórmulas renderizadas com MathML ou `<span class="formula">` estilizado com `JetBrains Mono`.
- Apresentados como três lentes progressivas sobre o mesmo fenômeno; hover nos termos revela tooltip.

- **Modelo 1 — Cost-of-Pass (Erol et al., Stanford 2025):** o custo por tarefa útil.

  $$v(m,p) = \frac{C_m(p)}{R_m(p)}$$

  Prova o limite: quando $R_m \to 0$, $v(m,p) \to \infty$.

- **Modelo 2 — Useful Intelligence per Dollar (Framework OpenAI 2026):** a razão de eficiência
  operacional, agora com o fator de erro explícito.

  $$UI/\$ = \frac{W_u \times (1 - E_f)}{C_t + C_h + C_r}$$

  Onde $W_u$ = trabalho útil, $E_f$ = fração de erro residual, $C_t/C_h/C_r$ = custos de token, humano e infra.

- **Modelo 3 — Governed UI/$ (Swider 2026 / setores regulados):** o UI/$ ponderado pelo risco.

  $$\text{Governed UI/\$} = \frac{\text{Qualidade} \times \text{Utilidade}}{\text{Custo Total} \times \text{Prêmio de Risco } (R)}$$

  O Prêmio de Risco $R > 1$ pune arquiteturas com risco de alucinação em domínios sensíveis (contratos,
  saúde, finanças) — é o que pode anular o desconto open-source do EVID_10.

- **Equação de apoio — TCO Agêntico (Peng et al.):**

  `TC = M × (C_compute + C_ops + T_iter × R_humano)`

  Cada variável tem cor distinta e tooltip.

**2. Callout de Governança Científica**
- Box destacado (ícone de lupa): "UI/$, V_core e Governed UI/$ são **convenções operacionais de FinOps
  em fase de consolidação** na indústria — não normas regulatórias ISO/IEEE estáticas. As métricas
  exatas variam conforme arquitetura e escala. Os modelos aqui seguem Erol et al. (Stanford 2025),
  o Scorecard da OpenAI (Jul/2026), Swider (2026) e Peng et al. (Case Study Pegatron)."

**3. Quiz de Aplicação**
- Dois modelos hipotéticos são apresentados com valores de $C_m$ e $R_m$.
- Pergunta: "Qual modelo tem o menor $v(m,p)$? Calcule."
- Input numérico com validação + feedback imediato.

### Evidências Coletadas
- `EVID_04`: "A fórmula Cost-of-Pass prova matematicamente que quando $R_m → 0$, o custo efetivo por tarefa concluída tende ao infinito."
  - Fonte: Erol et al., ICLR 2026 / arXiv:2408.03314
  - Nível: Level A (Estudo científico revisado por pares)
- `EVID_07`: desbloqueado ao visualizar o Callout de Governança (mecânica 2).
- `EVID_10`: "Modelos open-source podem ser até 87% mais baratos, mas o Prêmio de Risco (R) do Governed UI/$ pode anular o desconto em setores regulados."
  - Fonte: NBER Working Paper 34608 (2025)
  - Nível: Level A (Estudo econômico)
  - Desbloqueio: ao visualizar o Modelo 3 (Governed UI/$).

### Impacto no Gêmeo Digital
```
metrics.globalUI: recalculado com a stack atual
boardConfidence.aris: +20% (rigor matemático impressiona o CTO)
```

### Critério de Conclusão
Quiz respondido corretamente (ou após 2 tentativas com explicação revelada).

---

## Capítulo 5 — O Laboratório "E Se?" (System Dynamics & Incerteza Q1–Q4)

### Objetivo Cognitivo
Desenvolver intuição sistêmica aplicando técnicas de otimização ao longo de 4 trimestres com
eventos aleatórios de mercado. Vivenciar *time lags* e causalidade de longo prazo.

### Narrativa e Contexto
"Agora você assume a operação em tempo real. De Q1 a Q4, aloque o orçamento de R$ 100.000/mês
mantendo os SLAs de qualidade acima de 95%. Cuidado: suas decisões hoje afetam o próximo
trimestre."

### Mecânicas e Interações

**1. Painel de Configuração de Infraestrutura (Sliders e Toggles)**
Por trimestre, o usuário ajusta:
- **Roteamento Semântico (RouteLLM):** toggle on/off + slider de proporção SLM (0–100%).
- **Profundidade do RAG:** slider 1–5. O custo agora reflete a **economia real de RAG**: geração de
  embedding é barata, mas a manutenção do índice vetorial (overhead HNSW ≈ 1,5×) e a **re-indexação
  total ao trocar de modelo** dominam o custo de infra (ver [03 §3.3d](03_digital_twin_engine.md)).
- **RAG Reranking:** seletor `off | conditional | universal`. `conditional` aplica reranking só a
  consultas de baixa confiança (ganho de acurácia barato); `universal` aplica a 100% das consultas —
  maior acurácia, mas **+300ms de latência por request** e maior custo de inferência.
- **Test-Time Compute Scaling:** slider 1–5 (nível > 3 em prompts simples → penalidade de -8% de $R_m$, o "overthinking").
- **Cache Semântico (Semantic Caching):** toggle on/off. Reduz o custo de contexto em 40%–70% em
  chamadas repetitivas — **alavanca primária de FinOps**. Atenção: ataca custo, não acurácia (não
  corrige Context Rot).
- **Tamanho médio de contexto:** slider de tokens por chamada. Acima de **50k tokens** aciona o
  indicador de **Context Rot** (degradação de acurácia; ver mecânica 6).
- **Orquestração Multiagente:** toggle on/off + toggle "Isolamento de contexto". Sem isolamento,
  ativa o risco de **cascata agêntica** (contexto reenviado; ver mecânica 7).

**2. Diagrama Sankey de Fluxo de Custos (SVG Dinâmico)**
- Exibe em tempo real: GPU/API → Observabilidade → RAG → Horas Dev.
- Espessura das setas proporcional ao valor.
- Atualiza a cada mudança de slider.

> **Nota para o desenvolvedor:** Sankey implementado como SVG inline gerenciado por JS.
> Evitar D3.js (peso desnecessário); usar cálculos de `path` SVG diretos com interpolação manual.

**3. Avançar Trimestre + Evento Aleatório**
- Botão "Avançar para [Q2/Q3/Q4]" executa `DigitalTwinEngine.stepQuarter()`.
- Antes de executar, dispara sorteio de evento aleatório (ver [06](06_eventos_aleatorios_simulacao.md)).
- Se evento sorteado: modal de "Alerta Executivo" com descrição + botão "Entendido".

**4. Gráfico de Evolução Histórica (Canvas)**
- Linha temporal mostrando TCO, UI/$ e SLA ao longo dos trimestres completados.
- Pontos de evento aleatório marcados com ícone de raio.

**5. Time Lags — Indicadores de Aviso**
- Se `technicalDebt > 40%` no final de Q2, HUD exibe banner amarelo: "⚠ Débito técnico
  acumulado — impacto previsto em Q3."
- Se `devTeamMoral < 30%` no final de Q2, HUD exibe banner laranja: "⚠ Risco de burnout —
  custo de contratação pode dobrar em Q3."
- Se `V_core > 75` no final de Q2, HUD exibe banner: "⚠ Fadiga de verificação crônica —
  cada hora de revisão ficará mais cara em Q3."

**6. Indicador de Context Rot**
- Quando `avgContextTokens > 50_000`, um medidor no HUD acende em âmbar e cresce até vermelho:
  "🪟 Context Rot: acurácia efetiva −X p.p." O usuário aprende que a janela massiva **não é grátis**
  e que a mitigação é curadoria de contexto, não simplesmente "colocar tudo no prompt".

**7. Efeito Ricochete Agêntico (re-sent context)**
- Se o usuário ativar **múltiplos agentes sem isolamento de contexto no Q2**, o Gêmeo Digital exibirá
  no Q3 um **estouro de caixa** decorrente do contexto reenviado: a linha `resentContextCost` no
  Sankey infla até representar boa parte da fatura de API (até 62% no pior caso), e o caixa despenca.
- É a materialização do EVID_09: em pipelines agênticos, a alucinação inicial não é um erro isolado —
  ela ricocheteia topologicamente e multiplica o consumo de tokens.

### Evidências Coletadas
- `EVID_05`: "RouteLLM e SLMs reduzem o TCO em 35% a 85% redirecionando prompts simples para modelos menores."
  - Fonte: RouteLLM / LiteLLM Research (Level B)
- `EVID_06`: "Test-Time Compute Scaling melhora a acurácia em tarefas complexas, mas gera 'overthinking' e custos desnecessários em prompts simples."
  - Fonte: arXiv:2604.10739 (2026) (Level A — dados conflitantes)
- `EVID_09`: "Alucinações iniciais em pipelines multiagentes propagam-se; o contexto reenviado chega a 62% da fatura agêntica."
  - Fonte: Jamshidi et al. (arXiv:2606.07937) (Level A)
  - Desbloqueio: ativar multiagente sem isolamento OU disparar o evento `EVT_07`.
- `EVID_11`: "Context Rot degrada a acurácia acima de ~50k tokens; cache semântico corta custo em 50%–90% mas não corrige o rot."
  - Fonte: Chroma Research (2025) + docs de prompt caching (Level B)
  - Desbloqueio: `avgContextTokens > 50_000` OU cache semântico ativado.

### Critério de Conclusão
4 trimestres simulados + gráfico de evolução visualizado.

---

## Capítulo 6 — O Chefe Final: A Sessão do Conselho de Administração

### Objetivo Cognitivo
Avaliar a capacidade de síntese, defesa de decisões de arquitetura e argumentação estratégica com
base em evidências científicas e econômicas coletadas ao longo da jornada.

### Narrativa e Contexto
"Reunião anual do Conselho. O futuro da divisão de IA e seu cargo dependem do que você apresentar
agora. Os conselheiros consultaram as métricas do Gêmeo Digital. Eles sabem tudo."

### Stakeholders Presentes (com avatar SVG estilizado)
- **Helena Vance (CFO)** — pergunta sobre margens e TCO.
- **Dr. Aris Thorne (CTO)** — pergunta sobre escolhas técnicas e benchmarks.
- **Sarah Chen (VP Ops)** — pergunta sobre moral da equipe, débito técnico e **Fadiga de Verificação**
  provocada por modelos *overconfident* (alto V_core por "confiança cega").
- **Marcus Brody (CRO)** — pergunta sobre governança, risco de alucinações e **Governed UI/$** em
  indústrias reguladas (LGPD/GDPR, risco de alucinação em contratos).
- **Clara Mendez (Head de CX)** — pergunta sobre SLA e satisfação do cliente.

> **Nota de conteúdo:** O banco de perguntas expandido (incluindo a arguição de *Governed UI/$* de
> Marcus e a de *Fadiga de Verificação* de Sarah) está detalhado em
> [05_stakeholders_board_engine.md](05_stakeholders_board_engine.md).

### Mecânicas e Interações

**1. Diálogo Adaptativo Baseado no Estado**
- O `StatefulBoardEngine` gera entre 3 e 5 perguntas baseadas nas variáveis críticas do Gêmeo
  Digital ao final do Q4.
- Cada pergunta exibe o avatar do conselheiro + fala em balão de diálogo.

**2. Seleção de Argumento + Anexação de Evidências**
Para cada pergunta:
- O usuário seleciona um dos 2–3 argumentos apresentados.
- Deve arrastar para a zona de resposta pelo menos 1 Evidence Card do Mural.
- Resposta sem evidência anexada: não aceita (botão "Confirmar" bloqueado).

**3. Painel do Mural de Evidências (side panel)**
- Side panel deslizável com todos os Evidence Cards coletados.
- Cada card mostra: título, ícone de nível (A/B/C/D), badge de categoria.
- Apenas cards da categoria correta (`requiredCategory`) ficam destacados para cada pergunta.

**4. Barra de Confiança do Conselho**
- Cada resposta correta com evidência válida → `+15%` de confiança do conselheiro correspondente.
- Resposta errada → `-20%`.
- Barra agregada "Confiança do Conselho" em tempo real.

**5. Critérios de Vitória / Falha**

| Condição | Desfecho |
| :-- | :-- |
| Confiança ≥ 70% + Caixa > 0 + SLA ≥ 90% | **VITÓRIA** → Tela de celebração + Caso de Transferência |
| Caixa ≤ 0 (qualquer momento) | **FALHA** — Veto da CFO Helena |
| Horas humanas de revisão > threshold → Sarah Morale = 0 | **FALHA** — Demissão pela VP Ops |
| Confiança < 40% ao final das perguntas | **FALHA** — Voto de desconfiança do Board |

### Caso de Transferência (pós-vitória)
Cenário inédito exibido apenas após a vitória:
> "Sua clínica médica deseja automatizar triagem de exames. Modelo A: R$ 0,10/imagem, 88% de
> precisão. Modelo B: R$ 1,50/imagem, 99,2% de precisão. Cada erro exige 1h de revisão de
> radiologista (R$ 250/h). Qual modelo tem maior UI/$?"
- Input de resposta livre + cálculo guiado.
- Score final inclui acerto neste caso.

---

### Referências cruzadas

- Engine do Gêmeo Digital (cálculos de impacto de cada capítulo) → [03](03_digital_twin_engine.md)
- Evidence Board (modelo de dados dos cards) → [04](04_evidence_board_system.md)
- Stateful Board Engine (geração de perguntas) → [05](05_stakeholders_board_engine.md)
- Eventos aleatórios do Cap. 5 → [06](06_eventos_aleatorios_simulacao.md)
