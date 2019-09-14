import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-radio-group', class extends HTMLElementExtended {
  constructor() {
    super();
    this.initialValue = this.getAttribute('mdw-value');
    // this.bound_change = this.change.bind(this);
  }

  // connectedCallback() {
  //   this.radios.forEach(r => r.input.addEventListener('change', this.bound_change));
  // }
  //
  // disoconnectedCallback() {
  //   this.radios.forEach(r => r.input.removeEventListener('change', this.bound_change));
  // }
  //
  // change(e) {
  //   console.log(e);
  // }
  //
  // get radios() {
  //   return [...this.querySelectorAll('mdw-radio')];
  // }
});
