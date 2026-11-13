---
id: zVJ_XZq8gQ8
slug: aws-transit-gateway
status: ficha
temas:
  - cloud-e-confiabilidade
youtube:
  titulo: AWS Transit Gateway
  publicado_em: 2025-11-04
  duracao: PT5M54S
  descricao: |-
    Se sua arquitetura AWS está complexa com dezenas de VPCs, este vídeo é essencial!

    Cansado da complexidade do **VPC Peering** (que **não é transitivo**)? O **AWS Transit Gateway (TGW)** é o seu **roteador virtual regional** para simplificar a rede.

    Neste tutorial, focamos em 3 pontos cruciais para arquiteturas escaláveis e híbridas:
    1.  **Configuração do TGW:** Um hub **altamente disponível por design**.
    2.  **Roteamento Centralizado:** Aprenda a anexar múltiplas VPCs e a configurar rotas (ex: 0.0.0.0/0) nas tabelas da VPC apontando para o TGW.
    3.  **Migração de VPN:** Demonstramos a migração da conexão Site-to-Site VPN, destacando o uso do **BGP** e a **propagação de rotas** para anexos VPN.

    **Boas Práticas Essenciais:**
    *   Use **conexões VPN BGP** e **ative a propagação** de rotas.
    *   Crie **sub-redes separadas** para anexos TGW, mantendo as **NACLs de entrada/saída abertas**.
    *   O TGW permite compartilhamento **multi-conta** via AWS RAM.

    Domine a **melhor prática AWS** e otimize seus **custos por anexo e por GB transferido**.

    **#AWSTransitGateway #CloudNetworking #AWSVPC #VPNmigration**
  miniatura: https://i.ytimg.com/vi/zVJ_XZq8gQ8/maxresdefault.jpg
  visualizacoes: 25
  playlists: []
  legenda: automatica
  links_descricao: []
  coletado_em: 2026-11-07T22:16:07Z
---
