customElements.define('mdw-linear-progress', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    if (this.percent === null) this.classList.add('query')
  }

  static get observedAttributes() {
    return ['percent'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
  }

  get bar() {
    if (!this._bar) this._bar = this.shadowRoot.querySelector('.bar');
    return this._bar;
  }

  get percent() {
    return this.getAttribute('percent');
  }

  set percent(value) {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    this.bar.style.width = `${value}%`;
  }

  html() {
    return html`
      <div class="bar"></div>
    `;
  }

  cssFile() {
    return '/src/components/linear-progress/internal.css'
  }
});
