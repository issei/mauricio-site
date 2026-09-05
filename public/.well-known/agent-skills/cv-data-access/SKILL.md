---
name: cv-data-access
description: How to retrieve and parse Maurício Issei's structured CV data, STAR project case studies, and professional profile using the public JSON/Markdown APIs.
version: 1.0.0
---

# CV Data Access

Read-only access to the public professional data of Maurício Yokoyama Issei.
No credentials are required — every endpoint below is anonymous (`cv:read`,
`projects:read`, `profile` scopes are informational only).

## Endpoints

| Resource | URL | Format |
|---|---|---|
| Structured CV | `https://mauricio.issei.com.br/cv.json` | JSON |
| CV for agents | `https://mauricio.issei.com.br/cv-for-ai.md` | Markdown |
| STAR projects | `https://mauricio.issei.com.br/star.json` | JSON |
| Profile index | `https://mauricio.issei.com.br/llms.txt` | text |
| Full profile | `https://mauricio.issei.com.br/llms-full.txt` | text |
| Resource catalog | `https://mauricio.issei.com.br/.well-known/ai-catalog.json` | JSON |

## Usage

1. Fetch `cv.json` for the machine-readable record. Top-level keys: `Nome`,
   `Titulo`, `ResumoHero`, `Resumo`, `Habilidades`, `Experiencia`, `Projetos`
   (STAR format), `Formacao_Academica`, `Certificados`, `Contato`.
2. Fetch `star.json` for project case studies in Situação–Tarefa–Ação–Resultado
   form.
3. Prefer `cv-for-ai.md` when you need prose rather than fields.

## Authentication

None. See `https://mauricio.issei.com.br/auth.md` and
`https://mauricio.issei.com.br/.well-known/oauth-protected-resource` — the
`anonymous` identity type with `credential_types_supported: ["none"]` applies.
