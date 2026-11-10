---
id: SDD-F1-fonte-unica
titulo: SDD da fase F1 — YAML 2.0.0 como fonte única e catálogo gerado
data: 2026-11-10
leitor: Issei (aprova a classificação do Anexo A); agente que vai implementar a F1
padrao_de_redacao: PT-BR controlado (perfil técnico)
status: especificação — aguarda a confirmação do Anexo A pelo autor
---

# SDD da fase F1 — YAML 2.0.0 como fonte única e catálogo gerado

> Origem: [`PROPOSTA-REESTRUTURACAO.md`](PROPOSTA-REESTRUTURACAO.md), decisões D3, D4, D5 e D7
> (tomadas pelo autor em 10/11/2026). A F1b (cabeçalho comum) tem SDD próprio:
> [`SDD-F1b-cabecalho-comum.md`](SDD-F1b-cabecalho-comum.md).
> Requisitos: **RF-F1-xx**. Critérios de aceite: **CA-F1-xx**.

## 1. Objetivo

Fazer do `specs/ecosystem.nav.yaml` a única lista dos conteúdos do site. Dela saem o catálogo
(`/catalogo`) e os dados do menu `<eco-nav>` (enquanto ele existir; ver SDD-F1b §7). A F1 não muda
a home, o currículo nem o texto das páginas.

## 2. Situação de partida (fatos, commit `791f623`)

| Item | Estado |
| :-- | :-- |
| YAML | v1.13.0; 5 pilares; 28 nós; 8 crosslinks; invariantes INV-1 a INV-5 |
| `src/js/eco-nav.js` | cópia manual do YAML; `tests/apresentacao.ecossistema.test.mjs` confere os slugs das duas cópias |
| `src/catalogo.html` | escrito à mão; 33 cartões; 5 páginas que não estão no YAML (DV-1); sem link para `/videos`, `/temas` ou `/curriculo` (DV-2) |
| Outros leitores do YAML | `scripts/audit-site.mjs`, `tests/digital-workplace.legal.test.mjs` |
| Formatos | `KINDS` em `scripts/editorial/editorial.data.mjs` (15 valores); o catálogo usa rótulos fora da lista (DV-5) |

## 3. Requisitos

### 3.1 Esquema do YAML 2.0.0

- **RF-F1-01.** `meta.version` passa a `2.0.0`, com nota de versão que cita D4 e D5 e a data.
- **RF-F1-02.** `pillars` tem exatamente quatro itens, na ordem `p1`, `p2`, `p3` e `p4`. O `p5` sai.
- **RF-F1-03.** Uma seção nova, `entradas`, lista as páginas de entrada, que não são conteúdo:
  `index` (Início), `curriculo` (Trajetória), `catalogo` (Produção) e `videos` (Vídeos). Cada uma
  tem `file`, `label` e `href`. Esta seção alimenta o cabeçalho comum (SDD-F1b).
- **RF-F1-04.** Uma seção nova, `trajetoria`, lista as narrativas pessoais: `life`, `life3d`,
  `terminal-evolutivo` e `lifeos`. Esses nós não pertencem a nenhum pilar.
- **RF-F1-05.** Cada nó de conteúdo tem os campos abaixo. Os nós atuais mantêm `file`, `title`,
  `label` e `blurb` como estão.

  | Campo | Obrigatório | Regra |
  | :-- | :-- | :-- |
  | `pillar` | sim, exceto em `trajetoria` | `p1` a `p4` |
  | `kind` | sim | um valor de `KINDS` (§3.3) |
  | `natureza` | sim | `experiencia`, `estudo`, `proposta`, `experimento` ou `referencia` |
  | `temas` | sim nos pilares (1 a 3); opcional na trajetória (0 a 3) | chaves de `content/temas.yml` |
  | `descricao` | sim | texto do cartão do catálogo, copiado sem mudança do HTML atual |
  | `catalogo` | não (padrão `true`) | `false` esconde o nó do catálogo, sem tirá-lo do grafo |
  | `par` | não | slug de outro nó; usado por `aprendizagem-autorregulada-artigo` |

