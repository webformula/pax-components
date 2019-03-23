customElements.define('mdw-menu', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);
  }

  connectedCallback() {
    this.button.addEventListener('click', this.bound_onClick);
    [...this.panel.querySelectorAll('mdw-button')].forEach(el => {
      el.classList.add('full-height');
      el.classList.add('full-width')
    });
  }

  onClick(event) {
    this.panel.open();
    this.panel.addEventListener('click', this.bound_onPanelClick);
  }

  onPanelClick(event) {
    this.panel.close();
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
