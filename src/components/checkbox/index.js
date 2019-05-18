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
       triggerElement: [this.input, this.label],
       radius: 20,
       centered: true
     });
     this.connected_ = true;

     if (this.label) {
       this.boundHandleLabelClick_ = this.toggle.bind(this);
       this.label.addEventListener('click', this.boundHandleLabelClick_);
       if (this.hasAttribute('right')) {
         const labelWidth = this.label.offsetWidth;
         this.style.marginLeft = `${labelWidth - 16}px`;
         this.label.style.marginLeft = `-${labelWidth + 8}px`;
       }
     }
   }

   disconnectedCallback() {
     if (this.label) {
       this.label.removeEventListener('click', this.boundHandleLabelClick_);
     }
     this.ripple.destroy();
   }

   static get observedAttributes() {
     return ['checked', 'indeterminate', 'disabled'];
   }

   attributeChangedCallback(name, oldValue, newValue) {
     if (!this.connected_) return;
     this[name] = newValue;
   }

   get label() {
     if (!this.label_) this.label_ = this.querySelector('label');
     return this.label_;
   }

   get input() {
     if (!this.input_) this.input_ = this.querySelector('input');
     return this.input_;
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

   handleChange() {
     this.dispatchEvent(new CustomEvent('change', this));
   }

   toggle() {
     this.checked = !this.checked;
   }
});
