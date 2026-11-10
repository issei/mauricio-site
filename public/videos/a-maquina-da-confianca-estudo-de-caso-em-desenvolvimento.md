# A Máquina da Confiança: Estudo de Caso em Desenvolvimento Agêntico Bancário

Vídeo de Maurício Yokoyama Issei, publicado em 10 de setembro de 2026 (6 min 13 s).
Assistir: https://www.youtube.com/watch?v=JSYL3Ax7A7o

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Tratar um modelo de linguagem (LLM) como o sistema completo é um dos erros de arquitetura mais comuns na IA aplicada. Em cenários simulados de atendimento bancário, enviar todas as requisições e centenas de ferramentas diretamente ao LLM gera latências elevadas, desperdício de tokens e riscos de execução inadequada por perda de contexto (*lost-in-the-middle*).

Neste vídeo, exploramos o estudo de caso **"Case Agents"**, uma demonstração teórica e simulada criada para validar o processo de desenvolvimento de um **Harness Determinístico em Camadas**. A partir do princípio da **Engenharia da Confiança** (*"A capacidade vem do modelo; a confiança vem da engenharia"*), analisamos como uma estrutura de triagem e guardas de segurança pré-execução valida a arquitetura de roteamento antes do acionamento de modelos mais complexos.

---

### 📌 O que você vai aprender neste vídeo:
* **O Desafio do Catálogo Extenso:** Por que injetar centenas de ferramentas no prompt reduz a precisão da seleção e infla custos de inferência.
* **Camada 1 — Query Router Local:** Como classificar intenções em menos de 5 ms através de um modelo leve (TF-IDF + Regressão Logística) calibrado por *Platt scaling*.
* **Camada 2 — Tool Retriever & Taxonomia:** Como organizar ferramentas em capacidades canônicas e colapsar duplicatas semânticas para recuperar o Top-2 relevante.
* **Camada 3 — Guardas de Direção e Segurança:** Como a verificação semântica de intenção (Leitura vs. Escrita) evita que uma simples consulta execute uma alteração cadastral indevida.
* **Validação do Processo Agêntico:** Como o benchmark do MVP demonstrou a eficácia do Harness na contenção do "Crash Silencioso" em um ambiente controlado de testes.

---

### 📊 Resultados Medidos no Benchmark do MVP:
* **Acurácia do Router:** 100.0%
* **Hit Rate@2 do Retriever:** 100.0%
* **Redução de Custo Medida:** 77,8% (vs. baseline sempre-LLM)
* **Redução de Latência:** ~92,6%
* **Execuções Incorretas no Dataset de Teste:** 0
*(Nota: Resultados restritos ao benchmark simulado do MVP).*

---

### 🔗 Links e Documentação de Referência:

* 🌐 **Artigo Explicativo e Apresentação do Case no Site:**
  https://mauricio.issei.com.br/case-agents.html

* 💻 **Repositório do Projeto no GitHub:**
  https://github.com/issei/case-agents

* 📜 **Especificação Técnica Consolidada (Spec-Driven Development):**
  https://github.com/issei/case-agents/blob/main/specification/Especifica%C3%A7%C3%A3o.MD

* 📦 **Manifesto de Empacotamento de Produção (APM.yml):**
  https://github.com/issei/case-agents/blob/main/APM.yml

* 📈 **Relatório de Avaliação do Benchmark (candidate_report.json):**
  https://github.com/issei/case-agents/blob/main/reports/candidate_report.json

