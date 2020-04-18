import { HTMLElementExtended } from '@webformula/pax-core';
import './service.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-screen', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onPanelClose = this.onPanelClose.bind(this);
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get panel() {
    if (!this._panel) this._panel = this.querySelector('mdw-panel');
    return this._panel;
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  show() {
    this.panel.hoistToBody();
    const onclose = () => {
      this.panel.removeEventListener('close', onclose);
      this.panel.remove();
    };
    this.panel.addEventListener('close', onclose);
    requestAnimationFrame(() => {
      this.panel.show();
    });
  }
});
