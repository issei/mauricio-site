# Política de Cookies

> Versão Markdown de <https://mauricio.issei.com.br/cookies>. v2.1 · atualizada em 13 de novembro de 2026. O texto com valor normativo é a página HTML.

Lista, de forma técnica e nominal, os cookies e tecnologias similares (local storage, session storage, web beacons, fingerprinting) usados no domínio, conforme o Guia Orientativo sobre Cookies da ANPD (out/2023, revisão 2024), o GDPR e a Diretiva ePrivacy. O panorama geral está na [Política de Privacidade](https://mauricio.issei.com.br/privacidade).

## Categorias

- **Necessários** — navegação, autenticação e segurança. Sempre ativos.
- **Análise** — métricas agregadas (tráfego, páginas mais visitadas, tempo). Opt-in.
- **Marketing** — mensuração de campanhas e remarketing. Opt-in.
- **Personalização** — preferências de interface. Opt-in.

## Listagem nominal

| Nome | Domínio | Tipo | Duração | Finalidade |
|---|---|---|---|---|
| `consent_v` | primeiro | localStorage | persistente | Preferências de consentimento de cookies |
| `eai-progress-v1` | mauricio.issei.com.br | localStorage | persistente | Progresso na página Engenharia de Agentes de IA (capítulos abertos, melhor nota do quiz); nada é enviado ao servidor |
| `ci-simple-mode`, `ci-anim-off` | mauricio.issei.com.br | localStorage | persistente | Modo simples e animação desligada na página sobre curiosidade e investigação; gravadas só quando você usa esses botões |
| `mj-muted` | mauricio.issei.com.br | localStorage | persistente | Som desligado na página A Jornada em Pixel Art; gravada só quando você usa o botão de som |
| `entrevista-streaming:v1`, `entrevista-streaming:v1:salvar` | mauricio.issei.com.br | localStorage | persistente | Respostas da entrevista por escrito e a escolha de salvar ou não; o salvamento pode ser desligado na página e nada é enviado ao servidor |
| `_ga` | .issei.com.br | cookie HTTP | 400 dias | Identificador único de visitante (GA4) |
| `_ga_GEKLHZYVYX` | .issei.com.br | cookie HTTP | 400 dias | Estado da sessão GA4 |
| `_clck` | .issei.com.br | cookie HTTP | 1 ano | Identificador de usuário e preferências do Microsoft Clarity |
| `_clsk` | .issei.com.br | cookie HTTP | 1 dia | Liga as visualizações de página de uma mesma visita no Microsoft Clarity |
| `CLID` | www.clarity.ms | cookie de terceiro | 1 ano | Registra a primeira vez que o Microsoft Clarity viu este navegador em qualquer site que usa o Clarity |
| `MUID` | .clarity.ms e .bing.com | cookie de terceiro | 390 dias | Identificador de navegador da Microsoft usado pelo Clarity |
| `MR` | .c.clarity.ms e .c.bing.com | cookie de terceiro | 7 dias | Indica se o identificador `MUID` deve ser renovado |
| `SRM_B` | .c.bing.com | cookie de terceiro | 390 dias | Identificador de navegador da Microsoft |
| `SM` | .c.clarity.ms | cookie de terceiro | sessão | Sincroniza o identificador `MUID` entre domínios da Microsoft |
| `ANONCHK` | .c.clarity.ms | cookie de terceiro | 10 minutos | Indica se o identificador `MUID` foi transferido para outro cookie da Microsoft |
| `_fbp` | .mauricio.issei.com.br | cookie HTTP | 90 dias | Identificador do navegador (Meta Pixel) para mensuração e remarketing |
| `fr` | .facebook.com | cookie de terceiro | 90 dias | Direcionamento de anúncios da Meta |
| `_gcl_au` | .mauricio.issei.com.br | cookie HTTP | 90 dias | Atribuição de conversão Google Ads |

Última verificação em 13/11/2026, depois de aceitar todas as categorias: apareceram os cookies de GA4 e do Microsoft Clarity acima; os de marketing (Meta e Google Ads) não apareceram, e o Google Tag Manager não tem tag da Meta nem do Google Ads nesta data. A lista é revisada após cada mudança em ferramentas de terceiros. Inconsistências podem ser informadas ao DPO.

## Como gerenciar as preferências

- Banner de consentimento na primeira visita.
- Ícone 🍪 no canto inferior esquerdo reabre as preferências a qualquer momento.
- Bloqueio de cookies de terceiros no navegador.
- O sinal **Global Privacy Control (GPC)** é respeitado automaticamente como opt-out de análise e marketing.

## Bloqueio na origem (Consent Mode v2)

Antes de qualquer decisão do visitante, todas as categorias não essenciais ficam em `denied`. Tags de análise e marketing só disparam após consentimento explícito, ou enviam apenas pings sem cookies (modo de modelagem).

## Cookies de terceiros

Google, Meta e YouTube podem definir cookies próprios ao carregar conteúdo integrado (vídeos, mapas, embeds) e respondem por eles — ver as políticas de cookies de cada provedor.

## Mudanças

A listagem é revisada semestralmente ou a cada mudança em terceiros. Mudanças materiais reabrem o banner de consentimento.
