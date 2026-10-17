# C — Especificação da página: "Gestão de Pedidos utilizando a tecnologia EDI" (TGI, 2004)

> Artefato C. Define o que a página contém, de onde cada parte vem e como ela se integra ao site.
> Depende de [A — Inventário](tgi-edi-import-inventory.md) e [B — Rastreabilidade](tgi-edi-content-traceability.md).
> Execução: [D — Plano de implementação](tgi-edi-implementation-plan.md).
>
> **Status:** especificação. A página **não** foi implementada nem publicada.

## Identidade da página

| Campo | Valor | Situação |
| :-- | :-- | :-- |
| Arquivo | `src/tgi-gestao-de-pedidos-edi.html` | Padrão adotado (D-1) |
| URL | `https://mauricio.issei.com.br/tgi-gestao-de-pedidos-edi` | idem |
| Namespace CSS | `.tgi-` em `src/tgi-gestao-de-pedidos-edi.css` (prefixo livre no repositório em 2026-10-16) | — |
| JavaScript | nenhum próprio (ver RF-10) | — |
| `<title>` | `Gestão de Pedidos com EDI — TGI de 2004` (39 caracteres) | V-rev |
| Tipo editorial | Tier S (página longa de referência), `TechArticle` sobre um nó `Thesis` (RS-5) | — |
| Pilar do ecossistema | p5 — Soluções & Portfólio ("soluções entregues e a jornada pessoal") | Padrão adotado (D-2) |
| Estilo de redação | Skill `ptbr-controlado`, modo Redação, perfil Técnico (blocos T1/T3) e Híbrido (blocos T4) | — |
| Fonte do conteúdo | `/mnt/project-files/estudos/tgi-edi-2004/` (privado) + matriz B | — |

---

## 1. Objetivo e contexto

**Objetivo.** Publicar o Trabalho de Graduação Interdisciplinar de 2004 como registro íntegro de
uma pesquisa acadêmica sobre integração varejo–indústria por EDI, com três camadas separadas: o
trabalho original, uma análise retrospectiva escrita em 2026 e uma atualização técnica com fontes.

