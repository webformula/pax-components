 const {
   customElements,
   HTMLElementExtended,
   html,
   css
 } = require('../../core');

 customElements.define('mdc-checkbox', class extends HTMLElementExtended {
   constructor() {
     super();
     this.cloneTemplate();
   }

   static get observedAttributes() {
     return ['checked', 'indeterminate', 'disabled', 'value'];
   }

   attributeChangedCallback(name, oldValue, newValue) {
     this[name] = newValue;
   }

   get input() {
     if (!this._input) this._input = this.shadowRoot.querySelector('input');
     return this._input;
   }

   get value() {
     return this.input.value;
   }

   set value(value) {
     this.input.value = value;
   }

   get checked() {
     return this.input.checked;
   }

   set checked(value) {
     if (value === '') value = true;
     this.input.checked = value;
   }

   get indeterminate() {
     return this.input.indeterminate;
   }

   set indeterminate(value) {
     if (value === '') value = true;
     this.input.indeterminate = value;
   }

   set disabled(value) {
     value = !!value || value === '';
     if (value) this.input.setAttribute('disabled', 'disabled');
     else this.input.removeAttribute('disabled');
   }

   handleChange() {
     this.dispatchEvent(new CustomEvent('change', this));
   }

   html() {
    return html`
      <div class="container">
        <input type="checkbox" onchange="$mdcCheckbox.handleChange(this)">
        <div class="background">
          <svg class="checkmark" viewBox="0 0 24 24">
            <path fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
          </svg>
          <div class="mixedmark"></div>
        </div>
      </div>
    `;
  }

  cssFile() {
    return '/src/components/checkbox/style.css'
  }
});
