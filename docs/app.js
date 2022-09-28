import './dracula.css';
import './main.css';
import '@webformula/pax-components';
import { registerPage } from '@webformula/pax-core';
import home from './pages/home/page.js';
import buttons from './pages/buttons/page.js';
import cards from './pages/cards/page.js';
import iconButtons from './pages/icon buttons/page.js';
import progressIndicators from './pages/progress indicators/page.js';
import textField from './pages/text field/page.js';
import checkbox from './pages/checkbox/page.js';
import topAppBar from './pages/top app bar/page.js';
import dialog from './pages/dialog/page.js';
import menu from './pages/menu/page.js';
import select from './pages/select/page.js';
import bottomAppBar from './pages/bottom app bar/page.js';
import fab from './pages/fab/page.js';
import mdwSwitch from './pages/switch/page.js';
import segmentedButtons from './pages/segmented buttons/page.js';
import slider from './pages/sliders/page.js';
import radio from './pages/radio/page.js';
import snackbar from './pages/snackbar/page.js';


window.escapeHTML = str => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

registerPage(home, '/');
registerPage(buttons, '/buttons');
registerPage(cards, '/cards');
registerPage(iconButtons, '/icon-buttons');
registerPage(progressIndicators, '/progress-indicators');
registerPage(textField, '/text-field');
registerPage(checkbox, '/checkbox');
registerPage(topAppBar, '/top-app-bar');
registerPage(dialog, '/dialog');
registerPage(menu, '/menu');
registerPage(select, '/select');
registerPage(bottomAppBar, '/bottom-app-bar');
registerPage(fab, '/fab');
registerPage(mdwSwitch, '/switch');
registerPage(segmentedButtons, '/segmented-buttons');
registerPage(slider, '/sliders');
registerPage(radio, '/radio');
registerPage(snackbar, '/snackbar');



window.addEventListener('locationchange', () => {
  setTimeout(() => {
    hljs.highlightAll();
  }, 0);
});

window.addEventListener('hashchange', () => {
  if (!location.hash) return;
  const element = document.querySelector(location.hash);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('load', () => {
  hljs.highlightAll();

  if (location.hash) {
    setTimeout(() => {
      const element = document.querySelector(location.hash);
      if (element) element.scrollIntoView();
    }, 0);
  }
});


// TODO auto change hash when scrolling