**Contexto.** O TGI foi escrito por três autores, sob orientação, em um curso de Sistemas de
Informação com ênfase em logística (o `cv.json` registra "Bacharelado em Sistemas de Informação,
com ênfase em Logística e Cadeia de Suprimentos", Mackenzie, 2001–2005). O site já tem páginas de
estudo longas (`formulacao-de-problemas`, `digital-workplace-agentico`,
`aprendizagem-autorregulada-artigo`) e uma infraestrutura de SEO/AEO, Markdown companheiro,
camada editorial e gêmeo em inglês. A página usa essa infraestrutura sem criar arquitetura nova.

**O que a página não é.** Não é landing page comercial, não é estudo de caso profissional do autor,
não é resumo que substitui a monografia e não descreve o Makro atual.

## 2. Público-alvo

| Público | O que procura | O que a página entrega | Onde |
| :-- | :-- | :-- | :-- |
| Lideranças técnicas e gestores | Aplicação empresarial: que problema, que solução, que resultado | Problema, solução em camadas, caso e resultados classificados por tipo de evidência | §§ 4.3–4.6 |
| Recrutadores e avaliadores | Evidência de formação técnica e de capacidade analítica | Ficha do trabalho com autoria coletiva correta; análise crítica que separa fato de interpretação | §§ 4.1, 4.6, 4.7 |
| Profissionais de integração | Como o problema de 2004 se compara ao de hoje | Comparação com fontes (padrões, transporte, documento fiscal, colaboração) | §§ 4.7–4.8 |

## 3. Proposta editorial

### 3.1 Princípio: preservar, contextualizar, complementar

A página tem três camadas, sempre identificadas por selo **textual** (não só cor):

| Camada | Selo | Conteúdo | Voz |
| :-- | :-- | :-- | :-- |
| A — Trabalho original | `TGI, 2004` | O que os autores escreveram, com página | Terceira pessoa: "os autores", "o TGI" |
| B — Análise retrospectiva | `Leitura de 2026` | O que o trabalho acertou, suas premissas, limites e o que não permite concluir | Primeira pessoa do autor do site, marcada como reflexão posterior |
| C — Atualização técnica | `Atualização técnica` | Evolução do problema com fontes atuais | Impessoal, com link para cada fonte |

Informação histórica externa usa o selo `Contexto histórico`. Hipótese não validada (T5) não é
publicada.

### 3.2 Regras de redação (vinculantes)

1. Português brasileiro, frases curtas, um termo por conceito (vocabulário controlado §3.4).
2. Sem adjetivo promocional, sem "revolucionário", "pioneiro", "inovador", "de ponta".
3. Sem afirmação de superioridade não demonstrada, sobre o trabalho ou sobre o autor.
4. Blocos da camada A usam verbos de relato ("os autores descrevem", "o TGI registra"); nunca
   apresentam a afirmação dos autores como fato verificado pela página.
5. Qualificadores do original são preservados: "cerca de", "aproximadamente", "poderia chegar a",
   "segundo o entrevistado".
6. Números do TGI aparecem exatamente como no original, com página. Nenhum número é recalculado,
   convertido em percentual nem extrapolado.
7. Toda afirmação sobre o Makro leva marcador temporal ("em 2004", "segundo o TGI").
8. A camada B não corrige o texto do TGI: aponta a divergência e a fonte.
9. Nada de trabalhos profissionais posteriores do autor dentro das camadas A e B. A única menção à
   trajetória fica no encerramento (§4.10), em até duas frases.
10. Citação literal do TGI: `<blockquote>` ou `<q>`, com `lang="pt-BR"` e `translate="no"`, para o
    gêmeo `/en/` não atribuir aos autores uma tradução automática. O gêmeo recebe, ao lado, a
    indicação "quoted in the original Portuguese".

### 3.3 Autoria na página

- A ficha do trabalho lista os **três autores na ordem da capa**, com o mesmo peso tipográfico.
- O orientador e a banca aparecem na ficha.
- A análise retrospectiva e a atualização técnica são assinadas apenas pelo autor do site, com a
  frase: "Esta leitura é minha e não foi revisada pelos coautores." (substituída se Q-1 trouxer
  revisão dos coautores).
- O JSON-LD distingue as duas autorias (RS-5).

### 3.4 Vocabulário controlado

| Termo adotado | Não usar | Observação |
| :-- | :-- | :-- |
| EDI (Intercâmbio Eletrônico de Dados) | "troca eletrônica de documentos" como sinônimo solto | Expandir na primeira ocorrência |
| VAN (rede de valor agregado) | "Valued Added Network" | O título original do cap. 7 é citado como está |
| UN/EDIFACT | "Edifact" | Nome das mensagens em maiúsculas: ORDERS, INVOICE, RECADV, INVRPT, REMADV |
| VMI (estoque gerenciado pelo fornecedor) | "reposição mágica", "autônoma" | O TGI também usa "Reposição Automática pelo Fornecedor" |
| ruptura | "falta" quando se refere à métrica | Termo do TGI (p. 84) |
| gestão de pedidos | "order management" no texto PT | — |

---

## 4. Narrativa e estrutura de seções

### 4.0 Mapa

| # | Âncora | Título visível (H2) | Camada | Pergunta que responde |
| :-- | :-- | :-- | :-- | :-- |
| 1 | `#apresentacao` | (H1 da página) | A | O que é este trabalho e por que ler hoje? |
| 2 | `#como-ler` | Como ler esta página | — | Como distinguir original, leitura e atualização? |
| 3 | `#problema` | O problema investigado | A | Que dificuldade empresarial os autores estudaram? |
| 4 | `#solucao` | A solução estudada | A | O que é EDI e como ele se divide em padrão, infraestrutura, software e regras? |
| 5 | `#estudo-de-caso` | O estudo de caso: Makro, 2004 | A | Como o processo funcionava no caso? |
| 6 | `#resultados` | Resultados e limitações | A + B | O que foi medido, o que foi percebido, o que foi concluído? |
| 7 | `#o-que-mudou` | O que mudou desde 2004 | B + C | O que permanece, o que mudou, o que o estudo não podia investigar? |
| 8 | `#reflexao` | Do pedido trocado ao pedido rastreável | C (T4) | Que desafios atuais derivam do mesmo problema? |
| 9 | `#trabalho-original` | O trabalho original | A | Como consultar e citar a monografia? |
| 10 | `#encerramento` | Encerramento | B | Qual o valor histórico e técnico do registro? |
| — | `#referencias` | Referências | A + C | Bibliografia original e fontes atuais, separadas |
| — | `<!-- AEO-BODY -->` | "Em síntese" + FAQ (gerado) | — | — |

**Justificativa da ordem.** O visitante entende o problema antes da tecnologia (B7.02), vê a
tecnologia antes do caso, vê o caso antes dos resultados e só depois lê a crítica e a atualização.
O original fica acessível desde o hero (link "Ler o trabalho original"), para não ficar escondido
atrás da síntese.

### 4.1 Apresentação (`#apresentacao`) — rastreio A-01 a A-06

- **H1:** "Gestão de Pedidos utilizando a tecnologia EDI" (título original, sem modernização).
- **Linha de contexto:** "Trabalho de Graduação Interdisciplinar · Sistemas de Informação ·
  Universidade Presbiteriana Mackenzie · 2004".
- **Ficha** (lista de definição `<dl>`): autores (3, ordem da capa), orientador, banca, aprovação
  (dezembro de 2004), 95 folhas.
- **Tema em uma frase** (PAR do resumo e da p. 15): como a troca eletrônica de pedidos, notas e
  avisos entre varejo e indústria muda a gestão de pedidos, examinada em teoria e em um caso.
- **Por que ler hoje** (T4, até 60 palavras): é um registro datado de como uma integração
  varejo–indústria funcionava em 2004, com o método e os limites visíveis; serve de linha de base
  para comparar com a integração atual.
- **Aviso de contexto** (sempre visível, não recolhível): "Trabalho acadêmico de 2004. Descreve
  sistemas, fornecedores e práticas daquele ano. Nada nesta página descreve a operação atual das
  empresas citadas."
- **Ações:** "Ler o trabalho original" → `#trabalho-original`; "O que mudou desde 2004" →
  `#o-que-mudou`.
- Proibido: foto do autor, frase autobiográfica, "meu TGI" no H1, selo de "destaque".

### 4.2 Como ler esta página (`#como-ler`)

Legenda das três camadas (§3.1) em lista, com o selo de cada uma e uma frase. Inclui: "As páginas
citadas (p. N) são as da monografia impressa."

### 4.3 O problema investigado (`#problema`) — P-01 a P-06

1. Parágrafo: o elo pedido → prateleira (P-01).
2. Lista: os quatro efeitos do processo em papel (P-02), cada um com uma frase.
3. Frase com o exemplo do ciclo "de até uma semana", com a condição original (P-03).
4. Citação curta: "os processos pelos quais estes documentos seguem não mudam" (P-04, p. 58).
5. As quatro perguntas de pesquisa (P-05), em lista numerada, literal.
6. Quadro "Objetivo declarado", com as duas formulações (resumo × p. 15), sem comentário nesta
   seção; o comentário fica em §4.7 (R-07).

Não acrescentar: problemas de integração que o TGI não estudou (APIs, nuvem, fraude, LGPD).

### 4.4 A solução estudada (`#solucao`) — S-01 a S-09, X-04

1. Definição de EDI citada pelo TGI (S-01).
2. Contexto mínimo dos caps. 2–3 em até três frases: logística integrada, SCM e ECR como o quadro
   gerencial que motiva o EDI (X-04).
3. **Quatro camadas, separadas** (exigência do pedido: tecnologia, infraestrutura, regras):

   | Camada | O que o TGI descreve | Pág. |
   | :-- | :-- | :-- |
   | Padrão de mensagem | Sintaxe + vocabulário; EDIFACT e ANSI X12; níveis de padronização | 42–43 |
   | Infraestrutura de comunicação | VAN como caixa postal; X.400 e P-EDI (X.435); critérios de escolha | 44–52 |
   | Software | Tradutor entre formato interno e mensagem padronizada | 55–56 |
   | Regras de negócio | Acordo de intercâmbio entre parceiros | 75–76 |

4. Plano de implantação em seis etapas (S-07), como lista, com a frase "os autores o apresentam
   como plano teórico".
5. Histórico de padrões (S-09) em linha do tempo textual (lista ordenada por ano), com a nota R-09.

### 4.5 O estudo de caso: Makro, 2004 (`#estudo-de-caso`) — E-01 a E-16

1. Perfil (E-01, E-02), sempre "em 2004, segundo o TGI".
2. Por que adotou, o que dificultou, o que foi crítico (E-03 a E-05), atribuídos ao "responsável
   pelo ECR no Makro, entrevistado pelos autores".
3. Números do caso em tabela (E-06, E-07): fornecedores, fornecedores em EDI, VANs, divisão de
   custo. A tabela não tem coluna de percentual calculado.
4. **Diagrama 1 — Pedido por reposição automática (reconstrução histórica).** Elementos permitidos,
   todos da p. 80–81 e 83–84: bases de dados em servidores IBM e Solaris → processo de reposição
   automática (parâmetros: estoque máximo, estoque mínimo, ponto de reposição; quantidade mínima
   por fornecedor) → servidor de aplicativo Unix → software de transmissão EDI → VAN (uma de
   quatro) → fornecedor. Mensagem: ORDERS.
5. **Diagrama 2 — VMI (reconstrução histórica).** Makro ⇄ fornecedor com os fluxos 0–4 e produtos,
   nos sentidos do inventário §5.3; INVRPT associado ao fluxo 2 e INVOICE ao fluxo 3 **apenas se**
   a associação estiver no texto (p. 81, 85): o TGI define INVRPT como "parâmetros de
   estoque/venda" e INVOICE como "nota fiscal"; RECADV como "aviso de recebimento". A associação
   fluxo ↔ mensagem é rotulada "correspondência inferida a partir das definições do TGI" (T4).
6. Lista das mensagens EDIFACT com a função dada pelo TGI (E-12).
7. Fornecedores sem EDI e o B2B (E-13).
8. Condição do VMI segundo o TGI (E-11).

Regras dos diagramas: SVG inline, `role="img"`, `aria-labelledby` para título e descrição longa
textual equivalente (lista ordenada dos passos) logo abaixo; legenda "Reconstrução a partir das
Ilustrações 16–18 e das p. 80–85 do TGI; não é a figura original"; nenhum elemento ausente do TGI
(sem "API", "nuvem", "ERP", "middleware"); nomes de VAN como no TGI.

### 4.6 Resultados e limitações (`#resultados`) — RS-01 a RS-09

Tabela principal, uma linha por afirmação, colunas: "Afirmação", "Tipo de evidência", "Pág.".
Tipos fixos: **métrica documentada**, **observação relatada**, **percepção do entrevistado**,
**inferência dos autores**, **critério sem resultado**, **benefício esperado (teórico)**,
**conclusão dos autores**.

| Afirmação (resumo) | Tipo | Pág. |
| :-- | :-- | :-- |
| Ruptura reduzida em "cinco por cento" | métrica documentada | 84 |
| Estoque não aumentou, contra a expectativa | observação relatada | 84 |
| Vendas aumentaram em consequência | inferência dos autores (sem número) | 84 |
| Índice de financiamento de estoque | critério sem resultado | 84 |
| Fornecedores passaram a analisar melhor as vendas | observação relatada | 83 |
| Adoção motivada por padronização e reposição automática | percepção do entrevistado | 79 |
| Lista de oito benefícios no Makro | conclusão dos autores | 87 |
| Redução de custos administrativos, ciclo mais rápido | benefício esperado (teórico, cap. 9) | 62–64 |

Depois da tabela:

- **Nota sobre a métrica** (RS-07): o texto não informa se "cinco por cento" são pontos
  percentuais ou variação relativa, nem a linha de base, o período, o método de medição ou a
  comparação com um grupo sem EDI. A página não estima o valor.
- **Limitações declaradas pelos autores** (RS-08), com citação.
- **Benefícios esperados × relatados** (RS-09) em duas colunas.

### 4.7 O que mudou desde 2004 (`#o-que-mudou`) — R-01 a R-10, C-01 a C-07

Responde às cinco perguntas do pedido, cada uma como H3:

1. **O que permanece relevante?** R-01; C-01 (EDIFACT mantido, ISO 9735); C-02 (EANCOM no varejo).
2. **O que mudou na tecnologia?** R-02; C-03 (AS2: segurança, recibo e auditoria no protocolo);
   C-05 (NF-e: o documento fiscal passou a ter forma eletrônica com validade jurídica).
3. **O que mudou nos modelos de integração?** C-04 (redes de quatro cantos); C-08 (APIs e eventos
   como complemento).
4. **O que o estudo não tinha condições de investigar?** R-03, R-04, R-06 (lista "o estudo não
   permite afirmar").
5. **Quais problemas continuam existindo?** Adesão de parceiros, qualidade dos dados de estoque e
   venda (C-06, efeito chicote), confiança para delegar a reposição (C-07 + E-11).

Incluir R-05 e R-07 em "O que o estudo não tinha condições de investigar", em tom descritivo.
Incluir R-08 apenas na versão de leitura (§6.8), não no corpo.
Incluir R-10 no aviso de contexto de §4.1, se D-5 for aceita.

### 4.8 Do pedido trocado ao pedido rastreável (`#reflexao`) — C-09

Texto T4, 300–500 palavras, com o selo `Leitura de 2026`. Liga o problema original a quatro
preocupações atuais, cada uma ancorada em algo que o TGI já mencionava:

| Preocupação atual | Âncora no TGI |
| :-- | :-- |
| Rastreabilidade: saber em que estado cada pedido está | Incerteza sobre o recebimento (p. 59); log de tráfego da VAN (p. 52) |
| Tratamento de falhas: rejeição, reenvio sem duplicar pedido | Testes com "informações inválidas", "erros de comunicação" e "recuperações" no piloto (p. 75) |
| Segurança e identidade entre organizações | Senha, autenticação e controle de relações na VAN (p. 49); AS2/PKI hoje (C-03, C-04) |
| Governança de dados: retenção, acesso, qualidade | Acordo de intercâmbio: uso, acesso e arquivamento (p. 76) |

Frase obrigatória no início: "Nada nesta seção descreve a implementação de 2004; é uma leitura
atual do mesmo problema."

### 4.9 O trabalho original (`#trabalho-original`) — D-01 a D-03

Duas variantes, decididas por Q-1/Q-2:

| Variante | Condição | Conteúdo |
| :-- | :-- | :-- |
| **Com documento** | Coautores consentem e D-4 decide figuras | Link "Baixar o TGI completo (PDF, N MB)" com `download`; SHA-256; data; aviso de contexto; "Como citar"; sumário com páginas; bibliografia original |
| **Sem documento** (padrão até a resposta) | Sem consentimento | Ficha catalográfica, sumário com páginas, bibliografia original, "Como citar" e a frase "O documento completo não está publicado aqui." Sem link quebrado, sem formulário de pedido |

Em ambas: o original não fica atrás de clique em "ver mais"; o sumário é lista navegável. Um
visualizador embutido (`<iframe>`/PDF.js) **não** é usado: o link direto basta e evita dependência.

**Como citar** (ABNT NBR 6023, a conferir na implementação):
`ISSEI, Maurício Miranda; MOMMA, Priscila Machado; KAMEOKA, Sergio. Gestão de pedidos utilizando a
tecnologia EDI. 2004. 95 f. Trabalho de Graduação Interdisciplinar (Bacharelado em Sistemas de
Informação) – Faculdade de Computação e Informática, Universidade Presbiteriana Mackenzie, São
Paulo, 2004.`

### 4.10 Encerramento (`#encerramento`) — D-04

Até 120 palavras, selo `Leitura de 2026`. Reforça: o trabalho registra um momento da integração
varejo–indústria com fontes e um caso; seus limites estão visíveis; o problema central (fazer
parceiros trocarem dados confiáveis no tempo do negócio) continua atual. Trajetória profissional:
no máximo duas frases, ligadas ao conteúdo da página (por exemplo, a ênfase em logística do curso),
sem citar empregadores nem projetos. Sem CTA comercial, sem formulário, sem "fale comigo".

### 4.11 Referências (`#referencias`)

Duas listas com H3 próprios: "Bibliografia do TGI (como publicada em 2004)" — reprodução literal de
p. 89–90, inclusive sem datas de acesso — e "Fontes da análise e da atualização (consultadas em
2026)" — Parte 3 da matriz B, com data de acesso.

---

## 5. Conteúdo previsto por seção — origem

| Seção | Do TGI (camada A) | Complemento (camadas B/C) |
| :-- | :-- | :-- |
| Apresentação | Título, autores, instituição, orientador, banca, data, tema | Por que ler hoje; aviso de contexto |
| Problema | Efeitos do papel, ciclo de até uma semana, perguntas, objetivos | — |
| Solução | Definição, camadas, VAN, software, acordo, plano teórico, histórico | Nota sobre a governança do EDIFACT (R-09) |
| Estudo de caso | Perfil, motivação, dificuldade, números, arquitetura, VMI, mensagens | Correspondência fluxo ↔ mensagem rotulada como inferida |
| Resultados | Métrica, observações, inferências, conclusões, limitações declaradas | Nota de ambiguidade da métrica |
| O que mudou | Âncoras de comparação | Análise retrospectiva; EDIFACT/EANCOM, AS2, quatro cantos, NF-e, efeito chicote, VMI |
| Reflexão | Âncoras (p. 49, 52, 59, 75–76) | Rastreabilidade, falhas, segurança, governança |
| Trabalho original | Ficha, sumário, bibliografia, documento | Hash, como citar |
| Encerramento | — | Valor histórico; trajetória em até duas frases |

Detalhe linha a linha: matriz B, Parte 2.

## 6. Requisitos funcionais

Formato EARS adaptado. "Deve" = obrigatório.

| ID | Requisito |
| :-- | :-- |
| RF-01 | A página **deve** existir em `src/tgi-gestao-de-pedidos-edi.html`, descoberta pelo Vite sem alteração de configuração. |
| RF-02 | A página **deve** usar o cabeçalho, o rodapé, o banner de consentimento (`cookie-consent.js`) e o `eco-nav` no mesmo padrão das páginas de estudo existentes. |
| RF-03 | Cada bloco de conteúdo **deve** ter `data-camada="A|B|C|H"` e `data-trace="<ID da matriz B>"`, e exibir o selo textual correspondente. |
| RF-04 | Quando um bloco for da camada A e afirmar um fato do TGI, ele **deve** exibir a página ("p. N"). |
| RF-05 | A ficha **deve** listar os três autores na ordem da capa, com o mesmo estilo. |
| RF-06 | Os diagramas **devem** ser SVG inline com descrição textual equivalente visível, sem elementos ausentes do TGI. |
| RF-07 | A seção `#trabalho-original` **deve** renderizar a variante "sem documento" enquanto `public/downloads/tgi-gestao-de-pedidos-edi-2004.pdf` não existir, e a variante "com documento" quando existir. A troca é editorial (edição do HTML), não detecção em tempo de execução. |
| RF-08 | Quando houver PDF publicado, a página **deve** exibir tamanho, formato e SHA-256 do arquivo, e o hash **deve** ser conferido por teste contra o arquivo. |
| RF-09 | Citações literais do TGI **devem** usar `lang="pt-BR" translate="no"`. |
| RF-10 | A página **não deve** carregar JavaScript próprio. Nenhum conteúdo depende de JS. |
| RF-11 | A página **deve** ter Markdown companheiro `public/tgi-gestao-de-pedidos-edi.md` (`hasMd: true`), com as três camadas marcadas. |
| RF-12 | A página **deve** ter gêmeo em inglês gerado por `npm run i18n:sync` (Argos), sem edição manual de `src/en/**` ou `public/en/**`. |
| RF-13 | A página **deve** entrar no catálogo (`src/catalogo.html`), em `specs/ecosystem.nav.yaml` (p5, com bump de versão) e na cópia `src/js/eco-nav.js`, e em `public/llms.txt`/`llms-full.txt`. |
| RF-14 | A página **não deve** alterar outras páginas além dos registros de RF-13 e dos crosslinks aprovados em D-6. |
| RF-15 | O Markdown, o `llms*.txt` e o JSON-LD **não devem** conter afirmação sobre o Makro no presente. |

## 7. Requisitos de acessibilidade (WCAG 2.2 AA, protocolo `docs/a11y/A11Y.md`)

| ID | Requisito | Verificação |
| :-- | :-- | :-- |
| RA-01 | Link de salto para `<main id="conteudo">`; um `<h1>`; H2 por seção do §4.0; H3 sem saltos | axe + `audit-site.mjs` |
| RA-02 | Contraste de texto ≥ 4.5:1; traços e bordas dos diagramas ≥ 3:1 sobre `#0d1117` | axe `color-contrast` + teste de tokens |
| RA-03 | Selos de camada distinguíveis sem cor (texto do selo + forma) | revisão; teste que exige texto no selo |
| RA-04 | Diagramas: `role="img"`, `aria-labelledby` (título + descrição); descrição longa visível em lista ordenada | axe + teste dedicado |
| RA-05 | Tabelas de dados com `<caption>`, `<th scope>`; nenhuma tabela de layout | axe |
| RA-06 | Links descritivos: "Baixar o TGI completo (PDF, N MB)", nunca "clique aqui"; links externos identificáveis | revisão + teste de texto de link |
| RA-07 | Links em bloco de texto sublinhados (1.4.1) | revisão |
| RA-08 | Teclado: toda ação alcançável por `Tab`, foco visível (`:focus-visible`), sem armadilha | Playwright teclado |
| RA-09 | 320 px de largura e zoom 200% sem perda de conteúdo e sem rolagem horizontal; tabelas largas roláveis em contêiner com `tabindex="0"` e rótulo | Playwright |
| RA-10 | `lang="pt-BR"` na página; trechos em inglês do original (abstract, nomes de padrão) com `lang="en"` quando forem frases | axe `valid-lang` |
| RA-11 | PDF publicado: se não for marcado (tagged), a página declara "PDF sem marcação de acessibilidade; o conteúdo principal está resumido nesta página" e oferece o sumário em HTML | revisão |
| RA-12 | Catraca: a página entra sem violação `serious`/`critical`; `tests/a11y/baseline.json` não sobe | `npm run gate` |
| RA-13 | Nenhum padrão interativo novo; se surgir, registrar em `A11Y-DECISIONS.md` antes | revisão |

## 8. Requisitos de SEO e AEO

Gerados por `scripts/seo/build-aeo.mjs` a partir de uma entrada em `scripts/seo/pages.mjs`. O
`<head>` gerenciado não é escrito à mão.

| ID | Campo | Valor / regra |
| :-- | :-- | :-- |
| RS-1 | `<title>` | `Gestão de Pedidos com EDI — TGI de 2004` (10–60 caracteres) |
| RS-2 | `description` | 50–160 caracteres, com "EDI", "gestão de pedidos", "2004" e "análise". Proposta: "TGI de 2004 sobre gestão de pedidos com EDI entre varejo e indústria, com o estudo de caso original, seus limites e o que mudou na integração." (142) |
| RS-3 | `canonical` | `https://mauricio.issei.com.br/tgi-gestao-de-pedidos-edi` |
| RS-4 | OG/Twitter | `og:type=article`; `og:image=/og-tgi-gestao-de-pedidos-edi.png` gerado por `scripts/seo/gen-og.mjs`, sem logotipo de terceiros |
| RS-5 | JSON-LD | Nó do artigo `TechArticle` (autor = nó `Person` do site, para as camadas B e C) com `about`/`isBasedOn` apontando para um nó `Thesis` (`name` = título original; `author` = 3 `Person` na ordem da capa; `contributor` = orientador; `sourceOrganization` = `CollegeOrUniversity` "Universidade Presbiteriana Mackenzie"; `inSupportOf` = "Bacharelado em Sistemas de Informação"; `datePublished` = "2004"; `inLanguage` = "pt-BR"; `url` do PDF somente na variante com documento). Exige extensão pequena em `scripts/seo/lib.mjs` (campo `extraGraph[]` já suportado por `pages.mjs`, ou campo novo `basedOn`) |
| RS-6 | `datePublished` / `dateModified` da página | datas da publicação da página no site, nunca 2004 |
| RS-7 | `keywords` | EDI, Intercâmbio Eletrônico de Dados, gestão de pedidos, UN/EDIFACT, VAN, VMI, cadeia de suprimentos, varejo, TGI |
| RS-8 | FAQ (AEO) | 4–6 perguntas respondidas **só** com conteúdo da página: o que o TGI investigou; o que é EDI segundo o trabalho; como funcionava o VMI no caso; que resultados foram relatados e com que limites; o que mudou desde 2004 |
| RS-9 | Breadcrumb | Início → Catálogo → página (padrão do gerador) |
| RS-10 | Sitemap | automático (`vite-plugin-sitemap`) |
| RS-11 | `robots` | `index, follow` — **mas** o PDF só entra no sitemap/índice se Q-1 e Q-2 forem resolvidas a favor da publicação |

## 9. Referências

- Fontes do TGI e fontes contemporâneas: matriz B, Partes 1 e 3.
- Padrões do site: `AGENTS.md`; `.claude/skills/mauricio-site-patterns/SKILL.md`;
  `docs/specs/STYLE_GUIDE.md`; `docs/specs/ARCHITECTURE.md`; `docs/a11y/A11Y.md`;
  `docs/specs/editorial/EDITORIAL-LAYER.md`; `docs/specs/editorial/PTBR-CONTROLADO-PAGINAS.md`;
  `docs/specs/pages/SDD-i18n-en.md`; `ECOSYSTEM.md`.
- Precedentes de spec: `docs/specs/pages/formulacao-de-problemas/` (doc 04: contrato a11y/SEO/AEO)
  e `docs/specs/pages/digital-workplace-agentico/` (doc 06: procedência e guarda automática).

## 10. Critérios de aceitação

A implementação é aprovada quando **todos** os itens forem verdadeiros:

**Integridade e autoria**

- [ ] CA-01 Título, autores (3, ordem da capa), instituição, orientador, banca e data idênticos ao
      inventário A §4.1.
- [ ] CA-02 Nenhuma frase apresenta o TGI como trabalho individual ("meu TGI", "desenvolvi") ou
      recente.
- [ ] CA-03 O documento original, se publicado, tem SHA-256 igual ao exibido e conteúdo idêntico
      aos 14 `.doc` (conferência página a página registrada no PR).

**Rastreabilidade**

- [ ] CA-04 Todo bloco tem `data-trace` com ID existente na matriz B (teste).
- [ ] CA-05 Todo número do TGI exibido aparece na matriz com página e confere com o texto
      extraído (teste com lista de números esperados).
- [ ] CA-06 Nenhuma afirmação T3 sem link para fonte da matriz B, Parte 3.
- [ ] CA-07 Nenhum item T5 publicado.

**Separação das camadas**

- [ ] CA-08 Todo bloco exibe selo textual de camada.
- [ ] CA-09 Conclusões dos autores aparecem em blocos da camada A; interpretações, só em B/C.
- [ ] CA-10 "Cinco por cento" aparece literal, com a nota de ambiguidade, e sem outro número
      derivado.
- [ ] CA-11 Nenhuma afirmação sobre o Makro no presente (busca manual por "atualmente", "hoje",
      "usa" ligados ao Makro, no HTML, `.md` e `llms*.txt`).
- [ ] CA-12 Diagramas sem elemento ausente do TGI; legenda "reconstrução histórica".

**Integração com o site**

- [ ] CA-13 Nenhuma dependência nova em `package.json`; nenhum JS próprio.
- [ ] CA-14 Apenas os arquivos listados em RF-13 e D-6 mudam fora dos arquivos da página.
- [ ] CA-15 `npm run gate` verde (build, auditoria, `node --test`, Playwright/axe, orçamento,
      artefatos gerados em dia, espelho `/en/` em dia).
- [ ] CA-16 `tests/tgi-gestao-de-pedidos-edi.spec.js` cobre carga 200, H1, ficha, seções do §4.0,
      selos, diagramas acessíveis e ausência de rolagem horizontal em 375 px.

**Redação**

- [ ] CA-17 Revisão `ptbr-controlado` (perfil Técnico/Híbrido) e `tone-reviewer` sem pendência de
      severidade Crítica ou Alta.
- [ ] CA-18 Revisão do autor do site registrada no PR; revisão ou ciência dos coautores registrada
      se Q-1 exigir.

## 11. Decisões tomadas por padrão (o autor pode trocar)

| ID | Decisão | Alternativa |
| :-- | :-- | :-- |
| D-1 | Slug `tgi-gestao-de-pedidos-edi` (nomeia o tipo do trabalho e o tema; evita parecer página de serviço) | `gestao-de-pedidos-edi-2004` |
| D-2 | Pilar p5 "Soluções & Portfólio" | p1 "Fundação" |
| D-3 | Entrevistado citado pela função, não pelo nome, na página, no `.md` e no repositório | Nome completo, como no original |
| D-4 | Figuras de terceiros (Fleury, 2000; Makro, 2003) não são reproduzidas na página; o caso é redesenhado em SVG a partir do texto | Reproduzir as figuras originais com crédito |
| D-5 | Aviso de contexto cita a venda de 30 lojas em 2020 (H-02) | Aviso sem fato posterior |
| D-6 | Crosslinks: nenhum na entrega; candidatos para depois: `curriculo` (formação) | Crosslinks já na entrega |

## 12. Questões pendentes

Somente as que impedem decisão segura.

| ID | Questão | Bloqueia | Enquanto não houver resposta |
| :-- | :-- | :-- | :-- |
| Q-1 | Priscila Machado Momma e Sergio Kameoka concordam com a publicação do **documento completo** e com a página que os nomeia como coautores? | Publicação do PDF (variante "com documento") | Página na variante "sem documento"; a ficha com os três nomes é dado bibliográfico público e pode ser publicada |
| Q-2 | O PDF pode ser publicado com as figuras de terceiros (Fleury, 2000; material "Makro, 2003") e com o nome do entrevistado? | Publicação do PDF | Igual a Q-1 |
| Q-3 | Formato do arquivo publicado: PDF consolidado (recomendado), também os `.doc` originais, ou ambos? | Apenas a seção 4.9 | PDF consolidado |
| Q-4 | Existe cópia depositada na biblioteca do Mackenzie? Se existir e diferir do ZIP, qual versão publicar? | Apenas CA-03 | O ZIP é tratado como versão final |

