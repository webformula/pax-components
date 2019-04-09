const { Page, html } = require('@webformula/pax-core');

module.exports = class Textfield extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Textfield';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Textfield</h3>

        <div class="showcase">
          <mdw-textfield>
            <input>
            <label>Test</label>
            <mdw-textfield-helper>
              <mdw-helper-text persistent>Helper text</mdw-helper-text>
            </mdw-textfield-helper>
          </mdw-textfield>
        </div>

        <a href="https://material.io/design/components/text-fields.html">Material Design Guidlines: Text fields</a>
        <p>Text fields let users enter and edit text</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <!-- outlined -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Helper text</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-textfield outlined>
                  <input>
                  <label>label</label>
                </mdw-textfield>
              </code-mirror>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield outlined>
                <input>
                <label>label</label>
              </mdw-textfield>
            </div>
          </mdw-card>

          <!-- with helper text -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Helper text</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-textfield>
                  <input>
                  <label>With helper text</label>

                  <mdw-textfield-helper>
                    <mdw-helper-text persistent>Helper text</mdw-helper-text>
                  </mdw-textfield-helper>
                </mdw-textfield>
              </code-mirror>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield>
                <input>
                <label>With helper text</label>

                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>
            </div>
          </mdw-card>


          <!-- with validation text -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Helper text</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-textfield>
                  <input required>
                  <label>With validation text</label>

                  <mdw-textfield-helper>
                    <mdw-helper-text persistent>Helper text</mdw-helper-text>
                    <mdw-helper-text validation>Required</mdw-helper-text>
                  </mdw-textfield-helper>
                </mdw-textfield>
              </code-mirror>
            </div>

            <div class="mdw-card__content block">
              <mdw-textfield>
                <input required>
                <label>With validation text</label>

                <mdw-textfield-helper>
                  <mdw-helper-text persistent>Helper text</mdw-helper-text>
                  <mdw-helper-text validation>Required</mdw-helper-text>
                </mdw-textfield-helper>
              </mdw-textfield>
            </div>
          </mdw-card>

          <!-- icons -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Icons</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-textfield>
                  <mdw-icon>calendar</mdw-icon>
                  <input required>
                  <label>With validation text</label>
                </mdw-textfield>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <div style="flex: 1">
                <mdw-textfield>
                  <mdw-icon>events</mdw-icon>
                  <input>
                  <label>Begin icon</label>
                </mdw-textfield>
              </div>

              <div style="flex: 1">
                <mdw-textfield>
                  <input>
                  <label>End icon</label>
                  <mdw-icon>delete</mdw-icon>
                </mdw-textfield>
              </div>
            </div>
          </mdw-card>


        </section>

      </article>
    `;
  }
};
