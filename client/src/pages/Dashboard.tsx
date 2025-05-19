import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [visitas, setVisitas] = useState(0);
  const [cliques197, setCliques197] = useState(0);
  const [cliques6490, setCliques6490] = useState(0);
  const [copias, setCopias] = useState(0);
  const [emails, setEmails] = useState(0);
  const [whatsappList, setWhatsappList] = useState<string[]>([]);

  useEffect(() => {
    // Carrega os dados do localStorage
    setVisitas(Number(localStorage.getItem("visitas") || 0));
    setCliques197(Number(localStorage.getItem("cliques197") || 0));
    setCliques6490(Number(localStorage.getItem("cliques6490") || 0));
    setEmails(Number(localStorage.getItem("emails") || 0));
    setCopias(Number(localStorage.getItem("copias") || 0));
    setWhatsappList(JSON.parse(localStorage.getItem("whatsappList") || "[]"));
    
    // Atualiza os valores a cada segundo para manter sincronizado
    const interval = setInterval(() => {
      setVisitas(Number(localStorage.getItem("visitas") || 0));
      setCliques197(Number(localStorage.getItem("cliques197") || 0));
      setCliques6490(Number(localStorage.getItem("cliques6490") || 0));
      setEmails(Number(localStorage.getItem("emails") || 0));
      setCopias(Number(localStorage.getItem("copias") || 0));
      setWhatsappList(JSON.parse(localStorage.getItem("whatsappList") || "[]"));
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

      {/* Lista de números WhatsApp */}
      {whatsappList.length > 0 && (
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">📱 Leads de WhatsApp Capturados ({whatsappList.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whatsappList.map((number, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
                <span className="font-mono">{number}</span>
                <a
                  href={`https://wa.me/55${number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4725 14.715C17.1875 14.5725 15.72 13.8525 15.4575 13.7625C15.195 13.6725 14.9999 13.6275 14.8049 13.9125C14.6099 14.1975 14.04 14.87 13.8675 15.065C13.695 15.26 13.5225 15.2825 13.2375 15.14C12.9525 14.9975 11.9925 14.6725 10.8599 13.6725C9.9749 12.8975 9.3899 11.9425 9.2174 11.6575C9.0449 11.3725 9.1999 11.215 9.3449 11.0675C9.4749 10.935 9.6324 10.7175 9.7799 10.545C9.9274 10.3725 9.9724 10.2525 10.0624 10.0575C10.1524 9.8625 10.1074 9.69 10.0399 9.5475C9.9724 9.405 9.3899 7.9375 9.1499 7.3675C8.9099 6.7975 8.6699 6.89 8.4899 6.89C8.3174 6.875 8.1224 6.875 7.9274 6.875C7.7324 6.875 7.4249 6.9425 7.1624 7.2275C6.8999 7.5125 6.1349 8.2325 6.1349 9.7C6.1349 11.1675 7.1849 12.59 7.3324 12.785C7.4799 12.98 9.3749 15.92 12.2924 17.185C13.0349 17.5 13.6174 17.6925 14.0699 17.83C14.8049 18.0625 15.4724 18.0325 16.0024 17.965C16.5924 17.8825 17.8024 17.245 18.0424 16.5775C18.2824 15.91 18.2824 15.34 18.215 15.2175C18.1475 15.095 17.9525 15.0275 17.6675 14.885L17.4725 14.715Z" />
                  </svg>
                  Chamar
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Estatísticas em tempo real do seu site de métodos infalíveis
        </p>
      </div>
    </div>
  );
};

export default Dashboard;