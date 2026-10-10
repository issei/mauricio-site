# Wireframe de conteúdo — landing *Especificação Conversacional Estruturada*

> **Status:** proposta para revisão do autor · 2026-10-10 · fase 1 (conteúdo), sem código.
> **Revisão 2 (2026-10-10):** D-1, D-2 e D-4 decididos (§8); complementos de
> `análise do design thinking.md` incorporados, com a avaliação em §10; ajuste de tom da `devin`
> proposto no Anexo A, aguardando aprovação. A fase 2 (implementação) não começou.
> **Revisão 3 (2026-10-10):** D-4 aplicado na `devin` (Anexo A, itens 1–14) e D-7 aplicado em
> `engenharia-confianca` e `apresentacao`. A landing continua na fase 1.
> **Base:** os 7 documentos desta pasta (`…_Artigo (1).md` e `…_Artigo (2).md` são idênticos).
> Eixo narrativo: `Especificacao_Conversacional_Artigo.md` (legado + governança). Rigor e limites:
> `Pesquisa, Síntese e Especificação do Projeto Vibe Spec-ing.md`. Articulação com TDD:
> `Vibe Spec-ing e TDD_ comparação rigorosa e cética.md`.
> **Regra de fidelidade:** nenhuma frase da página pode ser mais forte que a da fonte. Onde a fonte
> diz "hipótese", a página diz o mesmo, em selo visível (padrão de `formulacao-de-problemas`).

## 1. Decisões de enquadramento

| Item | Proposta | Por quê |
|---|---|---|
| Nome na página | Especificação Conversacional Estruturada | Nome do artigo central. "Vibe Spec-ing" aparece uma vez, numa nota de terminologia, e nas `keywords`: quem busca o rótulo informal chega à página. |
| Slug / URL | `especificacao-conversacional` → `https://mauricio.issei.com.br/especificacao-conversacional` | Curto; "Estruturada" fica no H1 e no `<title>`. (D-1, decidido) |
| `<title>` | `Especificação Conversacional Estruturada \| Maurício Issei` (57 car.) | Abaixo do limite de 60 do teste de SEO. |
| Meta description | `Workflow proposto para usar IA na elicitação de requisitos sob autoridade humana, com divergências rastreáveis entre documentação, testes e código.` (147 car.) | Diz o que é, a postura e o diferencial, sem promessa de resultado. |
| Fio condutor | Cenário do artigo central: modernização de um sistema comercial com mais de 15 anos, fluxo "aprovação de proposta com desconto excepcional". Selo **CENÁRIO ILUSTRATIVO** em toda aparição. | Um só cenário atravessa a página. O cenário de cancelamento de assinatura (versões anteriores do artigo) fica fora da landing. |
| Fio de rastreabilidade | A mesma regra percorre os visuais: `AF-012` nasce hipótese em V5, a divergência `DIV-007` é resolvida pela decisão `DEC-031` em V7, e `DEC-031` é o oráculo do teste de aceitação em V8. | O leitor vê uma regra ir da conversa ao teste — a rastreabilidade demonstrada, não só descrita. |
| Postura | Proposta em avaliação, não método validado | Decisão de prontidão do relatório de pesquisa (§10): publicável como ensaio e protocolo, "com ressalvas". |
| Conversão | (1) kit de artefatos em Markdown; (2) contato para discutir um caso; (3) continuação no ecossistema | Autoridade por evidência e por artefato utilizável, não por depoimento ou promessa. Precedente: ficha de `aprendizagem-autorregulada`. (D-2, decidido) |
| Extensão | ~2.300–2.800 palavras de prosa (≈ 12–14 min); ideia central (hero + `#definicao` + `#autoridade` + `#divergencia`) em ≈ 4 min. Tempos exibidos vêm do gerador editorial, não são digitados. | "Direto ao ponto": orçamento de palavras por seção (§3) e no máximo um visual principal por seção. |
| Camada editorial | Formato `Ensaio` · profundidade `Leitura aprofundada` · atalho para a síntese. Sem "Em uma frase" e sem rotas. | O lead do hero já é a tese e as portas de entrada fazem o roteamento (`EDITORIAL-LAYER.md` §7). |
| Namespace CSS | `.ecs-` | `.ec-` já pertence a `engenharia-confianca`. |
| JavaScript | Nenhum obrigatório: todos os visuais são HTML/SVG estáticos, com equivalente textual. | Padrão da casa para visualizações. |

### 1.1 Calibração do brief

O brief usa formulações mais fortes que os materiais. A página publica a versão calibrada:

| No brief | Problema | Na página |
|---|---|---|
| "gerar código tornou-se instantâneo" | hipérbole | "gerar código ficou mais rápido" |
| "essa velocidade destruiu a rastreabilidade da intenção de negócio" | causalidade sem evidência; o artigo diz "não garante" | "gerar código mais rápido não preserva, por si só, a intenção de negócio" |
| "sistemas impossíveis de manter" | absoluto | "sistemas cuja manutenção depende de reconstruir decisões que ninguém registrou" |
| "estrita Matriz de Autoridade Humana" | o artigo a chama de política proposta, adaptável à organização | "matriz de autoridade — política de governança proposta, não exigência de norma" |
| "gestão clara da divergência (drift)" | sugere eliminar o drift | "tornar a divergência detectável, explicável e tratável" |
| "IA como facilitadora cognitiva" | correto, mas vago | mantido, com o que inclui: perguntar, comparar interpretações, organizar hipóteses, sugerir casos |

## 2. Mapa da página

| # | Âncora | Arco | Título | Visual principal | Selo |
|---|---|---|---|---|---|
| 0 | `#hero` | Entrada | Especificação Conversacional Estruturada (H1) | V1 Triângulo de divergência | PROPOSTA |
| 1 | `#problema` | Problema | Gerar código mais rápido não preserva, por si só, a intenção de negócio | V2 Cadeia de transformações | SÍNTESE |
| 2 | `#causa` | Causa | Um pedido de modernização mistura quatro coisas diferentes | V3 Pedido anotado | CENÁRIO ILUSTRATIVO |
| 3 | `#definicao` | Solução | A IA amplia a investigação; pessoas com autoridade decidem | V4 Tabela comparativa | PROPOSTA |
| 3b | `#etapas` | Solução | Etapa por etapa: o que a IA acelera e o que pode distorcer | V4b Mapa de etapas | PROPOSTA |
| 4 | `#protocolo` | Implementação | Cinco práticas para que a saída da IA possa ser contestada | V5 Registro de afirmação (YAML) | PROPOSTA |
| 5 | `#autoridade` | Implementação | Quem decide o quê, e o que a IA pode fazer em cada decisão | V6 Matriz de autoridade | PROPOSTA |
| 6 | `#divergencia` | Implementação | Nenhum artefato, sozinho, preserva a intenção | V7 Um conflito, do início ao fim | PROPOSTA |
| 7 | `#tdd` | Implementação | A especificação decide o que verificar; o TDD verifica | V8 Dois testes lado a lado | SÍNTESE · EVIDÊNCIA |
| 8 | `#limites` | Prova | O que medir, e o que esta proposta ainda não prova | V9 Escada de evidência | NÃO VALIDADO |
| 9 | `#comece` | Conversão | Comece por um fluxo, não pelo sistema inteiro | V10 Kit + continuações | — |
| 10 | `#em-sintese` | — | Em síntese + Perguntas frequentes (gerado por `build-aeo.mjs`) | — | — |
| 11 | `#referencias` | — | Referências e procedência | — | — |

**Selos** (molde do `.fp-selo`; o rótulo textual carrega o significado, nunca só a cor):
`PROPOSTA` contribuição do autor, sem validação empírica · `SÍNTESE` consolidação de literatura ·
`EVIDÊNCIA` achado empírico de terceiros, com fonte · `NÃO VALIDADO` afirmação sem estudo ·
`CENÁRIO ILUSTRATIVO` exemplo construído, não é caso real nem resultado.

