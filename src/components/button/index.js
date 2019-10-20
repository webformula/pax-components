import { HTMLElementExtended } from '@webformula/pax-core';
import MDWRipple from '../../core/Ripple.js';

customElements.define('mdw-button', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_asyncClick = this.asyncClick.bind(this);
    this.bound_hrefClick = this.hrefClick.bind(this);
    this.bound_checkHREFActive = this.checkHREFActive.bind(this);
    this.cloneTemplate();
    this.setupAsync();
    this.connectHREF();
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
    this.removeEventListener('click', this.bound_hrefClick);
    window.removeEventListener('hashchange', this.bound_checkHREFActive);
  }

  get spinnerContainer() {
    if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.mdw-spinner-container');
    return this._spinnerContainer;
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

  showSpinner() {
    this._showSpinner = true;
    this.classList.add('mdw-show-spinner');
    const isWhite = this.classList.contains('mdw-primary') || this.classList.contains('mdw-secondary') || this.classList.contains('mdw-error');
    this.spinnerContainer.innerHTML = `<mdw-circular-progress mdw-mode="indeterminate" mdw-diameter="24" class="${isWhite ? 'mdw-white' : 'mdw-grey'}" style="position: absolute; left: calc(50% - 12px); top: 6px;"></mdw-circular-progress>`;
  }

  hideSpinner() {
    this._showSpinner = false;
    this.classList.remove('mdw-show-spinner');
    this.spinnerContainer.innerHTML = '';
  }

  connectHREF() {
    if (!this.hasAttribute('href')) return;
    this.checkHREFActive();
    window.addEventListener('hashchange', this.bound_checkHREFActive);
    this.addEventListener('click', this.bound_hrefClick);
  }

  checkHREFActive() {
    if (!this.hasAttribute('href')) return;
    const href = document.location.href;
    const hash = document.location.hash;
    if (href === this.getAttribute('href') || href === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
    else if (hash === this.getAttribute('href') || hash === this.getAttribute('href-alt')) this.setAttribute('active', 'active');
    else this.removeAttribute('active');
  }

  hrefClick() {
    document.location.href = this.getAttribute('href');
  }

  template() {
    return html`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>
    `;
  }

  get internalStylesFile() {
    return './internal.css'
  }
});
