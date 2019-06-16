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
    this.debounce_filter = MDWUtils.debounce(this.filter.bind(this), 100);

    target.addEventListener('focus', this.bound_onTargetFocus);
    target.addEventListener('blur', this.bound_onTargetBlur);
    target.addEventListener('change', this.bound_onTargetChange);
    target.addEventListener('input', this.bound_onTargetInput);
  }

  disconnectedCallback() {
    const target = this.targetInput;
    target.removeEventListener('focus', this.bound_onTargetFocus);
    target.removeEventListener('blur', this.bound_onTargetBlur);
    target.removeEventListener('change', this.bound_onTargetChange);
    target.removeEventListener('input', this.bound_onTargetInput);
    this.panel.close();
    this.panel.removeEventListener('click', this.bound_onPanelClick);
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

  onTargetFocus(e) {
    this.panel.open(true);
    this.panel.addEventListener('click', this.bound_onPanelClick);
  }

  onTargetBlur(e) {
    // this.panel.close();
    // this.panel.removeEventListener('click', this.bound_onPanelClick);
  }

  onTargetChange(e) {
    console.log('change');
  }

  onTargetInput(e) {
    if (this._hasFilter) this.debounce_filter(e.target.value);
  }

  onPanelClick(e) {
    if (e.target.hasAttribute('value')) {
      const value = e.target.getAttribute('value');
      // TODO text field should do this when value is set
      this.targetInput.parentNode.classList.add('not-empty');
      this.targetInput.value = value;
      this.panel.close();
      this.panel.removeEventListener('click', this.bound_onPanelClick);
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
});
