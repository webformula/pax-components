customElements.define('mdw-banner', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    this.style.marginBottom = `-${this.clientHeight + 1}px`;
  }

  show() {
    this.classList.add('mdw-show');
  }

  dismiss() {
    const self = this;
    self.addEventListener(MDWUtils.transitionEventName, function handler() {
      self.removeEventListener(MDWUtils.transitionEventName, handler);
      self.remove();
    });
    this.classList.add('mdw-dismiss');
  }
});
