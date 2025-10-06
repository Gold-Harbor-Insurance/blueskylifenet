import { motion, AnimatePresence } from "framer-motion";

interface OriginalQuizCardProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  questionNumber?: number;
}

export default function OriginalQuizCard({ children, currentStep, totalSteps, questionNumber }: OriginalQuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-8 md:p-12 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-gray-200 shadow-lg rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
