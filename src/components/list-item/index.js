customElements.define('mdw-list-item', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = this.querySelector('.ripple');
    if (!element) return;
    this.ripple = new MDWRipple({
      element,
      triggerElement: this
    });
  }
});
