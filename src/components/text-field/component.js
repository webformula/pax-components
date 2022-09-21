import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';

customElements.define('mdw-text-field', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #trailingIcon;
  #previousSupportingText = this.querySelector('.mdw-supporting-text')?.innerText;
  #onInput_bound = this.#onInput.bind(this);
  #onFocus_bound = this.#onFocus.bind(this);
  #onBlur_bound = this.#onBlur.bind(this);
  #inputObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') this.#handleDisabledInput();
    });
  });

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

    if (this.classList.contains('mdw-outlined')) {
      this.insertAdjacentHTML('afterbegin', `
        <div class="mdw-outlined-border-container">
          <div class="mdw-outlined-leading"></div>
          <div class="mdw-outlined-notch"></div>
          <div class="mdw-outlined-trailing"></div>
        </div>
      `);

      if (input.value) this.#setNotchWidth();
    }

    this.insertAdjacentHTML('beforeend', `<div class="mdw-autocomplete"></div>`);

    input.addEventListener('input', this.#onInput_bound);
    input.addEventListener('focus', this.#onFocus_bound);
    input.addEventListener('blur', this.#onBlur_bound);
  }

  disconnectedCallback() {
    this.#inputObserver.disconnect();
    this.#inputObserver = undefined;
    this.#trailingIcon = undefined;
  }


  set autocomplete(value) {
    const offset = util.getTextLengthFromInput(this.querySelector('input'));
    this.querySelector('.mdw-autocomplete').innerText = value;
    this.querySelector('.mdw-autocomplete').style.left = `${offset + 18}px`;
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
  }

  // using placeholder-shown in css to detect if has input value
  #setupPlaceholder() {
    const input = this.querySelector('input');
    const placeholder = input.getAttribute('placeholder');
    input.setAttribute('placeholder', placeholder || ' ');
  }

  #onInput() {
    const input = this.querySelector('input');
    const supportingTextElement = this.querySelector('.mdw-supporting-text');
    const invalid = !input.checkValidity();
    const invalidIcon = this.querySelector('mdw-icon.mdw-invalid-icon');

    // we don't want to override trailing icon with invalid icon
    if (!invalidIcon) this.#trailingIcon = this.querySelector('.mdw-supporting-text + mdw-icon') || this.querySelector('label + mdw-icon') || this.querySelector('input + mdw-icon');
    if (invalid) {
      this.classList.add('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = input.validationMessage;
      if (this.#trailingIcon) this.#trailingIcon.remove();
      if (!invalidIcon) this.insertAdjacentHTML('beforeend', '<mdw-icon class="mdw-invalid-icon">error</mdw-icon>');
    } else {
      this.classList.remove('mdw-invalid');
      if (supportingTextElement) supportingTextElement.innerText = this.#previousSupportingText;
      if (invalidIcon) invalidIcon.remove();
      if (this.#trailingIcon) this.appendChild(this.#trailingIcon);
    }
  }

  #onFocus() {
    this.#setNotchWidth();
  }

  #onBlur() {
    if (!this.querySelector('input').value) this.#unsetNotchWidth()
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
