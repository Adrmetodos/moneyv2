import { useState } from "react";
import { motion } from "framer-motion";

const CapturaEmail = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email !== "") {
      console.log("Email capturado:", email);
      setSuccess(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-10">
      <motion.h1 
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        QUER DESCOBRIR OS 10 MÉTODOS INFALÍVEIS? 💣🔥
      </motion.h1>

      <p className="text-lg mb-6 text-center max-w-2xl">
        Deixa seu e-mail aqui e receba os métodos exclusivos para ganhar dinheiro na internet!
      </p>

      {success ? (
        <div className="bg-green-700 text-white p-4 rounded-xl text-center">
          ✅ E-mail capturado com sucesso! Aguarde novidades.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg w-80 outline-none"
            required
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-8 py-4 mt-4 hover:bg-blue-700 text-xl rounded-full animate-pulse"
          >
            RECEBER AGORA
          </button>
        </form>
      )}
    </div>
  );
};

export default CapturaEmail;
