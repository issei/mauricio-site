# SEO & Analytics Specification

## 1. Identidade e Propriedade

* **Domínio Principal:** `https://mauricio.issei.com.br`
* **Setor GA4:** Negócios e Indústria (Business & Industrial)
* **Foco de Palavras-chave:** Consultoria empresarial, boutique de negócios, eficiência operacional, estratégia B2B.

## 2. IDs de Rastreamento e Verificação

| Ferramenta | ID / Tipo | Método de Verificação |
| --- | --- | --- |
| **Google Analytics 4** | `G-xxxxxxxx` | Script `gtag.js` no `<head>` |
| **Google Search Console** | Domínio Raiz | Registro DNS TXT no Route 53 |
| **Sitemap** | `/sitemap.xml` | Gerado via `vite-plugin-sitemap` |
| **Robots.txt** | `/robots.txt` | Arquivo estático em `public/` |

---

## 3. Implementação Técnica

### Injeção de Tags (Global)

Todas as páginas HTML em `src/` devem conter o fragmento do GA4 imediatamente após a abertura da tag `<head>`.

> **Nota para a IA:** Ao gerar novas páginas, não esqueça de replicar o script de rastreamento.

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-xxxxxxxx"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-xxxxxxxx');
</script>

```

### Estrutura de Metadados (SEO On-Page)

Cada página deve seguir este padrão mínimo para garantir o "rankeamento" e a "vibe" profissional:

1. **Título:** Máximo 60 caracteres. Prefixo do serviço + `| Boutique Empresarial`.
2. **Meta Description:** Máximo 160 caracteres. Deve ser persuasiva e incluir a palavra-chave da página.
3. **Canonical Tag:** `<link rel="canonical" href="https://mauricio.issei.com.br/caminho-da-pagina" />`.

---

## 4. Social & Open Graph (Shareability)

Para garantir que o link do site apareça com imagem e título corretos no LinkedIn e WhatsApp:

* **og:type:** `website`
* **og:image:** `/og-image.jpg` (Imagem de 1200x630px localizada em `public/`)
* **og:site_name:** `Boutique Empresarial`
* **og:url:** `<meta property="og:url" content="https://mauricio.issei.com.br/NOME_DA_PAGINA" />`

---

## 5. Automação de Indexação

### Sitemap

O plugin `vite-plugin-sitemap` no `vite.config.js` é o responsável por listar todas as rotas `.html` encontradas em `src/`.

* **Frequência de Atualização:** Automática a cada build.
* **Submissão:** O arquivo é enviado ao S3 e o Google Search Console o lê diretamente na raiz.

### Robots.txt

Localizado em `public/robots.txt`.

```text
User-agent: *
Allow: /
Sitemap: https://mauricio.issei.com.br/sitemap.xml

```

---

## 6. Checklist de Validação para a IA

Sempre que o agente de **Vibe Coding** atuar no projeto, ele deve validar:

* [ ] A nova página possui um `<h1>` único e relevante?
* [ ] As imagens possuem atributo `alt` descritivo?
* [ ] O script do GA4 está presente e com o ID correto?
* [ ] A página foi adicionada ao fluxo de build para constar no sitemap?

---