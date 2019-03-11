customElements.define('mdw-select', class extends HTMLElementExtended {
  constructor() {
    super();
    this.setOutlined();
    this.cloneTemplate(true);
  }

  connectedCallback() {
    this.valid = this.selectElement.validity.valid;
    this.selectElement.addEventListener('focus', this.onFocus.bind(this));
    this.selectElement.addEventListener('blur', this.onBlur.bind(this));
    this.selectElement.addEventListener('change', this.onChange.bind(this));
  }

  onChange() {
    if (this.value && this.label) this.label.classList.add('mdw-select--float-above');
    else this.label.classList.remove('mdw-select--float-above');
  }

  onFocus() {
    this.classList.add('mdw-focused');
    if (this.outlined) {
      this.notch.style.width = this.labelWidth + 'px';
    }
  }

  onBlur() {
    this.classList.remove('mdw-focused');
    this.classList.toggle('mdw-not-empty', !!this.selectElement.value.length);
    this.valid = this.selectElement.validity.valid;
    this.classList.toggle('mdw-invalid', !this.valid);
  }

  onInput() {
    if (this.valid !== this.selectElement.validity.valid) {
      this.valid = this.selectElement.validity.valid;
      this.classList.toggle('mdw-invalid', !this.valid);
    }
  }

  get value() {
    return this.selectElement.value;
  }

  get selectElement() {
    if (!this._selectElement) this._selectElement = this.querySlotted('select');
    return this._selectElement;
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
    this.outlined = this.hasAttribute('outlined');
    if (!this.outlined) return;
    this.classList.add('mdw-select--outlined');
  }

  template() {
    return `
      <i class="mdw-select__icon"></i>
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
    return '/src/components/select/internal.css';
  }

  querySlotted(selector) {
    return this.shadowRoot.querySelector('slot').assignedNodes().find(el => el.matches && el.matches(selector));
  }
});
