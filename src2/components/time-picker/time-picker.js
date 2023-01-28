import HTMLElementExtended from '../HTMLElementExtended.js';
import device from '../../core/device.js';

import './time-picker-desktop.js';

// NOTE for now this only works with text fields, but there is no reason it cannot work with other controls

customElements.define('mdw-time-picker', class MDWTimePickerElement extends HTMLElementExtended {
  useTemplate = false;

  #control;
  #input;
  #displayValue = '';
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
    this.#displayValue = this.#input.value || this.currentTimeValue;
    this.#initialValue = this.#input.value;
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

  get currentTimeValue() {
    const date = new Date();
    const hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return `${hour}:${minute}`;
  }

  get min() {
    return this.#input.min;
  }
  get max() {
    return this.#input.max;
  }

  get displayValue() {
    return this.#displayValue;
  }
  set displayValue(value) {
    // this.#displayValue = dateUtil.parse(value);
  }

  get initialValue() {
    return this.#initialValue;
  }

  get control() {
    return this.#control;
  }

  get input() {
    return this.#input;
  }

  show() {
    this.firstChild.show();
  }

  close() {
    this.firstChild.close();
  }

  updateDisplayValueMeridiem({ hour, minute, meridiem }) {
    const split = this.#displayValue.split(':');
    const currentMeridiem = meridiem ? meridiem : parseInt(split[0]) > 12 ? 'PM' : 'AM';
    if (hour) {
      hour = parseInt(hour);
      if (currentMeridiem === 'PM') {
        if (hour !== 12) hour += 12;
      } else if (hour === 12) hour = 0;
      split[0] = `${hour}`;
    }
    if (parseInt(split[0]) < 10) split[0] = `0${split[0]}`
    if (minute) split[1] = minute;

    this.#displayValue = `${split[0]}:${split[1]}`;
  }

  convert24ToMeridiemParts(time) {
    const split = time.split(':');
    let hour = parseInt(split[0]);
    let meridiem = 'AM';
    if (hour > 12) {
      meridiem = 'PM';
      hour = hour - 12;
    }
    hour = hour < 10 ? `0${hour}` : `${hour}`;

    return {
      hour: meridiem === 'AM' && hour === '00' ? '12' : hour,
      minute: split[1],
      meridiem,
      formatted: `${hour}:${split[1]} ${split[2]}`
    };
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

    // this.#displayValue = dateUtil.parse(this.value ? this.value : dateUtil.today());
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
