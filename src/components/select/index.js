customElements.define('mdw-select', class extends HTMLElementExtended {
  constructor() {
    super();
    this.enhanced = this.getAttribute('mdw-enhanced') !== null;
    // this.setOutlined();
    this.cloneTemplate(true);
    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onChange = this.onChange.bind(this);
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
  }

  connectedCallback() {
    this.querySlotted('label').classList.add('mdw-empty-no-float');
    this.valid = this.selectElement.validity.valid;
    if (this.enhanced) this.setupEnhanced_();
    else {
      this.selectElement.addEventListener('focus', this.bound_onFocus);
      this.selectElement.addEventListener('blur', this.bound_onBlur);
      this.selectElement.addEventListener('change', this.bound_onChange);
    }

    // capture option selected attribute and float the label
    this.onChange();
  }

  setupEnhanced_() {
    // lift on change event
    const selectOnchange = this.selectElement.getAttribute('onchange');
    if (selectOnchange) this.setAttribute('onchange', selectOnchange);

    // grab selected
    const selected = this.selectElement.querySelector('[selected]');
    if (selected) this.value_ = selected.value;

    const enhancedEl = document.createElement('div');
    enhancedEl.classList.add('mdw-select__selected-text');
    enhancedEl.style.width = `${this.selectElement.offsetWidth}px`;
    this.insertAdjacentHTML('beforeend', this.panelHTML);
    this.panel.innerHTML = `<div class="options-list">${this.selectElement.innerHTML}</div>`;
    this.panel.style.minWidth = `${this.selectElement.offsetWidth}px`;
    this.panel.style.transform = 'scale(1)';
    this.panel.hoistToBody(this);
    this.selectElement.parentNode.replaceChild(enhancedEl, this.selectElement);
    this._selectElement = enhancedEl;
    this.selectElement.addEventListener('click', this.bound_onClick);

    // set value text
    if (this.value_) this.setSelectedText(this.value_);
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
    return this.panel_;
  }

  onClick(event) {
    this.onFocus();
    this.panel.open(true);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onBlur);
    this.panel.addEventListener('click', this.bound_onPanelClick);
  }

  onPanelClick(event) {
    if (event.target.nodeName !== 'OPTION') return;
    this.value = event.target.value;
    this.setSelectedText(event.target.innerText);
    const currentSelected = this.panel.querySelector('.mdw-selected');
    if (currentSelected) currentSelected.classList.remove('mdw-selected');
    event.target.classList.add('mdw-selected');
    this.panel.close();
  }

  onChange() {
    if (this.value && this.label) {
      this.label.classList.add('mdw-select--float-above');
      this.querySlotted('label').classList.remove('mdw-empty-no-float');
      if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
    } else {
      this.label.classList.remove('mdw-select--float-above');
      this.querySlotted('label').classList.add('mdw-empty-no-float');
      if (this.outlined) this.notch.style.width = '0';
    }
  }

  onFocus() {
    this.classList.add('mdw-focused');
    if (this.outlined) this.notch.style.width = this.labelWidth + 'px';
  }

  onBlur() {
    this.classList.remove('mdw-focused');
    this.classList.toggle('mdw-not-empty', (this.selectElement.value || this.value_) && !!(this.selectElement.value || this.value_).length);
    this.valid = this.selectElement.validity && this.selectElement.validity.valid;
    this.classList.toggle('mdw-invalid', !this.valid);
    if (this.panel) {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onBlur);
      this.panel.removeEventListener('click', this.bound_onPanelClick);
    }
  }

  onInput() {
    if (this.valid !== this.selectElement.validity.valid) {
      this.valid = this.selectElement.validity.valid;
      this.classList.toggle('mdw-invalid', !this.valid);
    }
  }

  setSelectedText(value) {
    this.selectElement.innerText = value;
  }

  set value(value) {
    this.value_ = value;
    this.onChange();

    // const event = document.createEvent('Event');
    // event.initEvent('onchange', true, true);
    this.dispatchEvent(new Event('change'));
  }

  get value() {
    return this.selectElement.value || this.value_;
  }

  get selectElement() {
    if (!this._selectElement) this._selectElement = this.querySlotted('select');
    return this._selectElement;
  }

  get notch() {
    if (!this._notch) this._notch = this.shadowRoot.querySelector('.mdw-outlined-notch');
    return this._notch;
  }

  get label() {
    if (!this._label) this._label = this.querySlotted('label');
    return this._label;
  }

  get labelWidth() {
    return this.label.offsetWidth * 0.9;
  }

  get outlined() {
    return [].slice.apply(this.classList || []).includes('mdw-outlined');
  }

  template() {
    return `
      <i class="mdw-select__icon"></i>
      <slot></slot>
      ${this.outlined ? '' : '<div class="mdw-line-ripple"></div>'}
      ${!this.outlined ? '' : `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `}
    `;
  }

  get panelHTML() {
    return '<mdw-panel mdw-position="bottom inner-left"></mdw-panel>';
  }

  cssFile() {
    return '/src/components/select/internal.css';
  }

  querySlotted(selector) {
    return this.shadowRoot.querySelector('slot').assignedNodes().find(el => el.matches && el.matches(selector));
  }
});
