const { Page, html } = require('@webformula/pax-core');

module.exports = class Switch extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Switch';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Switch</h3>

        <div class="showcase">
          <mdw-switch></mdw-switch>
        </div>

      </article>
    `;
  }
};
