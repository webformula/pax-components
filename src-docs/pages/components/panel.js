const { Page, html } = require('@webformula/pax-core');

module.exports = class Panel extends Page {
  constructor() {
    super();
    this.isAnchor = false;
  }

  connectedCallback() {
    this.anchorSelect.style.display = 'none';
    // const panelEl = document.querySelector('#button-panel');
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

    // panelEl.position = 'inner_left bottom';
  }

  get title() {
    return 'Panel';
  }

  get demoPanel() {
    if (!this.demoPanel_) this.demoPanel_ = document.querySelector('#demoPanel');
    return this.demoPanel_;
  }

  get anchor() {
    if (!this.anchor_) this.anchor_ = document.querySelector('.container');
    return this.anchor_;
  }

  get anchorSelect() {
    if (!this.anchorSelect_) this.anchorSelect_ = document.querySelector('#anchorSelect');
    return this.anchorSelect_;
  }

  get containerSelect() {
    if (!this.containerSelect_) this.containerSelect_ = document.querySelector('#containerSelect');
    return this.containerSelect_;
  }

  setDemoPanelPosition(value) {
    this.demoPanel.setAttribute('position', value);
  }

  setDemoPanelContainer(value) {
    if (value === 'anchor') {
      this.containerSelect.style.display = 'none';
      this.anchorSelect.style.display = 'inline-flex';
      this.anchor.classList.add('mdw-panel--anchor');
      this.anchor.classList.remove('mdw-panel--container');
    } else {
      this.anchorSelect.style.display = 'none';
      this.containerSelect.style.display = 'inline-flex';
      this.anchor.classList.remove('mdw-panel--anchor');
      this.anchor.classList.add('mdw-panel--container');
    }
  }

  template() {
    return html`
      <style>
        .container {
          width: 280px;
          height: 140px;
          margin: auto;
          background-color: #dcdcdc;
        }
      </style>
      <article class="page-article">
        <h3>Panel</h3>

        <div style="display: flex; align-items: center;">
          <div style="padding-right: 24px; flex-direction: column; display: flex;">
            <mdw-select>
              <select onchange="$Panel.setDemoPanelContainer(this.value)">
                <option selected disabled></option>
                <option value="container">container</option>
                <option value="anchor">anchor</option>
              </select>
              <label>Container</label>
            </mdw-select>

            <div style="padding: 12px;"></div>

            <mdw-select id="containerSelect">
              <select onchange="$Panel.setDemoPanelPosition(this.value)">
                <option selected disabled></option>
                <option value="top left">top left</option>
                <option value="top right">top right</option>
                <option value="bottom left">bottom left</option>
                <option value="bottom right">bottom right</option>
              </select>
              <label>Positon</label>
            </mdw-select>

            <mdw-select id="anchorSelect">
              <select onchange="$Panel.setDemoPanelPosition(this.value)">
                <option selected disabled></option>
                <option value="top left">top left</option>
                <option value="top right">top right</option>
                <option value="bottom left">bottom left</option>
                <option value="bottom right">bottom right</option>
                <option value="top inner-left">top inner-left</option>
                <option value="top inner-right">top inner-right</option>
                <option value="bottom inner-left">bottom inner-left</option>
                <option value="bottom inner-right">bottom inner-right</option>
                <option value="inner-top left">inner-top left</option>
                <option value="inner-top right">inner-top right</option>
                <option value="inner-bottom left">inner-bottom left</option>
                <option value="inner-bottom right">inner-bottom right</option>
              </select>
              <label>Positon</label>
            </mdw-select>
          </div>

          <div class="showcase" style="flex: 1;">
            <div class="container mdw-panel--container">
              <mdw-panel id="demoPanel" class="mdw-panel--open" position="top left">
                <div style="padding: 12px;">
                  hello
                </div>
              </mdw-panel>
            </div>
          </div>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Orient top left - no target</h6>
            </div>

            <div class="mdw-card__content--no-padding" style="background-color: #f3f3f3;">
              <code-mirror type="html">
                <mdw-panel style="height: 54px;">
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="height: 54px;">
              <mdw-panel class="mdw-panel--open">
                <div style="padding: 12px;">
                  hello
                </div>
              </mdw-panel>
            </div>
          </mdw-card>

          <!-- <mdw-card>
            <div class="mdw-card__content">
              <h6>Basic with header and media</h6>
            </div>

            <div class="mdw-card__content--no-padding" style="background-color: #f3f3f3;">
              <code-mirror type="html">

              </code-mirror>
            </div>

            <div class="mdw-card__content mdw-panel__anchor" style="flex-direction: row">
                <mdw-button onclick="document.querySelector('#button-panel').open()">open</mdw-button>
                <mdw-panel id="button-panel">
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </div>
          </mdw-card> -->
        </section>

      </article>
    `;
  }
};
