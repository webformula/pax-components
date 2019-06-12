const { Page, html } = require('@webformula/pax-core');

module.exports = class Tabs extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Tabs';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Tabs</h3>

        <div class="showcase">
          <mdw-tabs>
            <mdw-tab>one</mdw-tab>
            <mdw-tab>two</mdw-tab>
            <mdw-tab>three</mdw-tab>
          </mdw-tabs>
        </div>

      </article>
    `;
  }
};