#### 🏛 Architecture Decision Records (ADRs):
* **ADR-001 (Normalização Textual Canônica):** https://github.com/issei/case-agents/blob/main/docs/adr/0001-normalizacao-textual-canonica.md
* **ADR-002 (Classificador Lexical & Query Router):** https://github.com/issei/case-agents/blob/main/docs/adr/0002-classificador-lexical-query-routing.md
* **ADR-003 (Ranking Determinístico & Tool Retrieval):** https://github.com/issei/case-agents/blob/main/docs/adr/0003-ranking-deterministico-tool-retrieval.md
* **ADR-004 (Harness de Avaliação & Economia):** https://github.com/issei/case-agents/blob/main/docs/adr/0004-harness-avaliacao-metricas-economia.md
* **ADR-005 (Alinhamento APM & OmniRoute Gateway):** https://github.com/issei/case-agents/blob/main/docs/adr/0005-alinhamento-apm-e-omniroute-gateway.md
* **ADR-006 (Taxonomia de Capacidades & Colapso de Duplicatas):** https://github.com/issei/case-agents/blob/main/docs/adr/0006-taxonomia-de-capacidades-e-colapso-de-duplicatas.md
* **ADR-007 (Calibração de Probabilidade & Guarda de Margem):** https://github.com/issei/case-agents/blob/main/docs/adr/0007-calibracao-de-probabilidade-e-guarda-de-margem.md
* **ADR-008 (Guarda de Direção Leitura/Escrita):** https://github.com/issei/case-agents/blob/main/docs/adr/0008-guarda-de-direcao-leitura-escrita.md

#### 📚 Base de Conhecimento (OKF Agent Memory):
* **Guia de Engenharia da Confiança:** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-trust-engineering.md
* **Catálogo de Casos de Borda em PT-BR:** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-edge-cases.md
* **Arquitetura de Transição (MVP para Produção - ISM v1.0):** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-mvp-to-production.md
* **Eficiência de Contexto e Anti-Bloat:** https://github.com/issei/case-agents/blob/main/docs/knowledge/kb-token-efficiency.md

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá, vamos direto ao ponto hoje. O que vamos explorar juntos é um estudo de caso prático, olhando de perto o cérebro de roteamento de um agente de atendimento de um banco digital fictício. Essa é uma demonstração simulada, uma verdadeira validação de conceito pro desenvolvimento agêntico de ponta. O foco aqui é por engenharia da confiança. Então vamos analisar de forma clara, bem sóbria, as relações de causa e efeito que definem uma arquitetura de missão crítica. Afinal, em sistemas financeiros, confiança não é um bônus, é o alicerce de tudo. E aí surge a grande questão que guia a nossa análise. Como garantir zero alucinações? O problema que precisamos resolver tem uma relação estrita de causa e efeito. Em um banco, uma alucinação de inteligência artificial não é só um textinho gerado com erro, é um incidente grave de segurança e de conformidade. Então, como a gente estrutura um sistema para que esse risco de alucinação seja matematicamente mitigado antes mesmo de qualquer coisa ser executada? Para

[1:00] desmontar essa mecânica e entender como ela funciona, vamos passar rapidinho por essas seis etapas, desde o risco inicial até chegarmos na prova concreta da engenharia da confiança. Começando pelo nosso primeiro ponto, o risco real da abordagem direta e a sua ineficiência estrutural. Aqui a gente vê claramente a tensão central deste estudo. Confiar apenas em um grande modelo de linguagem para rotear decisões é pedir para ter vulnerabilidades severas. Pensa bem, se a gente injetar um catálogo com 285 ferramentas direto no prompt de uma vez só, o efeito imediato é que o modelo perde o contexto no meio do caminho. A consequência prática disso é uma latência insustentável de 4.000 msundos e um custo financeiro simplesmente inviável pro negócio. E é exatamente diagnosticar esse problema que nos leva à nossa solução na sessão dois, a máquina da confiança. O segredo aqui não é o Ll em si, mas a estrutura ao redor dele. Estamos falando de um harness determinístico em camadas.

