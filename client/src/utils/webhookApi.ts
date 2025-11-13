import axios from 'axios';

interface WebhookPayload {
  // Core identification
  angle: 'seniors' | 'veterans' | 'firstresponders';
  landing_page: 'seniors' | 'veterans' | 'first_responders';
  submitted_at: string;
  
  // Angle-specific fields (always send, use empty string if not applicable)
  military_branch: string;  // Veterans only
  first_responder_agency: string;  // First Responders only
  
  // Quiz responses (always send all fields)
  gender: string;
  beneficiary: string;
  life_insurance: string;
  coverage_amount: string;  // NewsBreak flow only
  monthly_budget: string;  // NewsBreak flow only
  age: string;
  beneficiary_name: string;
  
  // Contact information
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  // Location data
  zip_code: string;
  city: string;
  state: string;
  county: string;
  
  // Tracking & identification (always send both versions)
  external_id: string;  // Non-hashed External ID for internal tracking
  external_id_hashed: string;  // SHA-256 hashed External ID for Facebook privacy
  
  // Facebook tracking parameters
  fbc: string;
  fbp: string;
  fbclid: string;
  
  // Technical metadata
  ip_address: string;
  user_agent: string;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=').map(s => s.trim());
    if (key === name) {
      return value || null;
    }
  }
  return null;
}

function getUrlParameter(name: string): string | null {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name);
}

async function getIpAddress(): Promise<string | null> {
  try {
    const response = await axios.get('https://ipapi.co/json/', {
      timeout: 3000
    });
    return response.data.ip || null;
  } catch (error) {
    console.error('Failed to fetch IP address:', error);
    return null;
  }
}

export async function sendWebhookData(payload: WebhookPayload): Promise<void> {
  try {
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'https://hook.us1.make.com/7zxkh8rclxevlmsdxgjayu5tq2dtoab5';
    
    // Fetch tracking data (always use empty string if missing)
    const fbc = getCookie('_fbc') || '';
    const fbp = getCookie('_fbp') || '';
    const fbclid = getUrlParameter('fbclid') || '';
    const externalId = getCookie('_extid') || '';  // Non-hashed External ID
    const externalIdHashed = getCookie('_extid_hash') || '';  // Hashed External ID
    const ipAddress = await getIpAddress() || '';
    const userAgent = navigator.userAgent || '';
    
    // Build complete payload with ALL fields (use empty strings for missing values)
    const completePayload: WebhookPayload = {
      // Copy all fields from input payload
      ...payload,
      
      // Override tracking fields to ensure they're always present
      external_id: externalId,
      external_id_hashed: externalIdHashed,
      fbc: fbc,
      fbp: fbp,
      fbclid: fbclid,
      ip_address: ipAddress,
      user_agent: userAgent,
      
      // Ensure all other fields have empty string defaults if not provided
      military_branch: payload.military_branch || '',
      first_responder_agency: payload.first_responder_agency || '',
      gender: payload.gender || '',
      coverage_amount: payload.coverage_amount || '',
      monthly_budget: payload.monthly_budget || '',
      county: payload.county || ''
    };
    
    console.log('Webhook payload:', completePayload);
    
    await axios.post(webhookUrl, completePayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Webhook data sent successfully');
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}
