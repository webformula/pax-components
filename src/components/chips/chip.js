import HTMLElementExtended from '../HTMLElementExtended.js';
import './chip.css';
import util from '../../core/util.js';
import Panel from '../../core/panel.js';
import Ripple from '../../core/Ripple.js';

// TODO add specific check and clear icons
// TODO fix menu. temp in place to get functionality

customElements.define('mdw-chip', class MDWChip extends HTMLElementExtended {
  useShadowRoot = false;

  #type;
  #panel;
  #ripple;
  #onclick_bound = this.#onclick.bind(this);
  #onMenuClick_bound = this.#onMenuClick.bind(this);

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
    if (this.#ripple) {
      this.#ripple.destroy();
      this.#ripple = undefined;
    }
  }

  #onclick(event) {
    this.blur();

    if (this.#type === 'filter') {
      if (event.target.classList.contains('mdw-clear')) {
        this.remove();
      } else {
        this.toggleAttribute('checked');
        this.parentNode.dispatchEvent(new Event('change'));
      }
    }

    if (this.#type === 'input') {
      if (event.target.classList.contains('mdw-clear')) {
        const parent = this.parentNode;
        this.remove();
        parent.dispatchEvent(new Event('change'));
      } else {
        // edit
        const menuTemplate = this.parentNode.menuTemplate;
        if (menuTemplate) {
          if (!this.#panel) {
            this.#panel = new Panel();
            this.#panel.template = menuTemplate;
            this.#panel.backdrop = false;
            this.#panel.clickOutsideToClose = true;
            this.#panel.targetElement = this;
            this.#panel.onShow = () => this.#panel.element.addEventListener('click', this.#onMenuClick_bound);
            this.#panel.onHide = () => this.#panel.element.removeEventListener('click', this.#onMenuClick_bound);
          }

          this.#panel.show();
        }
      }
    }
  }

  #onMenuClick(event) {
    const action = event.target.getAttribute('mdw-action');
    
    const parent = this.parentNode;

    if (action === 'remove') {
      this.remove();
      parent.dispatchEvent(new Event('change'));
    }

    parent.dispatchEvent(new CustomEvent('mdw-chip-action', {
      detail: {
        value: this.value,
        action
      }
    }));

    this.#panel.hide();
  }
});
