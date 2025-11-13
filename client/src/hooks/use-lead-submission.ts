import { useState } from "react";
import { submitLead } from "@/utils/submitLead";
import { useToast } from "@/hooks/use-toast";
import type { PartialWebhookPayload } from "@/utils/webhookPayload";

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
}

// Use the partial payload type for cleaner landing page code
type WebhookData = PartialWebhookPayload;

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
