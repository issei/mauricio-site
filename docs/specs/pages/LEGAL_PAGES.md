# SDD — Páginas Legais: Política de Privacidade & Termos de Uso

**Status:** Draft v1.0
**Autor:** Engenharia (especificação)
**Data:** 2026-05-08
**Escopo:** `src/privacidade.html`, `src/termos.html` e componente `cookie-consent` (novo)
**Substitui:** versões atuais (Boutique Empresarial, fevereiro/2026)

---

## 0. TL;DR

Reescrever **`privacidade.html`** e **`termos.html`** para refletir a realidade jurídica atual (LGPD + Marco Civil + ANPD 2024/2025 + GDPR + CCPA/CPRA + EU AI Act + DSA + ePrivacy/cookies), corrigir o **conflito de marca** (páginas hoje atribuídas a "Boutique Empresarial" em domínio `mauricio.issei.com.br`), alinhar ao **design Dark Tech** do portfólio e introduzir um **banner de consentimento de cookies com Google Consent Mode v2**, hoje inexistente — o que é o principal gap de compliance do site.

---

## 1. Contexto e Motivação

### 1.1. Estado atual

| Item | Situação | Risco |
|---|---|---|
| `privacidade.html` (existente) | Marca "Boutique Empresarial", DPO `talita@boutiqueempresarial.com.br`, canonical para `boutiqueempresarial.com.br`, mas linkada em [knowledge-os-presentation.html:2257](../../src/knowledge-os-presentation.html:2257) com © Maurício Yokoyama Issei | Inconsistência de controlador → titular não sabe quem é o controlador (violação do art. 9º, II, LGPD) |
| `termos.html` (existente) | Idem acima; cláusulas genéricas, sem menção a IA generativa/treinamento, sem DSA, sem retenção, sem base legal explícita | Termos não suprem dever de informação atualizado |
| Banner de cookies | **Inexistente** | GTM/GA4 disparam **antes** de qualquer consentimento → violação ANPD Guia de Cookies (out/2023, revisão 2024) e GDPR/ePrivacy |
| Tracking | GTM `GTM-KQ9R3GV3` + GA4 `G-GEKLHZYVYX` (e `G-8HNXV7KTY9` em páginas Boutique) sem Consent Mode | Mensuração ilícita; risco de sanção da ANPD |
| Estilo | Páginas legais em tema claro (creme/dourado), portfólio em **Dark Tech** ([STYLE_GUIDE.md](../STYLE_GUIDE.md)) | Quebra de identidade visual, perda de confiança |
| Transferência internacional | AWS S3 + CloudFront (regiões internacionais), GA4 (EUA) | Falta cláusula de transferência internacional (art. 33 LGPD; ANPD Resolução CD/ANPD 19/2024) |

### 1.2. Dois cenários de marca — DECISÃO PENDENTE

O domínio hospeda conteúdo de **dois operadores distintos**:

- **Maurício Yokoyama Issei** (portfólio profissional, propostas técnicas, Knowledge OS, CV)
- **Boutique Empresarial / Talita** (consultoria, formulários de aplicação, WhatsApp Business, Meta Ads)

**Opção A — Páginas únicas com co-controladores declarados:** uma única `privacidade.html` e `termos.html` que declaram explicitamente os dois controladores e a finalidade de cada operação. Recomendado se ambas operações compartilham infraestrutura (mesmo S3, mesmo GTM).

**Opção B — Páginas separadas por marca:** `privacidade.html` (Maurício) + `boutique/privacidade.html` (Talita) com canonical próprio. Recomendado se são entidades jurídicas distintas com CNPJs diferentes.

> ⚠️ **Bloqueador:** esta SDD assume **Opção A** como default. Se a decisão for B, replicar a estrutura para o subpath da Boutique.

---

## 2. Escopo Regulatório

A redação deve atender simultaneamente:

### 2.1. Brasil (obrigatório)

