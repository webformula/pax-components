import { Page } from '@webformula/pax-core';

export default class NavigationRail extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Navigation rail';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Navigation rail</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-sheet-side>
            <mdw-sheet-side--header>
              <div class="mdw-title">Nav title</div>
              <div class="mdw-subtitle">Pages</div>
            </mdw-sheet-side--header>

            <mdw-sheet-side--content>
              <mdw-list>
                <mdw-list-item class="mdw-current-link" onclick="$Drawers.handleNavLClick(this)">
                  <span class="mdw-list-item__graphic material-icons">inbox</span>
                  Inbox
                </mdw-list-item>

                <mdw-list-item onclick="$Drawers.handleNavLClick(this)">
                  <span class="mdw-list-item__graphic material-icons">star</span>
                  Two
                </mdw-list-item>
              </mdw-list>
            </mdw-sheet-side--content>
          </mdw-sheet-side>
        </div>

        <a href="https://material.io/components/navigation-rail/" target="_new">Material Design Guidlines: Navigation rail</a>
        <p>Navigation rails provide ergonomic movement between primary destinations in apps</p>


        <section id="types">
          <h4>Types</h4>

          <mdw-card id="with-click">
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <!-- <body> -->
                  <mdw-sheet-side>
                    <mdw-sheet-side--header>
                      <div class="mdw-title">Nav title</div>
                      <div class="mdw-subtitle">Pages</div>
                    </mdw-sheet-side--header>

                    <mdw-sheet-side--content>
                      <nav>
                        <a class="mdw-list-item mdw-current-link" href="">
                          <mdw-icon>inbox</mdw-icon>
                          Inbox
                        </a>

                        <a class="mdw-list-item" href="">
                          <mdw-icon>star</mdw-icon>
                          Two
                        </a>
                      </nav>
                    </mdw-sheet-side--content>
                  </mdw-sheet-side>

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
                <!-- </body> -->
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="drawer-standard.html"></iframe>
              </div>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
