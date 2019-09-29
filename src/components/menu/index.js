import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-menu', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    this.bound_onPanelClick = this.onPanelClick.bind(this);

    if (MDWUtils.isMobile === true) this.createSheet();
    else this.createPanel();
  }

  connectedCallback() {
    this.button.addEventListener('click', this.bound_onClick);

    if (MDWUtils.isMobile !== true) {
      this.classList.add('mdw-panel--container');
      this.panel.classList.add('mdw-menu');
    }
  }

  onClick() {
    if (MDWUtils.isMobile !== true) {
      this.panel.autoPosition();
      this.panel.setPosition(this.panelPosition);
      this.panel.open(true);
      this.panel.addEventListener('click', this.bound_onPanelClick);
    } else {
      this.sheet.show();
    }
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

  createSheet() {
    this.insertAdjacentHTML('beforeend', `
      <mdw-sheet mdw-modal>
        <mdw-sheet-content>
          ${this.contentElement.innerHTML}
        </mdw-sheet-content>
      </mdw-sheet>
    `);
    this.contentElement.remove();
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
