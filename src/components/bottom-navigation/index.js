import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-bottom-navigation', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    [...this.querySelectorAll('mdw-button')].forEach(el => {
      el.classList.add('mdw-bottom-navigation');
    });
  }
});
