// 🔥 LANDING PAGE PRINCIPAL COM CAPTURA DE E-MAIL INTEGRADA 🔥

import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [plano, setPlano] = useState('197');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== '') {
      console.log('Email capturado:', email);
      setSuccess(true);
      setEmail('');
    }
  };

  const handlePayment = () => {
    const pixCode = plano === '197' 
      ? '00020126360014BR.GOV.BCB.PIX0115a92808641@gmail.com5204000053039865404197.005802BR5920Adriano Silva6009SAO PAULO61080540900062070503***6304ABCD'
      : '00020126360014BR.GOV.BCB.PIX0115a92808641@gmail.com520400005303986540464.905802BR5920Adriano Silva6009SAO PAULO61080540900062070503***6304ABCD';
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`, '_blank');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-10'>
      <Head>
        <title>Ganhe Dinheiro Online - Captura e Pagamento</title>
        <meta name='description' content='Descubra os métodos infalíveis para ganhar dinheiro online! Cadastre seu e-mail e tenha acesso exclusivo.' />
        <meta name='keywords' content='ganhar dinheiro, renda extra, marketing digital, trabalhar em casa, métodos de ganhar dinheiro' />
        <meta name='robots' content='index, follow' />
      </Head>

      <motion.h1 className='text-4xl font-bold mb-4 text-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        10 MÉTODOS INFALÍVEIS PRA GANHAR DINHEIRO EM CASA! 💣🔥
      </motion.h1>

      <p className='text-lg mb-6 text-center max-w-2xl'>
        Coloque seu e-mail abaixo para receber os segredos exclusivos!
      </p>

      {success ? (
        <div className='bg-green-700 text-white p-4 rounded-xl text-center'>
          ✅ E-mail capturado com sucesso! Aguarde novidades.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
          <input
            type='email'
            placeholder='Seu melhor e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-800 text-white px-6 py-3 rounded-lg w-80 outline-none'
            required
          />
          <button
            type='submit'
            className='bg-blue-600 text-white px-8 py-4 mt-4 hover:bg-blue-700 text-xl rounded-full animate-pulse'
          >
            RECEBER AGORA
          </button>
        </form>
      )}

      <h2 className='text-2xl font-bold mt-10'>Escolha o seu plano:</h2>
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

      <a
        href='https://wa.me/+556293555185?text=Tenho%20dúvidas%20sobre%20o%20pagamento.'
        target='_blank'
        className='bg-green-700 text-white px-8 py-4 mt-6 hover:bg-green-800 text-xl rounded-full animate-pulse'
      >
        FALAR NO WHATSAPP
      </a>
    </div>
  );
};

export default LandingPage;
