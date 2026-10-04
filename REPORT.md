# A11y Verification Report — mauricio-site (retrofit a11y-first)

Registro versionado da conformidade do site contra **WCAG 2.2 AA, perfil Standard** (protocolo `docs/a11y/A11Y.md`).
**Este relatório não declara o site "acessível".** Declara o que foi medido, por quem, e o que ninguém ainda verificou.

> Legenda: `[x]` verificado, evidência ao lado · `[!]` verificado e reprovado · `[~]` parcial, com o que falta · `[ ]` **não verificado**, com o motivo.
> Status geral é CONDICIONAL enquanto restar qualquer `[ ]` ou `[!]`.

---

## 📌 Contexto da Validação
- **Funcionalidade/Épico:** retrofit de acessibilidade do site inteiro — 42 páginas PT em `src/*.html` e 33 espelhos EN gerados em `src/en/*.html`. Fases 1–8 em `docs/specs/a11y-first/implementation-plan.md`.
- **Data do Teste:** 04/10/2026
- **Cobre a interface em:** branch `feat/a11y-first-fase7`, commit `c9d085c` (build de produção, `vite build`, servido por `vite preview`)
- **Versão do padrão:** 2.2.0
- **Status de Conformidade:** ⚠️ CONDICIONAL (Passa com Exceções)
  - Motivos: 7 páginas utilitárias em `EXCEPTIONS.md` (EXC-001…006, decisão do dono); checkpoints humanos pendentes (§3, §5); achados abertos da verificação independente (nota 3).
- **Independência da Verificação:** self-reported ⚠️ — o nível geral é o mais baixo que se aplica. Uma auditoria em contexto novo (subagente, ver abaixo) cobriu só o build em `cb060c6`; o build atual, com as correções feitas depois dela, não foi reauditado por ninguém além do autor.
  - *Quem verificou:* subagente do Claude Code em sessão nova sobre o repositório (não leu `docs/specs/a11y-first/`, `A11Y-DECISIONS.md`, `REPORT.md`, `tests/a11y/` nem o histórico git; escreveu as próprias sondas). Mesma família de modelo do autor — por isso não é verificação por agente de outro modelo. Relatório e sondas: `docs/specs/a11y-first/verificacao-independente-fase7.md`, `docs/specs/a11y-first/fase7-sondas/`.
  - *Limite:* as correções feitas **depois** dessa auditoria (commit `c9d085c`) foram verificadas apenas por testes escritos pelo autor (`tests/a11y/independent.spec.js`). O auditor não as reexecutou.
- **Gate estático (`verify-a11y.py`):** **FAIL (21 erros, 37 avisos)** — rodado em 04/10/2026.
  - Classificação dos erros (feita pelo auditor independente e conferida pelo autor): **18 falsos positivos** (16 `role="list"` deliberados em `engenharia-agentes-ia` + espelho EN, decisão em `A11Y-DECISIONS.md`; 2 `half-climbed-aria` em `eai-pilares.js` e `devin/components.js`, cujo padrão Tabs é completado por `src/js/a11y-tabs.js` — 14 tablists reproduzidas por teclado) e **3 violações reais**, todas em páginas de `EXCEPTIONS.md` (`admin-editor.html:50` `clickable-div`; `diagnostic.html` e `test-github.html` `placeholder-label`).
  - O gate está em `npm run gate` como **teto** (`scripts/a11y-static.mjs`, `tests/a11y/static-baseline.json`): o nº de erros só pode descer.

