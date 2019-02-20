const { Page, html } = require('@webformula/pax-core');

module.exports = class Buttons extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Buttons';
  }

  mockWait() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Buttons</h3>

        <div class="showcase">
          <mdw-button>basic</mdw-button>
          <mdw-button raised class="primary">raised</mdw-button>
        </div>

        <div>
          <mdw-button>basic</mdw-button>
          <mdw-button raised>raised</mdw-button>
          <mdw-button unelevated class="primary">unelevated primary</mdw-button>
          <mdw-button outlined class="secondary">outlined secondary</mdw-button>
          <mdw-button raised shaped class="primary">shaped primary</mdw-button>
          <mdw-button dense raised>dense raised</mdw-button>
          <mdw-button dense outlined shaped class="error">dense outlined shaped error</mdw-button>
          <mdw-button raised class="primary" async="$Buttons.mockWait()" onclick="console.log('should not log')">Async</mdw-button>
        </div>
      </article>
    `;
  }
};
