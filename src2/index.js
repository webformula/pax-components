import './index.css';
import { generate } from './core/theme.js';
generate();

import mdwUtil from './core/util.js';
import mdwDate from './core/dateUtil.js';
import mdwDevice from './core/device.js';
import mdwDialog from './components/dialog/service.js';
import MDWPanel from './components/panel/service.js';


import './components/badge/component.js';
import './components/bottom-app-bar/component.js';
import './components/button/component.js';
import './components/card/component.js';
import './components/checkbox/component.js';
import './components/date-picker/index.js';
import './components/dialog/component.js';
import './components/fab/component.js';
import './components/icon/component.js';
import './components/menu/component.js';
import './components/navigation/component.js';
import './components/panel/component.js';
import './components/progress-circular/component.js';
import './components/progress-linear/component.js';
import './components/radio/index.js';
import './components/slider/index.js';
import './components/switch/component.js';
import './components/textfield/component.js';


// TODO look into whenDefined https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined
setTimeout(() => {
  document.querySelector('html').classList.add('mdw-initiated');
}, 0);

export {
  // MDWDate,
  // MDWDialog,
  // MDWSnackbar,
  mdwDate,
  mdwDevice,
  mdwDialog,
  mdwUtil,
  MDWPanel
}
