import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }

  toggleLabel() {
    document.querySelector('#hide-label').classList.toggle('mdw-hide-label');
  }
}
