export type CallExperience = 'display-number' | 'tap-to-call';

export function detectCallExperience(): CallExperience {
  if (typeof window === 'undefined') {
    return 'tap-to-call';
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const platform = navigator.platform || '';

  // Check for Facebook/Instagram in-app browsers
  const isFacebookBrowser = /FBAN|FBAV|Instagram/i.test(userAgent);
  if (isFacebookBrowser) {
    return 'display-number';
  }

  // Check for iOS devices (iPhone, iPad, iPod)
  // iPads on iPadOS 13+ may report as Mac, so check maxTouchPoints too
  const isIOSUserAgent = /iPhone|iPad|iPod/i.test(userAgent);
  const isMacWithTouch = /Mac/i.test(platform) && navigator.maxTouchPoints > 1;
  const isIOS = isIOSUserAgent || isMacWithTouch;

  if (isIOS) {
    return 'display-number';
  }

  // Android and desktop browsers get tap-to-call
  return 'tap-to-call';
}
