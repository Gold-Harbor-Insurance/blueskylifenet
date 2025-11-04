import { motion } from "framer-motion";
import logoImage from "@assets/BlueSky Life Landscape transparent bg_1762273618192.png";

interface QuizLayoutProps {
  children: React.ReactNode;
  headline?: string;
  subheadline?: string;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
      {/* BlueSky Life Logo - Top Center */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10">
        <img 
          src={logoImage} 
          alt="BlueSky Life" 
          className="h-10 md:h-12 w-auto"
          data-testid="img-bluesky-logo"
        />
      </div>
      
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
}
