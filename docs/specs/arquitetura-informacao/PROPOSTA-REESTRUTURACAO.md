---
id: PROPOSTA-REESTRUTURACAO
titulo: Proposta estratégica de reestruturação do mauricio.issei.com.br
data: 2026-11-10
leitor: Issei (autor e decisor); agentes que vão escrever a especificação de implementação
padrao_de_redacao: PT-BR controlado (perfil híbrido)
status: proposta — decisões D1 a D7 tomadas pelo autor em 10/11/2026 (§13.2)
---

# Proposta estratégica de reestruturação do mauricio.issei.com.br

> **Escopo.** Análise e proposta. Nenhuma página, gerador ou teste muda neste documento.
> **Fontes.** Repositório `issei/mauricio-site` em `main` no commit `791f623` (10/11/2026) e o site
> publicado, lido em 10/11/2026 (home, catálogo e `sitemap.xml`). As divergências entre as fontes
> estão marcadas com **[DIV]**.
> **Marcadores de evidência.** **[F]** fato conferido · **[D]** diagnóstico (interpretação dos fatos)
> · **[H]** hipótese ainda não comprovada · **[R]** recomendação.
> **Proposta anterior.** O texto colado pelo autor em 10/11/2026 foi tratado como hipótese. A
> avaliação dele está na §5.4.
>
> **Revisão de 10/11/2026 (2ª versão).** Decisões reunidas num registro único (D1 a D7, §13.2), cada
> uma com situação atual, opções, recomendação e o que bloqueia. Correções: `devin` fica no p1
> (já está lá; a mudança para o p3 não resolvia problema comprovado); "tema" passa a designar só
> os 10 temas de `temas.yml`, e a seção da home chama "Pilares"; o índice de vídeos é índice de
> formato, não área; as provas da home vêm da lista "Resultados quantificados" já gerada;
> referências cruzadas para §8 e §9 acertadas; Hub de Conexão incluído no inventário.
>
> **Decisões do autor (10/11/2026, 3ª versão).** D1 a D5 seguiram a recomendação. D6 e D7 não:
> o autor escolheu um **cabeçalho comum novo** em todas as páginas (D6 b) e **temas atribuídos a
> cada artigo no YAML** (D7 b). As seções 6, 7, 9, 10, 11, 12 e 13 foram ajustadas a essas escolhas.

---

## 1. Resumo executivo

**Diagnóstico em quatro frases.**

1. **[F]** A home publicada é o currículo: o corpo inteiro é gerado de `public/cv.json` e tem
   Sobre, Mapa de Linhas, Resultados quantificados, 19 projetos STAR, Formação, Recomendações e
   Contato. A home não tem nenhum link para um artigo, estudo, vídeo ou tema; o único caminho para
   a produção intelectual é o link "Catálogo".
2. **[F]** A produção intelectual (33 páginas autorais indexadas) existe, mas está organizada por
   três fontes que não concordam: o catálogo escrito à mão, o grafo `specs/ecosystem.nav.yaml` (e a
   cópia dele em `src/js/eco-nav.js`) e o vocabulário de temas dos vídeos (`content/temas.yml`).
3. **[D]** O problema principal não é visual nem de quantidade de conteúdo. É de **papel das
   páginas**: a home e `/curriculo` disputam a mesma finalidade (77% de texto em comum), enquanto
   a produção intelectual não tem uma porta própria a partir da entrada.
4. **[D]** O visitante não consegue distinguir, pela navegação, experiência feita em produção de
   estudo, proposta ou experimento. A informação existe em rótulos de formato, mas o vocabulário
   muda de página para página.

**Direção recomendada [R].** Uma arquitetura **com três papéis e sem área nova**:

- **Início (`/`)**: apresentação editorial curta, que diz quem é o autor, quais temas orientam o
  trabalho, onde estão as provas e por onde começar a ler.
- **Trajetória (`/curriculo`)**: a única página de experiência. Recebe o Mapa de Linhas e os
  projetos STAR que hoje estão na home.
- **Produção (`/catalogo`)**: o único índice da produção intelectual, gerado do
  `ecosystem.nav.yaml`, com os pilares de conteúdo e dois atributos por página: **natureza**
  (Experiência, Estudo, Proposta, Experimento, Referência) e **temas**.
- **Cabeçalho comum** em todas as páginas públicas: Início · Trajetória · Produção · Vídeos.

Essa opção é a alternativa C da §5. Ela vence as outras duas porque resolve os dois problemas
comprovados (a home sem porta para a produção e a disputa home × currículo) **sem criar URL
nova** e reaproveitando geradores que já existem. As URLs atuais ficam todas.

As decisões que cabem ao autor (D1 a D7, das quais D1 a D5 são as cinco mais importantes) e os
cinco riscos estão na §13.

---

## 2. Inventário atual

### 2.1 Páginas por papel

Contagem do `sitemap.xml` publicado **[F]**: 87 URLs, das quais 40 em PT-BR na raiz, 37 em
`/en/` (incluindo `/en`) e 10 em `/temas/`. As 177 fichas em `/videos/<slug>` são `noindex` e
ficam fora do sitemap.

| Papel | Páginas (PT-BR) | Qtd. |
| :-- | :-- | --: |
| Entrada e índices | `/` (home), `/catalogo`, `/videos`, `/temas/*` (10) | 13 |
| Identidade e trajetória | `/curriculo`, `/life`, `/life3d`, `/lifeos`, `/terminal-evolutivo` | 5 |
| Produção intelectual — pensamento | `know`, `devin`, `artifice`, `formulacao-de-problemas`, `capacidade-antes-do-acesso`, `curiosidade-e-investigacao`, `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo`, `da-execucao-a-orquestracao`, `especificacao-conversacional` | 10 |
| Produção intelectual — método de engenharia | `apresentacao`, `engenharia-confianca`, `engenharia-agentes-ia`, `develop-engineering`, `agent-ready`, `case-agents`, `knowledge-os-presentation`, `acessibilidade`, `digital-workplace-agentico`, `operacao-capital-cognitivo` | 10 |
| Aplicação Salesforce | `devops-salesforce`, `salesforce-agentic-dev`, `salesforce-agentic-quickstart`, `proposta-engenharia-reversa`, `socialselling` | 5 |
| Operação e sustentação | `sustentacao`, `service-operations-2-0`, `proposta-observabilidade-mobile` | 3 |
| Projeto | `boutique-empresarial-showcase` (só PT-BR) | 1 |
| Legais | `privacidade`, `termos`, `cookies` | 3 |

Páginas não listadas ou utilitárias **[F]** (fora do sitemap; algumas com `noindex`):
`proposta` (executiva, `noindex`), `entrevista-acessibilidade-streaming` (`noindex`), `404`,
`admin`, `admin-editor`, `diagnostic`, `test-github`, `mapmind`, `exemplopdi`, `vsl`. O painel
administrativo não é mais usado (decisão do autor, 09/11/2026).

**Fora do escopo desta proposta [R]:** as páginas não listadas continuam não listadas.

### 2.2 Mecanismos de navegação e descoberta

