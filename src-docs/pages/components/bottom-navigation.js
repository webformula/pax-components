import { Page, html } from '@webformula/pax-core';

export default class BottomNavigation extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Bottom navigation';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Bottom navigation</h3>

        <div class="showcase">
          <mdw-bottom-navigation>
            <mdw-button>
              <mdw-icon>home</mdw-icon>
              Home
            </mdw-button>

            <mdw-button>
              <mdw-icon>home</mdw-icon>
            </mdw-button>
          </mdw-bottom-navigation>
        </div>

        <a hreef="https://material.io/design/components/app-bars-top.html#">Material Design Guidlines: Top app bar</a>
        <p>The top app bar displays information and actions relating to the current screen</p>

      </article>
    `;
  }
}
