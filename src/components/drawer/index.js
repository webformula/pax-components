customElements.define('mdw-drawer', class extends HTMLElementExtended {
  constructor() {
    super();
    this.isShowing = true;
  }

  hide() {
    const width = this.offsetWidth;
    this.style.marginLeft = `-${width}px`
    this.isShowing = false;
  }

  show() {
    this.style.marginLeft = '';
    this.isShowing = true;
  }

  toggle() {
    if (!this.isShowing) this.show();
    else this.hide();
  }
});
