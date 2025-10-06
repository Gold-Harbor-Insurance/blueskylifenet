import { motion } from "framer-motion";
import TestimonialCarousel from "./TestimonialCarousel";

interface QuizLayoutProps {
  children: React.ReactNode;
  headline: string;
  subheadline?: string;
}

export default function QuizLayout({ children, headline, subheadline }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="w-full h-[25px] bg-[#63b1f9]"></div>
      <TestimonialCarousel />
      <div className="flex-1 flex flex-col items-center justify-start py-3 px-4">
        <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          {subheadline && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
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
