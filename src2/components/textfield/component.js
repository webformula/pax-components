import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import util from '../../core/util.js';
import errorIconSVGString from '../../svg-icons/error_FILL1_wght400_GRAD0_opsz24.svg';

// TODO mask regex
// TODO format regex

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
  #parser;
  #mask;
  #format;
  #parseInputValue = '';
  #displayValue = '';
  #inputKeydownInterceptor_bound = this.#inputKeydownInterceptor.bind(this);
  #inputPasteInterceptor_bound = this.#inputPasteInterceptor.bind(this);
  #replaceStringGroupRegex = /(\$\d)/;


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
    if (this.#parser && this.#mask) this.#setupInterceptor();

    if (this.querySelector('.mdw-outlined-border-container + mdw-icon')) {
      this.classList.add('mdw-has-leading-icon');
    }

    setTimeout(() => {
      this.classList.remove('mdw-no-animation');
    }, 100);
  }

  disconnectedCallback() {
    const input = this.querySelector('input');
    input.removeEventListener('focus', this.#setNotchWidth_bound);
    input.removeEventListener('blur', this.#unsetNotchWidth_bound);
    input.removeEventListener('invalid', this.#onInvalid_bound);
    input.removeEventListener('input', this.#onInput_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.removeEventListener('click', this.#clear_bound);

    input.removeEventListener('keydown', this.#inputKeydownInterceptor_bound);
    input.removeEventListener('paste', this.#inputPasteInterceptor_bound);
  }

  static get observedAttributes() {
    return ['disabled', 'parser', 'mask', 'format'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'disabled') this.disabled = newValue !== null;
    if (name === 'parser') this.parser = newValue;
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
    const input = this.querySelector('input');
    input.blur();
    input.toggleAttribute('disabled', !!value);
  }

  get parser() {
    if (!this.#parser) return '';
    else return this.#regexToString(this.#parser);
  }
  set parser(value) {
    if (!value) this.#parser = undefined;
    else this.#parser = this.#stringToRegex(value);
  }

  get mask() {
    return this.#mask;
  }
  set mask(value) {
    this.#mask = value;
  }

  get format() {
    return this.#format;
  }
  set format(value) {
    this.#format = value;
  }

  get displayValue() {
    return this.#displayValue;
  }

  // add regex slashes and begin and end operators (/^ $/)
  #stringToRegex(value) {
    return new RegExp(`${value.replace(/^\//, '').replace(/\/$/, '')}`);
    // return new RegExp(`^${value.replace(/^\//, '').replace(/^\^/, '').replace(/\$$/, '').replace(/\/$/, '')}$`);
  }
  // remove regex slashes and begin and end operators (/^ $/)
  #regexToString(regex) {
    return regex.replace(/^\//, '').replace(/\/$/, '');
    // return regex.replace(/^\/\^/, '').replace(/\$\/$/, '');
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

  #inputValueGetter() {
    return this.#parseInputValue;
  }

  #splitFormat() {
    const formatSplit = this.#format.split(this.#replaceStringGroupRegex)
    // for some reason splitting with regex will inset spaces. This will remove them if not already existing
    if (this.format[0] !== formatSplit[0]) formatSplit.splice(0, 1);
    if (this.format[this.format.length - 1] !== formatSplit[formatSplit.length - 1]) formatSplit.splice(-1);
    return formatSplit;
  }

  #checkIfValueIsMask(value) {
    if (!this.#mask) return false;
    if (value.length < this.#mask.length) return false;
    
    // should contains at least one of each char
    const maskUniqueCharacters = new Set(this.#mask.replace(/(\$\d)/g, ''));
    if ([...maskUniqueCharacters.values()].filter(v => !value.includes(v)).length > 0) return false;

    let matches = true;
    this.#splitFormat()
      .map(v => ({
        isMatcher: v.match(this.#replaceStringGroupRegex) !== null,
        item: v
      }))
      .forEach((v, i, arr) => {
          if (v.isMatcher) {
            if (i < arr.length - 1) {
              const index = value.indexOf(arr[i + 1].item);
              if (index) {
                v.match = value.slice(0, index);
                value = value.slice(index);
              }
            } else {
              v.match = v.item;
            }
          } else if (value.indexOf(v.item) === 0) {
            v.match = v.item;
            value = value.replace(v.item, '');
          } else {
            matches = false;
          }
        });

    return matches;
  }

  #inputValueSetter(value) {
    const match = value.match(this.#parser);

    // the mask might not be compatible with the parser
    // In the case when the input is prefilled / server filled
    //   we want to be able to show a masked value
    // this will run some checks to see if it passes
    if (!match && this.#checkIfValueIsMask(value)) {
      this.#parseInputValue = value;
      return value;
    }

    // remove any extra input or clear invalid
    value = match ? match[0] : '';

    this.#parseInputValue = value;
    let wall = false;
    // replace parse and remove non replaced items
    const formatValues = this.#splitFormat().map(v => ({
      isMatcher: v.match(this.#replaceStringGroupRegex) !== null,
      value: value.replace(this.#parser, v)
    })).filter(({ value }) => {
      if (value  === '') wall = true;
      return !wall;
    });
    let combined = formatValues.map(({ value }) => value).join('');
    // trim off static parts at end if not typed in
    if (formatValues[formatValues.length - 1]?.isMatcher === false && combined.length > value.length) {
      combined = formatValues.slice(0, -1).map(({ value }) => value).join('');
    }

    if (this.#mask) this.#displayValue = combined.replace(this.#parser, this.#mask).slice(0, combined.length);
    else this.#displayValue = combined;

    return this.#displayValue;
  }

  #navigationKeys = [
    'Backspace',
    'Delete',
    'Shift',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Tab'
  ];
  #inputKeydownInterceptor(event) {
    // TODO handle this on mozilla window.
    // Meta does not work on windows key
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey    
    if (event.metaKey) return;

    // do not do anything on enter
    if (event.key === 'Enter') return;

    if (!this.#navigationKeys.includes(event.key)) {
      this.#parseInputValue += event.key;
      event.target.value = this.#parseInputValue;
      event.preventDefault();
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      const selectionStart = event.target.selectionStart - 1 < 0 ? 0 : event.target.selectionStart - 1;
      let index = 0;
      this.#displayValue.split('').find((c, i) => {
        if (i === selectionStart) {
          if (c !== this.#parseInputValue[index]) index = -1;
          return true;
        }
        if (c === this.#parseInputValue[index]) index += 1;
        return false;
      });

      event.target.value = index === -1 ? this.#parseInputValue : `${this.#parseInputValue.slice(0, index)}${this.#parseInputValue.slice(index + 1)}`;
      event.preventDefault();
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionStart;
    }
  }

  #inputPasteInterceptor(event) {
    event.preventDefault();

    const paste = (event.clipboardData || window.clipboardData).getData('text');
    const arr = this.#parseInputValue.split('');
    const start = arr.slice(0, event.target.selectionStart).join('');
    const end = arr.slice(event.target.selectionEnd).join('');
    event.target.value = `${start}${paste}${end}`;
  }

  #setupInterceptor() {
    const that = this;
    const input = this.querySelector('input');
    const inputDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    Object.defineProperty(input, 'value', {
      get: function () {
        return that.#inputValueGetter();
      },
      set: function (value) {
        value = that.#inputValueSetter(value);
        return inputDescriptor.set.call(this, value);
      }
    });
    input.addEventListener('keydown', this.#inputKeydownInterceptor_bound);
    input.addEventListener('paste', this.#inputPasteInterceptor_bound);
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