- **RF-F1-06.** Entram como nós: `capacidade-antes-do-acesso`, `curiosidade-e-investigacao`,
  `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo` (com `catalogo: false` e
  `par: aprendizagem-autorregulada`), `operacao-capital-cognitivo`, `digital-workplace-agentico` e
  `lifeos`.
- **RF-F1-07.** Mudam de pilar: `socialselling` (p5 → p3) e `boutique-empresarial-showcase`
  (p5 → p2). `index` e `videos` saem dos pilares e vão para `entradas`.
- **RF-F1-08.** Os crosslinks existentes ficam iguais.

### 3.2 Invariantes do YAML 2.0.0

Substituem os do cabeçalho do arquivo. O teste novo (§5) aplica todos.

| Id | Regra |
| :-- | :-- |
| INV-1 | todo slug de `pillars[].nodes` existe em `nodes` |
| INV-2 | `pillars` tem 4 itens, na ordem 1 a 4 |
| INV-3 | todo `file` corresponde a um arquivo real (`src/` ou, para `lifeos`, `public/`) |
| INV-4 | `crosslinks[].from` e `.to` são slugs válidos |
| INV-5 | URLs derivadas usam `meta.canonical_base`, exceto os `href` absolutos já previstos (`/videos.html`) |
| INV-6 | todo nó tem `kind` em `KINDS`, `natureza` na lista e `temas` válidos e na quantidade de RF-F1-05 |
| INV-7 | toda URL PT-BR do sitemap que é página autoral é um nó, uma entrada ou uma página legal |
| INV-8 | `src/catalogo.html` entre os marcadores é igual à saída do gerador |

### 3.3 Formatos

- **RF-F1-09.** `KINDS` ganha dois valores, que o catálogo já usa e que não cabem em nenhum
  existente: `Curso` (`sustentacao`, `salesforce-agentic-dev`) e `Áudio comentado`
  (`da-execucao-a-orquestracao`).
- **RF-F1-10.** Os demais rótulos do catálogo passam ao valor de `KINDS` indicado no Anexo A
  ("Case" → "Case técnico", "Estudo" → "Estudo técnico", "Visão geral" → "Apresentação",
  "Narrativa" → "Narrativa pessoal"). "Jornada" (`engenharia-confianca`) não tem equivalente
  claro: o Anexo A propõe "Material interativo" e pede confirmação.
- **RF-F1-11.** `editorial.data.mjs` passa a importar `KINDS` do mesmo lugar que o gerador do
  catálogo, para não haver duas listas. (A camada editorial continua com o seu próprio `kind` por
  página; o teste da §5 confere que ele é igual ao do YAML.)

### 3.4 Gerador do catálogo

- **RF-F1-12.** Novo `scripts/gen-catalogo.mjs`, no padrão de `gen-editorial.mjs`: lê o YAML,
  escreve entre `<!-- CATALOGO:START -->` e `<!-- CATALOGO:END -->` em `src/catalogo.html`, é
  idempotente e tem `--check`.
- **RF-F1-13.** O que fica fora dos marcadores continua escrito à mão: `<head>`, hero e o bloco
  "Comece por aqui".
- **RF-F1-14.** Cada cartão mostra: formato (`kind`), natureza (rótulo por extenso), título, a
  `descricao`, os temas como links para `/temas/<tema>` e o selo de crosslink que já existe.
  O cartão não ganha ícone nem card novo: segue o markup atual.
- **RF-F1-15.** O catálogo ganha, depois dos quatro pilares, uma seção curta "Trajetória e
  vídeos" com links para `/curriculo`, as narrativas e `/videos` (corrige DV-2).
- **RF-F1-16.** A trilha dos pilares (`nav` "Jornada do ecossistema") passa a ter 4 itens.
- **RF-F1-17.** "Comece por aqui" passa a ter uma porta por público (recrutador → `/curriculo`;
  liderança técnica → `case-agents`; leitor → `artifice`). [confirmar: destinos]

### 3.5 Dados do `<eco-nav>`

