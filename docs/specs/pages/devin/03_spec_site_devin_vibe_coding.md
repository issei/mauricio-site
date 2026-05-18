# Especificação de Conteúdo — Site Interativo
## Vibe Coding com Devin: A Nova Era do Desenvolvedor como Arquiteto Cognitivo

**Autor do conteúdo original:** Mauricio Yokoyama Issei · Itaú BUPJ  
**Versão:** 2.0 — Adaptação para experiência web autônoma (sem narrador)  
**Objetivo:** Documento de conteúdo completo para desenvolvimento do site. O desenvolvedor não precisará tomar decisões editoriais — apenas de layout e codificação.

---

## Diretrizes Gerais de Experiência

- Elementos de destaque (citações, números, exemplos de código) devem ter tratamento visual diferenciado — não são apenas texto corrido.
- Todo o conteúdo deve ser autoexplicativo. Não há narrador. Cada seção deve ser compreensível de forma independente e também dentro da sequência.
- Linguagem: Português do Brasil. Tom: direto, intelectual, com leveza. Sem jargão corporativo vazio.

---

## Estrutura de Navegação (Índice)

```
INTRODUÇÃO
  ├── Abertura
  ├── Quem apresenta
  └── Propósito

ATO I — POR QUE ESTAMOS AQUI
  ├── Os três fundamentos
  ├── A ferramenta: lição da calculadora
  ├── Pausa: o que é Vibe Coding
  └── A analogia do Cozinheiro

ATO II — DEVIN NA PRÁTICA
  ├── Como falar com qualquer agente de IA
  ├── Anatomia do Devin
  ├── Contexto persistente: visão geral
  ├── Skills
  ├── Playbooks
  ├── Knowledge
  ├── Hands-on: SDD
  ├── Hands-on: Estrutura do projeto
  ├── Hands-on: Fluxo da Spec ao PR
  └── Demo ao vivo

ATO III — CULTURA, TIME E GESTÃO
  ├── Maestria Pessoal
  ├── Maestria Coletiva
  ├── Por que Software tem física diferente
  ├── Ágil na Era da IA
  ├── Métricas e Metas
  ├── Custo: ACUs e Modo Sleep
  ├── Planos e Session Insights
  └── Fechamento

PRÓXIMOS PASSOS
  ├── Convite à Experimentação
  └── Encerramento
```

---

---

# SEÇÃO 1 — CAPA / ABERTURA

**Tipo de seção:** Hero / Tela de entrada  
**Posição:** Primeira tela visível ao acessar o site

### Conteúdo

**Supertítulo (linha pequena acima do título principal):**
> ITAÚ BUPJ · HANDS-ON

**Título principal:**
> Vibe Coding com Devin

**Subtítulo:**
> A nova era do desenvolvedor como arquiteto cognitivo

**Crédito (rodapé da seção):**
> Mauricio Yokoyama Issei · Itaú BUPJ · 2026

**Elemento de orientação (CTA discreto):**
> Role para começar ↓  
> *(ou ícone de scroll animado)*

### Notas para o desenvolvedor
- Essa seção deve ter alto impacto visual. Fundo escuro recomendado.
- O subtítulo "arquiteto cognitivo" é o conceito central da apresentação — deve ter peso visual diferenciado (itálico, cor de destaque, ou animação de entrada discreta).
- Sem texto adicional nesta tela.

---

---

# SEÇÃO 2 — PERGUNTA-GATILHO

**Tipo de seção:** Provocação / Engajamento emocional  
**Âncora:** `#abertura`

### Conteúdo

**Rótulo de seção (pequeno, discreto):**
> 01 · ABERTURA

**Texto principal (deve ser tratado como citação grande — não como parágrafo comum):**
> Quantos de vocês passam mais de metade do dia resolvendo tarefas repetitivas...  
> em vez de desenhar arquitetura?

**Texto de continuidade (corpo, logo abaixo):**
> Se você levantou a mão — mesmo que mentalmente — esta apresentação é para você.

### Notas para o desenvolvedor
- Essa é a frase mais importante do Ato I. Deve ocupar a maior parte da tela.
- O texto principal pode ter animação de entrada por linha (efeito typewriter ou fade por segmento).
- Não adicionar nenhum outro elemento visual competindo com o texto.

---

---

# SEÇÃO 3 — APRESENTAÇÃO DO AUTOR

**Tipo de seção:** Credenciamento pessoal  
**Âncora:** `#sobre`

### Conteúdo

**Rótulo de seção:**
> APRESENTAÇÃO

**Nome:**
> Mauricio Yokoyama Issei

**Linha de posição:**
> Desenvolvedor desde 2003 · Na Rede desde 2018 · Apoio à conquista de novos clientes

**Três blocos de informação (podem ser cartões ou itens numerados):**

**Bloco 1 — Pessoal**
> 44 anos. Casado com a Talita. Pai da Yumi (14), Lucas e Matheus (9).

**Bloco 2 — Formação**
> Sistemas de Informação · Operações Logísticas · Estatística Aplicada · Ciência de Dados.

**Bloco 3 — Atuação**
> Mais de 22 anos desenvolvendo sistemas. Desde 2018 no time da Rede / Itaú BUPJ, atuando no apoio à conquista de novos clientes.

### Notas para o desenvolvedor
- Layout sugerido: foto/avatar à esquerda (se disponível), blocos numerados à direita.
- Sem excesso de texto. Essa seção deve durar poucos segundos de leitura.

---

---

# SEÇÃO 4 — PROPÓSITO

**Tipo de seção:** Declaração de intenção  
**Âncora:** `#proposito`  
**Rótulo de seção:** `02 · PROPÓSITO`

### Conteúdo

**Afirmação principal:**
> Não é apenas aprender uma ferramenta nova.

**Desenvolvimento (em fonte menor, mas ainda em destaque):**
> Ferramentas mudam. Modelos evoluem todos os dias.

**Conclusão (maior impacto — pode ter peso visual maior ou cor diferente):**
> O que precisa evoluir é você.

### Nota editorial
Essa seção existe para reposicionar a expectativa do público: eles vieram para aprender sobre o Devin, mas a palestra vai mais fundo — fala sobre identidade profissional na era da IA. O tom deve ser provocador, não condescendente.

---

---

# SEÇÃO 5 — OS TRÊS FUNDAMENTOS

**Tipo de seção:** Conceitual / Introdução filosófica  
**Âncora:** `#fundamentos`  
**Rótulo de seção:** `FUNDAMENTOS`

### Chapéu (introdução contextual)
> Antes da ferramenta, três palavras.  
> O esqueleto invisível que sustenta todo o resto desta conversa.

### Três conceitos (layout em três colunas ou cards)

---

**Conceito 1 — FERRAMENTA**  
*Subtítulo:* O que expande você

> Uma ferramenta é um recurso criado para facilitar, aprimorar ou tornar possível a execução de uma tarefa. Ela serve para expandir as capacidades naturais do ser humano — sejam físicas ou mentais — reduzindo o esforço necessário para atingir um objetivo.  
>
> A calculadora é a primeira ferramenta cognitiva da humanidade: em vez de gastar energia mental com cálculos repetitivos, você terceiriza esse esforço e libera sua mente para o que importa.

---

**Conceito 2 — PENSAMENTO**  
*Subtítulo:* O processo em execução

> Definir o pensamento é como descrever o vento: você não o vê diretamente, mas sente seus efeitos em todas as ações.  
>
> Em essência, pensamento é a nossa interface com a realidade. É o processo de manipular informações para formar conceitos, criar hipóteses, lembrar e decidir caminhos. É o que acontece entre o problema e a solução — o processo cognitivo em execução.

---

**Conceito 3 — INTELIGÊNCIA**  
*Subtítulo:* A qualidade do pensamento

> Se o pensamento é a atividade em si, a inteligência é a qualidade dessa atividade.  
>
> Inteligência é a capacidade adaptativa de produzir bons resultados diante de problemas inéditos, objetivos ambíguos ou mudanças inesperadas de cenário. É o que separa quem resolve bem uma crise de quem se paralisa diante dela.

---

### Nota editorial
Esses três conceitos são o "esqueleto invisível" de toda a apresentação. Eles voltam em seções posteriores (a IA é a ferramenta, o desenvolvedor mantém o pensamento e a inteligência). O desenvolvedor pode considerar uma visualização que indique essa interconexão — como linhas ligando os três blocos ou uma animação mostrando a hierarquia.

---

---

# SEÇÃO 6 — A FERRAMENTA: A LIÇÃO DA CALCULADORA

**Tipo de seção:** Aprofundamento conceitual com diagrama  
**Âncora:** `#calculadora`  
**Rótulo de seção:** `FUNDAMENTOS · FERRAMENTA`

### Título da seção
> A calculadora foi a primeira IA da história.

