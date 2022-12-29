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
import lists from './pages/lists/page.js';
import menus from './pages/menus/page.js';
import progressIndicators from './pages/progress indicators/page.js';
import radios from './pages/radios/page.js';
import segmentedButtons from './pages/segmented buttons/page.js';
import selects from './pages/selects/page.js';
import sliders from './pages/sliders/page.js';
import snackbars from './pages/snackbars/page.js';
import switches from './pages/switches/page.js';
import tabs from './pages/tabs/page.js';
import textFields from './pages/text fields/page.js';
import topAppBars from './pages/top app bars/page.js';
import tooltips from './pages/tooltips/page.js';




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
registerPage(lists, '/lists');
registerPage(menus, '/menus');
registerPage(progressIndicators, '/progress-indicators');
registerPage(radios, '/radios');
registerPage(segmentedButtons, '/segmented-buttons');
registerPage(selects, '/selects');
registerPage(sliders, '/sliders');
registerPage(snackbars, '/snackbars');
registerPage(switches, '/switches');
registerPage(tabs, '/tabs');
registerPage(textFields, '/text-fields');
registerPage(topAppBars, '/top-app-bars');
registerPage(tooltips, '/tooltips');



window.addEventListener('load', () => {
  hljs.highlightAll();
});

window.addEventListener('mdwPageChange', () => {
  setTimeout(() => {
    hljs.highlightAll();
  });
});
