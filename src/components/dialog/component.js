import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';

customElements.define('mdw-dialog', class MDWDialog extends HTMLElementExtended {
  useShadowRoot = false;

  #scrollHandler_bound = util.rafThrottle(this.#scrollHandler).bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#isFullscreen()) {
      setTimeout(() => {
        const scrollTarget = this.querySelector(':scope > .mdw-content');
        if (scrollTarget) scrollTarget.addEventListener('scroll', this.#scrollHandler_bound);
      }, 0);
    }
  }

  #isFullscreen() {
    if (this.classList.contains('mdw-fullscreen')) return true;
    if (this?.parentNode?.parentNode?.classList.contains('mdw-fullscreen')) return true;
    return false;
  }

  #scrollHandler(event) {
    this.classList.toggle('mdw-scrolled', event.target.scrollTop > 0);
  }
});
