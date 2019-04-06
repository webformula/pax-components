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

          <!-- labels -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>labels</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-checkbox right>
                  <label>Label</label>
                </mdw-checkbox>
                <mdw-checkbox>
                  <label>Label</label>
                </mdw-checkbox>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox right>
                <label left>Label</label>
              </mdw-checkbox>
              <mdw-checkbox>
                <label left>Label</label>
              </mdw-checkbox>
            </div>
          </mdw-card>


          <!-- Unselected -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Unselected</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-checkbox></mdw-checkbox>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox></mdw-checkbox>
            </div>
          </mdw-card>


          <!-- Checked -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Checked</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-checkbox checked></mdw-checkbox>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox checked></mdw-checkbox>
            </div>
          </mdw-card>

          <!-- Indeterminate -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Indeterminate</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-checkbox indeterminate class="primary"></mdw-checkbox>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox indeterminate class="primary"></mdw-checkbox>
            </div>
          </mdw-card>

        </section>

        <section id="theming">
          <h4>Theming</h4>

          <!-- Colors -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Colors</h6>
              <div class="description">The default color for checkboxes is "secondary"</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-checkbox checked></mdw-checkbox>
                <mdw-checkbox checked class="primary"></mdw-checkbox>
                <mdw-checkbox checked class="secondary"></mdw-checkbox>
                <mdw-checkbox checked class="error"></mdw-checkbox>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox checked></mdw-checkbox>
              <mdw-checkbox checked class="primary"></mdw-checkbox>
              <mdw-checkbox checked class="secondary"></mdw-checkbox>
              <mdw-checkbox checked class="error"></mdw-checkbox>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
