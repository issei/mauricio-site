# EDITORIAL-AUDIT — diagnóstico da camada editorial

> Fase 1 do metaprompt "Camada editorial concisa e navegação didática".
> Data: 2026-10-08. Escopo: as páginas públicas de conteúdo em `src/*.html` (o espelho
> `/en/` é gerado e herda tudo daqui). Utilitárias (`404`, `admin*`, `diagnostic`,
> `test-github`, `vsl`, `life`, `life3d`, `mapmind`, `exemplopdi`) e legais
> (`cookies`, `privacidade`, `termos`) ficaram de fora: não são leitura editorial.
>
> Regra que guiou cada linha: **não reduzir conteúdo bom; reduzir o quanto o leitor
> precisa atravessar para encontrar valor.** Uma página que já orienta bem recebe **D**,
> mesmo que não se pareça com as outras.

---

## 1. O que já existe (e foi reaproveitado)

Antes de propor qualquer componente, o repositório foi lido atrás de mecanismos de
orientação. Havia quatro, e a camada editorial é a formalização deles, não um quinto:

| Mecanismo | Onde | O que faz | Limite encontrado |
| :--- | :--- | :--- | :--- |
| Bloco **"Em síntese" + FAQ** (`scripts/seo/build-aeo.mjs`, `public/aeo.css`, SSOT `scripts/seo/pages.mjs`) | 24 páginas | resumo de 100–200 palavras escrito à mão por página | em **21 delas fica no fim da página** (posição ≥ 79% do `<main>`): resume para quem já leu, não orienta quem chega |
| **Portas de entrada por intenção** ("Por onde você entra?", "Quero entender / implementar / auditar", "Como ler esta página") | `formulacao-de-problemas`, `engenharia-confianca`, `capacidade-antes-do-acesso`, `agent-ready`, `digital-workplace-agentico` | dão ao leitor a escolha de profundidade logo no hero | padrão nasceu página a página, com marcação e CSS próprios em cada uma |
| **Trilha de seções** no cabeçalho fixo (`*-nav__trail`) ou sidebar | ~15 páginas | lista linear de âncoras | não diz quais seções são essenciais e quais são aprofundamento; a sidebar do `socialselling` some abaixo de 1024 px |
| **Tempo de leitura calculado** (`scripts/gen-hub-data.mjs`, 200 ppm sobre o texto visível) | Hub da `apresentacao` | tempo honesto, nunca digitado | não aparece nas próprias páginas; três páginas mostram "~N min" digitado à mão |

Também já existe um caso que é, na prática, a camada editorial completa:
`operacao-capital-cognitivo` ("A ideia central", "O que você sai sabendo", "Para quem é").
E `curiosidade-e-investigacao` é o modelo de referência para ensaio: dek, tempo, índice,
síntese no topo.

---

## 2. Inventário

Tempo = prosa visível de `<main>` a 200 ppm (código em `<pre>` não entra), medido pelo
mesmo algoritmo do gerador. "Síntese" = posição do bloco "Em síntese" no documento.

