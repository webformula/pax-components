import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import styleAsString from '!!css-loader!./component.css?raw';

// TODO async
// TODO icon
// TODO href
// TODO form

customElements.define('mdw-button', class MDWButton extends HTMLElementExtended {
  useShadowRoot = true;

  #toggled = false;
  #ripple;

  constructor() {
    super();
    this.tabIndex = 0;
    this.mouseUp_bound = this.mouseup.bind(this);
    this.handleToggle_bound = this.handleToggle.bind(this);
  }

  get toggled() {
    return this.#toggled;
  }
  set toggled(value) {
    this.#toggled = !!value;
    if (this.#toggled === true) this.setAttribute('toggled', '');
    else this.removeAttribute('toggled');
  }

  static get observedAttributes() {
    return ['toggled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'toggled') {
      this.#toggled = newValue !== null;
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListener('mouseup', this.mouseUp_bound);
    if (this.classList.contains('mdw-icon-toggle-button')) {
      this.addEventListener('click', this.handleToggle_bound);
    }
    setTimeout(() => {
      this.#ripple = new Ripple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });
    }, 0);
  }

  disconnectedCallback() {
    if (this.#ripple) this.#ripple.destroy();
    this.removeEventListener('mouseup', this.mouseUp_bound);
    if (this.classList.contains('mdw-icon-toggle-button')) {
      this.removeEventListener('click', this.handleToggle_bound);
    }
  }

  mouseup() {
    this.blur();
  }

  handleToggle() {
    this.#toggled = !this.#toggled;
    if (this.#toggled === true) this.setAttribute('toggled', '');
    else this.removeAttribute('toggled');
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