import axios from 'axios';

interface WebhookPayload {
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
  county?: string;
  monthly_budget: string;
  landing_page: 'seniors' | 'veterans' | 'first_responders';
  submitted_at: string;
  fbc?: string;
  fbp?: string;
  fbclid?: string;
  ip_address?: string;
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
    
    const fbc = getCookie('_fbc');
    const fbp = getCookie('_fbp');
    const fbclid = getUrlParameter('fbclid');
    const ipAddress = await getIpAddress();
    
    const enrichedPayload = {
      ...payload,
      ...(fbc && { fbc }),
      ...(fbp && { fbp }),
      ...(fbclid && { fbclid }),
      ...(ipAddress && { ip_address: ipAddress })
    };
    
    await axios.post(webhookUrl, enrichedPayload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Webhook data sent successfully');
  } catch (error) {
    console.error('Webhook error:', error);
  }
}
