import { Page } from '@webformula/pax-core';

export default class Switch extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Switch';
  }

  change(e) {
    console.log('change', e);
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Switch</h3>

        <div class="showcase mdw-elevation-1">
          <label>Label</label>
          <mdw-switch onchange="$Switch.change(this)" checked></mdw-switch>
        </div>

        <a href="https://material.io/design/components/selection-controls.html#switches" target="_new">Material Design Guidlines: switches</a>
        <p>Switches toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#labels" offset="64">Labels</anchor-link>
          <anchor-link selector="#themes" offset="64">Themes</anchor-link>
        </div>

        <section id="labels">
          <h4>Examples</h4>

          <!-- label -->
          <mdw-card id="contained">
            <div class="mdw-card__content">
              <h6>Label</h6>
              <div class="description">Switch with labels</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <div class="column">
                  <div>
                    <label>On left</label>
                    <mdw-switch onchange=""></mdw-switch>
                  </div>

                  <mdw-divider class="mdw-dark mdw-large-padding"></mdw-divider>

                  <div>
                    <mdw-switch onchange=""></mdw-switch>
                    <label>On right</label>
                  </div>
                </div>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="column">
                <div>
                  <label>On left</label>
                  <mdw-switch onchange=""></mdw-switch>
                </div>

                <mdw-divider class="mdw-dark mdw-large-padding"></mdw-divider>

                <div>
                  <mdw-switch onchange=""></mdw-switch>
                  <label>On right</label>
                </div>
              </div>
            </div>
          </mdw-card>

          <!-- themes -->
          <mdw-card id="themes">
            <div class="mdw-card__content">
              <h6>Themes</h6>
              <div class="description">Contained buttons have more emphasis, as they use use a color fill and shadow</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-switch mdw-flex="1" onchange="" checked></mdw-switch>
                <mdw-switch class="mdw-primary" mdw-flex="1" onchange="" checked></mdw-switch>
                <mdw-switch class="mdw-error" mdw-flex="1" onchange="" checked></mdw-switch>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-switch mdw-flex="1" onchange="" checked></mdw-switch>
              <mdw-switch class="mdw-primary" mdw-flex="1" onchange="" checked></mdw-switch>
              <mdw-switch class="mdw-error" mdw-flex="1" onchange="" checked></mdw-switch>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
