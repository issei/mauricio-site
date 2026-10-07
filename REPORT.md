# A11y Verification Report — mauricio-site (retrofit a11y-first)

Registro versionado da conformidade do site contra **WCAG 2.2 AA, perfil Standard** (protocolo `docs/a11y/A11Y.md`).
**Este relatório não declara o site "acessível".** Declara o que foi medido, por quem, e o que ninguém ainda verificou.

> Legenda: `[x]` verificado, evidência ao lado · `[!]` verificado e reprovado · `[~]` parcial, com o que falta · `[ ]` **não verificado**, com o motivo.
> Status geral é CONDICIONAL enquanto restar qualquer `[ ]` ou `[!]`.

---

## 📌 Contexto da Validação
- **Funcionalidade/Épico:** retrofit de acessibilidade do site inteiro — 43 páginas PT em `src/*.html` e 34 espelhos EN gerados em `src/en/*.html`. Fases 1–8 em `docs/specs/a11y-first/implementation-plan.md`.
- **Data do Teste:** 04/10/2026; **revisado em 05/10/2026** pela auditoria v2 (`docs/specs/a11y-first/auditoria-v2.md`); **revisado em 07/10/2026** com a página nova `/acessibilidade` (nota 8)
- **Cobre a interface em:** branch `feat/acessibilidade-case` sobre `main @ da61b0a` (build de produção, `vite build`, servido por `vite preview`)
- **Versão do padrão:** 2.2.0
- **Status de Conformidade:** ⚠️ CONDICIONAL (Passa com Exceções)
  - Motivos: 7 páginas utilitárias em `EXCEPTIONS.md` (EXC-001…006, 008, decisão do dono); checkpoints humanos pendentes (§3, §5); achados abertos da verificação independente (nota 3) e da auditoria v2 (nota 7).
- **Independência da Verificação:** self-reported ⚠️ — o nível geral é o mais baixo que se aplica. Uma auditoria em contexto novo (subagente, ver abaixo) cobriu só o build em `cb060c6`; o build atual, com as correções feitas depois dela, não foi reauditado por ninguém além do autor.
  - *Quem verificou:* subagente do Claude Code em sessão nova sobre o repositório (não leu `docs/specs/a11y-first/`, `A11Y-DECISIONS.md`, `REPORT.md`, `tests/a11y/` nem o histórico git; escreveu as próprias sondas). Mesma família de modelo do autor — por isso não é verificação por agente de outro modelo. Relatório e sondas: `docs/specs/a11y-first/verificacao-independente-fase7.md`, `docs/specs/a11y-first/fase7-sondas/`.
  - *Limite:* as correções feitas **depois** dessa auditoria (commit `c9d085c`) foram verificadas apenas por testes escritos pelo autor (`tests/a11y/independent.spec.js`). O auditor não as reexecutou.
- **Gate estático (`verify-a11y.py`):** **FAIL (21 erros, 37 avisos)** — rodado em 04/10/2026; mesma contagem em 07/10/2026 com a página `/acessibilidade` (ela não acrescenta erro nem aviso).
  - Classificação dos erros (feita pelo auditor independente e conferida pelo autor): **18 falsos positivos** (16 `role="list"` deliberados em `engenharia-agentes-ia` + espelho EN, decisão em `A11Y-DECISIONS.md`; 2 `half-climbed-aria` em `eai-pilares.js` e `devin/components.js`, cujo padrão Tabs é completado por `src/js/a11y-tabs.js` — 14 tablists reproduzidas por teclado) e **3 violações reais**, todas em páginas de `EXCEPTIONS.md` (`admin-editor.html:50` `clickable-div`; `diagnostic.html` e `test-github.html` `placeholder-label`).
  - O gate está em `npm run gate` como **teto** (`scripts/a11y-static.mjs`, `tests/a11y/static-baseline.json`): o nº de erros só pode descer.

