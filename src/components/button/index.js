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
    // open in new tab / window
    if (this.getAttribute('target') === '_blank') {
      window.open(this.getAttribute('href'), '_blank');
      return;
    }

    document.location.href = this.getAttribute('href');
  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        user-select: none;
        align-items: center;
        border: none;
        box-sizing: border-box;
        display: inline-flex;
        font-family: Roboto, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        justify-content: center;
        letter-spacing: 0.08929em;
        outline: none;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        text-transform: uppercase;
        vertical-align: middle;
        will-change: transform, opacity;
        margin: 0;
        background-color: transparent;

        border-radius: 4px;
        line-height: 2.25rem;
        padding: 0 8px 0 8px;
        height: 36px;
        min-width: 64px;

        color: var(--mdw-theme-on-primary);
      }

      :host-context(.mdw-dense-comfortable),
      :host(.mdw-dense-comfortable) {
        height: 28px;
        margin-top: 0;
        margin-bottom: 0;
      }

      :host-context(.mdw-dense-compact),
      :host(.mdw-dense-compact) {
        height: 24px;
        margin-top: 0;
        margin-bottom: 0;
      }

      :host(.mdw-icon):host-context(.mdw-dense-comfortable),
      :host(.mdw-dense-comfortable.mdw-icon) {
        height: 28px;
        width: 28px;
        margin-top: 0;
        margin-bottom: 0;
      }
      
      :host(.mdw-icon):host-context(.mdw-dense-compact),
      :host(.mdw-dense-compact.mdw-icon) {
        height: 24px;
        width: 24px;
        margin-top: 0;
        margin-bottom: 0;
      }

      :host-context(.mdw-dense-comfortable) .mdw-spinner-container mdw-circular-progress,
      :host(.mdw-dense-comfortable) .mdw-spinner-container mdw-circular-progress {
        top: 2px !important;
      }

      :host-context(.mdw-dense-compact) .mdw-spinner-container mdw-circular-progress,
      :host(.mdw-dense-compact) .mdw-spinner-container mdw-circular-progress {
        top: 0 !important;
      }


      :host::before,
      :host::after {
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        background-color: var(--mdw-theme-foreground);
      }

      :host::before {
        z-index: 1;
        transition: opacity 15ms linear,
                    background-color 15ms linear;
      }

      :host(:hover) {
        cursor: pointer;
      }

      :host([disabled]) {
        background-color: transparent !important;
        color: var(--mdw-theme-text-disabled-on-background);
        cursor: default;
        pointer-events: none;
      }
      :host::-moz-focus-inner {
        padding: 0;
        border: 0;
      }

      :host(:active) {
        outline: none;
      }

      :host(.mdw-raised),
      :host(.mdw-unelevated) {
        background-color: var(--mdw-theme-background);
        padding: 0 16px 0 16px;
      }

      :host(.mdw-raised)::before,
      :host(.mdw-unelevated)::before {
        opacity: 0.08;
      }
      :host(.mdw-raised) {
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      :host(.mdw-raised:hover),
      :host(.mdw-raised:focus) {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-raised:active) {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-raised[disabled]) {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
      }

      :host(.mdw-outlined) {
        border-color: rgba(0, 0, 0, 0.37);
        line-height: inherit;
        border-style: solid;
        padding: 0 14px 0 14px;
        border-width: 2px;
      }

      :host(.mdw-shaped) {
        border-radius: 18px;
      }

      :host(.mdw-icon) {
        border-radius: 50%;
        min-width: 0;
        width: 48px;
        height: 48px;
        padding: 12px;
      }

      :host(.mdw-bottom-navigation) {
        border-radius: 50%;
        min-width: 0;
        max-width: 100px;
        width: 56px;
        height: 56px;
        padding: 28px;
      }

      :host(.mdw-icon) ::slotted(mdw-icon) {
        line-height: 19px;
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
      }

      /* mdw-icon */
      ::slotted(mdw-icon) {
        width: 18px;
        height: 18px;
        font-size: 18px;
        margin-left: -4px;
        margin-right: 2px;
        vertical-align: top;
        line-height: 36px;
      }

      :host ::slotted(svg.mdw-icon) {
        fill: currentColor;
      }


      /* primary */
      :host(.mdw-primary) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-primary.mdw-raised),
      :host(.mdw-primary.mdw-unelevated)  {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text-primary-on-background);
      }

      :host(.mdw-primary.mdw-outlined) {
        border-color: var(--mdw-theme-primary);
      }

      :host(.mdw-primary)::before,
      :host(.mdw-primary)::after {
        background-color: var(--mdw-theme-primary);
      }


      /* secondary */

      :host(.mdw-secondary) {
        color: var(--mdw-theme-secondary);
      }

      :host(.mdw-secondary.mdw-raised),
      :host(.mdw-secondary.mdw-unelevated) {
        background-color: var(--mdw-theme-secondary);
        color: var(--mdw-theme-text-primary-on-primary);
      }

      :host(.mdw-secondary.mdw-outlined) {
        border-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-secondary)::before,
      :host(.mdw-secondary)::after {
        background-color: var(--mdw-theme-secondary);
      }

      /* error */

      :host(.mdw-error) {
        color: var(--mdw-theme-error);
      }

      :host(.mdw-error.mdw-raised),
      :host(.mdw-error.mdw-unelevated) {
        background-color: var(--mdw-theme-error);
        color: var(--mdw-theme-text-primary-on-primary);
      }

      :host(.mdw-error.mdw-outlined) {
        border-color: var(--mdw-theme-error);
      }

      :host(.mdw-error)::before,
      :host(.mdw-error)::after {
        background-color: var(--mdw-theme-error);
      }

      :host(:not(.mdw-bottom-navigation):hover)::before {
        opacity: 0.04;
      }

      :host(.mdw-show-spinner) span.text {
        opacity: 0;
      }

      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-on-primary--rgb), 0.16);
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
      }

      .mdw-button-ripple,
      .mdw-button-focus-overlay {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;
      }


      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-primary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-primary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      :host(.mdw-secondary.mdw-raised) .mdw-ripple-element,
      :host(.mdw-secondary.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }

      :host(.error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }

      :host(.error.mdw-raised) .mdw-ripple-element,
      :host(.error.mdw-unelevated) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-background--rgb), 0.16);
      }


      /* bottom navigation */
      :host(.mdw-bottom-navigation) span.text {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        text-transform: none;
        line-height: 12px;
      }
    `;
  }
});
