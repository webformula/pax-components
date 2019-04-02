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
            <input name="test" value="" />
            <label for="test">Test</label>
          </mdw-textfield>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Standard input</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-textfield>
                  <input name="test" value="" />
                  <label for="test">Test</label>
                </mdw-textfield>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-textfield>
                <input name="test" value="" />
                <label for="test">Test</label>
                <!-- this is only needed if you are expecting there to be no web component support and you want the ripple animation  -->
              </mdw-textfield>
              <!-- <mdw-hint>ssome hint</mdw-hint> -->
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Outlined input</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-textfield outlined>
                  <input name="test" value="" />
                  <label for="test">Test</label>
                </mdw-textfield>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-textfield outlined>
                <input name="test" value="" />
                <label for="test">Test</label>
                <!-- this is only needed if you are expecting there to be no web component support and you want the ripple animation  -->
              </mdw-textfield>
              <!-- <mdw-hint>ssome hint</mdw-hint> -->
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
