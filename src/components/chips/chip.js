import HTMLElementExtended from '../HTMLElementExtended.js';
import './chip.css';
import util from '../../core/util.js';
import Ripple from '../../core/Ripple.js';

// TODO add specific check and clear icons

customElements.define('mdw-chip', class MDWChip extends HTMLElementExtended {
  useShadowRoot = false;

  #type;
  #ripple;
  #onclick_bound = this.#onclick.bind(this);

  constructor() {
    super();

    this.tabIndex = 0;
    this.#type = this.parentNode.type;

    // TODO verify this will not cause problems not being in connected callback
    util.wrapTextInLabel(this);

    const rippleElement = this.querySelector('.mdw-ripple');
    if (rippleElement) {
      this.#ripple = this.#ripple = new Ripple({
        element: rippleElement,
        triggerElement: this
      });
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.#onclick_bound);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onclick_bound);
    if (this.#ripple) this.#ripple.destroy();
  }

  #onclick(event) {
    this.blur();

    if (this.#type === 'filter') {
      this.toggleAttribute('checked');
      this.parentNode.dispatchEvent(new Event('change'));
    }

    if (this.#type === 'input') {
      if (event.target.classList.contains('mdw-clear')) {
        const parent = this.parentNode;
        this.remove();
        parent.dispatchEvent(new Event('change'));
      } else {
        // edit
      }
    }
  }
});
