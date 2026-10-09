# Especificação Funcional e de Conteúdo (SFC)
## Portal "A Conta Real da IA" — Economia Operacional da Inteligência Artificial nas Empresas

**Status:** Especificação pronta para kickoff (design + conteúdo + desenvolvimento)
**Tipo de produto:** Portal educacional/conceitual (não é um SaaS transacional)
**Nome de trabalho:** *A Conta Real da IA* (placeholder — sujeito a naming final)
**Idioma:** Português do Brasil (arquitetura pronta para expansão em inglês)
**Fontes conceituais fundadoras:**
1. Rafael Montilha — "A Ilusão do Retorno Imediato: Como Medir o ROI na Era da Inteligência Artificial" (visão estratégica/C-Level)
2. Mauricio Issei — "Operação Capital Cognitivo" (visão operacional/FinOps, simulador)

---

## 0. Contexto e Escopo deste Documento

Este documento especifica um **novo site**, distinto do simulador "Operação Capital Cognitivo". Ele não substitui o simulador — ele o abraça como uma das ferramentas do portal, junto com outras calculadoras e visualizações a serem construídas. O papel deste portal é ser a **camada de referência conceitual**: onde qualquer pessoa (de CFO a Tech Lead) entende, em profundidade, por que o ROI de IA não aparece imediatamente na DRE, por que o TCO é maior do que a fatura da API, e como medir valor de forma operacionalmente honesta.

O documento cobre: proposta de valor, personas, sitemap, conteúdo detalhado por página, ferramentas interativas, design system/tom de voz, e requisitos funcionais. Ele deve ser suficiente para que agentes de design, copywriting e engenharia iniciem a construção.

---

## 1. Proposta de Valor e Público-Alvo

### 1.1 Elevator Pitch

> **A Conta Real da IA é o portal de referência para quem precisa decidir, defender ou operar investimentos em Inteligência Artificial nas empresas — mostrando a matemática real por trás do custo (TCO), do tempo de maturação (Curva em J) e do valor (Três Ondas), sem hype e sem promessas de payback automático.**

Em uma frase para cada público:
- **Para o C-Level:** "Pare de medir IA como se fosse redução de despesa em 90 dias. Aprenda a fazer a pergunta certa ao conselho."
- **Para o CTO/Head de Engenharia:** "Aqui está o framework para provar, com dados, que a arquitetura que você construiu gera valor governado — não apenas tokens baratos."
- **Para o Tech Lead/Engenheiro de FinOps:** "A calculadora e o vocabulário para decompor o TCO real de qualquer pipeline de IA em produção."

### 1.2 Personas

| Persona | Cargo/Perfil típico | O que busca no portal | Dor principal | Página de entrada provável |
|---|---|---|---|---|
| **CFO Frustrado** | Diretor Financeiro, Controller | Entender por que a fatura de IA não bate com o "corte de custo" prometido pelo fornecedor ou pela área de tecnologia | Foi vendida uma promessa de ROI trimestral que não se materializou na DRE; precisa decidir se corta ou sustenta o investimento | `/o-mito-do-roi-imediato` |
| **CTO buscando Governança** | CTO, VP de Engenharia, Head de Dados | Um framework defensável para apresentar ao board, que traduza decisões técnicas (modelo, arquitetura, revisão humana) em linguagem de risco e retorno | Precisa justificar investimento contínuo em infraestrutura, observabilidade e revisão humana sem parecer que está "gastando mais para economizar menos" | `/tco-desmembrado` ou `/framework-ui-por-dolar` |
| **Tech Lead implementando pipelines de IA** | Engenheiro de ML/Plataforma, Arquiteto de Soluções | Vocabulário e fórmulas operacionais (TCO, UI/$, Cost-of-Pass, Governed UI/$) para instrumentar o próprio sistema e comparar arquiteturas | Está otimizando custo por token isoladamente e precisa de um modelo mais completo para não subotimizar o sistema | `/custo-humano-oculto` ou as calculadoras |
| **Gestor de Produto de IA** | PM/PO de produtos com IA embarcada | Entender como conectar métricas leading (adoção, cobertura de avaliação) a métricas lagging (receita, retenção) para não perder o financiamento do projeto | Precisa mostrar progresso antes que o valor financeiro lagging apareça | `/tres-ondas-de-valor` |
| **Consultor/Analista FinOps** | Consultoria, área de Estratégia, Analista de BI | Framework replicável para auditar investimentos em IA de clientes ou de outras áreas da empresa | Falta de padronização de como medir "valor de IA" entre projetos e fornecedores | `/framework-ui-por-dolar` e calculadoras |

