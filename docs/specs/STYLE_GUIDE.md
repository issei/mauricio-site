# Style Guide - Mauricio Yokoyama Issei

Este guia define a identidade visual e "vibe" do portfólio de Mauricio Yokoyama Issei, mapeando os elementos de design atuais (Dark Tech) para **Tailwind CSS**.

## Filosofia Visual: "Dark Tech & Developer Centric"

O design deve transmitir competência técnica, modernidade e imersão. Baseado na estética "GitHub Dark", focado em desenvolvedores e tecnologia.
*   **Dark Mode Native**: Fundo escuro para conforto visual e estética "coder".
*   **Gradients Neon**: Uso de gradientes Azul/Roxo para pontos de interesse.
*   **Glassmorphism**: Transparências sutis em modais e navbars.
*   **Tipografia Sans Serif**: Limpa, funcional e moderna ('Inter').

---

## Paleta de Cores

| Elemento | Hex / Css Var | Tailwind Class Aproximada | Uso |
| :--- | :--- | :--- | :--- |
| **Background Principal** | `#0d1117` | `bg-[#0d1117]` (GitHub Dark Dimmed) | Fundo da página `body`. |
| **Background Secundário** | `#161b22` | `bg-[#161b22]` | Cards, Modais, Footer. |
| **Bordas** | `#30363d` (implícito) | `border-gray-700` | Divisórias sutis. |
| **Texto Primário** | `#c9d1d9` | `text-[#c9d1d9]` | Texto corrido. |
| **Títulos (Headings)** | `#ffffff` | `text-white` | `h1`, `h2`, `h3`. |
| **Accent Primary (Blue)** | `#007bff` | `text-blue-500` / `bg-blue-500` | Botões, Links, Detalhes. |
| **Accent Secondary (Purple)** | `#8a2be2` | `text-purple-600` | Gradientes secundários. |
| **Gradient Accent** | `linear-gradient(90deg, #007bff, #8a2be2)` | `bg-gradient-to-r from-blue-500 to-purple-600` | Botões Primários, Sublinhados de Título. |

---

## Tipografia

### Fonte Única: Inter
**Fonte:** 'Inter', sans-serif.
**Pesos:** 300 (Light), 400 (Regular), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold).

*   `h1`: `text-5xl md:text-7xl font-extrabold mb-4 leading-tight`
*   `h2`: `text-4xl font-bold text-white section-title`
*   `body`: `text-lg text-gray-300 leading-relaxed`

---

## Componentes Chave

### 1. Botões

*   **Primário ("Call to Action")**
    *   Background: Gradiente Linear (Azul -> Roxo)
    *   Texto: Branco
    *   Borda: Nenhuma
    *   Shadow: `shadow-md` com glow azul.
    *   Hover: `translate-y` up + shadow increase.
    ```css
    .btn-primary {
        background: linear-gradient(90deg, #007bff, #8a2be2);
        color: white;
        border-radius: 8px;
    }
    ```

*   **Secundário ("Outlined")**
    *   Background: Transparente (Dark Gray `#21262d`)
    *   Borda: `1px solid #007bff` (Azul)
    *   Texto: Azul
    *   Hover: Preenchimento Azul + Texto Branco.

### 2. Títulos de Seção (`.section-title`)
Títulos possuem uma linha decorativa inferior com gradiente neon.
```css
.section-title::after {
    background: linear-gradient(90deg, #007bff, #8a2be2);
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); /* Glow Effect */
}
```

### 3. Cards (`.project-card`)
Cartões com fundo cinza escuro (`bg-gray-700` ou `#161b22`), bordas arredondadas e efeito de elevação no hover.
*   **Hover Effect**: `transform: translateY(-5px)`

### 4. Background Effects
*   **Hero Background**: `radial-gradient` azulado pulsante (`rgba(0, 123, 255, 0.1)`).
*   **Glassmorphism**: `backdrop-blur-sm` na Navbar fixa.

---

## Migração e Manutenção

O projeto utiliza **Tailwind CSS** via CDN (Play/Build) mas com customizações pesadas via `<style>` block no `index.html` para efeitos específicos (glow, animations, scrollbars).

Para manter a consistência:
1.  **NÃO** altere as cores de fundo para tons claros.
2.  Mantenha o contraste alto (Texto Claro em Fundo Escuro).
3.  Use sempre a fonte **Inter**.
4.  Preserve os efeitos de "Glow" (sombras coloridas) nos elementos interativos.
