import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/dateUtil.js';
import Panel from '../panel/service.js';
import device from '../../core/device.js';
import util from '../../core/util.js';

import './desktop.js';
import './mobile.js';

// NOTE for now this only works with text fields, but there is no reason it cannot work with other controls

// TODO ranges
//      Desktop: 2 pickers, range
//      Mobile: fullscreen with scrolling months

customElements.define('mdw-date-picker', class MDWDatePicker extends HTMLElementExtended {
  useTemplate = false;
  
  #id = this.getAttribute('id') || `mdw-date-picker-${util.uid()}`;
  #control;
  #input;
  #displayDate = '';
  #initialValue = '';
  #panel;
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onControlClick_bound = this.#onControlClick.bind(this);
  #onShow_bound = this.#onShow.bind(this);

  constructor() {
    super();

    this.setAttribute('id', this.#id);
    this.#control = this.parentNode;
    if (this.#control.nodeName !== 'MDW-TEXTFIELD') throw Error('mdw-date-picker must be a child of mdw-textfield');
    this.#input = this.#control.querySelector('input');
    this.#control.classList.add('mdw-has-date-picker');
    this.#displayDate = dateUtil.parse(this.value ? this.value : dateUtil.today());
    this.#initialValue = this.value;
    this.#createPanel();
  }

  connectedCallback() {
    this.#control.querySelector('input').addEventListener('focus', this.#onControlFocus_bound);

    // on mobile to prevent the default browser control we disable click events on the input, so no focus
    if (device.isMobile) this.#control.addEventListener('click', this.#onControlClick_bound);
    // else this.#control.querySelector('input').addEventListener('input', this.#onInput_bound);

    this.#panel.element.addEventListener('open', this.#onShow_bound);
  }

  disconnectedCallback() {
    this.#control.querySelector('input').removeEventListener('focus', this.#onControlFocus_bound);
    this.#control.removeEventListener('click', this.#onControlClick_bound);
    // this.#control.querySelector('input').removeEventListener('input', this.#onInput_bound);

    this.#panel.element.removeEventListener('open', this.#onShow_bound);
    this.#panel.remove();
  }

  get value() {
    return this.#input.value;
  }
  set value(value) {
    this.#input.value = value;
  }
  get min() {
    return this.#input.min;
  }
  get max() {
    return this.#input.max;
  }

  get panel() {
    return this.#panel.element;
  }

  get valueDate() {
    return dateUtil.parse(this.#input.value);
  }
  set valueDate(date) {
    this.#control.querySelector('input').value = dateUtil.format(date, 'YYYY-MM-dd') || '';
  }
  get displayValue() {
    return dateUtil.format(this.#displayDate, 'YYYY-MM-dd');
  }
  set displayValue(value) {
    this.#displayDate = dateUtil.parse(value);
  }
  get displayDate() {
    return this.#displayDate;
  }
  set displayDate(date) {
    this.#displayDate = dateUtil.parse(date);
  }
  get initialValue() {
    return this.#initialValue;
  }

  get minDate() {
    return dateUtil.parse(this.#input.min);
  }
  get maxDate() {
    return dateUtil.parse(this.#input.max);
  }

  close() {
    this.#panel.close();
  }


  #onControlFocus() {
    this.#panel.show();
  }

  #onControlClick() {
    this.#panel.show();
  }

  #onShow() {
    this.#displayDate = dateUtil.parse(this.value ? this.value : dateUtil.today());
    this.#initialValue = this.value;
  }

  #createPanel() {
    this.#panel = new Panel();
    this.#panel.template = this.#template();
    this.#panel.addClickOutsideCloseIgnore(this.#control);

    if (device.isMobile) {
      this.#panel.backdrop = true;
      this.#panel.clickOutsideClose = false;
    } else {
      this.#panel.backdrop = false;
      this.#panel.clickOutsideClose = true;
      this.#panel.target = this.#control;
    }

  }

  #template() {
    if (device.isMobile) return `<mdw-date-picker-mobile mdw-date-picker-id="${this.#id}"></mdw-date-picker-mobile>`;
    else return `<mdw-date-picker-desktop mdw-date-picker-id="${this.#id}"></mdw-date-picker-desktop>`;
  }
});
