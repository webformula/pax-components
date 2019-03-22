customElements.define('mdw-select', class extends HTMLElementExtended {
  constructor() {
    super();
    this.enhanced = this.getAttribute('enhanced') !== null;
    this.setOutlined();
    this.cloneTemplate(true);
    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onChange = this.onChange.bind(this);
    this.bound_onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.valid = this.selectElement.validity.valid;
    this.selectElement.addEventListener('focus', this.bound_onFocus);
    this.selectElement.addEventListener('blur', this.bound_onBlur);
    this.selectElement.addEventListener('change', this.bound_onChange);
    if (this.enhanced) this.setupEnhanced_();
  }

  setupEnhanced_() {
    const enhancedEl = document.createElement('div');
    enhancedEl.classList.add('mdw-select__selected-text');
    enhancedEl.style.width = `${this.selectElement.offsetWidth}px`;
    const options = this.selectElement.innerHTML;
    this.selectElement.parentNode.replaceChild(enhancedEl, this.selectElement);
    this._selectElement = enhancedEl;
    this.panel.position = 'inner_left bottom';
    this.panel.hoistToBody();
    this.panel.anchor = this._selectElement;
    this.selectElement.addEventListener('click', this.bound_onClick);
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.shadowRoot.querySelector('mdw-panel');
    return this.panel_;
  }

  onClick(event) {
    this.panel.open();
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
      ${!this.enhanced ? '' : `
        <mdw-panel>
          <div style="padding: 12px;">
            hello
          </div>
        </mdw-panel>
      `}
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
