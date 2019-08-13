const { Page, html } = require('@webformula/pax-core');

module.exports = class Drawers extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Drawers';
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Drawers</h3>

        <div class="showcase">
          <mdw-drawer class="mdw-locked-open" id="top-example">

            <mdw-drawer-header>
              <div class="mdw-title">Nav title</div>
              <div class="mdw-subtitle">Pages</div>
            </mdw-drawer-header>

            <mdw-drawer-content>
              <mdw-list>
                <mdw-list-item active onclick="$Drawers.handleNavLClick(this)">
                  <span class="mdw-list-item__graphic material-icons">inbox</span>
                  Inbox
                </mdw-list-item>

                <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
                  <span class="mdw-list-item__graphic material-icons">star</span>
                  Two
                </mdw-list-item>

                <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
                  <span class="mdw-list-item__graphic material-icons"></span>
                  With Spacer
                </mdw-list-item>

                <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
                  No Spacer
                </mdw-list-item>
              </mdw-list>
            </mdw-drawer-content>
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
                <mdw-drawer class="mdw-locked-open">
                  <mdw-drawer-header>
                    <div class="mdw-title">Nav title</div>
                    <div class="mdw-subtitle">Pages</div>
                  </mdw-drawer-header>

                  <mdw-drawer-content>
                    <mdw-list>
                      <mdw-list-item active onclick="$Drawers.handleNavLClick(this)">
                        <span class="mdw-list-item__graphic material-icons">inbox</span>
                        Inbox
                      </mdw-list-item>

                      <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
                        <span class="mdw-list-item__graphic material-icons">star</span>
                        Two
                      </mdw-list-item>
                    </mdw-list>
                  </mdw-drawer-content>
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
