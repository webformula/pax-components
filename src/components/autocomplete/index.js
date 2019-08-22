import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-autocomplete', class extends HTMLElementExtended {
  constructor() {
    super();
    this._hasFilter = this.hasAttribute('filter');
  }

  connectedCallback() {
    const target = this.targetInput;

    this._innerHTML = this.innerHTML;
    this._optionsData = [...this.children].reduce((a, el) => {
      a[el.innerText] = el.getAttribute('value');
      return a;
    }, {});
    this.innerHTML = '';
    this.insertAdjacentHTML('beforeend', this.panelHTML);
    this.panel.innerHTML = this._innerHTML;
    this.panel.style.minWidth = `${this.targetInput.offsetWidth}px`;
    this.panel.style.transform = 'scale(1)';
    this.panel.style.top = `${this.targetInput.offsetHeight + 12}px`;
    this.panel.ignoreElementOnClickToClose(target);

    this.bound_onTargetFocus = this.onTargetFocus.bind(this);
    this.bound_onTargetBlur = this.onTargetBlur.bind(this);
    this.bound_onTargetChange = this.onTargetChange.bind(this);
    this.bound_onTargetInput = this.onTargetInput.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onKeyDown = this.onKeyDown.bind(this);
    this.debounce_filter = MDWUtils.debounce(this.filter.bind(this), 100);

    target.addEventListener('focus', this.bound_onTargetFocus);
    target.addEventListener('blur', this.bound_onTargetBlur);
    target.addEventListener('input', this.bound_onTargetInput);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    document.body.addEventListener('keydown', this.bound_onKeyDown);
  }

  disconnectedCallback() {
    const target = this.targetInput;
    if (target) {
      target.removeEventListener('focus', this.bound_onTargetFocus);
      target.removeEventListener('blur', this.bound_onTargetBlur);
      target.removeEventListener('change', this.bound_onTargetChange);
      target.removeEventListener('input', this.bound_onTargetInput);
    }
    this.panel.close();
    this.panel.removeEventListener('click', this.bound_onPanelClick);
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    document.body.removeEventListener('keydown', this.bound_onKeyDown);
  }

  get targetInput() {
    return document.body.querySelector(`input[name=${this.getAttribute('for')}]`);
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
    return this.panel_;
  }

  get panelHTML() {
    return '<mdw-panel mdw-position="top inner-left"></mdw-panel>';
  }

  onPanelClose(e) {
    const target = this.targetInput;
    this.panel.removeEventListener('click', this.bound_onPanelClick);
    target.removeEventListener('change', this.bound_onTargetChange);
  }

  openPanel() {
    const target = this.targetInput;
    this._focusIndex = undefined;
    this.panel.open(true);
    this.panel.addEventListener('click', this.bound_onPanelClick);
    target.addEventListener('change', this.bound_onTargetChange);
  }

  onKeyDown(e) {
    if (!this.panel.isOpen()) {
      if (!this._isInputFocused) return;
      if (e.keyCode !== 27) this.openPanel();
      return;
    }

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
    }
  }

  onTargetFocus(e) {
    this._isInputFocused = true;
    this.openPanel();
  }

  onTargetBlur(e) {
    this._isInputFocused = false;
    // this.panel.close();
    // this.panel.removeEventListener('click', this.bound_onPanelClick);
  }

  onTargetChange(e) {
    // console.log('change');
  }

  onTargetInput(e) {
    if (!this.panel.isOpen()) {
      this.openPanel();
      return;
    }
    if (this._hasFilter) this.debounce_filter(e.target.value);
  }

  onPanelClick(e) {
    if (e.target.hasAttribute('value')) {
      const value = e.target.getAttribute('value');
      // TODO text field should do this when value is set
      this.targetInput.parentNode.classList.add('not-empty');
      this.targetInput.value = value;
      this.panel.close();
    }
  }

  filter(value) {
    if (!this.panel.isOpen()) return;
    value = value.toLowerCase();
    const vlen = value.length;
    const filtered = Object.keys(this._optionsData).filter(h => {
      const hlen = h.length;
      if (vlen > hlen) return false;
      if (vlen === hlen) return value === h;
      if (h.toLowerCase().includes(value)) return true
      return false;
      // TODO implement char matching
      // let i = 0;
      // let j;
      // for (; i < vlen; i += 1) {
      //
      // }
    });

    this.panel.innerHTML = this.renderOptions(filtered);
  }

  renderOptions(optionKeys) {
    return `${optionKeys.map(k => html`
      <option value="${this._optionsData[k]}">${k}</option>
    `).join('\n')}`;
  }

  focusNext() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex += 1;
    if (this._focusIndex > optionElements.length - 1) this._focusIndex = optionElements.length - 1;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  focusPrevious() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.children];
    if (this._focusIndex === undefined) this._focusIndex = 0;
    else this._focusIndex -= 1;
    if (this._focusIndex <= 0) this._focusIndex = 0;
    if (this._focusedOption) this._focusedOption.classList.remove('mdw-focused');
    this._focusedOption = optionElements[this._focusIndex];
    this._focusedOption.classList.add('mdw-focused');
  }

  selectFocused() {
    if (!this.panel.isOpen()) return;
    const optionElements = [...this.panel.children];
    if (this._focusIndex == undefined || this._focusIndex > optionElements.length - 1) this._focusIndex = 0;
    const value =  optionElements[this._focusIndex].getAttribute('value');
    // TODO text field should do this when value is set
    this.targetInput.parentNode.classList.add('not-empty');
    this.targetInput.value = value;
    this.panel.close();
  }
});
