# B — Rastreabilidade do conteúdo: TGI sobre EDI

> Artefato B da especificação. A Parte 1 é o inventário estruturado do conteúdo original, lido
> integralmente a partir do ZIP. A Parte 2 é a matriz que liga cada conteúdo previsto para a página
> à sua fonte. A Parte 3 lista as fontes contemporâneas e o que cada uma sustenta.
>
> Toda página citada como "p. N" é a **página impressa** do TGI (a do sumário), conferida no PDF
> renderizado (inventário §4.2). Os arquivos de trabalho estão em
> `/mnt/project-files/estudos/tgi-edi-2004/extraido/` (privado).

## Convenções

**Tipo de conteúdo** (exigência do pedido, §7):

| Código | Tipo | Selo na página |
| :-- | :-- | :-- |
| T1 | Informação encontrada no TGI | "TGI, 2004" |
| T2 | Informação histórica externa | "Contexto histórico" |
| T3 | Informação contemporânea | "Atualização técnica" |
| T4 | Interpretação própria (2026) | "Leitura de 2026" |
| T5 | Hipótese que ainda precisa ser validada | não publicada enquanto não validada |

**Tratamento editorial:**

| Código | Tratamento |
| :-- | :-- |
| CIT | Citação literal, entre aspas ou em `<blockquote>`, com página. No gêmeo `/en/`, fica em português com `translate="no"` |
| PAR | Paráfrase fiel: mesma afirmação, mesmo alcance, mesmos qualificadores, com página |
| SIN | Síntese de vários trechos, com as páginas de cada um |
| DIA | Diagrama reconstruído; só elementos sustentados pelo TGI; rotulado "reconstrução histórica" |
| TAB | Tabela que reorganiza informação do TGI sem acrescentar dado |
| NOT | Nota de contexto ou errata |
| EXC | Excluído da página (permanece no documento original) |

**Validação:** `—` não requer · `V-rev` revisão do autor do site · `V-co` revisão ou consentimento
dos coautores · `V-fonte` conferir na fonte antes de publicar · `V-dir` decisão sobre direitos.

---

## Parte 1 — Inventário estruturado do conteúdo original

