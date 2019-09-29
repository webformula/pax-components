import { Page, html } from '@webformula/pax-core';

export default class Mobile extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Home';
  }

  template() {
    return html`
    <article class="page-article">
      <h3>Mobile</h3>
      <h5>Tools to help with mobile development</h5>

      <p></p>
    </article>
    `;
  }
}
