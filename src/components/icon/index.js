customElements.define('mdw-icon', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  html() {
    return '<slot></slot>';
  }

  cssFile() {
    return '/src/components/icon/internal.css';
  }
});
