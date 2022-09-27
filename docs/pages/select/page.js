import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }

  async search(value) {
    const select = document.querySelector('#select-search');

    if (!value) {
      select.options = [
        'One',
        'Two',
        'Three',
        'Four',
        'Five'
      ];
      return;
    }

    select.options = [
      'One',
      'Two',
      'Three',
      'Four',
      'Five'
    ].filter(v => v.toLowerCase().includes(value.toLowerCase().trim()));
  }
}
