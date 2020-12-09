import { HTMLElementExtended } from '@webformula/pax-core/index.js';

customElements.define('mdw-menu', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);

    this.createPanel();
  }

  connectedCallback() {
    if (this.button) this.button.addEventListener('click', this.bound_onClick);
    else {
      setTimeout(() => {
        if (this.button) this.button.addEventListener('click', this.bound_onClick);
      }, 0);
    }
    this.classList.add('mdw-panel--container');
    this.panel.classList.add('mdw-menu');
  }

  onClick() {
    this.panel.setPosition(this.panelPosition);
    this.panel.autoPosition();
    this.panel.clickBodyToClose();
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
    return this.children[0];
  }

  get contentElement() {
    return this.querySelector('mdw-menu-content');
  }

  get panel() {
    return this.querySelector('mdw-panel');
  }

  get sheet() {
    return this.querySelector('mdw-sheet');
  }

  createPanel() {
    if (!this.contentElement) return;
    this.insertAdjacentHTML('beforeend', `
      <mdw-panel>
        ${this.contentElement.innerHTML}
      </mdw-panel>
    `);
    this.contentElement.remove();
  }
});
