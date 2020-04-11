import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-list-item-expanded', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_routeChange = this.routeChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_close = this.close.bind(this);
  }

  disconnectedCallback() {
    MDWUtils.removeOnRouteChange(this.bound_routeChange);
    if (this.panel) this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get listItem() {
    return this._listItem;
  }

  set listItem(value) {
    this._listItem = value;

    this.routeChange();
  }

  get panel() {
    if (!this._panel && this.listItem) this._panel = document.querySelector(`mdw-panel[key="${this.listItem.key}"]`);
    return this._panel;
  }

  get isOpen() {
    return this.panel && this.panel.classList.contains('mdw-open');
  }

  routeChange() {
    const shouldBeOpen = this._listItem.key && MDWUtils.searchParamters['list-expanded'] === this._listItem.key;

    if (this.isOpen && !shouldBeOpen) this.close();
    if (!this.isOpen && shouldBeOpen) this.open();
  }

  open() {
    this.build();
    const panel = this.panel;
    panel.classList.add('mdw-list-item-expanded');
    panel.open();
    panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);

    if (this.listItem.key) {
      MDWUtils.setSearchParamter('list-expanded', this.listItem.key);
      MDWUtils.addOnRouteChange(this.bound_routeChange);
    }

    MDWUtils.lockPageScroll();
  }

  close() {
    MDWUtils.removeOnRouteChange(this.bound_routeChange);
    this.panel.close();
  }

  onPanelClose() {
    MDWUtils.removeSearchParamter('list-expanded');
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);

    MDWUtils.unlockPageScroll();
  }

  build() {
    if (!this._uid) this._uid = MDWUtils.uid();
    document.body.insertAdjacentHTML('beforeend', `
      <mdw-panel id="${this._uid}" key="${this.listItem.key}">
        ${this.innerHTML}
      </mdw-panel>
    `);
    this._panel = document.querySelector(`#${this._uid}`);
  }
});
