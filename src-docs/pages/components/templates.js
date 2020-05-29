import { Page } from '@webformula/pax-core';

export default class Templates extends Page {
  constructor() {
    super();

    MDWTemplate.registerOnce('one', `
      <div>one</div>
    `);

    this.value = 'Two';
    MDWTemplate.registerOnce('two', () => `
      <div>${activePage.value}</div>
    `);

    MDWTemplate.registerAndLoad('three', 'http://localhost:8081/dist-docs/test.html');
  }

  get title() {
    return 'Templates';
  }

  connectedCallback() {
    document.querySelector('#vs-one').content = `
      // register template
      MDWTemplate.registerOnce('one', \`
        <div>one</div>
      \`);
    `;

    document.querySelector('#vs-two').content = `
      // variable set in page class
      this.value = 'Two';

      // we are passing in a function that returns a string
      MDWTemplate.registerOnce('two', () => \`
        // if template is created outside of the page class you can use active page
        <div>\${activePage.value}</div>
        
        // if template is created inside of the page class you can use this
        <div>\${this.value}</div>
      \`);
    `;

    document.querySelector('#vs-three').content = `
      // register and load template immediately
      MDWTemplate.registerAndLoad('three', 'http://site/test.html');

      // register. This will load on demand
      MDWTemplate.register('three', 'http://site/test.html');

      // Both of theme methods will cache the template in memory
    `;
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Templates</h3>
        <p>Dynamically load and show html</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#one" offset="64">Template string</anchor-link>
          <anchor-link selector="#two" offset="64">Template With variable</anchor-link>
          <anchor-link selector="#three" offset="64">Load template from url</anchor-link>
          <anchor-link selector="#four" offset="64">Direct to component: Load template from url</anchor-link>
        </div>


        <section id="types">
          <h4>Examples</h4>

          <!-- label -->
          <mdw-card id="one">
            <div class="mdw-card__content">
              <h6>Template string</h6>
              <div class="description">Basic template string</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript" id="vs-one">
              </monaco-editor>

              <monaco-editor language="html">
                <!-- add template to page -->
                <mdw-template template-id="one"></mdw-template>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-template template-id="one"></mdw-template>
            </div>
          </mdw-card>


          <mdw-card id="two">
            <div class="mdw-card__content">
              <h6>Template With variable</h6>
              <div class="description">Basic template with variable from the page</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript" id="vs-two">
              </monaco-editor>

              <monaco-editor language="html">
                <!-- add template to page -->
                <mdw-template template-id="two"></mdw-template>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-template template-id="two"></mdw-template>
            </div>
          </mdw-card>

          <mdw-card id="three">
            <div class="mdw-card__content">
              <h6>Load template from url</h6>
              <div class="description">Basic template with variable from the page</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript" id="vs-three">
              </monaco-editor>

              <monaco-editor language="html">
                <!-- add template to page -->
                <mdw-template template-id="three"></mdw-template>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-template template-id="three"></mdw-template>
            </div>
          </mdw-card>


          <mdw-card id="four">
            <div class="mdw-card__content">
              <h6>Direct to component: Load template from url</h6>
              <div class="description">Pass a url to the template component</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <!-- add template to page -->
                <mdw-template template-url="http://site/test.html"></mdw-template>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block; overflow: visible;">
              <mdw-template template-url="http://localhost:8081/dist-docs/test.html"></mdw-template>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
