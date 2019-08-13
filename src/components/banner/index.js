customElements.define('mdw-banner', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    this.style.marginBottom = `-${this.clientHeight + 1}px`;
  }

  show() {
    MDWBanner.add(this);
  }

  dismiss() {
    MDWBanner.remove(this);
  }

  accept() {
    MDWBanner.accept(this);
  }

  _show() {
    this.classList.add('mdw-show');
  }

  _dissmiss() {
    const self = this;
    self.addEventListener(MDWUtils.transitionEventName, function handler() {
      self.removeEventListener(MDWUtils.transitionEventName, handler);
      self.remove();
    });
    this.classList.add('mdw-dismiss');
    this.dispatchClose();
  }

  dispatchClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }
});