| Mecanismo | O que é **[F]** | Onde aparece **[F]** |
| :-- | :-- | :-- |
| Cabeçalho | Não há cabeçalho compartilhado. Cada página escreve o seu, com rótulos diferentes. Home: Sobre, Experiência, Formação, Recomendações, Contato, Catálogo. Catálogo: Início, Sobre Mim, Experiência, Catálogo. | por página |
| `<eco-nav>` | Botão flutuante (canto inferior direito) que abre o mapa dos 5 pilares. Web Component com Shadow DOM. | 24 arquivos de `src/` carregam o script |
| Catálogo | Página escrita à mão: "Comece por aqui" (3 portas), trilha dos 5 pilares, 33 cartões com rótulo "Formato · Assunto". | `/catalogo` |
| Índice de vídeos e temas | Gerados por `scripts/gen-videos.mjs` de `content/videos/*.md` e `content/temas.yml`. | `/videos`, `/temas/*` |
| Camada editorial | Bloco de orientação (Em uma frase, Formato, Profundidade, rotas) e continuação "Se este tema interessa". SSOT `scripts/editorial/editorial.data.mjs`. | 13 páginas |
| Bloco AEO | "Em síntese" + FAQ, SSOT `scripts/seo/pages.mjs`, gerador `scripts/seo/build-aeo.mjs`. | 24 páginas (EDITORIAL-AUDIT §2) |
| Crosslinks | 8 arestas dirigidas em `ecosystem.nav.yaml`. | páginas de origem |
| Hub de Conexão | Índice interno da página `apresentacao`, gerado por `scripts/gen-hub-data.mjs` de `scripts/seo/pages.mjs`. É recurso da página, não navegação do site. | `/apresentacao` |
| Superfície para agentes | `llms.txt`, `llms-full.txt`, `cv.json`, `star.json`, `cv-for-ai.md`, gêmeo `.md` por página, JSON-LD, `.well-known/*`. | raiz |

### 2.3 Fontes de verdade e geração

| Conteúdo | Fonte | Gerador | Saída |
| :-- | :-- | :-- | :-- |
| Home e currículo | `public/cv.json` (fallback de `issei/curriculo`) | `scripts/gen-portfolio.mjs` | blocos `PF:*` em `src/index.html`, `CV:*` em `src/curriculo.html` |
| Grafo de navegação | `specs/ecosystem.nav.yaml` (v1.13.0) | nenhum: `src/js/eco-nav.js` é uma cópia editada à mão | menu flutuante |
| Catálogo | nenhuma: HTML escrito à mão | — | `src/catalogo.html` |
| Vídeos e temas | `content/videos/*.md`, `content/temas.yml` | `scripts/gen-videos.mjs` | `src/videos.html`, `src/videos/*`, `src/temas/*` |
| Camada editorial | `scripts/editorial/editorial.data.mjs` | `scripts/gen-editorial.mjs` | blocos `EDITORIAL:*` |
| Síntese AEO | `scripts/seo/pages.mjs` | `scripts/seo/build-aeo.mjs` | blocos `AEO:*` |
| Gêmeo em inglês | o português | `scripts/sync-i18n.mjs` (Argos, só local) | `src/en/**`, `public/en/**` |

O `npm run gate` confere `gen-portfolio`, `gen-editorial`, `gen-videos`, `gen-hub-data` e os
espelhos `/en/` (`scripts/quality-gate.mjs`).

### 2.4 Divergências entre as fontes

| # | Divergência **[DIV]** | Fonte usada nesta proposta |
| :-- | :-- | :-- |
| DV-1 | O catálogo lista 5 páginas que não estão no grafo YAML: `capacidade-antes-do-acesso`, `curiosidade-e-investigacao`, `aprendizagem-autorregulada`, `operacao-capital-cognitivo`, `digital-workplace-agentico`. | catálogo (é o que o visitante vê) |
| DV-2 | O grafo YAML tem `videos` em p5; o catálogo publicado não tem link para `/videos`, `/temas` nem `/curriculo` (conferido no site em 10/11/2026). | site publicado |
| DV-3 | Páginas do grafo que não carregam o `<eco-nav>`: `develop-engineering`, `agent-ready`, `terminal-evolutivo`, `videos`, `boutique-empresarial-showcase`. `scripts/inject-eco-nav.mjs` ainda lista só os 17 nós originais. | código-fonte |
| DV-4 | Três vocabulários de assunto: os 5 pilares (YAML), os rótulos "Formato · Assunto" do catálogo (ex.: "Decisão", "Web Standards") e os 10 temas de `content/temas.yml`, que hoje classificam só vídeos. | os três são registrados |
| DV-5 | Rótulos de formato do catálogo fora da lista `KINDS` de `editorial.data.mjs`: "Jornada", "Curso", "Visão geral", "Áudio comentado", "Estudo", "Case" (contra "Case técnico"), "Narrativa". | `KINDS` |
| DV-6 | O cartão da home no catálogo e o nó `index` do YAML dizem "Tech Lead / Análise de Sistemas"; o plano FDE aprovado em 14/10/2026 previa a headline "Forward-Deployed Engineer". O plano parou na Fase 0 (`public/cases.json` não existe). | `cv.json` e site publicado |

### 2.5 Sobreposições já documentadas

`docs/specs/editorial/AUDITORIA-COMUNICACAO.md` §9 registra cinco grupos **[F]**:

| Grupo | Páginas | Sobreposição |
| :-- | :-- | :-- |
| G1 Engenharia da Confiança | `engenharia-confianca`, `engenharia-agentes-ia`, `case-agents`, `develop-engineering` | `engenharia-confianca` reexplica as páginas-fonte (BL-01) |
| G2 Salesforce agêntico | `devops-salesforce`, `salesforce-agentic-dev`, `salesforce-agentic-quickstart`, `proposta-engenharia-reversa`, `devin` | guia, curso e tutorial do mesmo fluxo; falta a ordem de leitura |
| G3 Aprendizagem | `aprendizagem-autorregulada`, `-artigo`, `curiosidade-e-investigacao` | par deliberado |
| G4 Perfil | `index`, `curriculo` | 77% do texto em comum, ~25 min de leitura na home |
| G5 Executivas | `apresentacao`, `service-operations-2-0`, `knowledge-os-presentation`, `operacao-capital-cognitivo` | formato executivo |

Esta proposta trata o G4 (é arquitetura). G1, G2 e G5 são reescrita de conteúdo e continuam no
backlog da auditoria editorial.

---

## 3. Diagnóstico da experiência

### 3.1 Problemas, por prioridade

| # | Problema | Evidência | Tipo |
| :-- | :-- | :-- | :-- |
| P1 | A home não leva à produção intelectual. Quem chega pela home só encontra o currículo e um link "Catálogo". | `src/index.html`: links internos só para catálogo, currículo e páginas legais; confirmado no site | **[F]** comprovado |
| P2 | Home e `/curriculo` têm a mesma finalidade. | G4: 77% de texto em comum, os dois gerados de `cv.json` | **[F]** comprovado |
| P3 | Não há navegação comum. Em 33 páginas autorais, o caminho de volta à home ou ao catálogo depende de cada página; o `<eco-nav>` falta em páginas do próprio grafo. | §2.2, DV-3 | **[F]** comprovado |
| P4 | A estrutura da produção diverge entre catálogo, menu e temas. Toda página nova precisa ser registrada à mão em dois ou três lugares, e isso já falhou 6 vezes (DV-1, DV-2). | §2.4 | **[F]** comprovado |
| P5 | Não é possível distinguir experiência de estudo, proposta ou experimento pela navegação. O catálogo põe "Proposta técnica" e "Case" lado a lado, com o mesmo peso visual, e o pilar p5 "Resultados" mistura o perfil, narrativas pessoais, um projeto e o índice de vídeos. | catálogo, YAML p5 | **[D]** |
| P6 | Os vídeos e os temas não estão ligados ao resto. `/videos` só aparece no menu flutuante; os temas classificam vídeos, mas nenhum artigo. | DV-2, DV-4 | **[F]** |
| P7 | A home tem cerca de 25 min de texto e um mapa denso de 7 linhas por 24 anos. | AUDITORIA §9 G4 | **[D]** o custo cognitivo é inferido, não medido |

### 3.2 Oportunidades

- **[F]** Os dados das provas já existem em formato estruturado (os resultados com número que `gen-portfolio.mjs` já extrai
  dos projetos de `cv.json` para a seção "Resultados quantificados", e `star.json`). Uma home editorial pode exibir provas **geradas**, sem texto novo de resultado.
