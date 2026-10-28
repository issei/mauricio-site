# Da execução à orquestração do trabalho — áudio comentado

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/da-execucao-a-orquestracao>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-10-28 · Atualizado: 2026-10-28.

## Em síntese

A IA aumenta a capacidade de produzir mais depressa do que a capacidade de verificar. Onde isso acontece, o trabalho humano passa a depender mais de especificar, verificar e responder pelo resultado. O ganho líquido não é garantido.

- **Ganho com limites** — experimentos mostram ganhos em tarefas delimitadas, maiores para novatos; fora do que o modelo faz bem, o desempenho cai.
- **A fila muda de lugar** — dados observacionais mostram mais código e revisão mais longa, sem ganho visível na entrega da organização.
- **Supervisionar custa** — complacência com a automação, fadiga relatada e perda de prática têm evidência, com amostras pequenas.
- **Números corrigidos** — o "caso bancário" do áudio é um benchmark offline do autor; a queda de entrega citada não tem fonte; o 33% é diferença entre grupos.

## Conteúdo completo da página

Áudio comentado · Trabalho e IA

### Da execução à orquestração do trabalho

A IA aumenta a capacidade de produzir mais depressa do que aumenta a capacidade de verificar e integrar o que foi produzido. Onde isso acontece, o trabalho humano passa a depender mais de especificar, verificar, integrar e responder pelo resultado, e o ganho líquido depende de como a organização reforma a revisão, as métricas e a governança.

*Áudio: Da execução à orquestração do trabalho, 19 minutos e 37 segundos*

