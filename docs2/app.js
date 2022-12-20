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
import buttons from './pages/buttons/page.js';
import cards from './pages/cards/page.js';
import checkboxes from './pages/checkboxes/page.js';
import dialogs from './pages/dialogs/page.js';
import icons from './pages/icons/page.js';
import progressIndicators from './pages/progress indicators/page.js';
import radios from './pages/radios/page.js';
import sliders from './pages/sliders/page.js';
import switches from './pages/switches/page.js';
import textFields from './pages/text fields/page.js';




registerPage(home, '/');
registerPage(badges, '/badges');
registerPage(buttons, '/buttons');
registerPage(cards, '/cards');
registerPage(checkboxes, '/checkboxes');
registerPage(dialogs, '/dialogs');
registerPage(icons, '/icons');
registerPage(radios, '/radios');
registerPage(progressIndicators, '/progress-indicators');
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