| Campo | O que o TGI diz | Origem |
| :-- | :-- | :-- |
| **Problema** | A gestão de pedidos entre varejo e indústria depende de documentos em papel redigitados a cada etapa; isso aumenta o tempo de processamento, os erros, o custo de pessoal e a incerteza sobre o recebimento do pedido. O ciclo de uma transação "poderia chegar a até uma semana" no exemplo dos autores. | Cap. 1, p. 12–13; cap. 9.1, p. 58–59 |
| **Contexto** | Mercado competitivo; logística integrada e SCM como conceitos gerenciais recentes; ECR difundido no Brasil "mais efetivamente a partir de 1997" (p. 34); VANs como canal de comunicação (IBM, Interchange, Embratel e Proceda citadas como principais no mercado brasileiro); X.400/X.435 indicados como suporte de comunicação no Brasil. | Cap. 2–3, p. 19–35; cap. 5, p. 40; cap. 7.1, p. 50 |
| **Objetivo** | "Analisar os aspectos positivos e negativos da Gestão de Pedidos, entre [...] o varejo e a indústria, utilizando a tecnologia [...] EDI" (resumo). Objetivo principal no corpo: "demonstrar como a Gestão de Pedidos aliada a tecnologia EDI é um grande diferencial frente ao mercado competitivo". | Resumo; cap. 1, p. 15 |
| **Perguntas de pesquisa** | (1) Como empresas do ramo mercantil podem implantar uma gestão de pedidos eficiente com EDI? (2) Que valores são agregados além dos citados? (3) Qual a infraestrutura necessária? (4) Como deve ser o processo de implantação, suas tarefas e cuidados? | Cap. 1, p. 16 |
| **Método declarado** | Abordagem qualitativa; levantamento de conceitos; estudo de caso; questionário ("entrevista estruturada") e entrevista não estruturada. Ressalva dos autores: "não se pode generalizar as conclusões dos estudos de caso, pois são particulares". | Cap. 1, p. 17–18 |
| **Conceitos** | Logística e vantagem competitiva (Christopher); SCM (Fleury; Chopra e Meindl); serviço ao cliente (Ballou); ECR; EDI (definições EAN Brasil 2003 e ECR Brasil 1998); histórico de padrões (ONU 1961, TDCC 1968, ANSI X12 1979, UCS 1982, EDIFACT 1987, ABAC 1987); níveis de padronização; X.400, P1/P2, X.435 (P-EDI); VAN e critérios de escolha; componentes (mensagem padronizada, software tradutor, comunicação); custos e benefícios tangíveis e intangíveis; plano de implantação; VMI; reposição automática. | Cap. 2–10, p. 19–76; cap. 11, p. 81–84 |
| **Processo (ciclo do pedido)** | Sem EDI: pedido gerado, impresso, enviado; fornecedor redigita; fatura em papel volta pelo correio. Com EDI: pedido, aviso de entrega, confirmação e fatura trocados eletronicamente entre aplicativos. | Cap. 9.1, p. 58–60; cap. 9.2.3, p. 63 (Ilustração 11) |
| **Estudo de caso** | Makro Atacadista S/A: 48 lojas no Brasil; ~1.200 fornecedores, ~150 em EDI; 4 VANs (Interchange, IBM, Proceda, Mercador); pedido gerado por reposição automática no servidor Unix e enviado como ORDERS; VMI com 3 fornecedores; mensagens EDIFACT ORDERS, INVOICE, RECADV, INVRPT, REMADV; fornecedores sem EDI usam um B2B na web. Fonte: visita e entrevista com o responsável pelo ECR no Makro, e material "Makro, 2003". | Cap. 11, p. 77–85 |
| **Resultados relatados** | Ruptura: redução de "cinco por cento" na taxa. Estoque: não aumentou, contra a expectativa da empresa. Vendas: aumentaram "consequentemente" à redução da ruptura (sem número). Índice de financiamento de estoque: citado como critério, sem resultado. Fornecedores passaram a analisar melhor as vendas (constatação qualitativa). | Cap. 11, p. 83–84 |
| **Limitações declaradas** | Não generalização do estudo de caso (p. 18). Benefícios estratégicos "difíceis de quantificar" (p. 66). Dificuldade da empresa em encontrar parceiros comprometidos (p. 79). | p. 18, 66, 79 |
| **Conclusões** | O EDI traz benefícios tangíveis e intangíveis; custos de implantação são controláveis com projeto bem planejado; no Makro, oito benefícios listados (comprometimento com parceiros, menos retrabalho, automação, padronização, menos falta de estoque e mais vendas, confiabilidade, visão da cadeia como um todo, troca de informação estratégica); o EDI "foi um fator extremamente importante" para o Makro atingir seus objetivos de nível de serviço. | Cap. 12, p. 86–88 |
| **Evidências** | Bibliografia de 9 obras e 3 referências on-line sem data de acesso (p. 89–90); entrevista (questionário como anexo, sem respostas transcritas); material "Makro, 2003" sem entrada na bibliografia. | p. 89–90; arquivo 14 |

---

## Parte 2 — Matriz de rastreabilidade

### 2.1 Apresentação (`#apresentacao`)

| ID | Conteúdo previsto | Fonte | Seção / pág. | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| A-01 | Título "Gestão de Pedidos utilizando a tecnologia EDI" | Capa, folha de rosto | arq. 1–2 | T1 | CIT (grafia original) | — |
| A-02 | Autores, na ordem da capa | Capa; ficha catalográfica | arq. 1, 3 | T1 | CIT | V-co |
| A-03 | Instituição, faculdade, curso, ano, orientador, banca, aprovação | Folha de rosto; aprovação | arq. 2, 4 | T1 | CIT | — |
| A-04 | Tema central em uma frase | Resumo; cap. 1 | p. 12, 15 | T1 | PAR | V-rev |
| A-05 | Por que consultar hoje (registro de uma integração varejo–indústria em 2004, com fontes e limites explícitos) | Esta spec | — | T4 | Texto próprio, curto, com selo | V-rev |
| A-06 | Aviso de contexto histórico ("trabalho acadêmico de 2004; descreve sistemas e práticas daquele ano") | Esta spec | — | T4 | NOT | — |

### 2.2 O problema investigado (`#problema`)

