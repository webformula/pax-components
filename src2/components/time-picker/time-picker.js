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
  #hour24 = this.hasAttribute('hour-24');
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
    this.#setInitialTime();
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

  get step() {
    return this.#input.step;
  }

  get hourStep() {
    return Math.max(1, Math.floor(parseInt(this.step || 1) / 3600))
  }

  get minuteStep() {
    const step = Math.max(1, Math.floor(parseInt(this.step || 1) / 60));
    if (step > 59) return -1;
    return step;
  }

  get hour24() {
    return this.#hour24;
  }

  get view() {
    if (this.classList.contains('mdw-minute-view')) return 'minute';
    return 'hour';
  }

  show() {
    this.firstChild.show();
  }

  close() {
    this.firstChild.close();
  }

  #setInitialTime() {
    if (this.#input.value) {
      this.#displayValue = this.#input.value;
      this.#initialValue = this.#input.value;
    } else {
      const date = new Date();
      const hourStep = this.hourStep;
      let hour = Math.round(date.getHours() / hourStep) * hourStep;
      if (hour < 10) hour = `0${hour}`;
      const minuteStep = this.minuteStep;
      let minute = minuteStep === -1 ? 0 : Math.round(date.getMinutes() / minuteStep) * minuteStep;
      if (minute < 10) minute = `0${minute}`;
      this.#displayValue = `${hour}:${minute}`;
      this.#initialValue = '';
    }
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

  updateDisplayValue24({ hour, minute }) {
    const split = this.#displayValue.split(':');
    hour = hour || parseInt(split[0]);
    if (hour < 10) hour = `0${hour}`;
    minute = minute || parseInt(split[1]);
    if (minute < 10) minute = `0${minute}`;
    this.#displayValue = `${hour}:${minute}`;
  }

  convert24ToMeridiemParts(time) {
    const split = time.split(':');
    let hour = parseInt(split[0]);
    let meridiem = 'AM';
    if (hour > 12) {
      meridiem = 'PM';
      hour = hour - 12;
    }
    const paddedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const minute = parseInt(split[1]);
    const paddedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    return {
      hour: `${hour}`,
      paddedHour,
      minute,
      paddedMinute,
      meridiem,
      formatted: `${paddedHour}:${paddedMinute} ${meridiem}`
    };
  }

  convertTo24Parts(time) {
    const split = time.split(':');
    let hour = parseInt(split[0]);
    const paddedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const minute = parseInt(split[1]);
    const paddedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    return {
      hour: `${hour}`,
      paddedHour,
      minute: `${minute}`,
      paddedMinute,
      formatted: `${paddedHour}:${paddedMinute}`
    };
  }

  #onControlFocus() {
    this.firstChild.show();
  }

  #onControlClick() {
    this.firstChild.show();
  }

  #onShow() {
    this.#setInitialTime();
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
