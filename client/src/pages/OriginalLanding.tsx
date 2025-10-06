import { useState } from "react";
import { useLocation } from "wouter";
import OriginalQuizLayout from "@/components/OriginalQuizLayout";
import OriginalQuizCard from "@/components/OriginalQuizCard";
import OriginalOptionButton from "@/components/OriginalOptionButton";

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
    <OriginalQuizLayout 
      headline="Just Announced For Seniors:"
      subheadline="Get up to $25,000 To Cover Funeral Costs and Unpaid Debt With This New Benefit"
    >
      <div className="text-center mb-6">
        <p className="text-lg md:text-xl text-black font-normal">
          Answer 3 Quick Questions Below to <span className="underline">Check Eligibility!</span>
        </p>
      </div>

      <OriginalQuizCard currentStep={step} totalSteps={totalSteps} questionNumber={step}>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-8">
              Tap Your Age
            </h2>
            <div className="grid gap-4">
              <OriginalOptionButton onClick={handleAgeSelect} testId="button-age-under54">
                Under 54
              </OriginalOptionButton>
              <OriginalOptionButton onClick={handleAgeSelect} testId="button-age-54-79">
                54 - 79
              </OriginalOptionButton>
              <OriginalOptionButton onClick={handleAgeSelect} testId="button-age-over80">
                Over 80
              </OriginalOptionButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-8">
              Are you a US citizen?
            </h2>
            <div className="grid gap-4">
              <OriginalOptionButton onClick={handleCitizenSelect} testId="button-citizen-yes">
                Yes
              </OriginalOptionButton>
              <OriginalOptionButton onClick={handleCitizenSelect} testId="button-citizen-no">
                No
              </OriginalOptionButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-8">
              Are you employed?
            </h2>
            <div className="grid gap-4">
              <OriginalOptionButton onClick={handleEmploymentSelect} testId="button-employed-yes">
                Yes
              </OriginalOptionButton>
              <OriginalOptionButton onClick={handleEmploymentSelect} testId="button-employed-no">
                No
              </OriginalOptionButton>
            </div>
          </div>
        )}
      </OriginalQuizCard>
    </OriginalQuizLayout>
  );
}
