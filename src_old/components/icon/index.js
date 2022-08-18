import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-icon', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
    if (this.hasAttribute('mdw-src')) this.render();
  }

  get src() {
    return this.getAttribute('mdw-src');
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
      }

      :host img {
        width: 24px;
        height: 24px;
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
    const src = this.src;
    if (src) return `<img src="${src}"></img>`;
    return '<slot></slot>';
  }
});
