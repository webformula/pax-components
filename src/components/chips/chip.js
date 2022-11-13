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
    this.#type = this.#getType();

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

  #onclick() {
    this.blur();

    if (this.#type === 'filter') {
      this.toggleAttribute('checked');
      this.parentNode.dispatchEvent(new Event('change'));
    }
  }

  #getType() {
    const parentClassList = this.parentNode.classList;
    if (parentClassList.contains('mdw-type-filter')) return 'filter';
    if (parentClassList.contains('mdw-type-input')) return 'input';
    if (parentClassList.contains('mdw-type-suggestion')) return 'suggestion';
    return 'assist';
  }
});
