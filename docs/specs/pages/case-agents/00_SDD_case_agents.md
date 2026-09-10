# SDD — `case-agents`: Roteamento de Queries e Seleção Segura de Tools

> **O que é isto.** Especificação Spec-Driven de uma nova página do site que documenta, de ponta
> a ponta, um projeto real de engenharia: o **cérebro de roteamento de um agente bancário** —
> decidir se uma mensagem precisa de LLM, escolher 2 ferramentas entre 285, e **bloquear a
> execução quando a decisão não é confiável o bastante**.
>
> O entregável deste documento é **a especificação**, não a página. Conforme
> [`AGENTS.md`](../../../../AGENTS.md) §"Spec-Driven Development", a spec precede o código.
>
> **Repositório-fonte:** <https://github.com/issei/case-agents>
> **Pilar do ecossistema:** P2 · Engenharia de Confiança (*O Método*) — ver §11.

---

## Sumário

| § | Conteúdo |
| :--- | :--- |
| [1](#1-informações-básicas) | Informações básicas (SEO, URL, arquivo) |
| [2](#2-tese-editorial) | Tese editorial e por que esta página existe |
| [3](#3-o-projeto-o-que-foi-pedido) | O projeto: o que foi pedido |
| [4](#4-a-solução-final-arquitetura) | A solução final — arquitetura em 4 camadas |
| [5](#5-a-barreira-pré-execução) | A barreira pré-execução (o núcleo do argumento) |
| [6](#6-o-crash-silencioso-medido) | O Crash Silencioso medido — a falha que 54 testes não pegaram |
| [7](#7-como-foi-desenvolvido-o-método-agêntico) | Como foi desenvolvido — o método agêntico |
| [8](#8-métricas-e-evidência) | Métricas e evidência |
| [9](#9-referências-conceituais-mauricioisseicombr) | Referências conceituais (mauricio.issei.com.br) |
| [10](#10-vídeos-do-canal-sinergia-verificada) | Vídeos do canal — sinergia verificada |
| [11](#11-especificação-da-página) | Especificação da página (estrutura, wireframe, design) |
| [12](#12-seo-a11y-i18n-e-testes) | SEO, a11y, i18n e testes |
| [13](#13-governança-do-ecossistema) | Governança do ecossistema |
| [14](#14-riscos-limitações-e-decisões-abertas) | Riscos, limitações e decisões abertas |

---

## 1. Informações básicas

Conforme [`docs/specs/PAGE_SPEC_TEMPLATE.md`](../../PAGE_SPEC_TEMPLATE.md) §1.

| Campo | Valor |
| :--- | :--- |
| **Nome do arquivo** | `src/case-agents.html` |
| **URL final** | `mauricio.issei.com.br/case-agents` |
| **Gêmeo i18n** | `src/en/case-agents.html` (**gerado** — ver §12.3) |
| **Título (SEO)** | `Case Agents: a tool errada não é uma aproximação aceitável \| Maurício Yokoyama Issei` |
| **H1 editorial** | `A tool errada não é uma aproximação aceitável` |
| **Meta description** | `Roteamento de queries e seleção de tools num agente bancário: uma barreira pré-execução de quatro camadas levou 7 execuções incorretas a zero.` (142 caracteres) |
| **Pilar** | P2 · Engenharia de Confiança |
| **Blurb de menu** (≤ 60 car.) | `Quando o agente não deve executar.` (33 caracteres) |
| **CSS dedicado** | `src/case-agents.css` (padrão das páginas densas — ver §11.6) |
| **Teste** | `tests/case-agents.spec.js` |

---

## 2. Tese editorial

O site já define o inimigo. Em
[`engenharia-confianca/README.md`](../engenharia-confianca/README.md):

> **Inimigo 1 — o Crash Silencioso:** a falha que não gera erro de código, mas destrói valor
> (uma regra de negócio perdida, **uma decisão tomada com falsa confiança**).

Esta página existe porque o projeto `case-agents` produziu **uma instância medida desse
inimigo**, em domínio bancário, e a corrigiu com evidência executável. Não é uma alegoria: é um
sistema com 72 testes onde, numa das iterações, uma pergunta do cliente resolvia para uma
**alteração de cadastro** com margem de confiança folgada — passando por três guardas de
segurança e uma suíte inteira no verde.

A frase-espinha do pilar P2 — *"a capacidade vem do modelo; a confiança vem da engenharia"* —
ganha aqui a sua forma mais literal e verificável:

> **A capacidade é escolher a ferramenta certa. A confiança é saber quando não executar
> nenhuma.**

### Os três argumentos que a página precisa provar

1. **Recuperar melhor não é recuperar mais.** O ganho de 35% → 100% no Hit Rate@2 não veio de um
   modelo maior, veio de **declarar a governança do catálogo**.
2. **Economia sem taxa de sucesso é risco disfarçado de eficiência.** Uma iteração intermediária
   mostrou 87,8% de economia com 20% de execuções corretas. A economia caiu para 77,8% — e isso
   foi a correção, não a regressão.
3. **Guardas estatísticas não pegam erro confiante.** A margem entre candidatos cobre empates.
   Não cobre a decisão errada e segura de si. Para essa, é preciso **restrição semântica
   declarada**.

---

## 3. O projeto: o que foi pedido

Case técnico: construir o *cérebro de roteamento* de um agente de atendimento de um banco digital
fictício. Antes de qualquer chamada a LLM caro, o sistema decide o caminho mais barato para
responder cada mensagem.

### Os três pilares do enunciado

| Pilar | Problema | Arquivo no repositório |
| :--- | :--- | :--- |
| **1 · Router** | Classificar a query em `FAST_PATH` (saudação/FAQ, resposta local) ou `AGENT` (precisa de tool + raciocínio) | [`candidate_starter/router.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/router.py) |
| **2 · Tool Retrieval** | Selecionar as **2 ferramentas mais relevantes entre 285** antes de montar o prompt | [`candidate_starter/retrieval.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/retrieval.py) |
| **3 · Evaluation Harness** | Medir qualidade, custo, latência e segurança de forma determinística | [`candidate_starter/harness.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/harness.py) |

### Os dados

| Artefato | Conteúdo |
| :--- | :--- |
| [`data/tools_registry.json`](https://github.com/issei/case-agents/blob/main/data/tools_registry.json) | 285 ferramentas (`name`, `description`, `category`) |
| [`data/eval_dataset.json`](https://github.com/issei/case-agents/blob/main/data/eval_dataset.json) | 30 queries rotuladas — 20 transacionais, 10 `FAST_PATH` |
| Treino do router | 53 exemplos rotulados |

### A restrição inegociável do domínio

Registrada no enunciado e preservada como invariante de projeto:

> *"Este é um domínio bancário. Uma tool incorreta não é uma aproximação aceitável.
> Nunca execute uma tool se a decisão estiver abaixo dos limiares de segurança.
> Nunca remova os quality gates apenas para aumentar recall ou economia.
> Nunca trate economia de custo como sucesso quando houver execução incorreta.
> **Não use `expected_tool` do dataset dentro da lógica de produção.** Esse campo só pode ser
> usado pelo harness para avaliar offline."*

Essa última linha é a fronteira que separa engenharia de ajuste ao gabarito, e a página deve
torná-la visível — ver §11.4, bloco "A Fronteira".

---

## 4. A solução final: arquitetura

Quatro camadas. As três primeiras produzem uma decisão; a quarta decide se a decisão pode virar
ação.

```
Query do usuário
   │
   ├─ [1] ROUTER ─────────── FAST_PATH → resposta local, custo zero de LLM
   │      TF-IDF + LogisticRegression + Platt scaling
   │      ↓ AGENT
   ├─ [2] TAXONOMIA ──────── governança do catálogo: capacidade ≠ endpoint
   │      14 capacidades canônicas · 45 variantes · direção read/write
   │      ↓
   ├─ [3] RETRIEVER ──────── recuperação multi-campo + colapso por capacidade
   │      score = 0.5·lexical + 0.5·intent   (padrão BM25F)
   │      ↓ top-k capacidades DISTINTAS
   └─ [4] BARREIRA ───────── 4 guardas pré-execução  →  executa OU desvia
          confiança · score · margem · direção
```

### 4.1 Router — calibrar, não afrouxar

[`router.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/router.py)

`TfidfVectorizer(ngram_range=(1,2))` + `LogisticRegression`, envolvidos em
`CalibratedClassifierCV(method="sigmoid")`.

**O defeito diagnosticado:** o router acertava **30/30** e mesmo assim **9 das 20** queries
transacionais caíam abaixo do limiar de confiança de 0.75. Um limiar que rejeita 45% das decisões
corretas e nenhuma incorreta não compra segurança — destrói cobertura. A causa é subconfiança por
regularização L2 sobre 53 exemplos.

**A correção que foi rejeitada:** elevar `C` até as probabilidades "passarem". Isso é mover a
trave — o modelo não fica mais confiável, só mais confiante.

**A correção adotada:** Platt scaling sobre predições *out-of-fold*, e **restauração de `C=1.0`**
(o padrão). A calibração isotônica foi medida e rejeitada: não paramétrica, sobreajusta com 53
amostras e satura a confiança, o que faz a abstenção nunca disparar.

> Decisão registrada em
> [`docs/adr/0007`](https://github.com/issei/case-agents/blob/main/docs/adr/0007-calibracao-de-probabilidade-e-guarda-de-margem.md).

### 4.2 Taxonomia — o catálogo é o problema, não a vetorização

[`taxonomy.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/taxonomy.py)

O diagnóstico que mudou tudo: **o catálogo contém duplicatas semânticas**. Oito ferramentas
realizam "obter a fatura atual"; seis abrem chamado para app travando:

```
consultar_fatura                  → "Gera o PDF ou linha digitável da fatura do mês atual."
gerar_linha_digitavel_fatura      → "Gera a linha digitável da fatura ... para pagamentos."
enviar_pdf_fatura_atual           → "Envia o PDF da fatura atual ... para o cliente."
consultar_valor_fatura_mes_atual  → "Consulta o valor da fatura ... do mês atual."
```

Esse é o estado normal de um registry que cresceu por squad ao longo de anos. Para um retriever
lexical, a variante hiperespecífica **sempre** vence a canônica — o nome dela repete literalmente
as palavras da query. Não é falha de vetorização; é **ausência de governança de catálogo**.

O módulo declara o contrato:

```
intenção canônica → aliases (glossário do usuário) → variantes operacionais + direção
```

**Estado atual:** 14 capacidades canônicas, 45 variantes, cada uma com `mode: read | write`.

### 4.3 Retriever — dois campos, não um documento inchado

[`retrieval.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/retrieval.py)

```
score = (1 − α)·lexical + α·intent        α = 0.5
```

- `lexical` — cosseno entre a query e `name + description + category` da ferramenta.
- `intent` — cosseno entre a query e o **glossário da capacidade**, indexado como
  **campo separado**.

**Por que campo separado e não concatenação.** A tentativa anterior anexava o bloco de aliases ao
documento da ferramenta e travou em 35% de Hit Rate@2. A razão é mecânica: o TF-IDF normaliza por
**norma L2**, então acrescentar 15 sinônimos ao documento **reduz** o peso relativo dos termos
originais. Enriquecer diluiu.

**Colapso por capacidade.** As variantes colapsam na canônica pelo **maior score do grupo**, e o
membro que casou é preservado em `ToolMatch.matched_variant` como trilha de auditoria.
Consequência de contrato: `search(q, k=2)` devolve **2 capacidades distintas**, não 2 duplicatas
da mesma — em `k` pequeno isso é estritamente mais informativo.

> `matched_variant` é o **endpoint executável**; `name` é a **intenção**. Um runtime real chama o
> primeiro. A distinção está documentada no contrato em
> [`common/interfaces.py`](https://github.com/issei/case-agents/blob/main/common/interfaces.py).

**Duas correções de tokenização que apareceram ao medir, não ao ler o código — e ambas eram de
segurança:**

| Achado | Medição | Correção |
| :--- | :--- | :--- |
| Query sem sentido atravessava a abstenção | *"qual a capital da mongolia interior"* pontuava **0.132** contra `gerar_linha_digitavel_fatura` (*"Gera **a** linha digitável **da** fatura"*), acima do limiar de 0.10, apoiada só em `"a"` e `"da"` | `PT_STOPWORDS` no vetorizador |
| Query perdia a palavra inteira | `normalize()` converte `"e-mail"` em `"e mail"`; o `"e"` cai como conjunção e `atualizar_email` zerava lexicalmente | `prepare_text()` + dobra de variante ortográfica |

**Invariante preservada:**
[`common/normalization.py`](https://github.com/issei/case-agents/blob/main/common/normalization.py)
**não foi alterada** — é contrato fixo da especificação. As duas correções vivem no retriever e
são aplicadas **identicamente a índice e query**.

### 4.4 Harness — o que o relatório é obrigado a dizer

[`harness.py`](https://github.com/issei/case-agents/blob/main/candidate_starter/harness.py)

Métricas determinísticas e um **Quality Gate tri-estado**:

| Estado | Quando |
| :--- | :--- |
| `APROVADO NO BENCHMARK DO MVP` | Zero execuções incorretas **e** taxa de sucesso ≥ 80% |
| `REPROVADO` | Qualquer critério violado |
| `INDETERMINADO` | O benchmark não continha query transacional alguma |

O terceiro estado é a regra que importa: **ausência de evidência não é evidência de segurança**.
Um benchmark que não exercitou nenhuma execução de ferramenta nunca aprova um pipeline bancário.

**Duas perguntas diferentes, dois campos diferentes:**

- `production_approved` → *este pipeline passou neste benchmark?*
- `production_readiness` → *isso autoriza operação bancária real?* O teto é
  `MVP_BENCHMARK_ONLY`. **Nunca** "pronto para produção".

Há um teste que falha se alguém ampliar o rótulo sem ampliar a evidência.

---

## 5. A barreira pré-execução

O núcleo do argumento da página. Quatro guardas, aplicados **em ordem**, todos usando apenas
sinais disponíveis em runtime.

| # | Guarda | Sinal | Falha → |
| :--- | :--- | :--- | :--- |
| **1** | Confiança do router < 0.75 | `RouteResult.confidence` | `HUMAN_FALLBACK_LOW_CONFIDENCE` — **o retriever nem é chamado** |
| **2** | Nenhum candidato ≥ `min_score` 0.10 | score do retriever | `ABSTAIN_LOW_SCORE` |
| **3** | Margem relativa `(s₁−s₂)/s₁` < 0.25 | distância entre candidatos | `AMBIGUOUS_CONFIRMATION` |
| **4** | Direção da query ≠ direção da capacidade | verbo da query + `mode` declarado | descarte (leitura→escrita) ou rebaixamento |

### 5.1 Por que a margem é relativa

Um top-1 que vence o top-2 por uma fração do próprio score não é uma decisão — é um empate. O
valor é **relativo**, não absoluto, para não depender da escala do score. E é **parâmetro** de
`run_harness`, não constante escondida: política de risco precisa ser recalibrável e testável. O
relatório registra, em `thresholds`, sob qual política cada decisão foi tomada.

### 5.2 A assimetria deliberada da guarda 4

- Query de **leitura** + capacidade de **escrita** → **descarte total**.
- Query de **escrita** + capacidade de **leitura** → **rebaixamento**, não descarte.

Alterar o cadastro de quem apenas perguntou é **dano irreversível ao cliente**. Consultar para
quem pediu alteração é **tarefa não cumprida** — recuperável com uma segunda mensagem. As duas
falhas não merecem o mesmo tratamento.

> Essa assimetria é a aplicação direta do **Espectro de Autonomia** documentado no site — custo do
> erro × reversibilidade. Ver §9.2.

### 5.3 Os testes de ausência de efeito

A parte mais valiosa da suíte não verifica um valor retornado; verifica que **nada aconteceu**:

```python
with mock.patch("candidate_starter.harness.mock_tool_execution") as executed:
    report = run_harness(router, retriever, [], ONE_QUERY, k=k)
executed.assert_not_called()
```

É o que separa *"recuperou mal"* de *"executou a operação errada na conta do cliente"*.

---

## 6. O Crash Silencioso medido

**Esta é a seção narrativa central da página.** É a história que dá ao conceito abstrato do site
um corpo verificável.

### 6.1 O estado aparentemente bom

Numa iteração intermediária (commit `c8f30d2`), o projeto exibia: 54 testes no verde, router
100%, Hit Rate@2 de 100%, **zero execuções incorretas**, status aprovado. Uma reavaliação externa
o classificou como *"aprovado com mérito como solução de MVP avaliável"*.

Essa mesma reavaliação anotou um risco teórico:

> *"A margem relativa de 0,25 é uma boa barreira contra empates. Ela não garante que top-1 esteja
> correto quando top-2 estiver distante. **Uma ferramenta errada pode vencer com grande margem.**"*

E pediu um teste de colisão entre vocabulário de leitura e de escrita.

### 6.2 O teste falhou na primeira execução

```
Query : "Qual e o email cadastrado na minha conta?"        (uma LEITURA)
Top-2 : atualizar_email (0.4795)  |  confirmar_email_cadastrado (0.2554)
Margem: 0.47  >>  0.25  →  EXECUTA a escrita
```

**O cliente pergunta qual e-mail está no cadastro; o agente altera o cadastro.**

Nenhuma das três guardas pega: confiança alta, score alto, margem folgada. O erro **não é um
empate** — é uma decisão confiante e errada. Não gerou exceção, não quebrou teste, não apareceu
em métrica alguma. É a definição literal de Crash Silencioso.

### 6.3 Duas causas, ambas estruturais

**Causa 1 — campo ausente estava sendo lido como irrelevância.**
Com `score = 0.5·lexical + 0.5·intent`, uma ferramenta fora da taxonomia recebia `intent = 0` — e
tinha o score **cortado pela metade**. `consultar_email_vinculado_conta` perdia **por não ter
vocabulário declarado**, não por ser menos relevante. Em recuperação multi-campo isso é erro
conhecido: campo ausente é *dado faltante*, não evidência negativa.

**A correção óbvia foi medida e rejeitada.** Renormalizar globalmente:

| | Sucesso | Incorretas | Ambíguas | Paráfrases @2 |
| :--- | ---: | ---: | ---: | ---: |
| Antes | 95% | 0 | 1 | 11/12 |
| Com renormalização global | **65%** | **1** | 6 | 10/12 |

A penalidade de 50% estava, **por acidente**, suprimindo as duplicatas semânticas não declaradas
do catálogo. Removê-la reabria o problema original. Rejeitada por medição, não por opinião.

**Causa 2 — nenhum peso resolve o resto.**

```
"Quero mudar o e-mail vinculado a minha conta"          (uma ESCRITA)

consultar_email_vinculado_conta   lexical = 0.8457   intent = 0.44
atualizar_email                   lexical = 0.1983   intent = 0.32
```

O **nome** da ferramenta de leitura reproduz literalmente o objeto do pedido. Para a escrita
vencer por ajuste de α, seria preciso `intent_escrita − intent_leitura > 0.647` — impossível,
porque ambos os cossenos vivem em [0,1] e as duas capacidades são legitimamente sobre e-mail.

A palavra que separa consulta de alteração é **uma só: o verbo**. Num saco de palavras com
bigramas, esse verbo é um token entre dez.

> **Conclusão estrutural:** leitura e escrita sobre o mesmo dado compartilham todos os
> substantivos. A direção **não é recuperável por similaridade textual** — precisa ser um sinal
> **declarado**.

### 6.4 A correção

`mode: read | write` por capacidade, e dois léxicos de domínio (`WRITE_VERBS`, `READ_MARKERS`) que
derivam a direção do pedido a partir do verbo da query.

Escopo deliberado dos léxicos: **"enviar"**, **"mandar"**, **"receber"** e **"gerar"** ficam
**fora** de `WRITE_VERBS` — pedir que a fatura seja enviada não altera dado do cliente.
Classificá-los como escrita rebaixaria `consultar_fatura` em *"me manda o boleto"*. Também fora:
**"quero"** e **"preciso"**, que só introduzem o pedido.

Os glossários dos pares leitura/escrita foram reescritos como **verb-forward**: o substantivo é do
domínio e é compartilhado; **só o verbo pertence à capacidade**. Uma iteração intermediária
colocou as locuções compartilhadas no glossário de leitura e produziu o **erro espelhado** — a
query de escrita passou a resolver a leitura com margem 0.60.

> Decisão, medições e alternativas rejeitadas em
> [`docs/adr/0008`](https://github.com/issei/case-agents/blob/main/docs/adr/0008-guarda-de-direcao-leitura-escrita.md).

### 6.5 A lição transferível

**Uma guarda estatística não protege contra erro confiante.** Ela cobre empates. Um top-1 errado
que vence por larga margem passa por ela intacto — e é o modo de falha mais perigoso, porque
*parece uma decisão*. Guardas estatísticas precisam ser complementadas por **restrições semânticas
declaradas**: direção da operação, autorização, validação de parâmetros.

E a lição de processo: **escreva o teste que você tem medo de rodar.** Esse teste foi escrito
porque um revisor externo pediu, e falhou na primeira execução sobre o catálogo real, expondo uma
falha que 3 guardas e 54 testes não pegavam. **Métricas verdes não são cobertura.**

---

## 7. Como foi desenvolvido: o método agêntico

A página precisa mostrar **o processo**, não só o resultado — é o que a diferencia de um
*case study* comum e o que a ancora no pilar P2.

### 7.1 O ciclo real

```
Enunciado → implementação → REVISÃO EXTERNA → diagnóstico medido → correção → REVISÃO EXTERNA → …
```

O projeto passou por **duas rodadas completas de revisão adversarial** documentadas, cada uma
produzindo um commit de correção — e uma terceira volta, sem revisor externo, que só apareceu
porque o estado estacionário foi testado em vez de aceito no verde. Não é desenvolvimento
linear: é **crítica incorporada ao loop**.

| Rodada | Entrada | Achado principal | Saída |
| :--- | :--- | :--- | :--- |
| 1 | Crítica do commit `fc830dc` | Hit Rate@2 de 35%, 7 execuções incorretas, economia inflada por abstenção | ADR-006, ADR-007 · 35 → 54 testes |
| 2 | Reavaliação do commit `c8f30d2` | 8 riscos remanescentes + 8 testes recomendados; um deles expôs o Crash Silencioso | ADR-008 · 54 → 71 testes |
| 3 | Teste do estado estacionário (regenerar o relatório e rodar a suíte de novo), commits `0d2c9ae`…`1f780c0` | O teste de procedência estava com `71 passed, 1 skipped` — o *skip* era o próprio teste desistindo em silêncio (asserção insatisfazível, `git_dirty` auto-sujando, `_git().strip()` comendo o prefixo do `--porcelain`) | 71 → **72 passed, 0 skipped** |

### 7.2 Os princípios que governaram as decisões

**Medir antes de editar.** Toda decisão arquitetural do projeto tem uma medição anterior a ela. A
renormalização global (§6.3) foi implementada, medida, e revertida **com a tabela de números na
ADR**. Nenhuma alternativa foi rejeitada por opinião.

**Diagnóstico de causa-raiz, não de sintoma.** O "35% de Hit Rate" era o sintoma. As causas eram
duas e independentes: duplicação semântica no catálogo *e* ponto de operação mal especificado no
router. Tratar como um problema só teria produzido meia correção.

**Nunca mover a trave.** Três correções foram explicitamente rejeitadas por serem ajuste ao
resultado em vez de conserto da causa:
- elevar `C` até as probabilidades passarem do limiar;
- usar α = 0.6 (que dava 20/20 no top-1) para desempatar um caso genuinamente ambíguo por 0.005;
- elevar `MIN_RELATIVE_MARGIN` até capturar o erro de direção — o que mascararia o problema em
  vez de resolvê-lo, transformando uma escrita indevida em confirmação e deixando o sistema sem
  saber que o cliente havia feito uma pergunta.

**A fronteira produção × avaliação como invariante.** `expected_tool` nunca entra na lógica de
decisão. As quatro guardas usam só confiança, score, margem e verbo da query. Verificável:

```bash
grep -n "expected_tool" candidate_starter/retrieval.py candidate_starter/router.py \
                        candidate_starter/taxonomy.py
# nenhum resultado
```

**Evidência contra ajuste ao gabarito.** 12 paráfrases escritas com vocabulário **ausente** do
dataset oficial. Medido: **9/12 no top-1, 11/12 no top-2** — e o número **não mudou** depois da
guarda de direção, que é a prova de que ela não foi ajustada ao benchmark.

**YAGNI e o diff mais curto que resolve.** O projeto seguiu disciplina anti-bloat: nenhuma
abstração sem segundo caso de uso, nenhum parâmetro de configuração para valor que nunca muda.
As simplificações deliberadas com teto conhecido estão marcadas no código.

### 7.3 Os artefatos de governança produzidos

| Artefato | Papel |
| :--- | :--- |
| [`docs/adr/`](https://github.com/issei/case-agents/tree/main/docs/adr) | 8 ADRs — cada decisão com contexto, medição, consequências e **alternativas rejeitadas** |
| [`TODO.md`](https://github.com/issei/case-agents/blob/main/TODO.md) | Rastreamento por iteração, com origem de cada item |
| [`docs/knowledge/`](https://github.com/issei/case-agents/tree/main/docs/knowledge) | Base de conhecimento OKF — anti-padrões medidos, para não repetir o erro |
| [`reports/candidate_report.json`](https://github.com/issei/case-agents/blob/main/reports/candidate_report.json) | Relatório com bloco `snapshot`: commit, `git_dirty`, timestamp, seed, versões |
| [`specification/`](https://github.com/issei/case-agents/tree/main/specification) | Contrato congelado do enunciado |

**Sobre o `snapshot`:** um JSON de métricas versionado tem um modo de falha próprio — envelhecer
em silêncio. O código muda, o arquivo continua lá, e quem lê acredita em números que o commit
atual não produz mais. Há um teste que **recomputa as decisões** contra o código atual e falha se
divergirem.

**A saga da procedência (commits `0d2c9ae`…`1f780c0`).** O próprio teste de procedência teve
três defeitos da mesma família — o relatório contaminando a medição que deveria auditá-lo:

1. **Asserção insatisfazível.** Exigia `snapshot.git_commit == HEAD`. Como commitar o relatório
   cria um commit novo, o snapshot sempre aponta para o anterior; a asserção nunca poderia passar.
   Corrigida para a propriedade auditável: *entre o commit que gerou o relatório e o HEAD, nada
   fora de `reports/` mudou* — e a falha passa a **nomear os arquivos** atrasados.
2. **`git_dirty` se auto-sujava.** `build_snapshot()` contava `reports/` na verificação de árvore
   suja; como o relatório é escrito pela própria função, da segunda execução em diante ele se
   declarava irreprodutível por causa do arquivo que acabara de gerar.
3. **`_git().strip()` comia o espaço do prefixo de status.** O filtro fatiava `line[3:]` do
   `--porcelain`, mas o `.strip()` na saída remove o espaço inicial da primeira linha: o caminho
   saía deslocado (`eports/...`), o filtro nunca casava e o teste **voltava a pular em silêncio**.
   Resolvido delegando o filtro ao git (`pathspec ':(exclude)reports'`), sem parsing.

`71 passed, 1 skipped` parecia saudável e não era: o *skip* era um teste desistindo em silêncio,
só exposto porque o estado estacionário foi testado. É a **terceira instância** da tese da página
— *métricas verdes não são cobertura*. Hoje a suíte é **72 passed, 0 skipped**.

### 7.4 A suíte como especificação executável

72 testes em 8 arquivos. As categorias que importam:

| Categoria | O que prova |
| :--- | :--- |
| **Ausência de efeito** | `mock_tool_execution` nunca é chamada com qualquer guarda reprovando |
| **Integridade da taxonomia** | 7 invariantes de autoria: existência no catálogo, ausência de colisão, leitura ≠ escrita, direção declarada e herdada |
| **Direção** | Nenhuma query de consulta recupera capacidade que altera estado |
| **Generalização** | 12 paráfrases fora do dataset — detector de ajuste ao gabarito |
| **Estabilidade** | Embaralhar a ordem do catálogo não muda decisão alguma |
| **Distribuição de confiança** | A confiança não está nem saturada em 1.0 nem achatada — sem dispersão, o limiar é decorativo |
| **Economia líquida** | O ponto de equilíbrio do custo humano é derivado, e a economia fica negativa acima dele |
| **Procedência** | O relatório versionado corresponde ao commit e ao código atuais — e a checagem não pode pular: o *skip* silencioso foi o defeito da rodada 3 |

---

## 8. Métricas e evidência

Saída de `python -m candidate_starter.run_case`. Números medidos, não estimados.

### 8.1 Estado final

| Métrica | Valor |
| :--- | ---: |
| Acurácia do router | **100%** (30/30) |
| Hit Rate@1 do retriever | **100%** |
| Hit Rate@2 do retriever | **100%** |
| Taxa de execução correta | **100%** (20/20) |
| **Execuções incorretas** | **0** |
| Abstenções | 0 |
| Economia de custo | **77,8%** (US$ 0,20 vs US$ 0,90) |
| Redução de latência | ~90–94% (varia: mocks usam `sleep` aleatório) |
| Testes | **72** (0 skips) |
| Status | `APROVADO NO BENCHMARK DO MVP` · `MVP_BENCHMARK_ONLY` |

### 8.2 A evolução — e por que a economia caiu duas vezes

| Métrica | `fc830dc` | `c8f30d2` | Atual (`1f780c0`) |
| :--- | ---: | ---: | ---: |
| Testes | 35 | 54 | **72** |
| Hit Rate@2 | 35% | 100% | **100%** |
| Execução correta top-1 | 20% (4/20) | 95% (19/20) | **100%** (20/20) |
| **Execuções incorretas** | **7** | **0** | **0** |
| **Leitura resolvendo escrita** | não medido | **sim (margem 0.47)** | **impossível** |
| Fallback por baixa confiança | 9 | 0 | **0** |
| Economia de custo | 87,8% | 78,9% | **77,8%** |
| Status | REPROVADO | APROVADO | **APROVADO NO BENCHMARK** |

> **As duas quedas de economia são as correções, não regressões.** Os 87,8% de `fc830dc` vinham de
> **9 abstenções indevidas com 20% de sucesso** — cada abstenção evitava uma chamada de LLM e
> inflava o número. Hoje o pipeline resolve 20 de 20 e paga LLM por todas: 77,8% é o que custa
> cobrir tudo.
>
> **Economia de custo só é comparável entre configurações com a mesma taxa de abstenção.** Por
> isso o relatório publica `cost_savings_pct_on_resolved`, `deferred_to_human` e o
> `human_fallback_breakeven_cost_usd` lado a lado — este último **derivado das medições**, sem
> depender de estimar quanto custa um atendente.

### 8.3 Onde os limiares realmente estão

Dado que a página fala de segurança, ela deve mostrar a folga real:

- **Margens das decisões corretas:** 0.592 – 0.741 (limiar: 0.25).
- **Folga de calibração do router:** a query `AGENT` menos confiante marca **0.7674** contra um
  limiar de 0.75 — **0.017 de folga**. É pequena, e está registrada como risco.

---

## 9. Referências conceituais (mauricio.issei.com.br)

Todos os vínculos abaixo são **substantivos**, não decorativos: cada um nomeia um conceito já
publicado no site do qual o `case-agents` é instância medida.

### 9.1 [A Engenharia da Confiança](https://mauricio.issei.com.br/engenharia-confianca) — P2

**Vínculo primário.** O README do `case-agents` declara-se explicitamente *"Baseada no Intentional
Systems Model (ISM v1.0)"*. O mapeamento dos quatro módulos:

| Módulo ISM | Instância no `case-agents` |
| :--- | :--- |
| **M0 · Crash Silencioso** (o despertar) | A leitura resolvendo escrita com margem 0.47 — sem exceção, sem teste vermelho, sem métrica acusando (§6) |
| **M1 · Mapear** — congelar o As-Is num Inventário de Comportamentos | O inventário das 285 tools e das duplicatas semânticas, **antes** de qualquer alteração de código |
| **M2 · Arquitetar** — contratos rígidos e garantias de execução | `taxonomy.py` como governança declarada + as 4 guardas + o Quality Gate tri-estado |
| **M3 · Orquestrar** — versionar a intenção via SDD | 8 ADRs, invariantes verificadas por teste, relatório com procedência |

> **Ancoragem editorial:** *"A capacidade vem do modelo; a confiança vem da engenharia."*

### 9.2 [Engenharia de Agentes de IA](https://mauricio.issei.com.br/engenharia-agentes-ia) — P2

Fonte dos [Cinco Pilares](../engenharia-agentes-ia/cinco-pilares-engenharia-agentica.md). Três
deles são exercitados diretamente:

**Pilar 1 · O Espectro de Autonomia** — autonomia posicionada por **custo do erro × reversibilidade**.
É exatamente a justificativa da assimetria da guarda 4 (§5.2) e da limitação registrada de que
`MIN_RELATIVE_MARGIN` é global enquanto o risco não é: *bloquear um cartão por engano é
reversível; transferir dinheiro não é.*

**Pilar 2 · Freios para Correr Mais Rápido** — a barreira pré-execução é literalmente isso. As
guardas não reduzem a capacidade do sistema; são o que permite executar 20 de 20 com zero
incorretas.

**Pilar 5 · Quando NÃO usar engenharia agêntica pesada** — o projeto é honesto sobre o próprio
teto: recuperação lexical não resolve paráfrase arbitrária (9/12 no top-1), e a resposta é
recuperação densa com reranker, não mais ajuste de peso.

> **Premissa-base compartilhada:** *"o LLM é um componente, nunca o piloto."* No `case-agents` o
> LLM sequer participa da decisão — router, retriever e guardas são determinísticos, e o LLM só é
> chamado **depois** que a barreira autorizou.

### 9.3 [Agent Ready](https://mauricio.issei.com.br/agent-ready) — P2

Trata a fronteira agente ↔ sistema **por fora** (a superfície descobrível na Web). O
`case-agents` trata a mesma fronteira **por dentro**: como um agente escolhe, entre 285
ferramentas, qual invocar — e quando não invocar nenhuma. Par natural de crosslink (§13).

### 9.4 [Formulação de Problemas](https://mauricio.issei.com.br/formulacao-de-problemas) — P1

O projeto é um exemplar do argumento: o problema apresentado era *"o retrieval está em 35%"*. O
problema real era **governança de catálogo**. Reformular o problema (de "melhorar o modelo" para
"declarar a capacidade de negócio") foi o que produziu o salto de 35% → 100% — sem trocar de
modelo, sem embeddings, sem custo adicional de inferência.

### 9.5 [Knowledge OS Enterprise](https://mauricio.issei.com.br/knowledge-os-presentation) — P2

`taxonomy.py` é um **Context Lake** em miniatura: conhecimento de domínio que estava tácito
(*"essas 8 ferramentas são a mesma coisa"*, *"essa altera e essa só consulta"*) tornado explícito,
versionado e **verificado por invariantes automatizadas**. É o argumento do Knowledge OS reduzido
a 200 linhas auditáveis.

### 9.6 [O Artífice Invisível](https://mauricio.issei.com.br/artifice) — P1

O trabalho que este projeto representa é majoritariamente invisível no resultado: o número final
(100%) não mostra a renormalização implementada e revertida, as três correções rejeitadas por
serem ajuste de trave, nem o teste escrito para falhar. A página deve **tornar esse trabalho
visível** — é o que a torna útil como peça técnica.

---

## 10. Vídeos do canal — sinergia verificada

**Fonte:** inventário local em
[`docs/specs/pages/devin/Videos.txt`](../devin/Videos.txt) (série de 8 vídeos, com descrições).
Canal: [@mauricioissei](https://www.youtube.com/@mauricioissei) — *Mauricio Yokoyama Issei*.
Verificação pontual: o vídeo `8nMyU-C5Dxc` responde com o título **"01 - A Crise Cognitiva"**,
correspondente ao item 1 do inventário.

Os quatro abaixo têm sinergia **direta e citável** com o projeto. Recomenda-se embutir **no
máximo dois** (§11.5), via `youtube-nocookie` conforme o padrão já adotado em `artifice` e
`agent-ready`.

### 10.1 Vídeo 2 — [O Novo Paradigma da IA](https://youtu.be/m69fzdS-EG0) · **sinergia máxima**

Trata da transição de chatbots passivos para **agentes operacionais** via *Tool Calling* e ciclo
ReAct, alertando para os riscos da autonomia sem governança — inclusive um incidente em que um
agente **deletou um banco de dados e fabricou dados sintéticos para encobrir a falha**. Defende o
humano **"acima do loop"**.

> **Ligação:** o `case-agents` é a implementação do freio que aquele incidente não tinha. As
> quatro guardas são o mecanismo concreto de manter o humano acima do loop — e
> `AMBIGUOUS_CONFIRMATION` é, literalmente, o agente devolvendo a decisão ao humano.
> **Uso sugerido:** embed na seção "A Barreira" (§11.4).

### 10.2 Vídeo 3 — [A Evolução da Programação e o Vibe Coding](https://youtu.be/HlgRNYHvOtg) · **sinergia máxima**

Trata do perigo de códigos que **"parecem certos" (*Looks Right*)** mas escondem falhas de
segurança, e propõe a **Engenharia de Intenção** como evolução.

> **Ligação:** é a descrição exata do §6. Um sistema com 54 testes verdes, três guardas e status
> aprovado que, ainda assim, alterava o cadastro de quem só havia perguntado. *Looks Right* com
> métrica para provar. **Uso sugerido:** embed na seção "O Crash Silencioso" (§11.3).

### 10.3 Vídeo 6 — [O Paradoxo das Métricas](https://youtu.be/ubBJRgWuAMU) · **sinergia alta**

**Lei de Goodhart**: quando a métrica vira meta, o sistema é corrompido.

> **Ligação:** 87,8% de economia com 20% de execuções corretas. A economia virou meta e o sistema
> se corrompeu — abstendo-se de 45% das queries para economizar chamadas de LLM. A correção
> **baixou** a métrica de vaidade e subiu a de valor.
> **Uso sugerido:** citação em destaque na seção "Economia Honesta" (§11.4), sem embed.

### 10.4 Vídeo 8 — [O Futuro do Trabalho e a Economia Cognitiva](https://youtu.be/zQ453MWvBck) · **sinergia média**

Formaliza **Human-in-the-Loop / on-the-Loop / over-the-Loop**.

> **Ligação:** vocabulário pronto para rotular os três destinos de uma query que não passa na
> barreira — `HUMAN_FALLBACK_LOW_CONFIDENCE`, `ABSTAIN_LOW_SCORE`, `AMBIGUOUS_CONFIRMATION`.
> **Uso sugerido:** citação textual, sem embed.

### 10.5 Complementares (contexto, sem embed)

- **Vídeo 4 — [Pensamento vs. Processamento](https://youtu.be/luoGsY5PrLo):** o *Frame Problem* e
  a ausência de bom senso contextual. É a razão de fundo pela qual a direção leitura/escrita
  precisa ser **declarada** e não inferida — o modelo não "sabe" que perguntar ≠ mandar.
- **Vídeo 7 — [Sistemas de Conhecimento e Playbooks](https://youtu.be/LbzxZDRUk8Y):** *Context
  Lakes* e Skills delimitando a atuação da IA. Corresponde a `taxonomy.py` (§9.5).

---

## 11. Especificação da página

### 11.1 Header e Footer

- **Header:** Padrão (logo + menu), conforme demais páginas de P2.
- **Footer:** Padrão completo.
- **`<eco-nav>`:** injetar o Web Component antes de `</body>` (linha única), conforme
  [`ECOSYSTEM.md`](../../../../ECOSYSTEM.md) D-03. **Depende da aprovação do §13.**

### 11.2 Princípio de direção de arte

A página trata de **contenção**, não de potência. A direção visual deve **conter-se** também:
sem contadores animados de métrica, sem barras de progresso comemorando 100%. O número que a
página celebra é **zero** (execuções incorretas), e zero não se comemora com animação — se
comemora com o registro de como foi obtido.

Isso a distingue deliberadamente de `devin` e `knowledge-os-presentation`, que são páginas de
demonstração de capacidade.

### 11.3 Estrutura narrativa

Ordem em três atos — **o defeito vem antes da solução**. A página não pode abrir com "100% de
acerto"; abrir assim a transformaria em vitrine e destruiria a tese.

| # | Seção | Tipo | Objetivo |
| :--- | :--- | :--- | :--- |
| 1 | **Hero** | Impacto | H1 + subheadline + 2 CTAs |
| 2 | **O problema** | Texto + código | 285 tools, 30 queries, a restrição bancária |
| 3 | **O Crash Silencioso** | **Narrativa + medição** | O bloco de scores do §6.2. Núcleo emocional |
| 4 | **Por que nenhum peso resolve** | Diagrama + aritmética | A demonstração dos 0.647 (§6.3) |
| 5 | **A Barreira** | Diagrama interativo | As 4 guardas em sequência (§11.4) |
| 6 | **A arquitetura** | Grid de cards | 4 camadas (§4) |
| 7 | **Governança de catálogo** | Antes/depois | O colapso por capacidade (§4.2) |
| 8 | **Economia honesta** | Tabela + citação | Goodhart (§8.2, §10.3) |
| 9 | **O método** | Timeline | As duas rodadas de revisão (§7.1) |
| 10 | **Evidência** | Tabela + links | Métricas e a suíte (§7.4, §8) |
| 11 | **Limitações** | Lista honesta | §14 — **não omitir** |
| 12 | **Referências** | Grid de links | §9 e §10 |

### 11.4 Componentes de destaque

**a) Hero**
- **H1:** `A tool errada não é uma aproximação aceitável`
- **Subheadline:** `285 ferramentas, 30 queries, um domínio bancário. Como uma barreira
  pré-execução de quatro camadas levou 7 execuções incorretas a zero — e por que a economia de
  custo caiu no caminho.`
- **CTA primário:** `Ver o repositório` → `https://github.com/issei/case-agents`
- **CTA secundário:** `Como o defeito foi encontrado` → âncora `#crash-silencioso`
- **Fundo:** gradiente radial `rgba(0,123,255,0.1)` (padrão da casa).

**b) Bloco "A Decisão Confiante e Errada"** — o componente assinatura da página.
Renderizar o ranking real com os dois candidatos, a margem calculada e o veredito, em monoespaçada
sobre `#161b22`, com a linha da escrita destacada em vermelho de alerta. Ao lado, o mesmo ranking
**depois** da guarda de direção. Sem animação de transição — corte seco.

**c) Diagrama da Barreira** — quatro estágios em sequência vertical. Cada um mostra: sinal
avaliado, limiar, e para onde a query vai se reprovar. Interação mínima: hover revela o
`execution_status` correspondente. Mermaid é aceitável (padrão já usado em `engenharia-confianca`).

**d) Bloco "A Fronteira"** — visual que separa *lógica de produção* de *camada de avaliação*, com
`expected_tool` explicitamente do lado direito e o comando `grep` do §7.2 como prova.

**e) Tabela de evolução** — a de §8.2, com as duas quedas de economia anotadas como **correções**.

### 11.5 Vídeos — regra de contenção

**Máximo 2 embeds.** Recomendados: Vídeo 3 na seção 3, Vídeo 2 na seção 5. Os demais entram como
citação textual com link. Usar `youtube-nocookie.com/embed/<id>?rel=0&modestbranding=1`, `loading="lazy"`,
com `title` descritivo — padrão de `agent-ready` e `artifice`, e compatível com a política de
cookies vigente ([`LEGAL_PAGES.md`](../LEGAL_PAGES.md)).

### 11.6 Design system

Paleta **Dark Tech** padrão, **sem exceção** (a exceção `.ap-*` de `apresentacao` não se aplica):

| Papel | Token |
| :--- | :--- |
| Background | `#0d1117` |
| Cards / blocos de código | `#161b22` |
| Texto | `#c9d1d9` · Títulos `#ffffff` |
| Acento | `#007bff` → `#8a2be2` |
| **Alerta** (execução incorreta) | vermelho de alto contraste — **novo token**, ver §14 D-3 |
| Tipografia | `Inter` (300/400/600/700/800) |

Um `src/case-agents.css` dedicado é justificado pela densidade (blocos de score, diagrama de
guardas), seguindo o precedente de `engenharia-confianca.css` e `formulacao-de-problemas.css`.

---

## 12. SEO, a11y, i18n e testes

### 12.1 SEO
- `<title>`, `<meta name="description">`, canonical, OG tags e Twitter card.
- **Dados estruturados:** `TechArticle` em JSON-LD, com `author`, `datePublished`,
  `codeRepository: https://github.com/issei/case-agents` e `programmingLanguage: Python`.
- Registrar no sitemap (automático via `vite-plugin-sitemap`).
- Avaliar inclusão em `llms.txt` / `cv-for-ai.md` — a página é forte evidência técnica para
  leitura por agentes.

### 12.2 Acessibilidade
- Contraste mínimo **4.5:1** para corpo (padrão Dark Tech).
- **O vermelho de alerta nunca é o único portador de significado** — sempre acompanhado de rótulo
  textual (`EXECUÇÃO INCORRETA`) e ícone. Requisito não negociável: a página inteira é sobre
  distinguir certo de errado.
- Blocos de código com `<pre>` semântico e `overflow-x: auto`; nunca quebrar linha de score.
- Iframes de vídeo com `title` descritivo.
- Validar com `@axe-core/playwright`, já presente no projeto.

### 12.3 i18n — obrigatório

Conforme [`AGENTS.md`](../../../../AGENTS.md) §i18n, criar `src/case-agents.html` (PT-BR) **exige**
gerar o gêmeo em `/en/`:

```bash
npm run i18n:sync && npm run i18n:check
```

- Tradução **local** (Argos Translate). **Não usar LLM para traduzir.**
- **Nunca editar `src/en/**` à mão.**
- `npm run gate` cobra o espelho em dia.
- ⚠️ **Atenção específica desta página:** identificadores de código (`atualizar_email`,
  `consultar_email_vinculado_conta`, `AMBIGUOUS_CONFIRMATION`) **não podem ser traduzidos**.
  Marcar os blocos com `translate="no"` / `<code>` antes de rodar o sync, e **verificar o
  resultado** — é a maior fonte de risco de regressão do gêmeo em inglês.

### 12.4 Testes

`tests/case-agents.spec.js`, no padrão da casa:

```javascript
import { test, expect } from '@playwright/test';

test('deve carregar case-agents com sucesso', async ({ page }) => {
  const response = await page.goto('/case-agents.html');
  expect(response.status()).toBe(200);
});
```

Acrescentar, por serem específicos do conteúdo:
- presença do H1 e da meta description;
- o link do repositório resolve para `github.com/issei/case-agents`;
- os iframes de vídeo usam `youtube-nocookie`;
- varredura axe sem violações críticas.

Rodar `npm run gate` antes de concluir.

---

## 13. Governança do ecossistema

> [!IMPORTANT]
> **Esta seção descreve uma alteração de grafo e, portanto, exige aprovação humana.**
> [`ECOSYSTEM.md`](../../../../ECOSYSTEM.md) §"Fronteiras para agentes" (regras 1 e 2): agentes que
> editam uma página individual **não** alteram `ecosystem.nav.yaml` sem bump de versão e aprovação
> humana. **Esta spec propõe; não executa.**

### Proposta de nó

```yaml
case-agents:
  file: "case-agents.html"
  title: "Case Agents — Roteamento e Seleção Segura de Tools"
  label: "Case Agents"
  blurb: "Quando o agente não deve executar."
  pillar: p2
```

**Checklist de materialização** (receita de `ECOSYSTEM.md`):
1. criar `src/case-agents.html`;
2. adicionar a entrada em `nodes:` e o slug em `pillars[p2].nodes` no `ecosystem.nav.yaml`;
3. replicar em `src/js/eco-nav.js` (`DATA.nodes` + `DATA.pillars`) — **as duas cópias andam juntas**;
4. bump de `meta.version` → `1.6.0`;
5. injetar `<script type="module" src="./js/eco-nav.js"></script>` na nova página;
6. `npm run gate`.

### Crosslinks propostos (`status: proposed`, aguardando HITL)

| De | Para | Racional |
| :--- | :--- | :--- |
| `case-agents` | `engenharia-confianca` | O ISM é o framework que o projeto instancia; o Crash Silencioso é o defeito que ele mediu. |
| `case-agents` | `engenharia-agentes-ia` | Espectro de Autonomia justifica a assimetria da guarda de direção. |
| `agent-ready` | `case-agents` | A mesma fronteira agente↔sistema: `agent-ready` por fora, `case-agents` por dentro. |

### Conformidade com o *lexical lock*

A grafia fixa **Engenharia da Confiança** é respeitada em todas as ocorrências. Nenhum termo do
bloqueio léxico é parafraseado. Vocabulário novo introduzido por esta página — *barreira
pré-execução*, *guarda de direção*, *governança de catálogo* — é **técnico e específico do
projeto**, não concorre com o glossário do ecossistema, e não deve ser promovido a termo
travado sem decisão humana.

---

## 14. Riscos, limitações e decisões abertas

### 14.1 Limitações do projeto que a página **deve** publicar

Omitir estas linhas transformaria a página numa peça de marketing e contradiria a própria tese.
Todas estão registradas no [README do repositório](https://github.com/issei/case-agents#readme).

1. **Aprovado *neste benchmark*, não para operação bancária.** 30 queries, 53 exemplos de treino,
   tools mockadas. Fora do escopo: tráfego real, entradas adversariais, drift, autorização, MFA,
   idempotência, auditoria.
2. **A guarda de direção só protege o que está declarado.** **59 das 285** ferramentas têm `mode`.
   As outras 226 passam sem restrição. O lugar arquitetural correto para `mode` é o **próprio
   registry** — é metadado do endpoint, não da taxonomia.
3. **Recuperação lexical tem teto em paráfrase:** 9/12 no top-1. A resposta é recuperação densa,
   não mais ajuste de peso.
4. **A taxonomia é mantida à mão:** 14 capacidades, 45 variantes sobre 285 ferramentas.
5. **O benchmark oficial não exercita mais as guardas 2 e 3.** Com 20/20 e zero abstenções, elas
   passam a ser provadas só pelos testes unitários. **Um benchmark que nunca aciona a rede de
   segurança não demonstra que ela funciona** — e isso precisa estar na página.
6. **A folga de calibração do router é de 0.017.**
7. **O custo do fallback humano é premissa, não medição.** O número confiável é o ponto de
   equilíbrio, que é derivado.

### 14.2 Riscos da página

| Risco | Mitigação |
| :--- | :--- |
| **Densidade técnica afasta o leitor não-engenheiro** | O ato 1 (seções 1–3) é narrativo e legível sem código. O detalhe técnico começa na seção 4, depois do gancho. |
| **Ler como autopromoção** | A estrutura em três atos abre pelo **defeito**. A seção 11 (limitações) é obrigatória e não pode ser recolhida atrás de um acordeão. |
| **Números envelhecerem** | Toda métrica citada leva a data e o commit. O `snapshot` do relatório é a fonte. |
| **Tradução quebrar identificadores de código** | §12.3 — `translate="no"` e verificação manual do gêmeo. |
| **Vídeos removidos do canal** | Links diretos + descrição textual autossuficiente: o argumento sobrevive sem o embed. |

### 14.3 Decisões abertas (HITL)

| # | Decisão | Recomendação |
| :--- | :--- | :--- |
| **D-1** | Slug `case-agents` vs. editorial (`quando-o-agente-nao-deve-agir`) | **`case-agents`** — casa com o repositório e é descobrível. O peso editorial fica no H1. |
| **D-2** | Entrar no grafo do ecossistema (§13) | **Sim, em P2.** Requer bump `1.6.0` + aprovação. |
| **D-3** | Introduzir token de alerta (vermelho) fora da paleta Dark Tech | **Sim, escopado a `case-agents.css`.** A página precisa distinguir visualmente "executou errado" de "absteve-se". Registrar como ADR de página, no precedente de [`ADR-ap-001`](../apresentação/ADR-ap-001-namespace-e-excecao-dark-tech.md). |
| **D-4** | Publicar o `candidate_report.json` como download na página | **Sim** — coerente com a tese de evidência verificável. |
| **D-5** | Quantos vídeos embutir | **2** (§11.5). |

### 14.4 Nota de procedência desta spec

Escrita a partir da leitura direta do código em `D:\projetos\case-agents`, com as métricas obtidas
por execução real de `python -m pytest -q` e `python -m candidate_starter.run_case`.

**Fronteira de commit (revisada 2026-09-10):** a iteração descrita em §6 (guarda de direção,
ADR-008) **foi publicada**, junto com a saga da procedência do relatório (§7.3). O `main`
publicado está em `1f780c0` — snapshot registrado no `candidate_report.json` — com um commit
adicional (`67a7622`) que só re-executa o relatório e muda apenas números de latência
não-determinísticos. `python -m pytest -q` retorna **72 passed, 0 skipped**;
`python -m candidate_starter.run_case` confirma router 100% (30/30), Hit Rate@1 e @2 100%,
execução correta 20/20, 0 incorretas, 0 abstenções, economia de custo 77,8%, status
`APROVADO NO BENCHMARK DO MVP` / `MVP_BENCHMARK_ONLY`. §8 reflete esse estado; não há mais
necessidade de rebaixar para `c8f30d2`.

---

## Referências

**Repositório do projeto**
- <https://github.com/issei/case-agents>
- [`README.md`](https://github.com/issei/case-agents#readme) · [`TODO.md`](https://github.com/issei/case-agents/blob/main/TODO.md) · [`docs/adr/`](https://github.com/issei/case-agents/tree/main/docs/adr)

**Neste repositório**
- [`AGENTS.md`](../../../../AGENTS.md) — protocolo de agentes, SDD, i18n
- [`ECOSYSTEM.md`](../../../../ECOSYSTEM.md) — governança do grafo
- [`docs/specs/STYLE_GUIDE.md`](../../STYLE_GUIDE.md) · [`TESTING_GUIDE.md`](../../TESTING_GUIDE.md) · [`PAGE_SPEC_TEMPLATE.md`](../../PAGE_SPEC_TEMPLATE.md)
- [`pages/engenharia-confianca/`](../engenharia-confianca/) · [`pages/engenharia-agentes-ia/`](../engenharia-agentes-ia/)
- [`pages/devin/Videos.txt`](../devin/Videos.txt) — inventário da série do canal

**Canal**
- [@mauricioissei](https://www.youtube.com/@mauricioissei)
