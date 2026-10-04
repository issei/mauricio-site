---
id: A11Y-TEST-001
titulo: Estratégia de testes, evidências e rastreabilidade
versao: 0.1.0
status: rascunho — aguarda aprovação humana
data: 2026-10-03
relacionado: [accessibility-audit.md, implementation-plan.md, architecture.md, product-spec.md]
---

# Estratégia de testes

**Automatizado ≠ conformidade.** O axe cobre uma parte dos critérios; não julga `alt`, ordem de leitura, clareza do texto
nem se a tarefa faz sentido. Esta estratégia mede o que dá para medir, **não finge medir o resto**, e lista o resto.

## 1. Pirâmide

| Camada | Ferramenta (já no repo) | O que prova | O que **não** prova |
| :-- | :-- | :-- | :-- |
| Invariantes puros | `node --test tests/*.test.mjs` | tokens, razões de contraste (`contrast.mjs`), baseline que só desce | comportamento |
| Estático | sonda de HTML (skip, `<main>`, h1, `lang`) + `verify-a11y.py` **(se Q3)** | anti-padrões: `div` clicável, `tabindex>0`, `outline:none`, ARIA órfão | teclado real |
| axe de página inteira | `@axe-core/playwright`, tags `wcag2a/2aa/21a/21aa/22aa`, **build** | violações detectáveis por máquina nas SC cobertas (fração não quantificada aqui) | semântica de uso |
| Teclado e foco | Playwright | ordem de Tab, skip link, trap/restauração, Esc, atalhos | experiência com leitor de tela |
| Responsivo | Playwright 320 px / 200 % texto | reflow, sobreposição | legibilidade subjetiva |
| Movimento | `reducedMotion: 'reduce'` | ausência de animação não essencial mensurável | GSAP/rAF (limite da sonda) |
| **Humano** | NVDA+Firefox, VoiceOver+Safari, TalkBack | nomes, ordem, anúncios, mídia | — |

## 2. Mudanças no gate (G-01)

1. **Sweep único** `scripts/a11y-sweep.mjs` (script Node, não spec — ver `implementation-plan.md` Fase 1): itera as rotas do sitemap **do build**; tags incluem `wcag22aa`; falha em `serious|critical`; registra `moderate` no baseline.
2. **Ratchet:** `tests/a11y/baseline.json` = `{pagina: {regra: contagem}}`. Regras: contagem **medida ≤ baseline**; se **<**, o teste falha pedindo para regravar (assim a dívida só cai). Sem `skip`, sem `fixme`.
3. **Contra o build, não o dev server** — elimina o FOUC documentado em `axe.js` (e o `retries:1` deixa de mascarar).
4. Etapa nova no `quality-gate.mjs` **depois** do build; só `chromium` (o resto da suíte continua em 3 navegadores).
5. `expectNoSeriousA11yViolations` existente **permanece** para asserções escopadas em estado (modal aberto, painel aberto) — o sweep só vê o estado inicial.

## 3. Testes de tarefa (a medida principal)

| Tarefa | Spec | Passos verificados | Critério |
| :-- | :-- | :-- | :-- |
| T1 | `tasks.spec.js` | Tab#1 = skip link → Enter → foco em `<main>`; alcançar um artefato do Mapa só com teclado | ≤ 15 Tabs até o 1º artefato (limite a calibrar) |
| T2 | idem | achar e ativar o download do CV por teclado; nome do link informa formato | link com nome e tipo |
| T3 | idem | mídia: Tab, Enter/Espaço reproduz, `aria-pressed`/rótulo muda | botão com nome+estado |
| T4 | `tasks.spec.js` por widget | resolver quiz/simulador só por teclado; resultado em `aria-live`; erro com `aria-describedby` e foco no 1º erro | completa sem mouse |
| T5 | `reduced-motion.spec.js` | todos os beats alcançáveis com `reducedMotion` e com safe-mode (ACC-01 RG-10) | paridade de conteúdo |
| T6 | `eco-nav.spec.js` (existe) + foco | abrir, escolher, Esc, **foco volta ao gatilho** | foco restaurado |
| T7 | `consent.spec.js` | banner não rouba foco; modal: foco dentro, Tab não escapa, Esc fecha, foco volta; botões ≥ 44 px | todos |

## 4. Estados que precisam de teste explícito

Loading · vazio · erro · sucesso · sem JS (`no-js` já cobre 3 páginas; ampliar para `consent`) · falha de `cv.json` remoto ·
mídia indisponível · `reducedMotion` · 320 px · 200 % texto · `forced-colors` (Playwright `forcedColors: 'active'`) — este último **hoje sem cobertura** (D-03).

