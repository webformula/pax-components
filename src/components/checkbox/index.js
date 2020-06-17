import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWRipple from '../../core/Ripple.js';

customElements.define('mdw-checkbox', class extends HTMLElementExtended {
  constructor() {
    super();
    
    this.bound_handleClick = this.handleClick.bind(this);
    this.cloneTemplate();
    this._defaultIcons();

    this.state = 'unchecked';
  }

  connectedCallback() {
    if (this.hasAttribute('indeterminate')) this.indeterminate = true;
    if (this.hasAttribute('checked')) this.checked = true;

    if (!this.hasAttribute('mdw-no-ripple')) this.ripple = new MDWRipple({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: [this],
      centered: true
    });

    this.addEventListener('click', this.bound_handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.bound_handleClick);
    this.ripple.destroy();
  }

  static get observedAttributes() {
    return ['checked', 'indeterminate'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (!['checked', 'unchecked', 'indeterminate'].includes(value)) console.error(`ivalid state fro checkbox "${value}". Only excepts "checked", "unchecked", "indeterminate"`);
    this.setAttribute('mdw-state', value);
    const stateChange = this._state !== value;
    this._state = value;

    if (stateChange === true) this.dispatchEvent(new Event('change'));
  }

  get checked() {
    return this.state === 'checked';
  }

  set checked(value) {
    if (value === '') value = true;
    if (value === true) this.state = 'checked';
    else this.state = 'unchecked';
  }

  get indeterminate() {
    return this.input.indeterminate;
  }

  set indeterminate(value) {
    if (value === '') value = true;
    if (value === true) this.state = 'indeterminate';
  }

  toggle() {
    this.checked = !this.checked;
  }


  handleClick() {
    let stateChange = false;
    switch (this.state) {
      case 'indeterminate':
        // TODO what is the correct action to take here?
        this.state = 'checked';
        stateChange = true;
        break;
      case 'checked':
        this.state = 'unchecked';
        stateChange = true;
        break;
      case 'unchecked':
        this.state = 'checked';
        stateChange = true;
        break;
    }

    // if (stateChange === true) this.dispatchEvent(new Event('change'));
  }
  

  // add default icons if none are provided
  _defaultIcons() {
    if (this.children.length === 0) {
      this.insertAdjacentHTML('afterbegin', `
        <mdw-icon mdw-checked>check_box</mdw-icon>
        <mdw-icon mdw-unchecked>check_box_outline_blank</mdw-icon>
        <mdw-icon mdw-indeterminate>indeterminate_check_box</mdw-icon>
      `);
    }
  }

  template() {
    return /* html */`
      <slot></slot>
      <div class="mdw-ripple mdw-checkbox-ripple"></div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        --mdw-checkbox-size: 24px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        cursor: pointer;
        display: inline-block;
        position: relative;
        vertical-align: bottom;
        white-space: nowrap;
        cursor: pointer;

        width: var(--mdw-checkbox-size);
        height: var(--mdw-checkbox-size);
        line-height: 0;
        padding: 8px 0;
      }

      :host(.mdw-no-padding) {
        padding: 0;
      }

      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }

      :host-context(.mdw-density-comfortable),
      :host(.mdw-density-comfortable) {
        padding: 9px;
        margin: 0;
      }

      :host-context(.mdw-density-compact),
      :host(.mdw-density-compact) {
        padding: 5px;
        margin: 0;
      }

      ::slotted(mdw-icon) {
        position: absolute;
        user-select: none;
        outline: none;
        font-size: var(--mdw-checkbox-size);
      }

      :host(.mdw-large) {
        --mdw-checkbox-size: 48px;
      }

      :host(.mdw-primary) ::slotted(mdw-icon) {
        color: var(--mdw-theme-primary);
      }

      :host(.mdw-secondary) ::slotted(mdw-icon) {
        color: var(--mdw-theme-secondary);
      }

      :host(.mdw-error) ::slotted(mdw-icon) {
        color: var(--mdw-theme-error);
      }
      

      /* --- state: checked --- */
      :host([mdw-state="checked"]) ::slotted(mdw-icon[mdw-unchecked]),
      :host([mdw-state="checked"]) ::slotted(mdw-icon[mdw-indeterminate]) {
        display: none;
      }

      /* --- state: unchecked --- */
      :host([mdw-state="unchecked"]) ::slotted(mdw-icon[mdw-checked]),
      :host([mdw-state="unchecked"]) ::slotted(mdw-icon[mdw-indeterminate]) {
        display: none;
      }

      /* --- state: indeterminate --- */
      :host([mdw-state="indeterminate"]) ::slotted(mdw-icon[mdw-checked]),
      :host([mdw-state="indeterminate"]) ::slotted(mdw-icon[mdw-unchecked]) {
        display: none;
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
        background-color: rgba(var(--mdw-theme-on-background--rgb), 0.16);
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
        overflow: visible;
      }

      :host(.mdw-primary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-primary--rgb), 0.16);
      }

      :host(.mdw-secondary) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-secondary--rgb), 0.16);
      }

      :host(.mdw-error) .mdw-ripple-element {
        background-color: rgba(var(--mdw-theme-error--rgb), 0.16);
      }
    `;
  }
});