- **[F]** A camada editorial já tem o padrão "Formato · Profundidade · rotas" e a continuação
  "Se este tema interessa". Basta estender o modelo, não criar outro.
- **[F]** O grafo YAML já tem título, blurb e pilar de cada página. Pode passar a gerar o catálogo
  e o menu flutuante.
- **[F]** A superfície para agentes já é forte. A reestruturação precisa preservar, não ampliar.

### 3.3 Lacunas de evidência

| Lacuna | Impacto | Como fechar |
| :-- | :-- | :-- |
| Não há dados de audiência nesta análise (páginas de entrada, origem do tráfego, profundidade). GTM e Clarity existem no site, mas não foram consultados. | A prioridade entre públicos (§4.1) é hipótese. | Autor exporta do GA4 e do Search Console as 20 páginas de entrada dos últimos 90 dias. |
| Nenhum teste com visitante real (recrutador, líder técnico). | P5 e P7 são diagnósticos, não comprovações. | Teste de 5 segundos e tarefa "encontre um texto sobre X" com 3 a 5 pessoas, antes e depois da Fase 3. |
| Não se sabe se o plano FDE ainda vale (DV-6). | Muda a headline e o rótulo da área de experiência. | Decisão D1 (§13). |

---

## 4. Modelo conceitual

### 4.1 Públicos e o que cada um precisa

| Público | Pergunta principal | Onde chega **[H]** | Prioridade **[R]** |
| :-- | :-- | :-- | :-- |
| Recrutador | "Ele tem a experiência que a vaga pede?" | home, LinkedIn → home | 1 |
| Liderança técnica | "Como ele pensa e decide em sistemas reais?" | home ou artigo compartilhado | 1 |
| Profissional de tecnologia | "Tem algo útil para eu aplicar?" | busca → artigo, guia | 2 |
| Leitor de ideias e estudos | "O que ele investiga e defende?" | artigo, vídeo, tema | 2 |
| Visitante de busca | "Esta página responde à minha pergunta?" | página profunda | 2 |
| Agente de IA | "Quem é, o que publicou e onde está a fonte?" | `llms.txt`, `.md`, JSON-LD | 3 (já atendido) |

**Conflito principal [D].** O recrutador quer prova rápida e linear; o leitor de ideias quer
assunto e profundidade. Uma home que tenta servir os dois por completo vira currículo **e**
catálogo, o que é o problema P1+P2 ao contrário. A solução é a home **apontar** para cada um,
não conter os dois.

**Hipótese a validar [H].** Leitores de busca chegam em páginas profundas e nunca veem a home.
Se isso se confirmar (lacuna §3.3), a identidade do autor precisa aparecer também no fim de cada
página autoral, não só na home.

### 4.2 Conceitos e o papel de cada um

| Conceito | Vira | Justificativa |
| :-- | :-- | :-- |
| Identidade profissional | **seção da home** | é a primeira pergunta; não precisa de página própria |
| Trajetória e experiência | **área** (`/curriculo`) | tem finalidade e público próprios (recrutador) |
| Competências (Mapa de Linhas) | **componente da Trajetória**, com versão resumida na home | é prova da trajetória, não índice de conteúdo |
| Produção intelectual | **área** (`/catalogo`) | tem finalidade e público próprios (leitor) |
| Pilar (p1–p4) | **agrupamento** dentro da Produção | já existe, é estável e o leitor entende |
| Tema (10 de `temas.yml`) | **atributo** e página de assunto | ponte entre artigos e vídeos; não entra no menu |
| Natureza (Experiência, Estudo, Proposta, Experimento, Referência) | **atributo** visível no cartão e na página | resolve P5; não entra no menu |
| Formato (`KINDS`) | **atributo** | já existe; só falta usar a mesma lista em todo lugar |
| Projetos e cases | **natureza "Experiência"** dentro da Produção, com link para o projeto STAR | evita uma terceira área que disputaria com Trajetória |
| Pesquisa e investigação | **natureza "Estudo"** | uma categoria "Pesquisas" se sobreporia aos pilares |
| Laboratório e experimentos | **natureza "Experimento"** | `life3d`, `lifeos`, `terminal-evolutivo` e os simuladores são poucos; uma área própria teria 5 páginas |
| Vídeos | **formato**, com índice próprio (`/videos`) | 177 fichas; índice já gerado |
| Referências e materiais de consulta | **natureza "Referência"** | guias e tutoriais |

Regra que sai daqui **[R]:** só dois conceitos viram áreas (Trajetória e Produção). Todo o resto é
atributo ou relação.

---

## 5. Alternativas arquiteturais

### 5.1 Alternativa A — Orientada à identidade profissional

- **Organização.** Home = perfil resumido + provas + experiência. Produção fica no catálogo,
  sem mudança.
- **Hierarquia.** Início · Experiência · Formação · Catálogo · Contato (é a home de hoje, mais
  curta).
- **Papel da home.** Currículo resumido, com link para `/curriculo` completo.
- **Benefícios.** Menor mudança; o recrutador acha tudo na primeira tela.
- **Limitações.** Não resolve P1 nem P5; o site continua parecendo um currículo online, o que a
  premissa da §2 do metaprompt proíbe.
- **Complexidade.** Baixa (um template em `gen-portfolio.mjs`).
- **Risco de sobreposição.** Home e `/curriculo` continuam disputando a finalidade.
- **Públicos.** Bom para recrutador; fraco para liderança técnica e leitor.

### 5.2 Alternativa B — Orientada à produção intelectual

- **Organização.** Home = índice editorial por tema (os 10 temas como eixo), com artigos e vídeos
  misturados. Trajetória vira "Sobre" no rodapé.
- **Hierarquia.** Temas · Artigos · Vídeos · Sobre.
- **Papel da home.** Revista: destaques e últimos conteúdos.
- **Benefícios.** Destaca o pensamento; temas unificam artigos e vídeos.
- **Limitações.** O site passa a parecer um blog, o que a premissa também proíbe. Os 10 temas
  foram desenhados a partir de títulos de vídeo (`temas.yml`, proposta de 07/11/2026) e não
  cobrem bem os artigos. Os 20 artigos de vídeo ainda são rascunho, então "últimos conteúdos"
  teria pouca coisa publicada. Enfraquece a prova de experiência.
- **Complexidade.** Alta: classificar 33 páginas por tema, nova home, novo índice, rotas novas.
- **Risco de sobreposição.** Temas × pilares: dois agrupamentos de assunto disputando o leitor.
- **Públicos.** Bom para leitor e busca; fraco para recrutador.

### 5.3 Alternativa C — Três papéis (híbrida restrita)

- **Organização.** Início (editorial) · Trajetória (`/curriculo`) · Produção (`/catalogo`).
  Pilares p1–p4 continuam como agrupamento da Produção; temas e natureza são atributos.
- **Hierarquia.** Menu com Início · Trajetória · Produção · Vídeos (§9.1). Contato fica na home e na Trajetória.
- **Papel da home.** Responder às 5 perguntas e mandar o visitante para a área certa.
- **Benefícios.** Resolve P1, P2 e P5 com URLs existentes; cada área tem um público principal;
  as provas da home são geradas de `cv.json`, sem texto novo de resultado.
- **Limitações.** Exige classificar a natureza de 33 páginas (decisão do autor) e mudar o pilar
  p5, que é um invariante do YAML (INV-2).
- **Complexidade.** Média, em fases independentes (§12).
- **Risco de sobreposição.** Home × Trajetória, se a home voltar a crescer. A regra de corte está
  na §8.2.
- **Públicos.** Recrutador e liderança técnica no primeiro clique; leitor no segundo.

