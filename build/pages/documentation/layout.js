import {Page} from "/web_modules/@webformula/pax-core/index.js";
export default class Layout extends Page {
  constructor() {
    super();
    this.direction_ = "mdw-row";
    this.wrap_ = "nowrap";
    this.baseWrapped_ = false;
    this.posY_ = "center";
    this.posX_ = "center";
    this.flexA_ = "none";
    this.flexB_ = "none";
  }
  get title() {
    return "Layout";
  }
  setDirection(value) {
    if (value === this.direction_)
      return;
    this.direction_ = value;
    this.render();
  }
  setWrap(value) {
    if (value === this.wrap_)
      return;
    this.wrap_ = value;
    this.render();
  }
  setPosY(value) {
    if (value === this.posY_)
      return;
    this.posY_ = value;
    this.render();
  }
  setPosX(value) {
    if (value === this.posX_)
      return;
    this.posX_ = value;
    this.render();
  }
  setFlexA(value) {
    if (value === this.flexA_)
      return;
    this.flexA_ = value;
    this.render();
  }
  setFlexB(value) {
    if (value === this.flexB_)
      return;
    this.flexB_ = value;
    this.render();
  }
  toggleWrap() {
    this.baseWrapped_ = !this.baseWrapped_;
    document.querySelector(".base-layout-container").classList.toggle("add-wrap", this.baseWrapped_);
  }
  template() {
    return `
    <style>
      .base-layout-container {
        background-color: #EEE;
        width: 100%;
        height: 400px;
      }

      .base-layout-container.add-wrap {
        width: 300px;
        height: 500px;
      }

      .sub-layout-container {
        background-color: #CCC;
        width: 200px;
        height: 160px;
      }

      .sub-layout-container-b {
        background-color: #AAA;
        width: 200px;
        height: 160px;
      }
    </style>

    <article class="page-article">
      <h1 class="article-title">Layout</h1>
      <h2 class="article-subtitle">Basic layout helpers</h2>

      <!-- <div class="links">
        <div class="eyebrow">contents</div>
        <anchor-link selector="#flex-layout" offset="64">Flex</anchor-link>
      </div> -->

      <section>
        <!-- contained -->
        <mdw-card id="flex-layout">
          <div class="mdw-card__content">
            <h6>Flex layout</h6>
            <div class="description">Flex helper attributes</div>
          </div>

          <div class="mdw-card__content" style="display: block;">
            <div>
              <div mdw-row mdw-wrap>
                <mdw-select class="mdw-padding" mdw-enhanced mdw-flex>
                  <select onchange="activePage.setDirection(this.value)">
                    <option value="mdw-row" ${this.direction_ === "mdw-row" ? "selected" : ""}>mdw-row</option>
                    <option value="mdw-column" ${this.direction_ === "mdw-column" ? "selected" : ""}>mdw-column</option>
                  </select>
                  <label>Flex direction</label>
                </mdw-select>

                <mdw-select class="mdw-padding" mdw-enhanced mdw-flex>
                  <select onchange="activePage.setWrap(this.value)">
                    <option value="nowrap" ${this.wrap_ === "nowrap" ? "selected" : ""}>no wrap</option>
                    <option value="mdw-wrap" ${this.wrap_ === "mdw-wrap" ? "selected" : ""}>mdw-wrap</option>
                  </select>
                  <label>Flex wrap</label>
                </mdw-select>
              </div>

              <div mdw-row mdw-wrap>
                <mdw-select class="mdw-padding" mdw-enhanced mdw-flex>
                  <select onchange="activePage.setPosY(this.value)">
                    <option value="center" ${this.posY_ === "center" ? "selected" : ""}>center</option>
                    <option value="start" ${this.posY_ === "start" ? "selected" : ""}>start (left)</option>
                    <option value="end" ${this.posY_ === "end" ? "selected" : ""}>end (right)</option>
                    <option value="space-around" ${this.posY_ === "space-around" ? "selected" : ""}>space-around</option>
                    <option value="space-between" ${this.posY_ === "space-between" ? "selected" : ""}>space-between</option>
                    <option value="space-evenly" ${this.posY_ === "space-evenly" ? "selected" : ""}>space-evenly</option>
                  </select>
                  <label>Positon Justify (X)</label>
                </mdw-select>

                <mdw-select class="mdw-padding" mdw-enhanced mdw-flex>
                  <select onchange="activePage.setPosX(this.value)">
                    <option value="center" ${this.posX_ === "center" ? "selected" : ""}>center</option>
                    <option value="start" ${this.posX_ === "start" ? "selected" : ""}>start (top)</option>
                    <option value="end" ${this.posX_ === "end" ? "selected" : ""}>end (bottom)</option>
                    <option value="space-around" ${this.posX_ === "space-around" ? "selected" : ""}>space-around</option>
                    <option value="space-between" ${this.posX_ === "space-between" ? "selected" : ""}>space-between</option>
                    <option value="space-evenly" ${this.posX_ === "space-evenly" ? "selected" : ""}>space-evenly</option>
                  </select>
                  <label>Positon Align (Y)</label>
                </mdw-select>
              </div>

              <div mdw-row mdw-wrap>
                <mdw-select class="mdw-padding" mdw-enhanced mdw-flex>
                  <select onchange="activePage.setFlexA(this.value)">
                    <option value="none" ${this.flexA_ === "none" ? "selected" : ""}>none</option>
                    <option value="1" ${this.flexA_ === "1" ? "selected" : ""}>1</option>
                    <option value=".33" ${this.flexA_ === ".33" ? "selected" : ""}>.33</option>
                    <option value=".5" ${this.flexA_ === ".5" ? "selected" : ""}>.5</option>
                    <option value=".66" ${this.flexA_ === ".66" ? "selected" : ""}>.66</option>
                    <option value=".75" ${this.flexA_ === ".75" ? "selected" : ""}>.75</option>
                  </select>
                  <label>Box a flex</label>
                </mdw-select>

                <mdw-select class="mdw-padding" mdw-enhanced mdw-flex>
                  <select onchange="activePage.setFlexB(this.value)">
                    <option value="none" ${this.flexB_ === "none" ? "selected" : ""}>none</option>
                    <option value="1" ${this.flexB_ === "1" ? "selected" : ""}>1</option>
                    <option value=".33" ${this.flexB_ === ".33" ? "selected" : ""}>.33</option>
                    <option value=".5" ${this.flexB_ === ".5" ? "selected" : ""}>.5</option>
                    <option value=".66" ${this.flexB_ === ".66" ? "selected" : ""}>.66</option>
                    <option value=".75" ${this.flexB_ === ".75" ? "selected" : ""}>.75</option>
                  </select>
                  <label>Box b flex</label>
                </mdw-select>
              </div>
            </div>
          </div>


          <div class="mdw-card__content" style="display: block;">
            <div style="margin-bottom: 12px;" mdw-row>
              <span mdw-flex></span>
              <mdw-button onclick="activePage.toggleWrap()">Test wrap (change container width)</mdw-button>
            </div>

            <div class="base-layout-container ${this.baseWrapped_ ? "add-wrap" : ""}" ${this.direction_} ${this.wrap_ === "mdw-wrap" ? "mdw-wrap" : ""} mdw-flex-position="${this.posY_} ${this.posX_}">
              <div class="sub-layout-container" ${this.flexA_ !== "none" ? `mdw-flex="${this.flexA_}"` : ""}></div>
              <div class="sub-layout-container-b" ${this.flexB_ !== "none" ? `mdw-flex="${this.flexB_}"` : ""}></div>
            </div>
          </div>


          <div class="mdw-card__content--no-padding">
            <monaco-editor language="html">
                <style>
                  .sub-layout-container {
                    background-color: #CCC;
                    width: 200px;
                    height: 160px;
                  }

                  .sub-layout-container-b {
                    background-color: #AAA;
                    width: 200px;
                    height: 160px;
                  }
                </style>

                <div ${this.direction_} ${this.wrap_ === "mdw-wrap" ? "mdw-wrap" : ""} mdw-flex-position="${this.posY_} ${this.posX_}">
                  <div class="sub-layout-container" ${this.flexA_ !== "none" ? `mdw-flex="${this.flexA_}"` : ""}></div>
                  <div class="sub-layout-container-b" ${this.flexB_ !== "none" ? `mdw-flex="${this.flexB_}"` : ""}></div>
                </div>
            </monaco-editor>
          </div>
        </mdw-card>
      </section>

      <section mdw-row>
        <mdw-button class="mdw-secondary" href="#/documentation/theme">< theme</mdw-button>
        <span mdw-flex></span>
        <mdw-button class="mdw-secondary" href="#/documentation/density">density ></mdw-button>
      </section>
    </article>
    `;
  }
}
