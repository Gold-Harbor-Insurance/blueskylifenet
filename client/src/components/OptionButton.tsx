import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface OptionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  testId?: string;
}

export default function OptionButton({ children, onClick, icon, testId }: OptionButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        onClick={onClick}
        data-testid={testId}
        className="w-full min-h-[60px] px-8 text-lg md:text-xl font-semibold bg-[#4306D5] hover:bg-[#3705B0] text-white rounded-full shadow-md transition-colors duration-200"
      >
        {children}
      </button>
    </motion.div>
  );
}
