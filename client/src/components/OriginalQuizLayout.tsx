import { motion } from "framer-motion";
import TestimonialCarousel from "./TestimonialCarousel";

interface OriginalQuizLayoutProps {
  children: React.ReactNode;
  headline: string;
  subheadline?: string;
}

export default function OriginalQuizLayout({ children, headline, subheadline }: OriginalQuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(220,25%,12%)] to-[hsl(220,30%,8%)] flex flex-col">
      <TestimonialCarousel />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-10 lg:mb-12"
          >
            <div className="inline-block mb-3 md:mb-4 px-4 md:px-6 py-1.5 md:py-2 bg-[hsl(45,85%,50%)] text-[hsl(220,30%,8%)] rounded-full text-xs md:text-sm font-semibold">
              {headline}
            </div>
            {subheadline && (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[hsl(210,10%,98%)] px-2">
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