| Página | Tipo | Tese (como a página a enuncia) | Público | Profundidade | Problema de navegação |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `acessibilidade` | Case verificável | Mostra o processo, o que foi medido e o que **não** foi; não afirma que o site é acessível | engenharia, gestão | 21 min · aprofundada | síntese no fim; sem tempo |
| `agent-ready` | Tutorial + referência | Agent Readiness é tratar o agente como consumidor de primeira classe, não uma lista de arquivos em `/.well-known/` | devs web, arquitetos | 36 min · referência | nenhum relevante (portas + "Continuar") |
| `aprendizagem-autorregulada` | Síntese de revisão | o que a ciência comprova sobre recuperação e autoexplicação + protocolo de 45–60 min | estudantes, educadores | 5 min · rápida | nenhum |
| `aprendizagem-autorregulada-artigo` | Revisão científica | escopo e limites declarados; 103 referências | pesquisa | 49 min · referência | **fora do catálogo** |
| `apresentacao` | Apresentação executiva | complexidade de IA estruturada em decisões auditáveis | executivos | 7 min · rápida | nenhum (disclosure nativo, exceção de design ADR-ap-001) |
| `artifice` | Ensaio + autodiagnóstico | invisibilidade da maestria é descompasso estrutural, não falha pessoal | especialistas seniores, gestão | 13 min · aprofundada | **h1 é pergunta retórica; tese só no 4º parágrafo do hero; síntese no fim** |
| `boutique-empresarial-showcase` | Case de projeto | arquitetura, SDD e pipeline agêntico de um projeto real | devs, clientes | 4 min · rápida | nenhum relevante (curta) |
| `capacidade-antes-do-acesso` | Estudo / ensaio de política | o que decide é a mediação adulta, não o acesso da criança | educação, política pública | 22 min · aprofundada | nenhum (síntese no topo + portas) |
| `case-agents` | Case técnico | escolher a tool certa é capacidade; saber quando não executar é confiança | engenheiros de IA, arquitetos | 31 min · aprofundada | **15 seções numa trilha linear de 13 links; narrativa e evidência (≈700 linhas de Python) intercaladas; frase-tese em linguagem simples só na síntese, após 6 255 palavras** |
| `catalogo` | Mapa | jornada em 5 pilares | todos | 5 min | ver §6 |
| `curiosidade-e-investigacao` | Ensaio | curiosidade só vira conhecimento passando por pergunta, investigação e teste de explicação | leitores gerais, aprendizes | 20 min · aprofundada | nenhum (**modelo de referência**) |
| `curriculo` | Referência pessoal | — (documento factual) | recrutadores | 27 min · referência | nenhum (gerado de `cv.json`) |
| `develop-engineering` | Artigo técnico | um agente pode passar em todos os testes e entregar a mudança errada | tech leads, arquitetos | 19 min · aprofundada | síntese após o `<main>`; sem tempo; trilha não separa essencial de aprofundamento |
| `devin` | Ensaio editorial / apresentação | do executor de código ao orquestrador cognitivo | devs, líderes | 34 min · aprofundada | **20 `h2`, vários retóricos ("Quem você era antes desta conversa?", "Mauricio Yokoyama Issei"): escaneando só os títulos não se reconstrói o argumento** |
| `devops-salesforce` | Manual / guia prático | IA no org compartilhado só é segura em 4 camadas, na ordem | devs Salesforce | 16 min · guia prático | baixo (já tem sumário); falta profundidade/tempo |
| `digital-workplace-agentico` | Estudo técnico longo | o agente só é tão bom quanto as fundações que atravessa | arquitetura corporativa | 76 min · referência | nenhum ("Como ler esta página" + trilhas por perfil) |
| `engenharia-agentes-ia` | Material interativo | sistema de IA bem-sucedido tem pouca IA no caminho crítico (o próprio h1) | PMs, engenheiros | 28 min · aprofundada | síntese no fim; 22 `details`; sem mapa de rotas |
| `engenharia-confianca` | Framework / hub | a capacidade vem do modelo; a confiança vem da engenharia | engenharia, gestão | 39 min · aprofundada | baixo (portas + breadcrumb); **fora de `pages.mjs` (sem síntese AEO)** |
| `formulacao-de-problemas` | Artigo | formular é engenharia da redução de incerteza, e precisa parar | decisores, arquitetos | 25 min · aprofundada | baixo; o **veredito do próprio autor ("sustentação parcial")** só aparece no 2º bloco e no fim |
| `index` | Portfólio | — (home) | recrutadores | 27 min | nenhum (gerado de `cv.json`) |
| `know` | Ensaio curto | copiar a forma de quem tem sucesso não replica a função | gestão | 6 min · rápida | sem continuação |
| `knowledge-os-presentation` | Apresentação de plataforma | conhecimento corporativo como ativo executável, com limites e rastreabilidade | board, arquitetura | 20 min · aprofundada | **14 seções sem índice nem portas; h1 é lista de benefícios; síntese no fim** |
| `operacao-capital-cognitivo` | Simulador | a IA mais cara não é a que cobra mais por uso | executivos | 4 min + jogo | nenhum (**camada editorial nativa**) |
| `proposta` | Proposta técnica curta | — | clientes | 2 min | nenhum |
| `proposta-engenharia-reversa` | Proposta técnica | baseline As-Is por evidências, não documentação viva ad aeternum | clientes Salesforce | 5 min | nenhum |
| `proposta-observabilidade-mobile` | Proposta técnica | correlação device-rede-identidade-app | clientes | 4 min | nenhum |
| `salesforce-agentic-dev` | Guia / treinamento | disciplina de engenharia aplicada ao Salesforce com Devin e Flosum | devs Salesforce | 19 min · guia prático | 17 seções; tem trilha, falta separar essencial de consulta |
| `salesforce-agentic-quickstart` | Tutorial sequencial | — (imperativo por desenho) | devs Salesforce | 7 min · guia prático | nenhum (escopo + pré-requisitos no topo) |
| `service-operations-2-0` | Apresentação executiva | proteger o "momento zero" da venda | executivos | 9 min | nenhum |
| `socialselling` | Documentação de projeto | ranking explicável que responde "quem abordar primeiro?" | produto **e** engenharia | 17 min · referência | **duas audiências sem rota; a divisão "Conteúdo / Referência técnica" existe só na sidebar ≥ 1024 px; no celular, quem lê só descobre que §11–14 são referência após 2 206 palavras; sem continuação** |
| `sustentacao` | Landing de curso | — | profissionais de operação | 3 min | nenhum |
| `terminal-evolutivo` | Narrativa pessoal | — (scrollytelling) | visitantes | 5 min | nenhum — **não transformar narrativa em documentação** |

