const { Page, html } = require('@webformula/pax-core');

module.exports = class Slider extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Slider';
  }

  connectedCallback() {
    document.querySelector('#slider1').addEventListener('change', this.onChange);
  }

  disconnectedCallback() {
    document.querySelector('#slider1').removeEventListener('change', this.onChange);
  }

  onChange(e) {
    console.log(e.target.value);
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Slider</h3>

        <div class="showcase">
          <mdw-slider id="slider1" min="0" max="100" value="50"></mdw-slider>
        </div>

        <a href="https://material.io/design/components/sliders.html">Material Design Guidlines: Sliders</a>
        <p>Sliders allow users to make selections from a range of values</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#notched">Notched</anchor-link>
          <anchor-link selector="#offset">Offset min value</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <!-- contained -->
          <mdw-card id="notched">
            <div class="mdw-card__content">
              <h6>Notched</h6>
              <div class="description">Snap value to 10's</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-slider min="0" max="100" step="10" value="50" class="mdw-primary"></mdw-slider>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-slider min="0" max="100" step="10" value="50" class="mdw-primary"></mdw-slider>
            </div>
          </mdw-card>

          <mdw-card id="offset">
            <div class="mdw-card__content">
              <h6>Offset min value</h6>
              <div class="description">Min value is 50 and max is 100 (50 - 100), default value will be adjusted to be min</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-slider min="50" max="100" value="0" class="mdw-error"></mdw-slider>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-slider min="50" max="100" value="0" class="mdw-error"></mdw-slider>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
