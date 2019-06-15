customElements.define('mdw-autocomplete', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    this._innerHTML = this.innerHTML;
    this.innerHTML = '';
    this.insertAdjacentHTML('beforeend', this.panelHTML);
    this.panel.innerHTML = this._innerHTML;
    this.panel.style.minWidth = `${this.targetInput.offsetWidth}px`;
    this.panel.style.transform = 'scale(1)';
    this.panel.style.top = `${this.targetInput.offsetHeight + 12}px`;

    this.bound_onTargetFocus = this.onTargetFocus.bind(this);
    this.bound_onTargetBlur = this.onTargetBlur.bind(this);
    this.bound_onTargetChange = this.onTargetChange.bind(this);
    this.bound_onTargetInput = this.onTargetInput.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);

    const target = this.targetInput;
    target.addEventListener('focus', this.bound_onTargetFocus);
    target.addEventListener('blur', this.bound_onTargetBlur);
    target.addEventListener('change', this.bound_onTargetChange);
    target.addEventListener('input', this.bound_onTargetInput);
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
    this.panel.open();
    this.panel.addEventListener('click', this.bound_onPanelClick);
  }

  onTargetBlur(e) {
    this.panel.close();
    this.panel.removeEventListener('click', this.bound_onPanelClick);
  }

  onTargetChange(e) {
    console.log('change');
  }

  onTargetInput(e) {
    console.log('input');
  }

  onPanelClick(e) {

  }
});
