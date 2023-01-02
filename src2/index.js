import './index.css';
import { generate } from './core/theme.js';
generate();

import mdwDate from './core/dateUtil.js';
import mdwDevice from './core/device.js';
import mdwDialog from './components/dialog/service.js';
import MDWPanel from './components/panel/service.js';
import MDWSnackbar from './components/snackbar/service.js';
import mdwUtil from './core/util.js';


import './components/backdrop/component.js';
import './components/badge/component.js';
import './components/bottom-app-bar/component.js';
import './components/button/component.js';
import './components/card/component.js';
import './components/checkbox/component.js';
import './components/chip/index.js';
import './components/date-picker/index.js';
import './components/dialog/component.js';
import './components/fab/component.js';
import './components/icon/component.js';
import './components/list/index.js';
import './components/menu/component.js';
import './components/navigation/index.js';
import './components/panel/component.js';
import './components/progress-circular/component.js';
import './components/progress-linear/component.js';
import './components/radio/index.js';
import './components/segmented-button-group/index.js';
import './components/select/index.js';
import './components/slider/index.js';
import './components/snackbar/index.js';
import './components/switch/component.js';
import './components/tab/index.js';
import './components/textfield/component.js';
import './components/top-app-bar/component.js';
import './components/tooltip/index.js';

// const p = Date.now();
// TODO look into whenDefined https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined
requestAnimationFrame(() => {
  // console.log('a', Date.now() - p)
  document.querySelector('html').classList.add('mdw-initiated');
});
// setTimeout(() => {
//   console.log(Date.now() - p)
//   document.querySelector('html').classList.add('mdw-initiated');
// });

export {
  mdwDate,
  mdwDevice,
  mdwDialog,
  MDWPanel,
  mdwUtil,
  MDWSnackbar
}