### 1.3 O que o portal explicitamente NÃO é

- Não é uma ferramenta de vendas de consultoria ou produto de IA.
- Não afirma fórmulas como normas contábeis ou padrões de mercado — todas as métricas proprietárias (UI/$, V_core, Governed UI/$, Cost-of-Pass) são identificadas como **convenções operacionais de ensino**.
- Não promete payback, prazo ou percentual de ROI genérico.

---

## 2. Arquitetura de Informação (Sitemap)

A jornada segue a lógica: **do sintoma (fatura estranha) → para o diagnóstico (TCO e Curva em J) → para o framework de medição (Três Ondas + UI/$) → para a ação (calculadoras e defesa executiva)**.

| Nível | Página | Função na jornada | Persona primária |
|---|---|---|---|
| 0 | `/` — Home | Capturar os dois públicos (executivo e técnico) em uma tela; apresentar a tese central | Todos |
| 1 | `/o-mito-do-roi-imediato` | Explicar a Curva em J e por que a DRE mente sobre o curto prazo | CFO |
| 1 | `/tco-desmembrado` | Decompor o TCO em API, Infraestrutura, Capital Humano, Governança, Manutenção | CTO / Tech Lead |
| 1 | `/custo-humano-oculto` | Aprofundar Verification Load e a matemática da revisão humana | Tech Lead |
| 1 | `/tres-ondas-de-valor` | Explicar Eficiência → Qualidade → Transformação e como medir cada uma | Gestor de Produto |
| 1 | `/framework-ui-por-dolar` | Formalizar UI/$ e Governed UI/$ como métrica operacional central | CTO / FinOps |
| 2 | `/ferramentas` | Hub de calculadoras e simuladores (inclui link para "Operação Capital Cognitivo") | Todos |
| 2 | `/ferramentas/calculadora-tco` | Calculadora interativa de TCO | Tech Lead / FinOps |
| 2 | `/ferramentas/simulador-curva-em-j` | Mini-simulador da Curva em J por cenário | CFO / CTO |
| 2 | `/ferramentas/diagnostico-de-onda` | Quiz/diagnóstico: "em que onda está seu projeto de IA?" | Gestor de Produto |
| 2 | `/ferramentas/operacao-capital-cognitivo` | Redireciona ou incorpora o simulador narrativo existente | Todos (aprofundamento) |
| 1 | `/casos-e-cenarios` | Estudos de caso fictícios/anonimizados aplicando o framework | CFO / CTO |
| 3 | `/glossario` | Termos expandidos: TCO, DRE, UI/$, V_core, Cost-of-Pass, Governed UI/$, Curva em J, Verification Load | Todos |
| 3 | `/fontes-e-metodologia` | Atribuição a Montilha e Issei, nota de honestidade epistemológica, referências | Todos (rigor) |
| 3 | `/sobre` | Missão do portal, para quem foi feito, como usar | Todos |

### 2.1 Diagrama de fluxo de navegação (texto)

```
Home
 ├─→ O Mito do ROI Imediato ──┐
 ├─→ TCO Desmembrado ─────────┤
 ├─→ Custo Humano Oculto ─────┼─→ Ferramentas (Calculadoras) ──→ Casos e Cenários ──→ Fontes/Glossário
 ├─→ Três Ondas de Valor ─────┤
 └─→ Framework UI/$ ──────────┘
```

A navegação principal (header) expõe 5 pilares de conteúdo + Ferramentas + Glossário. O rodapé concentra Fontes, Sobre e Metodologia.

---

## 3. Estrutura de Conteúdo Detalhada (Deep Dive)

### 3.1 Home (`/`)

**Objetivo:** capturar a tensão central em até uma rolagem de tela e direcionar por perfil.

**Blocos obrigatórios:**
1. **Hero** — Headline + subheadline com a tese central (ver §3.1.1) e dois CTAs: "Entenda o TCO real" (rota técnica) e "Entenda a Curva em J" (rota executiva).
2. **Bloco de tensão** (pergunta errada vs. pergunta certa) — reaproveitando o padrão do simulador, adaptado à escala do portal.
3. **Trilha por persona** — três cartões: "Eu sou do Financeiro/C-Level", "Eu sou de Engenharia/Arquitetura", "Eu sou de Produto" — cada um leva a uma sequência de leitura recomendada.
4. **Prévia dos 5 pilares** — cards curtos para cada página de nível 1, com 1 frase de gancho cada.
5. **CTA para ferramentas** — prévia visual (screenshot ou mini-preview) da calculadora de TCO e do simulador Operação Capital Cognitivo.
6. **Nota de rigor/atribuição** (rodapé do hero) — mesma função do microcopy do simulador: deixar claro que métricas proprietárias são convenções de ensino.

