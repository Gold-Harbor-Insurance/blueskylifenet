export type CallExperience = 'display-number' | 'tap-to-call';

export function detectCallExperience(): CallExperience {
  if (typeof window === 'undefined') {
    return 'tap-to-call';
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const platform = navigator.platform || '';

  // Check for Facebook/Instagram in-app browsers
  const isFacebookBrowser = /FBAN|FBAV|Instagram/i.test(userAgent);
  
  // Check for iOS devices (iPhone, iPad, iPod)
  // iPads on iPadOS 13+ may report as Mac, so check maxTouchPoints too
  const isIOSUserAgent = /iPhone|iPad|iPod/i.test(userAgent);
  const isMacWithTouch = /Mac/i.test(platform) && navigator.maxTouchPoints > 1;
  const isIOS = isIOSUserAgent || isMacWithTouch;

  // ONLY Facebook/Instagram browsers on iPhone need "Press & Hold"
  // - Facebook Messenger on iPhone: tel: links blocked
  // - Facebook Messenger on Android: tel: links work fine
  // - All other browsers on all devices: tel: links work fine
  if (isFacebookBrowser && isIOS) {
    return 'display-number';
  }

  // Everything else gets tap-to-call
  return 'tap-to-call';
}
