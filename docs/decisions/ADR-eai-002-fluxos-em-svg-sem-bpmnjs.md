# ADR-eai-002 — Renderizar fluxos em SVG próprio, sem bpmn-js (no MVP/V1)

- **Status:** Aceito
- **Data:** 2026-06-17
- **Escopo:** visualizações de pipeline/resiliência da página `engenharia-agentes-ia`

## Contexto

O doc 05 especifica diagramas BPMN executáveis (com `bpmn-js`/`bpmn-moddle`) para ensinar pipeline
determinístico, Saga, DLQ e roteamento por confiança. `bpmn-js` é uma dependência pesada
(~centenas de KB) e traz seu próprio DOM/canvas, com controle limitado de acessibilidade e de tema.

## Decisão

No MVP/V1, renderizar os fluxos com **SVG/CSS próprios** (sem `bpmn-js`):

- Mantém o bundle enxuto e o tema "Dark Tech" coerente (tokens `--eai-*`).
- Permite equivalentes textuais e foco por teclado sob nosso controle (doc 08).
- Cobre o objetivo pedagógico (feliz × Saga × DLQ × roteamento por confiança) com troca de cenário.

`bpmn-js` **editável** fica **diferido para a V2** (WU-13), e só entra se a edição real de diagramas
pelo usuário justificar o peso — então com novo ADR.

## Consequências

- (+) Página leve, acessível e on-brand; zero dependência nova.
- (+) Coerente com "infra-as-little-as-possible" do guia.
- (−) Sem semântica BPMN real nem export XML; é uma representação didática, não um editor.
