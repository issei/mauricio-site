# A — Inventário da importação: `TGI_Versao_Final.zip`

> Artefato A da especificação da página do TGI sobre EDI. Registra o que o ZIP contém, qual
> arquivo é a versão final, como o conteúdo foi extraído, o que se perdeu na conversão e como o
> original fica preservado. Data da inspeção: 2026-10-16.

## 1. Arquivo recebido

| Campo | Valor |
| :-- | :-- |
| Nome | `TGI_Versao_Final.zip` |
| Tamanho | 1.049.546 bytes |
| SHA-256 | `f20d4b4a018ee1af89cf3fd0f4dbc634008a78c349fe194fa5ac0b1bfac8a9ae` |
| Conteúdo | 14 arquivos `.doc` (Word 97–2003, "Composite Document File V2", página de código 1252), 1.620.480 bytes descompactados |
| Datas internas | 2004-11-02 a 2004-12-19 (datas de modificação gravadas no ZIP) |
| Codificação dos nomes | CP850 (nomes com acento aparecem corrompidos em extratores que assumem UTF-8, por exemplo `10_�ndice de Ilustra��es.doc`) |

O ZIP **não foi alterado**. A verificação é refazer o SHA-256 acima.

## 2. Arquivos encontrados

A numeração do prefixo (`1_` a `14_`) segue a ordem de montagem da monografia. A coluna "Páginas"
vem da renderização em PDF pelo LibreOffice; a coluna "Folhas" vem da ficha catalográfica e do
sumário do próprio trabalho.

| # | Arquivo (nome normalizado) | Bytes | Papel na monografia | SHA-256 (12 primeiros) |
| :-- | :-- | --: | :-- | :-- |
| 1 | `1_Capa TGI.doc` | 20.992 | Capa | `f23ef9f288db` |
| 2 | `2_Folha_de_Rosto.doc` | 20.480 | Folha de rosto | `47fb31904633` |
| 3 | `3_FiCatTGISistInfoSergioKadez[1].2004.doc` | 26.112 | Ficha catalográfica | `fde4edc9f445` |
| 4 | `4_Aprovacao_Banca.doc` | 21.504 | Folha de aprovação | `2630dbf94789` |
| 5 | `5_Dedicatoria.doc` | 19.968 | Dedicatória | `a2c4b959a329` |
| 6 | `6_Agradecimentos.doc` | 19.968 | Agradecimentos | `d1da8ea34afc` |
| 7 | `7_Epigrafe.doc` | 19.968 | Epígrafe (Ronald H. Ballou) | `963025f32201` |
| 8 | `8_Resumo_18_12_04.doc` | 20.480 | Resumo | `142e4b65de5a` |
| 9 | `9_Abstract.doc` | 20.480 | Abstract | `bd30357ccc9c` |
| 10 | `10_Índice de Ilustrações.doc` | 29.696 | Lista de ilustrações (18 itens) | `4ed87e13c1f2` |
| 11 | `11_Índice de Tabelas.doc` | 24.576 | Lista de tabelas (4 itens) | `02e4eafb8960` |
| 12 | `12_Sumário.doc` | 40.960 | Sumário (12 capítulos, referências, anexos) | `0611ea803f7d` |
| 13 | `13_TGI_Ver_Final.doc` | 1.299.456 | **Corpo do trabalho** (capítulos 1–12, referências, página "Anexos") | `7c943fb75863` |
| 14 | `14_Questionario referente entrevista no Makro.doc` | 35.840 | Anexo: questionário da entrevista | `b548bafafb30` |

Os hashes completos dos 14 arquivos estão em
`/mnt/project-files/estudos/tgi-edi-2004/original/SHA256SUMS-docs-no-zip.txt` (pasta do projeto,
fora do repositório; ver §7).

## 3. Documento identificado como versão final

**Decisão:** a versão final é o **conjunto** dos 14 arquivos, montado na ordem do prefixo. O corpo
do trabalho é `13_TGI_Ver_Final.doc`. Não há outra versão do corpo no ZIP.

Evidências:

1. O nome do ZIP e o nome do arquivo 13 trazem "Versão Final" / `Ver_Final`.
2. Não existem duplicatas, rascunhos nem arquivos com nomes semelhantes: cada arquivo tem um papel
   único na estrutura de uma monografia (capa → anexo).
3. As últimas gravações ocorreram entre 2004-12-19 01:02 e 01:28 (arquivos 3, 4, 8, 9, 12, 13 e
   14), depois da data de aprovação declarada ("Aprovado em Dezembro de 2004", arquivo 4).
4. O sumário (arquivo 12) e o corpo (arquivo 13) concordam: o início de cada capítulo cai na
   página que o sumário indica (tabela §4.2).
