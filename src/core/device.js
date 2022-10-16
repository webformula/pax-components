export default new class Device {
  #platform = (
    navigator?.userAgentData?.platform
    || navigator?.platform
    || navigator.userAgent
    || ''
  ).toLowerCase();
  #iosRegex = /ipad|iphone|ipod/;
  #androidRegex = /android/;
  #smallViewportSize = 900;
  #fullscreenCutoff = 600;

  
  constructor() {
    window.addEventListener('resize', () => {
      this.#setViewport(); 
    });

    this.#setViewport(true);
  }

  get isMobile() {
    return this.isIOS || this.isAndroid;
  }

  get isSmallViewport() {
    return window.innerWidth < this.#smallViewportSize; 
  }

  // used to swap fullscreen panels to dialogs
  get isFullscreenCutoff() {
    return window.innerWidth > this.#fullscreenCutoff;
  }

  get fullscreenCutoffSize() {
    return this.#fullscreenCutoff;
  }

  get isMobileOrSmallViewport() {
    return this.isMobile || this.isSmallViewport;
  }

  get isIOS() {
    return this.#iosRegex.test(this.#platform);
  }

  get isAndroid() {
    return this.#androidRegex.test(this.#platform);
  }

  get isTouch() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }

  #setViewport(initial = false) {
    document.body.classList.remove('mdw-mobile');
    document.body.classList.remove('mdw-viewport-small');

    if (this.isMobile) {
      document.body.classList.add('mdw-mobile');
      if (!initial) window.dispatchEvent(new Event('mdw-viewport-mobile'));
    } else if (this.isSmallViewport) {
      document.body.classList.add('mdw-small-viewport');
      if (!initial) window.dispatchEvent(new Event('mdw-viewport-small'));
    } else {
      if (!initial) window.dispatchEvent(new Event('mdw-viewport-normal'));
    }
  }
}