| Norma | O que exige |
|---|---|
| **LGPD — Lei 13.709/2018** | Bases legais (art. 7º/11), direitos do titular (art. 18), DPO (art. 41), incidente (art. 48), transferência internacional (art. 33) |
| **Marco Civil — Lei 12.965/2014** | Guarda de logs de acesso (6 meses), neutralidade, foro |
| **Decreto 8.771/2016** | Padrões mínimos de segurança da informação |
| **CDC — Lei 8.078/1990** | Linguagem clara, direito de arrependimento (se houver venda online) |
| **ANPD — Resolução CD/ANPD 2/2022** | Tratamento por agentes de pequeno porte |
| **ANPD — Resolução CD/ANPD 4/2023** | Aplicação de sanções (referência informativa) |
| **ANPD — Guia de Cookies (out/2023, revisão 2024)** | Banner com opt-in granular, não pode haver "muralha de cookies", botão "Recusar" com mesmo destaque |
| **ANPD — Resolução CD/ANPD 15/2024** | Comunicação de incidentes de segurança |
| **ANPD — Resolução CD/ANPD 19/2024** | Transferência internacional de dados |
| **Lei 14.708/2023** | Proteção de dados de crianças e adolescentes (relevante se houver público <18) |

### 2.2. Internacional (aplicável por audiência ou por uso de processadores estrangeiros)

| Norma | Trigger |
|---|---|
| **GDPR (UE) 2016/679** | Visitantes da UE; uso de Google Analytics/AWS |
| **EU ePrivacy Directive 2002/58/EC** | Cookies — opt-in prévio |
| **EU Digital Services Act (DSA) 2022/2065** | Se houver área de comentários/UGC ou recomendação algorítmica |
| **EU AI Act (Regulamento 2024/1689)** — em vigor escalonado 2025-2026 | Se houver chatbot/LLM no site (ex.: Knowledge OS demos) → dever de transparência |
| **CCPA/CPRA (Califórnia)** | Visitantes da Califórnia; "Do Not Sell or Share My Personal Information" |
| **PIPEDA (Canadá)**, **UK GDPR** | Se houver tráfego material |

### 2.3. Plataformas de terceiros (compromissos contratuais)

- **Meta Business Tools Terms** (Pixel/Conversions API) — cláusula específica
- **Google Ads & Analytics Terms** — necessidade de Consent Mode v2 (obrigatório desde mar/2024)
- **WhatsApp Business Solution Terms** — opt-in para mensagens

---

## 3. Decisões de Arquitetura

### 3.1. Estrutura de arquivos

```
src/
├── privacidade.html             ← reescrita (Opção A: co-controladores)
├── termos.html                  ← reescrita
├── cookies.html                 ← NOVO: detalhamento técnico de cookies
├── js/
│   └── cookie-consent.js        ← NOVO: lógica do banner
└── style.css                    ← +CSS do banner (escopo .cookie-banner)

public/
└── .well-known/
    └── gpc.json                 ← NOVO: Global Privacy Control signal
```

### 3.2. Versionamento das políticas

- Header de cada página exibe **versão (ex.: v2.0)** e **data da última atualização**.
- Histórico de versões em seção dedicada ao final ("Histórico de revisões"), com diff resumido.
- Ao publicar mudança **material**, banner reaparece para **reconsentimento** (chave `consent_version` no `localStorage`).

### 3.3. Indexação

- Manter `<meta name="robots" content="noindex, follow">` — evita SEO concorrer com home, mas permite que crawlers leiam e citem.
- **Remover** `canonical` para `boutiqueempresarial.com.br`. Trocar para `https://mauricio.issei.com.br/privacidade.html`.

---

## 4. Página 1 — `privacidade.html` (Política de Privacidade)

### 4.1. Metadados

| Campo | Valor |
|---|---|
| `<title>` | `Política de Privacidade | Maurício Issei & Boutique Empresarial` |
| `<meta name="description">` | `Como tratamos seus dados pessoais conforme a LGPD, GDPR e demais legislações vigentes. Versão 2.0 — maio/2026.` |
| `<link rel="canonical">` | `https://mauricio.issei.com.br/privacidade.html` |
| `robots` | `noindex, follow` |
| `lang` | `pt-BR` |

