import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MethodCard from "@/components/MethodCard";
import { methods, featuredMethod } from "@/data/methods";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WhatsappCapture from "@/components/WhatsappCapture";

// Funções de monitoramento
const incrementarVisita = () => {
  localStorage.setItem("visitas", String(Number(localStorage.getItem("visitas") || 0) + 1));
};

const incrementarClique197 = () => {
  localStorage.setItem("cliques197", String(Number(localStorage.getItem("cliques197") || 0) + 1));
};

const incrementarClique6490 = () => {
  localStorage.setItem("cliques6490", String(Number(localStorage.getItem("cliques6490") || 0) + 1));
};

const incrementarEmails = () => {
  localStorage.setItem("emails", String(Number(localStorage.getItem("emails") || 0) + 1));
};

const salvarWhatsapp = (numero: string) => {
  // Recupera a lista atual
  const whatsappList = JSON.parse(localStorage.getItem("whatsappList") || "[]");
  // Adiciona o novo número se ele já não existir
  if (!whatsappList.includes(numero)) {
    whatsappList.push(numero);
    localStorage.setItem("whatsappList", JSON.stringify(whatsappList));
  }
};

const LandingPagePro = () => {
  const [showMethods, setShowMethods] = useState(false);
  const [plano, setPlano] = useState("197");
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Registrar visita ao carregar a página
  useEffect(() => {
    incrementarVisita();
  }, []);

  const handleRevealMethods = () => {
    setShowMethods(true);
    // Scroll to methods after rendering
    setTimeout(() => {
      const methodsContainer = document.getElementById("methods-container");
      if (methodsContainer) {
        methodsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };
  
  const handlePayment = () => {
    // Registrar clique no plano
    if (plano === "197") {
      incrementarClique197();
    } else {
      incrementarClique6490();
    }
    
    // Parâmetros para página de pagamento
    const valorFormatado = plano === "197" ? "197,00" : "64,90";
    const tipoPlano = plano === "197" ? "premium" : "basico";
    
    // Código PIX para pagamento tradicional
    const pixCode =
      plano === "197"
        ? "00020126580014BR.GOV.BCB.PIX0136f5f7a868-e769-4bdb-b9ab-8d38d3c97ff952040000530398654019700.005802BR5925METODOS INFALIVES LTDA6009SAO PAULO62070503***63041DBC"
        : "00020126580014BR.GOV.BCB.PIX0136f5f7a868-e769-4bdb-b9ab-8d38d3c97ff95204000053039865406490.005802BR5925METODOS INFALIVES LTDA6009SAO PAULO62070503***63041DBC";
    
    // Redirecionando para a página de pagamento PIX
    window.location.href = `/pagamentopix?codigo=${encodeURIComponent(pixCode)}&valor=${valorFormatado}&plano=${tipoPlano}`;
  };
  
  // Função de pagamento com cartão removida - usando apenas PIX agora
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "") {
      // Registrar captura de email
      incrementarEmails();
      
      console.log("Email capturado:", email);
      setEmailSuccess(true);
      setTimeout(() => {
        setShowMethods(true);
        // Scroll to methods after rendering
        setTimeout(() => {
          const methodsContainer = document.getElementById("methods-container");
          if (methodsContainer) {
            methodsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Background pattern with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
      
      {/* WhatsApp floating button */}
      <a 
        href="https://wa.me/qr/WXWCW3JQYR4MO1" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.4725 14.715C17.1875 14.5725 15.72 13.8525 15.4575 13.7625C15.195 13.6725 14.9999 13.6275 14.8049 13.9125C14.6099 14.1975 14.04 14.87 13.8675 15.065C13.695 15.26 13.5225 15.2825 13.2375 15.14C12.9525 14.9975 11.9925 14.6725 10.8599 13.6725C9.9749 12.8975 9.3899 11.9425 9.2174 11.6575C9.0449 11.3725 9.1999 11.215 9.3449 11.0675C9.4749 10.935 9.6324 10.7175 9.7799 10.545C9.9274 10.3725 9.9724 10.2525 10.0624 10.0575C10.1524 9.8625 10.1074 9.69 10.0399 9.5475C9.9724 9.405 9.3899 7.9375 9.1499 7.3675C8.9099 6.7975 8.6699 6.89 8.4899 6.89C8.3174 6.875 8.1224 6.875 7.9274 6.875C7.7324 6.875 7.4249 6.9425 7.1624 7.2275C6.8999 7.5125 6.1349 8.2325 6.1349 9.7C6.1349 11.1675 7.1849 12.59 7.3324 12.785C7.4799 12.98 9.3749 15.92 12.2924 17.185C13.0349 17.5 13.6174 17.6925 14.0699 17.83C14.8049 18.0625 15.4724 18.0325 16.0024 17.965C16.5924 17.8825 17.8024 17.245 18.0424 16.5775C18.2824 15.91 18.2824 15.34 18.215 15.2175C18.1475 15.095 17.9525 15.0275 17.6675 14.885L17.4725 14.715ZM12.0524 21.8125H12.0374C10.2803 21.8127 8.55595 21.3775 7.0124 20.5525L6.6724 20.3575L2.9624 21.3175L3.9374 17.71L3.7199 17.3575C2.81794 15.7605 2.34665 13.9368 2.3499 12.08C2.3499 6.83 6.6199 2.5625 12.0674 2.5625C14.6774 2.5625 17.1224 3.575 18.9974 5.45C19.9222 6.36818 20.6535 7.46692 21.1492 8.68504C21.6448 9.90316 21.8952 11.215 21.8874 12.5375C21.8724 17.7875 17.6049 21.8125 12.0524 21.8125ZM20.5574 3.89C19.4323 2.75681 18.0911 1.85919 16.612 1.25152C15.1328 0.643846 13.5435 0.335755 11.9374 0.3475C5.5124 0.3475 0.2924 5.5675 0.2774 12.0775C0.2774 14.2025 0.8474 16.2575 1.9124 18.0675L0.2774 24L6.3374 22.4C8.0774 23.365 10.0324 23.875 12.0224 23.875H12.0374C18.4624 23.875 23.6824 18.655 23.6974 12.145C23.7094 10.5315 23.4007 8.93458 22.7837 7.44864C22.1667 5.9627 21.2599 4.61614 20.1174 3.485L20.5574 3.89Z" />
        </svg>
      </a>
      
      {/* Main content container */}
      <div className="relative z-10 min-h-screen w-full max-w-4xl mx-auto flex flex-col items-center p-4 md:p-10">
        {/* Header Section */}
        <div className="text-center mb-8 mt-10 md:mt-16">
          <motion.h1 
            className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            10 MÉTODOS INFALÍVEIS PRA GANHAR DINHEIRO EM CASA! 💣🔥
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg mb-6 max-w-2xl mx-auto text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Chega de promessa furada e dicas de youtuber que não paga nem o boleto! Aqui estão os métodos que a galera tá usando pra faturar pesado sem sair de casa!
          </motion.p>
        </div>
        
        {/* Email Capture Form */}
        {!emailSuccess ? (
          <motion.div
            className="w-full max-w-lg mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-center">
                🔥 Coloque seu e-mail abaixo para receber acesso!
              </h3>
              <form onSubmit={handleEmailSubmit} className="flex flex-col items-center">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg outline-none border border-gray-700 mb-4 focus:border-blue-500"
                  required
                />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 w-full md:w-auto rounded-full text-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulse"
                >
                  RECEBER ACESSO AGORA
                </Button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-lg mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-green-700 p-6 rounded-xl border border-green-600 text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-bold mb-2">E-mail Cadastrado com Sucesso!</h3>
              <p className="text-gray-200">Enviamos os métodos para seu email. Confira também sua caixa de spam.</p>
            </div>
          </motion.div>
        )}
        
        {/* Social Proof */}
        <motion.div 
          className="w-full mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
            {/* Avatars showing satisfied customers */}
            <div className="flex -space-x-2">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-dark" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" alt="Avatar de usuário" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-dark" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" alt="Avatar de usuário" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-dark" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" alt="Avatar de usuário" />
            </div>
            <span>+5.783 pessoas já estão usando esses métodos</span>
            <div className="flex items-center ml-2">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-1">4.9/5</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Button Section */}
        {!showMethods && !emailSuccess && (
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              onClick={handleRevealMethods}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 mb-2 text-xl rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse"
            >
              QUERO VER OS MÉTODOS
            </Button>
            
            <p className="text-gray-400 text-sm mt-3">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                100% seguro e confidencial
              </span>
            </p>
          </motion.div>
        )}
        
        {/* Methods Section (conditionally rendered) */}
        {showMethods && (
          <motion.div 
            id="methods-container"
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Featured Method */}
            <motion.div 
              className="mb-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400" 
                alt="Pessoa trabalhando em um laptop com gráficos de crescimento" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{featuredMethod.title}</h2>
              <p className="text-gray-300 mb-4">{featuredMethod.description}</p>
              <div className="flex items-center text-sm text-gray-400">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-2">HOT</span>
                <span>348 pessoas usando agora</span>
              </div>
            </motion.div>
            
            {/* Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {methods.map((method, index) => (
                <MethodCard 
                  key={index}
                  method={method}
                  index={index}
                />
              ))}
            </div>
            
            {/* Vagas limitadas alert */}
            <div className="bg-red-700 text-white p-4 rounded-xl text-center mt-4 mb-8 animate-pulse">
              🔥 <strong>VAGAS LIMITADAS!</strong> Apenas 5 acessos disponíveis para hoje! Não perca!
            </div>

            {/* WhatsApp Capture Form */}
            <motion.div 
              className="w-full mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <WhatsappCapture />
            </motion.div>
            
            {/* Final CTA */}
            <motion.div 
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar a faturar agora?</h2>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">Tenha acesso completo aos 10 métodos com tutoriais passo a passo, comunidade exclusiva e suporte 24/7.</p>
              
              <img 
                src="https://images.unsplash.com/photo-1534951009808-766178b47a4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400" 
                alt="Pessoa celebrando sucesso financeiro com laptop" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mt-4 mb-3">Escolha o seu plano:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* 🔥 PLANO COMPLETO — R$197 */}
                  <div 
                    className={`bg-gray-800 p-6 rounded-xl text-center mb-4 border-2 cursor-pointer transition-all ${plano === "197" ? "border-green-500" : "border-gray-700 hover:border-green-500"}`}
                    onClick={() => setPlano("197")}
                  >
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
                    <div className="mt-4 text-left">
                      <div className="text-sm text-green-400 mb-2">✓ Acesso a todos os 10 métodos</div>
                      <div className="text-sm text-green-400 mb-2">✓ Suporte exclusivo 24/7</div>
                      <div className="text-sm text-green-400 mb-2">✓ Comunidade VIP de alunos</div>
                      <div className="text-sm text-green-400 mb-2">✓ Atualizações gratuitas</div>
                    </div>
                  </div>

                  {/* 🔥 PLANO SIMPLES — R$64,90 */}
                  <div 
                    className={`bg-gray-800 p-6 rounded-xl text-center mb-4 border-2 cursor-pointer transition-all ${plano === "64.90" ? "border-blue-500" : "border-gray-700 hover:border-blue-500"}`}
                    onClick={() => setPlano("64.90")}
                  >
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
                    <div className="mt-4 text-left">
                      <div className="text-sm text-blue-400 mb-2">✓ Escolha 1 método para acessar</div>
                      <div className="text-sm text-blue-400 mb-2">✓ Suporte por 30 dias</div>
                      <div className="text-sm text-blue-400 mb-2">✓ Satisfação garantida</div>
                      <div className="text-sm text-gray-500 mb-2">✗ Sem acesso à comunidade VIP</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 w-full md:w-auto rounded-full text-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate-pulse mb-6"
                onClick={handlePayment}
              >
                QUERO TER ACESSO COM PIX
              </Button>
              
              <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                  </svg>
                  Bônus exclusivos🔥
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Garantia de 30 dias
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Testimonials */}
        <motion.div 
          className="w-full mb-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" 
                alt="Foto de perfil de Carlos M." 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">Carlos M.</h3>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">"Comecei a usar o método Dropshipping Ninja há 3 meses e já estou faturando mais de R$4.000 por mês. Melhor investimento que já fiz!"</p>
          </Card>
          
          <Card className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" 
                alt="Foto de perfil de Ana L." 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">Ana L.</h3>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">"Eu era super cética, mas decidi tentar o método de Afiliado Oculto. Agora estou ganhando R$4.500 sem precisar mostrar meu rosto. Inacreditável! pode comprar e colocar em prática. Os resultados vem muito rápido!🔥"</p>
          </Card>
        </motion.div>
        
        {/* Footer */}
        <div className="w-full text-center text-gray-500 text-xs mt-auto pt-6 border-t border-gray-800">
          <p className="mb-2">© 2023 Métodos Infalíveis. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-300">Termos de Uso</a>
            <a href="#" className="hover:text-gray-300">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-300">Contato</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPagePro;