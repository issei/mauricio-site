# Revisão editorial — Especificação Conversacional Estruturada (2026-10-11)

Página: `src/especificacao-conversacional.html` (fonte) · camada de síntese, FAQ e
glossário gerada por `scripts/seo/pages.mjs` (aparece no bloco visível da página, no
JSON-LD e em `public/especificacao-conversacional.md`).

---

## 0. Antes do diagnóstico: as duas revisões recebidas

As duas revisões anexadas leram só a versão Markdown (GEO/AEO), com cerca de 7 KB. A
página tem cerca de 34 KB de texto visível: caso ilustrativo, matriz de autoridade,
política de divergência com exemplo completo, testes, métricas, escada de evidência e
referências. Por isso as duas chegaram à conclusão errada de que faltavam o caso, as
métricas e os três níveis de leitura.

| Revisão | Veredito | Motivo |
| --- | --- | --- |
| `revis_o_editorial_e_reescrita.md` | **Rejeitar** | Inventa um caso (módulo de liquidação financeira, desconto a pedidos cancelados em 24 h, responsável contábil) que contradiz o caso real da página (aprovação de proposta com desconto excepcional, AF-012 / DIV-007 / DEC-031). Também altera fatos: "inferência estatística de IA" e "deliberação colegiada" no lugar de "inferência" e "decisão formal"; "reexecutar a bateria de testes de caracterização" (a página diz o contrário: o teste de caracterização fica como evidência sobre o legado); "garantir que qualquer desvio seja imediatamente detectável" (promessa que a página nega); "superioridade estatística"; "ambiguidades sintáticas"; define oráculo como "fonte de verdade independente", em conflito com "não há fonte universal de verdade". Registro inflado ("lavrar", "listagem exaustiva", "disponibilizamos um kit completo") e uma frase de rascunho esquecida ("Iniciarei agora a análise…"). |
| `Revisão editorial — Especificação Conversacional Estruturada.md` | **Aproveitar em parte** | Fiel aos fatos. As correções de regência ("com a qual"), "está certo" → "esse comportamento está correto" e "quem assiste" foram incorporadas abaixo. Fragmenta demais algumas frases ("Eles não validam a proposta." isolada), e isso deixa o ritmo picotado. |

---

## 1. Diagnóstico editorial

**Objetivo.** Apresentar uma proposta de workflow humano–IA para elicitar, registrar,
testar e evoluir requisitos, com autoridade humana sobre as decisões, proveniência,
incerteza explícita e política de divergência. É um ensaio técnico e de posicionamento,
não uma página comercial.

**Público.** Tech leads, arquitetos, engenheiros de requisitos e de qualidade, e
lideranças técnicas que avaliam agentes de IA em modernização de legado. Inclui
leitores que não são da área de requisitos, por isso a página já explica os jargões
na primeira ocorrência (LLM, oráculo, drift, conhecimento tácito, SWEBOK).

**Estado geral.** O texto já passou por revisão de tom e está bom: não há
superlativos, as ressalvas epistemológicas aparecem em todas as seções ("Base:",
escada de evidência, selos "Cenário ilustrativo" e "Não validado") e o caso é um só,
conduzido da Figura 1 à Figura 10. Os problemas restantes são pontuais:

1. **Frases longas em pontos de entrada.** O subtítulo do hero (40 palavras) e a
   definição na seção "A solução proposta" (45 palavras) são lidos por quem decide se
   continua. São os cortes de maior impacto.
2. **Falta de paralelismo nas cinco práticas.** Quatro usam verbo no infinitivo; a
   quinta é um substantivo ("Revisão proporcional ao risco").
3. **Regência e referentes vagos.** "com que o teste compara" (→ "com a qual"); "sem
   julgar se está certo", com sujeito implícito (aparece na Figura 1 e no glossário).
