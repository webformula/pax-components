import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';

customElements.define('mdw-top-app-bar', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #scrollHandler_bound = util.rafThrottle(this.#scrollHandler).bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    setTimeout(() => {
      const scrollTarget = document.querySelector('page-content') || document.querySelector('mdw-page-content');
      if (scrollTarget) scrollTarget.addEventListener('scroll', this.#scrollHandler_bound);
    }, 0);
  }

  #scrollHandler(event) {
    this.classList.toggle('mdw-scrolled', event.target.scrollTop > 0);
  }
});