- **RF-F1-18.** `gen-catalogo.mjs` também escreve `src/js/eco-nav.data.js` (pilares e nós) a partir
  do YAML. `eco-nav.js` passa a importar esse arquivo e deixa de ter cópia própria.
  `tests/apresentacao.ecossistema.test.mjs` passa a conferir o arquivo gerado.

### 3.6 Fora do escopo da F1

Cabeçalho comum (F1b); natureza no topo das páginas (F4); artigos nas páginas de tema (F5); home e
currículo (F2, F3); qualquer texto de página.

## 4. Impacto em outros ativos

| Ativo | O que muda |
| :-- | :-- |
| `ECOSYSTEM.md` | regra "editar YAML e JS juntos" sai; entra "editar só o YAML e rodar o gerador" |
| `scripts/inject-eco-nav.mjs` | lista de páginas passa a vir do YAML (DV-3), até a F1b retirar o componente |
| `scripts/quality-gate.mjs` | acrescenta `gen-catalogo.mjs --check` |
| `scripts/audit-site.mjs` | lê `pillars` sem supor 5 |
| `/en/` | `catalogo` e `eco-nav.data.js` mudam: `npm run i18n:sync && npm run i18n:check` na máquina do autor antes do merge |
| `public/catalogo.md` | gêmeo `.md` regenerado (`check-md-twins.mjs`) |

## 5. Testes

- `tests/ecosystem.schema.test.mjs` (novo): INV-1 a INV-7.
- `tests/catalogo.gen.test.mjs` (novo): INV-8; todo nó com `catalogo` diferente de `false` aparece
  uma vez; todo cartão tem formato, natureza e ao menos um tema; links de tema existem em
  `src/temas/`.
- `tests/apresentacao.ecossistema.test.mjs`: ajustado a RF-F1-18.
- `tests/eco-nav.spec.js`: 4 pilares.
- Sweep de acessibilidade em `catalogo` (PT e EN): a dívida não sobe.

## 6. Critérios de aceite

- **CA-F1-01.** `npm run gate` verde, com `gen-catalogo.mjs --check`.
- **CA-F1-02.** O catálogo publicado tem 28 cartões nos 4 pilares (as 29 páginas dos pilares menos
  o par `aprendizagem-autorregulada-artigo`) e a seção "Trajetória e vídeos" com links para
  `/curriculo`, as 4 narrativas e `/videos`. Somadas, são as 33 páginas autorais.
- **CA-F1-03.** Nenhuma URL muda; o `sitemap.xml` tem as mesmas URLs.
- **CA-F1-04.** Todo cartão mostra formato, natureza e temas confirmados pelo autor no Anexo A.
- **CA-F1-05.** O `/en/` está em dia (`i18n:check`).

## 7. Ordem de implementação

1. Teste do esquema (falha), depois o YAML 2.0.0 com a classificação aprovada.
2. Teste do gerador (falha), depois `gen-catalogo.mjs` e os marcadores no catálogo.
3. `eco-nav.data.js` e ajuste dos testes do componente.
4. Gate, sweep de acessibilidade, `i18n:sync` local, PR.

## Anexo A — Classificação proposta (para o autor confirmar)

Natureza segundo os critérios da proposta (§10.2). Temas com as chaves de `content/temas.yml`.
Em **negrito**, as linhas em que a proposta tem dúvida e pede confirmação.

