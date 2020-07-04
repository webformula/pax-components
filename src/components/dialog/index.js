import { HTMLElementExtended } from '@webformula/pax-core/index.js';
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
    this.panel.remove();
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

  open(fromService = false) {
    this._fromService = fromService;
    this.panel.classList.add('mdw-dialog');
    this.panel.hoistToBody();
    this.panel.setPosition(this.position);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);

    this.backdrop = MDWUtils.addBackdrop(this.panel, () => {
      if (this.clickOutsideClose === true) this.close();
    });

    requestAnimationFrame(() => {
      this.panel.open();
    });
  }

  close(ok) {
    this.panel.close();
    this.dispatchClose(ok);
  }

  onPanelClose() {
    // don't remove if we are closing a template
    if (!this._fromService) {
      this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
      if (this.backdrop) {
        this.backdrop.remove();
        this.backdrop = undefined;
      }
      return;
    }
    this.remove();
  }

  dispatchClose(isOk = false) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        ok: isOk
      }
    }));
  }
});
