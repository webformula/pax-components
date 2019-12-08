import { HTMLElementExtended } from '@webformula/pax-core';
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
    return html`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-fab-ripple"></div>
    `;
  }

  get dense() {
    return this.classList.contains('mdw-dense');
  }

  get spinnerContainer() {
    return this.shadowRoot.querySelector('.mdw-spinner-container');
  }

  set disabled(value) {
    if (!!value || value === '') this.setAttribute('disabled', 'disabled');
    else this.removeAttribute('disabled');
  }

  get pending() {
    return this._pending;
  }

  setupAsync() {
    if (!this.hasAttribute('mdw-async')) return;
    this.addEventListener('click', this.bound_asyncClick);
  }

  resolve() {
    if (this._pending === false) return;
    this._pending = false;
    this.hideSpinner();
  }

  asyncClick(e) {
    if (this._pending === true) return;
    this._pending = true;
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

  get internalStylesFile() {
    return './internal.css'
  }
});
