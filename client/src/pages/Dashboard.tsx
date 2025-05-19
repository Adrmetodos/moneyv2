import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const Dashboard = () => {
  const [visitas, setVisitas] = useState(0);
  const [cliques197, setCliques197] = useState(0);
  const [cliques6490, setCliques6490] = useState(0);
  const [copias, setCopias] = useState(0);
  const [emails, setEmails] = useState(0);

  useEffect(() => {
    // Carrega os dados do localStorage
    setVisitas(Number(localStorage.getItem("visitas") || 0));
    setCliques197(Number(localStorage.getItem("cliques197") || 0));
    setCliques6490(Number(localStorage.getItem("cliques6490") || 0));
    setEmails(Number(localStorage.getItem("emails") || 0));
    setCopias(Number(localStorage.getItem("copias") || 0));
    
    // Atualiza os valores a cada segundo para manter sincronizado
    const interval = setInterval(() => {
      setVisitas(Number(localStorage.getItem("visitas") || 0));
      setCliques197(Number(localStorage.getItem("cliques197") || 0));
      setCliques6490(Number(localStorage.getItem("cliques6490") || 0));
      setEmails(Number(localStorage.getItem("emails") || 0));
      setCopias(Number(localStorage.getItem("copias") || 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4 md:p-10'>
      <motion.h1 
        className='text-3xl md:text-4xl font-bold mb-8 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🔥 Dashboard de Monitoramento 🔥
      </motion.h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto'>
        <motion.div 
          className='bg-gray-800 p-6 rounded-xl border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className='text-xl md:text-2xl font-bold mb-2'>👥 Visitantes:</h2>
          <p className='text-3xl md:text-4xl text-blue-400'>{visitas}</p>
        </motion.div>

        <motion.div 
          className='bg-gray-800 p-6 rounded-xl border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className='text-xl md:text-2xl font-bold mb-2'>✉️ E-mails Capturados:</h2>
          <p className='text-3xl md:text-4xl text-green-400'>{emails}</p>
        </motion.div>

        <motion.div 
          className='bg-gray-800 p-6 rounded-xl border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className='text-xl md:text-2xl font-bold mb-2'>💰 Cliques no Plano R$197:</h2>
          <p className='text-3xl md:text-4xl text-green-400'>{cliques197}</p>
        </motion.div>

        <motion.div 
          className='bg-gray-800 p-6 rounded-xl border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className='text-xl md:text-2xl font-bold mb-2'>💸 Cliques no Plano R$64,90:</h2>
          <p className='text-3xl md:text-4xl text-blue-400'>{cliques6490}</p>
        </motion.div>

        <motion.div 
          className='bg-gray-800 p-6 rounded-xl border border-gray-700 md:col-span-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className='text-xl md:text-2xl font-bold mb-2'>🔗 Códigos PIX Copiados:</h2>
          <p className='text-3xl md:text-4xl text-yellow-400'>{copias}</p>
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Estatísticas em tempo real do seu site de métodos infalíveis
        </p>
      </div>
    </div>
  );
};

export default Dashboard;