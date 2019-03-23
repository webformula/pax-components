const { Page, html } = require('@webformula/pax-core');

module.exports = class Menu extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Menu';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Menu</h3>

        <div class="showcase">
          <mdw-menu class="mdw-panel--open">
            <mdw-button>show menu</mdw-button>
            <mdw-panel>
              <mdw-button>one</mdw-button>
              <mdw-button>two</mdw-button>
              <mdw-button>three</mdw-button>
            <mdw-panel>
          </mdw-menu>
        </div>

        <section id="types">
          <h4>Examples</h4>
        </section>

      </article>
    `;
  }
};