**Teses não inventadas.** As teses acima são citações ou condensações do hero ou da
síntese de cada página. Onde a página não enuncia tese (portfólio, propostas curtas,
tutorial imperativo, narrativa), a célula diz "—" em vez de atribuir uma.

---

## 3. Classificação

| Classe | Páginas | Nº |
| :--- | :--- | ---: |
| **D — nenhuma alteração** | `agent-ready`, `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo`, `apresentacao`, `boutique-empresarial-showcase`, `capacidade-antes-do-acesso`, `curiosidade-e-investigacao`, `curriculo`, `digital-workplace-agentico`, `engenharia-confianca`, `index`, `operacao-capital-cognitivo`, `proposta`, `proposta-engenharia-reversa`, `proposta-observabilidade-mobile`, `salesforce-agentic-quickstart`, `service-operations-2-0`, `sustentacao`, `terminal-evolutivo` | 19 |
| **A — apenas camada editorial** | `acessibilidade`, `artifice`, `develop-engineering`, `devops-salesforce`, `engenharia-agentes-ia`, `formulacao-de-problemas`, `know` (só continuação), `knowledge-os-presentation`, `salesforce-agentic-dev`, `socialselling` | 10 |
| **B — camada + reorganização leve** | `case-agents` (separar rota essencial de evidência; candidato a recolher o código das técnicas estatísticas), `devin` (camada + rótulos de seção que reconstruam o argumento, sem reescrever títulos sem o autor) | 2 |
| **C — reestruturação moderada** | nenhuma | 0 |
| Mapa (tratado à parte, §6) | `catalogo` | 1 |

Por que 19 em D: o site já tem, em metade das páginas longas, uma forma própria de
orientação. Uniformizá-las trocaria um mecanismo que funciona por outro só para parecer igual.
`agent-ready` é o exemplo mais claro: tese no hero, três portas por intenção e "Continuar" no
fim. Falta só a profundidade, e isso não justifica mexer.

---

## 4. Avaliação da experiência (páginas relevantes)

