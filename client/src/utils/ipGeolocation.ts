import axios from 'axios';

interface GeolocationData {
  zipCode: string;
  city: string;
  state: string;
}

export async function detectZipCodeFromIP(): Promise<GeolocationData | null> {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    
    if (response.data && response.data.postal) {
      return {
        zipCode: response.data.postal,
        city: response.data.city || '',
        state: response.data.region_code || '',
      };
    }
    
    return null;
  } catch (error) {
    console.error('IP geolocation error:', error);
    return null;
  }
}
