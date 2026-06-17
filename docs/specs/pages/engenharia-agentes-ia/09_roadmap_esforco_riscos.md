# 09 — Roadmap, Esforço, Riscos e Recomendações

> Cobre os entregáveis **17 (Roadmap MVP→V1→V2)**, **18 (Estimativa qualitativa de esforço)**,
> **19 (Riscos do projeto)** e **20 (Recomendações finais)** — além da **matriz técnica consolidada**
> por funcionalidade.

---

## 1. Estratégia de faseamento (princípio)

> O roadmap **pratica a tese do site**: entregar a menor coisa que gera valor, faseado e
> conscientemente escopado (espelha o "infra-as-little-as-possible" e o WIP just-in-time do guia).
> Features pesadas (Playground drag-drop, BPMN editável, WebGL) entram **só quando o valor justifica**
> — não por serem impressionantes.

Eixo de priorização: **valor pedagógico ÷ esforço**, com o conteúdo (trilha + visualizações SVG) na
frente porque entrega o aprendizado central com a menor complexidade.

---

## 2. Roadmap incremental

### MVP — "A tese, ensinável" (entrega o aprendizado central)

**Objetivo:** o usuário entende os 10 princípios por leitura + visualizações manipuláveis e a trilha
guiada. Serve 5 das 6 personas em algum grau; serve totalmente o executivo e o PM.

- Página `src/engenharia-agentes-ia.html` (long-scroll, seções ancoradas, Tailwind + `<style>`).
- **Home** com Hero caos×disciplina (AN-11) + escolha de caminho (3 modos).
- **Introdução** + **Princípios** (grade de 10 cards-hub).
- **Jornada Guiada** completa (10 capítulos, gates, progresso em `localStorage`).
- **Visualizações SVG/CSS+GSAP:** V10, V1, V2, V3, V4 (e V5/V6 se couber) — as de maior valor e menor
  custo.
- **Tema claro/escuro** + acessibilidade AA + reduced-motion + equivalentes textuais.
- **Casos Reais** em versão estática (DAG SocialSelling com badges de princípio).
- **Governança Agent-Driven** (doc 10) em masonry estático: 5 dictionary-cards, árvore de
  diretórios, Regra de Ouro, alerta financeiro e comparativo Meta-Prompt × Manual (conteúdo + SVG,
  sem libs pesadas → cabe no MVP).
- **Referência** (glossário, 10 princípios, fontes).
- Métricas client-side básicas (funil de capítulo, conclusão).

### V1 — "Exploração e profundidade" (serve arquiteto e estudante)

- **Simulador de arquitetura** completo (parâmetros → 6 medidores, cenários, alertas).
- **Visualizações pesadas:** V7 (ledger+ondas, Canvas+D3), V8 (BDD), V9 (desmontagem XAI), V11.
- **BPMN read-only** na seção Padrões: fluxos corretos × problemáticos com overlays/hotspots +
  **edição guiada** (toggles pré-definidos — [05 §6.1](05_bpmn_diagramas_executaveis.md)).
- Busca (Cmd/Ctrl-K) e deep-links princípio↔seção refinados.
- Conteúdo avançado opcional (`[V1+]`: matemática MathML, menção a Jøsang).
- Métricas: dificuldade por capítulo, uso de ferramentas, modo de entrada; dashboard interno.

### V2 — "Criação e maestria" (capstone real)

- **Playground** drag-and-drop (Cytoscape.js) com motor de regras + feedback XAI + 3 modos de
  desafio, incluindo o **capstone do Cap. 10**.
- **BPMN editável livre** (`Modeler` + analisador determinístico — [05 §6.2](05_bpmn_diagramas_executaveis.md)).
- Promoção de Simulador/Playground a **páginas próprias com lazy-load** se o peso justificar.
- (Opcional, só se um conceito 3D provar valor) experimento WebGL pontual.

