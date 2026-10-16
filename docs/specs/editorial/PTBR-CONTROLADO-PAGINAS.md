# PT-BR Controlado — revisão das demais páginas de `src/`

> Data: 2026-10-15. Pedido: aplicar a skill `ptbr-controlado` às páginas de `src/` além da proposta (PR #118).
> Método igual ao do [piloto](PTBR-CONTROLADO-PILOTO.md) e da [proposta](PTBR-CONTROLADO-PROPOSTA.md): intervenção mínima.

## Escopo

- **Revisadas (35):** todas as páginas públicas de `src/`, exceto as listadas abaixo.
- **Só diagnóstico (4):** `artifice`, `life`, `life3d` e `terminal-evolutivo`. São narrativas pessoais, e o piloto recomendou não reescrevê-las. Só recebem correção de grafia objetiva no texto visível.
- **Fora:** `proposta` (PR #118), `devops-salesforce` (piloto) e as ferramentas internas `admin`, `admin-editor`, `diagnostic` e `test-github`.

## Critério

- Corrigido: severidade Média ou acima, com confiança Alta ou Média. Erros objetivos de grafia, regência e concordância contam como Média.
- Virou pergunta ao autor: confiança Baixa, afirmações absolutas ou sem fonte, números suspeitos e contradições de conteúdo.
- Ficou como sugestão: severidade Baixa.
- Fora do alcance da edição: `<head>` (título, meta, JSON-LD), `<script>`, atributos e os blocos gerados (`AEO`, `EDITORIAL`, `PF`, `CV`). Os achados nesses lugares indicam o arquivo-fonte.
- Antes de cada alteração, o trecho foi procurado em `tests/` e `scripts/`. Textos presos a teste ficaram como estão e foram registrados.

## Pontos que dependem do autor

- **`cookies.html`** publica a nota interna "Auditoria pendente… recomenda-se varredura via DevTools".
- **`termos.html`** publica CPF/CNPJ e endereço como "[PLACEHOLDER]".
- **`privacidade.html`** tem prazos conflitantes ("15 dias" × "15 dias úteis"). Também tem "em prazo razoável" ao lado de uma resolução que fixa prazo, e "Não compartilhamos" contra a lista de operadores da seção 6.
- **Textos presos a testes:** "Engenharia Agentic" (`develop-engineering`), "terceiro consumidor" (`agent-ready`) e "sub-tarefas" no quiz (`engenharia-agentes-ia`). Mudar exige alterar o teste ou a fixture junto.
- **Blocos gerados:** "falsos-positivos" em `scripts/seo/pages.mjs` (`proposta-engenharia-reversa`). `*/*;q=0.8` virou `<em>/</em>` no AEO-BODY de `agent-ready`. O rótulo "Aplicar" aparece duplicado no bloco EDITORIAL de `devin`.
- **`.md` espelho:** `public/aprendizagem-autorregulada*.md` repetem erros corrigidos nos HTML.
- **Nomes de empresa:** a regra que proíbe citar Itaú e IU Conecta vale só para `digital-workplace-agentico`, que está limpa. As menções a "Rede" e "BUPJ" em `devin` e `exemplopdi` ficaram como estão.

## Limitações

- A revisão foi feita por um modelo de linguagem e não substitui a leitura do autor. O `verificar.py` não detecta todas as ambiguidades.
- Não houve teste com leitores do público-alvo.

---

## Relatórios por lote

### Lote A — revisão PT-BR Controlado (intervenção mínima)

Método: texto visível de cada `<body>` extraído com um parser HTML, sem `<head>`, `<script>`, `<style>` e com os blocos gerados marcados. Cada trecho alterado foi procurado antes em `tests/`, `scripts/`, `specs/` e `public/*.md`; nenhum estava preso a teste ou script. O `verificar.py` não foi executado: as correções são poucas e pontuais, e a conferência foi feita pela leitura do diff (nenhum número, código ou identificador foi alterado; o "3" de "3 tentativas" continua).

Observação operacional: o hook `scripts/guard-ap-tokens.mjs` disparou depois da edição em `src/apresentacao.html` e acusou `#0A0A0C` na linha 42. Esse hexadecimal está na `<meta name="theme-color">` do `<head>` e já existe no `HEAD` do repositório; a edição deste lote não tocou nessa linha. O alarme é anterior a esta revisão.

---

#### `src/digital-workplace-agentico.html`
- **Perfil:** Híbrido — estudo de arquitetura com argumentação, tabelas de critérios, fluxos de protocolo e recomendações para público misto.
- **Resultado:** sem alterações: o texto já segue linguagem controlada (selos FATO/INFERÊNCIA/HIPÓTESE/RECOMENDAÇÃO, siglas definidas num glossário, ressalvas explícitas, alcance limitado a "um portal corporativo de grande porte"). Nenhuma ocorrência de severidade Média ou acima com confiança suficiente. 0 correções · 0 perguntas · 2 sugestões.

A guarda legal (`tests/digital-workplace.legal.test.mjs`) foi lida antes. Nenhum dos padrões proibidos aparece no texto visível, e nada foi introduzido.

**Perguntas ao autor:** nenhuma.
**Sugestões (Baixa, não aplicadas):**
- B3.04 (um conceito, um termo): a página define e usa "componível", mas a pergunta 2 ("Uma EXP precisa ser composable?") e o título recolhível "Intranet moderna × EXP, composable e MACH" usam o termo em inglês. Pode virar "componível" nos dois lugares.
- B3.04: o nome da página aparece como "Digital Workplace agêntico" (navegação, título, rodapé) e como "Digital Workplace Agêntico" (título do vídeo). A diferença é só de caixa; uniformizar é preferência.

**Fora do escopo:** bloco `AEO-BODY` (síntese e perguntas frequentes; fonte: `scripts/seo/build-aeo.mjs`). Sem achados relevantes nele.

---

#### `src/knowledge-os-presentation.html`
- **Perfil:** Híbrido — especificação de plataforma com tabelas de SLO, exemplos de código e YAML, e uma camada executiva argumentativa ("por que importa para o board").
- **Resultado:** 4 correções (7 ocorrências) · 5 perguntas · 6 sugestões.

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| KOS-1 | Concordância (gramática objetiva) | Média | Alta | "**Os 3×** tentativas são padrão" | "**As 3** tentativas são padrão" | O artigo masculino não concorda com "tentativas", e o "×" (vezes) não cabe numa contagem. O número 3 foi mantido. |
| KOS-2 | B3.01 Palavra conhecida (variante PT-BR) | Média | Alta | "conhecimento é um sistema **operativo**" | "sistema **operacional**" | "Sistema operativo" é a forma do português europeu; no Brasil o termo é "sistema operacional", que é também a tradução do "OS" do nome do produto. |
| KOS-3 | Grafia (Acordo Ortográfico de 1990) | Média | Alta | "ponta-a-ponta" (4×: lista do diagnóstico 06, título da cadeia de rastreabilidade, título do tracing, item `trace.id`) | "ponta a ponta" | Locuções desse tipo não levam hífen desde o Acordo. O restante do site (por exemplo, `digital-workplace-agentico`) já escreve "ponta a ponta". |
| KOS-4 | Grafia (Acordo Ortográfico de 1990) | Média | Alta | "Processo operacional **passo-a-passo**" | "passo a passo" | Mesmo motivo de KOS-3. |

**Perguntas ao autor:**
1. **KOS-P1 (B3.04 / números):** a contagem de KPIs muda ao longo da página. O herói diz "18 KPIs cognitivos + FinOps" e o diagnóstico 09 diz "18 KPIs cognitivos divididos em 4 camadas"; a seção de observabilidade e o bloco editorial dizem "22 KPIs cognitivos em 5 camadas". A tabela tem 18 KPIs em 4 camadas mais 4 de FinOps. Os KPIs de FinOps são "cognitivos" ou não? Escolher uma das formas: "18 KPIs cognitivos + 4 de FinOps" ou "22 KPIs em 5 camadas". Não alterei porque os números são protegidos (B0) e o bloco editorial é gerado.
2. **KOS-P2 (B2.08 relação temporal, Circuit Breaker):** o diagrama diz "N = 3: aborta & escala" (escala depois da terceira falha); o roadmap diz "janela de 3 tentativas. **Na quarta**, o sistema escala". A leitura pretendida é "depois da terceira falha, em vez de uma quarta tentativa, o sistema escala"? Se for, sugiro "Depois da terceira falha, o sistema escala…", que não sugere a execução de uma quarta tentativa.
3. **KOS-P3 (B3.04 tipologia):** o diagnóstico 07 lista as *atomic units* "Claim, Decision, Constraint, Pattern, Risk" (cinco), mas a seção "Conhecimento tipado" define seis tipos canônicos diferentes (FACTS, POLICIES, DECISIONS, CONTRACTS, CONSTRAINTS, PROCEDURES), e a Jornada 3 transforma lições em "Pattern ou Risk". Qual é a tipologia vigente?
4. **KOS-P4 (B5.02 fato × hipótese):** números sem fonte apresentados como resultado: "Estima-se que 40% do tempo de engenheiros seniores…", "Onboarding 3× mais rápido", "Time-to-Decision −60%", "Reuso +3x", e a coluna "Impacto" do comparativo ("Coesão +80%", "Velocity 3–5×", "Bugs −60%", "Audit 100%", "Hallucination < 2%"). São metas, estimativas ou medições? Sugestão: citar a fonte ou rotular como meta/estimativa.
5. **KOS-P5 (B5.01 absolutos):** "Respostas com fonte: sua IA **nunca** responde sem evidência", "**O fim do** retrabalho" e "Onboarding em dias, não semanas" (a mesma página estima o onboarding atual em 3 a 6 meses). Manter como promessa de produto ou atenuar?

**Sugestões (Baixa, não aplicadas):**
- B3.04: a fase 4 aparece como "Autonomous", "Agentes Autônomos" e "Fase 4 (Agentes Autônomos)"; a fase 3 aparece como "Federate / Agentic Assist" e "Federate".
- B1.02 (sujeito implícito): "Casos gerados aleatoriamente a partir de constraints formais. **Garante** invariantes em casos extremos." O verbo no singular não concorda com "Casos"; o sujeito subentendido é o teste *property-based*. "Garante" também é um absoluto (B5.01).
- Grafia: "não-funcionais" e "não-negociáveis" (duas vezes) costumam ser escritos sem hífen ("não funcionais"); deixei como sugestão porque a regra para o prefixo "não" tem menos consenso que a de KOS-3.
- Pontuação: "(ex: …)" → "(ex.: …)" na política de federação.
- B5.04 comparação sem referência: "Resposta mais rápida e determinística" e "menor custo, maior precisão" (mais rápida que o quê?).
- B3.06: o volume de termos em inglês ("Seniors… em 1:1s", "business outcomes", "tribal knowledge") é escolha de público; só registro.

**Fora do escopo:** bloco `EDITORIAL` (fonte: `scripts/editorial/editorial.data.mjs`; contém o "22 KPIs cognitivos" de KOS-P1) e bloco `AEO-BODY` (fonte: `scripts/seo/build-aeo.mjs`).

---

#### `src/catalogo.html`
- **Perfil:** Editorial — página de navegação com descrições curtas de cada conteúdo, sem passos nem requisitos.
- **Resultado:** sem alterações: as descrições são curtas e claras; os pontos encontrados são de alcance (para o autor) ou de severidade Baixa. 0 correções · 2 perguntas · 4 sugestões.

**Perguntas ao autor:**
1. **CAT-P1 (B5.01/B5.04):** "realizar o primeiro deploy governado **em tempo recorde**" (Quick Start) e "desenvolvimento eficiente e **sem débito técnico**" (Agentic DevOps for Salesforce) são absolutos sem referência. Manter ou atenuar ("em menos de 60 minutos", como diz o hub da `apresentacao`; "com menos débito técnico")?
2. **CAT-P2 (paralelismo):** "Tech Lead e Análise de Sistemas" junta um cargo e uma área. A intenção é "Tech Lead e Analista de Sistemas"?

**Sugestões (Baixa, não aplicadas):**
- B3.04: "Engenharia Agêntica" (rótulo do card Deterministic Grounding) e "Engenharia agêntica" (card do Devin) diferem só na caixa.
- B3.06: "sem refactor manual", "Overview do projeto", "Showcase da arquitetura" têm equivalente simples em português ("refatoração", "visão geral", "vitrine").
- B5.06: "Correlação inteligente entre dispositivos, rede e aplicações" — "inteligente" não diz o critério.
- "pela história e memórias" → "pela história e pelas memórias" (paralelismo da preposição).

**Fora do escopo:** nada (o bloco AEO desta página fica no `<head>`).

---

#### `src/apresentacao.html`
- **Perfil:** Híbrido — apresentação em duas leituras (executiva e de engenharia), com tabelas de relações, critérios de validação e princípios verificáveis.
- **Resultado:** 1 correção · 2 perguntas · 3 sugestões.

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| AP-1 | B2.01 Pronome com antecedente ambíguo | Média | Alta | "É a mesma disciplina aplicada a esta página: os dezessete requisitos **da sua especificação** têm, cada um, um teste nomeado." | "…os dezessete requisitos **da especificação dela** têm…" | Em toda a página, "sua" se refere ao leitor ("sua empresa", "sua organização", "seu pipeline"). Aqui o possessivo se refere à página, e o leitor pode entender "a especificação do leitor". "Dela" retoma "esta página" sem ambiguidade. O trecho não está nos pares Executiva ⇄ Engenharia de `perspective-content.js`, que têm teste de paridade. |

**Perguntas ao autor:**
1. **AP-P1 (B5.02 fato verificável):** a Camada 3 e o rodapé dizem que a página é verificada contra a **WCAG 2.1 AA**. O protocolo do repositório (`docs/a11y/A11Y.md`) e outras páginas usam **WCAG 2.2 AA**. A página é verificada contra qual versão? Não alterei porque é uma afirmação de fato e um número de versão (B0).
2. **AP-P2 (B5.01 absolutos):** "A memória institucional **sem alucinação**" e "O blueprint digital **inviolável**" são títulos absolutos; a própria página trata a ausência de dado como "incerteza explícita", que é uma afirmação mais fraca. Manter como título de impacto ou atenuar?

**Sugestões (Baixa, não aplicadas):**
- B4.03: "Cada item traz o **tempo estimado** de consumo, calculado a partir do próprio conteúdo — não **estimado** a olho." A repetição de "estimado" enfraquece o contraste; "não calculado a olho" ou "não chutado" resolve.
- O rótulo "orquestra" no diagrama do Spec-Driven Development parece truncamento de "orquestração" (os outros rótulos são substantivos). Se for limite de espaço no SVG, vale "orquestração" em fonte menor.
- B5.03: "transformar risco técnico em vantagem competitiva mensurável" (subtítulo executivo) promete uma medição que a página não mostra.

**Fora do escopo:** blocos `AP-COUNTER` e `AP-HUB` (gerados; fonte: scripts de geração da página) e `AEO-BODY` (fonte: `scripts/seo/build-aeo.mjs`). No hub gerado, o título "Desenvolver Salesforce com IA **Agentic** sem gerar débito técnico" mistura inglês e português; a descrição logo abaixo usa "agêntica". A correção iria na fonte do card, não neste HTML.

---

#### `src/sustentacao.html`
- **Perfil:** Editorial — página de curso com descrição de módulos, público e materiais, sem passos nem requisitos.
- **Resultado:** 3 correções · 3 perguntas · 4 sugestões.

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| SUS-1 | Grafia (substantivo composto) | Média | Alta | "Público Alvo" | "Público-Alvo" | "Público-alvo" é composto com hífen. Mantive a caixa alta inicial dos outros títulos da página ("Conteúdo Principal", "Material de Apoio"). |
| SUS-2 | B3.04 Um conceito, um termo | Média | Alta | "estratégias avançadas de **reliability engineering**" | "…de **engenharia de confiabilidade**" | A mesma página chama o conceito de "engenharia de confiabilidade" duas vezes (módulo 6 e o título "Engenharia de Confiabilidade em Produção"). O termo em inglês, numa frase em português, parece um conceito diferente. |
| SUS-3 | B3.04 Um conceito, um termo · B3.01 | Média | Alta | "Técnicas para identificar **root causes**" | "…identificar **causas-raiz**" | O resumo da própria página (bloco gerado) usa "causa-raiz". O termo em português é corrente no público declarado (desenvolvedores júnior e pleno). |

**Perguntas ao autor:**
1. **SUS-P1 (B0.02 nome e endereço):** o rodapé assina "Mauricio Yokoyama Issei" (sem acento; no resto do site é "Maurício") e aponta "mauricio.issei.com.br" como endereço. O domínio publicado é `issei.com.br`. Os dois estão corretos? Não alterei porque nome e domínio são protegidos. O mesmo par aparece em `src/artifice.html`.
2. **SUS-P2 (B5.01 absolutos):** "Um guia **completo**", "Uma experiência **completa**" e "Apresentação **completa**" são afirmações de completude sem critério. Manter?
3. **SUS-P3:** "Documentação Oficial" — oficial de qual organização ou padrão? Se é material do autor, "Documentação de apoio" evita a leitura de que é um documento normativo de terceiros.

**Sugestões (Baixa, não aplicadas):**
- "Desenvolvedores júnior e pleno" → "júniores e plenos" (concordância no plural; a forma invariável é coloquial).
- B3.06: "Audio Cases", "Deep Dive Executivo", "incident management" e "Tech Leads" mantêm o inglês; "Audio" sem acento parece português escrito errado. "Casos em áudio" resolveria.
- "Clique para Ampliar" e "Assistir ao Vídeo Principal" com caixa alta em todas as palavras destoam dos rótulos em caixa de frase do site.
- "transformar crises em oportunidades de crescimento" é fórmula de efeito (ver memória `feedback_editorial_no_ai_flourish`); não há problema de clareza, só de tom.

**Fora do escopo:** bloco `AEO-BODY` (fonte: `scripts/seo/build-aeo.mjs`). Sem achados relevantes nele.

---

#### `src/404.html`
- **Perfil:** Editorial — página de erro com quatro frases.
- **Resultado:** sem alterações: as frases ("O silêncio aqui é absoluto.", "A página que você procura não faz parte da nossa estrutura.", "Retornar à estabilidade") são voz autoral e não têm problema de clareza (B7.07). 0 correções · 0 perguntas · 1 sugestão.

**Perguntas ao autor:** nenhuma.
**Sugestões (Baixa, não aplicadas):** o link "Retornar à estabilidade" não diz o destino; "Voltar ao início" ajuda quem chega por erro de digitação (B3.01). A metáfora tem função de marca, por isso não alterei.
**Fora do escopo:** nada.

---

#### `src/artifice.html` (SÓ DIAGNÓSTICO)
- **Perfil:** Editorial — ensaio argumentativo em primeira e segunda pessoa, com citações e casos; a voz autoral pesa mais que a padronização (recomendação do piloto).
- **Resultado:** 0 correções (página só de diagnóstico; não encontrei erro objetivo de grafia com confiança Alta) · 7 perguntas · 4 sugestões.

| ID | Regra | Sev. | Conf. | Trecho | Proposta |
|---|---|---|---|---|---|
| ART-1 | B3.01 Palavra conhecida · B3.04 | Média | Média | "Ironicismo da Automação Cognitiva por IA"; "Ironicismos da Automação" | O artigo de Bainbridge é *Ironies of Automation*, em português "ironias da automação", forma que o próprio resumo gerado da página usa ("a ironia da automação"). "Ironicismo" não está nos dicionários. Pergunta: é um termo cunhado de propósito? Se não for, "Ironia da Automação". |
| ART-2 | B5.02 Fato × interpretação | Alta | Média | "Christophe Dejours conceitua como o **agilismo industrial** estrangula o 'trabalho vivo'" | A obra citada é de 1980 (edição brasileira de 1992), anterior ao movimento ágil. Pergunta: a aplicação ao agilismo é do autor da página? Se for, "A partir de Dejours, pode-se ler o agilismo industrial como…". |
| ART-3 | B5.02 · B5.01 | Alta | Média | "Cal Newport e Gloria Mark **provam** que a cultura da hiperatividade **destrói**…" | Verbo de certeza e absoluto para pesquisa observacional. Pergunta: aceita "mostram" e "reduz"? |
| ART-4 | B5.02 Fonte | Média | Baixa | "Tanya Reilly e **Martha Ertman** definem o Glue Work" | A autoria de *Being Glue* (2019) é de Tanya Reilly; não encontrei a ligação com Martha Ertman no texto. Pergunta: qual é a fonte da segunda autoria? |
| ART-5 | B5.02 Fato verificável | Média | Média | 37signals: "seguidas por 2 semanas de **descanso** e refatoração (cool-down)" | No Shape Up, o *cool-down* é tempo livre de projeto para correções e exploração, não descanso. Pergunta: aceita "2 semanas sem projeto, para correções e refatoração"? |
| ART-6 | B5.02 Fonte | Alta | Baixa | GitLab: Distinguished Engineer com "equivalência formal, orçamentária e salarial a um Vice-Presidente" e "podem vetar lançamentos de produtos" | São afirmações sobre uma empresa real sem citação. Pergunta: qual é a fonte (página do handbook)? O bloco "Antídotos que existem de verdade" depende delas. |
| ART-7 | B0.03 Citação | Média | Baixa | Citação de Sennett: "A maestria é o desejo humano… punida como rigidez ou falta de ambição." | Está entre aspas e atribuída a *O Artífice*. Pergunta: é citação literal (com página) ou paráfrase? Se for paráfrase, tirar as aspas. O mesmo vale para as frases atribuídas a Reilly e Bainbridge. |

**Perguntas ao autor:** ART-1 a ART-7 (tabela acima) e o rodapé "Mauricio Yokoyama Issei · 2026 / mauricio.issei.com.br" (ver SUS-P1).

**Sugestões (Baixa, não aplicadas):**
- B3.04: "de-skilling" (base científica do padrão 05) e "deskilling" (parágrafo seguinte e FAQ) com grafias diferentes.
- Tratamento misturado: "comece por aqui… o ponto que **te** interessa" ao lado de "você"; idem na citação de Reilly ("também **te** prende").
- "trabalho não-faturável" → "não faturável" (mesma ressalva de consenso registrada em KOS).
- "Peso promocional direto proporcional ao tempo investido" — "direto" e "proporcional" disputam a mesma função; "Peso promocional proporcional ao tempo investido".

**Fora do escopo:** blocos `EDITORIAL` e `EDITORIAL-NEXT` (fonte: `scripts/editorial/editorial.data.mjs` e `scripts/gen-editorial.mjs`) e `AEO-BODY` (fonte: `scripts/seo/build-aeo.mjs`). No `AEO-BODY`, o FAQ repete as afirmações de ART-3 e ART-6 ("no GitLab, um Distinguished Engineer tem equivalência formal e salarial a um VP"); se o autor mudar o corpo, a fonte do bloco precisa acompanhar.

---

## Limitações
- A revisão foi feita por um modelo de linguagem e não substitui a leitura do autor; o script `verificar.py` não foi executado neste lote.
- As páginas em inglês (`/en/`) não foram regeneradas (proibido neste lote). As edições em `sustentacao`, `apresentacao` e `knowledge-os-presentation` deixam os espelhos defasados até rodar `npm run i18n:sync`.
- Não verifiquei as fontes externas de ART-2 a ART-7; as perguntas indicam a dúvida, não um erro confirmado.

### PT-BR Controlado, lote B (revisão com intervenção mínima)

Data: 2026-10-15. Skill `ptbr-controlado` v0.1.0, método igual ao da proposta e do piloto.
Só foi editado texto visível em `<body>`, fora de blocos gerados (`AEO`, `AEO-BODY`, `EDITORIAL`). Nenhum trecho alterado aparece em `tests/` ou `scripts/` (conferido com `grep -rnF` antes de cada edição).

Decisão de critério válida para todo o lote: vírgula antes de "mas" que liga orações foi tratada como sugestão (Baixa), não como correção. A primeira versão de `know.html` aplicou essa vírgula; a alteração foi desfeita para manter o mesmo critério nas sete páginas.

#### `src/devin.html`
- **Perfil:** Híbrido. É uma apresentação com argumentação, narrativa de abertura e trechos técnicos (comandos, specs, métricas).
- **Resultado:** 7 correções · 8 perguntas · 10 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| DEV-1 | Pontuação (vírgula entre sujeito e predicado) | Média | Alta | "Quem não evolui a forma de pensar, só sente o peso extra." | "Quem não evolui a forma de pensar só sente o peso extra." | A vírgula separava o sujeito ("Quem não evolui a forma de pensar") do verbo. Erro objetivo de pontuação. |
| DEV-2 | Grafia (prefixo "hiper") | Média | Alta | "a cozinha foi hiper-automatizada" | "a cozinha foi hiperautomatizada" | Pelo Acordo Ortográfico, "hiper" só leva hífen antes de "h" ou "r". |
| DEV-3 | Grafia (prefixo "super") | Média | Alta | "é a super-calculadora da cozinha" | "é a supercalculadora da cozinha" | Mesma regra de DEV-2. |
| DEV-4 | Pontuação (vírgula entre sujeito e predicado) | Média | Alta | "quem articula melhor a intenção, obtém resultados melhores" | "quem articula melhor a intenção obtém resultados melhores" | Mesmo problema de DEV-1. |
| DEV-5 | Regência ("pensar em") | Média | Alta | "edge cases que você não pensou" | "edge cases em que você não pensou" | O verbo "pensar" neste sentido pede a preposição "em". Mesmo tipo de erro do exemplo "que ela precisa" do brief. |
| DEV-6 | Grafia ("micro" + "s") | Média | Alta | "monolito modular sobre micro-serviços?" | "monolito modular sobre microsserviços?" | "Micro" se junta à palavra seguinte e o "s" é dobrado. O trecho entre aspas é um exemplo escrito pelo autor, não citação de terceiros. |
| DEV-7 | Grafia (acentuação) | Média | Alta | "Mentoria de Junior", "Junior fez PR", "junior aprende", "Junior sai" (4 ocorrências no card "Code Review + Mentoria de Junior") | "Júnior" / "júnior" | Em português a palavra é paroxítona terminada em "r" e leva acento. |

**Perguntas ao autor:**
1. **Possível referência a organização (prioridade).** "Desenvolvedor desde 2003 · **Na Rede** desde 2018" e os identificadores "projeto Salesforce **BUPJ**", "Configure o Knowledge da **BUPJ**", "Sandbox corporativa", `salesforce-bupj-project` e `sandbox-bupj` (estes dois em blocos de código, B0) podem identificar uma empresa real e o grupo a que ela pertence. O brief proíbe referência a Itaú ou IU Conecta, direta ou indireta. Nada foi alterado; o autor precisa decidir se esses nomes ficam.
2. **Grafia do nome.** A página escreve "Mauricio" sem acento (capa, apresentação, encerramento, rodapé). O resto do site usa "Maurício". É intencional?
3. **Contradição interna sobre o que o Devin sabe (B5.02, Alta, confiança Baixa sobre a leitura certa).** "O que Devin vê" diz que ele trabalha "sem acessar bases externas ou fazer chamadas de API" e que "Tudo que ele sabe vem do que está no contexto da conversa atual". A mesma página descreve o Knowledge persistente (seção "Knowledge: O Ativo que Cresce") e, na seção de ACUs, "Interações em browser: Navegar em docs". Qual afirmação vale?
4. **Simulação ou sessão real (B5.02).** O bloco do terminal tem `aria-label="Simulação de terminal Devin"`, e o texto logo abaixo diz "Este é o fluxo real de uma sessão do Devin". Qual das duas descrições é a correta?
5. **Números sem fonte (B5.02, B5.04).** "novo engenheiro atinge produtividade 70% mais rápido"; "Economia de 8 horas vs. refactor manual. Código 40% mais legível."; "Novo engenheiro onboards em 2 dias vs. 2 semanas"; "Aumentar a geração de código com IA em 55%". São medições, estimativas ou exemplos ilustrativos? Se forem ilustrativos, convém dizer isso.
6. **Absolutos (B5.01, B5.03).** "A calculadora foi a primeira IA da história" e "a primeira ferramenta cognitiva da humanidade"; "Refatoração sem receio de quebra, ele testa tudo"; "Migração confiável, sem erros silenciosos"; "É por isso que o Devin cria um PR com testes passando". Ficam como recurso retórico da apresentação ou devem ser qualificados?
7. **Tooltip de ACU (fora do texto editável, atributo `data-tooltip`).** "1 ACU ≈ US$ 0.026": o separador decimal está no padrão inglês e o valor parece baixo em relação ao preço público por ACU. Conferir o valor. Na mesma seção, "Clonando um repositório grande do Git → Sleep (contador parado)": clonar é espera ou trabalho do agente?
8. **Idades.** "Pai da Yumi (14), Lucas e Matheus (9)". O Terminal Evolutivo diz que os gêmeos nasceram em 2016; em outubro de 2026 eles podem ter 9 ou 10 anos. Confirmar se a idade está atualizada.

**Sugestões (Baixa, não aplicadas):**
- "onde" com antecedente que não é lugar: "especialidades onde Devin executa", "As especialidades onde Devin agrega", "um domínio onde o Devin executa" → "em que".
- "mais assertivo será o resultado": "assertivo" quer dizer "afirmativo"; o sentido pretendido parece ser "certeiro" ou "preciso".
- "débito técnico com juros" (Pilar 4): a Engenharia da Confiança usa "dívida técnica". Uniformizar entre páginas (B3.04).
- "Código walkthrough": a ordem em português seria "walkthrough do código".
- Exercício 02, "Função de cálculo financeiro. Testa happy-path, …": o sujeito de "Testa" parece ser a função. Sugestão: "Os testes cobrem só o happy path, …" (B1.02).
- "**Com SDD — Spec Versionada** o agente lê": falta dois-pontos depois do rótulo.
- "Novo engenheiro onboards em 2 dias": verbo inglês conjugado; "conclui o onboarding em 2 dias".
- "super-prompt" / "REFINAMENTO = SUPER-PROMPT": com palavra estrangeira a regra de prefixo não é clara; o bloco editorial gerado usa a mesma grafia. Manter uniforme.
- "Quando seu código ainda funciona mas ficou complexo": vírgula antes de "mas".
- "A ferramenta não te diminuiu. Te liberou.": próclise no início de frase e mistura "você"/"te". É voz autoral; manter, salvo decisão do autor.

**Fora do escopo:**
- Bloco `EDITORIAL` (linhas 402 a 420; fonte `scripts/editorial/editorial.data.mjs`): o rótulo "Aplicar" aparece duas vezes ("Aplicar Quatro pilares…" e "Aplicar O time em sincronia…"); o segundo, pelo conteúdo ("para quem lidera o time"), talvez devesse ser outro verbo (por exemplo "Liderar"). Também usa "super-prompt".
- Bloco `AEO-BODY` (linhas 3559 a 3598; fonte `scripts/seo/build-aeo.mjs` e `scripts/seo/pages.mjs`): "o Cérebro decide o quê mostrar" (mesma pergunta de EC sobre "o quê").
- Atributos `data-tooltip` (ACU, "Modo onde você define intenções…") e `<head>`.

#### `src/engenharia-confianca.html`
- **Perfil:** Híbrido. Combina argumentação para liderança com definições, métricas, fórmulas e glossário.
- **Resultado:** 3 correções · 6 perguntas · 6 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| EC-1 | Grafia | Média | Alta | "falsos-positivos" (2 ocorrências: Módulo 1, "Para não cair em falsos-positivos"; glossário, "Matriz de Evidências") | "falsos positivos" | Substantivo + adjetivo, sem hífen. O site já escreve "falsos positivos" sem hífen em `devin.html` (Exercício 02). |
| EC-2 | Grafia ("não" como prefixo) | Média | Alta | "o não-determinismo é isolado e testável" (2 ocorrências: Módulo 2 e FAQ "determinístico-primeiro") | "o não determinismo é isolado e testável" | Pelo VOLP posterior ao Acordo, "não" com valor de prefixo não leva hífen ("não agressão"). |
| EC-3 | Palavra errada (B3.01) | Média | Alta | "um ativo da organização — versionado, audível e reutilizável" | "… versionado, auditável e reutilizável" | "Audível" é o que se pode ouvir. O contexto (governança, auditoria) pede "auditável", palavra usada em toda a página. |

**Perguntas ao autor:**
1. "Eu venho de DevOps / CI-CD": "Cada deploy reverte código *e* a spec que o originou." Um deploy não reverte nada. A ideia é "cada rollback reverte o código e a spec" ou "cada deploy versiona o código e a spec"? (B2, confiança Baixa sobre a leitura.)
2. "o Cérebro decide *o quê* apresentar" (Módulo 3), "decide *o quê* mostrar" (FAQ e glossário A2UI). Pela norma, antes de verbo no infinitivo o pronome é átono: "o que apresentar". O acento só cabe se "o quê" estiver substantivado de propósito, em contraste com "como". Manter ou corrigir nas três ocorrências (e no bloco AEO da página devin)?
3. Caso GitClear: "Crescimento **exponencial** de code churn". A fonte citada sustenta "exponencial" ou o termo é figurado? (B5.01.)
4. Bibliografia: Geifman & El-Yaniv descritos como "**Prova matemática** da abstenção / Fail-Closed". O artigo dá garantias de risco para classificação seletiva; chamar isso de prova do Fail-Closed amplia o alcance (B5.03).
5. Caso Zillow: "degradar para fallback seguro ao cruzar o limiar **interromperia** a aquisição de milhares de imóveis". É um contrafactual apresentado como certeza; "teria interrompido" ou "poderia ter interrompido" preserva a hipótese (B5.02).
6. Caso Mata v. Avianca: "O caso jurídico abaixo **virou jurisprudência**". Foi uma decisão de sanção em tribunal distrital; "jurisprudência" pode exagerar o alcance (B5.03).

**Sugestões (Baixa, não aplicadas):**
- KPI do M2: "< 200ms" → "< 200 ms" (espaço entre número e unidade, B3.07).
- Glossário "Resíduo Interpretativo": "A única parte da tarefa onde a IA…" → "em que a IA".
- Caso Zillow, "velocidade de requisição acima de um inventário de comportamento ajustado": pouco claro; "velocidade de requisição priorizada sobre…".
- Prática do M3: "Pegue uma tarefa real … e responda: cada execução deveria deixar a organização mais inteligente." O que vem depois dos dois-pontos não é a pergunta; as perguntas estão no bloco seguinte.
- Módulo 2, parágrafo do MCP: "fronteira de segurança" aparece duas vezes na mesma frase (B4.03).
- Glossário "Alucinação sintática": vírgula antes de "mas".

**Fora do escopo:**
- `<head>` (JSON-LD escrito à mão): a FAQ "determinístico-primeiro" e o `DefinedTerm` "Matriz de Evidências" continuam com "não-determinismo" e "falsos-positivos". Depois de EC-1 e EC-2, o corpo e o JSON-LD divergem nessa grafia. Quem mantém o `<head>` precisa alinhar.
- `scripts/seo/pages.mjs` usa "falsos-positivos" e "não-determinismo" nas fontes de blocos gerados de outras páginas.

#### `src/acessibilidade.html`
- **Perfil:** Híbrido. Case técnico com evidências, critérios WCAG, trechos de código e conclusões com limites declarados.
- **Resultado:** sem alterações: o texto já separa fato, inferência e limite, define os termos e não tem erro objetivo de grafia ou gramática. 0 correções · 0 perguntas · 3 sugestões.

**Perguntas ao autor:** nenhuma.

**Sugestões (Baixa, não aplicadas):**
- "gate" e "sondas" aparecem no quadro de números e no parágrafo de ressalva do topo antes de serem definidos (definições em "Catraca no gate" e "Revisão independente por agente"). Uma explicação curta na primeira ocorrência ajudaria o leitor não técnico (B3.03).
- "Revisão independente por agente em contexto novo": o sujeito "Um agente em contexto novo" fica longe do verbo "escreveu" por duas intercalações (B1.04). Legível, mas pode virar duas frases.
- O bloco gerado de síntese diz "o estudo não isola o efeito", e o corpo diz "Este relato não isola". Uniformizar o termo na fonte do bloco (B3.04).

**Fora do escopo:**
- Bloco `AEO-BODY` (linhas 799 a 833; fonte `scripts/seo/pages.mjs` via `build-aeo.mjs`) e bloco `EDITORIAL` (linhas 309 a 317).
- Trechos com `data-evidence` (status do relatório, independência, leitor de tela) estão presos a `tests/acessibilidade.evidence.test.mjs`. Não foram tocados.
- Script `verificar.py`: 43 sinalizações, todas descartadas (títulos juntados pelo extrator, negações simples lidas como dupla negação, "deve/precisa" fora de especificação).

#### `src/know.html`
- **Perfil:** Editorial. Página explicativa, com analogia longa (a organização como cozinha) e bibliografia.
- **Resultado:** 4 correções · 3 perguntas · 5 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| KNOW-1 | Grafia (erro de digitação) | Média | Alta | "Tentatar replicar o sistema Toyota (Lean)…" | "Tentar replicar o sistema Toyota (Lean)…" | Erro de digitação. |
| KNOW-2 | Grafia (prefixo "auto") | Média | Alta | "Cultiva **autoorganização**." | "Cultiva **auto-organização**." | Prefixo terminado em vogal igual à vogal inicial da palavra seguinte leva hífen. |
| KNOW-3 | Grafia (prefixo "co") | Média | Alta | "Em vez de imposição top-down, co-criação." e o título "5. Práticas Ágeis, Design e Co-criação" | "cocriação" / "Cocriação" | Pelo Acordo, "co" se junta à palavra seguinte ("cocriação", registrada no VOLP). Os títulos de obras em inglês da bibliografia ("co-creation") não foram tocados. |
| KNOW-4 | B2.01 Pronome com antecedente ambíguo | Média | Alta | "uma receita de risoto de um chef Michelin não garante que você reproduza **seu** prato" | "… que você reproduza **o prato dele**" | "Seu" podia ser lido como "o prato de você". O argumento é que a receita não reproduz o prato do chef. |

**Perguntas ao autor:**
1. "Pratica **Manege** (conduzir/orquestrar) em vez de apenas **Manage** (controlar)": "Manege" é intencional (do francês *manège*) ou erro de digitação? Se for intencional, vale uma nota sobre a origem.
2. Epígrafe final: "Se você quer ter certeza sobre o futuro, invente-o." atribuída a John Seely Brown. A frase próxima, "a melhor forma de prever o futuro é inventá-lo", costuma ser atribuída a Alan Kay. Confirmar a atribuição (citação protegida, B0.03; nada alterado).
3. "Jogar iniciantes direto no 'fogo' sem essa aculturação é **um erro fatal comum** nas empresas." Afirmação de frequência sem fonte (B5.02).

**Sugestões (Baixa, não aplicadas):**
- Cynefin: o card usa "SONDAR → SENTIR → RESPONDER" e a seção 6 usa "(Probe-Sense-Respond)". Escolher uma forma (B3.04).
- "O conhecimento tácito … não se escreve, se socializa.": próclise no início da oração; "socializa-se".
- "devemos abandonar a imagem da organização como uma linha de montagem … e **adotá-la** como uma cozinha": "-la" pode retomar "a imagem" ou "a organização" (B2.01, leitura fácil pelo contexto).
- Subtítulo do topo: vírgula antes de "mas" em "modernas mas não funcionam".
- "Mimetismo Isomórfico" aparece com e sem maiúsculas iniciais. Uniformizar.

**Fora do escopo:**
- Bloco `AEO` no `<head>` (linhas 390 a 532) e a fonte `scripts/seo/pages.mjs` (linha 983), que escreve "co-criação".

#### `src/vsl.html`
- **Perfil:** Editorial. Página curta de vídeo com chamada para ação; sem gêmeo `/en/` (listada em `scripts/i18n/assets.py`).
- **Resultado:** 1 correção · 0 perguntas · 1 sugestão

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| VSL-1 | B3.01 Palavra conhecida pelo público (texto em outro idioma) | Média | Alta | "To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video" (texto padrão do Video.js) | "Para ver este vídeo, ative o JavaScript e considere usar um navegador compatível com vídeo HTML5." | A página declara `lang="pt-BR"`. O aviso em inglês aparece para quem está sem JavaScript, e o leitor de tela o lê com pronúncia de português. O link continua no mesmo lugar e com o mesmo `href`. |

**Perguntas ao autor:** nenhuma.
**Sugestões (Baixa, não aplicadas):** o título "A Tecnologia do Futuro" não diz do que trata o vídeo (B4.02).
**Fora do escopo:** pendências de acessibilidade já registradas em `EXCEPTIONS.md` (EXC-005: autoplay, falta de `<main>` e de link de salto). O link do aviso abre em nova aba sem avisar; é questão de acessibilidade, não de texto.

#### `src/mapmind.html`
- **Perfil:** Editorial. Visualizador de mapa mental com um `<h1>` oculto e três botões de zoom.
- **Resultado:** sem alterações: o único texto em português ("Mapa mental do Plano de Desenvolvimento Individual" e o `aria-label` "Mapa mental do PDI") está correto, e a sigla é expandida no `<h1>`.

**Perguntas ao autor:** nenhuma.
**Sugestões (Baixa, não aplicadas):** nenhuma de linguagem.
**Fora do escopo:** os botões "+", "-" e "⟲" não têm nome acessível em texto. Corrigir exige acrescentar atributo, o que está fora deste brief; a página já está em `EXCEPTIONS.md` (EXC-004).

#### `src/terminal-evolutivo.html` (SÓ DIAGNÓSTICO)
- **Perfil:** Editorial. Narrativa pessoal em primeira pessoa, com voz autoral forte (B7.07).
- **Resultado:** sem alterações: nenhum erro objetivo de grafia ou gramática com confiança Alta. As construções coloquiais ("pra", "A vida não esperou eu ficar pronto", frases sem verbo) são escolhas de voz e ficam. 0 correções · 1 pergunta · 4 sugestões.

**Perguntas ao autor:**
1. Textos alternativos das fotos: "**Issei** bebê no colo, em 1982" e, na foto seguinte, "**Maurício** criança numa moldura de madeira". O mesmo personagem aparece com dois nomes. É intencional (apelido na infância) ou convém uniformizar? (B3.04.)

**Sugestões (Baixa, não aplicadas, só diagnóstico):**
- "Em 2016 vieram dois de uma vez.": "dois" fica sem referente até a foto dos gêmeos. Quem não vê a imagem pode demorar a entender (B2.02).
- Intervalos de anos com espaçamento diferente: "1982–1990" e "2009 – 2011" (B3.07).
- "Hoje é diferente. Minha mulher, que começou como analista e virou empresária.": a segunda frase não tem verbo principal. É recurso de voz; registro apenas.
- "E todo sistema no pico está, no mesmo gesto, afinado para quebrar.": absoluto usado como metáfora. Manter.

**Fora do escopo:** bloco `AEO` no `<head>` (linhas 1006 a 1143).

## Limitações
- A revisão foi feita por um modelo de linguagem e não substitui a leitura do autor. O script `verificar.py` não detecta todas as ambiguidades; as sinalizações dele nas sete páginas foram lidas e descartadas (frases longas criadas pela extração que junta títulos, negações simples lidas como dupla negação, termos vagos em texto que não é requisito).
- Não rodei `verificar.py --comparar` nas páginas editadas. As alterações não tocam números, código, identificadores nem qualificadores, e o diff foi conferido linha a linha (`devin` 9 linhas, `engenharia-confianca` 5, `know` 5, `vsl` 1 bloco).
- O gêmeo `/en/` de `devin`, `engenharia-confianca` e `know` precisa ser sincronizado (`npm run i18n:sync`), o que não fiz por ordem do brief. `vsl` e `mapmind` não têm gêmeo.

### Lote C: revisão PT-BR Controlado (intervenção mínima)

Método: extraí o texto visível do `<body>` de cada página (sem `<script>`, `<style>` e blocos gerados) e li tudo por completo. Antes de cada alteração, procurei o trecho original em `tests/` e `scripts/`; nenhum trecho alterado aparece lá. Não encontrei menção a Itaú ou IU Conecta nas seis páginas. O script `verificar.py` não foi executado; a revisão foi feita por leitura, o que não prova ausência de ambiguidade.

Blocos gerados presentes no lote: `AEO-BODY` (fonte: `scripts/seo/pages.mjs`) e `EDITORIAL` (fonte: `scripts/editorial/editorial.data.mjs`). Não toquei neles.

---

#### `src/salesforce-agentic-dev.html`
- **Perfil:** Híbrido. A página é um guia com passos, comandos e templates, e também argumenta a favor de um método.
- **Resultado:** sem alterações: não encontrei erro objetivo de gramática nem ambiguidade de severidade Média com confiança suficiente. Ficam 5 perguntas e 6 sugestões.

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| SFD-1 | B5.02 Fato × hipótese | Alta | Baixa | "Cenário real. Mesmo agente. Mesma feature." | (pergunta) | A mesma seção diz que o prompt "é intencionalmente exagerado" e mostra números exatos (cobertura 62%, 89%, Jest 82%, "~4× mais ACUs"). O leitor não sabe se o caso foi medido ou é ilustrativo. |
| SFD-2 | B3.04 Um conceito, um termo | Média | Média | "Aprovação automática de pedidos B2B com desconto > 30%" | (pergunta) | O texto seguinte diz que o pedido dispara um fluxo de aprovação para o gerente regional. "Aprovação automática" pode ser lido como "o pedido é aprovado sem o gerente". O mesmo termo aparece nos templates de spec (conteúdo protegido), por isso não alterei só o título. |
| SFD-3 | B5.01 / B5.03 Absolutos | Alta | Baixa | "Toda Spec ambígua vira retrabalho — sempre." · "Ownership por domínio é a única defesa real contra metadata trampling." · "Quem promove é o Flosum. Sempre. Sem exceções." | (pergunta) | Absolutos sem fonte. O segundo conflita com a própria página, que apresenta o Smart Merge do Flosum como mecanismo de resolução de conflitos entre times. |
| SFD-4 | B5.02 Número sem fonte | Alta | Baixa | "Knowledge-base rica reduz o número médio de iterações de 5 para 1–2." · "Confiar cegamente no agente custa o dobro" | (pergunta) | Números apresentados como medição, sem indicar de onde vêm. |
| SFD-5 | B5.02 | Média | Baixa | "Engenheiros experientes economizam dezenas de ACUs apenas escrevendo Specs melhores" | (pergunta) | Afirmação quantitativa sem fonte. |

**Perguntas ao autor:**
1. SFD-1: o exemplo "sem SDD × com SDD" foi medido ou é ilustrativo? Se for ilustrativo, sugiro trocar "Cenário real" por "Cenário ilustrativo" ou "Cenário típico".
2. SFD-2: a intenção é "disparo automático do fluxo de aprovação"? Se sim, o título e os templates podem dizer "Fluxo de aprovação automático para pedidos B2B com desconto > 30%".
3. SFD-3: os absolutos da seção "O que custou caro descobrir" são intencionais? Sugestão: "quase sempre", "a principal defesa", "é o único caminho oficial de deploy".
4. SFD-4: há registro da redução de 5 para 1–2 iterações? Se não houver, "reduz o número de iterações" sem números.
5. SFD-5: mesma pergunta para "dezenas de ACUs".

**Sugestões (Baixa, não aplicadas):**
- "Cobertura Apex em 62%, abaixo do mínimo (75%)": a spec da página exige 85%; "abaixo do mínimo da plataforma (75%)" evita que o leitor compare com o 85%.
- "ouça em 1.25×": em texto corrido em português, "1,25×" (B3.07), se não for rótulo copiado do player.
- "o resultado é débito técnico exponencial" e "Cada peça faz uma coisa — e faz muito bem": frases de efeito sem medida (B5.01).
- "O ferramental está pronto. A próxima escolha é sua.": fecho retórico; avaliar pela regra do site de evitar flourish.
- "(ex: gerar testes Apex...)" e "(ex: CommercePricing)": abreviação padrão é "ex.:".
- "SOP" aparece sem expansão ("ele segue uma SOP testada"); o público Salesforce talvez não conheça a sigla.

**Fora do escopo:**
- Bloco `AEO-BODY` (fonte: `scripts/seo/pages.mjs`): (a) usa "dívida técnica" enquanto o corpo da página usa "débito técnico" (B3.04); (b) "O Salesforce CLI versiona o estado de metadados no Git" está tecnicamente impreciso, porque quem versiona é o Git; o CLI recupera e implanta os metadados; (c) "Juntos garantem velocidade com controle" é um absoluto.
- Templates de spec, prompts de exemplo e comandos em `<pre>`/`<code>` (B0.01): o "pra", o "Cria" e o "arruma" dos prompts ruins são intencionais. No template, "precisam de aprovação automática do gerente regional" tem o mesmo problema de SFD-2.

---

#### `src/socialselling.html`
- **Perfil:** Técnico. É documentação de projeto, com contratos, configuração, ADRs e procedimentos.
- **Resultado:** 3 correções · 3 perguntas · 6 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| SS-1 | Concordância / B2.01 | Média | Alta | "Cada módulo M1–M5 produz e consome tipos bem definidos; jamais compartilham referências mutáveis entre camadas." | "…tipos bem definidos; os módulos jamais compartilham referências mutáveis entre camadas." | O sujeito da primeira oração é singular ("Cada módulo"); o verbo plural da segunda fica sem sujeito explícito. |
| SS-2 | Grafia (Acordo de 1990) | Média | Alta | "Cada ADR não-trivial" | "Cada ADR não trivial" | O "não" com valor de prefixo não leva hífen. |
| SS-3 | Grafia | Média | Alta | "Última revisão: Junho 2026" | "Última revisão: junho de 2026" | Em português, os nomes dos meses são escritos com minúscula, e a forma padrão da data usa "de". |

**Perguntas ao autor:**
1. "WU" e "WUs" aparecem mais de dez vezes e nunca são expandidas (B3.05). É "work unit" (unidade de trabalho)? Sugiro expandir na primeira ocorrência, na seção 5.
2. A seção 14 diz "Todas as features opt-in são desligadas por padrão", mas o cartão "[corpus] & [learning] — opt-ins ativos" mostra `true ← ligado`. O cartão mostra a configuração atual do repositório e não o padrão? Se for isso, vale dizer.
3. "Busca de clientes mais eficiente e automática com IA" (subtítulo): mais eficiente que o quê (B5.04)? Pode ficar como está se for só slogan.

**Sugestões (Baixa, não aplicadas):**
- "surfaciados" e "surfacia" (3 ocorrências) são calques do inglês sem registro em dicionário; "repassados" ou "exibidos" servem. O público técnico entende, por isso não alterei.
- "Aplicou-se Teoria das Restrições ao funil": "Aplicou-se a Teoria das Restrições".
- "ADR vinculada" (DoR, item 3), enquanto o resto da página trata ADR no masculino ("um ADR versionado", "Cada ADR … acompanhado").
- "Card bloqueada … → BLOCKED: no PROGRESS.md e devolve ao Backlog": o agente de "devolve" é o run noturno, implícito (B1.02). A seção S3 deixa claro, por isso não alterei.
- "A correção do sistema repousa sobre quatro invariantes": "correção" pode ser lido como "conserto"; "corretude" ou "o funcionamento correto" evita a dupla leitura.
- Hífens com prefixo fora da norma: "Auto-aprendizagem" (nav e título), "multi-provedor", "auto-merge". Não alterei porque "Auto-aprendizagem" também aparece no bloco EDITORIAL gerado, e alterar só uma parte criaria inconsistência.

**Fora do escopo:** blocos `EDITORIAL` e `AEO-BODY` (fontes indicadas acima); comandos e valores de configuração (B0.01).

---

#### `src/case-agents.html`
- **Perfil:** Híbrido. É um case técnico com código, fórmulas e métricas, e também narrativa e argumentação.
- **Resultado:** 3 correções · 5 perguntas · 6 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| CASE-1 | B2.06 Escopo de modificador | Alta | Alta | "Resolve o problema de subconfiança por regularização L2 em dataset pequeno sem inflar artificialmente as probabilidades." | "Resolve o problema de subconfiança causado pela regularização L2 em dataset pequeno, sem inflar artificialmente as probabilidades." | "por regularização L2" podia ser lido como o meio da solução. A técnica 2 da própria página mostra o contrário: a regularização causa as probabilidades tímidas, e o Platt scaling as corrige. |
| CASE-2 | Regência | Média | Alta | "para responder cada mensagem" | "para responder a cada mensagem" | No sentido de "dar resposta a", "responder" pede a preposição "a". |
| CASE-3 | Grafia (Acordo de 1990) | Média | Alta | "(I/O não-bloqueante)" | "(I/O não bloqueante)" | O "não" com valor de prefixo não leva hífen. |

**Perguntas ao autor:**
1. Seção 08: "O pipeline em Python do MVP provou a solidez matemática do motor: 100% de precisão e zero execuções incorretas." A página insiste que a métrica não é precisão (Precision@K) e sim acurácia do router e Hit Rate@2 (B3.04, B5.03). Qual métrica é a pretendida? Sugestão: "100% de acurácia do router, 100% de Hit Rate@2 e zero execuções incorretas no benchmark".
2. Branch main, "Prós": "zero execuções incorretas garantidas formalmente" e "Proteção comprovada contra danos ao cadastro". A seção Limitações diz que a guarda de direção só cobre 59 das 285 ferramentas e que o resultado vale "neste benchmark, não para produção". Os dois prós precisam de qualificador, por exemplo "no benchmark" e "nas ferramentas com `mode` declarado"? O mesmo vale para o cartão do ADR-008: "queries de leitura nunca executam tools de escrita".
3. Os números de latência variam entre "SLAs sub-2ms" (hero), "p99 < 1-3 ms" (seção 08 e ADR-009) e "< 1 ms" (tabela Rust). É intencional (alvos diferentes)? Os números são protegidos (B0), por isso não alterei.
4. Cartão do retriever (seção 06): "Combinação de score BM25F: score = 0.5·lexical + 0.5·intent". A técnica 3 descreve cosseno sobre TF-IDF. A main usa BM25F de fato?
5. ADR-005: "em conformidade com LGPD, PCI-DSS v4.0 e BACEN 4893". É afirmação de conformidade sem verificação citada (B5.02). Seria melhor dizer "projetado para atender a…" ou "alinhado a…"?

**Sugestões (Baixa, não aplicadas):**
- Título da seção 01, "o que foi pedido num cérebro de agente bancário": a construção "pedido num" soa estranha; "o que foi pedido para o cérebro de um agente bancário" lê melhor.
- "revelou a contagem com um `1 skipped` a mais": o "um" ao lado de "1" causa estranheza; "revelou um `1 skipped` a mais na contagem" ou "revelou mais um teste pulado (`1 skipped`)". Não alterei porque a leitura pretendida pode ser a do original.
- Separador decimal: os cartões da barreira (seção 05) e a tabela da seção 10 usam ponto ("0.75", "0.47"), enquanto a seção 07 usa vírgula ("0,75"). Uniformizar em vírgula na prosa (B3.07), mantendo o ponto no código.
- "o custo de uma execução incorreta em produção supera infinitamente o custo da governança" e "é dano irreversível ao cliente": hipérboles (B5.01).
- "Duas rodadas foram impulsionadas por revisão adversarial externa, onde cada apontamento…": "em que cada apontamento".
- Hífens com prefixo: "Sub-milissegundo" e "sub-milissegundos" (tabela Rust × Go), "multi-campo", "multi-linguagem", "auto-sujava". A norma pede "submilissegundo", "multicampo", "multilinguagem" e "autossujava"; alguns aparecem em títulos e rótulos, por isso deixei para o autor decidir.

**Fora do escopo:**
- Consultas do dataset citadas literalmente (B0.03): "Qual e o email cadastrado na minha conta?" (sem acento em "é") e "Quero mudar o e-mail vinculado a minha conta" (sem crase). São entradas reais do benchmark, por isso ficam como estão. Observação: na técnica 4, a mesma consulta aparece em prosa com crase ("vinculado à minha conta"), diferente do dataset.
- Bloco `AEO-BODY` (fonte: `scripts/seo/pages.mjs`): "Economia de custo real — 77,8% de economia com 100% de sucesso nas execuções" e "Como alcançar 100% de sucesso…" têm o mesmo problema de alcance da pergunta 2.
- Bloco `EDITORIAL` (fonte: `scripts/editorial/editorial.data.mjs`): nada a apontar.

---

#### `src/curiosidade-e-investigacao.html`
- **Perfil:** Editorial. É um ensaio pessoal com respaldo em literatura; a voz autoral está protegida (B7.06, B7.07).
- **Resultado:** sem alterações: o texto já separa experiência, literatura e hipótese e não tem erro objetivo. Ficam 2 perguntas e 2 sugestões.

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| CUR-1 | B5.02 / integridade de citação | Alta | Média | Ref. 6: "Bastani, S. et al. (2025). Sobre efeitos de IA generativa sem guardrails no desempenho de aprendizagem. PNAS." | (pergunta) | O título está em português e parece descrição, não o título do artigo. A inicial do primeiro autor também pode estar errada (o estudo conhecido de PNAS 2025 tem Hamsa Bastani como primeira autora). A Nota editorial afirma que "nenhuma referência foi inventada". |
| CUR-2 | B5.02 / integridade de citação | Alta | Média | Ref. 15: "Theobald, M. (2021). Sobre feedback e engajamento de audiência em contextos de aprendizagem pública." | (pergunta) | Faltam o título real e o veículo. Do jeito que está, o leitor não consegue localizar a fonte. |

**Perguntas ao autor:**
1. CUR-1: confirmar autoria e título original da referência 6.
2. CUR-2: completar título e veículo da referência 15, ou retirá-la se não for possível identificá-la.

**Sugestões (Baixa, não aplicadas):**
- "A tecnologia reduziu, de forma real e mensurável, o custo de manipular informação": "mensurável" sem medida citada; aceitável como voz de ensaio.
- "Fluência pode ser confundida com precisão com uma facilidade desconcertante": duas preposições "com" seguidas; "Fluência pode ser confundida com precisão, e com uma facilidade desconcertante".

**Fora do escopo:** bloco `AEO-BODY` (fonte: `scripts/seo/pages.mjs`). Nele, "a ilusão de profundidade explicativa é o risco central do uso de IA para aprender" é mais forte que o corpo do ensaio.

---

#### `src/termos.html`
- **Perfil:** Técnico (texto jurídico). Não mudei obrigações, prazos nem alcance; as correções são de grafia, gramática e sigla.
- **Resultado:** 4 correções · 4 perguntas · 4 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| TER-1 | Gramática | Média | Alta | "…(Propriedade Industrial), sendo titularidade exclusiva dos provedores…" | "…sendo de titularidade exclusiva dos provedores…" | Falta a preposição: o conteúdo "é de titularidade" de alguém. |
| TER-2 | Grafia (Acordo de 1990) | Média | Alta | "licença não-exclusiva" | "licença não exclusiva" | O "não" com valor de prefixo não leva hífen. |
| TER-3 | Grafia (Acordo de 1990) | Média | Alta | "Tolerância não-renúncia: a não-exigência imediata" | "Tolerância não renúncia: a não exigência imediata" | Mesmo motivo de TER-2. |
| TER-4 | B3.05 Sigla | Média | Alta | "entrando em contato com o DPO indicado na Política de Privacidade" (seção 9) | "…com o Encarregado (DPO) indicado…" | Primeira ocorrência da sigla na página. A expansão já usada pela própria página na seção 19 ("Encarregado (DPO)") foi trazida para cá. |

**Perguntas ao autor:**
1. A seção 2 e a seção 19 estão publicadas com "CPF/CNPJ: [PLACEHOLDER]" e "Endereço: [PLACEHOLDER — endereço completo com CEP]". A identificação do fornecedor é exigida em comércio eletrônico (Decreto 7.962/2013). Esses dados vão ser preenchidos, ou a linha deve sair?
2. O texto usa "provedores" no plural ("titularidade exclusiva dos provedores", "isentar os provedores"), e o histórico de versões cita "identificação dual de provedores", mas a seção 2 identifica um só provedor e a introdução usa "nós". Há dois provedores?
3. "Mudanças materiais serão sinalizadas…" é calque de "material changes". Em português jurídico seria "relevantes" ou "substanciais". Como o termo define quando o aviso de 30 dias se aplica, não alterei. Qual é o termo pretendido?
4. "Conteúdo gerado por IA é rotulado de forma identificável" e "Em conformidade com o EU AI Act": afirmações de conformidade (B5.02). Estão verificadas para todas as funcionalidades citadas?

**Sugestões (Baixa, não aplicadas):**
- "Envidamos melhores esforços" → "Envidamos os melhores esforços"; "ininterruptibilidade" → "funcionamento ininterrupto".
- "submeter … eventual conflito a câmara de mediação privada" → "a uma câmara".
- "Na máxima extensão permitida pela legislação aplicável": calque do inglês; aceitável no gênero.
- Lista "É vedado, exemplificativamente:" mistura substantivos ("Scraping…", "Engenharia reversa…") e verbo ("Publicar, transmitir…"); paralelismo.

**Fora do escopo:** nada (a página não tem blocos gerados).

---

#### `src/cookies.html`
- **Perfil:** Técnico (texto jurídico e técnico). Não mudei obrigações, prazos nem alcance.
- **Resultado:** 4 correções · 3 perguntas · 2 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| COO-1 | B1.02 / B2.01 Agente do infinitivo | Média | Alta | "Operadores como Google e Meta podem definir cookies adicionais ao acessar conteúdos integrados" | "…cookies adicionais quando você acessa conteúdos integrados" | Pela regra do sujeito do infinitivo, quem "acessa" seriam Google e Meta. Quem acessa o conteúdo integrado é o usuário. |
| COO-2 | Gramática (objeto ausente) | Média | Alta | "Se seu navegador envia o sinal Global Privacy Control (GPC), respeitamos automaticamente como opt-out" | "…respeitamos esse sinal automaticamente como opt-out" | "Respeitar" é transitivo e estava sem objeto. |
| COO-3 | B3.05 Sigla | Média | Alta | "informe ao DPO." | "informe ao Encarregado (DPO)." | É a única ocorrência na página, sem expansão; usei a forma dos Termos. |
| COO-4 | Grafia (Acordo de 1990) | Média | Alta | "categorias não-essenciais" | "categorias não essenciais" | O "não" com valor de prefixo não leva hífen. |

**Perguntas ao autor:**
1. **Prioridade alta.** O aviso "Auditoria pendente" está publicado e diz: "Esta lista representa o conjunto típico esperado… Antes de publicar, recomenda-se varredura via DevTools…". A página se apresenta como "Listagem nominal", mas admite que a lista não foi conferida (B5.02). Isso parece nota interna que foi ao ar. A auditoria foi feita? Se foi, o aviso sai; se não, a página precisa dizer que a lista é provisória.
2. "Operadores como Google e Meta": na LGPD, "operador" é termo definido (quem trata dados em nome do controlador). Para cookies próprios desses provedores, eles atuam como controladores, e a frase seguinte diz que "são responsáveis por seus próprios cookies". O termo "Operadores" é intencional?
3. "Mudanças materiais reabrem o banner": mesma questão de TER-3 ("relevantes" ou "substanciais").

**Sugestões (Baixa, não aplicadas):**
- Siglas sem expansão para o público geral: ANPD, GDPR, GPC (expandida), ePrivacy. Sugiro expandir ANPD e GDPR na primeira ocorrência.
- "Tags de análise e marketing só disparam após consentimento explícito ou só enviam pings sem cookies": a repetição de "só" dificulta a leitura. Proposta: "Antes do consentimento explícito, as tags de análise e marketing não disparam ou enviam apenas pings sem cookies (modo de modelagem)." Não apliquei para não arriscar mudar o comportamento descrito.

**Fora do escopo:** nada (a página não tem blocos gerados). Os nomes, domínios e durações da tabela de cookies são dados protegidos (B0.01).

---

## Limitações
- A revisão foi feita por modelo de linguagem, por leitura. Não substitui revisão humana nem revisão jurídica de `termos.html` e `cookies.html`.
- Não rodei `verificar.py --comparar`. As alterações não tocam código, números, identificadores nem qualificadores; conferi o diff manualmente.
- O gêmeo `/en/` não foi regenerado (o brief proíbe rodar i18n aqui). Ele precisa ser sincronizado depois do merge.

### Lote D — revisão PT-BR Controlado (intervenção mínima)

Método: extraí o texto visível de cada página (sem `<head>`, `<script>`, `<style>` e sem os blocos gerados), li por inteiro e conferi cada trecho alterado com `grep -rnF` em `tests/` e `scripts/` antes de editar. Não rodei o `verificar.py`; a leitura foi manual. Nenhuma edição tocou em `<head>`, atributos, CSS, JS ou blocos `AEO`, `AEO-BODY` e `EDITORIAL`.

Total do lote: 18 correções, 15 perguntas ao autor.

---

#### `src/agent-ready.html`
- **Perfil:** Híbrido. A página mistura argumentação, tutorial com etapas e código real.
- **Resultado:** 3 correções · 4 perguntas · 4 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| AR-1 | B2.01 pronome com antecedente errado | Média | Alta | "Cada uma dessas perguntas tem hoje um padrão aberto que a responde. Agent Readiness é implementá-las de forma…" | "…Agent Readiness é implementar esses padrões de forma…" | "-las" retoma "perguntas"; o que se implementa são os padrões, não as perguntas. |
| AR-2 | B3.04 um conceito, um termo | Média | Média | "As outras oito camadas são estáticas… WebMCP é a única em tempo de execução" | "Os outros oito checks são estáticos… WebMCP é o único em tempo de execução" | Na página, "camada" é termo da arquitetura de cinco camadas. Aqui o texto fala dos nove checks da tabela 6.4, e "oito camadas" contradiz "cinco camadas". |
| AR-3 | Regência (infinitivo com sujeito) | Média | Média | "Esta é a seção que justifica a página existir." | "Esta é a seção que justifica a existência da página." | A construção "justifica a página existir" não é padrão: lida literalmente, "a página" vira objeto de "justifica". |

**Perguntas ao autor:**
1. Terceiro ou quarto consumidor? A abertura diz "um terceiro consumidor" (depois de humanos e buscadores), mas a seção 04 diz "Você acabou de aceitar que existe um quarto consumidor da Web", de acordo com a tabela de quatro camadas (humano, crawler, motor de resposta, agente). As duas contagens se contradizem (B3.04). Não alterei: `tests/agent-ready.spec.js:28` prende "terceiro consumidor" em `.ar-hero__thesis`, e o bloco gerado AEO-BODY repete "terceiro". Se o autor escolher "terceiro", basta ajustar a frase da seção 04.
2. "197 KB… 3,7 KB. São 52 vezes menos bytes" (seções 01 e 08). 197 ÷ 3,7 dá cerca de 53. O "52" vem de valores sem arredondamento? Número protegido (B0), não alterado.
3. Absolutos sem fonte (B5.01/B5.03): "É também a única camada que funciona para recursos que não são HTML" (linkHeaders; o `/.well-known/` também atende recursos que não são HTML); "Esta é a camada mais barata… e a mais ignorada por quem implementa"; "é onde a maioria dos sites está sem ter feito nada" (nível 1); "O erro mais comum de diagnóstico nesta jornada". Manter, dar a fonte ou suavizar ("uma das mais", "um erro comum")?
4. "a regressão virou um caso de teste — que é o único desfecho que impede o incidente de acontecer de novo" (B5.01). O teste reduz o risco de recorrência; "impede" e "único" são mais fortes do que a evidência. Manter?

**Sugestões (Baixa, não aplicadas):**
- "Não é um arquivo que você comita": anglicismo. Pode ficar por voz autoral; alternativa: "que você versiona" ou "que entra no commit".
- "Porque não existe um agente. Existem muitos": a primeira frase, isolada, pode ser lida como "não há nenhum agente". Alternativa: "Porque não existe um único agente."
- "obriga a responder, de forma verificável, as quatro perguntas": a regência culta é "responder às quatro perguntas", e a frase seguinte da página já usa "responde bem a essas quatro perguntas".
- "Ele parseia HTML de aplicação e torce": informal, mas com função retórica. Manter.

**Fora do escopo:** o bloco AEO-BODY (linhas 2179 a 2238; fonte `scripts/seo/pages.mjs` via `scripts/seo/build-aeo.mjs`) tem um defeito de renderização: no FAQ "O que é Markdown para agentes?", o `*/*;q=0.8` do texto-fonte virou `<em>/</em>;q=0.8`, porque os asteriscos foram lidos como itálico. A versão visível diz "um navegador manda / ;q=0.8". Esse bloco também repete "terceiro consumidor" (ver a pergunta 1).

---

#### `src/aprendizagem-autorregulada-artigo.html`
- **Perfil:** Híbrido. Revisão científica com tese, matriz de evidências, protocolo em passos e ficha de estudo.
- **Resultado:** 2 correções · 1 pergunta · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| AAA-1 | Grafia | Média | Alta | "reestude o elo mínimo e espaçe uma nova tentativa" | "…e espace uma nova tentativa" | O verbo "espaçar" troca ç por c antes de "e" ("espace"). |
| AAA-2 | Regência (complemento comum a verbos de regências diferentes) | Média | Alta | "recuperar e depois explicar se associa ou causa melhora em recordação, compreensão, integração ou transferência." | "…se associa a melhora em recordação, compreensão, integração ou transferência, ou causa essa melhora." | "Associar-se" pede "a" e "causar" é transitivo direto, então os dois verbos não podem dividir o mesmo complemento. A correção mantém as duas leituras ("associa-se" e "causa"). |

**Perguntas ao autor:**
1. O texto alterna "r = .178", "g=.25" e "g=.55" (ponto decimal, sem zero, na seção B.9 e na matriz) com "r = 0,178" e "g = 0,55" em outras seções. Pela regra B3.07, a forma em português é "0,178". Números são protegidos (B0), então não alterei. Uniformizar?

**Sugestões (Baixa, não aplicadas):**
- "Porém, uma explicação incompleta pode gerar nova busca em alguns contextos, mas não seletivamente em todos" (B.9): "Porém… mas" são dois conectivos adversativos na mesma frase. Basta um.
- "Há estudos favoráveis a expectativa de ensinar e a ensino em vídeo": "à expectativa… ao ensino" lê melhor, mas a forma sem artigo é aceitável.
- O texto mantém muitos termos em inglês em itálico (information foraging, scaffolding, retrieval practice). Fica assim: é escolha deliberada (B3.06) e o glossário conceitual está na seção B.

**Fora do escopo:** o bloco AEO-BODY (linhas 295 a 330), sem achados. As referências comentadas (seção J) são citações bibliográficas (B0.03). Os mesmos dois erros (AAA-1 e AAA-2) existem em `public/aprendizagem-autorregulada-artigo.md`, que está fora do meu lote. Convém corrigir lá também, para o `.md` não divergir do HTML.

---

#### `src/service-operations-2-0.html`
- **Perfil:** Editorial. É uma proposta executiva e persuasiva, com métricas e pedido implícito de adoção.
- **Resultado:** 7 correções · 5 perguntas · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| SO2-1 | B1.02 agente impossível | Média | Alta | "É uma conta PJ que não consegue abrir" | "É uma conta PJ que não se consegue abrir" | A conta aparece como quem "não consegue". Quem não consegue abrir a conta é o executivo. Usei a forma impessoal para não inventar o agente. |
| SO2-2 | B1 frase sem verbo finito | Média | Alta | "Nossa malha mestra (Management Mesh) atuando transversalmente para integrar…" | "Nossa malha mestra (Management Mesh) atua transversalmente para integrar…" | O gerúndio deixava a frase sem verbo principal. |
| SO2-3 | Grafia (Acordo de 2009) | Média | Alta | "co-criação de valor" | "cocriação de valor" | O prefixo "co" se aglutina sem hífen. |
| SO2-4 | Regência | Média | Alta | "Assista como transformamos a sustentação reativa…" | "Veja como transformamos a sustentação reativa…" | "Assistir", no sentido de ver, pede "a"; "Veja como" mantém o sentido sem a construção irregular. |
| SO2-5 | B3.01 palavra trocada | Média | Média | "Interagimos de forma cirúrgica na infraestrutura e nos componentes de negócios" | "Intervimos de forma cirúrgica na infraestrutura…" | "De forma cirúrgica" e "na infraestrutura" pedem "intervir"; "interagir" não rege "em" nesse sentido. Ver a pergunta 5. |
| SO2-6 | B2.01 pronome ambíguo | Média | Alta | "O tablet é a principal ferramenta de trabalho do nosso executivo. Se ele trava, o faturamento trava." | "…Se o tablet trava, o faturamento trava." | "Ele" pode retomar "tablet" ou "executivo" (o antecedente mais próximo). O sentido aponta para o tablet. |
| SO2-7 | B3.05 sigla × nome por extenso | Média | Alta | "Estratégia de integração contínua (CI/CD)" | "Estratégia de integração e entrega contínuas (CI/CD)" | A sigla CI/CD tem duas partes; o nome por extenso só cobria o CI. |

**Perguntas ao autor:**
1. **B5.02, a mais importante:** a seção "Métricas de Performance" diz "Resultados diretos da aplicação do modelo… na nossa balança comercial" e "Recuperamos horas vitais no processo de venda", mas a nota logo abaixo diz que os "KPIs representam metas projetadas baseadas em benchmarks". A página apresenta como resultado obtido o que a própria nota chama de meta. Sugestão: "Metas projetadas do modelo…" e "Projetamos recuperar…". O painel "Monitoramento" (94%, 88%, 99%, "99.95% (Missão Crítica)") também não diz se é medição ou meta.
2. Absolutos sem fonte (B5.01): "garantir que o executivo comercial nunca perca uma venda", "Autonomia total da equipe… sem dependência de fornecedores externos", "ele é erradicado na raiz para não se repetir", "zero regressão", "garante a resiliência total do faturamento", "Desenvolvimento focado 100% em entrega pragmática". Manter como meta declarada ou suavizar ("reduzir", "minimizar")?
3. B3.04: o mesmo papel aparece como "executivo comercial", "consultor" e "Consultores de Campo". São o mesmo papel? Se forem, convém escolher um termo.
4. "Por que o suporte tradicional está matando seu faturamento comercial?" e "concentramos o poder de fogo ali" são títulos de efeito. Pela voz "engenharia, não marketing" do site, vale manter?
5. SO2-5: confirmar que a intenção era "intervimos" (corrigi com confiança Média).

**Sugestões (Baixa, não aplicadas):**
- "99.95%": em texto em português, o decimal é com vírgula ("99,95%"). Número protegido.
- "desenhada para faturamentos Críticos": a maiúscula em "Críticos" não tem função.
- "visando a minimização do tempo de espera em campo": nominalização. Alternativa: "para minimizar o tempo de espera em campo".

**Fora do escopo:** o bloco AEO-BODY (linhas 1646 a 1676; fonte `scripts/seo/pages.mjs`) tem "antecipa problemas antes do cliente sentir". Ali há um pleonasmo (antecipar… antes) e a contração "do cliente" antes de sujeito de infinitivo; a forma culta é "antes de o cliente sentir". Nenhuma organização real é citada no texto visível.

---

#### `src/engenharia-agentes-ia.html`
- **Perfil:** Híbrido. Material didático com princípios, código, quiz e glossário.
- **Resultado:** 5 correções · 3 perguntas · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| EAI-1 | Grafia (Acordo de 2009) | Média | Alta | "Não-determinismo é defeito." | "Não determinismo é defeito." | "Não", usado como prefixo, dispensa o hífen. |
| EAI-2 | Grafia (Acordo de 2009) | Média | Alta | "Sub-engenharia do crítico" | "Subengenharia do crítico" | "Sub" só leva hífen antes de b, h ou r. ("Sobre-engenharia" está correto: vogal igual.) |
| EAI-3 | Grafia (Acordo de 2009) | Média | Alta | "Pesquisa aberta multi-passos" | "Pesquisa aberta multipassos" | "Multi" se aglutina, exceto antes de h ou i. |
| EAI-4 | Regência (passiva de verbo transitivo indireto) | Média | Alta | "No instante em que ele é promovido — passa a ser dependido por usuários, dinheiro ou dados — a promoção…" | "…promovido — quando usuários, dinheiro ou dados passam a depender dele — a promoção…" | "Depender de" não admite voz passiva ("ser dependido"). O conteúdo ficou o mesmo. |
| EAI-5 | Grafia | Média | Alta | "a "caixa preta" é o maior bloqueador" | "a "caixa-preta" é o maior bloqueador" | O substantivo composto leva hífen; o resto do site já usa "caixa-preta". |

**Perguntas ao autor:**
1. **B5, a mais importante:** a página diz que a XAI deve ser gerada "por regras determinísticas… nunca com uma segunda chamada de LLM" (capítulo 09). Mas o estudo de caso diz "o LLM atua só em M2 e M5" e M5 é a XAI (capítulo 10, "Estudo de caso", "Pipeline determinístico (M1→M5)"). O diagrama "Como funciona" diz ainda que o LLM é "a única etapa de IA no caminho". As três afirmações não fecham juntas. Qual é a correta para o SocialSelling?
2. B3.04 e B5: a caixa de Evals diz "Mantém o 'zero IA no caminho crítico'", mas a tese da página é "muito pouca IA no caminho crítico", e o próprio pipeline tem o LLM em M2. "Zero" ou "muito pouca"?
3. "O risco operacional mais insidioso" (glossário, "Vazamento de modo") e "a 'caixa-preta' é o maior bloqueador de adoção corporativa de IA" são absolutos sem fonte (B5.01). Manter?

**Sugestões (Baixa, não aplicadas):**
- "nunca controla o fluxo de controle" (P1): repetição. Alternativa: "nunca controla o fluxo".
- "Inclui também sanitizar input adversarial antes do Cérebro" (capítulo 05): falta sujeito. Alternativa: "A solução inclui também…".
- "score 0.847" e "threshold de 0.7" no quiz: ponto decimal em prosa. O quiz imita a saída de um algoritmo, então pode ficar.

**Fora do escopo:**
- "delega sub-tarefas" (quiz, pergunta 1, opção c) deveria ser "subtarefas", mas o texto está preso a `tests/fixtures/quiz-questions.json:12`. Não alterei. Corrigir a fixture e o HTML juntos.
- O bloco EDITORIAL (linhas 448 a 465; fonte `scripts/editorial/editorial.data.mjs`) não tem achados.
- O bloco AEO-BODY (linhas 1494 a 1537; fonte `scripts/seo/pages.mjs`) escreve "o não-determinismo fica isolado", com o mesmo hífen indevido de EAI-1.

---

#### `src/aprendizagem-autorregulada.html`
- **Perfil:** Editorial. Landing de divulgação científica para público geral.
- **Resultado:** 1 correção · 1 pergunta · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| AA-1 | Grafia ("porquê" substantivo) | Média | Alta | "Explique o “como” e o “por quê”" | "Explique o “como” e o “porquê”" | Com artigo, a palavra é substantivo e se escreve junta, como a própria página faz no FAQ ("o como e o porquê"). |

**Perguntas ao autor:**
1. B5.01/B5.03: "Descubra o que a ciência realmente comprova sobre como a curiosidade, a busca focada, a prática de recuperação e a autoexplicação constroem um conhecimento profundo e duradouro" e o título "O que a ciência comprova". A mesma página diz que nenhum estudo testou o ciclo completo, que a curiosidade não tem efeito causal geral demonstrado e que a autoexplicação tem evidência "moderada". "Comprova" é mais forte do que o conteúdo da página. Alternativa: "o que a ciência sabe sobre…".

**Sugestões (Baixa, não aplicadas):**
- "Tentar lembrar de algo sem ler o material": a forma culta é "lembrar algo" ou "lembrar-se de algo". A forma coloquial é aceitável aqui.
- "é uma síntese das melhores práticas cognitivas": "melhores" é um absoluto leve.
- "a releitura pode vencer no teste imediato mas perde": falta vírgula antes de "mas" (está no bloco gerado; ver abaixo).

**Fora do escopo:** o bloco AEO-BODY (linhas 445 a 480; fonte `scripts/seo/pages.mjs`), sem achados de severidade Média. O mesmo "o “por quê”" provavelmente existe em `public/aprendizagem-autorregulada.md`, que está fora do meu lote (o grep encontrou o arquivo).

---

#### `src/exemplopdi.html`
- **Perfil:** Editorial. Plano de desenvolvimento individual (documento de carreira).
- **Resultado:** sem alterações. O texto visível no HTML é curto e não tem problema de severidade Média; quase todo o conteúdo (competências, metas SMART, exemplos STAR) está no objeto `pdiData` dentro de `<script>`, que o brief proíbe editar. 1 pergunta · 2 sugestões.

**Perguntas ao autor:**
1. **Restrição legal, verificar:** as strings em `<script>` citam "Liderança Técnica de Squads Salesforce (Rede, 2018–presente)", "sistemas Core Rede", "CINVEST" e "Domicílio Bancário". "Rede" é o nome de uma empresa real de adquirência ligada ao Itaú. A página não cita "Itaú" nem "IU Conecta" textualmente, mas o nome identifica o empregador. Confirmar se isso é aceitável segundo a restrição de não referenciar o Itaú. Não alterei, porque é conteúdo em JS.

**Sugestões (Baixa, não aplicadas):**
- "(e.g., 'Site Reliability Practitioner', 'Comunicação Executiva')": em texto em português, prefira "por exemplo," ou "ex.:".
- "para maximizar o impacto e acelerar o crescimento profissional" (subtítulo): formulação genérica de efeito. Manter por voz autoral.
- Em JS (só registro): "estabelece-se como referência técnica" não tem sujeito claro (quem se estabelece?); há aspas simples como ênfase ('playbook', 'thought leadership'); "Build&Run" aparece com e sem espaço ("Build & Run").

**Fora do escopo:** todo o conteúdo do objeto `pdiData` em `<script>`, porque o brief proíbe editar JS.

---

## Limitações
- Revisão feita por modelo de linguagem, por leitura. Não substitui revisão humana e não prova ausência de ambiguidade.
- Não rodei o `verificar.py --comparar`. As alterações não tocam em números, código, identificadores nem qualificadores; conferi isso no diff.
- Não rodei o gate, o Playwright nem o `i18n:sync`. Os espelhos `/en/` destas cinco páginas ficaram desatualizados até alguém rodar a sincronização.

### Lote E — revisão PT-BR Controlado (intervenção mínima)

Método: extração do texto visível de `<body>` (sem `<script>`, `<style>` e sem os blocos gerados), leitura contextual e grep em `tests/` e `scripts/` antes de cada alteração. Nenhuma das páginas cita Itaú ou IU Conecta (as ocorrências do grep eram "elicitação" e "capacitação"). O script `verificar.py` não foi executado; as sinalizações vieram da leitura.

#### `src/formulacao-de-problemas.html`
- **Perfil:** Editorial — artigo argumentativo com tese, evidências e conclusão; as fórmulas e tabelas servem ao argumento.
- **Resultado:** 3 correções · 1 pergunta · 2 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| FP-1 | B3.04 (concordância de gênero do termo) | Média | Alta | "a mesma solutioneering que o portão entre S₃ e S₄ existe para expor" | "o mesmo solutioneering que o portão entre S₃ e S₄ existe para expor" | Na Figura 3 a página usa "o solutioneering costuma entrar sem ser convidado". O mesmo termo aparecia com dois gêneros. |
| FP-2 | B3.01 (calque do inglês "address") | Média | Alta | "quatro das seis dimensões não são endereçadas por probabilidade" | "quatro das seis dimensões não são tratadas por probabilidade" | "Endereçar" no sentido de "tratar" é decalque do inglês; o resto do artigo usa "tratar" ("incertezas de alto impacto tratadas"). |
| FP-3 | regência / B2 (sentido) | Média | Alta | "Difícil quantificar sem reduzir a votação" | "Difícil quantificar sem reduzir a uma votação" | Sem a preposição, a frase lê "sem diminuir a votação". O sentido pretendido é "sem reduzir a legitimidade a uma votação". |

**Perguntas ao autor:**
1. Lide do herói: "A parte mais consequente de uma decisão". Em PT-BR, "consequente" tem como sentido principal "coerente, lógico"; o sentido de "que tem grandes consequências" vem do inglês "consequential". Prefere "A parte de maior consequência de uma decisão"? Não alterei (confiança Baixa: o uso já aparece na imprensa brasileira).

**Sugestões (Baixa, não aplicadas):**
- A Figura 6 diz "Acordo pode refletir conformidade, não verdade"; o cartão da dimensão 4 diz "não convergência de entendimento". Vale usar a mesma formulação nos dois lugares (B3.04).
- "e ganho esperado de investigar mais já não compensando o custo" (Suficiência decisional e glossário): o gerúndio no fim da enumeração quebra o paralelismo; "e o ganho esperado de investigar mais já não compensa o custo" lê melhor.

**Fora do escopo:** blocos AEO (linhas 23–310), EDITORIAL (413–429) e AEO-BODY (1476–1519), gerados por `scripts/seo/build-aeo.mjs` e `scripts/gen-editorial.mjs`. Não encontrei problema de severidade Média neles.

#### `src/proposta-engenharia-reversa.html`
- **Perfil:** Híbrido — proposta executiva com argumentação e com descrição técnica (Salesforce, pipeline, critérios de pronto).
- **Resultado:** 2 correções · 5 perguntas · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| PER-1 | grafia (VOLP) | Média | Alta | "Para evitar falsos-positivos, a IA analisa" | "Para evitar falsos positivos, a IA analisa" | "Falso positivo" se escreve sem hífen. |
| PER-2 | concordância | Média | Alta | "em Trigger Handlers complexas de 20.000+ linhas" | "em Trigger Handlers complexos de 20.000+ linhas" | "Handler" é masculino ("o handler"); o adjetivo concorda com ele. |

**Perguntas ao autor:**
1. "mitigando 99% do risco de alucinações" (aviso de governança e cartão "Sólido & Comprovado"): qual é a fonte do número? Sem fonte, sugiro "reduz o risco de alucinações" (B5.01, B5.02).
2. "a paridade de negócio está garantida" (Testes BDD de Paridade): os testes cobrem só os cenários extraídos; "garantida" é absoluto. Aceita "a paridade de negócio fica demonstrada para os cenários cobertos"? (B5.01, B5.03).
3. "Cada comportamento vinculado a uma fonte de evidência inquestionável" (Definition of Done): "inquestionável" é absoluto e contradiz a revisão humana obrigatória do item seguinte. Aceita "verificável"? (B5.01).
4. "o projeto atestará inequivocamente seu valor" (Recomendação Final): absoluto sem critério. (B5.01).
5. "Navegação local reduz custos drasticamente" e "funciona brilhantemente em refatorações": há medição que sustente? (B5.02).

**Sugestões (Baixa, não aplicadas):**
- "o 'Por quê' da regra existir": a norma culta prefere "de a regra existir".
- "regras que sustentam o negócio mas que ninguém escreveu": falta vírgula antes de "mas". Está no bloco AEO-BODY (ver Fora do escopo).
- "tagueadas como 'Caixa Preta'": "marcadas como" evita o anglicismo.

**Fora do escopo:** blocos AEO (240–476) e AEO-BODY (1591–1630), gerados por `scripts/seo/build-aeo.mjs` a partir de `scripts/seo/pages.mjs`. Neles "falsos-positivos" aparece com hífen 2 vezes no texto visível (linhas 1599 e 1622) e mais 2 vezes no JSON-LD; corrigir em `scripts/seo/pages.mjs` (linhas 337, 347 e 352) para manter a página coerente com PER-1.

#### `src/develop-engineering.html`
- **Perfil:** Híbrido — artigo técnico que explica conceitos para público misto e descreve mecanismos verificáveis (contratos, gateway, registros de evidência).
- **Resultado:** sem alterações: o texto já passou por revisão de clareza (termos explicados, ressalvas e selos de certeza explícitos), e o único achado de severidade Média está preso a teste.

**Perguntas ao autor:**
1. O H1 "Deterministic Grounding para Engenharia Agentic de Software" mistura "Agentic" (inglês) com o resto em português, enquanto o selo acima diz "Engenharia Agêntica" (B3.04). Não alterei porque `tests/develop-engineering.spec.js:14` e `scripts/seo/pages.mjs:14-15` dependem do texto exato. Se quiser "Agêntica", é preciso mudar os três lugares juntos.

**Sugestões (Baixa, não aplicadas):**
- A página alterna "veredito" (Cena 03, glossário) e "veredicto" (Cena 06, filtro da tabela). As duas grafias são válidas; vale escolher uma.

**Fora do escopo:** H1 preso a teste (acima); blocos AEO (497–747), EDITORIAL (834–851) e AEO-BODY (1748–1791).

#### `src/especificacao-conversacional.html`
- **Perfil:** Híbrido — proposta de workflow com argumentação, tabelas normativas (matriz de autoridade, política de divergência) e exemplos de código.
- **Resultado:** sem alterações: não encontrei ocorrência de severidade Média com confiança suficiente; o texto já separa fato, hipótese e proposta e cita fontes.

**Perguntas ao autor:**
1. A Figura 7 tem duas linhas quase iguais: "Critérios de aceitação" (autoridade: Negócio e engenharia; IA propõe formulações) e "Critérios de aceite (o resultado esperado)" (autoridade: Negócio e engenharia; IA gera candidatos). A seção TDD define "critérios de aceite" como a fonte do resultado esperado. Os dois termos nomeiam coisas diferentes? Se sim, vale uma frase que distinga; se não, as linhas podem ser fundidas (B3.04, confiança Baixa).

**Sugestões (Baixa, não aplicadas):**
- "em quatro equipes de IBM e Microsoft" → "em quatro equipes da IBM e da Microsoft".

**Fora do escopo:** blocos AEO (22–307), EDITORIAL (419–427) e AEO-BODY (1337–1380). Código e YAML das Figuras 6 e 10 são protegidos (B0).

#### `src/capacidade-antes-do-acesso.html`
- **Perfil:** Editorial — revisão crítica de literatura com tese, matriz de evidências e conclusão calibrada.
- **Resultado:** sem alterações: o texto já calibra qualificadores e alcance; os achados são números ou termos que dependem do autor.

**Perguntas ao autor:**
1. Tabela 5, linha da política norueguesa: "Domínio B, 1º–19º ano". O sistema norueguês vai do 1º ao 13º ano (6 a 19 anos de idade), e a Tabela 3 cobre de 0 a 19 anos. O correto é "1º–13º ano", "6–19 anos" ou "0–19 anos"? E "Domínio B" sozinho não cobre o 8º ano em diante. Número protegido (B0, B3.07): não alterei.
2. Tabela 5, linha do EU AI Act: "Literacia obrigatória". "Literacia" é a forma do português europeu (é a da versão portuguesa do regulamento). O resto da página usa "Alfabetização em IA" (Tabela 1). Prefere manter o termo do regulamento ou usar "Alfabetização em IA obrigatória"? (B3.04).

**Sugestões (Baixa, não aplicadas):**
- "quasi-experimental" (3 ocorrências) está em grafia inglesa; em PT-BR acadêmico, a forma usual é "quase-experimental".
- "Componentes compostos medeiam relações de competência" (Ning et al., Tabela 5) é vago para quem não leu o estudo.

**Fora do escopo:** blocos AEO (23–302) e AEO-BODY (445–492).

#### `src/boutique-empresarial-showcase.html`
- **Perfil:** Híbrido — vitrine técnica de arquitetura com texto promocional e descrição de infraestrutura.
- **Resultado:** 2 correções · 4 perguntas · 1 sugestão

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| BES-1 | B5 / B2.04 (sentido invertido) | Alta | Média | "servidos globalmente via CloudFront CDN com indevida expiração de cache por invalidadores." | "servidos globalmente via CloudFront CDN com a devida expiração de cache por invalidações." | "Indevida" quer dizer "imprópria"; a frase dizia que o cache expira de forma errada, o contrário do argumento da seção. "Invalidadores" não é termo usado; o mecanismo do CloudFront chama-se "invalidação". Confiança Média: ver pergunta 1. |
| BES-2 | B3.01 (calque de "copy") | Média | Alta | "regras de escopo para auditoria, testes e cópias." | "regras de escopo para auditoria, testes e redação de textos." | "Cópias" significa "duplicatas"; o subagente citado é o `copy-writer`, que redige textos. |

**Perguntas ao autor:**
1. BES-1: a leitura pretendida era "a devida expiração de cache por invalidações"? Se a ideia era outra (por exemplo, expiração controlada por TTL), ajuste a frase.
2. "Nenhuma linha de código é alterada sem uma especificação técnica previamente aprovada" (Pilar 01 e FAQ): absoluto. É regra imposta por mecanismo (hook, gate) ou prática? (B5.01).
3. "tempo de carregamento inferior a 1 segundo" e "garantir carregamento instantâneo": há medição (Lighthouse, RUM) que sustente? (B5.02).
4. "Infraestrutura totalmente otimizada para descoberta": "totalmente" é absoluto sem critério (B5.01).

**Sugestões (Baixa, não aplicadas):**
- "SDD é a metodologia onde toda especificação…": "na qual" é a forma recomendada quando o antecedente não é lugar.

**Fora do escopo:** nada (a página não tem blocos gerados).

## Limitações
- Avaliação feita por modelo de linguagem; não substitui revisão humana. O `verificar.py` não foi executado: as alterações tocam só palavras isoladas, sem código, número ou qualificador.
- As alterações em PT deixam o gêmeo `/en/` desatualizado. É preciso rodar `npm run i18n:sync && npm run i18n:check` (não executado, conforme o brief).

### Lote F: revisão PT-BR Controlado

Modo: intervenção mínima, conforme o brief comum. Para cada alteração, procurei o trecho original em `tests/` e `scripts/` com grep. Nenhum teste nem script depende dos trechos alterados. A única ocorrência encontrada foi o nome de um teste em `tests/occ-engines.test.mjs` ("custo humano é não-linear no V_core"). Esse teste não confere o texto da página.

Achado transversal (alta prioridade): **`src/index.html` e `src/curriculo.html` citam "Itaú" 21 vezes cada**, sempre dentro dos blocos gerados (`PF:*` e `CV:*`). A fonte é `public/cv.json` (14 linhas com "Itaú"). O espelho `src/en/index.html` e `src/en/curriculo.html` repete as 21 ocorrências. Não alterei nada: é bloco gerado e é uma decisão do autor (é um currículo). A regra do brief diz que nenhuma página pública pode citar Itaú. Não há ocorrência de "IU Conecta" no lote.

---

#### `src/index.html`
- **Perfil:** Editorial. É a home do portfólio; o texto fora dos blocos gerados é só navegação.
- **Resultado:** sem alterações: o texto fora dos marcadores (link de pular, marca e menu) não tem problema.

**Perguntas ao autor:**
1. HOME-Q1: o bloco `PF` cita "Itaú" 21 vezes (fonte: `public/cv.json`, via `scripts/gen-portfolio.mjs`). Essas menções devem continuar no currículo público? Se não, a correção é no `cv.json`, seguida do gerador e do `i18n:sync`.

**Sugestões (Baixa, não aplicadas):** nenhuma.
**Fora do escopo:** todo o conteúdo do bloco `PF:START ... PF:END` (fonte: `public/cv.json` + `scripts/gen-portfolio.mjs`), incluindo as 21 menções a "Itaú"; bloco `AEO` no `<head>`.

---

#### `src/curriculo.html`
- **Perfil:** Editorial. É currículo; o texto fora dos blocos gerados é navegação, títulos de seção e rodapé.
- **Resultado:** sem alterações: os títulos e o rodapé fora dos marcadores não têm problema de severidade Média ou acima.

**Perguntas ao autor:**
1. CVP-Q1: os blocos `CV:*` citam "Itaú" 21 vezes (mesma fonte e mesma decisão de HOME-Q1).

**Sugestões (Baixa, não aplicadas):**
- "Habilidades & Competências" e "Formação & Certificações": o "&" em título de seção é estilo de inglês; "e" é a forma usual em português. Baixa, porque o sentido é claro.
- No bloco gerado "Sobre Mim" (fonte `cv.json`): "Adoro desafios onde posso aliar..." usa "onde" para algo que não é lugar ("em que"). Baixa e fora do escopo.

**Fora do escopo:** blocos `CV:hero-content`, `CV:about-content`, `CV:skills-container`, `CV:experience-container`, `CV:projects-container`, `CV:education-container`, `CV:certifications-container`, `CV:courses-container`, `CV:recommendations-container`, `CV:contact-container`, `CV:year` (fonte: `public/cv.json` + `scripts/gen-portfolio.mjs`); bloco `AEO`.

---

#### `src/salesforce-agentic-quickstart.html`
- **Perfil:** Técnico. É um guia imperativo, com passos numerados, comandos e arquivos de configuração.
- **Resultado:** 2 correções · 4 perguntas · 4 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| SFQ-1 | Grafia (AO 1990, prefixo "re-") | Média | Alta | "(Passo 2a) e re-execute." | "(Passo 2a) e reexecute." | Pelo Acordo Ortográfico, o prefixo "re-" se une sem hífen. |
| SFQ-2 | Grafia (AO 1990, prefixo "re-") | Média | Alta | "Re-execute com o prompt do início deste passo." | "Reexecute com o prompt do início deste passo." | Mesmo motivo de SFQ-1. |

**Perguntas ao autor:**
1. SFQ-Q1 (B5.01/B5.03, absolutos sem fonte): "Esta é a etapa **mais importante** e a **mais ignorada**"; "JWT individual por dev **é inviável** operacionalmente"; "Se algo falhar duas vezes seguidas, **o problema está na Spec** — não no Devin". Quer manter as formas absolutas ou suavizar (por exemplo, "uma das etapas mais ignoradas", "quase sempre o problema está na Spec")?
2. SFQ-Q2 (B2.06, escopo): o card "Já conheço Devin" diz para pular do Passo 2 direto para o Passo 5. Isso pula também o Passo 3 (login nas orgs com `sf org login web`), que não depende de conhecer o Devin. Está correto pular o Passo 3?
3. SFQ-Q3 (B3.04, um conceito, um termo): o escopo diz "permissão para **criar** sandboxes", mas a lista de pré-requisitos pede "Acesso a pelo menos uma Sandbox individual". O pré-requisito é criar sandboxes ou só ter acesso a uma?
4. SFQ-Q4: o checklist do Passo 6 cobra "Branch criada com nome devin/&lt;ticket&gt;-&lt;slug&gt;", mas o prompt do Passo 6 não pede ao Devin para criar a branch. A criação da branch deve entrar no prompt ou em outro passo?

**Sugestões (Baixa, não aplicadas):**
- "Este guia **te** levou do zero..." mistura "te" com "você", que é o tratamento do resto da página. Sugestão: "Este guia levou você do zero...".
- "complete os pré-requisitos **abaixo**" (B2.07): aceitável, porque a lista vem logo depois.
- "sem metadata trampling" (B3.03): o termo não é explicado na página. Sugestão: "sem que um time sobrescreva a metadata de outro".
- "com o Devin tendo executado uma Spec real": o gerúndio composto deixa a frase pesada. Sugestão: "e o Devin terá executado uma Spec real".

**Fora do escopo:**
- Comentário dentro do bloco YAML (B0.01, código): "# objetos que seu time é dono". A regência padrão é "objetos dos quais seu time é dono". Não alterei porque é conteúdo de código.
- Textos dos checklists, que ficam em atributos `x-data` (JavaScript do Alpine). Não há erro objetivo neles.
- Bloco `AEO-BODY` (fonte: `scripts/seo/build-aeo.mjs`).

---

#### `src/proposta-observabilidade-mobile.html`
- **Perfil:** Híbrido. É uma proposta de arquitetura para público técnico e executivo, com argumentação, métricas e nomes de produto.
- **Resultado:** 4 correções · 3 perguntas · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| POM-1 | B3.04 (um conceito, um termo) + grafia | Média | Alta | "State Tri-valorado (Healthy/Unknown/Down)" | "Estado Trivalorado (Healthy/Unknown/Down)" | O mesmo conceito aparece como "Estado Tri-valorado" e "estado tri-valorado" no resto da página; "State" mistura inglês e português. Pelo AO 1990, "tri-" se une sem hífen. |
| POM-2 | Grafia (AO 1990) | Média | Alta | "(estado tri-valorado: Healthy/Unknown/Down)" | "(estado trivalorado: Healthy/Unknown/Down)" | Mesmo motivo de POM-1. |
| POM-3 | Grafia (AO 1990) | Média | Alta | "Estado Tri-valorado" (título do card) | "Estado Trivalorado" | Mesmo motivo de POM-1. |
| POM-4 | B3.04 / mistura de idiomas | Média | Média | "alarmes de volume e limits para prevenir" | "alarmes de volume e limites para prevenir" | "limits" em minúscula, no meio de uma lista em português, parece descuido de digitação; não é nome de recurso. Ver pergunta POM-Q1. |

**Perguntas ao autor:**
1. POM-Q1: confirme que "limits" em "Guardrails de Cardinalidade" não era o nome de um recurso do Datadog. Se era, a correção POM-4 deve ser desfeita e o nome deve ir com a grafia do produto.
2. POM-Q2 (B5.03, alcance): "Capacidades **únicas** da solução", "Identity Stitching determinístico **sem ambiguidade**" e "**eliminando** ambiguidade". Quer manter as afirmações absolutas?
3. POM-Q3 (B5.02, fonte): "redução de 90%+ em overhead" e "reduzem overhead em 90%+ vs. full scans recorrentes". O número é medição, estimativa ou referência da documentação da Microsoft? Vale citar a origem.

**Sugestões (Baixa, não aplicadas):**
- "≥99.5%" (B3.07): o separador decimal em português é a vírgula ("≥99,5%"). Não alterei porque números são conteúdo protegido (B0).
- "(sync remoto, notificação usuário)": falta a preposição ("notificação ao usuário"). O estilo telegráfico da lista torna o problema Baixo.
- Siglas sem definição na página: MTTR, SCEP, KEDA, ITSM. O público técnico provavelmente as conhece (B3.05).

**Fora do escopo:** bloco `AEO-BODY` (fonte: `scripts/seo/build-aeo.mjs`); bloco `AEO` no `<head>`.

---

#### `src/privacidade.html`
- **Perfil:** Técnico. É texto jurídico; não mudei obrigações, prazos nem alcance.
- **Resultado:** 4 correções · 7 perguntas · 6 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| PRI-1 | B1.02 (agente explícito) | Média | Média | "apagar o que tiver sobre você a qualquer momento" | "apagar o que tivermos sobre você a qualquer momento" | Sem sujeito, "tiver" pode ser lido como "o que você tiver". Quem guarda os dados é o controlador ("nós"), pessoa usada em toda a frase ("coletamos", "não vendemos"). |
| PRI-2 | Grafia (AO 1990) | Média | Alta | "cookies não-essenciais" | "cookies não essenciais" | "Não" usado como prefixo se escreve sem hífen. |
| PRI-3 | Regência ("comunicar algo a alguém") | Média | Alta | "comunicaremos a ANPD e os titulares afetados em prazo razoável" | "comunicaremos o incidente à ANPD e aos titulares afetados em prazo razoável" | Na norma-padrão, quem recebe a comunicação é objeto indireto. O objeto direto ("o incidente") vem do título do bloco ("Em caso de incidente"). O prazo e o alcance ficaram iguais. |
| PRI-4 | B0.02 / B3.04 (nome de norma) | Média | Alta | "inclusão de seções IA Act" | "inclusão de seções AI Act" | A norma se chama "AI Act" ("EU AI Act" na própria página); "IA Act" mistura sigla portuguesa e nome inglês. |

**Perguntas ao autor:**
1. PRI-Q1 (B3.07/B6.06, prazo inconsistente; Crítica, conf. Baixa): a seção 9 diz "Atendemos solicitações em até **15 dias** (LGPD)". A seção 14 diz "SLA de resposta: até **15 dias úteis**". Os prazos são em dias corridos ou úteis? Não alterei.
2. PRI-Q2 (B5.06, prazo vago em obrigação legal): "comunicaremos [...] **em prazo razoável**". A Resolução CD/ANPD 15/2024, citada na mesma frase, fixa um prazo. Quer escrever o prazo da resolução? Não alterei.
3. PRI-Q3 (B5.03, alcance): o resumo diz que nome, e-mail e telefone **"Não compartilhamos"**. A seção 6 lista operadores que tratam dados (AWS como hospedagem; WhatsApp/Meta como mensageria). Vale ajustar para "Não compartilhamos, exceto com operadores (seção 6)"?
4. PRI-Q4 (B3.04, base legal inconsistente): no resumo, a finalidade de nome, e-mail e telefone é "Atender sua solicitação"; na seção 5, a base é "Procedimentos preliminares ao contrato". Na seção 8, a retenção de "Cadastrais (lead não convertido)" se justifica por "Legítimo interesse comercial". As duas bases valem para fases diferentes?
5. PRI-Q5 (B5.03, alcance): "Dado sensível: dado pessoal sobre origem racial, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico (LGPD, art. 5º, II)". A lista do art. 5º, II também inclui filiação a sindicato ou a organização de caráter religioso, filosófico ou político. A definição deve reproduzir a lista completa da lei?
6. PRI-Q6 (B5.03, alcance): "você pode [...] apagar o que tivermos sobre você **a qualquer momento**". A seção 8 prevê guarda obrigatória (logs por 6 meses, Marco Civil, art. 15; obrigações fiscais). Vale acrescentar uma ressalva ("salvo quando a lei exigir a guarda")?
7. PRI-Q7: confirme a referência "Lei 14.708/2023" na seção 13 e o significado de "processo" em "Duração do processo + 12 meses" (resumo). Qual processo: seletivo, comercial ou de consultoria?

**Sugestões (Baixa, não aplicadas):**
- "LGPD, art. 7º e 11" → "LGPD, arts. 7º e 11"; "GDPR art. 15-22" → "GDPR, arts. 15 a 22".
- "Modelo pré-pronto disponível no link": "pré-pronto" é redundante ("modelo pronto"), e "no link" não diz qual link (B2.07). Sugestão: "Use o modelo do botão 'Solicitar agora'".
- "SLA de resposta" (B3.05): sigla não definida para o público geral. Sugestão: "Prazo de resposta".
- Depois de PRI-3, a frase ficou com "o incidente [...] contendo: descrição do incidente". Uma redação mais limpa seria "com: descrição do incidente, ...". Deixei a forma mínima.
- "Cookies de marketing: Até 90 dias" aparece no resumo, mas não na tabela de retenção da seção 8.
- Os marcadores "[PLACEHOLDER — ...]" de CPF/CNPJ e endereço continuam publicados (pendência de conteúdo, não de linguagem).

**Fora do escopo:** nada (a página não tem bloco gerado no `<body>`).

---

#### `src/operacao-capital-cognitivo.html`
- **Perfil:** Híbrido. É um simulador didático com explicação de conceitos e uma narrativa.
- **Resultado:** 1 correção · 1 pergunta · 1 sugestão

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| OCC-1 | Grafia (AO 1990) | Média | Alta | "Enxergar o custo humano não-linear" | "Enxergar o custo humano não linear" | "Não" usado como prefixo se escreve sem hífen. O teste `tests/occ-engines.test.mjs` usa "não-linear" só no nome do teste; ele não confere o texto da página. |

**Perguntas ao autor:**
1. OCC-Q1 (B5.01/B5.03, qualificador e alcance): a página afirma duas vezes que a API é menos de 10% do custo, com alcances diferentes e sem fonte. Primeira: "Em pipelines de software de **grandes empresas**, a API **costuma ser** menos de 10% do custo total". Segunda: "Em pipelines [...] de empresas **Fortune 500**, o custo de API **representa** menos de 10% do TCO real". A segunda perde o qualificador "costuma". Qual é a fonte, e qual alcance vale?

**Sugestões (Baixa, não aplicadas):**
- "O simulador **te** leva a redescobrir isso" mistura "te" com "você", que é o tratamento do resto da página.

**Fora do escopo:** o conteúdo dos capítulos 2 a 6, que o JavaScript monta, e os textos de ajuda e glossário em `<script>`. Não foram revisados nesta passada.

---

#### `src/life.html` (SÓ DIAGNÓSTICO)
- **Perfil:** Editorial. É uma narrativa pessoal em que a voz autoral pesa mais.
- **Resultado:** sem alterações: o texto visível no HTML é só interface ("Carregando...", controles). A narrativa fica em `STORY_DATA`, dentro de `<script>`, que o brief proíbe editar. Os achados abaixo são diagnóstico.

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| LIFE-1 | Gramática (infinitivo) | Média | Alta | "[Fase 10/11] em 2017, fiquei careca, e decidi saí da vida de consultoria" | "[Fase 10/11] Em 2017, fiquei careca e decidi sair da vida de consultoria" | "decidi saí" é erro de verbo ("decidi sair"). A frase também começa com minúscula e tem vírgula antes de "e". Não alterei: string em `<script>`. |
| LIFE-2 | Gramática (paralelismo) | Média | Alta | "Em 2009 conheci o amor de minha vida e 2011 oficializamos nossa união." | "Em 2009 conheci o amor da minha vida e, em 2011, oficializamos nossa união." | Falta "em" antes de "2011". Não alterei: string em `<script>`. |
| LIFE-3 | B1 (frase fragmentada) | Baixa | Alta | "...em um mundo novo. Onde aprendi a ouvir a dor de usuários..." | "...em um mundo novo. Foi onde aprendi a ouvir a dor de usuários..." | A frase começa com "Onde" e não tem verbo principal. |
| LIFE-4 | B4.03 (repetição) | Baixa | Média | "focado em construir e aproveitar essa família linda que construí" | (autor decide) | "construir" e "construí" na mesma frase; pode ser intencional. |

**Perguntas ao autor:** nenhuma além da decisão de editar as strings de `STORY_DATA` (exigem mexer no `<script>`).
**Sugestões (Baixa, não aplicadas):** LIFE-3 e LIFE-4.
**Fora do escopo:** toda a narrativa (`STORY_DATA` em `<script>`); bloco `AEO` no `<head>`.

---

#### `src/life3d.html` (SÓ DIAGNÓSTICO)
- **Perfil:** Editorial. É uma narrativa contemplativa em 3D, com voz autoral forte.
- **Resultado:** 1 correção (exceção do brief: grafia objetiva com confiança Alta) · 0 perguntas · 3 sugestões

| ID | Regra | Sev. | Conf. | Antes | Depois | Por quê |
|---|---|---|---|---|---|---|
| L3D-1 | B3.04 / grafia do nome próprio | Média | Alta | "pela história de Mauricio Issei" | "pela história de Maurício Issei" | O site inteiro (inclusive o `og:title` desta página) grafa "Maurício" com acento. |
| L3D-2 | Regência ("assistir a") | Média | Alta | "A passividade de quem assistia heróis lutarem na TV de tubo" | "A passividade de quem assistia a heróis lutarem na TV de tubo" | No sentido de "ver", a norma-padrão pede "assistir a". Não alterei: string em `<script>`. |

**Perguntas ao autor:** nenhuma.
**Sugestões (Baixa, não aplicadas):**
- "**Essa** jornada mostra uma forma de construir uma vida." O texto se refere à jornada que acabou de acontecer na própria página, e por isso "Esta" seria a forma mais precisa. Baixa.
- `<title>` e `meta description` grafam "Mauricio Issei" sem acento (fora do escopo: `<head>`).
- Narrativa em `<script>`: "Foi aqui que o modelo foi instalado" repete "foi". Baixa, porque é voz autoral.

**Fora do escopo:** narrativa das fases (strings em `<script>`); `<head>` (title e meta); bloco `AEO`.

---

## Verificação e limitações
- Extraí o texto visível de cada página com um parser HTML próprio, excluindo `<script>`, `<style>`, `<head>` e blocos gerados. A leitura foi contextual. Não rodei o `verificar.py`, porque as correções são pontuais de grafia, regência e termo, sem mexer em números nem em qualificadores.
- Nenhuma correção alterou código, identificadores, números, prazos ou obrigações. A única correção em texto jurídico que acrescenta palavra (PRI-3) só explicita o objeto que o título do bloco já determina.
- Avaliação feita por modelo de linguagem; não substitui revisão humana, principalmente na política de privacidade.
- Não rodei `i18n:sync` nem o gate (proibido pelo brief). Os espelhos `/en/` das páginas editadas ficaram desatualizados.

