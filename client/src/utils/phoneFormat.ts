/**
 * Aggressively normalizes any phone input into canonical (XXX) XXX-XXXX format
 * Handles autofill, paste, typed input, etc.
 */
export function formatPhoneNumber(input: string): string {
  // Remove all non-digits
  const digitsOnly = input.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limitedDigits = digitsOnly.substring(0, 10);
  
  // Return empty if no digits
  if (limitedDigits.length === 0) {
    return '';
  }
  
  // Format the number
  let formatted = '';
  if (limitedDigits.length > 0) {
    formatted = '(' + limitedDigits.substring(0, 3);
  }
  if (limitedDigits.length >= 4) {
    formatted += ') ' + limitedDigits.substring(3, 6);
  }
  if (limitedDigits.length >= 7) {
    formatted += '-' + limitedDigits.substring(6, 10);
  }
  
  return formatted;
}

/**
 * Validates that a phone number has exactly 10 digits
 */
export function isValidPhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length === 10;
}
