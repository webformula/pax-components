import MDWPanelElement from '../panel/component.js';
import './time-picker-desktop.css';
import keyboardSVGIcon from '../../svg-icons/keyboard_FILL0_wght400_GRAD0_opsz24.svg';


customElements.define('mdw-time-picker-desktop', class MDWTimePickerDesktopElement extends MDWPanelElement {
  useTemplate = false;

  #close_bound = this.#close.bind(this);
  #onShow_bound = this.#onShow.bind(this);
  #selectMouseDown_bound = this.#selectMouseDown.bind(this);
  #selectMouseUp_bound = this.#selectMouseUp.bind(this);
  #selectMouseMove_bound = this.#selectMouseMove.bind(this);
  #amClick_bound = this.#amClick.bind(this);
  #pmClick_bound = this.#pmClick.bind(this);
  #onInput_bound = this.#onInput.bind(this);
  #selectedHour;
  #lastSelectedHour;
  #selectedMinutes;
  #lastSelectedMinutes;
  #selectedMeridiem;
  #lastSelectedMeridiem;
  #hourThetas = {
    '0': ['12', '12'],
    '30': ['1', '01'],
    '60': ['2', '02'],
    '90': ['3', '03'],
    '-270': ['3', '03'],
    '-240': ['4', '04'],
    '-210': ['5', '05'],
    '-180': ['6', '06'],
    '-150': ['7', '07'],
    '-120': ['8', '08'],
    '-90': ['9', '09'],
    '-60': ['10', '10'],
    '-30': ['11', '11']
  }

  constructor() {
    super();

    this.animation = 'scale';
    this.backdrop = false;
    this.clickOutsideClose = true;
    this.target = this.parentElement.control;

    this.addClickOutsideCloseIgnore(this.parentElement.control);
  }

  afterRender() {
    const parts = this.#convert24ToMeridiemParts(this.#displayValue);
    const selectedTheta = Object.entries(this.#hourThetas).find(v => v[1][1] === parts.hour)[0];
    this.style.setProperty('--mdw-time-selector-selector-degrees', `${selectedTheta}deg`);
    this.addEventListener('open', this.#onShow_bound);
    this.querySelector('.mdw-am').addEventListener('click', this.#amClick_bound);
    this.querySelector('.mdw-pm').addEventListener('click', this.#pmClick_bound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('open', this.#onShow_bound);
    this.querySelector('.mdw-am').removeEventListener('click', this.#amClick_bound);
    this.querySelector('.mdw-pm').removeEventListener('click', this.#pmClick_bound);
    this.#selector.removeEventListener('mousedown', this.#selectMouseDown_bound);
    window.removeEventListener('mouseup', this.#selectMouseUp_bound);
    window.removeEventListener('mousemove', this.#selectMouseMove_bound);
    this.#input.removeEventListener('input', this.#onInput_bound);
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

  get #min() {
    return this.parentElement.min;
  }

  get #max() {
    return this.parentElement.max;
  }

  get #selector() {
    return this.querySelector('.mdw-selector');
  }

  template() {
    const parts = this.#convert24ToMeridiemParts(this.#displayValue);

    return /*html*/`
      <div class="mdw-headline">Select time</div>

      <div class="mdw-time-container">
        <div class="mdw-time-hour">${parts.hour}</div>
        <div class="mdw-time-separator">:</div>
        <div class="mdw-time-minute">${parts.minute}</div>

        <div class="mdw-meridiem-container">
          <div class="mdw-am" ${parts.meridiem === 'AM' ? 'selected' : ''}>AM</div>
          <div class="mdw-pm" ${parts.meridiem === 'PM' ? 'selected' : ''}>PM</div>
        </div>
      </div>

      <div class="mdw-dial-container">
        <div class="mdw-dial-label" hour="12" ${parts.hour === '12' ? 'selected' : ''}>12</div>
        <div class="mdw-dial-label" hour="1" ${parts.hour === '01' ? 'selected' : ''}>1</div>
        <div class="mdw-dial-label" hour="2" ${parts.hour === '02' ? 'selected' : ''}>2</div>
        <div class="mdw-dial-label" hour="3" ${parts.hour === '03' ? 'selected' : ''}>3</div>
        <div class="mdw-dial-label" hour="4" ${parts.hour === '04' ? 'selected' : ''}>4</div>
        <div class="mdw-dial-label" hour="5" ${parts.hour === '05' ? 'selected' : ''}>5</div>
        <div class="mdw-dial-label" hour="6" ${parts.hour === '06' ? 'selected' : ''}>6</div>
        <div class="mdw-dial-label" hour="7" ${parts.hour === '07' ? 'selected' : ''}>7</div>
        <div class="mdw-dial-label" hour="8" ${parts.hour === '08' ? 'selected' : ''}>8</div>
        <div class="mdw-dial-label" hour="9" ${parts.hour === '09' ? 'selected' : ''}>9</div>
        <div class="mdw-dial-label" hour="10" ${parts.hour === '10' ? 'selected' : ''}>10</div>
        <div class="mdw-dial-label" hour="11" ${parts.hour === '11' ? 'selected' : ''}>11</div>

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

  #updateDisplayValueMeridiem({ hour, minute, meridiem }) {
    return this.parentElement.updateDisplayValueMeridiem({ hour, minute, meridiem });
  }

  #convert24ToMeridiemParts(time) {
    return this.parentElement.convert24ToMeridiemParts(time);
  }

  #onShow() {
    const parts = this.#convert24ToMeridiemParts(this.#displayValue);
    this.#selectedHour = parseInt(parts.hour);
    this.#selectedMinutes = parseInt(parts.minute);
    this.#selectedMeridiem = parts.meridiem;

    this.#selector.addEventListener('mousedown', this.#selectMouseDown_bound);
    this.#input.addEventListener('input', this.#onInput_bound);
  }

  #close() {
    this.#selector.removeEventListener('mousedown', this.#selectMouseDown_bound);
    window.removeEventListener('mouseup', this.#selectMouseUp_bound);
    window.removeEventListener('mousemove', this.#selectMouseMove_bound);
    this.#input.removeEventListener('input', this.#onInput_bound);
    this.close();
  }

  #selectMouseDown() {
    window.addEventListener('mouseup', this.#selectMouseUp_bound);
    window.addEventListener('mousemove', this.#selectMouseMove_bound);
  }

  #selectMouseUp() {
    window.removeEventListener('mouseup', this.#selectMouseUp_bound);
    window.removeEventListener('mousemove', this.#selectMouseMove_bound);
  }

  #selectMouseMove(event) {
    const center = this.querySelector('.mdw-selector-center');
    const centerBounds = center.getBoundingClientRect();
    const x = centerBounds.x - event.clientX;
    const y = centerBounds.y - event.clientY;
    const theta = Math.atan2(y, x) * (180 / Math.PI);
    const positionTheta = this.#snapTheta(theta) - 90;
    this.#selectedHour = parseInt(this.#hourThetas[positionTheta][0]);
    this.style.setProperty('--mdw-time-selector-selector-degrees', `${positionTheta}deg`);
    this.#updateSelection();
    event.stopPropagation();
    event.preventDefault();
  }

  #snapTheta(value) {
    const inverse = 1 / 30;
    return Math.round(value * inverse) / inverse;
  }

  #updateSelection() {
    let change = false;

    if (this.#selectedHour !== undefined && this.#lastSelectedHour !== this.#selectedHour) {
      const currentHour = this.querySelector(`.mdw-dial-label[hour][selected]`);
      if (currentHour) currentHour.removeAttribute('selected');
      const nextHour = this.querySelector(`.mdw-dial-label[hour="${this.#selectedHour}"]`);
      if (nextHour) nextHour.setAttribute('selected', '');
      this.#lastSelectedHour = this.#selectedHour;
      change = true;
    }

    if (this.#selectedMinutes !== undefined && this.#lastSelectedMinutes !== this.#selectedMinutes) {
      this.#lastSelectedMinutes = this.#selectedMinutes;
      change = true;
    }

    if (this.#selectedMeridiem !== undefined && this.#lastSelectedMeridiem !== this.#selectedMeridiem) {
      this.querySelector('.mdw-am').toggleAttribute('selected', this.#selectedMeridiem === 'AM');
      this.querySelector('.mdw-pm').toggleAttribute('selected', this.#selectedMeridiem === 'PM');
      this.#lastSelectedMeridiem = this.#selectedMeridiem;
      change = true;
    }

    if (change) {
      this.#updateDisplayValueMeridiem({ hour: this.#selectedHour, meridiem: this.#selectedMeridiem });
      const meridiemParts = this.#convert24ToMeridiemParts(this.#displayValue);
      this.querySelector('.mdw-time-hour').innerText = meridiemParts.hour;
      this.#value = this.#displayValue;
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
    const meridiemParts = this.#convert24ToMeridiemParts(event.target.value);
    this.#selectedHour = parseInt(meridiemParts.hour);
    this.#selectedMinutes = parseInt(meridiemParts.minutes);
    this.#selectedMeridiem = meridiemParts.meridiem;
    this.#updateSelection();
    const selectedTheta = Object.entries(this.#hourThetas).find(v => v[1][1] === meridiemParts.hour)[0];
    this.style.setProperty('--mdw-time-selector-selector-degrees', `${selectedTheta}deg`);
  }
});
