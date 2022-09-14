import MDWUtil from './core/util.js';
import MDWDialog from './components/dialog/service.js';

import './theme.css';
import './index.css';
import { generate } from './core/theme.js';
generate();

import './components/button/component.js';
import './components/card/component.js';
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

export {
  MDWDialog,
  MDWUtil
}
