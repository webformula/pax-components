import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener } from '../../core/swipe.js';

customElements.define('mdw-sheet-side', class extends HTMLElementExtended {
  constructor() {
    super();

    this._useBackdrop = true;
    this.bound_onSwipe = this.onSwipe.bind(this);
    this.bound_routeChange = this.routeChange.bind(this);
  }

  connectedCallback() {
    // auto add modal for mobile
    if (MDWUtils.isMobile) this.classList.add('mdw-modal');
    // auto hide if modal
    if (this.isModal && !this.isHidden) this.classList.add('mdw-hide');

    // browser events for url changes
    window.addEventListener('hashchange', this.bound_routeChange);
    window.addEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  disconnectedCallback() {
    if (this._backdrop) this._backdrop.remove();
    removeSwipeListener(document.body, this.bound_onSwipe);
    window.removeEventListener('hashchange', this.bound_routeChange);
    window.removeEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  get isModal() {
    return this.classList.contains('mdw-modal');
  }

  get isHidden() {
    return this.classList.contains('mdw-hide');
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

  show() {
    this.classList.remove('mdw-hide');
    if (this.isModal) {
      addSwipeListener(document.body, this.bound_onSwipe);
      if (this._useBackdrop) this._backdrop = MDWUtils.addBackdrop(this, () => this.hide(), { sheet: true });
    }
  }

  hide() {
    this.classList.add('mdw-hide');
    if (this._backdrop) this._backdrop.remove();
    removeSwipeListener(document.body, this.bound_onSwipe);
  }

  toggle() {
    if (this.isHidden) this.show();
    else this.hide();
  }

  onSwipe(event) {
    if (event.direction.x === 1) this.hide();
  }
});
