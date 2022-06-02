import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-radio-group', class extends HTMLElementExtended {
  constructor() {
    super();

    this._radioButtons = [];
    this._value = this.getAttribute('value') || this.getAttribute('mdw-value');
    this.bound_radioButtonOnclick = this.radioButtonOnclick.bind(this);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.setAttribute('mdw-value', val);
    this.setAttribute('value', val);
    this._value = val;
  }

  static get observedAttributes() { return ['value']; }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'value':
        this._radioButtons.forEach(e => {
          const input = e.querySelector('input');
          if (input.value === newValue) input.checked = true;
          else input.checked = false;
        })
        break;
    }
  }
  
  disconnectedCallback() {
    this._radioButtons.forEach(r => r.input.removeEventListener('change', this.bound_radioButtonOnclick));
  }

  radioButtonOnclick(event) {
    this.value = event.target.value;
  }

  registerRadioButton(radioButtonElement) {
    radioButtonElement.querySelector('input').addEventListener('click', this.bound_radioButtonOnclick);
    this._radioButtons.push(radioButtonElement);
  }
});