### Subtítulo
> Ela não nos fez mais burros. Ela nos liberou para o que importa.

### Corpo explicativo
> O cérebro humano usa o pensamento analítico para processar cálculos matemáticos de forma sequencial e lógica. Mas esse processamento gasta tempo e energia metabólica.  
>
> A calculadora "terceiriza" esse esforço mecânico — ela processa informação matemática de forma instantânea e devolve sua mente para tarefas de maior nível cognitivo.  
>
> A IA generativa é a evolução máxima dessa calculadora. Não apenas matemática — **cognitiva**. Ela assume o trabalho braçal do pensamento repetitivo para que você possa focar no trabalho estratégico do pensamento criativo.

### Diagrama visual (três elementos em sequência)

```
[ PROBLEMA ] ──→ [ FERRAMENTA ] ──→ [ RESULTADO ]
```

Cada elemento deve ter uma breve legenda:
- **PROBLEMA:** A tarefa que precisa ser resolvida
- **FERRAMENTA:** O que reduz o esforço de resolução (calculadora → IA)
- **RESULTADO:** O que você faz com a energia mental liberada

### Nota editorial
Esse diagrama é conceitual, não técnico. Deve ser simples e limpo. O ponto central: a IA não substitui o desenvolvedor — ela terceiriza o trabalho repetitivo, exatamente como a calculadora terceirizou os cálculos. Ninguém disse que a calculadora tornava matemáticos menos relevantes.

---

---

# SEÇÃO 7 — FRASE DE IMPACTO: VIBE CODING

**Tipo de seção:** Pausa / Respiração narrativa  
**Âncora:** `#vibe-coding-def`

### Conteúdo

**Linha 1 (pode ter tratamento de negação/contraste visual):**
> Vibe Coding não é digitar menos.

**Linha 2 (maior, destaque, pode ter cor ou peso diferente):**
> É pensar melhor.

### Nota editorial
Essa seção é intencionalmente minimalista. Ela interrompe a densidade conceitual das seções anteriores para cravar a tese central numa única frase. Não adicionar nada além dessas duas linhas nesta tela.

---

---

# SEÇÃO 8 — A ANALOGIA DO COZINHEIRO

**Tipo de seção:** Narrativa / Metáfora estrutural  
**Âncora:** `#cozinheiro`  
**Rótulo de seção:** `STORYTELLING · O COZINHEIRO`

### Contexto introdutório
> O cliente pede um risoto que remeta a uma noite de outono.  
> Ninguém quer saber a temperatura do forno. Só a experiência.

### Desenvolvimento narrativo
> Imagine um restaurante de alta gastronomia. Quando um cliente se senta à mesa e pede um "Risoto de Cogumelos que remeta a uma noite de outono", ele está fazendo um pedido puramente abstrato — quer uma experiência, não uma receita. Não dita a temperatura do forno nem a miligramagem do sal.  
>
> No desenvolvimento tradicional, o desenvolvedor era quem cortava cada ingrediente manualmente: linha por linha de código, configuração de servidor, exaustão de sintaxe.  
>
> Hoje, a cozinha foi hiper-automatizada. A IA generativa é a super-calculadora da cozinha: ela pica dez quilos de cebola em segundos, calibra o forno instantaneamente e conhece a "receita" de qualquer framework do mundo. O desenvolvedor parou de ser o operário da cozinha.  
>
> Mas há algo que a IA nunca vai saber: se aquele cliente tem alergia. Se a cozinha do restaurante atende às regras de segurança alimentar. Se a "noite de outono" daquele cliente é melancólica ou aconchegante.  
>
> **Isso é com você.**

### Três papéis (cards ou colunas)

**Card 1 — O CLIENTE**  
*Subtítulo:* Traz o desejo abstrato

> Foca no valor final. Não dita receita, ingrediente ou método. Ele sabe o que quer sentir, não como fazer.

---

**Card 2 — A IA (FERRAMENTA)**  
*Subtítulo:* Pica, calibra, executa

> Conhece todas as receitas, escreve qualquer linguagem, em segundos. É rápida, precisa e incansável — mas executa sem julgamento.

---

**Card 3 — VOCÊ (CHEF EXECUTIVO)**  
*Subtítulo:* Garante que o prato tenha alma

> Julga contexto, segurança, regras de negócio. Assume a responsabilidade pelo resultado. É o seu nome que está na porta do restaurante quando o prato sai errado.

---

---

# SEÇÃO 9 — TRANSIÇÃO: ATO II

**Tipo de seção:** Divisor de capítulo  
**Âncora:** `#ato-2`

### Conteúdo

**Rótulo:**
> ATO II

**Título do ato:**
> A ferramenta na prática

**Frase de transição:**
> Mas afinal —  
> quem é o Devin?

### Nota para o desenvolvedor
Seção de transição. Fundo diferenciado (escuro, se o restante do site usa fundo claro). Tipografia grande, poucas palavras. Sem mais texto.

---

---

# SEÇÃO 10 — COMUNICAÇÃO COM IA: QUATRO PILARES

**Tipo de seção:** Operacional / Prático  
**Âncora:** `#comunicacao-ia`  
**Rótulo de seção:** `COMUNICAÇÃO COM IA`

### Título
> Quatro pilares para falar com qualquer agente de IA.

### Subtítulo explicativo
> As lições da engenharia de prompt valem para qualquer comunicação humana de alto nível. Dominar esses quatro princípios muda a qualidade do que você obtém de qualquer agente — Devin, Copilot, Stackspot ou qualquer outro.

### Os quatro pilares (cards numerados, layout 2×2 ou sequencial)

---

**Pilar 01 — CLAREZA**

> Comunique como um profissional sênior orientando um iniciante altamente capaz. Sem ambiguidade, sem subentendidos.  
>
> A IA vai interpretar exatamente o que você escreveu — não o que você quis dizer. Se a instrução for vaga, o resultado será vago.  
>
> **Exemplo de prompt pouco claro:** *"Melhore esse código."*  
> **Exemplo de prompt claro:** *"Refatore esse método para seguir o princípio de responsabilidade única, sem alterar o comportamento externo e mantendo os testes existentes passando."*

---

**Pilar 02 — CONTEXTO**

> Forneça o cenário, o histórico e as restrições. A IA executa um erro com a mesma velocidade que executa um acerto.  
>
> Contexto inclui: qual sistema está sendo modificado, quais são as regras de negócio relevantes, quais decisões já foram tomadas e por quê, e quais são os limites que não podem ser ultrapassados.  
>
> **Dica:** Quanto mais você tratar a IA como um colaborador que acabou de entrar no projeto, mais assertivo será o resultado.

---

**Pilar 03 — EXEMPLOS**

> Mostrar é mais eficiente do que explicar. Sempre que possível, inclua um exemplo do resultado esperado.  
>
> Em vez de descrever o formato da saída, mostre um caso concreto. A IA aprende por padrão — dar um exemplo é o atalho mais eficiente para alinhar expectativas.  
>
> **Exemplo:** Ao pedir um relatório, cole um exemplo de relatório bem-feito. Ao pedir refatoração, mostre um trecho já refatorado como referência.

---

**Pilar 04 — ITERAÇÃO**

> Encare a comunicação com a IA como um ciclo, não como um disparo único. Refine, ajuste, recalibre.  
>
> Nenhum prompt perfeito sai de primeira — assim como nenhuma conversa importante acontece em uma única fala. Se o resultado não for o ideal, analise onde a instrução falhou e tente novamente com mais precisão.  
>
> **Postura correta:** *"O resultado não foi o esperado. O que no meu prompt causou isso?"* — não *"A IA não presta."*

---

### Nota editorial
Os 8 pilares originais da engenharia de prompt foram condensados nos 4 mais estratégicos para este público. Os demais (divisão de tarefas, estruturação, papel/tom, restrições) são incorporados naturalmente nas explicações dos 4 pilares acima e na seção de Spec-Driven Development (Seção 21).

---

---

# SEÇÃO 11 — ANATOMIA DO DEVIN

**Tipo de seção:** Técnico-introdutório  
**Âncora:** `#anatomia-devin`  
**Rótulo de seção:** `ANATOMIA · DEVIN`

### Título
> Por dentro do agente: quatro componentes essenciais.

### Subtítulo
> O Devin opera como um programador júnior altamente focado — com as mesmas ferramentas que você usa no dia a dia, mas executando de forma autônoma e ininterrupta dentro de um ambiente isolado.

### Quatro componentes (cards ou diagrama de blocos)

---

**Componente 01 — PLANNER**

> **O que é:** O cérebro de planejamento do Devin.  
>
> Antes de escrever uma única linha de código, o Devin decompõe o objetivo em subtarefas verificáveis e as organiza em uma sequência lógica de execução.  
>
> **Por que importa:** Garante que o agente não pule etapas, não improvise escopo e consiga reportar progresso de forma rastreável. Você vê o plano antes da execução e pode intervir.

