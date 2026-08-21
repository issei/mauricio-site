# Formulação de Problemas como Engenharia Interrompida da Incerteza

Especificação da página `src/formulacao-de-problemas.html` — publicação do artigo homônimo
(fundamentação multidisciplinar, framework integrado e programa de validação empírica) como
peça editorial navegável do site, com recursos visuais próprios.

| Doc | Conteúdo |
| :-- | :-- |
| [00 — Visão, personas e objetivos](00_visao_personas_objetivos.md) | Para quem, por que e o que a página precisa provar. Escopo e não-escopo. |
| [01 — Arquitetura de informação e narrativa](01_arquitetura_informacao_e_narrativa.md) | Mapa de seções, âncoras, jornada de leitura, mapeamento artigo → página. |
| [02 — Recursos visuais e direção de arte](02_recursos_visuais_e_direcao_de_arte.md) | **Catálogo das sete visualizações** (V1–V7): intenção, forma, dado, comportamento, degradação sem JS. |
| [03 — Design system `.fp-`](03_design_system_fp.md) | Tokens, tipografia, componentes, micro-interações, movimento. |
| [04 — Acessibilidade, SEO e AEO](04_acessibilidade_seo_aeo.md) | Contrato WCAG 2.1 AA, metadados, JSON-LD, entrada em `pages.mjs`, companion Markdown. |
| [05 — Plano de desenvolvimento](05_plano_de_desenvolvimento.md) | Fases, tarefas atômicas com DoR/DoD, ordem, gates, riscos e rollback. |

## Identidade da página

| Campo | Valor |
| :-- | :-- |
| Arquivo | `src/formulacao-de-problemas.html` |
| URL | `https://mauricio.issei.com.br/formulacao-de-problemas` |
| Namespace CSS/JS | `.fp-` / `src/js/formulacao/` |
| `<title>` | `Formulação de Problemas — Engenharia Interrompida` (49 chars) |
| Tier editorial | S (artigo longo, base de conhecimento) |
| Fonte | Artigo original em `docs/references/formulacao-de-problemas.md` |

## Tese editorial (uma frase)

> Formular é engenharia — e toda engenharia de formulação precisa de uma regra de parada,
> porque o refinamento contínuo degrada a decisão antes de melhorá-la.
