// https://m3.material.io/foundations/adaptive-design/large-screens/overview
// https://material.io/blog/device-metrics
// https://henan-guanjie.gitee.io/ui-design/tools/devices/index.html

const MDWDevice = new class MDWDevice {
  #platform = (
    navigator?.userAgentData?.platform
    || navigator?.platform
    || navigator.userAgent
    || ''
  ).toLowerCase();
  #iosRegex = /ipad|iphone|ipod/;
  #androidRegex = /android/;
  // #smallViewportSize = 900;
  // #fullscreenCutoff = 600;

  constructor() {
    window.addEventListener('resize', () => {
      this.#setViewport();
    });

    this.#setViewport(true);
  }

  get isMobile() {
    return this.isIOS || this.isAndroid;
  }

  get isIOS() {
    return this.#iosRegex.test(this.#platform);
  }

  get isAndroid() {
    return this.#androidRegex.test(this.#platform);
  }

  get hasTouch() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }

  #setViewport(initial = false) {
    document.body.classList.remove('mdw-mobile');
    // document.body.classList.remove('mdw-viewport-small');

    if (this.isMobile) {
      document.body.classList.add('mdw-mobile');
      if (!initial) window.dispatchEvent(new Event('mdw-viewport-mobile'));
    } else {
      if (!initial) window.dispatchEvent(new Event('mdw-viewport-normal'));
    }
  }
}

window.MDWDevice = MDWDevice;
export default MDWDevice;
