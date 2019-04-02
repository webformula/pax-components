customElements.define('mdw-checkbox', class extends HTMLElementExtended {
   constructor() {
     super();
   }

   connectedCallback() {
     if (!this.querySelector('input')) this.insertAdjacentHTML('beforeend', this.inputHTML);
     if (!this.querySelector('.background')) this.insertAdjacentHTML('beforeend', this.backgroundHTML);
     if (!this.querySelector('.ripple')) this.insertAdjacentHTML('beforeend', this.rippleHTML);
     if (this.hasAttribute('indeterminate')) this.indeterminate = true;
     if (this.hasAttribute('checked')) this.checked = true;
     this.ripple = new MDWRipple({
       element: this.querySelector('.ripple'),
       triggerElement: this.input,
       radius: 20,
       centered: true
     });
     this.connected_ = true;
   }

   static get observedAttributes() {
     return ['checked', 'indeterminate', 'disabled', 'value'];
   }

   attributeChangedCallback(name, oldValue, newValue) {
     if (!this.connected_) return;
     this[name] = newValue;
   }

   get input() {
     if (!this.input_) this.input_ = this.querySelector('input');
     return this.input_;
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

   get rippleHTML() {
     return '<div class="ripple checkbox-ripple"></div>';
   }

   get inputHTML() {
     return '<input type="checkbox">';
   }

   get backgroundHTML() {
     return `
       <div class="background">
         <div class="checkmark"></div>
         <div class="mixedmark"></div>
       </div>
     `;
   }
});
