import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowDown } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";

export default function ThankYou() {
  const phoneNumber = "(877) 745-7526";
  const telLink = "tel:+18777457526";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--gradient-navy-start))] to-[hsl(var(--gradient-navy-end))] flex flex-col items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto text-center"
      >
        <div className="bg-card/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-card-border">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="text-congratulations">
              Congratulations! There's Availability!
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-semibold mb-2">
              Make a quick 2-minute call to review your
            </p>
            <p className="text-2xl md:text-3xl text-gold font-bold mb-6">
              LIFE INSURANCE PROGRAM!
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="bg-urgency/10 border-2 border-urgency rounded-2xl p-6 my-8"
          >
            <p className="text-lg md:text-xl text-urgency-foreground font-bold mb-4">
              Hurry! Secure this coverage before time runs out...
            </p>
            <p className="text-base md:text-lg text-urgency-foreground font-semibold mb-2">
              Rates go up as you age!
            </p>
            <CountdownTimer seconds={45} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-foreground font-semibold">
              Tap below to protect your family now!
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex justify-center"
            >
              <ArrowDown className="w-12 h-12 text-gold" />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto text-xl md:text-2xl px-12 py-8 font-bold rounded-full shadow-xl"
                data-testid="button-call-now"
              >
                <a href={telLink}>
                  <Phone className="w-6 h-6 mr-3" />
                  {phoneNumber}
                  <span className="ml-2 text-sm font-normal">(PLAN)</span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 p-4 bg-destructive/20 border border-destructive rounded-xl"
            >
              <p className="text-sm md:text-base text-destructive-foreground font-bold">
                NOTE: You may never see this message again!
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              The term "life insurance benefit" refers to a potential insurance policy that may be available 
              to individuals who meet specific eligibility criteria. This is a marketing communication and 
              does not constitute an offer or guarantee of coverage. All insurance plans are subject to 
              underwriting approval, state availability, and applicable carrier terms and conditions. Actual 
              benefit amounts, premiums, and availability will vary based on personal information including, 
              but not limited to: age, health history, income, location, and the selected provider. To 
              determine if you qualify and to receive specific coverage details, you must speak with a 
              licensed insurance agent.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>© 2025 Gold Harbor Insurance</span>
              <span>•</span>
              <span>All Rights Reserved</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
