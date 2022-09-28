import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';


customElements.define('mdw-top-app-bar', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #isHiding = false;
  #scrollTrack_bound = this.#scrollTrack.bind(this);

  constructor() {
    super();
  }

  connectedCallback() {
    util.trackPageScroll(this.#scrollTrack_bound);
  }

  disconnectedCallback() {
    util.untrackPageScroll(this.#scrollTrack_bound);
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

  // TODO hide/show at scroll speed
  #scrollTrack({ isScrolled, direction, distanceFromDirectionChange }) {
    // up
    if (direction === -1 && distanceFromDirectionChange > 150) this.hide();

    // down
    if (direction === 1 && distanceFromDirectionChange < -150) this.show();

    this.classList.toggle('mdw-scrolled', isScrolled);
  }
});
