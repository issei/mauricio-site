# Arquitetura do Sistema - Site Pessoal Mauricio Yokoyama Issei

Este documento descreve o fluxo de dados, a infraestrutura e o processo de build do site estático do Mauricio Yokoyama Issei. Nossa arquitetura é focada em **performance (Load Time < 1s)**, **simplicidade** e **segurança**.

## Visão Geral

O projeto é um **Multi-Page Application (MPA)** estático construído com **Vite**. Não utilizamos frameworks SPA complexos (React/Vue/Angular) para evitar overhead de JavaScript no cliente. O foco é entregar HTML + CSS puro com o mínimo de JS possível.

### Fluxo de Dados (The Vibe Flow)

1.  **Code (Git Push)**: O desenvolvedor envia código para o branch `main` no GitHub.
2.  **CI/CD (GitHub Actions)**:
    *   Autentica na AWS via **OIDC** (sem chaves de acesso de longa duração).
    *   Instala dependências e executa o build do Vite.
    *   Gera arquivos otimizados na pasta `dist/`.
3.  **Origin (AWS S3)**: O conteúdo da pasta `dist/` é sincronizado com um bucket S3 privado.
4.  **Edge (AWS CloudFront)**: O CDN distribui o conteúdo globalmente, servindo cache e garantindo HTTPS.
5.  **DNS (Amazon Route 53)**: Resolve `mauricio.issei.com.br` para a distribuição do CloudFront.

---

## Estrutura do Código

```
/
├── .github/workflows/   # Pipelines de CI/CD
├── public/              # Assets estáticos (imagens, favicon, robots.txt)
├── src/                 # Código fonte
│   ├── index.html       # Home page
│   ├── *.html           # Outras páginas (MPA)
│   └── (CSS/JS)         # Estilos e Scripts (processados pelo Vite)
├── vite.config.js       # Configuração do Build e Plugins
└── dist/                # (Gerado) Artifact final de deploy
```

## Stack Tecnológico

| Componente | Tecnologia | Função |
| :--- | :--- | :--- |
| **Build Tool** | **Vite** | Empacotamento ultra-rápido e Hot Module Replacement (HMR). |
| **Estilização** | **Tailwind CSS v4** | Utility-first CSS com diretivas modernas e zero-config file externo. |
| **Infra** | **AWS S3 + CloudFront** | Hospedagem estática de alta performance e baixo custo. |
| **Deploy** | **GitHub Actions** | Automação via OIDC. |
| **DNS** | **Route 53** | Gerenciamento de domínios. |

## Decisões de Arquitetura

1.  **Zero-Runtime CSS**: Utilizamos Tailwind v4 para gerar CSS estático no build. Não há processamento de estilos no navegador do cliente.
2.  **HTML First**: Cada rota é um arquivo HTML físico. Isso garante SEO perfeito e carregamento instantâneo, sem necessidade de hidratação de componentes JS.
3.  **GitOps**: Nenhuma alteração manual é feita na infraestrutura de produção. A "Fonte da Verdade" é sempre o repositório Git.
4.  **Imagem Otimizada**: Imagens devem estar em formatos modernos (WebP/AVIF) e localizadas em `public/` ou importadas via Vite para otimização.
5.  Sempre que for criar uma nova funcionalidade, leia primeiro a pasta docs/specs/. Se a alteração envolver UI, siga estritamente o STYLE_GUIDE.md. Se envolver deploy, valide contra o CICD_OIDC.md

## Processo de Build (Vite)

O `vite.config.js` está configurado para:
*   Root do projeto em `src/`.
*   Output em `dist/`.
*   Plugin `vite-plugin-sitemap` para geração automática de sitemap.xml.
*   Plugin `@tailwindcss/vite` para processamento de estilos.
*   Resolução automática de todos os arquivos `.html` em `src/` como pontos de entrada (inputs).
