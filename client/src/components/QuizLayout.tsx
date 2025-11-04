import { motion } from "framer-motion";

interface QuizLayoutProps {
  children: React.ReactNode;
  headline?: string;
  subheadline?: string;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center px-4 pt-16 md:pt-24">
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}
