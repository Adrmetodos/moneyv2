// Este script é executado pela Vercel durante o processo de build
const fs = require('fs');
const path = require('path');

// Função para criar a estrutura de pastas necessária
function createDirectoryIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Diretório criado: ${dir}`);
  }
}

// Diretório de saída definido no vercel.json
const outputDir = path.join(__dirname, 'dist/public');
createDirectoryIfNotExists(outputDir);

// Criar um arquivo index.html simples para evitar tela branca
const indexPath = path.join(outputDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Métodos Infalíveis</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(to bottom, #000, #333);
      color: white;
      height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .container {
      max-width: 600px;
      padding: 20px;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #ccc;
    }
    .button {
      background-color: #e53e3e;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 30px;
      font-size: 1.1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s;
    }
    .button:hover {
      transform: scale(1.05);
      background-color: #c53030;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>10 MÉTODOS INFALÍVEIS PARA GANHAR DINHEIRO EM CASA</h1>
    <p>Carregando conteúdo exclusivo para você começar a faturar hoje mesmo!</p>
    <div class="loading" style="width: 60px; height: 60px; border: 5px solid #f3f3f3; border-top: 5px solid #e53e3e; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <script>
      // Redirecionar para a página inicial após o carregamento
      window.onload = function() {
        setTimeout(function() {
          window.location.href = "/";
        }, 1000);
      };
    </script>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(indexPath, htmlContent);
  console.log(`Arquivo criado: ${indexPath}`);
}

console.log('Script de build para Vercel concluído com sucesso!');