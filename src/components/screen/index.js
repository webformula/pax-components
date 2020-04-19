import { HTMLElementExtended } from '@webformula/pax-core';
import MDWScreen from './service.js';

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

  set animation(value) {
    this._animation = value;
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  open() {
    this.panel.classList.add('mdw-screen');
    this.panel.hoistToBody();
    this.panel.fullscreen();
    this.panel.setPosition('top left');
    if (this._animation) this.panel.setAnimation(this._animation);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);

    requestAnimationFrame(() => {
      this.panel.open();
    });
  }

  close() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.panel.removeOnAnimationComplete();
    this.dispatchClose();
    MDWScreen.currentSceen = undefined;
  }

  dispatchClose() {
    this.dispatchEvent(new Event('close'));
  }
});
