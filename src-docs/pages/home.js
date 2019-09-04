import { Page, html } from '@webformula/pax-core';

export default class Home extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Home';
  }

  template() {
    return html`
      <span>hello world</span>
    `;
  }
}
