# Boutique Empresarial — engenharia, metodologia e arquitetura do projeto

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/boutique-empresarial-showcase>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-09-21 · Atualizado: 2026-10-15.

## Em síntese

O site da **Boutique Empresarial** é uma aplicação estática de várias páginas (MPA) com Vite 6 e Tailwind CSS v4, sem framework JavaScript no cliente. O trabalho é guiado por especificação (SDD), executado por subagentes especializados e liberado para produção só quando um quality gate determinístico passa.

- **Funil único** — landing page do diagnóstico gratuito, formulário conversacional de 7 etapas e página de confirmação.
- **Backend serverless** — a captura é gravada por Google Apps Script, chamado de forma assíncrona.
- **SDD** — as especificações em `docs/specs/` são a fonte única da verdade; nenhum código muda sem especificação aprovada.
- **Pipeline multiagente** — subagentes `page-auditor`, `head-fixer`, `copy-writer` e `gate-runner`, sob a regra "modelo caro decide, modelo barato executa, o gate arbitra".
- **Quality gate fail-closed** — build, Playwright em Chromium, Firefox e WebKit, e auditoria WCAG com axe-core; qualquer divergência bloqueia o deploy.
- **Entrega na AWS** — S3 com Origin Access Control, CloudFront com CloudFront Functions para cabeçalhos de segurança e URLs limpas, e GitHub Actions autenticado por OIDC, sem segredo estático no repositório.
- **Legível por agentes** — `llms.txt`, cabeçalhos `Link` (RFC 8288) e WebMCP via `navigator.modelContext`.

## Perguntas frequentes

**Qual é a stack principal do projeto Boutique Empresarial?**

Uma MPA estática com Vite 6, Tailwind CSS v4, HTML5 semântico e CSS, sem JavaScript de framework no cliente. A captura de leads usa Google Apps Script, integrado de forma assíncrona.

**O que é Specification Driven Development (SDD) e VibeCoding?**

No SDD, as especificações técnicas em `docs/specs/` são a fonte única da verdade: nenhuma alteração de código acontece sem especificação aprovada. VibeCoding é a implementação rápida, guiada por esses contratos.

**Como funciona o desenvolvimento agêntico multimodelo?**

O repositório usa subagentes especializados (`.claude/agents/`). O modelo mais caro toma as decisões, o mais barato executa e o quality gate arbitra o resultado.

**O que impede que o código quebre em produção?**

O comando `npm run gate` roda o build de produção, os testes Playwright nos três navegadores e a auditoria de acessibilidade com axe-core. O GitHub Actions só autoriza o deploy na AWS, via OIDC, se o gate estiver verde.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
