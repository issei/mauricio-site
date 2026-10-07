# SDD — `acessibilidade.html`

**Acessibilidade como requisito de engenharia — case verificável do retrofit a11y-first**

| Campo | Valor |
|---|---|
| Slug | `acessibilidade` |
| Arquivos | `src/acessibilidade.html` + `src/acessibilidade.css` (namespace `ac-`) |
| URL | `https://mauricio.issei.com.br/acessibilidade` |
| Gêmeo Markdown | `public/acessibilidade.md` (`build-aeo.mjs`, `mdFromMain`) |
| Gêmeo `/en/` | `src/en/acessibilidade.html` + `public/en/acessibilidade.md` (gerados por `sync-i18n`) |
| Tier AEO | **A** (`TechArticle`) |
| Pilar do ecossistema | **p2 — Engenharia de Confiança / O Método** (aprovado pelo autor em 2026-10-06) |
| Base factual | `main @ da61b0a` (2026-10-05) |

---

## 0. Matriz de evidências

Regra da página: nenhuma afirmação sem linha nesta matriz. **FATO** = está num arquivo, commit ou
medição do repositório. **INFERÊNCIA** = conclusão a partir dos fatos, marcada como tal na página.
**LIMITE** = o que não foi verificado e a página declara.

| Aspecto | Evidência | Fonte | Classe |
|---|---|---|---|
| Protocolo adotado | cópia byte a byte de `fecarrico/A11Y.md` v2.2.0, SHA `069e213`, MIT | `docs/a11y/UPSTREAM.md:5-12` | FATO |
| Forma de integração | opção B (cópia versionada, carga preguiçosa, sem `@import`: 41 KB ≈ 10 mil tokens) entre A/B/C | `docs/specs/a11y-first/architecture.md` §2 | FATO |
| Contexto de geração | regra no `AGENTS.md` para toda edição de UI, só o guia do componente | `AGENTS.md:41-49` | FATO |
| Revisão | subagente `a11y-design-reviewer` | `.claude/agents/a11y-design-reviewer.md:3,14` | FATO |
| Agentes no código | trailers `Co-Authored-By: Claude Sonnet 5.5` (a5ef956…6f6d01c), `Claude Opus 5.5` (37f22b7) | `git log` | FATO |
| Problema anterior | gate com axe em 14/41 páginas, sem WCAG 2.2 | `accessibility-audit.md` G-01 | FATO |
| Primeira medição | 207 ocorrências em 36 páginas | commit a5ef956 | FATO |
| Auditoria inicial | 3 🔴 · 8 🟠 · 4 🟡 · 1 processo · 4 não auditados | `accessibility-audit.md` §2 | FATO |
| Catraca | axe-core 4.11.4, wcag2a…wcag22aa, build de produção, PT+EN; sobe = falha; desce sem `--update` = falha | `scripts/a11y-sweep.mjs`, `scripts/a11y-ratchet.mjs` | FATO |
| Trilha | 207 → 81 → 79 → (77 por merge) → 48 → 34 → 38 (escopo 75 págs + 4 animações de CDN em admin) | commits a5ef956, 90e6e8e, a1fe89f, a191c24, 3bb4900, ba640d7, cb060c6 | FATO |
| Contraste | ~128 nós → 2 (os 2 em EXC-006) | `implementation-plan.md` Fase 2 | FATO |
| Verificação independente | fresh-context, 4 falhas ALTA reproduzidas, corrigidas em c9d085c/114f40f | `verificacao-independente-fase7.md` §3 | FATO |
| Mesma família de modelo | auditor = mesma família do autor; nível geral self-reported | `REPORT.md:18-20` | FATO / LIMITE |
| Rótulo no nome | 60 divergências em 46 páginas, achadas após scanner externo apontar 2 | `REPORT.md` nota 1b, commit 6f6d01c | FATO |
| Auditoria v2 | P0 OCC cap. 3 sem teclado (AV2-01) e outros; ADR-AV2-01 (proposta): não adotar MCP | `auditoria-v2.md` | FATO |
| CI | `test.yml` roda `quality-gate.mjs` em PR → main | `.github/workflows/test.yml` | FATO |
| Deploy sem gate | `deploy.yml` não depende do gate (AV2-12 aberto) | `auditoria-v2.md` E3/E4 | FATO / LIMITE |
| Estado atual | fora das 7 páginas de `EXCEPTIONS.md`: 0 nas chaves WCAG/estruturais; 98 `bp:*` em 28 páginas PT+EN; 2 `nojs:hidden` (life3d, falso positivo declarado) | `tests/a11y/baseline.json` @ da61b0a, `A11Y-DECISIONS.md:47` | FATO |
| Contraste dos pares | 6,65:1 a 12,26:1 (piso 4,5:1) | `REPORT.md` §4 | FATO |
| Leitor de tela | nunca usado; Q5 sem dono | `REPORT.md:38-39` | LIMITE |
| Voz, Safari, mídia, 2 447 nós "incomplete", 118 animações, F-18, SC 2.2.2 | não verificados / abertos | `REPORT.md` §3–5, notas 3 e 7 | LIMITE |
| Premissa sobre IA | "o agente produz o que o contexto pede" | — (não medido aqui) | INFERÊNCIA |
| Lighthouse | categoria de acessibilidade usa axe-core | documentação do Lighthouse | FATO externo |

