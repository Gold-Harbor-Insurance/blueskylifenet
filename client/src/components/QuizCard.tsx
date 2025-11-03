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
      className="w-full"
    >
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm text-gray-600 font-medium">
            Question {currentStep}/{totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#5CB85C]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question content */}
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
    </motion.div>
  );
}
