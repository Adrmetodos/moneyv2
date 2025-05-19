import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Cancelado() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-center"
      >
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Pagamento Cancelado</h1>
        <p className="text-gray-300 mb-6">
          Seu pagamento não foi concluído e nenhuma cobrança foi realizada.
        </p>

        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-gray-300 mb-2">
            Você pode tentar novamente a qualquer momento ou escolher outro método de pagamento.
          </p>
          <p className="text-gray-300">
            Se precisar de ajuda, entre em contato com nosso suporte pelo WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button 
            onClick={() => navigate("/")} 
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Voltar para a Página Inicial
          </Button>
          
          <Button 
            onClick={() => navigate("/pagamento")} 
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Tentar Novamente
          </Button>
        </div>
      </motion.div>
    </div>
  );
}