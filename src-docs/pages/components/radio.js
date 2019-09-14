import { Page, html } from '@webformula/pax-core';

export default class Radio extends Page {
  constructor() {
    super();
    this.initialValue = 'on';
  }

  get title() {
    return 'Selects';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Selects</h3>

        <div class="showcase">
          <mdw-radio-group mdw-column name="test" mdw-value="${this.initialValue}">
            <mdw-radio>
              <label>On</label>
              <input value="on">
            </mdw-radio>

            <mdw-radio>
              <label>off</label>
              <input value="off">
            </mdw-radio>
          </mdw-radio-group>
        </div>


        <a href="https://material.io/components/selection-controls/#radio-buttons">Material Design Guidlines: Radio controls</a>
        <p>Radio buttons allow the user to select one option from a set. Use radio buttons when the user needs to see all available options. If available options can be collapsed, consider using a dropdown menu because it uses less space</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#horizontal-with-labels" offset="64">Horizontal: with labels</anchor-link>
          <anchor-link selector="#horizontal-no-labels" offset="64">Horizontal: no labels</anchor-link>
          <anchor-link selector="#vertical-no-labels" offset="64">Vertical: no labels</anchor-link>
          <anchor-link selector="#vertical-with-labels" offset="64">Vertical: with labels</anchor-link>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <!-- Horizontal -->
          <mdw-card id="horizontal-with-labels">
            <div class="mdw-card__content">
              <h6>Horizontal: no labels</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-radio-group mdw-value="${this.initialValue}">
                  <mdw-radio>
                    <label>On</label>
                    <input value="on">
                  </mdw-radio>

                  <span class="mdw-spacer"></span>

                  <mdw-radio>
                    <label>off</label>
                    <input value="off">
                  </mdw-radio>
                </mdw-radio-group>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-radio-group mdw-value="${this.initialValue}">
                <mdw-radio>
                  <label>On</label>
                  <input value="on">
                </mdw-radio>

                <span class="mdw-spacer"></span>

                <mdw-radio>
                  <label>off</label>
                  <input value="off">
                </mdw-radio>
              </mdw-radio-group>
            </div>
          </mdw-card>

          <mdw-card id="horizontal-no-labels">
            <div class="mdw-card__content">
              <h6>Horizontal: no labels</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-radio-group>
                  <mdw-radio>
                    <input value="on">
                  </mdw-radio>

                  <span class="mdw-spacer"></span>

                  <mdw-radio>
                    <input value="off">
                  </mdw-radio>
                </mdw-radio-group>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-radio-group>
                <mdw-radio>
                  <input value="on">
                </mdw-radio>

                <span class="mdw-spacer"></span>

                <mdw-radio>
                  <input value="off">
                </mdw-radio>
              </mdw-radio-group>
            </div>
          </mdw-card>



          <!-- Vertical -->
          <mdw-card id="vertical-no-labels">
            <div class="mdw-card__content">
              <h6>Vertical: no labels</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-radio-group mdw-column>
                  <mdw-radio>
                    <input value="on">
                  </mdw-radio>

                  <span class="mdw-spacer"></span>

                  <mdw-radio>
                    <input value="off">
                  </mdw-radio>
                </mdw-radio-group>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-radio-group mdw-column>
                <mdw-radio>
                  <input value="on">
                </mdw-radio>

                <span class="mdw-spacer"></span>

                <mdw-radio>
                  <input value="off">
                </mdw-radio>
              </mdw-radio-group>
            </div>
          </mdw-card>

          <mdw-card id="vertical-with-labels">
            <div class="mdw-card__content">
              <h6>Vertical: no labels</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-radio-group mdw-column>
                  <mdw-radio>
                    <label>On</label>
                    <input value="on">
                  </mdw-radio>

                  <span class="mdw-spacer"></span>

                  <mdw-radio>
                    <label>off</label>
                    <input value="off">
                  </mdw-radio>
                </mdw-radio-group>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-radio-group mdw-column>
                <mdw-radio>
                  <label>On</label>
                  <input value="on">
                </mdw-radio>

                <span class="mdw-spacer"></span>

                <mdw-radio>
                  <label>off</label>
                  <input value="off">
                </mdw-radio>
              </mdw-radio-group>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
