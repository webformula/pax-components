const { Page, html } = require('@webformula/pax-core');

module.exports = class Switch extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Switch';
  }

  change(e) {
    console.log('change', e);
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Switch</h3>

        <div class="showcase">
          <label>Label</label>
          <mdw-switch onchange="$Switch.change(this)"></mdw-switch>
        </div>

      </article>
    `;
  }
};
