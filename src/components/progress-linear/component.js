import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!css-loader!./component.css?raw';


customElements.define('mdw-progress-linear', class MDWProgressLinear extends HTMLElementExtended {
  useShadowRoot = true;

  constructor() {
    super();
  }

  get percent() {
    return this.getAttribute('mdw-percent');
  }
  set percent(value) {
    this.setAttribute('mdw-percent', value);
  }

  static get observedAttributes() {
    return ['mdw-percent'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'mdw-percent') {
      if (this.rendered === true) this.#updatePercent(newValue);
    }
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    if (this.rendered === false) {
      this.#updatePercent(this.percent);
    }
  }

  #updatePercent(value) {
    if (value === null || isNaN(value)) return;
    value = parseInt(value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    this.shadowRoot.querySelector('.mdw-indicator').style.width = `${value}%`;
  }

  template() {
    return /* html*/ `
      <style>${styleAsString}</style>
      <div class="mdw-indicator"></div>
    `;
  }
});
