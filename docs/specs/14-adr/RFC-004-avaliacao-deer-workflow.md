# RFC-004: Avaliação Arquitetural e de Compatibilidade — Deer Workflow

Este documento apresenta uma análise técnica formal e rigorosa sobre a viabilidade de migração ou adoção do framework **Deer Workflow** para orquestração dos fluxos de automação e integração com agentes no repositório de Maurício Yokoyama Issei.

A análise é dividida em duas partes principais: **Fase 1 (Avaliação Arquitetural dos fluxos atuais)** e **Fase 2 (Análise de Compatibilidade de Skills)**, culminando em uma decisão de engenharia fundamentada em princípios de arquitetura de software de baixo acoplamento e alta coesão.

---

## <fase_1_avaliacao_arquitetural> Fase 1: Avaliação Arquitetural

A análise a seguir incide sobre os principais scripts de automação do repositório:
1. `scripts/quality-gate.mjs` — Gate determinístico, unificado e offline executado antes de cada push e no pipeline de CI.
2. `scripts/audit-site.mjs` — Auditoria global de coerência do grafo do site (links, SEO, invariantes).
3. Pipelines de CI/CD em `.github/workflows/`.

### 1. Critérios Mínimos para Aprovação (Evidências)
Para que a migração para o Deer Workflow seja considerada tecnicamente viável e vantajosa, é necessário identificar a presença de **pelo menos dois** dos seguintes fatores nos fluxos atuais:

*   **Branching condicional complexo:**
    *   *Análise:* Os scripts atuais possuem caminhos condicionais extremamente simples e previsíveis (por exemplo, a presença ou ausência da flag `--no-build` ou `--strict`). O fluxo de execução é plano e previsível.
    *   *Evidência:* **Não identificado.**
*   **Necessidade de paralelismo independente:**
    *   *Análise:* Embora os testes do Playwright rodem internamente em paralelo, as etapas de validação e compilação do site são inerentemente sequenciais (não podemos rodar o orçamento de performance antes do build, pois o primeiro depende da pasta `dist/` gerada pelo segundo).
    *   *Evidência:* **Não identificado.**
*   **Retries condicionais de passos específicos:**
    *   *Análise:* O Quality Gate foi desenhado sob o princípio de *fail-closed* determinístico. Se o build falhar ou um invariante quebrar, o processo deve falhar imediatamente. Não há cenários em que repetir a mesma validação estática de forma isolada faça sentido ou traga robustez.
    *   *Evidência:* **Não identificado.**
*   **Gestão explícita de estado partilhado entre scripts:**
    *   *Análise:* Os scripts operam de forma isolada e stateless. A única forma de "estado" compartilhado é a própria árvore de arquivos (o build gera artefatos em `dist/`, e o orçamento de performance lê esses arquivos). Não há estado em memória compartilhado que exija coordenação de concorrência ou variáveis globais entre os processos.
    *   *Evidência:* **Não identificado.**
*   **Reutilização significativa de lógicas entre diferentes pipelines:**
    *   *Análise:* As poucas lógicas compartilhadas (ex: leitura de arquivos, normalização de quebra de linhas para compatibilidade de sistemas operacionais) são resolvidas com funções utilitárias nativas pequenas e diretas.
    *   *Evidência:* **Não identificado.**
*   **Necessidade de observabilidade isolada por etapa:**
    *   *Análise:* A saída padrão do terminal (`stdout`/`stderr`) capturada pelo utilitário `spawnSync` com `{ stdio: 'inherit' }` no `quality-gate.mjs` já fornece logs legíveis, lineares e isolados para depuração rápida local e no CI (GitHub Actions).
    *   *Evidência:* **Não identificado.**
*   **Acoplamento elevado e frágil entre scripts atuais:**
    *   *Análise:* Cada script possui escopo extremamente bem definido e coeso. `audit-site.mjs` trata puramente de coerência de links e SEO; `gen-hero-counter.mjs` lida apenas com a contagem física das specs; e `quality-gate.mjs` apenas orquestra sequencialmente a chamada de cada um deles. O acoplamento é mínimo e robusto.
    *   *Evidência:* **Não identificado.**

### 2. Critérios Explícitos de Rejeição
A adoção do framework **deve ser sumariamente recusada** se um ou mais dos critérios abaixo forem atendidos:

*   **A redução de complexidade gerada for inferior à complexidade introduzida pelo novo framework:**
    *   *Avaliação:* O Deer Workflow exige um runtime baseado em **Bun**, tipagens TypeScript específicas, um modelo de dados orientado a grafos, e infraestrutura para gerenciar execuções de agentes semânticos. Introduzir toda essa pilha de tecnologia apenas para rodar scripts estáticos de validação locais adicionaria um peso de manutenção desproporcional.
    *   *Veredito:* **Atendido (Rejeição).**
*   **O fluxo analisado permanecer essencialmente linear e sequencial:**
    *   *Avaliação:* O `quality-gate.mjs` é um pipeline de validação estritamente linear de passos do início ao fim. Ele executa: `build` -> `geração de artefatos` -> `auditoria global` -> `invariantes de teste` -> `testes Playwright` -> `orçamento de performance`. Não há ramificações, loops ou decisões em tempo de execução que justifiquem um orquestrador de grafos.
    *   *Veredito:* **Atendido (Rejeição).**
