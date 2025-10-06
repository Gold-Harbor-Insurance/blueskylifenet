import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The process was surprisingly smooth",
    author: "David M."
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
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 py-4 border-b">
      <motion.div
        className="flex gap-6 px-4"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-lg px-8 py-4 min-w-[320px] shadow-sm"
            data-testid={`testimonial-${index}`}
          >
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-gold text-gold"
                  data-testid={`star-${index}-${i}`}
                />
              ))}
            </div>
            <p className="text-center text-foreground font-medium mb-1">
              "{testimonial.quote}"
            </p>
            <p className="text-center text-muted-foreground text-sm">
              — {testimonial.author}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
