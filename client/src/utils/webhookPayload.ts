// Partial payload from landing pages (only quiz/contact fields they collect)
export interface PartialWebhookPayload {
  // Core identification
  angle: 'seniors' | 'veterans' | 'firstresponders';
  landing_page: 'seniors' | 'veterans' | 'first_responders';
  
  // Angle-specific (optional - only provided by relevant pages)
  military_branch?: string;
  first_responder_agency?: string;
  
  // Quiz responses (may be empty for streamlined flows)
  gender?: string;
  beneficiary: string;
  life_insurance: string;
  coverage_amount?: string;
  monthly_budget?: string;
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
  county?: string;  // Optional - fetched from geolocation in some flows
}

// Complete payload with all required fields
export interface CompleteWebhookPayload {
  // Core identification
  angle: 'seniors' | 'veterans' | 'firstresponders';
  landing_page: 'seniors' | 'veterans' | 'first_responders';
  submitted_at: string;
  
  // Angle-specific fields (always present)
  military_branch: string;
  first_responder_agency: string;
  
  // Quiz responses (always present)
  gender: string;
  beneficiary: string;
  life_insurance: string;
  coverage_amount: string;
  monthly_budget: string;
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
  
  // Tracking (populated by webhookApi, start as empty strings)
  external_id: string;
  external_id_hashed: string;
  fbc: string;
  fbp: string;
  fbclid: string;
  ip_address: string;
  user_agent: string;
}

/**
 * Normalize partial webhook payload from landing pages to complete payload structure
 * Ensures all fields are present with empty strings as defaults
 */
export function buildWebhookPayload(partial: PartialWebhookPayload): CompleteWebhookPayload {
  return {
    // Core identification
    angle: partial.angle,
    landing_page: partial.landing_page,
    submitted_at: new Date().toISOString(),
    
    // Angle-specific (empty if not provided)
    military_branch: partial.military_branch || '',
    first_responder_agency: partial.first_responder_agency || '',
    
    // Quiz responses (empty if not collected in streamlined flows)
    gender: partial.gender || '',
    beneficiary: partial.beneficiary,
    life_insurance: partial.life_insurance,
    coverage_amount: partial.coverage_amount || '',
    monthly_budget: partial.monthly_budget || '',
    age: partial.age,
    beneficiary_name: partial.beneficiary_name,
    
    // Contact information
    first_name: partial.first_name,
    last_name: partial.last_name,
    email: partial.email,
    phone: partial.phone,
    
    // Location data
    zip_code: partial.zip_code,
    city: partial.city,
    state: partial.state,
    county: partial.county || '',  // Use provided county or empty string
    
    // Tracking fields (will be enriched by webhookApi)
    external_id: '',
    external_id_hashed: '',
    fbc: '',
    fbp: '',
    fbclid: '',
    ip_address: '',
    user_agent: ''
  };
}