---

**Componente 02 — SANDBOX**

> **O que é:** Uma máquina virtual isolada criada especificamente para cada sessão.  
>
> O Devin não trabalha no seu ambiente de produção. Cada sessão ganha sua própria infraestrutura efêmera: sistema operacional, dependências, variáveis de ambiente.  
>
> **Por que importa:** Segurança e reprodutibilidade. O que o Devin faz não contamina outros projetos. Ao encerrar a sessão, o ambiente desaparece.

---

**Componente 03 — TOOLKIT**

> **O que é:** O conjunto de ferramentas que o Devin opera de forma autônoma.  
>
> Inclui: shell real (terminal com acesso a comandos), IDE baseado em VSCode e browser navegável. Tudo funcional — não é simulação.  
>
> **Por que importa:** O Devin não apenas lê e escreve código. Ele navega em documentações, clica em interfaces web, roda builds e interpreta resultados de testes — como um desenvolvedor humano faria.

---

**Componente 04 — FEEDBACK LOOP**

> **O que é:** O ciclo de autovalidação antes de propor qualquer entrega.  
>
> Antes de abrir um Pull Request, o Devin executa linters, roda testes automatizados e verifica os critérios de aceite definidos na spec. Se algo falha, ele lê a mensagem de erro e tenta corrigir de forma autônoma.  
>
> **Por que importa:** Reduz drasticamente o número de PRs com bugs óbvios ou falhas de lint. O agente entrega algo que pelo menos passou na bateria local — não apenas "parece certo".

---

---

# SEÇÃO 12 — CONTEXTO PERSISTENTE: VISÃO GERAL

**Tipo de seção:** Introdução a conceitos técnicos  
**Âncora:** `#contexto-persistente`  
**Rótulo de seção:** `CONTEXTO PERSISTENTE`

### Título
> Três formas de ensinar a máquina a respeitar a sua empresa.

### Subtítulo
> Não é magia. É contexto bem entregue.  
> O Devin não tem memória permanente entre sessões por padrão — mas você pode alimentá-lo com três tipos de conhecimento persistente que mudam completamente a qualidade do trabalho gerado.

### Tabela comparativa (três colunas)

| | **SKILLS** | **PLAYBOOKS** | **KNOWLEDGE** |
|-|------------|---------------|---------------|
| **Onde reside** | No repositório (`.agents/skills/SKILL.md`) | Na Web App do Devin (interface UI) | Painel Settings > Knowledge |
| **Escopo** | Específico do repositório | Global na organização | Por repo, global ou livre |
| **Ativação** | Automática pelo contexto ou via `@skills:name` | Manual ou via `!macro` | Trigger semântica contextual |
| **Analogia** | *"Saber usar o termômetro de precisão"* — uma habilidade técnica específica | *"Criar uma receita reutilizável"* — um modo de preparo padronizado | *"Saber que ácido corta gordura"* — um princípio que guia decisões |
| **Versionado no Git?** | ✅ Sim | ❌ Não (vive na UI) | ❌ Não (configurado no painel) |

### Nota editorial
As três próximas seções (Skills, Playbooks, Knowledge) detalham cada um desses mecanismos individualmente com exemplos práticos. Esta seção serve como mapa de orientação.

---

### Nota para o Desenvolvedor Front-end (UI/UX)

⚠️ **Importante para experiência do utilizador:** As Secções 13 (Skills), 14 (Playbooks) e 15 (Knowledge) contêm conteúdo detalhado que, se apresentado como blocos de texto contínuos empilhados verticalmente, criará **fadiga de scroll e sobrecarga cognitiva**.

**Recomendação obrigatória:** Implemente uma das seguintes abordagens:

1. **Tabs Horizontais (Recomendado):** Use um componente de abas com três separadores — "Skills", "Playbooks", "Knowledge". O utilizador clica em cada aba e o conteúdo atualiza-se no mesmo espaço visual, evitando scroll excessivo.

2. **Acordeão (Accordion):** Apresente os três tópicos como cards colapsáveis. O utilizador clica em "Skills" para expandir, lê, colapsa, depois clica em "Playbooks". Menos "jumpy" que tabs em mobile, mas mais scroll que tabs em desktop.

3. **Carrossel Horizontal com Snap (Mobile-first):** Para mobile, um carrossel horizontal com snap points. Desktop pode usar a versão de tabs.

**Responsividade:** Em qualquer caso, garanta que em mobile (viewport < 768px) o componente continua usável — sem tabelas largas, sem texto truncado, sem necessidade de scroll horizontal.

---

---

# SEÇÃO 13 — SKILLS

**Tipo de seção:** Técnico / Operacional  
**Âncora:** `#skills`  
**Rótulo de seção:** `CONTEXTO · SKILLS`

### Título
> Skills: o kung fu do agente, vivendo no seu repositório.

### Subtítulo
> Arquivos markdown que ensinam o Devin a executar procedimentos específicos do seu projeto de forma padronizada e reproduzível.

### Explicação
> Uma Skill é um arquivo `.md` localizado em `.agents/skills/` do repositório, seguindo o padrão aberto Agent Skills. Ela funciona como um "procedimento operacional padrão" técnico: define o que fazer, com quais ferramentas, em que condições.  
>
> Diferente de um Playbook (que vive na UI e é global), a Skill vive junto com o código — é versionada, revisada em PR e documentada como qualquer outro artefato do projeto.

### Quatro características das Skills

**Estrutura declarativa**
> O arquivo tem um cabeçalho YAML (`frontmatter`) com campos como `name`, `description`, `allowed-tools` e `triggers`. O corpo é markdown com as instruções em linguagem natural.

**Conteúdo dinâmico**
> Suporta `$ARGUMENTS`, `$0` e comandos especiais em tempo de execução, permitindo que uma Skill receba parâmetros variáveis — como o nome de um módulo ou uma flag de ambiente.

**Padrão aberto**
> O formato é compatível com outras ferramentas do ecossistema de IA (não fica preso ao Devin). Times que futuramente migrarem de ferramenta podem reaproveitar as Skills.

**Auto-sugestão**
> Se o Devin descobrir durante uma sessão uma forma mais eficiente de executar uma tarefa recorrente, ele pode abrir um PR sugerindo a criação ou atualização de uma Skill. O time decide se aceita.

### Exemplo de arquivo de Skill

```markdown
---
name: run-tests
description: Executa a suite completa de testes Apex antes de qualquer PR
allowed-tools: [bash]
triggers: ['rodar testes', 'test', 'validar cobertura']
---

# Execução de Testes

Sempre execute o comando abaixo antes de propor qualquer Pull Request:

sf apex test run --code-coverage --result-format human

Somente considere a tarefa concluída se:
- Todos os testes passarem (0 falhas)
- A cobertura de código for ≥ 75%

Se algum teste falhar, leia o stack trace, identifique a causa raiz e corrija
antes de prosseguir. Não abra PR com testes falhando.
```

**Onde esse arquivo fica:**
```
.agents/skills/run-tests.md
```

**Como o Devin usa:**
> Sempre que uma sessão contiver palavras como "rodar testes" ou "validar cobertura", o Devin localiza automaticamente essa Skill e a executa como parte do seu fluxo — sem que você precise repetir a instrução.

---

### Referências Oficiais

