import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-bound-property', class extends HTMLElementExtended {
  constructor() {
    super();

    this._property = this.innerHTML;
    this.innerHTML = '';
  }

  connectedCallback() {
    const that = this;
    this._value = window.activePage[this._property];
    Object.defineProperty(window.activePage, this._property, {
      configurable: true,
      enumerable: true,
      
      get() {
        return that._value;
      },

      set(value) {
        that._value = value;
        that.innerHTML = value;
      }
    });
  }
});
