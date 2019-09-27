import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-icon', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  styles() {
    return `
      :host {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        font-feature-settings: 'liga';
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }


      :host(.mdw-primary) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-secondary) {
        color: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) {
        color: var(--mdw-theme-error);
      }
    `;
  }


  template() {
    return '<slot></slot>';
  }
});
