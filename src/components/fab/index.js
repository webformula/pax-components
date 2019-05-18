customElements.define('mdw-fab', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
    this.setupAsync();
  }

  connectedCallback() {
    this.ripple = new MDWRipple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    this.ripple.destroy();
  }

  template() {
    return html`
      <span class="text"><slot></slot></span>
      <span class="spinner-container"></span>
      <div class="ripple fab-ripple"></div>
    `;
  }

  get dense() {
    return this.hasAttribute('dense');
  }

  get spinnerContainer() {
    if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.spinner-container');
    return this._spinnerContainer;
  }

  set disabled(value) {
    if (!!value || value === '') this.setAttribute('disabled', 'disabled');
    else this.removeAttribute('disabled');
  }

  setupAsync() {
    const asyncValue = this.getAttribute('async');
    if (!asyncValue) return;
    let pending = false;
    this.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      if (!pending) {
        this.showSpinner();
        pending = true;
        // TODO reconsider this feature
        // using evale for demostration purposes
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

  get spinnerStyle() {
    if (this.dense) return 'position: absolute; left: calc(50% - 16px); top: 4px;';
    return 'position: absolute; left: calc(50% - 16px); top: 12px;';
  }

  showSpinner() {
    this._showSpinner = true;
    this.classList.add('show-spinner');
    const isWhite = this.classList.contains('primary') || this.classList.contains('secondary') || this.classList.contains('error');
    this.spinnerContainer.innerHTML = `<mdw-circular-progress mode="indeterminate" class="${isWhite ? 'white' : 'grey'}" diameter="32" style="${this.spinnerStyle}"></mdw-circular-progress>`;
  }

  hideSpinner() {
    this._showSpinner = false;
    this.classList.remove('show-spinner');
    this.spinnerContainer.innerHTML = '';
  }

  cssFile() {
    return 'src/components/fab/internal.css'
  }
});
