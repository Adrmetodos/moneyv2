import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Rota para criar sessão de checkout do Stripe
  app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
    const { valor, plano } = req.body;
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "pix"],
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: {
                name: plano === "premium" ? "Métodos Infalíveis - Plano Premium" : "Métodos Infalíveis - Plano Básico",
                description: plano === "premium" ? "Acesso a todos os 10 métodos infalíveis para ganhar dinheiro" : "Acesso aos métodos básicos para ganhar dinheiro"
              },
              unit_amount: parseInt(valor) * 100, // Valor em centavos
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/sucesso`,
        cancel_url: `${req.headers.origin}/cancelado`,
      });

      res.status(200).json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Rota para criar um PaymentIntent para pagamentos de uma vez só
  app.post("/api/create-payment-intent", async (req: Request, res: Response) => {
    try {
      const { amount, plano } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Converter para centavos
        currency: "brl",
        payment_method_types: ["card", "pix"],
        metadata: {
          plano: plano || "basico"
        }
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao criar pagamento: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
