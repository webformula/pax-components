customElements.define('mdw-text-field', class extends HTMLElementExtended {
  constructor() {
    super();
    this.outlined = this.hasAttribute('outlined');
    this.cloneTemplate(true);
  }

  connectedCallback() {
    this.valid = this.input.validity.valid;
    if (this.outlined) this.setOutlined();

    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.input.addEventListener('blur', this.onBlur.bind(this));
    this.input.addEventListener('input', this.onInput.bind(this));
  }

  onFocus(event) {
    this.classList.add('focused');
    if (this.outlined) {
      this.notch.style.width = this.labelWidth + 'px';
    }
  }

  onBlur(event) {
    this.classList.remove('focused');
    this.classList.toggle('not-empty', !!this.input.value.length);
    this.valid = this.input.validity.valid;
    this.classList.toggle('invalid', !this.valid);
  }

  onInput(event) {
    if (this.valid !== this.input.validity.valid) {
      this.valid = this.input.validity.valid;
      this.classList.toggle('invalid', !this.valid);
    }
  }

  get input() {
    if (!this._input) this._input = this.querySlotted('input');
    return this._input;
  }

  get notch() {
    if (!this._notch) this._notch = this.shadowRoot.querySelector('.outlined-notch');
    return this._notch;
  }

  get label() {
    if (!this._label) this._label = this.querySlotted('label');
    return this._label;
  }

  get labelWidth() {
    return this.label.offsetWidth * 0.9;
  }

  setOutlined() {
    this.classList.add('outlined');
    this.input.classList.add('outlined');
  }

  template() {
    return `
      <slot></slot>
      ${this.outlined ? '' : '<div class="line-ripple"></div>'}
      ${!this.outlined ? '' : `
        <div class="outlined-border-container">
          <div class="outlined-leading"></div>
          <div class="outlined-notch"></div>
          <div class="outlined-trailing"></div>
        </div>
      `}
    `;
  }

  cssFile() {
    return '/src/components/text-field/internal.css';
  }

  querySlotted(selector) {
    return this.shadowRoot.querySelector('slot').assignedNodes().find(el => el.matches && el.matches(selector));
  }
});