4. **Camada de síntese (pages.mjs) mais áspera que a página.** As cinco práticas
   aparecem como lista inline "1) … 2) …"; "quem assiste" é ambíguo (pode ser lido como
   "quem observa"); "AI 600-1" aparece sem o "NIST"; "Qual a diferença para" soa
   coloquial numa pergunta de FAQ que também vira JSON-LD.
5. **Uma frase de efeito.** "A página não discute quanto mais rápido se chega, e sim o
   que se perde no caminho." O contraste funciona, mas "no caminho" é vago; a Figura 2,
   logo abaixo, diz exatamente qual caminho é esse.
6. **Os três níveis de leitura já existem, mas o nível "Acompanhar" não tem nome.**
   "Entender" é a síntese (~1 min) e "Investigar" corresponde à matriz, ao kit, às
   métricas e às referências. O caso ilustrativo atravessa as Figuras 1, 3, 6, 8 e 10,
   mas nada avisa o leitor de que dá para seguir só esse fio.

## 2. Mapa de preservação

Não muda: título; autoria e data (10/10/2026); status de proposta sem validação do
workflow completo; "a IA propõe; pessoas designadas decidem"; as cinco práticas e sua
ordem; os cinco passos da política de divergência e a lista de causas (informação
incompleta, defeito, mudança de regra, obsolescência, erro de implementação); os dez
estados de divergência; os oito artefatos com responsabilidade e limite; o caso
ilustrativo (sistema comercial com mais de 15 anos, desconto excepcional, AF-012,
DIV-007, DEC-031, EX-01..03, `nao_conhecido`); os dois testes da Figura 10; todos os
números citados (Becker: 16 desenvolvedores, 246 tarefas, +19%, preprint; Rafique &
Mišić: 27 estudos; Tosun: 24 profissionais; Nagappan: 4 equipes, 40–90% e 15–35%;
Rempel & Mäder: 24 projetos, associação e não causa); a escada de evidência de cinco
degraus; as seis etapas de avaliação local; as hipóteses H1–H4 no kit; todas as
referências e links; os termos Vibe Spec-ing, Spec-Driven Development, spec-first,
spec-anchored, spec-as-source, spec-retrospectiva, oráculo, drift, pós-racionalização;
os CTAs "Ver as cinco práticas", "Baixar o kit de artefatos (.md)" e "Conversar sobre
um caso"; a URL do kit.

Ambiguidades para decisão do responsável estão na seção 5.

---

## 3. Versão revisada

### 3a. Camada de síntese, FAQ e glossário (texto integral)

Substitui o conteúdo correspondente em `scripts/seo/pages.mjs`. Daqui saem o bloco
visível, o JSON-LD e o `.md`.

---

## Em síntese

A Especificação Conversacional Estruturada é uma **proposta de workflow** em que a IA
ajuda a elicitar e registrar requisitos: faz perguntas, compara interpretações e sugere
exemplos. Quem decide são **pessoas com autoridade**. Cada afirmação tem origem e
status, e as divergências entre documentação, testes e código seguem uma política
explícita. A eficácia do workflow completo ainda não foi avaliada.

- **A IA propõe; pessoas decidem.** A matriz de autoridade separa quem decide de quem
  apoia. Por padrão, o modelo não tem autoridade substantiva.
- **Cinco práticas.** Registrar a origem, separar fato de hipótese, manter as
  pendências visíveis, usar exemplos e contraexemplos e revisar na proporção do risco.
- **Divergência governada.** Documentação, testes e código vão divergir. A política
  define quem resolve, como e onde a decisão fica registrada.
- **Complementa o TDD, não o substitui.** A especificação decide o que verificar; o TDD
  verifica. O oráculo (o resultado esperado) vem de pessoas.

## Postura: proposta, não método validado

O workflow completo ainda não foi comparado a uma linha de base, e não foi localizado
estudo controlado ou longitudinal sobre ele. Os componentes têm evidência parcial, em
tarefas isoladas.

As normas e os guias (ISO/IEC/IEEE 29148, SWEBOK, NIST AI RMF e NIST AI 600-1)
fundamentam o desenho, mas não o validam. A proposta é compatível com as atividades
descritas na 29148 e no SWEBOK e se inspira na função Govern do NIST AI RMF, sem
reivindicar conformidade.

