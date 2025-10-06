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
        className="w-full min-h-[60px] px-8 text-lg md:text-xl font-semibold bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition-colors duration-200"
      >
        {children}
      </button>
    </motion.div>
  );
}
