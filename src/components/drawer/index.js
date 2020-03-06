import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-drawer', class extends HTMLElementExtended {
  constructor() {
    super();
    this.bound_navigationChange = this.navigationChange.bind(this);
    this.isShowing = true;
    this.isRightAligned = this.hasAttribute('right-aligned');
    const fixedEl = this.fixedElement;
    if (fixedEl) fixedEl.style.width = `${this.offsetWidth}px`;

    // add spacing for scroll
    if (this.contentElement) this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop + 18}px)`;

    this.setupIconBar();

    this.lockBody();
    this.addCloseOnChange();
  }

  connectedCallback() {
    this.classList.add('mdw-active');
    if (MDWUtils.isMobile) {
      this.style.position = 'absolute';
      if (!this.classList.contains('mdw-locked-open-mobile')) {
        this.unlockOpen();
        this.hide();
      }
    }
  }

  disconnectedCallback() {
    if (this.backdrop) this.backdrop.remove();
    window.removeEventListener('hashchange', this.bound_navigationChange);
  }

  get isLockedOpen() {
    return this.classList.contains('mdw-locked-open');
  }

  get headerElement() {
    return this.querySelector('mdw-drawer-header');
  }

  get contentElement() {
    return this.querySelector('mdw-drawer-content');
  }

  get iconBarElement() {
    return this.querySelector('mdw-drawer-icon-bar');
  }

  get fixedElement() {
    return this.querySelector('mdw-drawer-fixed');
  }

  addCloseOnChange() {
    window.addEventListener('hashchange', this.bound_navigationChange);
  }

  lockOpen() {
    this.classList.add('mdw-locked-open');
  }

  unlockOpen() {
    this.classList.remove('mdw-locked-open');
  }

  navigationChange() {
    if (!this.isLockedOpen) this.hide();
  }

  hide() {
    this.classList.add('mdw-closed');
    if (this.isLockedOpen) {
      this.classList.remove('mdw-locked-open');
      this.wasLockedOpen = true;
    }
    this.isShowing = false;
    if (this.backdrop) this.backdrop.remove();

    if (!this.iconBarElement) return;
    this.iconBarElement.classList.add('mdw-show');
    const that = this;
    this.addEventListener('transitionend', function handle() {
      that.removeEventListener('transitionend', handle);
      that.contentElement.classList.add('mdw-hide');
      that.headerElement.classList.add('mdw-hide');
    });
  }

  show() {
    this.classList.remove('mdw-closed');
    this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop}px)`;
    if (this.wasLockedOpen) this.classList.add('mdw-locked-open');
    else if (MDWUtils.isMobile) this.addBackdrop();
    this.isShowing = true;

    // add spacing for scroll
    if (this.contentElement) this.contentElement.style.height = `calc(100% - ${this.contentElement.offsetTop + 18}px)`;

    if (!this.iconBarElement) return;
    this.iconBarElement.classList.remove('mdw-show');
    this.contentElement.classList.remove('mdw-hide');
    this.headerElement.classList.remove('mdw-hide');
  }

  toggle() {
    if (!this.isShowing) this.show();
    else this.hide();
  }

  addBackdrop() {
    this.backdrop = MDWUtils.addBackdrop(this, () => this.hide(), { drawer: true });
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


  // you can add an iconbar.
  // when the drawer is closed it will minimize to show the icon bar instead of completly hiding
  setupIconBar() {
    const iconBar = this.querySelector('mdw-drawer-icon-bar');
    if (!iconBar) return;

    this.classList.add('mdw-has-icon-bar');
    this.hasIconBar = true;
  }
});
