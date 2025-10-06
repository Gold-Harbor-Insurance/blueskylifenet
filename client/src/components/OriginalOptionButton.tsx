import { motion } from "framer-motion";

interface OriginalOptionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  testId?: string;
}

export default function OriginalOptionButton({ children, onClick, testId }: OriginalOptionButtonProps) {
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
        className="w-full min-h-[60px] px-6 md:px-8 text-base md:text-lg lg:text-xl font-semibold bg-[#4306D5] hover:bg-[#3705B0] text-white rounded-xl shadow-md transition-colors duration-200"
      >
        {children}
      </button>
    </motion.div>
  );
}
