import '../styles/globals.css';
import { useState } from "react";
import { motion } from "framer-motion";

const LandingPagePro = () => {
  const [showMethods, setShowMethods] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-10">
      <motion.h1 
        className="text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        10 MÉTODOS INFALÍVEIS PRA GANHAR DINHEIRO EM CASA! 💣🔥
      </motion.h1>

      <p className="text-lg mb-6 text-center max-w-2xl">
        Chega de promessa furada e dica de youtuber que não paga nem o boleto! Aqui estão os métodos que a galera tá usando pra faturar pesado sem sair de casa!
      </p>

      <button 
        onClick={() => setShowMethods(true)}
        className="bg-red-600 text-white px-8 py-4 mb-8 hover:bg-red-700 text-xl rounded-full animate-pulse"
      >
        QUERO DESCOBRIR AGORA!
      </button>

      {showMethods && (
        <motion.div 
          className="grid grid-cols-1 gap-4 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[
            "Dropshipping Ninja",
            "Afiliado Oculto",
            "Apostas Seguras",
            "Criptomoedas Relâmpago",
            "Venda de Infoprodutos Secretos",
            "Método Dark de SEO",
            "Serviços Ocultos no Fiverr",
            "Tráfego Arbitrário",
            "Grupo VIP de Sinais",
            "Manipulação de Engajamento"
          ].map((method, index) => (
            <div key={index} className="bg-gray-800 text-white p-6 rounded-xl hover:bg-gray-700 transition-all">
              <h2 className="text-2xl font-bold mb-2">{method}</h2>
              <p className="text-sm">Descubra como faturar pesado usando esse método sem ninguém nem perceber.</p>
            </div>
          ))}

          <div className="bg-red-700 text-white p-4 rounded-xl text-center mt-8">
            🔥 <strong>VAGAS LIMITADAS!</strong> Apenas 5 acessos disponíveis para hoje! Não perca!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPagePro;
