import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./chip.css';
import Ripple from '../../core/Ripple.js';
import util from '../../core/util.js';
import checkIconSVGRaw from '../../svg-icons/check_FILL1_wght400_GRAD0_opsz20.svg';
import closeIconSVGRaw from '../../svg-icons/close_FILL1_wght400_GRAD0_opsz20.svg';



// TODO figure out if we should add properties to dynamically interact with chips

customElements.define('mdw-chip', class MDWChipElement extends HTMLElementExtended {
  useShadowRoot = true;
  useTemplate = false;

  #type;
  #value = '';
  #checked = false;
  #ripple;
  #input;
  #valueDisplay;
  #group;
  #onClick_bound = this.#onClick.bind(this);
  #onClearClick_bound = this.#onClearClick.bind(this);
  #onInput_bound = this.#onInput.bind(this);
  #onInputBlur_bound = this.#onInputBlur.bind(this);
  #onKeydown_bound = this.#onKeydown.bind(this);


  constructor() {
    super();
  }
  
  connectedCallback() {
    this.#group = this.parentElement;
    this.#type = this.#getType();
    this.addEventListener('click',  this.#onClick_bound);
  }

  afterRender() {
    if (this.#type === 'input') {
      this.#valueDisplay = this.shadowRoot.querySelector('.value-display');
      this.shadowRoot.querySelector('.clear').addEventListener('click', this.#onClearClick_bound);
      this.#input = this.shadowRoot.querySelector('input');
    }
    this.#ripple = new Ripple({
      element: this.shadowRoot.querySelector('.ripple'),
      triggerElement: this
    });
  }

  disconnectedCallback() {
    if (this.#type === 'input') {
      this.shadowRoot.querySelector('.clear').removeEventListener('click', this.#onClearClick_bound);
      this.#input.removeEventListener('input', this.#onInput_bound);
      this.#input.removeEventListener('blur', this.#onInputBlur_bound);
    }
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
    if (this.#type === 'input') {
      if (this.#value === '') this.remove();
    }
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
      ${this.#type === 'input' ? /*html*/`
        <input value="${this.value}">
        <span class="value-display">${this.value}</span>
        <div class="clear">${closeIconSVGRaw}</div>
      ` : ''}
      <span class="spinner"></span>
      <div class="ripple"></div>
      <style>${styleAsString}</style>
    `;
  }

  #onClick() {
    if (this.#type === 'filter') {
      this.checked = !this.checked;
      this.#group.dispatchEvent(new Event('change'));
    }

    if (this.#type === 'suggestion') {
      this.#group.value = this.value;
      this.#group.dispatchEvent(new Event('change'));
    }

    if (this.#type === 'input') {
      this.classList.add('mdw-edit');
      this.#onInput();
      this.#input.focus();
      this.#input.select();
      this.#input.addEventListener('input', this.#onInput_bound);
      this.#input.addEventListener('blur', this.#onInputBlur_bound);
      document.body.addEventListener('keydown', this.#onKeydown_bound);
    }

    // this.#group.dispatchEvent(new CustomEvent('change', { detail: {
    //   value: this.value,
    //   type: this.#type,
    //   action: 'figure out'
    // }}))
  }

  #onClearClick(event) {
    this.remove();
    event.stopPropagation();
    console.log(this)
    console.log(this.#group)
    this.#group.dispatchEvent(new Event('change'));
  }

  #getType() {
    const group = this.#group;
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

  #onInput() {
    const width = util.getTextWidthFromInput(this.#input);
    this.#input.style.width = `${width + 20}px`;
  }

  #onInputBlur() {
    this.#value = this.#input.value;
    this.#valueDisplay.innerText = this.#input.value;
    this.classList.remove('mdw-edit');
    this.#input.removeEventListener('input', this.#onInput_bound);
    this.#input.removeEventListener('blur', this.#onInputBlur_bound);
    document.body.removeEventListener('keydown', this.#onKeydown_bound);
    this.#group.dispatchEvent(new Event('change'));
  }

  #onKeydown(event) {
    if (event.key === 'Enter') this.#input.blur();
  }
});
