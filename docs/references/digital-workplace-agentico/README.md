---
titulo: Fonte de referência — Digital Workplace agêntico (cópia neutra, sem marcas)
modulo: Referência
ultima_atualizacao: 2026-10-03
tags: [digital-workplace, exp, agentes, ag-ui, referencia, procedencia]
---

# Fonte de referência: Digital Workplace agêntico

Cópia **neutra** do estudo que alimenta a página `src/digital-workplace-agentico.html`.
Especificação da página: [`docs/specs/pages/digital-workplace-agentico/`](../../specs/pages/digital-workplace-agentico/README.md).

> **Restrição legal (vinculante).** Esta pasta, a página, o Markdown companheiro, o gêmeo `/en/`
> e qualquer texto derivado **não citam nem referenciam nenhuma organização real como caso**.
> O assunto é sempre "um portal corporativo de grande porte". Regras completas em
> [`06_restricao_legal_e_procedencia.md`](../../specs/pages/digital-workplace-agentico/06_restricao_legal_e_procedencia.md).
> Guarda automática: `tests/digital-workplace.legal.test.mjs` (roda no `npm run gate`).

## Rótulos epistêmicos

Toda afirmação relevante carrega um rótulo, e a página preserva esses rótulos como selos:

| Rótulo | Significado |
| :-- | :-- |
| `[FATO]` | Verificável em fonte primária citada (especificação, RFC, documentação oficial, lei). |
| `[INFERÊNCIA]` | Conclusão derivada de fatos, com o raciocínio explícito. |
| `[HIPÓTESE]` | Suposição plausível, ainda não verificada. |
| `[RECOMENDAÇÃO]` | Posição de arquitetura proposta pelo estudo. |

## Mapa dos arquivos

| Pasta | Arquivo | Tema |
| :-- | :-- | :-- |
| `03_pilares` | `ag_ui_protocolo_eventos_e_estado.md` | AG-UI: famílias de eventos, streaming, estado, interrupções |
| | `generative_ui_design_system_e_component_registry.md` | UI generativa governada, Component Registry, A2UI, MCP Apps |
| | `ecm_csp_headless_content_governanca.md` | ECM → CSP → Headless, metadados, ciclo de vida |
| | `exp_digital_workplace_composable_mach.md` | EXP, componível, MACH, jornadas, omnichannel |
| | `frontend_modular_microfrontends_ssr_cdn.md` | micro-frontends, SSR, streaming, CDN |
| | `camada_de_integracao_bff_eventos_workflows.md` | gateway, BFF, eventos, CDC, workflow engines |
| | `enterprise_search_rag_e_knowledge_graphs.md` | busca híbrida, RAG, permissões, knowledge graphs |
| | `agentes_tool_calling_mcp_a2a.md` | tool calling, MCP, A2A, autonomia, guardrails |
| `04_transversais` | `arquitetura_de_referencia_integrada.md` | modelo de camadas comum |
| | `fluxo_agente_ag_ui_ferramentas_processos.md` | fluxo ponta a ponta |
| | `cadeia_do_conhecimento_ecm_ao_agente.md` | da fonte canônica ao agente |
| | `seguranca_iam_identidade_do_agente.md` | delegação (RFC 8693), PEP/PDP, ameaças |
| | `governanca_dados_lgpd_ai_governance.md` | LGPD, linhagem, governança de IA |
| | `processos_corporativos_e_agentes.md` | agente no processo, exceções humanas |
| | `ux_experiencia_orientada_a_intencao.md` | intenção, confiança, handoff, a11y |
| | `operacao_observabilidade_sre_dex.md` | traces, SLOs de qualidade, DEX |
| `05_decisao` | `matriz_tecnologica.md` | tecnologias por problema e camada |
| | `tradeoffs_e_paradoxos_arquiteturais.md` | conflitos e como se resolvem |
| | `anti_patterns.md` | erros prováveis e detecção |
| | `perguntas_criticas_01_a_15.md` / `perguntas_criticas_16_a_30.md` | 30 perguntas críticas |
| `06_evolucao` | `modelo_de_maturidade_cinco_estagios.md` | cinco estágios e critérios |
| | `roadmap_e_dependencias.md` | fases 0–5, trilhas T1–T7 |
| | `roteiro_de_estudo_e_metricas.md` | trilhas de leitura e métricas |

## Lacunas desta cópia

As pastas `01_contexto` (sumário executivo, questões abertas) e `02_analise_multidisciplinar`
(as cinco lentes do ARB e a matriz de responsabilidades) **ainda não estão nesta cópia**. Alguns
arquivos acima citam esses caminhos; as referências ficam pendentes até a cópia neutra deles ser
adicionada (decisão D-4 em `05_plano_de_desenvolvimento.md`). Enquanto isso, o conteúdo dessas
seções da página vem da síntese escrita no doc `01_arquitetura_informacao_e_narrativa.md` da spec.

Não existe, e não deve existir, arquivo de "evidências do caso": a página não é estudo de caso.
