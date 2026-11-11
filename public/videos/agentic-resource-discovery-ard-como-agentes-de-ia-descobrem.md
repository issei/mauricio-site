# Agentic Resource Discovery (ARD): Como Agentes de IA Descobrem Ferramentas na Web

Vídeo de Maurício Yokoyama Issei, publicado em 23 de setembro de 2026 (8 min 37 s).
Assistir: https://www.youtube.com/watch?v=oB7BUFktKBA

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

Como os modelos de linguagem e agentes autonomos encontram as ferramentas certas para realizar uma tarefa sem sobrecarregar a janela de contexto? Neste vídeo, apresentamos a fundo a **Agentic Resource Discovery Specification (ARD)**, o padrão aberto de descoberta federada para agentes de IA, servidores MCP, Skills, APIs e workflows.

Entenda a arquitetura por trás do protocolo desenvolvido por um grupo de trabalho com participação de empresas como Google, Microsoft e Hugging Face. Descubra como o ARD resolve o desafio de escala movendo a seleção de ferramentas do contexto do LLM para serviços de busca dedicados.

---

🎯 **O que você vai aprender neste vídeo:**
* **O Conceito do ARD:** O protocolo que permite a um cliente de IA perguntar *"O que está disponível para esta tarefa?"* e receber recursos compatíveis.
* **Camada Pré-Invocação:** O ARD atua exclusivamente na descoberta; a execução ocorre pelo protocolo nativo da ferramenta (como MCP ou A2A).
* **Identificadores URN Ancorados a Domínio:** Padrão de nomes que separa a identidade lógica do recurso de sua localização física de rede.
* **API REST e Busca Semântica:** Como funcionam os endpoints `POST /search` (busca por linguagem natural) e `POST /explore` (introspecção e estatísticas).
* **Segurança e Identidade Zero-Trust:** O envelope `trustManifest` para verificação de identidade criptográfica e atestações de conformidade (como SOC2 e GDPR).

---

⏱️ **Minutagem / Capítulos Sugeridos:**
* `00:00` - Introdução: O problema de escala na seleção de ferramentas por IA
* `01:30` - O que é o Agentic Resource Discovery (ARD)?
* `03:45` - Estrutura e Identificadores URN (`urn:air:...`)
* `06:10` - Arquitetura da API: Endpoint /search e /explore
* `08:30` - Segurança, Identidade e Trust Manifest
* `10:15` - Conclusão e Próximos Passos

---

🔗 **Links e Recursos:**
* 📄 **Especificação Oficial:** https://agenticresourcediscovery.org/spec
* 🛠️ **Repositório GitHub:** https://github.com/ards-project/ard-spec
* 🌐 **Website Oficial:** https://agenticresourcediscovery.org/

#AgentesDeIA #ArtificialIntelligence #MCP #AgenticResourceDiscovery #AIInfrastructure #OpenSource #TechSpecification

## Transcrição

_Transcrição automática, não revisada._

[0:00] Fala pessoal, hoje vamos destrinchar uma especificação fascinante chamada Agentic Resource Discovery ou simplesmente ARD. O nosso foco aqui será estritamente arquitetura técnica que permite que agentes de inteligência artificial se encontrem de forma dinâmica. É literalmente sobre construir uma base técnica robusta para descoberta. É um material profundo, mas incrivelmente bem estruturado. Então, vamos mergulhar de cabeça nisso. A nossa rota de hoje é direta ao ponto. Vamos passar por o problema da descoberta, o modelo de dados, identificadores e nomes, a interface de busca, segurança e confiança e fechar com a federação de redes. Rápido e rasteiro. Sessão 1, o problema da descoberta ou por que o context window simplesmente não escala. Historicamente, a gente sabe que os modelos de IA tentam resolver a seleção de ferramentas na força bruta com a famosa sobrecarga de contexto. Basicamente, socando as descrições de absolutamente todos os agentes possíveis no context window de um LLM. Mas

[1:01] convenhamos, isso queima tokens absurdamente e falha muito rápido quando o sistema precisa escalar para milhares de agentes. A especificação ARD resolve isso matematicamente. Como? Mudando a descoberta para uma camada de busca dedicada. É uma abordagem totalmente focada em busca. Os LLMs não precisam mais decorar um catálogo inteiro de ferramentas. Eles simplesmente fazem uma busca em um índice federado. Para todo mundo falar a mesma língua e manter a precisão técnica, precisamos de um vocabulário compartilhado. A especificação define o recurso agêntico como qualquer capacidade externa que um cliente de IA possa chamar para realizar uma tarefa. Pode ser um servidor MCP, um agente A2A, um API simples ou um workflow gigantesco. O termo recurso é justamente esse conceito abstrato unificado. E aqui temos uma citação que mata a charada. Um princípio arquitetônico fundamental da especificação dita que a ARD atua inteiramente antes da invocação. Ela não é um runtime de execução, certo? Ela não

[2:02] substitui o protocolo MCP ou o A2A. O trabalho dela é só achar o bendito do recurso. Uma vez encontrado, a execução real rola através do mecanismo nativo daquela ferramenta específica. É o equivalente exato a usar o índice de um livro para achar a página certa e depois simplesmente ler a página. Dois, o modelo de dados. O famoso envelope técnico. A base de toda a publicação é o manifesto ai-catalog.json. É uma estrutura json muito limpa e agnóstica em relação ao artefato. Esse manifesto contém a versão da especificação, as informações de quem está operando aquilo dentro do objeto host e o mais importante, um array chamado entries, que são as entradas reais do catálogo. É dentro desse envelope enxuto que os publicadores hospedam os anúncios de suas capacidades para toda a rede de A. Agora, dentro dessas entradas do catálogo, existe uma regra de engenharia super estrita para garantir que as leituras em ambientes corporativos não quebrem de jeito nenhum. É a regra de

