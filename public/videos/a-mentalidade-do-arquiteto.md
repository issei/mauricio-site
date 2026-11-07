# A Mentalidade do Arquiteto

Vídeo de Maurício Yokoyama Issei, publicado em 28 de outubro de 2025 (7 min 38 s).
Assistir: https://www.youtube.com/watch?v=URAfUQ_9a1Q

Assuntos: [Aprendizagem e mente](https://mauricio.issei.com.br/temas/aprendizagem-e-mente)

## Sobre o vídeo

**Mergulhe fundo nas ferramentas essenciais e nas melhores práticas arquitetônicas para construir aplicações robustas e eficientes na AWS!** 🚀

Neste guia completo, detalhamos dois pilares cruciais para qualquer desenvolvedor e arquiteto de nuvem: o AWS Cloud Development Kit (AWS CDK) v2 e as operações detalhadas da API do AWS Lambda, alinhadas com os princípios de design do AWS Well-Architected Framework.

#### **Parte 1: Construção e Gerenciamento com AWS CDK e Lambda** 🛠️

Exploramos os **conceitos fundamentais do AWS CDK**, uma ferramenta poderosa para definir sua infraestrutura como código (IaC).

Em seguida, fazemos um mergulho profundo na **API do AWS Lambda (Versão 2015-03-31)**, cobrindo as operações essenciais para gerenciar suas funções e recursos serverless:

*   **Criação e Atualização de Funções:** Detalhes sobre a criação (`CreateFunction`) e atualização (`UpdateFunctionCode`, `UpdateFunctionConfiguration`) de funções, incluindo a especificação de arquiteturas (x86_64 ou arm64) e os tipos de pacote de implantação (Zip ou Imagem de Contêiner).
*   **Controle de Versão e Implantação:** Gerenciamento de aliases (`CreateAlias`, `UpdateAlias`) e versões (`PublishVersion`), que permitem implementar estratégias de tráfego (como o `RoutingConfig` do alias).
*   **Recursos Avançados:** Configuração de URLs de função (`CreateFunctionUrlConfig`) para endpoints públicos ou restritos (AuthType `NONE` ou `AWS_IAM`), gestão de camadas (`LayerVersion`), filas de mensagens não entregues (`DeadLetterConfig`), e gerenciamento de concorrência.
*   **Comunicações de Baixa Latência:** Entenda a invocação de função com *streaming* de resposta, utilizando a ação `InvokeWithResponseStream`.

#### **Parte 2: Arquitetura Robusta com o Well-Architected Framework** 🛡️💰💨

Aplicamos a lente do **Well-Architected Framework** para garantir que suas workloads sejam seguras, resilientes e econômicas.

1.  **Otimização de Custos (Cost Optimization):**
    *   **Seleção de Recursos:** Escolha o tipo, tamanho e número correto de recursos, baseando-se em dados e métricas (como tipos de instância EC2).
    *   **Modelos de Preço:** Implemente modelos de preços ideais (Instâncias Reservadas, Savings Plans, Instâncias Spot) para diferentes perfis de carga de trabalho.
    *   **Alocação:** Use uma estratégia consistente de marcação (*tagging*) para facilitar a alocação e o monitoramento de custos.

2.  **Excelência Operacional (Operational Excellence):**
    *   **Automação:** Automatize tarefas administrativas e implemente automações nas operações para reduzir erros humanos.
    *   **Prontidão Operacional:** Utilize *runbooks* para procedimentos rotineiros e *playbooks* para investigação de problemas.
    *   **Observabilidade:** Implemente telemetria de aplicações e rastreamento distribuído (usando CloudWatch e X-Ray) para ter visibilidade da integridade da workload.

3.  **Confiabilidade (Reliability):**
    *   **Design para Falhas:** Garanta que a workload esteja implantada em vários locais (Multi-AZ) e use o acoplamento fraco (como SQS ou EventBridge) para isolar componentes.
    *   **Controles de Resposta:** Implemente o controle de utilização de solicitações e o recuo exponencial com *jitter* para novas tentativas.
    *   **Testes:** Teste a resiliência ativamente usando Engenharia do Caos (como o AWS Fault Injection Service).

4.  **Segurança (Security):**
    *   **Identidade e Acesso:** Conceda o princípio do privilégio mínimo e utilize um provedor de identidades centralizado.
    *   **Proteção de Dados:** Garanta que os dados sejam criptografados tanto em repouso quanto em trânsito (por exemplo, usando TLS/SSL e AWS KMS).
    *   **Detecção:** Capture logs e métricas em locais padronizados para acelerar a análise de segurança e incidentes.

5.  **Eficiência de Performance (Performance Efficiency):**
    *   **Computação Otimizada:** Escolha instâncias com a melhor performance de preço, como o AWS Graviton.
    *   **Armazenamento de Dados:** Use o armazenamento em cache para padrões de acesso a dados de alta frequência.
    *   **Rede:** Avalie e otimize a configuração de rede, incluindo balanceadores de carga (ELB) e VPCs.

6.  **Sustentabilidade (Sustainability):**
    *   **Alinhamento com a Demanda:** Utilize o ajuste de escala dinâmico (*Auto Scaling*) para alinhar a capacidade com a demanda real, evitando recursos provisionados em excesso.
    *   **Otimização:** Remova ou refatore componentes com baixo uso e use hardware com o mínimo de impacto.

## Transcrição

Transcrição ainda não disponível.
