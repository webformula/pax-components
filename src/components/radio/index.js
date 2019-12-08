import { HTMLElementExtended } from '@webformula/pax-core';
import MDWRipple from '../../core/Ripple.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-radio', class extends HTMLElementExtended {
  constructor() {
    super();
    // input radio will not work correctly in shadowroot
    this.insertAdjacentHTML('beforeend', this.rippleTemplate());
  }

  connectedCallback() {
    if (this.parentNode.initialValue === this.value) this.input.checked = true;
    if (!this.input.hasAttribute('type')) this.input.setAttribute('type', 'radio');
    if (!this.input.hasAttribute('name')) this.input.setAttribute('name', this.name);
    this.ripple = new MDWRipple({
      element: this.querySelector('.mdw-ripple'),
      triggerElement: [this.input],
      radius: 20,
      centered: true
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
  }

  get value() {
    return this.input.value;
  }

  get input() {
    return this.querySelector('input');
  }

  get name() {
    if (this.parentNode && this.parentNode.hasAttribute('name')) {
      this._name = this.parentNode.getAttribute('name');
    } else if (this.hasAttribute('name')) {
      this._name = this.getAttribute('name');
    }

    // create name if one was not provided
    // name is required for radio buttons to work
    if (!this._name) {
      this._name = MDWUtils.uid();
      if (this.parentNode) this.parentNode.setAttribute('name', this._name);
      else this.setAttribute('name', this._name);
    }
    return this._name;
  }

  rippleTemplate() {
    return `
      <div class="mdw-radio-background">
        <div class="mdw-radio__outer-circle"></div>
        <div class="mdw-radio__inner-circle"></div>
      </div>
      <div class="mdw-ripple mdw-radio-ripple"></div>
    `;
  }
});
