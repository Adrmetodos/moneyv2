import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { sendSlackNotification } from "./slackNotification";

// Verifica se a chave do Stripe está disponível
const hasStripeKey = !!process.env.STRIPE_SECRET_KEY;
console.log("Stripe está configurado:", hasStripeKey ? "Sim" : "Não");

// Inicializa o Stripe apenas se a chave estiver disponível
const stripe = hasStripeKey ? new Stripe(process.env.STRIPE_SECRET_KEY as string) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Rota para criar sessão de checkout do Stripe
  app.post("/api/create-checkout", async (req: Request, res: Response) => {
    const { valor } = req.body;
    
    // Verificar se o Stripe está configurado
    if (!hasStripeKey || !stripe) {
      console.log("Tentativa de checkout sem Stripe configurado");
      await sendSlackNotification({
        message: `Tentativa de checkout sem Stripe configurado: R$ ${parseInt(valor) / 100}`,
        type: 'error'
      });
      return res.status(503).json({ 
        error: "Pagamento temporariamente indisponível", 
        message: "O serviço de pagamento não está configurado. Por favor, tente novamente mais tarde."
      });
    }
    
    try {
      // Converter o valor para número inteiro (centavos)
      const valorInteiro = parseInt(valor);
      
      const planoNome = valorInteiro === 19700 ? "Métodos Infalíveis - Plano Premium" : "Métodos Infalíveis - Plano Básico";
      const planoDescricao = valorInteiro === 19700 ? "Acesso a todos os 10 métodos infalíveis para ganhar dinheiro" : "Acesso aos métodos básicos para ganhar dinheiro";
      
      const session = await stripe!.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: {
                name: planoNome,
                description: planoDescricao
              },
              unit_amount: valorInteiro, // Valor em centavos
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/sucesso`,
        cancel_url: `${req.headers.origin}/cancelado`,
      });

      // Enviar notificação para o Slack
      await sendSlackNotification({
        message: `Nova tentativa de checkout: ${planoNome} - R$ ${(valorInteiro / 100).toFixed(2)}`,
        type: 'payment'
      });

      res.status(200).json({ url: session.url });
    } catch (error: any) {
      console.error("Erro ao criar sessão de checkout:", error);
      
      // Notificar erro no Slack
      await sendSlackNotification({
        message: `Erro no checkout: ${error.message}`,
        type: 'error'
      });
      
      res.status(500).json({ error: error.message });
    }
  });

  // Rota para criar um PaymentIntent para pagamentos de uma vez só
  app.post("/api/create-payment-intent", async (req: Request, res: Response) => {
    // Verificar se o Stripe está configurado
    if (!hasStripeKey || !stripe) {
      console.log("Tentativa de payment intent sem Stripe configurado");
      await sendSlackNotification({
        message: `Tentativa de criar payment intent sem Stripe configurado`,
        type: 'error'
      });
      return res.status(503).json({ 
        error: "Pagamento temporariamente indisponível", 
        message: "O serviço de pagamento não está configurado. Por favor, tente novamente mais tarde."
      });
    }
    
    try {
      const { amount, plano } = req.body;
      const amountInCents = Math.round(amount * 100); // Converter para centavos
      
      const paymentIntent = await stripe!.paymentIntents.create({
        amount: amountInCents,
        currency: "brl",
        payment_method_types: ["card", "pix"],
        metadata: {
          plano: plano || "basico"
        }
      });
      
      // Enviar notificação para o Slack
      await sendSlackNotification({
        message: `Nova intenção de pagamento criada: ${plano || 'não especificado'} - R$ ${amount}`,
        type: 'payment'
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      // Notificar erro no Slack
      await sendSlackNotification({
        message: `Erro ao criar intenção de pagamento: ${error.message}`,
        type: 'error'
      });
      
      res.status(500).json({ message: "Erro ao criar pagamento: " + error.message });
    }
  });
  
  // Rota para notificações do Slack
  app.post("/api/slack-notify", async (req: Request, res: Response) => {
    try {
      const { message, type } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Mensagem é obrigatória' });
      }
      
      const result = await sendSlackNotification({ message, type });
      
      if (result) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Falha ao enviar notificação' });
      }
    } catch (error: any) {
      console.error("Erro ao enviar notificação:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
