import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import './tabs-content.js';
import util from '../../core/util.js';
import Ripple from '../../core/Ripple.js';

// TODO initial selected

customElements.define('mdw-tabs', class MDWTabs extends HTMLElementExtended {
  useShadowRoot = false;

  #tabCLick_bound = this.#tabCLick.bind(this);
  #rippleElements = [];
  #value = '1';


  constructor() {
    super();
  }

  async connectedCallback() {
    this.insertAdjacentHTML('beforeend', `<div class="mdw-underline"></div>`);
    this.#wrapLabels();

    this.#rippleElements = [...this.querySelectorAll('.mdw-ripple')].map(element => new Ripple({
      element: element,
      triggerElement: element.parentNode
    }));

    await util.nextAnimationFrameAsync();
    this.value = 1;

    this.addEventListener('click', this.#tabCLick_bound);
  }

  disconnectedCallback() {
    this.#rippleElements.forEach(r => r.destroy());
    this.removeEventListener('click', this.#tabCLick_bound);
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    const next = this.querySelectorAll('.mdw-tab')[value-1];
    if (!next) throw Error(`No mdw-tab found at index: ${value}`);

    // internal value set in here
    this.#setSelected(next);
  }

  // If the user doe not wrap text in <div class="mdw-label"></div>
  #wrapLabels() {
    [...this.querySelectorAll('.mdw-tab')].forEach(element => {
      element.tabIndex = 0;
      if (element.querySelector('.mdw-label')) return;

      const textNodes = [...element.childNodes].filter(node => node.nodeType === 3)
      const text = textNodes
        .map(node => node.textContent)
        .join('')
        .trim();

      if (text !== '') {
        textNodes.forEach(node => node.remove());
        const label = document.createElement('div');
        label.classList.add('mdw-label');
        label.innerHTML = text;
        element.appendChild(label);
      }
    });
  }

  #positionUnderline() {
    const element = this.querySelector('.mdw-underline');
    const selected = this.querySelector('.mdw-tab[selected]');
    const containerBounds = this.getBoundingClientRect();
    const tabBoundsElement = selected.querySelector('.mdw-label') || selected.querySelector('mdw-icon')

    if (!tabBoundsElement) {
      console.error('mdw-tab must contain a label or icon');
      return;
    }

    const tabBounds = tabBoundsElement.getBoundingClientRect();

    const left = tabBounds.x - containerBounds.x;
    const right = tabBounds.width;
    const distance = parseInt(Math.abs(left - parseInt(getComputedStyle(element).left.replace('px', ''))));
    
    // base time + 25% of distance
    element.style.transitionDuration = `${120 + distance * 0.25}ms`;
    element.style.left = `${left}px`;
    element.style.width = `${right}px`;
  }

  #tabCLick(event) {
    this.#setSelected(event.target);
  }

  #setSelected(element) {
    const selected = this.querySelector('.mdw-tab[selected]');
    if (selected && element === selected) return;

    if (selected) selected.removeAttribute('selected');
    element.setAttribute('selected', '');

    this.#positionUnderline();

    const index = [...this.querySelectorAll('.mdw-tab')].indexOf(element);
    this.#value = `${index + 1}`
    this.dispatchEvent(new CustomEvent('change', { detail: this.#value }))
  }
});
