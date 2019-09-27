import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-sheet-header-old', class extends HTMLElementExtended {
  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', `
      <mdw-button id="default-close-button" class="mdw-icon">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    `);
    this.cloneTemplate();
    this.showing = false;
    this.fixed = false;
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
    this.parentNode.close();
  }

  show() {
    this.classList.add('mdw-show');
  }

  hide() {
    this.classList.remove('mdw-show');
  }

  toggle(value) {
    if (this.showing && !value) {
      this.showing = value;
      this.hide();
    } else if (value) {
      this.showing = value;
      this.show();
    }
  }

  fix() {
    this.classList.add('mdw-fixed');
  }

  unfix() {
    this.classList.remove('mdw-fixed');
  }

  toggleFixed(value) {
    if (this.fixed && !value) {
      this.fixed = value;
      this.unfix();
    } else if (value) {
      this.fixed = value;
      this.fix();
    }
  }

  styles() {
    return `
      :host {
        display: block;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        height: 56px;
        z-index: 1;
      }

      :host mdw-sheet-title {
        font-size: 20px;
      }

      :host(.mdw-show) {
        opacity: 1;
      }

      :host .mdw-container {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        /* position: fixed; */
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        top: 0;
        z-index: 1;

        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                    0 4px 5px 0 rgba(0,0,0,.14),
                    0 1px 10px 0 rgba(0,0,0,.12);

        background-color: var(--mdw-theme-surface);
        color: var(--mdw-theme-text--primary--on-background);
      }

      :host(.mdw-fixed) .mdw-container {
        position: fixed;
      }

    `;
  }

  template() {
    return '<div class="mdw-container"><slot></slot></div>';
  }
});