**3.1.1 Copy-base sugerido (headline/subheadline):**

- Eyebrow: `ECONOMIA REAL DA INTELIGÊNCIA ARTIFICIAL NAS EMPRESAS`
- Headline: **"O ROI da IA não aparece na DRE do primeiro trimestre. E isso não é fracasso — é matemática."**
- Subheadline: "Todo projeto de IA parece caro no início e barato na demonstração do fornecedor. Este portal existe para fechar essa distância: o custo total real (TCO), o tempo de maturação (Curva em J) e o valor que de fato se consolida (Três Ondas)."

### 3.2 O Mito da DRE e a Curva em J (`/o-mito-do-roi-imediato`)

**Tópicos a aprofundar:**

| Subtópico | O que o texto deve provar | Recurso visual associado |
|---|---|---|
| Por que a DRE é um indicador *lagging* | DRE mede resultado consolidado; capacidades organizacionais (como IA) levam tempo para migrar de investimento para resultado contábil | Linha do tempo DRE vs. Capacidade |
| A forma da Curva em J | Fase 1 (custo sobe: treinamento, integração, instrumentação) → Fase 2 (vale de produtividade) → Fase 3 (inflexão e consolidação de valor) | Gráfico de linha interativo (ver §4.2) |
| O erro de "declarar fracasso cedo demais" | Casos em que a curva é cortada exatamente no vale, antes da inflexão | Callout / cenário comparativo (corta vs. sustenta) |
| Variáveis que mudam a forma da curva | Maturidade de dados, complexidade do processo, capacidade de adoção organizacional — a curva não tem prazo universal | Tabela "o que alonga/encurta a curva" |
| Diferença entre "curva normal" e "projeto mal desenhado" | Nem todo aumento de custo é investimento saudável; critérios para diferenciar os dois | Checklist de diagnóstico |

**Nota de rigor obrigatória:** o texto deve reforçar, com destaque visual (callout), que a Curva em J **não é garantia de retorno futuro** — é um modelo descritivo, não uma promessa.

### 3.3 O Desmembramento do TCO (`/tco-desmembrado`)

**Estrutura recomendada:** uma camada por seção, cada uma com (a) definição, (b) o que medir, (c) tradução executiva, (d) erro comum.

| Camada do TCO | O que medir | Tradução executiva | Erro comum a expor |
|---|---|---|---|
| API e Inferência | Tokens, chamadas, latência, custo por modelo | Custo direto e mais visível — a "ponta do iceberg" | Tratar isso como custo total da operação |
| Infraestrutura | Compute, armazenamento, vector DB, observabilidade, redes | Capacidade necessária para a IA rodar em produção com confiabilidade | Subdimensionar observabilidade e pagar em incidentes depois |
| Capital Humano Especializado | Horas de engenharia, dados, avaliação (eval), segurança, produto | Recurso escasso e caro que precisa ser alocado com critério | Tratar como custo de projeto (one-off) em vez de capacidade contínua |
| Governança e Dados | Qualidade de dados, privacidade, segurança, auditoria, compliance | Pré-condição para escalar sem aumentar exposição a risco | Ignorar até um incidente forçar o investimento retroativamente |
| Manutenção Contínua | Atualização de modelos, retreinamento, avaliação recorrente, adaptação a mudanças de fornecedores terceiros | OPEX recorrente da capacidade — nunca "acaba" | Orçar apenas a implantação e não o ciclo de vida |

**Ferramenta de apoio à leitura:** um "iceberg" interativo (ver §4.1) em que cada camada acima da linha d'água é a API, e abaixo estão as demais — ao clicar em cada camada, expande a definição.

**Comparativo obrigatório:** tabela "Preço por token vs. Custo por caso aprovado", mostrando que o modelo mais barato por chamada pode ter TCO maior quando a taxa de aprovação cai (ligação direta com §3.4).

### 3.4 O Custo Humano Oculto: Verification Load (`/custo-humano-oculto`)

**Tópicos a aprofundar:**

