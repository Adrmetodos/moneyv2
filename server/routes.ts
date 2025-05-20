import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendSlackNotification } from "./slackNotification";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rota para simular checkout (apenas para PIX, sem cartão de crédito)
  app.post("/api/create-checkout", async (req: Request, res: Response) => {
    const { valor } = req.body;
    
    try {
      // Converter o valor para número inteiro (centavos)
      const valorInteiro = parseInt(valor);
      
      const planoNome = valorInteiro === 19700 ? "Métodos Infalíveis - Plano Premium" : "Métodos Infalíveis - Plano Básico";
      
      // Enviar notificação para o Slack
      await sendSlackNotification({
        message: `Nova solicitação de checkout PIX: ${planoNome} - R$ ${(valorInteiro / 100).toFixed(2)}`,
        type: 'payment'
      });

      // No lugar de redirecionamento para checkout do Stripe, vamos direcionar para nossa página de PIX
      res.status(200).json({ url: `${req.headers.origin}/pagamentopix?valor=${valor}` });
    } catch (error: any) {
      console.error("Erro ao processar checkout PIX:", error);
      
      // Notificar erro no Slack
      await sendSlackNotification({
        message: `Erro no checkout PIX: ${error.message}`,
        type: 'error'
      });
      
      res.status(500).json({ error: error.message });
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
  
  // Rota para processar pagamento via PIX
  app.post("/api/pagamento-pix", async (req: Request, res: Response) => {
    try {
      const { valor, email, nome } = req.body;
      
      if (!valor || !email) {
        return res.status(400).json({ error: 'Valor e email são obrigatórios' });
      }
      
      // Em um sistema real, aqui geraria um código PIX
      // Para simplificar, vamos apenas simular o processo
      
      // Enviar notificação para o Slack
      await sendSlackNotification({
        message: `Novo pagamento PIX solicitado: R$ ${(parseInt(valor) / 100).toFixed(2)} - ${nome || 'Cliente'} (${email})`,
        type: 'payment'
      });
      
      // Simulação de código PIX
      const pixCopia = `00020126580014BR.GOV.BCB.PIX0136f5f7a868-e769-4bdb-b9ab-8d38d3c97ff9520400005303986540${valor}5802BR5925METODOS INFALIVES LTDA6009SAO PAULO62070503***63041DBC`;
      
      res.status(200).json({ 
        success: true, 
        pixCopia,
        mensagem: "Pagamento PIX gerado com sucesso!"
      });
      
    } catch (error: any) {
      console.error('Erro ao processar pagamento PIX:', error);
      
      // Notificar erro no Slack
      await sendSlackNotification({
        message: `Erro ao processar pagamento PIX: ${error.message}`,
        type: 'error'
      });
      
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
