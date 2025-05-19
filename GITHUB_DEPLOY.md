# Guia Otimizado para GitHub e Vercel

## 1. Criar um repositório no GitHub

1. Acesse [GitHub](https://github.com/) e faça login na sua conta
2. Clique no botão "+" no canto superior direito e selecione "New repository"
3. Dê um nome ao seu repositório (por exemplo, "metodos-infaliveis")
4. Escolha se deseja que o repositório seja público ou privado
5. Clique em "Create repository"

## 2. Preparar o projeto para o GitHub

O projeto já está preparado com:
- `.gitignore` configurado
- `vercel.json` otimizado
- `vercel-index.html` como página de fallback
- Funções serverless na pasta `api/`

## 3. Inicializar o Git e enviar para o GitHub

Execute os seguintes comandos no terminal do seu projeto:

```bash
# Inicializar o repositório Git
git init

# Adicionar todos os arquivos ao Git
git add .

# Fazer o primeiro commit
git commit -m "Primeiro commit - Métodos Infalíveis"

# Adicionar o repositório remoto (substitua USERNAME pelo seu nome de usuário e REPO pelo nome do repositório)
git remote add origin https://github.com/USERNAME/REPO.git

# Enviar para o GitHub
git push -u origin main
```

Se o comando acima falhar com o branch "main", tente:

```bash
git push -u origin master
```

## 4. Implantar na Vercel

### Método 1: Via GitHub

1. Acesse [Vercel](https://vercel.com/) e faça login
2. Clique em "Add New..." e selecione "Project"
3. Importe o repositório que você acabou de criar no GitHub
4. Na página de configuração:
   - **NÃO modifique** nenhuma configuração, pois o arquivo `vercel.json` já tem tudo configurado
   - Apenas verifique que o diretório de saída está como `dist/public`

5. Adicione as seguintes variáveis de ambiente em "Environment Variables":
   - `STRIPE_SECRET_KEY`: sua chave secreta do Stripe
   - `VITE_STRIPE_PUBLIC_KEY`: sua chave pública do Stripe

6. Clique em "Deploy"

### Método 2: Usando Vercel CLI (alternativa)

Se encontrar problemas com o método 1, tente:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login no Vercel
vercel login

# Implantar (na raiz do projeto)
vercel --prod
```

Durante a implantação via CLI, ele perguntará:
- Settings from vercel.json: Responda "Y"
- Variáveis de ambiente: Adicione as chaves do Stripe quando solicitado

## 5. Verificar a implantação

Após a implantação, verifique se:

1. A página inicial carrega corretamente
2. As rotas de navegação funcionam (clique em diferentes opções)
3. Os formulários e fluxos de pagamento estão funcionando

## 6. Resolver problemas de tela branca

Se encontrar a tela branca na Vercel:

1. Verifique se a URL está correta (deve ter `https://` e não apresentar erros no console)
2. Na Vercel, vá em "Deployments" e clique nos logs de implantação para verificar erros
3. Certifique-se de que todas as variáveis de ambiente foram configuradas
4. Tente acessar diretamente a API: `https://seu-dominio.vercel.app/api`

O projeto já vem com:
- Página de fallback em `vercel-index.html` que é exibida durante o carregamento
- Configuração otimizada no `vercel.json` para rotas e redirecionamentos
- APIs serverless na pasta `api/` que funcionam independentemente do frontend

## 7. Dicas adicionais

- Se precisar atualizar o código, faça as alterações, commit e push para o GitHub. A Vercel reimplantará automaticamente
- Para testar os pagamentos, use os cartões de teste do Stripe (ex: 4242 4242 4242 4242)
- Para monitorar erros, use a seção "Monitoring" no painel da Vercel
- Se continuar enfrentando problemas, tente o Deploy no Netlify seguindo as instruções no arquivo SOLUCAO_IMPLANTACAO.md