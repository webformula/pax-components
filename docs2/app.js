import './font.css';
import './dracula.css';
import './app.css';


import '@webformula/pax-components';
import { registerPage, enableSPA } from '@webformula/pax-core';
enableSPA();

window.escapeHTML = str => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

import home from './pages/home/page.js';
import badges from './pages/badges/page.js';
import bottomAppBars from './pages/bottom app bars/page.js';
import buttons from './pages/buttons/page.js';
import cards from './pages/cards/page.js';
import checkboxes from './pages/checkboxes/page.js';
import datePickers from './pages/date pickers/page.js';
import dialogs from './pages/dialogs/page.js';
import fabs from './pages/fabs/page.js';
import icons from './pages/icons/page.js';
import iconButtons from './pages/icon buttons/page.js';
import menus from './pages/menus/page.js';
import progressIndicators from './pages/progress indicators/page.js';
import radios from './pages/radios/page.js';
import sliders from './pages/sliders/page.js';
import switches from './pages/switches/page.js';
import textFields from './pages/text fields/page.js';




registerPage(home, '/');
registerPage(badges, '/badges');
registerPage(bottomAppBars, '/bottom-app-bars');
registerPage(buttons, '/buttons');
registerPage(cards, '/cards');
registerPage(checkboxes, '/checkboxes');
registerPage(datePickers, '/date-pickers');
registerPage(dialogs, '/dialogs');
registerPage(fabs, '/fabs');
registerPage(icons, '/icons');
registerPage(iconButtons, '/icon-buttons');
registerPage(menus, '/menus');
registerPage(progressIndicators, '/progress-indicators');
registerPage(radios, '/radios');
registerPage(sliders, '/sliders');
registerPage(switches, '/switches');
registerPage(textFields, '/text-fields');



window.addEventListener('load', () => {
  hljs.highlightAll();
});

window.addEventListener('mdwPageChange', () => {
  setTimeout(() => {
    hljs.highlightAll();
  });
});