**Três velocidades de leitura:** 90 s → hero, selo e "Em síntese"; ~4 min → acrescenta
`#definicao`, `#autoridade` e `#divergencia`; completo → a página inteira.

## 3. Seções, bloco a bloco

Cada bloco traz os quatro itens pedidos — **1. título**, **2. conceito-chave**, **3. visual**,
**4. links** — mais **evidência** (onde citar o quê) e o orçamento de palavras.

### S0 · Hero — `#hero`

**1. Título**
- Sobretítulo: *Engenharia de requisitos · agentes de IA · sistemas legados*
- H1: **Especificação Conversacional Estruturada**
- Lead: *Um workflow proposto para usar modelos de linguagem na descoberta e no registro de
  requisitos, com decisões tomadas por pessoas com autoridade e divergências rastreáveis entre
  documentação, testes e código.*
- Selo `PROPOSTA`: *Enquadramento em desenvolvimento. O workflow completo ainda não foi comparado
  a uma linha de base; os componentes têm evidência parcial.*
- Byline: Maurício Yokoyama Issei · data · formato e tempos da camada editorial.
- CTAs: primário **"Ver as cinco práticas"** → `#protocolo`; secundário **"Baixar o kit de
  artefatos (.md)"** → `/downloads/kit-especificacao-conversacional.md` (`download`,
  `data-ecs-cta="kit-hero"`).
- Portas de entrada — *"Por onde você entra?"* (4 cartões, padrão de `formulacao-de-problemas`):

| Dor do leitor | Destino |
|---|---|
| "Vamos modernizar um sistema antigo e ninguém sabe quais regras ainda valem." | `#causa` |
| "O agente gera código mais rápido do que conseguimos revisar." | `#autoridade` |
| "A documentação diz uma coisa, os testes outra e o código uma terceira." | `#divergencia` |
| "Já praticamos TDD. Isso não basta?" | `#tdd` |

**2. Conceito-chave.** Em 10 segundos o leitor sabe o que é (um workflow, não uma ferramenta), em
que condição vale (autoridade humana, divergência governada) e qual é o status (proposta). O selo
no topo é a primeira prova de rigor da página.

