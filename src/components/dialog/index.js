customElements.define('mdw-dialog', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_onPanelClose = this.onPanelClose.bind(this);
  }

  connectedCallback() {
    if (!this.hasBckdrop) this.insertAdjacentHTML('afterbegin', '<div class="backdrop hide"></div>');
    this.hasBckdrop = true;
  }

  disconnectedCallback() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }

  get panel() {
    return this.querySelector('mdw-panel');
  }

  get backdrop() {
    return this.querySelector('.backdrop');
  }

  get position() {
    return this.position_ || 'center center';
  }

  show() {
    this.panel.setPosition(this.position);
    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.backdrop.classList.remove('hide');
    this.classList.add('mdw-show');
  }

  close() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.close();
    this.backdrop.classList.add('hide');
  }

  hoistToBody() {
    document.body.appendChild(this);
    this.classList.add('mdw-backdrop-hoisted');
    this.isHoisted_ = true;
  }

  onPanelClose() {
    this.backdrop.classList.add('hide');
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
  }
});
