// Handler para Vercel
export default function handler(req, res) {
  res.status(200).send(`
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>10 Métodos Infalíveis Para Ganhar Dinheiro em Casa</title>
    <meta name="description" content="Descubra 10 métodos comprovados para ganhar dinheiro em casa sem sair do conforto do seu lar. Métodos reais e comprovados que a galera está usando agora!" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
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
        padding: 3rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 90vh;
        text-align: center;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        font-weight: 800;
        line-height: 1.2;
      }
      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 600px;
        color: #9ca3af;
        line-height: 1.6;
      }
      .btn-primary {
        background: #3b82f6;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        font-size: 1.1rem;
        display: inline-block;
        margin-top: 1rem;
      }
      .btn-primary:hover {
        background: #2563eb;
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
      }
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin: 4rem 0;
        width: 100%;
        max-width: 1000px;
      }
      .feature-card {
        background: rgba(26, 26, 26, 0.6);
        border-radius: 0.75rem;
        padding: 2rem;
        text-align: left;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s;
      }
      .feature-card:hover {
        transform: translateY(-5px);
        border-color: rgba(59, 130, 246, 0.5);
      }
      .feature-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #3b82f6;
      }
      .feature-card p {
        font-size: 1rem;
        color: #9ca3af;
        margin-bottom: 1rem;
      }
      .emoji {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      .price {
        font-size: 3rem;
        font-weight: 800;
        color: #3b82f6;
        margin: 1rem 0;
      }
      .price-note {
        font-size: 1rem;
        color: #9ca3af;
        margin-bottom: 2rem;
      }
      .countdown {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 700;
        margin: 2rem 0;
        border: 1px solid #ef4444;
      }
      .whatsapp-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #25D366;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        transition: all 0.3s;
      }
      .whatsapp-btn:hover {
        transform: scale(1.1);
      }
      .whatsapp-icon {
        width: 30px;
        height: 30px;
      }
      .payment-options {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        margin: 2rem 0;
      }
      .payment-option {
        background: rgba(26, 26, 26, 0.8);
        border: 1px solid rgba(59, 130, 246, 0.5);
        border-radius: 0.75rem;
        padding: 1.5rem;
        width: 280px;
        text-align: center;
        transition: all 0.3s;
      }
      .payment-option:hover {
        transform: translateY(-5px);
        border-color: rgba(59, 130, 246, 0.8);
      }
      .payment-option h3 {
        font-size: 1.5rem;
        color: white;
        margin-bottom: 0.5rem;
      }
      .payment-option .price-tag {
        font-size: 2.5rem;
        font-weight: 800;
        color: #3b82f6;
        margin: 1rem 0;
      }
      .payment-option .description {
        font-size: 0.9rem;
        color: #9ca3af;
        margin-bottom: 1.5rem;
      }
      #payment-page {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        overflow-y: auto;
      }
      .payment-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: rgba(17, 24, 39, 0.95);
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      }
      .qr-container {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        width: fit-content;
        margin: 0 auto 1.5rem;
      }
      .qr-image {
        display: block;
        width: 250px;
        height: 250px;
      }
      .pix-code {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1.5rem;
        overflow-wrap: break-word;
        font-family: monospace;
        font-size: 0.9rem;
        color: #d1d5db;
      }
      .success-msg {
        display: none;
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
        border: 1px solid #10b981;
        text-align: center;
      }
      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
      }
      .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .instructions {
        margin: 2rem 0;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
      }
      .instructions h2 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
      }
      .instructions ol {
        padding-left: 1.5rem;
        margin-bottom: 0;
        text-align: left;
      }
      .instructions li {
        margin-bottom: 0.75rem;
      }
      @media (max-width: 768px) {
        h1 {
          font-size: 2rem;
        }
        .features {
          grid-template-columns: 1fr;
        }
        .payment-options {
          flex-direction: column;
          align-items: center;
        }
      }
    </style>
  </head>
  <body>
    <!-- Página Inicial -->
    <div class="container" id="home-page">
      <h1>10 MÉTODOS INFALÍVEIS PARA GANHAR DINHEIRO EM CASA</h1>
      <p>Descubra 10 métodos comprovados para ganhar dinheiro sem sair do conforto do seu lar. Métodos reais e comprovados que a galera está usando agora!</p>
      
      <div class="countdown">ATENÇÃO: OFERTA POR TEMPO LIMITADO!</div>
      
      <img src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Ganhe dinheiro em casa" class="hero-image">
      
      <div class="features">
        <div class="feature-card">
          <div class="emoji">💰</div>
          <h3>Renda Extra Imediata</h3>
          <p>Métodos que você pode começar a implementar hoje mesmo e ver resultados em poucos dias.</p>
        </div>
        <div class="feature-card">
          <div class="emoji">🏠</div>
          <h3>100% Home Office</h3>
          <p>Todos os métodos podem ser executados de casa, sem precisar sair para trabalhar fora.</p>
        </div>
        <div class="feature-card">
          <div class="emoji">🔒</div>
          <h3>Acesso Vitalício</h3>
          <p>Compre uma vez e tenha acesso para sempre, incluindo todas as atualizações futuras.</p>
        </div>
      </div>
      
      <div class="payment-options">
        <div class="payment-option">
          <h3>Pacote Completo</h3>
          <div class="price-tag">R$197,00</div>
          <div class="description">Acesso a todos os 10 métodos, suporte e atualizações vitalícias</div>
          <a href="#" class="btn-primary premium-btn" onclick="showPayment('premium')">QUERO ESTE!</a>
        </div>
        <div class="payment-option">
          <h3>Pacote Básico</h3>
          <div class="price-tag">R$64,90</div>
          <div class="description">Acesso aos 3 métodos principais para começar agora mesmo</div>
          <a href="#" class="btn-primary basic-btn" onclick="showPayment('basic')">QUERO ESTE!</a>
        </div>
      </div>
      
      <p style="margin-top: 2rem;">Não perca esta oportunidade de transformar sua vida financeira. Escolha um plano acima e comece sua jornada para a independência financeira hoje!</p>
    </div>
    
    <!-- Página de Pagamento PIX -->
    <div id="payment-page">
      <div class="close-btn" onclick="hidePayment()">✕</div>
      <div class="payment-container">
        <h1 id="payment-title">Pagamento via PIX</h1>
        <p style="text-align: center;" id="payment-plan">Pacote Completo - Métodos Infalíveis</p>
        
        <div class="price" id="payment-price">R$ 197,00</div>
        
        <div class="qr-container">
          <img id="qr-code" src="" alt="QR Code PIX" class="qr-image">
        </div>
        
        <div class="pix-code">
          <p style="margin-top: 0; margin-bottom: 0.5rem; text-align: center;">Código PIX Copia e Cola:</p>
          <p id="pix-code-text" style="margin: 0; word-break: break-all;"></p>
        </div>
        
        <button class="btn-primary" onclick="copyPixCode()">Copiar código PIX</button>
        <div id="success-message" class="success-msg">✓ Código copiado com sucesso!</div>
        
        <div class="instructions">
          <h2>Como usar:</h2>
          <ol>
            <li>Abra o aplicativo do seu banco</li>
            <li>Acesse a opção de pagamento via PIX</li>
            <li>Escaneie o QR Code ou use a opção "PIX Copia e Cola"</li>
            <li>Cole o código copiado acima</li>
            <li>Confira o valor <strong id="confirm-price">R$ 197,00</strong> e finalize o pagamento</li>
            <li>Após o pagamento, você receberá o acesso em até 5 minutos</li>
          </ol>
        </div>
      </div>
    </div>
    
    <!-- Botão do WhatsApp flutuante -->
    <a href="https://wa.me/qr/WXWCW3JQYR4MO1" class="whatsapp-btn" target="_blank">
      <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.4725 14.715C17.1875 14.5725 15.72 13.8525 15.4575 13.7625C15.195 13.6725 14.9999 13.6275 14.8049 13.9125C14.6099 14.1975 14.04 14.87 13.8675 15.065C13.695 15.26 13.5225 15.2825 13.2375 15.14C12.9525 14.9975 11.9925 14.6725 10.8599 13.6725C9.9749 12.8975 9.3899 11.9425 9.2174 11.6575C9.0449 11.3725 9.1999 11.215 9.3449 11.0675C9.4749 10.935 9.6324 10.7175 9.7799 10.545C9.9274 10.3725 9.9724 10.2525 10.0624 10.0575C10.1524 9.8625 10.1074 9.69 10.0399 9.5475C9.9724 9.405 9.3899 7.9375 9.1499 7.3675C8.9099 6.7975 8.6699 6.89 8.4899 6.89C8.3174 6.875 8.1224 6.875 7.9274 6.875C7.7324 6.875 7.4249 6.9425 7.1624 7.2275C6.8999 7.5125 6.1349 8.2325 6.1349 9.7C6.1349 11.1675 7.1849 12.59 7.3324 12.785C7.4799 12.98 9.3749 15.92 12.2924 17.185C13.0349 17.5 13.6174 17.6925 14.0699 17.83C14.8049 18.0625 15.4724 18.0325 16.0024 17.965C16.5924 17.8825 17.8024 17.245 18.0424 16.5775C18.2824 15.91 18.2824 15.34 18.215 15.2175C18.1475 15.095 17.9525 15.0275 17.6675 14.885L17.4725 14.715ZM12.0524 21.8125H12.0374C10.2803 21.8127 8.55595 21.3775 7.0124 20.5525L6.6724 20.3575L2.9624 21.3175L3.9374 17.71L3.7199 17.3575C2.81794 15.7605 2.34665 13.9368 2.3499 12.08C2.3499 6.83 6.6199 2.5625 12.0674 2.5625C14.6774 2.5625 17.1224 3.575 18.9974 5.45C19.9222 6.36818 20.6535 7.46692 21.1492 8.68504C21.6448 9.90316 21.8952 11.215 21.8874 12.5375C21.8724 17.7875 17.6049 21.8125 12.0524 21.8125ZM20.5574 3.89C19.4323 2.75681 18.0911 1.85919 16.612 1.25152C15.1328 0.643846 13.5435 0.335755 11.9374 0.3475C5.5124 0.3475 0.2924 5.5675 0.2774 12.0775C0.2774 14.2025 0.8474 16.2575 1.9124 18.0675L0.2774 24L6.3374 22.4C8.0774 23.365 10.0324 23.875 12.0224 23.875H12.0374C18.4624 23.875 23.6824 18.655 23.6974 12.145C23.7094 10.5315 23.4007 8.93458 22.7837 7.44864C22.1667 5.9627 21.2599 4.61614 20.1174 3.485L20.5574 3.89Z" />
      </svg>
    </a>

    <script>
      // Códigos PIX
      const premiumPixCode = "00020126580014BR.GOV.BCB.PIX0136706b3ecb-d405-4b4a-883f-f35a167b06b35204000053039865406197.005802BR5913Adriano Silva6009SAO PAULO62140510iVBd9a1E3O6304EFF8";
      const basicPixCode = "00020126580014BR.GOV.BCB.PIX0136706b3ecb-d405-4b4a-883f-f35a167b06b3520400005303986540564.905802BR5913Adriano Silva6009SAO PAULO62140510IT96G2GNOb6304AF9B";
      
      // Valores para display
      const premiumValue = "197,00";
      const basicValue = "64,90";
      
      // Função para mostrar a página de pagamento
      function showPayment(plan) {
        const paymentPage = document.getElementById('payment-page');
        const paymentTitle = document.getElementById('payment-title');
        const paymentPlan = document.getElementById('payment-plan');
        const paymentPrice = document.getElementById('payment-price');
        const qrCode = document.getElementById('qr-code');
        const pixCodeText = document.getElementById('pix-code-text');
        const confirmPrice = document.getElementById('confirm-price');
        
        if (plan === 'premium') {
          paymentPlan.textContent = "Pacote Completo - Métodos Infalíveis";
          paymentPrice.textContent = \`R$ \${premiumValue}\`;
          confirmPrice.textContent = \`R$ \${premiumValue}\`;
          pixCodeText.textContent = premiumPixCode;
          qrCode.src = \`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=\${encodeURIComponent(premiumPixCode)}\`;
        } else {
          paymentPlan.textContent = "Pacote Básico - Métodos Infalíveis";
          paymentPrice.textContent = \`R$ \${basicValue}\`;
          confirmPrice.textContent = \`R$ \${basicValue}\`;
          pixCodeText.textContent = basicPixCode;
          qrCode.src = \`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=\${encodeURIComponent(basicPixCode)}\`;
        }
        
        paymentPage.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
      
      // Função para esconder a página de pagamento
      function hidePayment() {
        const paymentPage = document.getElementById('payment-page');
        paymentPage.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      
      // Função para copiar o código PIX
      function copyPixCode() {
        const pixCodeText = document.getElementById('pix-code-text');
        const successMessage = document.getElementById('success-message');
        
        navigator.clipboard.writeText(pixCodeText.textContent);
        
        successMessage.style.display = 'block';
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 3000);
      }
    </script>
  </body>
</html>
  `);
}
