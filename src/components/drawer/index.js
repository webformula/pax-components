import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-drawer', class extends HTMLElementExtended {
  constructor() {
    super();
    this.isShowing = true;
    this.isRightAligned = this.hasAttribute('right-aligned');
  }

  get isLockedOpen() {
    return this.classList.contains('mdw-locked-open');
  }

  lockOpen() {
    this.classList.add('mdw-locked-open');
  }

  unlockOpen() {
    this.classList.remove('mdw-locked-open');
  }

  hide() {
    this.classList.add('mdw-closed');
    if (this.isLockedOpen) {
      this.classList.remove('mdw-locked-open');
      this.wasLockedOpen = true;
    }
    this.isShowing = false;
  }

  show() {
    this.classList.remove('mdw-closed');
    if (this.wasLockedOpen) {
      this.classList.add('mdw-locked-open');
    }
    this.isShowing = true;
  }

  toggle() {
    if (!this.isShowing) this.show();
    else this.hide();
  }
});
