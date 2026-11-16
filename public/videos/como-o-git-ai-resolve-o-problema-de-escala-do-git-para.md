# Como o `git-ai` Resolve o Problema de Escala do Git para Agentes de IA

O Git foi feito para pessoas, e não aguenta milhares de agentes de IA enviando código ao mesmo tempo. O vídeo apresenta o git-ai, uma implementação de código aberto inspirada no sistema interno da Anthropic: clientes sempre online, controle de versão como API, integração sem fila de merge, resolução automática de conflitos e servidores sem estado.

Vídeo de Maurício Yokoyama Issei, publicado em 19 de outubro de 2026 (7 min 44 s).
Assistir: https://www.youtube.com/watch?v=ZTNLoWhtXEw

_O vídeo e a transcrição estão em português. Os minutos entre colchetes, como [04:12], apontam para o trecho do vídeo._

## O Git chegou ao limite

O Git em escala humana está chegando ao limite. O git-ai é uma arquitetura baseada num sistema interno da Anthropic, feita para aguentar milhares de agentes de IA enviando código ao mesmo tempo [00:00].

Por décadas, o desenvolvimento de software funcionou num modelo offline, descentralizado e no ritmo da digitação humana [00:21]. Com milhares de agentes escrevendo código juntos, essa arquitetura não dá conta. É preciso um sistema sempre online e centralizado [00:44].

A Anthropic concluiu que o gargalo não é mais gerar código, e sim a infraestrutura feita para a escala humana: controle de código-fonte, builds e CI [01:04].

## O tamanho do problema

Segundo o vídeo, o repositório principal da Anthropic integra 30.000 mudanças por dia [01:46]. Com clones completos do repositório para cada operação, isso geraria centenas de petabytes de tráfego [02:07].

## O que é o git-ai

O git-ai é a implementação de código aberto dessa arquitetura, que a Anthropic criou só para uso interno [02:27]. O sistema é focado no servidor, feito para milhares de agentes lerem, escreverem e integrarem código, e continua compatível com repositórios Git [02:48].

## Clientes sempre online e controle de versão como API

Os clientes não baixam o repositório inteiro, só os arquivos de que precisam [03:09]. Com árvores esparsas, cada agente busca só os caminhos que vai alterar, e começa a trabalhar em segundos [03:30].

O peso fica no servidor. Ele guarda o histórico e faz as operações pesadas, como o blame, e entrega as respostas por chamadas rápidas de API [03:50].

## Sem fila de merge

As filas de integração tradicionais processam uma mudança por vez, o que vira um engarrafamento com milhares de agentes [04:12]. O git-ai usa compare-and-swap: o agente faz o rebase na ponta do branch, e o servidor agrupa várias integrações numa só atualização [04:34].

Segundo o vídeo, com vários agentes enviando código ao mesmo tempo, o Git tradicional passa de 6 segundos de latência no P99 e falha por contenção. Com o agrupamento do git-ai, a latência cai para cerca de 1,5 segundo [04:55].

## Resolução automática de conflitos

Devolver cada conflito para o autor pararia o pipeline [05:17]. O servidor resolve os conflitos com ferramentas determinísticas ou com IA, sem intervenção humana [05:17].

A IA fica isolada por um protocolo neutro de fornecedor, que aceita qualquer ferramenta ou provedor de LLM [05:39]. O servidor valida o resultado e rejeita qualquer trecho que ainda tenha marcadores de conflito [06:00].

## Banco de dados e escalabilidade

O log de alterações vai para um banco rápido, como PostgreSQL ou SQLite, e o conteúdo dos arquivos vai para um armazenamento de objetos, como S3 ou GCS [06:23]. Os servidores não guardam estado: são só caches dessa fonte da verdade [06:23].

Se um servidor cai, ele lê o histórico no banco, busca os pacotes no armazenamento e volta. Por isso os servidores escalam na horizontal sem esforço [06:44].

## Perguntas frequentes

### O git-ai substitui o Git?

Não exatamente. Ele muda o servidor, mas continua compatível com repositórios Git [02:48].

### Por que os agentes não clonam o repositório inteiro?

Porque não precisam. Eles baixam só os caminhos que vão alterar, e o servidor responde ao resto por API [03:30].

## Fontes

