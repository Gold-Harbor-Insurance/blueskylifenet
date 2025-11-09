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
    window.dataLayer.push({
      event,
      ...data,
    });
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
