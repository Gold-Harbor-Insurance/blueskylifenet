import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, Anchor, Plane, Waves, Rocket } from "lucide-react";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import OptionButton from "@/components/OptionButton";
import StateSelector from "@/components/StateSelector";
import { MilitaryBranch, USState, AgeRange, Beneficiary, CoverageAmount, MonthlyBudget } from "@shared/schema";

export default function VeteransLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    militaryBranch: "" as MilitaryBranch | "",
    state: "" as USState | "",
    age: "" as AgeRange | "",
    beneficiary: "" as Beneficiary | "",
    coverage: "" as CoverageAmount | "",
    budget: "" as MonthlyBudget | "",
  });

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

  return (
    <QuizLayout 
      headline="JUST ANNOUNCED FOR VETERANS"
      subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt"
    >
      <div className="text-center mb-6">
        <p className="text-xl md:text-2xl text-foreground font-semibold">
          Answer Quick Questions Below to Check Eligibility!
        </p>
      </div>

      <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              What branch did you serve in?
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={() => handleBranchSelect("Army")} icon={<Shield />} testId="button-branch-army">
                Army
              </OptionButton>
              <OptionButton onClick={() => handleBranchSelect("Marine Corps")} icon={<Anchor />} testId="button-branch-marines">
                Marine Corps
              </OptionButton>
              <OptionButton onClick={() => handleBranchSelect("Navy")} icon={<Anchor />} testId="button-branch-navy">
                Navy
              </OptionButton>
              <OptionButton onClick={() => handleBranchSelect("Air Force")} icon={<Plane />} testId="button-branch-airforce">
                Air Force
              </OptionButton>
              <OptionButton onClick={() => handleBranchSelect("Coast Guard")} icon={<Waves />} testId="button-branch-coastguard">
                Coast Guard
              </OptionButton>
              <OptionButton onClick={() => handleBranchSelect("Space Force")} icon={<Rocket />} testId="button-branch-spaceforce">
                Space Force
              </OptionButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Select your state
            </h2>
            <StateSelector value={formData.state} onValueChange={handleStateSelect} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Tap Your Age
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={() => handleAgeSelect("Under 45")} testId="button-age-under45">
                Under 45
              </OptionButton>
              <OptionButton onClick={() => handleAgeSelect("45-85")} testId="button-age-45-85">
                45-85
              </OptionButton>
              <OptionButton onClick={() => handleAgeSelect("Over 85")} testId="button-age-over85">
                Over 85
              </OptionButton>
            </div>
          </div>
        )}

        {step === 4 && (
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

        {step === 5 && (
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

        {step === 6 && (
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
