import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';
import styleAsString from '!!css-loader!./component.css?raw';

customElements.define('mdw-fab', class MDWFab extends HTMLElementExtended {
  useShadowRoot = true;

  #ripple;
  #hasLabel = false;
  #autoHideLabel = this.classList.contains('mdw-auto-hide-label');
  #scrollTarget = document.querySelector('page-content') || document.querySelector('mdw-page-content');
  #scrollHandler_bound = util.rafThrottle(this.#scrollHandler).bind(this);
  #lastScrollPosition = this.#scrollTarget.scrollTop;
  

  constructor() {
    super();

    this.tabIndex = 0;
    this.setAttribute('role', 'button');

    const icon = this.querySelector('mdw-icon');
    this.#hasLabel = icon && icon.nextElementSibling;

    this.classList.add('mdw-no-animation');
    if (this.#hasLabel) this.classList.add('mdw-has-label');
  }

  static get observedAttributes() {
    return ['class'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'class') this.#handleLabelHide();
  }

  connectedCallback() {
    this.render();

    setTimeout(() => {
      this.#handleLabelHide();

      this.#ripple = new Ripple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });

      if (this.#autoHideLabel && this.#scrollTarget) this.#scrollTarget.addEventListener('scroll', this.#scrollHandler_bound);

      setTimeout(() => {
        this.classList.remove('mdw-no-animation');
      }, 0);
    }, 0);
  }

  disconnectedCallback() {
    if (this.#autoHideLabel && this.#scrollTarget) this.#scrollTarget.removeEventListener('scroll', this.#scrollHandler_bound);
    this.#ripple.destroy();
  }

  #handleLabelHide() {
    if (!this.#hasLabel) return;
    if (!this.rendered) return;

    if (this.classList.contains('mdw-hide-label')) this.style.maxWidth = '';
    else this.style.maxWidth = `${this.offsetWidth + this.scrollWidth}px`;
  }

  // TODO work out if there should be delays or minimum distances
  #scrollHandler() {
    const scrollTop = this.#scrollTarget.scrollTop;

    // down
    if (scrollTop < this.#lastScrollPosition) {
      if (this.classList.contains('mdw-hide-label')) this.classList.remove('mdw-hide-label');
    // up
    } else {
      if (!this.classList.contains('mdw-hide-label')) this.classList.add('mdw-hide-label');
    }

    this.#lastScrollPosition = scrollTop;
  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple"></div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});
