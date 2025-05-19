# Guia de Implantação na Vercel

Este guia contém instruções para corrigir o problema da tela branca e implantar este projeto na Vercel.

## Solução para Tela Branca

Se você está vendo uma tela branca após a implantação, siga estas instruções:

## Requisitos

- Uma conta na Vercel
- Acesso ao repositório do projeto

## Passos para Implantação Correta

### 1. Simplificar o arquivo vercel.json

Substitua o conteúdo do arquivo `vercel.json` pelo seguinte:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public"
}
```

### 2. Criar arquivo API para o Stripe

Crie um diretório chamado `api` na raiz do projeto e dentro dele um arquivo `checkout.js`:

```javascript
import Stripe from 'stripe';

// Inicializa o Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { valor } = req.body;
    
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

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

### 3. Modificar a chamada para a API na aplicação

No arquivo `client/src/components/LandingPagePro.tsx`, altere a chamada da API:

```typescript
// De:
const response = await fetch('/api/create-checkout', {
  // ...
});

// Para:
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ valor }),
});
```

### 4. Variáveis de Ambiente

Na Vercel, adicione as seguintes variáveis de ambiente:

- `STRIPE_SECRET_KEY`: Sua chave secreta do Stripe
- `VITE_STRIPE_PUBLIC_KEY`: Sua chave pública do Stripe (para o frontend)

### 5. Configuração do Projeto na Vercel

1. Faça login na sua conta da Vercel
2. Importe seu repositório com o botão "Import"
3. Mantenha as configurações padrão, mas certifique-se de:
   - Definir o Framework Preset como "Vite"
   - Adicionar as variáveis de ambiente mencionadas acima
4. Clique em "Deploy"

### 6. Solução Alternativa (Se ainda ver tela branca)

Se após essas mudanças você ainda vê uma tela branca:

1. Na Vercel Dashboard, vá para "Settings" > "Build & Development Settings"
2. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

3. Na seção "Environment Variables", adicione:
   - `NODE_ENV`: `production`

4. Vá para "Deployments", selecione os três pontos no deployment mais recente e escolha "Redeploy"

### Verificação

Após reimplantar, verifique:
- A página inicial carrega corretamente
- Os botões de pagamento funcionam
- O checkout do Stripe abre em uma nova aba

### Verificando Problemas

Se ainda tiver problemas:
1. Verifique os logs de implantação na Vercel para ver erros específicos
2. Verifique a aba "Functions" para ver se suas funções de API estão sendo registradas
3. Verifique o código do cliente no navegador para erros de console