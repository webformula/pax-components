customElements.define('mdw-list-item', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_hrefClick = this.hrefClick.bind(this);
  }

  connectedCallback() {
    this.connectRipple();
    this.connectHREF();
  }

  disconnectedCallback() {
    if (this.ripple) this.ripple.destroy();
    this.removeEventListener('click', this.bound_hrefClick);
  }

  connectRipple() {
    const element = this.querySelector('.mdw-ripple');
    if (!element) return;
    this.ripple = new MDWRipple({
      element,
      triggerElement: this
    });
    this.classList.add('mdw-has-ripple');
  }

  connectHREF() {
    if (!this.hasAttribute('href')) return;
    this.addEventListener('click', this.bound_hrefClick);
  }

  hrefClick() {
    document.location.href = this.getAttribute('href');
  }
});