[3:04] valor ou referência. Funciona assim: uma entrada de catálogo precisa conter exatamente uma dessas duas chaves. Elas são mutuamente exclusivas. Ou usamos URL para uma entrega por referência, buscando remotamente, ou usamos a chave data para uma entrega de valor, embutindo todo o payload logo de cara. Isso barra qualquer ambiguidade em sistemas que rodam em altíssima escala. E como o sistema descobre o que tem dentro desse envelope? Através de tipos de mídia de descoberta padrão da IANA. Tem um detalhe técnico bem bacana na especificação sobre a nomenclatura que o tipo de mídia MCP foi renomeado de propósito para terminar com o traço card mais json. O objetivo foi alinhar isso conceitualmente com agentes A2A, deixando cristalino que isso governa os metadados de descoberta e não os fluxos operacionais ativos do protocolo. É literalmente só o cartão de visitas do servidor. Seção três, identificadores e nomes, desempacotando a sintaxe URN. A especificação adota uma sintaxe URN

[4:06] ancorada em domínio e a anatomia dela é super rigorosa. Começa com URN dois pontos R. Esse R é o identificador de namespace que denota recursos agênticos. Depois vem o domínio do publicador, o namespace que é opcional e por fim o nome do agente. A genialidade aqui é que ao ancorar o publicador a um domínio real, a unicidade e a confiança entre redes diferentes são garantidas de forma criptográfica. Mas e na hora do desenvolvimento local? A solução que eles encontraram é perfeita e alinhada com as rígidas diretrizes de DNS da IETF a RFC 2606. A estrutura usa exemplo.com para documentação, .localhost para testes diretos na própria máquina e .test para as automações de CI e CD. Isso garante um desenvolvimento liso sem nenhum atrito, evitando conflitos de DNS e sem disparar aquelas validações criptográficas de produção totalmente desnecessárias durante a fase de testes. Quatro, a interface de busca. As APIs de registro. Para fazer isso tudo andar, a

[5:08] especificação exige uma base universal de roteamento via endpoints REST. O post/search é o cara que lida com a descoberta semântica dinâmica. É lá que a mágica das pontuações de relevância acontece. O post/explore foca em introspecção e métricas agregadas. Em contraste, do outro lado temos o get/agents que é um endpoint de navegação puramente determinístico, super fácil de guardar em cache e excelente para alimentar portais de desenvolvedores. Um ponto crucial sobre a API de busca é justamente o que foi deixado de fora. O post/search utiliza filtros JSON totalmente planos e intencionalmente exclui lógicas booleanas complexas ou ordenações personalizadas. O motivo? Manter a integridade da pontuação de relevância semântica. Se as ordenações fossem alfabéticas, por exemplo, a relevância semântica seria completamente destruída. E de quebra, usar filtros planos otimiza absurdamente a velocidade de indexação do banco de

[6:08] dados para consultas em escala global. Cinco: segurança e confiança. Os manifestos de identidade. Como garantir quem é quem na rede? A resposta mora no objeto trust manifest. Ele amarra com muita segurança a identidade de descoberta do agente com identidades criptográficas reais e parrudas, como DIDs ou SPIF. Ele também anexa atestados verificáveis, como certificações SOC 2 ou conformidade com a GDPR. O mais impressionante de ver é que essa arquitetura mantém toda a burocracia de compliance da empresa totalmente descolada dos metadados operacionais simples. Seção seis: federação de redes. A famosa web de descoberta. Aqui a gente traça os passos técnicos desse processo de federação. Tudo começa quando um cliente envia o post/search. Um detalhe técnico super inteligente é o parâmetro federation, que fica lá no nível raiz do payload. O gateway lê esse parâmetro, se estiver definido como

[7:08] auto, o registro já consulta outros nós da rede por conta própria. Se for referrals, ele só devolve dicas de onde mais a gente deve buscar. O resultado final volta sempre unificado. É super elegante porque amarra esses registros usando operações HTTP padrão do dia a dia. Mas atenção, existe uma trava vital de segurança. O post/explore não suporta federação de jeito nenhum. Enquanto a intenção de busca normal pode e deve se espalhar globalmente, a introspecção dinâmica das facetas no endpoint explore é mantida estritamente isolada no nível local e faz todo sentido. Isso blinda os mapas de capacidade do servidor contra distorções matemáticas comparativas que fatalmente aconteceriam se o sistema tentasse agregar dados imperfeitos de vários nós muito distantes. Para fechar nossa análise, fica este pensamento bem provocativo. Considerando toda essa base técnica robusta que acaba com gargalo dos limites de tokens do LLM, padroniza nomes via DNS, separa execução de metadados e ainda federa busca

[8:09] globalmente, o que acontece de verdade quando milhões de agentes de IA conseguirem de forma perfeita e dinâmica descobrir e invocar as capacidades uns dos outros? O potencial disso é simplesmente surreal. A ideia hoje foi solidificar esses conceitos complexos de infraestrutura e a dica de ouro é continuar explorando o material original. Um grande abraço a todos que acompanharam e até a próxima análise.
