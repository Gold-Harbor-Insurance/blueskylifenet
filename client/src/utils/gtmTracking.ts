// Google Tag Manager Event Tracking Utility

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push an event to GTM dataLayer
 */
export function pushToDataLayer(event: string, data: Record<string, any> = {}): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const eventData = {
      event,
      ...data,
    };
    console.log('📊 GTM Event:', eventData);
    window.dataLayer.push(eventData);
  } else {
    console.warn('⚠️ GTM dataLayer not available');
  }
}

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  pushToDataLayer('pageview', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/**
 * Track quiz step progression
 */
export function trackQuizStep(stepNumber: number, stepName: string, audience: string): void {
  pushToDataLayer('quiz_step', {
    step_number: stepNumber,
    step_name: stepName,
    audience: audience, // 'seniors', 'veterans', 'firstresponders'
  });
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, buttonValue: string): void {
  pushToDataLayer('button_click', {
    button_name: buttonName,
    button_value: buttonValue,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, formData: Record<string, any>): void {
  pushToDataLayer('form_submit', {
    form_name: formName,
    ...formData,
  });
}

/**
 * Initialize GTM tracking
 */
export function initGTM(): void {
  // Initialize dataLayer if it doesn't exist
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
}

import type { FormDataPayload, FlowType, CallExperience } from '@/types/formData';

interface GTMContext {
  flow: FlowType;
  callExperience: CallExperience;
  ageClassification?: string;
  budgetClassification?: string;
}

// Debounce tracking to prevent duplicate events
let lastCallTrackTime = 0;
let lastAppointmentTrackTime = 0;
const DEBOUNCE_MS = 1000; // 1 second debounce

/**
 * Track when user clicks the call button/link on thank you page
 * Debounced to prevent duplicate events from multiple rendered instances
 */
export function trackCallIntent(formData: FormDataPayload, context: GTMContext): void {
  if (typeof window === 'undefined' || !window.dataLayer) {
    return;
  }

  // Debounce: prevent duplicate tracking within 1 second
  const now = Date.now();
  if (now - lastCallTrackTime < DEBOUNCE_MS) {
    return;
  }
  lastCallTrackTime = now;

  window.dataLayer.push({
    event: 'call',
    fn: formData.firstName || '',
    ln: formData.lastName || '',
    em: formData.email || '',
    ph: formData.phone || '',
    ct: formData.city || '',
    st: formData.state || '',
    zp: formData.zipCode || '',
    country_id: 'US',
    flow: context.flow,
    call_experience: context.callExperience,
    age_classification: context.ageClassification || '',
    budget_classification: context.budgetClassification || ''
  });
}

/**
 * Track when user clicks the book appointment button on thank you page
 * Debounced to prevent duplicate events from multiple rendered instances
 */
export function trackAppointmentIntent(formData: FormDataPayload, context: GTMContext): void {
  if (typeof window === 'undefined' || !window.dataLayer) {
    return;
  }

  // Debounce: prevent duplicate tracking within 1 second
  const now = Date.now();
  if (now - lastAppointmentTrackTime < DEBOUNCE_MS) {
    return;
  }
  lastAppointmentTrackTime = now;

  window.dataLayer.push({
    event: 'appointment',
    fn: formData.firstName || '',
    ln: formData.lastName || '',
    em: formData.email || '',
    ph: formData.phone || '',
    ct: formData.city || '',
    st: formData.state || '',
    zp: formData.zipCode || '',
    country_id: 'US',
    flow: context.flow,
    age_classification: context.ageClassification || '',
    budget_classification: context.budgetClassification || ''
  });
}
