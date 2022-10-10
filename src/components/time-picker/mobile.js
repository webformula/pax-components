import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './mobile.css';

// TODO min max

customElements.define('mdw-time-picker-mobile', class MDWTimePickerDesktop extends HTMLElementExtended {
  useShadowRoot = false;

  #timePickerComponent;
  #displayTime;
  #min;
  #max;
  #step;
  #minHour;
  #maxHour;
  #meridiemScrollHandler_bound = this.#meridiemScrollHandler.bind(this);
  #meridiemScrollEndHandler_bound = this.#meridiemScrollEndHandler.bind(this);
  #hourScrollHandler_bound = this.#hourScrollHandler.bind(this);
  #hourScrollEndHandler_bound = this.#hourScrollEndHandler.bind(this);
  #minuteScrollHandler_bound = this.#minuteScrollHandler.bind(this);
  #minuteScrollEndHandler_bound = this.#minuteScrollEndHandler.bind(this);
  #secondScrollHandler_bound = this.#secondScrollHandler.bind(this);
  #secondScrollEndHandler_bound = this.#secondScrollEndHandler.bind(this);
  #onCancel_bound = this.#onCancel.bind(this);
  #onOk_bound = this.#onOk.bind(this);


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
    this.querySelector('.mdw-meridiem-container').removeEventListener('scroll', this.#meridiemScrollHandler_bound);
    this.querySelector('.mdw-meridiem-container').removeEventListener('touchend', this.#meridiemScrollEndHandler_bound);
    this.querySelector('.mdw-hour-container').removeEventListener('scroll', this.#hourScrollHandler_bound);
    this.querySelector('.mdw-hour-container').removeEventListener('touchend', this.#hourScrollEndHandler_bound);
    this.querySelector('.mdw-minute-container').removeEventListener('scroll', this.#minuteScrollHandler_bound);
    this.querySelector('.mdw-minute-container').removeEventListener('touchend', this.#minuteScrollEndHandler_bound);
    this.querySelector('#mdw-cancel').removeEventListener('click', this.#onCancel_bound);
    this.querySelector('#mdw-ok').removeEventListener('click', this.#onOk_bound);

    const secondsContainer = this.querySelector('.mdw-minute-container');
    if (secondsContainer) {
      this.querySelector('.mdw-second-container').removeEventListener('scroll', this.#secondScrollHandler_bound);
      this.querySelector('.mdw-second-container').removeEventListener('touchend', this.#secondScrollEndHandler_bound);
    }

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

    this.querySelector('.mdw-meridiem-container').addEventListener('scroll', this.#meridiemScrollHandler_bound);
    this.querySelector('.mdw-meridiem-container').addEventListener('touchend', this.#meridiemScrollEndHandler_bound);
    this.querySelector('.mdw-hour-container').addEventListener('scroll', this.#hourScrollHandler_bound);
    this.querySelector('.mdw-hour-container').addEventListener('touchend', this.#hourScrollEndHandler_bound);
    this.querySelector('.mdw-minute-container').addEventListener('scroll', this.#minuteScrollHandler_bound);
    this.querySelector('.mdw-minute-container').addEventListener('touchend', this.#minuteScrollEndHandler_bound);
    this.querySelector('#mdw-cancel').addEventListener('click', this.#onCancel_bound);
    this.querySelector('#mdw-ok').addEventListener('click', this.#onOk_bound);

    const secondsContainer = this.querySelector('.mdw-minute-container');
    if (secondsContainer) {
      this.querySelector('.mdw-second-container').addEventListener('scroll', this.#secondScrollHandler_bound);
      this.querySelector('.mdw-second-container').addEventListener('touchend', this.#secondScrollEndHandler_bound);
    }

    setTimeout(() => {
      this.#hourScrollHandler({ target: this.querySelector('.mdw-hour-container') });
      this.#minuteScrollHandler({ target: this.querySelector('.mdw-minute-container') });
    }, 100);
  }


  setDisplayTime(time = this.#displayTime, scroll = true) {
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
    if (scroll) currentHour.scrollIntoView({ block: 'center' });

    const selectedMinute = this.querySelector('.mdw-minute[selected]');
    if (selectedMinute) selectedMinute.removeAttribute('selected');
    const currentMinute = this.querySelector(`.mdw-minute[value="${displayMinute}"]`);
    currentMinute.setAttribute('selected', '');
    if (scroll) currentMinute.scrollIntoView({ block: 'center' });

    const selectedSecond = this.querySelector('.mdw-second[selected]');
    if (selectedSecond) selectedSecond.removeAttribute('selected');
    const currentSecond = this.querySelector(`.mdw-second[value="${displaySecond}"]`);
    if (currentSecond) {
      currentSecond.setAttribute('selected', '');
      if (scroll) currentSecond.scrollIntoView({ block: 'center' });
    }

    const selectedMeridiem = this.querySelector('.mdw-meridiem[selected]');
    if (selectedMeridiem) selectedMeridiem.removeAttribute('selected');
    this.querySelector(`.mdw-meridiem[value="${displayHour < 12 ? 'am' : 'pm'}"]`).setAttribute('selected', '');
  }

  // this handles mobile browsers having velocity scroll and overscroll
  async #waitForScrollToEnd(element) {
    return new Promise(resolve => {
      let lastScrollTop = element.scrollTop;
      const interval = setInterval(() => {
        if (lastScrollTop === element.scrollTop) {
          clearInterval(interval);
          resolve();
        } else lastScrollTop = element.scrollTop;
      }, 150);
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

  #onCancel(event) {
    this.#timePickerComponent.hide();
  }

  #onOk(event) {
    this.#timePickerComponent.setValue(this.#displayTime);
    this.#timePickerComponent.hide();
  }


  #meridiemScrollHandler(event) {
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
  }

  async #meridiemScrollEndHandler() {
    const container = this.querySelector('.mdw-meridiem-container');
    await this.#waitForScrollToEnd(container);

    const bounds = container.getBoundingClientRect();
    const contentOffset = 32;

    const positions = [...this.querySelectorAll('.mdw-meridiem')].map(element => {
      const elBounds = element.getBoundingClientRect();
      return {
        position: elBounds.y - bounds.y - contentOffset,
        element
      };
    });
    positions.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    const closest = positions.shift();
    const selected = this.querySelector('.mdw-meridiem[selected]');
    if (selected) selected.removeAttribute('selected');
    closest.element.scrollIntoView({ block: 'center', behavior: 'smooth' });


    if (!closest.element.hasAttribute('selected')) {
      let hour = parseInt(this.#displayTime.split(':')[0]);
      const minute = parseInt(this.#displayTime.split(':')[1]);
      const second = parseInt(this.#displayTime.split(':')[2] || 0);
      const meridiemOffset = closest.element.getAttribute('value') === 'am' ? 0 : 12;
      hour = parseInt(this.querySelector('.mdw-hour[selected]').getAttribute('value')) + meridiemOffset;
      this.setDisplayTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`, false);
    }

    closest.element.setAttribute('selected', '');
  }

  #hourScrollHandler(event) {
    const bounds = event.target.getBoundingClientRect();
    const deadZone = 32 / 2;
    const rotateScale = (event.target.offsetHeight / 2) - deadZone;
    const maxRotate = 70;
    const contentOffset = 61;

    [...event.target.querySelectorAll('.mdw-hour')].forEach((element, i) => {
      const elBounds = element.getBoundingClientRect();
      let position = elBounds.y - bounds.y - contentOffset;
      const rotateFactor = (Math.abs(position) - 18) / rotateScale;

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
  }

  #minuteScrollHandler(event) {
    const bounds = event.target.getBoundingClientRect();
    const deadZone = 32 / 2;
    const rotateScale = event.target.offsetHeight / 2;
    const maxRotate = 70;
    const contentOffset = 61;

    [...event.target.querySelectorAll('.mdw-minute')].forEach((element, i) => {
      const elBounds = element.getBoundingClientRect();
      let position = elBounds.y - bounds.y - contentOffset;
      const rotateFactor = (Math.abs(position) - 10) / rotateScale;

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
  }

  #secondScrollHandler(event) {
    const bounds = event.target.getBoundingClientRect();
    const deadZone = 32 / 2;
    const rotateScale = event.target.offsetHeight / 2;
    const maxRotate = 70;
    const contentOffset = 61;

    [...event.target.querySelectorAll('.mdw-second')].forEach((element, i) => {
      const elBounds = element.getBoundingClientRect();
      let position = elBounds.y - bounds.y - contentOffset;
      const rotateFactor = (Math.abs(position) - 10) / rotateScale;

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
  }

  async #hourScrollEndHandler() {
    const container = this.querySelector('.mdw-hour-container');
    await this.#waitForScrollToEnd(container);

    const bounds = container.getBoundingClientRect();
    const contentOffset = 61;

    const positions = [...this.querySelectorAll('.mdw-hour')].map(element => {
      const elBounds = element.getBoundingClientRect();
      return {
        position: elBounds.y - bounds.y - contentOffset,
        element
      };
    });
    positions.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    const selected = this.querySelector('.mdw-hour[selected]');
    if (selected) selected.removeAttribute('selected');
    const closest = positions.shift();
    closest.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (!closest.element.hasAttribute('selected')) {
      const displayHour = parseInt(this.#displayTime.split(':')[0]);
      const meridiemOffset = displayHour < 12 ? 0 : 12;
      const hour = parseInt(closest.element.getAttribute('value')) + meridiemOffset;
      const minute = parseInt(this.#displayTime.split(':')[1]);
      const second = parseInt(this.#displayTime.split(':')[2] || 0);
      this.setDisplayTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`, false);
    }

    closest.element.setAttribute('selected', '');
  }

  async #minuteScrollEndHandler() {
    const container = this.querySelector('.mdw-minute-container');
    await this.#waitForScrollToEnd(container);

    const bounds = container.getBoundingClientRect();
    const contentOffset = 61;

    const positions = [...this.querySelectorAll('.mdw-minute')].map(element => {
      const elBounds = element.getBoundingClientRect();
      return {
        position: elBounds.y - bounds.y - contentOffset,
        element
      };
    });
    positions.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    const selected = this.querySelector('.mdw-minute[selected]');
    if (selected) selected.removeAttribute('selected');
    const closest = positions.shift();
    closest.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (!closest.element.hasAttribute('selected')) {
      const hour = parseInt(this.#displayTime.split(':')[0]);
      const minute = parseInt(closest.element.getAttribute('value'))
      const second = parseInt(this.#displayTime.split(':')[2] || 0);
      this.setDisplayTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`, false);
    }

    closest.element.setAttribute('selected', '');
  }

  async #secondScrollEndHandler() {
    const container = this.querySelector('.mdw-second-container');
    await this.#waitForScrollToEnd(container);

    const bounds = container.getBoundingClientRect();
    const contentOffset = 61;

    const positions = [...this.querySelectorAll('.mdw-second')].map(element => {
      const elBounds = element.getBoundingClientRect();
      return {
        position: elBounds.y - bounds.y - contentOffset,
        element
      };
    });
    positions.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    const selected = this.querySelector('.mdw-second[selected]');
    if (selected) selected.removeAttribute('selected');
    const closest = positions.shift();
    closest.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (!closest.element.hasAttribute('selected')) {
      const hour = parseInt(this.#displayTime.split(':')[0]);
      const minute = parseInt(closest.element.getAttribute('value'))
      const second = parseInt(this.#displayTime.split(':')[2] || 0);
      this.setDisplayTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`, false);
    }

    closest.element.setAttribute('selected', '');
  }
  

  template() {
    const displayHour = parseInt(this.#displayTime.split(':')[0]);
    const displayMinute = parseInt(this.#displayTime.split(':')[1]);
    const displaySecond = parseInt(this.#displayTime.split(':')[2] || 0);
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
        
        ${this.#step % 60 === 0 ? '' : /*html*/`
          <div class="mdw-second-container">
            <div class="mdw-second-spacer"></div>
            ${[...new Array(Math.max(1, Math.floor(60 / this.#step))).keys()].map((_, i) => {
              const second = i * this.#step;
              const minDiff = this.#getTimeDifference(`${displayHour}:${displayMinute}:${second}`, this.#min);
              const maxDiff = this.#getTimeDifference(this.#max, `${displayHour}:${displayMinute}:${second}`);
              const outOfRange = minDiff.second <= 0 || maxDiff.second >= 0;
              const selected = displaySecond === second;
              return /*html*/`
                <div class="mdw-second${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${second}">
                  ${second.toString().padStart(2, '0')}
                </div>
              `;
            }).join('\n') }
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
      const maxDiff = this.#getTimeDifference(this.#max, `${displayHour}:${minute}`);
      const outOfRange = minDiff.minute <= 0 || maxDiff.minute >= 0;
      const selected = displayMinute === minute;
      return `<div class="mdw-minute${outOfRange ? ' mdw-out-of-range' : ''}"${selected ? ' selected' : ''} value="${minute}">${minute.toString().padStart(2, '0')}</div>`
    }).join('\n');
  }
});
