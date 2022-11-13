import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }

  connectedCallback() {
    document.querySelector('.mdw-type-filter').addEventListener('change', event => {
      console.log(event.target);
    });
  }
}
