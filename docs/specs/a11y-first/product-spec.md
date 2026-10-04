---
id: A11Y-PROD-001
titulo: Definição de produto — mauricio.issei.com.br sob o protocolo A11Y.md
versao: 0.1.0
status: rascunho — aguarda aprovação humana
data: 2026-10-03
relacionado: [accessibility-audit.md, ux-spec.md, architecture.md, implementation-plan.md, testing-strategy.md, A11Y-DECISIONS.md]
---

# Definição de produto

> **Premissa de escopo (confirmar — pergunta Q1).** O repositório já é um site em produção (41 páginas PT-BR +
> 32 gêmeas EN). Tratei o pedido como **retrofit accessibility-first**: o protocolo vira contexto persistente e
> as barreiras medidas são removidas. **Não** propus um site novo nem rotas novas. As seções de "site inexistente"
> do meta-prompt (§25) não se aplicam.

## 1. Problema

Um profissional sênior (Tech Lead / análise de sistemas, Salesforce, IA agêntica) precisa **provar competência
por artefatos verificáveis** — currículo, propostas, métodos, demos interativas — para quem decide contratar ou
comprar. Se uma barreira de acessibilidade impede alguém de ler a prova ou usar a demo, a função do site está
**tecnicamente quebrada** (A11Y.md §1) — e o site, que ensina "engenharia de confiança", contradiria a si mesmo.

## 2. Usuários

| Perfil | Quer | Necessidades de acesso relevantes |
| :-- | :-- | :-- |
| **P1 Recrutador / gestor** | avaliar em minutos; baixar o CV | teclado e leitor de tela; mobile; pressa (carga cognitiva baixa) |
| **P2 Cliente corporativo** | ler uma proposta/caso e decidir | impressão/zoom; tabelas e diagramas com equivalente textual; vídeo/áudio com legenda |
| **P3 Par técnico / aprendiz** | entender um método e **usar** quiz/simulador | teclado puro; leitor de tela em widgets; foco e estado anunciados |
| **P4 Agente de IA** | ler o site de forma estruturada | HTML semântico, `.md` gêmeo, `llms.txt`, WebMCP — **a mesma semântica que serve ao P3** |
| **P5 Mantenedor (o próprio autor)** | editar CV pelo `admin` | fora do escopo público (D-06) |

Necessidades transversais (não são "um segmento"): teclado/switch · leitor de tela · baixa visão e zoom 200–400 % ·
daltonismo · fotossensibilidade e cinetose (`ACC-01`) · cognição/TDAH · toque numa só mão · surdez (áudio/vídeo; Libras
é recomendação `guide-sign-language-br.md`, **decisão D-07**).

## 3. Tarefas críticas

Formato: Tarefa → Entrada → Decisões → Interações → Feedback → Resultado.

| ID | Tarefa | Entrada | Decisões | Interações | Feedback | Resultado esperado |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| **T1** | Entender quem é e achar prova | `/` | qual linha da carreira abrir | percorrer o "Mapa de Linhas"; abrir fonte | foco visível; links com destino claro | chega a um artefato sem mouse em ≤ 2 min |
| **T2** | Ver/baixar currículo | `/curriculo.html` | ver na página ou PDF | rolar; baixar | nome do arquivo e formato anunciados | PDF obtido; seções navegáveis por heading |
| **T3** | Ler uma proposta/caso | `/proposta.html`, `/devops-salesforce.html`… | continuar ou sair | ler; abrir mídia | mídia com nome e estado | entende a oferta; contato localizado |
| **T4** | Usar página interativa | `/engenharia-agentes-ia.html`, `/operacao-capital-cognitivo.html`, `/formulacao-de-problemas.html` | responder; reiniciar | quiz, simulador, playground, árvore | resultado e erro **anunciados**; reset claro | completa o exercício só com teclado |
| **T5** | Percorrer a jornada | `/terminal-evolutivo.html`, `/life.html`, `/life3d.html` | entrar no modo imersivo ou ler a versão linear | rolar/andar | progresso anunciado; modo seguro | lê **todos os beats** em qualquer combinação de flags (ACC-01 RG-10) |
| **T6** | Navegar o ecossistema | `<eco-nav>`, `/catalogo.html` | qual pilar | abrir painel; escolher nó | `aria-expanded`/`aria-current` | chega ao nó; foco volta ao gatilho |
| **T7** | Decidir sobre cookies | banner → modal | aceitar/recusar/personalizar | botões; toggles | decisão confirmada; foco devolvido | escolha gravada **sem** perder a posição na página |
| **T8** | Editar CV (P5) | `/admin.html` | — | formulário | — | fora do escopo público |

Caminhos de erro/abandono relevantes: sem JavaScript (`*.nojs.spec.js` já existem para 3 páginas); falha de
`cv.json` remoto → fallback local; estado vazio de listas geradas; mídia indisponível → texto equivalente.

## 4. Métrica de sucesso

A métrica **não é** "a página parece acessível". É: **o usuário completa T1–T7 de forma autônoma**, por teclado e por
leitor de tela, em 320 px e a 200 % de texto.

| Indicador | Meta Standard | Como medir |
| :-- | :-- | :-- |
| Tarefas T1–T7 completáveis só por teclado | 7/7 | specs de tarefa (`testing-strategy.md` §3) |
| Violações axe `serious/critical` (WCAG 2.2 AA), 41 págs, build | 0 | `a11y-sweep` com ratchet |
| Págs. com rolagem horizontal a 320 px | 0 (exceto 2D contido) | sonda de reflow |
| Págs. com skip link + `<main>` | 41/41 públicas | sonda estática |
| Verificação **independente** do que é "não humano" | cross-agent ou fresh-context | `REPORT.md` |
| Checkpoints humanos executados | listados e datados | `REPORT.md` |

## 5. Alegação de conformidade — o que será e o que não será dito

- **Alvo:** WCAG 2.2 AA, Compliance Profile **Standard** (4,5:1 / 3:1 · alvo 24 px mín., 44 px House Rule · fonte ≥ 12 px).
- **Não será dito** "100 % acessível" nem "certificado". O `REPORT.md` declarará `Static gate`, nível de independência
  e a lista do que ficou para validação humana.
- **Distinção que o texto sempre mantém:** *requisito WCAG* ≠ *House Rule do A11Y.md* (44 px, 14 px, 80 ch, foco 2 px) ≠
  *decisão de produto/UX* ≠ *hipótese*. Quem decidir cortar uma House Rule registra em `A11Y-DECISIONS.md`; quem aceitar
  violar uma SC registra em `EXCEPTIONS.md` com dono, aprovador, issue e validade.

## 6. Fora de escopo (e por quê)

- Redesenho visual: o Dark Tech é identidade (AGENTS.md). Acessibilidade se resolve **dentro** dele (ver `ux-spec.md` §4).
- Tema claro: **não** é requisito WCAG; ver D-03.
- Reescrita de conteúdo editorial: só onde bloqueia tarefa; `tone-reviewer` continua dono do tom.
- Páginas `admin*`, `diagnostic`, `test-github`, `mapmind`, `vsl`, `exemplopdi`: dependem de D-06 antes de qualquer correção.
