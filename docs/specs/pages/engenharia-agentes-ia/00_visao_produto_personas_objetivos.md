# 00 — Visão do Produto, Personas e Objetivos Pedagógicos

> Cobre os entregáveis **1 (Visão do produto)**, **2 (Personas)** e **3 (Objetivos pedagógicos)**.
> Base: os 10 princípios de [`guia-engenharia-agentes-ia.md`](../../../references/guia-engenharia-agentes-ia.md).

---

## 1. Visão do Produto

### 1.1 Tese central

> **Um sistema de IA bem-sucedido tem muito pouca IA no caminho crítico.** A maior parte do trabalho
> é engenharia de software disciplinada ao redor de um componente estocástico — e é essa disciplina
> que separa um protótipo encantador de um produto que aguenta produção.

O site existe para **fazer o profissional internalizar essa tese por experiência ativa**, não por
leitura passiva. Ele sai entendendo: o que é Engenharia Agêntica, por que agentes autônomos
irrestritos falham, como construir sistemas confiáveis, e como traduzir princípio em **decisão
arquitetural concreta**.

### 1.2 Declaração de produto (elevator pitch)

> Uma experiência web de aprendizado por descoberta que transforma os 10 princípios da Engenharia de
> Agentes de IA em **visualizações manipuláveis, simulações e laboratórios**. O usuário não lê sobre
> "loops de agentes" — ele liga a autonomia no simulador e vê o custo explodir. Não lê sobre
> "contratos rígidos" — ele tenta passar uma saída inválida e vê o schema barrar.

### 1.3 Princípios de design do próprio produto (dogfooding)

O site **pratica os princípios que ensina**. Isso é estratégia de credibilidade, não coincidência:

| Princípio do guia | Como o site o aplica em si mesmo |
| :-- | :-- |
| Determinístico-primeiro | Conteúdo e regras de avaliação são determinísticos; nada depende de chamar um LLM em runtime. |
| Pouca IA no caminho crítico | O site **não usa LLM em runtime**. Simulador/playground avaliam por **regras explícitas e auditáveis** (espelha a regra do M5/XAI: "regras determinísticas, não 2ª chamada de LLM"). |
| Open-World / honestidade | Quando algo não foi medido (ex.: métrica de aprendizado), o site **mostra a lacuna** em vez de inventar. |
| Fail-closed / faseamento | Roadmap MVP→V1→V2 com escopo fechado por fase (ver 09); features pesadas não entram "porque seria legal". |
| XAI | O feedback do playground explica **por quê** ("risco de loop porque há ciclo sem aprovação humana"), não dá só uma nota. |

> **Nota editorial.** Sempre que possível, tornar esse dogfooding **explícito** numa faixa discreta
> ("Este site foi construído com os princípios que ensina — veja como"). Aumenta confiança e fecha o
> ciclo pedagógico.

### 1.4 Proposta de valor por resultado de aprendizagem

Ao final, o usuário consegue:

1. **Diagnosticar** um sistema agêntico instável (apontar o loop, a fronteira sem contrato, o gasto
   sem ledger).
2. **Argumentar** por que orquestração determinística > autonomia total — com vocabulário próprio.
3. **Desenhar** uma arquitetura mínima viável (Cérebro/Vitrine, contratos, ledger, BDD) e justificar
   cada peça.
4. **Defender o negócio**: traduzir cada prática em benefício (previsibilidade, custo, auditoria).

### 1.5 Não-objetivos (o que o site **não** é)

- Não é um curso de prompt engineering nem de uma ferramenta específica.
- Não é documentação de API do SocialSelling (esse é o estudo de caso, não o produto).
- Não executa LLMs ao vivo nem é um IDE.
- Não promete "construir o agente para você" — ensina a *pensar* o agente.

---

## 2. Personas

> Seis personas, cada uma com **dores · objetivos · objeções · expectativas · fluxo ideal de
> aprendizagem**. O fluxo ideal referencia áreas do sitemap (01) e capítulos da jornada (02).

### Persona 1 — Dev tradicional migrando para IA · "Rafael"