## 1. Verificação Técnica (Automated & Semantics)
- [~] **Axe-Core:** catraca `scripts/a11y-sweep.mjs` mede 75 páginas (PT+EN) com tags wcag2a/2aa/21a/21aa/22aa contra o build de produção; **toda página fora de `EXCEPTIONS.md` está com 0 ocorrências** nas métricas da catraca (axe, `<main>`, skip link, `<h1>` único, reflow 320, movimento reduzido). Dívida restante: 38 ocorrências, todas nas páginas excepcionadas (`tests/a11y/baseline.json`). **Ressalva:** o auditor independente reproduziu 54/75 páginas limpas no axe; as outras têm 58 nós dentro do player do YouTube (DOM de terceiro), 6 em páginas excepcionadas e 2 `frame-title` (corrigidos depois, ver nota 3). O axe não decide 2 447 nós de contraste "incomplete" (texto sobre gradiente/imagem/canvas): **não verificados**.
- [x] **Semântica HTML:** `<main id="conteudo">` + skip link nas páginas fora das exceções; `<dialog>` nativo no consentimento; botões nativos onde havia `div` clicável (exceto `admin-editor`, EXC-003). Evidência: auditor, item 2.
- [x] **Hierarquia de Títulos:** um `<h1>` por página e `lang` coerente (pt-BR nas raízes, en nos espelhos), medidos pela catraca e pelo auditor. Saltos de nível entre `h2…h6` **não** foram medidos.

## 2. Tab Order e Focus Management
- [x] **Indicador de Foco:** plugin Vite `a11y-focus-base` injeta anel `2px #58a6ff` (7,49:1 sobre `#0d1117`) com especificidade zero; `tests/a11y/focus-visible.spec.js` compara o pixel focado × desfocado em cada parada de Tab de 15 páginas (chromium). O auditor varreu 3 284 elementos focáveis em 75 páginas: nenhum sem indicador fora dos achados 1, 5 e 6, **corrigidos depois**. Firefox: só por estilo computado, sem pixel. Safari: **não verificado**.
- [x] **Navegação Lógica:** sem armadilha de foco nas 8 páginas percorridas por Tab (index, catalogo, engenharia-agentes-ia, devin, artifice, operacao-capital-cognitivo, curriculo, life3d). Ordem visual × ordem do DOM **não** comparada de forma sistemática.
- [~] **Foco Capturado (Modals/Overlays):** foco entra, Esc fecha e o foco volta ao gatilho no consentimento (`<dialog>`), no modal do currículo e nos diálogos do OCC (testes + auditor). **Aberto:** `life3d #intro` (`role=dialog aria-modal`) não gerencia o foco (nota 3, item 12).
- [x] **Foco não obscurecido (SC 2.4.11):** `<eco-nav>` sai da frente do foco; o banner de cookies reserva altura, usa `scroll-padding-bottom` **e** um `focusin` que rola pela sobreposição (achado 1 do auditor; o CI mostrou que só o `scroll-padding` não basta no Firefox, que não rola para foco já parcialmente visível). Coberto por `independent.spec.js` em chromium, firefox e webkit; revisado em 04/10/2026 após o commit `114f40f`.

## 3. Comportamento e Retorno de Tarefas
- [ ] **Screen Reader Test:** **não realizado.** Nenhum par leitor de tela + navegador foi usado. Árvore de acessibilidade só lida por `ariaSnapshot` do Playwright. **Quem deve executar:** pessoa com leitor de tela — **dono ainda não designado (Q5 sem resposta)**. Sugestão mínima: NVDA + Firefox e VoiceOver + Safari nas tarefas T1–T7 de `docs/specs/a11y-first/product-spec.md`.
  - Par(es) usado(s): nenhum · Quem executou e quando: ninguém · Cenários executados: nenhum.
- [ ] **Controle por Voz (SC 2.5.3):** **não verificado.** Nomes acessíveis não foram comparados com os rótulos visíveis em todos os controles. Quem deve: revisão manual ou Voice Control/Voice Access.
- [~] **Estados interativos inventariados:** *navegados por teste:* abas (14 tablists PT+EN, `widgets.spec.js`), quiz EAI, calibrador EAI, diálogos do OCC, consentimento (banner, modal, salvar), eco-nav (aberto/fechado/`data-away`), painel de evidências (fechado `inert`, aberto), modal do currículo, menu do celular (3 páginas, 375 px). *Lidos no código, não navegados:* simulador do OCC além de abrir/fechar, `terminal-evolutivo`, `life`/`life3d` (jogo), formulários das páginas excepcionadas. *Não verificado:* demais componentes sem estado dinâmico testado.
- [~] **Mudança de Status (`aria-live`):** regiões vivas existem (`#cc-live`, `role=status` no veredito do calibrador, `[data-quiz-fb]` `aria-live=polite`); **o que o leitor de tela de fato anuncia não foi ouvido.**
- [~] **Preenchimento de Formulários:** o site público quase não tem formulários; os 3 campos sem rótulo estão em `diagnostic.html` e `test-github.html` (EXC-001/002). Não verificado em `admin*.html` além do que está em EXC-003.

