import { Page, html } from '@webformula/pax-core';

export default class TopAppBar extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Top app bar';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Top app bar</h3>

        <div class="showcase">
          <mdw-top-app-bar style="width: 400px; position: relative;">
            <section>
              <mdw-icon>menu</mdw-icon>
              <span class="title">pax-components</span>
            </section>

            <section>
              <mdw-icon>home</mdw-icon>
            </section>
          </mdw-top-app-bar>
        </div>

        <a hreef="https://material.io/design/components/app-bars-top.html#">Material Design Guidlines: Top app bar</a>
        <p>The top app bar displays information and actions relating to the current screen</p>


        <section id="types">
          <h4>Types</h4>

          <div class="codecase">
            <div class="title">Standard</div>
            <code-mirror mode="html">
              <mdw-top-app-bar class="mdw-fixed">
                <section>
                  <mdw-icon>menu</mdw-icon>
                  <span class="title">Standard</span>
                </section>
                <section>
                  <mdw-icon>bookmark</mdw-icon>
                </section>
              </mdw-top-app-bar>
            </code-mirror>
            <div class="demo">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="top-app-bar-standard.html"></iframe>
            </div>
          </div>

          <div class="codecase">
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
          </div>


        </section>

      </article>
    `;
  }
}
