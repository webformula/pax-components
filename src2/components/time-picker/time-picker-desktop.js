import MDWPanelElement from '../panel/component.js';
import './time-picker-desktop.css';
import keyboardSVGIcon from '../../svg-icons/keyboard_FILL0_wght400_GRAD0_opsz24.svg';


customElements.define('mdw-time-picker-desktop', class MDWTimePickerDesktopElement extends MDWPanelElement {
  useTemplate = false;

  #ok_bound = this.#ok.bind(this);
  #cancel_bound = this.#cancel.bind(this);
  #onShow_bound = this.#onShow.bind(this);
  #onClose_bound = this.#onClose.bind(this);
  #selectMouseDown_bound = this.#selectMouseDown.bind(this);
  #selectMouseUp_bound = this.#selectMouseUp.bind(this);
  #selectMouseMove_bound = this.#selectMouseMove.bind(this);
  #amClick_bound = this.#amClick.bind(this);
  #pmClick_bound = this.#pmClick.bind(this);
  #dialHourClick_bound = this.#dialHourClick.bind(this);
  #dialMinuteClick_bound = this.#dialMinuteClick.bind(this);
  #onInput_bound = this.#onInput.bind(this);
  #hourClick_bound = this.#hourClick.bind(this);
  #minuteClick_bound = this.#minuteClick.bind(this);
  #selectedHour;
  #lastSelectedHour;
  #selectedMinute;
  #lastSelectedMinute;
  #selectedMeridiem;
  #lastSelectedMeridiem;
  #hourData = [];
  #minuteData = [];


  constructor() {
    super();

    this.animation = 'scale';
    this.backdrop = false;
    this.clickOutsideClose = true;
    this.target = this.parentElement.control;

    this.addClickOutsideCloseIgnore(this.parentElement.control);
    this.#buildThetaData();
  }

  afterRender() {
    this.addEventListener('open', this.#onShow_bound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('open', this.#onShow_bound);
    this.querySelector('.mdw-dial-container').removeEventListener('mousedown', this.#selectMouseDown_bound);
    window.removeEventListener('mouseup', this.#selectMouseUp_bound);
    window.removeEventListener('mousemove', this.#selectMouseMove_bound);
    this.#input.removeEventListener('input', this.#onInput_bound);
    this.querySelector('.mdw-dial-hour').removeEventListener('click', this.#dialHourClick_bound);
    this.querySelector('.mdw-dial-minute').removeEventListener('click', this.#dialMinuteClick_bound);
    this.querySelector('.mdw-time-hour').removeEventListener('click', this.#hourClick_bound);
    this.querySelector('.mdw-time-minute').removeEventListener('click', this.#minuteClick_bound);
    this.querySelector('.mdw-ok').removeEventListener('click', this.#ok_bound);
    this.querySelector('.mdw-cancel').removeEventListener('click', this.#cancel_bound);
    if (!this.#hour24) {
      this.querySelector('.mdw-am').removeEventListener('click', this.#amClick_bound);
      this.querySelector('.mdw-pm').removeEventListener('click', this.#pmClick_bound);
    }
  }


  get #value() {
    return this.parentElement.value;
  }
  set #value(value) {
    this.parentElement.value = value;
  }

  get #displayValue() {
    return this.parentElement.displayValue;
  }
  set #displayValue(value) {
    this.parentElement.displayValue = value;
  }

  get #initialValue() {
    return this.parentElement.initialValue;
  }

  get #input() {
    return this.parentElement.input;
  }

  get #step() {
    return parseInt(this.parentElement.step || 1);
  }

  get #hourStep() {
    return this.parentElement.hourStep;
  }

  get #minuteStep() {
    return this.parentElement.minuteStep;
  }
  get #secondStep() {
    return this.#step;
  }

  get #min() {
    return this.parentElement.min;
  }

  get #max() {
    return this.parentElement.max;
  }

  get #selector() {
    return this.querySelector('.mdw-selector');
  }

  get #hour24() {
    return this.parentElement.hour24;
  }

  get #view() {
    return this.parentElement.view;
  }

  template() {
    const parts = this.#convert24ToMeridiemParts(this.#displayValue);

    return /*html*/`
      <div class="mdw-headline">Select time</div>

      <div class="mdw-time-container">
        <div class="mdw-time-hour" selected>${parts.paddedHour}</div>
        <div class="mdw-time-separator">:</div>
        <div class="mdw-time-minute">${parts.paddedMinute}</div>

        ${!this.#hour24 ? /*html*/ `
          <div class="mdw-meridiem-container">
            <div class="mdw-am" ${parts.meridiem === 'AM' ? 'selected' : ''}>AM</div>
            <div class="mdw-pm" ${parts.meridiem === 'PM' ? 'selected' : ''}>PM</div>
          </div>
        ` : ''}
      </div>

      <div class="mdw-dial-container">
        <div class="mdw-dial-hour">${this.#hourTemplate()}</div>
        <div class="mdw-dial-minute">${this.#minuteTemplate()}</div>

        <div class="mdw-selector-container">
          <div class="mdw-selector-center"></div>
          <div class="mdw-selector-line"></div>
          <div class="mdw-selector"></div>
        </div>
      </div>

      <div class="mdw-actions">
        <mdw-button class="mdw-keyboard mdw-icon-button"><div class="mdw-svg-icon">${keyboardSVGIcon}</div></mdw-button>
        <span style="flex: 1"></span>
        <mdw-button class="mdw-cancel">cancel</mdw-button>
        <mdw-button class="mdw-ok">ok</mdw-button>
      </div>
    `;
  }

  #buildThetaData() {
    const hourStep = this.#hourStep;
    const hourCount = 12 / hourStep;

    this.#hourData = [...new Array(hourCount)].map((_, i) => {
      const hour = i === 0 ? 12 : i * hourStep;
      const paddedHour = hour < 10 ? `0${hour}` : hour;
      const theta = 30 * (i * hourStep);
      return {
        theta: `${theta}`,
        hour: `${hour}`,
        paddedHour: `${paddedHour}`
      };
    });

    if (this.#hour24) {
      this.#hourData = this.#hourData.concat([...new Array(hourCount)].map((_, i) => {
        const hour = i === 0 ? '0' : (i * hourStep) + 12;
        const paddedHour = hour < 10 ? `0${hour}` : hour;
        const theta = 30 * (i * hourStep);
        return {
          theta: `${theta}`,
          hour: `${hour}`,
          paddedHour: `${paddedHour}`,
          is24: true
        };
      }))
    }


    const minuteStep = this.#minuteStep;
    if (minuteStep === -1) return;

    const minuteCount = 60 / minuteStep;
    this.#minuteData = [...new Array(minuteCount)].map((_, i) => {
      const minute = i * minuteStep;
      const paddedMinute = minute < 10 ? `0${minute}` : minute;
      const theta = 6 * (i * minuteStep);
      return {
        theta: `${theta}`,
        minute: `${minute}`,
        paddedMinute: `${paddedMinute}`,
        display: minute % 5 === 0
      };
    });
  }

  #hourTemplate() {
    const parts = this.#convert24ToMeridiemParts(this.#displayValue);

    return /* html */`
      <div class="mdw-dial-hour-meridiem">
        ${this.#hourData.filter(v => !v.is24).map(v => `<div class="mdw-dial-label" hour="${v.hour}" degree="${v.theta}" ${parts.hour === v.hour ? 'selected' : ''}>${v.paddedHour}</div>`).join('\n')}
      </div>
      
      ${this.#hour24 ? /*html*/ `
        <div class="mdw-dial-hour-24">
          ${this.#hourData.filter(v => v.is24).map(v => `<div class="mdw-dial-label" hour="${v.hour}" degree="${v.theta}" ${parts.hour === v.hour ? 'selected' : ''}>${v.paddedHour}</div>`).join('\n')}
        </div>
      ` : ''}
    `;
  }

  #minuteTemplate() {
    const parts = this.#convertTo24Parts(this.#displayValue);

    return this.#minuteData.map(v => `<div class="mdw-dial-label ${!v.display ? 'mdw-minute-hidden' : ''}" minute="${v.minute}" degree="${v.theta}" ${parts.minute === v.minute ? 'selected' : ''}>${v.display ? v.paddedMinute : ''}</div>`).join('\n');
  }

  #updateDisplayValueMeridiem({ hour, minute, meridiem }) {
    return this.parentElement.updateDisplayValueMeridiem({ hour, minute, meridiem });
  }

  #updateDisplayValue24({ hour, minute }) {
    return this.parentElement.updateDisplayValue24({ hour, minute });
  }

  #convert24ToMeridiemParts(time) {
    return this.parentElement.convert24ToMeridiemParts(time);
  }

  #convertTo24Parts(time) {
    return this.parentElement.convertTo24Parts(time);
  }

  #onShow() {
    const parts = this.#convert24ToMeridiemParts(this.#displayValue);
    this.#selectedHour = parts.hour;
    this.#selectedMinute = parts.minute;
    this.#selectedMeridiem = parts.meridiem;
    this.#updateSelection(true);
    this.#switchView('hour');

    this.addEventListener('close', this.#onClose_bound);
    this.querySelector('.mdw-dial-container').addEventListener('mousedown', this.#selectMouseDown_bound);
    this.#input.addEventListener('input', this.#onInput_bound);
    this.querySelector('.mdw-dial-hour').addEventListener('click', this.#dialHourClick_bound);
    this.querySelector('.mdw-dial-container').addEventListener('click', this.#dialMinuteClick_bound);
    this.querySelector('.mdw-time-hour').addEventListener('click', this.#hourClick_bound);
    this.querySelector('.mdw-time-minute').addEventListener('click', this.#minuteClick_bound);
    this.querySelector('.mdw-ok').addEventListener('click', this.#ok_bound);
    this.querySelector('.mdw-cancel').addEventListener('click', this.#cancel_bound);
    if (!this.#hour24) {
      this.querySelector('.mdw-am').addEventListener('click', this.#amClick_bound);
      this.querySelector('.mdw-pm').addEventListener('click', this.#pmClick_bound);
    }
  }

  #onClose() {
    this.removeEventListener('close', this.#onClose_bound);
    this.querySelector('.mdw-dial-container').removeEventListener('mousedown', this.#selectMouseDown_bound);
    window.removeEventListener('mouseup', this.#selectMouseUp_bound);
    window.removeEventListener('mousemove', this.#selectMouseMove_bound);
    this.#input.removeEventListener('input', this.#onInput_bound);
    this.querySelector('.mdw-dial-hour').removeEventListener('click', this.#dialHourClick_bound);
    this.querySelector('.mdw-dial-minute').removeEventListener('click', this.#dialMinuteClick_bound);
    this.querySelector('.mdw-time-hour').removeEventListener('click', this.#hourClick_bound);
    this.querySelector('.mdw-time-minute').removeEventListener('click', this.#minuteClick_bound);
    this.querySelector('.mdw-ok').removeEventListener('click', this.#ok_bound);
    this.querySelector('.mdw-cancel').removeEventListener('click', this.#cancel_bound);
    if (!this.#hour24) {
      this.querySelector('.mdw-am').removeEventListener('click', this.#amClick_bound);
      this.querySelector('.mdw-pm').removeEventListener('click', this.#pmClick_bound);
    }
  }

  #ok() {
    this.#value = this.#displayValue;
    this.close();
  }

  #cancel() {
    this.#value = this.#initialValue;
    this.close();
  }

  #selectMouseDown(event) {
    const selectorBounds = this.querySelector('.mdw-selector').getBoundingClientRect();
    if (
      event.clientX < selectorBounds.x
      && event.clientX > selectorBounds.right
      && event.clientY < selectorBounds.y
      && event.clientY > selectorBounds.bottom
    ) return;

    window.addEventListener('mouseup', this.#selectMouseUp_bound);
    window.addEventListener('mousemove', this.#selectMouseMove_bound);
    event.preventDefault();
  }

  #selectMouseUp(event) {
    window.removeEventListener('mouseup', this.#selectMouseUp_bound);
    window.removeEventListener('mousemove', this.#selectMouseMove_bound);
    event.preventDefault();
    setTimeout(() => this.#switchView('minute'));
  }

  #hourClick() {
    this.#switchView('hour');
  }

  #minuteClick() {
    this.#switchView('minute');
  }

  #switchView(view = 'hour') {
    if (view === 'hour') {
      this.parentElement.classList.remove('mdw-minute-view');
      this.querySelector('.mdw-time-hour').setAttribute('selected', '');
      this.querySelector('.mdw-time-minute').removeAttribute('selected');
    } else if (view === 'minute') {
      this.#selector.classList.remove('mdw-hour-24');
      this.parentElement.classList.add('mdw-minute-view');
      this.querySelector('.mdw-time-minute').setAttribute('selected', '');
      this.querySelector('.mdw-time-hour').removeAttribute('selected');
    }

    this.#updateSelection(true);
  }

  #selectMouseMove(event) {
    const center = this.querySelector('.mdw-selector-center');
    const centerBounds = center.getBoundingClientRect();
    const x = centerBounds.x - event.clientX;
    const y = centerBounds.y - event.clientY;
    const theta = Math.atan2(y, x) * (180 / Math.PI);

    const view = this.#view;
    if (view === 'hour') {
      const step = this.#hourStep * 30;
      let positionTheta = theta - 90;
      if (positionTheta < 0) positionTheta = 360 + positionTheta; // normalize to all positive
      positionTheta = Math.round(positionTheta / step) * step;
      if (positionTheta === 360) positionTheta = 0;

      // in inner radius
      const isHour24 = this.#hour24 && x > -80 && x < 80 && y > -80 && y < 80;

      this.#selectedHour = this.#hourData.find(v => v.theta === `${positionTheta}` && (isHour24 ? v.is24 === true : v.is24 !== true)).hour;
      this.style.setProperty('--mdw-time-selector-selector-degrees', `${positionTheta}deg`);

    } else if (view === 'minute') {
      const step = this.#minuteStep * 6;
      let positionTheta = theta - 90;
      if (positionTheta < 0) positionTheta = 360 + positionTheta; // normalize to all positive
      const distanceFromMain = (Math.round(positionTheta / 30) * 30) - positionTheta;
      if (Math.abs(distanceFromMain) < 6) positionTheta += distanceFromMain; // favor main minutes
      positionTheta = Math.round(positionTheta / step) * step;
      if (positionTheta === 360) positionTheta = 0;

      this.#selectedMinute = this.#minuteData.find(v => v.theta === `${positionTheta}`).minute;
      this.style.setProperty('--mdw-time-selector-selector-degrees', `${positionTheta}deg`);
    }

    this.#updateSelection();
    event.stopPropagation();
    event.preventDefault();
  }

  #updateSelection(change = false) {
    const selector = this.#selector;
    if (this.#selectedHour !== undefined && this.#lastSelectedHour !== this.#selectedHour) {
      const isHourAnd24 = this.#hour24 && !!this.#hourData.find(v => v.hour === this.#selectedHour).is24; // TODO hour view
      selector.classList.toggle('mdw-hour-24', isHourAnd24);
      const currentHour = this.querySelector(`.mdw-dial-label[hour][selected]`);
      if (currentHour) currentHour.removeAttribute('selected');
      const nextHour = this.querySelector(`.mdw-dial-label[hour="${this.#selectedHour}"]`);
      if (nextHour) nextHour.setAttribute('selected', '');
      this.#lastSelectedHour = this.#selectedHour;
      change = true;
    }

    if (this.#selectedMinute !== undefined && this.#lastSelectedMinute !== this.#selectedMinute) {
      selector.classList.remove('mdw-hour-24');
      const currentMinute = this.querySelector(`.mdw-dial-label[minute][selected]`);
      if (currentMinute) currentMinute.removeAttribute('selected');
      const nextMinute = this.querySelector(`.mdw-dial-label[minute="${this.#selectedMinute}"]`);
      if (nextMinute) nextMinute.setAttribute('selected', '');
      this.#lastSelectedMinute = this.#selectedMinute;
      change = true;
    }

    if (!this.#hour24 && this.#selectedMeridiem !== undefined && this.#lastSelectedMeridiem !== this.#selectedMeridiem) {
      this.querySelector('.mdw-am').toggleAttribute('selected', this.#selectedMeridiem === 'AM');
      this.querySelector('.mdw-pm').toggleAttribute('selected', this.#selectedMeridiem === 'PM');
      this.#lastSelectedMeridiem = this.#selectedMeridiem;
      change = true;
    }

    if (change) {
      const view = this.#view;

      if (this.#hour24) {
        this.#updateDisplayValue24({ hour: this.#selectedHour });
        this.querySelector('.mdw-time-hour').innerText = this.#displayValue.split(':')[0];
        if (view === 'hour') selector.classList.toggle('mdw-hour-24', this.#selectedHour === '0' || this.#selectedHour > 12);
      } else {
        this.#updateDisplayValueMeridiem({ hour: this.#selectedHour, meridiem: this.#selectedMeridiem });
        const meridiemParts = this.#convert24ToMeridiemParts(this.#displayValue);
        this.querySelector('.mdw-time-hour').innerText = meridiemParts.paddedHour;
      }

      this.#updateDisplayValue24({ minute: this.#selectedMinute });
      this.querySelector('.mdw-time-minute').innerText = this.#displayValue.split(':')[1];

      selector.classList.remove('mdw-minute-secondary');
      let selectedTheta;
      if (view === 'hour') selectedTheta = this.#hourData.find(v => v.hour === `${this.#selectedHour}`).theta;
      else if (view === 'minute') {
        const selectedData = this.#minuteData.find(v => v.minute === `${this.#selectedMinute}`);
        selectedTheta = selectedData.theta;
        if (selectedData.display !== true) selector.classList.add('mdw-minute-secondary');
      }
      this.style.setProperty('--mdw-time-selector-selector-degrees', `${selectedTheta}deg`);
    }
  }

  #amClick() {
    this.querySelector('.mdw-am').setAttribute('selected', '');
    this.querySelector('.mdw-pm').removeAttribute('selected');
    this.#selectedMeridiem = 'AM';
    this.#updateDisplayValueMeridiem({ hour: this.#selectedHour, meridiem: 'AM' });
    this.#value = this.#displayValue;
  }

  #pmClick() {
    this.querySelector('.mdw-pm').setAttribute('selected', '');
    this.querySelector('.mdw-am').removeAttribute('selected');
    this.#selectedMeridiem = 'PM';
    this.#updateDisplayValueMeridiem({ hour: this.#selectedHour, meridiem: 'PM' });
    this.#value = this.#displayValue;
  }

  #onInput(event) {
    const parts = this.#hour24 ? this.#convertTo24Parts(event.target.value) : this.#convert24ToMeridiemParts(event.target.value);
    this.#selectedHour = parts.hour;
    this.#selectedMinute = parts.minute;
    if (!this.#hour24) this.#selectedMeridiem = parts.meridiem;
    this.#updateSelection();
  }

  #dialHourClick(event) {
    this.#selectedHour = event.target.getAttribute('hour');
    setTimeout(() => this.#switchView('minute'));
  }

  #dialMinuteClick(event) {
    if (this.#view !== 'minute') return;
    this.#selectMouseMove(event);
  }
});