### 4.2. Estrutura de Seções (obrigatórias)

> Cada seção lista o **conteúdo** + **fundamento legal** + **rationale**.

#### Seção 0 — Cabeçalho de Resumo Executivo (Privacy at a Glance)

- Tabela de 4 colunas: **O que coletamos** | **Por quê** | **Com quem compartilhamos** | **Por quanto tempo**
- **Rationale:** ANPD recomenda "camadas" de informação — resumo + política completa (Guia de Boas Práticas, 2024). Reduz fricção de leitura.

#### Seção 1 — Identificação dos Controladores

- Nome civil de Maurício Yokoyama Issei + CPF mascarado (ex: `***.456.789-**`) ou CNPJ se MEI
- Nome empresarial Boutique Empresarial + CNPJ + endereço
- Definir se são **co-controladores** (art. 5º, IX, LGPD) ou **controladores independentes**
- **Fundamento:** Art. 9º, II, LGPD (identificação do controlador)

#### Seção 2 — Definições

- Dado pessoal, dado sensível, titular, tratamento, controlador, operador, anonimização
- **Rationale:** Glossário evita ambiguidade e atende padrão GDPR (art. 4º)

#### Seção 3 — Dados Coletados (categorias)

| Categoria | Exemplos | Origem |
|---|---|---|
| Cadastrais | Nome, e-mail, telefone, empresa | Formulário |
| Profissionais | Cargo, faturamento aproximado, desafios | Formulário de aplicação |
| Comportamentais | IP, user-agent, páginas vistas, tempo, scroll | Cookies/pixels |
| Comunicação | Mensagens enviadas via WhatsApp/e-mail | Canal de contato |
| Inferidos | Segmento provável, lead score | Processamento próprio + Meta |

- **Não coletamos:** dados sensíveis (saúde, biometria, opinião política), CPF/RG, dados de pagamento (não há checkout no site).
- **Fundamento:** Art. 9º, I, LGPD; art. 13 GDPR.

#### Seção 4 — Bases Legais (uma por finalidade)

| Finalidade | Base legal LGPD (art. 7º) | Base GDPR (art. 6º) |
|---|---|---|
| Resposta a contato | Execução de procedimentos preliminares (V) | Pre-contractual (b) |
| Marketing direto / remarketing | Consentimento (I) | Consent (a) |
| Análise de tráfego (GA4 agregado) | Legítimo interesse (IX) — mas com opt-out | Legitimate interest (f) |
| Cumprimento de obrigação fiscal | Obrigação legal (II) | Legal obligation (c) |
| Logs de segurança | Legítimo interesse (IX) + Marco Civil | Legal obligation (c) |

- **Rationale:** ANPD exige **base por finalidade**, não base genérica. Documentar legítimo interesse com **LIA** (Legitimate Interest Assessment) — referência em política de governança interna.

#### Seção 5 — Compartilhamento com Terceiros

Listar **operadores** atuais nominalmente:

- **AWS (Amazon Web Services Inc.)** — hospedagem S3/CloudFront — EUA, com SCC
- **Google LLC** — Analytics 4, Tag Manager, Ads — EUA, com Consent Mode
- **Meta Platforms, Inc.** — Pixel, Conversions API, mensageria — EUA/Irlanda
- **GitHub Inc. (Microsoft)** — hospedagem do `cv.json` público — EUA
- **WhatsApp Business** (se usado) — Meta — EUA/Irlanda

Para cada um: finalidade, dados compartilhados, link para política do operador, salvaguardas.

- **Fundamento:** Art. 9º, V, LGPD; art. 28 GDPR.

#### Seção 6 — Transferência Internacional

- Citar **Resolução CD/ANPD 19/2024** e mecanismos: SCC (Standard Contractual Clauses), decisão de adequação (UE-EUA Data Privacy Framework), garantias contratuais.
- Indicar país de cada operador (EUA principalmente).
- **Fundamento:** Art. 33, LGPD.