### Entrada
- **Bom:** h1 que já é a tese (`engenharia-agentes-ia`, `case-agents`, `develop-engineering`).
- **Falha:** h1 retórico ou promocional esconde a tese — `artifice` ("Sua maestria técnica
  virou sua prisão silenciosa?"), `knowledge-os-presentation` (lista de benefícios). O tipo de
  conteúdo raramente é dito: o visitante não sabe se está num ensaio, num case ou numa proposta.

### Orientação
- Síntese no topo existe em 3 páginas; nas outras 21 com síntese, ela está no fim.
- Tempo de leitura aparece em 3 páginas, digitado à mão.
- Decidir "devo continuar?" exige rolar até o fim (onde está a síntese) ou ler o hero inteiro.

### Progressão
- Títulos de seção em geral escaneáveis; exceção relevante: `devin` (títulos retóricos).
- Trilhas de seção são lineares: não distinguem o que é essencial do que é aprofundamento.

### Aprofundamento
- `case-agents` intercala narrativa (problema → falha → solução) com evidência densa (Python
  das 5 técnicas, ADR-009, suíte de 72 testes). Nada disso deve sair; o leitor só precisa
  saber que pode pular e voltar.
- `socialselling` já separa "Referência técnica" (§11–14), mas só na sidebar de desktop.

### Saída
- Continuação existe em `agent-ready`, `case-agents` (Referências Conceituais), `digital-workplace`
  e outras. Ausente em `artifice`, `socialselling`, `know`.

---

## 5. Métrica editorial das páginas piloto (§18 do metaprompt)

| | `artifice` | `case-agents` | `socialselling` |
| :--- | :--- | :--- | :--- |
| Tempo até a tese (antes → depois) | 189 → 93 palavras desde o h1 | frase em linguagem simples: 6 255 → 160 palavras | rotas por audiência: 2 206 → 92 palavras (celular) |
| Decisões exigidas do leitor antes de escolher o caminho | ler o hero inteiro (≈190 palavras) | percorrer a trilha de 13 links sem hierarquia | adivinhar quais das 14 seções servem a ele |
| Seções essenciais | 2 (hero, paradoxos) | 3 (problema, crash, barreira) | 3 (§1–3) |
| Seções de aprofundamento / consulta | 3 | 9 | 11 |
| Conteúdo potencialmente redundante | nenhum identificado | nenhum identificado | nenhum identificado |

O tempo até a tese é medido em palavras de prosa entre o `<h1>` e a primeira ocorrência da
frase que a enuncia, com o mesmo contador do gerador.

---

## 6. Catálogo como mapa

O catálogo organiza por **pilar** (Fundação → Método → Aplicação → Valor → Resultados),
o que responde "como as coisas se ligam", mas não "por onde começo?".

Achados:
- A etiqueta de formato (`category-tag`, ex.: "Artigo · Decisão") está em 15 dos 27 cards e
  ausente nos outros (`artifice`, `devin`, `know`…). Taxonomia inconsistente.
- `aprendizagem-autorregulada-artigo` e `curriculo` são públicos e estão fora do catálogo
  (`scripts/audit-site.mjs` já avisa).
- Não há indicação de profundidade/tempo nos cards; o Hub da `apresentacao` já calcula isso.

Recomendação (Fase 5, não aplicada no piloto): gerar a etiqueta do card a partir de
`scripts/editorial/editorial.data.mjs` (formato · profundidade · tempo calculado), em vez de
digitá-la, e acrescentar uma linha "Comece por aqui" com 3 portas por objetivo (entender o
método, aplicar no Salesforce, avaliar o profissional). Sem filtros: 27 cards não pedem filtro,
pedem rótulos consistentes.

---

## 7. Prioridades

1. **Piloto (feito nesta entrega):** `artifice` (conceitual), `case-agents` (técnico),
   `socialselling` (longo/documental).
2. **Alta, após validação:** `knowledge-os-presentation`, `devin`.
3. **Média:** `develop-engineering`, `engenharia-agentes-ia`, `formulacao-de-problemas`
   (expor o veredito "sustentação parcial"), `salesforce-agentic-dev`.
4. **Baixa:** `acessibilidade`, `devops-salesforce`, `know` (só continuação).
5. **Catálogo:** etiqueta gerada + "Comece por aqui".
6. **Fora do escopo editorial, registrado:** `engenharia-confianca` e
   `operacao-capital-cognitivo` fora de `pages.mjs` (sem síntese AEO); títulos acima de 60
   caracteres em `case-agents` e `curiosidade-e-investigacao`.

---

## 8. Matriz

| Página | Tipo | Problema | Intervenção | Prioridade |
| :--- | :--- | :--- | :--- | :--- |
| `artifice` | Ensaio | tese escondida atrás de pergunta retórica; síntese no fim; sem continuação | **A — feita no piloto** | piloto |
| `case-agents` | Case técnico | trilha linear; narrativa e evidência intercaladas | **A feita no piloto**; parte B (recolher código) aguarda validação | piloto |
| `socialselling` | Documentação | duas audiências sem rota; mapa só no desktop; sem continuação | **A — feita no piloto** | piloto |
| `knowledge-os-presentation` | Apresentação | 14 seções sem mapa; h1 promocional | A | alta |
| `devin` | Ensaio editorial | 20 títulos, vários retóricos | B | alta |
| `develop-engineering` | Artigo técnico | sem tempo; síntese no fim | A | média |
| `engenharia-agentes-ia` | Interativo | síntese no fim; sem rotas | A | média |
| `formulacao-de-problemas` | Artigo | veredito do autor tardio | A (só "A tese" + profundidade) | média |
| `salesforce-agentic-dev` | Guia | essencial × consulta misturados | A | média |
| `acessibilidade` | Case | síntese no fim | A | baixa |
| `devops-salesforce` | Manual | falta profundidade | A | baixa |
| `know` | Ensaio curto | sem continuação | A (só continuação) | baixa |
| `catalogo` | Mapa | taxonomia inconsistente; 2 páginas fora | etiqueta gerada + portas | média |
| 19 páginas em D | vários | — | nenhuma | — |
