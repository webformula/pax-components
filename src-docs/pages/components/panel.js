const { Page, html } = require('@webformula/pax-core');

module.exports = class Panel extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    const panelEl = document.querySelector('#button-panel');
    // panelEl.position = 'left top';
    // panelEl.position = 'left bottom';
    // panelEl.position = 'right top';
    // panelEl.position = 'right bottom';
    // panelEl.position = 'left center';
    // panelEl.position = 'right center';
    // panelEl.position = 'center top';
    // panelEl.position = 'center bottom';
    // panelEl.position = 'center center';
    // panelEl.position = 'right inner_top';
    // panelEl.position = 'right inner_bottom';
    // panelEl.position = 'inner_left bottom';
    // panelEl.position = 'inner_right bottom';

    panelEl.position = 'inner_left bottom';
  }

  get title() {
    return 'Panel';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Panel</h3>

        <div class="showcase">
          <mdw-panel class="mdw-panel--open">
            <div style="padding: 12px;">
              hello
            </div>
          </mdw-panel>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Basic with header and media</h6>
            </div>

            <div class="mdw-card__content--no-padding" style="background-color: #f3f3f3;">
              <code-mirror type="html">

              </code-mirror>
            </div>

            <div class="mdw-card__content mdw-panel__anchor" style="flex-direction: row">
              <!-- <div class="mdw-panel__anchor"> -->
                <mdw-button onclick="document.querySelector('#button-panel').open()">open</mdw-button>
                <mdw-panel id="button-panel">
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </div>
            <!-- </div> -->
          </mdw-card>
        </section>

      </article>
    `;
  }
};
