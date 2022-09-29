import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }

  connectedCallback() {
    document.querySelector('#autocomplete-text-field').autocomplete = 'complete';
    document.querySelector('#require-custom').setCustomValidity('Custom error message');
  }
}
