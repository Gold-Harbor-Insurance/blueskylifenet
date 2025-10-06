import { motion, AnimatePresence } from "framer-motion";

interface QuizCardProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  questionNumber?: number;
}

export default function QuizCard({ children, currentStep, totalSteps, questionNumber }: QuizCardProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 md:p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-gray-200 shadow-lg rounded-2xl">
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
