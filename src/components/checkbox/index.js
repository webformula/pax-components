import { HTMLElementExtended } from '@webformula/pax-core';
import MDWRipple from '../../core/Ripple.js';

customElements.define('mdw-checkbox', class extends HTMLElementExtended {
   constructor() {
     super();
     this.bound_handleChange = this.handleChange.bind(this);
   }

   connectedCallback() {
     this.cloneTemplate();

     if (this.hasAttribute('indeterminate')) this.indeterminate = true;
     if (this.hasAttribute('checked')) this.checked = true;

     this.ripple = new MDWRipple({
       element: this.shadowRoot.querySelector('.mdw-ripple'),
       triggerElement: [this.input],
       radius: 20,
       centered: true
     });

     this.connected_ = true;
     this.input.addEventListener('change', this.bound_handleChange);
   }

   disconnectedCallback() {
     this.input.removeEventListener('change', this.bound_handleChange);
     this.ripple.destroy();
   }

   static get observedAttributes() {
     return ['checked', 'indeterminate', 'disabled'];
   }

   attributeChangedCallback(name, oldValue, newValue) {
     if (!this.connected_) return;
     this[name] = newValue;
   }

   get input() {
     if (!this.input_) this.input_ = this.shadowRoot.querySelector('input');
     return this.input_;
   }

   get checked() {
     return this.input.checked;
   }

   set checked(value) {
     if (value === '') value = true;
     this.input.checked = value;
     this.handleChange();
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

   toggle() {
     this.checked = !this.checked;
   }

   template() {
     return /* html */`
       <input type="checkbox">
       <div class="mdw-background">
         <div class="mdw-checkmark"></div>
         <div class="mdw-mixedmark"></div>
       </div>
       <div class="mdw-ripple mdw-checkbox-ripple"></div>
     `;
   }

   styles() {
     return /* css */`
      .mdw-background::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(0, 0);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
        will-change: opacity, transform;
      }

      .mdw-background {
        left: 11px;
        right: initial;
        display: -ms-inline-flexbox;
        display: inline-flex;
        position: absolute;
        top: 11px;
        bottom: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 45%;
        height: 45%;
        transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border: 2px solid currentColor;
        border-radius: 2px;
        background-color: transparent;
        pointer-events: none;
        will-change: background-color, border-color;
      }

      :host([dir="rtl"]) .mdw-background {
        left: initial;
        right: 11px;
      }

      .mdw-checkmark {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
        color: #fff;
      }

      .mdw-checkmark:after {
        box-sizing: border-box;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        left: 4px;
        top: 0;
        display: table;
        width: 6.66667px;
        height: 13.33333px;
        border-width: 2px;
        border-style: solid;
        border-top: 0;
        border-left: 0;
        content: "";
      }

      input:indeterminate + .mdw-background .mdw-checkmark {
        transform: rotate(45deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
      }

      input:indeterminate + .mdw-background .mdw-mixedmark {
        width: 100%;
        height: 0;
        transform: scaleX(0) rotate(0deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        border-width: 1px;
        border-style: solid;
        opacity: 0;
        border-color: #fff;
      }

      @media screen and (-ms-high-contrast: active) {
        .mixedmark {
          margin: 0 1px;
        }
      }

      path {
        transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        stroke: currentColor;
        stroke-width: 3.12px;
        stroke-dashoffset: 29.78334;
        stroke-dasharray: 29.78334;
      }



      /* --- input --- */

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        cursor: inherit;
      }

      input:enabled:not(:checked):not(:indeterminate) + .mdw-background {
        border-color: var(--mdw-theme-checkboxborder);
        background-color: transparent;
      }

      input:disabled:not(:checked):not(:indeterminate) + .mdw-background {
        border-color: var(--mdw-theme-checkboxborderdisabled);
      }

      input:disabled:checked + .mdw-background,
      input:disabled:indeterminate + .mdw-background {
        border-color: transparent;
        background-color: var(--mdw-theme-checkboxborderdisabled);
      }

      input:checked + .mdw-background,
      input:indeterminate + .mdw-background {
        transition: border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1);
      }

      input:checked + .mdw-background path,
      input:indeterminate + .mdw-background path {
        stroke-dashoffset: 0;
      }

      input:focus + .mdw-background::before {
        transform: scale(2.75, 2.75);
        transition: opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);
        opacity: 0.12;
      }

      input:disabled {
        cursor: default;
        pointer-events: none;
      }

      input:checked + .mdw-background .mdw-checkmark {
        transition: opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),
                    transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
        opacity: 1;
      }

      input:checked + .mdw-background .mdw-mixedmark {
        transform: scaleX(1) rotate(-45deg);
      }

      input:indeterminate + .mdw-background .mdw-checkmark {
        transform: rotate(45deg);
        transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
                    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
        opacity: 0;
      }

      input:indeterminate + .mdw-background .mdw-mixedmark {
        transform: scaleX(1) rotate(0deg);
        opacity: 1;
      }

      input:enabled:checked ~ .mdw-background,
      input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-secondary);
        background-color: var(--mdw-theme-secondary);
      }

      :host(.mdw-primary) input:enabled:checked ~ .mdw-background,
      :host(.mdw-primary) input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-primary);
        background-color: var(--mdw-theme-primary);
      }

      :host(.mdw-error) input:enabled:checked ~ .mdw-background,
      :host(.mdw-error) input:enabled:indeterminate ~ .mdw-background {
        border-color: var(--mdw-theme-error);
        background-color: var(--mdw-theme-error);
      }



      /* --- Ripple --- */

      .mdw-ripple {
        overflow: hidden;
      }

      .mdw-ripple.mdw-ripple-unbounded {
        overflow: visible;
      }

      .mdw-ripple-element {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
        transform: scale(0);
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      .mdw-checkbox-ripple {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
      }

      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
    `;
   }
});