[Baixar o áudio (.m4a)](https://mauricio.issei.com.br/static/audio/Da_execu%C3%A7%C3%A3o_%C3%A0_orquestra%C3%A7%C3%A3o_do_trabalho.m4a)

O áudio foi gerado por IA no NotebookLM, do Google, a partir dos vídeos do [canal do autor no YouTube](https://www.youtube.com/@MauricioIssei). É uma conversa entre duas vozes sintéticas. Ele tem uma boa ideia central e vários números errados ou sem fonte. Esta página corrige o que o áudio afirma além da evidência. Se você tiver pouco tempo, leia a tabela "O que corrigir enquanto ouve".

Texto revisado de 56 afirmações do áudio. Leitura de cerca de 13 minutos.

Guia de escuta

#### O que corrigir enquanto ouve

A tabela segue a ordem do áudio. A coluna da direita é a versão que a evidência sustenta.

**Doze afirmações do áudio e a versão que a evidência sustenta**

| No áudio | O que a evidência sustenta |
| --- | --- |
| "AI brain fry" causou "um salto de 33% na fadiga de decisão até o fim do dia". | Numa pesquisa do Boston Consulting Group (BCG) com 1 488 trabalhadores dos EUA, quem relatou *brain fry* (cerca de 14% dos que usam IA) relatou 33% mais fadiga de decisão do que quem não relatou. É uma diferença entre grupos, num único momento. Não mede aumento ao longo do dia nem prova causa. |
| A dopamina tem pico "quando a pessoa se esforça muito em algo incerto", e a IA "zera a equação biológica". | A dopamina sinaliza a diferença entre a recompensa recebida e a esperada. Nenhum estudo mediu dopamina durante o uso de IA. A ligação com o esforço e com a IA é especulação. |
| "As pesquisas chamam isso de ilusão do pensamento", ao falar de projetar humanidade num chat. | São duas coisas diferentes. Atribuir compreensão a um programa é o efeito ELIZA (Weizenbaum, 1966). "The Illusion of Thinking" (Apple, 2025) trata de limites de modelos de raciocínio em quebra-cabeças, e foi contestado. |
| Desenvolvedores "digitam código 55% mais rápido". | Num experimento, quem usou o GitHub Copilot terminou **uma tarefa** (um servidor HTTP) 55,8% mais rápido. Não mede digitação nem trabalho real. Em outro experimento, com 16 desenvolvedores experientes em projetos que conheciam, as tarefas com IA levaram 19% mais tempo. |
| "A velocidade líquida de entrega cai para 0,85 vezes o original." | Nenhuma fonte com esse número foi encontrada. |
| A "manobra reversa de Conway" é "a solução que o MIT aborda". | A manobra inversa de Conway vem da prática de consultoria (ThoughtWorks) e do livro *Team Topologies*. Não foi encontrada proposta do MIT. |
| Cargas "intrínseca, germânica e extrínseca". | Os termos da teoria da carga cognitiva são intrínseca, pertinente (*germane*) e estranha (*extraneous*). A teoria vem do ensino; aplicá-la a equipes é uma adaptação. |
| A ciência "destrói o mito" do brainstorming sem julgamento, e avaliar durante a geração é superior. | O brainstorming **em grupo** rende menos ideias do que as mesmas pessoas sozinhas. Mas nenhum estudo mostra que avaliar durante a geração é sempre melhor. A ordem entre gerar e avaliar depende da tarefa. |
| O "estudo de caso bancário": agente de aprovação de crédito, limiar de 98%, margem de 0,25, zero alucinações, latência −92% e custo de nuvem −78%. | É o benchmark **offline** do autor deste site ([Case Agents](https://mauricio.issei.com.br/case-agents)): 30 consultas de atendimento, ferramentas simuladas, sem crédito e sem produção. O limiar do roteador é 0,75, não 98%. A margem relativa mínima é 0,25. Houve 0 execuções incorretas em 20 consultas; alucinação não foi medida. O 77,8% é a redução do custo de chamadas ao modelo, não do custo de nuvem. A latência não foi medida. |
| "Avaliaram 150 execuções multiagentes com Kappa de Cohen de 0,88, confirmando padrões de falha." | No estudo MAST (UC Berkeley, 2025), 150 rastros serviram para criar a taxonomia, e o 0,88 mede a concordância entre os anotadores humanos. O estudo encontrou 14 modos de falha e taxas de falha de 41% a 86,7% em sete sistemas. |
| DeerFlow 2.0 "aluga computadores reais para a IA usar o mouse"; a Sompo tem "10 mil agentes operando diariamente". | O DeerFlow 2.0 (ByteDance, fevereiro de 2026) executa agentes em contêineres com navegador e terminal; nenhuma fonte fala em alugar computadores. A Sompo anunciou agentes de IA para cerca de 30 mil funcionários, com piloto a partir de janeiro de 2026; nenhuma fonte confirma o número de agentes citado no áudio. |
| O "framework EPOCH do MIT" junta estoicismo, taoísmo, confucionismo e bushidō, e cobra "empatia, presença, opinião autêntica e esperança construtiva". | O EPOCH é do MIT Sloan (2025). Tem cinco grupos: empatia, presença, opinião e julgamento, **criatividade**, e esperança e liderança. Nenhuma fonte liga o EPOCH às tradições filosóficas citadas. A ligação é uma analogia do autor. |

A transcrição automática grafou alguns nomes de forma errada ("MOSCO", "Matriz-Ghout", "CRIBE", "HAG", "Cloud Mythos"). A transcrição desta página usa MoSCoW, matriz GUT, CRIB, RAG e Claude Mythos, que é o Claude Mythos Preview, da Anthropic. A lista completa está no registro da pesquisa.

Revisão crítica

#### O que a evidência mostra

Cada bloco tem um selo: **fato** é resultado relatado pela fonte; **inferência** combina resultados; **hipótese** ainda não tem validação suficiente.

**[Fato]**

##### 1. A IA acelera tarefas delimitadas, e o ganho varia

Em experimentos controlados, a IA reduziu o tempo e melhorou a qualidade em tarefas de escrita, atendimento e consultoria. Num call center com 5 179 atendentes, os casos resolvidos por hora subiram 14% na média e 34% entre os novatos, com efeito mínimo entre os mais experientes. Com 758 consultores, o ganho apareceu dentro do que o modelo faz bem; fora disso, as respostas corretas caíram 19 pontos percentuais.

Fontes: Brynjolfsson, Li e Raymond (2025); Noy e Zhang (2023); Dell'Acqua et al. (2025).

**[Inferência]**

##### 2. Produzir mais não garante entregar mais

Dados de mais de 10 000 desenvolvedores mostram mais pull requests com IA, revisão 91% mais longa e nenhuma correlação com a entrega no nível da organização. A pesquisa DORA (DevOps Research and Assessment) de 2024 associou mais adoção de IA a pequena queda na vazão e na estabilidade das entregas. Os dois resultados são correlacionais: não provam que a IA causou a mudança. Uma explicação alternativa é que mudanças maiores, e não a IA em si, deixam a revisão mais lenta.

Fontes: Faros AI (2025); DORA (2024).

A fila muda de lugar. Quando escrever fica mais rápido e revisar não fica, o trabalho acumula na revisão.

**[Fato, com ressalva]**

##### 3. Supervisionar a IA tem custo

A literatura de fatores humanos descreve, desde 1983, que automatizar a parte fácil deixa à pessoa a parte difícil, com menos prática, e que quem supervisiona automação tende a confiar demais nela. Em 2026, pesquisadores do BCG deram o nome de *AI brain fry* à fadiga mental de quem usa ou supervisiona IA além da própria capacidade.

Fontes: Bainbridge (1983); Parasuraman e Manzey (2010); Bedard et al. (2026).

**[Fato, com amostras pequenas]**

##### 4. Delegar pode reduzir a aprendizagem

Num experimento com 52 programadores, quem usou IA para aprender uma biblioteca nova teve nota 17 pontos menor num teste de compreensão, sem ganho significativo de tempo. Quem usou a IA para perguntar e entender manteve a nota. Em quatro centros de colonoscopia, a taxa de detecção sem IA caiu de 28,4% para 22,4% depois de meses de uso da IA. Os dois estudos são pequenos, e o segundo é observacional.

Fontes: Shen e Tamkin (2026); Budzyń et al. (2025).

**[Fato]**

##### 5. Agentes avançam, mas os testes mostram limites

O tamanho das tarefas que agentes completam com 50% de sucesso dobrou a cada cerca de sete meses entre 2019 e 2025, mas o desempenho cai em tarefas pouco estruturadas. Num escritório simulado, o melhor agente concluiu 30% das tarefas sozinho. Sistemas com vários agentes falharam em 41% a 86,7% das execuções analisadas.

Fontes: Kwa et al. (2025); Xu et al. (2025); Cemri et al. (2025).

**[Hipótese]**

##### O que essas evidências sustentam da tese do áudio

Juntas, essas evidências apoiam uma parte da tese do áudio: o gargalo muda de lugar, e com ele o papel humano. Não sustentam a outra parte: que a mudança já é geral, que reduz o esforço humano ou que libera a mente para crescer. Os dados de mercado de trabalho mostram, até agora, efeitos pequenos na média (Dinamarca, 25 000 trabalhadores) e efeitos concentrados em jovens de ocupações expostas (EUA).

Fontes: Humlum e Vestergaard (2025); Brynjolfsson, Chandar e Chen (2025).

Modelo explicativo

#### Três cenários

O resultado depende das condições. Os indicadores da terceira coluna ajudam a saber em qual cenário uma equipe está.

**Cenários, condições e indicadores observáveis**

| Cenário | Quando é plausível | Como reconhecer |
| --- | --- | --- |
| Favorável: a IA aumenta a produtividade efetiva e libera tempo | Tarefas que o modelo faz bem; testes automáticos; mudanças pequenas; pessoas que usam a IA para entender, não só para delegar | Vazão e estabilidade sobem juntas; o tempo de revisão não cresce; o desempenho sem IA se mantém |
| Intermediário: a execução acelera e a revisão absorve parte do ganho | Revisão manual; mudanças grandes; metas de atividade (linhas, tickets, pontos) | Mais pull requests e a mesma entrega; revisão mais longa |
| Adverso: erros, dependência e supervisão anulam o ganho | Tarefas fora do que o modelo faz bem; confiança excessiva; pouca prática sem IA | A estabilidade cai; erros graves aumentam; o desempenho sem IA cai |

**[Inferência]** Os dados de software de 2024 e 2025 se parecem mais com o cenário intermediário. Isso pode mudar com ferramentas novas.

Alcance

#### O que esta página não afirma

- Não afirma que a orquestração vai substituir a execução em todas as profissões. Quase todos os estudos são de software, escrita e atendimento.
- Não afirma que "orquestrador" é uma profissão nova. É uma combinação de competências conhecidas: especificar, revisar, coordenar e responder pela decisão.
- Não usa as tradições filosóficas do áudio como evidência. Elas são analogias do autor.
- Não trata anúncios de empresas como prova de resultado em produção.
- Os modelos mudam mais rápido que a pesquisa. Os estudos citados usaram ferramentas de 2023 a 2025.

Rastreabilidade

#### Fontes

Todas consultadas em 28/10/2026. "(fonte secundária)" indica número lido em reportagem ou resumo, sem acesso ao texto integral.

1. Brynjolfsson, E.; Li, D.; Raymond, L. (2025). Generative AI at Work. *Quarterly Journal of Economics*, 140(2). [NBER WP 31161](https://www.nber.org/papers/w31161).
2. Noy, S.; Zhang, W. (2023). Experimental evidence on the productivity effects of generative artificial intelligence. *Science*. [doi:10.1126/science.adh2586](https://doi.org/10.1126/science.adh2586).
3. Dell'Acqua, F. et al. (2025). Navigating the Jagged Technological Frontier. *Organization Science*. [doi:10.1287/orsc.2025.21838](https://doi.org/10.1287/orsc.2025.21838).
4. Peng, S. et al. (2023). The Impact of AI on Developer Productivity: Evidence from GitHub Copilot. [arXiv:2302.06590](https://arxiv.org/abs/2302.06590).
5. Becker, J. et al. / METR (2025). Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. [arXiv:2507.09089](https://arxiv.org/abs/2507.09089).
6. Humlum, A.; Vestergaard, E. (2025). Large Language Models, Small Labor Market Effects. Becker Friedman Institute, [BFI WP 2025-56](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf).
7. Brynjolfsson, E.; Chandar, B.; Chen, R. (2025). Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence. [Stanford Digital Economy Lab](https://siepr.stanford.edu/publications/working-paper/canaries-coal-mine-six-facts-about-recent-employment-effects-artificial).
8. Faros AI (2025). The AI Productivity Paradox. [Relatório do fornecedor](https://www.faros.ai/blog/lab-vs-reality-ai-productivity-study-findings).
9. DORA (2024). Accelerate State of DevOps Report 2024. [dora.dev](https://dora.dev); resumo em [InfoQ](https://www.infoq.com/news/2024/11/2024-dora-report/) (fonte secundária).
10. Bedard, J. et al. (2026). When Using AI Leads to "Brain Fry". *Harvard Business Review*. [HBR](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry); [nota do BCG](https://www.bcg.com/news/5march2026-when-using-ai-leads-brain-fry) (fonte secundária).
11. Shen, J. H.; Tamkin, A. (2026). How AI assistance impacts the formation of coding skills. [Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills).
12. Budzyń, K. et al. (2025). Endoscopist deskilling after exposure to artificial intelligence in colonoscopy. *Lancet Gastroenterology & Hepatology*. [Resumo na ASCO Post](https://ascopost.com/news/august-2025/routine-ai-assistance-may-lead-to-loss-of-skills-in-endoscopists-study-shows/) (fonte secundária).
13. Bainbridge, L. (1983). Ironies of Automation. *Automatica*, 19(6). [doi:10.1016/0005-1098(83)90046-8](https://doi.org/10.1016/0005-1098(83)90046-8).
14. Parasuraman, R.; Manzey, D. (2010). Complacency and Bias in Human Use of Automation. *Human Factors*, 52(3). [doi:10.1177/0018720810376055](https://doi.org/10.1177/0018720810376055).
15. Cemri, M. et al. (2025). Why Do Multi-Agent LLM Systems Fail? [arXiv:2503.13657](https://arxiv.org/abs/2503.13657).
16. Kwa, T. et al. / METR (2025). Measuring AI Ability to Complete Long Tasks. [arXiv:2503.14499](https://arxiv.org/abs/2503.14499).
17. Xu, F. et al. (2025). TheAgentCompany. NeurIPS 2025. [arXiv:2412.14161](https://arxiv.org/abs/2412.14161).
18. Shojaee, P. et al. (2025). The Illusion of Thinking. [arXiv:2506.06941](https://arxiv.org/abs/2506.06941); contestação em [arXiv:2507.01231](https://arxiv.org/abs/2507.01231).
19. Weizenbaum, J. (1966). ELIZA. *Communications of the ACM*, 9(1). [doi:10.1145/365153.365168](https://doi.org/10.1145/365153.365168).
20. Skelton, M.; Pais, M. (2019). *Team Topologies*. IT Revolution. Livro de prática.
21. VentureBeat (2026). [What is DeerFlow](https://venturebeat.com/orchestration/what-is-deerflow-and-what-should-enterprises-know-about-this-new-local-ai) (fonte de imprensa).
22. Coverager (29/12/2025). [Sompo to deploy AI agents across 30,000 employees](https://coverager.com/sompo-to-deploy-ai-agents-across-30000-employees/) (fonte de imprensa).
23. MIT Sloan (17/3/2025). [EPOCH: AI more likely to complement, not replace, human workers](https://mitsloan.mit.edu/press/new-mit-sloan-research-suggests-ai-more-likely-to-complement-not-replace-human-workers).

A numeração segue a bibliografia do registro da pesquisa, para que cada fonte possa ser localizada lá.

Registro

#### Registro da pesquisa

A auditoria completa das 56 afirmações, com a matriz de evidências, a bibliografia comentada e as lacunas, está no repositório do site: [pesquisa crítica (Markdown, GitHub)](https://github.com/issei/mauricio-site/blob/main/docs/specs/pages/da-execucao-a-orquestracao/00_pesquisa-critica.md).


## Perguntas frequentes

**A IA já desloca o trabalho da execução para a orquestração?**

Em parte, e só em alguns contextos. Experimentos mostram ganhos em tarefas delimitadas, e dados de engenharia de software sugerem que o gargalo passa para a revisão. Os dados de mercado de trabalho mostram, até agora, efeitos pequenos na média e efeitos concentrados em jovens de ocupações expostas. Não há estudo que meça diretamente o trabalho de orquestração.

**O que é AI brain fry?**

É o nome que pesquisadores do BCG deram, em 2026, à fadiga mental de quem usa ou supervisiona ferramentas de IA além da própria capacidade. Numa pesquisa com 1 488 trabalhadores dos EUA, quem relatou o problema relatou 33% mais fadiga de decisão do que quem não relatou. A pesquisa mostra associação, não causa.

**A IA deixa os desenvolvedores mais rápidos?**

Depende da tarefa e da pessoa. Num experimento com uma tarefa curta, o grupo com Copilot terminou 55,8% mais rápido. Num experimento com 16 desenvolvedores experientes em projetos que eles conheciam, as tarefas com IA levaram 19% mais tempo.

**Usar IA prejudica a aprendizagem?**

Pode prejudicar quando a pessoa só delega. Num experimento com 52 programadores, quem usou IA para aprender uma biblioteca nova teve nota menor num teste de compreensão. Quem usou a IA para perguntar e entender manteve a nota. A amostra é pequena.

**O que diz o estudo sobre falhas de sistemas multiagentes?**

O estudo MAST, da UC Berkeley, classificou falhas em 14 modos e 3 categorias e encontrou taxas de falha de 41% a 86,7% em sete sistemas de código aberto. O valor de Kappa de 0,88 mede a concordância entre os anotadores humanos.

## Glossário

- **AI brain fry** — Nome dado por pesquisadores do BCG, em 2026, à fadiga mental de quem usa ou supervisiona IA além da própria capacidade.
- **Ironias da automação** — Automatizar a parte fácil deixa à pessoa a parte difícil, com menos prática (Bainbridge, 1983).
- **Viés de automação** — Tendência de quem supervisiona automação a confiar demais nela (Parasuraman e Manzey, 2010).
- **Fronteira irregular** — Limite entre as tarefas que o modelo faz bem e as que ele faz mal; fora dele, a IA pode piorar o resultado (Dell'Acqua et al., 2025).
- **Manobra inversa de Conway** — Organizar as equipes conforme a arquitetura desejada; vem da prática de consultoria e do livro Team Topologies.
- **MAST** — Taxonomia de falhas de sistemas multiagentes da UC Berkeley (2025): 14 modos de falha em 3 categorias.
- **EPOCH** — Grupos de capacidades humanas propostos pelo MIT Sloan (2025): empatia, presença, opinião e julgamento, criatividade, e esperança e liderança.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
