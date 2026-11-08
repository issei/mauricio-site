---
id: 5jZcmKvJc34
slug: inferencia-causal
status: ficha
temas:
  - dados-e-decisao
youtube:
  titulo: Inferência Causal
  publicado_em: 2025-11-05
  duracao: PT6M12S
  descricao: |-
    A Inferência Causal e a **Causal AI** representam um salto na Inteligência Artificial, movendo-se além dos modelos tradicionais de Machine Learning baseados apenas em correlações estatísticas. Entender a causalidade é crucial para responder ao "porquê" e evitar a falácia de que "correlação não implica causalidade" (*cum hoc ergo propter hoc*), fundamental para decisões de negócios acionáveis. A Causal AI é necessária para a **adaptação robusta e generalização** dos agentes inteligentes.

    Existem dois *frameworks* principais: o **Modelo Causal de Rubin** (Resultados Potenciais), que foca na estimação de contrafactuais—o dilema de saber o que teria acontecido se uma ação alternativa fosse tomada; e os *Structural Causal Models* (SCMs), que utilizam **Diagramas Acíclicos Direcionados (DAGs)** para codificar as relações causais.

    Para estimar o efeito causal (ATE) de forma confiável, especialmente em dados observacionais que contêm *confounders* (variáveis que causam tanto X quanto Y), é necessário o **ajuste**.

    Técnicas essenciais incluem:
    1.  **Aleatorização:** Experimentos como **Testes A/B** garantem que o tratamento (X) seja independente de variáveis de confusão, o que torna o efeito causal estimável com menos suposições.
    2.  **Propensity Score (Escore de Propensão):** Estima a probabilidade de uma unidade receber tratamento dadas suas covariáveis. É usado para reduzir a dimensionalidade e em métodos como o *Inverse Probability Weighting* (IPW) para reponderar observações e reduzir o viés. O estimador **duplamente robusto** combina o ajuste por regressão e o IPW, sendo robusto caso um dos modelos falhe.
    3.  **Controle de Confundimento:** O **Critério da Porta de Trás** (*Backdoor Criterion*) é usado para identificar o conjunto mínimo de variáveis a serem controladas para bloquear caminhos não causais (espúrios) entre a exposição e o desfecho.

    A integração da causalidade com o Aprendizado por Reforço, dando origem ao **Causal Reinforcement Learning (CRL)**, combina invariâncias estruturais com eficiência de amostragem, sendo um dos caminhos promissores em direção à Inteligência Artificial Geral (AGI).

    #InferênciaCausal #CausalAI #MachineLearning #DataScience #ReinforcementLearning #TesteAB #Causalidade #Inovação #AGI
  miniatura: https://i.ytimg.com/vi/5jZcmKvJc34/maxresdefault.jpg
  visualizacoes: 53
  playlists: []
  legenda: automatica
  links_descricao: []
  coletado_em: 2026-11-07T22:16:07Z
---
