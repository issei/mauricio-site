---
id: LnEzU4OfkoM
slug: arquitetura-de-dns-na-aws-centralizado-vs-distribuido-em
status: ficha
temas: []
youtube:
  titulo: "Arquitetura de DNS na AWS: Centralizado vs. Distribuído em Ambientes Multi-Account"
  publicado_em: 2026-09-23
  duracao: PT7M43S
  descricao: |-
    Como gerenciar o DNS de forma eficiente quando sua empresa cresce e passa a ter dezenas ou centenas de contas na AWS? 🤔

    Neste vídeo didático e visual, explicamos por que a gestão descentralizada de DNS pode gerar configurações duplicadas, inconsistências e gargalos operacionais, e como uma **arquitetura centralizada de DNS** em uma conta dedicada de **Network / Shared Services** resolve esses desafios.

    ---

    ### 📌 **O que você vai aprender neste vídeo:**
    * **A analogia da agenda:** O que é DNS e como ele traduz nomes fáceis de lembrar em endereços de sistemas.
    * **O desafio do crescimento:** O que acontece quando cada conta AWS administra seu próprio DNS de forma independente.
    * **Arquitetura Centralizada:** Como funciona a infraestrutura central de DNS na conta de Network / Shared Services.
    * **Amazon Route 53 Resolver:** O funcionamento do servidor recursivo padrão presente nas VPCs e a resolução híbrida.
    * **Compartilhamento em Escala:** Como distribuir regras e políticas entre contas com o **AWS Resource Access Manager (RAM)** e o **Route 53 Profiles**.
    * **Prós e Trade-offs:** Comparativo direto entre simplicidade operacional, governança, segurança, autonomia das equipes e resiliência.

    ---

    ### ⏱️ **Capítulos do Vídeo:**
    00:00 - Introdução: O que é DNS?
    01:30 - O desafio dos ambientes AWS Multi-Account
    03:15 - Problemas da gestão descentralizada de DNS
    05:00 - Arquitetura Centralizada em Network / Shared Services
    07:10 - Amazon Route 53 Resolver e AWS RAM na prática
    09:25 - Padronizando governança com Route 53 Profiles
    11:40 - Comparativo de modelos e Trade-offs
    13:50 - Mensagem final e boas práticas

    ---

    ### 📚 **Documentação Oficial e Links Úteis da AWS:**

    * 📖 **Visão geral do Amazon Route 53 Resolver:**  
      [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html)

    * 📖 **Gerenciamento de DNS em escala com Amazon Route 53 Profiles:**  
      [https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html)

    * 📖 **Boas Práticas Arquiteturais de DNS na AWS (AWS Networking Best Practices):**  
      [https://aws.github.io/aws-networking-best-practices/foundation/dns/](https://aws.github.io/aws-networking-best-practices/foundation/dns/)

    * 📖 **Guia de Governança de Domínios no Route 53 em Ambientes Multi-Account:**  
      [https://aws.amazon.com/blogs/networking-and-content-delivery/protect-amazon-route-53-domains-during-account-lifecycle-events-best-practices-for-domain-governance-in-multi-account-organizations/](https://aws.amazon.com/blogs/networking-and-content-delivery/protect-amazon-route-53-domains-during-account-lifecycle-events-best-practices-for-domain-governance-in-multi-account-organizations/)

    ---

    #AWS #Route53 #CloudComputing #MultiAccount #DNS #ArquiteturaDeSoftware #DevOps #CloudBrasil
  miniatura: https://i.ytimg.com/vi/LnEzU4OfkoM/maxresdefault.jpg
  visualizacoes: 5
  playlists: []
  legenda: pendente
  links_descricao:
    - https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html
    - https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html
    - https://aws.github.io/aws-networking-best-practices/foundation/dns/](https://aws.github.io/aws-networking-best-practices/foundation/dns/
    - https://aws.amazon.com/blogs/networking-and-content-delivery/protect-amazon-route-53-domains-during-account-lifecycle-events-best-practices-for-domain-governance-in-multi-account-organizations/](https://aws.amazon.com/blogs/networking-and-content-delivery/protect-amazon-route-53-domains-during-account-lifecycle-events-best-practices-for-domain-governance-in-multi-account-organizations/
  coletado_em: 2026-11-07T22:16:07Z
---
