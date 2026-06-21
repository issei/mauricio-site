# Desenvolver Salesforce com IA Agentic sem gerar débito técnico

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/salesforce-agentic-dev>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-04-20 · Atualizado: 2026-06-21.

## Em síntese

Usar IA agêntica no Salesforce **sem acumular dívida técnica** exige método: a IA implementa contra uma **especificação versionada**, não contra prompts soltos, e cada mudança passa por governança e validação automática antes do deploy.

- **Spec-Driven Development** — a spec é a fonte da verdade; Devin implementa contra ela.
- **Modelo Federado** — autonomia das squads com governança central via Flosum CLI.
- **Validação automática** — Apex Tests e gates provam a intenção antes de promover.
- **Salesforce CLI + Git** — o estado de metadados versionado e auditável.

## Por que a dívida técnica aparece

Dívida técnica com IA surge quando se gera código sem contrato e sem validação — bonito na demo, frágil em produção. O antídoto é Spec-Driven Development com gates automáticos: a IA implementa contra a spec e nada é promovido sem prova de que a intenção foi cumprida.

## Perguntas frequentes

**Como usar IA agêntica no Salesforce sem gerar débito técnico?**

Fazendo a IA implementar contra uma especificação versionada (Spec-Driven Development) em vez de prompts soltos, e validando cada mudança com Apex Tests e gates antes do deploy. A dívida técnica nasce de gerar código sem contrato; o método troca o "torça para funcionar" por intenção auditável.

**O que é o Modelo Federado de desenvolvimento?**

É um arranjo que dá autonomia às squads para entregar rápido, mantendo governança central sobre qualidade e segurança (via Flosum CLI e políticas comuns). Descentraliza a execução sem descentralizar o risco.

**Qual o papel do Devin nesse fluxo?**

Devin é o agente que executa a implementação contra a spec: descobre o contexto relevante, edita o metadado/Apex e roda os testes. O humano atua como Orquestrador Cognitivo, definindo intenção e julgando o resultado.

**Como o Flosum e o Salesforce CLI entram?**

O Salesforce CLI versiona o estado de metadados no Git, tornando cada mudança rastreável; o Flosum CLI aplica a governança (aprovações, políticas, promoção entre ambientes) sobre essa esteira. Juntos garantem velocidade com controle.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
