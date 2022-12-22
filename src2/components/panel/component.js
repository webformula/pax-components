import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';


customElements.define('mdw-panel', class MDWPanel extends HTMLElementExtended {
  #overflowScrollRegex = /(auto|scroll)/;
  #validAnimations = ['translateY', 'scale'];
  #animation = this.getAttribute('animation') || 'translateY';
  #backdrop = false;
  #clickOutsideClose = true;
  #onClickOutside_bound = this.#onClickOutside.bind(this);
  #clickOutsideCloseIgnoreElements = [];
  #target = null;
  #offsetY = 0;
  #offsetX = 0;
  #targetScrollContainer;
  #onTargetScroll_bound = util.rafThrottle(this.#onTargetScroll.bind(this));
  
  constructor() {
    super();

    this.classList.add('mdw-no-animation');
  }

  disconnectedCallback() {
    util.removeBackdrop();
    document.body.removeEventListener('click', this.#onClickOutside_bound);
    if (this.#targetScrollContainer) this.#targetScrollContainer.removeEventListener('scroll', this.#onTargetScroll_bound);
  }

  static get observedAttributes() {
    return ['target'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
  }

  get open() {
    return this.hasAttribute('open');
  }

  get animation() {
    return this.#animation;
  }
  set animation(value) {
    if (this.#validAnimations.contains(value)) throw Error(`not valid values. Must be one of these: ${this.#validAnimations.join(',')}`);
    this.#animation = value;
  }

  get backdrop() {
    return this.#backdrop;
  }
  set backdrop(value) {
    this.#backdrop = value;
  }

  get clickOutsideClose() {
    return this.#clickOutsideClose;
  }
  set clickOutsideClose(value) {
    this.#clickOutsideClose = value;
  }

  get target() {
    return this.#target;
  }
  set target(value) {
    if (value && value.nodeName) this.#target = value;
    else this.#target = document.querySelector(value);
    this.classList.toggle('mdw-target', !!this.#target);
  }

  addClickOutsideCloseIgnore(element) {
    this.#clickOutsideCloseIgnoreElements.push(element);
  }


  show(backdrop = this.#backdrop) {
    this.classList.remove('mdw-no-animation');
    if (this.open === true) return;

    if (this.#animation === 'scale') this.classList.add('mdw-animation-scale');
    if (backdrop) util.addBackdrop(this);
    if (this.#target) this.#setupTarget();
    this.setAttribute('open', '');
    this.dispatchEvent(new Event('open'));
    if (this.#clickOutsideClose === true) {
      setTimeout(() => {
        document.body.addEventListener('click', this.#onClickOutside_bound);
      }, 100);
    }

    if (this.#targetScrollContainer) this.#targetScrollContainer.addEventListener('scroll', this.#onTargetScroll_bound);
  }

  close() {
    if (this.open !== true) return;

    if (this.#clickOutsideClose === true)  document.body.removeEventListener('click', this.#onClickOutside_bound);
    if (this.#targetScrollContainer) this.#targetScrollContainer.removeEventListener('scroll', this.#onTargetScroll_bound);

    this.removeAttribute('open');
    util.removeBackdrop();
    this.dispatchEvent(new Event('close'));
  }

  #onClickOutside(event) {
    if (this.contains(event.target)) return;
    const isIgnoreElement = this.#clickOutsideCloseIgnoreElements.find(v => v.contains(event.target));
    if (isIgnoreElement) return;
    this.close();
  }

  #setupTarget() {
    this.#setTargetPosition();
    this.#targetScrollContainer = this.#getScrollContainerForTarget();
  }

  #setTargetPosition() {
    const bounds = this.#target.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    // initial position is top left panel aligned with bottom left target
    const panelBottom = bounds.bottom + this.offsetHeight;
    const panelRight = bounds.left + this.offsetWidth;

    // Panel offscreen adjustment
    if (panelBottom <= clientHeight) {
      this.style.top = `${bounds.bottom + this.#offsetY}px`;
    } else {
      this.style.top = `${bounds.top - this.offsetHeight}px`;
    }

    if (panelRight <= clientWidth) {
      this.style.left = `${bounds.left + this.#offsetX}px`;
    } else {
      this.style.left = `${bounds.right - this.offsetWidth}px`;
    }
  }

  #onTargetScroll() {
    this.#setTargetPosition();
  }

  #getScrollContainerForTarget() {
    let parentNode = this.#target.parentNode;
    while (parentNode !== null) {
      const style = getComputedStyle(parentNode);
      if (this.#overflowScrollRegex.test(style.overflow + style.overflowY)) return parentNode;
      parentNode = parentNode.parentNode;
      if (parentNode === document.body) return document.body;
    }
  }
});
