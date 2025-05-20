import Stripe from 'stripe';

// Verifica se a chave do Stripe está disponível
const hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
// Inicializa o Stripe apenas se a chave estiver disponível
const stripe = hasStripeKey ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
}) : null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { valor } = req.body;
    
    // Verificar se o Stripe está configurado
    if (!hasStripeKey || !stripe) {
      console.log("Tentativa de checkout sem Stripe configurado");
      return res.status(503).json({ 
        error: "Pagamento temporariamente indisponível", 
        message: "O serviço de pagamento não está configurado. Por favor, tente novamente mais tarde."
      });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'pix'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: 'Métodos Infalíveis',
              },
              unit_amount: parseInt(valor), // valor em centavos
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://teusite.vercel.app/sucesso',
        cancel_url: 'https://teusite.vercel.app/cancelado',
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
}
