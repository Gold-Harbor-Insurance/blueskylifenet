import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import LegalModal from "@/components/LegalModal";
import ThankYouContent from "@/components/ThankYouContent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { initFacebookTracking } from "@/utils/facebookTracking";
import { fetchRingbaNumber } from "@/utils/ringbaApi";
import { lookupZipCode } from "@/utils/zipCodeLookup";
import { getCountiesByState } from "@/utils/countyData";
import type { 
  MilitaryBranch,
  Gender, 
  LifeInsuranceStatus, 
  CashAmount, 
  Beneficiary, 
  AgeRange,
  USState 
} from "@shared/schema";

export default function VeteransLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const [isLoadingRingba, setIsLoadingRingba] = useState(false);
  const [isLoadingZip, setIsLoadingZip] = useState(false);
  const [availableCounties, setAvailableCounties] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    militaryBranch: "" as MilitaryBranch | "",
    gender: "" as Gender | "",
    hasLifeInsurance: "" as LifeInsuranceStatus | "",
    cashAmount: "" as CashAmount | "",
    beneficiary: "" as Beneficiary | "",
    age: "" as AgeRange | "",
    beneficiaryName: "",
    hobby: "",
    firstName: "",
    lastName: "",
    zipCode: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "" as USState | "",
    county: "",
  });
  
  // Thank you page state
  const [timeLeft, setTimeLeft] = useState(142);
  const [phoneNumber, setPhoneNumber] = useState("(877) 790-1817");
  const [telLink, setTelLink] = useState("tel:+18777901817");
  const phoneRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    initFacebookTracking();
  }, []);

  const totalSteps = 17; // Military branch + 15 questions + thank you page

  // Q1: Military Branch (Veterans-specific)
  const handleMilitaryBranchSelect = (branch: MilitaryBranch) => {
    setFormData({ ...formData, militaryBranch: branch });
    setTimeout(() => setStep(2), 300);
  };

  // Q2: Gender
  const handleGenderSelect = (gender: Gender) => {
    setFormData({ ...formData, gender });
    setTimeout(() => setStep(3), 300);
  };

  // Q3: Has Life Insurance
  const handleLifeInsuranceSelect = (hasLifeInsurance: LifeInsuranceStatus) => {
    setFormData({ ...formData, hasLifeInsurance });
    setTimeout(() => setStep(4), 300);
  };

  // Q4: Cash Amount
  const handleCashAmountSelect = (cashAmount: CashAmount) => {
    setFormData({ ...formData, cashAmount });
    setTimeout(() => setStep(5), 300);
  };

  // Q5: Beneficiary
  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData({ ...formData, beneficiary });
    setTimeout(() => setStep(6), 300);
  };

  // Q6: Age (ALL ages now accepted - no disqualification)
  const handleAgeSelect = (age: AgeRange) => {
    setFormData({ ...formData, age });
    setTimeout(() => setStep(7), 300);
  };

  // Q7: Beneficiary Name
  const handleBeneficiaryNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.beneficiaryName.trim()) {
      setTimeout(() => setStep(8), 300);
    }
  };

  // Q8: Hobby
  const handleHobbySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hobby.trim()) {
      setTimeout(() => setStep(9), 300);
    }
  };

  // Q9: First Name
  const handleFirstNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName.trim()) {
      setTimeout(() => setStep(10), 300);
    }
  };

  // Q10: Last Name
  const handleLastNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.lastName.trim()) {
      setTimeout(() => setStep(11), 300);
    }
  };

  // Q11: Zip Code (with auto-population of city/state)
  const handleZipCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.zipCode.match(/^\d{5}$/)) {
      setIsLoadingZip(true);
      const zipData = await lookupZipCode(formData.zipCode);
      
      if (zipData) {
        setFormData({
          ...formData,
          city: zipData.city,
          state: zipData.state as USState,
        });
        // Update available counties for the state
        const counties = getCountiesByState(zipData.state);
        setAvailableCounties(counties);
      }
      
      setIsLoadingZip(false);
      setTimeout(() => setStep(12), 300);
    }
  };

  // Q12: Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(formData.email)) {
      setTimeout(() => setStep(13), 300);
    }
  };

  // Q13: Phone
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
      setTimeout(() => setStep(14), 300);
    }
  };

  // Q14: Street Address
  const handleStreetAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.streetAddress.trim()) {
      setTimeout(() => setStep(15), 300);
    }
  };

  // Q15: City (pre-filled from zip, editable)
  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.city.trim()) {
      setTimeout(() => setStep(16), 300);
    }
  };

  // Q16: County
  const handleCountySelect = async (county: string) => {
    setFormData({ ...formData, county });
    setIsLoadingRingba(true);
    
    setTimeout(async () => {
      const hiddenInputNames = [
        'military_branch',
        'gender',
        'has_life_insurance',
        'cash_amount',
        'beneficiary',
        'age_classification',
        'beneficiary_name',
        'hobby',
        'first_name',
        'last_name',
        'zip_code',
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
      setIsLoadingRingba(false);
      setStep(17);
    }, 300);
  };
  
  // Timer effect for thank you page
  useEffect(() => {
    if (step === 17) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
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
  };

  const progress = (step / totalSteps) * 100;

  return (
    <>
      {/* Hidden inputs for GTM tracking - ALWAYS rendered, persist across all steps */}
      <input type="hidden" name="military_branch" value={formData.militaryBranch} />
      <input type="hidden" name="gender" value={formData.gender} />
      <input type="hidden" name="has_life_insurance" value={formData.hasLifeInsurance} />
      <input type="hidden" name="cash_amount" value={formData.cashAmount} />
      <input type="hidden" name="beneficiary" value={formData.beneficiary} />
      <input type="hidden" name="age_classification" value={formData.age} />
      <input type="hidden" name="beneficiary_name" value={formData.beneficiaryName} />
      <input type="hidden" name="hobby" value={formData.hobby} />
      <input type="hidden" name="first_name" value={formData.firstName} />
      <input type="hidden" name="last_name" value={formData.lastName} />
      <input type="hidden" name="zip_code" value={formData.zipCode} />
      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="phone" value={formData.phone} />
      <input type="hidden" name="street_address" value={formData.streetAddress} />
      <input type="hidden" name="city" value={formData.city} />
      <input type="hidden" name="state" value={formData.state} />
      <input type="hidden" name="county" value={formData.county} />

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
          timeLeft={timeLeft}
          phoneNumber={phoneNumber}
          telLink={telLink}
          phoneRef={phoneRef}
        />
      ) : (
        <QuizLayout 
          headline="EXCLUSIVE FOR MILITARY VETERANS"
          subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt"
        >
          <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
            {/* Q1: Military Branch (Veterans-specific) */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <p className="text-base md:text-lg text-black mb-3">
                    Answer 16 Quick Questions Below to <span className="underline font-semibold">Check Eligibility!</span>
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Which branch of the military did you serve in?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["Army", "Marine Corps", "Navy", "Air Force", "Coast Guard", "Space Force"].map((branch) => (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => handleMilitaryBranchSelect(branch as MilitaryBranch)}
                      data-testid={`button-military-branch-${branch.replace(/\s+/g, '-').toLowerCase()}`}
                      className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("Female")}
                    data-testid="button-gender-female"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    Female
                  </button>
                </div>
              </div>
            )}

            {/* Q3: Has Life Insurance */}
            {step === 3 && (
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
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md shadow-md transition-colors duration-200"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLifeInsuranceSelect("No")}
                    data-testid="button-life-insurance-no"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md shadow-md transition-colors duration-200"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Q4: Cash Amount */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    How much cash do you have set aside for final expenses?
                  </h2>
                </div>
                <div className="max-w-md mx-auto grid gap-3">
                  {["$0-$5,000", "$5,000-$10,000", "$10,000-$15,000", "$15,000-$20,000", "$20,000+"].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleCashAmountSelect(amount as CashAmount)}
                      data-testid={`button-cash-${amount.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                      className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q5: Beneficiary */}
            {step === 5 && (
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
                      className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
                    >
                      {ben}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q6: Age (NO disqualification - all ages accepted) */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your age range?
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
                  <button
                    type="button"
                    onClick={() => handleAgeSelect("Under 45")}
                    data-testid="button-age-under-45"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    Under 45
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAgeSelect("45-85")}
                    data-testid="button-age-45-85"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    45-85
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAgeSelect("Over 85")}
                    data-testid="button-age-over-85"
                    className="w-full md:w-auto min-w-[180px] min-h-[60px] px-10 text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                  >
                    Over 85
                  </button>
                </div>
              </div>
            )}

            {/* Q7-16: Same questions as Seniors (beneficiary name through county) */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your beneficiary's name?
                  </h2>
                </div>
                <form onSubmit={handleBeneficiaryNameSubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.beneficiaryName}
                    onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                    placeholder="Enter beneficiary name"
                    className="text-lg min-h-[50px]"
                    data-testid="input-beneficiary-name"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-beneficiary-name"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your favorite hobby or activity?
                  </h2>
                </div>
                <form onSubmit={handleHobbySubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.hobby}
                    onChange={(e) => setFormData({ ...formData, hobby: e.target.value })}
                    placeholder="Enter your hobby"
                    className="text-lg min-h-[50px]"
                    data-testid="input-hobby"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-hobby"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your first name?
                  </h2>
                </div>
                <form onSubmit={handleFirstNameSubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter your first name"
                    className="text-lg min-h-[50px]"
                    data-testid="input-first-name"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-first-name"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your last name?
                  </h2>
                </div>
                <form onSubmit={handleLastNameSubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Enter your last name"
                    className="text-lg min-h-[50px]"
                    data-testid="input-last-name"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-last-name"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your zip code?
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    We'll use this to auto-fill your city and state
                  </p>
                </div>
                <form onSubmit={handleZipCodeSubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').substring(0, 5);
                      setFormData({ ...formData, zipCode: value });
                    }}
                    placeholder="Enter 5-digit zip code"
                    className="text-lg min-h-[50px]"
                    data-testid="input-zip-code"
                    maxLength={5}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-zip-code"
                    disabled={isLoadingZip}
                  >
                    {isLoadingZip ? "Looking up..." : "Continue"}
                  </Button>
                </form>
              </div>
            )}

            {step === 12 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your email address?
                  </h2>
                </div>
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="text-lg min-h-[50px]"
                    data-testid="input-email"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-email"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 13 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your phone number?
                  </h2>
                </div>
                <form onSubmit={handlePhoneSubmit} className="max-w-md mx-auto">
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 555-5555"
                    className="text-lg min-h-[50px]"
                    data-testid="input-phone"
                    maxLength={14}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-phone"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 14 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    What is your street address?
                  </h2>
                </div>
                <form onSubmit={handleStreetAddressSubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="Enter your street address"
                    className="text-lg min-h-[50px]"
                    data-testid="input-street-address"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-street-address"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 15 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Confirm your city
                  </h2>
                  {formData.state && (
                    <p className="text-sm text-gray-600 mt-2">
                      State: {formData.state}
                    </p>
                  )}
                </div>
                <form onSubmit={handleCitySubmit} className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter your city"
                    className="text-lg min-h-[50px]"
                    data-testid="input-city"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 min-h-[50px] text-lg font-semibold bg-[#5CB85C] hover:bg-[#4CAF50]"
                    data-testid="button-submit-city"
                  >
                    Continue
                  </Button>
                </form>
              </div>
            )}

            {step === 16 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Select your county
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.city}, {formData.state}
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <Select onValueChange={handleCountySelect} value={formData.county}>
                    <SelectTrigger className="text-lg min-h-[50px]" data-testid="select-county">
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCounties.length > 0 ? (
                        availableCounties.map((county) => (
                          <SelectItem key={county} value={county} data-testid={`option-county-${county.replace(/\s+/g, '-').toLowerCase()}`}>
                            {county}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="Unknown" data-testid="option-county-unknown">Unknown County</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </QuizCard>
          
          <div className="mt-32 pb-8 text-center text-sm text-gray-600">
            <div className="space-x-2">
              <button
                onClick={() => setLegalModal("privacy")}
                className="link-privacy-policy hover:underline"
                data-testid="link-privacy-policy"
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button
                onClick={() => setLegalModal("terms")}
                className="link-terms-of-use hover:underline"
                data-testid="link-terms-of-use"
              >
                Terms of Use
              </button>
            </div>
            <p className="mt-2">
              © 2025 BlueSky Life. All Rights Reserved.
            </p>
          </div>
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
