const platform = (
  navigator?.userAgentData?.platform
  || navigator?.platform
  || navigator.userAgent
  || ''
).toLowerCase();

const ios = /ipad|iphone|ipod/.test(platform);
const android = /android/.test(platform);

export const isMobile = ios || android;
export function isSmallScreen() { return window.innerWidth < 900; }
export function isMobileOrSmallScreen() { return isMobile || isSmallScreen(); }
