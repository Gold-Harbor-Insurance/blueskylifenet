import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import StateSelector from "@/components/StateSelector";
import LegalModal from "@/components/LegalModal";
import ThankYouContent from "@/components/ThankYouContent";
import { FirstResponderAgency, USState, AgeRange, Beneficiary, CoverageAmount, MonthlyBudget } from "@shared/schema";
import { initFacebookTracking } from "@/utils/facebookTracking";
import { fetchRingbaNumber } from "@/utils/ringbaApi";

export default function FirstRespondersLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const [formData, setFormData] = useState({
    agency: "" as FirstResponderAgency | "",
    state: "" as USState | "",
    age: "" as AgeRange | "",
    beneficiary: "" as Beneficiary | "",
    coverage: "" as CoverageAmount | "",
    budget: "" as MonthlyBudget | "",
  });
  
  // Thank you page state
  const [timeLeft, setTimeLeft] = useState(142);
  const [phoneNumber, setPhoneNumber] = useState("(877) 790-1817");
  const [telLink, setTelLink] = useState("tel:+18777901817");
  const phoneRef = useRef<HTMLSpanElement>(null);
  const [isLoadingRingba, setIsLoadingRingba] = useState(false);

  useEffect(() => {
    initFacebookTracking();
  }, []);

  const totalSteps = 7;

  const handleAgencySelect = (agency: FirstResponderAgency) => {
    setFormData({ ...formData, agency });
    setTimeout(() => setStep(2), 300);
  };

  const handleStateSelect = (state: string) => {
    setFormData({ ...formData, state: state as USState });
    setTimeout(() => setStep(3), 300);
  };

  const handleAgeSelect = (age: AgeRange) => {
    setFormData({ ...formData, age });
    
    // Check if they qualify based on age
    if (age === "Under 45" || age === "Over 85") {
      setTimeout(() => setLocation("/not-qualified"), 300);
    } else {
      setTimeout(() => setStep(4), 300);
    }
  };

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData({ ...formData, beneficiary });
    setTimeout(() => setStep(5), 300);
  };

  const handleCoverageSelect = (coverage: CoverageAmount) => {
    setFormData({ ...formData, coverage });
    setTimeout(() => setStep(6), 300);
  };

  const handleBudgetSelect = async (budget: MonthlyBudget) => {
    setFormData({ ...formData, budget });
    setIsLoadingRingba(true);
    
    setTimeout(async () => {
      const hiddenInputNames = [
        'first_responder_agency',
        'state',
        'age_classification',
        'beneficiary',
        'coverage_amount',
        'monthly_budget'
      ];
      
      const ringbaData = await fetchRingbaNumber(hiddenInputNames);
      setPhoneNumber(ringbaData.phoneNumber);
      setTelLink(ringbaData.telLink);
      setIsLoadingRingba(false);
      setStep(7);
    }, 300);
  };
  
  // Timer effect for thank you page
  useEffect(() => {
    if (step === 7) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const progress = (step / totalSteps) * 100;

  if (step === 1) {
    return (
      <>
        {/* Hidden inputs for GTM tracking - persist across all steps */}
        <input 
          type="hidden" 
          id="age-classification" 
          value={formData.age}
        />
        <input 
          type="hidden" 
          id="budget-classification" 
          value={formData.budget}
        />
        <input type="hidden" name="first_responder_agency" value={formData.agency} />
        <input type="hidden" name="state" value={formData.state} />
        <input type="hidden" name="age_classification" value={formData.age} />
        <input type="hidden" name="beneficiary" value={formData.beneficiary} />
        <input type="hidden" name="coverage_amount" value={formData.coverage} />
        <input type="hidden" name="monthly_budget" value={formData.budget} />
        
        <QuizLayout 
          headline="JUST ANNOUNCED FOR FIRST RESPONDERS"
          subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt"
        >
          <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
            <div className="space-y-4">
              <div className="text-center mb-3">
                <p className="text-base md:text-lg text-black mb-3">
                  Answer a 6 Quick Questions Below to <span className="underline font-semibold">Check Eligibility!</span>
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  What agency are you with?
                </h2>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => handleAgencySelect("Law enforcement")}
                  data-testid="first_responder_police"
                  className="first_responder_police w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Law enforcement
                </button>
                <button
                  type="button"
                  onClick={() => handleAgencySelect("Fire and rescue")}
                  data-testid="first_responder_fire"
                  className="first_responder_fire w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Fire and rescue
                </button>
                <button
                  type="button"
                  onClick={() => handleAgencySelect("Emergency Medical Services")}
                  data-testid="first_responder_ems"
                  className="first_responder_ems w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Emergency Medical Services
                </button>
                <button
                  type="button"
                  onClick={() => handleAgencySelect("Public safety communications")}
                  data-testid="first_responder_psc"
                  className="first_responder_psc w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Public safety communications
                </button>
                <button
                  type="button"
                  onClick={() => handleAgencySelect("Other critical first responders")}
                  data-testid="first_responder_other"
                  className="first_responder_other w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Other critical first responders
                </button>
              </div>
            </div>
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
              © 2025 Gold Harbor Insurance LLC. All Rights Reserved.
            </p>
          </div>
        </QuizLayout>
        
        <LegalModal
          isOpen={legalModal !== null}
          onClose={() => setLegalModal(null)}
          type={legalModal}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-12 px-4">
      {/* Hidden inputs for GTM tracking - persist across all steps */}
      <input 
        type="hidden" 
        id="age-classification" 
        value={formData.age}
      />
      <input 
        type="hidden" 
        id="budget-classification" 
        value={formData.budget}
      />
      <input type="hidden" name="first_responder_agency" value={formData.agency} />
      <input type="hidden" name="state" value={formData.state} />
      <input type="hidden" name="age_classification" value={formData.age} />
      <input type="hidden" name="beneficiary" value={formData.beneficiary} />
      <input type="hidden" name="coverage_amount" value={formData.coverage} />
      <input type="hidden" name="monthly_budget" value={formData.budget} />
      
      {step === 2 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Question {step}/{totalSteps}</p>
            <div className="w-full max-w-md mx-auto bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#5CB85C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Select Your State
          </h2>
          <div className="max-w-md mx-auto">
            <StateSelector value={formData.state} onValueChange={handleStateSelect} />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Question {step}/{totalSteps}</p>
            <div className="w-full max-w-md mx-auto bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#5CB85C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Tap Your Age
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleAgeSelect("Under 45")}
              data-testid="age_classification_under45"
              className="age_classification_under45 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Under 45
            </button>
            <button
              type="button"
              onClick={() => handleAgeSelect("45-85")}
              data-testid="age_classification_45_85"
              className="age_classification_45_85 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              45-85
            </button>
            <button
              type="button"
              onClick={() => handleAgeSelect("Over 85")}
              data-testid="age_classification_over85"
              className="age_classification_over85 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Over 85
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Question {step}/{totalSteps}</p>
            <div className="w-full max-w-md mx-auto bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#5CB85C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Who would you want to receive this benefit?
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Spouse")}
              data-testid="beneficiary_spouse"
              className="beneficiary_spouse w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Spouse
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Children")}
              data-testid="beneficiary_children"
              className="beneficiary_children w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Children
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Grandchildren")}
              data-testid="beneficiary_grandchildren"
              className="beneficiary_grandchildren w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Grandchildren
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Family Member")}
              data-testid="beneficiary_family"
              className="beneficiary_family w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Family Member
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Question {step}/{totalSteps}</p>
            <div className="w-full max-w-md mx-auto bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#5CB85C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            How much coverage would you like to leave behind for your family?
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleCoverageSelect("Under $10,000")}
              data-testid="coverage_amount_under10k"
              className="coverage_amount_under10k w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Under $10,000
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("$10,000-$24,999")}
              data-testid="coverage_amount_10k_25k"
              className="coverage_amount_10k_25k w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $10,000-$24,999
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("$25,000-$50,000")}
              data-testid="coverage_amount_25k_50k"
              className="coverage_amount_25k_50k w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $25,000-$50,000
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("Over $50,000")}
              data-testid="coverage_amount_over50k"
              className="coverage_amount_over50k w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Over $50,000
            </button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Question {step}/{totalSteps}</p>
            <div className="w-full max-w-md mx-auto bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#5CB85C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            If it makes sense, what monthly budget would you feel comfortable investing to protect your family?
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleBudgetSelect("Less than $50/month")}
              data-testid="monthly_budget_under50"
              className="monthly_budget_under50 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Less than $50/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$50–$74/month")}
              data-testid="monthly_budget_50_74"
              className="monthly_budget_50_74 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $50–$74/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$75–$99/month")}
              data-testid="monthly_budget_75_99"
              className="monthly_budget_75_99 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $75–$99/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$100–$149/month")}
              data-testid="monthly_budget_100_149"
              className="monthly_budget_100_149 w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $100–$149/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$150+/month")}
              data-testid="monthly_budget_150plus"
              className="monthly_budget_150plus w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $150+/month
            </button>
          </div>
        </div>
      )}

      {isLoadingRingba && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" role="status" aria-live="polite">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-2xl">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#5CB85C] border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
              <p className="text-xl font-semibold text-black">
                Processing your information...
              </p>
              <p className="text-sm text-gray-600">
                Please wait while we prepare your personalized quote
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 7 && !isLoadingRingba && (
        <ThankYouContent
          timeLeft={timeLeft}
          phoneNumber={phoneNumber}
          telLink={telLink}
          phoneRef={phoneRef}
          ageClassification={formData.age}
          budgetClassification={formData.budget}
        />
      )}
    </div>
  );
}
