import { Page } from '@webformula/pax-core';

export default class BottomNavigation extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Bottom navigation';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Bottom navigation</h3>

        <div class="showcase">
          <mdw-bottom-navigation style="background-color: var(--mdw-theme-primary); color: var(--mdw-theme-text--on-primary); position: relative;">
            <mdw-button class="mdw-icon mdw-current-link">
              <mdw-icon>home</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>start</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>note</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon">
              <mdw-icon>cake</mdw-icon>
            </mdw-button>
          </mdw-bottom-navigation>
        </div>

        <a href="https://material.io/components/bottom-navigation" target="_new">Material Design Guidelines: Bottom navigation</a>
        <p>Bottom navigation bars allow movement between primary destinations in an app</p>


        <section id="types">
          <h4>Example: mobile</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Mobile</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-bottom-navigation>
                  <mdw-button class="mdw-icon" href="#/">
                    <mdw-icon>home</mdw-icon>
                  </mdw-button>

                  <mdw-button class="mdw-icon" href="#/">
                    <mdw-icon>start</mdw-icon>
                  </mdw-button>

                  <mdw-button class="mdw-icon" href="#/">
                    <mdw-icon>note</mdw-icon>
                  </mdw-button>
                </mdw-bottom-navigation>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <iframe style="width: 400px; height: 600px; border: 1px solid #ddd" src="bottom-navigation-mobile.html"></iframe>
            </div>
          </mdw-card>
        </section>
      </article>
    `;
  }
}