*   **Houver uma alternativa nativa significativamente mais simples:**
    *   *Avaliação:* O uso de Node.js puro (`scripts/quality-gate.mjs` usando ESM nativo e `node:child_process`) é extremamente leve, independente de dependências pesadas, altamente portável entre sistemas operacionais (Windows, macOS e Linux) e possui custo de inicialização de milissegundos.
    *   *Veredito:* **Atendido (Rejeição).**
*   **O custo de manutenção estrutural superar o benefício prático esperado:**
    *   *Avaliação:* Adicionar o orquestrador exigiria isolar o Bun no repositório, monitorar novas dependências externas de terceiros, manter schemas e contratos sincronizados, o que geraria um custo de suporte contínuo para ganho nulo nos fluxos de automação atuais.
    *   *Veredito:* **Atendido (Rejeição).**

---

## <fase_2_analise_de_compatibilidade> Fase 2: Análise de Compatibilidade

Caso a migração prosseguisse, seria necessário compatibilizar o modelo de skills atual com o modelo de execução do Deer Workflow. Avaliamos aqui essa transição de forma conceitual.

### 1. Modelo de Skills Atual (`.agents/skills/`)
As "Skills" presentes no repositório atual (como `mauricio-site-patterns` e `run-quality-gate`) funcionam como **Manuais de Contexto Narrativo e Regras de Negócio (Markdown com Metadados Frontmatter)**.
- **Estrutura:** Frontmatter YAML com metadados (`name`, `description`, `triggers`) seguido de documentação em Markdown detalhando padrões arquiteturais, comandos permitidos e invariantes de estilo.
- **Execução:** Passiva. O agente (como Claude/Jules) lê os arquivos `.md` relevantes para herdar as diretrizes de desenvolvimento antes de editar código.

### 2. Modelo de Nós Semânticos do Deer Workflow
O Deer Workflow opera com base em **Engenharia de Grafos de Execução Executáveis**, onde:
- Os caminhos de decisão e fluxos são programados em TypeScript.
- O trabalho semântico e cognitivo de cada nó é delegado a Runtimes de Agente (ex: Codex, Claude Code, Pi) que consomem "Skills" executáveis vinculadas diretamente à API do Deer Workflow.

### 3. Fricções de Integração e Quebras de Contrato (Incompatibilidades)

1.  **Mudança de Paradigma (Documentação vs. Execução):**
    *   As skills do repositório hoje servem de referencial estático para o comportamento do desenvolvedor/agente no espaço de trabalho inteiro.
    *   No Deer Workflow, as skills são ferramentas parametrizadas integradas via API para que um nó de agente execute uma sub-tarefa isolada e retorne um output estruturado (JSON Schema). Transformar as diretrizes gerais do repositório em nós de processamento isolados descaracterizaria sua função primordial de guardiã contextual do ecossistema.
2.  **Divergência de Runtime (Node.js/npm vs. Bun/TypeScript):**
    *   O site do Maurício roda integralmente sob Node.js com npm (Vite 6, Playwright), enquanto o Deer Workflow é construído especificamente para o ecossistema **Bun**. Uma ponte exigiria manter dois runtimes distintos de JavaScript concorrendo pelo ciclo de desenvolvimento do repositório.
3.  **Incompatibilidade de Schemas de Skills:**
    *   O frontmatter das skills locais é flexível e declarativo. O Deer Workflow exige um alinhamento rígido com as especificações de Skill e Agent runtimes (como a injeção estrita de esquemas de entrada/saída JSON que atendam aos requisitos do compilador de fluxo).

---

## <decisao_arquitetural> Decisão Arquitetural e Veredito Final

Com base nos dados coletados na Fase 1 e Fase 2:

1.  **Veredito de Viabilidade:** **REJEITADO**.
2.  **Justificativa:** O pipeline de automação atual do repositório (`scripts/quality-gate.mjs`) é intrinsecamente linear, plano e síncrono. Não há branching complexo, paralelismo independente, retries, ou estado compartilhado complexo em memória. A introdução de um orquestrador de fluxo em grafos como o Deer Workflow traria uma sobrecarga severa de infraestrutura (como o suporte paralelo ao Bun em um projeto Node/npm), aumentando a curva de aprendizado e o esforço de manutenção sem gerar redução de complexidade.
3.  **Recomendação:** Manter a arquitetura atual baseada em scripts Node.js puros com ESM e o Quality Gate linear. O acoplamento atual é limpo, o tempo de inicialização é de milissegundos, e as regras de consistência global (`audit-site.mjs`) continuam perfeitamente atendidas pelo modelo nativo leve.

Conforme as diretrizes arquiteturais estritas estabelecidas para esta avaliação, **o processo de migração e a tarefa piloto da Fase 3 são sumariamente recusados**. O processo é encerrado nesta fase de especificação e documentação para preservar a simplicidade e a robustez do repositório (*Keep It Simple, Stupid*).

---
**Status:** REJEITADO (Processo Encerrado Formalmente)
**Data:** 2026
**Autor:** Jules (IA Software Architect)
