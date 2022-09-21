import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';


customElements.define('mdw-top-app-bar', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #scrollTarget;
  #lastScrollTop;
  #currentDirection;
  #distanceFromDirectionChange;
  #isHiding = false;
  #scrollHandler_bound = util.rafThrottle(this.#scrollHandler).bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    this.#scrollTarget = document.querySelector('html');
    this.#lastScrollTop = this.#scrollTarget.scrollTop;
    document.addEventListener('scroll', this.#scrollHandler_bound);
    document.addEventListener('touchmove', this.#scrollHandler_bound);
  }

  hide() {
    if (this.#isHiding === true) return;
    this.#isHiding = true;

    this.classList.add('mdw-hide');
  }

  show() {
    if (this.#isHiding === false) return;
    this.#isHiding = false;

    this.classList.remove('mdw-hide');
  }

  #scrollHandler() {
    const distance = this.#scrollTarget.scrollTop - this.#lastScrollTop;
    if (distance === 0) return;

    const direction = this.#scrollTarget.scrollTop >= this.#lastScrollTop ? -1 : 1;
    if (direction !== this.#currentDirection) this.#distanceFromDirectionChange = 0;
    this.#currentDirection = direction;

    this.#distanceFromDirectionChange += distance;

    // up
    if (direction === -1 && this.#distanceFromDirectionChange > 150) this.hide();

    // down
    if (direction === 1 && this.#distanceFromDirectionChange < -150) this.show();

    this.#lastScrollTop = this.#scrollTarget.scrollTop;
    this.classList.toggle('mdw-scrolled', this.#scrollTarget.scrollTop > 0);
  }
});
