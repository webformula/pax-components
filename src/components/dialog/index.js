import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDialog from './service.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-dialog', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this._clickOutsideClose = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.remove();

    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = undefined;
    }
  }

  get panel() {
    // hold a reference becuase we are hoisting the panel out of this component
    if (!this._panel) this._panel = this.querySelector('mdw-panel');
    return this._panel;
  }

  get position() {
    return this._position || 'center center';
  }

  set position(value) {
    this._position = value;
  }

  get clickOutsideClose() {
    return this._clickOutsideClose;
  }

  set clickOutsideClose(value) {
    this._clickOutsideClose = value;
  }

  show() {
    this.panel.hoistToBody();
    this.panel.setTarget('body');
    this.panel.setAttribute('mdw-position', this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.classList.add('mdw-show');

    this.backdrop = MDWUtils.addBackdrop(this.panel, () => {
      if (this.clickOutsideClose === true) this.close();
    });
    MDWUtils.lockPageScroll();
  }

  close(ok) {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    MDWUtils.unlockPageScroll();
    this.backdrop.remove();
    this.backdrop = undefined;
    this.dispatchClose(ok);
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = undefined;
    }
  }

  dispatchClose(isOk = false) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        ok: isOk
      }
    }));
  }
});