## As cinco práticas do protocolo

1. **Registrar a origem de cada afirmação:** entrevista, documento, inspeção de código,
   observação operacional, inferência ou decisão formal.
2. **Separar fatos, hipóteses e propostas.**
3. **Manter as pendências visíveis**, cada uma com um responsável.
4. **Usar exemplos e contraexemplos.** O modelo sugere casos, mas não os promove a regra
   aprovada.
5. **Revisar na proporção do risco.**

## Política de divergência

Não há fonte universal de verdade. Quando dois artefatos entram em conflito:

1. Identificar os artefatos e o comportamento divergente.
2. Classificar a causa provável: informação incompleta, defeito, mudança de regra,
   obsolescência ou erro de implementação.
3. Identificar quem tem autoridade para decidir.
4. Registrar a decisão, a justificativa, o impacto e os artefatos afetados.
5. Atualizar os artefatos e verificar de novo.

O objetivo não é impedir toda divergência, mas torná-la detectável, explicável e
tratável.

## Kit de artefatos

Matriz de autoridade, modelo de registro de afirmação, registro de divergência com
estados e roteamento, checklist de drift e protocolo de avaliação resumido, em
Markdown: https://mauricio.issei.com.br/downloads/kit-especificacao-conversacional.md

## Perguntas frequentes

**O que é Especificação Conversacional Estruturada?**

É um workflow humano–IA, governado por artefatos e por autoridade humana, para
elicitar, registrar, testar e evoluir a intenção de um sistema como requisitos e
critérios verificáveis. Fontes, incertezas, decisões e forma de verificação ficam
explícitas. É uma proposta em avaliação, não um método validado nem uma norma.

**Qual é a diferença entre esta proposta, o Vibe Spec-ing e o Spec-Driven Development?**

Vibe Spec-ing foi o nome anterior deste enquadramento. Mudou porque "vibe" sugere o
contrário do que a proposta exige: registro, autoridade e verificação. Spec-Driven
Development é um rótulo ainda instável para práticas em que a especificação vem antes
do código (spec-first, spec-anchored, spec-as-source). A Especificação Conversacional
Estruturada é um workflow específico dentro desse espaço, com autoridade humana e
política de divergência explícitas.

**A IA pode aprovar requisitos ou regras de negócio?**

Não, por padrão. O modelo pode perguntar, resumir, propor cenários, apontar
contradições e preparar mudanças, mas não recebe autoridade para decidir valor, risco,
conformidade, aceitação ou verdade de domínio. A matriz de autoridade atribui cada
decisão a pessoas designadas. É uma política de governança proposta, a ser ajustada a
cada organização.

**Isso substitui o TDD ou os testes de aceitação?**

Não. Eles atuam em níveis diferentes: a especificação define qual problema resolver,
para quem e com quais critérios; o TDD verifica o próximo incremento de código. O TDD
torna o feedback barato, mas não torna o oráculo correto. Quando o mesmo modelo escreve
a especificação e os testes, um teste verde pode apenas confirmar o erro do próprio
modelo. Por isso, o resultado esperado é definido ou validado por pessoas.

**Serve para sistemas legados?**

A proposta foi pensada para esse caso. Testes de caracterização registram o que o
legado faz hoje, e a decisão de preservar, corrigir, substituir ou descontinuar cada
regra cabe a quem tem autoridade de negócio. O risco declarado é a pós-racionalização:
dar coerência ao que foi acidental ao reconstruir a intenção a partir do código.

**Há evidência de que funciona?**

Para componentes isolados, parcial: estudos mostram capacidade parcial de LLMs em
elicitação, especificação e detecção de ambiguidade, em tarefas controladas. Para o
workflow completo, não foi localizado estudo controlado ou longitudinal frente a uma
linha de base alinhada à ISO/IEC/IEEE 29148 e ao SWEBOK. A página propõe um protocolo
para avaliar o workflow no seu próprio contexto.

