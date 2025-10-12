import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getStoredFacebookTrackingData } from "@/utils/facebookTracking";

declare global {
  interface Window {
    Ringba?: any;
    RingbaNumber?: string;
    ringbaTracking?: any;
  }
}

export default function ThankYou() {
  const [timeLeft, setTimeLeft] = useState(142); // 2:22 in seconds
  const [phoneNumber, setPhoneNumber] = useState("(877) 790-1817");
  const [telLink, setTelLink] = useState("tel:+18777901817");
  const phoneRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get Facebook tracking data and make it available to Ringba
    const fbData = getStoredFacebookTrackingData();
    
    // Set up Ringba custom tags with Facebook tracking data
    if (typeof window !== 'undefined') {
      window.ringbaTracking = {
        fbclid: fbData.fbclid || '',
        fbc: fbData.fbc || '',
        fbp: fbData.fbp || '',
      };
      
      // If Ringba is already loaded, set the tags
      if (window.Ringba && typeof window.Ringba.setTags === 'function') {
        window.Ringba.setTags(window.ringbaTracking);
      }
    }
  }, []);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    let observer: MutationObserver | null = null;

    const checkRingba = () => {
      attempts++;
      
      // Set Facebook tracking tags when Ringba loads
      if (window.Ringba && window.ringbaTracking) {
        if (typeof window.Ringba.setTags === 'function') {
          window.Ringba.setTags(window.ringbaTracking);
        }
      }
      
      if (phoneRef.current && phoneRef.current.textContent && phoneRef.current.textContent !== "ringba-number") {
        const number = phoneRef.current.textContent;
        if (number && number !== "Loading...") {
          setPhoneNumber(number);
          const cleanNumber = number.replace(/\D/g, '');
          setTelLink(`tel:+1${cleanNumber}`);
          if (observer) observer.disconnect();
          return;
        }
      }
      
      if (window.RingbaNumber) {
        setPhoneNumber(window.RingbaNumber);
        const cleanNumber = window.RingbaNumber.replace(/\D/g, '');
        setTelLink(`tel:+1${cleanNumber}`);
        if (observer) observer.disconnect();
        return;
      }
      
      if (window.Ringba) {
        try {
          if (typeof window.Ringba.getNumber === 'function') {
            const number = window.Ringba.getNumber();
            if (number) {
              setPhoneNumber(number);
              const cleanNumber = number.replace(/\D/g, '');
              setTelLink(`tel:+1${cleanNumber}`);
              if (observer) observer.disconnect();
              return;
            }
          }
          
          if (typeof window.Ringba === 'object' && window.Ringba.number) {
            setPhoneNumber(window.Ringba.number);
            const cleanNumber = window.Ringba.number.replace(/\D/g, '');
            setTelLink(`tel:+1${cleanNumber}`);
            if (observer) observer.disconnect();
            return;
          }
        } catch (error) {
          console.error('Ringba error:', error);
        }
      }
      
      if (attempts < maxAttempts) {
        setTimeout(checkRingba, 100);
      } else {
        console.warn('Ringba not available, using fallback number');
        setPhoneNumber("(877) 790-1817");
        setTelLink("tel:+18777901817");
      }
    };

    if (phoneRef.current) {
      observer = new MutationObserver(() => {
        if (phoneRef.current && phoneRef.current.textContent && phoneRef.current.textContent !== "ringba-number" && phoneRef.current.textContent !== "Loading...") {
          const number = phoneRef.current.textContent;
          setPhoneNumber(number);
          const cleanNumber = number.replace(/\D/g, '');
          setTelLink(`tel:+1${cleanNumber}`);
          if (observer) observer.disconnect();
        }
      });
      
      observer.observe(phoneRef.current, { childList: true, characterData: true, subtree: true });
    }

    checkRingba();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <span ref={phoneRef} className="ringba-number hidden" data-ringba-number="true">ringba-number</span>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto text-center"
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

        <div className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
          {formattedTime}
        </div>

        <p className="text-lg md:text-xl text-black mb-6">
          Call the number below to get your life insurance benefit* 👇
        </p>

        <motion.a
          href={telLink || "#"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-green-600 hover:bg-green-700 text-white text-2xl md:text-3xl font-bold py-4 px-12 rounded-lg shadow-lg transition-colors duration-200 mb-4"
          data-testid="button-call-now"
        >
          {phoneNumber}
        </motion.a>

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
            <span>© 2025 Gold Harbor Insurance</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
