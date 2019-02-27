customElements.define('mdw-banner', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  // thiss is used when a banner is creatd programtically
  template() {
    return html`
      <mdw-banner>
        <div>${this.message}</div>
        <div>
          ${this.actions}
        </div>
      </mdw-banner>
    `;
  }
});


<div class="mdc-snackbar">
  <div class="mdc-snackbar__surface">
    <div class="mdc-snackbar__label"
         role="status"
         aria-live="polite">
      Can't send photo. Retry in 5 seconds.
    </div>
    <div class="mdc-snackbar__actions">
      <button type="button" class="mdc-button mdc-snackbar__action">Retry</button>
    </div>
  </div>
</div>
