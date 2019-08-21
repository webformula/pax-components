customElements.define('mdw-switch', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onInputChange = this.onInputChange.bind(this);
    this.cloneTemplate();
  }

  connectedCallback() {
    this.input.addEventListener('change', this.bound_onInputChange);
    this.ripple = new MDWRipple({
      element: this.shadowRoot.querySelector('.mdw-ripple'),
      triggerElement: [this.input],
      radius: 20,
      centered: true
    });
  }

  disconnectedCallback() {
    this.input.addEventListener('click', this.bound_click);
    this.ripple.destroy();
  }

  static get observedAttributes() {
    return ['checked', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
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
    this.updateCheckedClass();
  }

  set disabled(value) {
    value = !!value || value === '';
    if (value) this.input.setAttribute('disabled', 'disabled');
    else this.input.removeAttribute('disabled');
  }

  updateCheckedClass() {
    if (this.checked) this.classList.add('checked');
    else this.classList.remove('checked');
  }

  dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', this));
  }

  onInputChange(e) {
    this.updateCheckedClass();
    this.dispatchChange();
  }

  get stylesFile() {
    return '/src/components/switch/internal.css'
  }

  template() {
    return html`
      <div class="mdw-track"></div>
      <div class="mdw-thumb-underlay">
        <div class="mdw-thumb">
          <input type="checkbox" role="switch">
          <div class="mdw-ripple mdw-switch-ripple"></div>
        </div>
      </div>
    `;
  }
});
