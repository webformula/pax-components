import {Page} from "/web_modules/@webformula/pax-core/index.js";
export default class CircularProgress extends Page {
  constructor() {
    super();
  }
  connectedCallback() {
    this.value = 0;
    this.pc = document.querySelector("#dynamic-pc");
    this.progressInterval = setInterval(() => {
      this.value += 1;
      if (this.value > 100) {
        clearInterval(this.progressInterval);
        this.progressInterval = void 0;
      }
      this.pc.setAttribute("value", this.value);
    }, 70);
  }
  disconnectedCallback() {
    if (this.progressInterval)
      clearInterval(this.progressInterval);
  }
  get title() {
    return "Circular Progress";
  }
  template() {
    return `
      <article class="page-article">
        <h3>Circular Progress</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-circular-progress mdw-mode="indeterminate"></mdw-circular-progress>
        </div>

        <a href="https://material.io/design/components/progress-indicators.html#circular-progress-indicators" target="_new">Material Design Guidelines: Circular progress</a>
        <p>Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Determinate</h6>
              <div class="mdw-subtitle">circular indicators fill the invisible, circular track with color, as the indicator moves from 0 to 360 degrees</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                  <mdw-circular-progress value="50" mdw-diameter="50"></mdw-circular-progress>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <div class="demo">
                <mdw-circular-progress id="dynamic-pc" value="0" mdw-diameter="50"></mdw-circular-progress>
              </div>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Indeterminate</h6>
              <div class="mdw-subtitle">circular indicators grow and shrink in size while moving along the invisible track</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                  <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="50"></mdw-circular-progress>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <div class="demo">
                <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="50"></mdw-circular-progress>
              </div>
            </div>
          </mdw-card>

        </section>

        <section id="theming">
          <h4>Theming</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Colors</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                  <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="60" class="mdw-primary" ></mdw-circular-progress>
                  <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="50" class="mdw-secondary" ></mdw-circular-progress>
                  <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="40" class="mdw-error" ></mdw-circular-progress>
                  <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="30" class="mdw-grey"></mdw-circular-progress>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" mdw-row style="align-items: center;">
              <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="60" class="mdw-primary" ></mdw-circular-progress>
              <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="50" class="mdw-secondary" ></mdw-circular-progress>
              <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="40" class="mdw-error" ></mdw-circular-progress>
              <mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="30" class="mdw-grey"></mdw-circular-progress>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
