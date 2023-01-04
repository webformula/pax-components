import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import device from '../../core/device.js';
import './group.css';

// TODO dynamic width
// TODO dynamic columns. switch from desktop to mobile on grid


customElements.define('mdw-card-group', class MDWCardGroupElement extends HTMLElementExtended {
  #cards = [];
  #autoSpanRow = this.classList.contains('mdw-auto-span-row');
  #observer = new MutationObserver(this.#onMutation.bind(this));


  constructor() {
    super();

    this.#layout();
    this.#observer.observe(this, { childList: true });
  }

  connectedCallback() {
    // this.classList.remove('mdw-no-animation');
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }

  get #isGrid() {
    return this.classList.contains('mdw-grid') || (!this.classList.contains('mdw-grid') && !device.isMobile);
  }

  get autoSpanRow() {
    return this.#autoSpanRow();
  }
  set autoSpanRow(value) {
    this.#autoSpanRow = !!value;
    this.#layout();
  }

  connectedCallback() {
    setTimeout(() => {
      this.#layout();
    })
  }

  #layout() {
    // reset height style for reflow
    this.#cards.forEach(({ element, styleHeight }) => {
      if (element.classList.contains('mdw-show')) element.style.height = '';
      else element.style.height = styleHeight || '';
    });


    this.#cards = [...this.querySelectorAll('mdw-card')].map(element => {
      return {
        height: element.offsetHeight,
        styleHeight: element.style.height,
        element
      };
    });
    
    if (this.#cards.length === 0) return;

    if (this.#isGrid) this.#layoutGrid();
    else this.#layoutList();
  }

  #layoutGrid() {
    this.classList.add('mdw-grid');
    this.classList.remove('mdw-list');

    this.#cards.sort((a, b) => a.height - b.height);
    const baseHeight = this.#cards[0].height;

    this.#cards.forEach(({ element, height }) => {
      if (element.classList.contains('mdw-show')) return;

      const span = Math.ceil(height / baseHeight);
      if (baseHeight > 1) {
        element.style.gridRowEnd = `span ${span}`;
        if (this.#autoSpanRow) element.style.height = `${baseHeight * span}px`;
        else element.style.height = `${height}px`;
      }
    });
  }

  #layoutList() {
    this.classList.remove('mdw-grid');
    this.#cards.forEach(({ element }) => {
      element.style.height = 'unset';
    });
  }

  #onMutation() {
    this.#observer.disconnect();
    this.#layout();
    this.#observer.observe(this, { childList: true });
  }
});