> **Gate entre fases (fail-closed).** Não começar V1 sem o MVP com acessibilidade AA verde e métricas
> de funil rodando — os dados do MVP informam o que priorizar na V1 (ex.: se ninguém usa uma
> visualização, ela não vira prioridade).

---

## 3. Estimativa qualitativa de esforço (T-shirt sizing)

Sem números de horas (proibido fingir precisão); relativo, por entregável.

| Entregável | Esforço | Notas |
| :-- | :-- | :-- |
| Setup página + design system (tokens, componentes base) | **M** | reaproveita STYLE_GUIDE/Tailwind do site |
| Home + Hero (AN-11) | **M-G** | primeira impressão; storyboard animado |
| Introdução + Princípios (hub) | **P-M** | conteúdo + cards |
| Jornada (estrutura, gates, progresso) | **M** | engine de trilha + `localStorage` |
| Conteúdo dos 10 capítulos (redação) | **M-G** | maior parte vem do guia-fonte (reuso) |
| Motor de DAG SVG reutilizável (V1/V8/V11) | **M** | base compartilhada — investir uma vez |
| Visualizações SVG (V2,V3,V4,V5,V6) | **M** cada conjunto | GSAP + a11y |
| Visualizações pesadas (V7 Canvas+D3, V9 XAI) | **G** | volume/timeline |
| Simulador (modelo + UI) | **M** | lógica é tabela + função pura |
| BPMN read-only + overlays | **M-G** | curva bpmn-js |
| BPMN editável + analisador | **G** | análise de grafo arbitrário |
| Playground (Cytoscape + motor de regras) | **G** | DnD + grafo + feedback localizado |
| Acessibilidade AA (transversal) | **M** | contínuo, não fase isolada |
| Métricas + dashboard | **P-M** | client-side |

Legenda: **P** pequeno · **M** médio · **G** grande.

**Sequência de maior alavancagem:** design system → trilha + conteúdo → motor SVG → visualizações MVP
→ Simulador → BPMN → Playground.

---

## 4. Riscos do projeto e mitigação

| # | Risco | Prob. | Impacto | Mitigação |
| :-: | :-- | :-- | :-- | :-- |
| R1 | **Escopo explode** (querer tudo no MVP) | Alta | Alto | Faseamento estrito; gate fail-closed entre fases; MVP só com SVG/CSS |
| R2 | **Animação vira enfeite** que não ensina | Média | Médio | Regra "toda animação ensina" (07); revisão pedagógica por animação |
| R3 | **Peso/performance** (GSAP, D3, bpmn, Cytoscape) | Média | Alto | Lazy-load por seção; SVG-first; orçamento de performance/LCP; medir |
| R4 | **Acessibilidade do DnD/Canvas/BPMN** | Alta | Alto | Alternativa por teclado desde o design; equivalentes textuais; QA com leitor de tela |
| R5 | **Motor de avaliação dá falso +/−** | Média | Médio | Regras como funções puras **com testes** (dogfooding BDD); começar pelo modo "conserte" (curado) |
| R6 | **Abandono na trilha** | Média | Médio | Sessões curtas; "continue de onde parou"; métricas de funil para ajustar |
| R7 | **Conteúdo "marketing" sem profundidade** afasta arquiteto/estudante | Média | Alto | Casos Reais + Simulador + material `[V1+]`; rastreabilidade ao guia |
| R8 | **Modelo do simulador parece arbitrário** | Média | Médio | Documentar direções (06 §1.4); rotular como didático calibrável; manter determinístico |
| R9 | **Divergência da identidade do site** (modo claro) | Baixa | Médio | Ancorar no STYLE_GUIDE; claro é derivação com AA; revisão de design |
| R10 | **Manutenção** (10 princípios em 4 lugares cada) | Média | Médio | Regra de consistência [01 §5](01_arquitetura_informacao_e_sitemap.md); fonte única de conteúdo por princípio |

---

## 5. Matriz técnica consolidada (por funcionalidade)