## Glossário

- **Especificação Conversacional Estruturada** — Workflow humano–IA, governado por
  artefatos e por autoridade humana, para elicitar, registrar, testar e evoluir a
  intenção de um sistema.
- **Oráculo de teste** — Fonte do resultado esperado com o qual um teste compara o
  comportamento observado.
- **Teste de caracterização** — Teste que registra o que um sistema existente faz hoje,
  inclusive defeitos e regras obsoletas, sem julgar se esse comportamento está correto.
- **Divergência (drift)** — Situação em que artefatos que deveriam dizer a mesma coisa
  (especificação, testes, código, produção) passam a dizer coisas diferentes.
- **Matriz de autoridade** — Política de governança proposta que define, para cada tipo
  de decisão, quem decide e o que a IA pode fazer.
- **Proveniência** — Registro da origem de uma afirmação ou decisão: fonte, autor, data e
  justificativa.
- **Spec-first** — Modo em que a especificação é elaborada antes do código. O risco é
  congelar cedo uma interpretação do modelo.
- **Spec-retrospectiva** — Modo em que a intenção é reconstruída a partir de código, logs
  e incidentes. O risco é dar coerência ao que foi acidental.

---

### 3b. Corpo da página (`src/especificacao-conversacional.html`)

Reescrever o corpo inteiro de novo produziria mudança sem ganho e arriscaria fatos já
conferidos (a página passou por checagem de fontes e de tom). As edições abaixo cobrem
todos os problemas encontrados, em ordem de impacto. O restante fica como está, de
propósito.

| # | Seção | Original | Revisado |
| --- | --- | --- | --- |
| P1 | Hero (subtítulo) | Um workflow proposto para usar modelos de linguagem (LLMs, os sistemas de IA que geram texto) na descoberta e no registro de requisitos, com decisões tomadas por pessoas com autoridade e divergências rastreáveis entre documentação, testes e código. | Um workflow proposto para usar modelos de linguagem (LLMs, os sistemas de IA que geram texto) na descoberta e no registro de requisitos. Quem decide são pessoas com autoridade, e as divergências entre documentação, testes e código ficam rastreáveis. |
| P1 | A solução proposta (definição) | …como requisitos e critérios verificáveis, mantendo explícitas as fontes, as incertezas, as decisões e a forma de verificação. | …como requisitos e critérios verificáveis. Fontes, incertezas, decisões e forma de verificação ficam explícitas. |
| P1 | O protocolo, prática 5 | **Revisão proporcional ao risco.** | **Revisar na proporção do risco.** |
| P2 | A solução proposta, 2º parágrafo | …descritas na ISO/IEC/IEEE 29148 e no SWEBOK (…IEEE Computer Society); a proposta explora como a IA pode apoiá-las, sem substituí-las. | …descritas na ISO/IEC/IEEE 29148 e no SWEBOK (…IEEE Computer Society). A proposta explora como a IA pode apoiar essas atividades, sem substituí-las. |
| P2 | O problema, último parágrafo | A página não discute quanto mais rápido se chega, e sim o que se perde no caminho. | Esta página não trata de velocidade, e sim do que se perde entre a conversa e o código. |
| P2 | Especificação e TDD, 1º parágrafo | oráculo é a fonte do resultado esperado com que o teste compara o comportamento observado. | oráculo é a fonte do resultado esperado com o qual o teste compara o comportamento observado. |
| P2 | Figura 1, legenda | …registra o que o sistema antigo faz hoje, sem julgar se está certo. | …registra o que o sistema antigo faz hoje, sem julgar se esse comportamento está correto. |
| P3 | Profundidade (bloco de leitura) | Leitura aprofundada · ~9 min para a ideia central · ~23 min completo | *Proposta, depende de decisão (ver 5.1):* acrescentar "Para seguir só o caso ilustrativo: Figuras 1, 3, 6, 8 e 10." |

