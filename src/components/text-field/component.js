import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';

const handleReportValidityScrollIntoView = util.debounce(input => {
  // check if already on screen
  const bounds = input.getBoundingClientRect();
  if (bounds.y >= 0 && (bounds.y + bounds.height) <= window.innerHeight) return;

  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 100);


customElements.define('mdw-text-field', class MDWTextField extends HTMLElementExtended {
  useShadowRoot = false;

  #previousSupportingText = this.querySelector('.mdw-supporting-text')?.innerText;
  #onInput_bound = this.#onInput.bind(this);
  #onFocus_bound = this.#onFocus.bind(this);
  #onBlur_bound = this.#onBlur.bind(this);
  #onInvalid_bound = this.#onInvalid.bind(this);
  #clear_bound = this.clear.bind(this);
  #inputObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') this.#handleDisabledInput();
    });
  });
  #autocomplete;

  constructor() {
    super();

    this.#preventInitialAnimation();
    this.#handleDisabledInput();
    this.#overrideInputSetCustomValidity();
    this.#setupPlaceholder();

    const input = this.querySelector('input');
    this.#inputObserver.observe(input, {
      attributes: true
    });


    // const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    // const originalSet = descriptor.set;
    // descriptor.set = function (value) {
    //   console.log(value)
    //   originalSet.apply(this, arguments);
    // };
    // Object.defineProperty(input, 'value', descriptor);

    if (this.classList.contains('mdw-outlined')) {
      this.insertAdjacentHTML('afterbegin', `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `);

      if (input.value || input.type === 'date' || input.type === 'month' || input.type === 'time') this.#setNotchWidth();
    }

    this.insertAdjacentHTML('beforeend', `<div class="mdw-autocomplete"></div>`);

    input.addEventListener('input', this.#onInput_bound);
    input.addEventListener('focus', this.#onFocus_bound);
    input.addEventListener('blur', this.#onBlur_bound);
    input.addEventListener('invalid', this.#onInvalid_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.addEventListener('click', this.#clear_bound);
  }

  disconnectedCallback() {
    const input = this.querySelector('input');
    input.removeEventListener('input', this.#onInput_bound);
    input.removeEventListener('focus', this.#onFocus_bound);
    input.removeEventListener('blur', this.#onBlur_bound);
    input.removeEventListener('invalid', this.#onInvalid_bound);

    const inputClearIcon = this.querySelector('mdw-icon.mdw-input-clear');
    if (inputClearIcon) inputClearIcon.removeEventListener('click', this.#clear_bound);

    this.#inputObserver.disconnect();
    this.#inputObserver = undefined;
  }


  get autocomplete() {
    return this.#autocomplete;
  }
  set autocomplete(value) {
    this.#autocomplete = value;
    this.#setAutocomplete();
  }

  #setAutocomplete() {
    if (!this.#autocomplete) return;

    const input = this.querySelector('input');
    const match = this.#autocomplete.match(new RegExp(`^${input.value}(.*)`, 'i'));
    const value = match ? match[1] : this.#autocomplete;

    this.querySelector('.mdw-autocomplete').innerText = value;
    const offset = util.getTextLengthFromInput(this.querySelector('input'));
    this.querySelector('.mdw-autocomplete').style.left = `${offset + 16}px`;
  }

  clear(event) {
    const input = this.querySelector('input');
    input.value = '';
    
    // prevent label from moving and focus
    if (event && event.target.classList.contains('mdw-input-clear')) {
      this.classList.add('mdw-raise-label');
      input.focus();
    }
  }

  #preventInitialAnimation() {
    this.classList.add('mdw-preload');
    setTimeout(() => {
      this.classList.remove('mdw-preload');
    }, 200);
  }

  #handleDisabledInput() {
    if (this.querySelector('input').hasAttribute('disabled')) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
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

  // using placeholder-shown in css to detect if has input value
  #setupPlaceholder() {
    const input = this.querySelector('input');
    const placeholder = input.getAttribute('placeholder');
    input.setAttribute('placeholder', placeholder || ' ');
  }

  #onInput() {
    const input = this.querySelector('input');
    this.#updateInputValidity(!input.checkValidity());
    this.#setAutocomplete();
  }

  #updateInputValidity(invalid = false) {
    const input = this.querySelector('input');
    const supportingTextElement = this.querySelector('.mdw-supporting-text');
    const invalidIcon = this.querySelector('mdw-icon.mdw-invalid-icon');
    
    if (invalid) {
      this.classList.add('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = input.validationMessage;
      if (!invalidIcon) this.insertAdjacentHTML('beforeend', '<mdw-icon class="mdw-invalid-icon">error</mdw-icon>');
    } else {
      this.classList.remove('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = this.#previousSupportingText;
      if (invalidIcon) invalidIcon.remove();
    }
  }

  #onFocus() {
    this.#setNotchWidth();
  }

  #onBlur() {
    const input = this.querySelector('input');
    if (!input.value && input.type !== 'date' && input.type !== 'time' && input.type !== 'month') this.#unsetNotchWidth();
  }

  #onInvalid(event) {
    event.preventDefault();
  }

  #setNotchWidth() {
    if (!this.classList.contains('mdw-outlined')) return;
    const label = this.querySelector('label');
    if (!label) return;

    const styles = getComputedStyle(label);
    const currentFontSize = parseInt(styles.getPropertyValue('font-size').replace('px', ''));
    const labelSmallFontSize = 14; // TODO pull this from css var
    const labelWidth = label.offsetWidth * ((labelSmallFontSize / currentFontSize) * 1.1);
    this.querySelector('.mdw-outlined-notch').style.width = labelWidth + 'px';
  }

  #unsetNotchWidth() {
    if (!this.classList.contains('mdw-outlined')) return;
    const label = this.querySelector('label');
    if (!label) return;
    this.querySelector('.mdw-outlined-notch').style.width = '0';
  }
});