Visão única do que cada feature exige (detalhe inline nos docs 04/05/06/07).

| Funcionalidade | Objetivo | Componentes-chave | Tecnologias | Complex. | Risco principal | Fase |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Home/Hero | enunciar a tese | `eai-viz-panel`, `quote-impact` | SVG+GSAP+ScrollTrigger | M-A | R3 peso/LCP | MVP |
| Trilha guiada | aprendizado cumulativo | trilha, capítulo, quiz | HTML/JS+`localStorage` | M | R6 abandono | MVP |
| Visualizações SVG | manipular conceitos | `eai-viz-panel` | SVG+GSAP | M | R2/R4 | MVP |
| Visualizações pesadas | volume/timeline | `eai-viz-panel` | Canvas+D3 | G | R3/R4 | V1 |
| Simulador | sentir trade-offs | sliders, meters | JS puro + tabela de efeitos | M | R8 | V1 |
| BPMN read-only | processos corretos×caos | `eai-viz-panel` (BPMN) | bpmn-js Viewer + overlays | M-G | R3/R4 | V1 |
| BPMN editável | alterar e ver consequência | Modeler + analisador | bpmn-js Modeler + bpmn-moddle | G | R4/R5 | V2 |
| Playground | criar e avaliar arquitetura | canvas, paleta, motor de regras | Cytoscape.js + JS puro | G | R4/R5 | V2 |
| Acessibilidade | equivalência funcional | transversal | ARIA, teclado, reduced-motion | M | R4 | todas |
| Métricas | melhorar com dados | `eai-track` | analytics client-side | P-M | privacidade | MVP+ |
| Governança Agent-Driven (doc 10) | estruturar repositório To-Be | masonry, dictionary-card, dir-tree, banner | HTML/Tailwind+SVG | M | R10 manutenção | MVP |

---

## 6. Recomendações finais

1. **Comece pelo conteúdo, não pela tecnologia.** A trilha + visualizações SVG já entregam o
   aprendizado central. Tudo além é amplificação. (É a própria tese: pouca "mágica" no caminho
   crítico.)
2. **Construa o motor de DAG em SVG uma vez** e reuse em V1/V8/V11 — maior alavancagem de esforço da
   camada visual.
3. **Trate o motor de regras (Playground/BPMN) como código de produção:** funções puras,
   determinísticas, **com testes** — o site deve passar nos próprios princípios (dogfooding visível).
4. **Acessibilidade é requisito de DoD, não fase final.** O DnD acessível por teclado e os
   equivalentes textuais precisam nascer com cada componente.
5. **Meça antes de expandir.** O funil do MVP decide o que vale construir na V1/V2; corte
   visualizações que ninguém usa (honestidade Open-World aplicada ao produto).
6. **Mantenha a identidade do portfólio.** Dark-tech como base, claro como derivação AA — não uma
   segunda marca.
7. **Torne o dogfooding explícito.** Uma faixa "este site usa os princípios que ensina" fecha o ciclo
   pedagógico e é prova de credibilidade para arquiteto e executivo.
8. **Faseie como o guia ensina:** escopo fechado por fase, gate fail-closed, WIP de especificação
   just-in-time (não detalhar V2 antes de validar o MVP — "DoR antecipado é investimento perecível").

> **Fecho.** A maior validação possível deste produto é ele **ser** um exemplo dos seus próprios
> princípios: determinístico, contratual, honesto sobre o que não sabe, faseado e explicável. Se a
> equipe construir o site assim, o site ensina duas vezes — pelo conteúdo e pelo exemplo.

---

### Referências cruzadas

- Visualizações e tecnologias → [04](04_visualizacoes_interativas.md)
- BPMN (fases read-only → editável) → [05](05_bpmn_diagramas_executaveis.md)
- Simulador e Playground → [06](06_simulador_e_playground.md)
- Acessibilidade (gate de DoD) → [08](08_acessibilidade_e_metricas.md)
