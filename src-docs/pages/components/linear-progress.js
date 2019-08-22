import { Page, html } from '@webformula/pax-core';

export default class LinearProgress extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    this.value = 0;
    this.pc = document.querySelector('#dynamic-pc');
    this.progressInterval = setInterval(() => {
      this.value += 1;
      if (this.value > 100) {
        clearInterval(this.progressInterval);
        this.progressInterval = undefined;
      }
      this.pc.setAttribute('mdw-percent', this.value);
    }, 70);
  }

  disconnectedCallback() {
    if (this.progressInterval) clearInterval(this.progressInterval);
  }

  get title() {
    return 'Linear Progress';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Linear Progress</h3>

        <div class="showcase">
          <mdw-linear-progress mdw-mode="indeterminate"></mdw-linear-progress>
        </div>

        <a href="https://material.io/design/components/progress-indicators.html#linear-progress-indicators">Material Design Guidlines: Circular progress</a>
        <p>Circular progress indicators display progress by animating an indicator along an invisible linear track in a clockwise direction. They can be applied directly to a surface, such as a button or card</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <div class="codecase">
            <div class="title">Determinate</div>
            <div class="description">linear indicators fill the invisible, linear track with color, as the indicator moves from 0 to 360 degrees</div>
            <code-mirror mode="html">
              <mdw-linear-progress mdw-percent="50"></mdw-linear-progress>
            </code-mirror>
            <div class="demo">
              <mdw-linear-progress id="dynamic-pc" mdw-percent="0"></mdw-linear-progress>
            </div>
          </div>

          <div class="codecase">
            <div class="title">Indeterminate</div>
            <div class="description">linear indicators grow and shrink in size while moving along the invisible track</div>
            <code-mirror mode="html">
              <mdw-linear-progress mdw-mode="indeterminate"></mdw-linear-progress>
            </code-mirror>
            <div class="demo">
              <mdw-linear-progress mdw-mode="indeterminate"></mdw-linear-progress>
            </div>
          </div>

        </section>

        <section id="theming">
          <h4>Theming</h4>

          <div class="codecase">
            <div class="title">Colors</div>
            <code-mirror mode="html">
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-primary" ></mdw-linear-progress>
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-secondary" ></mdw-linear-progress>
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-error" ></mdw-linear-progress>
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-grey"></mdw-linear-progress>
            </code-mirror>

            <div class="demo">
            <mdw-linear-progress mdw-mode="indeterminate" class="mdw-primary" ></mdw-linear-progress>
            <mdw-linear-progress mdw-mode="indeterminate" class="mdw-secondary" ></mdw-linear-progress>
            <mdw-linear-progress mdw-mode="indeterminate" class="mdw-error" ></mdw-linear-progress>
            <mdw-linear-progress mdw-mode="indeterminate" class="mdw-grey"></mdw-linear-progress>
            </div>
          </div>
        </section>

      </article>
    `;
  }
}
