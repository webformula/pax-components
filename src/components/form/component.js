import HTMLElementExtended from '../HTMLElementExtended.js';


customElements.define('mdw-form', class MDWForm extends HTMLElementExtended {
  useShadowRoot = false;

  #novalidate = false;
  #initialData = {};


  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'form');

    setTimeout(() => {
      this.#initialData = Object.fromEntries(this.#submittableInputs().map(input => ([
        input.name,
        input.value
      ])));
    }, 2);
  }

  static get observedAttributes() {
    return ['novalidate'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'novalidate') this.novalidate = newValue;
  }


  get novalidate() {
    return this.#novalidate;
  }
  set novalidate(value) {
    this.#novalidate = !!value;
  }

  reportValidity() {
    // TODO make sure this does not need to trigger other elements
    const invalids = this.#allInputs()
      .map(el => el.reportValidity())
      .filter(v => v === false);
    return invalids.length === 0;
  }

  reset() {
    this.#submittableInputs().forEach(input => {
      input.value = this.#initialData[input.name];
    });
  }

  submit() {
    if (!this.#novalidate && this.reportValidity() === false) return;
    this.dispatchEvent(new SubmitEvent('submit'));
  }

  formData() {
    return this.#submittableInputs().map(input => {
      const type = input.type;
      const value = type === 'checkbox' ? input.checked : input.value;
      return {
        name: input.name,
        type,
        value
      };
    });
  }

  #submittableInputs() {
    return [...this.querySelectorAll('input[name]'), ...this.querySelectorAll('mdw-checkbox[name]')];
  }

  #allInputs() {
    return [...this.querySelectorAll('input')];
  }
});
