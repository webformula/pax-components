import { Page } from '@webformula/pax-core';

export default class LinearProgress extends Page {
  constructor() {
    super();
  }

  connectedCallback() {
    this.value = 0;
    this.pc = document.querySelector('#dynamic-pc');
    this.progressInterval = setInterval(() => {
      this.value += 0.1;
      if (this.value > 100) {
        clearInterval(this.progressInterval);
        this.progressInterval = undefined;
      }
      this.pc.setAttribute('mdw-percent', this.value);
    }, 7);
  }

  disconnectedCallback() {
    if (this.progressInterval) clearInterval(this.progressInterval);
  }

  get title() {
    return 'Linear Progress';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Linear Progress</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-linear-progress mdw-mode="indeterminate"></mdw-linear-progress>
        </div>

        <a href="https://material.io/design/components/progress-indicators.html#linear-progress-indicators" target="_new">Material Design Guidelines: Circular progress</a>
        <p>Circular progress indicators display progress by animating an indicator along an invisible linear track in a clockwise direction. They can be applied directly to a surface, such as a button or card</p>

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
              <div class="mdw-subtitle">linear indicators fill the invisible, linear track with color, as the indicator moves from 0 to 360 degrees</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-linear-progress mdw-percent="50"></mdw-linear-progress>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-linear-progress id="dynamic-pc" mdw-percent="0"></mdw-linear-progress>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Indeterminate</h6>
              <div class="mdw-subtitle">linear indicators grow and shrink in size while moving along the invisible track</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-linear-progress mdw-mode="indeterminate"></mdw-linear-progress>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-linear-progress mdw-mode="indeterminate"></mdw-linear-progress>
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
                <mdw-linear-progress mdw-mode="indeterminate" class="mdw-primary" ></mdw-linear-progress>
                <mdw-linear-progress mdw-mode="indeterminate" class="mdw-secondary" ></mdw-linear-progress>
                <mdw-linear-progress mdw-mode="indeterminate" class="mdw-error" ></mdw-linear-progress>
                <mdw-linear-progress mdw-mode="indeterminate" class="mdw-grey"></mdw-linear-progress>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-primary" style="margin-bottom: 2px;"></mdw-linear-progress>
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-secondary" style="margin-bottom: 2px;"></mdw-linear-progress>
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-error" style="margin-bottom: 2px;"></mdw-linear-progress>
              <mdw-linear-progress mdw-mode="indeterminate" class="mdw-grey"></mdw-linear-progress>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