[2:01] Em vez de achar que o modelo é o sistema inteiro, essa arquitetura coloca o Ll dentro de uma gaiola de regras bem restrita. Ele só entra em cena lá no finalzinho, na quarta etapa, e apenas depois que as camadas anteriores já garantiram a precisão matemática da intenção do usuário. Vamos dar um zoom na primeira dessas camadas de defesa, o roteamento de quereres. Olha que interessante como funciona essa linha de frente que chamamos de fast. É um modelo de inferência local muito leve que pega coisas simples, tipo um bom dia ou uma dúvida frequente e básica e resolve na hora. Causa e efeito diretos. A query é simples, o sistema processa localmente, contorna o LLM totalmente e corta os custos de API. Tudo isso em menos de 5 milisundos. Mas para essa rota rápida tomar decisões sem colocar nada em risco, ela não pode operar na base do eu acho, a arquitetura exige probabilidade clínica. Por isso, não usamos apenas uma distância geométrica bruta. O sistema aplica regressão logística com

[3:02] escalonamento PL estrito. Traduzindo, isso nos dá uma probabilidade matemática real e calibrada. É isso que blinda o sistema contra o envio de falsos positivos pra rota rápida. Certo? Mas e se a consulta for complexa? Aí avançamos para a etapa quatro, a seleção de ferramentas. Quando o roteador identifica que a querer precisa de mais robustez, a arquitetura filtra aquele catálogo gigante para deixar apenas as duas ferramentas principais. Digamos que existam oito opções diferentes só para obter fatura. O sistema usa o colapso semântico e agrupa essas duplicatas em uma única capacidade. Com esse filtro rigoroso, o Ll, mas recebe só o sinal purificado, sem nenhum ruído que poderia causar uma alucinação. Chegamos agora na camada que talvez seja a mais crítica pro compliance, as guardas de segurança. Esta tabela ilustra a guarda de direção e é causa e efeito na veia. Estruturalmente, uma consulta de leitura, nunca, sob hipótese alguma, deve acionar uma ferramenta de escrita.

[4:03] Se a intenção identificada é apenas qual é o meu e-mail, tentar usar a ferramenta de atualizar cadastro é uma falha de segurança grave. Aguarda, impõe essa restrição semântica e bloqueia a operação antes mesmo de qualquer tentativa de execução. E além da direcionalidade, temos essas métricas de margem. O roteador precisa de uma confiança acima de 0.75 75 e deve haver uma margem de segurança de 0.25 entre as ferramentas candidatas. Por que tanta exigência? Porque depender apenas da autocorreção do LLM é arriscado demais em um cenário bancário. Se a situação for ambígua e os números baterem na trave, o sistema bloqueia tudo. É muito melhor uma abstenção matemática segura do que uma execução incorreta feita com confiança cega. Por fim, vamos olhar para a sessão seis, como tudo isso se traduz nos dados de engenharia da confiança. Os dados deste benchmark são bem clínicos e provam o ponto da arquitetura. Quando saímos daquela chamada direta pro modelo e adotamos essa estrutura em camadas, a latência despenca incríveis 92,6%.

[5:05] O tempo de resposta, que era de quase 3 segundos inteiros, cai paraa casa dos 200 msundos. É uma mudança de patamar. E do lado dos negócios, o impacto é de 77,8% de economia direta de custos. Mas a métrica mais importante de todas essa validação inicial não foi o dinheiro salvo, foi o fato de que tivemos zero execuções incorretas, nenhuma. Toda a QUER foi resolvida e protegida antes da execução, provando que é perfeitamente possível aliar redução extrema de custo com segurança absoluta, desde que a arquitetura cause esse efeito. E isso nos leva à tese central de todo esse estudo de caso. Um sistema de inteligência artificial confiável tem, na verdade, muito pouca IA operando no seu caminho crítico. O modelo linguístico entra com raciocínio lá na ponta, mas a engenharia de software pura e rigorosa que garante a proteção de ponta a ponta. Fica então a provocação para todos nós que acompanhamos esse mercado. Quão rápido as operações de missão crítica corporativas precisarão fazer essa transição para arquiteturas determinísticas para se manterem não

[6:05] apenas viáveis financeiramente, mas fundamentalmente seguras.
