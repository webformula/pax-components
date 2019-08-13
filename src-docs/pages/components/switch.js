const { Page, html } = require('@webformula/pax-core');

module.exports = class Switch extends Page {
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
    return html`
      <article class="page-article">
        <h3>Switch</h3>

        <div class="showcase">
          <label>Label</label>
          <mdw-switch onchange="$Switch.change(this)" checked></mdw-switch>
        </div>

        <a href="https://material.io/design/components/selection-controls.html#switches">Material Design Guidlines: switches</a>
        <p>Switches toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#labels" offset="64">Labels</anchor-link>
          <anchor-link selector="#themes" offset="64">Themes</anchor-link>
        </div>

        <section id="labels">
          <h4>Types</h4>

          <!-- label -->
          <mdw-card id="contained">
            <div class="mdw-card__content">
              <h6>Label</h6>
              <div class="description">Switch with labels</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
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
              </code-mirror>
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
              <code-mirror mode="html">
                <mdw-switch flex="1" onchange="" checked></mdw-switch>
                <mdw-switch class="mdw-primary" flex="1" onchange="" checked></mdw-switch>
                <mdw-switch class="mdw-error" flex="1" onchange="" checked></mdw-switch>
              </code-mirror>
            </div>

            <div class="mdw-card__content row">
              <mdw-switch flex="1" onchange="" checked></mdw-switch>
              <mdw-switch class="mdw-primary" flex="1" onchange="" checked></mdw-switch>
              <mdw-switch class="mdw-error" flex="1" onchange="" checked></mdw-switch>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