## 4. Percepção Visual e Compreensão
- [x] **Contraste de Texto & UI** (pares sólidos declarados; calculados com `tools/a11y/contrast-check.py` e conferidos por fórmula própria do auditor):

  | Par | Primeiro plano | Fundo | Razão | Piso | Resultado |
  | :--- | :--- | :--- | ---: | ---: | :--- |
  | texto corrido | #c9d1d9 | #0d1117 | 12,26:1 | 4.5:1 | ✅ |
  | texto secundário (muted) | #99a1af | #0d1117 | 7,27:1 | 4.5:1 | ✅ |
  | texto secundário (slate-400) | #94a3b8 | #0d1117 | 7,38:1 | 4.5:1 | ✅ |
  | links / acento / anel de foco | #58a6ff | #0d1117 | 7,49:1 | 4.5:1 | ✅ |
  | texto corrido em card | #c9d1d9 | #161b22 | 11,21:1 | 4.5:1 | ✅ |
  | muted em card | #99a1af | #161b22 | 6,65:1 | 4.5:1 | ✅ |
  | slate-400 em card | #94a3b8 | #161b22 | 6,75:1 | 4.5:1 | ✅ |
  | acento em card | #58a6ff | #161b22 | 6,85:1 | 4.5:1 | ✅ |
  | **referência reprovada** (`exemplopdi`, EXC-006) | #6a7282 | #0d1117 | 3,91:1 | 4.5:1 | ❌ |

  **Não coberto:** texto sobre gradiente, imagem ou canvas; a paleta própria de `apresentacao` (`.ap-*`, piso 7:1, ADR-ap-001) e as 7 cores categóricas da home (`--pf-l-*`, ADR-pf-001) têm testes próprios de token, **não** foram recomputadas aqui.
- [ ] **Redundância (cor não é o único sinal):** não verificado de forma sistemática (SC 1.4.1 foi tratado nos links de texto corrido; resto não auditado).
- [~] **Scale / Zoom:** reflow a 320 px (SC 1.4.10) medido em todas as 75 páginas: **só `exemplopdi` e `test-github` rolam na horizontal** (EXC). Nenhuma página bloqueia zoom (`user-scalable`/`maximum-scale`, SC 1.4.4). **Não medido:** texto a 200 % de fato, larguras entre 320 e 1280 px, paisagem.

## 5. Mídia Temporal e Movimento
- [ ] **Classificação / Alternativas (legendas, transcrição, audiodescrição):** **não verificadas.** Há vídeos do YouTube e NotebookLM e `vsl.mp4` (EXC-005); nenhum `<track>` nas páginas medidas; ninguém assistiu aos vídeos. Quem deve: autor/editor, com revisão humana (nunca saída bruta de máquina).
- [~] **Autoplay e Conteúdo em Movimento:** `vsl.html` declara `autoplay` (EXC-005, não corrigido). Canvas do hero de `proposta-engenharia-reversa` agora cai para 1 quadro estático sob `prefers-reduced-motion`; **para quem não ativa a preferência não há botão de pausar** (SC 2.2.2): decisão de design pendente, ver nota 3. 118 animações infinitas sem `reduce` em 32 páginas **não foram classificadas** (essenciais/decorativas, pausa).
- [x] **Movimento Reduzido:** com `reduce`, 0 animações CSS infinitas nas páginas fora das exceções (auditor) e catraca `motion:reduce` limpa fora de `admin`, `admin-editor`, `exemplopdi`. Rolagem suave (Lenis), parallax e GSAP: só diferença de pixel em 6 páginas — **parcial**.
- [ ] **Texto sobre Mídia:** não medido.

