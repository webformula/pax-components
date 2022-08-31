import { isMobile } from "./device.js";

const MDWUtil = new class MDWUtil {
  #uidCounter = 0;
  isMobile = isMobile;

  constructor() {

  }

  getUID() {
    this.#uidCounter += 1;
    return this.#uidCounter;
  }

  rafThrottle(fn) {
    let alreadyQueued;
    return function throttled() {
      const args = arguments;
      const context = this;
      if (!alreadyQueued) {
        alreadyQueued = true;
        fn.apply(context, args);
        requestAnimationFrame(() => {
          alreadyQueued = false;
        });
      }
    };
  }
}

window.MDWUtil = MDWUtil;
export default MDWUtil;
