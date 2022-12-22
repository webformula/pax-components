import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./component.css';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';


// TODO toggle
// TODO form

customElements.define('mdw-button', class MDWButton extends HTMLElementExtended {
  useShadowRoot = true;

  #form = null;
  #name = '';
  #type = 'submit';
  #value = '';
  #isAsync = this.classList.contains('mdw-async');
  #ripple;
  #mouseUp_bound = this.#mouseup.bind(this);


  constructor() {
    super();
    this.#handleTrailingIcon();
  }

  connectedCallback() {
    this.tabIndex = 0;
    this.setAttribute('role', 'button');
    if (!this.hasAttribute('aria-label')) {
      const text = util.getTextFromNode(this);
      if (text) this.setAttribute('aria-label', text);
    }
    this.addEventListener('mouseup', this.#mouseUp_bound);
  }

  afterRender() {
    this.#ripple = new Ripple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    this.#ripple.destroy();
    this.removeEventListener('mouseup', this.#mouseUp_bound);
  }

  template() {
    return /*html*/`
      <span class="text">
        <slot></slot>
      </span>
      <span class="spinner"></span>
      <div class="ripple"></div>
      <style>${styleAsString}</style>
    `;
  }

  static get observedAttributes() {
    return ['form', 'type'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
  }

  get form() {
    return this.#form
  }
  set form(value) {
    this.#form = document.querySelector(`form#${value}`) || document.querySelector(`mdw-form#${value}`);
  }

  get name() {
    return this.#name;
  }
  set name(value) {
    this.#name = value;
  }

  get type() {
    return this.#type;
  }
  set type(value) {
    this.#type = value;
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }

  pending() {
    this.classList.add('mdw-async-pending');
    this.shadowRoot.querySelector('.spinner').innerHTML = `
      <mdw-progress-circular diameter="28" class="mdw-indeterminate${this.classList.contains('mdw-filled') ? ' mdw-on-filled' : ''}${this.classList.contains('mdw-filled-tonal') ? ' mdw-on-filled-tonal' : ''}"></mdw-progress-circular>
    `;
  }

  resolve() {
    this.classList.remove('mdw-async-pending');
    this.shadowRoot.querySelector('.spinner').innerHTML = '';
  }

  #mouseup() {
    if (this.#isAsync) this.pending();
    this.blur();
  }

  // auto add class .mdw-trailing to icon so t will space correctly
  #handleTrailingIcon() {
    const icon = this.querySelector('mdw-icon');
    if (!icon) return;

    let previous = icon.previousSibling;
    while (previous) {
      if (previous.nodeType === 3 && previous.textContent.trim() !== '') break;
      previous = previous.previousSibling;
    }
    
    if (previous) icon.classList.add('mdw-trailing');
  }
});
