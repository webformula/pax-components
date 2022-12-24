import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  constructor() {
    super();
  }

  template() {
    return this.renderTemplateString(html);
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

    await this.wait(500);
    select.options = [
      'One',
      'Two',
      'Three',
      'Four',
      'Five'
    ].filter(v => v.toLowerCase().includes(value.toLowerCase().trim()));
  }

  async searchOnEnter(value) {
    const select = document.querySelector('#select-search-on-enter');

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

    await this.wait(500);
    select.options = [
      'One',
      'Two',
      'Three',
      'Four',
      'Five'
    ].filter(v => v.toLowerCase().includes(value.toLowerCase().trim()));
  }


  async wait(time = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    });
  }
}