### 5.4 Avaliação da proposta anterior (hipótese)

A proposta colada pelo autor também recomenda uma híbrida. Os pontos conferidos:

| Afirmação da proposta anterior | Conferência |
| :-- | :-- |
| A home é um currículo detalhado com Mapa de Linhas e STAR | **Confirmada [F].** |
| Os 10 temas de `temas.yml` são "eixos" do site | **Não confirmada.** Os temas classificam só vídeos (DV-4). |
| "Dezenas de páginas" de vídeo como produção | **Parcial.** São 177 fichas `noindex`; nenhum artigo publicado; 20 em rascunho. |
| Menu global "Sobre · Produção · Experiência · Catálogo · Contato" | **Problemas.** Não existe cabeçalho global para receber esse menu (P3); "Produção" e "Catálogo" seriam dois índices do mesmo conteúdo, a sobreposição que o metaprompt proíbe. |
| Nova área `/experiencia` | URL inventada e não marcada como proposta; `/curriculo` já cumpre o papel. |
| Nova taxonomia de 5 tipos | Ignora a lista `KINDS` que já existe e o `nivel_evidencia` do plano FDE. |
| Mensagem "Tech Lead e arquiteto de sistemas" | "Arquiteto" não está em `cv.json`; risco de afirmação sem fonte (SDD-FDE §2.3). |
| Não cita o plano FDE, o `apresentacao` (Hub de Conexão) nem as divergências do catálogo | Lacunas da análise anterior. |

**Conclusão.** A direção geral se mantém; a forma muda: **sem menu de cinco itens, sem área
nova, com uma fonte única para catálogo e menu**.

### 5.5 Comparação

| Critério | A Identidade | B Produção | C Três papéis |
| :-- | :-- | :-- | :-- |
| Identidade (quem é o autor) | clara | fraca | clara |
| Coerência experiência × produção | fraca: produção escondida | fraca: experiência escondida | ligadas pela home e pela natureza "Experiência" |
| Descoberta sem conhecer o site | não muda | melhora para leitor | melhora para os dois públicos principais |
| Diferenciação experiência × proposta × experimento | não resolve | parcial | resolve pelo atributo natureza |
| Simplicidade percebida | home menor | depende do volume de temas | home menor, 3 áreas |
| Escalabilidade | igual a hoje | depende de classificar tudo por tema | página nova = uma entrada no YAML |
| Manutenção | igual | gerador novo de home e índice | reaproveita `gen-portfolio`, YAML, `gen-editorial` |
| Acessibilidade | sem risco novo | risco em índice dinâmico | sem filtro com JS obrigatório (§9.4) |
| Encontrabilidade por agentes | igual | precisa refazer `llms.txt` | `llms.txt` ganha a natureza; nada some |
| Preservação de URLs | total | total, mas rebaixa páginas | total |

**Recomendação [R]: alternativa C.** A vantagem sobre A é resolver P1 e P5, que A deixa como
estão. A vantagem sobre B é não depender de conteúdo que ainda não está publicado (artigos de
vídeo) nem de um segundo agrupamento de assunto.

---

## 6. Arquitetura recomendada

### 6.1 Árvore

```text
/                                   Início — apresentação editorial (reescrita)
├── /curriculo                      Trajetória — experiência, Mapa de Linhas, STAR, formação
│   └── narrativas pessoais         /life · /life3d · /terminal-evolutivo (links "a jornada contada de outro jeito")
├── /catalogo                       Produção — índice único, gerado
│   ├── #p1 Fundação · Mentalidade
│   ├── #p2 Engenharia de Confiança · O Método
│   ├── #p3 Ecossistema Salesforce · A Aplicação
│   ├── #p4 Sustentação & Resiliência · O Valor
│   └── (cada cartão: formato · natureza · tempo)
├── /videos                         Vídeos — índice gerado
│   └── /temas/<tema> (10)          Assunto — vídeos + artigos relacionados (novo: artigos)
├── páginas autorais (33)           sem mudança de URL
└── /privacidade · /termos · /cookies · superfície para agentes
```

O pilar p5 "Soluções & Portfólio" deixa de existir como pilar **[R]**: `index` sai do grafo de
conteúdo (é a entrada), as narrativas pessoais passam a ser ligadas pela Trajetória, `videos`
vira índice próprio, `socialselling` vai para o p3 e `boutique-empresarial-showcase` para o p2
(decisão D4).

### 6.2 Áreas

| Área | Objetivo | Público principal | Inclui | Exclui | Páginas existentes | Página nova |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Início | dizer quem é e mandar para a área certa | recrutador, liderança técnica | identidade, temas, 3–5 provas geradas, 3–4 destaques | projetos STAR completos, formação, recomendações | `/` | nenhuma |
| Trajetória | provar a experiência | recrutador | Sobre, Mapa de Linhas, resultados, STAR, formação, recomendações, contato | ensaios e propostas | `/curriculo`, narrativas pessoais | nenhuma |
| Produção | permitir explorar o pensamento | liderança técnica, profissional, leitor | 33 páginas autorais por pilar, com natureza | currículo, páginas legais, fichas de vídeo | `/catalogo` | nenhuma |
| Índice de vídeos e temas (índice de formato, não área) | achar por assunto e por formato | leitor, busca | índice de vídeos, 10 temas | artigos sem relação com tema | `/videos`, `/temas/*` | nenhuma |

### 6.3 Critério de descoberta

- A home liga às três áreas acima da dobra no celular.
- Toda página autoral tem: o cabeçalho comum (§9.1), a natureza no topo e a
  continuação "Se este tema interessa" no fim.
- O catálogo é o único lugar com a lista completa; a home e os temas mostram recortes.

---

## 7. Matriz de migração

Ações: **Manter** (sem mudança) · **Reclassificar** (muda pilar, natureza ou rótulo, não o
conteúdo) · **Revisar** (muda conteúdo) · **Reescrever** · **Consolidar**. Nenhuma página é
descontinuada. A natureza é a **proposta padrão** desta análise e precisa da validação do autor
(D5).

