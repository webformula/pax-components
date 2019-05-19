customElements.define('mdw-dialog', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
  }

  connectedCallback() {
    if (!this.hasBckdrop) this.insertAdjacentHTML('afterbegin', '<div class="mdw-dialog-backdrop mdw-hide"></div>');
    this.hasBckdrop = true;
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

  close() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.backdrop.classList.add('mdw-hide');
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
});
