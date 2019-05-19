customElements.define('mdw-list-item', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = this.querySelector('.mdw-ripple');
    if (!element) return;
    this.ripple = new MDWRipple({
      element,
      triggerElement: this
    });
  }

  disconnectedCallback() {
    if (this.ripple) this.ripple.destroy();
  }
});