5. A ficha catalográfica declara "95 f." e "Bibliografia: f. 89"; o sumário põe as referências na
   página 89 e os anexos na página 91.

**Dúvida registrada (não bloqueia):** o ZIP é a versão final dos autores, não necessariamente a
cópia depositada na biblioteca da universidade. Se existir cópia depositada, ela é a referência de
maior autoridade para a versão publicada (questão Q-4 da spec).

## 4. Estrutura do conteúdo

### 4.1 Dados bibliográficos (como constam no documento)

| Campo | Valor | Origem |
| :-- | :-- | :-- |
| Título | Gestão de Pedidos utilizando a tecnologia EDI | Capa, folha de rosto |
| Autores (ordem da capa) | Maurício Miranda Issei; Priscila Machado Momma; Sergio Kameoka | Capa, folha de rosto, aprovação, ficha |
| Natureza | Trabalho de Graduação Interdisciplinar (TGI), exigência para o título de Bacharel em Sistemas de Informação | Folha de rosto |
| Instituição | Universidade Presbiteriana Mackenzie — Faculdade de Computação e Informática | Capa, folha de rosto |
| Local e ano | São Paulo, 2004 | Capa |
| Orientador | Prof. José Carlos Bortot | Folha de rosto, agradecimentos |
| Banca examinadora | José Carlos Bortot; Silvia Rebouças Pereira Almeida; Mario Rozolen (Universidade Presbiteriana Mackenzie) | Folha de aprovação |
| Aprovação | Dezembro de 2004 | Folha de aprovação |
| Descrição física | 95 f. : il. ; 30 cm | Ficha catalográfica |
| Assuntos | 1. Tecnologia da informação. 2. Intercâmbio. 3. Cadeia de abastecimento. 4. Logística | Ficha catalográfica |
| Classificação | CDD 658.455; Cutter I86g | Ficha catalográfica |

O nome "Sergio Kameoka" aparece sem acento em todos os arquivos. A spec preserva essa grafia.

### 4.2 Sumário e paginação

Paginação impressa conferida: o PDF renderizado exibe o número de página do campo do Word, e o
início de cada capítulo coincide com o sumário.

| Capítulo (título original) | Página no sumário | Página no PDF renderizado |
| :-- | --: | --: |
| 1 – Introdução | 12 | 12 |
| 2 – A Logística e a Estratégia Competitiva | 19 | 19 |
| 3 – Cadeia de Suprimentos (3.1–3.3, inclui ECR) | 22 | 22 |
| 4 – EDI (Electronic Data Interchange) | 36 | 36 |
| 5 – Padronização do EDI – Histórico | 38 | 38 |
| 6 – Padronização do EDI – definição (6.1, 6.2 X.400) | 42 | 42 |
| 7 – VANs – Valued Added Network (7.1 critérios) | 48 | 48 |
| 8 – Componentes de um Sistema EDI | 53 | 53 |
| 9 – EDI na Cadeia de Abastecimento – SCM (custos e benefícios) | 58 | 58 |
| 10 – Implementação (plano teórico) | 67 | 67 |
| 11 – Estudo de Caso: Makro Atacadista S/A | 77 | 77 |
| 12 – Conclusão | 86 | 86 |
| Referência Bibliográfica | 89 | 89 |
| Anexos | 91 | 91 (página com o título "Anexos:" e sem conteúdo no arquivo 13) |

**Regra para a spec:** toda citação de página usa a **página impressa** (a do sumário). O PDF
renderizado é a ferramenta de conferência, não a fonte da numeração.

### 4.3 Elementos pré e pós-textuais

- Dedicatória, agradecimentos e epígrafe (Ballou) existem e são preservados no documento original;
  a página não os reproduz (ver traceability, linhas X-01 a X-03).
- Os agradecimentos citam o orientador e o entrevistado do Makro pelo nome. A spec pública cita o
  entrevistado **pela função** ("responsável pelo ECR no Makro"), não pelo nome (decisão D-3 da spec).
- O questionário (arquivo 14) tem 11 perguntas gerais, 3 sobre custos de processamento de pedidos
  e 3 sobre estoques. **O trabalho não reproduz as respostas**: o capítulo 11 é a síntese dos
  autores. Essa ausência é uma limitação metodológica registrada na spec.

## 5. Recursos gráficos e anexos

### 5.1 Ilustrações (lista do arquivo 10, conferida contra o corpo)

