customElements.define('mdw-switch', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.querySelector('input')) this.cloneTemplate();
    // this.ripple = new MDWRipple({
    //   element: this.querySelector('.ripple'),
    //   triggerElement: [this.input, this.label],
    //   radius: 20,
    //   centered: true
    // });

    this.connected_ = true;

    // if (this.label) {
    //   this.boundHandleLabelClick_ = this.toggle.bind(this);
    //   this.label.addEventListener('click', this.boundHandleLabelClick_);
    //   if (this.hasAttribute('right')) {
    //     const labelWidth = this.label.offsetWidth;
    //     this.style.marginLeft = `${labelWidth - 16}px`;
    //     this.label.style.marginLeft = `-${labelWidth + 8}px`;
    //   }
    // }
  }

  disconnectedCallback() {
    if (this.label) this.label.removeEventListener('click', this.boundHandleLabelClick_);
    // this.ripple.destroy();
  }

  static get observedAttributes() {
    return ['checked', 'disabled'];
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

  cssFile() {
    return '/src/components/switch/internal.css'
  }

  template() {
    return html`
      <div class="mdw-track"></div>
      <div class="mdw-thumb-underlay">
        <div class="mdw-thumb">
          <input type="checkbox" role="switch">
        </div>
      </div>
    `;
    // <div class="ripple switch-ripple"></div>
  }
});
