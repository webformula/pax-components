const { Page, html } = require('@webformula/pax-core');

module.exports = class Panel extends Page {
  constructor() {
    super();
    this.isAnchor = false;
  }

  connectedCallback() {
    this.anchorSelect.style.display = 'none';
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

        .small-container {
          width: 280px;
          height: 40px;
          margin: auto;
          background-color: #dcdcdc;
        }
      </style>
      <article class="page-article">
        <h3>Panel</h3>

        <div style="display: flex; align-items: center;">
          <div style="padding-right: 24px; flex-direction: column; display: flex;">
            <mdw-select>
              <select onchange="$Panel.setDemoPanelContainer(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value="container">container</option>
                <option value="anchor">anchor</option>
              </select>
              <label>Container</label>
            </mdw-select>

            <div style="padding: 12px;"></div>

            <mdw-select id="containerSelect">
              <select onchange="$Panel.setDemoPanelPosition(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value="top left">top left</option>
                <option value="top right">top right</option>
                <option value="bottom left">bottom left</option>
                <option value="bottom right">bottom right</option>

                <option value="top center">top center</option>
                <option value="bottom center">bottom center</option>
                <option value="center left">center left</option>
                <option value="center right">center right</option>
                <option value="center center">center center</option>
              </select>
              <label>Positon</label>
            </mdw-select>

            <mdw-select id="anchorSelect">
              <select onchange="$Panel.setDemoPanelPosition(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value="top left">top left</option>
                <option value="top right">top right</option>
                <option value="bottom left">bottom left</option>
                <option value="bottom right">bottom right</option>
                <option value="top center">top center</option>
                <option value="bottom center">bottom center</option>
                <option value="center left">center left</option>
                <option value="center right">center right</option>
                <option value="center center">center center</option>
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
              <mdw-panel id="demoPanel" position="top left" open>
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
              <h6>Position top left - container</h6>
            </div>

            <div class="mdw-card__content--no-padding" style="background-color: #f3f3f3;">
              <code-mirror type="html">
                <mdw-panel position="top left" open>
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </code-mirror>
            </div>

            <div class="mdw-card__content mdw-panel--container" style="height: 54px;">
              <mdw-panel position="top left" open>
                <div style="padding: 12px;">
                  hello
                </div>
              </mdw-panel>
            </div>
          </mdw-card>

          <div style="padding:12px;"></div>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Position top left - anchor</h6>
            </div>

            <div class="mdw-card__content--no-padding" style="background-color: #f3f3f3;">
              <code-mirror type="html">
                <div class="small-container mdw-panel--anchor">
                  <span style="padding: 20px; line-height: 40px;">Anchor</span>

                  <mdw-panel position="top left" open>
                    <div style="padding: 12px;">
                      hello
                    </div>
                  </mdw-panel>
                </div>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="height: 120px;">
              <div class="small-container mdw-panel--anchor">
                <span style="padding: 20px; line-height: 40px;">Anchor</span>

                <mdw-panel position="top left" open>
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </div>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
