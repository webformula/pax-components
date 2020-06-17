import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener } from '../../core/swipe.js';

customElements.define('mdw-sheet-side', class extends HTMLElementExtended {
  constructor() {
    super();

    this._useBackdrop = !this.hasAttribute('mdw-no-backdrop');

    this.bound_onSwipe = this.onSwipe.bind(this);
    this.bound_routeChange = this.routeChange.bind(this);
  }

  connectedCallback() {
    this._isNavigationDrawer = this.classList.contains('mdw-navigation-drawer');
    if (this._isNavigationDrawer) document.body.classList.add('mdw-has-navigation-drawer');

    // auto add modal for mobile
    if (MDWUtils.isMobile) this.setAttribute('mdw-modal', '');

    // the use can add the modal class manually so we don't want to use the same isMobile check
    if (this._isNavigationDrawer && this.isModal) {
      document.body.classList.add('mdw-navigation-drawer-modal');
    }

    // auto hide if modal and navigation
    if (this.isModal && this._isNavigationDrawer && !this.isHidden && !this.classList.contains('mdw-show')) this.classList.add('mdw-hide');
    else if (this._isNavigationDrawer) document.body.classList.add('mdw-navigation-drawer-open');
    else if (this.isModal && !this.isHidden) {
      if (this._useBackdrop) this._backdrop = MDWUtils.addBackdrop(this, () => this.close(), { sheet: true });
    }

     // browser events for url changes. only use this for navigation
    if (this._isNavigationDrawer) {
      window.addEventListener('hashchange', this.bound_routeChange);
      window.addEventListener('DOMContentLoaded', this.bound_routeChange);
    }
  }

  disconnectedCallback() {
    if (this._backdrop) this._backdrop.remove();
    removeSwipeListener(document.body, this.bound_onSwipe);

    if (this._isNavigationDrawer) {
      window.removeEventListener('hashchange', this.bound_routeChange);
      window.removeEventListener('DOMContentLoaded', this.bound_routeChange);
    }
  }

  get isModal() {
    return this.hasAttribute('mdw-modal');
  }

  get isHidden() {
    return this.classList.contains('mdw-hide');
  }

  get isLeft() {
    return this.classList.contains('mdw-left') || this.classList.contains('mdw-navigation-drawer');
  }

  set useBackdrop(value) {
    this._useBackdrop = !!value;
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  routeChange() {
    // remove current links
    const currentLinks = this.querySelectorAll('.mdw-current-link');
    currentLinks.forEach(el => el.classList.remove('mdw-current-link'));

    // add current links
    let matchingLinks = this.querySelectorAll(`[href="#${this.path}"]`);
    if (!matchingLinks || matchingLinks.length === 0) matchingLinks = this.querySelectorAll(`[alt-href="#${this.path}"]`);
    matchingLinks.forEach(el => el.classList.add('mdw-current-link'));
  }

  open() {
    console.log(this.classList.contains('mdw-hide'));
    setTimeout(() => {
      this.classList.remove('mdw-hide');
      this.classList.add('mdw-show');
      if (this.isModal) {
        addSwipeListener(document.body, this.bound_onSwipe);
        if (this._useBackdrop) this._backdrop = MDWUtils.addBackdrop(this, () => this.close(), { sheet: true });
      }

      if (this._isNavigationDrawer) document.body.classList.add('mdw-navigation-drawer-open');
    }, 10); // this is a temporary fix
  }

  async close() {
    return new Promise(resolve => {
      this.classList.remove('mdw-show');
      this.classList.add('mdw-hide');
      if (this._backdrop) this._backdrop.remove();
      removeSwipeListener(document.body, this.bound_onSwipe);

      if (this._isNavigationDrawer) document.body.classList.remove('mdw-navigation-drawer-open');

      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  toggle() {
    if (this.isHidden) this.open();
    else this.close();
  }

  onSwipe(event) {
    if (this.isLeft) {
      if (event.direction.x === -1 && event.velocity.x < -0.8) this.close();
    } else {
      if (event.direction.x === 1 && event.velocity.x > 0.8) this.close();
    }
  }
});
