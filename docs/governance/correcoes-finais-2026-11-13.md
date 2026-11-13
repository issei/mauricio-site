---
id: correcoes-finais-2026-11-13
titulo: Correções finais e validação do site — 13/11/2026
data: 2026-11-13
leitor: Issei e agentes que mantêm o site
---

# Correções finais e validação — 13/11/2026

Escopo fechado: só as pendências do pedido de 13/11/2026. Nada de página, recurso ou dependência nova.

## Fontes únicas (regra nova)

| Artefato | Fonte | Gerador / guarda |
|---|---|---|
| `public/llms.txt` | `cv.json` (contagens) + `specs/ecosystem.nav.yaml` e `content/temas.yml` (conteúdos) | `scripts/gen-llms.mjs`, `--check` no gate |
| `public/llms-full.txt` | `cv-for-ai.md` + `career-highlights-star.md` + `catalogo.md` | `scripts/gen-llms.mjs` |
| Contagem STAR em `agent-catalog`, MCP server card, `career-highlights-star.md` | `cv.json` `Projetos` | `tests/agentes-contratos.test.mjs` |
| Certificações em `cv-for-ai.md` | `cv.json` `Certificados` | `tests/agentes-contratos.test.mjs` |
| Esquema de `/star.json` no `openapi.json` | `star.json` publicado | `tests/agentes-contratos.test.mjs` |

Regra das certificações em IA: emitidas desde 2025 e com AI, IA, GenAI, MCP, Copilot ou Agent no nome (9 hoje: 8 O'Reilly Media e 1 StartSe University).

## Verificado no ar (13/11/2026, pelo notebook do Issei)

- 28 URLs de descoberta: 200 com o tipo certo, exceto `/mcp`, `/oauth/authorize`, `/oauth/token` (404, documentados como planejado ou declarativo em `auth.md` e no server card) e `/.well-known/oauth-protected-resource/cv.json` (404 por desenho: a function só sintetiza PRM para caminhos de página; `/curriculo` e `/en/devin` respondem 200).
- Negociação de Markdown, header `Link`, digests das Agent Skills, 107 URLs do sitemap: OK.
- GTM-KQ9R3GV3: só a tag do Clarity (ydv1trk2f5). Nenhuma tag da Meta nem do Google Ads.
- Cookies: o Clarity grava cookies antes da escolha no banner (pendência no GTM).
- Sem HSTS, CSP e X-Frame-Options; TLS 1.2 aceito.
