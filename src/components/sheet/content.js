import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-sheet-content', class extends HTMLElementExtended {
  constructor() {
    super();
    this.classList.add('mdw-closed');
    this.cloneTemplate();
    if (this.parentNode.registerContent) this.parentNode.registerContent(this);
  }

  show() {
    this.classList.remove('mdw-closed');
  }

  hide() {
    this.classList.add('mdw-closed');
  }

  styles() {
    return `
      .mdw-sheet-content-container {
        position: relative;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        transform: translateY(0);
        background-color: #FFF;
        pointer-events: auto;
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),
                    0 8px 10px 1px rgba(0,0,0,.14),
                    0 3px 14px 2px rgba(0,0,0,.12);

        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      :host(.mdw-closed) .mdw-sheet-content-container {
        transform: translateY(100%);
      }
    `;
  }

  template() {
    return '<div class="mdw-sheet-content-container"><slot></slot></div>';
  }
});
