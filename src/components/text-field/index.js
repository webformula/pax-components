customElements.define('mdw-textfield', class extends HTMLElementExtended {
  constructor() {
    super();
    // set outlined once since this will not be changed
    this.outlined_ = this.hasAttribute('outlined');

    // TODO make classlist work in constructor
    // this.classList.add('mdw-upgraded');
    // this.insertAdjacentHTML('beforeend', this.outlinedHTML);


    // this.cloneTemplate(true);
  }

  connectedCallback() {
    this.classList.add('mdw-upgraded');
    this.valid = this.input.validity.valid;

    // this should go in constructor if posible
    if (this.outlined) this.insertAdjacentHTML('beforeend', this.outlinedHTML);
    if (!this.querySelector('.line-ripple')) this.insertAdjacentHTML('beforeend', this.lineRippleHTML);

    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.input.addEventListener('blur', this.onBlur.bind(this));
    this.input.addEventListener('input', this.onInput.bind(this));
  }

  onFocus() {
    if (this.outlined) {
      this.notch.style.width = this.labelWidth + 'px';
    }
  }

  onBlur() {
    this.classList.toggle('not-empty', !!this.input.value.length);
    this.valid = this.input.validity.valid;
    this.classList.toggle('invalid', !this.valid);
  }

  onInput() {
    if (this.valid !== this.input.validity.valid) {
      this.valid = this.input.validity.valid;
      this.classList.toggle('invalid', !this.valid);
    }
  }

  get input() {
    if (!this._input) this._input = this.querySelector('input');
    return this._input;
  }

  get notch() {
    if (!this._notch) this._notch = this.querySelector('.outlined-notch');
    return this._notch;
  }

  get label() {
    if (!this._label) this._label = this.querySelector('label');
    return this._label;
  }

  get labelWidth() {
    return this.label.offsetWidth;
  }

  get outlined() {
    return this.outlined_;
  }

  get outlinedHTML() {
    return `
      <div class="outlined-border-container">
        <div class="outlined-leading"></div>
        <div class="outlined-notch"></div>
        <div class="outlined-trailing"></div>
      </div>
    `;
  }

  get lineRippleHTML() {
    return '<div class="line-ripple"></div>';
  }
});
