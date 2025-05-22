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
  // Copiar o index.html para o diretório de saída
  console.log('Copiando index.html para pasta de saída...');
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>10 Métodos Infalíveis Para Ganhar Dinheiro em Casa</title>
    <meta name="description" content="Descubra 10 métodos comprovados para ganhar dinheiro em casa sem sair do conforto do seu lar. Métodos reais e comprovados que a galera está usando agora!" />
    <meta property="og:title" content="10 Métodos Infalíveis Para Ganhar Dinheiro em Casa" />
    <meta property="og:description" content="Descubra 10 métodos comprovados para ganhar dinheiro em casa sem sair do conforto do seu lar." />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      :root {
        --background: #000000;
        --foreground: #ffffff;
        --card: #1a1a1a;
        --card-foreground: #ffffff;
        --popover: #1a1a1a;
        --popover-foreground: #ffffff;
        --primary: #2563eb;
        --primary-foreground: #ffffff;
        --secondary: #374151;
        --secondary-foreground: #ffffff;
        --muted: #374151;
        --muted-foreground: #9ca3af;
        --accent: #374151;
        --accent-foreground: #ffffff;
        --destructive: #ef4444;
        --destructive-foreground: #ffffff;
        --border: #374151;
        --input: #374151;
        --ring: #2563eb;
      }
      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(to bottom, #000000, #111827);
        color: white;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        font-weight: 800;
      }
      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 600px;
        color: #9ca3af;
      }
      .loader {
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top: 4px solid #2563eb;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 2rem;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="loader"></div>
      <h1>MÉTODOS INFALÍVEIS</h1>
      <p>Carregando seu conteúdo exclusivo sobre como ganhar dinheiro em casa...</p>
    </div>
    
    <!-- Scripts -->
    <script>
      // Redirecionar para o app estático que será gerado 
      setTimeout(() => {
        window.location.href = 'https://metodos-infaliveis.netlify.app/';
      }, 1500);
    </script>
  </body>
</html>`;

  fs.writeFileSync(path.join(outputDir, 'index.html'), htmlContent);
  console.log('Página de redirecionamento criada com sucesso');
  
  console.log('Build concluído com sucesso!');
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}
