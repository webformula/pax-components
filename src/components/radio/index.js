customElements.define('mdw-radio', class extends HTMLElementExtended {
  constructor() {
    super();
    // input radio will not work correctly in shadowroot
    this.insertAdjacentHTML('afterbegin', this.template());
  }

  connectedCallback() {
    this.ripple = new MDWRipple({
      element: this.querySelector('.mdw-ripple'),
      triggerElement: [this.input],
      radius: 20,
      centered: true
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
  }

  get input() {
    return this.querySelector('input');
  }

  get name() {
    if (this.parentNode && this.parentNode.hasAttribute('name')) {
      this.name_ = this.parentNode.getAttribute('name');
    } else if (this.hasAttribute('name')) {
      this.name_ = this.getAttribute('name');
    }
    return this.name_ || '';
  }

  template() {
    return html`
      <input type="radio" name="${this.name}">
      <div class="mdw-radio-background">
        <div class="mdw-radio__outer-circle"></div>
        <div class="mdw-radio__inner-circle"></div>
      </div>
      <div class="mdw-ripple mdw-radio-ripple"></div>
    `;
  }
});
