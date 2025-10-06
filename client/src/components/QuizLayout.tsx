import { motion } from "framer-motion";
import TestimonialCarousel from "./TestimonialCarousel";

interface QuizLayoutProps {
  children: React.ReactNode;
  headline: string;
  subheadline?: string;
}

export default function QuizLayout({ children, headline, subheadline }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--gradient-navy-start))] to-[hsl(var(--gradient-navy-end))] flex flex-col">
      <TestimonialCarousel />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full bg-gold text-gold-foreground font-semibold text-sm md:text-base">
            {headline}
          </div>
          {subheadline && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4">
              {subheadline}
            </h1>
          )}
        </motion.div>
        {children}
        </div>
      </div>
    </div>
  );
}
