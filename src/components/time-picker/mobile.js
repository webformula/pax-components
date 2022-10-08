import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import util from '../../core/util.js';
import './mobile.css';

// TODO infinite scroll
// TODO tooltips

customElements.define('mdw-time-picker-mobile', class MDWTimePickerDesktop extends HTMLElementExtended {
  useShadowRoot = false;

  #timePickerComponent;
  #displayTime;
  #min;
  #max;
  #step;
  #minHour;
  #maxHour;
  #onClick_bound = this.#onClick.bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#timePickerComponent = document.querySelector(`#${this.getAttribute('mdw-time-picker-id')}`);
    this.#displayTime = this.#timePickerComponent.value;
    this.#min = this.#timePickerComponent.min;
    this.#max = this.#timePickerComponent.max;
    this.#step = this.#timePickerComponent.step;
    this.#minHour = parseInt(this.#min.split(':')[0]);
    this.#maxHour = parseInt(this.#max.split(':')[0]);
    this.render();
    util.lockPageScroll();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick_bound);
    util.unlockPageScroll();
  }

  afterRender() {
    const selectedHour = this.querySelector('.mdw-hour[selected]');
    if (selectedHour) selectedHour.scrollIntoView({ block: 'center' });

    const selectedMinute = this.querySelector('.mdw-minute[selected]');
    if (selectedMinute) selectedMinute.scrollIntoView({ block: 'center' });

    const selectedSecond = this.querySelector('.mdw-second[selected]');
    if (selectedSecond) selectedSecond.scrollIntoView({ block: 'center' });

    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    if (displayHour < 12) {
      this.querySelector('.mdw-meridiem[value="am"]').setAttribute('selected', '');
      this.querySelector('.mdw-meridiem[value="pm"]').removeAttribute('selected');
    } else {
      this.querySelector('.mdw-meridiem[value="pm"]').setAttribute('selected', '');
      this.querySelector('.mdw-meridiem[value="am"]').removeAttribute('selected');
    }

    this.addEventListener('click', this.#onClick_bound);

    this.querySelector('.mdw-meridiem-container').addEventListener('scroll', event => {
      const bounds = event.target.getBoundingClientRect();
      const deadZone = 32 / 2;
      const rotateScale = (event.target.offsetHeight / 2) - deadZone;
      const maxRotate = 30;
      const contentOffset = 32;

      [...event.target.querySelectorAll('.mdw-meridiem')].forEach((element, i) => {
        const elBounds = element.getBoundingClientRect();
        const position = elBounds.y - bounds.y - (i * contentOffset);
        const rotateFactor = (Math.abs(position) - deadZone) / rotateScale;

        // if (element.getAttribute('value') === 'am') console.log(position);
        if (Math.abs(position) <= deadZone) {
          element.style.transform = '';
        } else {
          element.style.transform = `rotate3D(1, 0, 0, ${rotateFactor * maxRotate}deg)`;
        }
      });
    });

    this.querySelector('.mdw-minute-container').addEventListener('scroll', event => {
      const bounds = event.target.getBoundingClientRect();
      const deadZone = 32 / 2;
      const rotateScale = (event.target.offsetHeight / 2) - deadZone;
      const maxRotate = 70;
      const contentOffset = 61;

      [...event.target.querySelectorAll('.mdw-minute')].forEach((element, i) => {
        const elBounds = element.getBoundingClientRect();
        let position = elBounds.y - bounds.y - contentOffset;
        const rotateFactor = (Math.abs(position) - deadZone) / rotateScale;

        // if (element.getAttribute('value') === '0') console.log(position);
        if (Math.abs(position) <= deadZone) {
          element.style.transform = '';
        } else {
          let yMovement = Math.pow((position + 1) * 0.05, 2);
          if (position > 0) yMovement *= -1;
          if (yMovement > 20) yMovement = 20;
          if (yMovement < -20) yMovement = -20;
          element.style.transform = `translateZ(-${Math.abs(position)}px) translateY(${yMovement}px) rotateX(${rotateFactor * maxRotate}deg)`;
        }
      });
    });

    this.querySelector('.mdw-hour-container').addEventListener('scroll', event => {
      const bounds = event.target.getBoundingClientRect();
      const deadZone = 32 / 2;
      const rotateScale = (event.target.offsetHeight / 2) - deadZone;
      const maxRotate = 70;
      const contentOffset = 61;

      [...event.target.querySelectorAll('.mdw-hour')].forEach((element, i) => {
        const elBounds = element.getBoundingClientRect();
        let position = elBounds.y - bounds.y - contentOffset;
        const rotateFactor = (Math.abs(position) - deadZone) / rotateScale;

        // if (element.getAttribute('value') === '1') console.log(position);
        if (Math.abs(position) <= deadZone) {
          element.style.transform = '';
        } else {
          let yMovement = Math.pow((position + 1) * 0.05, 2);
          if (position > 0) yMovement *= -1;
          if (yMovement > 20) yMovement = 20;
          if (yMovement < -20) yMovement = -20;
          element.style.transform = `translateZ(-${Math.abs(position)}px) translateY(${yMovement}px) rotateX(${rotateFactor * maxRotate}deg)`;
        }
      });
    });
  }

  #getTimeDifference(timeA, timeB) {
    const timeAHour = parseInt(timeA.split(':')[0]);
    const timeAMinute = parseInt(timeA.split(':')[1]);
    const timeASecond = parseInt(timeA.split(':')[2] || 0);
    const timeBHour = parseInt(timeB.split(':')[0]);
    const timeBMinute = parseInt(timeB.split(':')[1]);
    const timeBSecond = parseInt(timeB.split(':')[2] || 0);
    const hour = timeAHour - timeBHour;
    const minute = timeAMinute - timeBMinute;
    const second = timeASecond - timeBSecond;
    return {
      hour,
      minute,
      second
    };
  }

  setDisplayTime(time = this.#displayTime) {
    // remove seconds based on step
    if (this.#step % 60 === 0) this.#displayTime = time.split(':').slice(0, 2).join(':');
    else this.#displayTime = time;

    let displayHour = parseInt(this.#displayTime.split(':')[0]);
    if (displayHour === 0) displayHour = 12;
    const displayMinute = parseInt(this.#displayTime.split(':')[1]);
    const displaySecond = parseInt(this.#displayTime.split(':')[2] || 0);
    const displayMeridiemOffset = displayHour <= 12 ? 0 : 12;

    const selectedHour = this.querySelector('.mdw-hour[selected]');
    if (selectedHour) selectedHour.removeAttribute('selected');
    const currentHour = this.querySelector(`.mdw-hour[value="${displayHour - displayMeridiemOffset}"]`);
    currentHour.setAttribute('selected', '');
    currentHour.scrollIntoView({ block: 'center' });

    const selectedMinute = this.querySelector('.mdw-minute[selected]');
    if (selectedMinute) selectedMinute.removeAttribute('selected');
    const currentMinute = this.querySelector(`.mdw-minute[value="${displayMinute}"]`);
    currentMinute.setAttribute('selected', '');
    currentMinute.scrollIntoView({ block: 'center' });

    const selectedSecond = this.querySelector('.mdw-second[selected]');
    if (selectedSecond) selectedSecond.removeAttribute('selected');
    const currentSecond = this.querySelector(`.mdw-second[value="${displaySecond}"]`);
    if (currentSecond) {
      currentSecond.setAttribute('selected', '');
      currentSecond.scrollIntoView({ block: 'center' });
    }

    const selectedMeridiem = this.querySelector('.mdw-meridiem[selected]');
    if (selectedMeridiem) selectedMeridiem.removeAttribute('selected');
    this.querySelector(`.mdw-meridiem[value="${displayHour < 12 ? 'am' : 'pm'}"]`).setAttribute('selected', '');
  }

  #onClick(event) {
    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    let meridiemOffset = displayHour < 12 ? 0 : 12;
    let hour = parseInt(this.#displayTime.split(':')[0]);
    let minute = parseInt(this.#displayTime.split(':')[1]);
    let second = parseInt(this.#displayTime.split(':')[2] || 0);

    if (event.target.classList.contains('mdw-hour')) hour = parseInt(event.target.getAttribute('value')) + meridiemOffset;
    else if (event.target.classList.contains('mdw-minute')) minute = parseInt(event.target.getAttribute('value'));
    else if (event.target.classList.contains('mdw-second')) second = parseInt(event.target.getAttribute('value'));
    else if (event.target.classList.contains('mdw-meridiem') && !event.target.hasAttribute('selected')) {
      meridiemOffset = event.target.getAttribute('value') === 'am' ? 0 : 12;
      hour = parseInt(this.querySelector('.mdw-hour[selected]').getAttribute('value')) + meridiemOffset;
    }

    this.setDisplayTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`);
    this.#timePickerComponent.setValue(this.#displayTime);
  }


  template() {
    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    const meridiemOffset = displayHour < 12 ? 0 : 12;

    return /* html */`
      <div class="mdw-time-container">
        <div class="mdw-hour-container">
          <div class="mdw-hour-spacer"></div>
          ${[...new Array(12).keys()].map((_, i) => {
        const hour = i + 1;
        const hourDisplay = hour.toString().padStart(2, '0');
        const meridiemHour = hour + meridiemOffset;
        const outOfRange = meridiemHour < this.#minHour || meridiemHour > this.#maxHour;
        const selected = displayHour === meridiemHour;
        return `<div class="mdw-hour${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${hour}">${hourDisplay}</div>`
      }).join('\n')}
        </div>

        <div class="mdw-minute-container">
            <div class="mdw-minute-spacer"></div>
            ${this.#minuteTemplate()}
        </div>
        
        ${this.#step % 60 === 0 ? '' : `
          <div class="mdw-second-container">
              ${this.#secondsTemplate()}
          </div>
        `}

        <div class="mdw-meridiem-container">
          <div class="mdw-meridiem" value="am">AM</div>
          <div class="mdw-meridiem" value="pm">PM</div>
        </div>

        <div class="mdw-meridiem-mask"></div>

        <div class="mdw-select-area"></div>
      </div>

      <div class="mdw-actions-container">
        <mdw-button id="mdw-cancel">Cancel</mdw-button>
        <mdw-button id="mdw-ok">Ok</mdw-button>
      </div>
    `;
  }

  #minuteTemplate() {
    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    const displayMinute = parseInt(this.#displayTime.split(':')[1]);
    const stepMinutes = Math.max(1, Math.floor(this.#step / 60));
    return [...new Array(Math.floor(60 / stepMinutes)).keys()].map((_, i) => {
      const minute = i * stepMinutes;
      const minDiff = this.#getTimeDifference(`${displayHour}:${minute}`, this.#min);
      const isOutOfMinRange = minDiff.hour < 0 || (minDiff.hour === 0 && minDiff.minute <= 0);
      const maxDiff = this.#getTimeDifference(this.#max, `${displayHour}:${minute}`);
      const isOutOfMaxRange = maxDiff.hour < 0 || (maxDiff.hour === 0 && maxDiff.minute <= 0);
      const outOfRange = isOutOfMinRange || isOutOfMaxRange;
      const selected = displayMinute === minute;
      return `<div class="mdw-minute${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${minute}">${minute.toString().padStart(2, '0')}</div>`
    }).join('\n');
  }

  #secondsTemplate() {
    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    const displayMinute = parseInt(this.#displayTime.split(':')[1]);
    const displaySecond = parseInt(this.#displayTime.split(':')[2] || 0);

    return [...new Array(Math.max(1, Math.floor(60 / this.#step))).keys()].map((_, i) => {
      const second = i * this.#step;
      const minDiff = this.#getTimeDifference(`${displayHour}:${displayMinute}:${second}`, this.#min);
      const isOutOfMinRange = minDiff.hour < 0 || (minDiff.hour === 0 && minDiff.minute === 0 && minDiff.second <= 0);
      const maxDiff = this.#getTimeDifference(this.#max, `${displayHour}:${displayMinute}:${second}`);
      const isOutOfMaxRange = maxDiff.hour < 0 || (maxDiff.hour === 0 && maxDiff.minute === 0 && maxDiff.second <= 0);
      const outOfRange = isOutOfMinRange || isOutOfMaxRange;
      const selected = displaySecond === second;
      return `<div class="mdw-second${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${second}">${second.toString().padStart(2, '0')}</div>`
    }).join('\n');
  }
});
