import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Method } from "@/data/methods";

interface MethodCardProps {
  method: Method;
  index: number;
}

const MethodCard = ({ method, index }: MethodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        zIndex: 10
      }}
    >
      <Card className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all duration-300 border border-gray-700 hover:border-gray-600 cursor-pointer h-full">
        <h2 className="text-xl font-bold mb-2">{method.title}</h2>
        <p className="text-sm text-gray-300">{method.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-red-600 font-semibold">{method.income}</span>
          <span className="text-xs text-gray-400">Dificuldade: {method.difficulty}</span>
        </div>
      </Card>
    </motion.div>
  );
};

export default MethodCard;
