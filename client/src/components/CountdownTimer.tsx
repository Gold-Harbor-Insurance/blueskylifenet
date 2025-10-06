import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  seconds: number;
}

export default function CountdownTimer({ seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <motion.div
      className="flex flex-col items-center justify-center my-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative ${timeLeft <= 10 ? "animate-pulse" : ""}`}>
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-card border-4 border-urgency flex items-center justify-center shadow-xl">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-mono text-urgency" data-testid="text-countdown">
              {displayTime}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
