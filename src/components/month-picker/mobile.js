import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import './mobile.css';

customElements.define('mdw-month-picker-mobile', class MDWMonthPickerMobile extends HTMLElementExtended {
  useShadowRoot = false;

  #monthPickerComponent;
  #displayDate = '';
  #monthNames = [
    'January', 'Feudary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'
  ];
  #monthScrollHandler_bound = this.#monthScrollHandler.bind(this);
  #monthScrollEndHandler_bound = this.#monthScrollEndHandler.bind(this);
  #yearScrollHandler_bound = this.#yearScrollHandler.bind(this);
  #yearScrollEndHandler_bound = this.#yearScrollEndHandler.bind(this);
  #onCancel_bound = this.#onCancel.bind(this);
  #onOk_bound = this.#onOk.bind(this);



  constructor() {
    super();
  }

  connectedCallback() {
    this.#monthPickerComponent = document.querySelector(`#${this.getAttribute('mdw-month-picker-id')}`);
    this.#displayDate = dateUtil.parse(this.#monthPickerComponent.displayDate);
    this.render();
  }

  afterRender() {
    const selectedMonth = this.querySelector('.mdw-month[selected]');
    if (selectedMonth) selectedMonth.scrollIntoView({ block: 'center' });

    const selectedYear = this.querySelector('.mdw-year[selected]');
    if (selectedYear) selectedYear.scrollIntoView({ block: 'center' });

    this.querySelector('.mdw-months-container').addEventListener('scroll', this.#monthScrollHandler_bound);
    this.querySelector('.mdw-months-container').addEventListener('touchend', this.#monthScrollEndHandler_bound);
    this.querySelector('.mdw-years-container').addEventListener('scroll', this.#yearScrollHandler_bound);
    this.querySelector('.mdw-years-container').addEventListener('touchend', this.#yearScrollEndHandler_bound);
    this.querySelector('#mdw-cancel').addEventListener('click', this.#onCancel_bound);
    this.querySelector('#mdw-ok').addEventListener('click', this.#onOk_bound);

    setTimeout(() => {
      this.#monthScrollHandler({ target: this.querySelector('.mdw-months-container') });
      this.#yearScrollHandler({ target: this.querySelector('.mdw-years-container') });
    }, 100);
  }

  disconnectedCallback() {
    this.querySelector('.mdw-months-container').removeEventListener('scroll', this.#monthScrollHandler_bound);
    this.querySelector('.mdw-months-container').removeEventListener('touchend', this.#monthScrollEndHandler_bound);
    this.querySelector('.mdw-years-container').removeEventListener('scroll', this.#yearScrollHandler_bound);
    this.querySelector('.mdw-years-container').removeEventListener('touchend', this.#yearScrollEndHandler_bound);
    this.querySelector('#mdw-cancel').removeEventListener('click', this.#onCancel_bound);
    this.querySelector('#mdw-ok').removeEventListener('click', this.#onOk_bound);

  }

  setDisplayDate(date) {
    this.#updateDisplayDate(dateUtil.parse(date));
  }

  #onCancel() {
    this.#monthPickerComponent.hide();
  }

  #onOk() {
    this.#monthPickerComponent.setValue(dateUtil.format(this.#displayDate, 'YYYY-MM'));
    this.#monthPickerComponent.hide();
  }

  #updateDisplayDate(date) {
    this.#displayDate = date;
  }

  #monthScrollHandler(event) {
    const bounds = event.target.getBoundingClientRect();
    const deadZone = 32 / 2;
    const rotateScale = (event.target.offsetHeight / 2) - deadZone;
    const maxRotate = 70;
    const contentOffset = 61;

    [...event.target.querySelectorAll('.mdw-month')].forEach((element, i) => {
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

  async #monthScrollEndHandler() {
    const container = this.querySelector('.mdw-months-container');
    await this.#waitForScrollToEnd(container);

    const bounds = container.getBoundingClientRect();
    const contentOffset = 61;

    const positions = [...this.querySelectorAll('.mdw-month')].map(element => {
      const elBounds = element.getBoundingClientRect();
      return {
        position: elBounds.y - bounds.y - contentOffset,
        element
      };
    });
    positions.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    const selected = this.querySelector('.mdw-month[selected]');
    if (selected) selected.removeAttribute('selected');
    const closest = positions.shift();
    closest.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (!closest.element.hasAttribute('selected')) {
      this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { month: closest .element.getAttribute('value') }));
    }

    closest.element.setAttribute('selected', '');
  }

  #yearScrollHandler(event) {
    const bounds = event.target.getBoundingClientRect();
    const deadZone = 32 / 2;
    const rotateScale = (event.target.offsetHeight / 2) - deadZone;
    const maxRotate = 70;
    const contentOffset = 61;

    [...event.target.querySelectorAll('.mdw-year')].forEach((element, i) => {
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

  async #yearScrollEndHandler() {
    const container = this.querySelector('.mdw-years-container');
    await this.#waitForScrollToEnd(container);

    const bounds = container.getBoundingClientRect();
    const contentOffset = 61;

    const positions = [...this.querySelectorAll('.mdw-year')].map(element => {
      const elBounds = element.getBoundingClientRect();
      return {
        position: elBounds.y - bounds.y - contentOffset,
        element
      };
    });
    positions.sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    const selected = this.querySelector('.mdw-year[selected]');
    if (selected) selected.removeAttribute('selected');
    const closest = positions.shift();
    closest.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (!closest.element.hasAttribute('selected')) {
      this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { month: closest.element.getAttribute('value') }));
    }

    closest.element.setAttribute('selected', '');
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

  template() {
    const displayMonth = this.#displayDate.getMonth();
    const displayYear = this.#displayDate.getFullYear();

    return /* html */`
      <div class="mdw-date-container">
        <div class="mdw-months-container">
          <div class="mdw-month-spacer"></div>
          ${this.#monthNames.map((month, i) => {
            const selected = displayMonth === i;
            return `<div class="mdw-month"${selected ? ' selected' : ''} value="${i + 1}">${month}</div>`;
          }).join('\n')}
        </div>

        <div class="mdw-years-container">
        <div class="mdw-year-spacer"></div>
          ${dateUtil.defaultYearRange().map(year => {
            const selected = displayYear === year;
            return `<div class="mdw-year"${selected ? ' selected' : ''} value="${year}">${year}</div>`;
          }).join('\n')}
        </div>
      </div>

      <div class="mdw-actions-container">
        <mdw-button id="mdw-cancel">Cancel</mdw-button>
        <mdw-button id="mdw-ok">Ok</mdw-button>
      </div>
    `;
  }
});
