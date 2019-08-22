customElements.define('mdw-select', class extends HTMLElementExtended {
  constructor() {
    super();
    this.classList.add('mdw-no-animation');
    this.enhanced = this.getAttribute('mdw-enhanced') !== null;
    // this.setOutlined();
    this.cloneTemplate(true);
    this.bound_onFocus = this.onFocus.bind(this);
    this.bound_onBlur = this.onBlur.bind(this);
    this.bound_onChange = this.onChange.bind(this);
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
    this.bound_onKeyDown = this.onKeyDown.bind(this);
  }

  connectedCallback() {
    this.setSelected();
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

    setTimeout(() => {
      this.classList.add('mdw-no-animation');
    }, 0);
  }

  disconnectedCallback() {
    document.body.removeEventListener('keydown', this.bound_onKeyDown);
    this.selectElement.removeEventListener('focus', this.bound_onFocus);
    this.selectElement.removeEventListener('blur', this.bound_onBlur);
    this.selectElement.removeEventListener('change', this.bound_onChange);
    this.selectElement.removeEventListener('click', this.bound_onClick);
    // Make sure panel does not linger
  }

  setupEnhanced_() {
    // lift on change event
    const selectOnchange = this.selectElement.getAttribute('onchange');
    if (selectOnchange) this.setAttribute('onchange', selectOnchange);

    // grab selected
    const selected = this.selectElement.querySelector('[selected]');

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
    document.body.addEventListener('keydown', this.bound_onKeyDown);

    // set selected
    if (selected) {
      this.value_ = selected.value;
      this.setSelectedText(selected.innerText);
    }
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
    return this.panel_;
  }

  onClick(event) {
    this._focusIndex === undefined;
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

  onKeyDown(e) {
    if (!this.panel.isOpen()) return

    switch (e.keyCode) {
      case 40: //down
      case 39: //right
        this.focusNext();
        break;

      case 38: //up
      case 37: //left
        this.focusPrevious();
        break;

      case 13: //enter
        this.selectFocused();
        break;

      default:
        if (e.keyCode >= 31 || e.keyCode <= 90) {
          const nodeIndex = this.keyboardSearchNodes(e.keyCode);
          if (nodeIndex !== undefined) this.selectNode(nodeIndex);
          e.stopPropagation();
          e.preventDefault();
        }
    }
  }

  keyboardSearchNodes(keyCode) {
    if (this._clearSearchTimeout !== undefined) clearTimeout(this._clearSearchTimeout);
    this._clearSearchTimeout = setTimeout(() => {
      this._clearSearchTimeout = undefined;
      this._keyboardSearchStr = '';
      this._keyboardOptionNames = undefined;
    }, 300);
    if (this._keyboardSearchStr === undefined) this._keyboardSearchStr = '';
    this._keyboardSearchStr += String.fromCharCode(keyCode);
    const search = new RegExp('^' + this._keyboardSearchStr, 'i');

    if (!this._keyboardOptionNames) this._keyboardOptionNames = [...this.panel.firstChild.children].map(el => el.innerText);

    const length = this._keyboardOptionNames.length;
    let i = 0;
    while (i < length) {
      if (search.test(this._keyboardOptionNames[i])) {
        return i;
      }
      i += 1;
    }
  }

  selectNode(index) {
    const optionElements = [...this.panel.firstChild.children];
    this._focusIndex = index;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusNext() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.firstChild.children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex += 1;
    if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusPrevious() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.firstChild.children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  selectFocused() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.firstChild.children];
    if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
    this.onPanelClick({ target: optionElements[this._focusIndex] });
  }

  setSelected() {
    if (this.hasAttribute('mdw-value')) {
      const value = this.getAttribute('mdw-value');
      const option = [...this.querySelectorAll('option')].map(el => ({
        el,
        value: el.value
      })).find(e => e.value === value);
      if (option) option.el.setAttribute('selected', 'selected');
    }
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

  get internalStylesFile() {
    return './internal.css';
  }

  querySlotted(selector) {
    return this.shadowRoot.querySelector('slot').assignedNodes().find(el => el.matches && el.matches(selector));
  }
});