| ID | Conteúdo previsto | Fonte | Seção / pág. | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| P-01 | Gestão de pedidos como elo entre indústria e prateleira do varejo; exemplo do sabonete | Cap. 1 | p. 12–13 | T1 | PAR | — |
| P-02 | Quatro efeitos do papel: tempo, baixa precisão, custo de pessoal, incerteza | Cap. 9.1 | p. 58–59 | T1 | SIN em lista | — |
| P-03 | Ciclo de até uma semana no exemplo (condicionado ao correio e à fila do fornecedor) | Cap. 9.1 | p. 58 | T1 | PAR, mantendo "poderia chegar a até" | — |
| P-04 | Observação dos autores: a informatização costuma trocar formulários sem mudar o processo | Cap. 9.1 | p. 58 | T1 | CIT curta | — |
| P-05 | Perguntas de pesquisa (4) | Cap. 1 | p. 16 | T1 | CIT em lista | — |
| P-06 | Objetivo do resumo × objetivo do corpo (analisar prós e contras × demonstrar diferencial) | Resumo; cap. 1 | resumo; p. 15 | T1 | CIT das duas formulações, lado a lado | — |

### 2.3 A solução estudada (`#solucao`)

| ID | Conteúdo previsto | Fonte | Seção / pág. | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| S-01 | Definição de EDI (EAN Brasil, 2003, citada pelo TGI) | Cap. 4.1 | p. 37 | T1 | CIT | — |
| S-02 | Camada **padrão/mensagem**: sintaxe + vocabulário; EDIFACT e ANSI X12; Tabela 4 (níveis) | Cap. 6, 6.1 | p. 42–43 | T1 | SIN + TAB | — |
| S-03 | Camada **infraestrutura**: VAN como caixa postal, segurança, monitoração; X.400 store-and-forward | Cap. 6.2, 7 | p. 44–51 | T1 | SIN | — |
| S-04 | Critérios de escolha de VAN (disponibilidade, distribuição, segurança, auditoria, backup, serviços) | Cap. 7.1 | p. 50–52 | T1 | TAB | — |
| S-05 | Camada **software**: tradutor/conversor entre formato interno e mensagem padronizada | Cap. 8.1.2 | p. 55–56 | T1 | PAR | — |
| S-06 | Camada **regras de negócio**: acordo de intercâmbio (padrões, especificações, link, caixas postais, retenção, contatos) | Cap. 10.6 | p. 75–76 | T1 | TAB | — |
| S-07 | Plano de implantação em 6 etapas (viabilidade → intercâmbio), declarado pelos autores como "plano teórico" | Cap. 10 | p. 67–76 | T1 | SIN, com o qualificador "teórico" | — |
| S-08 | Teste piloto com processamento em papel em paralelo até confiança dos dois lados | Cap. 10.5 | p. 74–75 | T1 | PAR | — |
| S-09 | Histórico de padrões (1961 → CEFACT) | Cap. 5 | p. 38–41 | T1 | SIN curta | V-fonte (ver R-09) |

### 2.4 O estudo de caso (`#estudo-de-caso`)

