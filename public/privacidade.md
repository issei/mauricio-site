# Política de Privacidade

> Versão Markdown de <https://mauricio.issei.com.br/privacidade>. v2.1 · atualizada em 13 de novembro de 2026. O texto com valor normativo é a página HTML.

Descreve como os dados pessoais são coletados, usados, armazenados, compartilhados e protegidos, conforme a LGPD (Lei 13.709/2018), o Marco Civil da Internet (Lei 12.965/2014), o GDPR (UE 2016/679), a CCPA/CPRA e o EU AI Act (UE 2024/1689).

## 1. Resumo

Coleta-se só o necessário, os dados não são vendidos, e o titular pode revisar, corrigir ou apagar o que houver sobre ele a qualquer momento.

| O que | Por quê | Com quem | Por quanto tempo |
|---|---|---|---|
| Nome, e-mail e o que a pessoa escrever | Atender a solicitação | Só operadores (seção 5) | 24 meses ou até revogação |
| IP, navegador, páginas vistas | Estatísticas e segurança | Google (GA4), Microsoft (Clarity), AWS | Até 14 meses (analytics) / 6 meses (logs) |

## 2. Controlador

Maurício Yokoyama Issei (LGPD, art. 5º, VI) — portfólio profissional, conteúdos técnicos, propostas de consultoria, contato por e-mail e ferramentas interativas que funcionam no navegador. Contato: mauricio@issei.com.br.

## 3. Dados coletados

- **Cadastrais:** nome, e-mail e os dados que a pessoa incluir na mensagem — e-mail enviado por ela (o site não tem formulário).
- **Comportamentais:** IP, user-agent, páginas, tempo, cliques — cookies e logs.
- **Comunicação:** mensagens por e-mail.

**Não são coletados:** CPF, RG, dados bancários ou de pagamento, biometria, saúde, opinião política ou qualquer dado sensível. O site não tem checkout.

## 4. Bases legais

| Finalidade | LGPD | GDPR |
|---|---|---|
| Resposta a contato e propostas | Procedimentos preliminares ao contrato (art. 7º, V) | art. 6º, b |
| Análise de tráfego agregada | Legítimo interesse com opt-out (art. 7º, IX) | art. 6º, f |
| Obrigação fiscal | Obrigação legal (art. 7º, II) | art. 6º, c |
| Logs de acesso | Marco Civil, art. 15 | art. 6º, c |

## 5. Compartilhamento

Dados não são vendidos. Operadores contratualmente vinculados: **AWS** (hospedagem S3 e CDN CloudFront), **Google** (Analytics 4 e Tag Manager), **Microsoft** (Clarity: mapas de calor e gravação de sessão) e **GitHub** (hospedagem do `cv.json` público). Autoridades públicas, mediante ordem judicial ou requisição legal.

## 6. Transferência internacional

Operadores processam dados nos EUA e em outros países, com base no art. 33 da LGPD e na Resolução CD/ANPD 19/2024: cláusulas-padrão contratuais, EU-U.S. Data Privacy Framework e garantias contratuais equivalentes.

## 7. Retenção

| Categoria | Prazo |
|---|---|
| Logs de acesso (IP + timestamp) | 6 meses (Marco Civil, art. 15) |
| Contato por e-mail (sem contratação) | 24 meses ou até revogação |
| Cadastrais de cliente ativo | Contrato + 5 anos |
| Cookies analíticos (GA4) | Até 14 meses |
| Backups criptografados | Até 90 dias após exclusão |

Depois do prazo, os dados são anonimizados ou eliminados (LGPD, art. 16).

## 8. Direitos do titular

Confirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento, oposição ao legítimo interesse e revisão humana de decisões automatizadas (LGPD art. 18; GDPR art. 15-22). Atendimento gratuito em até 15 dias (LGPD) ou 30 dias (GDPR). Residentes da Califórnia: o sinal GPC é respeitado como opt-out.

## 9. Cookies

Quatro categorias (necessários, análise, marketing, personalização), com banner de consentimento e sem cookie wall. Hoje nenhuma ferramenta de marketing está ativa. Lista nominal em [Política de Cookies](https://mauricio.issei.com.br/cookies).

## 10. IA e decisões automatizadas

Hoje o site não tem interface com LLM nem decisão automatizada sobre o titular. Se tiver: conteúdo gerado por IA é identificado; dados pessoais não treinam modelos sem consentimento explícito; decisões com efeito relevante passam por revisão humana (LGPD, art. 20) e o titular pode pedi-la ao DPO.

## 11. Segurança

TLS (versões 1.2 e 1.3), criptografia at-rest, menor privilégio (IAM, MFA), OIDC no CI/CD sem credenciais fixas. Incidentes são comunicados à ANPD e aos titulares conforme a Resolução CD/ANPD 15/2024.

## 12. Crianças e adolescentes

O site não é direcionado a menores de 18 anos e não coleta intencionalmente dados deles (LGPD art. 14).

## 13. DPO, reclamações e foro

Encarregado (DPO): mauricio@issei.com.br, resposta em até 15 dias. Reclamações à ANPD (gov.br/anpd) ou à autoridade de proteção de dados do país de residência. Lei brasileira; foro da Comarca de São Paulo/SP, ressalvado o foro do domicílio do consumidor (CDC, art. 101, I). Mudanças materiais reabrem o banner e ficam sinalizadas por 30 dias.
