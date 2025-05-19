# Guia para enviar para o GitHub e implantar na Vercel

## 1. Criar um repositório no GitHub

1. Acesse [GitHub](https://github.com/) e faça login na sua conta
2. Clique no botão "+" no canto superior direito e selecione "New repository"
3. Dê um nome ao seu repositório (por exemplo, "metodos-infaliveis")
4. Escolha se deseja que o repositório seja público ou privado
5. Clique em "Create repository"

## 2. Preparar o projeto para o GitHub

Certifique-se de que tem o arquivo `.gitignore` com o seguinte conteúdo:

```
node_modules
.env
.env.local
dist
```

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

1. Acesse [Vercel](https://vercel.com/) e faça login
2. Clique em "Add New..." e selecione "Project"
3. Importe o repositório que você acabou de criar no GitHub
4. Na página de configuração:
   - Framework Preset: Selecione "Other"
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Instale qualquer dependência necessária com `npm install`

5. Adicione as seguintes variáveis de ambiente em "Environment Variables":
   - `STRIPE_SECRET_KEY`: sua chave secreta do Stripe
   - `VITE_STRIPE_PUBLIC_KEY`: sua chave pública do Stripe

6. Clique em "Deploy"

## 5. Após a implantação

Se encontrar o problema de tela branca:

1. Vá para as configurações do projeto na Vercel
2. Em "Build & Development Settings":
   - Verifique se o Framework Preset está como "Other" (não Vite)
   - Confirme que Output Directory é `dist/public`
   - Habilite o "Override" se necessário

3. Em "Git", conecte-se ao branch correto do seu repositório

4. Faça uma nova implantação usando "Redeploy" ou "Redeploy with existing Build Cache"

## 6. Resolver problemas da API do Stripe

Se os pagamentos não funcionarem na Vercel:

1. Na raiz do seu repositório GitHub, crie uma pasta chamada `api`
2. Dentro dela, crie um arquivo `checkout.js` com o conteúdo abaixo:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { valor } = req.body;
    const valorInteiro = parseInt(valor);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: valorInteiro === 19700 ? 'Métodos Infalíveis - Premium' : 'Métodos Infalíveis - Básico',
              description: valorInteiro === 19700 ? 'Acesso completo aos 10 métodos' : 'Acesso básico'
            },
            unit_amount: valorInteiro,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/sucesso`,
      cancel_url: `${req.headers.origin}/cancelado`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ error: error.message });
  }
};
```

3. Faça commit destas alterações e envie para o GitHub:

```bash
git add api/
git commit -m "Adicionar função de API para Stripe"
git push origin main
```

4. Na Vercel, reimplante o projeto e verifique se a função serverless foi criada corretamente.