| Nº | Legenda (original) | Pág. | Origem declarada | Observação |
| :-- | :-- | --: | :-- | :-- |
| 1 | Estrutura Geral para recebimento de arquivos | 15 | — | Diagrama: parceiros → importar → mapeamento → efetivar na empresa |
| 2 | Estrutura complexa de um canal de distribuição | 24 | Fleury, 2000 | Figura de terceiro |
| 3 | Mensagem X.400 | 45 | — | |
| 4 | P-EDI | 46 | — | |
| 5 | Visão simplificada de uma mensagem EDI | 47 | — | cabeçalho, detalhe, rodapé |
| 6 | Papel da VAN como intermediário dos parceiros de negócio | 50 | — | O texto da p. 48 remete à "Ilustração 7" ao descrever a VAN; a figura correta é a 6 |
| 7 | Componente do EDI | 53 | — | |
| 8 | Troca de mensagens sem padronização | 54 | — | |
| 9 | Transferência de informações de forma padronizada | 55 | — | |
| 10 | Comparativo do processo via papel e o processo via EDI | 60 | — | |
| 11 | Exemplo de troca de documentos eletrônicos entre parceiros | 63 | — | |
| 12 | Benefícios tangíveis do uso do EDI | 64 | — | |
| 13 | Níveis organizacionais impactados pelo EDI | 68 | — | Lista diz "Níveis de organizacionais impactadas" |
| 14 | Características do mercado onde o Makro está inserido | 78 | Makro, 2003 | Lista diz "ontem" (erro de digitação de "onde") |
| 15 | Cadeia de Suprimentos em que o Makro está inserido | 79 | — | **Divergência:** a lista repete a legenda da 14; o corpo traz a legenda correta |
| 16 | Estrutura do processo EDI no Makro | 80 | — | Servidores "Makro IBM" e "Servidor Solaris", "Servidor Unix", VANs IBM `<EDI>`, Proceda `<EDI-4000>`, Interchange `<IC-Multi>`, Mercador `<NET>` |
| 17 | Modelo utilizado pelo Makro para gestão da reposição dos estoques (2003) | 82 | Makro, 2003 | "Modelo conceitual": estoque máximo, ponto de reposição, estoque mínimo, negociação especial |
| 18 | VMI: reposição de produtos gerenciado pelo fornecedor | 83 | Makro, 2003 | "Modelo técnico": fluxos 0–4 e fluxo de produtos (§5.3) |

### 5.2 Tabelas (lista do arquivo 11)

| Nº | Legenda | Pág. | Forma no arquivo | Observação |
| :-- | :-- | --: | :-- | :-- |
| 1 | Fatores que impactam a Gestão da Cadeia de Suprimentos (Davis, 1993) | 27 | Imagem | "Davis, 1993" não consta da bibliografia |
| 2 | Componentes do serviço ao cliente | 32 | Texto em tabela | A extração para texto puro desmonta as colunas (pré-transação / transação / pós-transação) |
| 3 | Premissas ECR (ECR Brasil, 2000) | 35 | Imagem | A bibliografia lista ECR Brasil 1998, não 2000 |
| 4 | Níveis de padronização | 43 | Texto em tabela | Extração preserva a ordem das linhas |

### 5.3 Ilustração 18 — sentido dos fluxos (lido na renderização em 130 dpi)

| Fluxo | Rótulo | Sentido |
| :-- | :-- | :-- |
| 0 | Pedidos Especiais (promoções, ofertas, etc.) | Makro → fornecedor (linha tracejada) |
| 1 | Parâmetros | Makro → fornecedor |
| 2 | Posição dos Estoques/Vendas | Makro → fornecedor |
| 3 | Nota Fiscal | Fornecedor → Makro |
| 4 | Confirmação do Recebimento | Makro → fornecedor |
| — | Produtos | Fornecedor → Makro |

### 5.4 Imagens embutidas

A conversão do arquivo 13 para `.docx` expôs **24 imagens**: 15 PNG e 9 WMF (vetoriais do Office).
Duas PNG têm 1152 × 864 px, proporção de slide; a hipótese é que sejam as figuras "(Makro, 2003)".
O total (24) é maior que o de figuras com legenda (18 ilustrações + 2 tabelas em imagem) porque
algumas figuras são compostas de várias imagens. **O mapeamento imagem → figura é a tarefa T1.3 do
plano de implementação**; até lá, a referência visual de cada figura é a página do PDF renderizado.

## 6. Problemas de extração

