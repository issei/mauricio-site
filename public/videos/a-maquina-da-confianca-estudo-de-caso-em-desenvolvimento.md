# A Máquina da Confiança: Estudo de Caso em Desenvolvimento Agêntico Bancário

Vídeo de Maurício Yokoyama Issei, publicado em 10 de setembro de 2026 (6 min 13 s).
Assistir: https://www.youtube.com/watch?v=JSYL3Ax7A7o

## Sobre o vídeo

Tratar um modelo de linguagem (LLM) como o sistema completo é um dos erros de arquitetura mais comuns na IA aplicada. Em cenários simulados de atendimento bancário, enviar todas as requisições e centenas de ferramentas diretamente ao LLM gera latências elevadas, desperdício de tokens e riscos de execução inadequada por perda de contexto (*lost-in-the-middle*).

Neste vídeo, exploramos o estudo de caso **"Case Agents"**, uma demonstração teórica e simulada criada para validar o processo de desenvolvimento de um **Harness Determinístico em Camadas**. A partir do princípio da **Engenharia da Confiança** (*"A capacidade vem do modelo; a confiança vem da engenharia"*), analisamos como uma estrutura de triagem e guardas de segurança pré-execução valida a arquitetura de roteamento antes do acionamento de modelos mais complexos.

---

### 📌 O que você vai aprender neste vídeo:
* **O Desafio do Catálogo Extenso:** Por que injetar centenas de ferramentas no prompt reduz a precisão da seleção e infla custos de inferência.
* **Camada 1 — Query Router Local:** Como classificar intenções em menos de 5 ms através de um modelo leve (TF-IDF + Regressão Logística) calibrado por *Platt scaling*.
* **Camada 2 — Tool Retriever & Taxonomia:** Como organizar ferramentas em capacidades canônicas e colapsar duplicatas semânticas para recuperar o Top-2 relevante.
* **Camada 3 — Guardas de Direção e Segurança:** Como a verificação semântica de intenção (Leitura vs. Escrita) evita que uma simples consulta execute uma alteração cadastral indevida.
* **Validação do Processo Agêntico:** Como o benchmark do MVP demonstrou a eficácia do Harness na contenção do "Crash Silencioso" em um ambiente controlado de testes.

---

### 📊 Resultados Medidos no Benchmark do MVP:
* **Acurácia do Router:** 100.0%
* **Hit Rate@2 do Retriever:** 100.0%
* **Redução de Custo Medida:** 77,8% (vs. baseline sempre-LLM)
* **Redução de Latência:** ~92,6%
* **Execuções Incorretas no Dataset de Teste:** 0
*(Nota: Resultados restritos ao benchmark simulado do MVP).*

---

### 🔗 Links e Documentação de Referência:

* 🌐 **Artigo Explicativo e Apresentação do Case no Site:**
  https://mauricio.issei.com.br/case-agents.html

* 💻 **Repositório do Projeto no GitHub:**
  https://github.com/issei/case-agents

* 📜 **Especificação Técnica Consolidada (Spec-Driven Development):**
  https://github.com/issei/case-agents/blob/main/specification/Especifica%C3%A7%C3%A3o.MD

* 📦 **Manifesto de Empacotamento de Produção (APM.yml):**
  https://github.com/issei/case-agents/blob/main/APM.yml

* 📈 **Relatório de Avaliação do Benchmark (candidate_report.json):**
  https://github.com/issei/case-agents/blob/main/reports/candidate_report.json

#### 🏛 Architecture Decision Records (ADRs):
* **ADR-001 (Normalização Textual Canônica):** https://github.com/issei/case-agents/blob/main/docs/adr/0001-normalizacao-textual-canonica.md
* **ADR-002 (Classificador Lexical & Query Router):** https://github.com/issei/case-agents/blob/main/docs/adr/0002-classificador-lexical-query-routing.md
* **ADR-003 (Ranking Determinístico & Tool Retrieval):** https://github.com/issei/case-agents/blob/main/docs/adr/0003-ranking-deterministico-tool-retrieval.md
* **ADR-004 (Harness de Avaliação & Economia):** https://github.com/issei/case-agents/blob/main/docs/adr/0004-harness-avaliacao-metricas-economia.md
* **ADR-005 (Alinhamento APM & OmniRoute Gateway):** https://github.com/issei/case-agents/blob/main/docs/adr/0005-alinhamento-apm-e-omniroute-gateway.md
* **ADR-006 (Taxonomia de Capacidades & Colapso de Duplicatas):** https://github.com/issei/case-agents/blob/main/docs/adr/0006-taxonomia-de-capacidades-e-colapso-de-duplicatas.md
* **ADR-007 (Calibração de Probabilidade & Guarda de Margem):** https://github.com/issei/case-agents/blob/main/docs/adr/0007-calibracao-de-probabilidade-e-guarda-de-margem.md
* **ADR-008 (Guarda de Direção Leitura/Escrita):** https://github.com/issei/case-agents/blob/main/docs/adr/0008-guarda-de-direcao-leitura-escrita.md

#### 📚 Base de Conhecimento (OKF Agent Memory):
* **Guia de Engenharia da Confiança:** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-trust-engineering.md
* **Catálogo de Casos de Borda em PT-BR:** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-edge-cases.md
* **Arquitetura de Transição (MVP para Produção - ISM v1.0):** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-mvp-to-production.md
* **Eficiência de Contexto e Anti-Bloat:** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-token-efficiency.md

## Transcrição

Transcrição ainda não disponível.
