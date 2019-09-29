import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-drawer', class extends HTMLElementExtended {
  constructor() {
    super();
    this.isShowing = true;
    this.isRightAligned = this.hasAttribute('right-aligned');
    this.classList.add('mdw-active');
    if (MDWUtils.isMobile) {
      this.unlockOpen();
      this.hide();
    }

    const fixedEl = this.fixedElement;
    if (fixedEl) fixedEl.style.width = `${this.offsetWidth}px`;

    this.lockBody();
  }

  disconnectedCallback() {
    if (this.backdrop) this.backdrop.remove();
  }

  get isLockedOpen() {
    return this.classList.contains('mdw-locked-open');
  }

  get contentElement() {
    return this.querySelector('mdw-drawer-content');
  }

  get fixedElement() {
    return this.querySelector('mdw-drawer-fixed');
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
    if (this.backdrop) this.backdrop.remove();
  }

  show() {
    this.classList.remove('mdw-closed');
    this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop}px)`;
    if (this.wasLockedOpen) this.classList.add('mdw-locked-open');
    else if (MDWUtils.isMobile) this.addBackdrop();
    this.isShowing = true;
  }

  toggle() {
    if (!this.isShowing) this.show();
    else this.hide();
  }

  addBackdrop() {
    this.backdrop = MDWUtils.addBackdrop(this, () => this.hide());
  }

  // this makes sure there are no scrolling issues if the drawer is locked open and you want it fixed
  lockBody() {
    if (
      this.isLockedOpen // is in correct position
      && this.fixedElement // should be fixed
      && this.parentNode === document.body // draw is directly in body
      && !MDWUtils.isMobile // only valid in non mobile
      && document.querySelector('mdw-page > mdw-content') // contains nessacary elements to make sure scrolling will still work
    ) document.body.classList.add('prevent-over-scroll');
  }
});
