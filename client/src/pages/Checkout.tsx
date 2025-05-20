import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [location, navigate] = useLocation();
  
  // Obter parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  const valor = params.get('valor') || '19700'; // Valor padrão = R$ 197,00
  const plano = params.get('plano') || 'premium'; // Plano padrão = premium
  
  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // Redirecionar para a página de pagamento PIX
      navigate(`/pagamentopix?valor=${valor}`);
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível processar o pagamento. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Redirecionar automaticamente para a página de pagamento PIX
  useEffect(() => {
    handleCheckout();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Processando pagamento...</h1>
        <p className="text-gray-300 mb-6 text-center">
          Você será redirecionado para a página de pagamento em instantes.
        </p>
        <div className="flex justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}