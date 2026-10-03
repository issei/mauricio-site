---
titulo: Generative UI governada — Design System, Component Registry, determinismo e acessibilidade em interfaces adaptativas
modulo: Pilar 5.1 — AG-UI & Generative UI
nivel: Especialista
ultima_atualizacao: 2026-10-03
tags: [generative-ui, design-system, component-registry, a2ui, mcp-apps, open-json-ui, determinismo, acessibilidade, design-tokens, ag-ui]
---

# Generative UI governada: Design System, Component Registry, determinismo e acessibilidade

Este arquivo trata da pergunta mais delicada da camada de experiência: como permitir que um agente adapte a interface à tarefa do colaborador sem abrir mão de consistência, segurança, acessibilidade e previsibilidade. Ele compara as especificações de UI generativa que surgiram entre 2025 e 2026, propõe um modelo de **Component Registry** como contrato entre agente e Design System e responde como preservar determinismo, testar e garantir acessibilidade. Não se presume que a organização já use UI generativa; as propostas são **[RECOMENDAÇÃO]**.

## 1. Que problema existe

Um colaborador que pede "quero tirar férias de 10 a 24 de dezembro" não precisa de um parágrafo explicativo; precisa de um formulário pré-preenchido, do saldo de dias disponível e de um botão de confirmar. Um gestor que pergunta "quem da minha equipe está com férias vencendo?" precisa de uma tabela com ações. A interface ideal **depende da intenção**, e as intenções são abertas demais para que todas as telas sejam desenhadas antecipadamente.

## 2. Por que precisa ser resolvido com cuidado

Existem três formas de um agente "gerar interface", com riscos muito diferentes:

| Abordagem | Como funciona | Risco |
| --- | --- | --- |
| **Código livre** | o modelo gera HTML/JS/CSS | injeção, inconsistência, acessibilidade imprevisível, impossível de certificar |
| **UI declarativa sobre catálogo** | o modelo emite uma descrição (JSON) que referencia componentes conhecidos; o cliente renderiza com componentes nativos | limitada ao catálogo, mas governável |
| **UI encapsulada de terceiros** | o servidor de ferramenta fornece um template de UI que roda isolado (iframe sandbox) | isolamento forte, mas consistência visual depende de quem fornece |

**[INFERÊNCIA]** Em uma organização de setor regulado, a primeira abordagem é incompatível com requisitos de segurança, acessibilidade e auditoria. As duas outras são viáveis com governança.

## 3. Panorama das especificações (fatos e maturidade)

