import { Page } from '/web_modules/@webformula/pax-core';

export default class Templates extends Page {
  constructor() {
    super();

    this.variable = 'the variable';
  }

  get title() {
    return 'Templates';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Templates</h3>
        <p>Dynamically load and show html</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#one" offset="64">Direct to component: Load template from url</anchor-link>
        </div>


        <section id="types">
          <h4>Examples</h4>

          <mdw-card id="one">
            <div class="mdw-card__content">
              <h6>Direct to component: Load template from url</h6>
              <div class="description">Pass a url to the template component</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <!-- add template to page -->
                <mdw-template mdw-url="http://site/test.html"></mdw-template>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-template mdw-url="./test.html"></mdw-template>
            </div>
          </mdw-card>

          <mdw-card id="two">
            <div class="mdw-card__content">
              <h6>Direct to component: Load template from url with template variables</h6>
              <div class="description">Pass a url to the template component</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
                // page variable
                this.variable = 'the variable';
              </monaco-editor>

              <monaco-editor language="html">
                <!-- variable.html -->
                <div>\${this.variable}</div>
              </monaco-editor>

              <monaco-editor language="html">
                <!-- add template to page -->
                <mdw-template mdw-url="http://site/variables.html"></mdw-template>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-template mdw-url="./variables.html"></mdw-template>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
