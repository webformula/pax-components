import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./component.css';

// TODO align at end of button with text

customElements.define('mdw-badge', class MDWBadge extends HTMLElementExtended {
  useShadowRoot = true;

  #value = '';
  #slotChange_bound = this.#slotChange.bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('slotchange', this.#slotChange_bound);
  }

  afterRender() {
    this.shadowRoot.addEventListener('slotchange', this.#slotChange_bound);
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    value = parseInt(value);
    if (isNaN(value) || value <= 0) value = '';
    if (value > 999) value = '999+';
    this.#value = value;
    this.shadowRoot.removeEventListener('slotchange', this.#slotChange_bound);
    this.classList.toggle('mdw-contains-value', !!value);
    this.innerHTML = value;
    requestAnimationFrame(() => {
      this.shadowRoot.addEventListener('slotchange', this.#slotChange_bound);
    });
  }

  #slotChange() {
    console.log('slotChange')
    this.value = this.innerHTML;
  }

  template() {
    return /*html*/`
      <div class="mdw-content"><slot></slot></div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});
