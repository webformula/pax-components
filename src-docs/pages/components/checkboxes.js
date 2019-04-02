const { Page, html } = require('@webformula/pax-core');

module.exports = class Checkboxes extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Checkboxes';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Checkboxes</h3>

        <div class="showcase">
          <mdw-checkbox indeterminate>
            <input type="checkbox">
            <div class="background">
              <div class="checkmark"></div>
              <div class="mixedmark"></div>
            </div>
          </mdw-checkbox>
        </div>

        <a href="https://material.io/design/components/selection-controls.html#checkboxes">Material Design Guidlines: Checkboxes</a>
        <p>Checkboxes allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>States</h4>

          <div class="codecase">
            <div class="title">Unselected</div>
            <code-mirror mode="html">
              <mdw-checkbox></mdw-checkbox>
            </code-mirror>
            <div class="demo">
              <mdw-checkbox></mdw-checkbox>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Selected</div>
            <code-mirror mode="html">
              <mdw-checkbox checked></mdw-checkbox>
            </code-mirror>
            <div class="demo">
              <mdw-checkbox checked></mdw-checkbox>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Indeterminate</div>
            <code-mirror mode="html">
              <mdw-checkbox indeterminate></mdw-checkbox>
            </code-mirror>
            <div class="demo">
              <mdw-checkbox indeterminate></mdw-checkbox>
            </div>
          </div>

        </section>

        <section id="theming">
          <h4>Theming</h4>

          <div class="codecase">
            <div class="title">Colors</div>
            <div class="description">The default color for checkboxes is "secondary"</div>
            <code-mirror mode="html">
              <mdw-checkbox checked></mdw-checkbox>
              <mdw-checkbox checked class="primary"></mdw-checkbox>
              <mdw-checkbox checked class="secondary"></mdw-checkbox>
              <mdw-checkbox checked class="error"></mdw-checkbox>
            </code-mirror>
            <div class="demo">
              <mdw-checkbox checked></mdw-checkbox>
              <mdw-checkbox checked class="primary"></mdw-checkbox>
              <mdw-checkbox checked class="secondary"></mdw-checkbox>
              <mdw-checkbox checked class="error"></mdw-checkbox>
            </div>
          </div>
        </section>

      </article>
    `;
  }
};
