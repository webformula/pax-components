customElements.define('mdw-menu', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
  }

  connectedCallback() {
    this.classList.add('mdw-panel--container');
    this.button.addEventListener('click', this.bound_onClick);
    this.panel.classList.add('mdw-menu');
  }

  onClick() {
    this.panel.autoPosition();
    this.panel.setPosition(this.panelPosition);
    this.panel.open(true);
    this.panel.addEventListener('click', this.bound_onPanelClick);
  }

  onPanelClick() {
    this.panel.close();
  }

  set panelPosition(value) {
    // TODO validate
    this.panelPosition_ = value;
  }

  get panelPosition() {
    return this.panelPosition_ || 'inner-top inner-left';
  }

  get button() {
    if (!this.button_) this.button_ = this.children[0];
    return this.button_;
  }

  get panel() {
    return this.querySelector('mdw-panel');
  }
});
