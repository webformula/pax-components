import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./component.css';


customElements.define('mdw-progress-linear', class MDWProgressLinear extends HTMLElementExtended {
  useShadowRoot = true;
  useTemplate = false;

  #max = 1;
  #value = 1;

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'progressbar');
  }

  static get observedAttributes() {
    return ['max', 'value'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
  }

  get max() {
    return this.#max;
  }
  set max(value) {
    if (isNaN(value)) throw Error('Failed to set the \'max\' property on \'mdw-progress-linear\': Must provide a number');
    this.#max = parseFloat(value);
    if (this.#max < 1) this.#max = 1;
    if (this.#value > this.#max) this.#value = this.#max;
    if (this.rendered) {
      this.shadowRoot.querySelector('.indicator').style.width = `${(this.#value / this.#max) * 100}%`;
    }
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    if (isNaN(value)) throw Error('Failed to set the \'value\' property on \'mdw-progress-linear\': Must provide a number');
    this.#value = parseFloat(value);
    if (this.#value < 0) this.#value = 0;
    if (this.#value > this.#max) this.#value = this.#max;
    if (this.rendered) {
      this.shadowRoot.querySelector('.indicator').style.width = `${(this.#value / this.#max) * 100}%`;
    }
  }

  template() {
    return /* html*/ `
      <style>${styleAsString}</style>
      <div class="indicator" style="width: ${(this.#value / this.#max) * 100}%;"></div>
    `;
  }
});
