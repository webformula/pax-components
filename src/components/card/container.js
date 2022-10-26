import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './container.css';

// TODO dynamic width
// TODO dynamic columns. switch from desktop to mobile on grid


customElements.define('mdw-card-container', class MDWCardContainer extends HTMLElementExtended {
  useShadowRoot = false;

  #isList = false;
  #cards = [];

  // used to reflow on list changes
  #observer;

  constructor() {
    super();

    this.#observer = new MutationObserver(() => {
      this.#observer.disconnect();
      this.#layout();
      this.#observer.observe(this, { childList: true });
    });
    this.#isList = this.classList.contains('mdw-list') || (!this.classList.contains('mdw-grid') && util.isMobile);

    if (this.#isList) {
      [...this.querySelectorAll(':scope > mdw-card')].forEach(e => e.classList.add('mdw-card-list-item'));
    }

    this.#layout();

    // reflow test
    // setTimeout(() => {
    //   this.childNodes[1].remove();
    // }, 1000);

    this.#observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this.#observer.disconnect();
    this.#observer = undefined;
  }

  #layout() {
    if (this.#isList) this.#layoutList();
    else this.#layoutGrid();
  }

  #layoutList() {

  }

  #layoutGrid() {
    if (this.#isList) return;

    // reset height style for reflow
    if (this.#cards.length) {
      this.#cards.forEach(({ element, styleHeight }) => {
        element.style.height = styleHeight || '';
      });
    }

    this.#cards = [...this.querySelectorAll(':scope > mdw-card')].map(element => {
      element.classList.add('mdw-card-grid-cell');
      return {
        height: element.offsetHeight,
        styleHeight: element.style.height,
        element
      };
    });
    if (this.#cards.length === 0) return;

    this.#cards.sort((a, b) => a.height - b.height);
    const baseHeight = this.#cards[0].height;

    this.#cards.forEach(({ element, height }) => {
      const span = Math.ceil(height / baseHeight);
      if (baseHeight > 1) {
        element.style.gridRowEnd = `span ${span}`;
        element.style.height = 'unset';
      }
    });
  }
});
