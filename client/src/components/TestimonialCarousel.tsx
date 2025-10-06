import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "The process was quick and easy!",
    author: "Joe D."
  },
  {
    quote: "Got approved within minutes",
    author: "Patricia S."
  },
  {
    quote: "Exactly what I was looking for",
    author: "Robert K."
  },
  {
    quote: "Quick and easy to understand",
    author: "Margaret L."
  },
  {
    quote: "Great coverage options",
    author: "James B."
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 py-6 border-b">
      <div className="flex justify-center items-center min-h-[80px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-center"
            data-testid={`testimonial-${currentIndex}`}
          >
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-gold text-gold"
                  data-testid={`star-${currentIndex}-${i}`}
                />
              ))}
            </div>
            <p className="text-foreground font-medium mb-1 text-lg">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="text-muted-foreground text-sm">
              — {testimonials[currentIndex].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
