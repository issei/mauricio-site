---
titulo: UX e Employee Experience orientadas à intenção — interação humano-agente, confiança, handoff, acessibilidade e medição de DEX
modulo: Transversal — UX & Employee Experience
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [ux, employee-experience, intent-driven, conversational-ux, generative-ui, progressive-disclosure, confianca, handoff, acessibilidade, dex]
---

# UX e Employee Experience orientadas à intenção: interação humano-agente, confiança, handoff e acessibilidade

Este arquivo descreve como muda a experiência do colaborador quando o portal passa a compreender intenção, e quais padrões de design tornam essa mudança segura e útil. Ele trata dos modos de interação, dos padrões de confiança e explicabilidade, do handoff para humanos, da prevenção de erro, da acessibilidade e de como medir experiência quando a interface é dinâmica. As propostas são **[RECOMENDAÇÃO]** e não descrevem um portal específico.

## 1. O que muda para o colaborador

| Aspecto | Antes | Depois |
| --- | --- | --- |
| Ponto de partida | "onde fica isso?" | "o que eu quero fazer?" |
| Conhecimento exigido | mapa de sistemas e menus | nenhum; a plataforma carrega o mapa |
| Formulário | completo, genérico | só o que falta, pré-preenchido |
| Acompanhamento | entrar em cada sistema | perguntar ou receber notificação |
| Erro | descobre depois, por e-mail | é prevenido na hora, com explicação |
| Ajuda | buscar FAQ ou abrir chamado | pergunta na mesma conversa, com handoff se precisar |

## 2. Modos de interação

A experiência madura combina modos, em vez de substituir tudo por chat:

| Modo | Bom para | Exemplo |
| --- | --- | --- |
| **Navegação** | explorar, tarefas conhecidas, usuários avançados | catálogo de serviços, menus |
| **Busca** | encontrar algo específico | "política de viagens" |
| **Conversa** | expressar intenção complexa, esclarecer | "minha filha nasceu, o que preciso fazer?" |
| **Componente estruturado** | entrada precisa, confirmação | formulário de férias com calendário |
| **Notificação proativa** | eventos que o usuário não acompanha | "seu reembolso foi pago" |

**[RECOMENDAÇÃO]** A caixa de intenção é o ponto de entrada preferencial, mas navegação e busca permanecem acessíveis. Remover menus antes de o agente provar resolução reduz a confiança e prejudica usuários que preferem navegar.

## 3. Padrões de design para interação humano-agente

### 3.1 Descobribilidade

- **Sugestões contextuais** ("você pode pedir: marcar férias, consultar saldo, incluir dependente").
- **Exemplos de pedidos** na primeira interação.
- **Respostas que ensinam** ("posso também simular o valor do abono, quer ver?").

### 3.2 Progressive disclosure

- Mostrar primeiro a resposta curta e a ação principal; detalhes e fontes sob demanda.
- Formulários que crescem conforme as respostas ("tem dependente estudante?" só aparece se houver dependente acima de 21 anos).

### 3.3 Transparência de execução

