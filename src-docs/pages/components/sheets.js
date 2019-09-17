import { Page, html } from '@webformula/pax-core';

export default class Sheets extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Sheets ';
  }

  handleNavLClick(listItem) {
    const currentActive = document.querySelector('#top-example mdw-list-item[active]');
    if (currentActive) currentActive.removeAttribute('active');
    listItem.setAttribute('active', 'active');
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Sheets </h3>

        <div class="showcase" style="overflow: hidden">
          <mdw-button onclick="document.querySelector('mdw-sheet').toggle()">show</mdw-button>
          <mdw-sheet mdw-modal>
            <mdw-list>
              <mdw-list-item>One</mdw-list-item>
              <mdw-list-item>Two</mdw-list-item>
              <mdw-list-item>Three</mdw-list-item>
              <mdw-list-item>Four</mdw-list-item>
              <mdw-list-item>Five</mdw-list-item>
              <mdw-list-item>Six</mdw-list-item>
              <mdw-list-item>Seven</mdw-list-item>
              <mdw-list-item>Eight</mdw-list-item>
              <mdw-list-item>Nine</mdw-list-item>
              <mdw-list-item>Ten</mdw-list-item>
              <mdw-list-item>Eleven</mdw-list-item>
              <mdw-list-item>Twelve</mdw-list-item>
              <mdw-list-item>Thirteen</mdw-list-item>
              <mdw-list-item>Fourteen</mdw-list-item>
              <mdw-list-item>Fifteen</mdw-list-item>
              <mdw-list-item>Sixteen</mdw-list-item>
            </mdw-list>
          </mdw-sheet>


          <mdw-button onclick="document.querySelector('#sheet-header').toggle()">show</mdw-button>
          <mdw-sheet id="sheet-header">
            <mdw-sheet-header>
            </mdw-sheet-header>

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
                <span class="mdw-list-item__graphic material-icons">add</span>
                Three
              </mdw-list-item>
            </mdw-list>
          </mdw-sheet>
        </div>

        <a hreef="https://material.io/design/components/navigation-drawer.html#">Material Design Guidlines: Navigation Drawer</a>
        <p>Navigation drawers provide access to destinations in your app.</p>


        <section id="types">
          <h4>Types</h4>
        </section>

      </article>
    `;
  }
}