#### Seção 7 — Retenção de Dados (tabela obrigatória)

| Categoria | Prazo | Justificativa |
|---|---|---|
| Logs de acesso (IP+timestamp) | 6 meses | Marco Civil art. 15 |
| Cadastrais (lead não convertido) | 24 meses ou até revogação | Legítimo interesse |
| Cadastrais (cliente ativo) | duração do contrato + 5 anos | Prescrição CDC |
| Cookies analíticos | até 14 meses (default GA4) | Configuração GA4 |
| Backups criptografados | até 90 dias após exclusão | Recuperação de desastre |

- **Rationale:** ANPD cobra prazos definidos (não "pelo tempo necessário"). GDPR art. 5(1)(e).

#### Seção 8 — Direitos do Titular (LGPD art. 18 + GDPR art. 15-22)

Lista dos 9 direitos LGPD + os 2 adicionais GDPR (portabilidade reforçada, oposição automatizada). **Botão/CTA "Exercer meus direitos"** abre formulário ou `mailto:` com template pré-preenchido. **Prazo de resposta: 15 dias** (LGPD) / 30 dias (GDPR — citar o mais favorável).

Subseção CCPA: **"Do Not Sell or Share My Personal Information"** — link para opt-out (mesmo que não vendamos, é dever informativo se há audiência CA).

Subseção GPC (Global Privacy Control): respeitar sinal `Sec-GPC: 1` automaticamente como opt-out.

#### Seção 9 — Cookies e Tecnologias Similares

Resumo + link para `cookies.html` (página dedicada).

- **Categorias:** Estritamente necessários (sempre ativos), Analíticos (opt-in), Marketing (opt-in), Personalização (opt-in)
- **Tabela com**: nome do cookie, fornecedor, finalidade, duração, categoria
- **Rationale:** ANPD Guia 2023/2024 — exige listagem nominal e categoria; banner não pode ter "Aceitar todos" sem "Recusar todos" de igual destaque.

#### Seção 10 — Inteligência Artificial e Decisões Automatizadas

- Declarar se há chatbots/LLMs (Knowledge OS demos). Se sim, **transparência sobre IA** (EU AI Act art. 50).
- Declarar **não-treinamento** de modelos com dados do titular sem consentimento explícito (alinhado com posicionamento ANPD sobre LLMs, 2024).
- Direito à revisão humana (LGPD art. 20).

#### Seção 11 — Segurança da Informação

- Medidas técnicas: TLS 1.3, criptografia at-rest no S3, IAM mínimo, MFA, OIDC para CI/CD
- Medidas organizacionais: política interna, treinamento, NDA com prestadores
- Procedimento de **incidente** (Resolução ANPD 15/2024): comunicação à ANPD e ao titular em prazo razoável
- **Fundamento:** Art. 46-49 LGPD; Decreto 8.771/2016.

#### Seção 12 — Crianças e Adolescentes

- Site não é direcionado a <18.
- Caso identificado, dados serão excluídos.
- Tratamento eventual: melhor interesse + consentimento de pelo menos um dos pais/responsável.
- **Fundamento:** Art. 14 LGPD; Lei 14.708/2023.

#### Seção 13 — Encarregado (DPO) e Canais

- Nome ou função do DPO
- E-mail dedicado: `dpo@mauricio.issei.com.br` (ou `dpo@boutiqueempresarial.com.br` se Opção B)
- Endereço postal
- Tempo de resposta SLA
- **Fundamento:** Art. 41 LGPD.

#### Seção 14 — Reclamações à ANPD

- Direito de reclamar à ANPD (link: `https://www.gov.br/anpd`).
- Direito de reclamar à autoridade de seu país (DPA UE, ICO UK, CNIL etc).

#### Seção 15 — Alterações desta Política

- Política versionada
- Notificação por banner em mudança material
- Histórico das últimas 3 versões com data e resumo da mudança

#### Seção 16 — Lei Aplicável e Foro

- Lei brasileira; foro de São Paulo/SP (consumidor pode escolher seu domicílio — CDC art. 101).