**3. Visual — V1 Triângulo de divergência.** Três nós ligados por arestas com o conflito do cenário:
*Documentação* ("acima do limite, exige aprovação") · *Teste de caracterização* ("o legado aprova
direto") · *Código novo* ("qual dos dois seguir?"). No centro: **"Quem decide?"**. O mesmo
triângulo volta resolvido em V7. SVG inline em `<figure>` com `<figcaption>` e lista equivalente.

**4. Links.** Byline → `./curriculo.html`. Eco-nav no pilar p2 só depois de D-5.

### S1 · Problema — `#problema`

`SÍNTESE` · 180–220 palavras

**1. Título:** *Gerar código mais rápido não preserva, por si só, a intenção de negócio*

**2. Conceito-chave.** Agentes interpretam instruções, consultam arquivos, propõem alterações,
geram código e executam testes. Isso reduz o esforço de implementar, mas não garante que a solução
corresponda ao problema. Quando o agente encadeia tarefas, uma interpretação incompleta atravessa
vários artefatos antes de alguém percebê-la: o risco não é só o código errado, é uma interpretação
não validada virar uma implementação aparentemente consistente. Em legado, o conhecimento de negócio
está espalhado entre código, integrações, documentação desatualizada e a memória de poucas pessoas.
Fecho: nem o ganho de velocidade é consenso (ver Evidência); a página discute o que se perde no
caminho, não quanto mais rápido se chega.

**3. Visual — V2 Cadeia de transformações.**
`conversa → resumo → requisito → design → tarefa → código → teste → produto`; cada seta marca o que
pode acontecer ali (perder contexto · introduzir inferência · criar contradição). `<ol>` horizontal
no desktop, vertical no mobile. Fonte: comparação com TDD, §7.1.

**4. Links.** `./engenharia-confianca.html#modulo-0` — *O Crash Silencioso*: a mesma falha vista
quando chega à produção, num sistema que parece funcionar.

**Evidência.** Hou et al. (2024), revisão sistemática de LLMs em engenharia de software — atesta o
uso amplo, não a eficácia deste workflow. Produtividade, lado a lado: ganho em tarefa controlada
(Peng et al., 2023) × 19% mais tempo para 16 desenvolvedores experientes em 246 issues reais
(Becker et al., 2025, preprint).

### S2 · Causa — `#causa`

`CENÁRIO ILUSTRATIVO` · 200–250 palavras

**1. Título:** *Um pedido de modernização mistura quatro coisas diferentes*

**2. Conceito-chave.** Apresenta o cenário: sistema comercial com mais de 15 anos (propostas,
condições comerciais, aprovações, contratos, integração com faturamento); mudanças levam semanas;
poucas pessoas conhecem todas as regras. O pedido da diretoria: *"Precisamos modernizar esse
sistema, migrando para uma arquitetura mais atual, sem interromper a operação e sem perder as
regras de negócio existentes."* A frase expressa uma intenção legítima, mas não diz o que
preservar, o que mudar nem como medir o sucesso. Ela junta sintomas, necessidades a investigar,
objetivos e uma solução já escolhida — e cada categoria pede um tratamento diferente.

Segunda causa, a decisiva em legado: **o comportamento atual do sistema não é necessariamente o
comportamento desejado.** Uma regra pode ser preservada, corrigida, substituída ou descontinuada; a
decisão depende de evidência e de autoridade de negócio, não do que o código executa hoje.

Fecho-ponte (uma frase): o pedido vira uma sequência de decisões, e em cada etapa há um ponto em que
a IA ajuda e outro em que ela pode distorcer — mapeados em `#etapas`. (Na revisão 2 saiu a lista de
"cinco mecanismos de perda": repetia a coluna de riscos de V4b.)

**3. Visual — V3 Pedido anotado.** A citação com trechos marcados (`<mark>` + rótulo textual) e:

| Categoria | No cenário | Tratamento |
|---|---|---|
| Sintomas | mudanças demoradas, incidentes recorrentes, dependência de especialistas | investigar a causa |
| Necessidades a investigar | reduzir custo e risco das mudanças; depender menos de conhecimento tácito | confirmar com evidência |
| Objetivos declarados | "sem interromper a operação", "sem perder as regras" | tornar verificáveis (quais regras?) |
| Solução pressuposta | "arquitetura mais atual" | avaliar como alternativa, não como requisito |

Achado que o visual entrega: a frase literal só contém objetivos e uma solução; a necessidade não
aparece nela.

**4. Links.** `./formulacao-de-problemas.html#tese` — formular o problema antes de comprometer a
solução. Secundário: `./proposta-engenharia-reversa.html#inventario` — o mesmo levantamento As-Is,
aplicado a legado Salesforce.

**Evidência.** **ISO/IEC/IEEE 29148:2018** — engenharia de requisitos como elicitar, analisar,
especificar, validar e gerenciar; distinção entre verificação e validação. NASA, *Systems
Engineering Handbook* §4.1 — necessidades respondem ao problema sem prescrever solução. Ferrari et
al. (2016) e Burnay et al. (2014) — ambiguidades revelam conhecimento tácito e stakeholders omitem
tópicos que ninguém pergunta: por que conversar com operação, suporte e integrações, e não só ler o
código.

### S3 · Solução — `#definicao`

`PROPOSTA` · 260–320 palavras

**1. Título:** *A IA amplia a investigação; pessoas com autoridade decidem*

**2. Conceito-chave.**
- **Definição em destaque:** *"Especificação Conversacional Estruturada é um workflow humano–IA,
  governado por artefatos e por autoridade humana, para elicitar, registrar, testar e evoluir a
  intenção de um sistema como requisitos e critérios verificáveis — mantendo explícitas as fontes,
  as incertezas, as decisões e a forma de verificação."*
- O modelo pode perguntar, resumir, propor cenários, apontar contradições, recuperar contexto e
  preparar mudanças. Não recebe, por padrão, autoridade para decidir valor, risco, conformidade,
  aceitação ou verdade de domínio.
- Posição: compatível com as atividades de elicitação, análise, validação e gestão descritas na
  29148 e no SWEBOK; explora como a IA pode apoiá-las, sem substituí-las.
- Dois modos: **spec-first** (antes do código; risco: congelar cedo uma interpretação do modelo) e
  **spec-retrospectiva** (reconstruir a intenção a partir de código, logs e incidentes; risco: dar
  coerência ao que foi acidental). Em legado, os dois aparecem.
- Destaque **"A objeção mais forte: isso é engenharia de requisitos com outro nome?"** Resposta: em
  boa parte, sim. A contribuição possível é de interface e orquestração, e só existe se o workflow
  especificar entradas, gates, tipos de artefato, autoridade, proveniência, política de divergência
  e métricas. Conversar com a IA e sair com um Markdown não é isso.
- O que não é (5 itens): método validado ou norma; substituto de engenharia de requisitos,
  arquitetura, segurança ou governança; validação de negócio por aprovação em chat; garantia de
  completude, de ausência de alucinação ou de fim do drift; TDD, BDD ou Example Mapping com outro
  nome.
- Nota de terminologia (texto menor): este enquadramento já foi chamado de *Vibe Spec-ing*. O nome
  mudou porque "vibe" sugere o contrário do que a proposta exige: registro, autoridade e
  verificação. Rótulos parecidos (*vibe specs*, *vibe speccing*) circulam informalmente para
  entrevistas com IA antes do código ou para specs geradas de logs de agentes.

**3. Visual — V4 Tabela comparativa** (fonte: síntese crítica §6.4):

| Conversar com IA | Especificação conversacional estruturada |
|---|---|
| Histórico livre, sem estado governado | Artefatos versionados, com ID, responsável e política de mudança |
| O objetivo muda sem registro | Problema, critério de sucesso, escopo e fora de escopo explícitos |
| A decisão fica implícita na resposta | Decisões, alternativas rejeitadas e perguntas abertas registradas |
| Fluência é o critério percebido | Critérios de aceitação e verificação auditáveis |
| O prompt pode ir direto ao código | Especificação → revisão → testes → implementação → validação |
| Divergência entre spec e código é invisível | Divergência detectada por links, testes e revisão |
| A IA pode parecer autoridade | A IA propõe; pessoas designadas decidem |

Abaixo, dois cartões: spec-first × spec-retrospectiva (finalidade + risco).

**4. Links.** `./devin.html` — *Vibe Coding com Devin*: a prática de orquestrar agentes que esta
proposta complementa. Secundário: `./engenharia-agentes-ia.html#governanca` — "Governança
Agent-Driven & Vibe Coding".

**Evidência.** **SWEBOK Guide v4.0a**, área de Requisitos de Software — baseline disciplinar.
**ISO/IEC/IEEE 29148**. Böckeler/Thoughtworks (2025) — "spec-driven development" é rótulo instável
(spec-first, spec-anchored, spec-as-source). Uso informal do rótulo (marmelab, 2025; Bechtel;
McGuinness) — citado como uso, não como evidência.

### S3b · Etapas — `#etapas` (novo na revisão 2)

`PROPOSTA` · 120–160 palavras + tabela

**1. Título:** *Etapa por etapa: o que a IA acelera e o que pode distorcer*

**2. Conceito-chave.** Mostra o workflow inteiro antes dos detalhes. Quem conhece Design Thinking
reconhece quatro das cinco etapas; a quinta — especificar e evoluir os artefatos — é o acréscimo de
engenharia de requisitos. Em cada etapa, o ganho vem junto com um risco conhecido e um controle.
É um ciclo, não uma sequência: qualquer etapa volta à anterior quando surge evidência nova
(relatório de pesquisa, §5). O vocabulário do Design Thinking serve de mapa; não é apresentado como
prova de nada.

**3. Visual — V4b Mapa de etapas** (tabela; cada linha leva à seção que aprofunda; no mobile, um
cartão por etapa):

| Etapa | Onde a IA ajuda | O que pode distorcer | Controle | Seção |
|---|---|---|---|---|
| Descobrir | sugerir perguntas e apontar tópicos que ninguém mencionou | resumo que deforma relatos; personas sintéticas que ancoram estereótipos; ilusão de completude | registrar a origem; conferir com a observação da operação e a inspeção do legado | `#protocolo` |
| Definir o problema | separar sintoma, necessidade, objetivo e solução presumida | hipótese de resultado virar requisito; solução congelada cedo | decisão humana antes de formalizar; validar o entendimento não é validar o resultado | `#causa` |
| Explorar exemplos | gerar casos normais, de limite e negativos | especificação fluente que esconde premissa falsa; conflito harmonizado em silêncio | exemplos validados por quem conhece o domínio; conflito preservado, não resolvido pelo modelo | `#protocolo` |
| Especificar e evoluir | estruturar a spec e propor links de rastreabilidade | drift; perda de quem decidiu, com que evidência e o que foi rejeitado | política de divergência; proveniência; histórico que não apaga versões | `#divergencia` |
| Testar e validar | traduzir critérios em testes e apoiar testes de caracterização | teste verde contra um oráculo errado escrito pela própria IA | oráculo definido por pessoas; testes independentes | `#tdd` |

**4. Links.** Só internos (coluna Seção): o bloco é o mapa da própria página.

**Evidência.** Reaproveita as fontes das seções de destino (Ferrari et al.; Burnay et al.; NIST AI
600-1; Gotel & Finkelstein; W3C PROV-DM; Feathers). "Personas sintéticas" entra como risco
plausível, sem estudo citado, com redação modal ("podem ancorar"). Origem do bloco:
`análise do design thinking.md`, matriz 1, calibrada conforme §10.

### S4 · Protocolo — `#protocolo`

`PROPOSTA` · 250–320 palavras

**1. Título:** *Cinco práticas para que a saída da IA possa ser contestada*

**2. Conceito-chave.** "A contribuição do modelo só é útil quando suas saídas podem ser examinadas
e contestadas." Começar por um fluxo representativo, não pelo sistema inteiro — no cenário, a
aprovação de proposta com desconto excepcional. As cinco práticas, uma linha cada:

1. **Registrar a origem de cada afirmação** — entrevista, documento, inspeção de código, observação
   operacional, inferência ou decisão formal. A conversa com o modelo não substitui observar a
   operação nem inspecionar o legado: as fontes se conferem umas às outras.
2. **Separar fatos, hipóteses e propostas** — uma resposta plausível do modelo não é evidência de
   que a regra existe.
3. **Manter as pendências visíveis** — incerteza relevante fica aberta, com responsável, até ser
   resolvida ou aceita como risco.
4. **Usar exemplos e contraexemplos** — situação normal, limite e exceção. Os exemplos do fluxo
   (dentro do limite → aprovação automática; acima → pessoa autorizada e justificativa; dados
   incompletos → não avança; valor alterado após a aprovação → pode exigir nova avaliação) são
   hipóteses até a confirmação. O modelo sugere casos; não os promove a regra aprovada.
5. **Revisão proporcional ao risco** — decisões comerciais, regulatórias e de integração crítica
   passam por quem tem autoridade.

Fecho: não é burocracia para cada frase; é conseguir distinguir o que se sabe, o que se supõe e o
que se decidiu. E validar o entendimento não é validar o resultado: a conversa mostra se as pessoas
entendem a regra do mesmo jeito, não que a modernização vai reduzir incidentes.

**3. Visual — V5 Registro de afirmação.** Bloco de código com cada campo anotado pelo número da
prática; no mobile, as anotações viram lista abaixo do bloco.

```yaml
# Cenário ilustrativo — fluxo: aprovação de proposta com desconto excepcional
id: AF-012
afirmacao: >
  Proposta com desconto acima do limite exige aprovação
  de pessoa autorizada e registro da justificativa.
status: hipotese                    # [2] fato | hipotese | proposta | decisao
origens:                            # [1]
  - entrevista: operação comercial
  - inspecao_de_codigo: rotina de aprovação do legado
  - documento: manual de procedimentos (desatualizado)
limite_de_desconto: nao_conhecido   # [3] as fontes divergem
exemplos: [EX-01, EX-02, EX-03]     # [4] normal, limite, exceção
sugerido_pela_ia: [EX-03]           # [4] candidato; não é regra aprovada
risco: alto                         # [5] exige revisão de quem tem autoridade
decide: responsável pela política comercial
pendencia: aberta
```

Nenhum valor de regra é inventado: o limite aparece como `nao_conhecido`, que é o ponto da
prática 3.

**4. Links.** `./engenharia-confianca.html#modulo-1` — "Revelar o Implícito para torná-lo
Explícito": inventário As-Is e separação entre fato, inferência e julgamento.
`./formulacao-de-problemas.html#parada` — quando parar de investigar (avançar sem eliminar toda a
incerteza). Secundário: `./knowledge-os-presentation.html#tipologia` — conhecimento tipado e
endereçável.

**Evidência.** **NIST AI 600-1** (perfil de IA generativa) — confabulação e configuração humano–IA
como riscos a gerenciar; base para separar fato de inferência e exigir revisão. **W3C PROV-DM** —
modelo de proveniência (entidade, atividade, agente). Parasuraman & Manzey (2010) e Buçinca et al.
(2021) — viés de automação; funções de forçamento cognitivo reduziram a dependência excessiva da IA
em experimento. Cucumber, *Example Mapping* — formato de regras, exemplos e perguntas. **SWEBOK**
— lista várias fontes de requisitos (stakeholders, regras de negócio, conhecimento do domínio,
ambiente operacional): base da triangulação na prática 1.

### S5 · Matriz de autoridade — `#autoridade`

`PROPOSTA` · 170–220 palavras + tabela

**1. Título:** *Quem decide o quê, e o que a IA pode fazer em cada decisão*

**2. Conceito-chave.** A matriz separa autoridade de assistência. É uma política de governança
proposta, a ajustar à estrutura de responsabilidade de cada organização — não uma exigência de
norma. Quando o agente também executa ferramentas, altera arquivos ou aciona pipelines, os
controles passam a cobrir permissões, escopo de execução, revisão de mudanças e condições de
interrupção: gerar uma sugestão e executar uma ação são níveis diferentes de autonomia. A linha do
oráculo é a ponte para `#tdd`: a IA pode escrever o código do teste, mas o resultado esperado vem
de quem tem autoridade sobre a regra.

**3. Visual — V6 Matriz** (tabela; no mobile, um cartão por decisão). Sete linhas do artigo
central, três da análise de design thinking (oráculo, código de teste, divergência) e a linha
final do relatório de pesquisa §6.1. A versão com a coluna "revisão obrigatória" (por exemplo,
segurança e operação revisam arquitetura) vai para o kit, para a tabela caber no mobile:

| Decisão | Autoridade primária | Contribuição possível da IA |
|---|---|---|
| Valor e prioridade de negócio | Produto e negócio | Comparar alternativas e impactos |
| Preservar ou alterar regras comerciais | Responsáveis pelo domínio | Identificar ambiguidades e casos-limite |
| Critérios de aceitação | Negócio e engenharia | Propor formulações e exemplos de teste |
| Arquitetura | Engenharia responsável | Sugerir alternativas e trade-offs |
| Compatibilidade de integrações | Engenharia e responsáveis pelas integrações | Mapear contratos e possíveis impactos |
| Aceitação de risco residual | Responsáveis formalmente designados | Identificar cenários e apoiar a análise |
| Redação da especificação | Equipe responsável, com revisão | Estruturar e reformular conteúdo |
| Oráculo de teste (o resultado esperado) | Negócio e engenharia | Gerar candidatos para validação |
| Código de teste | Engenharia e QA | Escrever o código; o oráculo vem da linha acima |
| Classificação de uma divergência | Responsável pelo artefato afetado | Detectar possíveis conflitos |
| **Modelo / agente** | **Nenhuma autoridade substantiva por padrão** | Propor, recuperar, transformar; executar só no escopo autorizado |

**4. Links.** `./engenharia-confianca.html#modulo-3` ("De Executor a Orquestrador Cognitivo") e
`./devin.html#identidade` ("Você não é mais um executor") — o papel humano que esta matriz
formaliza. `./develop-engineering.html#cena-05` — "Autonomia não é autoridade: o Action Gateway",
os controles para quando o agente executa. Secundário: `./case-agents.html#barreira` — quando o
agente não deve executar.

**Evidência.** **NIST AI RMF 1.0**, função *Govern* — papéis, responsabilidades e prestação de
contas (redação: "inspirada em", nunca "em conformidade com"). **NIST AI 600-1** — configuração
humano–IA. **ISO/IEC/IEEE 29148** — identificação de stakeholders e gestão de requisitos.

### S6 · Divergência — `#divergencia`

`PROPOSTA` (exemplo com `CENÁRIO ILUSTRATIVO`) · 260–320 palavras

**1. Título:** *Nenhum artefato, sozinho, preserva a intenção*
Lead: *Documentação, testes e código vão divergir. O que importa é quem resolve, como, e onde a
decisão fica registrada.*

**2. Conceito-chave.** Cada artefato tem uma responsabilidade e um limite: regras de negócio
registram políticas aprovadas, mas não garantem a implementação; testes de caracterização registram
o legado, inclusive defeitos e regras obsoletas; o código implementa uma versão, mas não comprova
aderência à intenção. Não há fonte universal de verdade.

Política de divergência em cinco passos: identificar os artefatos e o comportamento divergente →
classificar a causa provável (informação incompleta, defeito, mudança de regra, obsolescência, erro
de implementação) → identificar quem tem autoridade → registrar decisão, justificativa, impacto e
artefatos afetados → atualizar e verificar de novo.

Exemplo: o teste de caracterização mostra que o legado aprova um desconto que a política atual
proíbe. O teste é evidência sobre o legado, não obrigação para o sistema novo; o comportamento
desejado vem da decisão de negócio. O caso inverso: se o código novo não satisfaz um critério
aprovado, mudar o critério exige decisão explícita — editar o teste para ele passar é uma decisão
sem registro. Rastreabilidade nas duas direções (decisão → critério → teste → componente; falha →
regra a revisar), com profundidade proporcional à criticidade e à exigência de auditoria. "O
objetivo não é impedir toda divergência, mas torná-la detectável, explicável e tratável."

- **Sem nota de revisão (D-4):** a `devin` passa a dizer o mesmo na origem (Anexo A).
- **CTA contextual** (fim da seção): *"Os modelos de registro de divergência e a lista de estados
  estão no kit."* → download (`data-ecs-cta="kit-divergencia"`).

**3. Visual — V7 Um conflito, do início ao fim.** Stepper de 5 passos aplicado ao exemplo do
desconto (`DIV-007` → `DEC-031`); ao lado, o triângulo do hero resolvido (centro: "Decisão
registrada · responsável pela política comercial"). Abaixo:

| Situação identificada | Tratamento proposto |
|---|---|
| Comportamento intencional e ainda válido | Preservar e documentar |
| Defeito conhecido | Corrigir com aprovação e testes |
| Regra obsoleta | Descontinuar mediante decisão explícita |
| Informação insuficiente | Investigar e manter a pendência visível |
| Dependência de integração | Definir compatibilidade e estratégia de transição |

Recolhidos em `<details>`: "Os oito artefatos, sua responsabilidade e seu limite" (tabela do
artigo, §4) e os estados de divergência — `não conhecido`, `ambíguo`, `spec desatualizada`,
`teste sem requisito`, `requisito sem teste`, `código fora da spec`, `produção divergente`,
`risco aceito`, `bloqueado`, `resolvido`.

**4. Links.** `./develop-engineering.html#cena-01` — "Cinco fontes de verdade, cada uma com
autoridade limitada" (a mesma tese pelo ângulo do grounding). `./develop-engineering.html#cena-07`
— "Evidence Record: o recibo de cada validação". `./apresentacao.html` — *Arquitetura de IA
auditável*, "Princípios que podem ser verificados" (rastreabilidade e reversibilidade). O FAQ de
`apresentacao` foi alinhado a esta tese em 2026-10-10 (D-7).

**Evidência.** Gotel & Finkelstein (1994) e Ramesh & Jarke (2001) — rastreabilidade antes e depois
da especificação, com links tipados. Rempel & Mäder (2017) — em 24 projetos open source,
rastreabilidade mais completa associou-se a menos defeitos (associação, não causa). Fucci et al.
(2022) — links ausentes entre requisitos e testes impediram avaliar uma intervenção de qualidade.
Böckeler (2025) — drift entre spec e código em SDD. **W3C PROV-DM**.

### S7 · Especificação e TDD — `#tdd`

`SÍNTESE` · `EVIDÊNCIA` · 290–350 palavras

**1. Título:** *A especificação decide o que verificar; o TDD verifica*

**2. Conceito-chave.** Definir no primeiro uso: *oráculo* é a fonte do resultado esperado com que o
teste compara o comportamento observado. A diferença entre as abordagens é a unidade de controle.
O TDD (escrever um teste que falha, o código mínimo para ele passar, refatorar) responde "qual é o
próximo menor incremento e como verifico que ele continua funcionando?". A especificação responde
"qual problema, para quem, com quais regras, restrições e critérios?". O TDD torna o feedback
barato; não torna o oráculo correto. Sem intenção e escopo, o TDD pode testar a coisa errada com
eficiência; sem oráculos executáveis, a especificação pode documentar uma intenção errada.

Risco específico de agentes: quando o mesmo modelo escreve a especificação e os testes, um teste
verde pode apenas confirmar o erro do próprio modelo. Controle: o resultado esperado é definido ou
validado por pessoas antes de o teste ser gerado (linha do oráculo em `#autoridade`), e cada
critério crítico tem pelo menos um teste que não nasceu do mesmo prompt nem do mesmo contexto.

Em legado, três tipos de teste com papéis diferentes: caracterização (o que o legado faz hoje),
aceitação (os critérios aprovados), TDD (a implementação local). Sequência: caracterizar o legado →
validar as regras com quem decide → escrever testes de aceitação → implementar com TDD → comparar
resultados → liberar com monitoramento, critério de interrupção e reversão.

A evidência sobre TDD é maior que a deste workflow, e contextual (ver Evidência). Conclusão: a
proposta não reivindica superioridade sobre o TDD nem o substitui. Fornece contexto e decisões; o
TDD fornece feedback local e proteção contra regressão.

**3. Visual — V8 Dois testes lado a lado.** Legenda: *o mesmo fluxo, duas perguntas diferentes*.

```js
// Caracterização: registra o que o legado FAZ hoje — não o que deve fazer.
// Divergência DIV-007 aberta: a política atual proíbe este comportamento.
test('legado: aprova desconto acima do limite sem aprovação', () => {
  expect(legado.avaliar(propostaAcimaDoLimite()).status).toBe('APROVADA');
});

// Aceitação: o oráculo vem de AF-012, confirmada na decisão DEC-031.
// O teste verifica a regra; quem a definiu foi o responsável pela política.
test('proposta acima do limite aguarda aprovação e exige justificativa', () => {
  const r = avaliarProposta(propostaAcimaDoLimite());
  expect(r.status).toBe('AGUARDANDO_APROVACAO');
  expect(r.pendencias).toContain('JUSTIFICATIVA');
});
```

Abaixo, stepper horizontal dos 6 passos (vertical no mobile). Recolhida em `<details>`: tabela
"Especificação × TDD" (propósito, unidade de controle, oráculo, drift, evidência), da comparação
cética §1.

**4. Links.** `./case-agents.html#crash-silencioso` — "a falha que 54 testes não pegaram" (teste
verde com oráculo insuficiente). `./develop-engineering.html#cena-06` — "Passar no teste não é o
mesmo que estar certo". `./devin.html#fluxo` — da spec ao Apex Test, na prática Salesforce.
Secundários: `./acessibilidade.html#problema` (a mesma lógica em acessibilidade) e
`./proposta-engenharia-reversa.html#ponte-tobe` (legado As-Is → To-Be).

**Evidência.** Beck (2002) — TDD. Feathers (2004) — testes de caracterização em código legado.
Rafique & Mišić (2013) — meta-análise de 27 estudos: efeito pequeno em qualidade, pouco ou nenhum
em produtividade. Tosun et al. (2017) — 24 profissionais: sem diferença estatística de qualidade
externa; queda de produtividade na tarefa brownfield complexa. Nagappan et al. (2008) — quatro
equipes IBM/Microsoft: densidade de defeitos 40–90% menor e 15–35% mais tempo, com ameaças à
validade declaradas pelos autores. Liu et al. (2023, EvalPlus) — testes ampliados encontram erros
que os testes originais deixam passar.

### S8 · Medir e limites — `#limites`

`NÃO VALIDADO` (workflow completo) · `EVIDÊNCIA` (componentes) · 280–340 palavras

**1. Título:** *O que medir, e o que esta proposta ainda não prova*

**2. Conceito-chave.**
- **Medir a modernização.** Uma modernização não está concluída porque o código foi reescrito.
  Indicadores em duas colunas — *processo*: regras críticas identificadas e validadas; critérios
  cobertos por pelo menos um teste independente (não gerado do mesmo prompt da spec); divergências
  entre spec, testes e produção por release, por gravidade; afirmações e decisões com proveniência
  completa (fonte, autor, data, justificativa); tempo para reconstruir a justificativa de uma
  decisão antiga. *Resultado operacional*: tempo para entender e implementar uma mudança de regra;
  incidentes, regressões e correções emergenciais após a liberação; retrabalho atribuído a
  divergência entre intenção e implementação — mensurável porque a política de `#divergencia`
  classifica a causa. Todos exigem definição operacional, linha de base e período de observação;
  mais documentos ou testes não provam, sozinhos, que o sistema ficou mais sustentável. As
  definições completas (recall de requisitos, ambiguidade residual por 100 requisitos, precisão e
  recall de links, métricas DORA) vão para o kit.
- **Escada de evidência:** capacidade do agente → qualidade do artefato → resultado da tarefa →
  resultado operacional → resultado de negócio. Subir um degrau exige evidência nova; o degrau de
  baixo não prova o de cima.
- **O que a literatura permite dizer hoje:** LLMs mostram capacidade parcial em tarefas
  controladas de elicitação, geração de especificação e detecção de ambiguidade, com falhas em
  terminologia de domínio, interfaces e restrições; a pesquisa é majoritariamente de laboratório;
  LLMs como revisores de requisitos tiveram resultados inconsistentes. Não foi localizado estudo
  controlado ou longitudinal do workflow completo frente a uma linha de base alinhada à
  29148/SWEBOK.
- **Como avaliar no seu contexto** (protocolo mínimo, 6 passos): (1) montar um pacote de
  referência independente — necessidades, regras, restrições, casos de fronteira — antes ou em
  paralelo à elicitação; (2) conduzir a elicitação com IA registrando a fonte e separando fato,
  inferência e proposta; (3) revisão cega por pelo menos duas pessoas do domínio; (4) medir depois
  da definição, da especificação, da implementação e da operação; (5) publicar prompts, versões de
  modelo, artefatos e decisões de adjudicação, respeitando a privacidade; (6) tratar qualquer
  melhoria como evidência local, não como validação geral do workflow. A comparação com linha de
  base humana/híbrida e as hipóteses H1–H4 ficam no kit.

**3. Visual — V9 Escada de evidência.** Cinco degraus (SVG ou `<ol>` escalonada) com o marcador
"onde está a evidência hoje": componentes estudados nos degraus 1–2, em tarefas isoladas; workflow
completo sem estudo localizado. Ao lado, painel de indicadores em duas colunas (processo ×
resultado operacional).

**4. Links.** `./formulacao-de-problemas.html#falseabilidade` — "Como refutar esta hipótese" (a
mesma postura) e `#veredito`. `./develop-engineering.html#cena-09` — "O que este artigo ainda não
prova". Secundários: `./acessibilidade.html#limites`; `./sustentacao.html` (incidentes e correções
emergenciais como indicador); `./operacao-capital-cognitivo.html` (custo total da IA, inclusive
inferência e revisão).

**Evidência.** **ISO/IEC/IEEE 15939:2017** — medição parte de uma necessidade de informação, com
linha de base. **ISO/IEC 25010:2023** — atributos de qualidade de produto. DORA — lead time, taxa
de falha de mudança, recuperação. Ronanki et al. (2023), Krishna et al. (2024), Bashir et al.
(2025), Zadenoori et al. (2025, preprint), Norheim et al. (2024), Seifert et al. (LLMs × revisores
humanos de requisitos), Montgomery et al. (2022).

### S9 · Conversão — `#comece`

80–120 palavras

**1. Título:** *Comece por um fluxo, não pelo sistema inteiro*

**2. Conceito-chave.** Repete o conselho do próprio método: escolher um fluxo representativo,
aplicar as cinco práticas, registrar a primeira divergência e decidir quem a resolve. Sem promessa
de resultado.

**3. Visual — V10.** Cartão do kit + dois botões + três cartões de continuação.
- **Kit de artefatos (Markdown)**, derivado dos materiais desta pasta: (1) matriz de autoridade
  editável; (2) modelo de registro de afirmação; (3) registro de divergência com estados e
  roteamento por tipo de conflito; (4) checklist mínimo de drift; (5) protocolo de avaliação
  resumido (hipóteses, linha de base, métricas, escada de evidência).
- Botões: primário **"Baixar o kit (.md)"** (`data-ecs-cta="kit-final"`); secundário
  **"Conversar sobre um caso"** → `https://www.linkedin.com/in/mauricioissei/` (mesmo destino de
  `apresentacao`).

**4. Links** — continuações, no máximo 3 (regra da camada editorial):

| Destino | Justificativa no cartão |
|---|---|
| `./engenharia-confianca.html` | O arcabouço de governança de onde vêm o inventário As-Is e a separação entre fato, inferência e julgamento. |
| `./apresentacao.html` | Arquitetura de IA auditável: rastreabilidade e reversibilidade como princípios verificáveis. |
| `./devin.html` | A prática de orquestrar agentes que esta proposta complementa. |

### S10 · Em síntese + FAQ — `#em-sintese` (gerado)

Entrada em `scripts/seo/pages.mjs` (tier A, `TechArticle`):

- **tldr:** *"Especificação Conversacional Estruturada é uma proposta de workflow em que a IA ajuda
  a elicitar e registrar requisitos — perguntando, comparando interpretações e sugerindo exemplos —
  enquanto pessoas com autoridade decidem. Cada afirmação tem origem e status, e divergências entre
  documentação, testes e código seguem uma política explícita. A eficácia do workflow completo
  ainda não foi avaliada."*
- **FAQ:**
  1. O que é Especificação Conversacional Estruturada?
  2. Qual a diferença para Vibe Spec-ing e para Spec-Driven Development?
  3. A IA pode aprovar requisitos ou regras de negócio? *(Não, por padrão — matriz de autoridade.)*
  4. Substitui TDD ou testes de aceitação? *(Não; atuam em níveis diferentes.)*
  5. Serve para sistemas legados? *(Sim, com testes de caracterização e o risco de
     pós-racionalização declarado.)*
  6. Há evidência de que funciona? *(Para componentes, parcial; para o workflow completo, não foi
     localizado estudo.)*
- **keywords/terms:** especificação conversacional estruturada; engenharia de requisitos com IA;
  elicitação de requisitos com LLM; vibe spec-ing; spec-driven development; matriz de autoridade;
  política de divergência; drift de especificação; testes de caracterização; TDD; modernização de
  sistemas legados.

### S11 · Referências e procedência — `#referencias`

Agrupadas por tipo de evidência, cada uma com DOI ou URL (a lista completa está nos documentos de
pesquisa desta pasta):

1. **Normas e guias** — ISO/IEC/IEEE 29148:2018; SWEBOK Guide v4.0a; NIST AI RMF 1.0; NIST AI
   600-1; ISO/IEC/IEEE 15939:2017; ISO/IEC 25010:2023; W3C PROV-DM; NASA SE Handbook.
2. **Estudos empíricos** — Ferrari et al.; Burnay et al.; Rempel & Mäder; Fucci et al.; Rafique &
   Mišić; Tosun et al.; Nagappan et al.; Ronanki et al.; Krishna et al.; Bashir et al.; Zadenoori
   et al. (preprint); Hou et al.; Norheim et al.; Montgomery et al.; Seifert et al.; Peng et al.;
   Becker et al. (preprint); Liu et al. (EvalPlus); Parasuraman & Manzey; Buçinca et al.
3. **Prática e livros** — Beck (2002); Feathers (2004); Cucumber, *Example Mapping*;
   Böckeler/Thoughtworks (2025); GitHub Spec Kit.
4. **Uso informal do rótulo** — marmelab (2025); Bechtel; McGuinness. Uso, não evidência.
5. **Páginas do autor** — rotuladas *autorais: evidência do que o autor afirma, não validação
   independente*.

Linha final: *"Procedência: síntese de documentos de pesquisa do autor (2026), conferidos contra as
fontes acima."*

## 4. Onde citar ISO, SWEBOK e NIST — e como

| Referência | Seção | Sustenta | Redação permitida | Redação proibida |
|---|---|---|---|---|
| ISO/IEC/IEEE 29148:2018 | `#causa`, `#definicao`, `#autoridade`, `#limites` | ER como processo; verificação ≠ validação; requisitos identificados e gerenciados | "compatível com as atividades descritas na 29148" | "em conformidade com a ISO 29148", "certificado" |
| SWEBOK v4.0a (Requisitos) | `#definicao`, `#limites` | baseline disciplinar e de comparação | "o SWEBOK descreve…" | "recomendado pelo SWEBOK" |
| NIST AI RMF 1.0 (*Govern*) | `#autoridade` | papéis, responsabilidades, prestação de contas | "inspirada na função Govern" | "alinhada ao NIST", "conforme o NIST" |
| NIST AI 600-1 | `#protocolo`, `#autoridade` | confabulação e configuração humano–IA como riscos | "o perfil de IA generativa do NIST trata a confabulação como risco" | "elimina alucinação" |
| W3C PROV-DM | `#protocolo`, `#divergencia` | modelo de proveniência | "oferece um modelo para registrar…" | "garante a verdade da fonte" |
| ISO/IEC/IEEE 15939 · ISO/IEC 25010 · DORA | `#limites` | medição com linha de base; qualidade; entrega | "servem de referência para definir indicadores" | "comprovam o ganho" |

Regra geral (relatório de pesquisa §2): normas e guias são **fundamento**, não experimento; nenhuma
delas valida o workflow.

## 5. Cross-links consolidados

| De | Para | Texto do link | Prioridade |
|---|---|---|---|
| `#problema` | `./engenharia-confianca.html#modulo-0` | O Crash Silencioso | principal |
| `#causa` | `./formulacao-de-problemas.html#tese` | formular antes de resolver | principal |
| `#causa` | `./proposta-engenharia-reversa.html#inventario` | inventário As-Is em legado | secundária |
| `#definicao` | `./devin.html` | Vibe Coding com Devin | principal |
| `#definicao` | `./engenharia-agentes-ia.html#governanca` | governança agent-driven | secundária |
| `#protocolo` | `./engenharia-confianca.html#modulo-1` | revelar o implícito | principal |
| `#protocolo` | `./formulacao-de-problemas.html#parada` | quando parar de investigar | secundária |
| `#autoridade` | `./engenharia-confianca.html#modulo-3` · `./devin.html#identidade` | Orquestrador Cognitivo | principal |
| `#autoridade` | `./develop-engineering.html#cena-05` | autonomia não é autoridade | principal |
| `#divergencia` | `./develop-engineering.html#cena-01` | cinco fontes de verdade | principal |
| `#divergencia` | `./apresentacao.html` | Arquitetura de IA auditável | principal |
| `#tdd` | `./case-agents.html#crash-silencioso` | a falha que 54 testes não pegaram | principal |
| `#tdd` | `./develop-engineering.html#cena-06` | passar no teste não é estar certo | principal |
| `#tdd` | `./devin.html#fluxo` | da spec ao Apex Test | secundária |
| `#limites` | `./formulacao-de-problemas.html#falseabilidade` | como refutar | principal |
| `#limites` | `./develop-engineering.html#cena-09` | o que ainda não prova | secundária |
| rodapé | `./catalogo.html` | voltar ao mapa | obrigatória (evita página órfã) |

- "Arquitetura Auditável" do brief = `apresentacao` (título publicado: *Arquitetura de IA
  auditável*). "Devin e Orquestração Cognitiva" = `devin` + `engenharia-confianca#modulo-3`.
- Convenção de href: relativa (`./slug.html#ancora`), como em `formulacao-de-problemas`.
- Todas as âncoras acima existem hoje nas páginas de destino (conferidas em 2026-10-10).
- Links de volta (outras páginas → esta) ficam para mudança separada, depois de D-5.
- `engenharia-confianca` e `apresentacao` diziam "a especificação é a fonte da verdade", tese que esta
  página não sustenta; foram alinhadas em 2026-10-10 (D-7).

## 6. Guarda de copy

`tests/especificacao-conversacional.copy.test.mjs`, no molde de
`aprendizagem-autorregulada.copy.test.mjs`, barra afirmações sem estudo que as sustente:
"método validado"; "comprovad*" aplicado ao workflow; "garante" afirmativo; "elimina (a)
alucinação"; "fonte única da verdade" afirmada; "em conformidade com" ISO ou NIST; "certificad*";
"reduz defeitos/retrabalho/custo" sem modal.

Termos a definir no primeiro uso (o público inclui produto e liderança, não só engenharia): LLM,
oráculo, teste de caracterização, TDD, drift, proveniência, rastreabilidade, spec-first e
spec-retrospectiva.

## 7. Condições de publicação do relatório (§10) → onde a página atende

| Condição | Onde |
|---|---|
| 1. Distinguir conteúdo autoral de evidência independente | `#referencias` (grupo 5 rotulado) e selos |
| 2. Formulações condicionais no lugar de "validado", "garante", "prova", "reduz" | §1.1 e guarda §6 |
| 3. Cenário marcado como sintético | selo CENÁRIO ILUSTRATIVO em `#causa`, `#protocolo`, `#divergencia`, `#tdd` |
| 4. Referências completas | `#referencias`, com DOI/URL |
| 5. Números do Case Agents tratados como benchmark de MVP, dependentes de commit | a página só linka `case-agents`; não cita seus números |
| 6. Declarar que não há definição normativa nem estudo controlado do workflow | selo do hero e `#limites` |
| 7. Governança de autoridade, proveniência, drift e divergência | `#protocolo`, `#autoridade`, `#divergencia` |
| 8. Preservar a conclusão negativa (texto fluente, aprovação, teste verde e rastreabilidade aparente não provam verdade nem resultado) | `#definicao`, `#tdd`, `#limites` |

## 8. Decisões pendentes

| ID | Decisão | Status |
|---|---|---|
| D-1 | Slug | **Decidido:** `especificacao-conversacional` |
| D-2 | Kit de artefatos (.md) como conversão principal | **Decidido:** sim. Na revisão 2 o kit ganhou a matriz de 4 colunas, as métricas com definição, o protocolo de 6 passos e H1–H4 |
| D-3 | Página-irmã com o estudo integral (mapa de evidências, protocolo completo, comparação com TDD) | pendente — recomendação: depois; landing + kit cobrem a primeira versão |
| D-4 | "A especificação como fonte da verdade" na `devin` | **Aplicado (2026-10-10):** sem nota na landing; a `devin` foi ajustada na origem (Anexo A, itens 1–14), com a spec da página atualizada antes |
| D-5 | Nó em `specs/ecosystem.nav.yaml`, pilar p2, com crosslinks | pendente — exige aprovação e bump de versão |
| D-6 | Pasta: manter `Vibe-Spec-ing/` ou renomear para o slug | pendente — recomendação: renomear na fase 2 |
| D-7 | A mesma tese em outras páginas: `engenharia-confianca` (≈ 10 ocorrências, inclusive o nível "Governado" do modelo de maturidade e o texto do quiz em `src/js/engenharia-confianca.js`), `apresentacao` (FAQ), `salesforce-agentic-dev` e `salesforce-agentic-quickstart` | **Aplicado (2026-10-10) em `engenharia-confianca` e `apresentacao`**, incluindo o diagrama "Comportamento provado = intenção cumprida" → "Critérios verificados". Ainda com a tese: `salesforce-agentic-dev`, `salesforce-agentic-quickstart` e os guias `public/referencias/guia-agent-driven-development.md` e `guia-engenharia-agentes-ia.md` (1 ocorrência cada). Usos legítimos de "fonte da verdade" para dados e configuração (SSOT) ficam como estão |

## 9. Fora desta entrega (fase 2)

`src/especificacao-conversacional.html` + CSS `.ecs-`; redação do kit em `public/downloads/` (com
a matriz de 4 colunas e as métricas do §10);
`tests/especificacao-conversacional.spec.js` (200, h1 único, âncoras das seções, link do kit
responde 200, axe sem serious/critical, 375 px sem rolagem horizontal) e a guarda de copy; entrada
em `scripts/seo/pages.mjs` + `build-aeo.mjs` + `gen-og.mjs`; entrada na camada editorial; card em
`catalogo.html`, `public/catalogo.md` e `public/llms.txt`; `npm run i18n:sync && npm run i18n:check`;
`npm run gate`.

## 10. Insumo avaliado: `análise do design thinking.md` (revisão 2)

O documento mapeia o workflow nas etapas do Design Thinking (benefício, risco e controle por etapa),
amplia a matriz de autoridade e propõe métricas e um protocolo. Quase tudo já estava nos materiais;
entrou o que é novo e útil, ficou de fora o que repete ou exagera.

| Elemento | Veredito | Onde | Por quê |
|---|---|---|---|
| Etapas do Design Thinking como mapa do workflow | adaptar | novo `#etapas` | As etapas casam uma a uma com as seções 2, 4, 6 e 7 e dão ao leitor de produto um vocabulário conhecido. Usadas como mapa, não como prova; "especificar e evoluir" é declarado como acréscimo de engenharia, porque não é etapa do Design Thinking. |
| Matriz benefício × risco × controle | incorporar, condensada | V4b | Cada ganho aparece junto do risco e do controle: é o tom anti-hype da página. |
| Triangulação (conversa ≠ observação ≠ inspeção do legado) | incorporar | `#protocolo`, prática 1 | Não estava explícita. |
| Oráculo circular (a IA escreve a spec e os testes) | incorporar | `#tdd` | O risco mais específico de agentes que o wireframe não nomeava. |
| Matriz de autoridade ampliada | incorporar 3 linhas | `#autoridade` | A linha do oráculo liga a matriz ao `#tdd`. A 4ª coluna vai para o kit. As linhas existentes seguem o artigo central, que depende menos da estrutura de cada organização. |
| Métricas de processo e de operação | incorporar 3; o resto no kit | `#limites` | "Testes independentes", "divergências por release" e "proveniência completa" são mais operáveis que os indicadores genéricos. |
| Protocolo mínimo de 6 passos | incorporar | `#limites` | Mais legível que H1–H4 numa landing; o passo 6 ("melhoria é evidência local") fecha o argumento. |
| Análise etapa por etapa (§2 do documento) | não usar como texto | — | Repete o que as seções 2, 4, 6 e 7 já dizem. |
| Rótulo "Seductive Specs" | não usar | — | Não é termo do NIST AI 600-1: o perfil trata de confabulação e de configuração humano–IA (viés de automação), sem esse rótulo. A página descreve o fenômeno em português simples. |

Correções de força para qualquer trecho do documento que for aproveitado:
- "aumentando a cobertura de tópicos em sessões controladas (Ronanki et al.)" → o estudo avaliou
  respostas estáticas a seis perguntas; dizer "capacidade parcial em tarefas controladas".
- "LLMs demonstram capacidade de classificar enunciados em sintoma, necessidade…" → sem estudo
  citado; dizer "pode ajudar a separar".
- "Meta-análises de TDD (Rafique & Mišić; Tosun et al.)" → Tosun et al. é experimento industrial,
  não meta-análise.
- "A 29148 e o SWEBOK exigem múltiplas fontes" → "descrevem".
- "alinhada aos princípios … das normas" → "compatível com" (§4).
- "ameaça modeling" → "modelagem de ameaças (threat modeling)".

## Anexo A — Ajuste de tom na `devin` (D-4) — aplicado em 2026-10-10

Objetivo: tirar o tom determinístico sobre a especificação sem mudar a voz nem a estrutura da
página. A própria `devin` já tem o contraponto na seção da orquestra ("A melhor partitura do mundo
não soa bem se for executada por quem não domina o instrumento"); o ajuste alinha `#mentoria`,
`#fluxo` e a síntese gerada a essa ideia.

Pela regra de SDD do repositório, a spec da `devin` muda antes do HTML:
`docs/specs/pages/devin/03_spec_site_devin_vibe_coding.md` (l. 802, 815–816) e
`micro-sdd-07-hands-on-mentoria.md` (l. 108).

### A.1 Núcleo: a especificação como verdade, comportamento idêntico e testes que "provam"

| # | Onde | Hoje | Proposta |
|---|---|---|---|
| 1 | `src/devin.html` `#mentoria`, H2 | "Spec-Driven Development: a especificação como fonte da verdade." | "Spec-Driven Development: a especificação como âncora da intenção." |
| 2 | idem, cartão "EFEITO" | "EFEITO — Reprodutibilidade: A mesma spec gera o mesmo comportamento em qualquer sessão, com qualquer membro do time. Bugs encontrados na execução revelam falhas na spec — não no agente." | "EFEITO — Menos variação: a mesma spec aproxima o comportamento entre sessões e entre pessoas do time, sem torná-lo idêntico — o agente não é determinístico. Quando um bug aparece, a falha pode estar na spec, no teste ou no código; quem tem autoridade sobre a regra decide o que corrigir." |
| 3 | idem, "Com SDD — Spec Versionada" | "A tarefa é reproduzível, auditável e revisável pela equipe inteira." | "A tarefa fica registrada, auditável e revisável pela equipe inteira." |
| 4 | `#fluxo`, subtítulo | "Devin lê a spec. Devin executa o Salesforce CLI. Devin valida. Você revisa." | "Devin lê a spec. Devin executa o Salesforce CLI. Devin roda os testes. Você revisa e decide." |
| 5 | `#fluxo`, passo 03 | "Cada modificação é guiada pelos critérios de aceite — não por interpretação livre." | "Cada modificação é guiada pelos critérios de aceite, o que reduz — sem eliminar — a interpretação livre." |
| 6 | `scripts/seo/pages.mjs` (devin), `tldr.points[0]` | "a especificação versionada é a fonte da verdade; a IA implementa contra ela." | "a especificação versionada é a referência da intenção: a IA implementa contra ela, e divergências entre spec, testes e código são decididas por pessoas." |
| 7 | idem, `tldr.points[1]` | "cenários Dado/Quando/Então provam que a intenção foi cumprida." | "cenários Dado/Quando/Então verificam os comportamentos escolhidos; não provam, sozinhos, que a intenção foi cumprida." |
| 8 | idem, FAQ "O que é SDD?" | "No SDD a especificação é a fonte da verdade: … com testes (BDD) como alvo objetivo. … ela escala e é auditável." | "No SDD a especificação versionada é a referência da intenção: escreve-se o quê e o porquê, e a IA implementa contra a spec, com testes (BDD) para verificar. A spec não é infalível: quando spec, testes e código divergem, uma pessoa com autoridade decide o que corrigir. Quando a intenção vive num prompt descartável, ela se perde; numa spec versionada no repositório, pode ser revisada e auditada." |
| 9 | idem, `terms` › `sdd` | "A especificação como fonte da verdade; a IA implementa contra a spec, com testes como alvo." | "A especificação versionada como referência da intenção; a IA implementa contra ela e os testes verificam os comportamentos escolhidos." |
| 10 | idem, `mdSections` | "Validado no estudo de caso Devin + Salesforce, … Validar (Apex Tests que provam a intenção)." | "No estudo de caso Devin + Salesforce, relatado pelo autor, … Validar (Apex Tests que verificam os critérios de aceite)." |

### A.2 Afirmações de resultado (recomendado, mesmo tom)

| # | Onde | Hoje | Proposta |
|---|---|---|---|
| 11 | `#mentoria`, "Lição universalizável" | "… Vale para qualquer ferramenta, qualquer linguagem, qualquer contexto." | Rótulo "Lição que se transfere"; "Vale para a maioria das ferramentas e linguagens." |
| 12 | seção de comunicação (l. ~922) | "A IA vai interpretar exatamente o que você escreveu — não o que você quis dizer." · "…para eliminar interpretações incorretas." | "A IA trabalha a partir do que você escreveu e preenche o resto por inferência, que pode estar errada." · "…para reduzir interpretações incorretas." |
| 13 | exemplo de iteração (l. ~1966) | "Resultado: PR de qualidade comprovada, sem surpresas no merge." | "Resultado: PR revisado e testado, com menos surpresas no merge." |
| 14 | `pages.mjs`, `tldr.lede` | "…um chef executivo que garante que cada prato saia certo sem cozinhar todos." | "…um chef executivo que responde por cada prato sem cozinhar todos." |

### A.3 Fica como está

A metáfora da partitura (a seção da orquestra já diz que ela não toca sozinha); as metáforas da
cozinha e da orquestra ("garante que o prato tenha alma", "milissegundo exato"); a "Vitrine
determinística" do A2UI (propriedade de um renderizador, não da spec); "iteração até 100% migrado"
(meta de processo); "fix validado" (resultado esperado dentro de um modelo de prompt).

### A.4 Aplicação, depois de aprovada

Spec da `devin` → `src/devin.html` → entrada `devin` em `scripts/seo/pages.mjs` (+ `dateModified`)
→ `build-aeo.mjs` só para `devin` (regera head, síntese, FAQ e `public/devin.md`) →
`npm run i18n:sync && npm run i18n:check` (gêmeo `/en/`) → `npm run gate`.

Nota para quem versionar esta pasta: o contador de specs do hero da `apresentacao`
(`scripts/gen-hero-counter.mjs`) conta todos os `.md` de `docs/specs/`. Ao commitar
`docs/specs/pages/Vibe-Spec-ing/`, rode `node scripts/gen-hero-counter.mjs` no mesmo commit; antes
disso, o `--check` local acusa diferença por causa dos arquivos não versionados.
