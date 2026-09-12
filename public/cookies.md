# Política de Cookies

> Versão Markdown de <https://mauricio.issei.com.br/cookies>. v2.0 · atualizada em 08 de maio de 2026. O texto com valor normativo é a página HTML.

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
| `_ga` | .mauricio.issei.com.br | cookie HTTP | 2 anos | Identificador único de visitante (GA4) |
| `_ga_GEKLHZYVYX` | .mauricio.issei.com.br | cookie HTTP | 2 anos | Estado da sessão GA4 |
| `_gid` | .mauricio.issei.com.br | cookie HTTP | 24 horas | Diferenciar usuários no dia |
| `_fbp` | .mauricio.issei.com.br | cookie HTTP | 90 dias | Identificador do navegador (Meta Pixel) para mensuração e remarketing |
| `fr` | .facebook.com | cookie de terceiro | 90 dias | Direcionamento de anúncios da Meta |
| `_gcl_au` | .mauricio.issei.com.br | cookie HTTP | 90 dias | Atribuição de conversão Google Ads |

A lista corresponde ao conjunto esperado pelo tracking declarado (Google Tag Manager + GA4) e é revisada após cada mudança em ferramentas de terceiros. Inconsistências podem ser informadas ao DPO.

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
