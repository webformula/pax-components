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
    return this.position_ || 'center center';
  }

  show() {
    this.panel.setPosition(this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.classList.add('mdw-show');
  }

  close(ok) {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.dispatchClose(ok);
  }

  // hoistToBody() {
  //   document.body.appendChild(this);
  //   this.classList.add('mdw-dialog-backdrop-hoisted');
  //   this.isHoisted_ = true;
  // }

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
