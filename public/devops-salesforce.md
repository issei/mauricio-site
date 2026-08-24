# DevOps Salesforce com IA — Manual Prático de Adoção

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/devops-salesforce>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-04-10 · Atualizado: 2026-08-24.

## Em síntese

Colocar um agente de IA para escrever código num org Salesforce compartilhado só é seguro em quatro camadas: **fundação**, **arquitetura**, **metodologia** e **governança**. São nove seções, na ordem — cada uma depende da anterior.

- **Fundação** — VS Code, Salesforce CLI e JDK 21 na ordem certa; depois a IA ligada ao org vivo por um MCP Server, não só aos arquivos.
- **Arquitetura** — o Flosum Cloud Agent traduz metadados em Git nos dois sentidos; Delta Deployment, Overwrite Protection e Smart Merge protegem o org-alvo.
- **Metodologia** — Spec-Driven Development: você escreve o QUÊ e o PORQUÊ. Matriz de Impacto e Limites de Atuação cortam retrabalho e computação desperdiçada.
- **Governança** — o repositório é a memória de longo prazo da IA: knowledge-base, AGENTS.md, playbooks e skills versionados.

## Perguntas frequentes

**Por onde começar para usar IA no desenvolvimento Salesforce?**

Pela ordem de instalação: VS Code, Salesforce CLI e Salesforce Extension Pack e, só então, o JDK 21 — instalar Java antes do resto é a causa mais comum de ambiente quebrado. Depois autentique o org com "sf org login web" e conecte um MCP Server de Salesforce, para a IA consultar metadados reais em vez de só ler arquivos estáticos.

**Quando usar Claude Code e quando usar Devin?**

Claude Code para trabalho interativo no editor: pair programming, revisão de diff a cada mudança, refatoração ambígua e exploração de arquitetura. Devin para ticket bem delimitado que pode rodar sozinho em sandbox e voltar como Pull Request — tarefas repetitivas em lote, delegadas por Slack ou Jira.

**Para que serve o Flosum Cloud Agent?**

É um serviço Node.js hospedado fora do org que traduz nos dois sentidos entre a API de Metadados da Salesforce e o protocolo Git. É ele que torna o org legível como um repositório Git comum — o formato para o qual Claude Code e Devin foram otimizados.

**Como evitar que a IA alucine caminhos ou quebre um org compartilhado?**

Três travas em camadas: repositório no formato de origem Salesforce DX (force-app/main/default), uma spec com Matriz de Impacto e Limites de Atuação antes de abrir a sessão do agente, e deploy protegido por Overwrite Protection e Smart Merge no pipeline Flosum.

**O que é Spec-Driven Development na prática?**

É deixar de escrever o COMO e passar a escrever o QUÊ e o PORQUÊ: uma spec curta com contexto de negócio, objetivo observável, matriz de impacto, limites de escopo e critérios de aceite verificáveis. Escopo vago faz o agente explorar, testar hipóteses e refazer trabalho — o que custa tempo humano e computação.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
