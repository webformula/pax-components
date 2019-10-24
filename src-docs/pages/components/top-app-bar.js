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

        <div class="showcase mdw-elevation-1">
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

        <a hreef="https://material.io/design/components/app-bars-top.html" target="_new">Material Design Guidlines: Top app bar</a>
        <p>The top app bar displays information and actions relating to the current screen</p>


        <section id="types">
          <h4>Types</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-top-app-bar class="mdw-fixed">
                  <section>
                    <mdw-icon>menu</mdw-icon>
                    <span class="title">Standard</span>
                  </section>
                  <section>
                    <mdw-icon>bookmark</mdw-icon>
                  </section>
                </mdw-top-app-bar>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="top-app-bar-standard.html"></iframe>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Fixed</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-top-app-bar class="mdw-fixed">
                  <section>
                    <mdw-icon>menu</mdw-icon>
                    <span class="title">Fixed</span>
                  </section>
                  <section>
                    <mdw-icon>bookmark</mdw-icon>
                  </section>
                </mdw-top-app-bar>
              </monaco-editor>
            </div>
            <div class="mdw-card__content">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="top-app-bar-fixed.html"></iframe>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
