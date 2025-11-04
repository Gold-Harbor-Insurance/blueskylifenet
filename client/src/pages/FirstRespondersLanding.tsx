import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import LegalModal from "@/components/LegalModal";
import ThankYouContent from "@/components/ThankYouContent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { initFacebookTracking } from "@/utils/facebookTracking";
import { fetchRingbaNumber } from "@/utils/ringbaApi";
import { sendWebhookData } from "@/utils/webhookApi";
import { lookupZipCode } from "@/utils/zipCodeLookup";
import { detectZipCodeFromIP } from "@/utils/ipGeolocation";
import logoImage from "@assets/BlueSky Life Landscape transparent bg_1762273618192.png";
import type { 
  FirstResponderAgency,
  Gender, 
  LifeInsuranceStatus, 
  CashAmount, 
  Beneficiary,
  USState 
} from "@shared/schema";

const testimonials = [
  { quote: "Quick and easy to understand", author: "Margaret L." },
  { quote: "Great coverage options", author: "James B." },
  { quote: "Simple process, excellent service", author: "Linda M." },
  { quote: "Peace of mind for my family", author: "Robert T." },
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      <div className="bg-[#b3d9f2] px-6 py-3 rounded-lg max-w-xs text-center transition-all duration-500">
        <div className="flex justify-center gap-1 mb-1">
          <span className="text-yellow-400 text-xl">⭐</span>
          <span className="text-yellow-400 text-xl">⭐</span>
          <span className="text-yellow-400 text-xl">⭐</span>
          <span className="text-yellow-400 text-xl">⭐</span>
          <span className="text-yellow-400 text-xl">⭐</span>
        </div>
        <p className="text-sm font-semibold text-gray-800">"{testimonials[currentIndex].quote}"</p>
        <p className="text-xs text-gray-600">— {testimonials[currentIndex].author}</p>
      </div>
    </div>
  );
}