**Afirmações proibidas na página:** "site acessível", "100%", "WCAG 2.2 AA compliant/conforme",
"certificado", "testado com leitor de tela", "validado por pessoas com deficiência", "sem problemas
de acessibilidade", "38" como total atual sem qualificação, qualquer porcentagem não registrada.

## 1. Objetivo

Permitir que o visitante conclua, a partir das evidências, que existe um processo de engenharia
explícito para acessibilidade neste site e como ele foi aplicado e validado. A página **não** declara
conformidade.

## 2. Público

Engenheiros, tech leads, designers e pessoas de acessibilidade. Jargão (axe, CI, catraca, SC) é
explicado na primeira ocorrência.

## 3. Estrutura de headings

```
h1 Acessibilidade como requisito de engenharia
  h2 01 Uma interface pode passar no teste e ainda bloquear alguém   #problema
    h3 O que existia antes · h3 Onde a IA entra
  h2 02 Adotar o A11Y.md como contexto do agente                     #decisao
    h3 O que o padrão traz · h3 Como entrou no repositório
  h2 03 O fluxo real, do protocolo ao gate                           #implementacao
    h3 (um por etapa, 9)
  h2 04 Sete mudanças, com o diff de verdade                         #codigo
    h3 (um por cartão, 7) · h3 A catraca, fase a fase
  h2 05 Quem verificou o quê                                         #validacao
    h3 Automatizada · h3 Independente · h3 Humana · h3 Por que não outra ferramenta
  h2 06 O que a medição mostra hoje                                  #resultado
  h2 07 O que não é possível concluir                                #limites
  h2 08 Requisito, contexto, verificação, evidência                  #ideia
    h3 Esta página
```

## 4. Conteúdo por seção

Cada seção usa apenas linhas da matriz §0. Exemplos de código são **linhas reais** dos commits
(`…` marca omissão). Os sete cartões de §04: `<dialog>` (a1fe89f), skip link + `<main>` (3bb4900,
f09b042), contraste por token (90e6e8e), reflow `minmax(min(100%,N),1fr)` (ba640d7), anel de foco
`a11y-focus-base` (cb060c6, 37f22b7), rótulo no nome (6f6d01c), arrastar com teclado no OCC (37f22b7).

## 5. Requisitos da própria página (A11Y.md aplicado)

- HTML nativo, sem JS próprio (só `eco-nav.js`); conteúdo completo sem JavaScript; sem animação de
  entrada.
- Um `<h1>` em nó de texto único (o tradutor perde palavras em frase cortada por marcadores).
- Landmarks `header`/`nav` rotulado/`main#conteudo`/`footer`; skip link como 1º foco.
- Tabela com `caption` e `th scope`; barras decorativas `aria-hidden`, número como texto.
- `<pre translate="no">` com `white-space: pre-wrap` (sem região rolável); linhas `-`/`+` mantêm o
  prefixo (cor não é o único sinal).
- Grades `minmax(min(100%, N), 1fr)`; alvos ≥ 24 px; `prefers-reduced-motion` desliga transições.
- Links na mesma aba; texto de link descritivo.
- Não duplicar o que os plugins Vite injetam (`a11y-focus-base`, `hreflang-pt`, `webmcp`).

## 6. Critérios de aceite

1. Catraca: **0** ocorrências para `acessibilidade.html` e `en/acessibilidade.html` (página nova não
   tem baseline).
2. `audit-site --strict`, `optimize-critical-path --check`, `a11y-static` (≤ 21), `gen-hero-counter --check`,
   `i18n:check` e `tests/aeo.spec.js` verdes.
3. `tests/acessibilidade.spec.js` e `tests/acessibilidade.evidence.test.mjs` verdes; a página aparece em
   `tests/a11y/focus-visible.spec.js`.
4. Revisão independente (contexto novo) da página contra o A11Y.md e checagem afirmação por afirmação
   contra o repositório, sem achado aberto; resultado registrado no `REPORT.md`.
5. `REPORT.md` revisado depois da mudança de interface (freshness), status mantido CONDICIONAL.
