import { HTMLElementExtended } from '@webformula/pax-core/index.js';
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
      this.name_ = this.parentNode.getAttribute('name');
    } else if (this.hasAttribute('name')) {
      this.name_ = this.getAttribute('name');
    }

    // create name if one was not provided
    // name is required for radio buttons to work
    if (!this.name_) {
      this.name_ = MDWUtils.uid();
      if (this.parentNode) this.parentNode.setAttribute('name', this.name_);
      else this.setAttribute('name', this.name_);
    }
    return this.name_;
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
