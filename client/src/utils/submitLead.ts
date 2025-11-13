import { fetchRingbaNumber } from './ringbaApi';
import { sendWebhookData } from './webhookApi';
import { buildWebhookPayload, type PartialWebhookPayload } from './webhookPayload';

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

interface SubmitLeadResult {
  success: boolean;
  phoneNumber: string;
  telLink: string;
  ringbaError?: boolean;
  webhookError?: boolean;
}

export async function submitLead(
  hiddenInputNames: string[],
  webhookData: WebhookData,
  leadData: LeadData,
  onLoadingChange: (loading: boolean) => void,
  onSuccess: (phoneNumber: string, telLink: string) => void,
  onError: (message: string) => void
): Promise<void> {
  let ringbaSucceeded = false;
  let phoneNumber = '(877) 790-1817'; // Fallback phone
  let telLink = 'tel:+18777901817';
  
  try {
    // Start loading state
    onLoadingChange(true);
    
    // Step 1: Fetch Ringba number (critical - blocks if fails)
    try {
      const ringbaData = await fetchRingbaNumber(hiddenInputNames);
      phoneNumber = ringbaData.phoneNumber;
      telLink = ringbaData.telLink;
      ringbaSucceeded = true;
    } catch (error) {
      console.error('Ringba API failed:', error);
      // Use fallback phone number (already set above)
      onError('We\'re experiencing technical difficulties. Please call us directly at (877) 790-1817.');
      // Don't advance to thank you page if Ringba fails
      return;
    }
    
    // Step 2: Send webhook data (non-critical - continue even if fails)
    try {
      // Normalize partial payload to complete payload with all required fields
      const completePayload = buildWebhookPayload(webhookData);
      await sendWebhookData(completePayload);
    } catch (error) {
      console.error('Webhook failed (non-critical):', error);
      // Continue to thank you page even if webhook fails
    }
    
    // Step 3: Push to GTM dataLayer for Facebook Pixel
    try {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'lead',
          fn: leadData.firstName,
          ln: leadData.lastName,
          em: leadData.email,
          ph: leadData.phone,
          ct: leadData.city,
          st: leadData.state,
          zp: leadData.zipCode,
          country_id: 'US'
        });
      }
    } catch (error) {
      console.error('GTM dataLayer push failed:', error);
      // Continue anyway - tracking failure shouldn't block user
    }
    
    // Success! Pass phone data and advance to thank you page
    onSuccess(phoneNumber, telLink);
    
  } finally {
    // Always stop loading state, no matter what happened
    onLoadingChange(false);
  }
}
