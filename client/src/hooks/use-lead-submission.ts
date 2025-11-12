import { useState } from "react";
import { submitLead } from "@/utils/submitLead";
import { useToast } from "@/hooks/use-toast";

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
}

interface WebhookData {
  angle: 'seniors' | 'veterans' | 'firstresponders';
  military_branch?: string;
  first_responder_agency?: string;
  zip_code: string;
  gender: string;
  life_insurance: string;
  coverage_amount: string;
  beneficiary: string;
  age: string;
  beneficiary_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  monthly_budget: string;
  landing_page: 'seniors' | 'veterans' | 'first_responders';
  submitted_at: string;
}

export function useLeadSubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (
    hiddenInputNames: string[],
    webhookData: WebhookData,
    leadData: LeadData,
    onSuccess: (phoneNumber: string, telLink: string) => void
  ) => {
    await submitLead(
      hiddenInputNames,
      webhookData,
      leadData,
      setIsLoading,
      onSuccess,
      (errorMessage) => {
        toast({
          title: "Submission Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
    );
  };

  return {
    submit,
    isLoading
  };
}
