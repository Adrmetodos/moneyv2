import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import confetti from 'canvas-confetti';

export default function Sucesso() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Dispara confetti ao carregar a página
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#bb0000', '#ffffff'],
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00bb00', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-center"
      >
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-12 h-12 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h1>
        <p className="text-gray-300 mb-6">
          Seu acesso aos Métodos Infalíveis para ganhar dinheiro foi liberado com sucesso!
        </p>

        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-gray-300 mb-2">
            Em instantes você receberá um e-mail com instruções detalhadas para
            acessar todo o conteúdo exclusivo.
          </p>
          <p className="text-gray-300">
            Caso prefira, nosso suporte entrará em contato pelo WhatsApp para 
            auxiliar em qualquer dúvida.
          </p>
        </div>

        <Button 
          onClick={() => navigate("/")} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Voltar para a Página Inicial
        </Button>
      </motion.div>
    </div>
  );
}