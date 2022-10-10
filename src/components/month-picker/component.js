import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './component.css';
import './desktop.js';
// import './mobile.js';


// TODO min max

customElements.define('mdw-month-picker', class MDWMonthPicker extends HTMLElementExtended {
  useShadowRoot = false;

  #id = this.getAttribute('id') || `mdw-month-picker-${util.getUID()}`;
  #value = dateUtil.format(new Date(), 'YYYY-MM');
  #min;
  #max;
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
      this.#control.classList.add('mdw-has-month-picker');

      const input = this.#control.querySelector('input');
      if (input.value) this.#min = input.value;
      if (input.hasAttribute('min')) this.#min = input.getAttribute('min');
      if (input.hasAttribute('max')) this.#max = input.getAttribute('max');
    }

    this.#preparePanel();
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;

    if (this.#panel.showing) {
      const picker = this.#panel.element.querySelector('mdw-month-picker-desktop') || this.#panel.element.querySelector('mdw-month-picker-mobile');
      picker.setDisplayDate(this.#value);
    }
  }

  get displayDate() {
    return this.#value;
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

  setValue(date) {
    this.#value = date;
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
    this.#panel.classes = 'mdw-month-picker-panel';
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
    if (util.isMobile) return `<mdw-month-picker-mobile mdw-month-picker-id="${this.#id}"></mdw-month-picker-mobile>`;
    else return `<mdw-month-picker-desktop mdw-month-picker-id="${this.#id}"></mdw-month-picker-desktop>`;
  }
});