| # | Problema | Efeito | Tratamento |
| :-- | :-- | :-- | :-- |
| E-1 | Nomes de arquivo em CP850 | Acentos corrompidos na listagem padrão do `unzip` | Normalização dos nomes só nas cópias de trabalho; o ZIP fica intacto |
| E-2 | Conversão `.doc` → texto (LibreOffice 24.2) | Imagens e caixas de texto somem; Tabela 2 perde a estrutura de colunas; marcadores viram "•" | Texto puro serve para leitura e busca; a forma visual vem do PDF renderizado |
| E-3 | Conversão `.doc` → PDF | Fontes do Windows de 2004 substituídas por equivalentes métricas; quebras de linha podem variar | A paginação foi conferida contra o sumário (§4.2) e bateu em todos os capítulos verificados |
| E-4 | WMF | Formato vetorial do Office sem suporte nativo em navegadores | Na página, figuras são redesenhadas em SVG a partir do texto, ou exibidas como imagem do PDF renderizado, conforme decisão D-4 |
| E-5 | Ilustrações com texto embutido (14–18) | O texto da figura não existe no fluxo de texto | Transcrição manual dos rótulos (feita para 16, 17 e 18 nesta spec) |
| E-6 | Página "Anexos:" vazia no arquivo 13 | O anexo só existe como arquivo separado (14) | A versão consolidada para consulta junta os 14 arquivos na ordem (§8) |
| E-7 | Metadados herdados de outro trabalho | A ficha catalográfica tem título interno "D683e Doni, Marcelo Viana" e nome de arquivo com "SergioKadez[1]" | Resíduo de modelo reaproveitado; não afeta o conteúdo visível. Não usar esses metadados como fonte de autoria |

Nenhum arquivo apresentou sinal de corrupção: os 14 abriram e converteram sem erro, e o texto
de todos é legível e completo até a última seção.

## 7. Decisões de preservação

| # | Decisão | Motivo |
| :-- | :-- | :-- |
| P-1 | O ZIP original fica guardado, sem alteração, em `/mnt/project-files/estudos/tgi-edi-2004/original/` junto com os hashes | Área controlada do projeto, privada |
| P-2 | **O ZIP, os `.doc` e o texto integral não entram no repositório nesta etapa** | O repositório `issei/mauricio-site` é **público**: um commit equivale a publicação. A publicação depende do consentimento dos coautores (Q-1) e da decisão sobre figuras de terceiros (Q-2) |
| P-3 | As extrações de trabalho ficam em `/mnt/project-files/estudos/tgi-edi-2004/extraido/` (`texto/`, `pdf-renderizado/`, `imagens/`) | Permite que a implementação trabalhe sem reconverter; não é publicado |
| P-4 | A spec (este diretório) contém apenas dados bibliográficos, a estrutura, transcrições curtas e citações com página | Rastreabilidade sem publicar o texto integral antes da autorização |
| P-5 | Nenhuma versão reescrita ou modernizada substitui o original. Uma eventual "versão de leitura" é derivada, identificada como tal e acompanhada de errata (spec §6.8) | Exigência do pedido |
| P-6 | A grafia, a ortografia de 2004 ("idéia", "conseqüentemente") e os erros do original permanecem no documento original publicado | Integridade histórica |

## 8. Proposta de arquivo publicável (condicionada a Q-1 e Q-2)

1. Gerar **um PDF consolidado** com os 14 arquivos na ordem do prefixo (capa → questionário), a
   partir dos `.doc` originais, com conferência visual página a página contra o PDF renderizado.
2. Preferir PDF/A-2b (arquivamento) se a ferramenta preservar as figuras WMF sem perda; senão,
   PDF comum com a observação no inventário.
3. Publicar o SHA-256 do PDF ao lado do link de download e manter, na pasta do projeto, o ZIP
   original como prova de origem.
4. Não alterar o conteúdo do PDF: sem carimbo, sem marca d'água, sem correção. A contextualização
   fica na página, não no arquivo.
5. Caminho proposto: `public/downloads/tgi-gestao-de-pedidos-edi-2004.pdf` (servido como
   `application/pdf`, que o `aws s3 sync` do deploy já deduz pela extensão).

## 9. Referências aos arquivos originais

| Recurso | Caminho | Público? |
| :-- | :-- | :-- |
| ZIP original | `/mnt/project-files/estudos/tgi-edi-2004/original/TGI_Versao_Final.zip` | Não |
| Hashes dos `.doc` | `/mnt/project-files/estudos/tgi-edi-2004/original/SHA256SUMS-docs-no-zip.txt` | Não |
| Texto extraído (14 `.txt`, UTF-8) | `/mnt/project-files/estudos/tgi-edi-2004/extraido/texto/` | Não |
| PDF renderizado (14 `.pdf`) | `/mnt/project-files/estudos/tgi-edi-2004/extraido/pdf-renderizado/` | Não |
| Imagens embutidas (24) | `/mnt/project-files/estudos/tgi-edi-2004/extraido/imagens/` | Não |
| Upload no projeto | `/mnt/project-files/uploads/hearth/` (cópia gravada pela plataforma) | Não |
