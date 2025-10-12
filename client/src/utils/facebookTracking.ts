// Facebook Click ID and Cookie Tracking Utility

export interface FacebookTrackingData {
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
}

/**
 * Get Facebook click ID from URL parameter
 */
export function getFbclid(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('fbclid');
}

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Get Facebook browser cookie (_fbc)
 */
export function getFbc(): string | null {
  // First check if we have it in a cookie
  let fbc = getCookie('_fbc');
  
  // If not, and we have fbclid, create it
  if (!fbc) {
    const fbclid = getFbclid();
    if (fbclid) {
      const timestamp = Date.now();
      fbc = `fb.1.${timestamp}.${fbclid}`;
      // Store it in a cookie for 90 days
      document.cookie = `_fbc=${fbc}; max-age=${90 * 24 * 60 * 60}; path=/`;
    }
  }
  
  return fbc;
}

/**
 * Get Facebook browser pixel ID (_fbp)
 */
export function getFbp(): string | null {
  return getCookie('_fbp');
}

/**
 * Get all Facebook tracking data
 */
export function getFacebookTrackingData(): FacebookTrackingData {
  return {
    fbclid: getFbclid(),
    fbc: getFbc(),
    fbp: getFbp(),
  };
}

/**
 * Store Facebook tracking data in sessionStorage for use across pages
 */
export function storeFacebookTrackingData(): void {
  const data = getFacebookTrackingData();
  sessionStorage.setItem('fb_tracking', JSON.stringify(data));
}

/**
 * Retrieve stored Facebook tracking data from sessionStorage
 */
export function getStoredFacebookTrackingData(): FacebookTrackingData {
  const stored = sessionStorage.getItem('fb_tracking');
  if (stored) {
    return JSON.parse(stored);
  }
  return getFacebookTrackingData();
}

/**
 * Initialize Facebook tracking on page load
 */
export function initFacebookTracking(): void {
  // Store tracking data when page loads
  storeFacebookTrackingData();
}
