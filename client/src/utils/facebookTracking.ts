// Facebook Click ID and Cookie Tracking Utility

export interface FacebookTrackingData {
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
}

export interface ExternalIdData {
  raw: string;        // Non-hashed version for Ringba/GHL
  hashed: string;     // Hashed version for Facebook
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

/**
 * Generate SHA-256 hash of a string
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate or retrieve External ID for user tracking
 * Returns both raw (non-hashed) and hashed versions
 * Raw version: Sent to Ringba & GoHighLevel for internal records
 * Hashed version: Sent to Facebook for privacy compliance
 * 
 * IMPORTANT: Ensures raw and hashed IDs always stay in sync
 */
export async function getExternalId(): Promise<ExternalIdData> {
  const RAW_COOKIE_NAME = '_extid';
  const HASHED_COOKIE_NAME = '_extid_hash';
  const COOKIE_DAYS = 365; // 1 year expiration
  const maxAge = COOKIE_DAYS * 24 * 60 * 60;
  
  // Check for existing cookies
  let rawId = getCookie(RAW_COOKIE_NAME);
  let hashedId: string;
  
  // If no raw ID exists, generate a new one
  if (!rawId) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    rawId = `extid_${timestamp}_${random}`;
    document.cookie = `${RAW_COOKIE_NAME}=${rawId}; max-age=${maxAge}; path=/; samesite=lax`;
    
    // CRITICAL: Always regenerate hash when raw ID is new (even if hash cookie exists)
    // This prevents mismatch between Facebook (old hash) and Ringba/GHL (new raw ID)
    hashedId = await sha256(rawId);
    document.cookie = `${HASHED_COOKIE_NAME}=${hashedId}; max-age=${maxAge}; path=/; samesite=lax`;
    
    console.log('✅ External IDs created:', { raw: rawId, hashed: hashedId.substring(0, 16) + '...' });
  } else {
    // Raw ID exists - check if we need to regenerate hash
    const existingHash = getCookie(HASHED_COOKIE_NAME);
    if (!existingHash) {
      // Hash is missing - recompute from existing raw ID
      hashedId = await sha256(rawId);
      document.cookie = `${HASHED_COOKIE_NAME}=${hashedId}; max-age=${maxAge}; path=/; samesite=lax`;
      console.log('✅ External hash regenerated from existing raw ID');
    } else {
      // Both raw and hash exist - use existing values
      hashedId = existingHash;
      console.log('✅ External IDs retrieved from cookies')
    }
  }
  
  return {
    raw: rawId,
    hashed: hashedId
  };
}

/**
 * Generate unique event ID for Facebook event deduplication
 * Ensures browser and server events share the same ID
 */
export function generateEventId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `evt_${timestamp}_${random}`;
}
