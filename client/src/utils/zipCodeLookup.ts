export interface ZipLookupResult {
  city: string;
  state: string;
  stateAbbr: string;
}

/**
 * Looks up city and state information from a US zip code
 * Uses the free Zippopotam.us API
 */
export async function lookupZipCode(zipCode: string): Promise<ZipLookupResult | null> {
  // Clean the zip code
  const cleanZip = zipCode.replace(/\D/g, '');
  
  // Validate it's a 5-digit zip code
  if (cleanZip.length !== 5) {
    return null;
  }

  try {
    const response = await fetch(`https://api.zippopotam.us/us/${cleanZip}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.places && data.places.length > 0) {
      const place = data.places[0];
      return {
        city: place['place name'],
        state: place['state'],
        stateAbbr: place['state abbreviation']
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error looking up zip code:', error);
    return null;
  }
}
