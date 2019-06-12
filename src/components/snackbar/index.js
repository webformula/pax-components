customElements.define('mdw-snackbar', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
  }

  connectedCallback() {
    this.hasBckdrop = true;
    this.panel.clickOutsideClose = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get panel() {
    return this.querySelector('mdw-panel');
  }

  get position() {
    return this.position_ || 'inner-bottom inner-left';
  }

  show() {
    MDWSnackbar.add(this);
  }

  close(ok) {
    MDWSnackbar.remove(this, ok);
  }

  _open() {
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
