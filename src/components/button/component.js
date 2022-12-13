import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import styleAsString from '!!raw-loader!./component.css';
import util from '../../core/util.js';


// TODO fix ripple when in panel. Look at date picker cancel

customElements.define('mdw-button', class MDWButton extends HTMLElementExtended {
  useShadowRoot = true;

  #formTypes = ['submit', 'reset'];
  #mouseUp_bound = this.#mouseup.bind(this);
  #handleToggle_bound = this.#handleToggle.bind(this);
  #isAsync = this.classList.contains('mdw-async');
  #toggled = false;
  #ripple;
  #form;
  #formValidationClick_bound = this.#formValidationClick.bind(this);
  #formResetClick_bound = this.#formResetClick.bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    this.tabIndex = 0;

    this.setAttribute('role', 'button');
    if (!this.hasAttribute('aria-label')) {
      const text = util.getTextFromNode(this);
      if (text) this.setAttribute('aria-label', text);
    }

    this.#handleForms();

    this.render();
    this.addEventListener('mouseup', this.#mouseUp_bound);
    if (this.classList.contains('mdw-icon-toggle-button')) {
      this.addEventListener('click', this.#handleToggle_bound);
    }

    setTimeout(() => {
      this.#ripple = new Ripple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });
    }, 0);
  }

  disconnectedCallback() {
    this.#ripple.destroy();
    this.removeEventListener('mouseup', this.#mouseUp_bound);
    if (this.classList.contains('mdw-icon-toggle-button')) {
      this.removeEventListener('click', this.#handleToggle_bound);
    }

    if (this.#formTypes.includes(this.type)) {
      this.removeEventListener('click', this.#formValidationClick_bound, true);
      this.removeEventListener('click', this.#formResetClick_bound, true);
    }
  }

  get toggled() {
    return this.#toggled;
  }
  set toggled(value) {
    this.#toggled = !!value;
    if (this.#toggled === true) this.setAttribute('toggled', '');
    else this.removeAttribute('toggled');
  }

  get form() {
    return this.#form
  }
  set form(value) {
    this.#form = document.querySelector(`form#${value}`) || document.querySelector(`mdw-form#${value}`);
  }

  get type() {
    return this.getAttribute('type') || 'submit';
  }


  static get observedAttributes() {
    return ['toggled', 'form'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'toggled') this.#toggled = newValue !== null;
    if (name === 'form') this.form = newValue;
  }

  showSpinner() {
    this.classList.add('mdw-is-async');
    this.shadowRoot.querySelector('.mdw-spinner-container').innerHTML = `
      <mdw-progress-circular diameter="28" class="mdw-indeterminate${this.classList.contains('mdw-filled') ? ' mdw-on-filled' : ''}${this.classList.contains('mdw-filled-tonal') ? ' mdw-on-filled-tonal' : ''}"></mdw-progress-circular>
    `;
  }

  resolve() {
    this.classList.remove('mdw-is-async');
    this.shadowRoot.querySelector('.mdw-spinner-container').innerHTML = '';
  }

  #mouseup() {
    if (this.#isAsync) this.showSpinner();
    this.blur();
  }

  #handleToggle() {
    this.#toggled = !this.#toggled;
    if (this.#toggled === true) this.setAttribute('toggled', '');
    else this.removeAttribute('toggled');
  }

  #handleForms() {
    if (!this.#formTypes.includes(this.type)) return;

    if (!this.#form && this.#formTypes.includes(this.type)) {
      this.#form = [...document.querySelectorAll('form'), ...document.querySelectorAll('mdw-form')].find(form => form.contains(this));
    }
 
    if (this.#form) {
      if (this.type === 'submit') this.addEventListener('click', this.#formValidationClick_bound, true);
      if (this.type === 'reset') this.addEventListener('click', this.#formResetClick_bound, true);
    } else {
      this.removeEventListener('click', this.#formValidationClick_bound, true);
      this.removeEventListener('click', this.#formResetClick_bound, true);
    }
  }

  #formValidationClick(event) {
    if (!this.#form) return;

    const isValid = this.#form.reportValidity();
    if (isValid === true) return this.#form.submit();
    else if (isValid === true) return;
    
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  #formResetClick() {
    if (!this.#form) return;
    return this.#form.reset();
  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple"></div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});
