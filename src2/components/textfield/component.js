import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';
import errorIconSVGString from '../../svg-icons/error_FILL1_wght400_GRAD0_opsz24.svg';
import Formatter from './Formatter.js';

// TODO mask regex
// TODO format regex

const handleReportValidityScrollIntoView = util.debounce(input => {
  // check if already on screen
  const bounds = input.getBoundingClientRect();
  if (bounds.y >= 0 && (bounds.y + bounds.height) <= window.innerHeight) return;

  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 100);


export default class MDWTextfieldElement extends HTMLElementExtended {
  #input;
  #setNotchWidth_bound = this.#setNotchWidth.bind(this);
  #unsetNotchWidth_bound = this.#unsetNotchWidth.bind(this);
  #onInvalid_bound = this.#onInvalid.bind(this);
  #onInput_bound = this.#onInput.bind(this);
  #clear_bound = this.clear.bind(this);
  #originalSupportingText = this.querySelector('.mdw-supporting-text')?.innerText;
  #autocomplete;
  #formatter = new Formatter(this);


  constructor() {
    super();

    // used in css for label position
    this.#input = this.querySelector('input');
    const placeholder = this.#input.getAttribute('placeholder');
    this.#input.setAttribute('placeholder', placeholder || ' ');
    this.classList.add('mdw-no-animation');

    this.#handleDisabledInput();
    this.#overrideInputSetCustomValidity();

    if (this.classList.contains('mdw-outlined')) {
      this.insertAdjacentHTML('afterbegin', `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `);
      
      if (this.#input.value || this.#input.type === 'date' || this.#input.type === 'month' || this.#input.type === 'time' || this.#input.placeholder !== ' ') this.#setNotchWidth();
      this.#input.addEventListener('focus', this.#setNotchWidth_bound);
      this.#input.addEventListener('blur', this.#unsetNotchWidth_bound);
    }

    this.insertAdjacentHTML('beforeend', `<div class="mdw-autocomplete"></div>`);

    this.#input.addEventListener('invalid', this.#onInvalid_bound);
    this.#input.addEventListener('input', this.#onInput_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.addEventListener('click', this.#clear_bound);
  }

  connectedCallback() {
    const inputPattern = this.#input.pattern;
    if (inputPattern) this.pattern = inputPattern;
    if (this.pattern) this.#formatter.enable();

    if (this.querySelector('.mdw-outlined-border-container + mdw-icon')) {
      this.classList.add('mdw-has-leading-icon');
    }

    setTimeout(() => {
      this.classList.remove('mdw-no-animation');
    }, 100);
  }

  disconnectedCallback() {
    this.#input.removeEventListener('focus', this.#setNotchWidth_bound);
    this.#input.removeEventListener('blur', this.#unsetNotchWidth_bound);
    this.#input.removeEventListener('invalid', this.#onInvalid_bound);
    this.#input.removeEventListener('input', this.#onInput_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.removeEventListener('click', this.#clear_bound);

    this.#formatter.disable();
  }

  static get observedAttributes() {
    return ['disabled', 'pattern',  'mask', 'format'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'disabled') this.disabled = newValue !== null;
    if (name === 'pattern') this.pattern = newValue;
    if (name === 'mask') this.mask = newValue;
    if (name === 'format') this.format = newValue;
  }

  get autocomplete() {
    return this.#autocomplete;
  }
  set autocomplete(value) {
    this.#autocomplete = value;
    this.#setAutocomplete();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    this.toggleAttribute('disabled', !!value);
    this.#input.blur();
    this.#input.toggleAttribute('disabled', !!value);
  }

  get pattern() {
    return this.#formatter.pattern;
  }
  set pattern(value) {
    this.#formatter.pattern = value;
  }

  get mask() {
    return this.#formatter.mask;
  }
  set mask(value) {
    this.#formatter.mask = value;
  }

  get format() {
    return this.#formatter.format;
  }
  set format(value) {
    this.#formatter.format = value;
  }

  get value() {
    return this.#input.value;
  }

  get formattedValue() {
    return this.#formatter.formattedValue;
  }

  get maskedValue() {
    return this.#formatter.maskedValue;
  }

  setCustomValidity(value = '') {
    this.#input.setCustomValidity(value);
  }

  reportValidity() {
    return this.#input.reportValidity();
  }

  clear(event) {
    this.#input.value = '';

    // prevent label from moving and focus
    if (event && event.target.classList.contains('mdw-input-clear')) {
      this.classList.add('mdw-raise-label');
      this.#input.focus();
      setTimeout(() => {
        this.classList.remove('mdw-raise-label');
      });
    }
  }

  #handleDisabledInput() {
    if (this.#input.hasAttribute('disabled')) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }

    const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'disabled');
    const originalSet = descriptor.set;
    const that = this;
    descriptor.set = function (value) {
      that.toggleAttribute('disabled', !!value);
      originalSet.apply(this, arguments);
    };
    Object.defineProperty(this.#input, 'disabled', descriptor);
  }

  // change supporting text for invalid input when user called setCustomValidity()
  #overrideInputSetCustomValidity() {
    const originalSetCustomValidity = this.#input.setCustomValidity;
    this.#input.setCustomValidity = str => {
      originalSetCustomValidity.call(this.#input, str);
      this.#onInput();
    };


    const originalReportValidity = this.#input.reportValidity;
    this.#input.reportValidity = () => {
      handleReportValidityScrollIntoView(this.#input);
      const valid = originalReportValidity.call(this.#input);
      this.#updateInputValidity(!valid);
      return valid;
    };
  }
  
  #onInput() {
    this.#updateInputValidity(!this.#input.checkValidity());
    this.#setAutocomplete();
  }

  #updateInputValidity(invalid = false) {
    const supportingTextElement = this.querySelector('.mdw-supporting-text:not(.mdw-disable-default)');
    const invalidIcon = this.querySelector('.mdw-invalid-icon');
    
    if (invalid) {
      this.classList.add('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = this.#input.validationMessage;
      if (!invalidIcon) this.insertAdjacentHTML('beforeend', `<div class="mdw-invalid-icon">${errorIconSVGString}</div>`);
    } else {
      this.classList.remove('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = this.#originalSupportingText;
      if (invalidIcon) invalidIcon.remove();
    }
  }

  #onInvalid(event) {
    event.preventDefault();
  }

  updateNotch() {
    if (this.#input.value) this.#setNotchWidth();
    else this.#unsetNotchWidth();
  }

  #setNotchWidth() {
    const label = this.querySelector('label');
    if (!label) return;

    const notch = this.querySelector('.mdw-outlined-notch');
    const computedStyle = getComputedStyle(notch);
    // already open
    if (computedStyle.width !== '0px') return;

    this.querySelector('.mdw-outlined-notch').style.width = `${label.offsetWidth * 0.9}px`;
    // font size changes and we need to recalculate width because of animation
    setTimeout(() => {
      this.querySelector('.mdw-outlined-notch').style.width = `${label.offsetWidth + 4}px`;
    }, 165)
  }

  #unsetNotchWidth() {
    if ((this.#input.value) || this.#input.type === 'date' || this.#input.type === 'time' || this.#input.type === 'month' || this.#input.placeholder !== ' ') return;
    const label = this.querySelector('label');
    if (!label) return;
    this.querySelector('.mdw-outlined-notch').style.width = '0';
  }

  #setAutocomplete() {
    if (typeof this.#autocomplete !== 'string') return;

    const match = this.#autocomplete.match(new RegExp(`^${this.#input.value}(.*)`, 'i'));
    const value = !match || match[0] === match[1] ? '' : match[1];

    this.querySelector('.mdw-autocomplete').innerText = value;
    const offset = util.getTextLengthFromInput(this.#input);
    this.querySelector('.mdw-autocomplete').style.left = `${offset + 16}px`;
  }
}


customElements.define('mdw-textfield', MDWTextfieldElement);
