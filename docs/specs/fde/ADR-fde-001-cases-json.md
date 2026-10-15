# ADR-fde-001 — Cases STAR-FDE em `public/cases.json`, separados do `cv.json`

- **Status:** aceito por padrão (D4 em [SDD-FDE §0.2](SDD-FDE.md)); revisável até a WU-4.
- **Data:** 2026-10-14
- **Requisitos:** R-FDE-005, R-FDE-006, R-FDE-010; modelo de dados da SDD-FDE §6.

## 1. Contexto

A SDD-FDE pede 8 cases no formato STAR-FDE, com campos que o currículo não tem: nível de evidência,
fonte, data de revisão, padrão reutilizável e a separação entre impacto mensurado e não mensurado.

Hoje os projetos vivem em `public/cv.json` → `Projetos` (19 itens, formato STAR), validados contra
`public/star.json` por `scripts/gen-portfolio.mjs`. O `cv.json` é também o fallback local do
repositório `issei/curriculo` e alimenta a home, `/curriculo`, `curriculo.md` e o JSON-LD.

## 2. Decisão

Os cases FDE ficam em **`public/cases.json`**, um arquivo próprio. Cada case referencia o projeto
de origem pelo nome exato (`projeto_ref` = `cv.json.Projetos[].Nome`).

```yaml
case:
  id: "case-agrupamento-comercial"       # slug, também âncora em /cases
  projeto_ref: "Projeto de Agrupamento Comercial"
  publicar: false                        # só true depois da validação do autor
  revisado_em: "2026-10-14"
  # demais campos: SDD-FDE §6, sem alteração
```

Um gerador (`scripts/gen-cases.mjs`, WU-4) produz `src/cases.html` e o gêmeo `public/cases.md`,
no mesmo padrão de `gen-portfolio.mjs` e `gen-editorial.mjs`: blocos entre marcadores e `--check`
no `npm run gate`.

## 3. Alternativas descartadas

| Alternativa | Por que não |
|---|---|
| Acrescentar os campos FDE em `cv.json.Projetos` | Mistura registro histórico com leitura editorial; obriga a levar campos como `nivel_evidencia` ao `issei/curriculo`; muda o contrato que `gen-portfolio.mjs` valida contra `star.json`. |
| Escrever os cases direto no HTML | Perde a validação por teste (R-FDE-005 exige evidência mínima por case) e o gêmeo `.md` passaria a divergir do HTML. |
| Um arquivo por case | Oito arquivos para um único gerador e uma única página; nenhum ganho de revisão. |

## 4. Consequências

- O teste da WU-2 (`tests/fde.claims.test.mjs`) consegue verificar, sem leitura humana:
  `projeto_ref` existe no `cv.json`; case com `publicar: true` não está `a_confirmar`;
  todo número de `impacto_mensurado` aparece literalmente no texto do projeto de origem.
- **Confidencialidade.** O repositório é público. As respostas da Fase 0 marcadas como
  `confidencial` ou `nao_publicavel` não entram em `docs/specs/fde/evidencias/` nem em
  `cases.json`. Ficam numa cópia do questionário fora do repositório, no computador do autor.
- O `cv.json` continua sendo a fonte dos números. Se um número mudar lá, o teste quebra o case
  que o cita, em vez de deixar dois valores publicados.
- `src/cases.html`, `public/cases.md` e `public/cases.json` são ativos públicos e precisam de gêmeo `/en/`. A WU-4 confere se o mapa do tradutor (`translate.py --print-map`) os inclui e, se não, os acrescenta, como já é feito para `cv.json` e `star.json`.