- **Atividades visíveis:** "consultando seu saldo", "verificando elegibilidade". No AG-UI, os eventos de atividade servem para progresso estruturado fora da transcrição. **[FATO]** ([AG-UI Event Streams](https://docs.ag-ui.com/spec/1.0/events/index.md))
- **Distinção clara** entre o que o agente **sabe** (dados do sistema), o que **encontrou** (fontes) e o que **sugere**.

### 3.4 Confirmação antes de efeito

O componente de confirmação é **fixo** e **não parametrizável** em sua estrutura essencial:

```text
┌─────────────────────────────────────────────┐
│ Confirme sua solicitação                    │
│ Férias: 10/12/2026 a 24/12/2026 (15 dias)   │
│ Abono pecuniário: não                       │
│ Aprovador: Maria Souza (gestora)            │
│ Saldo após a solicitação: 15 dias           │
│                                             │
│ [Confirmar]   [Editar]   [Cancelar]         │
└─────────────────────────────────────────────┘
```

Valores críticos destacados; linguagem simples; ação primária clara; possibilidade de editar sem recomeçar.

### 3.5 Confiança calibrada

- **Citar fontes** com nome, versão e data.
- **Admitir incerteza** ("não encontrei uma regra específica para o seu caso; recomendo falar com o RH").
- **Não simular empatia excessiva** em temas sensíveis; ser direto e oferecer o canal humano.

### 3.6 Feedback

- "Isso resolveu?" com motivos estruturados (errado, desatualizado, incompleto, não entendi).
- O feedback alimenta a avaliação e é visível para os donos de conteúdo e de processo.

## 4. Handoff agente/humano

| Momento | Boa prática |
| --- | --- |
| Antes | explicar por que o caso vai para uma pessoa |
| Durante | transferir contexto estruturado, sem pedir que o colaborador repita |
| Expectativa | informar fila, SLA e canal de acompanhamento |
| Retorno | permitir retomar a conversa quando o humano devolver |
| Sensibilidade | para temas como assédio, saúde mental e desligamento, oferecer o humano **imediatamente**, sem tentativa de resolução automática |

## 5. Prevenção de erro

- **Validação imediata** pelo domínio, com mensagem acionável ("a data de início precisa ser pelo menos 30 dias à frente").
- **Restrição de entrada** por componente (calendário com datas válidas, lista de dependentes elegíveis).
- **Desfazer** quando o processo permitir.
- **Reautenticação** para ações sensíveis.
- **Nada de ações implícitas:** o agente não executa uma ação com efeito porque "entendeu que era isso".

## 6. Generative UI do ponto de vista de UX

- **Previsibilidade para intenções frequentes:** as intenções de maior volume usam templates de tela estáveis, que o usuário aprende.
- **Adaptação para a cauda longa:** composição a partir do catálogo de componentes.
- **Consistência visual garantida pelo Design System** e por tokens comuns entre canais.
- Detalhamento técnico em `03_pilares/generative_ui_design_system_e_component_registry.md`.

## 7. Acessibilidade

| Risco específico de interfaces dinâmicas | Prática |
| --- | --- |
| Conteúdo novo não anunciado | `aria-live="polite"` com moderação |
| Streaming gerando anúncios excessivos | anunciar ao final do parágrafo ou da etapa |
| Perda de foco quando componentes são substituídos | gestão explícita de foco |
| Componentes gerados sem rótulos | só componentes certificados do catálogo |
| Dependência de chat para tudo | caminhos alternativos por navegação |
| Tempo limite em interrupções | prazos generosos; aviso antes de expirar |

Referência: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## 8. Pergunta crítica: como medir DEX quando a interface é dinâmica?

Métricas de tela (tempo na página, cliques) perdem sentido quando cada sessão tem uma composição diferente. **[RECOMENDAÇÃO]** Medir pela **intenção**, não pela tela:

| Métrica | Definição |
| --- | --- |
| Taxa de resolução por intenção | proporção de intenções concluídas sem humano e sem recontato |
| Tempo até a resolução | do primeiro pedido ao resultado no SoR |
| Esforço percebido | pergunta curta pós-interação (escala de esforço) |
| Turnos por resolução | quantas trocas foram necessárias |
| Taxa de edição em confirmações | quanto o usuário corrige o que o agente preparou (indica qualidade da coleta) |
| Taxa de abandono por etapa | onde as pessoas desistem |
| Escalonamento para humano | proporção e motivo |
| Recontato em 7 dias | resolução real versus aparente |

Combinadas com a telemetria e o sentimento das ferramentas de DEX ([Computerworld](https://www.computerworld.com/article/1612536/digital-employee-experience-dex-employee-retention-tool.html)), essas métricas formam uma visão de experiência que independe da forma da interface.

## 9. Riscos de UX

- **Caixa de texto opaca:** usuário não sabe o que pedir.
- **Antropomorfização excessiva:** o colaborador confia demais em um "assistente" que parece humano.
- **Respostas longas:** o agente explica demais quando um botão bastaria.
- **Inconsistência entre canais:** a mesma intenção com experiências muito diferentes no app e no Teams.
- **Perda de autonomia:** usuários avançados obrigados a conversar para fazer o que antes faziam em dois cliques.

## 10. Relação com os demais pilares

| Pilar | Contribuição para a experiência |
| --- | --- |
| AG-UI | streaming, atividades, estado editável, interrupções |
| Generative UI | interface adequada à tarefa, governada |
| Knowledge | respostas com fonte e vigência |
| Processos | prazos e estados honestos |
| Segurança | confirmação e reautenticação proporcionais ao risco |
| Observabilidade | métricas por intenção |

## Fontes

- AG-UI, Event Streams: https://docs.ag-ui.com/spec/1.0/events/index.md
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Computerworld, DEX: https://www.computerworld.com/article/1612536/digital-employee-experience-dex-employee-retention-tool.html
