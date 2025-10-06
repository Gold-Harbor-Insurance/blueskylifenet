import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "The process was quick and easy!",
    author: "John H."
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
    <div className="w-full bg-gray-200 pb-4">
      <div className="flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="bg-[#B8E5F5] rounded-lg px-8 py-4 max-w-md text-center"
            data-testid={`testimonial-${currentIndex}`}
          >
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#FFD700] text-[#FFD700]"
                  data-testid={`star-${currentIndex}-${i}`}
                />
              ))}
            </div>
            <p className="text-gray-800 font-medium text-base mb-1">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="text-gray-600 text-sm">
              — {testimonials[currentIndex].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <hr className="border-gray-300 mt-4" />
    </div>
  );
}