| ID | Conteúdo previsto | Fonte | Seção / pág. | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| E-01 | Perfil do Makro em 2004: 48 lojas, autosserviço atacadista, clientes identificados por passaporte | Cap. 11 | p. 77 | T1 | PAR, com "em 2004, segundo o TGI" | — |
| E-02 | Posição na cadeia: distribuidor entre grandes indústrias e pequenos/médios varejos (Ilustração 15) | Cap. 11 | p. 78–79 | T1 | PAR | — |
| E-03 | Motivação da adoção: padronizar documentos, agilizar o ciclo do pedido, viabilizar reposição automática, reduzir custos | Cap. 11 | p. 79 | T1 | PAR, atribuída ao entrevistado | — |
| E-04 | Dificuldade principal: encontrar parceiro comprometido; sem grandes mudanças internas | Cap. 11 | p. 79 | T1 | PAR | — |
| E-05 | Fator crítico: cultura do fornecedor no tratamento das informações recebidas | Cap. 11 | p. 80 | T1 | PAR | — |
| E-06 | ~1.200 fornecedores, ~150 em EDI | Cap. 11 | p. 80 | T1 | PAR, com "cerca de" | — |
| E-07 | 4 VANs; motivo (fornecedores já ligados a uma única VAN); divisão de custo 50/50 em três e 100% do fornecedor na Mercador; plano de migrar para a Mercador "no próximo ano" | Cap. 11 | p. 80–81 | T1 | PAR; o plano de migração é intenção de 2004, não fato consumado | — |
| E-08 | Arquitetura (Ilustração 16): bases em servidores IBM e Solaris; servidor de aplicativo Unix; software de transmissão EDI; ORDERS ao fornecedor | Cap. 11 | p. 80–81 | T1 | DIA "reconstrução histórica" | V-rev |
| E-09 | Reposição automática pelo Makro: parâmetros (máx., mín., ponto de reposição) + quantidade mínima por fornecedor → pedido automático | Cap. 11 | p. 83–84 | T1 | DIA + PAR | — |
| E-10 | VMI com 3 fornecedores; fluxos 0–4 da Ilustração 18 (sentidos no inventário §5.3); envio diário de estoque por loja | Cap. 11 | p. 81–83 | T1 | DIA "reconstrução histórica" | V-rev |
| E-11 | Condição do VMI segundo o TGI: relação de confiança e alto nível tecnológico do fornecedor | Cap. 11 | p. 82 | T1 | PAR | — |
| E-12 | Mensagens EDIFACT: ORDERS, INVOICE, RECADV, INVRPT, REMADV | Cap. 11 | p. 85 | T1 | TAB (nome original + função dada pelo TGI) | — |
| E-13 | Fornecedores sem EDI usam um B2B web do Makro | Cap. 11 | p. 85 | T1 | PAR | — |
| E-14 | Nomes dos fornecedores do VMI (Souza Cruz, Coca-Cola, Sadia) e das indústrias citadas | Cap. 11 | p. 78, 81 | T1 | PAR, com "segundo o TGI, em 2004" | V-rev |
| E-15 | Nome do entrevistado | Agradecimentos; cap. 11 | p. 79 | T1 | EXC na página (citado pela função); fica no documento original | V-rev (D-3) |
| E-16 | Mensagem do "lote que será despachado" (p. 81) sem tipo EDIFACT nomeado | Cap. 11 | p. 81, 85 | T1 | NOT: o TGI não nomeia a mensagem; a página não supre | — |

### 2.5 Resultados e limitações (`#resultados`)

| ID | Conteúdo previsto | Fonte | Seção / pág. | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| RS-01 | **Métrica documentada:** ruptura reduzida em "cinco por cento" | Cap. 11 | p. 84 | T1 | CIT exata + nota de ambiguidade (RS-07) | — |
| RS-02 | **Observação relatada:** estoque não aumentou, contra a expectativa | Cap. 11 | p. 84 | T1 | PAR | — |
| RS-03 | **Inferência dos autores:** vendas aumentaram "consequentemente" | Cap. 11 | p. 84 | T1 | CIT; rotular como inferência sem número | — |
| RS-04 | **Critério sem resultado:** índice de financiamento de estoque | Cap. 11 | p. 84 | T1 | PAR; "o TGI não apresenta valor" | — |
| RS-05 | **Percepção do entrevistado / da empresa:** motivação, dificuldade, fator crítico, crença no VMI | Cap. 11 | p. 79–82 | T1 | TAB | — |
| RS-06 | **Conclusões dos autores:** lista de 8 benefícios no Makro; "fator extremamente importante" | Cap. 12 | p. 87–88 | T1 | CIT da lista | — |
| RS-07 | Ambiguidade de "cinco por cento": pontos percentuais ou variação relativa; sem linha de base, período, método de medição nem grupo de comparação | Leitura de RS-01 | p. 84 | T4 | NOT | — |
| RS-08 | Limitações declaradas pelos autores (não generalização; benefícios difíceis de quantificar) | Cap. 1; 9.2.4 | p. 18, 66 | T1 | CIT | — |
| RS-09 | Benefícios **esperados** (teóricos, cap. 9) separados dos **relatados** (cap. 11) | Cap. 9; 11 | p. 61–66; 83–84 | T1 | TAB em duas colunas | — |