## 6. Carga Cognitiva e Fluxo
- N/A para a maior parte: o site é de leitura e navegação, sem autenticação nem limite de tempo públicos.
- [ ] **Espaçamento de texto (SC 1.4.12), conteúdo em hover/foco (1.4.13), arrastar (2.5.7), ajuda consistente (3.2.6), 1.3.4/1.3.5:** não escrevi sondas. Quem deve: revisão manual.
- [~] **Alvos (SC 2.5.8):** medidos em 8 páginas; a falha encontrada (`a.eai-chap__link`) foi corrigida. As outras 67 páginas: **não medidas** pelo auditor; a catraca mede alvos pelo axe `target-size`.

---
## 📝 Notas de Avaliação ou Bloqueios Conhecidos

- **Nota 1 — Verificação independente refutou parte do trabalho do autor.** O auditor em contexto novo achou 3 falhas de gravidade alta que a suíte do autor não via, porque o autor testava o que tinha consertado e o auditor testou o que o visitante faz: (1) banner de cookies fixo cobria 29/131 paradas de Tab em `index` (SC 2.4.11); (2) skip link e âncoras de `engenharia-agentes-ia` sem mover o foco por causa do scroll suave (SC 2.4.1); (3) botões de menu sem nome em 3 páginas no celular (SC 4.1.2); mais texto em português sem `lang` em páginas inglesas (SC 3.1.2). **Todos corrigidos e cobertos por `tests/a11y/independent.spec.js`.** Isso é evidência de que "catraca verde" não implica "acessível".
- **Nota 2 — Corrigido depois da auditoria** (commit `c9d085c`): achados 1–8 e 10 do auditor; `role="navigation"` redundante em `life.html`; EXC-007 encerrada; diagnóstico divergente de movimento em `admin*`/`exemplopdi` registrado em `EXCEPTIONS.md` (catraca conta 8/8/1 animações em execução; auditor contou 0 *animações CSS infinitas* — métodos diferentes, vale a mais severa).
- **Nota 3 — Abertos, sem correção nesta entrega:**
  - **F-18 (alta):** texto do consentimento e rótulos do `<eco-nav>` só em português; nos espelhos EN estão marcados `lang="pt-BR"` (mitiga SC 3.1.2, **não** traduz). Tradução exige revisão do texto jurídico pelo autor.
  - **SC 2.2.2:** o canvas decorativo de `proposta-engenharia-reversa` (e o jogo `life`) animam para quem não ativa `prefers-reduced-motion`, sem controle de pausa. Decisão de design do autor.
  - **`life3d #intro`:** `role=dialog aria-modal` sem gestão de foco nem fundo `inert` (baixa).
  - **`engenharia-confianca`:** tablist de maturidade sem aba `aria-selected="true"` ao carregar (baixa; teclado funciona).
  - **375 px:** 25 páginas têm regiões roláveis sinalizadas pelo axe (`scrollable-region-focusable`); em Chromium o Tab as alcança, **Safari não testado** (baixa-média).
  - **YouTube:** 58 nós de violação no DOM do player de terceiros em 18 páginas; o *facade* `eai-video` evita isso nas demais.
- **Nota 4 — Exceções aceitas:** `EXCEPTIONS.md` (EXC-001…006; EXC-007 encerrada). Dono e aprovador: Maurício Yokoyama Issei, 03/10/2026. Revisão **proposta** para 03/04/2027 (o autor ajusta). A catraca impede piora nessas páginas.
- **Nota 5 — Ambiente.** O gate completo de 3 navegadores (~50 min) não roda de forma confiável na máquina local (o servidor de desenvolvimento do Playwright cai); a confirmação dos 3 navegadores é o CI do PR. Resultado local desta entrega: Chromium 392/392 (suíte completa); `node:test` 194/194; catraca sem regressão (38 ocorrências, todas em exceções); `audit-site --strict` sem erros.
- **Nota 6 — O que falta para sair de CONDICIONAL:** (a) teste com leitor de tela real por quem for designado (Q5); (b) revisão humana de legendas/transcrição/audiodescrição; (c) decisão sobre F-18 e SC 2.2.2; (d) reauditoria independente **depois** das correções desta entrega, idealmente por outro modelo.
