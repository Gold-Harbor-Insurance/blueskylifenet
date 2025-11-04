import { motion, AnimatePresence } from "framer-motion";

interface QuizCardProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  questionNumber?: number;
}

export default function QuizCard({ children, currentStep, totalSteps, questionNumber }: QuizCardProps) {
  // Custom percentage mapping for progress display
  const getProgressPercentage = (step: number, total: number): number => {
    // Contact info step shows 100% (step 8 for Seniors, step 9 for Veterans, step 10 for FirstResponders)
    if ((step === 8 && total === 10) || (step === 9 && total === 13) || (step === 10 && total === 13)) {
      return 100;
    }
    
    // Base percentages for steps 2-6
    const basePercentages: { [key: number]: number } = {
      2: 20,
      3: 40,
      4: 50,
      5: 70,
      6: 80,
    };
    
    if (basePercentages[step] !== undefined) {
      return basePercentages[step];
    }
    
    // For steps 7+, calculate remaining progress
    if (step === 7) return 90;
    if (step === 8) return 90;
    if (step >= 9) return 95;
    
    // Fallback (shouldn't happen for steps 2-9)
    return (step / total) * 100;
  };

  const progress = getProgressPercentage(currentStep, totalSteps);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Progress indicator - hidden at 100% */}
      {progress < 100 && (
        <div className="mb-8">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm text-gray-600 font-medium">
              {progress}%
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
      )}

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
