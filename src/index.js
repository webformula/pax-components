import MDWUtil from './core/util.js';
import MDWDialog from './components/dialog/service.js';
import MDWSnackbar from './components/snackbar/service.js';
import MDWDate from './core/date.js';
import './core/tooltip.js';
import './core/form.js';


import './index.css';
import { generate } from './core/theme.js';
generate();

import './components/badge/component.js';
import './components/button/component.js';
import './components/card/component.js';
import './components/card/container.js';
import './components/navigation-button/component.js';
import './components/navigation/component.js';
import './components/icon/component.js';
import './components/progress-linear/component.js';
import './components/progress-circular/component.js';
import './components/text-field/component.js';
import './components/checkbox/component.js';
import './components/top-app-bar/component.js';
import './components/dialog/component.js';
import './components/menu/component.js';
import './components/bottom-app-bar/component.js';
import './components/fab/component.js';
import './components/switch/component.js';
import './components/bottom-sheet/component.js';
import './components/segmented-button-group/component.js';
import './components/slider/slider.js';
import './components/slider/slider-range.js';
import './components/radio/component.js';
import './components/snackbar/component.js';
import './components/tooltip/component.js';
import './components/list/component.js';
import './components/list/avatar.js';
import './components/expander/component.js';
import './components/date-picker/component.js';
import './components/time-picker/component.js';
import './components/month-picker/component.js';
import './components/tabs/component.js';
import './components/chips/component.js';

setTimeout(() => {
  document.querySelector('html').classList.add('mdw-initiated');
}, 0);


export {
  MDWDate,
  MDWDialog,
  MDWSnackbar,
  MDWUtil
}

// TODO make sure the webpage shows blank white until js loaded
// TODO change switch to input
// TODO look into places we can get css without js
// TODO make webpage separate css
// TODO figure out how to get rid of iframes
