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
}

window.MDWUtil = MDWUtil;
export default MDWUtil;
