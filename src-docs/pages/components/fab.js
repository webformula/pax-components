const { Page, html, css } = require('@webformula/pax-core');

module.exports = class FAB extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'FAB (Floating action button)';
  }

  mockWait(fab) {
    if (fab.pending) return;
    setTimeout(() => {
      fab.resolve();
    }, 3000);
  }

  get demoFAB() {
    if (!this.demoFAB_) this.demoFAB_ = document.querySelector('#demoFAB');
    return this.demoFAB_;
  }

  setPositionY(value) {
    this.posY = value;
    this.setDemoPanelPosition();
  }

  setPositionX(value) {
    this.posX = value;
    this.setDemoPanelPosition();
  }

  setDemoPanelPosition() {
    this.demoFAB.setAttribute('mdw-position', `${this.posY || ''} ${this.posX || ''}`.trim());
  }

  template() {
    return html`
      <article class="page-article">
        <h3>FAB (Floating action buttons)</h3>

        <div style="display: flex; align-items: center;">
          <div style="padding-right: 24px; flex-direction: column; display: flex; width: 200px;">
            <mdw-select id="vertical-position">
              <select onchange="$FAB.setPositionY(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value=" ">none</option>
                <option value="top">top</option>
                <option value="bottom">bottom</option>
                <option value="center">center</option>
              </select>
              <label>Positon Y</label>
            </mdw-select>

            <div style="padding: 12px;"></div>

            <mdw-select id="horizontal-position">
              <select onchange="$FAB.setPositionX(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value=" ">none</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="center">center</option>
              </select>
              <label>Positon X</label>
            </mdw-select>
          </div>

          <div class="showcase" style="flex: 1;">
            <mdw-fab id="demoFAB">
              <mdw-icon>favorite_border</mdw-icon>
            </mdw-fab>
          </div>
        </div>

        <a href="https://material.io/design/components/buttons.html">Material Design Guidlines: Buttons</a>
        <p>Buttons allow users to take actions, and make choices, with a single tap</p>

        <!-- <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div> -->

        <section id="types">
          <h4>Types</h4>

          <!-- Dense -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Dense</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-fab class="mdw-dense mdw-error">
                  <mdw-icon>delete</mdw-icon>
                </mdw-fab>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
            <mdw-fab id="dense-error" class="mdw-dense mdw-error">
              <mdw-icon>delete</mdw-icon>
            </mdw-fab>
            </div>
          </mdw-card>


          <!-- extended -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Extended</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-fab class="mdw-extended mdw-primary">
                  <mdw-icon>add</mdw-icon>
                  create
                </mdw-fab>

                <mdw-fab class="mdw-extended mdw-secondary">
                  <mdw-icon>edit</mdw-icon>
                  edit
                </mdw-fab>

                <mdw-fab class="mdw-extended mdw-error">
                  remove
                </mdw-fab>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-fab class="mdw-extended mdw-primary">
                <mdw-icon>add</mdw-icon>
                create
              </mdw-fab>

              <mdw-fab class="mdw-extended mdw-secondary">
                <mdw-icon>edit</mdw-icon>
                edit
              </mdw-fab>

              <mdw-fab class="mdw-extended mdw-error">
                remove
              </mdw-fab>
            </div>
          </mdw-card>


          <!-- async -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Async with spinner</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-fab class="mdw-primary" mdw-async onclick="$FAB.mockWait(this)">
                  <mdw-icon>create</mdw-icon>
                </mdw-fab>

                <mdw-fab class="mdw-dense mdw-secondary" mdw-async onclick="$FAB.mockWait(this)">
                  <mdw-icon>create</mdw-icon>
                </mdw-fab>
              </code-mirror>
              <code-mirror mode="javascript">
                <code>
                  class Buttons extends Page {
                    constructor() {
                      super();
                    }

                    mockWait(fab) {
                      if (fab.pending) return;
                      setTimeout(() => {
                        fab.resolve();
                      }, 3000);
                    }
                  }
                </code>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-fab class="mdw-primary" mdw-async onclick="$FAB.mockWait(this)">
                <mdw-icon>create</mdw-icon>
              </mdw-fab>

              <mdw-fab class="mdw-dense mdw-secondary" mdw-async onclick="$FAB.mockWait(this)">
                <mdw-icon>create</mdw-icon>
              </mdw-fab>
            </div>
          </mdw-card>

        </section>

      </article>
    `;
  }
};
