import { useState } from "react";
import { useLocation } from "wouter";
import QuizLayout from "@/components/QuizLayout";
import QuizCard from "@/components/QuizCard";
import OptionButton from "@/components/OptionButton";

export default function OriginalLanding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);

  const totalSteps = 3;

  const handleAgeSelect = () => {
    setTimeout(() => setStep(2), 300);
  };

  const handleCitizenSelect = () => {
    setTimeout(() => setStep(3), 300);
  };

  const handleEmploymentSelect = () => {
    setTimeout(() => setLocation("/thank-you"), 500);
  };

  return (
    <QuizLayout 
      headline="JUST ANNOUNCED FOR SENIORS"
      subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt With This New Benefit"
    >
      <div className="text-center mb-6">
        <p className="text-xl md:text-2xl text-white font-semibold">
          Answer 3 Quick Questions Below to Check Eligibility!
        </p>
      </div>

      <QuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Tap Your Age
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={handleAgeSelect} testId="button-age-under54">
                Under 54
              </OptionButton>
              <OptionButton onClick={handleAgeSelect} testId="button-age-54-79">
                54 - 79
              </OptionButton>
              <OptionButton onClick={handleAgeSelect} testId="button-age-over80">
                Over 80
              </OptionButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Are you a US citizen?
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={handleCitizenSelect} testId="button-citizen-yes">
                Yes
              </OptionButton>
              <OptionButton onClick={handleCitizenSelect} testId="button-citizen-no">
                No
              </OptionButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-6">
              Are you employed?
            </h2>
            <div className="grid gap-4">
              <OptionButton onClick={handleEmploymentSelect} testId="button-employed-yes">
                Yes
              </OptionButton>
              <OptionButton onClick={handleEmploymentSelect} testId="button-employed-no">
                No
              </OptionButton>
            </div>
          </div>
        )}
      </QuizCard>
    </QuizLayout>
  );
}
