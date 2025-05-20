// API serverless para Vercel - Notificações Slack
const https = require('https');

module.exports = async (req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { message, type = 'info' } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Mensagem é obrigatória' });
      }
      
      const slackApiKey = process.env.SLACK_LIVE_API_KEY;
      
      if (!slackApiKey) {
        return res.status(500).json({ error: 'Chave da API do Slack não configurada' });
      }
      
      // Definir ícone e canal com base no tipo de mensagem
      let icon = ':information_source:';
      let channel = '#notificacoes';
      
      if (type === 'payment') {
        icon = ':moneybag:';
        channel = '#pagamentos';
      } else if (type === 'lead') {
        icon = ':email:';
        channel = '#leads';
      } else if (type === 'error') {
        icon = ':x:';
        channel = '#erros';
      }
      
      // Formatação da mensagem para o Slack
      const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      const formattedMessage = {
        channel,
        username: 'Métodos Infalíveis Bot',
        icon_emoji: icon,
        text: `*[${timestamp}]* ${message}`
      };
      
      // Enviar para o Slack usando a chave da API
      const options = {
        hostname: 'hooks.slack.com',
        path: `/services/${slackApiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const slackReq = https.request(options, (slackRes) => {
        let data = '';
        
        slackRes.on('data', (chunk) => {
          data += chunk;
        });
        
        slackRes.on('end', () => {
          if (slackRes.statusCode === 200) {
            res.status(200).json({ success: true });
          } else {
            res.status(slackRes.statusCode).json({ 
              error: 'Erro ao enviar para o Slack', 
              details: data 
            });
          }
        });
      });
      
      slackReq.on('error', (error) => {
        res.status(500).json({ error: `Erro na requisição: ${error.message}` });
      });
      
      slackReq.write(JSON.stringify(formattedMessage));
      slackReq.end();
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
};