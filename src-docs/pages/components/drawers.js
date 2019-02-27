const { Page, html } = require('@webformula/pax-core');

module.exports = class Drawers extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Drawers';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Drawers</h3>

        <div class="showcase">
          <mdw-drawer style="z-index: 1;">
            <div class="header">
              <span class="title">Nav title</span>
            </div>

            <div class="content">
              <nav>
                <mdw-button>Link</mdw-button>
              </nav>
            </div>
          </mdw-drawer>
        </div>

        <a hreef="https://material.io/design/components/navigation-drawer.html#">Material Design Guidlines: Navigation Drawer</a>
        <p>Navigation drawers provide access to destinations in your app.</p>


        <section id="types">
          <h4>Types</h4>

          <div class="codecase">
            <div class="title">Standard</div>
            <code-mirror mode="html">
              <mdw-body>
                <mdw-drawer>
                  <div class="header">
                    <span class="title">Nav title</span>
                  </div>

                  <div class="content">
                    <nav>
                      <mdw-button>Link</mdw-button>
                    </nav>
                  </div>
                </mdw-drawer>

                <mdw-page>
                  <mdw-top-app-bar>
                    <!-- content -->
                  </mdw-top-app-bar>
                  <mdw-content>
                    <!-- main page content -->
                  </mdw-content>
                </mdw-page>
              </mdw-body>
            </code-mirror>
            <div class="demo">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="drawer-standard.html"></iframe>
            </div>
          </div>

        </section>

      </article>
    `;
  }
};
