# 🔐 Guia da Área Administrativa

## Visão Geral

A área administrativa permite editar o arquivo `cv.json` diretamente no GitHub através de uma interface visual amigável, sem necessidade de editar código manualmente.

## 🚀 Como Usar

### 1. Gerar um Personal Access Token (PAT) no GitHub

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Dê um nome descritivo (ex: "Admin CV Editor")
4. Selecione o escopo: **`repo`** (acesso completo ao repositório)
5. Clique em **"Generate token"**
6. **IMPORTANTE**: Copie o token gerado (começa com `ghp_...`) - você não poderá vê-lo novamente!

### 2. Acessar a Área Administrativa

1. Abra o arquivo `admin.html` no navegador (local ou após deploy)
2. Preencha os campos:
   - **GitHub Personal Access Token**: Cole o token gerado
   - **Usuário GitHub**: Seu username (ex: `issei`)
   - **Repositório**: Nome do repositório (ex: `curriculo`)
3. Marque "Lembrar credenciais" se desejar (opcional - armazena localmente)
4. Clique em **"Entrar"**

### 3. Editar o CV

Após o login, você verá o editor com as seguintes seções:

- **Info Pessoal**: Nome, título, contato
- **Resumo**: Parágrafos sobre você
- **Habilidades**: Categorias de competências técnicas
- **Experiência**: Histórico profissional
- **Projetos**: Projetos com metodologia STAR (Situação, Tarefas, Ações, Resultados)
- **Formação**: Educação acadêmica
- **Certificados**: Certificações profissionais
- **Cursos Alura**: Cursos e capacitações
- **Recomendações**: Depoimentos recebidos

#### Editando Arrays (Listas)

- **Adicionar item**: Clique no botão "+ Adicionar Novo Item"
- **Remover item**: Passe o mouse sobre o item e clique no ícone de lixeira
- **Reordenar**: Os itens mais recentes devem ficar no topo (adicione novos no início)

#### Editando Habilidades e Tags

- Digite a habilidade e pressione **Enter** para adicionar
- Clique no **X** ao lado da tag para remover

### 4. Salvar Alterações

1. Faça as edições desejadas
2. Clique em **"Salvar Alterações"** no topo da página
3. As mudanças serão commitadas diretamente no GitHub
4. Um toast de confirmação aparecerá quando salvo com sucesso

### 5. Verificar as Mudanças

1. Acesse seu repositório no GitHub
2. Verifique o commit mais recente em `src/cv.json`
3. Se tiver CI/CD configurado, o site será atualizado automaticamente
4. Caso contrário, faça o build e deploy manual

## 🔒 Segurança

### ⚠️ IMPORTANTE - Proteção do Token

- **NUNCA** faça commit do seu token no código
- O token dá acesso de escrita ao seu repositório
- Use a opção "Lembrar credenciais" apenas em computadores pessoais
- Revogue tokens antigos que não estão mais em uso

### Boas Práticas

1. **Crie um token específico** para esta aplicação
2. **Defina uma data de expiração** (ex: 90 dias)
3. **Revogue imediatamente** se suspeitar de comprometimento
4. **Não compartilhe** o link da área admin publicamente
5. **Faça backup** do `cv.json` antes de grandes alterações

## 🛠️ Desenvolvimento Local

### Testando Localmente

```bash
# Instalar dependências (se ainda não fez)
npm install

# Rodar servidor de desenvolvimento
npm run vite
```

Acesse: `http://localhost:5173/admin.html`

### Estrutura de Arquivos

```
src/
├── admin.html              # Página de login
├── admin-editor.html       # Editor principal
├── js/
│   ├── github-service.js   # Serviço de API do GitHub
│   └── admin-ui.js         # Lógica da interface
└── config.js               # (Opcional) Configurações padrão
```

## 🐛 Troubleshooting

### "Token inválido ou expirado"
- Verifique se o token foi copiado corretamente
- Confirme que o escopo `repo` está habilitado
- Gere um novo token se necessário

### "Erro ao buscar arquivo"
- Confirme que o usuário e repositório estão corretos
- Verifique se o arquivo `src/cv.json` existe no repositório
- Certifique-se de que o token tem permissão para acessar o repositório

### "Erro ao salvar"
- Pode haver um conflito (alguém editou ao mesmo tempo)
- Recarregue a página e tente novamente
- Verifique sua conexão com a internet

### Alterações não aparecem no site
- Se usar CI/CD, aguarde o pipeline completar
- Caso contrário, faça rebuild manual: `npm run build`
- Limpe o cache do navegador (Ctrl+Shift+R)

## 📝 Notas Técnicas

### Como Funciona

1. **Autenticação**: Valida o token via API do GitHub (`/user`)
2. **Leitura**: Busca o conteúdo de `src/cv.json` via API (`/repos/{owner}/{repo}/contents/{path}`)
3. **Edição**: Interface renderiza formulários dinamicamente baseados na estrutura JSON
4. **Salvamento**: Envia um `PUT` para a API criando um novo commit

### Limitações

- Requer conexão com internet (usa API do GitHub)
- Não suporta edição colaborativa em tempo real
- Não mantém histórico de versões na interface (use o Git do GitHub)

## 🔄 Próximas Melhorias (Futuras)

- [ ] Preview em tempo real das mudanças
- [ ] Histórico de versões integrado
- [ ] Upload de imagens
- [ ] Validação de campos mais robusta
- [ ] Modo offline com sincronização posterior
- [ ] Suporte a múltiplos idiomas

---

**Desenvolvido com ❤️ para facilitar a gestão do seu CV dinâmico**
