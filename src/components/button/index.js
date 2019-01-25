const path = require('path');
const fs = require('fs');
const {
  customElements,
  HTMLElementExtended,
  html,
  css
} = require('../../core');

// TODO impliment ripple
// TODO impliment icon

customElements.define('md-button', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  static get observedAttributes() {
    return ['raised', 'unelevated', 'outlined', 'disabled', 'icon'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get button() {
    if (!this._button) this._button = this.shadowRoot.querySelector('button');
    return this._button;
  }

  set raised(value) {
    this.button.classList.toggle('raised', !!value || value === '');
  }

  set unelevated(value) {
    this.button.classList.toggle('unelevated', !!value|| value === '');
  }

  set outlined(value) {
    this.button.classList.toggle('outlined', !!value || value === '');
  }

  set disabled(value) {
    if (!!value || value === '') this.button.setAttribute('disabled', 'disabled');
    else this.button.removeAttribute('disabled');
  }

  set icon(value) {
    // this.shadowRoot.classList.toggle('md-disabled', !!value);
  }

  html() {
    return html`
      <button>
        <slot></slot>
      </button>
    `;
  }

  cssFile() {
    return '/src/components/button/style.css'
  }

  externalCSS() {
    return css`
      html {
        font-size: 16px;
      }
    `;
  }
});
