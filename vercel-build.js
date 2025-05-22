// Este script é executado pela Vercel durante o processo de build
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Função para criar a estrutura de pastas necessária
function createDirectoryIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Diretório criado: ${dir}`);
  }
}

console.log('Iniciando build personalizado para Vercel...');

// Diretório de saída definido no vercel.json
const outputDir = path.join(__dirname, 'dist/public');
createDirectoryIfNotExists(outputDir);

try {
  // Pular a compilação do vite.config.ts problemático
  console.log('Configurando ambiente...');
  process.env.SKIP_VITE_CONFIG_TS = 'true';
  
  // Compilar o client com esbuild em vez do vite
  console.log('Compilando client com esbuild...');
  execSync('esbuild client/src/main.tsx --bundle --format=esm --outdir=dist/public --loader:.tsx=tsx --loader:.ts=ts --sourcemap --minify', { stdio: 'inherit' });
  
  // Copiar o index.html para o diretório de saída
  console.log('Copiando index.html...');
  fs.copyFileSync('client/index.html', path.join(outputDir, 'index.html'));
  
  // Copiar arquivos CSS
  console.log('Copiando arquivos de estilo...');
  fs.copyFileSync('client/src/index.css', path.join(outputDir, 'index.css'));
  
  // Compilar o servidor
  console.log('Compilando servidor com esbuild...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build concluído com sucesso!');
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}

// Criar arquivo index.html de fallback caso necessário
if (!fs.existsSync(path.join(outputDir, 'index.html'))) {
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
  
  fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent);
  console.log(`Arquivo fallback criado: ${path.join(outputDir, 'index.html')}`);
}

console.log('Script de build para Vercel concluído com sucesso!');
