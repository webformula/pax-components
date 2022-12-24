import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';
import styleAsString from '!!raw-loader!./component.css';

customElements.define('mdw-fab', class MDWFabElement extends HTMLElementExtended {
  useShadowRoot = true;

  #ripple;
  #autoHideLabel = this.classList.contains('mdw-auto-hide-label');
  #scrollTarget = document.querySelector('page-content') || document.body; // TODO check is page-content needed
  #scrollHandler_bound = util.rafThrottle(this.#scrollHandler).bind(this);


  constructor() {
    super();

    if (!!util.getTextFromNode(this)) this.classList.add('mdw-has-label');
    this.#handleTrailingIcon();
  }

  connectedCallback() {
    this.tabIndex = 0;
    this.setAttribute('role', 'button');

    if (this.#autoHideLabel && this.#scrollTarget) util.trackPageScroll(this.#scrollHandler_bound);
  }

  afterRender() {
    this.#ripple = new Ripple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    if (this.#autoHideLabel && this.#scrollTarget) util.untrackPageScroll(this.#scrollHandler_bound);
    this.#ripple.destroy();
  }

  template() {
    return /* html */`
      <slot></slot>
      <div class="ripple"></div>
      <style>${styleAsString}</style>
    `;
  }

  // auto add class .mdw-trailing to icon so t will space correctly
  #handleTrailingIcon() {
    const icon = this.querySelector('mdw-icon');
    if (!icon) return;

    let previous = icon.previousSibling;
    while (previous) {
      if (previous.nodeType === 3 && previous.textContent.trim() !== '') break;
      previous = previous.previousSibling;
    }

    if (previous) icon.classList.add('mdw-trailing');
  }

  #scrollHandler({ distanceFromDirectionChange }) {
    if (distanceFromDirectionChange < -100) {
      this.classList.remove('mdw-hide-label');
      this.style.maxWidth = `${this.offsetWidth + this.scrollWidth}px`;
    } else if (distanceFromDirectionChange > 100) {
      this.classList.add('mdw-hide-label');
      this.style.maxWidth = '';
    }
  }
});