---

## 5. Página 2 — `termos.html` (Termos de Uso)

### 5.1. Metadados

| Campo | Valor |
|---|---|
| `<title>` | `Termos de Uso | Maurício Issei & Boutique Empresarial` |
| `<meta name="description">` | `Regras de uso do site, propriedade intelectual, limitação de responsabilidade e foro.` |
| `<link rel="canonical">` | `https://mauricio.issei.com.br/termos.html` |
| `robots` | `noindex, follow` |

### 5.2. Estrutura de Seções

#### 1. Aceite e Capacidade

- Uso do site = aceite tácito (ou explícito via checkbox em formulários).
- Necessidade de capacidade civil (≥18) para contratação.

#### 2. Identificação do Provedor

- Nome civil/empresarial, CNPJ se aplicável, endereço, e-mail (espelha §1 da Política).

#### 3. Objeto e Serviços

- O que o site oferece: portfólio, propostas técnicas, conteúdo educacional, formulários de contato/aplicação, ferramentas interativas (Knowledge OS, diagnósticos).
- O que **não é**: aconselhamento jurídico/financeiro vinculativo; relação empregatícia.

#### 4. Cadastro e Conta (se houver `admin.html`)

- Confidencialidade da credencial; revogação de acesso; vedação de compartilhamento.

#### 5. Conduta do Usuário

- Vedações: scraping em massa, engenharia reversa, ataque, conteúdo ilícito, uso não autorizado de marca.
- **Fundamento:** Marco Civil arts. 7º e 8º.

#### 6. Propriedade Intelectual

- Conteúdo (textos, vídeos, código, marca, slides, presentações) protegido por **Lei 9.610/98** (Direitos Autorais) e **Lei 9.279/96** (Propriedade Industrial).
- Código aberto (se houver no GitHub) sob a licença declarada.
- CV (`cv.json`) — uso permitido para fins de avaliação profissional; vedada redistribuição comercial.
- **DMCA / notice & takedown:** canal `dmca@...` para reclamações de direitos autorais (necessário se há audiência EUA).

#### 7. Conteúdo Gerado pelo Usuário (UGC)

- Se houver formulário de comentário/upload: licença não-exclusiva para uso; usuário garante titularidade; moderação aplica DSA art. 14-17 se EU.
- Se **não houver** UGC: declarar explicitamente.

#### 8. Comunicação Eletrônica e WhatsApp

- Opt-in para WhatsApp Business — uso da **API Oficial**, conforme termos da Meta.
- Opt-out: comando `SAIR` ou link no rodapé.
- Frequência típica de comunicação.

#### 9. Conteúdo Gerado por IA

- Se o site exibe conteúdo gerado por LLM (Knowledge OS demo, chatbot), **rotular** explicitamente (EU AI Act art. 50, ANPD).
- Aviso de que IA pode errar; usuário deve validar.

#### 10. Pagamentos e Reembolso (se aplicável)

- Atualmente: site **não** processa pagamentos.
- Caso futuro: prazo de arrependimento de 7 dias (CDC art. 49) para compras a distância.

#### 11. Limitação de Responsabilidade

- Conteúdo informativo, sem garantias de ininterruptibilidade.
- Exclusão de danos indiretos/lucros cessantes **até o limite permitido** (CDC veda cláusula abusiva → manter linguagem ponderada).
- Força maior.

#### 12. Indenização

- Usuário indeniza por uso ilícito que cause prejuízo a terceiros.

#### 13. Links de Terceiros

- Não-responsabilidade pelo conteúdo de sites linkados (LinkedIn, YouTube, GitHub).

#### 14. Modificações dos Termos

- Direito de alterar; notificação no site; uso continuado = aceite.
- Versionamento + changelog (espelha Política).

#### 15. Suspensão e Encerramento

- Direito de suspender acesso a usuário em violação.

#### 16. Privacidade

- Remete para `privacidade.html`.

#### 17. Disputas

