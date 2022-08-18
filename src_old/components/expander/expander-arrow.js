import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-expander-arrow', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    this.parentNode.registerArrow(this);
  }

  open() {
    this.classList.add('open');
  }

  close() {
    this.classList.remove('open');
  }
});
