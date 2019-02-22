customElements.define('mdw-icon', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  template() {
    return '<slot></slot>';
  }

  cssFile() {
    return '/src/components/icon/internal.css';
  }
});
