import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  constructor() {
    super();
  }

  template() {
    return this.renderTemplateString(html);
  }

  connectedCallback() {
    // document.querySelector('#autocomplete-text-field').autocomplete = 'autocomplete';
    // document.querySelector('#require-custom').setCustomValidity('Custom error message');
  }
}
