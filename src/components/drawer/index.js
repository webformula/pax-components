customElements.define('mdw-drawer', class extends HTMLElementExtended {
  constructor() {
    super();
    // this.cloneTemplate();
  }

  connectedCallback() {
    // window.removeEventListener('resize', this.throttledResizeHandler.bind(this));
  }

  disconnectedCallback() {
    // if (!this.fixed) {
    //   this.scrollTarget.removeEventListener('scroll', this.throttledScrollHandler.bind(this));
    //   window.removeEventListener('resize', this.throttledResizeHandler.bind(this));
    // }
  }

  resizeHandler() {
    this.isCurrentlyBeingResized = true;
    const currentHeight = this.height;
    if (this.topAppBarHeight !== currentHeight) {
      this.wasDocked = false;

      // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.
      this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
      this.topAppBarHeight = currentHeight;
    }
    this.topAppBarScrollHandler();
    this.isCurrentlyBeingResized = false;
  }

  template() {
    return html`
      <slot></slot>
    `;
  }

  cssFile() {
    return 'src/components/drawer/internal.css'
  }
});
