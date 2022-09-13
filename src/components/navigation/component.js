import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';
import './component.css';


customElements.define('mdw-navigation', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #rippleElements = [];
  #locationChange_bound = this.#locationChange.bind(this);


  constructor() {
    super();

    if (!this.classList.contains('mdw-state-rail')) {
      this.classList.add('mdw-state-drawer');
    }
  }

  async connectedCallback() {
    this.#rippleElements = [...this.querySelectorAll('nav > a > .mdw-ripple')].map(element => new Ripple({
      element: element,
      triggerElement: element.parentNode
    }));

    window.addEventListener('locationchange', this.#locationChange_bound);
    this.#locationChange();

    [...this.querySelectorAll('a')].forEach(element => {
      const label = element.querySelector('.mdw-label');
      if (label && !label.classList.contains('mdw-rail-hide')) {
        element.classList.add('mdw-contains-label');
      }
    });

    await util.nextAnimationFrameAsync();
    this.classList.add('mdw-enable-animation');
  }

  disconnectedCallback() {
    window.removeEventListener('locationchange', this.#locationChange_bound);
    this.#rippleElements.forEach(r => r.destroy());
  }

  async toggle() {
    if (this.classList.contains('mdw-rail-enabled')) {
      if (this.classList.contains('mdw-state-rail')) {
        this.classList.remove('mdw-state-rail');
        this.classList.add('mdw-state-drawer');
        this.classList.remove('mdw-drawer-to-rail-animation');
        this.classList.add('mdw-rail-to-drawer-animation');
      } else {
        this.classList.remove('mdw-state-drawer');
        this.classList.add('mdw-state-rail');
        this.classList.remove('mdw-rail-to-drawer-animation');
        this.classList.add('mdw-drawer-to-rail-animation');
      }

      await util.transitionendAsync(this);
      this.classList.remove('mdw-drawer-to-rail-animation');
      this.classList.remove('mdw-rail-to-drawer-animation');

    } else {
      if (this.classList.contains('mdw-show')) {
        this.classList.remove('mdw-show');
        this.classList.add('mdw-hide');
      } else {
        this.classList.remove('mdw-hide');
        this.classList.add('mdw-show');
      }
    }
  }

  #locationChange() {
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