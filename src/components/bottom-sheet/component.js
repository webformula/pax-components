import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import './component.css';

customElements.define('mdw-bottom-sheet', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #currentTop;
  #minimizeTopLimit;
  #drag = new Drag(this);
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragStart_bound = this.#onDragStart.bind(this);

  constructor() {
    super();

    this.insertAdjacentHTML('afterbegin', '<div class="mdw-drag-handle"></div>');

    this.#drag.onDrag(this.#onDrag_bound);
    this.#drag.onStart(this.#onDragStart_bound);
  }

  connectedCallback() {
    this.#drag.enable();
  }

  #onDragStart() {
    this.#minimizeTopLimit = window.innerHeight - 56;
    this.#currentTop = parseInt(getComputedStyle(this).getPropertyValue('top').replace('px', ''));
  }

  #onDrag({ distance }) {
    let top = this.#currentTop + distance.y;
    if (top >= this.#minimizeTopLimit) top = this.#minimizeTopLimit;
    if (top <= 0) top = 0;
    this.style.top = `${top}px`;
  }
});
