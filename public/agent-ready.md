# Agent Ready — o site legível por agentes

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/agent-ready>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-09-07 · Atualizado: 2026-09-07.

## Em síntese

**Agent Readiness** não é uma lista de arquivos em `/.well-known/`. É tratar o agente como um **terceiro consumidor de primeira classe** — que chega sem sessão, sem layout e sem contexto — e publicar, por leitura de máquina, **o que existe**, **em que formato**, **sob quais regras** e **com qual credencial**.

- **Discoverable** — descoberta explícita em camadas independentes: DNS, header `Link` (RFC 8288), `robots.txt`, sitemap.
- **Readable** — negociação de conteúdo: `Accept: text/markdown` na mesma URL, com `Vary: Accept`.
- **Controllable** — regra de uso legível por máquina: `Content-Signal: ai-train=no, search=yes, ai-input=yes`.
- **Callable** — contratos invocáveis: API Catalog (RFC 9727), MCP Server Card, Agent Skills com digest, WebMCP.

## As cinco camadas de descoberta

A superfície agêntica deste site é publicada em cinco camadas independentes entre si: (1) DNS — registros HTTPS/SVCB sob _agents., resolvidos antes de qualquer HTTP e validados por DNSSEC; (2) header HTTP — Link (RFC 8288) com sete relações em toda resposta, mais Vary: Accept; (3) /.well-known/ — api-catalog (RFC 9727), ai-catalog.json, mcp/server-card.json, agent-card.json, agent-skills/index.json, oauth-protected-resource (RFC 9728), openid-configuration e oauth-authorization-server; (4) auth — auth.md em prosa mais os metadados OAuth; (5) runtime — ferramentas registradas em navigator.modelContext (WebMCP). Nenhuma depende da outra: o agente entra por qualquer uma, porque você não controla qual delas o cliente conhece.

## Negociação de conteúdo Markdown

A mesma URL responde HTML para navegadores e Markdown para quem envia Accept: text/markdown. A implementação vive numa função na borda do CDN que compara os valores de qualidade q de text/markdown e text/html conforme a RFC 7231 §5.3.2 — um navegador envia text/html,...,*/*;q=0.8 e não pode receber Markdown. Duas guardas são obrigatórias: emitir Vary: Accept, sem o qual o CDN entrega a versão em cache errada; e isentar /.well-known/ de qualquer regra de sufixação de extensão, já que ali os nomes não têm extensão por registro da IANA.

## Controle de uso legível por máquina

robots.txt responde se o bot pode buscar; Content-Signal responde o que ele pode fazer depois. São três decisões independentes — search, ai-input e ai-train — e merecem respostas independentes. Neste site: Content-Signal: ai-train=no, search=yes, ai-input=yes. Um check que passa por ausência de bloqueio não é o mesmo que um check que passa por presença de regra: se a sua política difere por agente, é você que precisa escrevê-la.

## Contratos invocáveis

API Catalog (RFC 9727) publica um linkset com service-desc, service-doc e status por recurso. Os metadados OAuth (RFC 8414 e RFC 9728) declaram escopos, servidor de autorização e política; auth.md descreve o fluxo em prosa para o agente ler — inclusive quando o acesso é anônimo, porque declarar identidade anônima evita que o agente tente um fluxo inexistente. Agent Skills publica procedimento reutilizável com digest SHA-256, que torna verificável a instrução que entra no contexto do modelo. WebMCP registra ferramentas em navigator.modelContext atrás de um teste de existência, degradando em silêncio onde a API não existe.

## Como testar e o que o score não prova

Rode o scan por POST em https://isitagentready.com/api/scan e leia o JSON: o texto de remediação da interface é fixo por check e não muda entre tentativas, enquanto a evidência aponta qual validador reprovou. Corrija um check por vez, publique — o scan roda contra produção, não contra o repositório — e escreva um teste para cada check que passar. Sobre os limites: os checks de descoberta validam documentos, não runtime; declare apenas as capacidades que você sustenta e teste cada uma exercitando-a de verdade. Checks neutros não penalizam a nota e por isso também não atestam nada. Um score 100 significa que o site passou nos checks daquele instrumento, naquela configuração, naquela data.

## Perguntas frequentes

**O que é Agent Readiness?**

Agent Readiness é a propriedade de um site cuja superfície pública foi projetada para ser consumida por software autônomo: os recursos são descobríveis por mecanismo explícito, o conteúdo é entregue no formato que o agente pede, as regras de uso são declaradas de forma legível por máquina e as ações disponíveis são publicadas como contratos invocáveis. É uma camada nova sobre HTML, SEO e AEO — não uma substituição de nenhuma delas.

**O que significa ser Agent-Ready?**

Significa que um agente consegue responder quatro perguntas sobre o seu site sem adivinhar: quais recursos existem, em que formato consegue lê-los, o que pode fazer com o conteúdo e como invoca uma ação. Um site apenas acessível a bots responde 200 e não bloqueia; um site agent-ready transfere para si o ônus da inferência, publicando cada uma dessas respostas de forma verificável.

**Como alcançar score 100 no IsItAgentReady?**

Implementando as categorias em ordem: descoberta (robots.txt, sitemap, header Link RFC 8288, registros DNS com DNSSEC), acessibilidade de conteúdo (negociação Accept: text/markdown com Vary: Accept), controle de acesso (Content Signals), e descoberta de protocolo (API Catalog RFC 9727, metadados OAuth RFC 8414/9728, auth.md, MCP server card, A2A agent card, Agent Skills e WebMCP). Corrija um check por vez, publique, e leia a evidência no JSON do scan em vez do texto genérico da interface.

**O que é Markdown para agentes?**

É entregar a mesma URL em Markdown quando o cliente envia Accept: text/markdown, por negociação de conteúdo (RFC 7231 §5.3.2). Uma página de aplicação com 197 KB de HTML costuma caber em poucos KB de Markdown — neste site, 3,7 KB para o mesmo texto, 52 vezes menos bytes. Duas armadilhas: comparar os valores de qualidade q, já que um navegador manda */*;q=0.8 e não pode receber Markdown, e emitir Vary: Accept para o CDN não servir a versão errada.

