import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-navigation-rail', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_routeChange = this.routeChange.bind(this);

  }

  connectedCallback() {
    // browser events for url changes
    window.addEventListener('hashchange', this.bound_routeChange);
    window.addEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.bound_routeChange);
    window.removeEventListener('DOMContentLoaded', this.bound_routeChange);
  }

  get path() {
    let path = window.location.hash.replace(/.*#/, '');
    if (path.indexOf('?') > -1) path = path.split('?')[0];
    if (path.charAt(0) !== '/') path = '/' + path;
    return path;
  }

  routeChange() {
    // remove current links
    const currentLinks = document.querySelectorAll('.mdw-current-link');
    currentLinks.forEach(el => el.classList.remove('mdw-current-link'));

    // add current links
    const matchingLinks = document.querySelectorAll(`a[href="#${this.path}"]`);
    matchingLinks.forEach(el => el.classList.add('mdw-current-link'));
  }
});
