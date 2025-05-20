// API serverless para Vercel - Stripe Payment Intent
// Verifica se a chave do Stripe está disponível
const hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
// Inicializa o Stripe apenas se a chave estiver disponível
const stripe = hasStripeKey ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Verificar se o Stripe está configurado
    if (!hasStripeKey || !stripe) {
      console.log("Tentativa de payment intent sem Stripe configurado");
      return res.status(503).json({ 
        error: "Pagamento temporariamente indisponível", 
        message: "O serviço de pagamento não está configurado. Por favor, tente novamente mais tarde."
      });
    }
    
    try {
      const { amount } = req.body;
      
      // Criar PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Converter para centavos
        currency: 'brl',
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
};