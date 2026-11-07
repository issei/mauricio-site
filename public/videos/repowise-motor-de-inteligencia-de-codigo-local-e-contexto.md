# Repowise: Motor de Inteligência de Código Local e Contexto para Agentes de IA

Vídeo de Maurício Yokoyama Issei, publicado em 20 de setembro de 2026 (7 min 36 s).
Assistir: https://www.youtube.com/watch?v=Fbuu769DNfk

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Neste vídeo explicativo, apresentamos o **Repowise**, uma ferramenta open-source que constrói um índice local do seu código-fonte para fornecer contexto preciso e citável para desenvolvedores e agentes de IA.

Em vez de fazer assistentes de IA reelerem arquivos repetidamente, o Repowise indexa o repositório e disponibiliza respostas diretas, gráficos de dependências e análise de risco de mudanças via **MCP (Model Context Protocol)**.

---

### 💡 **O que você vai aprender neste vídeo:**
* **5 Camadas de Inteligência Local:** Grafo de dependências (AST em 26 linguagens), histórico do Git, documentação wiki gerada automaticamente, decisões arquiteturais e pontuação determinística de saúde do código (Code Health).
* **Integração com Agentes de IA:** Como conectar o Repowise ao Claude Code, Codex, Cursor e VS Code usando ferramentas MCP integradas.
* **Economia de Tokens:** Redução de payloads e compressão de saídas de comandos no terminal com o `repowise distill`.
* **Análise de Risco em Pull Requests:** Como avaliar a área de impacto e os testes afetados antes de realizar o merge.

---

### ⚡ **Comandos Rápidos de Inicialização:**
```bash
# 1. Instalação
pip install repowise

# 2. Inicialização e indexação local
cd /seu-projeto
repowise init --no-prose -y

# 3. Execução do servidor MCP e dashboard local
repowise serve
```

---

### 🔗 **URLs de Referência e Documentação:**
* **Repositório do Código-Fonte no GitHub:**  
  https://github.com/repowise-dev/repowise
* **Organização no GitHub:**  
  https://github.com/repowise-dev
* **Documentação Oficial:**  
  https://docs.repowise.dev/
* **Guia Completo do Usuário (User Guide):**  
  https://github.com/repowise-dev/repowise/blob/main/docs/start/USER_GUIDE.md
* **Site Oficial:**  
  https://repowise.dev/

---

#Repowise #AI #CodebaseIntelligence #MCP #GitHub #OpenSource #DevTools #SoftwareEngineering #ClaudeCode #Python #VSCode

## Transcrição

_Transcrição automática, não revisada._

[0:00] Quem aí já perdeu horas vendo um assistente de IA ficar adivinhando o que fazer em uma base de código complexa? É frustrante, né? A Ia até escreve o código rapidinho, mas na maioria das vezes ela não tem a menor noção do impacto global dessas mudanças. Bom, vamos direto ao ponto. Hoje a nossa análise é sobre o material do Ripple Wise, que é um motor de inteligência de código feito exatamente para resolver esse gargalo, dando um contexto real tanto para humanos quanto para as máquinas. Pensa bem, porque a gente continuaria pagando um agente de A para redescobrir a base de código a cada nova tarefa. É um desperdício enorme. Ao invés de usar um mapa que já tá pronto, esses agentes tradicionais torram um tempo absurdo e tokens bem caros, rodando comandos de busca rudimentares num mar de arquivos cheios de ruído. Eles literalmente ficam lendo as mesmas coisas várias e várias vezes só para tentar entender a estrutura do projeto. Isso nos leva a um dado simplesmente gigante. O Riporta o tamanho do payload de contexto enviado para IA em absurdos

[1:01] 97,2%. É uma redução drástica, logo de cara. Isso garante que o agente receba estritamente a informação que ele precisa para aquela tarefa específica, cortando todo aquele ruído e a sobrecarga inútil de tokens. Para estruturar nossa análise de hoje, vamos passar por seis pontos. Um, o problema do contexto da IA. Dois, as cinco camadas de inteligência. Três, turbinando agentes de A. Quatro, pull requests mais inteligentes. Consertando a saúde do código. E por fim, seis, o workspace multirepositório. Vamos lá. Sessão um, o problema do contexto da IA. A premissa de todo esse material é que hoje os agentes de IA trabalham meio que de olhos vendados. Eles sofrem demais para entender bases de código cruas porque só enxergam arquivos isolados e não a arquitetura inteira do sistema. Imagina o jeito antigo. O agente usa comandos lentos tipo grap, lê umas 300 linhas de puro ruído de testes e precisa