| Página atual | Destino | Natureza proposta | Ação | Justificativa |
| :-- | :-- | :-- | :-- | :-- |
| `/` | Início | — | Reescrever | P1, P2; corpo deixa de ser o CV |
| `/curriculo` | Trajetória | — | Revisar | recebe Mapa de Linhas e resultados da home |
| `/catalogo` | Produção | — | Revisar (gerar) | P4; passa a ser gerado do YAML |
| `/videos` | Vídeos | — | Manter | já gerado; ganha link da home e do catálogo |
| `/temas/*` (10) | Vídeos e temas | — | Revisar (gerar) | ganham artigos relacionados |
| `/life`, `/life3d`, `/terminal-evolutivo` | Trajetória (ligadas) | Experimento | Reclassificar | narrativa pessoal, não resultado |
| `/lifeos` | sem área (por ora) | — | Manter publicado, sem link | o autor decidiu deixar fora da F1 (SDD-F1-F1b, Anexo B, Q5) |
| `/know` | Produção p1 | Estudo | Manter | — |
| `/artifice` | Produção p1 | Estudo | Manter | — |
| `/formulacao-de-problemas` | Produção p1 | Estudo | Manter | já declara "sustentação parcial" |
| `/capacidade-antes-do-acesso` | Produção p1 | Estudo | Reclassificar | entra no YAML (DV-1) |
| `/curiosidade-e-investigacao` | Produção p1 | Estudo | Reclassificar | entra no YAML (DV-1) |
| `/aprendizagem-autorregulada` | Produção p1 | Estudo | Reclassificar | entra no YAML (DV-1) |
| `/aprendizagem-autorregulada-artigo` | Produção p1 (par da anterior) | Estudo | Manter | par deliberado (G3) |
| `/da-execucao-a-orquestracao` | Produção p1 | Estudo | Manter | EXC-009 (transcrição) continua |
| `/especificacao-conversacional` | Produção p2 | Proposta | Manter | é workflow proposto |
| `/apresentacao` | Produção p2 | Referência | Manter | visão geral; exceção de paleta mantida |
| `/engenharia-confianca` | Produção p2 | Estudo | Consolidar (BL-01) | vira trilha curta do G1 |
| `/engenharia-agentes-ia` | Produção p2 | Estudo | Manter | — |
| `/develop-engineering` | Produção p2 | Estudo | Revisar | recebe o cabeçalho comum (corrige DV-3) |
| `/agent-ready` | Produção p2 | Experiência | Revisar | descreve o próprio site; recebe o cabeçalho comum |
| `/case-agents` | Produção p2 | Experiência | Manter | case medido |
| `/knowledge-os-presentation` | Produção p2 | Proposta | Manter | produto em especificação |
| `/acessibilidade` | Produção p2 | Experiência | Manter | retrofit do próprio site, com evidência |
| `/digital-workplace-agentico` | Produção p2 | Estudo | Reclassificar | entra no YAML; segue neutra quanto a marca |
| `/operacao-capital-cognitivo` | Produção p2 | Experimento | Reclassificar | simulador; entra no YAML |
| `/devin` | Produção p1 | Estudo | Manter | já tem crosslink para o p3 (G2); mudar de pilar não resolve problema comprovado |
| `/devops-salesforce` | Produção p3 | Referência | Manter | guia |
| `/salesforce-agentic-dev` | Produção p3 | Referência | Manter | curso |
| `/salesforce-agentic-quickstart` | Produção p3 | Referência | Manter | tutorial |
| `/proposta-engenharia-reversa` | Produção p3 | Proposta | Manter | — |
| `/socialselling` | Produção p3 | Experimento | Reclassificar (sai de p5) | documentação de projeto; natureza decidida pelo autor (SDD-F1-F1b, Anexo B, Q1) |
| `/sustentacao` | Produção p4 | Referência | Manter | curso |
| `/service-operations-2-0` | Produção p4 | Proposta | Manter | visão executiva de modelo |
| `/proposta-observabilidade-mobile` | Produção p4 | Proposta | Manter | — |
| `/boutique-empresarial-showcase` | Produção p2 | Experiência | Reclassificar (sai de p5) | projeto real; `/en/` segue indeciso |
| `/privacidade`, `/termos`, `/cookies` | rodapé | — | Manter | — |
| não listadas (§2.1) | fora do grafo | — | Manter | continuam `noindex` ou fora do sitemap |

URLs novas: **nenhuma**.

---

## 8. Homepage

### 8.1 Mensagem e textos propostos

A proposta de texto abaixo usa só fatos de `cv.json` e títulos de páginas publicadas. É ponto de
partida para o autor reescrever, não texto final.

- **Mensagem principal.** Profissional com mais de 20 anos em sistemas corporativos em produção,
  que escreve e estuda como levar IA e sistemas para produção de forma confiável.
- **h1.** Maurício Yokoyama Issei.
- **Subtítulo (proposta).** "Tech Lead e analista de sistemas há mais de 20 anos, em Salesforce,
  AWS e integrações. Aqui publico o que estudo sobre engenharia de software confiável na era dos
  agentes de IA."
- **Alternativa FDE** (se D1 escolher o plano FDE): "Forward-Deployed Engineer | Enterprise
  Systems & Applied AI" no `<title>` e no JSON-LD, mantendo o subtítulo acima no hero
  (SDD-FDE D1).

### 8.2 Sequência das seções

1. **Hero.** h1, subtítulo, 3 botões: "Ver trajetória" (`/curriculo`), "Explorar a produção"
   (`/catalogo`), "Vídeos" (`/videos`). Redes sociais em linha.
2. **Sobre, em 3 frases.** Quem é, o que faz hoje, o que investiga. Link para a Trajetória.
3. **Pilares do trabalho.** Os pilares p1–p4, uma frase cada, com 1 a 2
   páginas de entrada por pilar (as do "Comece por aqui" do catálogo, ampliadas).
4. **Provas.** 3 a 5 itens da lista "Resultados quantificados" que `gen-portfolio.mjs` já gera, escolhidos pelo autor e não digitados de novo, com link para o
   projeto STAR na Trajetória. Abaixo, o **Mapa de Linhas resumido**: as 7 linhas com o período de
   cada uma, sem os projetos, com link "ver o mapa completo".
5. **Destaques.** 3 a 4 cartões escolhidos pelo autor, com formato e natureza visíveis. Pelo
   menos um de natureza "Experiência".
6. **Contato.** E-mail e redes.

Exclui: projetos STAR completos, formação, recomendações, lista completa de artigos.

**Regra de corte [R].** A home tem no máximo ~3 min de leitura medidos pelo mesmo cálculo da
camada editorial (200 ppm). Passou disso, o conteúdo vai para a Trajetória ou o catálogo.

### 8.3 Wireframe textual

```text
DESKTOP (≥ 1024 px)                          CELULAR (< 640 px)
┌──────────────────────────────────────┐     ┌────────────────────┐
│ Maurício Y. Issei   Trajetória ·     │     │ Maurício Y. Issei ☰│
│                     Produção · Vídeos│     ├────────────────────┤
├──────────────────────────────────────┤     │ h1                 │
│ h1 Maurício Yokoyama Issei           │     │ subtítulo          │
│ subtítulo (2 linhas)                 │     │ [Ver trajetória]   │
│ [Ver trajetória] [Explorar] [Vídeos] │     │ [Explorar produção]│
├──────────────────────────────────────┤     │ [Vídeos]           │
│ Sobre (3 frases)          → Trajetória│    ├────────────────────┤
├──────────────────────────────────────┤     │ Sobre (3 frases)   │
│ Pilares: p1│p2│p3│p4 (grade 2×2)    │     │ Pilares (lista)    │
│  frase + 1–2 links cada              │     │ Provas (lista)     │
├──────────────────────────────────────┤     │ Mapa resumido      │
│ Provas: 3–5 resultados (gerados)     │     │  (rolagem vertical)│
│ Mapa de Linhas resumido (7 faixas)   │     │ Destaques (1 col.) │
├──────────────────────────────────────┤     │ Contato            │
│ Destaques: 3–4 cartões               │     └────────────────────┘
├──────────────────────────────────────┤
│ Contato                              │
└──────────────────────────────────────┘
```

No celular, as três portas ficam na primeira tela; o mapa resumido vira lista vertical, sem
rolagem horizontal.

### 8.4 Mapa de Linhas: decisão recomendada

**[R] Reposicionar e simplificar.** O mapa completo (7 linhas × 24 anos, com projetos) vai para
a Trajetória, onde ele prova a experiência. A home recebe só a legenda das 7 linhas com os
períodos. Motivos: o mapa é a peça de identidade mais forte do site (ADR-pf-001), mas na home ele
ocupa o lugar de entrada e exige ler um gráfico antes de saber o que o site oferece (P7, [D]).
Substituir o mapa perderia patrimônio; manter como está mantém P1.

Consequência técnica: o escopo da exceção de paleta do ADR-pf-001 (`src/index.css`) passa a
valer também para `/curriculo`. Isso exige uma revisão do ADR (§11).

---

## 9. Navegação e descoberta

### 9.1 Menu global

**Decidido (D6 b):** um **cabeçalho comum**, igual em todas as páginas públicas, com quatro
entradas: **Início · Trajetória · Produção · Vídeos**.

- O cabeçalho é um componente compartilhado. Os dados (rótulos e URLs) vêm do YAML, como o
  catálogo (D3). Ele funciona sem JavaScript: o HTML do cabeçalho é injetado por gerador no build,
  não montado no navegador.
