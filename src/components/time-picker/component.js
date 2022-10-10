import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import util from '../../core/util.js';
import './component.css';
import './desktop.js';
import './mobile.js';

// TODO input still allows out of range setting directly. Should i handle that?

customElements.define('mdw-time-picker', class MDWTimePicker extends HTMLElementExtended {
  useShadowRoot = false;

  #id = this.getAttribute('id') || `mdw-time-picker-${util.getUID()}`;
  #value = this.getAttribute('value') || `${(new Date()).getHours()}:${(new Date()).getMinutes()}`;
  #min = this.getAttribute('min') || '00:00';
  #max = this.getAttribute('max') || '24:00';
  #step = parseInt(this.getAttribute('step') || '60'); // seconds
  #panel;
  #control;
  #isTextField = false;
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onControlClick_bound = this.#onControlClick.bind(this);
  #onInput_bound = this.#onInput.bind(this);


  constructor() {
    super();
    
    this.setAttribute('id', this.#id);
    this.#control = this.parentNode;
    if (this.#control.nodeName === 'MDW-TEXT-FIELD') {
      this.#isTextField = true;
      this.#control.classList.add('mdw-has-time-picker');

      const input = this.#control.querySelector('input');
      if (input.hasAttribute('min')) this.#min = input.getAttribute('min');
      if (input.hasAttribute('max')) this.#max = input.getAttribute('max');
      if (input.hasAttribute('step')) this.#step = input.getAttribute('step');
    }
    
    // set default value if none 
    if (this.#isTextField && this.#control.querySelector('input').hasAttribute('value')) this.#value = input.value;
    else if (this.#min && util.compareInputTimeDifference(this.#value, this.#min) === -1) this.#value = this.#min;
    else if (this.#max && util.compareInputTimeDifference(this.#value, this.#max) === 1) this.#value = this.#max;

    this.#preparePanel();
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;

    if (this.#panel.showing) {
      const picker = this.#panel.element.querySelector('mdw-time-picker-desktop') || this.#panel.element.querySelector('mdw-time-picker-mobile');
      picker.setDisplayTime(this.#value);
    }
  }

  get min() {
    return this.#min;
  }
  set min(value) {
    this.#min = value;
  }

  get max() {
    return this.#max;
  }
  set max(value) {
    this.#max = value;
  }

  get step() {
    return this.#step.toString();
  }
  set step(value) {
    this.#step = parseInt(value);
  }

  connectedCallback() {
    if (this.#isTextField) {
      this.#control.querySelector('input').addEventListener('focus', this.#onControlFocus_bound);

      // on mobile to prevent the default browser control we disable click events on the input, so no focus
      if (util.isMobile) this.#control.addEventListener('click', this.#onControlClick_bound);
      else this.#control.querySelector('input').addEventListener('input', this.#onInput_bound);
    } else {
      this.#control.addEventListener('focus', this.#onControlFocus_bound);
    }
  }

  disconnectedCallback() {
    if (this.#isTextField) {
      this.#control.querySelector('input').removeEventListener('focus', this.#onControlFocus_bound);
      this.#control.removeEventListener('click', this.#onControlClick_bound);
      this.#control.querySelector('input').removeEventListener('input', this.#onInput_bound);
    } else {
      this.#control.removeEventListener('focus', this.#onControlFocus_bound);
    }
  }

  setValue(time) {
    this.#value = time;
    if (this.#isTextField) this.#control.querySelector('input').value = this.value;
  }

  hide() {
    this.#panel.hide();
  }

  #onControlFocus() {
    this.#panel.show();
  }

  #onControlClick() {
    this.#panel.show();
  }

  #onInput(event) {
    this.value = event.target.value;
  }

  #preparePanel() {
    this.#panel = new Panel();
    this.#panel.classes = 'mdw-time-picker-panel';
    this.#panel.template = this.template();
    this.#panel.addIgnoreElement(this.#control);
    this.#panel.backdrop = true;

    if (!util.isMobile) {
      this.#panel.backdrop = false;
      this.#panel.clickOutsideToClose = true;
      this.#panel.targetElement = this.#control;
    }
  }

  template() {
    if (util.isMobile) return `<mdw-time-picker-mobile mdw-time-picker-id="${this.#id}"></mdw-time-picker-mobile>`;
    else return `<mdw-time-picker-desktop mdw-time-picker-id="${this.#id}"></mdw-time-picker-desktop>`;
  }
});
