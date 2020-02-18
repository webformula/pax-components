import { Page, html } from '@webformula/pax-core';

export default class Drawers extends Page {
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

        <div class="showcase mdw-elevation-1">
          <mdw-drawer class="mdw-locked-open-mobile" id="top-example">

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

        <a href="https://material.io/components/navigation-drawer/" target="_new">Material Design Guidlines: Navigation Drawer</a>
        <p>Navigation drawers provide access to destinations in your app</p>


        <section id="types">
          <h4>Types</h4>

          <mdw-card id="with-click">
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html" content="${`
                <body>
                  <mdw-drawer class='mdw-locked-open'>
                    <mdw-drawer-header>
                      <div class='mdw-title'>Nav title</div>
                      <div class='mdw-subtitle'>Pages</div>
                    </mdw-drawer-header>

                    <mdw-drawer-content>
                      <mdw-list>
                        <mdw-list-item active onclick='$Drawers.handleNavLClick(this)'>
                          <span class='mdw-list-item__graphic material-icons'>inbox</span>
                          Inbox
                        </mdw-list-item>

                        <mdw-list-item onclick='$Drawers.handleNavLClick(this)'>
                          <span class='mdw-list-item__graphic material-icons'>star</span>
                          Two
                        </mdw-list-item>
                      </mdw-list>
                    </mdw-drawer-content>
                  </mdw-drawer>

                  <mdw-page>
                    <mdw-top-app-bar>
                      <section>
                        <mdw-icon onclick="document.querySelector('mdw-drawer').toggle()">menu</mdw-icon>
                        <span class='title'>Example</span>
                      </section>
                    </mdw-top-app-bar>
                    <mdw-content>
                      <!-- main page content -->
                    </mdw-content>
                  </mdw-page>
                </body>
              `}"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="drawer-standard.html"></iframe>
              </div>
            </div>
          </mdw-card>



          <div class="mdw-card__content--no-padding">
              <monaco-editor language="html" content="${`
                <body>
                  <mdw-drawer class='mdw-locked-open'>
                    <mdw-drawer-header>
                      <div class='mdw-title'>Nav title</div>
                      <div class='mdw-subtitle'>Pages</div>
                    </mdw-drawer-header>

                    <mdw-drawer-content>
                      <mdw-list>
                        <mdw-list-item active onclick='$Drawers.handleNavLClick(this)'>
                          <span class='mdw-list-item__graphic material-icons'>inbox</span>
                          Inbox
                        </mdw-list-item>

                        <mdw-list-item onclick='$Drawers.handleNavLClick(this)'>
                          <span class='mdw-list-item__graphic material-icons'>star</span>
                          Two
                        </mdw-list-item>
                      </mdw-list>
                    </mdw-drawer-content>

                    <mdw-drawer-icon-bar>
                      <mdw-drawer-icon-bar--header>
                        <mdw-button class="mdw-icon" onclick="document.querySelector('mdw-drawer').toggle()">
                          <mdw-icon>menu</mdw-icon>
                        </mdw-button>
                      </mdw-drawer-icon-bar--header>

                      <mdw-drawer-icon-bar--content>
                        <mdw-button class="mdw-icon">
                          <mdw-icon>inbox</mdw-icon>
                        </mdw-button>
                        <mdw-button class="mdw-icon">
                          <mdw-icon>star</mdw-icon>
                        </mdw-button>
                        <mdw-button class="mdw-icon">
                          <mdw-icon>inbox</mdw-icon>
                        </mdw-button>
                        <mdw-button class="mdw-icon">
                          <mdw-icon>star</mdw-icon>
                        </mdw-button>
                        <mdw-button class="mdw-icon">
                          <mdw-icon>inbox</mdw-icon>
                        </mdw-button>
                        <mdw-button class="mdw-icon">
                          <mdw-icon>star</mdw-icon>
                        </mdw-button>
                      </mdw-drawer-icon-bar--content>
                    </mdw-drawer-icon-bar>
                  </mdw-drawer>

                  <mdw-page>
                    <mdw-top-app-bar>
                      <section>
                        <mdw-icon onclick="document.querySelector('mdw-drawer').toggle()">menu</mdw-icon>
                        <span class='title'>Example</span>
                      </section>
                    </mdw-top-app-bar>
                    <mdw-content>
                      <!-- main page content -->
                    </mdw-content>
                  </mdw-page>
                </body>
              `}"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="drawer-icon-bar.html"></iframe>
              </div>
            </div>
          </mdw-card>

        </section>

      </article>
    `;
  }
}
