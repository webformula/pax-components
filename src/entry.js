import MDWDrag from './core/drag.js';
import MDWSwipe from './core/swipe.js';
import MDWUtils from './core/Utils.js';

// --- Components ---

import './components/autocomplete/index.js';
// import './components/backdrop/index.js';
import './components/banner/index.js';
import './components/bottom-navigation/index.js';
import './components/button/index.js';
import './components/card/index.js';
import './components/checkbox/index.js';
import './components/circular-progress/index.js';
import './components/date-picker/index.js';
import './components/dialog/index.js';
// // import './components/expander/index.js';
import './components/fab/index.js';
import './components/icon/index.js';
import './components/linear-progress/index.js';
import './components/list/index.js';
import './components/list-item/index.js';
import './components/menu/index.js';
import './components/navigation-rail/index.js';
import './components/panel/index.js';
import './components/radio/index.js';
import './components/radio-group/index.js';
import './components/select/index.js';
import './components/sheet-bottom/index.js';
import './components/sheet-side/index.js';
import './components/slider/index.js';
import './components/snackbar/index.js';
import './components/switch/index.js';
import './components/tabs/tab-body/index.js';
import './components/tabs/tab-button/index.js';
import './components/tabs/tabs-bar/index.js';
import './components/tabs/tabs-content/index.js';
import './components/text-field/index.js';
// import './components/tooltip/index.js';
import './components/top-app-bar/index.js';
import './components/bound-property/index.js';
import './components/templates/index.js';


import MDWDialog from './components/dialog/service.js';
import MDWSnackbar from './components/snackbar/service.js';
import MDWTemplate from './components/templates/service.js';
import MDWSurface from './components/surface/service.js';

// Override form validation to include custom select elements
const oldCheckValidity = HTMLFormElement.prototype.checkValidity;
HTMLFormElement.prototype.checkValidity = function (...args) {
  const isValidOrig = oldCheckValidity.apply(this, args);
  const isValidCustom = [...this.querySelectorAll('mdw-select[required]') || []].filter(el => el.checkValidity() === false).length === 0;
  if (!isValidOrig || !isValidCustom) return false;
  return true;
};

export {
  MDWDialog,
  MDWSnackbar,
  MDWTemplate,
  MDWSurface,
  MDWDrag,
  MDWSwipe,
  MDWUtils
}
