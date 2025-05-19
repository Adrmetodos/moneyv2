import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

// Inicializa o stripe fora do componente para evitar re-render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ valor }: { valor: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o Stripe corretamente.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/sucesso",
      },
    });

    if (error) {
      toast({
        title: "Erro no Pagamento",
        description: error.message || "Ocorreu um erro ao processar o pagamento.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Pagamento Processado",
        description: "Redirecionando para a página de sucesso...",
      });
      // O redirecionamento será feito pelo return_url acima
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <PaymentElement />
      
      <Button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 font-bold"
      >
        {loading ? "Processando..." : `Pagar R$ ${valor.toFixed(2)}`}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [plano, setPlano] = useState<"premium" | "basico">("basico");
  const [valor, setValor] = useState(64.90);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Pegar o plano e valor da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planoParam = params.get("plano");
    if (planoParam === "premium") {
      setPlano("premium");
      setValor(197);
    } else {
      setPlano("basico");
      setValor(64.90);
    }
  }, []);

  // Criar a intenção de pagamento
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        // Identifica se o código está rodando na Vercel
        const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
        
        // Se estiver na Vercel e usar API serverless, ajuste o caminho da API
        let apiPath = "/api/create-payment-intent";
        
        console.log("Enviando requisição para:", apiPath);
        
        const response = await apiRequest(
          "POST", 
          apiPath, 
          { amount: valor, plano }
        );
        
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          console.log("Recebido clientSecret com sucesso");
        } else {
          console.error("Resposta sem clientSecret:", data);
          toast({
            title: "Erro",
            description: "Não foi possível iniciar o processo de pagamento.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Erro ao criar payment intent:", error);
        toast({
          title: "Erro",
          description: "Falha na comunicação com o servidor de pagamentos. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    };

    if (valor > 0) {
      createPaymentIntent();
    }
  }, [valor, plano, toast]);

  const handleVoltar = () => {
    navigate("/");
  };

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl">Preparando seu pagamento...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
      >
        <button 
          onClick={handleVoltar} 
          className="text-gray-400 hover:text-white mb-4 flex items-center"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-bold mb-2">Finalizar Compra</h1>
        <h2 className="text-lg text-gray-300 mb-6">
          {plano === "premium" 
            ? "Métodos Infalíveis - Plano Premium" 
            : "Métodos Infalíveis - Plano Básico"}
        </h2>

        <div className="mb-6 bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total:</span>
            <span className="text-xl font-bold">R$ {valor.toFixed(2)}</span>
          </div>
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret, locale: "pt-BR" }}>
          <CheckoutForm valor={valor} />
        </Elements>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Pagamento processado com segurança via Stripe
        </p>
      </motion.div>
    </div>
  );
}