import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js'
import Drag from '../../core/drag.js';
import styleAsString from '!!css-loader!./component.css?raw';

customElements.define('mdw-switch', class MDWSwitch extends HTMLElementExtended {
  useShadowRoot = true;

  #dragStartChecked;
  #inputId = `switch_${util.getUID()}`;
  #updateAttribute_bound = this.#updateAttribute.bind(this);
  #drag = new Drag();
  #dragHandler_bound = this.#dragHandler.bind(this);
  #dragStartHandler_bound = this.#dragStartHandler.bind(this);


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

  static get observedAttributes() {
    return ['checked'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked' && this.rendered) {
      // if (oldValue !== newValue) this.dispatchEvent(new Event('change', this));
      this.shadowRoot.querySelector('input').checked = newValue !== null;
    }
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    this.#drag.element = this.shadowRoot.querySelector('.mdw-thumb');
    this.#drag.onDrag(this.#dragHandler_bound);
    this.#drag.onStart(this.#dragStartHandler_bound);
    this.#drag.enable();
    if (this.hasAttribute('checked')) this.shadowRoot.querySelector('input').checked = true;
    this.shadowRoot.querySelector('input').addEventListener('change', this.#updateAttribute_bound);
  }

  disconnectedCallback() {
    this.#drag.destroy();
    this.shadowRoot.querySelector('input').removeEventListener('change', this.#updateAttribute_bound);
  }

  #updateAttribute(event) {
    if (this.checked === true) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
    this.dispatchEvent(new Event('change'));
  }

  #dragStartHandler() {
    this.#dragStartChecked = this.checked;
  }

  #dragHandler({ distance }) {
    if (!this.#dragStartChecked) {
      if (distance.x > 16) this.checked = true;
      else this.checked = false;
    } else {
      if (distance.x < -16) this.checked = false;
      else this.checked = true;
    }
  }

  template() {
    return /* html */`
      <label for="${this.#inputId}">
        <input type="checkbox" tabIndex="0" id="${this.#inputId}">
        <slot></slot>
        <div class="mdw-track">
          <div class="mdw-thumb">
            <svg version="1.1" focusable="false" viewBox="0 0 16 16">
              <path fill="none" stroke="white" d="M5,8 7.7,10 12,5.5" ></path>
            </svg>
          </div>
        </div>
      </label>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});
