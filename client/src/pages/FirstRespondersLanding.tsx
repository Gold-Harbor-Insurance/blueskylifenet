import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
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
import { getCountiesByState } from "@/utils/countyData";
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
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const [isLoadingRingba, setIsLoadingRingba] = useState(false);
  const [isLoadingZip, setIsLoadingZip] = useState(false);
  const [availableCounties, setAvailableCounties] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    zipCode: "",
    beneficiaryName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    county: ""
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
    streetAddress: "",
    county: "",
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
  const streetAddressRef = useRef<HTMLInputElement>(null);

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
          const counties = getCountiesByState(geoData.state);
          setAvailableCounties(counties);
        }
      } catch (error) {
        console.log('Failed to detect location from IP, user can enter manually');
      }
    };
    
    detectLocation();
  }, []);

  const totalSteps = 17; // Agency + 14 questions + county + thank you page

  // Q1: First Responder Agency (First Responders-specific)
  const handleAgencySelect = (agency: FirstResponderAgency) => {
    setFormData({ ...formData, agency });
    setTimeout(() => setStep(2), 300);
  };

  // Q2: Zip Code (auto-detected, editable)
  const handleZipCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.zipCode.match(/^\d{5}$/)) {
      setErrors(prev => ({ ...prev, zipCode: "Please enter a valid 5-digit ZIP code" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, zipCode: "" }));
    setIsLoadingZip(true);
    const zipData = await lookupZipCode(formData.zipCode);
    
    if (zipData) {
      setFormData(prev => ({
        ...prev,
        city: zipData.city,
        state: zipData.stateAbbr as USState,
      }));
      // Update available counties for the state
      const counties = getCountiesByState(zipData.stateAbbr);
      setAvailableCounties(counties);
    }
    
    setIsLoadingZip(false);
    setTimeout(() => setStep(3), 300);
  };

  // Q3: Gender
  const handleGenderSelect = (gender: Gender) => {
    setFormData({ ...formData, gender });
    setTimeout(() => setStep(4), 300);
  };

  // Q4: Beneficiary
  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData({ ...formData, beneficiary });
    setTimeout(() => setStep(5), 300);
  };

  // Q5: Has Life Insurance
  const handleLifeInsuranceSelect = (hasLifeInsurance: LifeInsuranceStatus) => {
    setFormData({ ...formData, hasLifeInsurance });
    setTimeout(() => setStep(6), 300);
  };

  // Q6: Cash Amount
  const handleCashAmountSelect = (cashAmount: CashAmount) => {
    setFormData({ ...formData, cashAmount });
    setTimeout(() => setStep(7), 300);
  };

  // Q7: Monthly Budget
  const handleMonthlyBudgetSelect = (budget: string) => {
    setFormData({ ...formData, monthlyBudget: budget });
    setTimeout(() => setStep(8), 300);
  };

  // Q8: Age (ALL ages now accepted - no disqualification)
  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep(9), 300);
  };

  // Q9: Beneficiary Name
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
    setTimeout(() => setStep(10), 300);
  };


  // Q10: First Name
  const handleFirstNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.firstName.trim();
    
    if (!name) {
      setErrors(prev => ({ ...prev, firstName: "Please enter your first name" }));
      return;
    }
    if (name.length < 2) {
      setErrors(prev => ({ ...prev, firstName: "Name must be at least 2 characters" }));
      return;
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      setErrors(prev => ({ ...prev, firstName: "Name can only contain letters, spaces, hyphens, and apostrophes" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, firstName: "" }));
    setTimeout(() => setStep(11), 300);
  };

  // Q11: Last Name
  const handleLastNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.lastName.trim();
    
    if (!name) {
      setErrors(prev => ({ ...prev, lastName: "Please enter your last name" }));
      return;
    }
    if (name.length < 2) {
      setErrors(prev => ({ ...prev, lastName: "Name must be at least 2 characters" }));
      return;
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      setErrors(prev => ({ ...prev, lastName: "Name can only contain letters, spaces, hyphens, and apostrophes" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, lastName: "" }));
    setTimeout(() => setStep(12), 300);
  };

  // Q12: Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: "Please enter your email address" }));
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, email: "" }));
    setTimeout(() => setStep(13), 300);
  };

  // Q13: Phone
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: "Please enter your phone number" }));
      return;
    }
    if (!formData.phone.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, phone: "" }));
    setTimeout(() => setStep(14), 300);
  };

  // Q14: Street Address
  const handleStreetAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const address = formData.streetAddress.trim();
    
    if (!address) {
      setErrors(prev => ({ ...prev, streetAddress: "Please enter your street address" }));
      return;
    }
    if (address.length < 5) {
      setErrors(prev => ({ ...prev, streetAddress: "Address must be at least 5 characters" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, streetAddress: "" }));
    setTimeout(() => setStep(15), 300);
  };

  // Q15: County (triggers Ringba API and final submission)
  const handleCountySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const county = formData.county.trim();
    
    if (!county) {
      setErrors(prev => ({ ...prev, county: "Please enter your county" }));
      return;
    }
    if (county.length < 2) {
      setErrors(prev => ({ ...prev, county: "County must be at least 2 characters" }));
      return;
    }
    
    setErrors(prev => ({ ...prev, county: "" }));
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
        'street_address',
        'city',
        'state',
        'county'
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
        street_address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        county: formData.county,
        landing_page: 'first_responders',
        submitted_at: new Date().toISOString()
      });
      
      setIsLoadingRingba(false);
      setStep(17);
    }, 300);
  };
  
  // Scroll to top when showing thank you page
  useEffect(() => {
    if (step === 17) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);
  
  // Auto-focus input fields on mobile/tablet/desktop
  useEffect(() => {
    const focusInput = (ref: React.RefObject<HTMLInputElement>) => {
      setTimeout(() => {
        ref.current?.focus();
        ref.current?.select(); // Also select the text if any exists
      }, 150);
    };
    
    if (step === 9) focusInput(beneficiaryNameRef);
    else if (step === 10) focusInput(firstNameRef);
    else if (step === 11) focusInput(lastNameRef);
    else if (step === 12) focusInput(emailRef);
    else if (step === 13) focusInput(phoneInputRef);
    else if (step === 14) focusInput(streetAddressRef);
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

  const progress = (step / totalSteps) * 100;

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
      <input type="hidden" name="street_address" value={formData.streetAddress} />
      <input type="hidden" name="city" value={formData.city} />
      <input type="hidden" name="state" value={formData.state} />
      <input type="hidden" name="county" value={formData.county} />
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

      {step === 17 ? (
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
                  "law_enforcement",
                  "ems",
                  "fire_services",
                  "public_safety_communications",
                  "other"
                ].map((agency) => (
                  <button
                    key={agency}
                    type="button"
                    onClick={() => handleAgencySelect(agency as FirstResponderAgency)}
                    data-testid={`button-agency-${agency.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`w-full min-h-[60px] px-6 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full transition-colors duration-200 button-agency-${agency.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {agency}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-16 pb-8 text-center text-sm text-gray-600">
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
          <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
            {/* Q1 is handled above, start from Q2 */}

            {/* Q2: Zip Code (auto-detected, editable) */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your zip code?
                  </h2>
                </div>
                <form onSubmit={handleZipCodeSubmit} className="flex flex-col items-center">
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').substring(0, 5);
                      setFormData({ ...formData, zipCode: value });
                      if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: "" }));
                    }}
                    placeholder="12345"
                    className={`text-lg min-h-[50px] w-32 text-center ${errors.zipCode ? 'border-red-500' : ''}`}
                    data-testid="input-zip-code"
                    maxLength={5}
                    required
                  />
                  {errors.zipCode && (
                    <p className="text-red-600 text-sm mt-1 mb-4">{errors.zipCode}</p>
                  )}
                  {formData.city && formData.state && (
                    <div className="mt-3 text-center flex items-center justify-center gap-2">
                      <p className="text-gray-700 text-base">
                        {formData.city}, {formData.state}
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, city: "", state: "" })}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        data-testid="button-edit-location"
                        aria-label="Edit location"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-[180px] md:w-[200px] mt-4 min-h-[60px] md:min-h-[70px] text-xl md:text-2xl font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-zip-code"
                    data-testid="button-submit-zip-code"
                    disabled={isLoadingZip}
                  >
                    {isLoadingZip ? "Looking up..." : "Continue"}
                  </Button>
                </form>
              </div>
            )}

            {/* Q3: Gender */}
            {step === 3 && (
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

            {/* Q4: Beneficiary */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Who would you want to receive this benefit?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["Spouse", "Children", "Grandchildren", "Family Member"].map((ben) => (
                    <button
                      key={ben}
                      type="button"
                      onClick={() => handleBeneficiarySelect(ben as Beneficiary)}
                      data-testid={`button-beneficiary-${ben.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200 button-beneficiary-${ben.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {ben}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q5: Has Life Insurance */}
            {step === 5 && (
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

            {/* Q6: Cash Amount */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    How much cash do you have set aside for final expenses?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["Under$10000", "$10000-$24999", "$25000-$50000", "Over$50000"].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleCashAmountSelect(amount as CashAmount)}
                      data-testid={`button-cash-${amount.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                      className={`w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200 button-cash-${amount.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                    >
                      {amount === "Over$50000" ? "Over $50,000" : amount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q7: Monthly Budget */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What monthly budget would you feel comfortable investing to protect your family?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["$50-$74/month", "$75-$99/month", "$100-$149/month", "$150+/month"].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => handleMonthlyBudgetSelect(budget)}
                      data-testid={`button-budget-${budget.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                      className={`w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200 button-budget-${budget.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q8: Age (NO disqualification - all ages accepted) */}
            {step === 8 && (
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
                    className="w-32 text-2xl min-h-[60px] font-semibold text-center md:hidden border-2 border-gray-300 rounded-md px-4 mx-auto block"
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

            {/* Q9: Beneficiary Name */}
            {step === 9 && (
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


            {/* Q10: First Name */}
            {step === 10 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your first name?
                  </h2>
                </div>
                <form onSubmit={handleFirstNameSubmit} className="max-w-md mx-auto">
                  <Input
                    ref={firstNameRef}
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: "" }));
                    }}
                    placeholder="Enter your first name"
                    className={`text-lg min-h-[50px] ${errors.firstName ? 'border-red-500' : ''}`}
                    data-testid="input-first-name"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-first-name"
                    data-testid="button-submit-first-name"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {/* Q11: Last Name */}
            {step === 11 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your last name?
                  </h2>
                </div>
                <form onSubmit={handleLastNameSubmit} className="max-w-md mx-auto">
                  <Input
                    ref={lastNameRef}
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: "" }));
                    }}
                    placeholder="Enter your last name"
                    className={`text-lg min-h-[50px] ${errors.lastName ? 'border-red-500' : ''}`}
                    data-testid="input-last-name"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-last-name"
                    data-testid="button-submit-last-name"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {/* Q12: Email */}
            {step === 12 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your email address?
                  </h2>
                </div>
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <Input
                    ref={emailRef}
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                    }}
                    placeholder="Enter your email"
                    className={`text-lg min-h-[50px] ${errors.email ? 'border-red-500' : ''}`}
                    data-testid="input-email"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-email"
                    data-testid="button-submit-email"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {/* Q13: Phone */}
            {step === 13 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your phone number?
                  </h2>
                </div>
                <form onSubmit={handlePhoneSubmit} className="max-w-md mx-auto">
                  <Input
                    ref={phoneInputRef}
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 555-5555"
                    className={`text-lg min-h-[50px] ${errors.phone ? 'border-red-500' : ''}`}
                    data-testid="input-phone"
                    maxLength={14}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-phone"
                    data-testid="button-submit-phone"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {/* Q14: Street Address */}
            {step === 14 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your street address?
                  </h2>
                </div>
                <form onSubmit={handleStreetAddressSubmit} className="max-w-md mx-auto space-y-3">
                  <div>
                    <Input
                      ref={streetAddressRef}
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => {
                        setFormData({ ...formData, streetAddress: e.target.value });
                        if (errors.streetAddress) setErrors(prev => ({ ...prev, streetAddress: "" }));
                      }}
                      placeholder="Street address"
                      className={`text-lg min-h-[50px] ${errors.streetAddress ? 'border-red-500' : ''}`}
                      data-testid="input-street-address"
                      required
                    />
                    {errors.streetAddress && (
                      <p className="text-red-600 text-sm mt-1">{errors.streetAddress}</p>
                    )}
                  </div>
                  <Input
                    type="text"
                    value={formData.city}
                    disabled
                    placeholder="City"
                    className="text-lg min-h-[50px] bg-gray-100 input-city-disabled"
                    data-testid="input-city-disabled"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      value={formData.state}
                      disabled
                      placeholder="State"
                      className="text-lg min-h-[50px] bg-gray-100 input-state-disabled"
                      data-testid="input-state-disabled"
                    />
                    <Input
                      type="text"
                      value={formData.zipCode}
                      disabled
                      placeholder="ZIP"
                      className="text-lg min-h-[50px] bg-gray-100 input-zip-disabled"
                      data-testid="input-zip-disabled"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-street-address"
                    data-testid="button-submit-street-address"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {/* Q15: County */}
            {step === 15 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Select your county
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.city}, {formData.state}
                  </p>
                </div>
                <form onSubmit={handleCountySubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <Input
                      type="text"
                      list="county-list"
                      value={formData.county}
                      onChange={(e) => {
                        setFormData({ ...formData, county: e.target.value });
                        if (errors.county) setErrors(prev => ({ ...prev, county: "" }));
                      }}
                      placeholder={availableCounties.length > 0 ? "Select or type your county" : "Type your county"}
                      className={`text-lg min-h-[50px] ${errors.county ? 'border-red-500' : ''}`}
                      data-testid="input-county"
                      required
                    />
                    {errors.county && (
                      <p className="text-red-600 text-sm mt-1">{errors.county}</p>
                    )}
                  </div>
                  <datalist id="county-list">
                    {availableCounties.map((county) => (
                      <option key={county} value={county} />
                    ))}
                  </datalist>
                  <Button 
                    type="submit" 
                    className="w-full min-h-[50px] text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] button-submit-county"
                    data-testid="button-submit-county"
                  >
                    Continue
                  </Button>
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
