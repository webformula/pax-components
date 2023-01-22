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
  #onBlur_bound = this.#onBlur.bind(this);
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
    input.addEventListener('blur', this.#onBlur_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.addEventListener('click', this.#clear_bound);
  }

  connectedCallback() {
    const inputPattern = this.querySelector('input').pattern;
    if (inputPattern) this.pattern = inputPattern;
    this.#setupPattern();

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
    input.removeEventListener('blur', this.#onBlur_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.removeEventListener('click', this.#clear_bound);

    input.removeEventListener('keydown', this.#patternInputKeydown_bound);
    input.removeEventListener('paste', this.#patternInputPaste_bound);
  }

  static get observedAttributes() {
    return ['disabled', 'pattern',  'mask', 'format'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'disabled') this.disabled = newValue !== null;
    if (name === 'parser') this.parser = newValue;
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
    const input = this.querySelector('input');
    input.blur();
    input.toggleAttribute('disabled', !!value);
  }

  get pattern() {
    return this.#pattern;
  }
  set pattern(value) {
    this.#pattern = value;
    this.#setPattern(value);
  }

  get mask() {
    return this.#mask;
  }
  set mask(value) {
    this.#mask = value;
    this.#buildMask(value);
  }

  get format() {
    return this.#format;
  }
  set format(value) {
    this.#format = value;
    this.#buildFormat(value);
  }

  get displayValue() {
    return this.#displayValue;
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

  #onBlur() {
    if (this.#pattern) this.reportValidity();
  }




  // --- Regex (matcher, mask, format) ---


  #parser;
  #mask;
  #maskParts;
  #format;
  #formatParts;
  #formatSplitter;
  #patternRawInputValue = '';
  #displayValue = '';
  #patternInputKeydown_bound = this.#patternInputKeydown.bind(this);
  #patternInputPaste_bound = this.#patternInputPaste.bind(this);
  #replaceStringGroupRegex = /(\$[\d\&])/;
  #pattern;
  #patternRegex;
  #patternValidityIsBlocked = false;
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
  #regexGroupMatcher = /(\((?:\?\<\w+\>)?([^\)]+)\)\??)/g;
  
  #setupPattern() {
    if (!this.#pattern) return;
    
    const that = this;
    const input = this.querySelector('input');
    const inputDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    Object.defineProperty(input, 'value', {
      get: function () {
        return that.#patternInputValueGetter();
      },
      set: function (value) {
        value = that.#patternInputValueSetter(value);
        return inputDescriptor.set.call(this, value);
      }
    });
    input.addEventListener('keydown', this.#patternInputKeydown_bound);
    input.addEventListener('paste', this.#patternInputPaste_bound);
  }

  #patternInputValueGetter() {
    return this.#patternRawInputValue;
  }

  #patternInputValueSetter(value) {
    const parsed = value.match(this.#parser);
    if (!parsed && this.#checkIfValueIsMask(value)) {
      this.#stopPatternValidity(true);
    } else {
      this.#stopPatternValidity(false);
    }
    if (!parsed || !this.#format) {
      if (!this.#patternRawInputValue) this.#patternRawInputValue = value;
      this.#displayValue = value;
      return value;
    }

    const matchedValue = parsed[0];
    const leftOvers = value.replace(matchedValue, '');
    let endMatches = false;
    let matchIndex = 0;
    const formatGroupMatches = matchedValue.replace(this.#parser, this.#formatSplitter).split('_:_');
    const formatted = this.#formatParts.map(v => {
      if (endMatches) return;
      if (v.match(this.#replaceStringGroupRegex)) {
        v = formatGroupMatches[matchIndex];
        matchIndex += 1;
        if (v === '') endMatches = true;
      }
      return v;
    }).join('');
    this.#displayValue = `${formatted}${leftOvers}`;
    if (!this.#patternRawInputValue) this.#patternRawInputValue = value;
    return this.#displayValue;
  }

  // used for masking
  #stopPatternValidity(hold = true) {
    if (hold === this.patternValidityIsBlocked) return;
    this.patternValidityIsBlocked = hold;

    if (hold) this.querySelector('input').removeAttribute('pattern');
    else this.querySelector('input').setAttribute('pattern', this.#pattern);
  }

  #buildFormat(value) {
    const formatParts = value.split(this.#replaceStringGroupRegex);
    // for some reason splitting with regex will inset spaces. This will remove them if not already existing
    if (value[0] === '' && value[0] !== formatParts[0]) formatParts.splice(0, 1);
    if (value[value.length - 1] !== formatParts[formatParts.length - 1]) formatParts.splice(-1);
    this.#formatParts = formatParts;
    this.#formatSplitter = formatParts.filter(v => v.match(this.#replaceStringGroupRegex)).join('_:_');
  }

  #buildMask(value) {
    const maskParts = value.split(this.#replaceStringGroupRegex);
    // for some reason splitting with regex will inset spaces. This will remove them if not already existing
    if (maskParts[0] === '' && value[0] !== maskParts[0]) maskParts.splice(0, 1);
    if (value[value.length - 1] !== maskParts[maskParts.length - 1]) maskParts.splice(-1);
    this.#maskParts = maskParts;
  }

  // add regex slashes and begin and end operators (/^ $/)
  #setPattern(regexString) {
    this.querySelector('input').pattern = regexString;
    this.#patternRegex = new RegExp(regexString.replace(/^\//, '').replace(/\/$/, ''));
    // this.#patternRegex = new RegExp(`^${regexString.replace(/^\//, '').replace(/^\^/, '').replace(/(?<!\\)\$$/, '').replace(/\/$/, '')}$`);
    let i = 0;
    // make all groups after first optional. This will help with parsing for formatting
    const modified = regexString.replace(this.#regexGroupMatcher, (_match, value) => {
      if (i > 0 && value.slice(-1) !== '?') value += '?';
      i += 1;
      return value;
    });
    this.#parser = new RegExp(`^${modified.replace(/^\//, '').replace(/^\^/, '').replace(/(?<!\\)\$$/, '').replace(/\/$/, '')}`);
  }
  
  #patternInputKeydown(event) {
    // TODO handle this on mozilla window.
    // Meta does not work on windows key
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey    
    if (event.metaKey) return;

    // do not do anything on enter
    if (event.key === 'Enter') return;

    // input keys
    if (!this.#navigationKeys.includes(event.key)) {
      const input = this.querySelector('input');
      const previousPatternMismatch = input.validity.patternMismatch;
      const selectionStart = event.target.selectionStart;
      const selectionEnd = event.target.selectionEnd;
      const isSelectionAtEnd = selectionEnd === this.#displayValue.length;
      const arr = this.#patternRawInputValue.split('');
      const start = arr.slice(0, selectionStart).join('');
      const end = arr.slice(selectionEnd).join('');
      this.#patternRawInputValue = `${start}${event.key}${end}`;
      event.target.value = this.#patternRawInputValue;
      event.preventDefault();
      // since we can inject characters on format we need to not touch selection when at end
      if (!isSelectionAtEnd) {
        event.target.selectionStart = selectionEnd + 1;
        event.target.selectionEnd = selectionEnd + 1;
      }
      
      if (previousPatternMismatch === true && input.validity.patternMismatch === false) input.reportValidity();

    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      const selectionStart = event.target.selectionStart - 1 < 0 ? 0 : event.target.selectionStart - 1;
      let index = 0;
      // adjust index based on raw import. We do not want to delete characters added by formatter
      this.#displayValue.split('').find((c, i) => {
        if (i === selectionStart) {
          if (c !== this.#patternRawInputValue[index]) index = -1;
          return true;
        }
        if (c === this.#patternRawInputValue[index]) index += 1;
        return false;
      });
      this.#patternRawInputValue = index === -1 ? this.#patternRawInputValue : `${this.#patternRawInputValue.slice(0, index)}${this.#patternRawInputValue.slice(index + 1)}`;
      event.target.value = this.#patternRawInputValue;
      event.preventDefault();
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionStart;
    }
  }

  #patternInputPaste(event) {
    event.preventDefault();

    const input = this.querySelector('input');
    const previousPatternMismatch = input.validity.patternMismatch;
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    const arr = this.#patternRawInputValue.split('');
    const start = arr.slice(0, event.target.selectionStart).join('');
    const end = arr.slice(event.target.selectionEnd).join('');
    event.target.value = `${start}${paste}${end}`;
    if (previousPatternMismatch !== input.validity.patternMismatch) input.reportValidity();
  }

  #checkIfValueIsMask(value) {
    if (!this.#mask) return false;
    if (value.length < this.#mask.length) return false;

    // check if all non pattern groups exist in value
    const nonGroupMatches = this.#maskParts
      .filter(v => v.match(this.#replaceStringGroupRegex) === null)
      .filter(v => !value.includes(v)).length;
    return nonGroupMatches === 0;
  }
}


customElements.define('mdw-textfield', MDWTextfieldElement);
