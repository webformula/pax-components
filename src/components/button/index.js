customElements.define('mdw-button', class extends HTMLElementExtended {
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

  get spinnerContainer() {
    if (!this._spinnerContainer) this._spinnerContainer = this.shadowRoot.querySelector('.spinner-container');
    return this._spinnerContainer;
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

  showSpinner() {
    this._showSpinner = true;
    this.classList.add('show-spinner');
    const isWhite = this.classList.contains('primary') || this.classList.contains('secondary') || this.classList.contains('error');
    this.spinnerContainer.innerHTML = `<mdw-circular-progress mode="indeterminate" class="${isWhite ? 'white' : 'grey'}" diameter="24" style="position: absolute; left: calc(50% - 12px); top: 6px;"></mdw-circular-progress>`;
  }

  hideSpinner() {
    this._showSpinner = false;
    this.classList.remove('show-spinner');
    this.spinnerContainer.innerHTML = '';
  }

  template() {
    return html`
      <span class="text"><slot></slot></span>
      <span class="spinner-container"></span>
      <div class="ripple button-ripple"></div>
    `;
  }

  cssFile() {
    return 'src/components/button/internal.css'
  }
});
