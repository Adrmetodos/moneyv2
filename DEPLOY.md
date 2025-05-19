# Guia de Implantação na Vercel

Este guia contém as instruções para implantar este projeto na Vercel.

## Requisitos

- Uma conta na Vercel
- Repositório Git (GitHub, GitLab, Bitbucket)

## Passos para Implantação

### 1. Preparação do Projeto

Certifique-se de que o projeto está em um repositório Git. Você pode usar GitHub, GitLab ou Bitbucket.

### 2. Arquivos de Configuração

Crie ou modifique os seguintes arquivos:

#### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### api/index.js
Crie uma pasta `api` na raiz do projeto e dentro dela um arquivo `index.js`:

```javascript
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import Stripe from 'stripe';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Configuração do Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Rota para criar checkout session do Stripe
app.post('/api/create-checkout', async (req, res) => {
  const { valor } = req.body;
  
  try {
    // Converter o valor para número inteiro (centavos)
    const valorInteiro = parseInt(valor);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: valorInteiro === 19700 ? 'Métodos Infalíveis - Plano Premium' : 'Métodos Infalíveis - Plano Básico',
              description: valorInteiro === 19700 ? 'Acesso a todos os 10 métodos infalíveis para ganhar dinheiro' : 'Acesso aos métodos básicos para ganhar dinheiro'
            },
            unit_amount: valorInteiro, // Valor em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/sucesso`,
      cancel_url: `${req.headers.origin}/cancelado`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({ error: error.message });
  }
});

// Servir arquivos estáticos em produção
app.use(express.static(path.join(__dirname, '../client')));

// Rota catch-all para Single Page Application
app.get('*', (req, res) => {
  // Ignora rotas de API
  if (req.path.startsWith('/api/')) {
    return res.status(404).send('API endpoint não encontrado');
  }
  
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default app;
```

### 3. Variáveis de Ambiente

Ao configurar o projeto na Vercel, adicione as seguintes variáveis de ambiente:

- `STRIPE_SECRET_KEY`: Sua chave secreta do Stripe
- `VITE_STRIPE_PUBLIC_KEY`: Sua chave pública do Stripe para o cliente

### 4. Implantação na Vercel

1. Faça login na sua conta da Vercel
2. Clique em "New Project" 
3. Conecte ao repositório Git onde seu projeto está armazenado
4. Configure as variáveis de ambiente mencionadas acima
5. Clique em "Deploy"

### 5. Verifique a Implantação

Após a implantação, verifique se:
- A página inicial carrega corretamente
- O checkout do Stripe funciona ao clicar nos botões de pagamento
- As páginas de sucesso e cancelamento estão funcionando

### Solução de Problemas

Se você encontrar problemas:
1. Verifique os logs de construção na dashboard da Vercel
2. Confirme se as variáveis de ambiente estão configuradas corretamente
3. Verifique se o arquivo vercel.json está corretamente formatado