1. **Definição de Verification Load** — o tempo e custo humano necessário para revisar, corrigir ou rejeitar uma saída de IA antes que ela possa ser usada com segurança.
2. **A matemática básica:**
   - `Custo de Revisão = Nº de saídas × Taxa de intervenção × Tempo médio de revisão × Custo-hora do especialista`
   - `Cost-of-Pass = Custo total (API + revisão + retrabalho) ÷ Nº de saídas efetivamente aprovadas sem retrabalho`
3. **Por que reduzir o preço por token pode aumentar o Verification Load** — trade-off entre modelo mais barato/menos preciso e mais horas de revisão especializada.
4. **Capital humano como recurso restrito, não elástico** — cada hora de especialista usada corrigindo saída ruim é uma hora que não foi usada melhorando dados, avaliação ou arquitetura (custo de oportunidade).
5. **Como reduzir Verification Load de forma legítima** — investimento em avaliação automatizada (evals), melhoria de prompts/RAG, fine-tuning direcionado — versus formas ilegítimas (simplesmente parar de revisar).

**Recurso visual:** calculadora de Cost-of-Pass (ver §4.3) e um diagrama de "onde vai a hora do especialista" (pizza ou barra empilhada: correção de saída ruim vs. melhoria de sistema vs. novos casos de uso).

### 3.5 As Três Ondas de Valor da IA (`/tres-ondas-de-valor`)

**Estrutura por onda (reaproveitando e expandindo o framework do simulador):**

| Onda | Pergunta central | Como medir (evidência aceita) | Limite da afirmação |
|---|---|---|---|
| 1ª — Eficiência Operacional | O trabalho atual ficou mais rápido, barato ou escalável? | Tempo de ciclo, custo por caso, volume por pessoa, UI/$ | Eficiência não implica corte automático de despesa nem prova de valor de longo prazo |
| 2ª — Qualidade e Experiência | O cliente recebeu algo melhor, mais rápido ou mais confiável? | Taxa de erro, resolução, satisfação, conversão, retenção — sempre com baseline e período comparável | Requer comparação justa (mesma janela, mesma população) para não confundir sazonalidade com efeito de IA |
| 3ª — Transformação do Modelo de Negócio | A empresa ganhou uma capacidade que muda sua posição competitiva? | Nova oferta, novo canal, novo modelo de receita, personalização em escala | Deve ser tratada como hipótese estratégica até validação de mercado — nunca reivindicada só com evidência de eficiência |

**Tópicos adicionais a aprofundar nesta página:**
- Por que as ondas não são sequenciais obrigatórias, mas cumulativas (a 3ª onda depende de fundações construídas na 1ª e 2ª).
- O erro mais comum: **"onda-washing"** — chamar ganho de eficiência de "transformação digital" para justificar orçamento.
- Como cada onda se conecta a um horizonte de tempo diferente (a 1ª aparece em meses; a 3ª pode levar anos e depender de fatores fora do controle da equipe técnica).

### 3.6 O Framework Operacional: UI/$ e Governed UI/$ (`/framework-ui-por-dolar`)

**Tópicos a aprofundar:**

1. **Definição de UI/$ (Useful Intelligence per Dollar):**
   `UI/$ = Trabalho útil entregue (com definição explícita de "útil") ÷ Custo total (TCO da camada correspondente)`
   - O texto deve enfatizar que **"útil" precisa ser definido antes do cálculo** — não é sinônimo de "gerado" ou "processado".
2. **De UI/$ para Governed UI/$:** a métrica evolui ao incorporar governança como filtro — uma saída só conta no numerador se também passar em critérios de conformidade, segurança e qualidade.
   `Governed UI/$ = Trabalho útil E governado ÷ Custo total`
3. **V_core como proxy de valor líquido incremental** — explicado como a parcela de UI/$ que sobra depois de descontar custo de revisão, retrabalho e manutenção (ligação direta com Verification Load, §3.4).
4. **Como a métrica muda por onda de valor:** UI/$ tende a capturar bem a 1ª onda; captura parcialmente a 2ª (quando a "utilidade" inclui qualidade); precisa de proxies adicionais (ex: taxa de adoção de nova oferta) para sinalizar a 3ª.
5. **Hipótese de valor como pré-requisito:** antes de medir, declarar: `"Esta arquitetura aumentará [métrica] em [processo] para [público], no horizonte de [período], sem ultrapassar [limite de risco/custo]."`
6. **Métricas leading vs. lagging** (herdado do SDD do simulador): leading = cobertura de avaliação, taxa de adoção, tempo de ciclo, qualidade de dados, taxa de aprovação, custo por caso; lagging = margem, receita incremental, retenção, redução de risco materializado, impacto na DRE.

