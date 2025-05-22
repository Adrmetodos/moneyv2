# Instruções para Deploy

## Problema Atual
Estamos enfrentando um erro técnico ao fazer o deploy na Vercel, relacionado com um problema no arquivo `vite.config.ts`. O erro específico é:

```
ERROR: Top-level await is currently not supported with the "cjs" output format
```

## Solução Recomendada

### Opção 1: GitHub Pages (Mais simples)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos estáticos:
   - Upload do arquivo `vercel-index.html` renomeado para `index.html`
   - Copie a pasta de imagens caso necessário
3. Ative o GitHub Pages nas configurações do repositório

### Opção 2: Netlify (Para funcionalidades completas)

1. Crie uma conta gratuita no Netlify (https://netlify.com)
2. Faça upload direto dos arquivos ou conecte ao seu repositório GitHub
3. Configure a build da seguinte forma:
   - Build command: `npm run build` (podemos criar um script customizado se necessário)
   - Publish directory: `dist`
4. Configure variáveis de ambiente (se aplicável)

### Opção 3: Hospedagem Alternativa (WordPress ou outro)

Opcionalmente, você pode:
1. Hospedar o HTML estático em qualquer hospedagem que já possua
2. Usar como página de vendas em serviços como WordPress, Wix, etc.
3. Apontar os botões de pagamento para seu WhatsApp diretamente

## Arquivos Prontos para Deploy

- **vercel-index.html**: Página principal estática com todos os elementos necessários
- **vercel.js**: Handler para servidores serverless
- **netlify.toml**: Configuração para deploy no Netlify

## Próximas Etapas

Qual opção de deploy você prefere seguir? Posso ajudar com mais detalhes para qualquer uma das opções acima.