**O que é um MCP Server Card?**

É um documento JSON em /.well-known/mcp/server-card.json que descreve, de forma legível por máquina, quais ferramentas e recursos um domínio expõe pelo Model Context Protocol: nome do servidor, transporte, ferramentas com entrada tipada e recursos carregáveis. Ele é a camada de descoberta — a descrição do contrato. Publique nele exatamente as capacidades que você está pronto para sustentar.

**O que são Agent Skills?**

Agent Skills publicam procedimento reutilizável, não dado: cada skill é um arquivo SKILL.md com instruções sobre como fazer algo naquele domínio, listado em um index.json com a URL e o digest SHA-256 do arquivo. O digest é o ponto central — instrução que entra no contexto de um modelo é superfície de ataque, e o digest permite ao agente verificar que carregou o que o índice prometeu.

**Como agentes descobrem APIs?**

Pelo API Catalog da RFC 9727: um linkset em /.well-known/api-catalog que, para cada recurso (anchor), lista links tipados — service-desc para a especificação legível por máquina, service-doc para a documentação em prosa, status para o estado. O mesmo catálogo pode ser anunciado no header Link (RFC 8288), o que permite ao agente descobrir tudo com uma requisição HEAD, sem baixar página nem conhecer convenção de caminho.

**Como controlar o acesso de AI bots?**

Com duas camadas complementares. O robots.txt (RFC 9309) responde se o bot pode buscar. A diretiva Content-Signal responde o que ele pode fazer depois de ter buscado, separando três decisões independentes: search (aparecer em busca), ai-input (ser usado como fonte de uma resposta gerada) e ai-train (virar dado de treinamento). Para distinguir bots uns dos outros por identidade criptográfica, existe ainda o Web Bot Auth, baseado em assinatura de mensagem HTTP.

**Como testar se um site é Agent-Native?**

Rode um scan no IsItAgentReady — pela interface ou por POST na API — e leia o JSON, não o texto de remediação da interface, que é fixo por check e idêntico em todo site que falha aquele check. O sinal real está no detalhe das evidências, que aponta qual validador reprovou. Depois corrija um check por vez, publique (o scan roda contra produção, não contra o repositório), rescaneie e escreva um teste para cada check que passou.

**Um score 100 significa que o site é perfeito para agentes?**

Não. Significa algo preciso e limitado: o site passou nos checks que aquele instrumento considerou, naquela configuração, naquela data. Os checks de descoberta validam documentos — que o arquivo existe, é JSON válido e tem os campos obrigatórios —, não abrem conexão com o que o documento descreve. Além disso, checks neutros não penalizam a nota e por isso também não atestam nada: um instrumento que não pune a ausência não certifica a presença.

## Glossário

- **Agent Readiness** — Superfície pública projetada para consumo por software autônomo: descobrível, legível, governada e invocável.
- **Agent-Native** — Nível em que o site publica contratos invocáveis e descobríveis, não apenas conteúdo acessível.
- **Header Link (RFC 8288)** — Anúncio de recursos relacionados no header HTTP; o agente descobre a superfície com um HEAD.
- **Negociação de conteúdo** — Servir formatos diferentes na mesma URL conforme o header Accept, com Vary: Accept.
- **Content Signals** — Diretiva no robots.txt que declara usos permitidos: search, ai-input e ai-train.
- **API Catalog (RFC 9727)** — Linkset em /.well-known/api-catalog que aponta especificação, documentação e estado de cada recurso.
- **PRM (RFC 9728)** — OAuth Protected Resource Metadata: quais escopos o recurso exige e onde está a política.
- **auth.md** — Documento em Markdown que descreve o fluxo de autenticação em prosa, para o agente ler.
- **MCP Server Card** — Descrição legível por máquina das ferramentas e recursos que um domínio expõe por MCP.
- **A2A Agent Card** — Declaração das habilidades que um domínio oferece a outros agentes (Agent2Agent).
- **Agent Skills** — Procedimentos reutilizáveis em SKILL.md, indexados com digest SHA-256 verificável.
- **WebMCP** — Registro de ferramentas em navigator.modelContext: a única camada em tempo de execução.
- **DNS-AID** — Registros HTTPS/SVCB sob _agents. que anunciam pontos de entrada agênticos; exige DNSSEC.
- **Web Bot Auth** — Identidade de bot provada por assinatura de mensagem HTTP, em vez de declarada no User-Agent.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
