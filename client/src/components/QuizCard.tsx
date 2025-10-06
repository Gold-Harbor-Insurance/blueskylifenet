import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

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
      <Card className="p-6 md:p-10 backdrop-blur-md bg-card/95 border-card-border shadow-2xl rounded-2xl">
        <div className="mb-6">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[hsl(var(--gradient-gold-start))] to-[hsl(var(--gradient-gold-end))]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {questionNumber && (
            <p className="text-sm text-muted-foreground text-center mt-2">
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
      </Card>
    </motion.div>
  );
}
