import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

// Função para registrar cópias do código PIX
const incrementarCopias = () => {
  localStorage.setItem("copias", String(Number(localStorage.getItem("copias") || 0) + 1));
};

const PagamentoPix = () => {
  const [location, navigate] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  // Detecta parâmetros da URL
  const valorParam = searchParams.get('valor');
  const planoParam = searchParams.get('plano') || 'premium';
  
  // Determinando o valor numérico
  const [valorNumerico, setValorNumerico] = useState(() => {
    if (valorParam) {
      return parseFloat(valorParam.replace(',', '.'));
    }
    return planoParam === 'premium' ? 197 : 64.90;
  });
  
  // Valor para exibição
  const [valorExibicao, setValorExibicao] = useState(valorParam || (planoParam === 'premium' ? "197,00" : "64,90"));
  
  // Código PIX com o valor correto para o plano premium (R$197,00)
  const premiumPixCode = "00020126580014BR.GOV.BCB.PIX0136706b3ecb-d405-4b4a-883f-f35a167b06b35204000053039865406197.005802BR5913Adriano Silva6009SAO PAULO62140510wkD2OabgKx63048F31";
  
  // Código PIX com o valor correto para o plano básico (R$64,90)
  const basicPixCode = "00020126580014BR.GOV.BCB.PIX0136706b3ecb-d405-4b4a-883f-f35a167b06b35204000053039865406064.905802BR5913Adriano Silva6009SAO PAULO62140510wkD2OabgKx63048F31";
  
  // Seleciona o código PIX com base no plano
  const [pixCode, setPixCode] = useState(planoParam === 'premium' ? premiumPixCode : basicPixCode);
  
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCode);
    incrementarCopias(); // Incrementa contador de cópias
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4 md:p-10">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        PAGAMENTO COM PIX 🔥💣
      </motion.h1>

      <p className="text-lg mb-6 text-center max-w-2xl">
        Escaneie o QR Code abaixo ou copie o código PIX para realizar o pagamento!
      </p>

      <motion.div
        className="bg-gray-800 p-6 rounded-xl mb-8 flex flex-col items-center w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-green-800 text-white px-4 py-2 rounded-lg mb-4 font-bold">
          Valor a pagar: R${valorExibicao}
        </div>

        <div className="p-5 bg-white rounded-lg mb-6">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`}
            alt="QR Code Pix"
            className="rounded-lg"
          />
        </div>

        <div className="text-sm bg-gray-900 p-4 rounded-md w-full mb-4 overflow-hidden">
          <p className="text-center text-gray-300 mb-1">Código PIX Copia e Cola:</p>
          <p className="select-all text-center text-white font-medium break-all">{pixCode}</p>
        </div>

        <Button 
          onClick={copyToClipboard}
          className={`${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 w-full`}
        >
          {copied ? '✅ Código copiado!' : 'Copiar código PIX'}
        </Button>
      </motion.div>

      <div className="bg-gray-800 p-4 rounded-xl mb-8 max-w-xl w-full">
        <h2 className="text-xl font-bold mb-2">Instruções:</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
          <li>Abra o aplicativo do seu banco</li>
          <li>Acesse a opção de pagamento via PIX</li>
          <li>Escolha a opção "PIX Copia e Cola"</li>
          <li>Cole o código copiado acima</li>
          <li>Confirme que o valor <strong className="text-green-500">R${valorExibicao}</strong> aparece no app do banco</li>
          <li>Após o pagamento, você receberá o acesso em até 5 minutos</li>
        </ol>
      </div>

      <div className="bg-red-700 text-white p-4 rounded-xl text-center mt-4 mb-8 max-w-xl w-full animate-pulse">
        🔥 <strong>ATENÇÃO!</strong> Oferta válida apenas nas próximas 24 horas!
      </div>

      {/* WhatsApp floating button */}
      <a 
        href="https://wa.me/qr/WXWCW3JQYR4MO1" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.4725 14.715C17.1875 14.5725 15.72 13.8525 15.4575 13.7625C15.195 13.6725 14.9999 13.6275 14.8049 13.9125C14.6099 14.1975 14.04 14.87 13.8675 15.065C13.695 15.26 13.5225 15.2825 13.2375 15.14C12.9525 14.9975 11.9925 14.6725 10.8599 13.6725C9.9749 12.8975 9.3899 11.9425 9.2174 11.6575C9.0449 11.3725 9.1999 11.215 9.3449 11.0675C9.4749 10.935 9.6324 10.7175 9.7799 10.545C9.9274 10.3725 9.9724 10.2525 10.0624 10.0575C10.1524 9.8625 10.1074 9.69 10.0399 9.5475C9.9724 9.405 9.3899 7.9375 9.1499 7.3675C8.9099 6.7975 8.6699 6.89 8.4899 6.89C8.3174 6.875 8.1224 6.875 7.9274 6.875C7.7324 6.875 7.4249 6.9425 7.1624 7.2275C6.8999 7.5125 6.1349 8.2325 6.1349 9.7C6.1349 11.1675 7.1849 12.59 7.3324 12.785C7.4799 12.98 9.3749 15.92 12.2924 17.185C13.0349 17.5 13.6174 17.6925 14.0699 17.83C14.8049 18.0625 15.4724 18.0325 16.0024 17.965C16.5924 17.8825 17.8024 17.245 18.0424 16.5775C18.2824 15.91 18.2824 15.34 18.215 15.2175C18.1475 15.095 17.9525 15.0275 17.6675 14.885L17.4725 14.715ZM12.0524 21.8125H12.0374C10.2803 21.8127 8.55595 21.3775 7.0124 20.5525L6.6724 20.3575L2.9624 21.3175L3.9374 17.71L3.7199 17.3575C2.81794 15.7605 2.34665 13.9368 2.3499 12.08C2.3499 6.83 6.6199 2.5625 12.0674 2.5625C14.6774 2.5625 17.1224 3.575 18.9974 5.45C19.9222 6.36818 20.6535 7.46692 21.1492 8.68504C21.6448 9.90316 21.8952 11.215 21.8874 12.5375C21.8724 17.7875 17.6049 21.8125 12.0524 21.8125ZM20.5574 3.89C19.4323 2.75681 18.0911 1.85919 16.612 1.25152C15.1328 0.643846 13.5435 0.335755 11.9374 0.3475C5.5124 0.3475 0.2924 5.5675 0.2774 12.0775C0.2774 14.2025 0.8474 16.2575 1.9124 18.0675L0.2774 24L6.3374 22.4C8.0774 23.365 10.0324 23.875 12.0224 23.875H12.0374C18.4624 23.875 23.6824 18.655 23.6974 12.145C23.7094 10.5315 23.4007 8.93458 22.7837 7.44864C22.1667 5.9627 21.2599 4.61614 20.1174 3.485L20.5574 3.89Z" />
        </svg>
      </a>

      <div className="w-full text-center text-gray-500 text-xs mt-auto pt-6 border-t border-gray-800">
        <p className="mb-2">© 2023 Métodos Infalíveis. Todos os direitos reservados.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-300">Termos de Uso</a>
          <a href="#" className="hover:text-gray-300">Política de Privacidade</a>
          <a href="#" className="hover:text-gray-300">Contato</a>
        </div>
      </div>
    </div>
  );
};

export default PagamentoPix;
