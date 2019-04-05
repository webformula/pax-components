const { Page, html } = require('@webformula/pax-core');

module.exports = class Panel extends Page {
  constructor() {
    super();
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

  setDemoPanelPositionY(value) {
    this.posY = value;
    this.setDemoPanelPosition();
  }

  setDemoPanelPositionX(value) {
    this.posX = value;
    this.setDemoPanelPosition();
  }

  setDemoPanelPosition() {
    this.demoPanel.setAttribute('position', `${this.posY || 'top'} ${this.posX || 'left'}`);
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
              <select onchange="$Panel.setDemoPanelPositionY(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value="top">top</option>
                <option value="inner-top">inner-top</option>
                <option value="bottom">bottom</option>
                <option value="inner-bottom">inner-bottom</option>
                <option value="center">center</option>
              </select>
              <label>Positon Y</label>
            </mdw-select>

            <div style="padding: 12px;"></div>

            <mdw-select>
              <select onchange="$Panel.setDemoPanelPositionX(this.value)" style="width: 200px;">
                <option selected disabled></option>
                <option value="left">left</option>
                <option value="inner-left">inner-left</option>
                <option value="right">right</option>
                <option value="inner-right">inner-right</option>
                <option value="center">center</option>
              </select>
              <label>Positon X</label>
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
