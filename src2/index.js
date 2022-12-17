import './index.css';
import { generate } from './core/theme.js';
generate();

import MDWUtil from './core/util.js';
import MDWDevice from './core/device.js';


import './components/badge/component.js';
import './components/button/component.js';
import './components/card/component.js';
import './components/checkbox/component.js';
import './components/icon/component.js';
import './components/navigation/component.js';
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
  MDWDevice,
  MDWUtil
}