export default function FirstRespondersLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | "goldHarbor" | null>(null);
  const [isLoadingRingba, setIsLoadingRingba] = useState(false);
  const [isLoadingZip, setIsLoadingZip] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [errors, setErrors] = useState({
    zipCode: "",
    beneficiaryName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: ""
  });
  
  const [formData, setFormData] = useState({
    agency: "" as FirstResponderAgency | "",
    zipCode: "",
    city: "",
    state: "" as USState | "",
    gender: "" as Gender | "",
    hasLifeInsurance: "" as LifeInsuranceStatus | "",
    cashAmount: "" as CashAmount | "",
    beneficiary: "" as Beneficiary | "",
    age: "50",
    beneficiaryName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    monthlyBudget: "",
  });
  
  // Thank you page state
  const [phoneNumber, setPhoneNumber] = useState("(877) 790-1817");
  const [telLink, setTelLink] = useState("tel:+18777901817");
  const phoneRef = useRef<HTMLSpanElement>(null);
  
  // Refs for auto-focusing input fields
  const beneficiaryNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initFacebookTracking();
    
    // Auto-detect ZIP code from IP on component mount
    const detectLocation = async () => {
      try {
        const geoData = await detectZipCodeFromIP();
        if (geoData) {
          setFormData(prev => ({
            ...prev,
            zipCode: geoData.zipCode,
            city: geoData.city,
            state: geoData.state as USState,
          }));
        }
      } catch (error) {
        console.log('Failed to detect location from IP, user can enter manually');
      }
    };
    
    detectLocation();
  }, []);

  const totalSteps = 10; // Agency + 9 questions + thank you page

  // Q1: First Responder Agency (First Responders-specific)
  const handleAgencySelect = (agency: FirstResponderAgency) => {
    setFormData({ ...formData, agency });
    setTimeout(() => setStep(2), 300);
  };

  // Q2: Gender
  const handleGenderSelect = (gender: Gender) => {
    setFormData({ ...formData, gender });
    setTimeout(() => setStep(3), 300);
  };

  // Q3: Beneficiary
  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData({ ...formData, beneficiary });
    setTimeout(() => setStep(4), 300);
  };

  // Q4: Has Life Insurance
  const handleLifeInsuranceSelect = (hasLifeInsurance: LifeInsuranceStatus) => {
    setFormData({ ...formData, hasLifeInsurance });
    setTimeout(() => setStep(5), 300);
  };

  // Q5: Cash Amount
  const handleCashAmountSelect = (cashAmount: CashAmount) => {
    setFormData({ ...formData, cashAmount });
    setTimeout(() => setStep(6), 300);
  };

  // Q6: Monthly Budget
  const handleMonthlyBudgetSelect = (budget: string) => {
    setFormData({ ...formData, monthlyBudget: budget });
    setTimeout(() => setStep(7), 300);
  };

  // Q7: Age (ALL ages now accepted - no disqualification)
  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep(8), 300);
  };

  // Q8: Beneficiary Name
  const handleBeneficiaryNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.beneficiaryName.trim();
    
    if (!name) {
      setErrors(prev => ({ ...prev, beneficiaryName: "Please enter beneficiary name" }));
      return;
    }
    if (name.length < 2) {
      setErrors(prev => ({ ...prev, beneficiaryName: "Name must be at least 2 characters" }));
      return;
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      setErrors(prev => ({ ...prev, beneficiaryName: "Name can only contain letters, spaces, hyphens, and apostrophes" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, beneficiaryName: "" }));
    setTimeout(() => setStep(9), 300);
  };


  // Q9: Combined Contact Info (First Name, Last Name, Email, Phone) - FINAL STEP
  const handleContactInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    let hasError = false;
    
    // Validate first name
    if (!firstName) {
      setErrors(prev => ({ ...prev, firstName: "Please enter your first name" }));
      hasError = true;
    } else if (firstName.length < 2) {
      setErrors(prev => ({ ...prev, firstName: "Name must be at least 2 characters" }));
      hasError = true;
    } else if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
      setErrors(prev => ({ ...prev, firstName: "Name can only contain letters, spaces, hyphens, and apostrophes" }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, firstName: "" }));
    }
    
    // Validate last name
    if (!lastName) {
      setErrors(prev => ({ ...prev, lastName: "Please enter your last name" }));
      hasError = true;
    } else if (lastName.length < 2) {
      setErrors(prev => ({ ...prev, lastName: "Name must be at least 2 characters" }));
      hasError = true;
    } else if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
      setErrors(prev => ({ ...prev, lastName: "Name can only contain letters, spaces, hyphens, and apostrophes" }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, lastName: "" }));
    }
    
    // Validate email
    if (!email) {
      setErrors(prev => ({ ...prev, email: "Please enter your email address" }));
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, email: "" }));
    }
    
    // Validate phone
    if (!phone) {
      setErrors(prev => ({ ...prev, phone: "Please enter your phone number" }));
      setShowPhone(true);
      hasError = true;
    } else if (!phone.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number" }));
      setShowPhone(true);
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
    
    if (hasError) return;
    
    // Trigger Ringba API and webhook submission
    setIsLoadingRingba(true);
    
    setTimeout(async () => {
      const hiddenInputNames = [
        'first_responder_agency',
        'zip_code',
        'gender',
        'life_insurance',
        'coverage_amount',
        'monthly_budget',
        'beneficiary',
        'age_classification',
        'beneficiary_name',
        'first_name',
        'last_name',
        'email',
        'phone',
        'city',
        'state'
      ];
      
      const ringbaData = await fetchRingbaNumber(hiddenInputNames);
      setPhoneNumber(ringbaData.phoneNumber);
      setTelLink(ringbaData.telLink);
      
      await sendWebhookData({
        angle: 'firstresponders',
        first_responder_agency: formData.agency,
        zip_code: formData.zipCode,
        gender: formData.gender,
        life_insurance: formData.hasLifeInsurance,
        coverage_amount: formData.cashAmount,
        monthly_budget: formData.monthlyBudget,
        beneficiary: formData.beneficiary,
        age: formData.age,
        beneficiary_name: formData.beneficiaryName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        landing_page: 'first_responders',
        submitted_at: new Date().toISOString()
      });
      
      setIsLoadingRingba(false);
      setStep(10);
    }, 300);
  };

  // Scroll to top on every step change
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is fully rendered before scrolling
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, [step]);
  
  // Auto-focus input fields on mobile/tablet/desktop
  useEffect(() => {
    const focusInput = (ref: React.RefObject<HTMLInputElement>) => {
      setTimeout(() => {
        ref.current?.focus({ preventScroll: true });
        ref.current?.select(); // Also select the text if any exists
      }, 150);
    };
    
    if (step === 8) focusInput(beneficiaryNameRef);
    else if (step === 9) focusInput(firstNameRef);
  }, [step]);

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (input.length > 0) {
      formatted = '(' + input.substring(0, 3);
    }
    if (input.length >= 3) {
      formatted += ') ' + input.substring(3, 6);
    }
    if (input.length >= 6) {
      formatted += '-' + input.substring(6, 10);
    }
    
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
  };

  // Custom progress percentages based on question weights
  const getProgressPercentage = (currentStep: number): number => {
    const progressMap: Record<number, number> = {
      1: 0,   // Agency (first page, no progress bar)
      2: 20,  // Gender
      3: 40,  // Beneficiary
      4: 50,  // Life Insurance
      5: 70,  // Cash Amount
      6: 80,  // Monthly Budget
      7: 90,  // Age
      8: 95,  // Beneficiary Name
      9: 100, // Contact Info (hide progress bar)
      10: 100 // Thank You
    };
    return progressMap[currentStep] || 0;
  };

  const progress = getProgressPercentage(step);

  return (
    <>
      {/* Hidden inputs for GTM tracking - ALWAYS rendered, persist across all steps */}
      <input type="hidden" name="first_responder_agency" value={formData.agency} />
      <input type="hidden" name="zip_code" value={formData.zipCode} />
      <input type="hidden" name="gender" value={formData.gender} />
      <input type="hidden" name="life_insurance" value={formData.hasLifeInsurance} />
      <input type="hidden" name="coverage_amount" value={formData.cashAmount} />
      <input type="hidden" name="beneficiary" value={formData.beneficiary} />
      <input type="hidden" name="age_classification" value={formData.age} />
      <input type="hidden" name="beneficiary_name" value={formData.beneficiaryName} />
      <input type="hidden" name="first_name" value={formData.firstName} />
      <input type="hidden" name="last_name" value={formData.lastName} />
      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="phone" value={formData.phone} />
      <input type="hidden" name="city" value={formData.city} />
      <input type="hidden" name="state" value={formData.state} />
      <input type="hidden" name="monthly_budget" value={formData.monthlyBudget} />

      {/* Ringba loading screen overlay */}
      {isLoadingRingba && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" role="status" aria-live="polite">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#5CB85C] border-t-transparent rounded-full animate-spin mx-auto" aria-hidden="true"></div>
            <h3 className="text-xl font-bold text-black">Processing Your Information</h3>
            <p className="text-gray-600">Please wait while we prepare your personalized quote...</p>
          </div>
        </div>
      )}

      {step === 10 ? (
        <ThankYouContent
          phoneNumber={phoneNumber}
          telLink={telLink}
          phoneRef={phoneRef}
          firstName={formData.firstName}
        />
      ) : step === 1 ? (
        // First page with special design matching screenshot
        <div className="min-h-screen bg-gray-200 flex flex-col">
          {/* Blue bar at top */}
          <div className="w-full h-[18px] bg-[#63b1f9]"></div>
          
          {/* Auto-scrolling Testimonial Carousel */}
          <TestimonialCarousel />

          {/* Main content - vertically centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            {/* Headline */}
            <div className="text-center mb-6 max-w-4xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-[#dc3545]">EXCLUSIVE FOR FIRST RESPONDERS</span>{" "}
                <span className="text-black">Get up to $25,000 To Cover Funeral Costs and Unpaid Debt</span>
              </h1>
            </div>

            {/* Light blue card with question */}
            <div className="bg-[#eef9ff] rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl w-full">
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl mb-2">
                  Answer a Few Quick Questions Below to <span className="underline font-bold">Check Eligibility!</span>
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-black mt-6">
                  Which agency do you serve with?
                </h2>
              </div>
              
              <div className="max-w-md mx-auto grid gap-3">
                {[
                  { value: "Law enforcement", display: "Law Enforcement" },
                  { value: "Fire and rescue", display: "Fire Services" },
                  { value: "Emergency Medical Services", display: "EMS" },
                  { value: "Public safety communications", display: "Public Safety Communications" },
                  { value: "Other critical first responders", display: "Other" }
                ].map((agency) => (
                  <button
                    key={agency.value}
                    type="button"
                    onClick={() => handleAgencySelect(agency.value as FirstResponderAgency)}
                    data-testid={`button-agency-${agency.value.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`w-full min-h-[60px] px-6 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full transition-colors duration-200 button-agency-${agency.value.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {agency.display}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-16 pb-8 text-center text-sm text-gray-600">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img 
                  src={logoImage} 
                  alt="BlueSky Life" 
                  className="h-10 md:h-12 w-auto"
                  data-testid="img-bluesky-logo-footer"
                />
              </div>
              
              <div className="space-x-2 mb-2">
                <button
                  onClick={() => setLegalModal("privacy")}
                  className="hover:underline link-privacy-policy"
                  data-testid="link-privacy-policy"
                >
                  Privacy Policy
                </button>
                <span>|</span>
                <button
                  onClick={() => setLegalModal("terms")}
                  className="hover:underline link-terms-of-use"
                  data-testid="link-terms-of-use"
                >
                  Terms of Use
                </button>
              </div>
              <p>© 2025 BlueSky Life. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      ) : (
        <QuizLayout>
          <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step} progress={progress}>
            {/* Q1 is handled above, start from Q2 */}

            {/* Q2: Gender */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your gender?
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("Male")}
                    data-testid="button-gender-male"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-full shadow-md transition-colors duration-200 button-gender-male"
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("Female")}
                    data-testid="button-gender-female"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-full shadow-md transition-colors duration-200 button-gender-female"
                  >
                    Female
                  </button>
                </div>
              </div>
            )}

            {/* Q3: Beneficiary */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Who would you want to receive this benefit?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["Spouse", "Children", "Grandchildren", "Family Member"].map((ben) => {
                    const beneficiaryMap: Record<string, Beneficiary> = {
                      "Spouse": "Spouse",
                      "Children": "Children",
                      "Grandchildren": "Grandchildren",
                      "Family Member": "Family"
                    };
                    
                    return (
                      <button
                        key={ben}
                        type="button"
                        onClick={() => handleBeneficiarySelect(beneficiaryMap[ben])}
                        data-testid={`button-beneficiary-${ben.replace(/\s+/g, '-').toLowerCase()}`}
                        className={`w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200 button-beneficiary-${ben.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {ben}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q4: Has Life Insurance */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Do you currently have life insurance?
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
                  <button
                    type="button"
                    onClick={() => handleLifeInsuranceSelect("Yes")}
                    data-testid="button-life-insurance-yes"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md shadow-md transition-colors duration-200 button-life-insurance-yes"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLifeInsuranceSelect("No")}
                    data-testid="button-life-insurance-no"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md shadow-md transition-colors duration-200 button-life-insurance-no"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Q5: Cash Amount */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    How much instant cash is needed to handle your last affairs?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["Under$10000", "$10000-$24999", "$25000-$50000", "Over$50000"].map((amount) => {
                    const displayNames: Record<string, string> = {
                      "Under$10000": "Under $10,000",
                      "$10000-$24999": "$10,000 - $24,999",
                      "$25000-$50000": "$25,000 - $50,000",
                      "Over$50000": "Over $50,000"
                    };
                    
                    return (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleCashAmountSelect(amount as CashAmount)}
                        data-testid={`button-cash-${amount.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                        className={`w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200 button-cash-${amount.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                      >
                        {displayNames[amount]}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Q6: Monthly Budget */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What monthly budget would you feel comfortable investing to protect your family?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {[
                    { value: "$50–$74", display: "$50-$74/month" },
                    { value: "$75–$99", display: "$75-$99/month" },
                    { value: "$100–$149", display: "$100-$149/month" },
                    { value: "Over$150", display: "$150+/month" }
                  ].map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => handleMonthlyBudgetSelect(budget.value)}
                      data-testid={`button-budget-${budget.value.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                      className={`w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200 button-budget-${budget.value.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                    >
                      {budget.display}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q7: Age (NO disqualification - all ages accepted) */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your age?
                  </h2>
                </div>
                <form onSubmit={handleAgeSubmit} className="max-w-xs mx-auto">
                  {/* Mobile/Tablet: Native scroll wheel picker */}
                  <select
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-32 text-2xl min-h-[60px] font-semibold text-center md:hidden border-2 border-gray-300 rounded-md pl-6 pr-8 mx-auto block"
                    style={{ textAlignLast: 'center' }}
                    data-testid="select-age-mobile"
                    required
                  >
                    <option value="">Select your age</option>
                    {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                      <option key={age} value={age.toString()}>
                        {age}
                      </option>
                    ))}
                  </select>
                  
                  {/* Desktop: Dropdown menu */}
                  <div className="hidden md:flex md:justify-center">
                    <Select
                      value={formData.age}
                      onValueChange={(value) => setFormData({ ...formData, age: value })}
                    >
                      <SelectTrigger className="text-2xl min-h-[60px] font-semibold w-32 justify-center" data-testid="select-age-desktop">
                        <SelectValue placeholder="Select your age" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] w-32">
                        {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                          <SelectItem key={age} value={age.toString()} className="text-xl py-3 justify-center cursor-pointer">
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-age"
                    data-testid="button-submit-age"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {/* Q8: Beneficiary Name */}
            {step === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your beneficiary's name?
                  </h2>
                </div>
                <form onSubmit={handleBeneficiaryNameSubmit} className="max-w-md mx-auto">
                  <Input
                    ref={beneficiaryNameRef}
                    type="text"
                    value={formData.beneficiaryName}
                    onChange={(e) => {
                      setFormData({ ...formData, beneficiaryName: e.target.value });
                      if (errors.beneficiaryName) setErrors(prev => ({ ...prev, beneficiaryName: "" }));
                    }}
                    placeholder="Enter beneficiary name"
                    className={`text-lg min-h-[50px] ${errors.beneficiaryName ? 'border-red-500' : ''}`}
                    data-testid="input-beneficiary-name"
                    required
                  />
                  {errors.beneficiaryName && (
                    <p className="text-red-600 text-sm mt-1">{errors.beneficiaryName}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-beneficiary-name"
                    data-testid="button-submit-beneficiary-name"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}


            {/* Q9: Get Your Custom Quote (Contact Info) */}
            {step === 9 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-16">
                    <span className="text-black">Get Your </span>
                    <span className="text-[#3498DB]">Custom Quote</span>
                  </h2>
                  <p className="text-lg text-gray-700">Let's get your FREE coverage review call.</p>
                  <p className="text-base text-gray-600">We will contact you in 24 hours to explore your options.</p>
                </div>
                
                <form onSubmit={handleContactInfoSubmit}>
                  {/* Form fields container */}
                  <div className="max-w-lg mx-auto space-y-12">
                    {/* First Name and Last Name - Side by Side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Input
                          ref={firstNameRef}
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '');
                            setFormData({ ...formData, firstName: value });
                            if (errors.firstName) setErrors(prev => ({ ...prev, firstName: "" }));
                          }}
                          placeholder="First Name *"
                          className={`text-base min-h-[48px] ${errors.firstName ? 'border-red-500' : ''}`}
                          data-testid="input-first-name"
                          required
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          ref={lastNameRef}
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => {
                            setFormData({ ...formData, lastName: e.target.value });
                            if (errors.lastName) setErrors(prev => ({ ...prev, lastName: "" }));
                          }}
                          placeholder="Last Name *"
                          className={`text-base min-h-[48px] ${errors.lastName ? 'border-red-500' : ''}`}
                          data-testid="input-last-name"
                          required
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <Input
                        ref={emailRef}
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                        }}
                        onFocus={() => setShowPhone(true)}
                        placeholder="Email Address *"
                        className={`text-base min-h-[48px] ${errors.email ? 'border-red-500' : ''}`}
                        data-testid="input-email"
                        required
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone Number - Shows when email is focused */}
                    {showPhone && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Input
                          ref={phoneInputRef}
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="Phone Number *"
                          className={`text-base min-h-[48px] ${errors.phone ? 'border-red-500' : ''}`}
                          data-testid="input-phone"
                          maxLength={14}
                          required
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Submit Button - In normal flow */}
                    <Button 
                      type="submit" 
                      className={`w-full mt-12 min-h-[52px] text-lg font-semibold transition-opacity ${
                        formData.firstName && formData.lastName && formData.email && formData.phone
                          ? 'bg-[#1A3E7A] hover:bg-[#152F5F] opacity-100'
                          : 'bg-[#1A3E7A] cursor-not-allowed opacity-60'
                      }`}
                      data-testid="button-submit-contact-info"
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                    >
                      Book Your Free Coverage Review Call
                    </Button>

                    {/* 100% Completion Progress Bar - Below Button */}
                    <div className="w-full mt-4 mb-6">
                      <div className="text-center mb-2">
                        <span className="text-[#5CB85C] font-semibold text-sm">100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-[#5CB85C] transition-all duration-300"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Consent Text - Moderate spacing so a bit shows */}
                  <div className="mt-12 max-w-lg mx-auto text-xs text-gray-600 leading-relaxed space-y-2">
                    <p>
                      By clicking "Book Your Free Coverage Review Call" and submitting your information, you expressly consent via electronic signature to receive marketing communications via email, telephone calls, text messages (SMS), and prerecorded messages from BlueSkyInsure.io, its subsidiaries, its licensed agents, and listed marketing partners regarding life insurance products and services, including Final Expense policies, at the email address and phone number you provided, including wireless numbers, even if your number is listed on any state or federal Do Not Call registry. Communications may be made using an automated dialing system, prerecorded/artificial voice, or SMS text in compliance with applicable federal and state laws. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply STOP to opt out at any time.
                    </p>
                    <p>
                      You also consent to the sharing of your information with Gold Harbor Insurance LLC and listed third-party marketing and service partners for the purpose of providing you quotes or additional insurance-related information.
                    </p>
                    <p>
                      By submitting this form, you also agree to our{' '}
                      <button
                        type="button"
                        onClick={() => setLegalModal("privacy")}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Privacy Policy
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => setLegalModal("terms")}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Terms of Use
                      </button>
                      . This website collects your name, phone number, email, address, age, and ZIP code to provide you with a quote and connect you with licensed agents offering available plans. Availability of products and carriers may vary by state.
                    </p>
                    <p>
                      By clicking Submit, you agree to send your info to Gold Harbor Insurance who agrees to use it according to their{' '}
                      <button
                        type="button"
                        onClick={() => setLegalModal("goldHarbor")}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        privacy policy
                      </button>
                      .
                    </p>
                  </div>
                </form>
              </div>
            )}

          </QuizCard>
        </QuizLayout>
      )}
      
      <LegalModal
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
        type={legalModal}
      />
    </>
  );
}
