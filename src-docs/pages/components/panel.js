import { Page, html } from '@webformula/pax-core';

export default class Panel extends Page {
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
    this.demoPanel.setAttribute('mdw-position', `${this.posY || 'top'} ${this.posX || 'left'}`);
    this.demoPanel.setPositionStyle();
  }

  setDemoPanelState(value) {
    if (value === 'closed') {
      this.demoPanel.classList.remove('mdw-open');
    } else {
      this.demoPanel.classList.add('mdw-open');
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

        <div row>
          <div flex=".33" column>
            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Panel.setDemoPanelPositionY(this.value)">
                <option value="top">top</option>
                <option value="inner-top" selected>inner-top</option>
                <option value="bottom">bottom</option>
                <option value="inner-bottom">inner-bottom</option>
                <option value="center">center</option>
              </select>
              <label>Positon Y</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Panel.setDemoPanelPositionX(this.value)">
                <option value="left">left</option>
                <option value="inner-left" selected>inner-left</option>
                <option value="right">right</option>
                <option value="inner-right">inner-right</option>
                <option value="center">center</option>
              </select>
              <label>Positon X</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Panel.setDemoPanelState(this.value)">
                <option value="open" selected>Open</option>
                <option value="closed">Closed</option>
              </select>
              <label>State</label>
            </mdw-select>
          </div>

          <div flex=".66">
            <div class="showcase mdw-elevation-1">
              <div class="container mdw-panel--container">
                <mdw-panel id="demoPanel" mdw-position="inner-top inner-left" class="mdw-open">
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </div>
            </div>
          </div>
        </div>


        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#positon-top-left" offset="64">Position: top left</anchor-link>
          <anchor-link selector="#positon-inner-top-inner-left" offset="64">Position: inner-top inner-left</anchor-link>
        </div>


        <section id="types">
          <h4>Examples</h4>

          <mdw-card id="positon-top-left">
            <div class="mdw-card__content">
              <h6>Position: inner-top inner-left</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <div class="small-container mdw-panel--container">
                  <mdw-panel mdw-position="top left" class="mdw-open">
                    <div style="padding: 12px;">
                      hello
                    </div>
                  </mdw-panel>
                </div>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="height: 120px;">
              <div class="small-container mdw-panel--container">
                <mdw-panel mdw-position="top left" class="mdw-open">
                  <div style="padding: 12px;">
                    hello
                  </div>
                </mdw-panel>
              </div>
            </div>
          </mdw-card>

          <mdw-card id="positon-inner-top-inner-left">
            <div class="mdw-card__content">
              <h6>Position: top left</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <div class="mdw-panel--container">
                  <mdw-panel mdw-position="inner-top inner-left" class="mdw-open">
                    <div style="padding: 12px;">
                      hello
                    </div>
                  </mdw-panel>
                </div>
              </code-mirror>
            </div>

            <div class="mdw-card__content" style="height: 120px;">
              <div class="mdw-panel--container">
                <mdw-panel mdw-position="inner-top inner-left" class="mdw-open">
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
}