- [Redesigning source control (Anthropic)](https://www.anthropic.com/engineering/redesigning-source-control): O gargalo passou a ser a infraestrutura de desenvolvimento, e a Anthropic integra cerca de 30.000 mudanças por dia no repositório principal.
- [Repositório oficial do git-ai no GitHub](https://github.com/feder-cr/git-ai): O git-ai é um servidor de controle de versão de código aberto, compatível com repositórios Git.

Revisado por Maurício Yokoyama Issei em 16 de novembro de 2026.

Assuntos: [Engenharia agêntica](https://mauricio.issei.com.br/temas/engenharia-agentica)

## Sobre o vídeo

O Git tradicional foi desenvolvido para desenvolvedores humanos que clonam o repositório localmente, trabalham por horas e fazem push periodicamente. Porém, quando milhares de agentes de IA trabalham simultaneamente criando, testando e mesclando código em tempo real, gargalos como clones pesados, buscas no histórico e filas de merge travam toda a infraestrutura.

Neste vídeo, explicamos como o **`git-ai`** — um servidor de controle de versão *open-source* inspirado na arquitetura Scion da Anthropic — reescreve as regras para preparar a engenharia de software para a era dos agentes autônomos.

---

### 💡 Principais tópicos abordados no vídeo:

1. **Clientes Sempre Online (*Always-online clients*):** Agentes e robôs de CI não precisam clonar repositórios de dezenas de gigabytes; eles baixam apenas os arquivos e diretórios estritamente necessários via árvores esparsas.
2. **Controle de Versão como API:** As operações de histórico, consulta de *blame* e busca de código são processadas e cacheadas no servidor como dados derivados (*derived data*).
3. **Integração sem Fila de Merge (*Landing without a merge queue*):** Alterações passam por um mecanismo de *compare-and-swap* e agrupamento em lote (*batching*), permitindo commits em segundos sem esperas.
4. **Resolução Automática de Conflitos:** O servidor delega a resolução de conflitos de código para ferramentas determinísticas ou modelos de IA configuráveis.
5. **Log de Mudanças e Arquitetura Desacoplada:** O estado do repositório é gerenciado através de um banco de dados consistente e armazenamento de objetos em nuvem, permitindo escalabilidade horizontal dos servidores.

---

### 🔗 Fontes e Links de Referência:

* 📌 **Repositório Oficial do `git-ai` no GitHub:** https://github.com/feder-cr/git-ai
* 📄 **Artigo de Referência da Anthropic (*Redesigning source control*):** https://www.anthropic.com/engineering/redesigning-source-control

---

#Git #IA #DevOps #OpenSource #EngenhariaDeSoftware #GitAI #Anthropic

## Transcrição

_Transcrição automática, não revisada._

[0:00] Olá. Na nossa última análise sobre gargalos de infraestrutura, a gente percebeu uma coisa bem clara. O git escala humana tá batendo no teto. Hoje a gente vai mergulhar fundo em como contornar exatamente essa barreira. Vamos conhecer o Git AI, uma solução de arquitetura que foi baseada no sistema interno da Antropic chamado Sion. O objetivo principal aqui, preparar a infraestrutura de controle e diversão para aguentar milhares de agentes de inteligência artificial trabalhando e comitando o código ao mesmo tempo. Para entender o tamanho do desafio, a gente precisa olhar para essa mudança de paradigma. Imagina o desenvolvimento de software das últimas décadas. Ele funcionou num modelo offline, descentralizado e num ritmo ditado pela nossa velocidade humana de digitação. Mas quando a gente coloca milhares de agentes de IA escrevendo código simultaneamente, essa arquitetura clássica simplesmente desmorona, ela não dá conta. O que a gente precisa agora é de um ecossistema que seja sempre online e centralizado, capaz de suportar um volume absurdo de operações.

[1:00] A própria Antropic, que hoje é uma das empresas que mais gera código usando IA no mundo todo, chegou a uma conclusão super interessante e bem direta. Eles perceberam que o gargalo não é mais a geração do código em si. O problema agora é toda a infraestrutura de desenvolvimento que foi construída lá atrás pra nossa escala humana. controle de código, fonte, builds, C, tudo isso não consegue mais acompanhar o ritmo. Para quem projeta sistemas, essa é uma constatação que muda completamente o jogo. E para entender como quebrar essa barreira de vez, a gente dividiu essa arquitetura em seis partes essenciais. Um, recapitulando o desafio do Git. Dois, introduzindo o sistema Git AI. 3, clientes online e API central. Qu o fim das filas de merge. C resolução automática de conflitos. E por fim o seis, banco de dados e escalabilidade. Vamos lá. Sessão um. Recapitulando o desafio do Git. Vamos entender rapidinho por repositórios gigantescos sofrem tanto com essas novas cargas de

[2:01] trabalho. 30.000. É isso mesmo, 30.000 alterações de códigos sendo integradas por dia só no repositório principal da Antropic. Pensa bem, numa infraestrutura tradicional de Git, onde a gente precisa fazer clones completos do repositório para cada operação, isso geraria um tráfego de centenas de petabytes. É literalmente inviável. Fica matematicamente provado que os limites do Git Clássico são um baita gargalo para fluxos de trabalho automatizados em hiperescala. Sessão dois, introduzindo o sistema Git AI. É exatamente para lidar com essa carga sem precedentes que a arquitetura do software entra em cena. A grande resposta para esse problema atende pelo nome de Git AI. Enquanto a Antropic desenvolveu o sistema SON só para uso interno deles, o Git AI surge como a implementação de código aberto dessa arquitetura de ponta. Ele é um ecossistema totalmente focado no servidor, construído do zero para aguentar centenas, milhares de agentes lendo, escrevendo e integrando o código ao mesmo tempo. E o melhor, tudo isso enquanto mantém a compatibilidade com os

[3:01] repositórios Git lá na camada inferior. Sessão três, clientes online e API central. Aqui a gente vê a primeira grande quebra de paradigma, o fim da nossa velha dependência do modelo offline. Num ambiente dominado por IA, a regra agora é ter clientes sempre online. E a sacada principal aqui é a seguinte: esses clientes não baixam mais o repositório completo, eles baixam apenas os arquivos que são estritamente necessários. Usando estruturas de árvores esparsas, esses nós buscam e materializam só os caminhos que eles realmente vão alterar. Isso corta drasticamente o uso de banda e de armazenamento, permitindo que novas instâncias de agentes comecem a codar em questão de segundos. Mas vem cá, se o cliente fica leve, alguém tem que carregar o piano, certo? É aí que nasce o conceito de controle diversão como uma API. É um modelo totalmente centralizado, onde o servidor é que faz as operações de histórico e guarda os dados. Se um agente precisa puxar um histórico ou rodar um comando pesado como o Blame, ele não gasta processamento local. O servidor, que já

[4:02] tem tudo isso memorizado e em cash, calcula as respostas instantaneamente e as entrega via chamadas rápidas de API. Sessão quatro, o fim das filas de merge. Com a busca de dados otimizada, chegou a hora de resolver a maior dor de cabeça de quem mexe com C/CD. O negócio é o seguinte: nesse novo sistema não tem mais fila de merge. Filas de integração tradicionais processam uma mudança por vez. Com milhares de agentes atuando juntos, imagina o tamanho do engarrafamento. A solução arquitetural aqui é muito elegante. O sistema usa um mecanismo de comparent swap. O próprio agente faz o rebase da mudança na ponta da branch e o servidor simplesmente agrupa múltiplas integrações simultâneas transformando tudo numa única atualização. Na prática, os agentes adicionam código sem nenhum tempo de espera. E para colocar isso em perspectiva, dá só uma olhada nesses dados de latência P99. Quando a gente bota vários agentes para enviar código ao mesmo tempo, a abordagem tradicional do Git engasga, batendo mais de 6 segundos de latência e falhando direto por contenção. Já com o agrupamento do

[5:04] Git AI, essa latência despenca para cerca de 1 segundo e meio. É um fluxo contínuo e totalmente livre daqueles gargalos irritantes de integração. Sessão cinco, resolução automática de conflitos. Porque convenhamos, com tanta gente, ou melhor, tantos agentes codando junto, vai dar colisão. Qualquer pessoa de tecnologia sabe que resolver conflitos manualmente quebra o ritmo de trabalho. No ecossistema autônomo, devolver o conflito pro autor humano paralisaria o pipeline inteiro. A saída resolução automática de conflitos. O servidor usa ferramentas determinísticas ou até mesmo IA para resolver conflitos de código automaticamente. A intervenção humana no meio desse processo é completamente eliminada. E é super importante ressaltar que o sistema não confia o seu código cegamente a um modelo de linguagem qualquer. A inteligência artificial fica isolada através de um protocolo rígido e totalmente neutro de fornecedor. Isso permite plugar qualquer ferramenta determinística ou provedor de LLM. O servidor valida tudo de forma rigorosa e rejeita automaticamente qualquer trecho

[6:05] que ainda contenha marcadores de conflito, garantindo que o abacaxi não volte para quem escreveu. É seguro e previsível. Sessão seis, banco de dados e escalabilidade. Para fechar nossa análise, o pilar que sustenta todo esse crescimento. Para aguentar volumes tão massivos sem gargalos de disco local, a arquitetura de log de alterações usa um banco de dados e armazenamento de objetos. Ou seja, o sistema joga o log de eventos num banco rápido, tipo Postgra ou SK Lite, e guarda o conteúdo real dos arquivos na nuvem, como num bucket S3 ou GCS. Com isso, os servidores da aplicação não guardam estado nenhum. Eles atuam puramente como cashes rápidos dessa fonte de verdade. A grande genialidade técnica desse log de alterações é que ele cria uma linha do tempo densa e perfeitamente ordenada. Se um nó cair ou precisa reiniciar, sem crise, ele simplesmente leu o histórico no banco de dados. busca os pacotes lá no armazenamento em nuvem e volta à ativa. É por não depender de estados críticos em discos locais que os servidores escalam horizontalmente sem

[7:05] esforço nenhum, acompanhando lado a lado o crescimento da sua frota de IA. Toda essa engenharia de ponta aponta para uma reflexão que a gente não pode ignorar. A transição da escala humana pra escala de agentes já tá acontecendo com clientes sempre online, histórico virando API, execuções sem filas e logs distribuídos. A base do desenvolvimento de software foi redefinida. Como é que as equipes de tecnologia vão adaptar seus pipelines para essa nova era, onde milhares de agentes enviam código simultaneamente? Fica aí o desafio pra gente repensar nossa infraestrutura. Até a próxima.
