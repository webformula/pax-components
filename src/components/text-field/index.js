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

    // make sure the ripple element is inserted after all the elements except for mdw-textfield-helper
    if (!this.querySelector('.line-ripple')) {
      if (this.iconElement) this.iconElement.insertAdjacentHTML('beforebegin', this.lineRippleHTML);
      else if (this.helperTextElement) this.helperTextElement.insertAdjacentHTML('beforebegin', this.lineRippleHTML);
      else this.insertAdjacentHTML('beforeend', this.lineRippleHTML);
    }

    // add padding to input if has trailing icon
    if (this.isTrailingIcon()) this.classList.add('mdw-trailing-icon');

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

  isTrailingIcon() {
    if (!this.iconElement) return false;
    return [...this.children].indexOf(this.iconElement) > 1;
  }

  get input() {
    return this.querySelector('input');
  }

  get notch() {
    return this.querySelector('.outlined-notch');
  }

  get label() {
    return this.querySelector('label');
  }

  get labelWidth() {
    return this.label.offsetWidth * 0.95;
  }

  get outlined() {
    return this.outlined_;
  }

  get helperTextElement() {
    return this.querySelector('mdw-textfield-helper');
  }

  get iconElement() {
    return this.querySelector('mdw-icon');
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
