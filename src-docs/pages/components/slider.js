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
          <mdw-slider id="slider1" min="50" max="200" step="1" value="50"></mdw-slider>
        </div>

      </article>
    `;
  }
};
