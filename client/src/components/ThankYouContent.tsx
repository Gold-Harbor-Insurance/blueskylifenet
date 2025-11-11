import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Calendar, Clock, Zap, X } from "lucide-react";
import logoImage from "@assets/BlueSky Life Landscape transparent bg_1762273618192.png";

interface ThankYouContentProps {
  phoneNumber: string;
  telLink: string;
  phoneRef: React.RefObject<HTMLSpanElement>;
  ageClassification?: string;
  budgetClassification?: string;
  firstName?: string;
}

export default function ThankYouContent({ phoneNumber, telLink, phoneRef, ageClassification, budgetClassification, firstName }: ThankYouContentProps) {
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    // Detect Facebook in-app browser
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isFB = /FBAN|FBAV|Instagram/i.test(userAgent);
    setIsFacebookBrowser(isFB);
  }, []);

  useEffect(() => {
    // Handle scroll to toggle sticky behavior
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Make button static when user scrolls down more than 100px
      // Make it sticky again when at the top
      if (scrollPosition > 100) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressSteps = [
    { 
      label: "Application Submitted", 
      subtext: "Just now",
      icon: <Check className="w-5 h-5" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      label: "Intro Call Booked", 
      subtext: "Pending",
      icon: <Calendar className="w-5 h-5" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    { 
      label: "Application Submission", 
      subtext: "30 minutes",
      icon: <Clock className="w-5 h-5" />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-400"
    },
    { 
      label: "Policy Approval", 
      subtext: "2-3 business days",
      icon: <Zap className="w-5 h-5" />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-400"
    }
  ];

  // Facebook Browser: Simple tel: link button for long-press (native context menu)
  const FacebookCallSection = () => {
    return (
      <div className="w-full space-y-4">
        {/* Tel Link Button - Long-press shows native "Call" menu */}
        <a
          href={telLink}
          className="block w-full bg-green-600 text-white text-2xl md:text-3xl font-bold py-5 px-8 rounded-lg shadow-lg text-center no-underline select-none"
          style={{ touchAction: 'manipulation' }}
          data-testid="link-press-to-call"
          data-age-classification={ageClassification || ""}
          data-budget-classification={budgetClassification || ""}
        >
          📞 Press & Hold to Call
        </a>
        
        {/* Book Appointment - Same size */}
        <button
          onClick={() => setShowBookingModal(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-2xl md:text-3xl font-bold py-5 px-8 rounded-lg shadow-lg transition-colors duration-200"
          data-testid="button-book-appointment"
        >
          📅 Book an Appointment
        </button>
      </div>
    );
  };

  // Regular Browsers: Throbbing tel: link button with track-call-btn class
  const RegularCallButton = () => (
    <motion.a
      href={telLink || "#"}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="track-call-btn block w-full bg-green-600 hover:bg-green-700 text-white text-2xl md:text-3xl font-bold py-5 px-8 rounded-lg shadow-lg transition-colors duration-200 text-center no-underline"
      data-testid="button-call-now"
      data-age-classification={ageClassification || ""}
      data-budget-classification={budgetClassification || ""}
    >
      TAP TO CALL
    </motion.a>
  );

  return (
    <>
      <div className="w-full max-w-2xl mx-auto text-center bg-white px-4 pt-16 pb-32">
        <span ref={phoneRef} className="ringba-number hidden" data-ringba-number="true">ringba-number</span>
        
        {/* Hidden inputs for GTM tracking */}
        <input type="hidden" id="age-classification-final" value={ageClassification || ""} />
        <input type="hidden" id="budget-classification-final" value={budgetClassification || ""} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
        {/* Personalized Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight" data-testid="text-congratulations">
          Congratulations {firstName}!<br />
          <span className="text-green-600">You're Pre-Approved!</span>
        </h1>

        {/* Application Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-black">Application Progress</h2>
            <span className="text-xl md:text-2xl font-bold text-blue-500">50%</span>
          </div>

          {/* Progress Steps - 2 per row on mobile, horizontal on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center ${step.iconBg}`}>
                  <span className={step.iconColor}>
                    {step.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-black leading-tight">
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {step.subtext}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="text-xs text-gray-600 mb-1">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>

        {/* What You're Getting */}
        <div className="bg-blue-50 rounded-lg p-5 text-left space-y-3">
          <h2 className="text-xl font-bold text-black text-center mb-3">What You're Getting</h2>
          <div className="space-y-2">
            {[
              "Up to $25,000 in coverage",
              "100% tax-free cash payout to your family",
              "No medical exam required",
              "Guaranteed lifetime protection — your coverage never expires",
              "Rates locked in for life — no price hikes as you age"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">✅</span>
                <span className="text-sm text-black">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Message */}
        <div className="bg-red-50 border-l-4 border-red-600 p-4">
          <p className="text-base font-bold text-red-600">
            Don't Wait! Prices Increase as You Age!
          </p>
        </div>

        {/* Inline Call Section (shows when user scrolls down) */}
        {!isSticky && (
          <div className="w-full">
            {isFacebookBrowser ? <FacebookCallSection /> : <RegularCallButton />}
          </div>
        )}

        {/* Book Appointment - Only show for non-Facebook browsers (Facebook version has it built in) */}
        {!isFacebookBrowser && (
          <div className="pt-2">
            <p className="text-sm text-gray-600 mb-2">Need to schedule a better time?</p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              data-testid="button-book-appointment"
            >
              📅 Book an Appointment
            </button>
          </div>
        )}

        {/* BlueSky Life Logo - Footer */}
        <div className="flex justify-center mt-8">
          <img 
            src={logoImage} 
            alt="BlueSky Life" 
            className="h-10 md:h-12 w-auto"
            data-testid="img-bluesky-logo-footer"
          />
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <p className="text-xs text-gray-600 leading-relaxed max-w-3xl mx-auto">
            The term "life insurance benefit" refers to a potential insurance policy that may be available 
            to individuals who meet specific eligibility criteria. This is a marketing communication and 
            does not constitute an offer or guarantee of coverage. All insurance plans are subject to 
            underwriting approval, state availability, and applicable carrier terms and conditions. Actual 
            benefit amounts, premiums, and availability will vary based on personal information including, 
            but not limited to: age, health history, income, location, and the selected provider. To 
            determine if you qualify and to receive specific coverage details, you must speak with a 
            licensed insurance agent.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>© 2025 BlueSky Life</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Sticky Call Section at Bottom (shows when at top of page) */}
    {isSticky && (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-lg">
        <div className="max-w-2xl mx-auto p-4">
          {isFacebookBrowser ? <FacebookCallSection /> : <RegularCallButton />}
        </div>
      </div>
    )}

    {/* Booking Modal */}
    {showBookingModal && (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setShowBookingModal(false)}
      >
        <div 
          className="relative bg-white rounded-lg w-full max-w-4xl h-[90vh] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowBookingModal(false)}
            className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            data-testid="button-close-booking-modal"
            aria-label="Close booking modal"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {/* Booking iFrame */}
          <iframe
            src="https://app.goldharborinsurance.com/widget/booking/huWNMVlOMWPEVmyKtTw9"
            className="w-full h-full rounded-lg"
            title="Book an Appointment"
            data-testid="iframe-booking"
          />
        </div>
      </div>
    )}
  </>
  );
}