## 5. Validação humana (lista fechada — nada disso é "automatizável")

1. Leitura completa de T1, T3, T4, T7 com **NVDA+Firefox** e **VoiceOver+Safari**; conferir anúncios do modal e do resultado do quiz.
2. `alt` de cada imagem informativa (**ninguém inventa**): `terminal-evolutivo` (9 fotos), `index`, `curriculo`, `life*`.
3. Mídia: legenda, transcrição (os `.txt` homônimos dos `.m4a` em `public/` sugerem transcrição parcial — **conferir**), controle de volume, sem autoplay.
4. Clareza do texto de consentimento (LGPD) e dos erros dos quizzes.
5. Experiência com baixa visão a 200–400 % e alto contraste do SO.
6. Cognição: carga de memória nos simuladores; terminologia não explicada (feedback `no-ai-flourish`: explicar jargão como "CI").
7. Conflito de necessidades (modo escuro × fotofobia/baixa visão): registrar os dois grupos em `A11Y-DECISIONS.md`.

## 6. Verificação independente

`REPORT.md` declara **um** nível: `cross-agent` (outro agente/ferramenta reproduz) · `fresh-context` (mesma classe de agente, contexto novo, sem este plano) ·
`self-reported ⚠️`. Enquanto só o autor verificou, o status **não** é PASS definitivo.

## 7. Matriz de rastreabilidade

Intenção → requisito → UX → componente → código → teste → evidência.
"Evidência" hoje = **auditoria M/C** do baseline; passa a "teste verde + linha no `REPORT.md`" ao fim de cada fase.

| Req. | Tarefa | Componente | WCAG SC | Implementação (fase) | Teste | Evidência (hoje) |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| R-01 Modal gerencia foco | T7 | `cookie-consent.js` | 2.4.3, 2.1.2, 4.1.2 | F3 | `consent.spec.js` | F-01 (C) |
| R-02 Alvo de consentimento ≥ 24 (44) px | T7, T1 | `.cc-btn-*` | 2.5.8 | F3 | sweep (`target-size`) | F-10 (M) |
| R-03 Contraste de texto ≥ 4,5:1 | T1–T3 | tokens de texto | 1.4.3 | F2 | sweep + `contrast.mjs` | F-04 (M) |
| R-04 Mídia com nome e estado | T3 | botão de mídia | 4.1.2, 1.1.1 | F4 | `tasks.spec.js` | F-02 (M) |
| R-05 Campo com rótulo | T8 | `diagnostic`, `test-github` | 1.3.1, 3.3.2, 4.1.2 | F4 / D-06 | sweep | F-03 (M) |
| R-06 Contornar blocos + landmark | T1, T3, T6 | skip link, `<main>` | 2.4.1, 1.3.1 | F4 | sonda estática | F-09 (M) |
| R-07 Link ≠ só cor | T3, T4 | links em corpo | 1.4.1 | F4 | sweep (`link-in-text-block`) | F-11 (M) |
| R-08 Zoom permitido | T5 | `life*` | 1.4.4 | F5 | sweep (`meta-viewport`) | F-05 (M) |
| R-09 Reflow a 320 px | T1–T6 | por página | 1.4.10 | F5 | `reflow.spec.js` | F-06 (M) |
| R-10 ARIA válido | T5 | `life3d` | 4.1.2 | F5 | sweep (`aria-prohibited-attr`) | F-07 (M) |
| R-11 Movimento reduzido | T5 | GSAP/CSS | 2.2.2, 2.3.3 (HR) | F5 | `reduced-motion.spec.js` | F-08 (M, piso) |
| R-12 Região rolável focável | T3 | `<pre>` | 2.1.1 | F5 | sweep | F-12 (M) |
| R-13 Widgets completáveis por teclado | T4 | EAI | 2.1.1, 3.3.1, 4.1.3 | F6 | `tasks.spec.js` | **?** (não auditado por tarefa) |
| R-14 Gate enxerga WCAG 2.2 em todas as páginas | todas | `quality-gate` | — | F1 | sweep + ratchet | G-01 (C+M) |
| R-15 Equivalente para mídia | T3, T5 | `<video>/<audio>` | 1.2.x | F8 + humano | checklist humano | **?** |

## 8. Static gate do A11Y.md

| Item | Estado hoje |
| :-- | :-- |
| `tools/verify-a11y.py` | **NOT RUN** (aguarda Q3; não executo código de terceiro sem autorização) |
| `contrast-check.py` | NOT RUN (idem); substituível por `tests/_helpers/contrast.mjs` já existente |
| axe (varredura própria desta auditoria) | **executado** 2026-10-03, 41 páginas, build de produção — resultado em `accessibility-audit.md` |
