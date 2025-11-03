import { motion } from "framer-motion";

interface QuizLayoutProps {
  children: React.ReactNode;
  headline?: string;
  subheadline?: string;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}