### 2.6 O que mudou desde 2004 (`#o-que-mudou`) — Camada B

| ID | Conteúdo previsto | Fonte | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- |
| R-01 | Acertos que permanecem: valor do EDI depende da adesão dos parceiros (150 de 1.200; dificuldade p. 79); padronização no nível da mensagem; redesenho do processo (p. 58) | TGI p. 58, 79–80 + EANCOM vigente (C-02) | T4 | Texto próprio com remissão às páginas | V-rev |
| R-02 | Premissas de 2004: VAN como canal necessário; X.400/X.435 como base; papel como linha de base; EDI apresentado como "nova ferramenta" (resumo), embora o próprio cap. 5 descreva padrões desde 1961–1987 | TGI resumo, p. 38–44 | T4 | Texto próprio | — |
| R-03 | Limite de método: um caso, uma entrevista, respostas do questionário não reproduzidas | TGI p. 17–18, 79; arq. 14 | T4 | Texto próprio | — |
| R-04 | Limite de evidência: material "Makro, 2003", "Davis, 1993" e "ECR Brasil, 2000" sem entrada na bibliografia; referências on-line sem data de acesso | TGI p. 27, 35, 77–83, 89–90 | T4 | Texto próprio | — |
| R-05 | Limite de inferência: a conclusão repete a lista de objetivos da introdução (p. 15–16 × p. 87); a pesquisa confirma o que se propôs demonstrar sem relatar contraexemplo | TGI p. 15–16, 87 | T4 | Texto próprio, tom descritivo | V-rev |
| R-06 | O que não pode ser concluído: retorno sobre investimento; causalidade EDI → redução da ruptura; magnitude do aumento de vendas; generalização para outros varejistas; situação atual do Makro | Leitura de RS-01 a RS-06 | T4 | Lista "o estudo não permite afirmar" | — |
| R-07 | Promessa do resumo ("aspectos positivos e negativos") × aspectos negativos efetivamente relatados (dificuldade de adesão, cultura do fornecedor, custos listados sem valor) | TGI resumo; p. 61, 79–80 | T4 | Texto próprio | — |
| R-08 | Errata de apresentação (sem alterar o original): remissão à Ilustração 7 na p. 48 (é a 6); legenda da 15 repetida na lista; "Valued Added Network"; "Interchage" (p. 13) | TGI p. 13, 48; arq. 10 | T4 | NOT na versão de leitura | — |
| R-09 | Histórico: o TGI atribui ao SITPRO a geração do EDIFACT (p. 39) e, no cap. 6, ao UN/ECE a responsabilidade pelas diretrizes (p. 43). A UNECE descreve as regras UN/EDIFACT aprovadas pelo UN/ECE/TRADE/WP.4 e a sintaxe como ISO 9735 | TGI p. 39, 43 + H-01, C-01 | T2 + T4 | NOT de contexto; não "corrigir" o texto do TGI | V-fonte |
| R-10 | Contexto societário posterior: em 2020 o Makro vendeu 30 lojas no Brasil ao Grupo Carrefour (aviso contra leitura no presente) | H-02 | T2 | NOT de uma frase no aviso de contexto | V-rev |

### 2.7 Atualização técnica e reflexão atual (`#atualizacao`, `#reflexao`) — Camada C

