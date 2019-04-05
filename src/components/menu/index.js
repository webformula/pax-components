customElements.define('mdw-menu', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
  }

  connectedCallback() {
    this.classList.add('mdw-panel--anchor');
    this.button.addEventListener('click', this.bound_onClick);
    [...this.panel.querySelectorAll('mdw-button')].forEach(el => {
      el.classList.add('full-height');
      el.classList.add('full-width');
    });
  }

  onClick() {
    this.panel.setPosition(this.panelPosition);
    this.panel.open();
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
    return this.panelPosition_ || 'bottom inner-left';
  }

  get button() {
    if (!this.button_) this.button_ = this.children[0];
    return this.button_;
  }

  get panel() {
    if (!this.panel_) this.panel_ = this.querySelector('mdw-panel');
    return this.panel_;
  }
});
