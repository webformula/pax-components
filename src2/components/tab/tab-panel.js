import HTMLElementExtended from '../HTMLElementExtended.js';
import './tab-panel.css';


customElements.define('mdw-tab-panel', class MDWTabPanelElement extends HTMLElementExtended {
  #active = false;
  #value = '';


  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['active', 'value'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'active') this.active = newValue !== null;
    else this[name] = newValue;
  }

  get active() {
    return this.#active;
  }
  set active(value) {
    this.#active = !!value;
    this.toggleAttribute('active', this.#active);
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }
});
