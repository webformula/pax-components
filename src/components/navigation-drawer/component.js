import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';

// todo routing

customElements.define('mdw-navigation-drawer', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;
  #rippleElements = [];

  constructor() {
    super();

    this.locationChange_bound = this.locationChange.bind(this);
  }

  connectedCallback() {
    this.#rippleElements = [...this.querySelectorAll('nav > a > .mdw-ripple')].map(element => new Ripple({
      element: element,
      triggerElement: element.parentNode
    }));

    window.addEventListener('locationchange', this.locationChange_bound);
    this.locationChange();
  }

  disconnectedCallback() {
    this.#rippleElements.forEach(r => r.destroy());
    window.removeEventListener('locationchange', this.locationChange_bound);
  }

  locationChange() {
    let currentLink = this.querySelector('a.mdw-current-link');
    if (currentLink) currentLink.classList.remove('mdw-current-link');

    // try full url
    let match = this.querySelector(`a[href="${location.href}"]`);

    // try full url without search parameters
    if (!match) match = this.querySelector(`a[href="${location.href.split('?')[0]}"]`);

    // try pathname with search parameters
    if (!match) match = this.querySelector(`a[href="${location.pathname}?${location.href.split('?')[1]}"]`);

    // try just pathname
    if (!match) match = this.querySelector(`a[href="${location.pathname}"]`);

    if (match) match.classList.add('mdw-current-link');
  }
});
