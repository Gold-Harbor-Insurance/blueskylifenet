import { motion } from "framer-motion";
import TestimonialCarousel from "./TestimonialCarousel";

interface OriginalQuizLayoutProps {
  children: React.ReactNode;
  headline: string;
  subheadline?: string;
}

export default function OriginalQuizLayout({ children, headline, subheadline }: OriginalQuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TestimonialCarousel />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            {subheadline && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-red-600">{headline}</span>{" "}
                <span className="text-black">{subheadline}</span>
              </h1>
            )}
          </motion.div>
          {children}
        </div>
      </div>
    </div>
  );
}
