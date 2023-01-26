import HTMLElementExtended from '../HTMLElementExtended.js';
import device from '../../core/device.js';

import './time-picker-desktop.js';

// NOTE for now this only works with text fields, but there is no reason it cannot work with other controls

customElements.define('mdw-time-picker', class MDWTimePickerElement extends HTMLElementExtended {
  useTemplate = false;

  #control;
  #input;
  #displayTime = '';
  #initialValue = '';
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onControlClick_bound = this.#onControlClick.bind(this);
  #onShow_bound = this.#onShow.bind(this);
  #onClose_bound = this.#onClose.bind(this);

  constructor() {
    super();

    this.#control = this.parentNode;
    if (this.#control.nodeName !== 'MDW-TEXTFIELD') throw Error('mdw-date-picker must be a child of mdw-textfield');
    this.#input = this.#control.querySelector('input');
    this.#control.classList.add('mdw-has-time-picker');
    // this.#displayTime = dateUtil.parse(this.value ? this.value : dateUtil.today());
    // this.#initialValue = this.value;
  }

  connectedCallback() {
    this.#control.querySelector('input').addEventListener('focus', this.#onControlFocus_bound);

    // on mobile to prevent the default browser control we disable click events on the input, so no focus
    if (device.isMobile) this.#control.addEventListener('click', this.#onControlClick_bound);
  }

  afterRender() {
    this.firstChild.addEventListener('open', this.#onShow_bound);
    this.firstChild.addEventListener('close', this.#onClose_bound);
  }

  disconnectedCallback() {
    this.#control.querySelector('input').removeEventListener('focus', this.#onControlFocus_bound);
    this.#control.removeEventListener('click', this.#onControlClick_bound);
    this.firstChild.removeEventListener('open', this.#onShow_bound);
    this.firstChild.removeEventListener('close', this.#onClose_bound);
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

  get valueTime() {
    // return dateUtil.parse(this.#input.value);
  }
  set valueTime(date) {
    // this.#input.value = dateUtil.format(date, 'YYYY-MM-dd') || '';
  }
  get displayValue() {
    // return dateUtil.format(this.#displayTime, 'YYYY-MM-dd');
  }
  set displayValue(value) {
    // this.#displayTime = dateUtil.parse(value);
  }
  get displayTime() {
    return this.#displayTime;
  }
  set displayTime(date) {
    // this.#displayTime = dateUtil.parse(date);
  }
  get initialValue() {
    return this.#initialValue;
  }

  get minTime() {
    // return dateUtil.parse(this.#input.min);
  }
  get maxTime() {
    // return dateUtil.parse(this.#input.max);
  }

  get control() {
    return this.#control;
  }

  show() {
    this.firstChild.show();
  }

  close() {
    this.firstChild.close();
  }


  #onControlFocus() {
    this.firstChild.show();
  }

  #onControlClick() {
    this.firstChild.show();
  }

  #onShow() {
    if (device.isMobile) this.#control.removeEventListener('click', this.#onControlClick_bound);
    else this.#input.removeEventListener('focus', this.#onControlFocus_bound);

    // this.#displayTime = dateUtil.parse(this.value ? this.value : dateUtil.today());
    // this.#initialValue = this.value;
  }

  #onClose() {
    setTimeout(() => {
      if (device.isMobile) this.#control.addEventListener('click', this.#onControlClick_bound);
      else this.#input.addEventListener('focus', this.#onControlFocus_bound);
    });
  }

  template() {
    if (device.isMobile) return `<mdw-time-picker-mobile></mdw-time-picker-mobile>`;
    else return `<mdw-time-picker-desktop></mdw-time-picker-desktop>`;
  }
});
