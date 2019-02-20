const { Page, html } = require('@webformula/pax-core');

module.exports = class Home extends Page {
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
};