- **Tentativa amigável** primeiro (e-mail do DPO/contato).
- **Mediação** (opcional) via câmara especializada.
- **Foro:** Comarca de São Paulo/SP — exceção: consumidor pode escolher seu domicílio.
- **Lei aplicável:** brasileira.

#### 18. Cláusulas Gerais

- Independência das cláusulas (severability), tolerância não-renúncia, integralidade do acordo.

#### 19. Contato

- E-mail, endereço, formulário.

---

## 6. Componente Novo — Banner de Consentimento de Cookies

### 6.1. Justificativa

Hoje, **GTM e GA4 disparam no `<head>`** de todas as páginas, sem prévio consentimento. Isso é **a maior não-conformidade** do site com:
- ANPD Guia de Cookies (out/2023, atualização 2024)
- ePrivacy + GDPR
- Google Consent Mode v2 (obrigatório desde mar/2024 para Ads/Analytics em EU)

### 6.2. Arquivo: `src/js/cookie-consent.js`

#### Comportamento

1. Na **primeira visita** (sem chave `consent_v` no `localStorage`):
   - Exibe banner sticky no rodapé, **sem cookie wall** (não bloqueia conteúdo).
   - GTM permanece bloqueado. Apenas script "Consent Default" carregado:
     ```js
     gtag('consent', 'default', {
       ad_storage: 'denied',
       ad_user_data: 'denied',
       ad_personalization: 'denied',
       analytics_storage: 'denied',
       functionality_storage: 'granted',
       security_storage: 'granted'
     });
     ```
2. **Três botões com mesmo destaque visual** (ANPD: vedada hierarquia que induza ao "Aceitar"):
   - **Aceitar todos**
   - **Recusar todos**
   - **Personalizar** → modal com 4 toggles (Necessários[fixo], Análise, Marketing, Personalização)
3. Ao decidir, grava no `localStorage`:
   ```json
   {
     "v": "2.0",
     "ts": "2026-05-08T...",
     "categories": {"necessary":true,"analytics":true,"marketing":false,"personalization":false},
     "method": "explicit"
   }
   ```
4. Dispara `gtag('consent', 'update', {...})` com o mapeamento.
5. Botão flutuante **"🍪 Preferências de cookies"** sempre acessível (canto inferior esquerdo) para revisão.
6. Respeitar **Global Privacy Control** (`navigator.globalPrivacyControl === true` → opt-out automático para marketing/análise; banner ainda aparece informando a decisão).
7. Re-prompt automático quando `consent_v` < versão atual.

### 6.3. Acessibilidade

- Foco-trap no modal
- `role="dialog"` + `aria-labelledby`
- Keyboard nav (Tab/Esc)
- Contraste WCAG AA mínimo

### 6.4. Página `cookies.html`

Detalhamento técnico — listagem nominal:

| Cookie | Domínio | Categoria | Duração | Finalidade |
|---|---|---|---|---|
| `_ga` | `.mauricio.issei.com.br` | Análise | 2 anos | Identificador GA4 |
| `_ga_GEKLHZYVYX` | idem | Análise | 2 anos | Sessão GA4 |
| `_gid` | idem | Análise | 24h | Distinguir usuários |
| `_fbp` | idem | Marketing | 90 dias | Meta Pixel |
| `consent_v` (primeiro) | localStorage | Necessário | persistente | Preferência do usuário |

(Auditar com DevTools antes do go-live para fechar a lista exata.)

### 6.5. Integração com GTM

- Configurar **trigger** "Consent Initialization - All Pages" no GTM
- Tags GA4/Meta com **"Additional consent" = analytics_storage / ad_storage**
- Remover scripts GA4 hard-coded em `<head>` de páginas e migrá-los para tags GTM com gates de consentimento.

---

## 7. Design e UX (alinhado ao Style Guide)

> Páginas atuais quebram o tema. As novas devem seguir [STYLE_GUIDE.md](../STYLE_GUIDE.md).

### 7.1. Layout