## 1. Verificação Técnica (Automated & Semantics)
- [~] **Axe-Core:** catraca `scripts/a11y-sweep.mjs` mede 77 páginas (PT+EN; 75 até a auditoria v2) com tags wcag2a/2aa/21a/21aa/22aa contra o build de produção (desde a auditoria v2 também regras *best-practice* do axe como `bp:*`, recorte sob espaçamento de texto `spacing:clip` e texto invisível sem JS `nojs:hidden`; página divergente é medida de novo, sozinha, antes de falhar); **toda página fora de `EXCEPTIONS.md` está com 0 ocorrências** nas métricas da catraca (axe, `<main>`, skip link, `<h1>` único, reflow 320, movimento reduzido). Dívida restante: 38 ocorrências, todas nas páginas excepcionadas (`tests/a11y/baseline.json`). **Ressalva:** o auditor independente reproduziu 54/75 páginas limpas no axe; as outras têm 58 nós dentro do player do YouTube (DOM de terceiro), 6 em páginas excepcionadas e 2 `frame-title` (corrigidos depois, ver nota 3). O axe não decide 2 447 nós de contraste "incomplete" (texto sobre gradiente/imagem/canvas): **não verificados**.
- [x] **Semântica HTML:** `<main id="conteudo">` + skip link nas páginas fora das exceções; `<dialog>` nativo no consentimento; botões nativos onde havia `div` clicável (exceto `admin-editor`, EXC-003). Evidência: auditor, item 2.
- [x] **Hierarquia de Títulos:** um `<h1>` por página e `lang` coerente (pt-BR nas raízes, en nos espelhos), medidos pela catraca e pelo auditor. Saltos de nível entre `h2…h6` **não** foram medidos.

## 2. Tab Order e Focus Management
- [x] **Indicador de Foco:** plugin Vite `a11y-focus-base` injeta anel `2px #58a6ff` (7,49:1 sobre `#0d1117`) com especificidade zero; `tests/a11y/focus-visible.spec.js` compara o pixel focado × desfocado em cada parada de Tab de 15 páginas (chromium). O auditor varreu 3 284 elementos focáveis em 75 páginas: nenhum sem indicador fora dos achados 1, 5 e 6, **corrigidos depois**. Firefox: só por estilo computado, sem pixel. Safari: **não verificado**.
- [x] **Navegação Lógica:** sem armadilha de foco nas 8 páginas percorridas por Tab (index, catalogo, engenharia-agentes-ia, devin, artifice, operacao-capital-cognitivo, curriculo, life3d). Ordem visual × ordem do DOM **não** comparada de forma sistemática.
- [~] **Foco Capturado (Modals/Overlays):** foco entra, Esc fecha e o foco volta ao gatilho no consentimento (`<dialog>`), no modal do currículo e nos diálogos do OCC (testes + auditor). **Aberto:** `life3d #intro` (`role=dialog aria-modal`) não gerencia o foco (nota 3, item 12).
- [x] **Foco não obscurecido (SC 2.4.11):** `<eco-nav>` sai da frente do foco; o banner de cookies reserva altura, usa `scroll-padding-bottom` **e** um `focusin` que rola pela sobreposição (achado 1 do auditor; o CI mostrou que só o `scroll-padding` não basta no Firefox, que não rola para foco já parcialmente visível). Coberto por `independent.spec.js` em chromium, firefox e webkit; revisado em 04/10/2026 após o commit `114f40f`.
  - **Auditoria v2 (05/10/2026):** o item estava `[x]` só para o rodapé. Voltando com Shift+Tab, o foco ficava **inteiro** sob o cabeçalho fixo em `curriculo`, `service-operations-2-0`, `index`, `apresentacao` e `proposta-engenharia-reversa` (AV2-05, capturas e teste). Corrigido com `scroll-padding-top:6rem` de especificidade zero no plugin `a11y-focus-base` (28 páginas têm cabeçalho fixo). Regressão: `independent.spec.js` (Shift+Tab em 6 páginas), que falha em 5 delas sem a correção. Chromium e Firefox locais; WebKit pula (Safari não tabula links).

## 3. Comportamento e Retorno de Tarefas
- [ ] **Screen Reader Test:** **não realizado.** Nenhum par leitor de tela + navegador foi usado. Árvore de acessibilidade só lida por `ariaSnapshot` do Playwright. **Quem deve executar:** pessoa com leitor de tela — **dono ainda não designado (Q5 sem resposta)**. Sugestão mínima: NVDA + Firefox e VoiceOver + Safari nas tarefas T1–T7 de `docs/specs/a11y-first/product-spec.md`.
  - Par(es) usado(s): nenhum · Quem executou e quando: ninguém · Cenários executados: nenhum.
