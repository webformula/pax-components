customElements.define('mdw-linear-progress', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    if (this.percent === null) this.classList.add('mdw-query')
  }

  static get observedAttributes() {
    return ['mdw-percent'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch(name) {
      case 'mdw-percent':
        this.percent = newValue;
        break;
    }
  }

  get bar() {
    if (!this._bar) this._bar = this.shadowRoot.querySelector('.mdw-bar');
    return this._bar;
  }

  get percent() {
    return this.getAttribute('mdw-percent');
  }

  set percent(value) {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    this.bar.style.width = `${value}%`;
  }

  template() {
    return html`
      <div class="mdw-bar"></div>
    `;
  }

  get stylesFile() {
    return '/src/components/linear-progress/internal.css'
  }
});
