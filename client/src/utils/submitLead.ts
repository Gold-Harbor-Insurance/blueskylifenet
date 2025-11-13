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

/**
 * Create a timeout promise that rejects after a specified duration
 * Used to prevent infinite loading in Facebook's in-app browser
 */
function createTimeout(ms: number, name: string): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`${name} timed out after ${ms}ms`));
    }, ms);
  });
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
  let loadingClosed = false;
  
  // Safety timeout: Force close loading modal after 30 seconds
  const safetyTimeout = setTimeout(() => {
    if (!loadingClosed) {
      console.warn('⚠️ Safety timeout reached - closing loading modal');
      loadingClosed = true;
      onLoadingChange(false);
      onError('Request timed out. Please call us directly at (877) 790-1817.');
    }
  }, 30000); // 30 second absolute maximum
  
  try {
    // Start loading state
    onLoadingChange(true);
    
    // Normalize partial payload to complete payload with all required fields
    const completePayload = buildWebhookPayload(webhookData);
    
    // Step 1: Fetch Ringba number with 15 second timeout (critical - blocks if fails)
    try {
      const ringbaData = await Promise.race([
        fetchRingbaNumber(
          hiddenInputNames,
          completePayload.external_id,
          completePayload.external_id_hashed
        ),
        createTimeout(15000, 'Ringba API')
      ]);
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
    
    // Step 2: Send webhook data with 10 second timeout (non-critical - continue even if fails)
    try {
      await Promise.race([
        sendWebhookData(completePayload),
        createTimeout(10000, 'Webhook')
      ]);
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
    // Clear the safety timeout
    clearTimeout(safetyTimeout);
    
    // Always stop loading state, no matter what happened (unless safety timeout already did)
    if (!loadingClosed) {
      loadingClosed = true;
      onLoadingChange(false);
    }
  }
}