| ID | Conteúdo previsto | Ligação com o TGI | Fonte | Tipo | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- |
| C-01 | EDIFACT continua mantido: regras e diretórios UN/EDIFACT aprovados pelo UN/ECE/TRADE/WP.4; sintaxe = ISO 9735 (registro de 1988 no ISO/TC 154) | Cap. 5–6 (padrões) | F-01, F-02 | T3 | — |
| C-02 | EANCOM, subconjunto de mensagens UN/EDIFACT mantido pela GS1 (sucessora internacional da EAN), ainda em uso no varejo; GS1 mantém EANCOM e GS1 XML | Cap. 10.6 cita EANCOM; definições da EAN Brasil | F-03, F-04, F-05 | T3 | V-fonte (adoção atual: número da GS1 é de pesquisa de 2020) |
| C-03 | Transporte: AS2 (RFC 4130, julho de 2005) troca EDI sobre HTTP com assinatura, criptografia e recibo assinado (MDN) — as funções que o TGI atribuía à VAN (segurança, recibo, auditoria) passam a existir no protocolo ponto a ponto | Cap. 7 (VAN), 7.1 (critérios) | F-06 | T3 + T4 | — |
| C-04 | Redes de quatro cantos (exemplo: Peppol, AS4 sobre ebMS 3.0, PKI própria, descoberta dinâmica de destinatário) como forma atual de intermediação, distinta da VAN-caixa postal | Cap. 7 (VAN como canal único) | F-07 | T3 | — |
| C-05 | Brasil: a NF-e (Ajuste SINIEF 07/2005) dá validade jurídica ao documento fiscal eletrônico; muda o que significa trocar "INVOICE (nota fiscal)" por EDI | Cap. 11, mensagem INVOICE = nota fiscal (p. 85) | F-08 | T3 | V-fonte (cronograma de obrigatoriedade: confirmar no portal oficial antes de citar datas) |
| C-06 | Efeito chicote: pedidos distorcem a demanda a montante; compartilhar dados de venda e estoque reduz a distorção — fundamento para o INVRPT diário e o VMI do caso | Cap. 11, VMI e INVRPT (p. 81–85) | F-09 | T3 + T4 | — |
| C-07 | VMI exige relação colaborativa franca e controle com a parte mais capaz — converge com a condição registrada no TGI (p. 82) | Cap. 11 (p. 82) | F-10 | T3 | — |
| C-08 | APIs e eventos como complemento, não substituto: especificações de metadados de eventos (CloudEvents 1.0, 2019) e mensagens XML da GS1 coexistem com EDI | Ligação fraca e explícita: evolução do "aviso" (RECADV, INVRPT) para notificação em tempo próximo do real | F-11, F-05 | T3 + T4 | V-rev (manter curto) |
| C-09 | Reflexão: do pedido trocado ao pedido rastreável — recibo técnico × aceite de negócio, idempotência de reenvio, tratamento de rejeição, retenção e auditoria (o TGI já listava log, auditoria e backup na VAN, p. 50–52) | Cap. 7.1, 10.5 (testes de erro e recuperação) | F-06 + TGI | T4 | V-rev |
| C-10 | CPFR como evolução do VMI | Cap. 11 | sem fonte primária verificada | T5 | **Não publicar** até haver fonte primária (VICS/GS1 US) |

**Temas avaliados e excluídos (motivo):** observabilidade com ferramentas atuais (sem ligação direta
com o que o TGI investigou; a reflexão C-09 cobre o problema sem catálogo de ferramentas);
plataformas de automação de processos e ERPs atuais (o TGI não estuda integração com ERP além da
menção, p. 29); gestão de identidades além da PKI de transporte (coberta em C-03/C-04).

### 2.8 Acesso ao original, encerramento e elementos excluídos

| ID | Conteúdo previsto | Fonte | Tipo | Tratamento | Validação |
| :-- | :-- | :-- | :-- | :-- | :-- |
| D-01 | Link para o PDF consolidado + SHA-256 + tamanho + aviso de data | Inventário §8 | T1 | Download | V-co, V-dir |
| D-02 | Como citar o trabalho (ABNT, autores na ordem da capa) | Ficha catalográfica | T1 | Texto gerado a partir de A-01 a A-03 | — |
| D-03 | Bibliografia original, reproduzida como está (com as lacunas) | TGI p. 89–90 | T1 | CIT em lista | — |
| D-04 | Encerramento: valor histórico e técnico; trajetória profissional em no máximo duas frases, sem ligar o TGI a projetos posteriores | Esta spec | T4 | Texto próprio | V-rev |
| X-01 | Dedicatória | arq. 5 | T1 | EXC | — |
| X-02 | Agradecimentos | arq. 6 | T1 | EXC | — |
| X-03 | Epígrafe (Ballou) | arq. 7 | T1 | EXC (pode aparecer no original) | — |
| X-04 | Capítulos 2–3 (logística, SCM, serviço ao cliente, ECR) em detalhe | p. 19–35 | T1 | SIN de 2–3 frases em "A solução estudada"; o restante fica no original | — |
| X-05 | Abstract em inglês | arq. 9 | T1 | EXC na página PT; disponível no original | — |

---

