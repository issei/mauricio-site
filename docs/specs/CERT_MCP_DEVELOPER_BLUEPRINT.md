# SDD — Adicionar certificado "MCP Developer Blueprint"

**Status:** proposto · **Data:** 2026-09-07 · **Tipo:** atualização de dados (SSOT + derivados)

## 1. Objetivo

Publicar no site o badge conquistado hoje:

| Campo | Valor |
|---|---|
| Nome | **MCP Developer Blueprint** |
| Emissor | O'Reilly Media, Inc. (curso Packt Publishing) |
| Titular | Maurício Yokoyama Issei |
| Emissão | Setembro de 2026 |
| Verificação | https://www.credly.com/badges/ccbed806-158f-426a-a11b-832ca02dfae8 |
| Descrição (Credly) | Fundamentos do Model Context Protocol (MCP) e sua importância em IA; construção de sistemas de IA escaláveis e cientes de contexto; aplicação do MCP em projetos e integrações reais; design de sistemas que evitam alucinação e desvio de contexto. |

## 2. Fonte da verdade e propagação

`public/cv.json` → chave `Certificados[]` é o SSOT. `src/js/cv-renderer.js:212` (`renderCertifications`)
lê o array e monta `#certifications-container` em `src/index.html:598` — **sem alteração de HTML**.

Arquivos derivados que citam a lista de certificados e são mantidos **à mão** (nenhum script os gera):

- `public/cv-for-ai.md` §Certificações → bloco "AI & Agentic Systems"
- `public/llms-full.txt` §Certificações → mesmo bloco (quase duplicata do anterior)
- `public/llms.txt` e `public/index.md` → linha de contagem "**6 certificações em AI & Agentic Systems (2025)**"
- `public/seo-aeo.jsonld.html:100` → texto da FAQ que enumera certificados O'Reilly

O gêmeo `/en/` (`public/en/cv.json`, `public/en/*.md`, `public/en/llms*.txt`) é **gerado** por
`npm run i18n:sync` (Argos, custo zero de token). O teste `tests/i18n.test.mjs:204` compara a
forma de `public/cv.json` com `public/en/cv.json` — **se o twin não for regenerado, o gate falha**.

Fora de escopo: `src/Curriculo.json` (legado, só referenciado por `src/diagnostic.html`).

## 3. Mudanças

### 3.1 `public/cv.json` (obrigatório)

Inserir como **primeiro** elemento de `Certificados[]` (array é reverso-cronológico):

```json
{
  "Nome": "MCP Developer Blueprint",
  "Instituicao": "O'Reilly Media, Inc.",
  "Data_Emissao": "Setembro de 2026",
  "Verificacao": "https://www.credly.com/badges/ccbed806-158f-426a-a11b-832ca02dfae8"
}
```

### 3.2 `public/cv-for-ai.md` + `public/llms-full.txt` (obrigatório)

No bloco `### AI & Agentic Systems`, renomear o título para `(2025-2026)` e adicionar como
primeira linha:

```md
- **MCP Developer Blueprint** | O'Reilly Media | [Verificar](https://www.credly.com/badges/ccbed806-158f-426a-a11b-832ca02dfae8)
```

### 3.3 `public/llms.txt` + `public/index.md` (obrigatório)

`- **6 certificações em AI & Agentic Systems** (2025)` → `- **7 certificações em AI & Agentic Systems** (2025-2026)`

### 3.4 `public/seo-aeo.jsonld.html` (opcional, recomendado)

Na resposta da FAQ (linha ~100), incluir "MCP Developer Blueprint" na enumeração.

### 3.5 `src/index.html` JSON-LD (opcional)

`hasCredential` hoje é objeto único (diploma Mackenzie). Pode virar array e ganhar um
`EducationalOccupationalCredential` do badge, com `recognizedBy` = O'Reilly Media e `url` =
link Credly. Ganho apenas de dados estruturados; adiar se quiser diff mínimo.

## 4. Validação

- `npm run i18n:sync` regenera `/en/` (requer Argos instalado; sem ele o teste i18n é *skipped*).
- `npm run gate` → `vite build` + Playwright (smoke + a11y axe), tem que ficar verde.
- `npm test` → suíte completa (inclui `tests/i18n.test.mjs`).
- Conferência visual: `npm run dev` → seção "Formação & Certificações", card novo no topo, link "Ver Credencial" abre o Credly.

## 5. Critérios de aceite

1. Card "MCP Developer Blueprint" aparece primeiro em `#certifications-container`.
2. `public/cv.json` e `public/en/cv.json` com a mesma forma (teste i18n verde).
3. Contagem de certificados AI atualizada em `llms.txt` e `index.md` (+ espelhos `/en/`).
4. `npm run gate` e `npm test` verdes.
5. Nenhuma alteração de HTML estrutural além do JSON-LD opcional.
