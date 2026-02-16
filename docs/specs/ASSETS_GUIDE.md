# Assets & Media Management Guide

## 1. Filosofia de Mídia: "Lighter is Better"

Para manter o tempo de carregamento inferior a **1 segundo**, toda mídia deve ser tratada antes de ser incluída no repositório. O objetivo é a máxima qualidade visual com o menor peso de arquivo possível.

## 2. Estrutura de Pastas

| Local | Conteúdo | Comportamento do Vite |
| --- | --- | --- |
| `public/fotos/` | Imagens de alta resolução, banners, portfólio. | Copiado diretamente para a `dist/` sem alteração de nome. |
| `public/videos/` | Arquivos `.mp4` ou `.webm`. | Copiado sem processamento (ideal para CloudFront). |
| `public/` | `favicon.ico`, `robots.txt`, `og-image.jpg`. | Disponível na raiz do domínio. |
| `src/assets/` | Ícones pequenos ou imagens que precisam de *hash* de cache. | Processados pelo Vite (minificação e cache busting). |

---

## 3. Padrões de Imagem

### Formatos Preferenciais

1. **WebP:** Padrão para todas as fotos (balanço ideal entre qualidade/tamanho).
2. **AVIF:** Alternativa de próxima geração para máxima compressão (usar se o tamanho for crítico).
3. **SVG:** Obrigatório para logos, ícones e ilustrações vetoriais.

### Regras de Dimensão e Peso

* **Hero Banners (Full Width):** Máximo 1920px de largura | < 200kb.
* **Imagens de Conteúdo/Cards:** Máximo 800px de largura | < 80kb.
* **Favicons:** 32x32px ou 48x48px.

### Compressão

Antes de adicionar uma imagem, a IA deve sugerir ou validar o uso de ferramentas de compressão (ex: Squoosh, TinyPNG ou scripts Sharp).

---

## 4. Vídeos e Animações

Para manter a performance, evite vídeos pesados.

* **Formato:** `.mp4` (H.264) para compatibilidade universal.
* **Atributos HTML5:** Sempre usar `muted`, `loop`, `playsinline` e `autoplay` para backgrounds.
* **Loading:** Usar `poster="imagem-de-preview.jpg"` para evitar espaços vazios enquanto o vídeo carrega.

```html
<video autoplay muted loop playsinline poster="/fotos/hero-placeholder.jpg" class="w-full h-full object-cover">
  <source src="/videos/atmosfera.mp4" type="video/mp4">
</video>

```

---

## 5. Tipografia (Fonts)

Conforme definido no `STYLE_GUIDE.md`:

* **Fontes Principais:** *Playfair Display* e *Inter*.
* **Implementação:** Preferencialmente via **Google Fonts** no `<head>` para aproveitar o cache do navegador, ou locais em `public/fonts/` se houver necessidade de privacidade total.
* **Display:** Usar `font-display: swap;` no CSS para evitar o efeito de texto invisível durante o carregamento.

---

## 6. Checklist para o Agente de IA (Antigravity)

Ao manipular ou sugerir novos assets, o agente deve:

* [ ] **Conversão:** Se o usuário enviar um `.png` ou `.jpg`, sugerir a conversão para `.webp`.
* [ ] **Lazy Loading:** Adicionar `loading="lazy"` em todas as imagens abaixo da dobra (below the fold).
* [ ] **Acessibilidade:** Garantir que toda tag `<img>` tenha um atributo `alt` significativo.
* [ ] **Caminhos:** Verificar se o caminho inicia com `/` (raiz da pasta public) para evitar erros de 404 após o deploy no CloudFront.
* [ ] **Aspect Ratio:** Definir `width` e `height` explicitamente para evitar *Layout Shift* (CLS).

---
