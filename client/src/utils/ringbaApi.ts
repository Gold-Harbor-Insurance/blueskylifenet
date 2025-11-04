import axios from 'axios';

interface RingbaTag {
  type: 'User' | 'Location';
  [key: string]: string;
}

interface RingbaRequestData {
  JsTagId: string;
  CurrentEpoch: number;
  Tags: RingbaTag[];
}

interface RingbaResponse {
  id: string;
  displayNumber: string;
  phoneNumber: string;
  phoneNumberLocal: string | null;
  impressionQueryPath: string;
  maxEpoch: number;
  expireMs: number;
  heartBeatMs: number;
  displayFmt: string;
}

function getCookie(name: string): string {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=').map(s => s.trim());
    if (key === name) {
      return value || '';
    }
  }
  return '';
}

function getUrlParameters(): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

function getHiddenInputValue(name: string): string {
  const input = document.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  return input?.value || '';
}

export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const areaCode = cleaned.substring(1, 4);
    const prefix = cleaned.substring(4, 7);
    const lineNumber = cleaned.substring(7, 11);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }
  
  if (cleaned.length === 10) {
    const areaCode = cleaned.substring(0, 3);
    const prefix = cleaned.substring(3, 6);
    const lineNumber = cleaned.substring(6, 10);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }
  
  return phoneNumber;
}

export async function fetchRingbaNumber(hiddenInputNames: string[]): Promise<{
  phoneNumber: string;
  telLink: string;
}> {
  try {
    const tags: RingbaTag[] = [];
    
    tags.push({
      type: 'User',
      lp: 'blueskylife.com'
    });
    
    for (const inputName of hiddenInputNames) {
      const value = getHiddenInputValue(inputName);
      if (value) {
        tags.push({
          type: 'User',
          [inputName]: value
        });
      }
    }
    
    const urlParams = getUrlParameters();
    for (const [key, value] of Object.entries(urlParams)) {
      if (value) {
        tags.push({
          type: 'User',
          [key]: value
        });
      }
    }
    
    const fbc = getCookie('_fbc');
    if (fbc) {
      tags.push({
        type: 'User',
        fbc: fbc
      });
    }
    
    const fbp = getCookie('_fbp');
    if (fbp) {
      tags.push({
        type: 'User',
        fbp: fbp
      });
    }
    
    tags.push({
      type: 'Location',
      completeUrl: window.location.href
    });
    
    tags.push({
      type: 'Location',
      cleanUrl: window.location.protocol + '//' + window.location.hostname + window.location.pathname
    });
    
    tags.push({
      type: 'Location',
      hostName: window.location.hostname
    });
    
    tags.push({
      type: 'Location',
      pathName: window.location.pathname
    });
    
    tags.push({
      type: 'Location',
      hash: window.location.hash
    });
    
    const requestData: RingbaRequestData = {
      JsTagId: 'JSd4de0752fe324d99a3a107e29c0de4a8',
      CurrentEpoch: Date.now(),
      Tags: tags
    };
    
    const response = await axios.post<RingbaResponse>(
      'https://display.ringba.com/v2/nis/gn/',
      requestData
    );
    
    if (response.data && response.data.phoneNumber) {
      const formattedNumber = formatPhoneNumber(response.data.phoneNumber);
      const cleanNumber = response.data.phoneNumber.replace(/\D/g, '');
      
      let telNumber = cleanNumber;
      if (cleanNumber.length === 10) {
        telNumber = '1' + cleanNumber;
      }
      
      return {
        phoneNumber: formattedNumber,
        telLink: `tel:+${telNumber}`
      };
    }
    
    return {
      phoneNumber: '(877) 790-1817',
      telLink: 'tel:+18777901817'
    };
    
  } catch (error) {
    console.error('Ringba API error:', error);
    
    return {
      phoneNumber: '(877) 790-1817',
      telLink: 'tel:+18777901817'
    };
  }
}
