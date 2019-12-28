import { Page, html } from '@webformula/pax-core';

export default class Panel extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    this.demoPanel.open();
  }

  get title() {
    return 'Panel';
  }

  get demoPanel() {
    return document.querySelector('#demoPanel');
  }

  get anchor() {
    if (!this._anchor) this._anchor = document.querySelector('.container');
    return this._anchor;
  }

  get anchorSelect() {
    if (!this._anchorSelect) this._anchorSelect = document.querySelector('#anchorSelect');
    return this._anchorSelect;
  }

  get containerSelect() {
    if (!this._containerSelect) this._containerSelect = document.querySelector('#containerSelect');
    return this._containerSelect;
  }

  setDemoPanelPositionY(value) {
    this.posY = value;
    this.setDemoPanelPosition();
  }

  setDemoPanelPositionX(value) {
    this.posX = value;
    this.setDemoPanelPosition();
  }

  setDemoPanelTarget(value) {
    if (!this.demoPanel.setTarget) return;
    this.demoPanel.setTarget(value);
    this.demoPanel._setPosition();
  }

  setDemoPanelPosition() {
    this.demoPanel.setAttribute('mdw-position', `${this.posX || 'left'} ${this.posY || 'top'}`);
  }

  setDemoPanelState(value) {
    if (!this.demoPanel.open) return;

    if (value === 'closed') {
      this.demoPanel.close();
    } else {
      this.demoPanel.open();
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

        <div mdw-row>
          <div mdw-flex=".33" mdw-column>
            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Panel.setDemoPanelPositionY(this.value)">
                <option value="top">top</option>
                <option value="inner-top">inner-top</option>
                <option value="bottom">bottom</option>
                <option value="inner-bottom">inner-bottom</option>
                <option value="center" selected>center</option>
              </select>
              <label>Positon Y</label>
            </mdw-select>

            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Panel.setDemoPanelPositionX(this.value)">
                <option value="left">left</option>
                <option value="inner-left">inner-left</option>
                <option value="right">right</option>
                <option value="inner-right">inner-right</option>
                <option value="center" selected>center</option>
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

            <mdw-select class="mdw-padding" mdw-enhanced>
              <select onchange="$Panel.setDemoPanelTarget(this.value)">
                <option value="#the-target" selected>box</option>
                <option value="mdw-content">mdw-content</option>
                <option value="body">body</option>
              </select>
              <label>Target</label>
            </mdw-select>
          </div>

          <div mdw-flex=".66">
            <div class="showcase mdw-elevation-1">
              <div id="the-target" class="container mdw-panel--container">
                <mdw-panel id="demoPanel" mdw-position="center center">
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
              <h6>Overlay panel</h6>
              <div class="mdw-subtitle">This is how your panel can be at the top layer and track a nested element</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <div>
                  <mdw-panel id="thepanel" mdw-position="left top">
                    <div style="padding: 12px;">
                      hello
                    </div>
                  </mdw-panel>
                </div>
              </monaco-editor>

              <monaco-editor language="javascript">
                // hoist panel to body so it overlays everything
                // This will still use the parent element as the target
                const panel = document.querySelector('#thepanel');
                panel.hoistToBody();
              </monaco-editor>
            </div>
          </mdw-card>


          <mdw-card id="positon-top-left">
            <div class="mdw-card__content">
              <h6>Set target</h6>
              <div class="mdw-subtitle">You can have the panel is inside of a different element than its target</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <div>
                  <mdw-panel mdw-target="#thetarget" mdw-position="left top">
                    <div style="padding: 12px;">
                      hello
                    </div>
                  </mdw-panel>

                  <div id="thetarget"></div>
                </div>
              </monaco-editor>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