- Os cabeçalhos próprios de cada página saem, ou viram navegação secundária quando têm função
  interna (trilhas de jornada, marcadores de artigo, sumários).
- A página `apresentacao` mantém a sua paleta: o cabeçalho usa só tokens neutros, e a exceção
  `.ap-*` continua restrita aos seus arquivos.
- O `<eco-nav>` deixa de ser o caminho principal. A especificação decide entre retirá-lo ou
  mantê-lo só como "mapa dos pilares"; a recomendação é retirá-lo quando o cabeçalho cobrir todas
  as páginas, para não haver dois menus.
- Aplicação em lotes, cada lote com o sweep de acessibilidade (a dívida só desce).

### 9.2 Navegação secundária e breadcrumbs

- Breadcrumb só nas páginas autorais: Início › Produção › pilar › página. O JSON-LD já tem
  `BreadcrumbList` na home; replicar o padrão.
- A camada editorial continua sendo a navegação interna das páginas longas.

### 9.3 Catálogo

- Gerado do YAML (§11). Agrupa por pilar, como hoje.
- Cada cartão mostra: formato (lista `KINDS`), natureza, tempo de leitura medido.
- Mantém o "Comece por aqui", com uma porta por público (recrutador, liderança técnica, leitor).
- Ganha links para `/videos` e `/curriculo` (corrige DV-2).

### 9.4 Filtros

**[R] Fase posterior e sem JavaScript obrigatório.** Um filtro por natureza pode ser feito com
âncoras e listas agrupadas (HTML estático). Se depois houver filtro interativo, ele é melhoria
progressiva: a lista completa precisa funcionar sem JS (padrão dos testes `*.nojs.spec.js`).

### 9.5 Relações

- **Tema → artigos (D7 b).** Cada página autoral recebe um ou mais temas (`temas: [...]`) no YAML,
  com as chaves de `content/temas.yml`. `gen-videos.mjs` lê o YAML e mostra os artigos na página do
  tema; o catálogo pode agrupar ou filtrar por tema numa fase posterior. Os pilares continuam sendo
  o agrupamento principal do catálogo; o tema é atributo de descoberta, não segundo menu.
- **Pilar → vídeos.** O catálogo mostra, por pilar, o link para os temas correspondentes.
- **Experiência ↔ Trajetória.** Toda página de natureza "Experiência" liga ao projeto STAR, quando
  houver um.
- **Continuação.** "Se este tema interessa" (camada editorial) em todas as páginas autorais, não
  só nas 13 de hoje.

### 9.6 Percursos

| Perfil | Percurso | Cliques até o objetivo |
| :-- | :-- | :-- |
| Recrutador | Início → Provas (na própria home) → "Ver trajetória" → projeto STAR | 1–2 |
| Liderança técnica | Início → Temas: p2 → `case-agents` (Experiência) → continuação → `engenharia-agentes-ia` | 2–3 |
| Leitor vindo de busca | `/formulacao-de-problemas` → natureza "Estudo" no topo → continuação → cabeçalho → Início | 0 até a resposta; 1 até o autor |
| Agente de IA | `llms.txt` → página `.md` com natureza e pilar → `cv-for-ai.md` | sem mudança de rota |

---

## 10. Governança editorial

### 10.1 Atributos

| Atributo | Avaliação | Onde fica |
| :-- | :-- | :-- |
| Pilar | **manter** (p1–p4) | YAML (`pillar`) |
| Formato | **manter**, com a lista `KINDS` como única | YAML (`kind`), lido também pela camada editorial |
| Natureza | **criar** (5 valores) | YAML (`natureza`) |
| Tema | **estender** aos artigos: cada página autoral recebe 1 a 3 temas (D7 b) | YAML (`temas`), com as chaves de `content/temas.yml` |
| Tempo de leitura | **manter calculado**, nunca digitado | gerador |
| Data de atualização | **manter** (`meta.updated` e `dateModified` no JSON-LD) | página |
| Público | **não criar** atributo; o "Comece por aqui" resolve | catálogo |
| Profundidade | **manter** onde a camada editorial já usa | `editorial.data.mjs` |
| Estado de maturidade | **só para conteúdo gerado** (`ficha`, `rascunho`, `publicado` nos vídeos) | `content/videos/*.md` |

### 10.2 Natureza: critérios

| Natureza | Critério de entrada | Exemplo | Regra de texto |
| :-- | :-- | :-- | :-- |
| **Experiência** | foi feito pelo autor, em produção ou num projeto real, e tem fonte (`cv.json`, `star.json` ou evidência na página) | `case-agents`, `acessibilidade` | número só com base declarada; sem número ilustrativo |
| **Estudo** | análise, ensaio ou revisão; a tese é do autor e as fontes são citadas | `artifice`, `formulacao-de-problemas` | hipótese marcada como hipótese (BL-02) |
| **Proposta** | desenho de solução ou modelo que não foi implementado, ou foi só em parte | `proposta-engenharia-reversa`, `knowledge-os-presentation` | dizer o que já existe e o que não |
| **Experimento** | protótipo, simulador ou narrativa interativa | `operacao-capital-cognitivo`, `life3d` | não apresentar como resultado |
| **Referência** | guia, curso, tutorial ou visão geral para consulta | `devops-salesforce`, `sustentacao` | indicar a versão das ferramentas |

"Resultado demonstrado" não é uma sexta natureza: é o nível de evidência de uma Experiência
(campo `nivel_evidencia` do ADR-fde-001, quando os cases existirem). "Hipótese" não é natureza: é
um marcador dentro do texto.

### 10.3 Regras

1. Página nova entra no YAML com `pillar`, `kind` e `natureza` antes do merge. O gate falha se
   faltar algum (§11).
2. A natureza é decisão do autor. Agente propõe; o autor aprova no PR.
3. Uma página tem uma natureza. Se tiver duas partes com naturezas diferentes, vale a do conteúdo
   principal e a outra é declarada no texto.
4. Mudar pilar ou natureza é mudança de grafo: exige bump de `meta.version` (ECOSYSTEM.md).

---

## 11. Estratégia técnica

### 11.1 Mudanças, por classe

| Classe | Mudança | Arquivos |
| :-- | :-- | :-- |
| Apenas conteúdo | classificar natureza e temas de 33 páginas; textos da home; destaques | YAML, nova fonte da home |
| Arquitetura de informação | YAML v2.0.0: sai p5, entram 5 nós (DV-1), campos `kind` e `natureza`; 4 entradas fixas no menu | `specs/ecosystem.nav.yaml`, `ECOSYSTEM.md` |
| Design e componentes | cabeçalho comum em todas as páginas públicas; novo layout da home; mapa completo em `/curriculo`; natureza no cartão e no topo da página | `src/index.html`, `src/index.css`, `src/curriculo.html`, `public/aeo.css` |
| Geração automatizada | `gen-portfolio.mjs` passa a gerar a home editorial (blocos de provas) e o currículo com o mapa; novo passo que gera, do YAML, o catálogo e o cabeçalho comum (e `eco-nav.js` enquanto ele existir); `gen-videos.mjs` lê os temas de cada artigo no YAML | `scripts/` |
| Infraestrutura | nenhuma. Sem URL nova, sem redirecionamento. | — |

### 11.2 Invariantes

1. Nenhuma URL pública muda ou some. `sitemap.xml` continua com as mesmas 40 URLs PT-BR.
2. Nenhum bloco gerado é editado à mão (`PF:*`, `CV:*`, `AEO:*`, `EDITORIAL:*`, `src/en/**`,
   `public/en/**`, páginas de vídeo e tema).
3. A home mantém o JSON-LD `Person` com os mesmos fatos, os links para `cv.json`,
   `cv-for-ai.md` e `llms.txt`, e o `<title>` até a decisão D1.
