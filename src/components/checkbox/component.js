import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js'
import Ripple from '../../core/Ripple.js';
import styleAsString from '!!css-loader!./component.css?raw';

// TODO indeterminate

customElements.define('mdw-checkbox', class MDWCheckbox extends HTMLElementExtended {
  useShadowRoot = true;

  #inputId = `checkbox_${util.getUID()}`;
  #updateAttribute_bound = this.#updateAttribute.bind(this);
  #ripple;

  constructor() {
    super();
  }

  get value() {
    return this.shadowRoot.querySelector('input').value;
  }
  set value(v) {
    this.shadowRoot.querySelector('input').value = v;
  }

  get checked() {
    return this.shadowRoot.querySelector('input').checked;
  }
  set checked(v) {
    this.shadowRoot.querySelector('input').checked = v;
    this.#updateAttribute();
  }

  get indeterminate() {
    return this.shadowRoot.querySelector('input').indeterminate;
  }
  set indeterminate(value) {
    this.shadowRoot.querySelector('input').indeterminate = value;
    this.#updateAttribute();
  }

  static get observedAttributes() {
    return ['checked', 'indeterminate'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked' && this.rendered) this.shadowRoot.querySelector('input').checked = newValue !== null;
    if (name === 'indeterminate' && this.rendered) this.shadowRoot.querySelector('input').indeterminate = newValue !== null;
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    this.#ripple = new Ripple({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: this,
      centered: true
    });
    if (this.hasAttribute('checked')) this.shadowRoot.querySelector('input').checked = true;
    if (this.hasAttribute('indeterminate')) this.shadowRoot.querySelector('input').indeterminate = true;
    this.shadowRoot.querySelector('input').addEventListener('change', this.#updateAttribute_bound);
  }

  disconnectedCallback() {
    this.#ripple.destroy();
    this.shadowRoot.querySelector('input').removeEventListener('change', this.#updateAttribute_bound);
  }

  #updateAttribute() {
    if (this.checked === true) this.setAttribute('checked', '');
    else this.removeAttribute('checked');

    if (this.indeterminate === true) this.setAttribute('indeterminate', '');
    else this.removeAttribute('indeterminate');

    this.dispatchEvent(new Event('change'));
  }

  template() {
    return /* html */`
      <label for="${this.#inputId}">
        <input type="checkbox" tabIndex="0" id="${this.#inputId}">
        <div class="mdw-background">
          <svg version="1.1" focusable="false" viewBox="0 0 24 24">
            <path fill="none" stroke="white" d="M4.1,12.7 9,17.6 20.3,6.3" ></path>
          </svg>
          <div class="mdw-indeterminate-check"></div>
          <div class="mdw-ripple"></div>
        </div>
        <slot></slot>
      </label>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});
