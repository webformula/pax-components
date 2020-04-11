import { HTMLElementExtended } from '@webformula/pax-core';
import './service.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-dialog', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.clickOutsideClose_ = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);

    if (this.backdrop) {
      this.backdrop.remove();
      this.backdrop = undefined;
    }
  }

  get panel() {
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
    return this.clickOutsideClose_;
  }

  set clickOutsideClose(value) {
    this.clickOutsideClose_ = value;
  }

  show() {
    this.panel.hoistToBody();
    const onclose = () => {
      el.removeEventListener('close', onclose);
      el.remove();
    };
    el.addEventListener('close', onclose);
    requestAnimationFrame(() => {
      this.panel.show();
    });
    // this.panel.setPosition(this.position);
    // this.panel.open();
    // this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    // this.classList.add('mdw-show');
    // // TODO find a better way to handle positioning against body.
    // // this.panel.setPositionStyle(document.body);
    //
    // this.backdrop = MDWUtils.addBackdrop(this.panel, () => {
    //   if (this.clickOutsideClose === true) this.close();
    // });
    // MDWUtils.lockPageScroll();
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
