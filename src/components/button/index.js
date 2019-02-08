customElements.define('mdw-button', class extends HTMLElementExtended {
  // TODO impliment icon

  constructor() {
    super();
    this.cloneTemplate();
    this.setupAsync();
  }

  connectedCallback() {
    this.ripple = new Ripple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this.button
    });
  }

  static get observedAttributes() {
    return ['raised', 'unelevated', 'outlined', 'disabled', 'icon', 'shaped', 'dense'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  setupAsync() {
    const asyncValue = this.getAttribute('async');
    if (!asyncValue) return;
    let pending = false;
    this.button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      if (!pending) {
        this.showSpinner();
        pending = true;
        eval(asyncValue)
          .then(() => {
            pending = false
            this.hideSpinner();
          })
          .catch((e) => {
            this.hideSpinner();
            pending = false;
            throw e;
          });
      }
    });
  }

  showSpinner() {
    console.log('showSpinner')
  }

  hideSpinner() {
    console.log('hideSpinner')
  }

  get button() {
    if (!this._button) this._button = this.shadowRoot.querySelector('button');
    return this._button;
  }

  set raised(value) {
    this.button.classList.toggle('raised', !!value || value === '');
  }

  set unelevated(value) {
    this.button.classList.toggle('unelevated', !!value|| value === '');
  }

  set outlined(value) {
    this.button.classList.toggle('outlined', !!value || value === '');
  }

  set shaped(value) {
    this.button.classList.toggle('shaped', !!value || value === '');
  }

  set dense(value) {
    this.button.classList.toggle('dense', !!value || value === '');
  }

  set disabled(value) {
    if (!!value || value === '') this.button.setAttribute('disabled', 'disabled');
    else this.button.removeAttribute('disabled');
  }

  set icon(value) {
    // this.shadowRoot.classList.toggle('md-disabled', !!value);
  }

  html() {
    return html`
      <button>
        <slot></slot>
        <div class="ripple button-ripple"></div>
      </button>
    `;
  }

  cssFile() {
    return '/src/components/button/internal.css'
  }
});