| Página | Pilar | Formato (`kind`) | Natureza | Temas |
| :-- | :-- | :-- | :-- | :-- |
| `know` | p1 | Ensaio | Estudo | gestao-e-estrategia |
| `devin` | p1 | Apresentação | Estudo | engenharia-agentica, ferramentas-de-ia |
| `artifice` | p1 | Ensaio com autodiagnóstico | Estudo | tecnologia-e-cultura, gestao-e-estrategia |
| `formulacao-de-problemas` | p1 | Artigo | Estudo | gestao-e-estrategia, dados-e-decisao |
| `capacidade-antes-do-acesso` | p1 | Artigo | Estudo | aprendizagem-e-mente, tecnologia-e-cultura |
| `curiosidade-e-investigacao` | p1 | Ensaio | Estudo | aprendizagem-e-mente |
| `aprendizagem-autorregulada` | p1 | Revisão científica | Estudo | aprendizagem-e-mente |
| `aprendizagem-autorregulada-artigo` | p1 (par, sem cartão) | Artigo | Estudo | aprendizagem-e-mente |
| `da-execucao-a-orquestracao` | p1 | Áudio comentado | Estudo | gestao-e-estrategia, engenharia-agentica |
| `apresentacao` | p2 | Apresentação | Referência | engenharia-agentica, especificacao-e-desenvolvimento |
| **`engenharia-confianca`** | p2 | **Material interativo** (hoje "Jornada") | Estudo | engenharia-agentica |
| `engenharia-agentes-ia` | p2 | Material interativo | Estudo | engenharia-agentica |
| `develop-engineering` | p2 | Artigo | Estudo | engenharia-agentica, especificacao-e-desenvolvimento |
| `operacao-capital-cognitivo` | p2 | Simulador | Experimento | dados-e-decisao, gestao-e-estrategia |
| `agent-ready` | p2 | Tutorial | Experiência | engenharia-agentica, especificacao-e-desenvolvimento |
| `case-agents` | p2 | Case técnico | Experiência | engenharia-agentica |
| `knowledge-os-presentation` | p2 | Apresentação | Proposta | engenharia-agentica, gestao-e-estrategia |
| `digital-workplace-agentico` | p2 | Estudo técnico | Estudo | engenharia-agentica, gestao-e-estrategia |
| `acessibilidade` | p2 | Case técnico | Experiência | acessibilidade-e-design |
| `especificacao-conversacional` | p2 | Ensaio | Proposta | especificacao-e-desenvolvimento, engenharia-agentica |
| **`boutique-empresarial-showcase`** | p2 | **Documentação de projeto** (hoje "Case") | Experiência | especificacao-e-desenvolvimento, engenharia-agentica |
| `devops-salesforce` | p3 | Guia prático | Referência | salesforce-e-vendas, engenharia-agentica |
| `proposta-engenharia-reversa` | p3 | Proposta técnica | Proposta | salesforce-e-vendas, engenharia-agentica |
| `salesforce-agentic-quickstart` | p3 | Tutorial | Referência | salesforce-e-vendas, ferramentas-de-ia |
| **`salesforce-agentic-dev`** | p3 | **Curso** (hoje "Guia prático") | Referência | salesforce-e-vendas, especificacao-e-desenvolvimento |
| **`socialselling`** | p3 | Documentação de projeto | **Experiência** (o projeto foi para produção?) | salesforce-e-vendas, engenharia-agentica |
| `sustentacao` | p4 | Curso | Referência | cloud-e-confiabilidade |
| `service-operations-2-0` | p4 | Apresentação | Proposta | cloud-e-confiabilidade, gestao-e-estrategia |
| `proposta-observabilidade-mobile` | p4 | Proposta técnica | Proposta | cloud-e-confiabilidade |
| `life` | trajetória | Narrativa pessoal | Experimento | tecnologia-e-cultura |
| `life3d` | trajetória | Narrativa pessoal | Experimento | — |
| `terminal-evolutivo` | trajetória | Narrativa pessoal | Experimento | — |
| **`lifeos`** | trajetória | Narrativa pessoal | Experimento | — (página em `public/`, fora do build do Vite) |

Contagem por natureza: Estudo 13 · Experiência 5 · Proposta 5 · Referência 5 · Experimento 5 (33 páginas).
Contagem por tema (nas 29 páginas dos pilares): engenharia-agentica 15 · gestao-e-estrategia 8 ·
especificacao-e-desenvolvimento 6 · salesforce-e-vendas 5 · aprendizagem-e-mente 4 ·
cloud-e-confiabilidade 3 · dados-e-decisao 2 · ferramentas-de-ia 2 · tecnologia-e-cultura 2 ·
acessibilidade-e-design 1.

Observação: "engenharia-agentica" em 15 das 29 páginas mostra que o tema é largo demais para
servir de filtro sozinho. Não muda a F1, mas vale olhar quando o catálogo ganhar filtro por tema.
