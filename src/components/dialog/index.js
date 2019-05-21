customElements.define('mdw-dialog', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
  }

  connectedCallback() {
    if (!this.hasBckdrop) this.insertAdjacentHTML('afterbegin', '<div class="mdw-dialog-backdrop mdw-hide"></div>');
    this.hasBckdrop = true;
    this.panel.clickOutsideClose = false;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get panel() {
    return this.querySelector('mdw-panel');
  }

  get backdrop() {
    return this.querySelector('.mdw-dialog-backdrop');
  }

  get position() {
    return this.position_ || 'center center';
  }

  show() {
    this.panel.setPosition(this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.backdrop.classList.remove('mdw-hide');
    this.classList.add('mdw-show');
  }

  close(ok) {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.backdrop.classList.add('mdw-hide');
    this.dispatchClose(ok);
  }

  hoistToBody() {
    document.body.appendChild(this);
    this.classList.add('mdw-dialog-backdrop-hoisted');
    this.isHoisted_ = true;
  }

  onPanelClose() {
    this.backdrop.classList.add('mdw-hide');
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
