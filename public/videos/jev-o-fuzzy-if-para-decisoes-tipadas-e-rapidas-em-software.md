# Jev — O Fuzzy If para Decisões Tipadas e Rápidas em Software e Agentes de IA

Vídeo de Maurício Yokoyama Issei, publicado em 27 de setembro de 2026 (7 min 35 s).
Assistir: https://www.youtube.com/watch?v=KpcrbmGA_v8

## Sobre o vídeo

Neste vídeo, apresentamos o **Jev**, o modelo desenvolvido pela TypeSafe AI focado em entregar decisões estruturadas e tipadas em vez de textos longos em prosa. Ele atua como um *middleware* e "fuzzy if" para aplicações e agentes de inteligência artificial, operando com latências entre 70 e 500 ms — sendo de 40 a 200 vezes mais rápido que chamadas a LLMs tradicionais.

---

### 💡 O que você vai aprender neste vídeo

* **O Conceito de "Fuzzy If":** Como o Jev substitui condicionais rígidas em código e chamadas lentas a LLMs por um modelo de decisão ágil e calibrado.
* **A Primitiva Principal (`/v1/decide`):** Como enviar um estado (*state*) e perguntas tipadas para avaliar múltiplas decisões em uma única requisição.
* **As 3 Primitivas de Decisão do Jev:**
  * **`choice`:** Escolhe a melhor opção entre até 255 categorias rotuladas, acompanhada de probabilidades por opção e grau de confiança.
  * **`score`:** Classifica o texto em uma escala ordenada de 2 a 10 níveis com pontuações fracionárias.
  * **`noul`:** Retorna uma probabilidade calibrada de 0 a 1 para respostas do tipo sim/não, ideal para *guardrails* e filtros de segurança.
* **Endpoints Prontos para Uso:** Conheça as rotas prontas para triagem de e-mails, suporte, avaliação de risco de agentes, classificação de RAG, qualificação de leads e moderação de conteúdo.
* **Segurança e Eficiência para Agentes de IA:**
  * **Verificação de Risco (`/v1/agent/risk`):** Avalia comandos e ferramentas de agentes antes da execução para permitir, confirmar ou bloquear ações arriscadas.
  * **Compactação de Contexto (`/v1/context/filter`):** Filtra e remove itens antigos de histórico para evitar o inchaço do contexto de agentes sem reescrita de resumos.
  * **Roteamento de Modelos (`/v1/model/route`):** Seleciona automaticamente a categoria de modelo ideal com base na complexidade da tarefa.
* **Integrações e Ferramentas do Ecossistema:** Como instalar o Jev via *agent skills* e servidores MCP (`jev-mcp`) no Claude Code, Cursor, OpenCode e Codex, além de usar o SDK oficial em TypeScript e gateways como Vercel AI Gateway, OpenRouter e Cloudflare.

---

### 🔗 Fontes e Documentação Oficial
* **Documentação da API e Endpoint `/v1/decide`:** *Jev API docs — application endpoints + decision primitive*.
* **Visão Geral do Modelo System One:** *Jev by TypeSafe AI — Try the System One model & API*.
* **Habilidades para Agentes de Código:** *Jev agent skill — drop the Decision API into Claude Code, Cursor & Codex*.
* **Ecossistema, Gateways e Ferramentas Open-Source:** *Jev ecosystem & access — gateways, LangChain, open-source tools*.
* **Guias de Integração (TypeScript, MCP, IDEs):** *Jev integrations — Claude Code, OpenCode, TypeScript*.

---

## Transcrição

Transcrição ainda não disponível.
