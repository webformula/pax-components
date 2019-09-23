import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-sheet-header', class extends HTMLElementExtended {
  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', `
      <mdw-button id="default-close-button" class="mdw-icon">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    `);
    this.bound_close = this.close.bind(this);
    if (this.parentNode.registerHeader) this.parentNode.registerHeader(this);
  }

  connectedCallback() {
    this.closeButton.addEventListener('click', this.bound_close);
  }

  disconnectedCallback() {
    this.closeButton.removeEventListener('click', this.bound_close);
  }

  get closeButton() {
    return this.querySelector('#default-close-button');
  }

  close() {
    console.log('close');
    this.parentNode.hide();
  }
});
