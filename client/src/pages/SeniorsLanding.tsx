import { useState } from "react";
import { useLocation } from "wouter";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import OptionButton from "@/components/OptionButton";
import StateSelector from "@/components/StateSelector";
import { USState, AgeRange, Beneficiary, CoverageAmount, MonthlyBudget } from "@shared/schema";

export default function SeniorsLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: "" as USState | "",
    age: "" as AgeRange | "",
    beneficiary: "" as Beneficiary | "",
    coverage: "" as CoverageAmount | "",
    budget: "" as MonthlyBudget | "",
  });

  const totalSteps = 5;

  const handleAgeSelect = (age: AgeRange) => {
    setFormData({ ...formData, age });
    setTimeout(() => setStep(2), 300);
  };

  const handleStateSelect = (state: string) => {
    setFormData({ ...formData, state: state as USState });
    setTimeout(() => setStep(3), 300);
  };

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData({ ...formData, beneficiary });
    setTimeout(() => setStep(4), 300);
  };

  const handleCoverageSelect = (coverage: CoverageAmount) => {
    setFormData({ ...formData, coverage });
    setTimeout(() => setStep(5), 300);
  };

  const handleBudgetSelect = (budget: MonthlyBudget) => {
    setFormData({ ...formData, budget });
    setTimeout(() => setLocation("/thank-you"), 500);
  };

  return (
    <QuizLayout 
      headline="JUST ANNOUNCED FOR SENIORS"
      subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt"
    >
      <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                Answer 3 Quick Questions Below to Check Eligibility!
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Tap Your Age
              </h2>
            </div>
            <div className="grid gap-4">
              <button
                type="button"
                onClick={() => handleAgeSelect("Under 45")}
                data-testid="button-age-under45"
                className="w-full min-h-[60px] px-8 text-lg md:text-xl font-semibold bg-[#59B555] hover:bg-[#4A9A47] text-white rounded-full shadow-md transition-colors duration-200"
              >
                Under 45
              </button>
              <button
                type="button"
                onClick={() => handleAgeSelect("45-85")}
                data-testid="button-age-45-85"
                className="w-full min-h-[60px] px-8 text-lg md:text-xl font-semibold bg-[#59B555] hover:bg-[#4A9A47] text-white rounded-full shadow-md transition-colors duration-200"
              >
                45-85
              </button>
              <button
                type="button"
                onClick={() => handleAgeSelect("Over 85")}
                data-testid="button-age-over85"
                className="w-full min-h-[60px] px-8 text-lg md:text-xl font-semibold bg-[#59B555] hover:bg-[#4A9A47] text-white rounded-full shadow-md transition-colors duration-200"
              >
                Over 85
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Select Your State
            </h2>
            <StateSelector value={formData.state} onValueChange={handleStateSelect} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Who would you want to receive this benefit?
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={() => handleBeneficiarySelect("Spouse")} testId="button-beneficiary-spouse">
                Spouse
              </OptionButton>
              <OptionButton onClick={() => handleBeneficiarySelect("Children")} testId="button-beneficiary-children">
                Children
              </OptionButton>
              <OptionButton onClick={() => handleBeneficiarySelect("Grandchildren")} testId="button-beneficiary-grandchildren">
                Grandchildren
              </OptionButton>
              <OptionButton onClick={() => handleBeneficiarySelect("Family Member")} testId="button-beneficiary-family">
                Family Member
              </OptionButton>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              How much coverage would you like to leave behind for your family?
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={() => handleCoverageSelect("Under $10,000")} testId="button-coverage-under10k">
                Under $10,000
              </OptionButton>
              <OptionButton onClick={() => handleCoverageSelect("$10,000-$24,999")} testId="button-coverage-10k-25k">
                $10,000-$24,999
              </OptionButton>
              <OptionButton onClick={() => handleCoverageSelect("$25,000-$50,000")} testId="button-coverage-25k-50k">
                $25,000-$50,000
              </OptionButton>
              <OptionButton onClick={() => handleCoverageSelect("Over $50,000")} testId="button-coverage-over50k">
                Over $50,000
              </OptionButton>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              If it makes sense, what monthly budget would you feel comfortable investing to protect your family?
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={() => handleBudgetSelect("Less than $50/month")} testId="button-budget-under50">
                Less than $50/month
              </OptionButton>
              <OptionButton onClick={() => handleBudgetSelect("$50–$74/month")} testId="button-budget-50-74">
                $50–$74/month
              </OptionButton>
              <OptionButton onClick={() => handleBudgetSelect("$75–$99/month")} testId="button-budget-75-99">
                $75–$99/month
              </OptionButton>
              <OptionButton onClick={() => handleBudgetSelect("$100–$149/month")} testId="button-budget-100-149">
                $100–$149/month
              </OptionButton>
              <OptionButton onClick={() => handleBudgetSelect("$150+/month")} testId="button-budget-150plus">
                $150+/month
              </OptionButton>
            </div>
          </div>
        )}
      </QuizCard>
    </QuizLayout>
  );
}