- **Perfil:** 5–10 anos de back-end clássico (Java/C#/Python). Encantado e ameaçado pela IA. Já fez
  demos com prompts encadeados que "funcionaram na minha máquina".
- **Dores:** sente que está "tratando o modelo como mágica"; demos viram bugs irreprodutíveis em
  produção; medo de obsolescência.
- **Objetivos:** entender como aplicar a engenharia que já domina (contratos, testes, idempotência)
  ao componente estocástico.
- **Objeções:** "isso não é só hype reembalado?"; "vou ter que jogar fora o que sei?".
- **Expectativas:** analogias com o que já conhece (schema = validador de formulário; ondas =
  paginação + fila; cache semântico = cache com chave idempotente).
- **Fluxo ideal:** Home → Jornada Guiada completa (Cap. 1→10) → Playground para montar a 1ª
  arquitetura. **Aprende fazendo a trilha inteira.**

### Persona 2 — Tech Lead · "Camila"

- **Perfil:** lidera squad de 5–8 devs, parte deles "vibe coding" com IA sem padrão comum.
- **Dores:** cada dev usa IA de um jeito; PRs com alucinações; custo de API imprevisível; não tem
  vocabulário para padronizar.
- **Objetivos:** extrair um **conjunto de regras de time** (DoR/DoD, BDD, contratos) e convencer o
  time a adotá-las.
- **Objeções:** "não tenho tempo para um curso longo"; "preciso de algo que eu mostre pro time".
- **Expectativas:** material acionável, "leve para a daily"; foco em FinOps, governança e BDD.
- **Fluxo ideal:** Home → **Princípios** (visão geral em cards) → Cap. 7 (FinOps) + Cap. 8 (BDD) +
  Cap. 2 (orquestração) → Referência para compartilhar. **Entra por princípios específicos, não
  pela trilha linear.**

### Persona 3 — Arquiteto de Software · "Daniel"

- **Perfil:** desenha sistemas para múltiplos times; precisa de blueprints defensáveis em revisão.
- **Dores:** falta de padrões maduros para sistemas cognitivos; pressão para adotar frameworks
  agênticos da moda sem critério.
- **Objetivos:** padrões arquiteturais transferíveis (desacoplamento bimodal, DAG, isolamento de
  camadas, modos degradados) e **quando NÃO** adotar algo (ex.: Subjective Logic diferida).
- **Objeções:** "preciso de profundidade, não de slogan"; "cadê o trade-off?".
- **Expectativas:** o **Simulador** e o estudo de caso SocialSelling; árvore de decisão
  SVG/Canvas/WebGL/BPMN (04) como prova de rigor.
- **Fluxo ideal:** Home → **Simulador** (explora trade-offs) → Cap. 3 (Cérebro/Vitrine) + Cap. 2 +
  Cap. 6 → **Padrões** → **Casos Reais (SocialSelling)**. **Entra pela exploração, valida pela
  profundidade.**

### Persona 4 — Product Manager técnico · "Letícia"

- **Perfil:** define roadmap de features com IA; faz a ponte negócio↔engenharia.
- **Dores:** não consegue estimar custo/prazo de features de IA; medo de prometer o que o time não
  entrega; auditoria/compliance batendo na porta.
- **Objetivos:** entender o suficiente para **priorizar, estimar e mitigar risco** sem virar
  engenheira.
- **Objeções:** "muito técnico vai me perder"; "preciso saber o impacto no negócio".
- **Expectativas:** os blocos **"Benefício Direto para o Negócio"** (presentes no guia), XAI como
  ponte de adoção, e DoR/DoD como ferramenta de delegação.
- **Fluxo ideal:** Home → **Introdução** → Cap. 1 (Da magia à engenharia) + Cap. 9 (XAI) + Cap. 8
  (governança) → seções de benefício. **Trilha curta e orientada a negócio.**

### Persona 5 — Executivo avaliando adoção de IA · "Sr. Tanaka"

- **Perfil:** diretor/C-level; decide investir ou não em IA; pensa em ROI, risco e reputação.
- **Dores:** "conta de nuvem-surpresa"; medo de decisão de negócio errada tomada com falsa
  confiança; pressão do board por "fazer IA".
- **Objetivos:** sair com **3–4 frases defensáveis** sobre por que a abordagem disciplinada reduz
  risco e viabiliza ROI calculável.
- **Objeções:** "não vou ler documentação técnica"; "me mostre por que isso importa pro negócio".
- **Expectativas:** **narrativa visual** (Apple-like) na Home; comparação caos × disciplina; nenhum
  jargão sem tradução.
- **Fluxo ideal:** Home (Hero + storyboard caos×disciplina) → **Introdução** (3 benefícios:
  previsibilidade, segurança, escala) → sai. **Experiência de 3–5 minutos, alto impacto, zero
  exercício obrigatório.**

### Persona 6 — Estudante avançado de Eng. de Software · "Bianca"

- **Perfil:** final de graduação / início de carreira; curiosa, com tempo, sem bagagem corporativa.
- **Dores:** material acadêmico desatualizado; tutoriais de IA superficiais; quer profundidade real
  e gratuita.
- **Objetivos:** dominar conceitos a fundo, fazer todos os exercícios, explorar a matemática
  (apêndice MathML do framework).
- **Objeções:** "será que é só marketing?"; quer rigor e referências.
- **Expectativas:** Jornada completa **com avaliações**, Playground, Referência com links, e o
  material `[ESPECIFICADO — V1+]` (Subjective Logic, Bayesiano) como aprofundamento opcional.
- **Fluxo ideal:** Jornada Guiada 100% (com quizzes) → Playground → **Referência** → conteúdo
  avançado opcional. **Completista; usa todos os recursos.**

### 2.1 Matriz persona × modo de entrada

| Persona | Modo de entrada dominante | Profundidade | Exercícios? |
| :-- | :-- | :-- | :-- |
| Rafael (dev migrando) | Trilha linear completa | Alta | Sim |
| Camila (tech lead) | Princípios pontuais | Média | Seletivo |
| Daniel (arquiteto) | Exploração (Simulador) | Muito alta | Opcional |
| Letícia (PM técnico) | Trilha curta de negócio | Média-baixa | Pouco |
| Sr. Tanaka (executivo) | Narrativa Home/Intro | Baixa | Não |
| Bianca (estudante) | Completista | Máxima | Todos |

> **Implicação de design (crítica).** O site precisa servir **dois modos simultâneos**: **trilha
> guiada linear** (Rafael, Bianca) e **exploração livre por tópico** (Camila, Daniel, executivo).
> Isso define a arquitetura de navegação dual em [01](01_arquitetura_informacao_e_sitemap.md).

---

## 3. Objetivos Pedagógicos

### 3.1 Taxonomia de Bloom aplicada

Cada princípio é ensinado até um nível-alvo de Bloom, o que determina o tipo de interação:

| Nível Bloom | Tipo de interação no site | Onde aparece |
| :-- | :-- | :-- |
| Lembrar / Entender | Leitura + visualização animada (assistir) | Princípios, Introdução |
| Aplicar | Manipular visualização (mexer e observar) | Visualizações, Simulador |
| Analisar | Comparar cenários, achar o defeito | BPMN (achar o loop), quizzes |
| Avaliar | Julgar uma arquitetura dada | Playground (avaliação) |
| Criar | Montar arquitetura do zero | Playground (montagem), projeto final |

### 3.2 Objetivos de aprendizagem por princípio (mensuráveis)

Cada objetivo é redigido como "o usuário consegue…" e tem um **gate de avaliação** correspondente na
jornada (02):

| P | Objetivo de aprendizagem | Gate (como verificamos) |
| :-: | :-- | :-- |
| P1 | Distinguir LLM-como-componente de LLM-como-orquestrador | Quiz: classificar 4 arquiteturas em "DAG" vs "agente livre" |
| P2 | Explicar por que mesma entrada deve dar mesma saída | Exercício: apontar a fonte de não-determinismo (relógio/RNG) |
| P3 | Justificar a separação Cérebro/Vitrine | Quiz: o que pode/não pode tocar o banco |
| P4 | Identificar o resíduo interpretativo numa tarefa | Exercício: marcar campos "estruturado" vs "resíduo" |
| P5 | Reconhecer onde um contrato deve barrar saída inválida | Visualização: rejeitar o payload com campo extra |
| P6 | Não confundir evidência, inferência e julgamento | Exercício: classificar afirmações nas 3 camadas |
| P7 | Tratar ausência de sinal como incerteza, não falso | Quiz cenário Open-World |
| P8 | Configurar um ledger e prever quando ele recusa gasto | Simulador: levar o orçamento ao teto |
| P9 | Escrever os 3 eixos de cenário BDD (feliz/degradado/open-world) | Exercício: completar um Given/When/Then |
| P10 | Transformar score em drivers + lacunas + proveniência | Visualização XAI: montar a explicação |

### 3.3 Objetivo terminal (capstone)

No **Cap. 10 — Projeto completo**, o usuário monta no Playground uma arquitetura de ponta a ponta
para um problema dado (ex.: "priorizar leads") e a defesa é avaliada por regras que checam os 10
princípios. **Critério de conclusão do site:** arquitetura sem loops, com contrato em toda fronteira,
ledger presente, BDD declarado e camada de explicação — e o usuário consegue explicar cada escolha.

### 3.4 Princípio pedagógico mestre

> **Toda interação ensina algo; nada é decorativo.** Animação que não muda o entendimento do usuário
> é cortada (ver regra em [07](07_direcao_de_arte_e_animacoes.md)). Toda visualização tem um
> equivalente textual (ver [08](08_acessibilidade_e_metricas.md)) — a experiência funciona mesmo sem
> o "show".

---

### Referências cruzadas

- Navegação dual e sitemap → [01](01_arquitetura_informacao_e_sitemap.md)
- Detalhamento dos 10 capítulos e gates → [02](02_jornada_de_aprendizagem.md)
- Faseamento das features por persona/valor → [09](09_roadmap_esforco_riscos.md)
