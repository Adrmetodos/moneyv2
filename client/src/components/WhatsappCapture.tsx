import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WhatsappCaptureProps {
  onSubmit?: (numero: string) => void;
}

const WhatsappCapture = ({ onSubmit }: WhatsappCaptureProps) => {
  const [whatsapp, setWhatsapp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (whatsapp !== "") {
      // Salva no localStorage
      const whatsappList = JSON.parse(localStorage.getItem("whatsappList") || "[]");
      if (!whatsappList.includes(whatsapp)) {
        whatsappList.push(whatsapp);
        localStorage.setItem("whatsappList", JSON.stringify(whatsappList));
      }
      
      // Executa callback se houver
      if (onSubmit) onSubmit(whatsapp);
      
      // Mostra confirmação
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setWhatsapp("");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4">
      <h3 className="text-lg font-bold mb-3">📱 Receber Mais Informações via WhatsApp</h3>
      
      {success ? (
        <div className="bg-green-600 text-white p-3 rounded-lg mb-3 text-center">
          ✅ Número cadastrado com sucesso! Entraremos em contato.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center">
            <span className="bg-gray-700 py-2 px-3 rounded-l-lg text-gray-300">+55</span>
            <input
              type="tel"
              placeholder="Seu WhatsApp (DDD+número)"
              pattern="[0-9]{10,11}"
              title="Digite seu número com DDD, apenas números"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="flex-1 bg-gray-700 p-2 outline-none rounded-r-lg text-white"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full"
          >
            Receber Informações no WhatsApp
          </Button>
          <p className="text-xs text-gray-400 text-center">
            Seu número não será compartilhado com terceiros.
          </p>
        </form>
      )}
    </div>
  );
};

export default WhatsappCapture;