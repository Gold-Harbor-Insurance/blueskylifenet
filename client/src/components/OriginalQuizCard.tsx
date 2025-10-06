import { motion, AnimatePresence } from "framer-motion";

interface OriginalQuizCardProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  questionNumber?: number;
}

export default function OriginalQuizCard({ children, currentStep, totalSteps, questionNumber }: OriginalQuizCardProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-8 md:p-12 bg-[hsl(220,20%,18%)] border border-[hsl(220,15%,25%)] shadow-lg rounded-2xl">
        <div className="mb-6">
          <div className="h-2 bg-[hsl(220,15%,25%)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[hsl(45,85%,50%)] to-[hsl(35,90%,55%)]"
            />
          </div>
          {questionNumber && (
            <p className="text-sm text-[hsl(210,8%,70%)] text-center mt-2">
              Question {questionNumber}/{totalSteps}
            </p>
          )}
        </div>
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
