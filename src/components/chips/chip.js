import HTMLElementExtended from '../HTMLElementExtended.js';
import './chip.css';
import util from '../../core/util.js';
import Panel from '../../core/panel.js';
import Ripple from '../../core/Ripple.js';


customElements.define('mdw-chip', class MDWChip extends HTMLElementExtended {
  useShadowRoot = false;

  #type;
  #value = '';
  #input;
  #panel;
  #ripple;
  #onclick_bound = this.#onclick.bind(this);
  #onMenuClick_bound = this.#onMenuClick.bind(this);
  #onInputBlur_bound = this.#onInputBlur.bind(this);

  constructor() {
    super();

    this.tabIndex = 0;
    this.#type = this.parentNode.type;

    // TODO verify this will not cause problems not being in connected callback
    util.wrapTextInLabel(this);
    this.#value = this.querySelector('.mdw-label').innerText.trim();
    this.#setupInput();

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

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
    if (this.#input) this.#input.value = value;
    const label = this.querySelector('.mdw-label');
    if (label) label.innerHTML = value;
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
    } else if (this.#type === 'input') {
      if (event.target.classList.contains('mdw-clear')) {
        const parent = this.parentNode;
        this.remove();
        parent.dispatchEvent(new Event('change'));
      } else {
        this.#input.value = this.#value;
        this.classList.add('mdw-edit');
        this.#input.addEventListener('blur', this.#onInputBlur_bound);
      }
    } else {
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

  async #setupInput() {
    if (this.#type !== 'input') return;

    this.insertAdjacentHTML('beforeend', `<input />`);
    await util.nextAnimationFrameAsync();
    this.#input = this.querySelector('input');
  }

  #onInputBlur() {
    this.value = this.#input.value;
    this.#input.removeEventListener('blur', this.#onInputBlur_bound);
    this.classList.remove('mdw-edit');
  }
});