4. Toda edição de ativo PT-BR público passa por `npm run i18n:sync && npm run i18n:check` na
   máquina do autor antes do merge (o Argos não roda na nuvem).
5. A dívida de acessibilidade só desce (`tests/a11y/baseline.json`). Menu e catálogo funcionam
   sem JavaScript.
6. Nenhum hexadecimal novo fora dos arquivos de token permitidos (`index.css`, `apresentacao.css`).
7. Gêmeos `.md` continuam em dia (`check-md-twins.mjs`); `llms.txt` ganha natureza e pilar.
8. A página `digital-workplace-agentico` continua sem citar marca de empresa.

### 11.3 Testes afetados

`index.spec.js`, `index.nojs.spec.js`, `curriculo.spec.js`, `portfolio.tokens.test.mjs`,
`eco-nav.spec.js`, `hreflang.spec.js`, `editorial-layer.test.mjs`, `videos.gen.test.mjs`,
`aeo.spec.js`. Testes novos: catálogo gerado em dia com o YAML; todo nó com `natureza` e `kind`
da lista e temas válidos; toda página pública tem o cabeçalho comum; home abaixo de ~3 min.

### 11.4 Documentos a atualizar antes do código (SDD)

`ADR-pf-001` (escopo da paleta), `docs/specs/pages/portfolio/` (nova versão do SDD da home),
`ECOSYSTEM.md` (v2.0.0 do grafo e fim da cópia manual), `EDITORIAL-LAYER.md` (natureza),
`docs/specs/pages/videos-youtube/` (temas dos artigos), `A11Y-DECISIONS.md` (padrão do cabeçalho comum).

---

## 12. Plano de execução

Cada fase é um PR. Merge em `main` publica em produção. Prazos não estimados: não há dado de
capacidade.

| Fase | Objetivo | Escopo | Depende de | Prioridade | Risco | Aceite | Testes |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| F0 | Decidir | D1–D7; especificação de implementação a partir deste documento | — | essencial | decisões em aberto travam F2–F3 | decisões registradas no PR | — |
| F1 | Uma fonte para catálogo e cabeçalho | YAML v2.0.0 (5 nós, `kind`, `natureza`, `temas`); gerador do catálogo e dos dados do cabeçalho | D3, D4, D5, D7 | essencial | regressão visual do catálogo | catálogo gerado igual ao atual mais as correções DV-1 e DV-2; gate verde | catálogo em dia; nó completo |
| F1b | Cabeçalho comum | componente gerado e injetado no build; aplicado em lotes (entradas → páginas com camada editorial → demais); `apresentacao` e páginas com navegação própria por último | F1, D6 | essencial | quebrar layouts e navegação interna; subir a dívida de a11y | todas as páginas públicas com o cabeçalho; nenhum cabeçalho antigo sobrando; baseline a11y não sobe | sweep a11y por lote, teste de cabeçalho, `*.nojs.spec.js` |
| F2 | Trajetória completa | Mapa de Linhas e resultados em `/curriculo`; revisão do ADR-pf-001 | F0 | essencial | perda de informação no currículo | nada do conteúdo atual da home fica sem lugar | `curriculo.spec`, tokens |
| F3 | Home editorial | nova home com provas geradas e mapa resumido | F1, F2, D1, D2 | essencial | SEO da home; texto sem fonte | 5 perguntas respondidas; ≤ ~3 min; JSON-LD igual; auditoria de afirmações | `index.spec`, `nojs`, a11y, hreflang |
| F4 | Natureza visível | natureza no cartão e no topo de cada página; `llms.txt` | F1 | essencial | ruído visual | rótulo sem heading, mesmo padrão `.ed-*` | `editorial-layer`, a11y |
| F5 | Relações (D7) | página de tema mostra os artigos marcados com o tema; continuação em todas as páginas autorais; link STAR nas Experiências | F1 | melhoria | trabalho de autor | todo tema com ≥ 1 artigo | `videos.gen` |
| F6 | Validação | teste com 3–5 visitantes; leitura do GA4 | F3 | melhoria | — | percursos da §9.6 cumpridos | manual |
| F7 | Futuro | filtro por natureza; `/en/` dos vídeos (fase 2 dos vídeos); consolidação do G1 (BL-01) | F4, F6 | melhoria | — | — | — |

F1 e F2 são independentes e podem ir em paralelo. F3 não começa antes de F1 e F2.

---

## 13. Riscos e decisões pendentes

### 13.1 Arquitetura recomendada

Três papéis com URLs que já existem: **Início** editorial (`/`), **Trajetória** (`/curriculo`) e
**Produção** (`/catalogo`), com os pilares p1–p4 como agrupamento, a natureza como atributo, o
um cabeçalho comum em todas as páginas e uma fonte única (o YAML) para catálogo, cabeçalho e temas dos artigos.

### 13.2 Registro de decisões

Sete decisões, no mesmo formato. D1 a D5 são as cinco mais importantes; D6 e D7 completam a
arquitetura, mas não mudam a direção. Ordem sugerida: D1 e D2 primeiro (travam a home), D3 a D6
juntas (formam o PR da F1), D7 depois.

#### D1 — Qual posicionamento orienta o site?

- **Hoje [F].** Há dois posicionamentos registrados. O plano FDE (`docs/specs/fde/`, aprovado em
  14/10/2026) propõe a headline "Forward-Deployed Engineer" e parou na Fase 0, que depende de
  respostas suas; `public/cases.json` não existe. O metaprompt de 10/11/2026 define
  "identidade profissional + produção intelectual".
- **Opções.** (a) O metaprompt orienta a arquitetura; "FDE" pode aparecer só no `<title>` e no
  JSON-LD; o modelo de evidência do FDE (`cases.json`, `nivel_evidencia`) é reaproveitado na
  Trajetória. (b) O plano FDE orienta tudo, com a headline FDE no hero. (c) O plano FDE é
  arquivado.
- **Recomendação: (a).** É a decisão mais recente, e o metaprompt pede justamente que a produção
  intelectual apareça, o que o FDE não trata. A parte útil do FDE (regras contra afirmar sem
  evidência, cases com nível de evidência) não se perde.
- **Bloqueia.** F3 (headline e subtítulo da home).

- **Decidido (10/11/2026): (a)**, conforme a recomendação.

#### D2 — A home deixa de ser o currículo?

- **Hoje [F].** O corpo da home é o currículo gerado de `cv.json` (~25 min de leitura, 19 projetos
  STAR) e repete 77% do texto de `/curriculo`. Não há link da home para nenhum artigo.
- **Opções.** (a) Home editorial de até ~3 min; o Mapa de Linhas completo e os projetos STAR vão
  para `/curriculo`; a home fica com o Mapa resumido (7 linhas e períodos) e 3 a 5 provas.
  (b) Home editorial, mas com o Mapa de Linhas completo ainda na home. (c) Home continua como está
  (alternativa A da §5).
- **Recomendação: (a).** Resolve P1 e P2 sem perder nada: todo conteúdo atual da home ganha lugar
  em `/curriculo`. A opção (b) mantém o gráfico mais denso do site na entrada (P7).
- **Consequência.** O ADR-pf-001 passa a valer também para `/curriculo` (hoje o escopo é só
  `src/index.html` e `src/index.css`); os testes da home mudam.
- **Bloqueia.** F2 e F3.

- **Decidido (10/11/2026): (a)**, conforme a recomendação.

#### D3 — O catálogo passa a ser gerado de uma fonte única?

- **Hoje [F].** O catálogo é escrito à mão; o menu flutuante é uma cópia manual do YAML. As três
  fontes já divergem em seis pontos (DV-1 a DV-6), e toda página nova precisa ser registrada em
  dois ou três lugares.
