import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./chip.css';
import Ripple from '../../core/Ripple.js';
import checkIconSVGRaw from '../../svg-icons/check_FILL1_wght400_GRAD0_opsz20.svg';
import closeIconSVGRaw from '../../svg-icons/close_FILL1_wght400_GRAD0_opsz20.svg';



// TODO figure out if we should add properties to dynamically interact with chips

customElements.define('mdw-chip', class MDWChipElement extends HTMLElementExtended {
  useShadowRoot = true;
  useTemplate = false;

  #type = this.#getType();
  #value = '';
  #checked = false;
  #ripple;
  #onClick_bound = this.#onClick.bind(this);


  constructor() {
    super();
  }
  
  connectedCallback() {
    this.addEventListener('click',  this.#onClick_bound);
  }

  afterRender() {
    this.#ripple = new Ripple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    this.#ripple.destroy();
  }

  static get observedAttributes() {
    return ['value', 'checked'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'checked') this.checked = newValue !== null;
    else this[name] = newValue;
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }

  get checked() {
    return this.#checked;
  }
  set checked(value) {
    this.#checked = !!value;
    this.toggleAttribute('checked', this.#checked);
  }

  template() {
    return /*html*/`
      ${this.#type === 'filter' ? `<div class="check">${checkIconSVGRaw}</div>` : ''}
      <slot></slot>
      ${this.#type === 'input' ? `<div class="clear">${closeIconSVGRaw}</div>` : ''}
      <span class="spinner"></span>
      <div class="ripple"></div>
      <style>${styleAsString}</style>
    `;
  }

  #onClick() {
    if (this.#type === 'filter') {
      this.checked = !this.checked;
    }

    if (this.#type === 'filter') {
      this.parentElement.dispatchEvent(new Event('change'));
    }

    // this.parentElement.dispatchEvent(new CustomEvent('change', { detail: {
    //   value: this.value,
    //   type: this.#type,
    //   action: 'figure out'
    // }}))
  }

  #getType() {
    const group = this.parentElement;
    if (group.classList.contains('mdw-input')) {
      this.classList.add('mdw-input');
      return 'input';
    }
    if (group.classList.contains('mdw-filter')) {
      this.classList.add('mdw-filter');
      return 'filter';
    }
    if (group.classList.contains('mdw-suggestion')) {
      this.classList.add('mdw-suggestion');
      return 'suggestion';
    }
    this.classList.add('mdw-assist');
    return 'assist';
  }
});
