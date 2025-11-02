import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ThankYouContentProps {
  timeLeft: number;
  phoneNumber: string;
  telLink: string;
  phoneRef: React.RefObject<HTMLSpanElement>;
  ageClassification?: string;
  budgetClassification?: string;
}

export default function ThankYouContent({ timeLeft, phoneNumber, telLink, phoneRef, ageClassification, budgetClassification }: ThankYouContentProps) {
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);

  useEffect(() => {
    // Detect Facebook in-app browser
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isFB = /FBAN|FBAV|Instagram/i.test(userAgent);
    setIsFacebookBrowser(isFB);
  }, []);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Force navigation to tel: link even in Facebook browser
    if (isFacebookBrowser) {
      e.preventDefault();
      window.location.href = telLink || "#";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center bg-white p-4">
      <span ref={phoneRef} className="ringba-number hidden" data-ringba-number="true">ringba-number</span>
      
      {/* Hidden inputs for GTM tracking */}
      <input type="hidden" id="age-classification-final" value={ageClassification || ""} />
      <input type="hidden" id="budget-classification-final" value={budgetClassification || ""} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6" data-testid="text-congratulations">
          Congratulations!
        </h1>
        
        <p className="text-xl md:text-2xl text-black mb-4">
          Make a quick <span className="bg-yellow-300 px-2 font-semibold">2-minute call</span> to claim your{" "}
          <span className="text-red-600 font-bold">LIFE INSURANCE BENEFIT!</span>
        </p>

        <p className="text-lg md:text-xl text-black italic mb-3">
          Hurry! Secure this benefit <span className="text-red-600">before time runs out...</span>
        </p>

        <div className="text-4xl md:text-5xl font-bold text-red-600 mb-6" data-testid="text-countdown">
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>

        <p className="text-lg md:text-xl text-black mb-6">
          Call the number below to get your life insurance benefit* 👇
        </p>

        {isFacebookBrowser ? (
          <a
            href={telLink || "#"}
            onClick={handlePhoneClick}
            className="track-call-btn inline-block bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl md:text-3xl font-bold py-4 px-12 rounded-lg shadow-lg transition-colors duration-200 mb-4 cursor-pointer"
            data-testid="button-call-now"
            data-age-classification={ageClassification || ""}
            data-budget-classification={budgetClassification || ""}
          >
            {phoneNumber}
          </a>
        ) : (
          <motion.a
            href={telLink || "#"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="track-call-btn inline-block bg-green-600 hover:bg-green-700 text-white text-2xl md:text-3xl font-bold py-4 px-12 rounded-lg shadow-lg transition-colors duration-200 mb-4"
            data-testid="button-call-now"
            data-age-classification={ageClassification || ""}
            data-budget-classification={budgetClassification || ""}
          >
            {phoneNumber}
          </motion.a>
        )}

        <p className="text-base md:text-lg font-bold mt-6">
          <span className="text-red-600">NOTE:</span> This is the final call
        </p>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The term "life insurance benefit" refers to a potential insurance policy that may be available 
            to individuals who meet specific eligibility criteria. This is a marketing communication and 
            does not constitute an offer or guarantee of coverage. All insurance plans are subject to 
            underwriting approval, state availability, and applicable carrier terms and conditions. Actual 
            benefit amounts, premiums, and availability will vary based on personal information including, 
            but not limited to: age, health history, income, location, and the selected provider. To 
            determine if you qualify and to receive specific coverage details, you must speak with a 
            licensed insurance agent.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>© 2025 BlueSky Life</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
