# Solução RÁPIDA para Tela Branca na Vercel

Se você está vendo tela branca após a implantação na Vercel, siga esta solução simplificada:

## Método 1: Usar Netlify em vez de Vercel

A maneira mais simples de resolver o problema:

1. Crie uma conta na [Netlify](https://www.netlify.com/) (gratuita)
2. Ao criar um novo site, selecione "Import from Git"
3. Conecte seu repositório GitHub
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
5. Em "Advanced build settings" adicione as variáveis de ambiente:
   - `STRIPE_SECRET_KEY`: sua chave secreta
   - `VITE_STRIPE_PUBLIC_KEY`: sua chave pública

## Método 2: Solução para Vercel

Se você realmente precisa usar a Vercel:

### 1. Configure o vercel.json

```json
{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### 2. Criar um arquivo index.html de fallback

Crie um arquivo `vercel-index.html` na raiz do projeto:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=/index.html">
  <title>Métodos Infalíveis</title>
</head>
<body>
  <h1>Redirecionando...</h1>
</body>
</html>
```

### 3. Preparar pasta de API separada

Na VERCEL, crie uma API Function:

1. Crie uma pasta `api` na raiz do projeto
2. Dentro dela, crie um arquivo `checkout.js` com este conteúdo:

```js
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

### 4. No componente LandingPagePro.tsx

Verifique qual ambiente está rodando antes de fazer a chamada:

```js
const apiUrl = window.location.hostname.includes('vercel.app') 
  ? '/api/checkout' // Vercel
  : '/api/checkout'; // Local ou outra hospedagem

const response = await fetch(apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ valor }),
});
```

### 5. Configuração na Vercel

- Framework Preset: **Other**
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm install`

### 6. Variáveis de Ambiente na Vercel

- `STRIPE_SECRET_KEY`: sua chave secreta
- `VITE_STRIPE_PUBLIC_KEY`: sua chave pública

Reimplante e o site deve funcionar.