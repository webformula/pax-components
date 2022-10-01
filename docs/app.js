import './dracula.css';
import './main.css';
import { MDWUtil } from '@webformula/pax-components';
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
import tooltip from './pages/tooltip/page.js';
import icon from './pages/icon/page.js';
import lists from './pages/lists/page.js';


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
registerPage(tooltip, '/tooltip');
registerPage(icon, '/icon');
registerPage(lists, '/lists');



// let currentPageHashElements = [];
// let currentHashElement;
// function getCurrentPageHashElements() {
//   return [...document.querySelectorAll('a[href^="#"]')]
//     .map(el => el.getAttribute('href').replace('#', ''))
//     .map(id => document.querySelector(`#${id}`))
//     .filter(el => !!el);
// }

window.addEventListener('load', () => {
  // currentPageHashElements = getCurrentPageHashElements();
  hljs.highlightAll();

  if (location.hash) {
    setTimeout(() => {
      try {
        const element = document.querySelector(location.hash);
        if (element) element.scrollIntoView();
      } catch {}
    }, 0);
  }
});

window.addEventListener('mdwPageChange', () => {
  setTimeout(() => {
    hljs.highlightAll();
  }, 0);
  // currentPageHashElements = getCurrentPageHashElements();
});

window.addEventListener('hashchange', () => {
  if (!location.hash) return;

  try {
    const element = document.querySelector(location.hash);
    console.log(element);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  } catch { console.log('error'); }
});


// TODO auto change hash when scrolling
// const hashScrollThrottle = MDWUtil.throttle(() => {
//   currentPageHashElements.find(el => {
//     const bounds = el.getBoundingClientRect();
//     if (bounds.y >= 0 && (bounds.y + bounds.height) <= window.innerHeight) {
//       if (currentHashElement !== el) {
//         history.replaceState(null, null, `${document.location.pathname}#${el.getAttribute('id')}`);
//       }
//       currentHashElement = el;
//       return true;
//     }
//     return false;
//   });
// }, 1000);
// document.body.addEventListener('scroll', hashScrollThrottle);