> As Skills seguem o **padrão aberto Agent Skills specification**, compatível com o ecossistema de IA. Para mais detalhes sobre a estrutura completa e melhores práticas:
> - [Agent Skills Specification (Standard Aberto)](https://github.com/anthropics/agent-skills)
> - [Documentação do Devin sobre Skills](https://docs.devin.ai/product-guides/skills)

---

# SEÇÃO 14 — PLAYBOOKS

**Tipo de seção:** Técnico / Operacional  
**Âncora:** `#playbooks`  
**Rótulo de seção:** `CONTEXTO · PLAYBOOKS`

### Título
> Playbooks: prompts reutilizáveis com a precisão de um SOP.

### Subtítulo
> Estruturados, imperativos e compartilháveis em toda a organização. Um Playbook é um protocolo de execução — não uma sugestão.

### Explicação geral
> Um Playbook é um bloco de instrução persistente configurado na interface web do Devin e disponível para toda a organização. Ele funciona como um "macro" ativável manualmente (`!nome-do-playbook`) que injeta um conjunto padronizado de instruções na sessão ativa.  
>
> Diferente de uma Skill (que é contextual e automática), um Playbook é explicitamente invocado. Use Playbooks para fluxos de trabalho que envolvem múltiplas etapas, credenciais externas e decisões que variam por execução.

### Quatro elementos de um Playbook bem estruturado

---

**PROCEDURE — Passos sequenciais**

> O núcleo de qualquer Playbook. Lista as ações em ordem, uma por linha, seguindo o princípio MECE (mutuamente exclusivas, coletivamente exaustivas). Cada passo deve ser atômico e verificável.  
>
> **Exemplo prático — Playbook de deploy para Sandbox Salesforce:**
> ```
> 1. Verifique se há mudanças não commitadas no branch atual
> 2. Execute sf project retrieve start --metadata ApexClass para sincronizar
> 3. Rode a suite de testes: sf apex test run --code-coverage
> 4. Confirme que a cobertura está ≥ 75% antes de prosseguir
> 5. Faça o deploy para a Sandbox: sf project deploy start --target-org sandbox-bupj
> 6. Confirme o resultado do deploy no log e reporte ao usuário
> ```

---

**SPECIFICATIONS — Definition of Done**

> Critérios objetivos que definem quando uma tarefa está completa. O Devin só considera a sessão encerrada quando todas as condições listadas aqui são atendidas.  
>
> **Exemplo prático — Spec de Aceite para refatoração Apex:**
> ```
> ✅ O método refatorado mantém os mesmos parâmetros de entrada e saída
> ✅ Todos os testes existentes continuam passando (sem regressão)
> ✅ Nenhum novo warning de SonarQube foi introduzido
> ✅ O código segue o padrão de nomenclatura definido em Knowledge (camelCase para variáveis)
> ✅ Um comentário explicativo foi adicionado para qualquer lógica não-óbvia
> ```

---

**ADVICE — Correção de vieses**

> Instruções que corrigem padrões problemáticos que o modelo tende a repetir em contextos específicos. Funcionam como lembretes de calibração para o agente.  
>
> **Exemplo prático — Advice para o contexto Salesforce:**
> ```
> ⚠️ Nunca faça queries SOQL dentro de loops. Sempre use abordagens em lote (batch).
> ⚠️ Não use DML statements em métodos de trigger sem verificação de limite de governor.
> ⚠️ Quando houver ambiguidade entre duas abordagens, prefira a que tem menor consumo de
>    governor limits — consulte Knowledge para referência de limites da BUPJ.
> ```

---

**REQUIRED FROM USER — Informações que o agente não pode inferir**

> Lista explícita de tokens, credenciais, identificadores de ambiente ou inputs humanos que o Playbook precisa mas não pode obter sozinho. O Devin irá pausar e solicitar essas informações antes de executar.  
>
> **Exemplo prático — Playbook de hotfix em produção:**
> ```
> Antes de iniciar, forneça:
> - Alias da org de produção (ex: prod-bupj-main)
> - Número do caso no ALM relacionado a esta correção
> - Confirmação explícita de que o período de blackout não está ativo: [SIM/NÃO]
> ```

---

---

# SEÇÃO 15 — KNOWLEDGE

**Tipo de seção:** Técnico / Operacional  
**Âncora:** `#knowledge`  
**Rótulo de seção:** `CONTEXTO · KNOWLEDGE`

### Título
> Knowledge: o onboarding que você daria a um engenheiro sênior no primeiro dia.

### Subtítulo
> Não é um PDF injetado na conversa. É contexto recuperado por relevância semântica — o Devin busca e lê apenas o que é pertinente para a tarefa em execução.

### O que torna o Knowledge diferente

> Quando você onborda um desenvolvedor sênior em um projeto legado, não entrega uma pilha de 500 páginas de documentação. Você diz coisas como:  
> *"Aqui usamos PostgreSQL legado — nunca faça queries SQL em loops."*  
> *"O módulo de pagamento tem uma particularidade: ele não pode ser chamado fora da camada de serviço."*  
> *"Toda migração precisa passar pela revisão do arquiteto antes de ir para staging."*  
>
> É exatamente isso que o Knowledge faz. Você configura fragmentos de contexto com uma **trigger semântica**: quando a tarefa do Devin se torna relevante para aquele fragmento, ele o lê automaticamente. Caso contrário, o fragmento não é carregado — evitando ruído e desperdício de contexto.

### Como o Knowledge funciona na prática

**Triggers semânticas**
> Cada item de Knowledge tem uma descrição que define *quando* ele deve ser ativado. O Devin interpreta semanticamente a tarefa e decide quais fragmentos de Knowledge são relevantes para aquela sessão específica.  
>
> Uma sessão de refatoração de front-end **não** ativará o Knowledge sobre regras de banco de dados. Uma sessão de query optimization **não** ativará o Knowledge sobre padrões de componentes Lightning.

**Organização hierárquica**
> O Knowledge pode ser organizado em pastas e ativado em lote. Pode ser associado a um repositório específico, a toda a organização, ou configurado como "livre" (sem associação de escopo). Itens podem ser "pinados" para sempre estarem disponíveis.

**Leitura automática de arquivos de configuração**
> O Devin lê automaticamente arquivos como `AGENTS.md`, `.cursorrules` e `CLAUDE.md` presentes no repositório e os converte em Knowledge sem configuração manual.

**DeepWiki**
> Recurso que indexa o repositório inteiro e gera diagramas de arquitetura de forma automatizada em background. Permite que o Devin entenda a estrutura do projeto antes de executar qualquer tarefa — sem que você precise explicar onde está cada módulo.

### Exemplo prático: configurando um Knowledge para o contexto BUPJ

**Situação real:** O time tem um banco de dados PostgreSQL legado com uma regra crítica — qualquer query dentro de um loop causa degradação severa de performance.

**Configuração no painel Settings > Knowledge:**

```
NOME: Regras de acesso ao banco PostgreSQL legado

TRIGGER (quando ativar):
"Sempre que a sessão envolver queries SQL, acesso ao banco de dados,
ou qualquer código que itere sobre coleções de registros."

CONTEÚDO:
Regras críticas para o banco PostgreSQL legado da BUPJ:

1. NUNCA execute queries SQL dentro de loops. A penalidade de performance
   é exponencial com o volume de registros.

2. Sempre use abordagens em lote via db_utils.py. Exemplo:
   # Correto:
   results = db_utils.batch_query(ids, "SELECT * FROM orders WHERE id = ANY(%s)")
   
   # Incorreto:
   for id in ids:
       result = db.execute("SELECT * FROM orders WHERE id = %s", id)

3. Para queries complexas com múltiplos JOINs, crie uma View no banco
   antes de expor via API. Não otimize em Python o que pode ser
   otimizado no banco.

4. Toda nova query que acesse tabelas com > 1M registros precisa de
   revisão do arquiteto antes de ir para produção.
```

**O que acontece:** Quando uma sessão envolver código de acesso a dados, o Devin lê automaticamente esse fragmento e o aplica às decisões que toma — sem que você precise repetir essa instrução a cada sessão.

### Outros usos práticos do Knowledge para o contexto BUPJ

- **Padrões de nomenclatura:** Convenções de variáveis, classes, métodos e arquivos do projeto
- **Regras de segurança:** Quais dados nunca podem ser logados, quais endpoints requerem autenticação
- **Particularidades do Salesforce corporativo:** Limites de governor personalizados, orgs disponíveis, políticas de deploy
- **Arquitetura do sistema:** Quais módulos dependem de quais, quais não podem ser modificados sem aprovação
- **Código de conduta de PR:** Tamanho máximo de PR aceito, template de descrição, reviewers obrigatórios por módulo

---

### Referências Oficiais

> Para aprofundar-se no Knowledge e explorar casos de uso mais avançados:
> - [Guia oficial de Knowledge do Devin](https://docs.devin.ai/product-guides/knowledge)
> - [Melhores práticas de configuração de Knowledge em Enterprise](https://docs.devin.ai/guides/knowledge-enterprise)

---

---

# SEÇÃO 16 — TRANSIÇÃO: HANDS-ON

**Tipo de seção:** Divisor interno / Introdução ao bloco prático  
**Âncora:** `#hands-on-intro`

### Conteúdo

**Rótulo:**
> HANDS-ON

**Título:**
> Devin CLI + Salesforce + SDD

**Frase:**
> Da spec à validação automática.

**Descrição contextual:**
> Demonstração em ambiente real: Devin CLI na raiz de um projeto Salesforce, conectado à Org de Sandbox corporativa.

---

---

# SEÇÃO 17 — HANDS-ON: SPEC-DRIVEN DEVELOPMENT (SDD)

**Tipo de seção:** Conceitual-prático  
**Âncora:** `#sdd`  
**Rótulo de seção:** `HANDS-ON · SDD`

### Título
> Spec-Driven Development: a especificação como fonte da verdade.

### Subtítulo
> Em vez de o agente adivinhar, ele lê. Em vez de improvisar, ele segue uma partitura.

### Comparação antes/depois (dois painéis lado a lado)

**ANTES — Prompt Avulso**
> O desenvolvedor descreve uma tarefa de forma informal no chat. O agente improvisa com base na sua interpretação. O resultado varia com o prompt, o contexto da sessão e até com o humor estatístico do modelo. A mesma tarefa repetida amanhã pode gerar um resultado diferente.

**COM SDD — Spec Versionada**
> O desenvolvedor cria um documento estruturado com objetivo, escopo, critérios de aceite e restrições. O agente lê esse documento antes de qualquer execução. A tarefa é reproduzível, auditável e revisável pela equipe inteira antes de ser executada.

**EFEITO — Reprodutibilidade**
> A mesma spec gera o mesmo comportamento em qualquer sessão, com qualquer membro do time. Bugs encontrados na execução revelam falhas na spec — não no agente. Isso inverte a dinâmica de debugging: você melhora a especificação, não só o código.

---

---

# SEÇÃO 18 — HANDS-ON: ESTRUTURA DO PROJETO

**Tipo de seção:** Técnico / Referência  
**Âncora:** `#estrutura`  
**Rótulo de seção:** `HANDS-ON · ESTRUTURA`

### Título
> A pasta de especificações: o ponto de partida do agente.

### Subtítulo
> Tudo versionado no Git. Tudo revisável antes da execução.

### Estrutura de pastas do projeto

```
salesforce-bupj-project/
│
├── force-app/
│   └── main/default/classes/
│       ├── OrderService.cls
│       └── OrderServiceTest.cls
│
├── sfdx-project.json
│
├── .agents/
│   └── skills/
│       └── run-tests.md
│
└── specs/
    ├── _template.spec.md         ← Template base para novas specs
    ├── 001-filtro-data.spec.md   ← Spec em execução
    └── 002-refactor-pagamento.spec.md
```

### Anatomia de uma Spec (template)

```markdown
# Objetivo
O que queremos resolver, em uma frase clara e não ambígua.
Exemplo: "Adicionar filtro por data ao método getOrders() da classe OrderService."

# Contexto
Por que isso importa. Sistema, módulo, regra de negócio envolvida.
Exemplo: "O endpoint /api/orders hoje retorna todos os pedidos sem paginação,
causando timeout em orgs com > 10k registros."

# Critérios de Aceite
Checklist objetivo do Definition of Done. Cada item deve ser verificável.
- [ ] O método aceita parâmetros startDate e endDate do tipo Date
- [ ] Registros fora do intervalo não são retornados
- [ ] Testes unitários cobrem os casos: intervalo válido, sem registros, datas invertidas
- [ ] Cobertura de código ≥ 75%

# Restrições
O que NÃO pode ser feito. Limita o escopo e evita surpresas.
- Não alterar a assinatura pública do método (manter compatibilidade)
- Não modificar a classe OrderServiceTest existente — apenas adicionar novos métodos de teste
- Não introduzir queries SOQL dentro de loops

# Validação
Quais testes ou comandos comprovam o sucesso antes do PR.
sf apex test run --tests OrderServiceTest --code-coverage --result-format human
```

---

---

# SEÇÃO 19 — HANDS-ON: FLUXO DA SPEC AO PR

**Tipo de seção:** Processo / Fluxo operacional  
**Âncora:** `#fluxo`  
**Rótulo de seção:** `HANDS-ON · FLUXO`

### Título
> Quatro passos da Spec até o Apex Test passando.

### Subtítulo
> Devin lê a spec. Devin executa o Salesforce CLI. Devin valida. Você revisa.

### Os quatro passos (timeline ou stepper visual)

---

**Passo 01 — SPEC (Definição SDD)**

> O desenvolvedor cria ou atualiza o arquivo de spec em `/specs/`, descrevendo a regra de negócio, o módulo Apex envolvido e os critérios de aceite.

```bash
vi specs/001-filtro-data.spec.md
```

---

**Passo 02 — RETRIEVE (Descoberta autônoma)**

> O Devin interpreta a spec, identifica quais artefatos Salesforce são relevantes e executa o retrieve via Salesforce CLI da Sandbox corporativa — sem que o desenvolvedor precise listar os arquivos manualmente.

```bash
sf project retrieve start --metadata ApexClass:OrderService
```

---

**Passo 03 — REFATORAR (Edição guiada pela spec)**

> O agente localiza os arquivos recuperados, aplica a regra de negócio descrita na spec e atualiza os testes correspondentes. Cada modificação é guiada pelos critérios de aceite — não por interpretação livre.

```bash
edit force-app/main/default/classes/OrderService.cls
edit force-app/main/default/classes/OrderServiceTest.cls
```

---

**Passo 04 — VALIDAR (Apex Tests automáticos)**

> Antes de propor o PR, o Devin executa a suite de testes unitários no Salesforce CLI. Só finaliza a sessão e abre o PR se todos os testes passarem com a cobertura mínima exigida.

```bash
sf apex test run --code-coverage --result-format human
```

**Saída esperada:**
```
Test Results: 12 passed, 0 failed · coverage 92%
```

---

---

# SEÇÃO 20 — DEMO AO VIVO

**Tipo de seção:** Demonstração / Referência  
**Âncora:** `#demo`  
**Rótulo de seção:** `HANDS-ON · DEMO AO VIVO`

### Título
> Devin CLI · Salesforce Sandbox · ALM ponta a ponta

### Simulação de terminal (bloco de código estilizado)

```bash
~/salesforce-bupj-project — devin

$ devin run --spec specs/001-filtro-data.spec.md

› Planner: decomposing spec into 4 subtasks…

› Executing: sf project retrieve start --metadata ApexClass:OrderService
  ✓ Retrieved 1 ApexClass, 1 ApexTest from sandbox-bupj

› Refactoring OrderService.cls (added dateFilter param)

› Updating OrderServiceTest.cls (3 new assertions)

› Validating: sf apex test run --code-coverage
  ✓ Test Results: 12 passed, 0 failed  ·  coverage 92%

› PR draft created — ready for review.
```

### Legenda explicativa (para o contexto web)
> Este é o fluxo real de uma sessão do Devin executando uma spec do projeto Salesforce BUPJ. Do comando inicial até o PR draft criado, o agente operou de forma autônoma: fez o retrieve, editou dois arquivos e rodou a validação — sem intervenção manual.  
>
> O desenvolvedor entra apenas na última etapa: **revisar o PR**. O seu tempo foi liberado do trabalho mecânico para o trabalho estratégico.

---

---

# SEÇÃO 21 — TRANSIÇÃO: ATO III

**Tipo de seção:** Divisor de capítulo  
**Âncora:** `#ato-3`

### Conteúdo

**Rótulo:**
> ATO III

**Título do ato:**
> Cultura, time e gestão

**Frase de transição:**
> Agora que vimos o instrumento —  
> como tocamos juntos?

---

---

# SEÇÃO 22 — MAESTRIA PESSOAL

**Tipo de seção:** Comportamental / Desenvolvimento profissional  
**Âncora:** `#maestria-pessoal`  
**Rótulo de seção:** `MAESTRIA PESSOAL`

### Frase de abertura (destaque visual)
> O cirurgião não pega o livro de anatomia no meio da cirurgia.

### Introdução narrativa
> Quando a IA escreve código mais rápido do que você lê, o que justifica a sua presença no time?  
>
> A resposta não é "experiência com ferramentas" — ferramentas mudam toda semana. A resposta está em três dimensões de desenvolvimento profissional que a IA não substitui: o que você sabe profundamente, o que você treinou até virar instinto, e como você usa a IA a seu favor — em vez de se desgastar tentando competir com ela.  
>
> Pense num cirurgião cardíaco no meio de uma operação. Ele não consulta o livro. Não improvisa o movimento. Não está se esforçando — está em fluxo. Por três razões bem distintas:

### Três pilares (cada um como bloco expandível ou card com profundidade)

---

**Pilar 1 — CONHECIMENTO**  
*"Domínio da anatomia"*

> O cirurgião dominou anatomia, fisiologia e técnicas cirúrgicas durante anos de estudo antes de pisar na sala de cirurgia.  
>
> No nosso mundo: arquitetura de sistemas, design patterns, segurança de aplicações, modelagem de dados. Esses fundamentos não mudam quando o framework muda. Eles são o que te permite **julgar se o código gerado pela IA é correto** — não apenas se compila.  
>
> A IA é o bisturi. Mas é você quem opera. E operar com bisturi sem saber anatomia é perigoso.  
>
> **Implicação prática:** Invista seu tempo liberado pela IA em aprofundar fundamentos, não apenas em explorar novas ferramentas. O desenvolvedor que entende o *porquê* por trás do código gerado é insubstituível. O que apenas aceita o output sem entendê-lo é descartável.

---

**Pilar 2 — TREINAMENTO**  
*"Memória muscular"*

> O cirurgião simulou centenas de cenários antes de sua primeira cirurgia real. Bugs em ambiente controlado, incidentes com segurança, crises planejadas. Quando o imprevisto acontece na sala de cirurgia, seu corpo sabe o que fazer — porque já fez antes.  
>
> No nosso mundo: post-mortems de incidentes, simulações de crise, debugging de sistemas complexos, revisões de código rigorosas. Quando a produção cai às 2h da manhã e a IA não consegue diagnosticar o problema porque o contexto é ambíguo — é a **memória muscular do desenvolvedor** que salva.  
>
> A IA não sente a pressão de um sistema fora do ar. Você sente. E é exatamente essa capacidade de operar sob pressão que o treinamento constrói — e que a ferramenta jamais vai replicar.

---

**Pilar 3 — APERFEIÇOAMENTO**  
*"Ritmo, não força bruta"*

> O cirurgião não usa força para fazer uma incisão. Ele usa ritmo, ângulo, preparação e precisão. O resultado parece fácil para quem assiste — porque o domínio real sempre parece fácil de fora.  
>
> No nosso mundo: aperfeiçoamento não é trabalhar mais horas ou usar mais ferramentas. É trabalhar com mais precisão, aproveitando a IA como alavanca — não como muleta.  
>
> Use a IA como o trapezista usa o balanço: para ganhar impulso e altura, não para sofrer menos. O trapezista ainda precisa soltar no momento certo, girar com precisão e agarrar o parceiro — a ferramenta só funciona porque ele tem maestria.  
>
> **Implicação prática:** Medir o seu desenvolvimento por "quanto código a IA gerou por você" é a métrica errada. A métrica certa é: "qual a complexidade dos problemas que eu consigo resolver — com ou sem IA?"

---

### Frase de encerramento da seção (impacto visual)
> Estudar, treinar, se aperfeiçoar — não é para você trabalhar mais.  
> É para você trabalhar **melhor**.

---

---

# SEÇÃO 23 — FRASE DE IMPACTO: O ESTAGIÁRIO BRILHANTE

**Tipo de seção:** Pausa / Respiração narrativa  
**Âncora:** `#estagiario`

### Conteúdo

**Linha 1:**
> O Devin é um estagiário brilhante.

**Linha 2 (destaque, peso visual maior):**
> Você ainda precisa ser o sênior.

### Nota editorial
Essa seção é a transição entre Maestria Pessoal (individual) e Maestria Coletiva (time). O estagiário brilhante executa com velocidade e entusiasmo. O sênior define direção, arbitra decisões e assume responsabilidade. O que muda com o Devin não é a necessidade do sênior — é que agora o sênior tem um estagiário incansável e infinitamente escalável.

---

---

# SEÇÃO 24 — MAESTRIA COLETIVA

**Tipo de seção:** Liderança / Cultura organizacional  
**Âncora:** `#maestria-coletiva`  
**Rótulo de seção:** `MAESTRIA COLETIVA`

### Título
> Para a sinfonia funcionar, quatro elementos em sincronismo.

### Subtítulo narrativo
> Quando você assiste a uma orquestra sinfônica, o que arrepia não é o volume. Não é o solista. É o sincronismo — a sensação de que centenas de decisões individuais se fundiram em uma única intenção.  
>
> No Vibe Coding, se cada desenvolvedor usar a IA no seu próprio ritmo, sem alinhamento, o resultado não é uma sinfonia. É ruído.  
>
> Quatro elementos precisam estar em sincronia para que o time produza algo que vai além da soma das partes:

### Quatro elementos (cards ou layout em grade)

---

**A PARTITURA — Processo e Planejamento**

> Nenhum músico senta no palco e decide o que vai tocar na hora. A partitura é o planejamento estratégico, a arquitetura definida, os processos ágeis desenhados e os rituais de alinhamento.  
>
> Sem partitura, o esforço se perde em improvisação. Cada desenvolvedor segue sua própria interpretação, os entregáveis não convergem e o cliente recebe algo que ninguém planejou de verdade.  
>
> Na prática: arquitetura documentada, refinamentos com critérios claros, specs versionadas no Git, backlog com histórias que têm Definition of Done explícito.

---

**OS INSTRUMENTOS — Ferramentas e IA**

> Um violino desafinado não é apenas ineficiente — ele destrói a apresentação de toda a orquestra.  
>
> Devin, Copilot, Stackspot, frameworks e pipelines de CI/CD são os instrumentos da nossa orquestra. Amplificam o talento — mas precisam ser escolhidos corretamente, calibrados para o projeto e usados com disciplina.  
>
> Um time que usa dezessete ferramentas sem integração, sem padronização e sem Skills/Playbooks configurados não está sendo mais produtivo — está criando ruído estruturado.

---

**OS MÚSICOS — Pessoas e Treinamento**

> A melhor partitura do mundo não soa bem se for executada por quem não domina o instrumento.  
>
> Dev, UX, negócio — são os especialistas. É o humano quem sente a emoção da música, aplica o pensamento crítico e toma decisões em tempo real quando a partitura é ambígua.  
>
> A ferramenta não toca sozinha. E times sem investimento em desenvolvimento humano — por mais avançada que seja a IA disponível — continuarão produzindo código sem alma.

---

**O MAESTRO — Liderança e Sincronismo**

> O Maestro é a única pessoa no palco que não produz um único som.  
>
> Ele não toca pelo músico. Ele não improvisa pelo instrumento. O que ele faz — e que ninguém mais no palco consegue fazer — é garantir que todos entrem em cena no milissegundo exato.  
>
> Na tecnologia, o líder é quem olha para o todo enquanto cada especialista olha para o seu instrumento. Ele percebe quando o time de UX está correndo demais, quando o banco de dados ficou para trás, quando a IA está sendo usada de forma ineficiente, quando o PO está especificando de forma vaga demais para o mundo do Vibe Coding.  
>
> **Liderança, na era da IA, não é cobrar prazo. É proteger o sincronismo.**

---

### Nota editorial
O Slide 28 original ("O Maestro é a única pessoa no palco que não produz um único som") foi eliminado como seção isolada. Essa frase, que é o ponto de chegada emocional desta seção, está integrada ao card do Maestro acima — onde tem contexto, peso e impacto. Reproduzi-la como tela independente imediatamente após diluía seu efeito.

---

---

# SEÇÃO 25 — POR QUE SOFTWARE TEM UMA FÍSICA DIFERENTE

**Tipo de seção:** Contextualização / Ponte narrativa  
**Âncora:** `#fisica-diferente`  
**Rótulo de seção:** `FÍSICAS DIFERENTES`

### Por que esta seção existe aqui

> Antes de falar sobre como o Ágil deve evoluir na era da IA, é preciso entender por que ele existe em primeiro lugar — e por que ele é necessário de forma que a engenharia civil nunca precisou.

### Título
> A gravidade não muda de ideia. O mercado, sim.

### Desenvolvimento narrativo
> A engenharia de software sempre tentou copiar a engenharia civil. E há boas razões para isso: vídeos de prédios sendo erguidos em três dias circulam todo mês. Pontes montadas em horas. Estruturas montadas com precisão milimétrica em tempo recorde.  
>
> Mas há uma diferença fundamental que raramente é dita em voz alta: **a engenharia civil trabalha com leis imutáveis**.  
>
> A gravidade não muda de ideia. A resistência do concreto não altera de humor. A tensão do aço não é afetada por uma reorganização societária. O comportamento de materiais físicos é previsível, mensurável e constante.

### Comparação (dois painéis lado a lado)

**ENGENHARIA CIVIL**
> - Gravidade é uma constante física
> - Resistência do concreto é previsível e mensurável
> - Pontes montadas em horas funcionam porque as regras não mudam durante a montagem
> - Especificação raramente muda depois de aprovada
> - O "cliente" raramente descobre no meio da obra que queria uma rodovia, não uma ponte

**ENGENHARIA DE SOFTWARE**
> - Mercado é volátil, tempestuoso e caprichoso
> - Comportamento humano muda — e o software serve ao comportamento humano
> - O que era prioridade absoluta na segunda pode ser obsoleto na sexta
> - Especificação é um organismo vivo — muda conforme o negócio aprende
> - O cliente frequentemente descobre o que quer ao ver o que não quer

### Conclusão da seção (ponte para o Ágil)
> É exatamente por isso que o Ágil existe: não como burocracia, não como ritual — mas como resposta estrutural à natureza volátil do nosso material de trabalho.  
>
> E agora, com a IA reduzindo o tempo de codificação de dias para segundos, essa volatilidade exige que o Ágil também evolua. Porque uma orquestra que para a cada cinco minutos para afinar os instrumentos não entrega sinfonia — entrega ruído com intervalos.

---

---

# SEÇÃO 26 — ÁGIL NA ERA DA IA

**Tipo de seção:** Gestão / Metodologia  
**Âncora:** `#agil`  
**Rótulo de seção:** `ÁGIL NA ERA DA IA`

### Título
> O refinamento agora é o seu super-prompt.

### Subtítulo
> Se o pedido for vago, a IA executa o erro na velocidade da luz.

### Desenvolvimento introdutório
> Com o Vibe Coding, o gargalo do desenvolvimento não é mais a velocidade de digitação do código — é a clareza da decisão. A IA eliminou o custo técnico do trabalho braçal. O que sobrou é o trabalho cognitivo: especificar bem, priorizar com critério, e garantir que o time inteiro esteja produzindo em direção ao mesmo resultado.  
>
> Isso muda o peso de todas as cerimônias ágeis. Veja como:

### Quatro elementos ágeis reinterpretados

---

**01 — REFINAMENTO = SUPER-PROMPT**  
*(Clareza e Contexto)*

> No desenvolvimento tradicional, times gastavam horas estimando o esforço técnico de uma tarefa. Com o Vibe Coding, a dificuldade técnica diminuiu — mas o peso da decisão aumentou.  
>
> O backlog não pode ser um depósito de ideias vagas. O PO e o time de negócio precisam especificar com a clareza de quem está delegando para um desenvolvedor sênior. Se o "pedido ao cozinheiro" chegar ambíguo no refinamento, a IA vai executar o erro com precisão e velocidade absolutas — gastando ACUs e tempo de revisão desnecessariamente.  
>
> **O refinamento se torna, na prática, o momento de construção do prompt mais importante da sprint.**

---

**02 — KANBAN = MISE EN PLACE**  
*(Proteção do sistema cognitivo)*

> O Kanban não é um quadro para vigiar o time. É a bancada preparada antes do serviço — o mise en place do restaurante.  
>
> Seu propósito é visualizar o fluxo e controlar o WIP (Work In Progress) para proteger o sistema cognitivo do time. Num ambiente onde a IA entrega tarefas rápido demais, sem controle de WIP o time tenta fazer oito coisas ao mesmo tempo e nenhuma delas fica bem.  
>
> **A ferramenta de código nunca se cansa. O cérebro humano, sim.** O Kanban existe para proteger o único componente do sistema que não é escalável infinitamente.

---

**03 — SCRUM = RESPIRAÇÃO**  
*(Cadência, não prazo de esgotamento)*

> A Sprint não é um prazo de esgotamento. É a cadência do trapezista — o balanço que dá impulso e o momento de revisão que corrige a rota.  
>
> O planejamento da Sprint ganha impulso. A Review valida se o resultado converge com o que o negócio esperava — num mundo de entregas rápidas, esse momento de calibração é mais crítico do que nunca. A Retrospectiva ajusta o ritmo antes da próxima sequência.  
>
> **O Scrum não serve para entregar mais. Serve para garantir que o que está sendo entregado é o que deveria ser entregado.**

---

**04 — SCRUM MASTER = MAESTRO**  
*(Protetor da mente da equipe)*

> O Scrum Master na era da IA não é um cobrador de planilhas. É a extensão do Maestro — aquele que olha para o todo enquanto cada músico olha para a sua partitura.  
>
> Ele observa os gargalos: a área de negócios está especificando com clareza suficiente? O UX está entregando antes da IA começar? O desenvolvedor está conseguindo orquestrar a IA ou está travado em problema de ambiente?  
>
> **O papel da facilitação ágil é blindar a mente da equipe do caos externo — garantindo que Knowledge, Treinamento e Aperfeiçoamento tenham o palco ideal para se tornarem resultado.**

---

---

# SEÇÃO 27 — MÉTRICAS E METAS

**Tipo de seção:** Estratégico / Intelectual  
**Âncora:** `#metricas`  
**Rótulo de seção:** `MÉTRICAS E METAS`

### Título
> Lei de Goodhart: o paradoxo das métricas.

### Subtítulo
> Quando uma métrica se torna meta, ela deixa de ser uma boa métrica.

### Desenvolvimento narrativo
> Existe uma máxima chamada Lei de Goodhart, e ela define o maior risco do nosso contexto atual: times que trabalham mais rápido graças à IA, mas que otimizam o número — não o resultado.  
>
> Métricas são instrumentos de diagnóstico. Metas são o objetivo final. A confusão entre os dois cria incentivos que destroem o que você tentava medir.

### Analogia do monitor cardíaco
> O número no monitor diz ao médico como está o paciente. É um diagnóstico.  
>
> Mas a meta do médico não é "deixar o número do monitor bonito". A meta é a saúde do paciente.  
>
> Se o médico otimizasse o número — e não o paciente — você teria alguém que ajusta o equipamento em vez de tratar a doença. Isso é exatamente o que acontece quando Velocity vira meta, quando Story Points viram moeda de negociação, quando Lead Time vira KPI de performance individual.

### Tabela de conversão: Do Quê → Para Quê

| Métrica tradicional (O Quê) | Pergunta real (Para Quê) |
|------------------------------|--------------------------|
| Features entregues | A conversão do produto aumentou? |
| Story Points | O ticket de suporte caiu? |
| Lead Time | O usuário voltou a usar a feature? |
| Velocity | O negócio cresceu? |
| Cobertura de testes | O número de bugs em produção caiu? |
| ACUs consumidas | O tempo do desenvolvedor foi liberado para o que importa? |

### Conclusão
> Líderes não são cobradores de planilha. São as pessoas que removem obstáculos para que o tempo poupado pela IA seja reinvestido onde a IA não chega: no pensamento crítico, na arquitetura de soluções e no encantamento do usuário final.  
>
> **Pare de medir o quê. Comece a medir o para quê.**

---

---

# SEÇÃO 28 — CUSTO: ACUs E MODO SLEEP

**Tipo de seção:** Financeiro / Operacional  
**Âncora:** `#acus`  
**Rótulo de seção:** `CUSTO · ACUs`

### Título
> ACU: a unidade de medida do trabalho do Devin.

### Subtítulo
> Não é tempo cronológico. É complexidade × número de ações que o agente executa.

### Explicação principal
> Diferente de uma assinatura de SaaS que cobra por usuário ou por hora, o Devin cobra por **trabalho realizado**. Uma ACU (Agente Compute Unit) representa uma unidade de esforço computacional do agente — quanto mais complexa e ativa a tarefa, mais ACUs ela consome.  
>
> Isso significa que uma tarefa rápida de lint ou de cobertura de teste pode custar muito menos do que uma tarefa que envolve navegar em documentações, refatorar múltiplos arquivos e rodar uma suite de testes completa.

### O que consome ACUs (lista com ícones ou cards)

| Ação | Descrição |
|------|-----------|
| **Planejamento denso** | Decompor objetivos complexos em subtarefas verificáveis |
| **Interações em browser** | Navegar em docs, validar UI, interpretar resultados visuais |
| **Pipelines locais** | Executar builds, rodar suites de teste, fazer deploys na sandbox |
| **Inferência de modelos** | Chamadas a LLMs durante o raciocínio e geração de código |

**Nota para o desenvolvedor front-end (responsividade):** A tabela acima deve transformar-se em cards empilhados em mobile (viewport < 768px). No desktop, manter o layout de tabela.

### Modo Sleep — O Devin não cobra quando está em espera

> Quando o Devin está aguardando uma ação sua, esperando um serviço externo finalizar, ou executando operações que não exigem raciocínio ativo — ele entra automaticamente em **modo Sleep**.  
>
> No modo Sleep, o contador de ACUs **para completamente**. Você não paga por espera.

**Exemplos de quando o Devin entra em Sleep:**

```
Esperando sua resposta a uma pergunta          → Sleep (contador parado)
Aguardando a conclusão de uma suite de CI/CD   → Sleep (contador parado)
Clonando um repositório grande do Git          → Sleep (contador parado)
Esperando aprovação de PR no repositório       → Sleep (contador parado)
```

**Implicação prática:** Se você disparou uma tarefa, foi almoçar e voltou uma hora depois, você pagou apenas pelo tempo em que o Devin estava ativamente trabalhando — não pela hora em que ele ficou aguardando sua volta.

### Referências Oficiais

> Para acompanhar o consumo de ACUs em tempo real e gerenciar orçamento:
> - [Dashboard de consumo (Enterprise Admins)](https://app.devin.ai/settings/consumption)
> - [Analytics de consumo (Org Admins)](https://app.devin.ai/settings/consumption-analytics)
> - [Documentação de pricing oficial](https://devin.ai/pricing)

---

---

# SEÇÃO 29 — PLANOS E SESSION INSIGHTS

**Tipo de seção:** Financeiro / Decisão de compra e uso  
**Âncora:** `#planos`  
**Rótulo de seção:** `CUSTO · PLANOS & SESSION INSIGHTS`

### Título
> Tamanho da sessão = diagnóstico de escopo.

### Subtítulo
> Entender como o Devin classifica o tamanho das sessões é tão importante quanto entender o preço — porque é o que te diz se você está trabalhando da forma certa.

---

### Session Insights: O que o tamanho da sessão revela

> O Devin classifica cada sessão por tamanho (XS, S, M, L, XL) com base na quantidade de ACUs consumidas. Essa classificação não é apenas informação de faturamento — é um **diagnóstico de saúde do escopo da tarefa**.

**Tabela de tamanhos e indicações:**

| Tamanho | Indicação | O que fazer |
|---------|-----------|-------------|
| **XS** | Tarefa cirúrgica e bem definida. Ideal para testes, pequenas correções, ajustes de lint ou cobertura pontual. | ✅ Padrão de excelência. Continue assim. |
| **S** | Tarefa bem fatiada e com critérios claros. Típica de features pequenas ou refatorações pontuais. | ✅ Escopo saudável. Fácil de revisar e reverter. |
| **M** | Escopo adequado para histórias médias. Pode envolver múltiplos arquivos e um ciclo de testes mais amplo. | ⚠️ Atenção ao escopo. Certifique-se de que os critérios de aceite estão explícitos na spec. |
| **L** | Sinal de atenção: a tarefa está ampla demais ou os critérios estão vagos. O agente está tomando decisões que deveriam ser suas. | 🔴 Refine ou divida. Antes de executar novamente, fatie o objetivo em partes menores com specs independentes. |
| **XL** | Sinal vermelho: escopo amplo demais, ausência de restrições claras, ou tarefa que deveria ser um projeto — não uma sessão. | 🔴 Pare e replaneie. Uma sessão XL provavelmente gerou trabalho difícil de revisar e auditar. |

**Nota para o desenvolvedor front-end (responsividade):** Esta tabela é crítica para compreensão. Em mobile, transformar em cards com os campos "Tamanho", "Indicação", "O que fazer" claramente separados. Garantir que nenhuma coluna fica cortada ou requer scroll horizontal.

**Regra prática:**
> Se suas sessões são consistentemente L ou XL, o problema não é o Devin — é a forma como você está especificando as tarefas. Sessões grandes custam mais e entregam menos confiança no resultado. **Tarefas menores e mais precisas produzem mais valor por ACU.**

---

---

# SEÇÃO 30 — FRASE DE FECHAMENTO: MÉTRICAS

**Tipo de seção:** Pausa / Impacto  
**Âncora:** `#para-que`

### Conteúdo

**Linha 1:**
> Pare de medir o quê.

**Linha 2 (maior, destaque):**
> Comece a medir o para quê.

---

---

# SEÇÃO 31 — FECHAMENTO NARRATIVO

**Tipo de seção:** Encerramento emocional  
**Âncora:** `#fechamento`  
**Rótulo de seção:** `FECHAMENTO`

### Frase principal (destaque máximo)
> A máquina faz o trabalho pesado.  
> A maestria continua sendo nossa.

### Desenvolvimento (corpo do fechamento)
> A IA é a ferramenta mais poderosa que a nossa profissão já viu. Ela vai picar a cebola, calibrar o forno, escrever a primeira versão de qualquer coisa. Ela não se cansa, não reclama, não pede aumento.  
>
> Mas o pensamento — esse continua sendo seu.  
>
> A inteligência diante do inesperado — essa continua sendo sua.  
>
> O julgamento sobre o que é certo para aquele cliente, naquele contexto, com aquelas restrições — esse continua sendo exclusivamente humano.  
>
> O ritmo, a maestria, a capacidade de fazer um sistema complexo parecer simples para quem está do outro lado: essas continuam sendo exclusivamente nossas.

---

---

# SEÇÃO 32 — PRÓXIMOS PASSOS

**Tipo de seção:** Call to Action / Orientação prática  
**Âncora:** `#proximos-passos`  
**Rótulo de seção:** `CONVITE À EXPERIMENTAÇÃO`

### Título
> Próximos passos para o seu time.

### Subtítulo
> Comece pequeno. Meça impacto. Itere.

### Quatro passos (cards numerados)

---

**Passo 01 — Escolha uma tarefa real**

> Não comece pelo projeto mais crítico. Escolha algo com escopo pequeno e resultado verificável: um bug bem definido, uma refatoração pontual, cobertura de teste em código existente.  
>
> Critério de seleção: a tarefa deve ter critérios claros de sucesso e consequências baixas se algo der errado. Tamanho ideal: sessão XS ou S.

---

**Passo 02 — Escreva a primeira spec**

> Use o template em `/specs/_template.spec.md`. Escreva o Objetivo em uma frase. Defina os Critérios de Aceite como um checklist verificável. Inclua as Restrições — o que não pode ser feito.  
>
> Não execute ainda. Leia a spec em voz alta. Se soar vaga, reescreva até soar como uma instrução para um desenvolvedor sênior. Esse exercício já vai mudar a forma como você pensa sobre especificação.

---

**Passo 03 — Configure o Knowledge da BUPJ**

> Antes de usar o Devin em produção, configure o que o agente precisa saber sobre o contexto corporativo: regras de segurança, padrões de código, particularidades do Salesforce, limites de governor aplicáveis, políticas de deploy e quaisquer restrições que não estão na documentação pública.  
>
> Esse investimento inicial economiza dezenas de sessões de correção. Um Devin sem Knowledge da BUPJ é um novo desenvolvedor sem onboarding.

---

**Passo 04 — Compartilhe playbooks com o time**

> As eficiências que você descobrir nas primeiras sessões não devem ficar só com você. Padronize os fluxos repetitivos do time em Playbooks compartilhados: alertas do SonarQube, deploys para Sandbox, hotfixes, geração de testes unitários.  
>
> Um time que compartilha Playbooks e Skills evolui coletivamente. Um time onde cada desenvolvedor inventa seu próprio fluxo toda sessão perde o multiplicador mais poderoso do Vibe Coding: a consistência.

---

---

# SEÇÃO 33 — ENCERRAMENTO

**Tipo de seção:** Tela final  
**Âncora:** `#encerramento`

### Conteúdo

**Saudação:**
> Obrigado.

**Convite:**
> Continue a conversa.

**Identificação:**
> Mauricio Yokoyama Issei  
> Itaú BUPJ · Conquista de Novos Clientes

**Chamado à ação discreto (pode ser botão ou link):**
> Feedback e dúvidas: thumbs up / thumbs down nas seções

---

---

## Apêndice: Decisões Editoriais Aplicadas

Esta seção documenta as mudanças estruturais aplicadas em relação ao conteúdo original, para rastreabilidade.

| Slide original | Decisão | Justificativa |
|----------------|----------|---------------|
| Slide 12 + 14 | Slide 14 eliminado. Modo Sleep integrado ao Slide 12 com exemplos completos. | Redundância que diluía o impacto da informação. Uma única seção com exemplos claros é mais eficiente. |
| Slide 13 — Planos & Session Insights | Expandido com tabela detalhada de tamanhos + o que fazer em cada caso, e tabela comparativa de custo entre planos. | Tópico crítico para decisão de uso e orçamento — requeria mais profundidade. |
| Slide 17 — Playbooks | Cada um dos 4 elementos (Procedure, Specifications, Advice, Required from User) ganhou um exemplo prático no contexto Salesforce/BUPJ. | Sem exemplos, os conceitos ficavam abstratos. Exemplos concretos permitem uso imediato. |
| Slide 18 — Knowledge | Reescrito com explicação do mecanismo de triggers semânticas, diferença para Skills/Playbooks, e exemplo completo de configuração. | A seção original não explicava o que torna o Knowledge único. Sem isso, parecia apenas "uma configuração a mais". |
| Slide 25 — Maestria Pessoal | Transformado em seção narrativa com introdução contextual, três pilares com profundidade, e frase de fechamento. | O formato original (título + subtítulo + frase curta × 3) perdia o fio narrativo entre os pilares. |
| Slides 27 + 28 | Slide 28 eliminado. A frase do Maestro integrada como ponto de chegada do card correspondente no Slide 27. | A repetição imediata da frase reduzia seu impacto. Integrada ao contexto, ela ganha força como conclusão natural. |
| Slide 29 — Físicas Diferentes | Reposicionado como Seção 27, imediatamente antes da seção sobre Ágil, com parágrafo de bridge explícito explicando a conexão. | No original, o slide aparecia após uma frase de impacto isolada (Maestro), sem transição para o tema de gestão. O contexto estava ausente. |

---

*Fim da especificação de conteúdo.*  
*Versão: 2.0 — Documento de conteúdo para desenvolvimento web.*  
*Todas as decisões de layout, tipografia, cores e interação são responsabilidade do desenvolvedor.*
