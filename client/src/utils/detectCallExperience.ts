export type CallExperience = 'display-number' | 'tap-to-call';

export function detectCallExperience(): CallExperience {
  if (typeof window === 'undefined') {
    return 'tap-to-call';
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // ONLY Facebook/Instagram in-app browsers need "Press & Hold" (they block tel: links)
  // All other browsers (Safari, Chrome, Firefox, etc.) on ALL devices support tap-to-call
  const isFacebookBrowser = /FBAN|FBAV|Instagram/i.test(userAgent);
  
  if (isFacebookBrowser) {
    return 'display-number';
  }

  // All non-Facebook browsers (iPhone Safari, Android Chrome, Desktop, etc.) get tap-to-call
  return 'tap-to-call';
}
