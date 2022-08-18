import { isMobile } from "./device.js";

const MDWUtil = new class MDWUtil {
  #uidCounter = 1;
  isMobile = isMobile;

  constructor() {

  }
}

window.MDWUtil = MDWUtil;
export default MDWUtil;
