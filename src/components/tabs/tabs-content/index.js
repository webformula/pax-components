import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-tabs-content', class extends HTMLElementExtended {
  constructor() {
    super();
    this._bodies = [];
  }

  connectedCallback() {
    this.tabsBar.registerContent(this);
  }

  disconnectedCallback() {
    this.tabsBar && this.tabsBar.unregisterContent(this);
  }

  get tabsBar() {
    return document.body.querySelector(`mdw-tabs-bar#${this.getAttribute('tabs-id')}`);
  }

  registerBody(el) {
    this._bodies.push(el);
    if (this._wiatForBodyActiveId  !== undefined && this._bodies.length === this._wiatForBodyActiveId + 1) {
      this._activeBody = el;
      el.activate();
      this._wiatForBodyActiveId = undefined;
    }
  }

  unregisterBody(el) {
    this._bodies = this._bodies.filter(i => i != el);
  }

  changeTab(tabId) {
    if (!this._bodies.length) {
      this._wiatForBodyActiveId = parseInt(tabId);
      return;
    }
    if (this._activeBody) this._activeBody.deactivate();
    this._activeBody = this._bodies[tabId];
    this._activeBody.activate();
  }
});
