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
            </mdw-button>

            <mdw-button>
              <mdw-icon>start</mdw-icon>
              Favs
            </mdw-button>

            <mdw-button>
              <mdw-icon>note</mdw-icon>
              Notes
            </mdw-button>

            <mdw-button>
              <mdw-icon>cake</mdw-icon>
              BDay
            </mdw-button>
          </mdw-bottom-navigation>
        </div>

        <a hreef="https://material.io/components/bottom-navigation/">Material Design Guidlines: Bottom navigation</a>
        <p>Bottom navigation bars allow movement between primary destinations in an app</p>


        <section id="types">
          <h4>Example: mobile</h4>

          <div class="codecase">
            <div class="title">Mobile</div>
            <code-mirror mode="html">
                <mdw-bottom-navigation>
                  <mdw-bottom-navigation-fixed>
                    <mdw-button href="#/">
                      <mdw-icon>home</mdw-icon>
                      Home
                    </mdw-button>

                    <mdw-button href="#/">
                      <mdw-icon>start</mdw-icon>
                      Favs
                    </mdw-button>

                    <mdw-button href="#/">
                      <mdw-icon>note</mdw-icon>
                      Notes
                    </mdw-button>
                  </mdw-bottom-navigation-fixed>
                </mdw-bottom-navigation>
            </code-mirror>
            <div class="demo">
              <iframe style="width: 400px; height: 600px; border: 1px solid #ddd" src="bottom-navigation-mobile.html"></iframe>
            </div>
          </div>

          <!-- <div class="codecase">
            <div class="title">Fixed</div>
            <code-mirror mode="html">
              <mdw-top-app-bar class="mdw-fixed">
                <section>
                  <mdw-icon>menu</mdw-icon>
                  <span class="title">Fixed</span>
                </section>
                <section>
                  <mdw-icon>bookmark</mdw-icon>
                </section>
              </mdw-top-app-bar>
            </code-mirror>
            <div class="demo">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="top-app-bar-fixed.html"></iframe>
            </div>
          </div> -->

        </section>

      </article>
    `;
  }
}
