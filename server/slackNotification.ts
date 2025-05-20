// Serviço de notificações para o Slack
import https from 'https';

interface SlackMessage {
  message: string;
  type?: 'info' | 'payment' | 'lead' | 'error';
}

// Função para enviar notificações para o Slack
export const sendSlackNotification = async (
  slackData: SlackMessage
): Promise<boolean> => {
  const { message, type = 'info' } = slackData;
  
  if (!message) {
    console.error('Erro: Mensagem é obrigatória para notificação Slack');
    return false;
  }
  
  const slackApiKey = process.env.SECRET_LIVE_API_KEY;
  
  if (!slackApiKey) {
    console.error('Erro: Chave de API do Slack não configurada');
    return false;
  }
  
  try {
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
    
    // Enviar para o Slack usando a API do Slack
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'hooks.slack.com',
        path: `/services/${slackApiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('Notificação enviada com sucesso para o Slack');
            resolve(true);
          } else {
            console.error(`Erro ao enviar para o Slack: ${data}`);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error(`Erro na requisição Slack: ${error.message}`);
        reject(error);
      });
      
      req.write(JSON.stringify(formattedMessage));
      req.end();
    });
    
  } catch (error) {
    console.error('Erro ao enviar notificação para o Slack:', error);
    return false;
  }
};