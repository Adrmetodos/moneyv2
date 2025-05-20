import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { valor } = req.body;

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