**Nota de rigor obrigatória:** reafirmar que UI/$, V_core, Cost-of-Pass e Governed UI/$ são **convenções operacionais de ensino**, não normas contábeis, GAAP/IFRS ou padrão de mercado certificado.

### 3.7 Casos e Cenários (`/casos-e-cenarios`)

Estudos de caso curtos (fictícios ou anonimizados), cada um estruturado como:
- **Contexto** (setor, processo, escala)
- **Decisão tomada** (modelo escolhido, arquitetura, nível de revisão humana)
- **TCO decomposto** (tabela simplificada das 5 camadas)
- **Onda de valor alcançada** (com evidência e limite da afirmação)
- **O que ficaria diferente com outra decisão** (contrafactual educativo)

Mínimo de 3 cenários no lançamento: (1) atendimento ao cliente com IA generativa, (2) automação de back-office/documentos, (3) personalização de produto/recomendação.

### 3.8 Glossário (`/glossario`)

Lista viva de termos, cada um com: definição em 1-2 frases, fórmula (quando aplicável), e link para a página onde é aprofundado. Termos mínimos: TCO, DRE, Curva em J, UI/$, V_core, Cost-of-Pass, Governed UI/$, Verification Load, Três Ondas de Valor, Métricas Leading/Lagging.

### 3.9 Fontes e Metodologia (`/fontes-e-metodologia`)

Atribuição explícita: os conceitos de Curva em J, mito do ROI imediato na DRE, TCO oculto, capital humano especializado, manutenção contínua e Três Ondas de Valor são originados do artigo de Rafael Montilha. A tradução operacional para métricas de FinOps (UI/$, V_core, Governed UI/$, Cost-of-Pass) e o simulador "Operação Capital Cognitivo" são de autoria de Mauricio Issei. Este portal integra e aprofunda ambos, com atribuição clara e nota de honestidade epistemológica reafirmada em cada página que usa números de exemplo.

---

## 4. Ferramentas Interativas e Visuais

O portal deve ser majoritariamente não-textual nas páginas de conceito — cada pilar (§3.2 a 3.6) precisa de ao menos um recurso visual interativo, não apenas ilustrativo.

### 4.1 Iceberg Interativo do TCO

