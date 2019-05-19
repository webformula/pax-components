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
            <div class="mdw-header">
              <h5>Nav title</h5>
            </div>

            <div class="mdw-content">
              <nav>
                <a>link 1</a>
                <mdw-divider></mdw-divider>
                <a>link 2</a>
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
                  <div class="mdw-header">
                    <h5>Nav title</h5>
                  </div>

                  <div class="mdw-content">
                    <nav>
                      <a>link 1</a>
                      <mdw-divider></mdw-divider>
                      <a>link 2</a>
                    </nav>
                  </div>
                </mdw-drawer>

                <mdw-page>
                  <mdw-top-app-bar>
                    <section>
                      <span class="title">Example</span>
                    </section>
                  </mdw-top-app-bar>
                  <mdw-content>
                    <!-- main page content -->
                  </mdw-content>
                </mdw-page>
              </mdw-body>
            </code-mirror>
            <div class="demo">
              <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="drawer-standard.html"></iframe>
            </div>
          </div>

        </section>

      </article>
    `;
  }
};
