import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './desktop.css';

// TODO infinite scroll

customElements.define('mdw-time-picker-desktop', class MDWTimePickerDesktop extends HTMLElementExtended {
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
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick_bound);
  }

  afterRender() {
    const selectedHour = this.querySelector('.mdw-hour[selected]');
    if (selectedHour) {
      selectedHour.scrollIntoView();
      this.querySelector('.mdw-hour-container').scrollTop -= 6;
    }
    const selectedMinute = this.querySelector('.mdw-minute[selected]');
    if (selectedMinute) {
      selectedMinute.scrollIntoView();
      this.querySelector('.mdw-minute-container').scrollTop -= 6;
    }
    const selectedSecond = this.querySelector('.mdw-second[selected]');
    if (selectedSecond) {
      selectedSecond.scrollIntoView();
      this.querySelector('.mdw-second-container').scrollTop -= 6;
    }

    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    if (displayHour < 12) {
      this.querySelector('.mdw-meridiem[value="am"]').setAttribute('selected', '');
      this.querySelector('.mdw-meridiem[value="pm"]').removeAttribute('selected');
    } else {
      this.querySelector('.mdw-meridiem[value="pm"]').setAttribute('selected', '');
      this.querySelector('.mdw-meridiem[value="am"]').removeAttribute('selected');
    }

    this.addEventListener('click', this.#onClick_bound);
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
    if (!this.#isInView(currentHour)) {
      currentHour.scrollIntoView();
      currentHour.parentNode.scrollTop -= 6;
    }

    const selectedMinute = this.querySelector('.mdw-minute[selected]');
    if (selectedMinute) selectedMinute.removeAttribute('selected');
    const currentMinute = this.querySelector(`.mdw-minute[value="${displayMinute}"]`);
    currentMinute.setAttribute('selected', '');
    if (!this.#isInView(currentMinute)) {
      currentMinute.scrollIntoView();
      currentMinute.parentNode.scrollTop -= 6;
    }

    const selectedSecond = this.querySelector('.mdw-second[selected]');
    if (selectedSecond) selectedSecond.removeAttribute('selected');
    const currentSecond = this.querySelector(`.mdw-second[value="${displaySecond}"]`);
    if (currentSecond)  {
      currentSecond.setAttribute('selected', '');
      if (!this.#isInView(currentSecond)) {
        currentSecond.scrollIntoView();
        currentSecond.parentNode.scrollTop -= 6;
      }
    }

    const selectedMeridiem = this.querySelector('.mdw-meridiem[selected]');
    if (selectedMeridiem) selectedMeridiem.removeAttribute('selected');
    this.querySelector(`.mdw-meridiem[value="${displayHour < 12 ? 'am' : 'pm'}"]`).setAttribute('selected', '');
  }

  #isInView(element) {
    const bounds = element.getBoundingClientRect();
    const parentBounds = element.parentNode.getBoundingClientRect();
    if (bounds.y >= parentBounds.y && bounds.y + bounds.height <= parentBounds.y + parentBounds.height) return true;
    return false;
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
    const displayMinute = parseInt(this.#displayTime.split(':')[1]);
    const displaySecond = parseInt(this.#displayTime.split(':')[2] || 0);
    const stepMinutes = Math.max(1, Math.floor(this.#step / 60));
    const meridiemOffset = displayHour < 12 ? 0 : 12;

    return /* html */`
      <div class="mdw-hour-container">
        ${[...new Array(12).keys()].map((_, i) => {
          const hour = i + 1;
          const meridiemHour = hour + meridiemOffset;
          const outOfRange = meridiemHour < this.#minHour || meridiemHour > this.#maxHour;
          const selected = displayHour === meridiemHour;
          return /*html*/`
            <div class="mdw-hour${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${hour}">
              ${hour.toString().padStart(2, '0') }
            </div>
          `;
        }).join('\n')}
      </div>

      <div class="mdw-minute-container">
          ${[...new Array(Math.floor(60 / stepMinutes)).keys()].map((_, i) => {
            const minute = i * stepMinutes;
            const minDiff = util.getInputTimeDifference(`${displayHour}:${minute}`, this.#min);
            const maxDiff = util.getInputTimeDifference(this.#max, `${displayHour}:${minute}`);
            const outOfRange = minDiff.minute < 0 || maxDiff.minute > 0;
            const selected = displayMinute === minute;
            return /*html*/`
              <div class="mdw-minute${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${minute}">
                ${minute.toString().padStart(2, '0')}
              </div>
            `;
          }).join('\n') }
      </div>

      ${this.#step % 60 === 0 ? '' : `
        <div class="mdw-second-container">
          ${this.#step % 60 === 0 ? '' : /*html*/`
            <div class="mdw-second-container">
              ${[...new Array(Math.max(1, Math.floor(60 / this.#step))).keys()].map((_, i) => {
                const second = i * this.#step;
                const minDiff = util.getInputTimeDifference(`${displayHour}:${displayMinute}:${second}`, this.#min);
                const maxDiff = util.getInputTimeDifference(this.#max, `${displayHour}:${displayMinute}:${second}`);
                const outOfRange = minDiff.second < 0 || maxDiff.second > 0;
                const selected = displaySecond === second;
                return /*html*/`
                  <div class="mdw-second${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${second}">
                    ${second.toString().padStart(2, '0')}
                  </div>
                `;
              }).join('\n')}
            </div>
          `}
        </div>
      `}

      <div class="mdw-meridiem-container">
        <div class="mdw-meridiem" value="am">AM</div>
        <div class="mdw-meridiem" value="pm">PM</div>
      </div>
    `;
  }
});
