# 00 — Visão, personas e objetivos

## 1. O que está sendo publicado

Um artigo acadêmico de ~11 mil palavras que investiga uma hipótese: **a formulação de problemas
complexos pode ser entendida como engenharia da redução de incerteza orientada à decisão** — e
propõe um refinamento: essa engenharia precisa ser **interrompida**, isto é, submetida a regras de
parada explícitas, sob pena de degenerar em custo, viés de confirmação e falsa confiança.

O veredito do próprio artigo é **sustentação parcial**. Isso não é um detalhe de rodapé: é a
característica editorial mais rara do texto e o eixo da direção de arte. A página não pode parecer
um manifesto. Precisa parecer o que é — um programa de pesquisa que declara como pode ser refutado.

## 2. Por que publicar como página, e não como PDF

| Motivo | Consequência de projeto |
| :-- | :-- |
| O argumento central é **quantitativo-conceitual** (curvas de valor da informação, vetores de incerteza, estados de conhecimento) | Prosa densa não transmite; as relações precisam de **forma visual manipulável** (V1–V7 no doc 02). |
| O texto se autolimita o tempo inteiro (o que é síntese × o que é proposta original × o que ainda não foi validado) | O **status epistêmico** vira elemento de interface: cada bloco proposto carrega selo (`síntese` · `proposta` · `não validado`). |
| A tese é diretamente aplicável ao restante do site (Engenharia da Confiança, Engenharia de Agentes) | Crosslinks explícitos: a regra de parada aqui é o mesmo princípio do *fail-closed* e do Limiar de Certeza, em outra escala. |
| Answer engines citam texto estruturado, não PDF | Bloco AEO, FAQ, `DefinedTermSet` e companion Markdown (doc 04). |

## 3. Personas

| Persona | Chega com | Sai com |
| :-- | :-- | :-- |
| **P1 — Líder de engenharia / decisor técnico** | "minha equipe refina requisitos até a paralisia" | O critério de parada e o vocabulário para defendê-lo numa reunião: EVSI × custo × custo de atraso. |
| **P2 — Pesquisador / analista de decisão** | "onde isso se encaixa entre PSM, Decision Analysis e Engenharia de Requisitos?" | A matriz comparativa, a lista de lacunas e os critérios de falseabilidade. |
| **P3 — Arquiteto de sistemas de IA** | "como isso muda o desenho de um agente que investiga antes de agir?" | A ponte com determinístico-primeiro: o agente também precisa de regra de parada e de penalidade de hiper-resolução. |
| **P4 — Leitor de passagem (LinkedIn)** | um link e 90 segundos | O bloco "Em síntese", a rosácea das seis incertezas e a curva de parada. |

## 4. Objetivos verificáveis

| ID | Objetivo | Como se verifica |
| :-- | :-- | :-- |
| OBJ-1 | O visitante entende a tese sem ler o artigo inteiro | Bloco "Em síntese" + V1 legíveis acima da dobra em 375 px, sem JS. |
| OBJ-2 | As seis dimensões de incerteza são distinguíveis, não uma lista decorativa | V2 (rosácea) com definição por dimensão, navegável por teclado. |
| OBJ-3 | A regra de parada é experimentável, não apenas enunciada | V4: slider de λ move o ponto de parada; números recalculados ao vivo. |
| OBJ-4 | O leitor sai sabendo **onde a tese falha** | Seção "Onde isto não se aplica" + os 8 critérios de falseabilidade com peso visual igual ao das contribuições. |
| OBJ-5 | Cita-se bem em answer engines | `TechArticle` + `FAQPage` + `DefinedTermSet` válidos; `public/formulacao-de-problemas.md`. |
| OBJ-6 | Passa no gate de casa | `npm run gate` verde: build, auditoria de grafo, axe sem `serious`/`critical`, sem scroll horizontal em 375 px. |

## 5. Escopo

**Dentro:** página única `src/formulacao-de-problemas.html`; folha `.fp-` dedicada; módulos JS em
`src/js/formulacao/`; sete visualizações autorais em SVG; entrada AEO em `scripts/seo/pages.mjs`;
OG gerado; card no `catalogo.html`; suíte Playwright + testes de invariante do modelo de parada;
cópia de procedência do artigo em `docs/references/`.

**Fora:** alteração do grafo `specs/ecosystem.nav.yaml` (exige bump de versão + aprovação humana —
ver ECOSYSTEM.md §"Fronteiras para agentes"); qualquer biblioteca de gráficos ou de fórmulas
(KaTeX/MathJax/D3) — ver ADR-eai-002 e o orçamento de performance; tradução para inglês;
transformar o artigo em ferramenta de cálculo real de EVSI.

## 6. Restrições herdadas

1. **Dark Tech obrigatório** (AGENTS.md). A exceção `.ap-*` vale só para `apresentacao`; aqui, não.
   Fundo `#0d1117`, azul de texto `#58a6ff`, gradiente `#007bff → #8a2be2` apenas decorativo.
2. **Zero dependência de terceiros no caminho crítico** (`scripts/perf-budget.mjs`). Fórmulas e
   gráficos são HTML/SVG/CSS escritos à mão.
3. **Conteúdo não pode depender de JavaScript.** JS só enriquece (revelação, slider, foco).
4. **Vocabulário de engenharia, não de marketing** (ECOSYSTEM.md §4.2 — verificado por
   `scripts/audit-site.mjs`).
5. **Honestidade epistêmica é requisito funcional**, não tom: nenhuma proposta original do artigo
   pode aparecer na página sem o selo que a marca como não validada.
