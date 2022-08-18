import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-card', class extends HTMLElementExtended {
  constructor() {
    super();
    this.classList.add('mdw-elevation-1');
  }
});