- **Opções.** (a) O `ecosystem.nav.yaml` gera o catálogo e os dados de `eco-nav.js`. (b) O catálogo
  continua à mão, e um teste falha quando ele diverge do YAML. (c) Nada muda.
- **Recomendação: (a).** É o padrão que o site já usa em `gen-portfolio`, `gen-editorial` e
  `gen-videos`. A opção (b) é um passo intermediário aceitável se você quiser manter o texto dos
  cartões à mão.
- **Bloqueia.** F1.

- **Decidido (10/11/2026): (a)**, conforme a recomendação.

#### D4 — O pilar p5 "Soluções & Portfólio" deixa de existir?

- **Hoje [F].** O p5 reúne o perfil (`index`), três narrativas pessoais, um projeto
  (`boutique-empresarial-showcase`), uma documentação de projeto (`socialselling`) e o índice de
  vídeos. Os cinco pilares são um invariante do YAML (INV-2) que você aprovou no HITL do
  ecossistema.
- **Opções.** (a) O p5 sai (YAML v2.0.0): `index` vira entrada, as narrativas são ligadas pela
  Trajetória, `videos` vira índice próprio, `socialselling` vai para o p3 e `boutique` para o p2.
  (b) O p5 fica, renomeado para "Projetos e trajetória". (c) O p5 fica como está.
- **Recomendação: (a).** Os pilares p1 a p4 agrupam por assunto; o p5 agrupa por "o resto", e é
  nele que experiência, narrativa e índice se misturam (P5). Com a natureza (D5), "projeto" deixa
  de precisar de pilar.
- **Bloqueia.** F1.

- **Decidido (10/11/2026): (a)**, conforme a recomendação.

#### D5 — Cada conteúdo ganha o atributo "natureza"?

- **Hoje [F].** O site tem "formato" (lista `KINDS`, aplicada em 13 páginas) e rótulos de formato
  no catálogo, mas nada diz ao visitante se algo foi feito em produção, é estudo, proposta ou
  experimento.
- **Opções.** (a) Natureza com 5 valores (Experiência, Estudo, Proposta, Experimento, Referência),
  visível no cartão do catálogo e no topo de cada página, com a classificação da §7 como ponto de
  partida. (b) Natureza só nos cartões do catálogo. (c) Só o formato, sem natureza.
- **Recomendação: (a).** Formato diz como o texto é ("Artigo", "Case técnico"); natureza diz quanto
  ele afirma. É isso que separa experiência comprovada de proposta (P5). A classificação é sua:
  confirme ou troque página a página no PR da F1.
- **Bloqueia.** F1 (campo no YAML) e F4 (exibição).

- **Decidido (10/11/2026): (a)**, conforme a recomendação.

#### D6 — Qual é o menu global?

- **Hoje [F].** Não existe cabeçalho comum. Cada página tem o seu, com rótulos diferentes, e o
  `<eco-nav>` (botão flutuante) está em 24 arquivos, mas falta em 5 páginas do próprio grafo.
- **Opções.** (a) O `<eco-nav>` vira o menu global: entra em todas as páginas públicas e ganha
  quatro entradas fixas (Início · Trajetória · Produção · Vídeos); os cabeçalhos existentes usam os
  mesmos rótulos. (b) Um cabeçalho novo, igual em todas as páginas. (c) Nada muda.
- **Recomendação: (a).** O componente já existe e já é testado (`eco-nav.spec.js`). A opção (b)
  mexe no layout de 33 páginas diferentes, inclusive da `apresentacao`, que tem paleta própria.
  Ponto fraco de (a): um botão flutuante é menos visível que um cabeçalho. O teste com visitantes
  (F6) confere isso.
- **Bloqueia.** F1.

- **Decidido (10/11/2026): (b)**, cabeçalho comum novo, diferente da recomendação. Efeito: §9.1,
  §11 e a fase F1b. O risco R6 trata do custo.

#### D7 — Os temas passam a ligar artigos, além de vídeos?

- **Hoje [F].** Os 10 temas de `content/temas.yml` classificam só vídeos. As páginas
  `/temas/<tema>` não mostram nenhum artigo.
- **Opções.** (a) Cada tema lista as páginas autorais relacionadas, e `gen-videos.mjs` as mostra
  na página do tema. (b) Cada página autoral recebe um ou mais temas no YAML. (c) Os temas ficam só
  para vídeos.
- **Recomendação: (a).** Liga vídeos e artigos sem criar um segundo agrupamento de navegação ao
  lado dos pilares. Custa uma lista curta por tema.
- **Bloqueia.** F5. Não é urgente.

- **Decidido (10/11/2026): (b)**, temas no YAML de cada artigo, diferente da recomendação.
  Efeito: §9.5, §10.1 e a fase F1 (campo `temas`). A classificação por tema soma-se à de natureza.

### 13.3 Riscos que precisam de atenção (cinco principais e um novo, R6, vindo da D6)

| # | Risco | Mitigação |
| :-- | :-- | :-- |
| R1 | **Merge publica em produção e o `/en/` só sincroniza na máquina do autor.** Um PR mergeado sem Argos deixa o inglês velho ou o gate vermelho. | Toda fase que toca PT-BR público fecha com `i18n:sync` local antes do merge; não habilitar merge automático nesses PRs. |
| R2 | **A home perde sinais de busca e de agentes** (`<title>`, JSON-LD `Person`, densidade de termos como Salesforce, AWS, APIs). | Invariante 3 da §11.2; comparar Search Console 4 semanas antes e depois da F3. |
| R3 | **Texto novo da home afirma mais do que a evidência** (ex.: "arquiteto", "FDE", resultados sem fonte). | Provas geradas de `cv.json`; revisão com o agente `fde-evidence-auditor` antes do merge da F3. |
| R4 | **Acoplamentos escondidos**: ADR-pf-001, testes da home, `gen-portfolio`, `build-aeo.mjs` (que remove o script de consentimento ao regenerar páginas). | Atualizar os documentos da §11.4 antes do código; rodar `build-aeo.mjs` só nos slugs afetados e conferir o script de consentimento. |
| R6 | **Cabeçalho comum em 33 layouts diferentes (D6 b).** Páginas com navegação própria (jornadas, marcadores de artigo, `apresentacao`) podem quebrar ou ficar com dois menus. | Lotes da F1b, do mais simples ao mais complexo; sweep de acessibilidade por lote; decidir na especificação o que acontece com o `<eco-nav>`. |
| R5 | **Prioridade de públicos sem dado.** A ordem da §4.1 é hipótese, e classificar natureza e temas de 33 páginas consome tempo do autor. | Fechar a lacuna do GA4 antes da F3; a classificação da F1 já vem proposta, o autor só confirma ou troca. |

### 13.4 Próximas ações para virar especificação de implementação

1. ~~O autor responde D1 a D7.~~ Feito em 10/11/2026.
2. Especificações por fase. Feitas em 10/11/2026: [`SDD-F1-F1b.md`](SDD-F1-F1b.md)
   (Parte 1, F1, com a classificação das páginas; Parte 2, F1b). F2 a F5 vêm depois. As questões
   de confirmação Q1 a Q9 foram respondidas em 10/11/2026 (Anexo B do SDD): cabeçalho fixo, botão
   hambúrguer no celular, `<eco-nav>` sai no L5, rótulos em inglês "Home · Career · Work · Videos"
   e `lifeos` fora por ora.
3. Atualizar `ECOSYSTEM.md` e o ADR-pf-001 (§11.4) no mesmo PR da especificação.
4. Exportar do GA4 e do Search Console as páginas de entrada dos últimos 90 dias (lacuna §3.3).
5. Começar pela F1, que corrige divergências reais sem mudar a experiência da home.
