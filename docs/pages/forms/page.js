import { Page } from '@webformula/pax-core';
import html from './page.html';

// TODO mdw-forms

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }
}
