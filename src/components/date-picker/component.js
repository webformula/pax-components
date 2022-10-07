import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './component.css';
import './desktop.js';
import './mobile.js';

customElements.define('mdw-date-picker', class MDWDatePicker extends HTMLElementExtended {
  useShadowRoot = false;

  #id = this.getAttribute('id') || `mdw-date-picker-${util.getUID()}`;
  #value = '';
  #displayDate = '';
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
      this.#control.classList.add('mdw-has-date-picker');
    }

    if (this.#isTextField) this.#value = dateUtil.parse(this.#control.querySelector('input').value || '');
    else if (his.hasAttribute('value')) this.#value = dateUtil.parse(this.getAttribute('value'));

    this.#displayDate = dateUtil.parse(this.value ? this.value : dateUtil.today());

    this.#preparePanel();
  }

  get value() {
    return this.#value && dateUtil.format(this.#value, 'YYYY-MM-dd');
  }
  set value(value) {
    this.#value = value && dateUtil.parse(value);
    this.#displayDate = this.#value;

    if (this.#panel.showing) {
      const picker = this.#panel.element.querySelector('mdw-date-picker-desktop') || this.#panel.element.querySelector('mdw-date-picker-mobile');
      picker.setDisplayDate(this.#displayDate);
    }
  }

  get displayDate() {
    return this.#displayDate;
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

  setValueDate(date) {
    this.#value = date;
    if (this.#isTextField) this.#control.querySelector('input').value = this.value;
  }

  setDisplayDate(date) {
    this.#displayDate = date;
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
    this.#panel.classes = 'mdw-date-picker-panel';
    this.#panel.template = this.template();
    this.#panel.backdrop = true;
    this.#panel.addIgnoreElement(this.#control);

    if (!util.isMobile) {
      this.#panel.clickOutsideToClose = true;
      this.#panel.targetElement = this.#control;
    }
  }

  template() {
    if (util.isMobile) return `<mdw-date-picker-mobile mdw-date-picker-id="${this.#id}"></mdw-date-picker-mobile>`;
    else return `<mdw-date-picker-desktop mdw-date-picker-id="${this.#id}"></mdw-date-picker-desktop>`;
  }
});