- **Onde:** `/tco-desmembrado`, versão resumida também na Home.
- **O que faz:** SVG/HTML de um iceberg com 5 a 6 camadas (linha d'água = API/custo visível; camadas submersas = infraestrutura, capital humano, governança, manutenção). Ao passar o mouse/tocar em cada camada, expande definição, exemplo de item de custo e um valor ilustrativo em R$.
- **Interação-chave:** um slider "% do custo total que é API" — ao mover, as demais camadas se redimensionam proporcionalmente, mostrando visualmente que quanto menor a fatia da API, maior (proporcionalmente) é o resto do TCO.
- **Estado vazio/didático:** valores pré-carregados com o exemplo do Capítulo 1 do simulador (API R$ 3.000 / operação total R$ 40.000), com nota de que são parâmetros de ensino.

### 4.2 Simulador da Curva em J

- **Onde:** `/o-mito-do-roi-imediato`.
- **O que faz:** gráfico de linha (custo acumulado vs. valor acumulado) ao longo de um eixo de tempo configurável (trimestres). O usuário ajusta 3 parâmetros com sliders: (1) intensidade do investimento inicial, (2) duração do "vale" de produtividade, (3) inclinação da consolidação de valor.
- **Saída:** o gráfico recalcula em tempo real e destaca o "ponto de inflexão" (rotulado como "capacidade começa a compor valor", nunca como "payback garantido").
- **Camada de cenário:** dois ou três presets nomeados (ex.: "Processo simples e bem documentado", "Processo complexo com dados heterogêneos", "Organização com baixa maturidade de adoção") que mudam a forma da curva, reforçando que não existe curva universal.

### 4.3 Calculadora de TCO e Cost-of-Pass

- **Onde:** `/ferramentas/calculadora-tco`, referenciada também em `/custo-humano-oculto`.
- **Inputs do usuário:** custo de API/mês, custo de infraestrutura/mês, nº de FTEs especializados × custo-hora × horas alocadas, custo de governança/compliance, custo de manutenção recorrente, nº de saídas geradas/mês, taxa de aprovação sem intervenção (%), tempo médio de revisão por saída (min), custo-hora do revisor.
- **Outputs calculados:**
  - TCO total mensal (soma das 5 camadas)
  - Custo por saída gerada
  - **Cost-of-Pass** = TCO total ÷ nº de saídas aprovadas sem retrabalho
  - **UI/$** = trabalho útil declarado pelo usuário (input livre com definição obrigatória) ÷ TCO total
  - Gráfico de barras empilhadas mostrando a composição percentual do TCO
- **Comportamento pedagógico:** ao mudar apenas o preço por token para um valor menor mas manter/aumentar a taxa de intervenção, a ferramenta deve mostrar visualmente que o Cost-of-Pass pode subir — materializando "A Armadilha" do simulador.

### 4.4 Diagnóstico de Onda ("Em que onda está seu projeto de IA?")

- **Onde:** `/ferramentas/diagnostico-de-onda`.
- **Formato:** quiz curto (6-8 perguntas de múltipla escolha) sobre o tipo de evidência que a pessoa já tem disponível (ex.: "Você já mede tempo de ciclo antes/depois?", "Você tem baseline de satisfação do cliente?", "Existe uma nova fonte de receita direta ligada à IA?").
- **Output:** classificação em 1ª, 2ª ou 3ª onda **com base na evidência informada**, nunca com base em intenção ou expectativa. O resultado sempre vem acompanhado do "limite da afirmação" correspondente (reaproveitando a tabela de §3.5) e de sugestão de qual métrica leading começar a coletar para evoluir de onda.

### 4.5 Comparador de Arquiteturas (side-by-side)

- **Onde:** `/tco-desmembrado`, seção final, ou como ferramenta própria.
- **O que faz:** tabela comparativa interativa de até 3 arquiteturas hipotéticas lado a lado, replicando os campos da matriz do Capítulo 2 do simulador (preço unitário, taxa de aprovação, custo de revisão, especialização exigida, manutenção, UI/$, onda habilitada). O usuário pode editar os valores de cada coluna e ver o ranking recalculado — sem que a ferramenta imponha automaticamente "vencedor", apenas exiba os números lado a lado para leitura crítica.

### 4.6 Hub de Ferramentas (`/ferramentas`)

Página-índice com cards para cada ferramenta acima, mais um card de destaque levando ao simulador narrativo completo "Operação Capital Cognitivo" (link externo ou embutido via iframe/rota, a decidir na implementação), descrito como "a versão narrativa e gamificada deste framework, em 6 capítulos".

---

## 5. Requisitos de Tom de Voz e Design System

### 5.1 Princípios editoriais (herdados e adaptados do SDD do simulador)

| Princípio | Aplicação no portal | Evitar |
|---|---|---|
| Concreto | Priorizar custo, tempo, taxa de erro, qualidade, risco e receita incremental em todo exemplo | "Inovação", "disrupção", "revolução", "potencial ilimitado" sem métrica associada |
| Executivo sem simplificação | Traduzir TCO, UI/$ e Curva em J em consequência de DRE, cliente e posição competitiva, sem infantilizar o leitor de negócios | Tratar o C-Level como público que não entende tecnologia, ou o engenheiro como alguém que não entende negócio |
| Rigor de documentação técnica | Cada afirmação sobre "o que fazer" deve vir com fórmula, unidade de medida ou critério de aceite verificável | Frases motivacionais soltas sem lastro operacional |
| Honestidade epistemológica | Diferenciar explicitamente medição (dado observado), hipótese (declarada antes do fato), proxy (aproximação aceita) e parâmetro de ensino (número ilustrativo) | Apresentar convenções do portal (UI/$, Governed UI/$) como padrões de mercado ou normas contábeis |
| Sem promessa de payback | Toda menção a "retorno" deve vir acompanhada de horizonte de tempo e condição | Prometer redução automática de custo ou de headcount |

### 5.2 Voz e pessoa gramatical

- Segunda pessoa (você) para instruções e ferramentas; terceira pessoa/impessoal para definições de conceito.
- Frases curtas em blocos de definição; frases mais longas permitidas em blocos de contexto/narrativa, desde que sem adjetivação vazia.
- Números sempre com unidade explícita (R$, %, horas, meses) — nunca "muito mais barato" sem quantificação ou "significativamente melhor" sem métrica.

### 5.3 Design System — direcionamento visual

| Elemento | Diretriz |
|---|---|
| Paleta | Base neutra (grafite/branco/cinza-azulado), reservando uma cor de destaque (ex.: âmbar ou verde-petróleo) exclusivamente para "pontos de inflexão", CTAs e alertas de rigor — evitar paleta "tech genérica" de gradiente roxo/azul |
| Tipografia | Fonte com boa leitura de números e tabelas (contábil/monoespaçada para valores numéricos e fórmulas; humanista para corpo de texto) |
| Iconografia | Linha fina, sem ilustração 3D/render de "robôs" ou "cérebros digitais" — iconografia de laboratório/instrumentação (gráficos, réguas, camadas, balanças) |
| Gráficos e dados | Sempre com eixo rotulado, unidade explícita e legenda; nunca gráfico decorativo sem dado real por trás |
| Callouts de rigor | Componente visual padronizado (ex.: borda tracejada + ícone de nota) reutilizado em toda página que exibir número de exemplo, reforçando "parâmetro de ensino, não benchmark de mercado" |
| Densidade | Preferir profundidade em camadas expansíveis (accordion, hover, "saiba mais") a parágrafos longos por padrão — o portal deve permitir leitura rápida (escaneável) e leitura profunda (para quem clica) |

### 5.4 Acessibilidade e responsividade (herdado do SDD do simulador, válido para todo o portal)

- Todo componente interativo (sliders, calculadoras, cards, gráficos) deve ter texto alternativo, foco visível, contraste adequado (mínimo AA) e navegação completa por teclado.
- Gráficos e simuladores devem ter uma versão textual/tabular equivalente para leitores de tela.
- Em viewport móvel, nenhuma ferramenta interativa pode esconder a conclusão principal (o insight textual deve funcionar mesmo se o gráfico não for manipulado).

---

## 6. Requisitos Funcionais e Não Funcionais

### 6.1 Requisitos funcionais

| ID | Requisito | Critério de aceite |
|---|---|---|
| RF-01 | Home apresenta a tese central e roteia por persona | Três trilhas de persona visíveis sem rolagem excessiva; tese central legível em até 1 tela |
| RF-02 | As 5 páginas-pilar existem e seguem a estrutura de §3 | Cada página contém definição, fórmula (quando aplicável), tradução executiva e nota de rigor |
| RF-03 | Iceberg interativo funcional | Usuário consegue expandir cada camada e ajustar o slider de proporção API/TCO |
| RF-04 | Simulador de Curva em J funcional | Usuário ajusta ao menos 3 parâmetros e vê o gráfico recalcular sem reload de página |
| RF-05 | Calculadora de TCO/Cost-of-Pass funcional | Todos os inputs de §4.3 aceitos; outputs recalculados em tempo real; gráfico de composição do TCO exibido |
| RF-06 | Diagnóstico de onda funcional | Quiz classifica em 1ª/2ª/3ª onda com base em evidência informada, exibindo sempre o limite da afirmação |
| RF-07 | Link/integração com o simulador "Operação Capital Cognitivo" | Ferramenta visível no hub `/ferramentas` com descrição e CTA funcional |
| RF-08 | Glossário completo e linkável | Todos os termos de §3.8 presentes, cada um linkando de volta à página de aprofundamento |
| RF-09 | Atribuição de fontes visível | `/fontes-e-metodologia` cita explicitamente Montilha e Issei com links; nota de honestidade epistemológica presente |
| RF-10 | Nenhuma métrica proprietária é apresentada como padrão de mercado | Toda ocorrência de UI/$, V_core, Governed UI/$ e Cost-of-Pass vem acompanhada de nota "convenção operacional de ensino" na primeira menção por página |

### 6.2 Requisitos não funcionais

| Categoria | Requisito |
|---|---|
| Clareza | Nenhum texto depende de conhecimento prévio de DRE, TCO, FinOps ou UI/$; primeira ocorrência em cada página expande o termo ou linka ao glossário |
| Performance | Ferramentas interativas devem usar SVG/CSS/Canvas leve; evitar bibliotecas pesadas de visualização quando o gráfico for simples (linha, barra, área) |
| Rastreabilidade | Toda afirmação de framework estratégico (Curva em J, Três Ondas, mito do ROI imediato) aponta para a referência de Montilha; toda métrica proprietária aponta para a origem no simulador de Issei |
| Consistência de dados de exemplo | Os valores ilustrativos usados no portal (ex.: R$ 3.000 de API / R$ 40.000 de operação) devem ser consistentes com os usados no simulador "Operação Capital Cognitivo", para não gerar confusão entre as duas experiências |
| SEO/Descoberta | Cada página-pilar otimizada para os termos que a persona buscaria ("TCO de IA", "ROI de inteligência artificial", "curva em J produtividade IA", "custo de revisão humana IA") |
| Internacionalização (futuro) | Estrutura de conteúdo em componentes separados de string, permitindo tradução futura para inglês sem redesenho |

---

## 7. Plano de Testes (resumo, alinhado ao rigor do simulador)

### Testes de conteúdo
- Verificar que nenhuma página trata "API" como sinônimo de custo total.
- Verificar que a Curva em J nunca é descrita como garantia de retorno ou com prazo universal de payback.
- Verificar que capital humano especializado e manutenção contínua aparecem como itens explícitos e recorrentes (não pontuais) em `/tco-desmembrado`.
- Verificar que cada onda em `/tres-ondas-de-valor` tem pergunta, evidência aceita e limite da afirmação.
- Verificar que toda métrica proprietária (UI/$, V_core, Governed UI/$, Cost-of-Pass) está marcada como convenção operacional de ensino na primeira menção de cada página.

### Testes de lógica das ferramentas
- Na calculadora de TCO: reduzir o preço unitário mantendo/aumentando a taxa de intervenção deve poder aumentar o Cost-of-Pass exibido (nunca o contrário automaticamente).
- No diagnóstico de onda: uma resposta que cita apenas eficiência não pode ser classificada como 3ª onda.
- No simulador de Curva em J: mudar o preset de cenário deve alterar visivelmente a forma da curva (não apenas a escala).

### Teste de usabilidade (mínimo 3 perfis: financeiro/executivo, engenharia, produto)
Perguntas de saída, aplicadas após navegação livre de 10-15 minutos:
1. "Por que o ROI de IA pode não aparecer no primeiro trimestre da DRE?"
2. "Quais camadas compõem o TCO além da API?"
3. "O que significa 'Cost-of-Pass' e por que ele pode subir mesmo com token mais barato?"
4. "Em qual onda de valor você classificaria um exemplo hipotético dado a você — e o que faltaria para provar a próxima onda?"

O conteúdo é considerado aprovado quando os três perfis respondem corretamente sem apoio verbal do pesquisador.

---

## 8. Definition of Done (lançamento do portal)

- Home e as 5 páginas-pilar publicadas com todo o conteúdo especificado na §3.
- As 5 ferramentas interativas de §4 funcionais (iceberg, curva em J, calculadora de TCO, diagnóstico de onda, comparador de arquiteturas) mais o link para o simulador "Operação Capital Cognitivo".
- Glossário com todos os termos mínimos, todos linkados corretamente.
- `/fontes-e-metodologia` publicada com atribuição explícita a Montilha e Issei e nota de honestidade epistemológica.
- Nenhuma métrica proprietária apresentada sem a nota de "convenção operacional de ensino".
- Testes de conteúdo, lógica das ferramentas, acessibilidade e usabilidade executados e aprovados conforme §7.
- Design system (§5.3) aplicado de forma consistente entre todas as páginas — sem herança de estilo "tech genérico" (gradiente roxo/robôs 3D).

---

## 9. Referências e Atribuição

[1]: https://mauricio.issei.com.br/operacao-capital-cognitivo.html "Operação Capital Cognitivo — Simulador de FinOps de IA (Mauricio Issei)"
[2]: https://www.linkedin.com/pulse/ilus%C3%A3o-do-retorno-imediato-como-medir-o-roi-na-era-da-rafael-montilha-67tmf "A Ilusão do Retorno Imediato: Como Medir o ROI na Era da Inteligência Artificial (Rafael Montilha)"

Os conceitos de **Curva em J**, **mito do ROI imediato na DRE**, **TCO oculto**, **capital humano especializado**, **manutenção contínua** e **Três Ondas de Valor** têm origem no artigo de Rafael Montilha [2]. As métricas operacionais **UI/$**, **V_core**, **Cost-of-Pass** e **Governed UI/$**, bem como a estrutura narrativa em capítulos, têm origem no simulador "Operação Capital Cognitivo" de Mauricio Issei [1]. Este documento propõe a fusão editorial e a expansão em formato de portal de referência; a aplicação e a redação aqui descritas são especificações deste projeto, não afirmações empíricas universais sobre retorno de investimentos em IA.
