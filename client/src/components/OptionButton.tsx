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
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onClick}
        data-testid={testId}
        className="w-full min-h-[60px] text-lg md:text-xl font-medium border-2 flex items-center justify-center gap-3 rounded-xl"
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{children}</span>
      </Button>
    </motion.div>
  );
}
