# Engenharia de Agentes de IA — Os 10 princípios do determinismo

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/engenharia-agentes-ia>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-06-10 · Atualizado: 2026-06-21.

## Em síntese

**Engenharia de Agentes de IA** é a disciplina de construir sistemas agênticos confiáveis tratando a saída do modelo como **input não confiável** governado por arquitetura. A regra central: um sistema de IA confiável tem **muito pouca IA no caminho crítico** — regras e dados resolvem o determinístico e o modelo atua só no resíduo interpretativo.

- **Determinístico-primeiro** — resolva com regras e dados; gaste IA só onde o modelo é insubstituível.
- **Cérebro × Vitrine** — separe motor cognitivo (sensível) da interface (exposta) por um contrato estreito.
- **Contratos rígidos + Limiar de Certeza** — schema estrito rejeita campos inesperados e confiança abaixo do piso; fail-closed.
- **MCP + FinOps por ledger** — fronteira de ferramentas controlada e quota que recusa o gasto antes do provedor.

## O princípio invariante

Um sistema de IA confiável tem muito pouca IA no caminho crítico. A confiança não nasce de um prompt mais inteligente, e sim de arquitetura mais disciplinada: regras e dados resolvem o determinístico e o modelo é chamado apenas no resíduo interpretativo, sob contratos que tornam sua saída auditável.

## As fronteiras

Contratos rígidos em toda fronteira transformam a saída probabilística do LLM em input validado. O MCP padroniza as ferramentas do agente; o ledger de quota governa o custo; o Limiar de Certeza com fail-closed garante que nada abaixo do piso de confiança vire fato.

## Perguntas frequentes

**O que é Engenharia de Agentes de IA?**

É a disciplina de projetar sistemas agênticos confiáveis tratando cada saída do modelo como input não confiável, validado por arquitetura (schemas, limiares, fronteiras). O objetivo é manter pouca IA no caminho crítico: regras e dados resolvem o determinístico e o LLM atua apenas no resíduo interpretativo.

**O que significa "determinístico-primeiro"?**

Resolver com regras e dados estruturados tudo o que for possível e reservar a IA só para a fração da tarefa que exige o modelo. Mesma entrada deve produzir mesma saída; o não-determinismo fica isolado e testável.

**O que é a separação Cérebro × Vitrine?**

O motor cognitivo (pesado, com acesso a dados sensíveis) e a interface exposta são sistemas separados, ligados por um contrato estreito. A Vitrine nunca toca o banco diretamente; o Cérebro nunca confia cegamente no que vem de fora — reduz a superfície de ataque e de falha.

**O que é o Limiar de Certeza e o fail-closed?**

Toda inferência carrega um grau de confiança; a arquitetura define um piso abaixo do qual a saída é interceptada antes de virar fato e degradada para um fallback estruturado (revisão humana, incerteza explícita ou rota determinística). Se não foi possível concluir com segurança, o sistema para num ponto seguro em vez de promover um palpite.

**Qual o papel do MCP (Model Context Protocol)?**

O MCP é a fronteira de segurança pela qual o agente ganha "mãos e olhos" de forma controlada, declarando explicitamente quais ferramentas pode usar. Cada tool é tipada por um schema com pré e pós-condições, o que torna as ações do agente auditáveis.

**Como controlar custo (FinOps) em agentes de IA?**

Com um ledger de quota: um estado de domínio persistente que governa créditos e gasto e recusa a despesa antes mesmo de chamar o provedor. Combinado com poda precoce (filtro barato primeiro), evita que o custo de chamadas a modelos escape do controle.

## Glossário

- **Determinístico-primeiro** — Resolver com regras e dados; gastar IA apenas no resíduo interpretativo.
- **Cérebro × Vitrine** — Separação entre motor cognitivo (sensível) e interface (exposta), ligados por contrato estreito.
- **Contrato rígido (schema)** — Esquema estrito que rejeita campos inesperados e inferências abaixo do Limiar de Certeza.
- **Limiar de Certeza** — Piso de confiança abaixo do qual a inferência é interceptada e degradada para fallback estruturado.
- **MCP (Model Context Protocol)** — Protocolo que dá ao agente ferramentas controladas e declaradas (fronteira de segurança).
- **Ledger de quota** — Estado persistente que governa gasto/créditos e recusa a despesa antes do provedor (FinOps).
- **Open-World** — Ausência de dado é incerteza explícita, nunca "falso".
- **Fail-closed** — Se não foi possível concluir com segurança, para-se num ponto seguro em vez de promover um palpite.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