- [~] **Controle por Voz (SC 2.5.3):** *rótulo no nome* verificado por teste em todas as 75 páginas (`tests/a11y/label-in-name.spec.js`, inclui o shadow DOM do `eco-nav`) depois que um scanner externo apontou 2 falhas (link da Alura e botão do `eco-nav`) e a sonda revelou 60 divergências em 46 páginas; corrigidas em 04/10/2026. **Não verificado:** uso real de Voice Control/Voice Access/Dragon, e controles sem `aria-label` cujo nome vem de `aria-labelledby` ou `title`. Quem deve: pessoa com a ferramenta.
- [~] **Estados interativos inventariados:** *navegados por teste:* abas (14 tablists PT+EN, `widgets.spec.js`), quiz EAI, calibrador EAI, diálogos do OCC, **montagem da fração do OCC (cap. 3) só por teclado** (auditoria v2, AV2-01: antes era impossível sem mouse e travava os capítulos 4–6; `tasks.spec.js`), tooltips da `artifice` (Esc dispensa, AV2-06), consentimento (banner, modal, salvar), eco-nav (aberto/fechado/`data-away`), painel de evidências (fechado `inert`, aberto), modal do currículo, menu do celular (3 páginas, 375 px). *Lidos no código, não navegados:* simulador do OCC além de abrir/fechar, `terminal-evolutivo`, `life`/`life3d` (jogo), formulários das páginas excepcionadas. *Não verificado:* demais componentes sem estado dinâmico testado.
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
- [x] **Espaçamento de texto (SC 1.4.12):** sonda nas 75 páginas (auditoria v2); a única falha (`devin #calculadora`, caixa "RESULTADO" cortada) foi corrigida e a métrica `spacing:clip` entrou na catraca (0 em todas).
- [~] **Conteúdo em hover/foco (SC 1.4.13):** o único tooltip próprio do site (`artifice`) não fechava com Esc e punha a citação no nome do botão; corrigido e coberto por `widgets.spec.js` nos 3 navegadores. Regras CSS "só em `:hover`" varridas: a única em uso (`sustentacao`, rótulo redundante sobre o infográfico) não esconde informação. Tooltips nativos (`title`) não auditados.
- [x] **Arrastar (SC 2.5.7):** o único arrasto (OCC cap. 3) tem alternativa de ponteiro único (selecionar e clicar), confirmada por sonda.
- [x] **Orientação (SC 1.3.4):** 0 `@media (orientation)` em folhas same-origin e 0 `orientation.lock` no código. **1.3.5:** N/A (nenhum campo público pede dado pessoal).
- [ ] **Ajuda consistente (SC 3.2.6):** não verificado. Quem deve: revisão manual.
- [~] **Alvos (SC 2.5.8):** medidos em 8 páginas; a falha encontrada (`a.eai-chap__link`) foi corrigida. As outras 67 páginas: **não medidas** pelo auditor; a catraca mede alvos pelo axe `target-size`.

---
## 📝 Notas de Avaliação ou Bloqueios Conhecidos

- **Nota 1 — Verificação independente refutou parte do trabalho do autor.** O auditor em contexto novo achou 3 falhas de gravidade alta que a suíte do autor não via, porque o autor testava o que tinha consertado e o auditor testou o que o visitante faz: (1) banner de cookies fixo cobria 29/131 paradas de Tab em `index` (SC 2.4.11); (2) skip link e âncoras de `engenharia-agentes-ia` sem mover o foco por causa do scroll suave (SC 2.4.1); (3) botões de menu sem nome em 3 páginas no celular (SC 4.1.2); mais texto em português sem `lang` em páginas inglesas (SC 3.1.2). **Todos corrigidos e cobertos por `tests/a11y/independent.spec.js`.** Isso é evidência de que "catraca verde" não implica "acessível".
- **Nota 1b — O auditor independente deixou o SC 2.5.3 como "não verificado" (o axe desliga `label-content-name-mismatch`); um scanner externo o reprovou em 2 elementos.** A sonda por toda a base achou 60 divergências (44 do `eco-nav`, 5 botões do `digital-workplace-agentico`, 1 do vídeo do EAI, 3 links gerados, mais um bug visível: o botão do YouTube do `en/index` exibia o handle traduzido como "♪ I don't know ♪"). Correção estrutural: nome acessível começa pelo texto visível; links com texto visível usam texto oculto (`.pf-sr`) em vez de `aria-label` repetido (o espelho EN traduz rótulo e texto em separado e eles divergem); handle do canal marcado `translate="no"`.
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
- **Nota 7 — Auditoria v2 (05/10/2026, `docs/specs/a11y-first/auditoria-v2.md`).** Sondas novas sobre os critérios que este relatório listava como "não medidos" acharam falhas que a catraca não via. **Corrigidas neste PR:**
  - AV2-01: fração do OCC por teclado, que quebrava T4;
  - AV2-05: foco sob cabeçalho fixo;
  - AV2-06: tooltip da `artifice`;
  - AV2-07: espaçamento no `devin`;
  - AV2-09: texto invisível sem JS em 7 páginas (até 91%), com a classe `js` antes do primeiro paint;
  - AV2-10: espelhos EN com texto vazio em 7 páginas, mais o invariante `tests/i18n-mirror-empty.test.mjs`;
  - AV2-11: catraca determinística;
  - AV2-13: `hreflang` recíproco;
  - AV2-15: `<h2>` vazio;
  - `life3d #intro` sem a falsa semântica de diálogo.

  **Abertos, com dono:**
  - mídia (AV2-02 transcrições, AV2-03 legendas), humano;
  - movimento sem pausa (AV2-08), decisão de design do dono (ADR-AV2-04);
  - deploy sem depender do gate (AV2-12), ruleset do GitHub, ação do dono;
  - saltos de título h2→h4 (AV2-16), registrados na catraca como `bp:heading-order`;
  - aba inicial da régua de maturidade da `engenharia-confianca`, mantida sem seleção por decisão de UX (autoavaliação).
