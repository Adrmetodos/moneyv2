// Este é um arquivo serveless para a Vercel
// Usado como página de fallback para evitar tela branca

export default function handler(req, res) {
  // Define cabeçalhos de segurança
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Type', 'text/html');

  // Página HTML de fallback
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>10 Métodos Infalíveis Para Ganhar Dinheiro Em Casa</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom, #000000, #202020);
      color: white;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .container {
      max-width: 800px;
      padding: 2rem;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #ff8a00, #e52e71);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .loading {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin-bottom: 2rem;
    }
    
    .loading:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: loading 1.2s linear infinite;
    }
    
    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    .btn {
      background: linear-gradient(45deg, #ff8a00, #e52e71);
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      margin-top: 2rem;
      font-weight: bold;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    p {
      max-width: 600px;
      margin: 1rem auto;
      line-height: 1.6;
      opacity: 0.8;
    }
  </style>
  <script>
    // Redirecionar para a página principal
    window.onload = function() {
      setTimeout(function() {
        window.location.href = "/";
      }, 1500);
    }
  </script>
</head>
<body>
  <div class="container">
    <h1>10 Métodos Infalíveis</h1>
    <h2>Carregando sua experiência...</h2>
    
    <div class="loading"></div>
    
    <p>Estamos preparando conteúdo exclusivo que vai transformar sua vida financeira.</p>
    
    <a href="/" class="btn">Entrar Agora</a>
  </div>
</body>
</html>`;

  // Envia a resposta
  res.status(200).send(html);
}