const { Page, html } = require('@webformula/pax-core');

module.exports = class Banners extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Banners';
  }

  makeBanner() {
    MDWBanner.create({
      message: 'This is a message and it is awesome!'
    });
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Banners</h3>

        <div class="showcase">
          <!-- you can use id to reference the components class -->
          <!-- you can also walk the tree this.parentNode.parentNode.dismiss()-->
          <!-- <mdw-banner id="banner1" style="display: none;">
            <div>This is a message and it is awsome!</div>
            <div>
              <mdw-button>got it</mdw-button>
              <mdw-button onclick="banner1.dismiss()">dismiss</mdw-button>
            </div>
          </mdw-banner> -->
        </div>

        <a href="https://material.io/design/components/banners.html">Material Design Guidlines: Banners</a>
        <p>A banner displays a prominent message and related optional actions. Banners are more important than snackbars but leess important then dialogs.</p>

        <!-- <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div> -->

        <section id="types">
          <h4>Examples</h4>

          <div class="codecase">
            <div class="title">Simple message</div>
            <div class="description">Text buttons are typically used for less important actions</div>
            <code-mirror mode="javascript">
              <code>
                MDWBanner.create({
                  message: 'This is a message and it is awesome!'
                });
              </code>
            </code-mirror>
            <div class="demo">
              <mdw-button onclick="$Banners.makeBanner()">show banner</mdw-button>
            </div>
          </div>

        </section>

        <!-- <section id="theming">
          <h4>Theming</h4>

          <div class="codecase">
            <div class="title">Colors</div>
            <code-mirror mode="html">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </div>
          </div>
        </section> -->

      </article>
    `;
  }
};