- **Tema:** Dark Tech (`bg-[#0d1117]`, `text-[#c9d1d9]`)
- **Container:** `max-w-3xl mx-auto px-6 py-16`
- **Cards de seção:** `bg-[#161b22] border border-gray-700 rounded-lg p-8`
- **Títulos:** Inter, gradiente azul→roxo no `border-bottom` de `<h2>`
- **Tabelas:** zebra leve (`even:bg-[#0d1117]`), borda `border-gray-700`
- **Links:** `text-blue-400 hover:text-blue-300 underline`

### 7.2. Componentes específicos

- **TOC fixa lateral** (md+): índice clicável das 16 seções, com scroll-spy
- **Resumo executivo** no topo: card destacado com gradiente sutil
- **Callout "Seus direitos"**: card com glow azul + CTA "Exercer meus direitos"
- **Versão visível:** chip no header — `v2.0 · atualizada em 08/mai/2026`
- **Botão flutuante**: "Ver mudanças desde a v1.0" → modal com diff resumido

### 7.3. Tipografia legal

- Texto justificado **substituído** por `text-left` (justificado é hostil para dyslexia)
- `line-height: 1.7`, `font-size: 1rem` (tema Dark Tech)
- Listas com bullets em `text-blue-400` (substitui o gold-subtle das versões antigas)

### 7.4. Header e Footer

- **Header:** versão minimalista (logo + link "← Voltar para o site") — não a navbar completa, evitando distrair.
- **Footer:** copyright atualizado, links cruzados (Privacidade ↔ Termos ↔ Cookies), DPO contact.

---

## 8. SEO, Acessibilidade e Performance

### 8.1. SEO

- `noindex, follow` (mantém)
- Schema.org `WebPage` + `breadcrumb`
- `lang="pt-BR"`
- Meta description focada em conformidade

### 8.2. Acessibilidade (WCAG 2.1 AA)

- Estrutura de headings sequencial (h1 → h2 → h3, sem pulos)
- Skip link "Pular para o conteúdo"
- Tabelas com `<caption>` e `<th scope>`
- Banner de cookies acessível por teclado, screen reader anuncia (role=dialog)
- Contraste mínimo 4.5:1 (texto) e 3:1 (UI)
- Foco visível em todos os interativos

### 8.3. Performance

- Páginas legais: **0 JS** crítico (apenas o cookie-consent global)
- Sem fontes externas além das já carregadas
- `<style>` inline pequeno OU CSS no bundle Vite
- Tamanho máximo: 50KB cada (HTML + CSS) sem assets

---

## 9. Plano de Implementação

### 9.1. Tasks

| # | Task | Owner sugerido | Dependência |
|---|---|---|---|
| T1 | Decidir Opção A (co-controladores) vs Opção B (páginas separadas) | Maurício + Talita | — |
| T2 | Coletar dados jurídicos: CNPJ(s), endereço(s), DPO, e-mails dedicados | Maurício/Talita | T1 |
| T3 | Auditar cookies reais (DevTools + GTM Preview) e popular `cookies.html` | Eng | T1 |
| T4 | Implementar `cookie-consent.js` com Consent Mode v2 | Eng | T3 |
| T5 | Atualizar GTM: gate de consentimento nas tags | Eng | T4 |
| T6 | Reescrever `privacidade.html` (16 seções, tema Dark) | Eng + revisão jurídica | T1, T2 |
| T7 | Reescrever `termos.html` (19 seções) | Eng + revisão jurídica | T1, T2 |
| T8 | Criar `cookies.html` (página de detalhamento) | Eng | T3, T6 |
| T9 | Atualizar todos os footers (procurar por `privacidade.html`, `termos.html`, copyright) | Eng | T6, T7 |
| T10 | Adicionar links no menu/footer da `index.html` | Eng | T6, T7 |
| T11 | Testes Playwright: banner aparece, opt-in/out funciona, GA não dispara antes de consent | QA | T4, T5 |
| T12 | Revisão final por advogado especializado em proteção de dados | Maurício/Talita | T6, T7 |
| T13 | Deploy + verificação de Consent Mode no Google Tag Assistant | Eng | T11, T12 |

