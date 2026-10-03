# Digital Workplace Agêntico — do portal que apresenta à plataforma que resolve

Especificação da página `src/digital-workplace-agentico.html`: publicação de um estudo
multidisciplinar sobre como um **portal corporativo de grande porte** evolui para um Digital
Workplace orientado a intenção e agentes (EXP, AG-UI, UI generativa governada, conhecimento
governado, identidade delegada, processos e operação).

> **Restrição legal vinculante.** A página e tudo o que dela deriva **não cita, não referencia e
> não sugere nenhuma organização real** como caso, cliente ou empregador. O estudo é sempre sobre
> "um portal corporativo de grande porte". Ver [06 — Restrição legal e procedência](06_restricao_legal_e_procedencia.md).
> A guarda é automática: `tests/digital-workplace.legal.test.mjs` falha o `npm run gate` se um
> termo proibido aparecer.

| Doc | Conteúdo |
| :-- | :-- |
| [00 — Visão, personas e objetivos](00_visao_personas_objetivos.md) | Para quem, por que, o que a página precisa provar. Escopo e não-escopo. |
| [01 — Arquitetura de informação e narrativa](01_arquitetura_informacao_e_narrativa.md) | Mapa de seções, âncoras, mapeamento estudo → página, jornadas de leitura, selos epistêmicos. |
| [02 — Recursos visuais e componentes](02_recursos_visuais_e_componentes.md) | Catálogo das visualizações V1–V8: intenção, dado, forma, comportamento, sem JS, a11y. |
| [03 — Design system `.dw-`](03_design_system_dw.md) | Tokens (base Dark Tech), tipografia, componentes, movimento. |
| [04 — Acessibilidade, SEO e AEO](04_acessibilidade_seo_aeo.md) | Contrato WCAG 2.1 AA, metadados, JSON-LD, entrada em `pages.mjs`, Markdown companheiro, i18n. |
| [05 — Plano de desenvolvimento](05_plano_de_desenvolvimento.md) | Fases, tarefas atômicas com verificação, ordem, gates, riscos, reversão, decisões HITL. |
| [06 — Restrição legal e procedência](06_restricao_legal_e_procedencia.md) | O que é proibido, onde a guarda atua, critérios de aceite, procedência do conteúdo. |
| [PROGRESS.md](PROGRESS.md) | Estado de execução por tarefa (atualizado pelo agente implementador). |

## Identidade da página

| Campo | Valor |
| :-- | :-- |
| Arquivo | `src/digital-workplace-agentico.html` |
| URL | `https://mauricio.issei.com.br/digital-workplace-agentico` |
| Namespace CSS/JS | `.dw-` / `src/js/digital-workplace/` |
| `<title>` | `Digital Workplace Agêntico — Do Portal ao Agente` (48 chars) |
| Tier editorial | S (estudo longo, base de conhecimento) |
| Pilar do ecossistema (proposto) | P2 — Engenharia de Confiança (decisão HITL D-1) |
| Fonte | Cópia neutra do estudo em [`docs/references/digital-workplace-agentico/`](../../../references/digital-workplace-agentico/README.md) |

## Tese editorial (uma frase)

> Um agente corporativo só é tão bom quanto as fundações que ele atravessa: intenção priorizada,
> conhecimento governado, identidade delegada, contratos de API e processos explícitos. Sem elas,
> ele é um chatbot com credenciais perigosas.

## Como usar esta spec (para o agente implementador)

1. Leia `AGENTS.md`, `.claude/skills/mauricio-site-patterns/SKILL.md` e **o doc 06 antes de qualquer outro**.
2. Execute o doc 05 fase a fase, registrando cada tarefa em `PROGRESS.md`.
3. Toda frase da página sai da fonte em `docs/references/digital-workplace-agentico/` ou da síntese
   escrita no doc 01. Não invente casos, números ou organizações.
4. Depois de criar `src/*.html` ou `public/*.md`, rode a skill `sync-i18n` (`npm run i18n:sync && npm run i18n:check`).
5. "Pronto" é `npm run gate` verde, incluindo a guarda legal.
