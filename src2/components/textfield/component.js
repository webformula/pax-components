import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';
import errorIconSVGString from '../../svg-icons/error_FILL1_wght400_GRAD0_opsz24.svg';


const handleReportValidityScrollIntoView = util.debounce(input => {
  // check if already on screen
  const bounds = input.getBoundingClientRect();
  if (bounds.y >= 0 && (bounds.y + bounds.height) <= window.innerHeight) return;

  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 100);


export default class MDWTextfieldElement extends HTMLElementExtended {
  #setNotchWidth_bound = this.#setNotchWidth.bind(this);
  #unsetNotchWidth_bound = this.#unsetNotchWidth.bind(this);
  #onInvalid_bound = this.#onInvalid.bind(this);
  #onInput_bound = this.#onInput.bind(this);
  #clear_bound = this.clear.bind(this);
  #originalSupportingText = this.querySelector('.mdw-supporting-text')?.innerText;
  #autocomplete;


  constructor() {
    super();

    // used in css for label position
    const input = this.querySelector('input');
    const placeholder = input.getAttribute('placeholder');
    input.setAttribute('placeholder', placeholder || ' ');
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
      
      if (input.value || input.type === 'date' || input.type === 'month' || input.type === 'time' || input.placeholder !== ' ') this.#setNotchWidth();
      input.addEventListener('focus', this.#setNotchWidth_bound);
      input.addEventListener('blur', this.#unsetNotchWidth_bound);
    }

    this.insertAdjacentHTML('beforeend', `<div class="mdw-autocomplete"></div>`);

    input.addEventListener('invalid', this.#onInvalid_bound);
    input.addEventListener('input', this.#onInput_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.addEventListener('click', this.#clear_bound);
  }

  connectedCallback() {
    if (this.querySelector('.mdw-outlined-border-container + mdw-icon')) {
      this.classList.add('mdw-has-leading-icon');
    }

    setTimeout(() => {
      this.classList.remove('mdw-no-animation');
    }, 100)
  }

  disconnectedCallback() {
    const input = this.querySelector('input');
    input.removeEventListener('focus', this.#setNotchWidth_bound);
    input.removeEventListener('blur', this.#unsetNotchWidth_bound);
    input.removeEventListener('invalid', this.#onInvalid_bound);
    input.removeEventListener('input', this.#onInput_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.removeEventListener('click', this.#clear_bound);
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'disabled') this.disabled = newValue !== null;
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
    const input = this.querySelector('input');
    input.blur();
    input.toggleAttribute('disabled', !!value);
  }

  setCustomValidity(value = '') {
    this.querySelector('input').setCustomValidity(value);
  }

  reportValidity() {
    return this.querySelector('input').reportValidity();
  }

  clear(event) {
    const input = this.querySelector('input');
    input.value = '';

    // prevent label from moving and focus
    if (event && event.target.classList.contains('mdw-input-clear')) {
      this.classList.add('mdw-raise-label');
      input.focus();
      setTimeout(() => {
        this.classList.remove('mdw-raise-label');
      });
    }
  }

  #handleDisabledInput() {
    const input = this.querySelector('input');
    if (input.hasAttribute('disabled')) {
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
    Object.defineProperty(input, 'disabled', descriptor);
  }

  // change supporting text for invalid input when user called setCustomValidity()
  #overrideInputSetCustomValidity() {
    const input = this.querySelector('input');
    const originalSetCustomValidity = input.setCustomValidity;
    input.setCustomValidity = str => {
      originalSetCustomValidity.call(input, str);
      this.#onInput();
    };


    const originalReportValidity = input.reportValidity;
    input.reportValidity = () => {
      handleReportValidityScrollIntoView(input);
      const valid = originalReportValidity.call(input);
      this.#updateInputValidity(!valid);
      return valid;
    };
  }
  
  #onInput() {
    const input = this.querySelector('input');
    this.#updateInputValidity(!input.checkValidity());
    this.#setAutocomplete();
  }

  #updateInputValidity(invalid = false) {
    const supportingTextElement = this.querySelector('.mdw-supporting-text:not(.mdw-disable-default)');
    const invalidIcon = this.querySelector('.mdw-invalid-icon');
    
    if (invalid) {
      this.classList.add('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = this.querySelector('input').validationMessage;
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
    if (this.querySelector('input').value) this.#setNotchWidth();
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
    const input = this.querySelector('input');
    if ((input.value) || input.type === 'date' || input.type === 'time' || input.type === 'month' || input.placeholder !== ' ') return;
    const label = this.querySelector('label');
    if (!label) return;
    this.querySelector('.mdw-outlined-notch').style.width = '0';
  }

  #setAutocomplete() {
    if (typeof this.#autocomplete !== 'string') return;

    const input = this.querySelector('input');
    const match = this.#autocomplete.match(new RegExp(`^${input.value}(.*)`, 'i'));
    const value = !match || match[0] === match[1] ? '' : match[1];

    this.querySelector('.mdw-autocomplete').innerText = value;
    const offset = util.getTextLengthFromInput(this.querySelector('input'));
    this.querySelector('.mdw-autocomplete').style.left = `${offset + 16}px`;
  }
}


customElements.define('mdw-textfield', MDWTextfieldElement);
