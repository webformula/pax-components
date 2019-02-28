const { Page, html } = require('@webformula/pax-core');

module.exports = class Cards extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Cards';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Cards</h3>

        <div class="showcase">
          <mdw-card>
            <div class="mdw-card-content">
              <div class="mdw-card-primary">
                <h6>Card title</h6>
                <h3>subtitle text</h3>
              </div>

              <div class="mdw-card-supporting-text">
                Visit ten places on our planet that are undergoing the biggest changes today.
              </div>
            </div>

            <div class="mdw-card-actions">
              <div>
                <mdw-button>action 1</mdw-button>
                <mdw-button>action 2</mdw-button>
              </div>
            </div>
          </mdw-card>
        </div>

        <a href="https://material.io/design/components/cards.html">Material Design Guidlines: Banners</a>
        <p>Cards contain content and actions about a single subject</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <!-- <anchor-link selector="#Types">Types</anchor-link> -->
          <!-- <anchor-link selector="#theming">Theming</anchor-link> -->
        </div>

        <section id="types">
          <h4>Examples</h4>

        </section>

      </article>
    `;
  }
};
