import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWRipple from '../../core/Ripple.js';

customElements.define('mdw-fab', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_asyncClick = this.asyncClick.bind(this);
    this.cloneTemplate();
    this.setupAsync();
  }

  connectedCallback() {
    this.ripple = new MDWRipple({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
    this.removeEventListener('click', this.bound_asyncClick);

  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-fab-ripple"></div>
    `;
  }

  get dense() {
    return this.classList.contains('mdw-dense');
  }

  get spinnerContainer() {
    if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.mdw-spinner-container');
    return this._spinnerContainer;
  }

  set disabled(value) {
    if (!!value || value === '') this.setAttribute('disabled', 'disabled');
    else this.removeAttribute('disabled');
  }

  get pending() {
    return this.pending_;
  }

  setupAsync() {
    if (!this.hasAttribute('mdw-async')) return;
    this.addEventListener('click', this.bound_asyncClick);
  }

  resolve() {
    if (this.pending_ === false) return;
    this.pending_ = false;
    this.hideSpinner();
  }

  asyncClick(e) {
    if (this.pending_ === true) return;
    this.pending_ = true;
    this.showSpinner();
  }

  get spinnerStyle() {
    if (this.dense) return 'position: absolute; left: calc(50% - 12px); top: 8px;';
    return 'position: absolute; left: calc(50% - 16px); top: 12px;';
  }

  get spinnerDiameter() {
    if (this.dense) return 24;
    return 32;
  }

  showSpinner() {
    this._showSpinner = true;
    this.classList.add('mdw-show-spinner');
    const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
    this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="${this.spinnerDiameter}" class="${isWhite ? 'mdw-white' : 'mdw-grey'}" style="${this.spinnerStyle}"></mdw-circular-progress>`;
  }

  hideSpinner() {
    this._showSpinner = false;
    this.classList.remove('mdw-show-spinner');
    this.spinnerContainer.innerHTML = '';
  }

  styles() {
    return /* css */`
      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }

      :host-context(.mdw-density-comfortable) .mdw-spinner-container mdw-circular-progress {
        top: 3px !important;
      }

      :host-context(.mdw-density-compact) .mdw-spinner-container mdw-circular-progress {
        top: 0 !important;
      }

      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }

      .mdw-fab-ripple,
      .mdw-fab-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }


      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }
    `;
  }
});