[2:03] fazer quase oito chamadas de ferramenta em média só para tentar se localizar. Agora olha a abordagem do Rapwise. O agente usa 10 ferramentas precisas via MCP, faz quase metade das chamadas, umas 3,8, e já recebe o contexto totalmente direcionado. É um fluxo absurdamente mais ágil. Avançando paraa sessão dois, as cinco camadas de inteligência. O segredo dessa arquitetura para resolver o problema do contexto é indexar a base de código uma única vez e o grande pulo do gato tudo localmente, sem mandar os dados para APS externas ou serviços de terceiros. Esse índice é montado em cinco pilares super inteligentes. O grafo, que entende as dependências, o Git para mapear histórico de bugs, documentos que geram uma wik automática, decisões que gravam a lógica arquitetural e a saúde do código, através de detectores determinísticos. E pasmem. A indexação completa é feita em menos de 30 segundos num repositório normal. Sessão três, turbinando agentes

[3:04] de A. Beleza. Com código mapeado e indexado, a gente entra na primeira grande aplicação da plataforma, entregar esse índice pros agentes pararem de adivinhar e começarem a trabalhar com certezas. A ponte para fazer isso acontecer é o MCP, o model context protocol. Para quem não sabe, é um padrão de código aberto que permite que os modelos se conectem com total segurança aos dados locais. EVMCP que o Repise injeta os dados indexados de forma transparente em agentes que a gente já conhece bem, tipo o cloud Code, o curso e as integrações no VS Code. Para ter uma ideia do impacto real, os números da documentação oficial trazem uma credibilidade enorme. Quando a gente compara o agente tradicional com o fluxo do Repowers, as chamadas de ferramentas caem para caramba. Mas o payload de contexto, esse despenca de quase 14.000 1000 tokens para ridículos 393 tokens num teste de comit. O resultado disso tudo, o volume total de saída gerada pelo agente cai quase 32%. A IA simplesmente trabalha menos e

[4:05] acerta mais. E como se atinge essa eficiência toda? Através de 10 ferramentas MCP que são moldadas para tarefas específicas. Ao invés da IA ficar presa numa cadeia enorme, tentando adivinhar os passos e lendo saídas sujas de terminal, essas ferramentas entregam o contexto completo de cara. Tudo com as citações de código certinhas, instantaneamente cortando todo aquele barulho dos comandos comuns. Sessão quatro, pool requests mais inteligentes. Mas não é só a inteligência artificial que sai ganhando, tá? Os revisores humanos também aproveitam esse mesmíssimo índice através de um PR bote gratuito. Esse bote coloca sinais muito específicos direto na revisão do código. Ele mostra o raio de impacto de se alterar um simples símbolo, avisa se ficou ou faltando alterar algum parceiro de código comum que quase sempre muda junto e até traz uma inteligência de testes conectada ao grafo. Ele também dá uma nota de risco de zero a 10 paraa mudança. E o mais legal destacado no material, ele faz isso tudo sem precisar de uma única chamada para LLMs. Ah, e se o piar tiver perfeito, ele fica 100%

[5:06] silencioso? Sessão cinco, consertando a saúde do código. E a coisa não para por aí. A ferramenta não só aponta os erros durante uma mudança, como trabalha ativamente para medir e melhorar a capacidade de manutenção de toda a base de código. O fluxo é super claro. Passo um, rola uma varredura com 49 detectores determinísticos. Passo dois, ela identifica os arquivos mais propensos a dar problema e dá uma nota de 1 a 10 para eles. E o passo três é sensacional. Em vez de só mostrar o problema, ela gera planos de refaturação bem concretos, sugerindo coisas como extrair classe, sempre entendendo perfeitamente a arquitetura do projeto. E para provar que isso funciona de verdade, quando colocado frente à frente com ferramentas tradicionais de saúde de código, tipo Code Cine, e mantendo o mesmo orçamento de revisão em 20% do código, o Repausa encontrou 2,3 vezes mais defeitos de reais. É a prova visual de que olhar o código em múltiplas camadas revela falhas estruturais que outras ferramentas simplesmente deixam passar.

[6:07] Sessão seis, o workspace multirepositório. Dando um passo para trás para olhar o cenário corporativo, a gente sabe que sistemas complexos não ficam presos em um único repositório, certo? E a inteligência para gerenciar tudo isso também não deveria ficar. O Raplewise conecta contratos entre serviços de backend e front end. Isso quer dizer que se rolar uma alteração em um repositório que vá quebrar o contrato do outro, a ferramenta pega esse raio de impacto cruzado antes mesmo do código ser enviado. E tudo isso centralizado em um único end point MCP federado. Incrível, né? Isso nos leva a essa citação genial dos criadores da ferramenta. A IA torna a produção de uma alteração mais barata, ela não torna a compreensão das suas consequências mais barata. Essa frase amarra perfeitamente porque ter um mapa arquitetural hoje em dia é tão essencial. Ter a velocidade da IA sem a sabedoria da arquitetura é um risco que poucas equipes podem correr. Então a pergunta que fica no ar pra gente pensar

[7:08] é a seguinte: na próxima tarefa, o agente de IA vai continuar navegando as cegas pelos arquivos ou finalmente vai ter um mapa nas mãos? Estruturar a inteligência do código parece ser o passo definitivo para uma engenharia assistida por IA verdadeiramente madura. Esperamos que essa análise tenha trazido boas ideias pro seu fluxo de desenvolvimento.
