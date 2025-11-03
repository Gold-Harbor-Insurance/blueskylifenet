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
  age_classification: string;
  beneficiary_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  county?: string;
  monthly_budget: string;
  landing_page: 'seniors' | 'veterans' | 'first_responders';
  submitted_at: string;
}

export async function sendWebhookData(payload: WebhookPayload): Promise<void> {
  try {
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'https://hook.us1.make.com/7zxkh8rclxevlmsdxgjayu5tq2dtoab5';
    
    await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Webhook data sent successfully');
  } catch (error) {
    console.error('Webhook error:', error);
  }
}
