import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import StateSelector from "@/components/StateSelector";
import LegalModal from "@/components/LegalModal";
import { MilitaryBranch, USState, AgeRange, Beneficiary, CoverageAmount, MonthlyBudget } from "@shared/schema";
import { initFacebookTracking } from "@/utils/facebookTracking";

export default function VeteransLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const [formData, setFormData] = useState({
    militaryBranch: "" as MilitaryBranch | "",
    state: "" as USState | "",
    age: "" as AgeRange | "",
    beneficiary: "" as Beneficiary | "",
    coverage: "" as CoverageAmount | "",
    budget: "" as MonthlyBudget | "",
  });

  useEffect(() => {
    initFacebookTracking();
  }, []);

  const totalSteps = 6;

  const handleBranchSelect = (branch: MilitaryBranch) => {
    setFormData({ ...formData, militaryBranch: branch });
    setTimeout(() => setStep(2), 300);
  };

  const handleStateSelect = (state: string) => {
    setFormData({ ...formData, state: state as USState });
    setTimeout(() => setStep(3), 300);
  };

  const handleAgeSelect = (age: AgeRange) => {
    setFormData({ ...formData, age });
    setTimeout(() => setStep(4), 300);
  };

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData({ ...formData, beneficiary });
    setTimeout(() => setStep(5), 300);
  };

  const handleCoverageSelect = (coverage: CoverageAmount) => {
    setFormData({ ...formData, coverage });
    setTimeout(() => setStep(6), 300);
  };

  const handleBudgetSelect = (budget: MonthlyBudget) => {
    setFormData({ ...formData, budget });
    setTimeout(() => setLocation("/thank-you"), 500);
  };

  const progress = ((step - 1) / totalSteps) * 100;

  if (step === 1) {
    return (
      <>
        <QuizLayout 
          headline="JUST ANNOUNCED FOR VETERANS"
          subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt"
        >
          <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
            <div className="space-y-4">
              <div className="text-center mb-3">
                <p className="text-base md:text-lg text-black mb-3">
                  Answer a 6 Quick Questions Below to <span className="underline font-semibold">Check Eligibility!</span>
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  What branch did you serve in?
                </h2>
              </div>
              <div className="grid gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => handleBranchSelect("Army")}
                  data-testid="button-branch-army"
                  className="w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Army
                </button>
                <button
                  type="button"
                  onClick={() => handleBranchSelect("Marine Corps")}
                  data-testid="button-branch-marines"
                  className="w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Marine Corps
                </button>
                <button
                  type="button"
                  onClick={() => handleBranchSelect("Navy")}
                  data-testid="button-branch-navy"
                  className="w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Navy
                </button>
                <button
                  type="button"
                  onClick={() => handleBranchSelect("Air Force")}
                  data-testid="button-branch-airforce"
                  className="w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Air Force
                </button>
                <button
                  type="button"
                  onClick={() => handleBranchSelect("Coast Guard")}
                  data-testid="button-branch-coastguard"
                  className="w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Coast Guard
                </button>
                <button
                  type="button"
                  onClick={() => handleBranchSelect("Space Force")}
                  data-testid="button-branch-spaceforce"
                  className="w-full min-h-[60px] px-10 text-xl md:text-2xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
                >
                  Space Force
                </button>
              </div>
            </div>
          </QuizCard>
          
          <div className="mt-32 pb-8 text-center text-sm text-gray-600">
            <div className="space-x-2">
              <button
                onClick={() => setLegalModal("privacy")}
                className="hover:underline"
                data-testid="link-privacy-policy"
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button
                onClick={() => setLegalModal("terms")}
                className="hover:underline"
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
              data-testid="button-age-under45"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Under 45
            </button>
            <button
              type="button"
              onClick={() => handleAgeSelect("45-85")}
              data-testid="button-age-45-85"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              45-85
            </button>
            <button
              type="button"
              onClick={() => handleAgeSelect("Over 85")}
              data-testid="button-age-over85"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
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
              data-testid="button-beneficiary-spouse"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Spouse
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Children")}
              data-testid="button-beneficiary-children"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Children
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Grandchildren")}
              data-testid="button-beneficiary-grandchildren"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Grandchildren
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Family Member")}
              data-testid="button-beneficiary-family"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
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
              data-testid="button-coverage-under10k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Under $10,000
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("$10,000-$24,999")}
              data-testid="button-coverage-10k-25k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $10,000-$24,999
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("$25,000-$50,000")}
              data-testid="button-coverage-25k-50k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $25,000-$50,000
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("Over $50,000")}
              data-testid="button-coverage-over50k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
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
              data-testid="button-budget-under50"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              Less than $50/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$50–$74/month")}
              data-testid="button-budget-50-74"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $50–$74/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$75–$99/month")}
              data-testid="button-budget-75-99"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $75–$99/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$100–$149/month")}
              data-testid="button-budget-100-149"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $100–$149/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$150+/month")}
              data-testid="button-budget-150plus"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-md transition-colors duration-200"
            >
              $150+/month
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
