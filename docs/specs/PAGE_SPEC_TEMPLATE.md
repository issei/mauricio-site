# Especificação de Nova Página - Template

Para solicitar a criação de uma nova página, preencha este template e salve como `docs/specs/pages/NOME_DA_PAGINA.md`.

---

## 1. Informações Básicas
*   **Nome do Arquivo**: `exemplo.html` (deve ser em minúsculo, sem espaços)
*   **URL Final**: `boutiqueempresarial.com.br/exemplo`
*   **Título da Página (SEO)**: `Título Impactante | Boutique Empresarial`
*   **Descrição (Meta Description)**: `Resumo curto e persuasivo do conteúdo da página para aparecer no Google (max 160 caracteres).`

## 2. Estrutura e Layout

### Header
*   [ ] Padrão (Logo + Menu)
*   [ ] Minimalista (Apenas Logo)
*   [ ] Outro: __________________

### Seções de Conteúdo
descreva a ordem e o objetivo de cada bloco.

1.  **Hero Section**:
    *   **Headline (H1)**: "Texto principal de impacto"
    *   **Subheadline**: "Texto de apoio"
    *   **CTA (Botão)**: "Texto do Botão" -> Link para: `/destino`
    *   **Imagem de Fundo/Contexto**: (Descreva a imagem desejada)

2.  **Bloco de Conteúdo 1**:
    *   **Tipo**: (Texto corrido / Lista de Benefícios / Grid de Cards / Depoimento)
    *   **Conteúdo Chave**: O que deve ser comunicado aqui?

3.  **Bloco de Conteúdo 2**:
    ...

### Footer
*   [ ] Padrão Completo
*   [ ] Simples (Copyright apenas)

## 3. Assets e Recursos
*   **Imagens Necessárias**: Liste imagens que precisam ser criadas ou buscadas.
*   **Scripts Específicos**: Precisa de algum comportamento JS especial? (ex: formulário, modal, slider).

## 4. Estilo e Vibe
*   **Paleta Dominante**: (Clara / Escura / Destaque)
*   **Feeling**: (Autoridade / Urgência / Institucional / Vendas)

---

**Nota para o Desenvolvedor**:
Ao implementar, lembre-se de registrar a nova página no `vite.config.js` se necessário (embora o script atual detecte `src/*.html` automaticamente) e verificar se o sitemap será atualizado.
