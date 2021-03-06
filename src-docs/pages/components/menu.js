import { Page } from '@webformula/pax-core';

export default class Menu extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Menu';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Menu</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-menu>
            <mdw-button>show menu</mdw-button>
            <mdw-menu-content>
              <mdw-list>
                <mdw-list-item>
                  <span class="mdw-list-item__graphic material-icons">inbox</span>
                  Inbox
                </mdw-list-item>

                <mdw-list-item>
                  <span class="mdw-list-item__graphic material-icons">star</span>
                  Two
                </mdw-list-item>

                <mdw-list-item>
                  <span class="mdw-list-item__graphic material-icons"></span>
                  With Spacer
                </mdw-list-item>

                <mdw-list-item>
                  No Spacer
                </mdw-list-item>
              </mdw-list>
            </mdw-menu-content>
          </mdw-menu>
        </div>

        <a href="https://material.io/design/components/menus.html" target="_new">Material Design Guidelines: menus</a>
        <p>Menus display a list of choices on temporary surfaces</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#button" offset="64">Button</anchor-link>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <!-- label -->
          <mdw-card id="button">
            <div class="mdw-card__content">
              <h6>Button</h6>
              <div class="description">Attach menu to button</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-menu>
                  <mdw-button>show menu</mdw-button>
                  <mdw-menu-content>
                    <mdw-list>
                      <mdw-list-item>
                        <span class="mdw-list-item__graphic material-icons">inbox</span>
                        Inbox
                      </mdw-list-item>

                      <mdw-list-item>
                        <span class="mdw-list-item__graphic material-icons">star</span>
                        Two
                      </mdw-list-item>

                      <mdw-list-item>
                        <span class="mdw-list-item__graphic material-icons"></span>
                        With Spacer
                      </mdw-list-item>

                      <mdw-list-item>
                        No Spacer
                      </mdw-list-item>
                    </mdw-list>
                  </mdw-menu-content>
                </mdw-menu>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-menu>
                <mdw-button>show menu</mdw-button>
                <mdw-menu-content>
                  <mdw-list>
                    <mdw-list-item>
                      <span class="mdw-list-item__graphic material-icons">inbox</span>
                      Inbox
                    </mdw-list-item>

                    <mdw-list-item>
                      <span class="mdw-list-item__graphic material-icons">star</span>
                      Two
                    </mdw-list-item>

                    <mdw-list-item>
                      <span class="mdw-list-item__graphic material-icons"></span>
                      With Spacer
                    </mdw-list-item>

                    <mdw-list-item>
                      No Spacer
                    </mdw-list-item>
                  </mdw-list>
                </mdw-menu-content>
              </mdw-menu>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