### 9.2. Critérios de Aceite

- [ ] `privacidade.html` cobre as 16 seções definidas no §4.2
- [ ] `termos.html` cobre as 19 seções definidas no §5.2
- [ ] Banner de cookies bloqueia GA/GTM/Meta até consentimento
- [ ] Botões "Aceitar" e "Recusar" têm igual destaque visual (auditoria ANPD passa)
- [ ] Consent Mode v2 reportando corretamente no Google Tag Assistant
- [ ] GPC respeitado automaticamente
- [ ] Páginas em tema Dark Tech (passa visual diff vs `index.html`)
- [ ] Footer de **todas as páginas** (`grep -l "footer"` em `src/*.html`) atualizado com link para Privacidade/Termos/Cookies e copyright correto
- [ ] Lighthouse: Acessibilidade ≥95, Performance ≥90
- [ ] Playwright: 8 testes E2E passando (banner, opt-in, opt-out, persistência, re-prompt em mudança de versão, GA não dispara pré-consent, GPC, links cruzados)
- [ ] Canonical, robots, og:* corretos
- [ ] Histórico de versões com diff resumido v1→v2
- [ ] Revisão jurídica formal (e-mail/PDF) anexada como evidência

### 9.3. Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Texto muito jurídico afasta usuário | Média | Médio | Resumo executivo + linguagem em camadas |
| Banner derruba métricas de GA | Alta | Médio | Esperado e legítimo; comunicar stakeholder; usar **Consent Mode modeling** que recupera 60-70% via modelagem |
| Opção A invalidada juridicamente (controlador único exigido) | Baixa | Alto | T12 (revisão por advogado) antes de publicar |
| Mudanças de plataforma (Meta, Google) tornam texto obsoleto | Alta (recorrente) | Baixo | Versionamento + revisão semestral programada |

### 9.4. Manutenção contínua

- Revisão **semestral** das políticas (calendário: jan e jul).
- Monitorar publicações da ANPD, EDPB, ICO.
- Ao adicionar **qualquer** novo terceiro (operador) ou nova finalidade, atualizar §4.5 e §4.7 antes do go-live da feature.

---

## 10. Anexos (a produzir junto da implementação)

### A. Template de e-mail para exercício de direitos

```
Assunto: [LGPD] Solicitação de [acesso/correção/eliminação/portabilidade]

Eu, [nome], titular dos dados, solicito o exercício do direito previsto no
art. 18, [inciso] da LGPD, referente a [descrever].

Documento de identificação anexo: [sim/não]
Canal preferido para resposta: [e-mail/postal]
```

### B. Tabela RoPA (Records of Processing Activities) — uso interno

Não publicada; mantida em `docs/internal/ropa.md` (criar). Exigido pelo art. 37 LGPD para controladores médios/grandes; boa prática para pequenos.

### C. Procedimento de Resposta a Incidente

`docs/internal/incident-response.md` — fluxo de detecção → contenção → comunicação ANPD em 2 dias úteis (Resolução 15/2024) → comunicação ao titular.

---

## 11. Referências

- Lei 13.709/2018 (LGPD) — `https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm`
- Lei 12.965/2014 (Marco Civil) — `https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm`
- ANPD — Guia Orientativo sobre Cookies (2023, rev. 2024)
- ANPD — Resolução CD/ANPD 15/2024 (incidentes)
- ANPD — Resolução CD/ANPD 19/2024 (transferência internacional)
- Regulamento (UE) 2016/679 (GDPR)
- Regulamento (UE) 2024/1689 (AI Act)
- Regulamento (UE) 2022/2065 (DSA)
- CCPA/CPRA — California Civil Code §1798.100 et seq.
- Google Consent Mode v2 — `https://developers.google.com/tag-platform/security/guides/consent`
- Meta Business Tools Terms — `https://www.facebook.com/legal/terms/businesstools`

---

## 12. Histórico desta SDD

| Versão | Data | Autor | Mudança |
|---|---|---|---|
| 1.0 | 2026-05-08 | Engenharia | Draft inicial |
