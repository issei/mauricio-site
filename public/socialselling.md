# SocialSelling — Busca de clientes mais eficiente com IA

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/socialselling>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-03-01 · Atualizado: 2026-06-21.

## Em síntese

O **SocialSelling** torna a busca de clientes **mais eficiente e automática com IA**, construído com engenharia de verdade: decisões registradas em **ADRs/SDDs**, um **SDD-to-Code Loop** com gates determinísticos e aprendizado contínuo por feedback.

- **Prospecção automática com IA** — encontra e qualifica clientes com menos esforço manual.
- **ADRs/SDDs** — arquitetura e comportamento documentados como fonte da verdade.
- **SDD-to-Code Loop + gates** — determinismo e Open-World no caminho crítico.
- **Aprendizado por feedback** — o sistema melhora com o resultado real.

## Perguntas frequentes

**O que é o projeto SocialSelling?**

É um sistema que torna a busca e a qualificação de clientes mais eficientes e automáticas com IA. Foi construído com engenharia disciplinada: decisões em ADRs/SDDs, um loop SDD-to-Code com gates determinísticos e aprendizado por feedback.

**Como o determinismo e o Open-World aparecem aqui?**

O caminho crítico resolve o que dá para resolver com regras (determinístico-primeiro) e trata ausência de dado como incerteza explícita (Open-World), não como "falso". Isso evita que a IA invente qualificações e mantém o resultado auditável.

**O que é o SDD-to-Code Loop?**

É o ciclo em que a especificação dirige a implementação e os gates validam cada passo antes de avançar: escreve-se a intenção, a IA implementa contra ela e os testes/gates provam a conformidade. O aprendizado por feedback realimenta a spec.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
