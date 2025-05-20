// API serverless para Vercel - Redirecionamento para a página de pagamento PIX

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { valor } = req.body;
    
    try {
      // Converter o valor para número inteiro (centavos)
      const valorInteiro = parseInt(valor);
      
      // Notificação para o Slack (em um sistema real)
      console.log(`Nova solicitação de pagamento via PIX: R$ ${(valorInteiro / 100).toFixed(2)}`);
      
      // Redirecionar para a página de pagamento PIX
      const pixURL = `${req.headers.origin || 'https://teusite.vercel.app'}/pagamentopix?valor=${valor}`;
      
      res.status(200).json({ url: pixURL });
    } catch (error) {
      console.error("Erro ao processar checkout:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
}
