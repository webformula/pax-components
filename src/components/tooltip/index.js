customElements.define('mdw-tooltip', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  html() {
    return html`
      <div class="tooltip">
        <slot></slot>
      </div>
    `;
  }
});
