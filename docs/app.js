import './dracula.css';
import './main.css';
import '@webformula/pax-components';
import { registerPage } from '@webformula/pax-core';
import home from './pages/home/page.js';
import buttons from './pages/buttons/page.js';
import cards from './pages/cards/page.js';
import iconButtons from './pages/icon buttons/page.js';


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



window.addEventListener('locationchange', () => {
  setTimeout(() => {
    hljs.highlightAll();
  }, 0)
});

window.addEventListener('load', () => {
  hljs.highlightAll();
});
