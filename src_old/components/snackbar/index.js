import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWSnackbar from './service.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-snackbar', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.panelId = `${this.getAttribute('id')}_panel`;
  }

  connectedCallback() {
    this.querySelector('mdw-panel').setAttribute('id', `${this.panelId}`);
    this.hasBckdrop = true;
    this.panel.clickOutsideClose = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get position() {
    return this.position_ || 'inner-left inner-bottom';
  }

  setPosition(value) {
    const split = value.split(' ');
    this.position_ = `${split[0] || 'inner-left'} ${split[1] || 'inner-bottom'}`;
    this.panel.setPosition(this.position);
  }

  show() {
    MDWSnackbar.add(this);
  }

  close(ok) {
    MDWSnackbar.remove(this, ok);
  }

  _open() {
    this.panel.hoistToBody(this.parentNode);
    this.panel.setPosition(this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.autoCancelTimeout = setTimeout(() => {
      this.close();
    }, 3000);
  }

  _close(ok) {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.dispatchClose(ok);
    clearTimeout(this.autoCancelTimeout);

    // remove panel element
    setTimeout(() => {
      this.panel.remove();
    }, 200);
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  dispatchClose(isOk = false) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        ok: isOk
      }
    }));
  }
});
