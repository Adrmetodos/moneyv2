// Este arquivo deve ser copiado para a raiz do seu projeto no GitHub antes da implantação na Vercel

// Configuração para a Vercel
export default function handler(req, res) {
  // Redireciona todas as requisições para o index.html
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Métodos Infalíveis</title>
  <script>
    // Redirecionar para o arquivo index.html correto
    window.location.href = '/index.html';
  </script>
  <style>
    body {
      font-family: sans-serif;
      background: linear-gradient(to bottom, #000, #222);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .loader {
      border: 5px solid #f3f3f3;
      border-top: 5px solid #e53e3e;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .container {
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="loader"></div>
    <h2>Carregando Métodos Infalíveis...</h2>
    <p>Por favor, aguarde um momento</p>
  </div>
</body>
</html>
  `);
}