## 4. Tabela de alterações relevantes

| Trecho original | Versão revisada | Motivo |
| --- | --- | --- |
| quem decide de quem assiste | quem decide de quem apoia | "Assistir" pode ser lido como "observar". "Apoia" é mais curto que "presta assistência" e não muda o papel da IA. |
| Revisão proporcional ao risco. | Revisar na proporção do risco. | Paralelismo com as outras quatro práticas, todas no infinitivo. Mesma regra, mesma força. |
| 1) Registrar… 2) Separar… (lista inline) | Lista numerada | Escaneabilidade no `.md` e no bloco visível. Conteúdo idêntico. |
| AI 600-1 | NIST AI 600-1 | Identificação completa do documento, como no corpo da página e nas referências. |
| Qual a diferença para Vibe Spec-ing… | Qual é a diferença entre esta proposta, o Vibe Spec-ing e o Spec-Driven Development? | Pergunta completa e menos coloquial. Mantém os dois termos de busca. Muda também o `name` no JSON-LD (FAQPage). |
| …mantendo explícitas as fontes, as incertezas… (frase de 45 palavras) | Frase dividida em duas | Mesmos elementos, leitura mais fácil no ponto em que a proposta é definida. |
| com que o teste compara | com o qual o teste compara | Regência. |
| sem julgar se está certo | sem julgar se esse comportamento está correto | Sujeito explícito. |
| separa quem decide cada tipo de decisão do que a IA pode fazer em cada uma | define, para cada tipo de decisão, quem decide e o que a IA pode fazer | Remove "decide cada tipo de decisão" (redundante) e a estrutura "separa X do que Y". |
| A página traz um protocolo de avaliação para testar no próprio contexto. | A página propõe um protocolo para avaliar o workflow no seu próprio contexto. | Explicita o objeto avaliado. "Propõe" mantém o caráter não validado. |
| o que se perde no caminho | o que se perde entre a conversa e o código | Troca uma imagem vaga pelo trajeto concreto que a Figura 2 mostra. |

## 5. Observações e decisões editoriais

1. **Nível "Acompanhar".** A estrutura de três níveis já existe. Nomear o fio do caso
   (Figuras 1, 3, 6, 8 e 10) custa uma linha e não acrescenta fato nenhum. Fica como
   decisão sua porque muda a navegação, não só o texto.
2. **Seifert et al. sem ano.** É a única referência de estudo sem ano. O link aponta
   para um capítulo da Springer (ISBN 978-3-031-78386-9). Vale confirmar o ano e
   completar a citação.
3. **Mudança da pergunta do FAQ.** Altera o `name` da pergunta no JSON-LD. Não muda a
   intenção de busca, mas a resposta indexada vai mudar de texto.
4. **"Apoia" × "presta assistência".** As duas resolvem a ambiguidade. Escolhi a mais
   curta. Se preferir manter o eco com a frase da seção de governança ("A matriz separa
   autoridade de assistência"), use "quem presta assistência".
5. **Gêmeo `/en/`.** Toda edição acima exige `npm run i18n:sync && npm run i18n:check`.
   A tradução pelo Argos deve ser conferida em "Revisar na proporção do risco" (risco de
   virar "Review in proportion to risk", que está correto, ou algo truncado).
6. **Testes.** Conferir se `tests/especificacao-conversacional.copy.test.mjs` ou o spec
   Playwright travam alguma das frases alteradas antes de aplicar.

### Checklist final

- [x] Nenhum fato, dado ou promessa foi removido.
- [x] Nenhuma informação nova foi inventada (a linha do item 5.1 é navegação e depende de decisão).
- [x] O sentido original foi preservado.
- [x] Gramática e ortografia revisadas (regência, referentes, paralelismo).
- [x] O texto ficou mais claro e conciso nos pontos de entrada.
- [x] O tom (técnico, crítico, sem promessa) está consistente.
- [x] CTAs, links, termos técnicos e palavras-chave foram preservados.