- **Nota 8 — Página `/acessibilidade` (07/10/2026, branch `feat/acessibilidade-case`).** Case do retrofit (spec `docs/specs/pages/acessibilidade/00_SDD_acessibilidade.md`); a página declara este relatório como fonte e tem guarda de deriva (`tests/acessibilidade.evidence.test.mjs`: status, nível de independência e leitor de tela precisam bater com este arquivo).
  - **Catraca:** 0 ocorrências em `acessibilidade.html` e `en/acessibilidade.html`, em todas as chaves. Sondas próprias do autor: rolagem horizontal 0 a 320 px e com raiz a 200 %, 0 animações sob `reduce`.
  - **Verificação em contexto novo (fresh-context):** um subagente que recebeu só o `docs/a11y/A11Y.md` e o build, sem a spec nem a conversa, auditou PT e EN com sondas próprias (Chromium, Firefox; WebKit sem Tab em links). axe wcag2a…22aa + best-practice: 0 violações em 1280 e 375 px; Tab completo sem armadilha e com indicador em todas as paradas; 19 pares de contraste, mínimo 4,74:1. Achou e o autor corrigiu: citação em português sem `lang` no espelho EN (SC 3.1.2, alta); botão fixo do `<eco-nav>` cobrindo o último link do rodapé a 375 px; selos com 11,5 px e colados à palavra seguinte; títulos de cartão no mesmo nível do título da seção; nome repetido para destinos diferentes; banner com `aria-label` redundante. **Não corrigido (componentes compartilhados, todas as páginas):** `.aeo-eyebrow` com 11,5 px e repetindo o `<h2>` da FAQ, "▸" do `aeo.css` entrando no nome do `<summary>`, rótulo "O MÉTODO" do `<eco-nav>` com 9,9 px (Regra da Casa de 12 px, não critério WCAG). As correções não foram reauditadas por esse verificador.
  - **Checagem de evidência:** outro subagente em contexto novo conferiu cerca de 200 afirmações da página contra o repositório e o git; 21 estavam erradas ou maiores que a fonte (ex.: a auditoria v2 descrita como independente; larguras intermediárias dadas como não medidas) e foram corrigidas.
  - **Independência geral:** continua self-reported ⚠️. O status continua CONDICIONAL.
- **Nota 9 — Páginas `/aprendizagem-autorregulada` e `/aprendizagem-autorregulada-artigo` (07/10/2026, PR #91).** Landing e artigo novos (spec `docs/specs/pages/aprendizagem-autorregulada/00_SDD_aprendizagem-autorregulada.md`), PT e espelho EN.
  - **Catraca:** as 4 páginas entram na varredura do CI sem nova ocorrência. `tests/aprendizagem-autorregulada.spec.js` roda axe (sem serious/critical) e confere 375 px sem rolagem horizontal nas duas páginas PT.
  - **Gate estático:** o primeiro push subiu o teto de 21 para 25 com `role="list"` em duas `<ul>` da landing (e no espelho EN). Removido para não subir o teto; a contagem volta a 21 quando o espelho EN for regenerado. Custo aceito: com `list-style:none`, o VoiceOver/Safari pode não anunciar "lista, N itens" nesses dois blocos (a exceção de `A11Y-DECISIONS.md` cobre só `engenharia-agentes-ia`, já contada no teto).
  - **Não verificado:** leitor de tela, Tab completo e contraste manual dessas páginas; nenhuma verificação em contexto novo. Independência: self-reported ⚠️.
