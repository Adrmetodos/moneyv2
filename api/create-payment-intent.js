// API serverless para Vercel - Pagamentos PIX

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
    try {
      const { valor, email, nome } = req.body;
      
      if (!valor || !email) {
        return res.status(400).json({ error: 'Valor e email são obrigatórios' });
      }
      
      // Valor em centavos (para manter consistência)
      const valorInteiro = Math.round(parseFloat(valor) * 100);
      
      // Em um sistema real, aqui geraria um código PIX 
      // Simulação de código PIX (estático para testes)
      const pixCopia = `00020126580014BR.GOV.BCB.PIX0136f5f7a868-e769-4bdb-b9ab-8d38d3c97ff9520400005303986540${valorInteiro}5802BR5925METODOS INFALIVES LTDA6009SAO PAULO62070503***63041DBC`;
      
      // Log no servidor para registro
      console.log(`Novo pagamento PIX solicitado: R$ ${(valorInteiro / 100).toFixed(2)} - ${nome || 'Cliente'} (${email})`);

      res.status(200).json({ 
        success: true, 
        pixCopia,
        valor: valorInteiro,
        valorFormatado: `R$ ${(valorInteiro / 100).toFixed(2)}`,
        mensagem: "Pagamento PIX gerado com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao processar pagamento PIX:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
};