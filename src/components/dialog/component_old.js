import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
// TODO look into using the dialog component
// TODO align events and naming with dialog

customElements.define('mdw-dialog', class MDWDialog extends HTMLElementExtended {
  useShadowRoot = false;

  #scrollHandler_bound = util.rafThrottle(this.#scrollHandler).bind(this);

  constructor() {
    super();

    this.setAttribute('role', 'dialog');

    // aria-labelledby
    // aria-describedby
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