| Especificação | Origem | Modelo | Segurança | Maturidade (na data da fonte) |
| --- | --- | --- | --- | --- |
| **A2UI** | Google | declarativo, JSONL, streaming; lista plana de componentes com referências por ID | "formato de dados declarativo, não código executável"; o cliente mantém um **catálogo** de componentes pré-aprovados e o agente só pode pedir componentes desse catálogo | v0.8 em 15/12/2025 ([Google](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)) |
| **MCP Apps (SEP-1865)** | Anthropic, OpenAI e comunidade MCP-UI | recursos `ui://` pré-declarados, renderizados pelo host; comunicação por JSON-RPC via `postMessage` | "todo conteúdo de UI roda em iframes isolados com permissões restritas"; templates pré-declarados para revisão do host; consentimento opcional para tool calls iniciadas pela UI | proposta em 21/11/2025, com SDK de acesso antecipado ([MCP Blog](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)) |
| **Open-JSON-UI** | OpenAI | padronização aberta do schema declarativo interno da OpenAI | declarativo | citado pela documentação do AG-UI ([AG-UI](https://docs.ag-ui.com/concepts/generative-ui-specs.md)) |
| **Especificação própria** | a organização | schema interno sobre o Design System | o que a organização definir | o AG-UI permite definir padrões próprios |

Todas as entradas acima são **[FATO]** quanto ao que as fontes afirmam. O status atual de cada uma pode ter mudado desde a data da fonte.

### Relação com o AG-UI

A documentação do AG-UI é explícita: essas especificações definem **o que** renderizar; o AG-UI é o **protocolo de interação** que leva os pedidos ao cliente e traz as ações de volta, e suporta as três. **[FATO]** ([AG-UI](https://docs.ag-ui.com/concepts/generative-ui-specs.md)) Portanto, **AG-UI e Generative UI são complementares**: um é o canal, o outro é o vocabulário.

## 4. Capacidade que resolve: Component Registry

**[RECOMENDAÇÃO]** Um registro de componentes atua como contrato entre o agente e o Design System.

```text
Agente
  ↓  pede: componente + props + vínculo com estado
AG-UI  (tool call de frontend ou mensagem de UI declarativa)
  ↓
Component Registry  (valida nome, versão, schema, contexto, permissões)
  ↓
Design System  (implementação acessível, tokens, temas)
  ↓
Approved Components
  ↓
Runtime State  (snapshots e deltas)
  ↓
User Interface
```

### O que cada entrada do registro contém

```yaml
componente: vacation_request_form
versao: 2.3.0
descricao_para_agente: >
  Formulário para solicitar férias. Use quando o colaborador expressar
  intenção de tirar férias e houver saldo disponível.
props_schema:            # JSON Schema; props fora do schema são rejeitadas
  type: object
  required: [data_inicio, data_fim]
  properties:
    data_inicio: { type: string, format: date }
    data_fim:    { type: string, format: date }
    abono_pecuniario: { type: boolean, default: false }
acoes_emitidas: [confirmar, editar, cancelar]
efeito_colateral: sim     # exige confirmação e passagem pelo backend
contexto_exigido:
  autenticado: true
  perfis: [colaborador]
acessibilidade:
  wcag: "2.2 AA"
  auditado_em: 2026-08-14
canais: [web, mobile, teams]
dono: time-design-system
```

### Regras de execução

1. **Só componentes registrados podem ser instanciados.** Um nome desconhecido gera erro, não um fallback criativo.
2. **Props são validadas contra o schema** antes da renderização. Strings longas são truncadas, URLs são verificadas contra uma allowlist, HTML não é aceito.
3. **Componentes com efeito colateral não executam nada no cliente.** A ação de confirmar gera uma chamada ao backend, que reaplica a autorização.
4. **O conteúdo textual vindo do modelo é tratado como dado não confiável** (escapado, sem execução).
5. **Versões são fixadas** por release da aplicação; o agente vê apenas as versões disponíveis no cliente.

## 5. Como preservar determinismo em uma interface generativa

Determinismo total contradiz a ideia de adaptação. O objetivo é **determinismo onde importa**:

| Camada | Deve ser determinística? | Como |
| --- | --- | --- |
| Renderização de um componente dado um conjunto de props | **Sim** | componentes puros, testados, com snapshots visuais |
| Validação de props e de ações | **Sim** | schema e regras no cliente e no backend |
| Execução de ações com efeito | **Sim** | backend com regra de negócio e autorização |
| Componentes de confirmação, consentimento e avisos legais | **Sim, fixos** | não parametrizáveis pelo agente em seu conteúdo essencial |
| Escolha de qual componente mostrar | Adaptativa, mas restrita | catálogo por contexto; regras de "componente obrigatório" para certas intenções |
| Texto explicativo | Adaptativo | geração com fontes e guardrails |
| Ordem e layout da composição | Adaptativo dentro de templates | slots definidos pelo Design System |

**Técnica útil [RECOMENDAÇÃO]:** para intenções críticas e de alto volume, mapear a intenção para um **template de tela fixo**, e deixar a composição livre apenas para intenções de cauda longa. Assim, os 20% de intenções que respondem por 80% do volume têm experiência previsível e testável.

## 6. Como um Design System se torna consumível por agentes

1. **Descrições semânticas para o agente:** além da documentação para designers, cada componente ganha uma descrição de **quando usar** e **quando não usar**, escrita para o modelo.
2. **Schemas formais de props** (JSON Schema), gerados a partir dos tipos do componente.
3. **Tokens padronizados:** o formato de Design Tokens do W3C Community Group alcançou a versão estável 2025.10, com suporte a temas e multi-marca; é um relatório de Community Group, não uma Recomendação W3C. **[FATO]** ([W3C CG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)) Tokens comuns permitem renderizar o mesmo componente em web, mobile e Teams.
4. **Catálogo exposto como ferramentas de frontend** pelo AG-UI ou como catálogo de uma especificação declarativa (como o A2UI).
5. **Testes de "uso pelo agente":** avaliações que verificam se, para um conjunto de intenções, o agente escolhe o componente certo com props válidas.

## 7. Como testar uma interface que muda conforme o contexto

| Nível | O que se testa | Técnica |
| --- | --- | --- |
| Componente | renderização correta para qualquer props válida | testes unitários, property-based testing com geração de props pelo schema, regressão visual |
| Contrato | o agente só produz pedidos válidos | validação de schema em CI sobre um conjunto de saídas gravadas |
| Composição | templates e slots aceitam combinações | testes de composição com combinações representativas |
| Comportamento do agente | para a intenção X, o componente Y aparece com props corretas | avaliações (evals) com conjunto de intenções e asserções sobre os eventos AG-UI emitidos |
| Ponta a ponta | jornada completa | testes E2E com o agente substituído por um **agente simulado determinístico** que emite eventos gravados |
| Acessibilidade | cada componente e cada template | testes automatizados (axe) e auditoria manual por componente |

**Chave [RECOMENDAÇÃO]:** gravar fluxos de eventos AG-UI reais e reproduzi-los em testes. O protocolo, baseado em eventos serializáveis, favorece esse tipo de teste de replay.

## 8. Como garantir acessibilidade em Generative UI

- **Certificar componentes, não telas:** se cada componente é acessível e a composição usa slots acessíveis, a tela composta herda a acessibilidade.
- **Gestão de foco:** quando o agente substitui um componente, o foco vai para o novo conteúdo de forma previsível; nunca se perde.
- **Regiões ao vivo:** anúncios de progresso via `aria-live="polite"` com throttling; o streaming de texto não pode gerar um anúncio por token.
- **Alternativa textual sempre presente:** todo componente tem uma representação em texto equivalente, útil também para canais sem UI rica.
- **Respeito a preferências:** movimento reduzido, alto contraste e tamanho de fonte vêm dos tokens.
- Referência normativa: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## 9. Dependências, riscos e relações

### Dependências

Design System maduro com componentes acessíveis; tipos e schemas formais; protocolo de interação (AG-UI ou equivalente); backend que reaplica autorização a ações vindas da UI.

### Riscos

| Risco | Mitigação |
| --- | --- |
| Catálogo pequeno demais leva a pressão por "geração livre" | crescer o catálogo guiado por telemetria de intenções não atendidas |
| Catálogo grande demais confunde o modelo | catálogo filtrado por contexto e intenção |
| Divergência entre canais | tokens comuns e testes por canal |
| Componente de terceiros (iframe) com experiência inconsistente | permitir iframes apenas para domínios aprovados e com guia de estilo |

### Relações

- Com **AG-UI:** canal de transporte para pedidos de UI e ações de volta.
- Com **segurança:** ações com efeito passam pelo backend; conteúdo do modelo é dado não confiável.
- Com **observabilidade:** cada renderização é um evento com componente, versão e resultado (confirmou, editou, abandonou).

## Fontes

- Google, Introducing A2UI (15/12/2025): https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/
- MCP Blog, MCP Apps (21/11/2025): https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/
- SEP-1865, MCP Apps: https://modelcontextprotocol.io/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp
- AG-UI, Generative UI specs: https://docs.ag-ui.com/concepts/generative-ui-specs.md
- AG-UI, Tools: https://docs.ag-ui.com/concepts/tools.md
- W3C Design Tokens CG, versão estável 2025.10: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
