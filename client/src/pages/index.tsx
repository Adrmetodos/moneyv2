// 🔥 LANDING PAGE COMPLETA 🔥
const [erro, setErro] = useState("");

import '../styles/globals.css';
import { useState } from 'react';
<<<<<<< HEAD
import { motion } from 'framer-motion'
=======
import { motion } from 'framer-motion';
>>>>>>> 77e8a522ef328d11a8482dcbf5b44b8164ce88e8
import Head from 'next/head';

const LandingPagePro = () => {
  const [showMethods, setShowMethods] = useState(false);
  const [plano, setPlano] = useState('197');

  const handlePayment = () => {
    const pixCode = plano === '197' 
      ? '00020126360014BR.GOV.BCB.PIX0115a92808641@gmail.com5204000053039865404197.005802BR5920Adriano Silva6009SAO PAULO61080540900062070503***6304ABCD'
      : '00020126360014BR.GOV.BCB.PIX0115a92808641@gmail.com520400005303986540464.905802BR5920Adriano Silva6009SAO PAULO61080540900062070503***6304ABCD';
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`, '_blank');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-10'>
      <Head>
        <title>Ganhe Dinheiro Online - 10 Métodos Infalíveis</title>
        <meta name='description' content='Descubra os métodos que fazem dinheiro cair na conta todos os dias! 10 formas de ganhar dinheiro em casa de forma rápida e prática.' />
        <meta name='keywords' content='ganhar dinheiro, renda extra, marketing digital, trabalhar em casa, métodos de ganhar dinheiro' />
        <meta name='robots' content='index, follow' />
      </Head>

      <motion.h1
        className='text-5xl font-bold mb-4 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        10 MÉTODOS INFALÍVEIS PRA GANHAR DINHEIRO EM CASA! 💣🔥
      </motion.h1>

      <p className='text-lg mb-6 text-center max-w-2xl'>
        Chega de promessa furada e dica de youtuber que não paga nem o boleto! Aqui estão os métodos que a galera tá usando pra faturar pesado sem sair de casa!
      </p>

      <button
        onClick={() => setShowMethods(true)}
        className='bg-red-600 text-white px-8 py-4 mb-8 hover:bg-red-700 text-xl rounded-full animate-pulse'
      >
        QUERO DESCOBRIR AGORA!
      </button>

      {showMethods && (
        <motion.div
          className='grid grid-cols-1 gap-4 w-full max-w-4xl'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {["Dropshipping Ninja", "Afiliado Oculto", "Apostas Seguras", "Criptomoedas Relâmpago", "Venda de Infoprodutos Secretos", "Método Dark de SEO", "Serviços Ocultos no Fiverr", "Tráfego Arbitrário", "Grupo VIP de Sinais", "Manipulação de Engajamento"].map((method, index) => (
            <div key={index} className='bg-gray-800 text-white p-6 rounded-xl hover:bg-gray-700 transition-all'>
              <h2 className='text-2xl font-bold mb-2'>{method}</h2>
              <p className='text-sm'>Descubra como faturar pesado usando esse método sem ninguém nem perceber.</p>
            </div>
          ))}

          <h2 className='text-2xl font-bold mt-10'>Escolha o seu plano:</h2>
<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* 🔥 PLANO COMPLETO — R$197 */}
            <div className="bg-gray-800 p-6 rounded-xl text-center mb-4 border-2 border-green-500">
              <div className="text-5xl font-extrabold text-green-400 mb-2 animate-pulse">
                Por apenas R$197
              </div>
              <div className="text-xl text-gray-400">
                Ou <span className="text-green-300 font-bold">12x de R$19,70</span> sem juros
              </div>
              <div className="mt-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  🔥 Oferta Limitada!
                </span>
              </div>
              <button
                onClick={() => handlePayment('197')}
                className="bg-green-600 text-white px-8 py-4 mt-4 hover:bg-green-700 text-xl rounded-full animate-pulse"
              >
                COMPRAR AGORA
              </button>
            </div>

            {/* 🔥 PLANO SIMPLES — R$64,90 */}
            <div className="bg-gray-800 p-6 rounded-xl text-center mb-4 border-2 border-blue-500">
              <div className="text-5xl font-extrabold text-blue-400 mb-2 animate-pulse">
                Por apenas R$64,90
              </div>
              <div className="text-xl text-gray-400">
                Ou <span className="text-blue-300 font-bold">3x de R$21,63</span> sem juros
              </div>
              <div className="mt-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  🔥 Acesso Imediato!
                </span>
              </div>
              <button
                onClick={() => handlePayment('64.90')}
                className="bg-blue-600 text-white px-8 py-4 mt-4 hover:bg-blue-700 text-xl rounded-full animate-pulse"
              >
                COMPRAR AGORA
              </button>
            </div>
          </div>
=======
          <select onChange={(e) => setPlano(e.target.value)} className='bg-gray-800 text-white p-4 rounded-lg mb-6 mt-4'>
            <option value='197'>R$ 197,00 - Todos os métodos</option>
            <option value='64.90'>R$ 64,90 - Apenas 1 método</option>
          </select>

          <button
            onClick={handlePayment}
            className='bg-green-600 text-white px-8 py-4 hover:bg-green-700 text-xl rounded-full animate-pulse'
          >
            PAGAR AGORA
          </button>
>>>>>>> 77e8a522ef328d11a8482dcbf5b44b8164ce88e8

          <a
            href='https://wa.me/+556293555185?text=Tenho%20dúvidas%20sobre%20o%20pagamento.'
            target='_blank'
            className='bg-green-700 text-white px-8 py-4 mt-6 hover:bg-green-800 text-xl rounded-full animate-pulse'
          >
            FALAR NO WHATSAPP
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPagePro;

<<<<<<< HEAD

=======
// 🔥 FIM DO CÓDIGO COMPLETO
>>>>>>> 77e8a522ef328d11a8482dcbf5b44b8164ce88e8
