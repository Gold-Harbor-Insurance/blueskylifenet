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

  const progress = (step / totalSteps) * 100;

  if (step === 1) {
    return (
      <QuizLayout 
        headline="JUST ANNOUNCED FOR SENIORS"
        subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt"
      >
        <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
          <div className="space-y-6">
            <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
              <div 
                className="bg-[#5CB85C] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mb-4">
              <p className="text-base md:text-lg text-black mb-4">
                Answer a 5 Quick Questions Below to <span className="underline font-semibold">Check Eligibility!</span>
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Tap Your Age
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
              <button
                type="button"
                onClick={() => handleAgeSelect("Under 45")}
                data-testid="button-age-under45"
                className="w-full md:w-auto min-w-[160px] min-h-[50px] px-8 text-lg md:text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
              >
                Under 54
              </button>
              <button
                type="button"
                onClick={() => handleAgeSelect("45-85")}
                data-testid="button-age-45-85"
                className="w-full md:w-auto min-w-[160px] min-h-[50px] px-8 text-lg md:text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
              >
                54 - 79
              </button>
              <button
                type="button"
                onClick={() => handleAgeSelect("Over 85")}
                data-testid="button-age-over85"
                className="w-full md:w-auto min-w-[160px] min-h-[50px] px-8 text-lg md:text-xl font-bold bg-[#5CB85C] hover:bg-[#4CAF50] text-white rounded-full shadow-md transition-colors duration-200"
              >
                Over 80
              </button>
            </div>
          </div>
        </QuizCard>
      </QuizLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-12 px-4">
      {step === 2 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="text-sm text-gray-600">Question {step}/{totalSteps}</p>
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
          <p className="text-sm text-gray-600">Question {step}/{totalSteps}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Who would you want to receive this benefit?
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Spouse")}
              data-testid="button-beneficiary-spouse"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Spouse
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Children")}
              data-testid="button-beneficiary-children"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Children
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Grandchildren")}
              data-testid="button-beneficiary-grandchildren"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Grandchildren
            </button>
            <button
              type="button"
              onClick={() => handleBeneficiarySelect("Family Member")}
              data-testid="button-beneficiary-family"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Family Member
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="text-sm text-gray-600">Question {step}/{totalSteps}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            How much coverage would you like to leave behind for your family?
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleCoverageSelect("Under $10,000")}
              data-testid="button-coverage-under10k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Under $10,000
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("$10,000-$24,999")}
              data-testid="button-coverage-10k-25k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              $10,000-$24,999
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("$25,000-$50,000")}
              data-testid="button-coverage-25k-50k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              $25,000-$50,000
            </button>
            <button
              type="button"
              onClick={() => handleCoverageSelect("Over $50,000")}
              data-testid="button-coverage-over50k"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Over $50,000
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="text-sm text-gray-600">Question {step}/{totalSteps}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            If it makes sense, what monthly budget would you feel comfortable investing to protect your family?
          </h2>
          <div className="max-w-md mx-auto grid gap-3">
            <button
              type="button"
              onClick={() => handleBudgetSelect("Less than $50/month")}
              data-testid="button-budget-under50"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              Less than $50/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$50–$74/month")}
              data-testid="button-budget-50-74"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              $50–$74/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$75–$99/month")}
              data-testid="button-budget-75-99"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              $75–$99/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$100–$149/month")}
              data-testid="button-budget-100-149"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              $100–$149/month
            </button>
            <button
              type="button"
              onClick={() => handleBudgetSelect("$150+/month")}
              data-testid="button-budget-150plus"
              className="w-full min-h-[50px] px-6 text-lg font-semibold bg-[#4306D5] hover:bg-[#3805B0] text-white rounded-md transition-colors duration-200"
            >
              $150+/month
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