## Parte 3 — Fontes contemporâneas e históricas externas

Todas acessadas em 2026-10-16. A implementação refaz o acesso e atualiza a data.

| ID | Fonte | O que sustenta | URL |
| :-- | :-- | :-- | :-- |
| F-01 | UNECE — *UN/EDIFACT, Part 4, Chapter 1: Introduction* | Regras UN/EDIFACT aprovadas pelo UN/ECE/TRADE/WP.4; "The EDIFACT syntax [...] is ISO standard 9735" | https://unece.org/trade/uncefact/unedifact/part-4-chaper-1-introduction |
| F-02 | ISO/TC 154 — ISO 9735 | Norma EDIFACT sob o ISO/TC 154; registro de publicação de 1988 | https://www.isotc154.org/standards/iso-9735 |
| F-03 | GS1 — *EANCOM 2002, Part I* | "The GS1 EANCOM® standard is a subset of selected UN/EDIFACT messages" (diretório D.01B) | https://gs1.org/sites/gs1/files/docs/eancom/ean02s4/part1/part1_01.htm |
| F-04 | GS1 — página EDI | Padrões EDI da GS1; adoção do EANCOM (pesquisa de 2020) | https://gs1.org/edi |
| F-05 | GS1 Australia — GS1 EDI | GS1 mantém EANCOM e GS1 XML | https://gs1au.org/standards/gs1-edi |
| F-06 | IETF — RFC 4130 (AS2), jul. 2005 | EDI/XML sobre HTTP; CMS/S-MIME; recibos MDN assinados; registro auditável | https://www.rfc-editor.org/rfc/rfc4130 |
| F-07 | OpenPeppol — *Peppol AS4 Profile* v2.0.3 | AS4 (ebMS 3.0) entre os cantos 2 e 3; PKI Peppol; TLS obrigatório; SMP/SML | https://docs.peppol.eu/edelivery/as4/specification/ |
| F-08 | SEFAZ-ES — NF-e | Ajuste SINIEF 07/2005 institui a NF-e; "validade jurídica para todos os fins" | https://sefaz.es.gov.br/nfe-nota-fiscal-eletronica |
| F-09 | Lee, Padmanabhan e Whang (1997), *Management Science* 43(4):546–558 | Efeito chicote e suas quatro causas | https://doi.org/10.1287/mnsc.43.4.546 |
| F-10 | Blatherwick (1998), *Supply Chain Management* 3(1):10–11 | Condições do VMI: relação colaborativa franca | https://doi.org/10.1108/13598549810200825 |
| F-11 | CNCF — CloudEvents 1.0 (28/10/2019) | Especificação comum para descrever dados de eventos | https://www.cncf.io/announcements/2019/10/28/serverless-specification-cloudevents-reaches-version-1-0/ |
| H-01 | UNECE (mesma fonte F-01) | Contexto histórico da governança do EDIFACT | idem F-01 |
| H-02 | Poder360, 17/02/2020 | Carrefour Brasil compra 30 lojas do Makro; o Makro "continuará sua operação no Brasil" com foco em São Paulo | https://www.poder360.com.br/economia/carrefour-brasil-compra-30-lojas-do-makro-por-r-195-bilhao/ |

**Regras para fontes na página**

1. Nenhuma afirmação T3 sem link para a fonte da Parte 3.
2. Nenhuma afirmação sobre o Makro no presente. H-02 só aparece como aviso de que o cenário mudou.
3. Nenhuma fonte de fornecedor comercial (blogs de software de EDI) como evidência; elas foram
   usadas apenas para localizar fontes primárias.
4. Dado de adoção (F-04) aparece com o ano da pesquisa, ou não aparece.

## Como verificar a origem de uma afirmação

1. Na página publicada, cada bloco tem selo de camada; blocos T1 trazem "p. N".
2. Procure a frase na coluna "Conteúdo previsto" desta matriz; a coluna "Fonte" dá a página.
3. Abra o PDF consolidado (ou, antes da publicação, o PDF renderizado na pasta do projeto) na página.
4. Para T3, siga o link da Parte 3.
5. O teste `tests/tgi-edi.trace.test.mjs` (plano, T6.2) falha se um bloco da página não tiver ID
   desta matriz em `data-trace`.
